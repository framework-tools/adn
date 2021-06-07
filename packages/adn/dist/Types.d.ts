import { EntityID } from './EntityID';
export declare enum DataTypes {
    EOF = "",
    NULLBYTE = "\0",
    OBJECT = "\u0001",
    ENTITYID = "\u0002",
    STRING = "\u0003",
    NUMBER = "\u0004",
    TRUE = "\u0005",
    FALSE = "\u0006",
    MAP = "\u0007",
    SET = "\b",
    NULL = "\t",
    ARRAY = "\n",
    ESCAPECHAR = "\v"
}
export declare type DataTypeKeys = keyof typeof DataTypes;
export declare type Token = ObjectToken | ValueToken | EOFToken | NullByteToken | MapToken;
export declare type ValueToken = StringToken | NumberToken | NullToken | EntityIDToken;
export declare type MapToken = {
    type: 'MAP';
};
export declare type ObjectToken = {
    type: 'OBJECT';
};
export declare type EOFToken = {
    type: 'EOF';
};
export declare type StringToken = {
    type: 'STRING';
    value: string;
};
export declare type EntityIDToken = {
    type: 'ENTITYID';
    value: EntityID;
};
export declare type NumberToken = {
    type: 'NUMBER';
    value: number;
};
export declare type NullToken = {
    type: 'NULL';
    value: null;
};
export declare type NullByteToken = {
    type: 'NULLBYTE';
};
//# sourceMappingURL=Types.d.ts.map