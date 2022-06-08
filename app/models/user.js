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
    }
}

export default User;