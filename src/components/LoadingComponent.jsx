
import { ring } from 'ldrs'

ring.register()
const LoadingComponent = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
    <div className="flex justify-center items-center "><l-ring
    size="50"
    stroke="5"
    bg-opacity="0"
    speed="1.5" 
    color="cyan" 
    
  ></l-ring></div>
  </div>
  )
}

export default LoadingComponent