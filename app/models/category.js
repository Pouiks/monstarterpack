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

    static async findOne(id){
        const category = await db.query(`
        SELECT * FROM "category" WHERE "id" = $1;`, [id]
        );
        return category.rows[0];
        
    };

    static async createCategory(name){
        const category = await db.query(`
        INSERT INTO "category" ("name") VALUES ($1)
        `, [name]);
        return category.rows[0];
    };

    static async deleteCategory(id){
        const category = await db.query(`
        DELETE FROM "category" WHERE "id" = $1;`, [id]);
    };
    
};

export default Category;