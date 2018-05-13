import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { withSiteData, withRouteData, Link } from 'react-static'
import { Container, Row, Col } from 'reactstrap'
import map from 'lodash/map'
import chunk from 'lodash/chunk'
import ArtworkCard from '../components/ArtworkCard'

class ArtworkGrid extends Component {
    static propTypes = {
        artworks: PropTypes.arrayOf(PropTypes.object).isRequired
    }
    static defaultProps = {
        artworks: []
    }
    render() {
        return (
            <div className="artwork-grid album">
                <Row className=""> 
                    {
                        map(this.props.artworks, (artwork, index) => (
                            <Col key={index} md="3">
                                <ArtworkCard artwork={artwork}/>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        )
    }
}

export default withSiteData(ArtworkGrid)
