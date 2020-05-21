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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
let User = (() => {
    let User = class User extends typeorm_1.BaseEntity {
        assignUserId() {
            this.id = uuid_1.v4();
        }
    };
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.PrimaryColumn("uuid"),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], User.prototype, "created_at", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column("varchar", { length: 255, unique: true }),
        class_validator_1.IsEmail(),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column("boolean", { default: false }),
        __metadata("design:type", Boolean)
    ], User.prototype, "verified", void 0);
    __decorate([
        typeorm_1.Column("text"),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column("varchar", { length: 255 }),
        __metadata("design:type", String)
    ], User.prototype, "firstName", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column("varchar", { length: 255 }),
        __metadata("design:type", String)
    ], User.prototype, "lastName", void 0);
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.Int),
        typeorm_1.Column("integer", { default: -1 }),
        __metadata("design:type", Number)
    ], User.prototype, "age", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column("varchar", { length: 255, default: "location" }),
        __metadata("design:type", String)
    ], User.prototype, "location", void 0);
    __decorate([
        type_graphql_1.Field(() => [String]),
        typeorm_1.Column("simple-array", { default: [] }),
        __metadata("design:type", Array)
    ], User.prototype, "companies", void 0);
    __decorate([
        typeorm_1.BeforeInsert(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], User.prototype, "assignUserId", null);
    User = __decorate([
        type_graphql_1.ObjectType(),
        typeorm_1.Entity()
    ], User);
    return User;
})();
exports.User = User;
//# sourceMappingURL=User.js.map