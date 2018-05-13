import React, { Component, Fragment } from 'react'
import { withSiteData, withRouteData, Link } from 'react-static'
import { Container, Row, Col } from 'reactstrap'
import Breadcrumb from '../components/Breadcrumb'

class ThemesPage extends React.Component {

    render() {
        const meshApi = this.props.meshApi
        const meshProject = this.props.meshProject    
        const theme = this.props.theme
        const breadcrumb = theme.breadcrumb

        return (
            <Fragment>
                <Breadcrumb breadcrumb={breadcrumb} currentNode={theme} />
                <Container>
                    <h1>{theme.fields.title}</h1>
                    
                </Container>
            </Fragment>    
        )
    }
}

export default withSiteData(withRouteData(ThemesPage))
