import React from 'react'
import ListingSnippet from './ListingSnippet'
import { useDispatch } from 'react-redux'
import { formatPrice, formatNumberAsString } from './util'

const ListingContainer: React.SFC<ListingInfoProps> = (props: ListingInfoProps) => {

  const dispatch = useDispatch()

  String.prototype.reverse = function () {
    return this.split('').reverse().join('')
  }

  const formattedPrice = formatPrice(props.price)

  function handleFavClick (e: React.MouseEvent<HTMLImageElement, MouseEvent>): void {
    dispatch({type:"TOGGLE_FAVORITE",value:e.currentTarget.id})
  }

  function pickStar (): string {
    return (props.favorite) ? "assets/icons/filled-star.svg" : "assets/icons/empty-star.svg"
  }
  
    return (
    <>
      <div className="listing-card">
        <div className="listing-card-label">Lot For Sale</div>
        <div className="favorite-listing">
          <img id={props.name+props.address} className="listing-star-icon" src={pickStar()} alt="favorite" onClick={handleFavClick}/>
        </div>
        <div className="listing-info">
          <div className="listing-col">
            <div className="list-name">{props.name}</div>
            <div className="list-price">{formattedPrice}</div>
            <div className="active-badge" style={(!props.active) ? {display:"none"} : {}}>
              <div className="green-dot"/>
              Active
            </div>
          </div>
          <div className="listing-col">
            <ListingSnippet label="Street Address" data={props.address}/>
            <ListingSnippet label="Net Mineral Acreage" data={formatNumberAsString(props.acreage)}/>
          </div>
          <div className="listing-col">
            <ListingSnippet label="Location" data={props.location}/>
            <ListingSnippet label="Price Per Acre" data={formatPrice(props.ppa)}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListingContainer

