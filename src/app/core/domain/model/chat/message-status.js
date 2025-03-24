"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageStatus = exports.Status = void 0;
var Status;
(function (Status) {
    Status["SENT"] = "sent";
    Status["DELIVERED"] = "delivered";
    Status["READ"] = "read";
})(Status || (exports.Status = Status = {}));
var MessageStatus = /** @class */ (function () {
    function MessageStatus(userId, status, statusTimestamp) {
        this.userId = userId;
        this.status = status;
        this.statusTimestamp = statusTimestamp;
    }
    return MessageStatus;
}());
exports.MessageStatus = MessageStatus;
