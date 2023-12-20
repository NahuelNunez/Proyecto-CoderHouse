import { useEffect,useState } from "react";
import { getProductosById } from "../services";
import {useParams} from 'react-router-dom'
import { ItemDetail } from "../components/ItemDetail";
export const ItemDetailContainer = () => {
 const [item,setItem]=useState({})
const {id} =useParams()
useEffect(() => {
    getProductosById(Number(id)).then((res) =>setItem(res)).catch((error)=>console.log(error))
    
}, [id]);

  return (
    <div className="flex items-center justify-center dark:bg-gray-900 w-screen h-screen">
   {item && <ItemDetail item={item}/>}
    </div>
  
  )
}
