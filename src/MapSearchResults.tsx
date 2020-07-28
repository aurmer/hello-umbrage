import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const MapSearchResults: React.SFC = () => {

  // const greeting: string = useSelector( (state: AppState) => state.greeting )
  // const dispatch = useDispatch()
   

  return (
    <section className="search-results">
      <h3 className="map-aside-section-title">Search Results</h3>
      <div className="search-result-card">
        <img className="search-result-img"/>
        <div className="search-result-info">
          <h4 className="search-result-name">Toro Field Caesar TX</h4>
          <p className="search-result-location">Bee County, TX / Permian Basin</p>
          <p className="search-result-list-question">Would you like to list property in this area?</p>
          <div className="search-result-button-container">
            <button className="maroon-bkgd">Yes</button>
            <button className="grey-bkgd">Need Help?</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapSearchResults