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
              fields {
                ... on artwork {
                  title
                  slug
                  height
                  width
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
        fields {
            ... on artwork {
                title
                slug
                height
                width
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
`
export default { whoamiQuery, featuredArtworksQuery, allArtworksQuery }

