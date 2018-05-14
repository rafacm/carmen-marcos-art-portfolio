import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withSiteData, withRouteData, Link } from 'react-static'
import { Container, Row, Col, Card } from 'reactstrap'
import Breadcrumb from '../components/Breadcrumb'
import map from 'lodash/map'
import reverse from 'lodash/reverse'
import clone from 'lodash/clone'
import sortBy from 'lodash/sortBy'
import ThemeCard from '../components/ThemeCard'

class FolderPage extends Component {
    static propTypes = {
        breadcrumb: PropTypes.arrayOf(PropTypes.object).isRequired,
        node: PropTypes.object.isRequired,
        folder: PropTypes.object.isRequired,
      }
      static defaultProps = {
        breadcrumb: [],
      }
      render() {
        const themes = this.props.folder.children.elements
        const reverseSortedThemes = reverse(sortBy(map(themes, clone), theme => theme.fields.year))

        return (
            <Fragment>
                <Breadcrumb breadcrumb={this.props.breadcrumb} currentNode={this.props.folder} />
                <Container>
                    <h1>{this.props.folder.displayName}</h1>
                </Container>
                <div className="album">
                    <Container>    
                        <Row>
                            {
                                map(themes, (theme, index) => (
                                    <ThemeCard key={index} theme={theme} />
                                ))
                            }
                        </Row>
                    </Container>
                </div>
            </Fragment>    
        )
    }
}

export default withSiteData(withRouteData(FolderPage))
