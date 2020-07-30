import React from 'react'
import ListingCard from './ListingCard'
import { useSelector } from 'react-redux'
import { deepCopy } from './util'

//This component is the Nearby Listings section, left of the map.
const NearbyListings: React.SFC = () => {

  //`nearbyResults` is the sorted search results excluding the first (focused on map)
  const nearbyResults: Array<string> = useSelector( (state: AppState) => { 
    const resultCopy = deepCopy(state.searchResults)
    resultCopy.shift()
    return resultCopy
  })

  //`locations` is the complete set of locations in state
  const locations: StateLocationSet = useSelector( (state: AppState) => state.locations )

  //`listings` is the rendering nearbyResults
  const listings = nearbyResults.map( (locID) => {
    return (
      <ListingCard key={locations[locID].name+locations[locID].location} loc={locations[locID]}/>
    )
  })

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

export default NearbyListings