import React, { useEffect } from 'react'
import HeaderBar from './HeaderBar'
import './App.css'
import { useDispatch } from 'react-redux'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import NearbyListings from './NearbyListings'
import MapEmbed from './MapEmbed'

function App() {

  const dispatch = useDispatch()

  //loads dummy data into `locations` state
  useEffect( ()=> {
    dispatch({type: "POPULATE_LOCATIONS"})
  })

  return (
    <div className="app">
      <HeaderBar activePageLink="Lease / Sell" />
      <div className="map-app">
        <aside className="map-aside">
          <SearchBar />
          <SearchResults />
          <NearbyListings />
        </aside>
        <MapEmbed />
      </div>
    </div>
  );
}

export default App