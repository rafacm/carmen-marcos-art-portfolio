import React, { Fragment, Component } from 'react'
import { withSiteData, withRouteData, Link } from 'react-static'
import map from 'lodash/map'

class HomePage extends Component {
  render () {
    const node = this.props.node
    console.log('node: ', node)
    const data = this.props.data
    const featuredArtworks = data.node.children.elements[0].fields.artworks
    console.log('featuredArtworks: ', featuredArtworks)
    map(featuredArtworks, (artwork) => {
      console.log('artwork: ', artwork)
    })

    return (
      <Fragment>
        <h1>Hello!</h1>
        <div>
          {
            map(featuredArtworks, (artwork) => (
                <img key={artwork.uuid} src={`http://cms.casadelhuerto.com/api/v1/carmen-marcos-art/nodes/${artwork.uuid}/binary/image?w=300`}/>
              )
            )
          }
        </div>
      </Fragment>
    )
  }
}

export default withRouteData(HomePage)

