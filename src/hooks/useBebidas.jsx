import { useContext } from 'react'
import BeidasContext from '../context/BebidasProvider'



const useBebidas = () => {
  return useContext(BeidasContext)
}

export default useBebidas