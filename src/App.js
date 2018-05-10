import React, { Fragment } from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import Header from './components/Header'
import Footer from './components/Footer'

import './app.css'

const App = () => (
  <Router>
    <Fragment>
      <Header />
      <main role="main" className="container">
        <Routes />
      </main>
      <Footer />
    </Fragment>
  </Router>

)

export default hot(module)(App)
