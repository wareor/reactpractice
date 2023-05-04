import React, { useState, useEffect } from 'react';

import './EmpleadoUpdate.css';

const EmpleadoUpdateForm = React.memo(props => {
    const [Nombres, setNombres] = useState(props.empData.Nombres);
    const [ApePat, setApePat] = useState(props.empData.ApePat);
    const [ApeMat, setApeMat] = useState(props.empData.ApeMat);
    const [FechaNac, setFechaNac] = useState(props.empData.FechaNac);
    const [Salario, setSalario] = useState(props.empData.Salario);
    const [FechaIniContrato, setFechaIniC] = useState(props.empData.FechaIniContrato);
    const [FechaFinContrato, setFechaFinC] = useState(props.empData.FechaFinContrato);
    const [Estado, setEstado] = useState(props.empData.Estado);
    
    const submitHandler = event => {
        event.preventDefault();
        let newEmpData = {
            Nombres: Nombres,
            ApePat: ApePat,
            ApeMat: ApeMat,
            FechaNac: FechaNac,
            Salario: Salario,
            FechaIniContrato: FechaIniContrato,
            FechaFinContrato: FechaFinContrato,
            Estado: Estado,
            ID: props.empData.ID
        }
        props.submitHandler(newEmpData);
    };
    useEffect(() => {
        // loadForm();
    });

    return (
        <section className="empleadoUpdate-form">
            <u><b>Modificar empleado</b></u>
            <br />
            <br />
            <form id="update-empleado-form" onSubmit={submitHandler}>
                <div className="form-control">
                    <label htmlFor="nombres">Nombres</label>
                    <input required={true} type="text" id="nombres"
                        value={Nombres} onChange={event => { setNombres(event.target.value) }} />
                </div>
                <div className="form-control">
                    <label htmlFor="apePat">Apellito paterno</label>
                    <input required={true} type="text" id="apePat"
                        value={ApePat} onChange={event => { setApePat(event.target.value) }} />
                </div>
                <div className="form-control">
                    <label htmlFor="apeMat">Apellido materno</label>
                    <input type="text" id="apeMat"
                        value={ApeMat} onChange={event => { setApeMat(event.target.value) }} />
                </div>
                <div className="form-control">
                    <label htmlFor="fechaNac">Fecha de nacimiento</label>
                    <input required={true} type="date" id="fechaNac"
                        value={FechaNac} onChange={event => { setFechaNac(event.target.value) }} />
                </div>
                <div className="form-control">
                    <label htmlFor="salario">Salario</label>
                    <input required={true} type="number" id="salario"
                        value={Salario} onChange={event => { setSalario(event.target.value) }} />
                </div>
                <div className="form-control">
                    <label htmlFor="fechaIniContrato">Inicio de contrato</label>
                    <input type="date" id="fechaIniContrato"
                        value={FechaIniContrato} onChange={event => { setFechaIniC(event.target.value) }} />
                </div>
                <div className="form-control">
                    <label htmlFor="fechaFinContrato">Fin de contrato</label>
                    <input type="date" id="fechaFinContrato"
                        value={FechaFinContrato} onChange={event => { setFechaFinC(event.target.value) }} />
                </div>
                <div className="form-control">
                    <label>
                        Activo:
                        <input
                            name="estado" id="estado" type="checkbox"
                            checked={Estado} onChange={event => { setEstado(event.target.checked) }}
                        />
                    </label>
                </div>
                <div className="empleado-form__actions">
                    <button className="button-add" type="submit">Modificar</button>
                </div>
            </form>
        </section>
    );
});

export default EmpleadoUpdateForm;
