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
    let consulta = [];
    consulta = 
    await db_all(`SELECT ID ID, Nombres Nombres, ApePat "Apellido Paterno", Salario Salario FROM ${tableName};`);
    return consulta;
}

exports.GETID = async function (empID) {
    let consulta = [];
    consulta = 
    await db_all(`SELECT ID ID, Nombres Nombres, ApePat "Apellido Paterno", Salario Salario FROM ${tableName} WHERE ID = ${empID};`);
    return consulta;
}
// };


// // CREATE
// app.get('/add/:id/:name', function(req,res){
//   db.serialize(()=>{
//     db.run('INSERT INTO emp(id,name) VALUES(?,?)', [req.params.id, req.params.name], function(err) {
//       if (err) {
//         return console.log(err.message);
//       }
//       console.log("New employee has been added");
//       res.send("New empleados has been added into the database with ID = "+req.params.id+ " and Name = "+req.params.name);
//     });

//   });

// });


// // READ
// app.get('/view/:id', function(req,res){
//   db.serialize(()=>{
//     db.each('SELECT id ID, name NAME FROM emp WHERE id =?', [req.params.id], function(err,row){     //db.each() is only one which is funtioning while reading data from the DB
//       if(err){
//         res.send("Error encountered while dislaying");
//         return console.error(err.message);
//       }
//       res.send(` ID: ${row.ID},    Name: ${row.NAME}`);
//       console.log("Entry dislayed successfully");
//     });
//   });
// });


// //UPDATE
//   db.serialize(()=>{
//     db.run('UPDATE emp SET name = ? WHERE id = ?', [req.params.name,req.params.id], function(err){
//       if(err){
//         res.send("Error encountered while updating");
//         return console.error(err.message);
//       }
//       res.send("Entry updated successfully");
//       console.log("Entry updated successfully");
//     });
//   });
// });
// });

// // DELETE
// app.get('/del/:id', function(req,res){
//   db.serialize(()=>{
//     db.run('DELETE FROM emp WHERE id = ?', req.params.id, function(err) {
//       if (err) {
//         res.send("Error encountered while deleting");
//         return console.error(err.message);
//       }
//       res.send("Entry deleted");
//       console.log("Entry deleted");
//     });
//   });

// });




// // Closing the database connection.
// app.get('/close', function(req,res){
//   db.close((err) => {
//     if (err) {
//       res.send('There is some error in closing the database');
//       return console.error(err.message);
//     }
//     console.log('Closing the database connection.');
//     res.send('Database connection successfully closed');
//   });

// });
