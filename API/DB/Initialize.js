var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./DB/dbs/empleados.db');
try {
    console.log("Se iicializa la BD");
    // Crear tabla Empleados
    db.run(
        'CREATE TABLE IF NOT EXISTS Empleados (' +
        'ID INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'Nombres TEXT NOT NULL, ' +
        'ApePat TEXT NOT NULL, ' +
        'ApeMat TEXT, ' +
        'FechaNac TEXT NOT NULL, ' +
        'Salario REAL NOT NULL, ' +
        'FechaIniContrato TEXT, ' +
        'FechaFinContrato TEXT, ' +
        'Estado INTEGER NOT NULL' +
        ');'
    );

    // Crear tabla Usuarios
    db.run(
        'CREATE TABLE IF NOT EXISTS Usuarios (' +
        'ID INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'Nombre TEXT NOT NULL, ' +
        'Email TEXT NOT NULL, ' +
        'Password TEXT NOT NULL ' +
        ');'
    );

    // Crear tabla Verbos
    db.run(
        'CREATE TABLE IF NOT EXISTS Verbos (' +
        'ID INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'Nombre TEXT NOT NULL ' +
        ');'
    );

    // Crear tabla Permisos
    db.run(
        'CREATE TABLE IF NOT EXISTS Permisos (' +
        'UsuarioID INTEGER NOT NULL, ' +
        'VerboID INTEGER NOT NULL, ' +
        'FOREIGN KEY(UsuarioID) REFERENCES Usuarios(ID), ' +
        'FOREIGN KEY(VerboID) REFERENCES Verbos(ID) ' +
        ');'
    );
} catch (err) {
    console.log(err.message);
}