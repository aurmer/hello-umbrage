import React from 'react'
import PageLink from './PageLink'

//This component is the header nav bard of the site
const HeaderBar: React.SFC<HeaderBarProps> = (props: HeaderBarProps) => {
  const activePage = props.activePageLink

  return (
    <nav className="upper-navbar">
      <div className="nav-left">
        <h1 className="page-title">LandGate</h1>
        <PageLink href="#" activePage={activePage} name="View Map"/>
        <PageLink href="#" activePage={activePage} name="Lease / Sell"/>
        <PageLink href="#" activePage={activePage} name="Buy"/>
        <PageLink href="#" activePage={activePage} name="Appraise"/>
        <PageLink href="#" activePage={activePage} name="About"/>
        <PageLink href="#" activePage={activePage} name="Help"/>
      </div>
      <div className="nav-right">
        <address><a className="telephone-link" href="tel:855-867-3876">855-867-3876</a></address>
        <div className="account-button-grp" >
          <PageLink href="#" activePage={activePage} name="Login"/>
          <PageLink href="#" activePage={activePage} name="Sign Up"/>
        </div>
      </div>
    </nav>
  )
}

export default HeaderBar