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
exports.createJohnDoe = createJohnDoe;
exports.createUser = createUser;
exports.createTodo = createTodo;
const client_1 = require("@prisma/client");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
const client = new client_1.PrismaClient();
// CREATE JOHN DOE
function createJohnDoe() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield client.user.create({
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
        });
        console.log('Created a user successfully : \n', user);
    });
}
// CREATE USER
function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const username = prompt('Enter the username : ');
        const password = prompt('Enter the password : ');
        const age = parseInt(prompt('Enter the age : '));
        const createTodo = prompt('Do you want to create a todo? (y/n) : ').toLowerCase() === 'y';
        const city = prompt('Enter the city : ');
        const title = prompt('Enter the title or leave blank: ');
        const description = prompt('Enter the description or leave blank : ');
        const completed = prompt('Enter the completed (t/f) or leave blank : ').toLowerCase() === 't';
        if (createTodo) {
            const user = yield client.user.create({
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
            });
            console.log('Created a user successfully : \n', user);
        }
        else {
            const user = yield client.user.create({
                data: {
                    username: username,
                    password: password,
                    age: age,
                    city: city,
                },
            });
            console.log('Created a user successfully : \n', user);
        }
    });
}
// CREATE TODO
function createTodo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            id = parseInt(prompt('Enter your user id : '));
        }
        const title = prompt('Enter the title : ');
        const description = prompt('Enter the description : ');
        const completed = prompt('Enter the completed (t/f) or leave blank : ').toLowerCase() === 't';
        try {
            const todo = yield client.todo.create({
                data: {
                    title: title,
                    description: description,
                    completed: completed,
                    userId: id,
                },
            });
            console.log('Created todo successfully : \n', todo);
        }
        catch (error) {
            console.log(error);
        }
    });
}
