import React, { Component } from 'react'
import { withSiteData, withRouteData, Link } from 'react-static'
class ThemesPage extends React.Component {

    render() {
        return (
            <h1>Hello world!</h1>
        )
    }
}

export default withSiteData(withRouteData(ThemesPage))
