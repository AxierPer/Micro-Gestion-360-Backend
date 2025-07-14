import { collection, doc, getDocs, getDoc, setDoc, query, where } from "firebase/firestore";
import { encryptPassword } from "../../../utils/hash.utils.js";

export async function getUsers(db){
    const dataDocs = await getDocs(collection(db, "Users"))
    const ids = dataDocs.docs.map(doc => doc.id)
    const dataList = dataDocs.docs.map(doc => doc.data());
    return {
        "ID": ids,
        "Data": dataList
    };
}

export async function addUsers(db, newUser){
    const userRef = doc(db, "Users", newUser.name);
    const hashPass = await encryptPassword(newUser.password)
    try {
        const snapshot = await getDoc(userRef);
        const userSave = {...newUser, password: hashPass}

        if (snapshot.exists()) {
            await setDoc(userRef, userSave);
            return "El documento ya existía. Será actualizado.";

        } else {
            await setDoc(userRef, userSave);
            return "El documento no existía. Se creará.";
        }

    } catch (e) {
        console.error("Error al crear el documento: ", e);
    }
}

export async function getUserByMail(db, email) {
    const queryUser = query(collection(db, "Users"), where("email", "==", email));
    const querySnapshot = await getDocs(queryUser);
    for (const doc of querySnapshot.docs) {
        const data = doc.data();
        if (data) {
            return data;
        }
    }
    console.log("No se encontró el usuario con ese correo.");
    return null;
}
