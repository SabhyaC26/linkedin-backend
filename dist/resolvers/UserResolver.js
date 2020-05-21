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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entity/User");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let UserResolver = (() => {
    let UserResolver = class UserResolver {
        users() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield User_1.User.find();
            });
        }
        user(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield User_1.User.findOne(id);
                if (!user) {
                    throw new Error("User not found!");
                }
                return user;
            });
        }
        updateUserEmail(id, newEmail) {
            return __awaiter(this, void 0, void 0, function* () {
                var user = yield User_1.User.findOne(id);
                if (!user) {
                    throw new Error("User not found!");
                }
                user.email = newEmail;
                User_1.User.save(user);
                const errors = yield class_validator_1.validate(user);
                if (errors.length > 0) {
                    console.log(errors);
                    throw new Error("Validation checks on updated user failed!");
                }
                else {
                    typeorm_1.getManager().save(user);
                }
            });
        }
        updateUserfirstName(id, newfirstName) {
            return __awaiter(this, void 0, void 0, function* () {
                var user = yield User_1.User.findOne(id);
                if (!user) {
                    throw new Error("User not found!");
                }
                user.firstName = newfirstName;
                User_1.User.save(user);
                const errors = yield class_validator_1.validate(user);
                if (errors.length > 0) {
                    console.log(errors);
                    throw new Error("Validation checks on updated user failed!");
                }
                else {
                    typeorm_1.getManager().save(user);
                }
            });
        }
        updateUserlastName(id, newlastName) {
            return __awaiter(this, void 0, void 0, function* () {
                var user = yield User_1.User.findOne(id);
                if (!user) {
                    throw new Error("User not found!");
                }
                user.lastName = newlastName;
                User_1.User.save(user);
                const errors = yield class_validator_1.validate(user);
                if (errors.length > 0) {
                    console.log(errors);
                    throw new Error("Validation checks on updated user failed!");
                }
                else {
                    typeorm_1.getManager().save(user);
                }
            });
        }
        updateUserLocation(id, newLocation) {
            return __awaiter(this, void 0, void 0, function* () {
                var user = yield User_1.User.findOne(id);
                if (!user) {
                    throw new Error("User not found!");
                }
                user.location = newLocation;
                User_1.User.save(user);
                const errors = yield class_validator_1.validate(user);
                if (errors.length > 0) {
                    console.log(errors);
                    throw new Error("Validation checks on updated user failed!");
                }
                else {
                    typeorm_1.getManager().save(user);
                }
            });
        }
    };
    __decorate([
        type_graphql_1.Query(() => [User_1.User]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "users", null);
    __decorate([
        type_graphql_1.Query(() => User_1.User),
        __param(0, type_graphql_1.Arg("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "user", null);
    __decorate([
        type_graphql_1.Mutation(),
        __param(0, type_graphql_1.Arg("id")),
        __param(1, type_graphql_1.Arg("newEmail")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "updateUserEmail", null);
    __decorate([
        type_graphql_1.Mutation(),
        __param(0, type_graphql_1.Arg("id")),
        __param(1, type_graphql_1.Arg("newfirstName")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "updateUserfirstName", null);
    __decorate([
        type_graphql_1.Mutation(),
        __param(0, type_graphql_1.Arg("id")),
        __param(1, type_graphql_1.Arg("newlastName")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "updateUserlastName", null);
    __decorate([
        type_graphql_1.Mutation(),
        __param(0, type_graphql_1.Arg("id")),
        __param(1, type_graphql_1.Arg("newLocation")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "updateUserLocation", null);
    UserResolver = __decorate([
        type_graphql_1.Resolver()
    ], UserResolver);
    return UserResolver;
})();
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map