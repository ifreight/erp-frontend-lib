import { createElementBlock as L, openBlock as I, withModifiers as Le, normalizeClass as Ve, renderSlot as ie, isRef as Ke, ref as H, watch as P, onMounted as $e, onUnmounted as Ge, readonly as Ze, defineComponent as We, toRef as me, h as Je, createElementVNode as ue, resolveComponent as xe, createCommentVNode as te, createBlock as Xe, withDirectives as Qe, resolveDynamicComponent as et, mergeProps as tt, createVNode as Be, vShow as st, toDisplayString as Ne, computed as j, Fragment as it, renderList as nt, useTemplateRef as at, provide as rt, watchEffect as ut, onUpdated as lt, useSlots as ot, inject as ht } from "vue";
const ne = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [s, i] of e)
    t[s] = i;
  return t;
}, dt = {
  name: "IButton",
  props: {
    plain: Boolean,
    disabled: Boolean,
    error: Boolean,
    text: Boolean,
    size: {
      type: String,
      default: "base",
      validator(n) {
        return ["xs", "sm", "base", "lg"].includes(n);
      }
    },
    badge: Boolean
  },
  emits: ["click"],
  computed: {
    buttonClasses() {
      const n = [];
      return this.text ? n.push("i-button-text") : (n.push("i-button"), this.plain && n.push("plain"), this.badge && n.push("badge")), this.disabled && n.push("disabled"), this.error && n.push("error"), this.size !== "base" && n.push(`${this.size}`), n;
    }
  }
}, ct = ["disabled"];
function pt(n, e, t, s, i, a) {
  return I(), L("button", {
    class: Ve(["i-button", a.buttonClasses]),
    disabled: t.disabled,
    onClick: e[0] || (e[0] = Le((r) => n.$emit("click"), ["stop"]))
  }, [
    ie(n.$slots, "prepend"),
    ie(n.$slots, "default"),
    ie(n.$slots, "append")
  ], 10, ct);
}
const cs = /* @__PURE__ */ ne(dt, [["render", pt]]);
function ft(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var ke = { exports: {} }, mt = ke.exports, Ie;
function Ue() {
  return Ie || (Ie = 1, function(n, e) {
    (function(t, s) {
      n.exports = s();
    })(mt, function() {
      var t = 1e3, s = 6e4, i = 36e5, a = "millisecond", r = "second", u = "minute", l = "hour", o = "day", p = "week", k = "month", b = "quarter", _ = "year", F = "date", R = "Invalid Date", V = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, D = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, ce = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(g) {
        var c = ["th", "st", "nd", "rd"], h = g % 100;
        return "[" + g + (c[(h - 20) % 10] || c[h] || c[0]) + "]";
      } }, G = function(g, c, h) {
        var m = String(g);
        return !m || m.length >= c ? g : "" + Array(c + 1 - m.length).join(h) + g;
      }, be = { s: G, z: function(g) {
        var c = -g.utcOffset(), h = Math.abs(c), m = Math.floor(h / 60), d = h % 60;
        return (c <= 0 ? "+" : "-") + G(m, 2, "0") + ":" + G(d, 2, "0");
      }, m: function g(c, h) {
        if (c.date() < h.date()) return -g(h, c);
        var m = 12 * (h.year() - c.year()) + (h.month() - c.month()), d = c.clone().add(m, k), C = h - d < 0, E = c.clone().add(m + (C ? -1 : 1), k);
        return +(-(m + (h - d) / (C ? d - E : E - d)) || 0);
      }, a: function(g) {
        return g < 0 ? Math.ceil(g) || 0 : Math.floor(g);
      }, p: function(g) {
        return { M: k, y: _, w: p, d: o, D: F, h: l, m: u, s: r, ms: a, Q: b }[g] || String(g || "").toLowerCase().replace(/s$/, "");
      }, u: function(g) {
        return g === void 0;
      } }, Z = "en", Y = {};
      Y[Z] = ce;
      var le = "$isDayjsObject", ae = function(g) {
        return g instanceof pe || !(!g || !g[le]);
      }, X = function g(c, h, m) {
        var d;
        if (!c) return Z;
        if (typeof c == "string") {
          var C = c.toLowerCase();
          Y[C] && (d = C), h && (Y[C] = h, d = C);
          var E = c.split("-");
          if (!d && E.length > 1) return g(E[0]);
        } else {
          var x = c.name;
          Y[x] = c, d = x;
        }
        return !m && d && (Z = d), d || !m && Z;
      }, A = function(g, c) {
        if (ae(g)) return g.clone();
        var h = typeof c == "object" ? c : {};
        return h.date = g, h.args = arguments, new pe(h);
      }, S = be;
      S.l = X, S.i = ae, S.w = function(g, c) {
        return A(g, { locale: c.$L, utc: c.$u, x: c.$x, $offset: c.$offset });
      };
      var pe = function() {
        function g(h) {
          this.$L = X(h.locale, null, !0), this.parse(h), this.$x = this.$x || h.x || {}, this[le] = !0;
        }
        var c = g.prototype;
        return c.parse = function(h) {
          this.$d = function(m) {
            var d = m.date, C = m.utc;
            if (d === null) return /* @__PURE__ */ new Date(NaN);
            if (S.u(d)) return /* @__PURE__ */ new Date();
            if (d instanceof Date) return new Date(d);
            if (typeof d == "string" && !/Z$/i.test(d)) {
              var E = d.match(V);
              if (E) {
                var x = E[2] - 1 || 0, B = (E[7] || "0").substring(0, 3);
                return C ? new Date(Date.UTC(E[1], x, E[3] || 1, E[4] || 0, E[5] || 0, E[6] || 0, B)) : new Date(E[1], x, E[3] || 1, E[4] || 0, E[5] || 0, E[6] || 0, B);
              }
            }
            return new Date(d);
          }(h), this.init();
        }, c.init = function() {
          var h = this.$d;
          this.$y = h.getFullYear(), this.$M = h.getMonth(), this.$D = h.getDate(), this.$W = h.getDay(), this.$H = h.getHours(), this.$m = h.getMinutes(), this.$s = h.getSeconds(), this.$ms = h.getMilliseconds();
        }, c.$utils = function() {
          return S;
        }, c.isValid = function() {
          return this.$d.toString() !== R;
        }, c.isSame = function(h, m) {
          var d = A(h);
          return this.startOf(m) <= d && d <= this.endOf(m);
        }, c.isAfter = function(h, m) {
          return A(h) < this.startOf(m);
        }, c.isBefore = function(h, m) {
          return this.endOf(m) < A(h);
        }, c.$g = function(h, m, d) {
          return S.u(h) ? this[m] : this.set(d, h);
        }, c.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, c.valueOf = function() {
          return this.$d.getTime();
        }, c.startOf = function(h, m) {
          var d = this, C = !!S.u(m) || m, E = S.p(h), x = function(ee, $) {
            var W = S.w(d.$u ? Date.UTC(d.$y, $, ee) : new Date(d.$y, $, ee), d);
            return C ? W : W.endOf(o);
          }, B = function(ee, $) {
            return S.w(d.toDate()[ee].apply(d.toDate("s"), (C ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice($)), d);
          }, M = this.$W, w = this.$M, U = this.$D, re = "set" + (this.$u ? "UTC" : "");
          switch (E) {
            case _:
              return C ? x(1, 0) : x(31, 11);
            case k:
              return C ? x(1, w) : x(0, w + 1);
            case p:
              var Q = this.$locale().weekStart || 0, oe = (M < Q ? M + 7 : M) - Q;
              return x(C ? U - oe : U + (6 - oe), w);
            case o:
            case F:
              return B(re + "Hours", 0);
            case l:
              return B(re + "Minutes", 1);
            case u:
              return B(re + "Seconds", 2);
            case r:
              return B(re + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, c.endOf = function(h) {
          return this.startOf(h, !1);
        }, c.$set = function(h, m) {
          var d, C = S.p(h), E = "set" + (this.$u ? "UTC" : ""), x = (d = {}, d[o] = E + "Date", d[F] = E + "Date", d[k] = E + "Month", d[_] = E + "FullYear", d[l] = E + "Hours", d[u] = E + "Minutes", d[r] = E + "Seconds", d[a] = E + "Milliseconds", d)[C], B = C === o ? this.$D + (m - this.$W) : m;
          if (C === k || C === _) {
            var M = this.clone().set(F, 1);
            M.$d[x](B), M.init(), this.$d = M.set(F, Math.min(this.$D, M.daysInMonth())).$d;
          } else x && this.$d[x](B);
          return this.init(), this;
        }, c.set = function(h, m) {
          return this.clone().$set(h, m);
        }, c.get = function(h) {
          return this[S.p(h)]();
        }, c.add = function(h, m) {
          var d, C = this;
          h = Number(h);
          var E = S.p(m), x = function(w) {
            var U = A(C);
            return S.w(U.date(U.date() + Math.round(w * h)), C);
          };
          if (E === k) return this.set(k, this.$M + h);
          if (E === _) return this.set(_, this.$y + h);
          if (E === o) return x(1);
          if (E === p) return x(7);
          var B = (d = {}, d[u] = s, d[l] = i, d[r] = t, d)[E] || 1, M = this.$d.getTime() + h * B;
          return S.w(M, this);
        }, c.subtract = function(h, m) {
          return this.add(-1 * h, m);
        }, c.format = function(h) {
          var m = this, d = this.$locale();
          if (!this.isValid()) return d.invalidDate || R;
          var C = h || "YYYY-MM-DDTHH:mm:ssZ", E = S.z(this), x = this.$H, B = this.$m, M = this.$M, w = d.weekdays, U = d.months, re = d.meridiem, Q = function($, W, he, fe) {
            return $ && ($[W] || $(m, C)) || he[W].slice(0, fe);
          }, oe = function($) {
            return S.s(x % 12 || 12, $, "0");
          }, ee = re || function($, W, he) {
            var fe = $ < 12 ? "AM" : "PM";
            return he ? fe.toLowerCase() : fe;
          };
          return C.replace(D, function($, W) {
            return W || function(he) {
              switch (he) {
                case "YY":
                  return String(m.$y).slice(-2);
                case "YYYY":
                  return S.s(m.$y, 4, "0");
                case "M":
                  return M + 1;
                case "MM":
                  return S.s(M + 1, 2, "0");
                case "MMM":
                  return Q(d.monthsShort, M, U, 3);
                case "MMMM":
                  return Q(U, M);
                case "D":
                  return m.$D;
                case "DD":
                  return S.s(m.$D, 2, "0");
                case "d":
                  return String(m.$W);
                case "dd":
                  return Q(d.weekdaysMin, m.$W, w, 2);
                case "ddd":
                  return Q(d.weekdaysShort, m.$W, w, 3);
                case "dddd":
                  return w[m.$W];
                case "H":
                  return String(x);
                case "HH":
                  return S.s(x, 2, "0");
                case "h":
                  return oe(1);
                case "hh":
                  return oe(2);
                case "a":
                  return ee(x, B, !0);
                case "A":
                  return ee(x, B, !1);
                case "m":
                  return String(B);
                case "mm":
                  return S.s(B, 2, "0");
                case "s":
                  return String(m.$s);
                case "ss":
                  return S.s(m.$s, 2, "0");
                case "SSS":
                  return S.s(m.$ms, 3, "0");
                case "Z":
                  return E;
              }
              return null;
            }($) || E.replace(":", "");
          });
        }, c.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, c.diff = function(h, m, d) {
          var C, E = this, x = S.p(m), B = A(h), M = (B.utcOffset() - this.utcOffset()) * s, w = this - B, U = function() {
            return S.m(E, B);
          };
          switch (x) {
            case _:
              C = U() / 12;
              break;
            case k:
              C = U();
              break;
            case b:
              C = U() / 3;
              break;
            case p:
              C = (w - M) / 6048e5;
              break;
            case o:
              C = (w - M) / 864e5;
              break;
            case l:
              C = w / i;
              break;
            case u:
              C = w / s;
              break;
            case r:
              C = w / t;
              break;
            default:
              C = w;
          }
          return d ? C : S.a(C);
        }, c.daysInMonth = function() {
          return this.endOf(k).$D;
        }, c.$locale = function() {
          return Y[this.$L];
        }, c.locale = function(h, m) {
          if (!h) return this.$L;
          var d = this.clone(), C = X(h, m, !0);
          return C && (d.$L = C), d;
        }, c.clone = function() {
          return S.w(this.$d, this);
        }, c.toDate = function() {
          return new Date(this.valueOf());
        }, c.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, c.toISOString = function() {
          return this.$d.toISOString();
        }, c.toString = function() {
          return this.$d.toUTCString();
        }, g;
      }(), we = pe.prototype;
      return A.prototype = we, [["$ms", a], ["$s", r], ["$m", u], ["$H", l], ["$W", o], ["$M", k], ["$y", _], ["$D", F]].forEach(function(g) {
        we[g[1]] = function(c) {
          return this.$g(c, g[0], g[1]);
        };
      }), A.extend = function(g, c) {
        return g.$i || (g(c, pe, A), g.$i = !0), A;
      }, A.locale = X, A.isDayjs = ae, A.unix = function(g) {
        return A(1e3 * g);
      }, A.en = Y[Z], A.Ls = Y, A.p = {}, A;
    });
  }(ke)), ke.exports;
}
var kt = Ue();
const _t = /* @__PURE__ */ ft(kt);
var _e = { exports: {} }, gt = _e.exports, Te;
function vt() {
  return Te || (Te = 1, function(n, e) {
    (function(t, s) {
      n.exports = s(Ue());
    })(gt, function(t) {
      function s(r) {
        return r && typeof r == "object" && "default" in r ? r : { default: r };
      }
      var i = s(t), a = { name: "id", weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"), months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"), weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"), monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des".split("_"), weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"), weekStart: 1, formats: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [pukul] HH.mm", LLLL: "dddd, D MMMM YYYY [pukul] HH.mm" }, relativeTime: { future: "dalam %s", past: "%s yang lalu", s: "beberapa detik", m: "semenit", mm: "%d menit", h: "sejam", hh: "%d jam", d: "sehari", dd: "%d hari", M: "sebulan", MM: "%d bulan", y: "setahun", yy: "%d tahun" }, ordinal: function(r) {
        return r + ".";
      } };
      return i.default.locale(a, null, !0), a;
    });
  }(_e)), _e.exports;
}
vt();
function J(n) {
  return typeof n == "string" || n instanceof String;
}
function Oe(n) {
  var e;
  return typeof n == "object" && n != null && (n == null || (e = n.constructor) == null ? void 0 : e.name) === "Object";
}
function He(n, e) {
  return Array.isArray(e) ? He(n, (t, s) => e.includes(s)) : Object.entries(n).reduce((t, s) => {
    let [i, a] = s;
    return e(a, i) && (t[i] = a), t;
  }, {});
}
const f = {
  NONE: "NONE",
  LEFT: "LEFT",
  FORCE_LEFT: "FORCE_LEFT",
  RIGHT: "RIGHT",
  FORCE_RIGHT: "FORCE_RIGHT"
};
function Ct(n) {
  switch (n) {
    case f.LEFT:
      return f.FORCE_LEFT;
    case f.RIGHT:
      return f.FORCE_RIGHT;
    default:
      return n;
  }
}
function Se(n) {
  return n.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
}
function ve(n, e) {
  if (e === n) return !0;
  const t = Array.isArray(e), s = Array.isArray(n);
  let i;
  if (t && s) {
    if (e.length != n.length) return !1;
    for (i = 0; i < e.length; i++) if (!ve(e[i], n[i])) return !1;
    return !0;
  }
  if (t != s) return !1;
  if (e && n && typeof e == "object" && typeof n == "object") {
    const a = e instanceof Date, r = n instanceof Date;
    if (a && r) return e.getTime() == n.getTime();
    if (a != r) return !1;
    const u = e instanceof RegExp, l = n instanceof RegExp;
    if (u && l) return e.toString() == n.toString();
    if (u != l) return !1;
    const o = Object.keys(e);
    for (i = 0; i < o.length; i++) if (!Object.prototype.hasOwnProperty.call(n, o[i])) return !1;
    for (i = 0; i < o.length; i++) if (!ve(n[o[i]], e[o[i]])) return !1;
    return !0;
  } else if (e && n && typeof e == "function" && typeof n == "function")
    return e.toString() === n.toString();
  return !1;
}
class Et {
  /** Current input value */
  /** Current cursor position */
  /** Old input value */
  /** Old selection */
  constructor(e) {
    for (Object.assign(this, e); this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos); )
      --this.oldSelection.start;
    if (this.insertedCount)
      for (; this.value.slice(this.cursorPos) !== this.oldValue.slice(this.oldSelection.end); )
        this.value.length - this.cursorPos < this.oldValue.length - this.oldSelection.end ? ++this.oldSelection.end : ++this.cursorPos;
  }
  /** Start changing position */
  get startChangePos() {
    return Math.min(this.cursorPos, this.oldSelection.start);
  }
  /** Inserted symbols count */
  get insertedCount() {
    return this.cursorPos - this.startChangePos;
  }
  /** Inserted symbols */
  get inserted() {
    return this.value.substr(this.startChangePos, this.insertedCount);
  }
  /** Removed symbols count */
  get removedCount() {
    return Math.max(this.oldSelection.end - this.startChangePos || // for Delete
    this.oldValue.length - this.value.length, 0);
  }
  /** Removed symbols */
  get removed() {
    return this.oldValue.substr(this.startChangePos, this.removedCount);
  }
  /** Unchanged head symbols */
  get head() {
    return this.value.substring(0, this.startChangePos);
  }
  /** Unchanged tail symbols */
  get tail() {
    return this.value.substring(this.startChangePos + this.insertedCount);
  }
  /** Remove direction */
  get removeDirection() {
    return !this.removedCount || this.insertedCount ? f.NONE : (this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos) && // if not range removed (event with backspace)
    this.oldSelection.end === this.oldSelection.start ? f.RIGHT : f.LEFT;
  }
}
function v(n, e) {
  return new v.InputMask(n, e);
}
function Ye(n) {
  if (n == null) throw new Error("mask property should be defined");
  return n instanceof RegExp ? v.MaskedRegExp : J(n) ? v.MaskedPattern : n === Date ? v.MaskedDate : n === Number ? v.MaskedNumber : Array.isArray(n) || n === Array ? v.MaskedDynamic : v.Masked && n.prototype instanceof v.Masked ? n : v.Masked && n instanceof v.Masked ? n.constructor : n instanceof Function ? v.MaskedFunction : (console.warn("Mask not found for mask", n), v.Masked);
}
function de(n) {
  if (!n) throw new Error("Options in not defined");
  if (v.Masked) {
    if (n.prototype instanceof v.Masked) return {
      mask: n
    };
    const {
      mask: e = void 0,
      ...t
    } = n instanceof v.Masked ? {
      mask: n
    } : Oe(n) && n.mask instanceof v.Masked ? n : {};
    if (e) {
      const s = e.mask;
      return {
        ...He(e, (i, a) => !a.startsWith("_")),
        mask: e.constructor,
        _mask: s,
        ...t
      };
    }
  }
  return Oe(n) ? {
    ...n
  } : {
    mask: n
  };
}
function K(n) {
  if (v.Masked && n instanceof v.Masked) return n;
  const e = de(n), t = Ye(e.mask);
  if (!t) throw new Error("Masked class is not found for provided mask " + e.mask + ", appropriate module needs to be imported manually before creating mask.");
  return e.mask === t && delete e.mask, e._mask && (e.mask = e._mask, delete e._mask), new t(e);
}
v.createMask = K;
class De {
  /** */
  /** */
  /** */
  /** Safely returns selection start */
  get selectionStart() {
    let e;
    try {
      e = this._unsafeSelectionStart;
    } catch {
    }
    return e ?? this.value.length;
  }
  /** Safely returns selection end */
  get selectionEnd() {
    let e;
    try {
      e = this._unsafeSelectionEnd;
    } catch {
    }
    return e ?? this.value.length;
  }
  /** Safely sets element selection */
  select(e, t) {
    if (!(e == null || t == null || e === this.selectionStart && t === this.selectionEnd))
      try {
        this._unsafeSelect(e, t);
      } catch {
      }
  }
  /** */
  get isActive() {
    return !1;
  }
  /** */
  /** */
  /** */
}
v.MaskElement = De;
const Re = 90, At = 89;
class Ee extends De {
  /** HTMLElement to use mask on */
  constructor(e) {
    super(), this.input = e, this._onKeydown = this._onKeydown.bind(this), this._onInput = this._onInput.bind(this), this._onBeforeinput = this._onBeforeinput.bind(this), this._onCompositionEnd = this._onCompositionEnd.bind(this);
  }
  get rootElement() {
    var e, t, s;
    return (e = (t = (s = this.input).getRootNode) == null ? void 0 : t.call(s)) != null ? e : document;
  }
  /** Is element in focus */
  get isActive() {
    return this.input === this.rootElement.activeElement;
  }
  /** Binds HTMLElement events to mask internal events */
  bindEvents(e) {
    this.input.addEventListener("keydown", this._onKeydown), this.input.addEventListener("input", this._onInput), this.input.addEventListener("beforeinput", this._onBeforeinput), this.input.addEventListener("compositionend", this._onCompositionEnd), this.input.addEventListener("drop", e.drop), this.input.addEventListener("click", e.click), this.input.addEventListener("focus", e.focus), this.input.addEventListener("blur", e.commit), this._handlers = e;
  }
  _onKeydown(e) {
    if (this._handlers.redo && (e.keyCode === Re && e.shiftKey && (e.metaKey || e.ctrlKey) || e.keyCode === At && e.ctrlKey))
      return e.preventDefault(), this._handlers.redo(e);
    if (this._handlers.undo && e.keyCode === Re && (e.metaKey || e.ctrlKey))
      return e.preventDefault(), this._handlers.undo(e);
    e.isComposing || this._handlers.selectionChange(e);
  }
  _onBeforeinput(e) {
    if (e.inputType === "historyUndo" && this._handlers.undo)
      return e.preventDefault(), this._handlers.undo(e);
    if (e.inputType === "historyRedo" && this._handlers.redo)
      return e.preventDefault(), this._handlers.redo(e);
  }
  _onCompositionEnd(e) {
    this._handlers.input(e);
  }
  _onInput(e) {
    e.isComposing || this._handlers.input(e);
  }
  /** Unbinds HTMLElement events to mask internal events */
  unbindEvents() {
    this.input.removeEventListener("keydown", this._onKeydown), this.input.removeEventListener("input", this._onInput), this.input.removeEventListener("beforeinput", this._onBeforeinput), this.input.removeEventListener("compositionend", this._onCompositionEnd), this.input.removeEventListener("drop", this._handlers.drop), this.input.removeEventListener("click", this._handlers.click), this.input.removeEventListener("focus", this._handlers.focus), this.input.removeEventListener("blur", this._handlers.commit), this._handlers = {};
  }
}
v.HTMLMaskElement = Ee;
class yt extends Ee {
  /** InputElement to use mask on */
  constructor(e) {
    super(e), this.input = e;
  }
  /** Returns InputElement selection start */
  get _unsafeSelectionStart() {
    return this.input.selectionStart != null ? this.input.selectionStart : this.value.length;
  }
  /** Returns InputElement selection end */
  get _unsafeSelectionEnd() {
    return this.input.selectionEnd;
  }
  /** Sets InputElement selection */
  _unsafeSelect(e, t) {
    this.input.setSelectionRange(e, t);
  }
  get value() {
    return this.input.value;
  }
  set value(e) {
    this.input.value = e;
  }
}
v.HTMLMaskElement = Ee;
class je extends Ee {
  /** Returns HTMLElement selection start */
  get _unsafeSelectionStart() {
    const e = this.rootElement, t = e.getSelection && e.getSelection(), s = t && t.anchorOffset, i = t && t.focusOffset;
    return i == null || s == null || s < i ? s : i;
  }
  /** Returns HTMLElement selection end */
  get _unsafeSelectionEnd() {
    const e = this.rootElement, t = e.getSelection && e.getSelection(), s = t && t.anchorOffset, i = t && t.focusOffset;
    return i == null || s == null || s > i ? s : i;
  }
  /** Sets HTMLElement selection */
  _unsafeSelect(e, t) {
    if (!this.rootElement.createRange) return;
    const s = this.rootElement.createRange();
    s.setStart(this.input.firstChild || this.input, e), s.setEnd(this.input.lastChild || this.input, t);
    const i = this.rootElement, a = i.getSelection && i.getSelection();
    a && (a.removeAllRanges(), a.addRange(s));
  }
  /** HTMLElement value */
  get value() {
    return this.input.textContent || "";
  }
  set value(e) {
    this.input.textContent = e;
  }
}
v.HTMLContenteditableMaskElement = je;
class Ae {
  constructor() {
    this.states = [], this.currentIndex = 0;
  }
  get currentState() {
    return this.states[this.currentIndex];
  }
  get isEmpty() {
    return this.states.length === 0;
  }
  push(e) {
    this.currentIndex < this.states.length - 1 && (this.states.length = this.currentIndex + 1), this.states.push(e), this.states.length > Ae.MAX_LENGTH && this.states.shift(), this.currentIndex = this.states.length - 1;
  }
  go(e) {
    return this.currentIndex = Math.min(Math.max(this.currentIndex + e, 0), this.states.length - 1), this.currentState;
  }
  undo() {
    return this.go(-1);
  }
  redo() {
    return this.go(1);
  }
  clear() {
    this.states.length = 0, this.currentIndex = 0;
  }
}
Ae.MAX_LENGTH = 100;
class Ft {
  /**
    View element
  */
  /** Internal {@link Masked} model */
  constructor(e, t) {
    this.el = e instanceof De ? e : e.isContentEditable && e.tagName !== "INPUT" && e.tagName !== "TEXTAREA" ? new je(e) : new yt(e), this.masked = K(t), this._listeners = {}, this._value = "", this._unmaskedValue = "", this._rawInputValue = "", this.history = new Ae(), this._saveSelection = this._saveSelection.bind(this), this._onInput = this._onInput.bind(this), this._onChange = this._onChange.bind(this), this._onDrop = this._onDrop.bind(this), this._onFocus = this._onFocus.bind(this), this._onClick = this._onClick.bind(this), this._onUndo = this._onUndo.bind(this), this._onRedo = this._onRedo.bind(this), this.alignCursor = this.alignCursor.bind(this), this.alignCursorFriendly = this.alignCursorFriendly.bind(this), this._bindEvents(), this.updateValue(), this._onChange();
  }
  maskEquals(e) {
    var t;
    return e == null || ((t = this.masked) == null ? void 0 : t.maskEquals(e));
  }
  /** Masked */
  get mask() {
    return this.masked.mask;
  }
  set mask(e) {
    if (this.maskEquals(e)) return;
    if (!(e instanceof v.Masked) && this.masked.constructor === Ye(e)) {
      this.masked.updateOptions({
        mask: e
      });
      return;
    }
    const t = e instanceof v.Masked ? e : K({
      mask: e
    });
    t.unmaskedValue = this.masked.unmaskedValue, this.masked = t;
  }
  /** Raw value */
  get value() {
    return this._value;
  }
  set value(e) {
    this.value !== e && (this.masked.value = e, this.updateControl("auto"));
  }
  /** Unmasked value */
  get unmaskedValue() {
    return this._unmaskedValue;
  }
  set unmaskedValue(e) {
    this.unmaskedValue !== e && (this.masked.unmaskedValue = e, this.updateControl("auto"));
  }
  /** Raw input value */
  get rawInputValue() {
    return this._rawInputValue;
  }
  set rawInputValue(e) {
    this.rawInputValue !== e && (this.masked.rawInputValue = e, this.updateControl(), this.alignCursor());
  }
  /** Typed unmasked value */
  get typedValue() {
    return this.masked.typedValue;
  }
  set typedValue(e) {
    this.masked.typedValueEquals(e) || (this.masked.typedValue = e, this.updateControl("auto"));
  }
  /** Display value */
  get displayValue() {
    return this.masked.displayValue;
  }
  /** Starts listening to element events */
  _bindEvents() {
    this.el.bindEvents({
      selectionChange: this._saveSelection,
      input: this._onInput,
      drop: this._onDrop,
      click: this._onClick,
      focus: this._onFocus,
      commit: this._onChange,
      undo: this._onUndo,
      redo: this._onRedo
    });
  }
  /** Stops listening to element events */
  _unbindEvents() {
    this.el && this.el.unbindEvents();
  }
  /** Fires custom event */
  _fireEvent(e, t) {
    const s = this._listeners[e];
    s && s.forEach((i) => i(t));
  }
  /** Current selection start */
  get selectionStart() {
    return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
  }
  /** Current cursor position */
  get cursorPos() {
    return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
  }
  set cursorPos(e) {
    !this.el || !this.el.isActive || (this.el.select(e, e), this._saveSelection());
  }
  /** Stores current selection */
  _saveSelection() {
    this.displayValue !== this.el.value && console.warn("Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly."), this._selection = {
      start: this.selectionStart,
      end: this.cursorPos
    };
  }
  /** Syncronizes model value from view */
  updateValue() {
    this.masked.value = this.el.value, this._value = this.masked.value, this._unmaskedValue = this.masked.unmaskedValue, this._rawInputValue = this.masked.rawInputValue;
  }
  /** Syncronizes view from model value, fires change events */
  updateControl(e) {
    const t = this.masked.unmaskedValue, s = this.masked.value, i = this.masked.rawInputValue, a = this.displayValue, r = this.unmaskedValue !== t || this.value !== s || this._rawInputValue !== i;
    this._unmaskedValue = t, this._value = s, this._rawInputValue = i, this.el.value !== a && (this.el.value = a), e === "auto" ? this.alignCursor() : e != null && (this.cursorPos = e), r && this._fireChangeEvents(), !this._historyChanging && (r || this.history.isEmpty) && this.history.push({
      unmaskedValue: t,
      selection: {
        start: this.selectionStart,
        end: this.cursorPos
      }
    });
  }
  /** Updates options with deep equal check, recreates {@link Masked} model if mask type changes */
  updateOptions(e) {
    const {
      mask: t,
      ...s
    } = e, i = !this.maskEquals(t), a = this.masked.optionsIsChanged(s);
    i && (this.mask = t), a && this.masked.updateOptions(s), (i || a) && this.updateControl();
  }
  /** Updates cursor */
  updateCursor(e) {
    e != null && (this.cursorPos = e, this._delayUpdateCursor(e));
  }
  /** Delays cursor update to support mobile browsers */
  _delayUpdateCursor(e) {
    this._abortUpdateCursor(), this._changingCursorPos = e, this._cursorChanging = setTimeout(() => {
      this.el && (this.cursorPos = this._changingCursorPos, this._abortUpdateCursor());
    }, 10);
  }
  /** Fires custom events */
  _fireChangeEvents() {
    this._fireEvent("accept", this._inputEvent), this.masked.isComplete && this._fireEvent("complete", this._inputEvent);
  }
  /** Aborts delayed cursor update */
  _abortUpdateCursor() {
    this._cursorChanging && (clearTimeout(this._cursorChanging), delete this._cursorChanging);
  }
  /** Aligns cursor to nearest available position */
  alignCursor() {
    this.cursorPos = this.masked.nearestInputPos(this.masked.nearestInputPos(this.cursorPos, f.LEFT));
  }
  /** Aligns cursor only if selection is empty */
  alignCursorFriendly() {
    this.selectionStart === this.cursorPos && this.alignCursor();
  }
  /** Adds listener on custom event */
  on(e, t) {
    return this._listeners[e] || (this._listeners[e] = []), this._listeners[e].push(t), this;
  }
  /** Removes custom event listener */
  off(e, t) {
    if (!this._listeners[e]) return this;
    if (!t)
      return delete this._listeners[e], this;
    const s = this._listeners[e].indexOf(t);
    return s >= 0 && this._listeners[e].splice(s, 1), this;
  }
  /** Handles view input event */
  _onInput(e) {
    this._inputEvent = e, this._abortUpdateCursor();
    const t = new Et({
      // new state
      value: this.el.value,
      cursorPos: this.cursorPos,
      // old state
      oldValue: this.displayValue,
      oldSelection: this._selection
    }), s = this.masked.rawInputValue, i = this.masked.splice(t.startChangePos, t.removed.length, t.inserted, t.removeDirection, {
      input: !0,
      raw: !0
    }).offset, a = s === this.masked.rawInputValue ? t.removeDirection : f.NONE;
    let r = this.masked.nearestInputPos(t.startChangePos + i, a);
    a !== f.NONE && (r = this.masked.nearestInputPos(r, f.NONE)), this.updateControl(r), delete this._inputEvent;
  }
  /** Handles view change event and commits model value */
  _onChange() {
    this.displayValue !== this.el.value && this.updateValue(), this.masked.doCommit(), this.updateControl(), this._saveSelection();
  }
  /** Handles view drop event, prevents by default */
  _onDrop(e) {
    e.preventDefault(), e.stopPropagation();
  }
  /** Restore last selection on focus */
  _onFocus(e) {
    this.alignCursorFriendly();
  }
  /** Restore last selection on focus */
  _onClick(e) {
    this.alignCursorFriendly();
  }
  _onUndo() {
    this._applyHistoryState(this.history.undo());
  }
  _onRedo() {
    this._applyHistoryState(this.history.redo());
  }
  _applyHistoryState(e) {
    e && (this._historyChanging = !0, this.unmaskedValue = e.unmaskedValue, this.el.select(e.selection.start, e.selection.end), this._saveSelection(), this._historyChanging = !1);
  }
  /** Unbind view events and removes element reference */
  destroy() {
    this._unbindEvents(), this._listeners.length = 0, delete this.el;
  }
}
v.InputMask = Ft;
class y {
  /** Inserted symbols */
  /** Additional offset if any changes occurred before tail */
  /** Raw inserted is used by dynamic mask */
  /** Can skip chars */
  static normalize(e) {
    return Array.isArray(e) ? e : [e, new y()];
  }
  constructor(e) {
    Object.assign(this, {
      inserted: "",
      rawInserted: "",
      tailShift: 0,
      skip: !1
    }, e);
  }
  /** Aggregate changes */
  aggregate(e) {
    return this.inserted += e.inserted, this.rawInserted += e.rawInserted, this.tailShift += e.tailShift, this.skip = this.skip || e.skip, this;
  }
  /** Total offset considering all changes */
  get offset() {
    return this.tailShift + this.inserted.length;
  }
  get consumed() {
    return !!this.rawInserted || this.skip;
  }
  equals(e) {
    return this.inserted === e.inserted && this.tailShift === e.tailShift && this.rawInserted === e.rawInserted && this.skip === e.skip;
  }
}
v.ChangeDetails = y;
class q {
  /** Tail value as string */
  /** Tail start position */
  /** Start position */
  constructor(e, t, s) {
    e === void 0 && (e = ""), t === void 0 && (t = 0), this.value = e, this.from = t, this.stop = s;
  }
  toString() {
    return this.value;
  }
  extend(e) {
    this.value += String(e);
  }
  appendTo(e) {
    return e.append(this.toString(), {
      tail: !0
    }).aggregate(e._appendPlaceholder());
  }
  get state() {
    return {
      value: this.value,
      from: this.from,
      stop: this.stop
    };
  }
  set state(e) {
    Object.assign(this, e);
  }
  unshift(e) {
    if (!this.value.length || e != null && this.from >= e) return "";
    const t = this.value[0];
    return this.value = this.value.slice(1), t;
  }
  shift() {
    if (!this.value.length) return "";
    const e = this.value[this.value.length - 1];
    return this.value = this.value.slice(0, -1), e;
  }
}
class T {
  /** */
  /** */
  /** Transforms value before mask processing */
  /** Transforms each char before mask processing */
  /** Validates if value is acceptable */
  /** Does additional processing at the end of editing */
  /** Format typed value to string */
  /** Parse string to get typed value */
  /** Enable characters overwriting */
  /** */
  /** */
  /** */
  /** */
  constructor(e) {
    this._value = "", this._update({
      ...T.DEFAULTS,
      ...e
    }), this._initialized = !0;
  }
  /** Sets and applies new options */
  updateOptions(e) {
    this.optionsIsChanged(e) && this.withValueRefresh(this._update.bind(this, e));
  }
  /** Sets new options */
  _update(e) {
    Object.assign(this, e);
  }
  /** Mask state */
  get state() {
    return {
      _value: this.value,
      _rawInputValue: this.rawInputValue
    };
  }
  set state(e) {
    this._value = e._value;
  }
  /** Resets value */
  reset() {
    this._value = "";
  }
  get value() {
    return this._value;
  }
  set value(e) {
    this.resolve(e, {
      input: !0
    });
  }
  /** Resolve new value */
  resolve(e, t) {
    t === void 0 && (t = {
      input: !0
    }), this.reset(), this.append(e, t, ""), this.doCommit();
  }
  get unmaskedValue() {
    return this.value;
  }
  set unmaskedValue(e) {
    this.resolve(e, {});
  }
  get typedValue() {
    return this.parse ? this.parse(this.value, this) : this.unmaskedValue;
  }
  set typedValue(e) {
    this.format ? this.value = this.format(e, this) : this.unmaskedValue = String(e);
  }
  /** Value that includes raw user input */
  get rawInputValue() {
    return this.extractInput(0, this.displayValue.length, {
      raw: !0
    });
  }
  set rawInputValue(e) {
    this.resolve(e, {
      raw: !0
    });
  }
  get displayValue() {
    return this.value;
  }
  get isComplete() {
    return !0;
  }
  get isFilled() {
    return this.isComplete;
  }
  /** Finds nearest input position in direction */
  nearestInputPos(e, t) {
    return e;
  }
  totalInputPositions(e, t) {
    return e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), Math.min(this.displayValue.length, t - e);
  }
  /** Extracts value in range considering flags */
  extractInput(e, t, s) {
    return e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), this.displayValue.slice(e, t);
  }
  /** Extracts tail in range */
  extractTail(e, t) {
    return e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), new q(this.extractInput(e, t), e);
  }
  /** Appends tail */
  appendTail(e) {
    return J(e) && (e = new q(String(e))), e.appendTo(this);
  }
  /** Appends char */
  _appendCharRaw(e, t) {
    return e ? (this._value += e, new y({
      inserted: e,
      rawInserted: e
    })) : new y();
  }
  /** Appends char */
  _appendChar(e, t, s) {
    t === void 0 && (t = {});
    const i = this.state;
    let a;
    if ([e, a] = this.doPrepareChar(e, t), e && (a = a.aggregate(this._appendCharRaw(e, t)), !a.rawInserted && this.autofix === "pad")) {
      const r = this.state;
      this.state = i;
      let u = this.pad(t);
      const l = this._appendCharRaw(e, t);
      u = u.aggregate(l), l.rawInserted || u.equals(a) ? a = u : this.state = r;
    }
    if (a.inserted) {
      let r, u = this.doValidate(t) !== !1;
      if (u && s != null) {
        const l = this.state;
        if (this.overwrite === !0) {
          r = s.state;
          for (let p = 0; p < a.rawInserted.length; ++p)
            s.unshift(this.displayValue.length - a.tailShift);
        }
        let o = this.appendTail(s);
        if (u = o.rawInserted.length === s.toString().length, !(u && o.inserted) && this.overwrite === "shift") {
          this.state = l, r = s.state;
          for (let p = 0; p < a.rawInserted.length; ++p)
            s.shift();
          o = this.appendTail(s), u = o.rawInserted.length === s.toString().length;
        }
        u && o.inserted && (this.state = l);
      }
      u || (a = new y(), this.state = i, s && r && (s.state = r));
    }
    return a;
  }
  /** Appends optional placeholder at the end */
  _appendPlaceholder() {
    return new y();
  }
  /** Appends optional eager placeholder at the end */
  _appendEager() {
    return new y();
  }
  /** Appends symbols considering flags */
  append(e, t, s) {
    if (!J(e)) throw new Error("value should be string");
    const i = J(s) ? new q(String(s)) : s;
    t != null && t.tail && (t._beforeTailState = this.state);
    let a;
    [e, a] = this.doPrepare(e, t);
    for (let r = 0; r < e.length; ++r) {
      const u = this._appendChar(e[r], t, i);
      if (!u.rawInserted && !this.doSkipInvalid(e[r], t, i)) break;
      a.aggregate(u);
    }
    return (this.eager === !0 || this.eager === "append") && t != null && t.input && e && a.aggregate(this._appendEager()), i != null && (a.tailShift += this.appendTail(i).tailShift), a;
  }
  remove(e, t) {
    return e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), this._value = this.displayValue.slice(0, e) + this.displayValue.slice(t), new y();
  }
  /** Calls function and reapplies current value */
  withValueRefresh(e) {
    if (this._refreshing || !this._initialized) return e();
    this._refreshing = !0;
    const t = this.rawInputValue, s = this.value, i = e();
    return this.rawInputValue = t, this.value && this.value !== s && s.indexOf(this.value) === 0 && (this.append(s.slice(this.displayValue.length), {}, ""), this.doCommit()), delete this._refreshing, i;
  }
  runIsolated(e) {
    if (this._isolated || !this._initialized) return e(this);
    this._isolated = !0;
    const t = this.state, s = e(this);
    return this.state = t, delete this._isolated, s;
  }
  doSkipInvalid(e, t, s) {
    return !!this.skipInvalid;
  }
  /** Prepares string before mask processing */
  doPrepare(e, t) {
    return t === void 0 && (t = {}), y.normalize(this.prepare ? this.prepare(e, this, t) : e);
  }
  /** Prepares each char before mask processing */
  doPrepareChar(e, t) {
    return t === void 0 && (t = {}), y.normalize(this.prepareChar ? this.prepareChar(e, this, t) : e);
  }
  /** Validates if value is acceptable */
  doValidate(e) {
    return (!this.validate || this.validate(this.value, this, e)) && (!this.parent || this.parent.doValidate(e));
  }
  /** Does additional processing at the end of editing */
  doCommit() {
    this.commit && this.commit(this.value, this);
  }
  splice(e, t, s, i, a) {
    s === void 0 && (s = ""), i === void 0 && (i = f.NONE), a === void 0 && (a = {
      input: !0
    });
    const r = e + t, u = this.extractTail(r), l = this.eager === !0 || this.eager === "remove";
    let o;
    l && (i = Ct(i), o = this.extractInput(0, r, {
      raw: !0
    }));
    let p = e;
    const k = new y();
    if (i !== f.NONE && (p = this.nearestInputPos(e, t > 1 && e !== 0 && !l ? f.NONE : i), k.tailShift = p - e), k.aggregate(this.remove(p)), l && i !== f.NONE && o === this.rawInputValue)
      if (i === f.FORCE_LEFT) {
        let b;
        for (; o === this.rawInputValue && (b = this.displayValue.length); )
          k.aggregate(new y({
            tailShift: -1
          })).aggregate(this.remove(b - 1));
      } else i === f.FORCE_RIGHT && u.unshift();
    return k.aggregate(this.append(s, a, u));
  }
  maskEquals(e) {
    return this.mask === e;
  }
  optionsIsChanged(e) {
    return !ve(this, e);
  }
  typedValueEquals(e) {
    const t = this.typedValue;
    return e === t || T.EMPTY_VALUES.includes(e) && T.EMPTY_VALUES.includes(t) || (this.format ? this.format(e, this) === this.format(this.typedValue, this) : !1);
  }
  pad(e) {
    return new y();
  }
}
T.DEFAULTS = {
  skipInvalid: !0
};
T.EMPTY_VALUES = [void 0, null, ""];
v.Masked = T;
class se {
  /** */
  constructor(e, t) {
    e === void 0 && (e = []), t === void 0 && (t = 0), this.chunks = e, this.from = t;
  }
  toString() {
    return this.chunks.map(String).join("");
  }
  extend(e) {
    if (!String(e)) return;
    e = J(e) ? new q(String(e)) : e;
    const t = this.chunks[this.chunks.length - 1], s = t && // if stops are same or tail has no stop
    (t.stop === e.stop || e.stop == null) && // if tail chunk goes just after last chunk
    e.from === t.from + t.toString().length;
    if (e instanceof q)
      s ? t.extend(e.toString()) : this.chunks.push(e);
    else if (e instanceof se) {
      if (e.stop == null) {
        let i;
        for (; e.chunks.length && e.chunks[0].stop == null; )
          i = e.chunks.shift(), i.from += e.from, this.extend(i);
      }
      e.toString() && (e.stop = e.blockIndex, this.chunks.push(e));
    }
  }
  appendTo(e) {
    if (!(e instanceof v.MaskedPattern))
      return new q(this.toString()).appendTo(e);
    const t = new y();
    for (let s = 0; s < this.chunks.length; ++s) {
      const i = this.chunks[s], a = e._mapPosToBlock(e.displayValue.length), r = i.stop;
      let u;
      if (r != null && // if block not found or stop is behind lastBlock
      (!a || a.index <= r) && ((i instanceof se || // for continuous block also check if stop is exist
      e._stops.indexOf(r) >= 0) && t.aggregate(e._appendPlaceholder(r)), u = i instanceof se && e._blocks[r]), u) {
        const l = u.appendTail(i);
        t.aggregate(l);
        const o = i.toString().slice(l.rawInserted.length);
        o && t.aggregate(e.append(o, {
          tail: !0
        }));
      } else
        t.aggregate(e.append(i.toString(), {
          tail: !0
        }));
    }
    return t;
  }
  get state() {
    return {
      chunks: this.chunks.map((e) => e.state),
      from: this.from,
      stop: this.stop,
      blockIndex: this.blockIndex
    };
  }
  set state(e) {
    const {
      chunks: t,
      ...s
    } = e;
    Object.assign(this, s), this.chunks = t.map((i) => {
      const a = "chunks" in i ? new se() : new q();
      return a.state = i, a;
    });
  }
  unshift(e) {
    if (!this.chunks.length || e != null && this.from >= e) return "";
    const t = e != null ? e - this.from : e;
    let s = 0;
    for (; s < this.chunks.length; ) {
      const i = this.chunks[s], a = i.unshift(t);
      if (i.toString()) {
        if (!a) break;
        ++s;
      } else
        this.chunks.splice(s, 1);
      if (a) return a;
    }
    return "";
  }
  shift() {
    if (!this.chunks.length) return "";
    let e = this.chunks.length - 1;
    for (; 0 <= e; ) {
      const t = this.chunks[e], s = t.shift();
      if (t.toString()) {
        if (!s) break;
        --e;
      } else
        this.chunks.splice(e, 1);
      if (s) return s;
    }
    return "";
  }
}
class bt {
  constructor(e, t) {
    this.masked = e, this._log = [];
    const {
      offset: s,
      index: i
    } = e._mapPosToBlock(t) || (t < 0 ? (
      // first
      {
        index: 0,
        offset: 0
      }
    ) : (
      // last
      {
        index: this.masked._blocks.length,
        offset: 0
      }
    ));
    this.offset = s, this.index = i, this.ok = !1;
  }
  get block() {
    return this.masked._blocks[this.index];
  }
  get pos() {
    return this.masked._blockStartPos(this.index) + this.offset;
  }
  get state() {
    return {
      index: this.index,
      offset: this.offset,
      ok: this.ok
    };
  }
  set state(e) {
    Object.assign(this, e);
  }
  pushState() {
    this._log.push(this.state);
  }
  popState() {
    const e = this._log.pop();
    return e && (this.state = e), e;
  }
  bindBlock() {
    this.block || (this.index < 0 && (this.index = 0, this.offset = 0), this.index >= this.masked._blocks.length && (this.index = this.masked._blocks.length - 1, this.offset = this.block.displayValue.length));
  }
  _pushLeft(e) {
    for (this.pushState(), this.bindBlock(); 0 <= this.index; --this.index, this.offset = ((t = this.block) == null ? void 0 : t.displayValue.length) || 0) {
      var t;
      if (e()) return this.ok = !0;
    }
    return this.ok = !1;
  }
  _pushRight(e) {
    for (this.pushState(), this.bindBlock(); this.index < this.masked._blocks.length; ++this.index, this.offset = 0)
      if (e()) return this.ok = !0;
    return this.ok = !1;
  }
  pushLeftBeforeFilled() {
    return this._pushLeft(() => {
      if (!(this.block.isFixed || !this.block.value) && (this.offset = this.block.nearestInputPos(this.offset, f.FORCE_LEFT), this.offset !== 0))
        return !0;
    });
  }
  pushLeftBeforeInput() {
    return this._pushLeft(() => {
      if (!this.block.isFixed)
        return this.offset = this.block.nearestInputPos(this.offset, f.LEFT), !0;
    });
  }
  pushLeftBeforeRequired() {
    return this._pushLeft(() => {
      if (!(this.block.isFixed || this.block.isOptional && !this.block.value))
        return this.offset = this.block.nearestInputPos(this.offset, f.LEFT), !0;
    });
  }
  pushRightBeforeFilled() {
    return this._pushRight(() => {
      if (!(this.block.isFixed || !this.block.value) && (this.offset = this.block.nearestInputPos(this.offset, f.FORCE_RIGHT), this.offset !== this.block.value.length))
        return !0;
    });
  }
  pushRightBeforeInput() {
    return this._pushRight(() => {
      if (!this.block.isFixed)
        return this.offset = this.block.nearestInputPos(this.offset, f.NONE), !0;
    });
  }
  pushRightBeforeRequired() {
    return this._pushRight(() => {
      if (!(this.block.isFixed || this.block.isOptional && !this.block.value))
        return this.offset = this.block.nearestInputPos(this.offset, f.NONE), !0;
    });
  }
}
class Pe {
  /** */
  /** */
  /** */
  /** */
  /** */
  /** */
  constructor(e) {
    Object.assign(this, e), this._value = "", this.isFixed = !0;
  }
  get value() {
    return this._value;
  }
  get unmaskedValue() {
    return this.isUnmasking ? this.value : "";
  }
  get rawInputValue() {
    return this._isRawInput ? this.value : "";
  }
  get displayValue() {
    return this.value;
  }
  reset() {
    this._isRawInput = !1, this._value = "";
  }
  remove(e, t) {
    return e === void 0 && (e = 0), t === void 0 && (t = this._value.length), this._value = this._value.slice(0, e) + this._value.slice(t), this._value || (this._isRawInput = !1), new y();
  }
  nearestInputPos(e, t) {
    t === void 0 && (t = f.NONE);
    const s = 0, i = this._value.length;
    switch (t) {
      case f.LEFT:
      case f.FORCE_LEFT:
        return s;
      case f.NONE:
      case f.RIGHT:
      case f.FORCE_RIGHT:
      default:
        return i;
    }
  }
  totalInputPositions(e, t) {
    return e === void 0 && (e = 0), t === void 0 && (t = this._value.length), this._isRawInput ? t - e : 0;
  }
  extractInput(e, t, s) {
    return e === void 0 && (e = 0), t === void 0 && (t = this._value.length), s === void 0 && (s = {}), s.raw && this._isRawInput && this._value.slice(e, t) || "";
  }
  get isComplete() {
    return !0;
  }
  get isFilled() {
    return !!this._value;
  }
  _appendChar(e, t) {
    if (t === void 0 && (t = {}), this.isFilled) return new y();
    const s = this.eager === !0 || this.eager === "append", a = this.char === e && (this.isUnmasking || t.input || t.raw) && (!t.raw || !s) && !t.tail, r = new y({
      inserted: this.char,
      rawInserted: a ? this.char : ""
    });
    return this._value = this.char, this._isRawInput = a && (t.raw || t.input), r;
  }
  _appendEager() {
    return this._appendChar(this.char, {
      tail: !0
    });
  }
  _appendPlaceholder() {
    const e = new y();
    return this.isFilled || (this._value = e.inserted = this.char), e;
  }
  extractTail() {
    return new q("");
  }
  appendTail(e) {
    return J(e) && (e = new q(String(e))), e.appendTo(this);
  }
  append(e, t, s) {
    const i = this._appendChar(e[0], t);
    return s != null && (i.tailShift += this.appendTail(s).tailShift), i;
  }
  doCommit() {
  }
  get state() {
    return {
      _value: this._value,
      _rawInputValue: this.rawInputValue
    };
  }
  set state(e) {
    this._value = e._value, this._isRawInput = !!e._rawInputValue;
  }
  pad(e) {
    return this._appendPlaceholder();
  }
}
class Ce {
  /** */
  /** */
  /** */
  /** */
  /** */
  /** */
  /** */
  /** */
  constructor(e) {
    const {
      parent: t,
      isOptional: s,
      placeholderChar: i,
      displayChar: a,
      lazy: r,
      eager: u,
      ...l
    } = e;
    this.masked = K(l), Object.assign(this, {
      parent: t,
      isOptional: s,
      placeholderChar: i,
      displayChar: a,
      lazy: r,
      eager: u
    });
  }
  reset() {
    this.isFilled = !1, this.masked.reset();
  }
  remove(e, t) {
    return e === void 0 && (e = 0), t === void 0 && (t = this.value.length), e === 0 && t >= 1 ? (this.isFilled = !1, this.masked.remove(e, t)) : new y();
  }
  get value() {
    return this.masked.value || (this.isFilled && !this.isOptional ? this.placeholderChar : "");
  }
  get unmaskedValue() {
    return this.masked.unmaskedValue;
  }
  get rawInputValue() {
    return this.masked.rawInputValue;
  }
  get displayValue() {
    return this.masked.value && this.displayChar || this.value;
  }
  get isComplete() {
    return !!this.masked.value || this.isOptional;
  }
  _appendChar(e, t) {
    if (t === void 0 && (t = {}), this.isFilled) return new y();
    const s = this.masked.state;
    let i = this.masked._appendChar(e, this.currentMaskFlags(t));
    return i.inserted && this.doValidate(t) === !1 && (i = new y(), this.masked.state = s), !i.inserted && !this.isOptional && !this.lazy && !t.input && (i.inserted = this.placeholderChar), i.skip = !i.inserted && !this.isOptional, this.isFilled = !!i.inserted, i;
  }
  append(e, t, s) {
    return this.masked.append(e, this.currentMaskFlags(t), s);
  }
  _appendPlaceholder() {
    return this.isFilled || this.isOptional ? new y() : (this.isFilled = !0, new y({
      inserted: this.placeholderChar
    }));
  }
  _appendEager() {
    return new y();
  }
  extractTail(e, t) {
    return this.masked.extractTail(e, t);
  }
  appendTail(e) {
    return this.masked.appendTail(e);
  }
  extractInput(e, t, s) {
    return e === void 0 && (e = 0), t === void 0 && (t = this.value.length), this.masked.extractInput(e, t, s);
  }
  nearestInputPos(e, t) {
    t === void 0 && (t = f.NONE);
    const s = 0, i = this.value.length, a = Math.min(Math.max(e, s), i);
    switch (t) {
      case f.LEFT:
      case f.FORCE_LEFT:
        return this.isComplete ? a : s;
      case f.RIGHT:
      case f.FORCE_RIGHT:
        return this.isComplete ? a : i;
      case f.NONE:
      default:
        return a;
    }
  }
  totalInputPositions(e, t) {
    return e === void 0 && (e = 0), t === void 0 && (t = this.value.length), this.value.slice(e, t).length;
  }
  doValidate(e) {
    return this.masked.doValidate(this.currentMaskFlags(e)) && (!this.parent || this.parent.doValidate(this.currentMaskFlags(e)));
  }
  doCommit() {
    this.masked.doCommit();
  }
  get state() {
    return {
      _value: this.value,
      _rawInputValue: this.rawInputValue,
      masked: this.masked.state,
      isFilled: this.isFilled
    };
  }
  set state(e) {
    this.masked.state = e.masked, this.isFilled = e.isFilled;
  }
  currentMaskFlags(e) {
    var t;
    return {
      ...e,
      _beforeTailState: (e == null || (t = e._beforeTailState) == null ? void 0 : t.masked) || (e == null ? void 0 : e._beforeTailState)
    };
  }
  pad(e) {
    return new y();
  }
}
Ce.DEFAULT_DEFINITIONS = {
  0: /\d/,
  a: /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
  // http://stackoverflow.com/a/22075070
  "*": /./
};
class St extends T {
  /** */
  /** Enable characters overwriting */
  /** */
  /** */
  /** */
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    const t = e.mask;
    t && (e.validate = (s) => s.search(t) >= 0), super._update(e);
  }
}
v.MaskedRegExp = St;
class O extends T {
  /** */
  /** */
  /** Single char for empty input */
  /** Single char for filled input */
  /** Show placeholder only when needed */
  /** Enable characters overwriting */
  /** */
  /** */
  /** */
  constructor(e) {
    super({
      ...O.DEFAULTS,
      ...e,
      definitions: Object.assign({}, Ce.DEFAULT_DEFINITIONS, e == null ? void 0 : e.definitions)
    });
  }
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    e.definitions = Object.assign({}, this.definitions, e.definitions), super._update(e), this._rebuildMask();
  }
  _rebuildMask() {
    const e = this.definitions;
    this._blocks = [], this.exposeBlock = void 0, this._stops = [], this._maskedBlocks = {};
    const t = this.mask;
    if (!t || !e) return;
    let s = !1, i = !1;
    for (let a = 0; a < t.length; ++a) {
      if (this.blocks) {
        const o = t.slice(a), p = Object.keys(this.blocks).filter((b) => o.indexOf(b) === 0);
        p.sort((b, _) => _.length - b.length);
        const k = p[0];
        if (k) {
          const {
            expose: b,
            repeat: _,
            ...F
          } = de(this.blocks[k]), R = {
            lazy: this.lazy,
            eager: this.eager,
            placeholderChar: this.placeholderChar,
            displayChar: this.displayChar,
            overwrite: this.overwrite,
            autofix: this.autofix,
            ...F,
            repeat: _,
            parent: this
          }, V = _ != null ? new v.RepeatBlock(
            R
            /* TODO */
          ) : K(R);
          V && (this._blocks.push(V), b && (this.exposeBlock = V), this._maskedBlocks[k] || (this._maskedBlocks[k] = []), this._maskedBlocks[k].push(this._blocks.length - 1)), a += k.length - 1;
          continue;
        }
      }
      let r = t[a], u = r in e;
      if (r === O.STOP_CHAR) {
        this._stops.push(this._blocks.length);
        continue;
      }
      if (r === "{" || r === "}") {
        s = !s;
        continue;
      }
      if (r === "[" || r === "]") {
        i = !i;
        continue;
      }
      if (r === O.ESCAPE_CHAR) {
        if (++a, r = t[a], !r) break;
        u = !1;
      }
      const l = u ? new Ce({
        isOptional: i,
        lazy: this.lazy,
        eager: this.eager,
        placeholderChar: this.placeholderChar,
        displayChar: this.displayChar,
        ...de(e[r]),
        parent: this
      }) : new Pe({
        char: r,
        eager: this.eager,
        isUnmasking: s
      });
      this._blocks.push(l);
    }
  }
  get state() {
    return {
      ...super.state,
      _blocks: this._blocks.map((e) => e.state)
    };
  }
  set state(e) {
    if (!e) {
      this.reset();
      return;
    }
    const {
      _blocks: t,
      ...s
    } = e;
    this._blocks.forEach((i, a) => i.state = t[a]), super.state = s;
  }
  reset() {
    super.reset(), this._blocks.forEach((e) => e.reset());
  }
  get isComplete() {
    return this.exposeBlock ? this.exposeBlock.isComplete : this._blocks.every((e) => e.isComplete);
  }
  get isFilled() {
    return this._blocks.every((e) => e.isFilled);
  }
  get isFixed() {
    return this._blocks.every((e) => e.isFixed);
  }
  get isOptional() {
    return this._blocks.every((e) => e.isOptional);
  }
  doCommit() {
    this._blocks.forEach((e) => e.doCommit()), super.doCommit();
  }
  get unmaskedValue() {
    return this.exposeBlock ? this.exposeBlock.unmaskedValue : this._blocks.reduce((e, t) => e += t.unmaskedValue, "");
  }
  set unmaskedValue(e) {
    if (this.exposeBlock) {
      const t = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
      this.exposeBlock.unmaskedValue = e, this.appendTail(t), this.doCommit();
    } else super.unmaskedValue = e;
  }
  get value() {
    return this.exposeBlock ? this.exposeBlock.value : (
      // TODO return _value when not in change?
      this._blocks.reduce((e, t) => e += t.value, "")
    );
  }
  set value(e) {
    if (this.exposeBlock) {
      const t = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
      this.exposeBlock.value = e, this.appendTail(t), this.doCommit();
    } else super.value = e;
  }
  get typedValue() {
    return this.exposeBlock ? this.exposeBlock.typedValue : super.typedValue;
  }
  set typedValue(e) {
    if (this.exposeBlock) {
      const t = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
      this.exposeBlock.typedValue = e, this.appendTail(t), this.doCommit();
    } else super.typedValue = e;
  }
  get displayValue() {
    return this._blocks.reduce((e, t) => e += t.displayValue, "");
  }
  appendTail(e) {
    return super.appendTail(e).aggregate(this._appendPlaceholder());
  }
  _appendEager() {
    var e;
    const t = new y();
    let s = (e = this._mapPosToBlock(this.displayValue.length)) == null ? void 0 : e.index;
    if (s == null) return t;
    this._blocks[s].isFilled && ++s;
    for (let i = s; i < this._blocks.length; ++i) {
      const a = this._blocks[i]._appendEager();
      if (!a.inserted) break;
      t.aggregate(a);
    }
    return t;
  }
  _appendCharRaw(e, t) {
    t === void 0 && (t = {});
    const s = this._mapPosToBlock(this.displayValue.length), i = new y();
    if (!s) return i;
    for (let r = s.index, u; u = this._blocks[r]; ++r) {
      var a;
      const l = u._appendChar(e, {
        ...t,
        _beforeTailState: (a = t._beforeTailState) == null || (a = a._blocks) == null ? void 0 : a[r]
      });
      if (i.aggregate(l), l.consumed) break;
    }
    return i;
  }
  extractTail(e, t) {
    e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length);
    const s = new se();
    return e === t || this._forEachBlocksInRange(e, t, (i, a, r, u) => {
      const l = i.extractTail(r, u);
      l.stop = this._findStopBefore(a), l.from = this._blockStartPos(a), l instanceof se && (l.blockIndex = a), s.extend(l);
    }), s;
  }
  extractInput(e, t, s) {
    if (e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), s === void 0 && (s = {}), e === t) return "";
    let i = "";
    return this._forEachBlocksInRange(e, t, (a, r, u, l) => {
      i += a.extractInput(u, l, s);
    }), i;
  }
  _findStopBefore(e) {
    let t;
    for (let s = 0; s < this._stops.length; ++s) {
      const i = this._stops[s];
      if (i <= e) t = i;
      else break;
    }
    return t;
  }
  /** Appends placeholder depending on laziness */
  _appendPlaceholder(e) {
    const t = new y();
    if (this.lazy && e == null) return t;
    const s = this._mapPosToBlock(this.displayValue.length);
    if (!s) return t;
    const i = s.index, a = e ?? this._blocks.length;
    return this._blocks.slice(i, a).forEach((r) => {
      if (!r.lazy || e != null) {
        var u;
        t.aggregate(r._appendPlaceholder((u = r._blocks) == null ? void 0 : u.length));
      }
    }), t;
  }
  /** Finds block in pos */
  _mapPosToBlock(e) {
    let t = "";
    for (let s = 0; s < this._blocks.length; ++s) {
      const i = this._blocks[s], a = t.length;
      if (t += i.displayValue, e <= t.length)
        return {
          index: s,
          offset: e - a
        };
    }
  }
  _blockStartPos(e) {
    return this._blocks.slice(0, e).reduce((t, s) => t += s.displayValue.length, 0);
  }
  _forEachBlocksInRange(e, t, s) {
    t === void 0 && (t = this.displayValue.length);
    const i = this._mapPosToBlock(e);
    if (i) {
      const a = this._mapPosToBlock(t), r = a && i.index === a.index, u = i.offset, l = a && r ? a.offset : this._blocks[i.index].displayValue.length;
      if (s(this._blocks[i.index], i.index, u, l), a && !r) {
        for (let o = i.index + 1; o < a.index; ++o)
          s(this._blocks[o], o, 0, this._blocks[o].displayValue.length);
        s(this._blocks[a.index], a.index, 0, a.offset);
      }
    }
  }
  remove(e, t) {
    e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length);
    const s = super.remove(e, t);
    return this._forEachBlocksInRange(e, t, (i, a, r, u) => {
      s.aggregate(i.remove(r, u));
    }), s;
  }
  nearestInputPos(e, t) {
    if (t === void 0 && (t = f.NONE), !this._blocks.length) return 0;
    const s = new bt(this, e);
    if (t === f.NONE)
      return s.pushRightBeforeInput() || (s.popState(), s.pushLeftBeforeInput()) ? s.pos : this.displayValue.length;
    if (t === f.LEFT || t === f.FORCE_LEFT) {
      if (t === f.LEFT) {
        if (s.pushRightBeforeFilled(), s.ok && s.pos === e) return e;
        s.popState();
      }
      if (s.pushLeftBeforeInput(), s.pushLeftBeforeRequired(), s.pushLeftBeforeFilled(), t === f.LEFT) {
        if (s.pushRightBeforeInput(), s.pushRightBeforeRequired(), s.ok && s.pos <= e || (s.popState(), s.ok && s.pos <= e)) return s.pos;
        s.popState();
      }
      return s.ok ? s.pos : t === f.FORCE_LEFT ? 0 : (s.popState(), s.ok || (s.popState(), s.ok) ? s.pos : 0);
    }
    return t === f.RIGHT || t === f.FORCE_RIGHT ? (s.pushRightBeforeInput(), s.pushRightBeforeRequired(), s.pushRightBeforeFilled() ? s.pos : t === f.FORCE_RIGHT ? this.displayValue.length : (s.popState(), s.ok || (s.popState(), s.ok) ? s.pos : this.nearestInputPos(e, f.LEFT))) : e;
  }
  totalInputPositions(e, t) {
    e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length);
    let s = 0;
    return this._forEachBlocksInRange(e, t, (i, a, r, u) => {
      s += i.totalInputPositions(r, u);
    }), s;
  }
  /** Get block by name */
  maskedBlock(e) {
    return this.maskedBlocks(e)[0];
  }
  /** Get all blocks by name */
  maskedBlocks(e) {
    const t = this._maskedBlocks[e];
    return t ? t.map((s) => this._blocks[s]) : [];
  }
  pad(e) {
    const t = new y();
    return this._forEachBlocksInRange(0, this.displayValue.length, (s) => t.aggregate(s.pad(e))), t;
  }
}
O.DEFAULTS = {
  ...T.DEFAULTS,
  lazy: !0,
  placeholderChar: "_"
};
O.STOP_CHAR = "`";
O.ESCAPE_CHAR = "\\";
O.InputDefinition = Ce;
O.FixedDefinition = Pe;
v.MaskedPattern = O;
class ge extends O {
  /**
    Optionally sets max length of pattern.
    Used when pattern length is longer then `to` param length. Pads zeros at start in this case.
  */
  /** Min bound */
  /** Max bound */
  get _matchFrom() {
    return this.maxLength - String(this.from).length;
  }
  constructor(e) {
    super(e);
  }
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    const {
      to: t = this.to || 0,
      from: s = this.from || 0,
      maxLength: i = this.maxLength || 0,
      autofix: a = this.autofix,
      ...r
    } = e;
    this.to = t, this.from = s, this.maxLength = Math.max(String(t).length, i), this.autofix = a;
    const u = String(this.from).padStart(this.maxLength, "0"), l = String(this.to).padStart(this.maxLength, "0");
    let o = 0;
    for (; o < l.length && l[o] === u[o]; ) ++o;
    r.mask = l.slice(0, o).replace(/0/g, "\\0") + "0".repeat(this.maxLength - o), super._update(r);
  }
  get isComplete() {
    return super.isComplete && !!this.value;
  }
  boundaries(e) {
    let t = "", s = "";
    const [, i, a] = e.match(/^(\D*)(\d*)(\D*)/) || [];
    return a && (t = "0".repeat(i.length) + a, s = "9".repeat(i.length) + a), t = t.padEnd(this.maxLength, "0"), s = s.padEnd(this.maxLength, "9"), [t, s];
  }
  doPrepareChar(e, t) {
    t === void 0 && (t = {});
    let s;
    return [e, s] = super.doPrepareChar(e.replace(/\D/g, ""), t), e || (s.skip = !this.isComplete), [e, s];
  }
  _appendCharRaw(e, t) {
    if (t === void 0 && (t = {}), !this.autofix || this.value.length + 1 > this.maxLength) return super._appendCharRaw(e, t);
    const s = String(this.from).padStart(this.maxLength, "0"), i = String(this.to).padStart(this.maxLength, "0"), [a, r] = this.boundaries(this.value + e);
    return Number(r) < this.from ? super._appendCharRaw(s[this.value.length], t) : Number(a) > this.to ? !t.tail && this.autofix === "pad" && this.value.length + 1 < this.maxLength ? super._appendCharRaw(s[this.value.length], t).aggregate(this._appendCharRaw(e, t)) : super._appendCharRaw(i[this.value.length], t) : super._appendCharRaw(e, t);
  }
  doValidate(e) {
    const t = this.value;
    if (t.search(/[^0]/) === -1 && t.length <= this._matchFrom) return !0;
    const [i, a] = this.boundaries(t);
    return this.from <= Number(a) && Number(i) <= this.to && super.doValidate(e);
  }
  pad(e) {
    const t = new y();
    if (this.value.length === this.maxLength) return t;
    const s = this.value, i = this.maxLength - this.value.length;
    if (i) {
      this.reset();
      for (let a = 0; a < i; ++a)
        t.aggregate(super._appendCharRaw("0", e));
      s.split("").forEach((a) => this._appendCharRaw(a));
    }
    return t;
  }
}
v.MaskedRange = ge;
const xt = "d{.}`m{.}`Y";
class z extends O {
  static extractPatternOptions(e) {
    const {
      mask: t,
      pattern: s,
      ...i
    } = e;
    return {
      ...i,
      mask: J(t) ? t : s
    };
  }
  /** Pattern mask for date according to {@link MaskedDate#format} */
  /** Start date */
  /** End date */
  /** Format typed value to string */
  /** Parse string to get typed value */
  constructor(e) {
    super(z.extractPatternOptions({
      ...z.DEFAULTS,
      ...e
    }));
  }
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    const {
      mask: t,
      pattern: s,
      blocks: i,
      ...a
    } = {
      ...z.DEFAULTS,
      ...e
    }, r = Object.assign({}, z.GET_DEFAULT_BLOCKS());
    e.min && (r.Y.from = e.min.getFullYear()), e.max && (r.Y.to = e.max.getFullYear()), e.min && e.max && r.Y.from === r.Y.to && (r.m.from = e.min.getMonth() + 1, r.m.to = e.max.getMonth() + 1, r.m.from === r.m.to && (r.d.from = e.min.getDate(), r.d.to = e.max.getDate())), Object.assign(r, this.blocks, i), super._update({
      ...a,
      mask: J(t) ? t : s,
      blocks: r
    });
  }
  doValidate(e) {
    const t = this.date;
    return super.doValidate(e) && (!this.isComplete || this.isDateExist(this.value) && t != null && (this.min == null || this.min <= t) && (this.max == null || t <= this.max));
  }
  /** Checks if date is exists */
  isDateExist(e) {
    return this.format(this.parse(e, this), this).indexOf(e) >= 0;
  }
  /** Parsed Date */
  get date() {
    return this.typedValue;
  }
  set date(e) {
    this.typedValue = e;
  }
  get typedValue() {
    return this.isComplete ? super.typedValue : null;
  }
  set typedValue(e) {
    super.typedValue = e;
  }
  maskEquals(e) {
    return e === Date || super.maskEquals(e);
  }
  optionsIsChanged(e) {
    return super.optionsIsChanged(z.extractPatternOptions(e));
  }
}
z.GET_DEFAULT_BLOCKS = () => ({
  d: {
    mask: ge,
    from: 1,
    to: 31,
    maxLength: 2
  },
  m: {
    mask: ge,
    from: 1,
    to: 12,
    maxLength: 2
  },
  Y: {
    mask: ge,
    from: 1900,
    to: 9999
  }
});
z.DEFAULTS = {
  ...O.DEFAULTS,
  mask: Date,
  pattern: xt,
  format: (n, e) => {
    if (!n) return "";
    const t = String(n.getDate()).padStart(2, "0"), s = String(n.getMonth() + 1).padStart(2, "0"), i = n.getFullYear();
    return [t, s, i].join(".");
  },
  parse: (n, e) => {
    const [t, s, i] = n.split(".").map(Number);
    return new Date(i, s - 1, t);
  }
};
v.MaskedDate = z;
class ye extends T {
  constructor(e) {
    super({
      ...ye.DEFAULTS,
      ...e
    }), this.currentMask = void 0;
  }
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    super._update(e), "mask" in e && (this.exposeMask = void 0, this.compiledMasks = Array.isArray(e.mask) ? e.mask.map((t) => {
      const {
        expose: s,
        ...i
      } = de(t), a = K({
        overwrite: this._overwrite,
        eager: this._eager,
        skipInvalid: this._skipInvalid,
        ...i
      });
      return s && (this.exposeMask = a), a;
    }) : []);
  }
  _appendCharRaw(e, t) {
    t === void 0 && (t = {});
    const s = this._applyDispatch(e, t);
    return this.currentMask && s.aggregate(this.currentMask._appendChar(e, this.currentMaskFlags(t))), s;
  }
  _applyDispatch(e, t, s) {
    e === void 0 && (e = ""), t === void 0 && (t = {}), s === void 0 && (s = "");
    const i = t.tail && t._beforeTailState != null ? t._beforeTailState._value : this.value, a = this.rawInputValue, r = t.tail && t._beforeTailState != null ? t._beforeTailState._rawInputValue : a, u = a.slice(r.length), l = this.currentMask, o = new y(), p = l == null ? void 0 : l.state;
    return this.currentMask = this.doDispatch(e, {
      ...t
    }, s), this.currentMask && (this.currentMask !== l ? (this.currentMask.reset(), r && (this.currentMask.append(r, {
      raw: !0
    }), o.tailShift = this.currentMask.value.length - i.length), u && (o.tailShift += this.currentMask.append(u, {
      raw: !0,
      tail: !0
    }).tailShift)) : p && (this.currentMask.state = p)), o;
  }
  _appendPlaceholder() {
    const e = this._applyDispatch();
    return this.currentMask && e.aggregate(this.currentMask._appendPlaceholder()), e;
  }
  _appendEager() {
    const e = this._applyDispatch();
    return this.currentMask && e.aggregate(this.currentMask._appendEager()), e;
  }
  appendTail(e) {
    const t = new y();
    return e && t.aggregate(this._applyDispatch("", {}, e)), t.aggregate(this.currentMask ? this.currentMask.appendTail(e) : super.appendTail(e));
  }
  currentMaskFlags(e) {
    var t, s;
    return {
      ...e,
      _beforeTailState: ((t = e._beforeTailState) == null ? void 0 : t.currentMaskRef) === this.currentMask && ((s = e._beforeTailState) == null ? void 0 : s.currentMask) || e._beforeTailState
    };
  }
  doDispatch(e, t, s) {
    return t === void 0 && (t = {}), s === void 0 && (s = ""), this.dispatch(e, this, t, s);
  }
  doValidate(e) {
    return super.doValidate(e) && (!this.currentMask || this.currentMask.doValidate(this.currentMaskFlags(e)));
  }
  doPrepare(e, t) {
    t === void 0 && (t = {});
    let [s, i] = super.doPrepare(e, t);
    if (this.currentMask) {
      let a;
      [s, a] = super.doPrepare(s, this.currentMaskFlags(t)), i = i.aggregate(a);
    }
    return [s, i];
  }
  doPrepareChar(e, t) {
    t === void 0 && (t = {});
    let [s, i] = super.doPrepareChar(e, t);
    if (this.currentMask) {
      let a;
      [s, a] = super.doPrepareChar(s, this.currentMaskFlags(t)), i = i.aggregate(a);
    }
    return [s, i];
  }
  reset() {
    var e;
    (e = this.currentMask) == null || e.reset(), this.compiledMasks.forEach((t) => t.reset());
  }
  get value() {
    return this.exposeMask ? this.exposeMask.value : this.currentMask ? this.currentMask.value : "";
  }
  set value(e) {
    this.exposeMask ? (this.exposeMask.value = e, this.currentMask = this.exposeMask, this._applyDispatch()) : super.value = e;
  }
  get unmaskedValue() {
    return this.exposeMask ? this.exposeMask.unmaskedValue : this.currentMask ? this.currentMask.unmaskedValue : "";
  }
  set unmaskedValue(e) {
    this.exposeMask ? (this.exposeMask.unmaskedValue = e, this.currentMask = this.exposeMask, this._applyDispatch()) : super.unmaskedValue = e;
  }
  get typedValue() {
    return this.exposeMask ? this.exposeMask.typedValue : this.currentMask ? this.currentMask.typedValue : "";
  }
  set typedValue(e) {
    if (this.exposeMask) {
      this.exposeMask.typedValue = e, this.currentMask = this.exposeMask, this._applyDispatch();
      return;
    }
    let t = String(e);
    this.currentMask && (this.currentMask.typedValue = e, t = this.currentMask.unmaskedValue), this.unmaskedValue = t;
  }
  get displayValue() {
    return this.currentMask ? this.currentMask.displayValue : "";
  }
  get isComplete() {
    var e;
    return !!((e = this.currentMask) != null && e.isComplete);
  }
  get isFilled() {
    var e;
    return !!((e = this.currentMask) != null && e.isFilled);
  }
  remove(e, t) {
    const s = new y();
    return this.currentMask && s.aggregate(this.currentMask.remove(e, t)).aggregate(this._applyDispatch()), s;
  }
  get state() {
    var e;
    return {
      ...super.state,
      _rawInputValue: this.rawInputValue,
      compiledMasks: this.compiledMasks.map((t) => t.state),
      currentMaskRef: this.currentMask,
      currentMask: (e = this.currentMask) == null ? void 0 : e.state
    };
  }
  set state(e) {
    const {
      compiledMasks: t,
      currentMaskRef: s,
      currentMask: i,
      ...a
    } = e;
    t && this.compiledMasks.forEach((r, u) => r.state = t[u]), s != null && (this.currentMask = s, this.currentMask.state = i), super.state = a;
  }
  extractInput(e, t, s) {
    return this.currentMask ? this.currentMask.extractInput(e, t, s) : "";
  }
  extractTail(e, t) {
    return this.currentMask ? this.currentMask.extractTail(e, t) : super.extractTail(e, t);
  }
  doCommit() {
    this.currentMask && this.currentMask.doCommit(), super.doCommit();
  }
  nearestInputPos(e, t) {
    return this.currentMask ? this.currentMask.nearestInputPos(e, t) : super.nearestInputPos(e, t);
  }
  get overwrite() {
    return this.currentMask ? this.currentMask.overwrite : this._overwrite;
  }
  set overwrite(e) {
    this._overwrite = e;
  }
  get eager() {
    return this.currentMask ? this.currentMask.eager : this._eager;
  }
  set eager(e) {
    this._eager = e;
  }
  get skipInvalid() {
    return this.currentMask ? this.currentMask.skipInvalid : this._skipInvalid;
  }
  set skipInvalid(e) {
    this._skipInvalid = e;
  }
  get autofix() {
    return this.currentMask ? this.currentMask.autofix : this._autofix;
  }
  set autofix(e) {
    this._autofix = e;
  }
  maskEquals(e) {
    return Array.isArray(e) ? this.compiledMasks.every((t, s) => {
      if (!e[s]) return;
      const {
        mask: i,
        ...a
      } = e[s];
      return ve(t, a) && t.maskEquals(i);
    }) : super.maskEquals(e);
  }
  typedValueEquals(e) {
    var t;
    return !!((t = this.currentMask) != null && t.typedValueEquals(e));
  }
}
ye.DEFAULTS = {
  ...T.DEFAULTS,
  dispatch: (n, e, t, s) => {
    if (!e.compiledMasks.length) return;
    const i = e.rawInputValue, a = e.compiledMasks.map((r, u) => {
      const l = e.currentMask === r, o = l ? r.displayValue.length : r.nearestInputPos(r.displayValue.length, f.FORCE_LEFT);
      return r.rawInputValue !== i ? (r.reset(), r.append(i, {
        raw: !0
      })) : l || r.remove(o), r.append(n, e.currentMaskFlags(t)), r.appendTail(s), {
        index: u,
        weight: r.rawInputValue.length,
        totalInputPositions: r.totalInputPositions(0, Math.max(o, r.nearestInputPos(r.displayValue.length, f.FORCE_LEFT)))
      };
    });
    return a.sort((r, u) => u.weight - r.weight || u.totalInputPositions - r.totalInputPositions), e.compiledMasks[a[0].index];
  }
};
v.MaskedDynamic = ye;
class Fe extends O {
  constructor(e) {
    super({
      ...Fe.DEFAULTS,
      ...e
    });
  }
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    const {
      enum: t,
      ...s
    } = e;
    if (t) {
      const i = t.map((u) => u.length), a = Math.min(...i), r = Math.max(...i) - a;
      s.mask = "*".repeat(a), r && (s.mask += "[" + "*".repeat(r) + "]"), this.enum = t;
    }
    super._update(s);
  }
  _appendCharRaw(e, t) {
    t === void 0 && (t = {});
    const s = Math.min(this.nearestInputPos(0, f.FORCE_RIGHT), this.value.length), i = this.enum.filter((a) => this.matchValue(a, this.unmaskedValue + e, s));
    if (i.length) {
      i.length === 1 && this._forEachBlocksInRange(0, this.value.length, (r, u) => {
        const l = i[0][u];
        u >= this.value.length || l === r.value || (r.reset(), r._appendChar(l, t));
      });
      const a = super._appendCharRaw(i[0][this.value.length], t);
      return i.length === 1 && i[0].slice(this.unmaskedValue.length).split("").forEach((r) => a.aggregate(super._appendCharRaw(r))), a;
    }
    return new y({
      skip: !this.isComplete
    });
  }
  extractTail(e, t) {
    return e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), new q("", e);
  }
  remove(e, t) {
    if (e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), e === t) return new y();
    const s = Math.min(super.nearestInputPos(0, f.FORCE_RIGHT), this.value.length);
    let i;
    for (i = e; i >= 0 && !(this.enum.filter((u) => this.matchValue(u, this.value.slice(s, i), s)).length > 1); --i)
      ;
    const a = super.remove(i, t);
    return a.tailShift += i - e, a;
  }
  get isComplete() {
    return this.enum.indexOf(this.value) >= 0;
  }
}
Fe.DEFAULTS = {
  ...O.DEFAULTS,
  matchValue: (n, e, t) => n.indexOf(e, t) === t
};
v.MaskedEnum = Fe;
class Bt extends T {
  /** */
  /** Enable characters overwriting */
  /** */
  /** */
  /** */
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    super._update({
      ...e,
      validate: e.mask
    });
  }
}
v.MaskedFunction = Bt;
var qe;
class N extends T {
  /** Single char */
  /** Single char */
  /** Array of single chars */
  /** */
  /** */
  /** Digits after point */
  /** Flag to remove leading and trailing zeros in the end of editing */
  /** Flag to pad trailing zeros after point in the end of editing */
  /** Enable characters overwriting */
  /** */
  /** */
  /** */
  /** Format typed value to string */
  /** Parse string to get typed value */
  constructor(e) {
    super({
      ...N.DEFAULTS,
      ...e
    });
  }
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    super._update(e), this._updateRegExps();
  }
  _updateRegExps() {
    const e = "^" + (this.allowNegative ? "[+|\\-]?" : ""), t = "\\d*", s = (this.scale ? "(" + Se(this.radix) + "\\d{0," + this.scale + "})?" : "") + "$";
    this._numberRegExp = new RegExp(e + t + s), this._mapToRadixRegExp = new RegExp("[" + this.mapToRadix.map(Se).join("") + "]", "g"), this._thousandsSeparatorRegExp = new RegExp(Se(this.thousandsSeparator), "g");
  }
  _removeThousandsSeparators(e) {
    return e.replace(this._thousandsSeparatorRegExp, "");
  }
  _insertThousandsSeparators(e) {
    const t = e.split(this.radix);
    return t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator), t.join(this.radix);
  }
  doPrepareChar(e, t) {
    t === void 0 && (t = {});
    const [s, i] = super.doPrepareChar(this._removeThousandsSeparators(this.scale && this.mapToRadix.length && /*
      radix should be mapped when
      1) input is done from keyboard = flags.input && flags.raw
      2) unmasked value is set = !flags.input && !flags.raw
      and should not be mapped when
      1) value is set = flags.input && !flags.raw
      2) raw value is set = !flags.input && flags.raw
    */
    (t.input && t.raw || !t.input && !t.raw) ? e.replace(this._mapToRadixRegExp, this.radix) : e), t);
    return e && !s && (i.skip = !0), s && !this.allowPositive && !this.value && s !== "-" && i.aggregate(this._appendChar("-")), [s, i];
  }
  _separatorsCount(e, t) {
    t === void 0 && (t = !1);
    let s = 0;
    for (let i = 0; i < e; ++i)
      this._value.indexOf(this.thousandsSeparator, i) === i && (++s, t && (e += this.thousandsSeparator.length));
    return s;
  }
  _separatorsCountFromSlice(e) {
    return e === void 0 && (e = this._value), this._separatorsCount(this._removeThousandsSeparators(e).length, !0);
  }
  extractInput(e, t, s) {
    return e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), [e, t] = this._adjustRangeWithSeparators(e, t), this._removeThousandsSeparators(super.extractInput(e, t, s));
  }
  _appendCharRaw(e, t) {
    t === void 0 && (t = {});
    const s = t.tail && t._beforeTailState ? t._beforeTailState._value : this._value, i = this._separatorsCountFromSlice(s);
    this._value = this._removeThousandsSeparators(this.value);
    const a = this._value;
    this._value += e;
    const r = this.number;
    let u = !isNaN(r), l = !1;
    if (u) {
      let b;
      this.min != null && this.min < 0 && this.number < this.min && (b = this.min), this.max != null && this.max > 0 && this.number > this.max && (b = this.max), b != null && (this.autofix ? (this._value = this.format(b, this).replace(N.UNMASKED_RADIX, this.radix), l || (l = a === this._value && !t.tail)) : u = !1), u && (u = !!this._value.match(this._numberRegExp));
    }
    let o;
    u ? o = new y({
      inserted: this._value.slice(a.length),
      rawInserted: l ? "" : e,
      skip: l
    }) : (this._value = a, o = new y()), this._value = this._insertThousandsSeparators(this._value);
    const p = t.tail && t._beforeTailState ? t._beforeTailState._value : this._value, k = this._separatorsCountFromSlice(p);
    return o.tailShift += (k - i) * this.thousandsSeparator.length, o;
  }
  _findSeparatorAround(e) {
    if (this.thousandsSeparator) {
      const t = e - this.thousandsSeparator.length + 1, s = this.value.indexOf(this.thousandsSeparator, t);
      if (s <= e) return s;
    }
    return -1;
  }
  _adjustRangeWithSeparators(e, t) {
    const s = this._findSeparatorAround(e);
    s >= 0 && (e = s);
    const i = this._findSeparatorAround(t);
    return i >= 0 && (t = i + this.thousandsSeparator.length), [e, t];
  }
  remove(e, t) {
    e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), [e, t] = this._adjustRangeWithSeparators(e, t);
    const s = this.value.slice(0, e), i = this.value.slice(t), a = this._separatorsCount(s.length);
    this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(s + i));
    const r = this._separatorsCountFromSlice(s);
    return new y({
      tailShift: (r - a) * this.thousandsSeparator.length
    });
  }
  nearestInputPos(e, t) {
    if (!this.thousandsSeparator) return e;
    switch (t) {
      case f.NONE:
      case f.LEFT:
      case f.FORCE_LEFT: {
        const s = this._findSeparatorAround(e - 1);
        if (s >= 0) {
          const i = s + this.thousandsSeparator.length;
          if (e < i || this.value.length <= i || t === f.FORCE_LEFT)
            return s;
        }
        break;
      }
      case f.RIGHT:
      case f.FORCE_RIGHT: {
        const s = this._findSeparatorAround(e);
        if (s >= 0)
          return s + this.thousandsSeparator.length;
      }
    }
    return e;
  }
  doCommit() {
    if (this.value) {
      const e = this.number;
      let t = e;
      this.min != null && (t = Math.max(t, this.min)), this.max != null && (t = Math.min(t, this.max)), t !== e && (this.unmaskedValue = this.format(t, this));
      let s = this.value;
      this.normalizeZeros && (s = this._normalizeZeros(s)), this.padFractionalZeros && this.scale > 0 && (s = this._padFractionalZeros(s)), this._value = s;
    }
    super.doCommit();
  }
  _normalizeZeros(e) {
    const t = this._removeThousandsSeparators(e).split(this.radix);
    return t[0] = t[0].replace(/^(\D*)(0*)(\d*)/, (s, i, a, r) => i + r), e.length && !/\d$/.test(t[0]) && (t[0] = t[0] + "0"), t.length > 1 && (t[1] = t[1].replace(/0*$/, ""), t[1].length || (t.length = 1)), this._insertThousandsSeparators(t.join(this.radix));
  }
  _padFractionalZeros(e) {
    if (!e) return e;
    const t = e.split(this.radix);
    return t.length < 2 && t.push(""), t[1] = t[1].padEnd(this.scale, "0"), t.join(this.radix);
  }
  doSkipInvalid(e, t, s) {
    t === void 0 && (t = {});
    const i = this.scale === 0 && e !== this.thousandsSeparator && (e === this.radix || e === N.UNMASKED_RADIX || this.mapToRadix.includes(e));
    return super.doSkipInvalid(e, t, s) && !i;
  }
  get unmaskedValue() {
    return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, N.UNMASKED_RADIX);
  }
  set unmaskedValue(e) {
    super.unmaskedValue = e;
  }
  get typedValue() {
    return this.parse(this.unmaskedValue, this);
  }
  set typedValue(e) {
    this.rawInputValue = this.format(e, this).replace(N.UNMASKED_RADIX, this.radix);
  }
  /** Parsed Number */
  get number() {
    return this.typedValue;
  }
  set number(e) {
    this.typedValue = e;
  }
  get allowNegative() {
    return this.min != null && this.min < 0 || this.max != null && this.max < 0;
  }
  get allowPositive() {
    return this.min != null && this.min > 0 || this.max != null && this.max > 0;
  }
  typedValueEquals(e) {
    return (super.typedValueEquals(e) || N.EMPTY_VALUES.includes(e) && N.EMPTY_VALUES.includes(this.typedValue)) && !(e === 0 && this.value === "");
  }
}
qe = N;
N.UNMASKED_RADIX = ".";
N.EMPTY_VALUES = [...T.EMPTY_VALUES, 0];
N.DEFAULTS = {
  ...T.DEFAULTS,
  mask: Number,
  radix: ",",
  thousandsSeparator: "",
  mapToRadix: [qe.UNMASKED_RADIX],
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  scale: 2,
  normalizeZeros: !0,
  padFractionalZeros: !1,
  parse: Number,
  format: (n) => n.toLocaleString("en-US", {
    useGrouping: !1,
    maximumFractionDigits: 20
  })
};
v.MaskedNumber = N;
const Me = {
  MASKED: "value",
  UNMASKED: "unmaskedValue",
  TYPED: "typedValue"
};
function ze(n, e, t) {
  e === void 0 && (e = Me.MASKED), t === void 0 && (t = Me.MASKED);
  const s = K(n);
  return (i) => s.runIsolated((a) => (a[e] = i, a[t]));
}
function Mt(n, e, t, s) {
  return ze(e, t, s)(n);
}
v.PIPE_TYPE = Me;
v.createPipe = ze;
v.pipe = Mt;
class Vt extends O {
  get repeatFrom() {
    var e;
    return (e = Array.isArray(this.repeat) ? this.repeat[0] : this.repeat === 1 / 0 ? 0 : this.repeat) != null ? e : 0;
  }
  get repeatTo() {
    var e;
    return (e = Array.isArray(this.repeat) ? this.repeat[1] : this.repeat) != null ? e : 1 / 0;
  }
  constructor(e) {
    super(e);
  }
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    var t, s, i;
    const {
      repeat: a,
      ...r
    } = de(e);
    this._blockOpts = Object.assign({}, this._blockOpts, r);
    const u = K(this._blockOpts);
    this.repeat = (t = (s = a ?? u.repeat) != null ? s : this.repeat) != null ? t : 1 / 0, super._update({
      mask: "m".repeat(Math.max(this.repeatTo === 1 / 0 && ((i = this._blocks) == null ? void 0 : i.length) || 0, this.repeatFrom)),
      blocks: {
        m: u
      },
      eager: u.eager,
      overwrite: u.overwrite,
      skipInvalid: u.skipInvalid,
      lazy: u.lazy,
      placeholderChar: u.placeholderChar,
      displayChar: u.displayChar
    });
  }
  _allocateBlock(e) {
    if (e < this._blocks.length) return this._blocks[e];
    if (this.repeatTo === 1 / 0 || this._blocks.length < this.repeatTo)
      return this._blocks.push(K(this._blockOpts)), this.mask += "m", this._blocks[this._blocks.length - 1];
  }
  _appendCharRaw(e, t) {
    t === void 0 && (t = {});
    const s = new y();
    for (
      let l = (i = (a = this._mapPosToBlock(this.displayValue.length)) == null ? void 0 : a.index) != null ? i : Math.max(this._blocks.length - 1, 0), o, p;
      // try to get a block or
      // try to allocate a new block if not allocated already
      o = (r = this._blocks[l]) != null ? r : p = !p && this._allocateBlock(l);
      ++l
    ) {
      var i, a, r, u;
      const k = o._appendChar(e, {
        ...t,
        _beforeTailState: (u = t._beforeTailState) == null || (u = u._blocks) == null ? void 0 : u[l]
      });
      if (k.skip && p) {
        this._blocks.pop(), this.mask = this.mask.slice(1);
        break;
      }
      if (s.aggregate(k), k.consumed) break;
    }
    return s;
  }
  _trimEmptyTail(e, t) {
    var s, i;
    e === void 0 && (e = 0);
    const a = Math.max(((s = this._mapPosToBlock(e)) == null ? void 0 : s.index) || 0, this.repeatFrom, 0);
    let r;
    t != null && (r = (i = this._mapPosToBlock(t)) == null ? void 0 : i.index), r == null && (r = this._blocks.length - 1);
    let u = 0;
    for (let l = r; a <= l && !this._blocks[l].unmaskedValue; --l, ++u)
      ;
    u && (this._blocks.splice(r - u + 1, u), this.mask = this.mask.slice(u));
  }
  reset() {
    super.reset(), this._trimEmptyTail();
  }
  remove(e, t) {
    e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length);
    const s = super.remove(e, t);
    return this._trimEmptyTail(e, t), s;
  }
  totalInputPositions(e, t) {
    return e === void 0 && (e = 0), t == null && this.repeatTo === 1 / 0 ? 1 / 0 : super.totalInputPositions(e, t);
  }
  get state() {
    return super.state;
  }
  set state(e) {
    this._blocks.length = e._blocks.length, this.mask = this.mask.slice(0, this._blocks.length), super.state = e;
  }
}
v.RepeatBlock = Vt;
try {
  globalThis.IMask = v;
} catch {
}
var Dt = {
  // common
  mask: void 0,
  prepare: Function,
  prepareChar: Function,
  validate: Function,
  commit: Function,
  overwrite: {
    type: Boolean,
    required: !1,
    default: void 0
  },
  eager: {
    required: !1,
    default: void 0,
    validator: (n) => ["append", "remove"].includes(n) || typeof n == "boolean"
  },
  skipInvalid: {
    type: Boolean,
    required: !1,
    default: void 0
  },
  // pattern
  placeholderChar: String,
  displayChar: String,
  lazy: {
    type: Boolean,
    required: !1,
    default: void 0
  },
  definitions: Object,
  blocks: Object,
  // enum
  enum: Array,
  // range
  maxLength: Number,
  from: Number,
  to: Number,
  // date
  pattern: String,
  format: Function,
  parse: Function,
  autofix: {
    required: !1,
    default: void 0,
    validator: (n) => n === "pad" || typeof n == "boolean"
  },
  // number
  radix: String,
  thousandsSeparator: String,
  mapToRadix: Array,
  scale: Number,
  normalizeZeros: {
    type: Boolean,
    required: !1,
    default: void 0
  },
  padFractionalZeros: {
    type: Boolean,
    required: !1,
    default: void 0
  },
  min: [Number, Date],
  max: [Number, Date],
  // dynamic
  dispatch: Function
};
function wt(n, e) {
  let {
    emit: t,
    onAccept: s,
    onComplete: i,
    defaultValue: a,
    defaultUnmaskedValue: r,
    defaultTypedValue: u
  } = e === void 0 ? {} : e;
  const l = Ke(n) ? n : H(n), o = H(), p = H(), k = H(""), b = H(""), _ = H();
  let F, R = k.value, V = b.value, D = _.value;
  function ce() {
    D = _.value = p.value.typedValue, V = b.value = p.value.unmaskedValue, R = k.value = p.value.value;
  }
  function G(A) {
    ce(), t && (t("accept", k.value, A), t("accept:masked", k.value, A), t("accept:typed", _.value, A), t("accept:unmasked", b.value, A)), s == null || s(A);
  }
  function be(A) {
    t && (t("complete", p.value.value, A), t("complete:masked", p.value.value, A), t("complete:typed", p.value.typedValue, A), t("complete:unmasked", p.value.unmaskedValue, A)), i == null || i(A);
  }
  const Z = () => {
    !p.value || b.value === void 0 || (V !== b.value && (p.value.unmaskedValue = b.value, p.value.unmaskedValue !== b.value && G()), V = void 0);
  };
  P(b, Z);
  const Y = () => {
    !p.value || k.value === void 0 || (R !== k.value && (p.value.value = k.value, p.value.value !== k.value && G()), R = void 0);
  };
  P(k, Y);
  const le = () => {
    !p.value || _.value === void 0 || (D !== _.value && (p.value.typedValue = _.value, p.value.masked.typedValueEquals(_.value) || G()), D = void 0);
  };
  P(_, le);
  function ae() {
    F = o.value;
    const A = l.value;
    !F || !(A != null && A.mask) || (p.value = v(F, A), a !== void 0 && (k.value = a), r !== void 0 && (b.value = r), u !== void 0 && (_.value = u), Z(), Y(), le(), ce(), p.value.on("accept", G).on("complete", be));
  }
  function X() {
    var A;
    (A = p.value) == null || A.destroy(), p.value = void 0;
  }
  return $e(ae), Ge(X), P([o, l], () => {
    const A = o.value, S = l.value;
    (!(S != null && S.mask) || A !== F) && X(), A && (p.value ? p.value.updateOptions(S) : ae());
  }), {
    el: o,
    mask: Ze(p),
    masked: k,
    unmasked: b,
    typed: _
  };
}
function It(n, e) {
  return n = {
    ...n
  }, Object.keys(n).forEach((t) => {
    (n[t] === void 0 || e.includes(t)) && delete n[t];
  }), n;
}
const Tt = ["typed", "unmasked", "value", "modelValue"];
var Ot = We({
  name: "imask-input",
  inheritAttrs: !1,
  props: {
    // plugin
    modelValue: String,
    value: String,
    unmasked: String,
    typed: {
      validator: () => !0
    },
    ...Dt
  },
  emits: ["update:modelValue", "update:masked", "update:value", "update:unmasked", "update:typed", "accept", "accept:value", "accept:masked", "accept:unmasked", "accept:typed", "complete", "complete:value", "complete:masked", "complete:unmasked", "complete:typed"],
  setup(n, e) {
    let {
      attrs: t,
      emit: s
    } = e;
    const {
      el: i,
      mask: a,
      masked: r,
      unmasked: u,
      typed: l
    } = wt(It(n, Tt), {
      emit: s,
      onAccept: (_) => {
        const F = r.value;
        s("accept:value", F, _), s("update:value", F, _), s("update:masked", F, _), s("update:modelValue", F, _), s("update:unmasked", u.value, _), s("update:typed", l.value, _);
      },
      onComplete: (_) => {
        s("complete:value", r.value, _);
      }
    }), o = me(n, "value"), p = me(n, "modelValue"), k = me(n, "unmasked"), b = me(n, "typed");
    return r.value = p.value || o.value || "", u.value = k.value || "", l.value = b.value, P(o, (_) => r.value = _), P(p, (_) => r.value = _), P(k, (_) => u.value = _), P(b, (_) => l.value = _), () => {
      const _ = {
        ...t,
        value: n.value != null ? n.value : n.modelValue != null ? n.modelValue : a.value ? a.value.displayValue : "",
        ref: i
      };
      return n.mask || (_.onInput = (F) => {
        s("update:modelValue", F.target.value), s("update:value", F.target.value);
      }), Je("input", _);
    };
  }
}), Rt = Ot;
const Lt = {}, $t = {
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
function Nt(n, e) {
  return I(), L("svg", $t, e[0] || (e[0] = [
    ue("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L8.58579 10L6.29289 12.2929C5.90237 12.6834 5.90237 13.3166 6.29289 13.7071C6.68342 14.0976 7.31658 14.0976 7.70711 13.7071L10 11.4142L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L11.4142 10L13.7071 7.70711C14.0976 7.31658 14.0976 6.68342 13.7071 6.29289C13.3166 5.90237 12.6834 5.90237 12.2929 6.29289L10 8.58579L7.70711 6.29289Z",
      fill: "currentColor"
    }, null, -1)
  ]));
}
const Ut = /* @__PURE__ */ ne(Lt, [["render", Nt]]), Ht = {
  name: "IInput",
  components: {
    IcTimesCircle: Ut,
    "imask-input": Rt
  },
  props: {
    modelValue: {
      type: [String, Number, Date, Object],
      default: void 0
    },
    inputId: {
      type: String,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    label: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    placeholder: {
      type: String,
      default: ""
    },
    placeholderValue: {
      type: String,
      default: ""
    },
    autoComplete: {
      type: String,
      default: "off"
    },
    currency: {
      type: Boolean,
      default: !1
    },
    readOnly: Boolean,
    invalid: Boolean,
    errorMessage: {
      type: String,
      default: ""
    },
    dark: Boolean,
    borderless: Boolean,
    dateLocale: {
      type: String,
      default: "en"
    },
    dateFormat: {
      type: String,
      default: "dddd, D MMM, YYYY"
      // format follow dayjs
    },
    mask: {
      type: String,
      default: void 0,
      validator(n) {
        return ["number", "decimal", "npwp"].includes(n);
      }
    },
    maskOptions: {
      type: Object,
      default: () => null
    },
    size: {
      type: String,
      default: "base",
      validator(n) {
        return ["sm", "base"].includes(n);
      }
    },
    maxlength: {
      type: Number,
      default: null
    },
    clearable: Boolean
  },
  emits: [
    "update:modelValue",
    "clear",
    "change",
    "blur",
    "focus",
    "keyup"
  ],
  setup(n, { slots: e, emit: t }) {
    const s = H(), i = j(() => n.modelValue != null && n.modelValue !== ""), a = j(() => ({
      dark: n.dark,
      disabled: n.disabled,
      readonly: n.readOnly,
      invalid: n.invalid || !!n.errorMessage,
      prepend: !!e.prepend,
      append: !!e.append || n.clearable,
      filled: n.filled,
      borderless: n.borderless,
      sm: n.size === "sm"
    })), r = j(() => n.filled || !!n.placeholder || !!n.placeholderValue), u = j(() => n.modelValue && n.modelValue instanceof Date ? _t(n.modelValue).locale(n.dateLocale).format(n.dateFormat) : typeof n.modelValue == "number" ? Object.is(n.modelValue, -0) ? "-0" : n.modelValue.toLocaleString("id-ID") : n.modelValue || ""), l = j(() => {
      switch (n.mask) {
        case "number":
          return {
            mask: Number,
            thousandsSeparator: ".",
            radix: ",",
            mapToRadix: ["."],
            scale: 0,
            unmask: !0,
            lazy: !0,
            ...n.maskOptions
          };
        case "decimal":
          return {
            mask: Number,
            thousandsSeparator: ".",
            radix: ",",
            mapToRadix: ["."],
            scale: 2,
            unmask: !0,
            lazy: !0,
            ...n.maskOptions
          };
        case "npwp":
          return {
            mask: "00.000.000.0-000-000",
            lazy: !0,
            ...n.maskOptions
          };
        default:
          return n.maskOptions;
      }
    }), o = j(() => ({
      input: !0,
      "placeholder-value": n.placeholderValue
    })), p = j(() => n.mask ? "imask-input" : "input"), k = (D) => {
      n.mask || t("update:modelValue", D.target.value);
    }, b = () => {
      t("change", n.modelValue);
    }, _ = () => {
      t("focus");
    }, F = () => {
      t("blur");
    }, R = () => {
      let D;
      typeof n.modelValue == "string" && (D = ""), t("update:modelValue", D), t("clear");
    }, V = (D) => {
      t("update:modelValue", D ? Number(D) : void 0);
    };
    return P(
      () => u,
      (D) => {
        s.value && !n.mask && (s.value.value = D ?? "");
      },
      {
        immediate: !0
      }
    ), {
      filled: i,
      classes: a,
      isLabelActive: r,
      displayModelValue: u,
      maskAttributes: l,
      inputClasses: o,
      inputComponent: p,
      inputRef: s,
      onInput: k,
      onChange: b,
      onFocus: _,
      onBlur: F,
      onClear: R,
      onAcceptUnmasked: V
    };
  }
}, Yt = { class: "i-input" }, jt = {
  key: 0,
  class: "prepend-container"
}, Pt = {
  key: 1,
  class: "append-container"
}, qt = {
  key: 2,
  class: "append-container"
}, zt = {
  key: 0,
  class: "i-input-error"
};
function Kt(n, e, t, s, i, a) {
  const r = xe("ic-times-circle");
  return I(), L("div", Yt, [
    ue("div", {
      class: Ve(["i-input-container", s.classes])
    }, [
      n.$slots.prepend ? (I(), L("div", jt, [
        ie(n.$slots, "prepend")
      ])) : te("", !0),
      (I(), Xe(et(s.inputComponent), tt(s.maskAttributes, {
        id: t.inputId,
        ref: "inputRef",
        name: t.name,
        value: s.displayModelValue,
        type: t.type,
        placeholder: t.placeholder || t.placeholderValue,
        disabled: t.disabled,
        readonly: t.readOnly,
        autocomplete: t.autoComplete,
        maxlength: t.maxlength,
        class: s.inputClasses,
        onInput: s.onInput,
        onKeyup: e[0] || (e[0] = (u) => n.$emit("keyup", u)),
        onChange: s.onChange,
        onFocus: s.onFocus,
        onBlur: s.onBlur,
        "onAccept:unmasked": s.onAcceptUnmasked
      }), null, 16, ["id", "name", "value", "type", "placeholder", "disabled", "readonly", "autocomplete", "maxlength", "class", "onInput", "onChange", "onFocus", "onBlur", "onAccept:unmasked"])),
      t.clearable && (!t.disabled || !t.readOnly) ? Qe((I(), L("div", Pt, [
        Be(r, {
          class: "icon-clear",
          onClickOnce: s.onClear
        }, null, 8, ["onClickOnce"])
      ], 512)), [
        [st, s.filled]
      ]) : te("", !0),
      n.$slots.append ? (I(), L("div", qt, [
        ie(n.$slots, "append")
      ])) : te("", !0)
    ], 2),
    t.errorMessage ? (I(), L("div", zt, Ne(t.errorMessage), 1)) : te("", !0)
  ]);
}
const ps = /* @__PURE__ */ ne(Ht, [["render", Kt]]), Gt = {}, Zt = {
  width: "9",
  height: "14",
  viewBox: "0 0 9 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
function Wt(n, e) {
  return I(), L("svg", Zt, e[0] || (e[0] = [
    ue("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M7.95711 13.2071C7.56658 13.5976 6.93342 13.5976 6.54289 13.2071L1.04289 7.70711C0.65237 7.31658 0.65237 6.68342 1.04289 6.29289L6.54289 0.792894C6.93342 0.402369 7.56658 0.402369 7.95711 0.792894C8.34763 1.18342 8.34763 1.81658 7.95711 2.20711L3.16421 7L7.95711 11.7929C8.34763 12.1834 8.34763 12.8166 7.95711 13.2071Z",
      fill: "currentColor"
    }, null, -1)
  ]));
}
const Jt = /* @__PURE__ */ ne(Gt, [["render", Wt]]), Xt = {}, Qt = {
  width: "8",
  height: "14",
  viewBox: "0 0 8 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
function es(n, e) {
  return I(), L("svg", Qt, e[0] || (e[0] = [
    ue("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M0.792893 0.792893C1.18342 0.402369 1.81658 0.402369 2.20711 0.792893L7.70711 6.29289C8.09763 6.68342 8.09763 7.31658 7.70711 7.70711L2.20711 13.2071C1.81658 13.5976 1.18342 13.5976 0.792893 13.2071C0.402369 12.8166 0.402369 12.1834 0.792893 11.7929L5.58579 7L0.792893 2.20711C0.402369 1.81658 0.402369 1.18342 0.792893 0.792893Z",
      fill: "currentColor"
    }, null, -1)
  ]));
}
const ts = /* @__PURE__ */ ne(Xt, [["render", es]]), ss = {
  name: "ITabs",
  props: {
    modelValue: {
      type: String,
      default: void 0
    }
  },
  components: {
    IcChevronLeft: Jt,
    IcChevronRight: ts
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = H(n.modelValue), s = H([]), i = H(0), a = H(0), r = at("tabHeaderWrapper");
    rt("rootTab", t);
    const u = j(() => i.value < a.value), l = j(() => i.value > 0);
    P(() => n.modelValue, (F) => {
      F !== t.value && (t.value = F);
    }), ut(() => {
      r.value && (i.value = r.value.scrollLeft, r.value.addEventListener("scroll", p));
    }), lt(() => {
      const F = r.value ? r.value.scrollWidth : 0, R = r.value ? r.value.clientWidth : 0;
      a.value = F - R;
    });
    const o = () => {
      const R = ot().default().filter((V) => V.type.name && V.type.name === "ITabPane").map((V) => V.props);
      s.value = R;
    }, p = (F) => {
      i.value = F.target.scrollLeft;
    }, k = () => {
      r.value.scrollLeft -= 75;
    }, b = () => {
      r.value.scrollLeft += 75;
    }, _ = (F) => {
      F.disabled || (t.value = F.name, e("update:modelValue", F.name));
    };
    return $e(() => {
      o();
    }), {
      activeTab: t,
      panes: s,
      isNavLeftVisible: l,
      isNavRightVisible: u,
      clickLeft: k,
      clickRight: b,
      changeActiveTab: _
    };
  }
}, is = { class: "i-tabs" }, ns = {
  ref: "tabHeader",
  class: "i-tabs-header"
}, as = {
  ref: "tabHeaderWrapper",
  class: "i-tabs-header-wrapper"
}, rs = ["onClick"];
function us(n, e, t, s, i, a) {
  const r = xe("ic-chevron-left"), u = xe("ic-chevron-right");
  return I(), L("div", is, [
    ue("div", ns, [
      ue("div", as, [
        (I(!0), L(it, null, nt(s.panes, (l, o) => (I(), L("div", {
          key: `i-tab-${o}`,
          class: Ve(["i-tabs-header-item", {
            active: l.name === s.activeTab,
            disabled: l.disabled
          }]),
          onClick: Le((p) => s.changeActiveTab(l), ["stop"])
        }, Ne(l.label), 11, rs))), 128))
      ], 512),
      s.isNavLeftVisible ? (I(), L("div", {
        key: 0,
        class: "i-tabs-header-nav-left",
        onClick: e[0] || (e[0] = (...l) => s.clickLeft && s.clickLeft(...l))
      }, [
        Be(r)
      ])) : te("", !0),
      s.isNavRightVisible ? (I(), L("div", {
        key: 1,
        class: "i-tabs-header-nav-right",
        onClick: e[1] || (e[1] = (...l) => s.clickRight && s.clickRight(...l))
      }, [
        Be(u)
      ])) : te("", !0)
    ], 512),
    ie(n.$slots, "default")
  ]);
}
const fs = /* @__PURE__ */ ne(ss, [["render", us]]), ls = {
  name: "ITabPane",
  props: {
    label: {
      type: String,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  setup(n) {
    const e = ht("rootTab"), t = j(() => e.value === n.name);
    return {
      tab: e,
      isActive: t
    };
  }
}, os = { class: "i-tab-pane" };
function hs(n, e, t, s, i, a) {
  return I(), L("div", os, [
    s.isActive ? ie(n.$slots, "default", { key: 0 }) : te("", !0)
  ]);
}
const ms = /* @__PURE__ */ ne(ls, [["render", hs]]);
export {
  cs as IButton,
  ps as IInput,
  ms as ITabPane,
  fs as ITabs
};
