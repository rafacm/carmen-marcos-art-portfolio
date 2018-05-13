import React, { Fragment, Component } from 'react'
import { withSiteData, withRouteData, Link } from 'react-static'
import { Container, Row, Col } from 'reactstrap'
import map from 'lodash/map'
import chunk from 'lodash/chunk'
import ArtworksGrid from '../components/ArtworksGrid';

class HomePage extends Component {
  render () {
    const meshApi = this.props.meshApi
    const meshProject = this.props.meshProject
    const node = this.props.node
    // console.log('node: ', node)
    const featuredArtworks = this.props.featuredArtworks
    console.log('HomePage > featuredArtworks: ', featuredArtworks)
    // TODO: clean up path access
    const artworksToShow = featuredArtworks.node.children.elements[0].fields.artworks
    console.log('HomePage > artworksToShow: ', artworksToShow)

    return (
      <ArtworksGrid artworks={artworksToShow} />
    )
  }
}

export default withSiteData(withRouteData(HomePage))
