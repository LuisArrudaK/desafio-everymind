const db = require('../db');

module.exports = {
    findAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM products', (error, results) => {
                if (error) {
                    reject(error);
                }

                resolve(results);
            });
        });
    },
    find: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM products WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                }

                if (results.length == 0) {
                    reject();
                }

                resolve(results[0]);
            });
        });
    },
    insert: (name, code, description, price) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO products (name, code, description, price) VALUES (?, ?, ?, ?)', [name, code, description, price],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(results.insertId);
                }
            );
        });
    },
    update: (id, name, code, description, price) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE products SET name = ?, code = ?, description = ?, price = ? WHERE id = ?', [name, code, description, price, id],
                (error, results) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(results);
                }
            );
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM products WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                }

                resolve(results);
            });
        });
    }

};


