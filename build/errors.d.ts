export declare enum errors {
    server = "500 Server",
    internal = "internal errors",
    goCardlessValidationError = "go cardless validation error",
    goCardlessApiError = "invalid api usage"
}
export declare class GoCardlessError extends Error {
    type: errors;
    data: any;
    constructor(type: errors, data?: any);
    static isGoCardlessError(err: any): err is GoCardlessError;
    toJSON(): {
        type: errors;
        data: any;
    };
}
