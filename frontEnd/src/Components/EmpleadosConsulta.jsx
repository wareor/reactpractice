import React from 'react';

import './EmpleadosConsulta.css';

const EmpleadosConsulta = props => {
    console.log("se inicia el componente consulta");
    const empDS = props.empleadosDS;


    const onClickUpdate = event => {
        const empID = Number(event.target.id.split('-')[1]);
        console.log(empID);
        props.onClickUpdate(empID);
    }
    const onClickDelete = event => {
        const empID = Number(event.target.id.split('-')[1]);
        props.onClickDelete(empID);
    }
    const onClickAdd = event => {
        props.onClickAdd();
    }
    return (
        <section className="empleado-list">
            <ul>
                <li>
                    <span className="col__id">ID</span>
                    <span className="col__nombres">Nombres</span>
                    <span className="col__apePat">Apellido Paterno</span>
                    <span className="col__salario">Salario</span>
                    <span className="col__estado">Estado</span>
                    <div className="rowButtons-container">
                        <button className="button-main-add" type="button" onClick={onClickAdd}><b>+</b></button>
                    </div>

                </li>
            </ul>
            <ul>
                {empDS.map((emp, indx) => (
                    <li key={indx}>
                        <span className="col__id">{emp.ID}</span>
                        <span className="col__nombres">{emp.Nombres}</span>
                        <span className="col__apePat">{emp.ApePat}</span>
                        <span className="col__salario">${emp.Salario}</span>
                        <span className={emp.Estado === 1 ? "col__estado_act" : "col__estado_inact"}>{emp.Estado === 1 ? 'Activo' : 'Inactivo'}</span>
                        <div className="rowButtons-container">
                            <button id={`updBtn-${emp.ID}`} className="button-row-update" type="button" onClick={onClickUpdate}>✎</button>
                            <button id={`delBtn-${emp.ID}`} className="button-row-delete" type="button" onClick={onClickDelete}>🗑</button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default EmpleadosConsulta;
