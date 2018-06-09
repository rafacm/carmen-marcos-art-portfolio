import { GraphQLClient } from 'graphql-request'
import React, { Component } from 'react'
import MeshApiClient from './src/mesh/mesh-api-client'
import MeshQueries from './src/mesh/mesh-graphql-queries'

const MESH_PROJECT = 'carmen-marcos-art'
const MESH_HOST = 'http://cms.casadelhuerto.com'
const MESH_API = `${MESH_HOST}/api/v1`
const MESH_GRAPHQL_API = `${MESH_API}/${MESH_PROJECT}/graphql/`
const MESH_LANGUAGE = 'de'
const MESH_API_CLIENT_LOGGING = false

const SITE_ROOT = 'http://carmen-marcos.art/'

const meshRestApiClient = new MeshApiClient(MESH_HOST, MESH_PROJECT, MESH_LANGUAGE, MESH_API_CLIENT_LOGGING)
const meshGraphqlClient = new GraphQLClient(MESH_GRAPHQL_API)
//const graphqlClient = new GraphQLClient(MESH_GRAPHQL_API, {
//  headers: {
//    Authorization: `Bearer ${meshToken}`,
//  },
//})

/*
 * NOTES
 * 
 * - Breadcrumbs have to be reversed due to https://github.com/gentics/mesh/issues/398
 */

export default {
  siteRoot: SITE_ROOT,
  getSiteData: () => ({
    title: 'Carmen Marcos',
    siteRoot: SITE_ROOT,
    meshHost: MESH_HOST,
    meshApi: MESH_API,
    meshProject: MESH_PROJECT,
    //TODO: projectNode: projectNode
  }),
  getRoutes: async () => {
    const projectNode = await meshRestApiClient.getNodeByWebRootPath('/')
    const whoami = await meshGraphqlClient.request(MeshQueries.whoamiQuery)
    //console.log('static.config.js > whoami: ', whoami)

    const featuredWorksForHomePage = await meshGraphqlClient.request(MeshQueries.featuredArtworksQuery)
    //console.log('static.config.js > featuredWorksForHomePage: ', featuredWorksForHomePage)

    /*
     * Artworks
     */
    const generateAllArtworkPagesRoutes = async function (meshRestApiClient, meshGraphqlClient, projectNode) {
      const allArtworks = await meshGraphqlClient.request(MeshQueries.allArtworksQuery)
      //console.log('static.config.js > allArtworks: ', allArtworks)

      return allArtworks.nodes.elements.map(artwork => {
        //console.log('static.config.js > generateAllArtworkPagesRoutes > artwork: ', artwork)
        return {
          path: artwork.path,
          component: 'src/pages/ArtworkPage',
          getData: () => ({
            node: artwork,
            breadcrumb: artwork.breadcrumb.reverse(),
            artwork
          }),
        }
      })
    }

    // We cannot use await at top-level: https://github.com/tc39/ecmascript-asyncawait/issues/9
    const allArtworkPagesRoutes =
      await generateAllArtworkPagesRoutes(meshRestApiClient, meshGraphqlClient, projectNode)
    //console.log('static.config.js > allArtworkPagesRoutes: ', allArtworkPagesRoutes)

    /*
     * Themes
     */
    const generateAllThemePagesRoutes = async function (meshRestApiClient, meshGraphqlClient, projectNode) {
      const allThemes = await meshGraphqlClient.request(MeshQueries.allThemesWithArtworksQuery)
      //console.log('static.config.js > allThemes: ', allThemes)

      return allThemes.nodes.elements.map(theme => {
        //console.log('static.config.js > generateAllThemePagesRoutes > themes: ', theme)
        return {
          path: theme.path,
          component: 'src/pages/ThemePage',
          getData: () => ({
            node: theme,
            breadcrumb: theme.breadcrumb.reverse(),
            theme
          }),
        }
      })
    }

    // We cannot use await at top-level: https://github.com/tc39/ecmascript-asyncawait/issues/9
    const allThemePagesRoutes =
      await generateAllThemePagesRoutes(meshRestApiClient, meshGraphqlClient, projectNode)
    //console.log('static.config.js > allThemePagesRoutes: ', allThemePagesRoutes)

    /*
     * Folders
     */
    const generateAllFolderPagesRoutes = async function (meshRestApiClient, meshGraphqlClient, projectNode) {
      const allFolders = await meshGraphqlClient.request(MeshQueries.allFoldersQuery)
      //console.log('static.config.js > allFolders: ', allFolders)

      return allFolders.node.children.elements
        .filter(folder => {
          !folder.path.includes("exhibitions")
        }).map(folder => {
          //console.log('static.config.js > generateAllFolderPagesRoutes > folders: ', folder)
          return {
            path: folder.path,
            component: 'src/pages/FolderPage',
            getData: () => ({
              node: folder,
              breadcrumb: folder.breadcrumb.reverse(),
              folder
            }),
          }
        })
    }

    // We cannot use await at top-level: https://github.com/tc39/ecmascript-asyncawait/issues/9
    const allFolderPagesRoutes =
      await generateAllFolderPagesRoutes(meshRestApiClient, meshGraphqlClient, projectNode)
    //console.log('static.config.js > allFolderPagesRoutes: ', allFolderPagesRoutes)

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
        getData: () => ({
          node: { displayName: 'Error' },
        }),
      },
    ]
  },
  Document: ({ Html, Head, Body, children, siteData, renderMeta }) => (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-5B2FVWH');
                `,
          }}
        />
      </Head>
      <Body>
        <noscript>
          <iframe
            title="google-tag-manager"
            src="https://www.googletagmanager.com/ns.html?id=GTM-5B2FVWH"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </Body>
    </Html>
  ),
}
