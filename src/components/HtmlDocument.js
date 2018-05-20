import React, { Component } from 'react'

class HtmlDocument extends Component {
  render () {
    const { Html, Head, Body, children, siteData, renderMeta } = this.props

    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="custom" description="foo"/>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta content="IE=edge,chrome=1" httpEquiv="X-UA-Compatible" />
          {renderMeta}
        </Head>
          <Body>{children}</Body>
      </Html>
    )
  }
}

export default HtmlDocument
