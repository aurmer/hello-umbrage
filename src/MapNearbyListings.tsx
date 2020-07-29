import React from 'react'
import ListingContainer from './ListingContainer'
import { useSelector } from 'react-redux'

const MapNearbyListings: React.SFC = () => {

  const results: Array<string> = useSelector( (state: AppState) => state.searchResults )
  const locations: {[key: string]: StateLocation } = useSelector( (state: AppState) => state.locations )
  // const dispatch = useDispatch()

  const listings = results.map((locID) => {
    const pricePerAcre: number = Math.round(locations[locID].price / locations[locID].netAcreage)
    return (<ListingContainer key={locations[locID].name+locations[locID].location}
                              name={locations[locID].name}
                              price={locations[locID].price}
                              active={locations[locID].active}
                              address={locations[locID].streetAddress}
                              acreage={locations[locID].netAcreage}
                              location={locations[locID].location}
                              favorite={locations[locID].favorite}
                              ppa={pricePerAcre}/>)
  }
  )

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