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
exports.updateTodo = updateTodo;
exports.updateUser = updateUser;
const client_1 = require("@prisma/client");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const get_1 = require("./get");
const prompt = (0, prompt_sync_1.default)();
const client = new client_1.PrismaClient();
// UPDATE USER
function updateUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            id = parseInt(prompt('Enter the user id : '));
        }
        const new_username = prompt('Enter the username : ');
        const new_password = prompt('Enter the password : ');
        const new_age = prompt('Enter the age : ');
        const new_city = prompt('Enter the city : ');
        const prev_data = (yield (0, get_1.getUser)(id));
        const user = yield client.user.update({
            where: {
                id: id,
            },
            data: {
                username: new_username || prev_data.username,
                password: new_password || prev_data.password,
                age: parseInt(new_age) || prev_data.age,
                city: new_city || prev_data.city,
            },
        });
        console.log('Updated user successfully : \n', user);
    });
}
// UPDATE TODO
function updateTodo() {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(prompt('Enter the todo id : '));
        const title = prompt('Enter the title or leave blank : ');
        const description = prompt('Enter the description or leave blank : ');
        const completed = prompt('Enter the completed (t/f) or leave blank : ').toLowerCase() === 't';
        const todos = (yield (0, get_1.getTodos)());
        const todo = yield client.todo.update({
            where: {
                id: id,
            },
            data: {
                title: title || todos[0].title,
                description: description || todos[0].description,
                completed: completed || todos[0].completed,
            },
        });
        console.log('Updated todo successfully : \n', todo);
    });
}
