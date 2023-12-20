import data from '../data/products.json'
export const getProductos = () => {
return new Promise ((resolve) => {
    resolve(data)
})
}

export const getProductosById = (id) => {
    return new Promise ((res,error) =>{
        const item= data.find((el)=> el.id===id)

        if(item){
            res(item)
        }else{error({error: 'No se encontro el producto seleccionado'})}
        
    })
    }
