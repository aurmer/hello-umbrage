import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const MapApp: React.SFC = () => {

  const greeting: string = useSelector( (state: AppState) => state.greeting )
  const dispatch = useDispatch()
   

  return (
    <>
    <button onClick={()=>dispatch({type:"SEARCH"})}>{greeting}</button>
    </>
  )
}

export default MapApp