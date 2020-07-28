import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const MapSearchResults: React.SFC = () => {

  // const greeting: string = useSelector( (state: AppState) => state.greeting )
  // const dispatch = useDispatch()
   

  return (
    <section className="searchResults">
      <h3 className="mapAsideSectionTitle">Search Results</h3>
      <div className="searchResultCard">
        <img className="searchResultImg"/>
        <div className="searchResultInfo">
          <h4 className="searchResultName">Toro Field Caesar TX</h4>
          <p className="searchResultLocation">Bee County, TX / Permian Basin</p>
          <p className="searchResultListQuestion">Would you like to list property in this area?</p>
          <div className="searchResultButtonContainer">
            <button className="maroonBk">Yes</button>
            <button className="greyBk">Need Help?</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapSearchResults