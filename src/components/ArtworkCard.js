import React from 'react'
import * as PropTypes from 'prop-types'
import { Link } from 'react-static'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap'

class ArtworkCard extends React.Component {
  static propTypes = {
    artwork: PropTypes.object.isRequired,
  }
  render () {
    const artwork = this.props.artwork
    return (
      <img key={artwork.uuid} src={`http://cms.casadelhuerto.com/api/v1/carmen-marcos-art/nodes/${artwork.uuid}/binary/image?w=500`}/>
    )
  }
}

export default ArtworkCard
