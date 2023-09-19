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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = exports.Room = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
let Room = class Room {
    constructor() {
        this.messages = [];
    }
};
exports.Room = Room;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Room.prototype, "messages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose.Types.ObjectId], ref: 'User', required: true }),
    __metadata("design:type", Array)
], Room.prototype, "users", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    __metadata("design:type", Array)
], Room.prototype, "names", void 0);
exports.Room = Room = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            getters: true,
            transform: function (doc, ret) {
                delete ret.password;
            },
        },
    })
], Room);
exports.RoomSchema = mongoose_1.SchemaFactory.createForClass(Room);
//# sourceMappingURL=Room.schema.js.map