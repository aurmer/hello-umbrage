import React from 'react'
import ListingContainer from './ListingContainer'
import { useSelector } from 'react-redux'

const MapNearbyListings: React.SFC = () => {

  const results: Array<LotLocation> = useSelector( (state: AppState) => state.searchResults )
  // const dispatch = useDispatch()

  const listings = results.map((loc) => {
    const pricePerAcre: number = Math.round(loc.price / loc.netAcreage)
    return (<ListingContainer key={loc.name+loc.location}
                              name={loc.name}
                              price={loc.price}
                              active={loc.active}
                              address={loc.streetAddress}
                              acreage={loc.netAcreage}
                              location={loc.location}
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