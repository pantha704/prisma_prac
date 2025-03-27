"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const get_1 = require("./get");
const create_1 = require("./create");
const delete_1 = require("./delete");
const update_1 = require("./update");
const prompt = (0, prompt_sync_1.default)();
let exit = false;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Hello!\nWelcome to your Todo App\nPlease choose an option : ');
        const option = prompt('1. Create John Doe\n2. Create a user\n3. Create a todo\n4. Get a user\n5. Get todo(s)\n6. Update a user\n7. Update a todo\n8. Delete a user\n9. Delete todo(s)\nType "exit" to quit\n');
        switch (option) {
            case '1':
                yield (0, create_1.createJohnDoe)();
                break;
            case '2':
                yield (0, create_1.createUser)();
                break;
            case '3':
                yield (0, create_1.createTodo)();
                break;
            case '4':
                yield (0, get_1.getUser)();
                break;
            case '5':
                yield (0, get_1.getTodos)();
                break;
            case '6':
                yield (0, update_1.updateUser)();
                break;
            case '7':
                yield (0, update_1.updateTodo)();
                break;
            case '8':
                yield (0, delete_1.deleteUser)();
                break;
            case '9':
                yield (0, delete_1.deleteTodo)();
                break;
            case 'exit':
                console.log('Exiting...');
                exit = true;
                break;
            default:
                console.log('Invalid option');
                break;
        }
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        while (!exit) {
            yield main();
        }
    });
}
run();
