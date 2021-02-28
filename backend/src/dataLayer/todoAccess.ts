import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
// import { createLogger } from '../utils/logger'

const XAWS = AWSXRay.captureAWS(AWS)

export class TodoAccess {

    constructor(
      private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
      private readonly todosTable = process.env.TODOS_TABLE,
      private readonly UserIndex = process.env.USERID_INDEX) {
    }
  
    async createTodoItem(todoItem: TodoItem){
      console.log('Getting all groups')
  
      await this.docClient.put({
        TableName: this.todosTable,
        Item: todoItem
      }).promise()
  
    }

    async getTodos(userId: string): Promise<TodoItem[]> {
        // logger.info(`Getting all todos for user ${userId} from ${this.todosTable}`)
    
        const result = await this.docClient.query({
            TableName : this.todosTable,
            IndexName: this.UserIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            },
      
            ScanIndexForward: false
        }).promise()
    
        const items = result.Items
    
        // logger.info(`Found ${items.length} todos for user ${userId} in ${this.todosTable}`)
        
        return items as TodoItem[]
      }

    
      async updateTodoItem(todoId: string, todoUpdate: TodoUpdate) {
        // logger.info(`Updating todo item ${todoId} in ${this.todosTable}`)
    
        await this.docClient.update({
          TableName: this.todosTable,
          Key: {
            todoId
          },
          UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
          ExpressionAttributeNames: {
            "#name": "name"
          },
          ExpressionAttributeValues: {
            ":name": todoUpdate.name,
            ":dueDate": todoUpdate.dueDate,
            ":done": todoUpdate.done
          }
        }).promise()   
      }


      async deleteTodo(todoId: string) {
        // logger.info(`Deleting todo item ${todoId} from ${this.todosTable}`)
    
        await this.docClient.delete({
          TableName: this.todosTable,
          Key: {
            todoId
          }
        }).promise()    
      }
  
  }