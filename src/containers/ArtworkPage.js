import React, { Component } from 'react'
import { withSiteData, withRouteData, Link } from 'react-static'

class ArtworkPage extends Component {
    render() {
        const meshApi = this.props.meshApi
        const meshProject = this.props.meshProject    
        const artwork = this.props.artwork
        const workTechniqueAndMedium = 'Foo'
        return (
            <div className="work-detail col-xs-12 col-sm-12 col-md-12 col-lg-12" key={artwork.fields.slug}>
                <img className="img-fluid rounded" src={`${meshApi}/${meshProject}/nodes/${artwork.uuid}/binary/image?w=1024`}/>
                <p className="text-left" id={artwork.fields.slug}><em>{artwork.fields.title}</em>. { workTechniqueAndMedium }. {artwork.fields.height} cm. x {artwork.fields.width} cm. {artwork.fields.year}.</p>
                <Link to="/">Back to homepage</Link>
            </div>
        )
    }
}

export default withSiteData(withRouteData(ArtworkPage))
