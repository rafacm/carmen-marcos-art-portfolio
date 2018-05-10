import MeshApiClient from './src/mesh/mesh-api-client'
import { GraphQLClient } from 'graphql-request'

const MESH_PROJECT_NAME = 'carmen-marcos-art'
const MESH_HOST = 'http://cms.casadelhuerto.com'
const MESH_GRAPHQL_API = `${MESH_HOST}/api/v1/${MESH_PROJECT_NAME}/graphql/`
const MESH_USERNAME = 'admin'
const MESH_PASSWORD = 'Choh2ief'
const MESH_LANGUAGE = 'de'
const MESH_API_CLIENT_LOGGING = true

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


export default {
  getSiteData: () => ({
    title: 'Carmen Marcos',
    siteRoot: 'http://carmen-marcos.art/',
    meshHost: MESH_HOST

  }),
  getRoutes: async () => {
    const meshApiClient =
      new MeshApiClient(MESH_HOST, MESH_PROJECT_NAME, MESH_LANGUAGE, MESH_API_CLIENT_LOGGING)
    const meshApiClientAsWebClientUser = await meshApiClient.login(MESH_USERNAME, MESH_PASSWORD)
    const projectNode = await meshApiClientAsWebClientUser.getNodeByWebRootPath('/')
    const meshToken = meshApiClientAsWebClientUser.getMeshToken()
    console.log("meshToken: ", meshToken)
    const graphqlClient = new GraphQLClient(MESH_GRAPHQL_API, {
      headers: {
        Authorization: `Bearer ${meshToken}`,
      },
    })

    const whoami = await graphqlClient.request(whoamiQuery)
    console.log('whoami: ', whoami)

    const featuredWorks = await graphqlClient.request(featuredArtworksQuery)
    console.log('featuredWorks: ', featuredWorks)

    return [
      {
        path: '/',
        component: 'src/containers/HomePage',
        getData: () => ({
          node: projectNode,
        }),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
}
