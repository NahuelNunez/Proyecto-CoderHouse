import CartWidget from "../CartWidget/CartWidget"


const NavBarComponent = () => {
  return (
    <div className="flex items-center w-full px-4 justify-around bg-slate-600">
  <a href="#Home" className="text-white font-semibold text-x1 p-2">Home</a>
  <a href="#About" className="text-white font-semibold text-x1 p-2">About</a>
  <a href="#Contact" className="text-white font-semibold text-x1 p-2">Contact</a>
  
<CartWidget/>

    </div>
  )
}

export default NavBarComponent