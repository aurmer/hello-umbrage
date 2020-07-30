import React from 'react'
import { useSelector } from 'react-redux'

const MapSearchResults: React.SFC = () => {
  
  //`loc` is the first sorted search result. This matches the focused icon on the map
  const loc: StateLocation = useSelector( (state: AppState) => state.locations[state.searchResults[0]] )

  const cardContent = (loc) ?
  (
    <>
      <img className="search-result-img" src={`assets/images/${loc.image}`} alt="property"/>
      <div className="search-result-info">
        <h4 className="search-result-name">{loc.name}</h4>
        <p className="search-result-location">{loc.location}</p>
        <p className="search-result-list-question">Would you like to list property in this area?</p>
        <div className="search-result-button-container">
          <button className="maroon-bkgd">Yes</button>
          <button className="grey-bkgd">Need Help?</button>
        </div>
      </div>
    </>
  ) :
  (
    <></>
  )

  return (
    <section className="search-results">
      <h3 className="map-aside-section-title">Search Results</h3>
      <div className="search-result-card">
        {cardContent}
      </div>
    </section>
  )
}

export default MapSearchResults