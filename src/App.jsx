
import './App.css'
import NavBarComponent from './components/NavBarComponent/NavBarComponent'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'


function App() {
  

  return (
    <div style={{width:'100vw', height: '100vh'}} className='bg-white dark:bg-gray-900'>
    
      <NavBarComponent/>
      <ItemListContainer greeting='Hola bienvenidos a mi tienda'/>
    
    </div>
  )
}

export default App
