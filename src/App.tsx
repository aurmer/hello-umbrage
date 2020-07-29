import React, { useEffect } from 'react'
import HeaderBar from './HeaderBar'
import MapApp from './MapApp'
import './App.css'
import { useDispatch } from 'react-redux'

function App() {

  const dispatch = useDispatch()

  useEffect( ()=> {
    dispatch({type: "POPULATE_LOCATIONS"})
  })

  return (
    <div className="app">
      <HeaderBar />
      <MapApp />
    </div>
  );
}

export default App
