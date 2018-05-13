import React, { Component, Fragment } from 'react'
import { withSiteData, withRouteData, Link } from 'react-static'
import { Container } from 'reactstrap'
import Breadcrumb from '../components/Breadcrumb'
import ArtworkTags from '../components/ArtworkTags'

class ArtworkPage extends Component {
    render() {
        const meshApi = this.props.meshApi
        const meshProject = this.props.meshProject    
        const artwork = this.props.artwork
        const breadcrumb = artwork.breadcrumb
        //console.log('ArtworkPage > tags: ', JSON.stringify(artwork.tags))
        //console.log('ArtworkPage > breadcrumb: ', JSON.stringify(breadcrumbs))
        return (
            <Fragment>
                <Breadcrumb breadcrumb={breadcrumb} node={artwork} />
                <Container>
                    <figure className="figure artwork">
                        <img className="figure-img img-fluid rounded" src={`${meshApi}/${meshProject}/nodes/${artwork.uuid}/binary/image?w=1280`} title={artwork.fields.title} alt={artwork.fields.title}/>
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
