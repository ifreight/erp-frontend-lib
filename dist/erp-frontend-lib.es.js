import { createElementBlock as o, openBlock as c, renderSlot as i, createTextVNode as u } from "vue";
const r = (t, n) => {
  const e = t.__vccOpts || t;
  for (const [s, _] of n)
    e[s] = _;
  return e;
}, a = {}, f = { class: "i-button" };
function l(t, n) {
  return c(), o("button", f, [
    i(t.$slots, "default", {}, () => [
      n[0] || (n[0] = u("Click me"))
    ])
  ]);
}
const x = /* @__PURE__ */ r(a, [["render", l]]), d = {}, p = { class: "i-input" };
function m(t, n) {
  return c(), o("input", p);
}
const B = /* @__PURE__ */ r(d, [["render", m]]);
export {
  x as IButton,
  B as IInput
};
