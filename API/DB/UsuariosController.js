//* Controlador de las transacciones de BD para tabla Empleados
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./DB/dbs/empleados.db');
const tableName = 'Usuarios';

/**
 * Ejecución asíncona de una consulta en la BD
 * @param {Comando de consulta SQL a ejecutar } query 
 * @returns Arreglo con la consulta resultante de el comando que se recibe como parámetro
 */
async function queryAsync(query) {
    return new Promise(function (resolve, reject) {
        db.all(query,
            (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
    });
}

exports.ADD = function (usrData) {
    db.serialize(() => {
        db.run(`INSERT INTO ${tableName}` +
            '(Nombre, Email, Password) VALUES(?, ?, ?);',
            [usrData.Nombre, usrData.Email, usrData.Password],
            (err) => {
                if (err) {
                    console.log(`El usuario no se agregó. Error:${err.message}`);
                }
            });
    });
    return `Se agregó el usuario ${usrData.Nombre} ${usrData.Email}`;
};

exports.DELETE = function (usrID) {
    db.serialize(() => {
        db.run('DELETE FROM Usuarios WHERE ID = ? ;', usrID,
            (err) => {
                if (err) {
                    result = `El usuario con ID ${usrID} no se eliminó. Error:${err.message}`;
                }
            });
    });
    return `Se eliminó el usuario con ID ${usrID}`;
}

exports.UPDATE = function (usrData) {
    db.serialize(() => {
        db.run(`UPDATE ${tableName} SET Nombre = ?, Email = ?, Password = ? WHERE ID = ?;`,
            [usrData.Nombre, usrData.Email, usrData.Password, usrData.ID
            ],
            (err) => {
                if (err) {
                    console.error(err.message);
                }
            });
    });
    return `Se actualizó el usuario con ID ${usrData.ID}`;
}

exports.GETALL = async function () {
    let consulta = [];
    consulta =
        await queryAsync(`SELECT * FROM ${tableName};`);
    return consulta;
}

exports.GETID = async function (usrID) {
    let consulta = [];
    consulta =
        await queryAsync(`SELECT * FROM ${tableName} WHERE ID = ${usrID};`);
    return consulta;
}