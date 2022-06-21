import db from '../database';

class User {
    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        };
    };

    static async findAll(){
        const users = await db.query(`select * from "user"; `);
        return users.rows;
    };

    static async findOne(id){
        const user = await db.query(`select * from "user WHERE id = $1";`, [id]);
        return user.rows[0];
    };

    static async findByEmail(email) {
        const userByEmail = await db.query(`
            SELECT * FROM "user" 
            WHERE email = $1;`,[ email ]
        );
        return userByEmail.rows[0];
    };

    static async create(user){
        const newUser = await db.query(`
        INSERT INTO "user" ("name", "email", "password","role") VALUES ($1,$2,$3,$4);
        `, [user.name, user.email, user.password, user.role]);
        return newUser;
    };

    static async update(user){
        const userToUpdate = await db.query(`
            UPDATE "user" SET name = $1, email = $2 WHERE id = $3;`, [ user.name, user.email, user.id]);
            return userToUpdate;
    };

    static async updateToken(user){
        await db.query(`
        UPDATE "user" SET refresh_token= $2 WHERE id = $1;`, [user.id, user.refreshToken]
        );
    }

    

    static async delete(id){
        await db.query(`
            DELETE FROM "user" WHERE id = $1;`,[id]);
    };

    
}

export default User;