import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import { generarId } from './components/Funciones'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import ListadoGastos from './components/ListadoGastos'


function App() {

  const [gastos, setGastos] = useState([])
  const [presupuesto, setPresupuesto] = useState(0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [editarGasto, setEditarGasto] = useState({})

  useEffect(() => {
    if (Object.keys(editarGasto).length > 0){
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  }, [editarGasto])

  const handleNuevoGasto = () => {
    setModal(true)
    setEditarGasto({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {
    
    gasto.id = generarId()
    gasto.fecha = Date.now()
    setGastos([...gastos, gasto])

    setAnimarModal(false)
    setTimeout(() => {
        setModal(false)
    }, 500);
  }
  
  return (
    <div className={modal && 'fijar'}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto &&(
        <>
          <main>
            <ListadoGastos
              gastos={gastos}
              setEditarGasto={setEditarGasto}
            />
          </main>

          <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto} 
              alt="Icono nuevo gasto" 
              onClick={handleNuevoGasto}  
            />
          </div>
        </>
      )}

      {modal && <Modal
                  setModal={setModal}
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  editarGasto={editarGasto}
                />}  
      
    </div>
  )
}

export default App
