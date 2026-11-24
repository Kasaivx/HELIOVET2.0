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
import { Controller, Post, UseGuards, Body } from "@nestjs/common";
import { authJwtGuard } from "../src/auth/jwt-auth.guard.js";
import { AuthService } from "../src/auth/auth.service.js";
import { CLINICregisterDTO, loginDTO } from "../src/auth/regester.dto.js";
let AuthController = class AuthController {
    AuthService;
    constructor(AuthService) {
        this.AuthService = AuthService;
    }
    regsiterClinic(dto) {
        return this.AuthService.regsiterClinic(dto);
    }
    loginfn(dto) {
        return this.AuthService.loginfn(dto);
    }
};
__decorate([
    Post('register/clinic'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CLINICregisterDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "regsiterClinic", null);
__decorate([
    UseGuards(authJwtGuard),
    Post('login'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "loginfn", null);
AuthController = __decorate([
    Controller('auth'),
    __metadata("design:paramtypes", [AuthService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map