import React from 'react'

//This component is a link in top <nav> of page
const PageLink: React.SFC<PageLinkProps> = (props: PageLinkProps) => {
  //'active' class is conditional on activePage prop
  const clasList: string = (props.activePage === props.name) ? "active" : ""
  
  return (
    <a href={props.href} className={clasList}>
      {props.name}
    </a>
  )
}

export default PageLink