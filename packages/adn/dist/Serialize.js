"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityID_1 = require("./EntityID");
const Types_1 = require("./Types");
const utils_1 = require("./utils");
function getType(value) {
    if (value === false)
        return 'FALSE';
    if (value === true)
        return 'TRUE';
    if (typeof value === 'number')
        return 'NUMBER';
    if (typeof value === 'string')
        return 'STRING';
    if (value === null)
        return 'NULL';
    if (Array.isArray(value))
        return 'ARRAY';
    if (value instanceof EntityID_1.EntityID)
        return 'ENTITYID';
    if (value instanceof Map)
        return 'MAP';
    if (value instanceof Set)
        return 'SET';
    if (typeof value === 'object' && value !== null)
        return 'OBJECT';
    throw new Error(`Could not serialise value x${utils_1.toHex(value)}`);
}
function serializeArray(array) {
    return Types_1.DataTypes.ARRAY + array.map(serializeValue).join('') + Types_1.DataTypes.NULLBYTE;
}
function serialiseObject(obj) {
    return Types_1.DataTypes.OBJECT + Object
        .entries(obj)
        .map(([key, value]) => serializers['STRING'](key) + serializeValue(value))
        .join('') + Types_1.DataTypes.NULLBYTE;
}
function serializeEntityID(value) {
    return Types_1.DataTypes.ENTITYID + value.toString() + Types_1.DataTypes.NULLBYTE;
}
function serializeMap(value) {
    let str = Types_1.DataTypes.MAP;
    let entries = value.entries();
    for (let [key, value] of entries) {
        str += serializeValue(key) + serializeValue(value);
    }
    return str + Types_1.DataTypes.NULLBYTE;
}
const serializers = {
    'ARRAY': serializeArray,
    'OBJECT': serialiseObject,
    'ENTITYID': serializeEntityID,
    'MAP': serializeMap,
    'SET': () => { throw new Error('Could not serialize: SET'); },
    'EOF': () => Types_1.DataTypes.EOF,
    'FALSE': () => Types_1.DataTypes.FALSE,
    'TRUE': () => Types_1.DataTypes.TRUE,
    'NULL': () => Types_1.DataTypes.NULL,
    'NULLBYTE': () => Types_1.DataTypes.NULLBYTE,
    'NUMBER': (value) => Types_1.DataTypes.NUMBER + value.toString(16) + Types_1.DataTypes.NULLBYTE,
    'STRING': (value) => Types_1.DataTypes.STRING + value.replace('\x00', Types_1.DataTypes.ESCAPECHAR + '\x00') + Types_1.DataTypes.NULLBYTE,
    'ESCAPECHAR': () => Types_1.DataTypes.ESCAPECHAR
};
function serialize(value) {
    return serializeValue(value);
}
exports.default = serialize;
function serializeValue(value) {
    let type = getType(value);
    let serializer = serializers[type];
    if (serializer)
        return serializer(value);
    throw new Error('Could not find serializer');
}
//# sourceMappingURL=Serialize.js.map