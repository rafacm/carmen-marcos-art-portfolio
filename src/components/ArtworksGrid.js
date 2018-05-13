import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { withSiteData, withRouteData, Link } from 'react-static'
import { Container, Row, Col } from 'reactstrap'
import map from 'lodash/map'
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
            <div className="artwork-grid album py-5">
                <Container>
                    <Row> 
                    {
                        map(this.props.artworks, (item, index) => (
                            <Col key={index} xl="2" lg="2" md="3" sm="6">
                                <ArtworkCard artwork={item}/>
                            </Col>
                        ))
                    }
                    </Row>
                </Container>
            </div>
        )
    }
}

export default withSiteData(ArtworkGrid)