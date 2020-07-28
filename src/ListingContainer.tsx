import React from 'react'
import ListingSnippet from './ListingSnippet'

const ListingContainer: React.SFC<ListingInfoProps> = (props: ListingInfoProps) => {

  // const greeting: string = useSelector( (state: AppState) => state.greeting )
  // const dispatch = useDispatch()

  String.prototype.reverse = function () {
    return this.split('').reverse().join('')
  }

  function formatPrice (price: string): string {
    return '$' + price.reverse()
                      .replace(/(\d{3})/g,'$1,')
                      .reverse()
                      .replace(/^,/,'')
  }

  const formattedPrice = formatPrice(props.price.toString())
  
    return (
    <>
      <div className="listing-card">
        <div className="listing-card-label">Lot For Sale</div>
        <div className="favorite-listing">
          <img className="listing-star-icon" src="assets/icons/filled-star.svg" alt="favorite"/>
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

