var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./DB/dbs/empleados.db');

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



    // CREATE TABLE IF NOT EXISTS Empleados (ID INTEGER PRIMARY KEY AUTOINCREMENT, Nombres TEXT, ApePat TEXT, ApeMat TEXT, FechaNac TEXT, FechaIniContrato TEXT, FechaFinContrato TEXT, Estado INTEGER);