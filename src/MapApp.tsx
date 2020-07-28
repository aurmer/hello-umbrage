import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MapAside from './MapAside'
import MapEmbed from './MapEmbed'

const MapApp: React.SFC = () => {

  // const greeting: string = useSelector( (state: AppState) => state.greeting )
  // const dispatch = useDispatch()
   

  return (
    <section className="mapApp">
      <MapAside />
      <MapEmbed />
    </section>
  )
}

export default MapApp