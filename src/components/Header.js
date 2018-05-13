import React from 'react'
import { RouteData, Head } from 'react-static'
import Navigation from '../components/Navigation'

const Header = () => (
  <RouteData render={({ node }) => (
    <div>
      <Head>
        <title>
          {`${node.displayName ? `Carmen Marcos - ${node.displayName}` : 'Carmen Marcos'}`}
        </title>
      </Head>
      <div className="container">
        <Navigation />
      </div>
    </div>)
  } />
)
export default Header
