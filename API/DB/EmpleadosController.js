//* Controlador de las transacciones de BD para tabla Empleados
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./DB/dbs/empleados.db');
const tableName = 'Empleados';

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

exports.ADD = function (empData) {
    db.serialize(() => {
        db.run(`INSERT INTO ${tableName}` +
            '(Nombres, ApePat, ApeMat, FechaNac, Salario, FechaIniContrato, FechaFinContrato, Estado) VALUES(?, ?, ?, ?, ?, ?, ?, ?);',
            [empData.Nombres, empData.ApePat, empData.ApeMat, empData.FechaNac,
                empData.Salario, empData.FechaIniContrato, empData.FechaFinContrato, empData.Estado
            ],
            (err) => {
                if (err) {
                    console.log(`El empleado no se agregó. Error:${err.message}`);
                }
            });
    });
    return `Se agregó el empleado ${empData.Nombres} ${empData.ApePat} ${empData.ApeMat}`;
};

exports.DELETE = function (empID) {
    db.serialize(() => {
        db.run('DELETE FROM Empleados WHERE ID = ? ;', empID,
            (err) => {
                if (err) {
                    result = `El empleado con ID ${empID} no se eliminó. Error:${err.message}`;
                }
            });
    });
    return `Se eliminó el empleado con ID ${empID}`;
}

exports.UPDATE = function (empData) {
    db.serialize(() => {
        db.run(`UPDATE ${tableName} SET Nombres = ?, ApePat = ?, ApeMat = ?, FechaNac = ?, Salario = ?, FechaIniContrato = ?, FechaFinContrato = ?, Estado = ? WHERE ID = ?`,
            [empData.Nombres, empData.ApePat, empData.ApeMat, empData.FechaNac,
                empData.Salario, empData.FechaIniContrato, empData.FechaFinContrato, empData.Estado, empData.ID
            ],
            (err) => {
                if (err) {
                    console.error(err.message);
                }
            });
    });
    return `Se actualizó el empleado con ID ${empData.ID}`;
}

exports.GETALL = async function () {
    let consulta = [];
    consulta =
        await queryAsync(`SELECT * FROM ${tableName};`);
    return consulta;
}

exports.GETID = async function (empID) {
    let consulta = [];
    consulta =
        await queryAsync(`SELECT * FROM ${tableName} WHERE ID = ${empID};`);
    return consulta;
}