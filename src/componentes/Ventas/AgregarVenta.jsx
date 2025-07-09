import React, {useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cargarConsolas } from '../../features/consolasSlice'
import Spinner from '../Spinner'
import { spinnerCargando } from '../../features/spinnerSlice'
import { cargarEstados } from '../../features/estadosSlice'
import { cargarJuegos } from '../../features/juegosSlice'
import { agregarVenta, cargarVentas } from '../../features/ventasSlice'

const AgregarVenta = () => {

    const consola = useRef(null)
    const estado = useRef(null)
    const cliente = useRef(null)
    const juegos = useRef(null)
    const precio = useRef(null)

    const dispatch = useDispatch()

    const usuarioCarga = useSelector(state => state.spinner.loading);
    const listaConsolas = useSelector(state => state.consola.consolas);
    const listaEstados = useSelector(state => state.estado.estados);
    const listaJuegos = useSelector(state => state.juego.juegos);

    const [botonAgregar, setBotonAgregar] = useState(false);
    // const [mensajeErrorJuego, setMensajeErrorJuego] = useState(null)
    // const [errorJuego, setErrorJuego] = useState(false)
    const [mensajeErrorAgregar, setMensajeErrorAgregar] = useState(null)
    const [errorAgregar, setErrorAgregar] = useState(false)
    const [mensajeExitoAgregar, setMensajeExitoAgregar] = useState(null)
    const [exitoAgregar, setExitoAgregar] = useState(false)

    useEffect(() => {
        dispatch(spinnerCargando(true));
      fetch(`https://my-json-server.typicode.com/mnacimento/gamesServer/consoles`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
      .then(data => {
        if(data) {
            dispatch(cargarConsolas(data))
        }
        dispatch(spinnerCargando(false));
      }).catch((error) => {
        dispatch(spinnerCargando(false));
      })

      fetch(`https://my-json-server.typicode.com/mnacimento/gamesServer/states`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
      .then(data => {
        if(data) {
            dispatch(cargarEstados(data))
        }
        dispatch(spinnerCargando(false));
      }).catch((error) => {
        dispatch(spinnerCargando(false));
      })

      fetch(`https://my-json-server.typicode.com/mnacimento/gamesServer/sales`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
      .then(data => {
        if(data) {
            dispatch(cargarVentas(data))
        }
        dispatch(spinnerCargando(false));
      }).catch((error) => {
        dispatch(spinnerCargando(false));
      })
    }, []);

    const recargarJuegos = () => {
        dispatch(spinnerCargando(true));

        const params = {
            console: consola.current.value,
        }
        fetch(`https://my-json-server.typicode.com/mnacimento/gamesServer/games?` + new URLSearchParams(params), {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
          },
        })
        .then(response => response.json())
        .then(data => {
          if(data) {
              dispatch(cargarJuegos(data))
          }
          dispatch(spinnerCargando(false));
        }).catch((error) => {
          dispatch(spinnerCargando(false));
        })
  
    }

    const datosCompletos = e => {
        cliente.current.value && estado.current.value && consola.current.value && juegos.current.value && precio.current.value ?
            setBotonAgregar(true) : setBotonAgregar(false) 
    }

const agregarNuevaVenta = () => {
    dispatch(spinnerCargando(true));
    const bodyData = {
        client: cliente.current.value,
        state: Number(estado.current.value),
        console: Number(consola.current.value),
        game: Number(juegos.current.value),
        price: Number(precio.current.value),
    }
    fetch('https://my-json-server.typicode.com/mnacimento/gamesServer/sales/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(data => {
        if(data) {
            dispatch(agregarVenta(data));
            setErrorAgregar(false);
            setExitoAgregar(true);
            setMensajeExitoAgregar("Venta realizada con exito")
            cliente.current.value = '';
            estado.current.value = '';
            consola.current.value = '';
            juegos.current.value = '';
            precio.current.value = '';
        }else{
            setErrorAgregar(true);
            setMensajeErrorAgregar("Error en el proceso de venta")
            setExitoAgregar(false);
        }
        dispatch(spinnerCargando(false));
    }).catch(error => {
        setErrorAgregar(true);
        setExitoAgregar(false);
        setMensajeErrorAgregar('Fallo conexion con el servidor en agregar')
        dispatch(spinnerCargando(false));
    })
}
    
  return (
    <div id="agregarVenta" className="row justify-content-center align-items-center">
        <h2>Agregar una venta</h2>

        <label htmlFor="nombre">Cliente</label>
        <input type="text" id='nombre' placeholder='Ingrese el nombre' ref={cliente} onChange={datosCompletos}/>

        <label htmlFor="consola">Consola</label>
        <select name="consola" id="consola" ref={consola} onChange={recargarJuegos}>
            <option value="">seleccione una consola</option>
            {listaConsolas.map(cons => <option key={cons.id} value={cons.id}>{cons.name}</option>)}
        </select>
        
        <label htmlFor="juego">Juegos</label>
        <select name="juego" id="juego" ref={juegos} onChange={datosCompletos}> 
            <option value="">seleccione un juego</option>
            {listaJuegos.map(jueg => <option key={jueg.id} value={jueg.id}>{jueg.name}</option>)}
        </select>

        <label htmlFor="precio">Precio</label>
        <input type="text" id='precio' placeholder='Ingrese el nombre' ref={precio} onChange={datosCompletos}/>

        <label htmlFor="estado">Estado</label>
        <select name="estado" id="estado" ref={estado} onChange={datosCompletos}>
            <option value="">seleccione un estado</option>
            {listaEstados.map(est => <option key={est.id} value={est.id}>{est.name}</option>)}
        </select>

        <button type='button' className='btn btn-primary mt-3' disabled={!botonAgregar} onClick={agregarNuevaVenta}>Agregar</button>
        {usuarioCarga ? <Spinner/> : null}
        { errorAgregar ? <p>{mensajeErrorAgregar}</p>  : null}
        { exitoAgregar ? <p>{mensajeExitoAgregar}</p>  : null}
    </div>
  )
}

export default AgregarVenta