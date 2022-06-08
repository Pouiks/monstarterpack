const db = require('../database').default;

class Article {
    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        };
    };

    static async findAll(){
        const articles = await db.query(`select * from "article" ; `);
        return articles.rows;
    }
}

module.exports = Article;