import { PrismaClient } from '@prisma/client'
import promptSync from 'prompt-sync'

const prompt = promptSync()
const client = new PrismaClient()

// GET USER
async function getUser(id?: number) {
  if (!id) {
    id = parseInt(prompt('Enter the user id : ')!)
  }
  const user = await client.user.findFirst({
    where: {
      id: id,
    },
    select: {
      username: true,
      todos: true,
      createdAt: true,
      updatedAt: true,
      id: true,
      age: true,
      city: true,
      //   password: true,
    },
  })
  console.log('Found user successfully : \n', user)
  return user
}

// GET TODOS
async function getTodos(id?: number, todoId?: number) {
  if (!id) {
    id = parseInt(prompt('Enter your user id : ')!)
  }
  if (!todoId) {
    todoId = parseInt(prompt('Enter your todo id or leave blank : ')!)
  }
  const todos = await client.todo.findMany({
    where: {
      userId: id,
      id: todoId || undefined,
    },
    select: {
      id: true,
      title: true,
      description: true,
      completed: true,
      userId: true,
    },
  })
  console.log('Todos : \n', todos)
  return todos
}

export { getTodos, getUser }
