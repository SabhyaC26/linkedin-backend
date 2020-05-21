"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.AuthResolver = void 0;
const type_graphql_1 = require("type-graphql");
const bcryptjs_1 = require("bcryptjs");
const User_1 = require("../entity/User");
const EmailValidator = __importStar(require("email-validator"));
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let AuthResolver = (() => {
    let AuthResolver = class AuthResolver {
        register(email, password, confirmPasswword, firstName, lastName) {
            return __awaiter(this, void 0, void 0, function* () {
                if (password !== confirmPasswword) {
                    throw new Error("Passwords do not match!");
                }
                const passwordRegex = RegExp("^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,36}$");
                if (!passwordRegex.test(password)) {
                    throw new Error("Password must be between 8-36 chars and and must include at least\
         one upper case letter, one lower case letter, and one numeric digit.");
                }
                if (!EmailValidator.validate(email)) {
                    throw new Error("Invalid email!");
                }
                try {
                    const hashedPassword = yield bcryptjs_1.hash(password, 12);
                    const user = new User_1.User();
                    user.email = email;
                    user.password = hashedPassword;
                    user.firstName = firstName;
                    user.lastName = lastName;
                    const errors = yield class_validator_1.validate(user);
                    if (errors.length > 0) {
                        console.log(errors);
                        throw new Error("Validation checks on user failed!");
                    }
                    else {
                        typeorm_1.getManager().save(user);
                    }
                }
                catch (err) {
                    console.log(err);
                    return false;
                }
                return true;
            });
        }
    };
    __decorate([
        type_graphql_1.Mutation(() => Boolean),
        __param(0, type_graphql_1.Arg("email")),
        __param(1, type_graphql_1.Arg("password")),
        __param(2, type_graphql_1.Arg("confirmPassword")),
        __param(3, type_graphql_1.Arg("firstName")),
        __param(4, type_graphql_1.Arg("lastName")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String, String, String]),
        __metadata("design:returntype", Promise)
    ], AuthResolver.prototype, "register", null);
    AuthResolver = __decorate([
        type_graphql_1.Resolver()
    ], AuthResolver);
    return AuthResolver;
})();
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=AuthResolver.js.map