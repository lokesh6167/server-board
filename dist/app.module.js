"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const canvas_module_1 = require("./canvas/canvas.module");
const user_entity_1 = require("./users/user.entity");
const canvas_item_entity_1 = require("./canvas/canvas-item.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'Test@123',
                database: 'board',
                entities: [user_entity_1.User, canvas_item_entity_1.CanvasItem],
                synchronize: true,
                logging: true
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: 'lokesh-jwt-board',
                signOptions: { expiresIn: '1d' },
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            canvas_module_1.CanvasModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map