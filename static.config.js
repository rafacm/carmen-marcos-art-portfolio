import MeshApiClient from './src/mesh/mesh-api-client'

const MESH_HOST = 'http://cms.casadelhuerto.com'
const MESH_USERNAME = 'webclient'
const MESH_PASSWORD = 'toa6vaeZ'
const MESH_PROJECT_NAME = 'carmen-marcos-art'
const MESH_LANGUAGE = 'de'
const MESH_API_CLIENT_LOGGING = true

export default {
  getSiteData: () => ({
    title: 'Carmen Marcos',
    siteRoot : 'http://carmen-marcos.art/'

  }),
  getRoutes: async () => {
    const meshApiClient =
      new MeshApiClient(MESH_HOST, MESH_PROJECT_NAME, MESH_LANGUAGE, MESH_API_CLIENT_LOGGING)
    const meshApiClientAsWebClientUser = await meshApiClient.login(MESH_USERNAME, MESH_PASSWORD)
    const projectNode = await meshApiClientAsWebClientUser.getNodeByWebRootPath('/')

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
