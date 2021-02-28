import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { updateTodo } from '../../businessLogic/todo'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const todoId = event.pathParameters.todoId
  const todoUpdate: UpdateTodoRequest = JSON.parse(event.body)

  await updateTodo(todoId, todoUpdate)

  return {
    statusCode: 201,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    body: ""
}


}


