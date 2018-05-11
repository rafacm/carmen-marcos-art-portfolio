import React from 'react'
import { Link } from 'react-static'

const Footer = () => (
  <footer className="small">
    <div className="container">
      <div id="bottom-space" />
      <p className="float-left">
        <Link to="mailto:info@carmen-marcos.art?subject=Carmen%20Marcos%20Art">info@carmen-marcos.art</Link>
      </p>
      <p className="float-right">© 2018 Carmen Marcos</p>
    </div>
  </footer>
)

export default Footer
