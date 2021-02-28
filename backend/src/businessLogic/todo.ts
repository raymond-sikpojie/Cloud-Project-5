import * as uuid from 'uuid'

import { TodoAccess } from '../dataLayer/todoAccess'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
// import { createLogger } from '../utils/logger'

const todoAccess = new TodoAccess()

export async function createTodo(userId: string, createTodoRequest: CreateTodoRequest): Promise<TodoItem> {
    const todoId = uuid.v4()
  
    const item: TodoItem = {
      userId,
      todoId,
      createdAt: new Date().toISOString(),
      done: false,
      attachmentUrl: null,
      ...createTodoRequest
    }
  
    // logger.info(`Creating todo ${todoId} for user ${userId}`, { userId, todoId, todoItem: newItem })
  
    await todoAccess.createTodoItem(item)
  
    return item
  }

  export async function getTodos(userId: string): Promise<TodoItem[]> {
    // logger.info(`Retrieving all todos for user ${userId}`, { userId })
    return await todoAccess.getTodos(userId)
  }


  export async function updateTodo(todoId: string, updateTodoRequest: UpdateTodoRequest) {
    // logger.info(`Updating todo ${todoId} for user ${userId}`, { userId, todoId, todoUpdate: updateTodoRequest })
    return todoAccess.updateTodoItem(todoId, updateTodoRequest as TodoUpdate)
  }


  export async function deleteTodo(todoId: string) {
    // logger.info(`Deleting todo ${todoId} for user ${userId}`, { userId, todoId })
   return todoAccess.deleteTodo(todoId)
  }