

export const ItemDetail = ({item}) => {
  return (
    <div className="w-64 border-2 border-sky-600 flex items-center flex-col justify-center bg-slate-700 rounded-lg ">
    <img src={item.imagen} style={{width:'150px', height:'200px'}}/>
    <div className="flex flex-col items-center bg-slate-950 w-full">
    <h3 className="font-semibold text-white">{item.titulo}</h3>
    <h3 className="font-semibold text-white">Precio: {item.precio}💲</h3>
    <h3 className="font-semibold text-white">Cantidad: {item.stock}</h3>
    <h3 className="font-semibold text-white">Categoria: {item.category}</h3>
    </div>
   </div>
  )
}
