"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPError = void 0;
class HTTPError extends Error {
    constructor(message, code = 400) {
        super(message);
        this.code = code;
    }
}
exports.HTTPError = HTTPError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSFRUUEVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0hUVFBFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLFNBQVUsU0FBUSxLQUFLO0lBQ25DLFlBQVksT0FBZSxFQUFTLE9BQWUsR0FBRztRQUNyRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFEb0IsU0FBSSxHQUFKLElBQUksQ0FBYztJQUV0RCxDQUFDO0NBQ0Q7QUFKRCw4QkFJQyJ9