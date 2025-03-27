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
exports.deleteTodo = deleteTodo;
exports.deleteUser = deleteUser;
const client_1 = require("@prisma/client");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
const client = new client_1.PrismaClient();
// DELETE USER
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            id = parseInt(prompt('Enter the user id : '));
        }
        try {
            yield client.todo.deleteMany({
                where: {
                    userId: id,
                },
            });
            const user = yield client.user.delete({
                where: {
                    id: id,
                },
                select: {
                    username: true,
                },
            });
            console.log(`Deleted user ${user.username} successfully\n`);
        }
        catch (error) {
            console.log(error);
        }
    });
}
// DELETE TODO
function deleteTodo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            id = parseInt(prompt('Enter the todo id : '));
        }
        const todo = yield client.todo.delete({
            where: {
                id: id,
            },
        });
        console.log(`Deleted todo ${todo.title} successfully\n`);
    });
}
