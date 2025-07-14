import argon2 from "argon2"

export async function encryptPassword(password){
    const hash = await argon2.hash(password)
    return hash
}

export async function matchPassword(password, hash) {
    const match = await argon2.verify(hash, password)
    return match
}