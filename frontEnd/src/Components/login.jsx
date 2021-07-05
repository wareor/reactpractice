import React, { useState } from 'react';

import './login.css';

const LogIn = React.memo(props => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');


    const submitHandler = (event) => {
        event.preventDefault();
        props.logInHandler({ Email: email, Password: pass });
    }

    return (
        <section>
            <form className="login__container" onSubmit={submitHandler}>
                <div>
                    <div className="form-control">
                        <label htmlFor="email">E-mail</label>
                        <input required={true} type="text" id="email"
                            value={email} onChange={event => { setEmail(event.target.value) }} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password"
                            value={pass} onChange={event => { setPass(event.target.value) }} />
                    </div>
                </div>
                <div className="login-form__actions">
                    {props.showMessage === true ? <span className="login__message">Contraseña y/o usuario incorrectos.</span> : null}
                    <button className="button-login" type="submit">Iniciar</button>
                </div>
            </form>
        </section>
    );
});

export default LogIn;
