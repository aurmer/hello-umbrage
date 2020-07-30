import React from 'react'


const PageLink: React.SFC<PageLinkProps> = (props: PageLinkProps) => {
  return (
    <a href={props.href} className={(props.active === props.name) ? "active" : ""}>
      {props.name}
    </a>
  )
}

export default PageLink