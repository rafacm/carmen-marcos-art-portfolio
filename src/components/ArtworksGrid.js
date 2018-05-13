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
        const rows = chunk(this.props.artworks, 4)

        return (
            <div className="artwork-grid album">
                    {
                        map(rows, (row, rowNumber) => (
                            <Row key={rowNumber} className="py-4"> {
                                map(row, (artworkItem, index) => (
                                    <Col key={index} md="3" xs="12">
                                        <ArtworkCard artwork={artworkItem}/>
                                    </Col>
                                ))}
                            </Row>
                        ))
                    }
            </div>
        )
    }
}

export default withSiteData(ArtworkGrid)
