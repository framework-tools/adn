"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokenizer = void 0;
const EntityID_1 = require("./EntityID");
const InputStream_1 = require("./InputStream");
const Types_1 = require("./Types");
class Tokenizer {
    inputStream;
    current;
    constructor(input) {
        this.inputStream = new InputStream_1.InputStream(input);
    }
    read_next() {
        let inputStream = this.inputStream;
        function read_until(predicate) {
            var str = '';
            while (!inputStream.eof()) {
                if (inputStream.peek() === Types_1.DataTypes.ESCAPECHAR)
                    inputStream.pos++;
                else if (!predicate(inputStream.peek()))
                    break;
                str += inputStream.next();
            }
            inputStream.next(); // ignore the final predicate
            return str;
        }
        function is_not_nullbyte(ch) {
            return ch !== Types_1.DataTypes.NULLBYTE;
        }
        function readObject() {
            return {
                type: 'OBJECT'
            };
        }
        function readString() {
            return {
                type: 'STRING',
                value: read_until(is_not_nullbyte)
            };
        }
        function readEntityID() {
            return {
                type: 'ENTITYID',
                value: new EntityID_1.EntityID(read_until(is_not_nullbyte))
            };
        }
        function readNumber() {
            return {
                type: 'NUMBER',
                value: parseInt(read_until(is_not_nullbyte), 16)
            };
        }
        let ch = inputStream.next();
        switch (ch) {
            case Types_1.DataTypes.OBJECT: return readObject();
            case Types_1.DataTypes.STRING: return readString();
            case Types_1.DataTypes.ENTITYID: return readEntityID();
            case Types_1.DataTypes.NULLBYTE: return { type: 'NULLBYTE' };
            case Types_1.DataTypes.NUMBER: return readNumber();
            case Types_1.DataTypes.EOF: return { type: 'EOF' };
            default:
                throw new Error('This should never be reached');
        }
    }
    peek() {
        return this.current || (this.current = this.read_next());
    }
    next() {
        var tok = this.current;
        this.current = undefined;
        return tok || this.read_next();
    }
    eof() {
        return this.peek().type === 'EOF';
    }
}
exports.Tokenizer = Tokenizer;
//# sourceMappingURL=Tokenizer.js.map