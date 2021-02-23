
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify } from 'jsonwebtoken'
import { JwtPayload } from '../../auth/JwtPayload'

const cert = `-----BEGIN CERTIFICATE-----
MIIDDTCCAfWgAwIBAgIJKhFMoGS4GAhjMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV
BAMTGWRldi1nODdxaTMtZy51cy5hdXRoMC5jb20wHhcNMjEwMjIzMDM0MjA1WhcN
MzQxMTAyMDM0MjA1WjAkMSIwIAYDVQQDExlkZXYtZzg3cWkzLWcudXMuYXV0aDAu
Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtMiVMyu0fskTYega
2BMmGBUdwZ/CVbD08y77PnBB6z3s9E3QYTbAuMNAWzcD7Ii1UkBL9b5oSTHdiwZj
IGUlpREZJEbOX49Uf2u06zD7Ex5nBu11r9cOPmfhgyzk5EQwOj1i/LNzVaCILlBm
KZNijxaoZS8ToPr0dGVVsOR3o8z21B41P6J6F48reNUYDJ8fSvIOGZyoMTGD0OZm
MI/6AXYV9yXyyL+wMrFPriCKqLF/AzciCRCD1Z60Zx4CLMtYZjIXp6dFn3Y2lsmx
GYAclrAGZrEPJYrhNcerCI+0NlpoX4S26VAVqG+LYNWlrCcRPdU5ogjkoh39NQNN
kdcUvwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBTgeg2G3XYR
2zbTARuZxoPD8tncLTAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEB
ACjTjePlY4a4y4gyh9T/1dZ247dJ4wxA5Z9pTp8WarbWwQwCL/rHb7EpX8cSdNYq
EHtRscpeI0Q0hYr4+hqq/Ft1RbCOtly5f1Hk+ciYgDXhJRMJAQsAVBWKa4vtX3H9
tIU1/mBGvnbTt9oIo0JIEYlIbD6BPm3cVjpZo9nQf0KDVFyLzcs3nYFj4xeihkyN
DRFUGaDkbw95eVRMQcSyxzyhgZTl8hhk1K08qiBI+25X6f6P+3HqZ+a5mpwOy0mp
jsyDrqfpJw7/RZ2ZBOuXZihni+vmRFMX3pJCcULI9uveIN3zGa05RGdZzo3sgE4f
3el2vvHIRcWi4Ck0+tGe8OU=
-----END CERTIFICATE-----`

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  try {
    const jwtToken = verifyToken(event.authorizationToken)
    console.log('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    console.log('User authorized', e.message)

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

function verifyToken(authHeader: string): JwtPayload {
  if (!authHeader)
    throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return verify(token, cert, { algorithms: ['RS256'] }) as JwtPayload
}
