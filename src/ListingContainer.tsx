import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ListingSnippet from './ListingSnippet'

const ListingContainer: React.SFC = () => {

  // const greeting: string = useSelector( (state: AppState) => state.greeting )
  // const dispatch = useDispatch()
  
    return (
    <>
      <div className="listing-card">
        <div className="listing-card-label">Lot For Sale</div>
        <div className="favorite-listing">
          <img className="listing-star-icon" src="assets/icons/filled-star.svg"/>
        </div>
        <div className="listing-info">
          <div className="listing-col">
            <div className="list-name">Rock Ranch #2</div>
            <div className="list-price">$2,000,000</div>
            <div className="active-badge">
              <div className="green-dot"/>
              Active
            </div>
          </div>
          <div className="listing-col">
            <ListingSnippet label="Street Address" data="66,440,961"/>
            <ListingSnippet label="Net Mineral Acreage" data="26,993"/>
          </div>
          <div className="listing-col">
            <ListingSnippet label="Location" data="Powder River Basin"/>
            <ListingSnippet label="Price Per Acre" data="$563"/>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListingContainer

