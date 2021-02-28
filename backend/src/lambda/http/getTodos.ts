import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { getTodos } from '../../businessLogic/todo'
// import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    console.log("EVENT:", event);

    const userId = getUserId(event)

    const items = await getTodos(userId)

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            items
        })
    }
}


// import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
// import * as AWS from 'aws-sdk'
// import 'source-map-support/register'
// import { getUserId } from '../utils'

// const docClient = new AWS.DynamoDB.DocumentClient()

// const todosTable = process.env.TODOS_TABLE

// export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
//     console.log("EVENT:", event);

//     const userId = getUserId(event)
    
//     const result = await docClient.query({
//         TableName : todosTable,
//         IndexName: "UserIdIndex",
//         KeyConditionExpression: 'userId = :userId',
//         ExpressionAttributeValues: {
//             ':userId': userId
//         },
  
//         ScanIndexForward: false
//     }).promise()

//     const items = result.Items

//     return {
//         statusCode: 200,
//         headers: {
//             'Access-Control-Allow-Origin': '*'
//         },
//         body: JSON.stringify({
//             items
//         })
//     }
// }

