// import empController from './DB/EmpleadosController';
var express = require('express');
var app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors({ origin: '*' }));

var http = require('http');
var server = http.createServer(app);

const createDB = require('./DB/Initialize.js');
const { ADD, DELETE, UPDATE, GETALL, GETID } = require('./DB/EmpleadosController.js');


app.get('/empleado', async function (req, res) {
  let consulta = await GETALL();
  res.send(consulta);
});
app.get('/empleado/:ID', async function (req, res) {
  let consulta = await GETID(req.params.ID);
  res.send(consulta);
});

app.post('/empleado', (req, res) => {
  const empData = req.body;
  let result = {
    Transaction: "",
    Error: ""
  }
  try {
    console.log(empData);
    result.Transaction = ADD(empData);
    console.log(result);
  } catch (err) {
    result.Error = err.message;
    throw new Error(err);
  }
  res.send(result);
});

app.delete('/empleado', (req, res) => {
  const empData = req.body;
  let result = {
    Transaction: "",
    Error: ""
  }
  try {
    console.log(empData);
    result.Transaction = DELETE(empData.ID);
    console.log(result);
  } catch (err) {
    result.Error = err.message;
    throw new Error(err);
  }
  res.send(result);
});

app.put('/empleado', (req, res) => {
  const empData = req.body;
  let result = {
    Transaction: "",
    Error: ""
  }
  try {
    console.log(empData);
    result.Transaction = UPDATE(empData);
    console.log(result);
  } catch (err) {
    result.Error = err.message;
    throw new Error(err);
  }
  res.send(result,);
});



server.listen(3000, function () {
  console.log("El API se expone en el puerto: 3000");
});