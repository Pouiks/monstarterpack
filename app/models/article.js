import db from '../database';

class Article {
    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        };
    };

    static async findAll(){
        const articles = await db.query(`select * from "article" ; `);
        return articles.rows;
    };

    static async  findOne(articleId){
        const article = await db.query(`
            SELECT * from article
            JOIN "comment" ON "comment".article_id = "article".id
            WHERE id = $1;
        ` [articleId]);
        return article.rows;
    }

    static async create(article){
        const newArticle = await db.query(`
            INSERT INTO "article" ("title", "content", "is_online", "author", "like") VALUES ( $1, $2, $3,);
        `, [
            article.title,
            article.content,
            false
        ]);
    }

    static async delete(articleId){
        const article = await db.query(`
            DELETE * from article WHERE id = $1
        `, [articleId]);
    }



}

export default Article;