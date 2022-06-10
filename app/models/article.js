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
    };

    static async getArticlesByCategory(categoryId){
        const articles = await db.query(`
        select * from "article" WHERE category_id = $1;`, [categoryId]);
        return articles.rows;
    }

    static async create(article){
        const newArticle = await db.query(`
            INSERT INTO "article" ("title", "content","description", category_id, "is_online") VALUES ( $1, $2, $3, $4, $5);
        `, [
            article.title,
            article.content,
            article.description,
            article.category_id,
            false
        ]);
        return newArticle.rows;
    };

    static async delete(articleId){
        const article = await db.query(`
            DELETE * from article WHERE id = $1
        `, [articleId]);
    };

    static async setOnline(articleId){
        const article = await db.query(`
            UPDATE "article" SET is_online = true WHERE id = $1 RETURNING *;
        `, [articleId]);
        return article.rows[0];
    };

    static async setOffline(articleId){
        const article = await db.query(`
            UPDATE "article" SET is_online = false WHERE id = $1 RETURNING *;
        `, [articleId]);
        return article.rows[0];
    };

    static async increment(id){
        const like = await db.query(`
            UPDATE ARTICLE SET "like" = "like" + 1 WHERE id = $1 RETURNING *;
        `, [id]);
        return like.rows[0];
    };

    static async decrement(id){
        const like = await db.query(`
            UPDATE ARTICLE SET "like" = "like" - 1 WHERE id = $1 RETURNING *;
        `, [id]);
        return like.rows[0];
    };



}

export default Article;