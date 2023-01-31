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
     * getDynamicData() returns the current dynamic data of the website
     */
    async getVisitors() {
        this.increaseCount('visitors')
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT visitors, typodog FROM generalinfos;', (error, results) => {
                if (error) reject(error);
                resolve(results)
            });
        })
    }

    /**
     * addVisitor() increases a database count
     */
    increaseCount(count) {
        this.connection.query(`UPDATE generalinfos SET ${count} = ${count} + 1 WHERE id = 0`);
    }
}