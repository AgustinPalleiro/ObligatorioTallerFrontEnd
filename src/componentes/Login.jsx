import React, {useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import { spinnerCargando } from '../features/spinnerSlice';
import { NavLink, useNavigate } from 'react-router-dom';


const Login = () => {

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

    const ingresar = () => {
        dispatch(spinnerCargando(true))
        const bodyData = {
            user: user.current.value,
            pass: pass.current.value,
            logged: true
        }

        // apikey:localStorage.getItem('apikey'),
        // userId: localStorage.getItem('userId')
        fetch(`https://my-json-server.typicode.com/mnacimento/gamesServer/users/1`, {
            method: 'PUT',
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
    <div id='seccionLogin' className="row justify-content-center align-items-center mt-5">
        <h2>Iniciar sesion</h2>

        <label htmlFor="txtUsuarioLogin">Usuario:</label>
        <input type="text" id='txtUsuarioLogin' placeholder='Ingrese su usuario' ref={user} onChange={cambioInput}/>

        <label htmlFor="txtContrasenaLogin">Contraseña:</label>
        <input type="password" id='txtContrasenaLogin' placeholder='Ingrese su contraseña' ref={pass} onChange={cambioInput}/>

        <button type='button' className="btn btn-success" onClick={ingresar} disabled={!botonLogin}>Iniciar Sesion</button>
        <NavLink className="nav-link" to="/registro">Registrarme</NavLink>

        {error ? <p>{mensajeError}</p>: null}
        {usuarioCarga ? <Spinner/> : null}
    </div>
  )
}

export default Login



