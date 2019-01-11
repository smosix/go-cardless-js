"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch"));
var errors_1 = require("./errors");
var GoCardlessBankAccountApi_1 = require("./GoCardlessBankAccountApi");
var GoCardlessCustomerApi_1 = require("./GoCardlessCustomerApi");
var GoCardlessMandateApi_1 = require("./GoCardlessMandateApi");
var GoCardlessPaymentApi_1 = require("./GoCardlessPaymentApi");
var GoCardlessPayoutApi_1 = require("./GoCardlessPayoutApi");
var GoCardlessPlanApi_1 = require("./GoCardlessPlanApi");
// docs = https://developer.gocardless.com/api-reference/#api-usage-making-requests
exports.goCardlessTestUrl = "https://api-sandbox.gocardless.com/";
exports.goCardlessLiveUrl = "https://api.gocardless.com";
var GoCardlessApi = /** @class */ (function () {
    function GoCardlessApi(accessToken, sandbox) {
        if (sandbox === void 0) { sandbox = true; }
        this.session_token = "";
        this.sandbox = sandbox;
        this.accessToken = accessToken;
        this.generateSessionToken();
        this.loadApis();
    }
    GoCardlessApi.prototype.loadApis = function () {
        this.customer = new GoCardlessCustomerApi_1.GoCardlessCustomerApi(this);
        this.bankAccount = new GoCardlessBankAccountApi_1.GoCardlessBankAccountApi(this);
        this.mandate = new GoCardlessMandateApi_1.GoCardlessMandateApi(this);
        this.payment = new GoCardlessPaymentApi_1.GoCardlessPaymentApi(this);
        this.payout = new GoCardlessPayoutApi_1.GoCardlessPayoutApi(this);
        this.plan = new GoCardlessPlanApi_1.GoCardlessPlanApi(this);
    };
    GoCardlessApi.prototype.generateSessionToken = function () {
        var dt = new Date().getTime();
        this.session_token = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
        this.loadApis();
        return this.session_token;
    };
    GoCardlessApi.prototype.getHeaders = function () {
        return {
            environment: this.sandbox ? "sandbox" : "live",
            "Content-Type": "application/json",
            Accept: "application/json",
            "GoCardless-Version": "2015-07-06",
            Authorization: "Bearer " + this.accessToken,
            session_token: this.session_token
        };
    };
    GoCardlessApi.prototype.getBaseUrl = function () {
        return this.sandbox ? exports.goCardlessTestUrl : exports.goCardlessLiveUrl;
    };
    GoCardlessApi.prototype.request = function (path, method, data) {
        if (method === void 0) { method = "GET"; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, node_fetch_1.default(this.getBaseUrl() + path, {
                        method: method,
                        headers: this.getHeaders(),
                        body: JSON.stringify(data)
                    }).then(this.handleGoCardlessResponse)];
            });
        });
    };
    GoCardlessApi.prototype.handleGoCardlessResponse = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var responseJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, response.json()];
                    case 1:
                        responseJson = _a.sent();
                        if (responseJson.error) {
                            if (responseJson.error.type === "validation_failed") {
                                throw new errors_1.GoCardlessError(errors_1.errors.goCardlessValidationError, responseJson.error);
                            }
                            else if (responseJson.error.type === "invalid_api_usage") {
                                throw new errors_1.GoCardlessError(errors_1.errors.goCardlessApiError, responseJson.error);
                            }
                            else {
                                throw new errors_1.GoCardlessError(errors_1.errors.server, responseJson.error);
                            }
                        }
                        else {
                            return [2 /*return*/, responseJson];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return GoCardlessApi;
}());
exports.GoCardlessApi = GoCardlessApi;
