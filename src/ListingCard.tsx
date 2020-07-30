import React from 'react'
import ListingSnippet from './ListingSnippet'
import { useDispatch } from 'react-redux'
import { formatPrice, formatNumberAsString } from './util'

//This component is the property listing card
const ListingCard: React.SFC<ListingInfoProps> = (props: ListingInfoProps) => {

  const dispatch = useDispatch()

  //clicking on fav star will toggle favorite prop in store
  function handleFavClick (id: string,e: React.MouseEvent<HTMLImageElement, MouseEvent>): void {
    e.stopPropagation()
    dispatch({type:"TOGGLE_FAVORITE",value:id})
  }

  //clicking on card selects the listing on map
  function handleListingClick (id: string): void {
    dispatch({type:"SELECT_RESULT",value:id})
  }

  const starIcon = (props.loc.favorite) ? "assets/icons/filled-star.svg" : "assets/icons/empty-star.svg"
  
    return (
    <>
      <div className="listing-card" onClick={()=>handleListingClick(props.loc.name+props.loc.streetAddress)}>
        <div className="listing-card-label">Lot For Sale</div>
        <div className="favorite-listing">
          <img className="listing-star-icon" src={starIcon} alt="favorite" onClick={(e)=>handleFavClick(props.loc.name+props.loc.streetAddress,e)}/>
        </div>
        <div className="listing-info">
          <div className="listing-col">
            <div className="list-name">{props.loc.name}</div>
            <div className="list-price">{formatPrice(props.loc.price)}</div>
            <div className="active-badge" style={(!props.loc.active) ? {display:"none"} : {}}>
              <div className="green-dot"/>
              Active
            </div>
          </div>
          <div className="listing-col">
            <ListingSnippet label="Street Address" data={props.loc.streetAddress}/>
            <ListingSnippet label="Net Mineral Acreage" data={formatNumberAsString(props.loc.netAcreage)}/>
          </div>
          <div className="listing-col">
            <ListingSnippet label="Location" data={props.loc.location}/>
            <ListingSnippet label="Price Per Acre" data={formatPrice(Math.round(props.loc.price/props.loc.netAcreage))}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListingCard