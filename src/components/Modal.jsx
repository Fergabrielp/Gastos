import { useState, useEffect } from 'react'
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, editarGasto}) => {

    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState('')

    useEffect(() => {
        if (Object.keys(editarGasto).length > 0){
         setNombre(editarGasto.nombre)
         setCantidad(editarGasto.cantidad)
         setCategoria(editarGasto.categoria)
        }
      }, [])

    const ocultarModal = () => {
        
        setAnimarModal(false)

        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault()

        if ([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 3000)
            return
        }

        guardarGasto({nombre, cantidad, categoria})

    }

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img 
                    src={CerrarBtn} 
                    alt="Cerrar boton" 
                    onClick={ocultarModal}
                />
            </div>

            <form 
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
            >
                <legend>Nuevo Gasto</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className='campo'>
                    <label htmlFor="nombre">Nombre de Gasto</label>
                    <input
                        id="nombre" 
                        type="text"
                        placeholder='Ej: Alquiler'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id="cantidad" 
                        type="number"
                        placeholder='Ej: $1000'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                    <option value="">--Seleccione--</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option> 
                    <option value="gastos">Gastos</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>

                    </select>
                </div>

                <input 
                    type="submit" 
                    value="A??adir Gasto"
                />

            </form>
            
        </div>
    )
}

export default Modal
