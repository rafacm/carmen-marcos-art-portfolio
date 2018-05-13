import React, { Component, Fragment } from 'react'
import { withSiteData, withRouteData, Link } from 'react-static'
import { Container } from 'reactstrap'
import Breadcrumb from '../components/Breadcrumb'

class FolderPage extends Component {
    render() {
        const meshApi = this.props.meshApi
        const meshProject = this.props.meshProject    
        const folder = this.props.folder
        const breadcrumb = folder.breadcrumb
        const children = folder.children.elements

        return (
            <Fragment>
                <Breadcrumb breadcrumb={breadcrumb} currentNode={folder} />
                <Container>
                    <h1>{folder.displayName}</h1>
                </Container>
            </Fragment>    
        )
    }
}

export default withSiteData(withRouteData(FolderPage))
