"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var errors;
(function (errors) {
    // 5XX
    errors["server"] = "500 Server";
    errors["internal"] = "internal errors";
    // 4XX
    errors["goCardlessValidationError"] = "go cardless validation error";
    errors["goCardlessApiError"] = "invalid api usage";
})(errors = exports.errors || (exports.errors = {}));
var GoCardlessError = /** @class */ (function (_super) {
    __extends(GoCardlessError, _super);
    function GoCardlessError(type, data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this, JSON.stringify({ message: type, data: data })) || this;
        _this.type = type;
        _this.data = data;
        Object.setPrototypeOf(_this, GoCardlessError.prototype);
        return _this;
    }
    GoCardlessError.isGoCardlessError = function (err) {
        return err instanceof GoCardlessError;
    };
    GoCardlessError.prototype.toJSON = function () {
        return { type: this.type, data: this.data };
    };
    return GoCardlessError;
}(Error));
exports.GoCardlessError = GoCardlessError;
