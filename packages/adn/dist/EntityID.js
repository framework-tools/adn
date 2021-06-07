"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityID = void 0;
const bson_objectid_1 = __importDefault(require("bson-objectid"));
const util_1 = __importDefault(require("util"));
const COLORS = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    Black: "\x1b[30m",
    Red: "\x1b[31m",
    Green: "\x1b[32m",
    Yellow: "\x1b[33m",
    Blue: "\x1b[34m",
    Magenta: "\x1b[35m",
    Cyan: "\x1b[36m",
    White: "\x1b[37m",
};
/**
 * EntityID
 *
 * examples
 *  - '01|507f1f77bcf86cd799439011'
 */
class EntityID {
    internalID;
    objectID;
    constructor(arg) {
        if (typeof arg === 'string') {
            let [internalIDString, objectIDString] = arg.split('|');
            this.internalID = parseInt(internalIDString, 16);
            this.objectID = new bson_objectid_1.default(objectIDString);
        }
        else if (typeof arg === 'number') {
            this.internalID = arg;
            this.objectID = new bson_objectid_1.default();
        }
        else {
            throw new Error('You must provide an internal ID or entityID string to create a new EntityID');
        }
    }
    [util_1.default.inspect.custom]() {
        return process.stdout.hasColors()
            ? COLORS.Bright + COLORS.Magenta + `EntityID ` + COLORS.White + `[` + COLORS.Magenta + this.toString() + COLORS.White + `]` + COLORS.Reset
            : `EntityID [${this.toString()}]`;
    }
    toString() {
        return this.internalID.toString(16) + '|' + this.objectID.toHexString();
    }
}
exports.EntityID = EntityID;
//# sourceMappingURL=EntityID.js.map