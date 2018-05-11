import MeshApiClient from './src/mesh/mesh-api-client'
import MeshQueries from './src/mesh/mesh-graphql-queries'
import { GraphQLClient } from 'graphql-request'

const MESH_PROJECT = 'carmen-marcos-art'
const MESH_HOST = 'http://cms.casadelhuerto.com'
const MESH_API = 'http://cms.casadelhuerto.com/api/v1'
const MESH_GRAPHQL_API = `${MESH_API}/${MESH_PROJECT}/graphql/`
const MESH_USERNAME = 'admin'
const MESH_PASSWORD = 'Choh2ief'
const MESH_LANGUAGE = 'de'
const MESH_API_CLIENT_LOGGING = true


export default {
  getSiteData: () => ({
    title: 'Carmen Marcos',
    siteRoot: 'http://carmen-marcos.art/',
    meshHost: MESH_HOST,
    meshApi: MESH_API,
    meshProject: MESH_PROJECT,
  }),
  getRoutes: async () => {
    const meshApiClient =
      new MeshApiClient(MESH_HOST, MESH_PROJECT, MESH_LANGUAGE, MESH_API_CLIENT_LOGGING)
    const meshApiClientAsWebClientUser = await meshApiClient.login(MESH_USERNAME, MESH_PASSWORD)
    const projectNode = await meshApiClientAsWebClientUser.getNodeByWebRootPath('/')
    const meshToken = meshApiClientAsWebClientUser.getMeshToken()
    console.log("meshToken: ", meshToken)
    const graphqlClient = new GraphQLClient(MESH_GRAPHQL_API, {
      headers: {
        Authorization: `Bearer ${meshToken}`,
      },
    })

    const whoami = 
      await graphqlClient.request(MeshQueries.whoamiQuery)
    console.log('whoami: ', whoami)

    const featuredWorks = 
      await graphqlClient.request(MeshQueries.featuredArtworksQuery)
    console.log('featuredWorks: ', featuredWorks)

    const allArtworks = 
      await graphqlClient.request(MeshQueries.allArtworksQuery)
    console.log('allArtworks: ', allArtworks)
    allArtworks.nodes.elements.map(artwork => 
      console.log('  artwork: ', artwork)
    )
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
            title: artwork.fields.title,
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
