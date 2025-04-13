"use strict";
"use client";
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
  Announce: () => Announce,
  Root: () => Root
});
module.exports = __toCommonJS(index_exports);

// src/announce.tsx
var React = __toESM(require("react"));
var import_react_dom = __toESM(require("react-dom"));
var import_react_compose_refs = require("@radix-ui/react-compose-refs");
var import_react_primitive = require("@radix-ui/react-primitive");
var import_react_use_layout_effect = require("@radix-ui/react-use-layout-effect");
var import_jsx_runtime = require("react/jsx-runtime");
var ROLES = {
  polite: "status",
  assertive: "alert",
  off: "none"
};
var listenerMap = /* @__PURE__ */ new Map();
var NAME = "Announce";
var Announce = React.forwardRef((props, forwardedRef) => {
  const {
    "aria-relevant": ariaRelevant,
    children,
    type = "polite",
    role = ROLES[type],
    regionIdentifier,
    ...regionProps
  } = props;
  const ariaAtomic = ["true", true].includes(regionProps["aria-atomic"]);
  const ownerDocumentRef = React.useRef(document);
  const setOwnerDocumentFromRef = React.useCallback((node) => {
    if (node) {
      ownerDocumentRef.current = node.ownerDocument;
    }
  }, []);
  const ownRef = React.useRef(null);
  const ref = (0, import_react_compose_refs.useComposedRefs)(forwardedRef, ownRef, setOwnerDocumentFromRef);
  const [region, setRegion] = React.useState();
  const relevant = ariaRelevant ? Array.isArray(ariaRelevant) ? ariaRelevant.join(" ") : ariaRelevant : void 0;
  const getLiveRegionElement = React.useCallback(() => {
    const ownerDocument = ownerDocumentRef.current;
    const regionConfig = { type, role, relevant, id: regionIdentifier, atomic: ariaAtomic };
    const regionSelector = buildSelector(regionConfig);
    const element = ownerDocument.querySelector(regionSelector);
    return element || buildLiveRegionElement(ownerDocument, regionConfig);
  }, [ariaAtomic, relevant, role, type, regionIdentifier]);
  (0, import_react_use_layout_effect.useLayoutEffect)(() => {
    setRegion(getLiveRegionElement());
  }, [getLiveRegionElement]);
  React.useEffect(() => {
    const ownerDocument = ownerDocumentRef.current;
    function updateAttributesOnVisibilityChange() {
      regionElement.setAttribute("role", ownerDocument.hidden ? "none" : role);
      regionElement.setAttribute("aria-live", ownerDocument.hidden ? "off" : type);
    }
    const regionElement = getLiveRegionElement();
    if (!listenerMap.get(regionElement)) {
      ownerDocument.addEventListener("visibilitychange", updateAttributesOnVisibilityChange);
      listenerMap.set(regionElement, 1);
    } else {
      const announceCount = listenerMap.get(regionElement);
      listenerMap.set(regionElement, announceCount + 1);
    }
    return function() {
      const announceCount = listenerMap.get(regionElement);
      listenerMap.set(regionElement, announceCount - 1);
      if (announceCount === 1) {
        ownerDocument.removeEventListener("visibilitychange", updateAttributesOnVisibilityChange);
      }
    };
  }, [getLiveRegionElement, role, type]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(React.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_primitive.Primitive.div, { ...regionProps, ref, children }),
    region && import_react_dom.default.createPortal(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children }), region)
  ] });
});
Announce.displayName = NAME;
function buildLiveRegionElement(ownerDocument, { type, relevant, role, atomic, id }) {
  const element = ownerDocument.createElement("div");
  element.setAttribute(getLiveRegionPartDataAttr(id), "");
  element.setAttribute(
    "style",
    "position: absolute; top: -1px; width: 1px; height: 1px; overflow: hidden;"
  );
  ownerDocument.body.appendChild(element);
  element.setAttribute("aria-live", type);
  element.setAttribute("aria-atomic", String(atomic || false));
  element.setAttribute("role", role);
  if (relevant) {
    element.setAttribute("aria-relevant", relevant);
  }
  return element;
}
function buildSelector({ type, relevant, role, atomic, id }) {
  return `[${getLiveRegionPartDataAttr(id)}]${[
    ["aria-live", type],
    ["aria-atomic", atomic],
    ["aria-relevant", relevant],
    ["role", role]
  ].filter(([, val]) => !!val).map(([attr, val]) => `[${attr}=${val}]`).join("")}`;
}
function getLiveRegionPartDataAttr(id) {
  return "data-radix-announce-region" + (id ? `-${id}` : "");
}
var Root = Announce;
//# sourceMappingURL=index.js.map
