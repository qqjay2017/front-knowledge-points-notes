import { useContext } from 'react'
import RouterContext from '../react-router/RouterContext'

export default  function useParams(){

    const value = useContext(RouterContext)
    console.log(value)
}