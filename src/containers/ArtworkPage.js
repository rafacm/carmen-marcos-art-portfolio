import React, { Fragment, Component } from 'react'
import { withRouteData } from 'react-static';


class ArtworkPage extends Component {
    render() {
        return (
            <h1>Detail!</h1>
        )
    }
}

export default withRouteData(ArtworkPage)
