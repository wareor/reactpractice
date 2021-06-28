var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./DB/dbs/empleados.db');
const tableName = 'Empleados';
/**
 * Controlador de las transacciones de BD para tabla Empleados
 */
// const dbTransaction = () => {
exports.ADD = function (empData) {
    db.serialize(() => {
        db.run(
            `INSERT INTO ${tableName}` +
            '(Nombres, ApePat, ApeMat, FechaNac, Salario, FechaIniContrato, FechaFinContrato, Estado) VALUES(?, ?, ?, ?, ?, ?, ?, ?);',
            [empData.Nombres, empData.ApePat, empData.ApeMat, empData.FechaNac,
            empData.Salario, empData.FechaIniContrato, empData.FechaFinContrato, empData.Estado],
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
        db.run('DELETE FROM Empleados WHERE ID = ?', empID, function (err) {
            if (err) {
                if (err) {
                    result = `El empleado con ID ${empID} no se eliminó. Error:${err.message}`;
                }
            }
        });
    });
    return `Se eliminó el empleado con ID ${empID}`;
}

exports.UPDATE = function (empData) {
    db.serialize(() => {
        db.run(`UPDATE ${tableName} SET Nombres = ?, ApePat = ?, ApeMat = ?, FechaNac = ?, Salario = ?, FechaIniContrato = ?, FechaFinContrato = ?, Estado = ? WHERE ID = ?`,
            [empData.Nombres, empData.ApePat, empData.ApeMat, empData.FechaNac,
            empData.Salario, empData.FechaIniContrato, empData.FechaFinContrato, empData.Estado, empData.ID],
            function (err) {
                if (err) {
                    console.error(err.message);
                }
            });
    });
    return `Se actualizó el empleado con ID ${empData.ID}`;
}

async function db_all(query) {
    return new Promise(function (resolve, reject) {
        db.all(query, function (err, rows) {
            if (err) { return reject(err); }
            resolve(rows);
        });
    });
}


exports.GETALL = async function () {
    let consulta = 
    await db_all(`SELECT * FROM ${tableName};`);
    return consulta;
}

exports.GETID = async function (empID) {
    let consulta = 
    await db_all(`SELECT * FROM ${tableName} WHERE ID = ${empID};`);
    return consulta;
}