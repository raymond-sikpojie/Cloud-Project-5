import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { createTodo } from '../../businessLogic/todo'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
// import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event)
  const newTodo: CreateTodoRequest = JSON.parse(event.body)

  const item = await createTodo(userId, newTodo)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: item
    })
  }

}


// import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
// import * as AWS from 'aws-sdk'
// import 'source-map-support/register'
// import * as uuid from 'uuid'
// import { getUserId } from '../utils'

// const docClient = new AWS.DynamoDB.DocumentClient()
// const todosTable = process.env.TODOS_TABLE

// export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
//     console.log("EVENT:", event);

//     const todoId = uuid.v4()
//     const userId = getUserId(event)
//     const parsedBody = JSON.parse(event.body)

//     const item = {
//       todoId,
//       userId,
//       createdAt: new Date().toISOString(),
//       done: false,
//       attachmentUrl: undefined,
//       ...parsedBody
//     }

//     await docClient.put({
//         TableName: todosTable,
//         Item: item
//     }).promise()

//     return {
//         statusCode: 201,
//         headers: {
//             'Access-Control-Allow-Origin': '*'
//         },
//         body: JSON.stringify({
//           item
//         })
//     }
// }

