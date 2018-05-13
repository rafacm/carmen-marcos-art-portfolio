import React, { Component, Fragment } from 'react'
import { withSiteData, withRouteData, Link } from 'react-static'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import Breadcrumb from '../components/Breadcrumb'
import ArtworksGrid from '../components/ArtworksGrid';
import stripHtml from 'string-strip-html';

class ThemesPage extends React.Component {
    static propTypes = {
        breadcrumb: PropTypes.arrayOf(PropTypes.object).isRequired,
        node: PropTypes.arrayOf(PropTypes.object).isRequired,
        theme: PropTypes.arrayOf(PropTypes.object).isRequired,
      }
      static defaultProps = {
        crumbs: [],
      }  
    render() {
        const themeArtworks = this.props.theme.children.elements
        return (
            <Fragment>
                <Breadcrumb breadcrumb={this.props.breadcrumb} currentNode={this.props.node} />
                <Container>
                    <h1>{this.props.theme.fields.title}</h1>
                    <p>{stripHtml(this.props.theme.fields.teaser)}</p>
                    <ArtworksGrid artworks={themeArtworks} />
                </Container>
            </Fragment>    
        )
    }
}

export default withSiteData(withRouteData(ThemesPage))
