import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const ListingSnippet: React.SFC<ListingSnippetProp> = (props: ListingSnippetProp) => {
  
  const infoIcon = (<img className="info-icon" src="assets/icons/iconmonstr-info-5-orange.svg" alt="(info)"/>)

  return (
    <>
      <div className="list-data-label">
        {props.label}
        {infoIcon}
      </div>
      <div className="list-data">
        {props.data}
      </div>
    </>
  )
}

export default ListingSnippet

