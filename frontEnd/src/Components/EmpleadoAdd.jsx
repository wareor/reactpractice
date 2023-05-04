import React, { useState, useEffect } from 'react';
import './EmpleadoAdd.css';

const EmpleadoAddForm = React.memo(props => {
    const [Nombres, setNombres] = useState('');
    const [ApePat, setApePat] = useState('');
    const [ApeMat, setApeMat] = useState('');
    const [FechaNac, setFechaNac] = useState(0);
    const [Salario, setSalario] = useState(0);
    const [FechaIniContrato, setFechaIniC] = useState(0);
    const [FechaFinContrato, setFechaFinC] = useState(0);
    const [Estado, setEstado] = useState(false);

    const clearForm = () => {
        setNombres('');
        setApePat('');
        setApeMat('');
        setFechaNac(0);
        setSalario(0);
        setFechaIniC(0);
        setFechaFinC(0);
        setEstado(false);
    }
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
            Estado: Estado
        }
        props.submitHandler(newEmpData);
        clearForm();
        // ...
    };
    useEffect(() => {
        // nombres
        // apePat
        // apeMat
        // fechaNac
        // salario
        // fechaIniC
        // fechaFinC
        // estado
    })
    return (
        <section className="empleadoAdd-form">
            <u><b>Nuevo empleado</b></u>
            <br />
            <br />
            <form id="new-empleado-form" onSubmit={submitHandler}>
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
                    <label htmlFor="fechaIniContrato">Fin de contrato</label>
                    <input type="date" id="fechaIniContrato"
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
                    <button className="button-add" type="submit">Agregar</button>
                </div>
            </form>
        </section>
    );
});

export default EmpleadoAddForm;
