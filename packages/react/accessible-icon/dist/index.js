"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AccessibleIcon: () => AccessibleIcon,
  Root: () => Root2
});
module.exports = __toCommonJS(index_exports);

// src/accessible-icon.tsx
var React = __toESM(require("react"));
var VisuallyHiddenPrimitive = __toESM(require("@radix-ui/react-visually-hidden"));
var import_jsx_runtime = require("react/jsx-runtime");
var NAME = "AccessibleIcon";
var AccessibleIcon = ({ children, label }) => {
  const child = React.Children.only(children);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    React.cloneElement(child, {
      // accessibility
      "aria-hidden": "true",
      focusable: "false"
      // See: https://allyjs.io/tutorials/focusing-in-svg.html#making-svg-elements-focusable
    }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisuallyHiddenPrimitive.Root, { children: label })
  ] });
};
AccessibleIcon.displayName = NAME;
var Root2 = AccessibleIcon;
//# sourceMappingURL=index.js.map
