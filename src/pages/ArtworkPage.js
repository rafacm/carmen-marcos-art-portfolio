import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withSiteData, withRouteData, Link } from 'react-static'
import { Container } from 'reactstrap'
import Breadcrumb from '../components/Breadcrumb'
import ArtworkTags from '../components/ArtworkTags'

class ArtworkPage extends Component {
    static propTypes = {
        breadcrumb: PropTypes.arrayOf(PropTypes.object).isRequired,
        node: PropTypes.object.isRequired,
        artwork: PropTypes.object.isRequired,
      }
      static defaultProps = {
        breadcrumb: [],
      }
    render() {
        const artwork = this.props.artwork
        return (
            <Fragment>
                <Breadcrumb breadcrumb={this.props.breadcrumb} currentNode={artwork} />
                <Container>
                    <figure className="figure artwork">
                        <img className="figure-img img-fluid rounded" src={`${this.props.meshApi}/${this.props.meshProject}/nodes/${artwork.uuid}/binary/image?w=1280`} title={artwork.fields.title} alt={artwork.fields.title}/>
                        <figcaption className="figure-caption">
                            <em>{artwork.fields.title}</em>. {artwork.fields.height} cm. x {artwork.fields.width} cm. {artwork.fields.year}. 
                            <ArtworkTags tags={artwork.tags} />
                        </figcaption>
                    </figure>
                </Container>
            </Fragment>
        )
    }
}

export default withSiteData(withRouteData(ArtworkPage))
