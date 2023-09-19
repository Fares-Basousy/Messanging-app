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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon = require("argon2");
const UserSchema_1 = require("../Schema/UserSchema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(userModel, jwt, config) {
        this.userModel = userModel;
        this.jwt = jwt;
        this.config = config;
        this.secret = this.config.get('jwtPass');
    }
    async signup(dto) {
        const hash = await argon.hash(dto.password);
        if (await this.userModel.exists({ user: dto.name })) {
            throw new common_1.ForbiddenException("Name Already Taken.");
        }
        else if (await this.userModel.exists({ email: dto.email })) {
            throw new common_1.ForbiddenException("Email Already Taken.");
        }
        const createdUser = new this.userModel({
            name: dto.name.toLocaleLowerCase(),
            password: hash,
            email: dto.email.toLocaleLowerCase(),
        });
        createdUser.save();
        return createdUser;
    }
    async signin(dto) {
        const user = await this.userModel.findOne({
            email: dto.email.toLocaleLowerCase(),
        });
        if (!user) {
            throw new common_1.ForbiddenException('Credentionals incorrect');
        }
        const ps = await argon.verify(await user.password, dto.password);
        if (!ps) {
            throw new common_1.ForbiddenException('Incorrect password');
        }
        return this.signinToken(user._id.toHexString(), user.name.toLocaleLowerCase());
    }
    async signinToken(userId, name) {
        const payloud = { sub: userId, name };
        const token = await this.jwt.signAsync(payloud, {
            expiresIn: `1d`,
            secret: this.secret,
        });
        return { access_token: token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(UserSchema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map