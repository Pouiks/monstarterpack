import db from '../database';

class Category {
    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        };
    };

    static async findAll() {
        const categories = await db.query(`
            SELECT * FROM "category" ;
        `);
        return categories.rows;
    };
    
};

export default Category;