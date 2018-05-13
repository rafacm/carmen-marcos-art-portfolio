import MeshApiClient from './src/mesh/mesh-api-client'
import MeshQueries from './src/mesh/mesh-graphql-queries'
import { GraphQLClient } from 'graphql-request'
import getAllArtworksQuery from './src/mesh/get-all-artworks.graphql'

const MESH_PROJECT = 'carmen-marcos-art'
const MESH_HOST = 'http://cms.casadelhuerto.com'
const MESH_API = `${MESH_HOST}/api/v1`
const MESH_GRAPHQL_API = `${MESH_API}/${MESH_PROJECT}/graphql/`
const MESH_LANGUAGE = 'de'
const MESH_API_CLIENT_LOGGING = true

const meshRestApiClient = new MeshApiClient(MESH_HOST, MESH_PROJECT, MESH_LANGUAGE, MESH_API_CLIENT_LOGGING)
const meshGraphqlClient = new GraphQLClient(MESH_GRAPHQL_API)

/* Question: can await be used outside async? */
/* Nope: https://github.com/tc39/ecmascript-asyncawait/issues/9 */

export default {
  getSiteData: () => ({
    title: 'Carmen Marcos',
    siteRoot: 'http://carmen-marcos.art/',
    meshHost: MESH_HOST,
    meshApi: MESH_API,
    meshProject: MESH_PROJECT,
    //TODO: projectNode: projectNode
  }),
  getRoutes: async () => {    
    const projectNode = await meshRestApiClient.getNodeByWebRootPath('/')
    const whoami = await meshGraphqlClient.request(MeshQueries.whoamiQuery)
    console.log('static.config.js > whoami: ', whoami)

    const featuredWorksForHomePage = await meshGraphqlClient.request(MeshQueries.featuredArtworksQuery)
    console.log('static.config.js > featuredWorksForHomePage: ', featuredWorksForHomePage)

    const generateAllArtworkRoutes = async function(meshRestApiClient, meshGraphqlClient, projectNode) {
      const allArtworks = await meshGraphqlClient.request(getAllArtworksQuery)
      console.log('static.config.js > allArtworks: ', allArtworks)

      return allArtworks.nodes.elements.map( artwork => {
        console.log('static.config.js > generateAllArtworkRoutes > artwork: ', artwork)
        return {
          path: artwork.path,
          component: 'src/containers/ArtworkPage',
          getData: () => ({
            node: projectNode,
            artwork
          }),
        }
      })
    }

    const allArtworkRoutes = 
      await generateAllArtworkRoutes(meshRestApiClient, meshGraphqlClient, projectNode)
    console.log('static.config.js > allArtworkRoutes: ', allArtworkRoutes)

    return [
      {
        path: '/',
        component: 'src/containers/HomePage',
        getData: () => ({
          node: projectNode,
          featuredArtworks: featuredWorksForHomePage
        }),
      },
      ...allArtworkRoutes,
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
}
