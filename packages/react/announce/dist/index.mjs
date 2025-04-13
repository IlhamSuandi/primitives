"use client";

// src/announce.tsx
import * as React from "react";
import ReactDOM from "react-dom";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Primitive } from "@radix-ui/react-primitive";
import { useLayoutEffect } from "@radix-ui/react-use-layout-effect";
import { jsx, jsxs } from "react/jsx-runtime";
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
  const ref = useComposedRefs(forwardedRef, ownRef, setOwnerDocumentFromRef);
  const [region, setRegion] = React.useState();
  const relevant = ariaRelevant ? Array.isArray(ariaRelevant) ? ariaRelevant.join(" ") : ariaRelevant : void 0;
  const getLiveRegionElement = React.useCallback(() => {
    const ownerDocument = ownerDocumentRef.current;
    const regionConfig = { type, role, relevant, id: regionIdentifier, atomic: ariaAtomic };
    const regionSelector = buildSelector(regionConfig);
    const element = ownerDocument.querySelector(regionSelector);
    return element || buildLiveRegionElement(ownerDocument, regionConfig);
  }, [ariaAtomic, relevant, role, type, regionIdentifier]);
  useLayoutEffect(() => {
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
  return /* @__PURE__ */ jsxs(React.Fragment, { children: [
    /* @__PURE__ */ jsx(Primitive.div, { ...regionProps, ref, children }),
    region && ReactDOM.createPortal(/* @__PURE__ */ jsx("div", { children }), region)
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
export {
  Announce,
  Root
};
//# sourceMappingURL=index.mjs.map
