import { PrismaClient } from '@prisma/client'
import promptSync from 'prompt-sync'

const prompt = promptSync()
const client = new PrismaClient()

// DELETE USER
async function deleteUser(id?: number) {
  if (!id) {
    id = parseInt(prompt('Enter the user id : ')!)
  }
  try {
    await client.todo.deleteMany({
      where: {
        userId: id,
      },
    })
    const user = await client.user.delete({
      where: {
        id: id,
      },
      select: {
        username: true,
      },
    })
    console.log(`Deleted user ${user.username} successfully\n`)
  } catch (error) {
    console.log(error)
  }
}

// DELETE TODO
async function deleteTodo(id?: number) {
  if (!id) {
    id = parseInt(prompt('Enter the todo id : ')!)
  }
  const todo = await client.todo.delete({
    where: {
      id: id,
    },
  })
  console.log(`Deleted todo ${todo.title} successfully\n`)
}

export { deleteTodo, deleteUser }
