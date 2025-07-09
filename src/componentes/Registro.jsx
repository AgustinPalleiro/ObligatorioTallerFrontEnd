import React, {useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import { spinnerCargando } from '../features/spinnerSlice';
import { NavLink, useNavigate } from 'react-router-dom';

const Registro = () => {
        const user = useRef(null);
        const pass = useRef(null);
    
        const [botonLogin, setBotonLogin] = useState(false)
        const [error, setError] = useState(false)
        const [mensajeError, setMensajeError] = useState('');
    
        const dispatch = useDispatch();
        const navigate = useNavigate();
    
        const usuarioCarga = useSelector(state => state.spinner.loading);
    
        const cambioInput = e => {
            user.current.value && pass.current.value ? setBotonLogin(true) : setBotonLogin(false)
        }

            const registrar = () => {
                dispatch(spinnerCargando(true))
                const bodyData = {
                    user: user.current.value,
                    pass: pass.current.value,
                    logged: true
                }
        

                fetch(`https://my-json-server.typicode.com/mnacimento/gamesServer/users`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bodyData)
                })
                .then(response => response.json())
                .then(data => {
                    if(data.logged === true){
                        localStorage.setItem("id", data.id);
                        localStorage.setItem("user", data.user);
                        setError(false)
                        setMensajeError(null);
                        navigate("/dashboard")
                    }else{
                        setError(true)
                        setMensajeError(data.mensaje);
                    }
                    dispatch(spinnerCargando(false))
                }).catch(error =>{
                    dispatch(spinnerCargando(false))
                    setError(true)
                    setMensajeError('Fallo conexion con el servidor en login');
                })
                
            }

  return (
    <div id="seccionRegistro" className="row justify-content-center align-items-center mt-5">
        <h2>Registro</h2>

        <label htmlFor="txtUsuarioRegistro">Usuario:</label>
        <input type="text" id='txtUsuarioRegistro' placeholder='Ingrese su usuario' ref={user} onChange={cambioInput}/>

        <label htmlFor="txtContrasenaRegistro">Contraseña:</label>
        <input type="password" id='txtContrasenaRegistro' placeholder='Ingrese su contraseña' ref={pass} onChange={cambioInput}/>

        <button type='button' className="btn btn-danger" onClick={registrar} disabled={!botonLogin}> Registrarme e ingresar</button>
                <NavLink className="nav-link" to="/">Tengo una cuenta</NavLink>
        

        {error ? <p>{mensajeError}</p>: null}
        {usuarioCarga ? <Spinner/> : null}
    </div>
  )
}

export default Registro