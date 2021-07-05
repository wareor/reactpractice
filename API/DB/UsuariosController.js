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
};

async function getLastID() {
    return new Promise(function (resolve, reject) {
        db.get('SELECT last_insert_rowid();',
            (err, lastid) => {
                if (err) {
                    return reject(err);
                }
                resolve(lastid['last_insert_rowid()']);
            });
    });
}




exports.ADD = async function (usrData) {
    if (usrData && usrData.Nombre && usrData.Email && usrData.Password && usrData.Permisos && usrData.Permisos.Consultar) {
        db.run(`INSERT INTO ${tableName}` +
            '(Nombre, Email, Password) VALUES(?, ?, ?);',
            [usrData.Nombre, usrData.Email, usrData.Password],
            (err) => {
                if (err) {
                    console.log(`El usuario no se agregó. Error:${err.message}`);
                }
            });
        let lastID = await getLastID();
        let verbos = await queryAsync(`SELECT * FROM Verbos;`);
        Object.keys(usrData.Permisos).forEach((verbo) => {
            console.log(verbo);
            let verboBD = verbos.find((v) => {
                return v.Nombre == verbo;
            });
            console.log(verboBD);
            if (verboBD && usrData.Permisos[verboBD.Nombre] === true) {
                db.run('INSERT INTO Permisos (UsuarioID, VerboID) VALUES (?, ?);', [lastID, verboBD.ID],
                    (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
            }
        });
        return `Se agregó el usuario ${usrData.Nombre} ${usrData.Email}`;
    } else {
        return "Nombre, Email, Password y Permisos son obligatorios para dar de alta un usuario";
    }
};

exports.DELETE = function (usrID) {
    db.serialize(() => {
        db.run('DELETE FROM Usuarios WHERE ID = ? ;', usrID,
            (err) => {
                if (err) {
                    result = `El usuario con ID ${usrID} no se eliminó. Error:${err.message}`;
                }
            });
        db.run('DELETE FROM Permisos WHERE UsuarioID = ?;', usrID,
            (err) => {
                if (err) {
                    console.log(err);
                }
            });
    });
    return `Se eliminó el usuario con ID ${usrID}`;
}

exports.UPDATE = async function (usrData) {
    db.run(`UPDATE ${tableName} SET Nombre = ?, Email = ?, Password = ? WHERE ID = ?;`,
        [usrData.Nombre, usrData.Email, usrData.Password, usrData.ID],
        (err) => {
            if (err) {
                console.error(err.message);
            }
        });
    let verbos = await queryAsync(`SELECT * FROM Verbos;`);
    Object.keys(usrData.Permisos).forEach(async (verbo) => {
        console.log(verbo);
        let verboBD = verbos.find((v) => {
            return v.Nombre == verbo;
        });
        console.log(verboBD);
        if (verboBD && usrData.Permisos[verbo] === true) {
            let permisosExistentes = await queryAsync(`SELECT * FROM Permisos WHERE UsuarioID = ${usrData.ID};`)
            if (permisosExistentes && permisosExistentes.length === 0) {
                db.run('INSERT INTO Permisos (UsuarioID, VerboID) VALUES (?, ?);', [usrData.ID, verboBD.ID],
                    (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
            }
        } else if (verboBD && usrData.Permisos[verbo] === false) {
            db.run('DELETE FROM Permisos WHERE UsuarioID = ? AND VerboID = ?;', [usrData.ID, verboBD.ID],
                (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
        }
    });
    return `Se actualizó el usuario con ID ${usrData.ID}`;
}

exports.GETALL = async function () {
    let consulta = [];
    consulta =
        await queryAsync(`SELECT * FROM ${tableName};`);

    consulta.forEach(async (usr) => {
        let permisos = await queryAsync(`SELECT * FROM Permisos WHERE UsuarioID = ${usr.ID};`)
        usr.Permisos = permisos[0];
    });
    return consulta;
}

exports.GETID = async function (usrID) {
    let consulta = [];
    consulta =
        await queryAsync(`SELECT * FROM ${tableName} WHERE ID = ${usrID};`);
    consulta.forEach(async (usr) => {
        usr.Permisos = (await queryAsync(`SELECT * FROM Permisos WHERE UsuarioID ${usrID};`))[0];
    });

    return consulta;
}

exports.UsuarioGETAuth = async function (usrData) {
    console.log(usrData);
    let consulta = await queryAsync(`SELECT * FROM ${tableName} WHERE Email = "${usrData.Email}" AND Password = "${usrData.Password}";`);
    if (consulta.length == 0) {
        usrData.SesionValida = false;
        return usrData;
    }
    let permisos = await queryAsync(`SELECT VerboID FROM Permisos WHERE UsuarioID = ${consulta[0].ID};`);
    let user = {
        ...consulta[0],
        SesionValida: true,
        Permisos: permisos
    };
    console.log(user);
    return user;
}