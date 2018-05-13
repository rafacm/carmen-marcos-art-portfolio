import React from 'react'
import { withSiteData, withRouteData, Link } from 'react-static'
import * as PropTypes from 'prop-types'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap'
import Dotdotdot from 'react-dotdotdot'
import stripHtml from 'string-strip-html';

class ThemeCard extends React.Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
  }
  static defaultProps = {
    width: 400,
    height: 275
  }
  render () {
    const theme = this.props.theme
    return (
        <div className="col-md-4">
            <Card className="mb-4 box-shadow">
            <Link to={theme.path}><img className="card-img-top" src={`${this.props.meshApi}/${this.props.meshProject}/nodes/${theme.fields.featuredArtwork.uuid}/binary/image?w=${this.props.width}&h=${this.props.height}&crop=fp`}/></Link>
                <div className="card-body">
                    <h5 className="card-title">{theme.displayName}</h5>
                    <p className="card-text">
                        <Dotdotdot clamp={4}>
                            {stripHtml(theme.fields.teaser)}
                        </Dotdotdot>
                    </p>
                    <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-primary"><Link to={theme.path}>View</Link></button>
                    </div>
                </div>
            </Card>
        </div>
    )
  }
}

export default withSiteData(ThemeCard)
