import React from 'react'

const ListingSnippet: React.SFC<ListingSnippetProps> = (props: ListingSnippetProps) => {
  
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

