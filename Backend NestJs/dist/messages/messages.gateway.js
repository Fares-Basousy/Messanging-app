"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const message_dto_1 = require("./dto/message.dto");
const socket_io_1 = require("socket.io");
const room_dto_1 = require("../user/dto/room.dto");
const Room_schema_1 = require("../Schema/Room.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const mongoose_2 = require("mongoose");
const UserSchema_1 = require("../Schema/UserSchema");
let MessagesGateway = class MessagesGateway {
    constructor(roomModel, userModel) {
        this.roomModel = roomModel;
        this.userModel = userModel;
    }
    async handleConnection(client) {
        let id;
        if (Array.isArray(client.handshake.query.id)) {
            id = client.handshake.query.id.join('');
        }
        else {
            id = client.handshake.query.id;
        }
        console.log(id);
        const objectId = new mongoose.Types.ObjectId(id);
        console.log(id);
        const rooms = await this.roomModel.find({ users: { $in: objectId } });
        rooms.forEach((room) => {
            client.join(room._id.toHexString());
        });
        console.log(rooms);
        client.emit('initialize', { rooms });
    }
    async newMsg(messageDto) {
        console.log(messageDto);
        const roomid = new mongoose.Types.ObjectId(messageDto.room);
        const room = await this.roomModel.findOneAndUpdate({ _id: roomid }, { $push: { messages: messageDto } }, { returnNewDocument: true });
        this.server.to(room._id.toHexString()).emit('sendmsg', (messageDto));
    }
    async openChat(roomDto) {
        const room = await this.roomModel.findOne({ _id: roomDto._id });
        this.server.to(roomDto._id).emit('openchat', (room.messages));
    }
};
exports.MessagesGateway = MessagesGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagesGateway.prototype, "server", void 0);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendmsg'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_dto_1.MessageDto]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "newMsg", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('openchat'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [room_dto_1.RoomDto]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "openChat", null);
exports.MessagesGateway = MessagesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(5000, {
        cors: {
            origin: '*',
        },
    }),
    __param(0, (0, mongoose_1.InjectModel)(Room_schema_1.Room.name)),
    __param(1, (0, mongoose_1.InjectModel)(UserSchema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.Model])
], MessagesGateway);
//# sourceMappingURL=messages.gateway.js.map