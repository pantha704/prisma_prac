import { PrismaClient } from '@prisma/client'
import promptSync from 'prompt-sync'
import { getTodos, getUser } from './get'
const prompt = promptSync()
const client = new PrismaClient()

// UPDATE USER
async function updateUser(id?: number) {
  if (!id) {
    id = parseInt(prompt('Enter the user id : ')!)
  }
  const new_username = prompt('Enter the username : ')
  const new_password = prompt('Enter the password : ')
  const new_age = prompt('Enter the age : ')
  const new_city = prompt('Enter the city : ')

  const prev_data = (await getUser(id)) as any
  const user = await client.user.update({
    where: {
      id: id,
    },
    data: {
      username: new_username || prev_data.username,
      password: new_password || prev_data.password,
      age: parseInt(new_age) || prev_data.age,
      city: new_city || prev_data.city,
    },
  })
  console.log('Updated user successfully : \n', user)
}

// UPDATE TODO
async function updateTodo() {
  const id = parseInt(prompt('Enter the todo id : ')!)
  const title = prompt('Enter the title or leave blank : ')
  const description = prompt('Enter the description or leave blank : ')
  const completed =
    prompt('Enter the completed (t/f) or leave blank : ').toLowerCase() === 't'
  const todos = (await getTodos()) as any

  const todo = await client.todo.update({
    where: {
      id: id,
    },
    data: {
      title: title || todos[0].title,
      description: description || todos[0].description,
      completed: completed || todos[0].completed,
    },
  })
  console.log('Updated todo successfully : \n', todo)
}

export { updateTodo, updateUser }
