import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-static'
import { Container } from 'reactstrap'

class Breadcrumb extends Component {
  static propTypes = {
    breadcrumb: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentNode: PropTypes.object.isRequired,
  }
  static defaultProps = {
    breadcrumb: [],
  }
  render() {
    const crumbs = this.props.breadcrumb
    const currentNode = this.props.currentNode
    //console.log('Breadcrumb > node: ', node)
    return (
      <Container>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <Fragment>
              <li key={0} className="breadcrumb-item"><Link to="/">Home</Link></li>
              {
                // Reverse the array in order to render it: 
                //   https://github.com/gentics/mesh/issues/398
                crumbs.map((crumb, index) => (
                  <li key={index + 1} className="breadcrumb-item">
                    <Link to={crumb.path}>{crumb.displayName}</Link>
                  </li>
                ))
              }
              <li key={crumbs.length + 1} className="breadcrumb-item active" aria-current="page">
                {currentNode.displayName}
              </li>
            </Fragment>
          </ol>
        </nav>
      </Container>
    )
  }
}

export default Breadcrumb
