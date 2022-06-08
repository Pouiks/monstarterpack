const db = require('../database').default;

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

module.exports = Category;