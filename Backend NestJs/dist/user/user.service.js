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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const Room_schema_1 = require("../Schema/Room.schema");
const UserSchema_1 = require("../Schema/UserSchema");
let UserService = class UserService {
    constructor(roomModel, userModel) {
        this.roomModel = roomModel;
        this.userModel = userModel;
    }
    async CreateRoom(request) {
        const user1Id = await new mongoose_1.default.Types.ObjectId(request.user1);
        const u1 = await this.userModel.findOne({ _id: user1Id });
        const u2 = await this.userModel.findOne({ name: request.user2 });
        console.log(u1);
        if (u2 == null) {
            return "User not found.";
        }
        else if (await this.roomModel.exists({ users: { $all: [u1._id, u2._id] } })) {
            return "Room already exists.";
        }
        else {
            const room = new this.roomModel({ users: [u1._id, u2._id], names: [u1.name, u2.name] });
            room.save();
            await this.userModel.updateOne({ _id: u1._id }, { $push: { rooms: room._id } });
            await this.userModel.updateOne({ _id: u2._id }, { $push: { rooms: room._id } });
            return room;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(Room_schema_1.Room.name)),
    __param(1, (0, mongoose_2.InjectModel)(UserSchema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model, mongoose_1.Model])
], UserService);
//# sourceMappingURL=user.service.js.map