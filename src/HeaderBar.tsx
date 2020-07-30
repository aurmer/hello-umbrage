import React from 'react'
import PageLink from './PageLink'

const HeaderBar: React.SFC<HeaderBarProps> = (props: HeaderBarProps) => {
  const active = props.activePageLink

  return (
    <nav className="upper-navbar">
      <div className="nav-left">
        <h1 className="page-title">LandGate</h1>
        <PageLink href="#" active={active} name="View Map"/>
        <PageLink href="#" active={active} name="Lease / Sell"/>
        <PageLink href="#" active={active} name="Buy"/>
        <PageLink href="#" active={active} name="Appraise"/>
        <PageLink href="#" active={active} name="About"/>
        <PageLink href="#" active={active} name="Help"/>
      </div>
      <div className="nav-right">
        <address><a className="telephone-link" href="tel:855-867-3876">855-867-3876</a></address>
        <div className="account-button-grp" >
          <PageLink href="#" active={active} name="Login"/>
          <PageLink href="#" active={active} name="Sign Up"/>
        </div>
      </div>
    </nav>
  )
}

export default HeaderBar