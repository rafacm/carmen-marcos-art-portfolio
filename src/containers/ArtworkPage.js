import React, { Component, Fragment } from 'react'
import { withSiteData, withRouteData, Link } from 'react-static'
import map from 'lodash/map'
import { Container } from 'reactstrap'

const ArtworkTags = ({ tags }) => {
    return (
        <Fragment> 
        {
            map(tags.elements, (tag) => (
                 <span className={`badge badge-light ${tag.tagFamily.name.toLowerCase()}`}>{ tag.name }</span> 
            ))
        }
        </Fragment>
    )
}

class ArtworkPage extends Component {
    render() {
        const meshApi = this.props.meshApi
        const meshProject = this.props.meshProject    
        const artwork = this.props.artwork
        console.log(JSON.stringify(artwork.tags))
        return (
            <Container>
                <figure class="figure artwork">
                    <img className="figure-img img-fluid rounded" src={`${meshApi}/${meshProject}/nodes/${artwork.uuid}/binary/image?w=1024`} title={artwork.fields.title} alt={artwork.fields.title}/>
                    <figcaption class="figure-caption">
                        <em>{artwork.fields.title}</em>. {artwork.fields.height} cm. x {artwork.fields.width} cm. {artwork.fields.year}. 
                        <ArtworkTags tags={artwork.tags} />
                    </figcaption>
                </figure>
                <br/>
                <Link to="/">Back to homepage</Link>
            </Container>
        )
    }
}

export default withSiteData(withRouteData(ArtworkPage))
