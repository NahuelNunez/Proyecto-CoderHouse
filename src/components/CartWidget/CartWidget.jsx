import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
const CartWidget = () => {
  return (
    <div className='text-white font-semibolder hover:cursor-pointer'><FontAwesomeIcon icon={faCartShopping} style={{color: "#005cfa"}} className='px-2'/>3</div>
  )
}

export default CartWidget