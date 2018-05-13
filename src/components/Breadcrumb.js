import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-static'
import { Container } from 'reactstrap'
import reverse from 'lodash/reverse'
import clone from 'lodash/clone'
import map from 'lodash/map'

class Breadcrumb extends Component {
    static propTypes = {
      breadcrumb: PropTypes.arrayOf(PropTypes.object),
    }
    static defaultProps = {
      crumbs: [],
    }
    render () {
      const crumbs = this.props.breadcrumb
      //console.log('Breadcrumb > crumbs: ', crumbs)
      // TODO: debug why the following does not work
      //const reversedCrumbs = crumbs.reverse() // mutates in place
      //const reversedCrumbs = reverse(crumbs) // ??
      const reversedCrumbs = reverse(map(crumbs, clone))
      //console.log('Breadcrumb > crumbs.reverse(): ', reversedCrumbs)
      const node = this.props.node
      //console.log('Breadcrumb > node: ', node)
      return (
          <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                  <Fragment>
                      <li key={0} className="breadcrumb-item"><Link to="/">Home</Link></li>
                      {
                            // Reverse the array in order to render it: 
                            //   https://github.com/gentics/mesh/issues/398
                            reversedCrumbs.map((crumb, index) => (
                              <li key={index + 1} className="breadcrumb-item">
                                  <Link to={crumb.path}>{crumb.displayName}</Link>
                              </li>
                            ))
                        }
                          <li key={crumbs.length} className="breadcrumb-item active" aria-current="page">
                            {node.fields.title}
                          </li>
                    </Fragment>
                </ol>
            </nav>
      )
    }
}

export default Breadcrumb
