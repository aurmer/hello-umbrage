import React from 'react'

//This component is one title and datum about a lot listing
const ListingSnippet: React.SFC<ListingSnippetProps> = (props: ListingSnippetProps) => {

  return (
    <>
      <div className="list-data-label">
        {props.label}
        <img className="info-icon" src="assets/icons/iconmonstr-info-5-orange.svg" alt="(info)"/>
      </div>
      <div className="list-data">
        {props.data}
      </div>
    </>
  )
}

export default ListingSnippet