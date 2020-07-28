import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ListingContainer from './ListingContainer'

const MapNearbyListings: React.SFC = () => {

  // const greeting: string = useSelector( (state: AppState) => state.greeting )
  // const dispatch = useDispatch()
  
  const infoIcon = (<img className="info-icon" src="assets/icons/iconmonstr-info-5-orange.svg" alt="(info)"/>)

  return (
    <section className="listings">
      <h3 className="map-aside-section-title">Nearby Listings</h3>
      <div className="listings-container">
        <ListingContainer/>
        <ListingContainer/>
        <ListingContainer/>
        <ListingContainer/>
        <ListingContainer/>
        <div className="listing-spacer"/>
      </div>
    </section>
  )
}

export default MapNearbyListings