import React from 'react'
import * as PropTypes from 'prop-types'
import { Link } from 'react-static'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap'

class VehicleCard extends React.Component {
  static propTypes = {
    artwork: PropTypes.object.isRequired,
  }
  render () {
    const artwork = this.props.artwork
    return (
      <p>{artwork.fields.image.fileName}</p>
    )
  }
}

export default VehicleCard
