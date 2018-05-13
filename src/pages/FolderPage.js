import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withSiteData, withRouteData, Link } from 'react-static'
import { Container, Row, Col, Card } from 'reactstrap'
import Breadcrumb from '../components/Breadcrumb'
import map from 'lodash/map'
import Dotdotdot from 'react-dotdotdot'
import stripHtml from 'string-strip-html';

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
                                    <div className="col-md-4">
                                        <Card className="mb-4 box-shadow">
                                        <Link to={theme.path}><img className="card-img-top" src={`${this.props.meshApi}/${this.props.meshProject}/nodes/${theme.fields.featuredArtwork.uuid}/binary/image?w=400&h=275&crop=fp`}/></Link>
                                            <div class="card-body">
                                                <h5 class="card-title">{theme.displayName}</h5>
                                                <p class="card-text">
                                                    <Dotdotdot clamp={4}>
                                                        {stripHtml(theme.fields.teaser)}
                                                    </Dotdotdot>
                                                </p>
                                                <div class="btn-group">
                                                    <button type="button" className="btn btn-sm btn-outline-secondary"><Link to={theme.path}>View</Link></button>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
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
