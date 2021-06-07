"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// need deserialise function for each data type
const Tokenizer_1 = require("./Tokenizer");
function deserializeObject(tokenizer) {
    let obj = Object.create(null); // prevent prototype pollution
    Object.freeze(obj.prototype); // prevent prototype pollution
    let next = tokenizer.next();
    while (next.type !== 'NULLBYTE') {
        if (next.type == 'STRING') {
            if (['prototype', '__proto__', 'constructor'].includes(next.value)) { // prevent prototype pollution 
                deserializeNextValue(tokenizer);
                continue;
            }
            obj[next.value] = deserializeNextValue(tokenizer);
        }
        else {
            throw new Error('Tried to serialise an object with a non-string key');
        }
        next = tokenizer.next();
    }
    return obj;
}
function deserializeArray(tokenizer) {
    let arr = [];
    let next = tokenizer.next();
    while (next.type !== 'NULLBYTE') {
        arr.push(deserializeNextValue(tokenizer));
        next = tokenizer.next();
    }
    return arr;
}
function deserializeEntityID(tokenizer, value) {
    return value.value;
}
function deserializeMap(tokenizer, value) {
    let entries = [];
    let peek = tokenizer.peek();
    while (peek.type !== 'NULLBYTE') {
        entries.push([deserializeNextValue(tokenizer), deserializeNextValue(tokenizer)]);
        peek = tokenizer.peek();
    }
    return new Map(entries);
}
const deserializers = {
    'ARRAY': deserializeArray,
    'OBJECT': deserializeObject,
    'ENTITYID': deserializeEntityID,
    'MAP': deserializeMap,
    'SET': () => { throw new Error('Could not serialize: SET'); },
    'EOF': () => { throw new Error('Could not serialize: EOF'); },
    'FALSE': () => false,
    'TRUE': () => true,
    'NULL': () => null,
    'NUMBER': (tokenizer, value) => value.value,
    'STRING': (tokenizer, value) => value.value,
    'NULLBYTE': () => { throw new Error('Cannot deserialise a NULLBYTE'); },
    'ESCAPECHAR': () => { throw new Error('Cannot deserialise a ESCAPECHAR'); },
};
function deserializeNextValue(tokenizer) {
    let next = tokenizer.next();
    let deserializer = deserializers[next.type];
    if (deserializer)
        return deserializer(tokenizer, next);
    throw new Error(`Could not find a deserialiser for ${next.type}`);
}
/**
 * Deserialise an ADN serialized string
 *
 * @param str ADN serialized string
 */
function deserialize(str) {
    let tokenizer = new Tokenizer_1.Tokenizer(str);
    return deserializeNextValue(tokenizer);
}
exports.default = deserialize;
//# sourceMappingURL=Deserialize.js.map