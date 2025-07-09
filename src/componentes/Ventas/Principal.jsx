import React from 'react'
import AgregarVenta from './AgregarVenta'
import Analisis from '../Analisis/Analisis'

const Principal = () => {
  return (
    <div id="dashboard" className="container d-flex flex-column align-items-center mb-5">
      <h1 className="mb-3">Venta</h1>
      <div className="col-6 mt-5">
        <AgregarVenta />
      </div>
      <div className="col-6 mt-5">
        <Analisis />
      </div>
    </div>
  )
}

export default Principal