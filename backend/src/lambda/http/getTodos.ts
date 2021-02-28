import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { getTodos } from '../../businessLogic/todo'
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


