"use strict";
// Data ENUM bytes
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTypes = void 0;
var DataTypes;
(function (DataTypes) {
    DataTypes["EOF"] = "";
    DataTypes["NULLBYTE"] = "\0";
    DataTypes["OBJECT"] = "\u0001";
    DataTypes["ENTITYID"] = "\u0002";
    DataTypes["STRING"] = "\u0003";
    DataTypes["NUMBER"] = "\u0004";
    DataTypes["TRUE"] = "\u0005";
    DataTypes["FALSE"] = "\u0006";
    DataTypes["MAP"] = "\u0007";
    DataTypes["SET"] = "\b";
    DataTypes["NULL"] = "\t";
    DataTypes["ARRAY"] = "\n";
    DataTypes["ESCAPECHAR"] = "\v";
})(DataTypes = exports.DataTypes || (exports.DataTypes = {}));
//# sourceMappingURL=Types.js.map