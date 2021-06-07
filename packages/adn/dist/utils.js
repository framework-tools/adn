"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHexEscape = exports.fromHex = exports.toHex = void 0;
function toHex(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
        let hex = str.charCodeAt(i).toString(16);
        if (hex.length < 2) {
            hex = '0' + hex;
        }
        result += hex;
    }
    return result;
}
exports.toHex = toHex;
function fromHex(str) {
    return unescape(str.replace(/\\/g, '%'));
}
exports.fromHex = fromHex;
function toHexEscape(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
        let hex = str.charCodeAt(i).toString(16);
        if (hex.length < 2) {
            hex = '0' + hex;
        }
        result += '\\x' + hex;
    }
    return result;
}
exports.toHexEscape = toHexEscape;
//# sourceMappingURL=utils.js.map