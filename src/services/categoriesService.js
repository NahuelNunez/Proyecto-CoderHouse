import data from '../data/products.json'

export const getCategory = (category) =>{
  return data.filter((cate)=> cate.category===category)

     
  
  
}
