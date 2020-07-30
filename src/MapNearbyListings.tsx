import React from 'react'
import ListingContainer from './ListingContainer'
import { useSelector } from 'react-redux'

const MapNearbyListings: React.SFC = () => {

  const results: Array<string> = useSelector( (state: AppState) => state.searchResults )
  const locations: {[key: string]: StateLocation } = useSelector( (state: AppState) => state.locations )

  const listings = results.reduce((acc: Array<JSX.Element>,locID,idx) => {
    if(idx > 0) {
      acc.push((<ListingContainer key={locations[locID].name+locations[locID].location} loc={locations[locID]}/>))
      return acc
    }
    return acc
  },[])

  return (
    <section className="listings">
      <h3 className="map-aside-section-title">Nearby Listings</h3>
      <div className="listings-container">
        {listings}
        <div className="listing-spacer"/>
      </div>
    </section>
  )
}

export default MapNearbyListings