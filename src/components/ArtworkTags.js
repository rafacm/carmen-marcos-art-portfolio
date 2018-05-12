import React, { Component, Fragment } from 'react'

const ArtworkTags = ({ tags }) => {
    return (
        <Fragment> 
        {
            tags.elements.map(tag => (
                 <span key={tag.uuid} className={`badge badge-light ${tag.tagFamily.name.toLowerCase()}`}>{ tag.name }</span> 
            ))
        }
        </Fragment>
    )
}

export default ArtworkTags