import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


const CartWidget = () => {

 const functionAdd = () =>{
  //QUE PONGO ACA
 }
  return (
    <div className='text-white font-semibolder hover:cursor-pointer flex gap-2'><FontAwesomeIcon icon={faCartShopping} size='xl' style={{color: "#FFFF"}} className='px-2'/>
    <p className='font-semibold text-base relative right-2 top-0 rounded-full bg-red-700 border border-red-700 px-2' >2</p>
    
    <div className='px-2'><button onClick={functionAdd} className='text-cyan-500 font-semibold border border-sky-500 p-1 text-sm hover:text-white transition duration-0.5 hover:bg-slate-900  rounded-lg'>Agregar al carrito</button></div>
    </div>
    


  )
}

export default CartWidget