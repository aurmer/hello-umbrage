import React from 'react'

interface HeaderBarProps {

}

const HeaderBar: React.SFC<HeaderBarProps> = (props: HeaderBarProps) => {
  return (
    <nav className="upper-navbar">
      <div className="nav-left">
        <h1 className="page-title">LandGate</h1>
        <a href="/">View Map</a>
        <a href="/">Lease / Sell</a>
        <a href="/">Buy</a>
        <a href="/">Appraise</a>
        <a href="/">About</a>
        <a href="/">Help</a>
      </div>
      <div className="nav-right">
        <address><a className="telephone-link" href="tel:855-867-3876">855-867-3876</a></address>
        <div className="account-button-grp" >
          <a href="/">Login</a>
          <a href="/">Sign Up</a>
        </div>
      </div>
    </nav>
  )
}

export default HeaderBar