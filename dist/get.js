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
exports.getTodos = getTodos;
exports.getUser = getUser;
const client_1 = require("@prisma/client");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
const client = new client_1.PrismaClient();
// GET USER
function getUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            id = parseInt(prompt('Enter the user id : '));
        }
        const user = yield client.user.findFirst({
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
        });
        console.log('Found user successfully : \n', user);
        return user;
    });
}
// GET TODOS
function getTodos(id, todoId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            id = parseInt(prompt('Enter your user id : '));
        }
        if (!todoId) {
            todoId = parseInt(prompt('Enter your todo id or leave blank : '));
        }
        const todos = yield client.todo.findMany({
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
        });
        console.log('Todos : \n', todos);
        return todos;
    });
}
