import React from 'react';

import './EmpleadoDelete.css';

const EmpleadoAddForm = React.memo(props => {

    const submitHandler = event => {
        console.log("submitHandler Delete Form")
        console.log(props.empData.ID);
        event.preventDefault();
        props.submitHandler(props.empData.ID);
    };
    return (
        <section className="empleadoDelete-form">
            <form onSubmit={submitHandler}>
                <div>
                    <span>¿Borrar empleado?</span>
                    <br />
                    <span>{props.empData.ID} | {props.empData.Nombres} | {props.empData.ApePat}</span>
                </div>
                <div className="empleado-form__actions">
                    <button className="button-delete" type="submit">Eliminar</button>
                </div>
            </form>
        </section>
    );
});

export default EmpleadoAddForm;
