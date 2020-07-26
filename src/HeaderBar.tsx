import React from 'react'

interface HeaderBarProps {

}

const HeaderBar: React.SFC<HeaderBarProps> = (props: HeaderBarProps) => {
  return (
    <nav>
      <div className="navLeft">
        <h1>LandGate</h1>
        <button>View Map</button>
        <button>Lease/Sell</button>
        <button>Buy</button>
        <button>Appraise</button>
        <button>About</button>
        <button>Help</button>
      </div>
      <div className="navRight">
        <a className="telephoneLink" href="tel:855-867-3876">855-867-3876</a>
        <button>Login</button>
        <button>Sign Up</button>
      </div>
    </nav>
  )
}

export default HeaderBar