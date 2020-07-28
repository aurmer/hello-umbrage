import React from 'react'

interface HeaderBarProps {

}

const HeaderBar: React.SFC<HeaderBarProps> = (props: HeaderBarProps) => {
  return (
    <nav className="upperNavbar">
      <div className="navLeft">
        <h1 className="title">LandGate</h1>
        <a>View Map</a>
        <a>Lease / Sell</a>
        <a>Buy</a>
        <a>Appraise</a>
        <a>About</a>
        <a>Help</a>
      </div>
      <div className="navRight">
        <address><a className="telephoneLink" href="tel:855-867-3876">855-867-3876</a></address>
        <div className="accountButtonGrp" >
          <a>Login</a>
          <a>Sign Up</a>
        </div>
      </div>
    </nav>
  )
}

export default HeaderBar