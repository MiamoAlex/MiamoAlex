import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
export class DBManager {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });
    }

    /**
     * getVisitors() retourne le nombre de visiteurs actuels du site
     */
    async getVisitors() {
        this.addVisitor();
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT visitors FROM generalinfos;', (error, results) => {
                if (error) reject(error);
                resolve(results)
            });
        })
    }

    /**
     * 
     */
    addVisitor() {
        this.connection.query('UPDATE generalinfos SET visitors = visitors + 1 WHERE id = 0');
    }
}