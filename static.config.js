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
    console.log('static.config.js > whoami: ', whoami)

    const featuredWorksForHomePage = await meshGraphqlClient.request(MeshQueries.featuredArtworksQuery)
    console.log('static.config.js > featuredWorksForHomePage: ', featuredWorksForHomePage)

    /*
     * Artworks
     */
    const generateAllArtworkPagesRoutes = async function(meshRestApiClient, meshGraphqlClient, projectNode) {
      const allArtworks = await meshGraphqlClient.request(MeshQueries.allArtworksQuery)
      console.log('static.config.js > allArtworks: ', allArtworks)

      return allArtworks.nodes.elements.map( artwork => {
        console.log('static.config.js > generateAllArtworkPagesRoutes > artwork: ', artwork)
        return {
          path: artwork.path,
          component: 'src/pages/ArtworkPage',
          getData: () => ({
            node: artwork,
            breadcrumb: artwork.breadcrumb,
            artwork
          }),
        }
      })
    }

    // We cannot use await at top-level: https://github.com/tc39/ecmascript-asyncawait/issues/9
    const allArtworkPagesRoutes = 
      await generateAllArtworkPagesRoutes(meshRestApiClient, meshGraphqlClient, projectNode)
    console.log('static.config.js > allArtworkPagesRoutes: ', allArtworkPagesRoutes)

    /*
     * Themes
     */
    const generateAllThemePagesRoutes = async function(meshRestApiClient, meshGraphqlClient, projectNode) {
      const allThemes = await meshGraphqlClient.request(MeshQueries.allThemesWithArtworksQuery)
      console.log('static.config.js > allThemes: ', allThemes)

      return allThemes.nodes.elements.map( theme => {
        console.log('static.config.js > generateAllThemePagesRoutes > themes: ', theme)
        return {
          path: theme.path,
          component: 'src/pages/ThemePage',
          getData: () => ({
            node: theme,
            breadcrumb: theme.breadcrumb,
            theme
          }),
        }
      })
    }

    // We cannot use await at top-level: https://github.com/tc39/ecmascript-asyncawait/issues/9
    const allThemePagesRoutes = 
      await generateAllThemePagesRoutes(meshRestApiClient, meshGraphqlClient, projectNode)
    console.log('static.config.js > allThemePagesRoutes: ', allThemePagesRoutes)

    /*
     * Folders
     */
    const generateAllFolderPagesRoutes = async function(meshRestApiClient, meshGraphqlClient, projectNode) {
      const allFolders = await meshGraphqlClient.request(MeshQueries.allFoldersQuery)
      console.log('static.config.js > allFolders: ', allFolders)

      return allFolders.node.children.elements.map( folder => {
        console.log('static.config.js > generateAllFolderPagesRoutes > folders: ', folder)
        return {
          path: folder.path,
          component: 'src/pages/FolderPage',
          getData: () => ({
            node: folder,
            breadcrumb: folder.breadcrumb,
            folder
          }),
        }
      })
    }

    // We cannot use await at top-level: https://github.com/tc39/ecmascript-asyncawait/issues/9
    const allFolderPagesRoutes = 
      await generateAllFolderPagesRoutes(meshRestApiClient, meshGraphqlClient, projectNode)
    console.log('static.config.js > allFolderPagesRoutes: ', allFolderPagesRoutes)

    return [
      {
        path: '/',
        component: 'src/pages/HomePage',
        getData: () => ({
          node: projectNode,
          featuredArtworks: featuredWorksForHomePage
        }),
      },
      ...allFolderPagesRoutes,
      ...allThemePagesRoutes,
      ...allArtworkPagesRoutes,
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
}
