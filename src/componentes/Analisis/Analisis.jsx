import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement, 
    LineElement
  );

const Analisis = () => {

    const listaVentas = useSelector(state => state.venta.ventas);
    const listaConsolas = useSelector(state => state.consola.consolas);


    const listaConsolasFinalPrueba = listaConsolas.map(cons => ({
        consoleName: cons.name,
        cantidadVentas: listaVentas.filter(vent => vent.console === cons.id).length
    }))
  return (
    <div>
        <h2>Analisis de Ventas</h2>

        <Bar
            options={{
                responsive: true,
                plugins: {
                    legend: {
                    position: 'top',
                    },
                    title: {
                    display: true,
                    text: 'Consolas',
                    },
                },
                }}
                data={{
                    labels: listaConsolasFinalPrueba.map(item => item.consoleName),
                    datasets:[
                        {
                            label:'Cantidad de ventas por consola',
                            data: listaConsolasFinalPrueba.map(item => item.cantidadVentas),
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        }
                    ]
                }}
        />
    </div>
  )
}

export default Analisis