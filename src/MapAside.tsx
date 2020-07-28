import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MapSearchBar from './MapSearchBar'
import MapSearchResults from './MapSearchResults'
import MapNearbyListings from './MapNearbyListings'

const MapAside: React.SFC = () => {

  // const greeting: string = useSelector( (state: AppState) => state.greeting )
  // const dispatch = useDispatch()
   

  return (
    <aside className="map-aside">
      <MapSearchBar />
      <MapSearchResults />
      <MapNearbyListings />
    </aside>
  )
}

export default MapAside