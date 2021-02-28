import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { deleteTodo } from '../../businessLogic/todo'
// import { createLogger } from '../../utils/logger'
// import { getUserId } from '../utils'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const todoId = event.pathParameters.todoId
    
    await deleteTodo(todoId)

    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body:'Todo item deleted'
    }
}


// import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
// import * as AWS from 'aws-sdk'
// import 'source-map-support/register'

// const docClient = new AWS.DynamoDB.DocumentClient()

// const todosTable = process.env.TODOS_TABLE

// export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
//     const todoId = event.pathParameters.todoId

//     await docClient.delete({
//         TableName: todosTable,
//         Key: {
//           todoId
//         }
//     }).promise()

//     return {
//         statusCode: 201,
//         headers: {
//             'Access-Control-Allow-Origin': '*'
//         },
//         body:'Todo item deleted'
//     }
// }

