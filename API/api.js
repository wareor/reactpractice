require('./DB/Initialize.js');
var express = require('express');
var app = express();
const cors = require('cors');
var http = require('http');
var server = http.createServer(app);

const {
  ADD: EmpleadoADD,
  DELETE: EmpleadoDELETE,
  UPDATE: EmpleadoUPDATE,
  GETALL: EmpleadoGETALL,
  GETID: EmpleadoGETID
} = require('./DB/EmpleadosController.js');

const {
  ADD: UsuarioADD,
  DELETE: UsuarioDELETE,
  UPDATE: UsuarioUPDATE,
  GETALL: UsuarioGETALL,
  GETID: UsuarioGETID,
  UsuarioGETAuth: UsuarioGETAuth
} = require('./DB/UsuariosController.js');

var result = {
  Transaction: "",
  Error: ""
}

app.use(express.json());
app.use(cors({
  origin: '*'
}));

// Empleados WM >>>
/**
 * Devuelve la consulta de todos los registros en la tabla de Empleados
 */
app.get('/empleado', async function (req, res) {
  let consulta = [];
  consulta = await EmpleadoGETALL();
  res.send(consulta);
});

/**
 * Devuelve el registro de un empleado
 */
app.get('/empleado/:ID', async function (req, res) {
  let consulta = [];
  consulta = await EmpleadoGETID(req.params.ID);
  res.send(consulta);
});

/**
 * Agrega un registro de Empleado
 */
app.post('/empleado', (req, res) => {
  const empData = req.body;
  try {
    console.log(empData);
    result.Transaction = EmpleadoADD(empData);
    console.log(result);
  } catch (err) {
    result.Error = err.message;
    throw new Error(err);
  }
  res.send(result);
});

/**
 * Consulta la información del un Empleado 
 */
app.delete('/empleado/:ID', (req, res) => {
  const empID = req.params.ID;
  try {
    result.Transaction = EmpleadoDELETE(empID);
    console.log(result);
  } catch (err) {
    result.Error = err.message;
    throw new Error(err);
  }
  res.send(result);
});

/**
 * Actualiza la información de un empleado
 */
app.put('/empleado', (req, res) => {
  const empData = req.body;
  try {
    result.Transaction = EmpleadoUPDATE(empData);
  } catch (err) {
    result.Error = err.message;
    throw new Error(err);
  }
  res.send(result);
});


/**
 * Verifica si existe un usuario que correponde al usuario y contraseña
 */
app.post('/usuario/login', async function (req, res) {
  console.log(req.body);
  let consulta = await UsuarioGETAuth(req.body);
  console.log(consulta);
  res.send(consulta);
});

/**
 * Devuelve el registro de un usuario
 */
app.get('/usuario/:ID', async function (req, res) {
  let consulta = [];
  consulta = await UsuarioGETID(req.params.ID);
  res.send(consulta);
});

/**
 * Devuelve el registro de un usuario
 */
app.get('/usuario/:ID', async function (req, res) {
  let consulta = [];
  consulta = await UsuarioGETID(req.params.ID);
  res.send(consulta);
});



/**
 * Agrega un registro de Usuario
 */
app.post('/usuario', (req, res) => {
  const usrData = req.body;
  try {
    console.log(usrData);
    result.Transaction = UsuarioADD(usrData);
    console.log(result);
  } catch (err) {
    result.Error = err.message;
    throw new Error(err);
  }
  res.send(result);
});

/**
 * Consulta la información del un Usuario 
 */
app.delete('/usuario/:ID', (req, res) => {
  const usrID = req.params.ID;
  try {
    result.Transaction = UsuarioDELETE(usrID);
    console.log(result);
  } catch (err) {
    result.Error = err.message;
    throw new Error(err);
  }
  res.send(result);
});

/**
 * Actualiza la información de un usuario
 */
app.put('/usuario', (req, res) => {
  const usrData = req.body;
  try {
    result.Transaction = UsuarioUPDATE(usrData);
  } catch (err) {
    result.Error = err.message;
    throw new Error(err);
  }
  res.send(result);
});


server.listen(51204, function () {
  console.log("El API se expone en el puerto: 51204");
});