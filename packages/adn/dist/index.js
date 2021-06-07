"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Deserialize_1 = __importDefault(require("./Deserialize"));
const Serialize_1 = __importDefault(require("./Serialize"));
exports.default = {
    deserialize: Deserialize_1.default,
    serialize: Serialize_1.default
};
//# sourceMappingURL=index.js.map