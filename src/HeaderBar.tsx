import React from 'react'

interface HeaderBarProps {

}

const HeaderBar: React.SFC<HeaderBarProps> = (props: HeaderBarProps) => {
  return (
    <nav className="upper-navbar">
      <div className="nav-left">
        <h1 className="page-title">LandGate</h1>
        <a>View Map</a>
        <a>Lease / Sell</a>
        <a>Buy</a>
        <a>Appraise</a>
        <a>About</a>
        <a>Help</a>
      </div>
      <div className="nav-right">
        <address><a className="telephone-link" href="tel:855-867-3876">855-867-3876</a></address>
        <div className="account-button-grp" >
          <a>Login</a>
          <a>Sign Up</a>
        </div>
      </div>
    </nav>
  )
}

export default HeaderBar