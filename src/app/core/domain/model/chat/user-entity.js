"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["PATIENT"] = "patient";
    UserRole["DOCTOR"] = "doctor";
    UserRole["STAFF"] = "staff";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserEntity = /** @class */ (function () {
    function UserEntity(id, username, email, avatar, role, lastActive, isActive, createdAt) {
        if (isActive === void 0) { isActive = true; }
        if (createdAt === void 0) { createdAt = new Date(); }
        this.id = id;
        this.username = username;
        this.email = email;
        this.avatar = avatar;
        this.role = role;
        this.lastActive = lastActive;
        this.isActive = isActive;
        this.createdAt = createdAt;
    }
    UserEntity.prototype.isOnline = function () {
        if (!this.lastActive)
            return false;
        var fiveMinutesAgo = new Date(Date.now() - 5 * 60000);
        return this.lastActive > fiveMinutesAgo;
    };
    UserEntity.prototype.getFullName = function () {
        return this.username;
    };
    return UserEntity;
}());
exports.UserEntity = UserEntity;
