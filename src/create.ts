import { PrismaClient } from '@prisma/client'
import promptSync from 'prompt-sync'

const prompt = promptSync()
const client = new PrismaClient()

// CREATE JOHN DOE
async function createJohnDoe() {
  const user = await client.user.create({
    data: {
      username: 'John Doe',
      password: 'password',
      age: 20,
      city: 'New York',
      todos: {
        create: {
          title: 'Buy groceries',
          description: 'Buy groceries',
          completed: false,
        },
      },
    },
  })
  console.log('Created a user successfully : \n', user)
}

// CREATE USER
async function createUser() {
  const username = prompt('Enter the username : ')
  const password = prompt('Enter the password : ')
  const age = parseInt(prompt('Enter the age : '))
  const createTodo =
    prompt('Do you want to create a todo? (y/n) : ').toLowerCase() === 'y'
  const city = prompt('Enter the city : ')
  const title = prompt('Enter the title or leave blank: ')
  const description = prompt('Enter the description or leave blank : ')
  const completed =
    prompt('Enter the completed (t/f) or leave blank : ').toLowerCase() === 't'

  if (createTodo) {
    const user = await client.user.create({
      data: {
        username: username,
        password: password,
        age: age,
        city: city,
        todos: {
          create: {
            title: title || '',
            description: description || '',
            completed: completed || false,
          },
        },
      },
    })
    console.log('Created a user successfully : \n', user)
  } else {
    const user = await client.user.create({
      data: {
        username: username,
        password: password,
        age: age,
        city: city,
      },
    })
    console.log('Created a user successfully : \n', user)
  }
}

// CREATE TODO
async function createTodo(id?: number) {
  if (!id) {
    id = parseInt(prompt('Enter your user id : ')!)
  }
  const title = prompt('Enter the title : ')
  const description = prompt('Enter the description : ')
  const completed =
    prompt('Enter the completed (t/f) or leave blank : ').toLowerCase() === 't'
  try {
    const todo = await client.todo.create({
      data: {
        title: title,
        description: description,
        completed: completed,
        userId: id,
      },
    })
    console.log('Created todo successfully : \n', todo)
  } catch (error) {
    console.log(error)
  }
}

export { createJohnDoe, createUser, createTodo }
