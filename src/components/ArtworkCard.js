import React from 'react'
import { withSiteData, withRouteData, Link } from 'react-static'
import * as PropTypes from 'prop-types'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap'

class ArtworkCard extends React.Component {
  static propTypes = {
    artwork: PropTypes.object.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
  }
  static defaultProps = {
    width: 400,
    height: 400
  }
  render () {
    return (
      <Card className="artwork-card mb-3 mt-3 box-shadow">
        <Link to={this.props.artwork.path ? this.props.artwork.path : '/'}>
          <img className="card-img-top rounded" 
              src={`${this.props.meshApi}/${this.props.meshProject}/nodes/${this.props.artwork.uuid}/binary/image?w=${this.props.width}&h=${this.props.height}&crop=fp`}
              alt={this.props.artwork.fields.title} 
              title={this.props.artwork.fields.title}/>
        </Link>
      </Card>
    )
  }
}

export default withSiteData(ArtworkCard)
