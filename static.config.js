import MeshApiClient from './src/mesh/mesh-api-client'
import MeshQueries from './src/mesh/mesh-graphql-queries'
import { GraphQLClient } from 'graphql-request'

const MESH_PROJECT = 'carmen-marcos-art'
const MESH_HOST = 'http://cms.casadelhuerto.com'
const MESH_API = `${MESH_HOST}/api/v1`
const MESH_GRAPHQL_API = `${MESH_API}/${MESH_PROJECT}/graphql/`
const MESH_LANGUAGE = 'de'
const MESH_API_CLIENT_LOGGING = true

const meshRestApiClient = new MeshApiClient(MESH_HOST, MESH_PROJECT, MESH_LANGUAGE, MESH_API_CLIENT_LOGGING)
const meshGraphqlClient = new GraphQLClient(MESH_GRAPHQL_API)
//const graphqlClient = new GraphQLClient(MESH_GRAPHQL_API, {
//  headers: {
//    Authorization: `Bearer ${meshToken}`,
//  },
//})

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
    console.log('whoami: ', whoami)
    
    const featuredWorks = await meshGraphqlClient.request(MeshQueries.featuredArtworksQuery)
    console.log('featuredWorks: ', featuredWorks)
    
    const allArtworks = await meshGraphqlClient.request(MeshQueries.allArtworksQuery)
    console.log('allArtworks: ', allArtworks)
    
    return [
      {
        path: '/',
        component: 'src/containers/HomePage',
        getData: () => ({
          node: projectNode,
          artworks: featuredWorks
        }),
        children: allArtworks.nodes.elements.map(artwork => ({
          path: `/artworks/${artwork.fields.slug}`,
          component: 'src/containers/ArtworkPage',
          getData: () => ({
            node: artwork,
            artwork
          }),   
        })),     
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
}
