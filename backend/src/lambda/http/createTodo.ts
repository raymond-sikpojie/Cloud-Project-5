import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import 'source-map-support/register'
import * as uuid from 'uuid'
import { getUserId } from '../utils'

const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    console.log("EVENT:", event);

    const todoId = uuid.v4()
    const userId = getUserId(event)
    const parsedBody = JSON.parse(event.body)

    // const authHeader = event.headers.Authorization
    // const authSplit = authHeader.split(" ")
    // const token = authSplit[1]

    // console.log("test",token)

    const item = {
      todoId,
      userId,
      createdAt: new Date().toISOString(),
      done: false,
      attachmentUrl: undefined,
      ...parsedBody
    }

    await docClient.put({
        TableName: todosTable,
        Item: item
    }).promise()

    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          item
        })
    }
}



// import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
// import 'source-map-support/register'
// import * as AWS from 'aws-sdk'
// import * as uuid from 'uuid'
// import { parseUserId } from '../../auth/utils'
// import { CreateTodoRequest } from '../../requests/CreateTodoRequest'



// export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//   const newTodo: CreateTodoRequest = JSON.parse(event.body)

//   // TODO: Implement creating a new TODO item
//   return undefined
// }
