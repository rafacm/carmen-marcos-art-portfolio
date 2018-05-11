import React, { Fragment, Component } from 'react'
import { withSiteData, withRouteData, Link } from 'react-static'
import { Container, Row, Col } from 'reactstrap'
import map from 'lodash/map'
import chunk from 'lodash/chunk'
import ArtworkCard from '../components/ArtworkCard'

class HomePage extends Component {
  render () {
    const node = this.props.node
    console.log('node: ', node)
    const data = this.props.data
    const featuredArtworks = data.node.children.elements[0].fields.artworks
    console.log('featuredArtworks: ', featuredArtworks)
    const rows = chunk(featuredArtworks, 4)
    console.log('rows', rows)
    map(rows, (row, rowNumber) => {
      console.log('  index: ', rowNumber)
      console.log('  row: ', row)
      map(row, (artworkItem, index) => {
        console.log('    artworkItem: ', artworkItem)
        console.log('    index: ', index)
      })
    })
    return (
      <Container className="album"> {
        map(rows, (row, rowNumber) => (
          <Row key={rowNumber}> {
          map(row, (artworkItem, index) => (
            <Col key={index} className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
              <img className="img-fluid rounded" 
                    src={`http://cms.casadelhuerto.com/api/v1/carmen-marcos-art/nodes/${artworkItem.uuid}/binary/image?w=300&h=300&crop=fp`}
                    alt={artworkItem.fields.title} 
                    title={artworkItem.fields.title} />
            </Col>
          ))}
          </Row>
        ))}
      </Container>
    )
  }
}

export default withRouteData(HomePage)

