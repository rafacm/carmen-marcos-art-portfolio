import React from 'react'
import { RouteData, Head } from 'react-static'
import Navigation from '../components/Navigation'

const Header = () => (
  <RouteData render={({ title, node }) => (
    <div>
      <Head>
        <title>
          {`${title ? `Carmen Marcos - ${title}` : 'Carmen Marcos'}`}
        </title>
        <meta name="mesh-node-id" content={node.uuid} />
      </Head>
      <div className="container">
        <Navigation />
      </div>
    </div>)
  } />
)
export default Header
