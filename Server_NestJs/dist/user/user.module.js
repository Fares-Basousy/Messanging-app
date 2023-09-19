"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const user_service_1 = require("./user.service");
const common_1 = require("@nestjs/common");
const UserSchema_1 = require("../Schema/UserSchema");
const Room_schema_1 = require("../Schema/Room.schema");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const user_controller_1 = require("./user.controller");
const strategy_1 = require("../auth/strategy");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: UserSchema_1.User.name, schema: UserSchema_1.UserSchema },
                { name: Room_schema_1.Room.name, schema: Room_schema_1.RoomSchema }
            ]),
            jwt_1.JwtModule.register({}),],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, strategy_1.JwtStrategy]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map