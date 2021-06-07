"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = exports.deserialize = void 0;
const Deserialize_1 = __importDefault(require("./Deserialize"));
exports.deserialize = Deserialize_1.default;
const Serialize_1 = __importDefault(require("./Serialize"));
exports.serialize = Serialize_1.default;
let x = new Map([[123, { xyz: 'abc' }]]);
console.log(Deserialize_1.default(Serialize_1.default(x)));
//# sourceMappingURL=index.js.map