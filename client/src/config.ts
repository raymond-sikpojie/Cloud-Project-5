// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'oy8i2dnf50'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-g87qi3-g.us.auth0.com',            // Auth0 domain
  clientId: 'HSLeGC0tMrBd2koiXuh23GLHx3ueKOlN',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
