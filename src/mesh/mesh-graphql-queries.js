const whoamiQuery = `
{
  me { username, uuid }
}
`

const featuredArtworksQuery = `
{
  node(path: "/") {
    node {
      uuid
    }
    children(filter: {
      schema: {
        is: featuredArtworks
      }
    }) {
      elements {
        uuid
        fields {
            ... on featuredArtworks {
            title
            artworks {
              uuid
              path
              fields {
                ... on artwork {
                  title
                  slug
                  image {
                    binaryUuid
                    fileName
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`

const allArtworksQuery = `
{
    nodes(perPage: 100, filter: {
      schema: { is: artwork }
      fields: {
        artwork: {
          # TODO: filter expression for not null value?
          slug: { regex: "[a-z]+" }
        }
      }  
    }) {
      elements {
        uuid
        path
        breadcrumb {
          uuid
          schema {
            name
          }
          path
          displayName
        }
        fields {
            ... on artwork {
                title
                slug
                height
                width
                year
                image {
                  binaryUuid
                  fileName
                  width
                  height
                }
            }
        }
        tags {
            size
            elements {
              uuid
              name
              tagFamily {
                uuid
                name
              }
            }
          }
  
        }
    }
}
`
const allThemes = 
`query {
  nodes(perPage: 100, filter: {schema: {is: theme}}) {
    elements {
      uuid
      path
      breadcrumb {
        uuid
        schema {
          name
        }
        path
        displayName
      }
      fields {
        ... on theme {
          title
          slug
          year
          teaser
          description
          featuredArtwork {
            uuid
            path
            displayName
            fields {
              ... on artwork {
                title
                slug
                image {
                  binaryUuid
                  fileName
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export default { whoamiQuery, featuredArtworksQuery, allArtworksQuery, allThemes }

