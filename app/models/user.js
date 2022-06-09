import db from '../database';

class User {
    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        };
    };

    static async findAll(){
        console.log('db/User');
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
        INSERT INTO "user" ("name", "email", "password")
        VALUES
            (
                '$1',
                '$2',
                '$3',
            );
        `, [user.name, user.email, user.password]);
        return newUser;
    }

    
}

export default User;