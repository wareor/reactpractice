import React, { useState, useEffect } from 'react';

import EmpleadoAddForm from './Components/EmpleadoAdd';
import EmpleadoUpdateForm from './Components/EmpleadoUpdate';
import EmpleadoDeleteForm from './Components/EmpleadoDelete';
import EmpleadosConsulta from './Components/EmpleadosConsulta';
import Modal from './Components/modal';
import './App.css';
const axios = require('axios');
const empleadosAPIUrl = "http://localhost:51204/empleado/";

const App = props => {
  const [empleadosDS, setEmpleadosDS] = useState([]);
  const [showingModal, setShowModal] = useState(false);
  const [verbo, setVerbo] = useState(0);
  const [empSelected, setEmpSelected] = useState(0);

  const showModal = () => {
    setShowModal(true);
  };

  const hideModal = () => {

    setShowModal(false);
  };
  const ConsultaEmpleados = () => {
    axios.get(empleadosAPIUrl)
      .then(res => {
        setEmpleadosDS(res.data);
      })
      .catch(err => {
        console.log('Error: ', err.message);
      });
  }
  useEffect(() => {
    ConsultaEmpleados();
  }, []);

  const addSubmitHandler = (newEmpData) => {
    hideModal();
    console.log(newEmpData);
    axios.post(empleadosAPIUrl, newEmpData)
      .then(function (response) {
        ConsultaEmpleados();
        console.log(response);
      });
  }

  const deleteSubmitHandler = (ID) => {
    hideModal();
    axios.delete(empleadosAPIUrl+`${ID}` )
      .then(function (response) {
        ConsultaEmpleados();
        console.log(response);
      });
  }
  const updateSubmitHandler = (updatedEmpData) => {
    hideModal();
    console.log(updatedEmpData);
    axios.put(empleadosAPIUrl, updatedEmpData)
      .then(function (response) {
        ConsultaEmpleados();
        console.log(response);
      });
  }
  const onClickUpdate = (ID) => {
    setEmpSelected(ID);
    setVerbo(1);
    showModal();
  }
  const onClickDelete = (ID) => {
    setEmpSelected(ID);
    setVerbo(2);
    showModal();
  }
  const onClickAdd = () => {
    setVerbo(0);
    showModal();
  }

  return <div>
    {showingModal ? <Modal show={showingModal} handleClose={hideModal}>
      {verbo === 0 && <EmpleadoAddForm submitHandler={addSubmitHandler} />}
      {verbo === 1 && <EmpleadoUpdateForm submitHandler={updateSubmitHandler} empData={{ ...empleadosDS.find(emp => emp.ID === empSelected) }} />}
      {verbo === 2 && <EmpleadoDeleteForm submitHandler={deleteSubmitHandler} empData={{ ...empleadosDS.find(emp => emp.ID === empSelected) }} />}
    </Modal> : null}
    <div className="acciones-container">
    </div>
    <EmpleadosConsulta onClickAdd={onClickAdd} onClickDelete={onClickDelete} onClickUpdate={onClickUpdate} empleadosDS={empleadosDS} />
  </div>
};

export default App;
