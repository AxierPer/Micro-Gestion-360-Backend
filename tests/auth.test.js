import request from 'supertest';
import app from '../index.js';

let token;



describe('Pruebas de endpoints Auth con rutas protegidas', () => {
    beforeAll(async () => {
        // Primero creamos el usuario si no existe (idempotente)
        const newUser = {
            name: "UserPrueba",
            lastName: "Test",
            phone: 55555,
            role: "tester",
            employeeId: "EMP999",
            age: 30,
            email: "userprueba@example.com",
            idNumber: 99912345,
            password: "otraClave123"
        };

        // Luego hacemos login para obtener el token
        const res = await request(app)
            .post('/login')
            .send({
                name: newUser.name,
                lastName: newUser.lastName,
                email: newUser.email,
                employeeId: newUser.employeeId,
                idNumber: newUser.idNumber,
                role: newUser.role,
                password: newUser.password

            });

        token = res.body.token;
    });

    afterAll(async () => {
        await app.off; // opcional si expones el server
    });

    test('GET /users/ responde con status 200 (requiere token)', async () => {
        const response = await request(app)
            .get('/users/') //<- Accede a la ruta /users, para visualizar los usuarios, lo cual es una ruta protegida
            .set('Authorization', `Bearer ${token}`); // <-- Agrega la validacion con el token, ya que es una ruta protegida, de lo contrario daria un error

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('ID');
        expect(response.body).toHaveProperty('Data');
        expect(Array.isArray(response.body.ID)).toBe(true);
        expect(Array.isArray(response.body.Data)).toBe(true);
    });

    test('POST /users/add crea un usuario (requiere token)', async () => {
        const anotherUser = {
            name: "UserPrueba",
            lastName: "Test",
            phone: 55555,
            role: "tester",
            employeeId: "EMP999",
            age: 30,
            email: "userprueba@example.com",
            idNumber: 99912345,
            password: "otraClave123"
        };

        const response = await request(app)
            .post('/users/add')
            .send(anotherUser)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.text).toMatch(/existía|creará/);
    });

    test('GET /users/ falla sin token → 401', async () => {
        const res = await request(app).get('/users/');
        expect(res.statusCode).toBe(401);
    });

    test('POST /users/add falla sin token → 401', async () =>{
        const res = await request(app).post('/users/add');
        expect(res.statusCode).toBe(401)
    })
});