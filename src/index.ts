import promptSync from 'prompt-sync'
import { getUser, getTodos } from './get'
import { createJohnDoe, createUser, createTodo } from './create'
import { deleteUser, deleteTodo } from './delete'
import { updateUser, updateTodo } from './update'

const prompt = promptSync()
let exit = false
async function main() {
  console.log('Hello! \n Welcome to your Todo App\nPlease choose an option : ')
  const option = prompt(
    '1. Create John Doe\n2. Create a user\n3. Create a todo\n4. Get a user\n5. Get todos\n6. Update a user\n7. Update a todo\n8. Delete a user\n9. Delete a todo\nType "exit" to quit\n'
  )
  switch (option) {
    case '1':
      await createJohnDoe()
      break
    case '2':
      await createUser()
      break
    case '3':
      await createTodo()
      break
    case '4':
      await getUser()
      break
    case '5':
      await getTodos()
      break
    case '6':
      await updateUser()
      break
    case '7':
      await updateTodo()
      break
    case '8':
      await deleteUser()
      break
    case '9':
      await deleteTodo()
      break
    case 'exit':
      console.log('Exiting...')
      exit = true
      break
    default:
      console.log('Invalid option')
      break
  }
}

while (!exit) {
  main()
}
