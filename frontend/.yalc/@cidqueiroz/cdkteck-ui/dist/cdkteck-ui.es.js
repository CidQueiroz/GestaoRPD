import $e, { useState as P, useEffect as V, createContext as Ke, useContext as We, forwardRef as Be, createElement as ue } from "react";
import { createPortal as _a } from "react-dom";
import { Link as Ta } from "react-router-dom";
var Z = { exports: {} }, B = {};
var ze;
function Ra() {
  if (ze) return B;
  ze = 1;
  var o = $e, s = Symbol.for("react.element"), n = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, d = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, c = { key: !0, ref: !0, __self: !0, __source: !0 };
  function u(j, g, b) {
    var f, w = {}, S = null, O = null;
    b !== void 0 && (S = "" + b), g.key !== void 0 && (S = "" + g.key), g.ref !== void 0 && (O = g.ref);
    for (f in g) i.call(g, f) && !c.hasOwnProperty(f) && (w[f] = g[f]);
    if (j && j.defaultProps) for (f in g = j.defaultProps, g) w[f] === void 0 && (w[f] = g[f]);
    return { $$typeof: s, type: j, key: S, ref: O, props: w, _owner: d.current };
  }
  return B.Fragment = n, B.jsx = u, B.jsxs = u, B;
}
var U = {};
var Fe;
function Sa() {
  return Fe || (Fe = 1, process.env.NODE_ENV !== "production" && (function() {
    var o = $e, s = Symbol.for("react.element"), n = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), d = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), u = Symbol.for("react.provider"), j = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), b = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), O = Symbol.for("react.offscreen"), I = Symbol.iterator, A = "@@iterator";
    function v(a) {
      if (a === null || typeof a != "object")
        return null;
      var r = I && a[I] || a[A];
      return typeof r == "function" ? r : null;
    }
    var E = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function C(a) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), l = 1; l < r; l++)
          t[l - 1] = arguments[l];
        F("error", a, t);
      }
    }
    function F(a, r, t) {
      {
        var l = E.ReactDebugCurrentFrame, p = l.getStackAddendum();
        p !== "" && (r += "%s", t = t.concat([p]));
        var x = t.map(function(h) {
          return String(h);
        });
        x.unshift("Warning: " + r), Function.prototype.apply.call(console[a], console, x);
      }
    }
    var Q = !1, ee = !1, ae = !1, re = !1, k = !1, me;
    me = Symbol.for("react.module.reference");
    function Xe(a) {
      return !!(typeof a == "string" || typeof a == "function" || a === i || a === c || k || a === d || a === b || a === f || re || a === O || Q || ee || ae || typeof a == "object" && a !== null && (a.$$typeof === S || a.$$typeof === w || a.$$typeof === u || a.$$typeof === j || a.$$typeof === g || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      a.$$typeof === me || a.getModuleId !== void 0));
    }
    function Qe(a, r, t) {
      var l = a.displayName;
      if (l)
        return l;
      var p = r.displayName || r.name || "";
      return p !== "" ? t + "(" + p + ")" : t;
    }
    function he(a) {
      return a.displayName || "Context";
    }
    function D(a) {
      if (a == null)
        return null;
      if (typeof a.tag == "number" && C("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof a == "function")
        return a.displayName || a.name || null;
      if (typeof a == "string")
        return a;
      switch (a) {
        case i:
          return "Fragment";
        case n:
          return "Portal";
        case c:
          return "Profiler";
        case d:
          return "StrictMode";
        case b:
          return "Suspense";
        case f:
          return "SuspenseList";
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case j:
            var r = a;
            return he(r) + ".Consumer";
          case u:
            var t = a;
            return he(t._context) + ".Provider";
          case g:
            return Qe(a, a.render, "ForwardRef");
          case w:
            var l = a.displayName || null;
            return l !== null ? l : D(a.type) || "Memo";
          case S: {
            var p = a, x = p._payload, h = p._init;
            try {
              return D(h(x));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var M = Object.assign, K = 0, fe, pe, ge, ve, xe, je, be;
    function ye() {
    }
    ye.__reactDisabledLog = !0;
    function ea() {
      {
        if (K === 0) {
          fe = console.log, pe = console.info, ge = console.warn, ve = console.error, xe = console.group, je = console.groupCollapsed, be = console.groupEnd;
          var a = {
            configurable: !0,
            enumerable: !0,
            value: ye,
            writable: !0
          };
          Object.defineProperties(console, {
            info: a,
            log: a,
            warn: a,
            error: a,
            group: a,
            groupCollapsed: a,
            groupEnd: a
          });
        }
        K++;
      }
    }
    function aa() {
      {
        if (K--, K === 0) {
          var a = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: M({}, a, {
              value: fe
            }),
            info: M({}, a, {
              value: pe
            }),
            warn: M({}, a, {
              value: ge
            }),
            error: M({}, a, {
              value: ve
            }),
            group: M({}, a, {
              value: xe
            }),
            groupCollapsed: M({}, a, {
              value: je
            }),
            groupEnd: M({}, a, {
              value: be
            })
          });
        }
        K < 0 && C("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var se = E.ReactCurrentDispatcher, te;
    function Y(a, r, t) {
      {
        if (te === void 0)
          try {
            throw Error();
          } catch (p) {
            var l = p.stack.trim().match(/\n( *(at )?)/);
            te = l && l[1] || "";
          }
        return `
` + te + a;
      }
    }
    var oe = !1, H;
    {
      var ra = typeof WeakMap == "function" ? WeakMap : Map;
      H = new ra();
    }
    function Ce(a, r) {
      if (!a || oe)
        return "";
      {
        var t = H.get(a);
        if (t !== void 0)
          return t;
      }
      var l;
      oe = !0;
      var p = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var x;
      x = se.current, se.current = null, ea();
      try {
        if (r) {
          var h = function() {
            throw Error();
          };
          if (Object.defineProperty(h.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(h, []);
            } catch (T) {
              l = T;
            }
            Reflect.construct(a, [], h);
          } else {
            try {
              h.call();
            } catch (T) {
              l = T;
            }
            a.call(h.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (T) {
            l = T;
          }
          a();
        }
      } catch (T) {
        if (T && l && typeof T.stack == "string") {
          for (var m = T.stack.split(`
`), _ = l.stack.split(`
`), y = m.length - 1, N = _.length - 1; y >= 1 && N >= 0 && m[y] !== _[N]; )
            N--;
          for (; y >= 1 && N >= 0; y--, N--)
            if (m[y] !== _[N]) {
              if (y !== 1 || N !== 1)
                do
                  if (y--, N--, N < 0 || m[y] !== _[N]) {
                    var R = `
` + m[y].replace(" at new ", " at ");
                    return a.displayName && R.includes("<anonymous>") && (R = R.replace("<anonymous>", a.displayName)), typeof a == "function" && H.set(a, R), R;
                  }
                while (y >= 1 && N >= 0);
              break;
            }
        }
      } finally {
        oe = !1, se.current = x, aa(), Error.prepareStackTrace = p;
      }
      var q = a ? a.displayName || a.name : "", z = q ? Y(q) : "";
      return typeof a == "function" && H.set(a, z), z;
    }
    function sa(a, r, t) {
      return Ce(a, !1);
    }
    function ta(a) {
      var r = a.prototype;
      return !!(r && r.isReactComponent);
    }
    function G(a, r, t) {
      if (a == null)
        return "";
      if (typeof a == "function")
        return Ce(a, ta(a));
      if (typeof a == "string")
        return Y(a);
      switch (a) {
        case b:
          return Y("Suspense");
        case f:
          return Y("SuspenseList");
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case g:
            return sa(a.render);
          case w:
            return G(a.type, r, t);
          case S: {
            var l = a, p = l._payload, x = l._init;
            try {
              return G(x(p), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var W = Object.prototype.hasOwnProperty, Ne = {}, we = E.ReactDebugCurrentFrame;
    function J(a) {
      if (a) {
        var r = a._owner, t = G(a.type, a._source, r ? r.type : null);
        we.setExtraStackFrame(t);
      } else
        we.setExtraStackFrame(null);
    }
    function oa(a, r, t, l, p) {
      {
        var x = Function.call.bind(W);
        for (var h in a)
          if (x(a, h)) {
            var m = void 0;
            try {
              if (typeof a[h] != "function") {
                var _ = Error((l || "React class") + ": " + t + " type `" + h + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[h] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw _.name = "Invariant Violation", _;
              }
              m = a[h](r, h, l, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (y) {
              m = y;
            }
            m && !(m instanceof Error) && (J(p), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", l || "React class", t, h, typeof m), J(null)), m instanceof Error && !(m.message in Ne) && (Ne[m.message] = !0, J(p), C("Failed %s type: %s", t, m.message), J(null));
          }
      }
    }
    var na = Array.isArray;
    function ne(a) {
      return na(a);
    }
    function ia(a) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && a[Symbol.toStringTag] || a.constructor.name || "Object";
        return t;
      }
    }
    function la(a) {
      try {
        return Ee(a), !1;
      } catch {
        return !0;
      }
    }
    function Ee(a) {
      return "" + a;
    }
    function ke(a) {
      if (la(a))
        return C("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ia(a)), Ee(a);
    }
    var _e = E.ReactCurrentOwner, ca = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Te, Re;
    function da(a) {
      if (W.call(a, "ref")) {
        var r = Object.getOwnPropertyDescriptor(a, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return a.ref !== void 0;
    }
    function ua(a) {
      if (W.call(a, "key")) {
        var r = Object.getOwnPropertyDescriptor(a, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return a.key !== void 0;
    }
    function ma(a, r) {
      typeof a.ref == "string" && _e.current;
    }
    function ha(a, r) {
      {
        var t = function() {
          Te || (Te = !0, C("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(a, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function fa(a, r) {
      {
        var t = function() {
          Re || (Re = !0, C("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(a, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var pa = function(a, r, t, l, p, x, h) {
      var m = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: s,
        // Built-in properties that belong on the element
        type: a,
        key: r,
        ref: t,
        props: h,
        // Record the component responsible for creating this element.
        _owner: x
      };
      return m._store = {}, Object.defineProperty(m._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(m, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: l
      }), Object.defineProperty(m, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: p
      }), Object.freeze && (Object.freeze(m.props), Object.freeze(m)), m;
    };
    function ga(a, r, t, l, p) {
      {
        var x, h = {}, m = null, _ = null;
        t !== void 0 && (ke(t), m = "" + t), ua(r) && (ke(r.key), m = "" + r.key), da(r) && (_ = r.ref, ma(r, p));
        for (x in r)
          W.call(r, x) && !ca.hasOwnProperty(x) && (h[x] = r[x]);
        if (a && a.defaultProps) {
          var y = a.defaultProps;
          for (x in y)
            h[x] === void 0 && (h[x] = y[x]);
        }
        if (m || _) {
          var N = typeof a == "function" ? a.displayName || a.name || "Unknown" : a;
          m && ha(h, N), _ && fa(h, N);
        }
        return pa(a, m, _, p, l, _e.current, h);
      }
    }
    var ie = E.ReactCurrentOwner, Se = E.ReactDebugCurrentFrame;
    function L(a) {
      if (a) {
        var r = a._owner, t = G(a.type, a._source, r ? r.type : null);
        Se.setExtraStackFrame(t);
      } else
        Se.setExtraStackFrame(null);
    }
    var le;
    le = !1;
    function ce(a) {
      return typeof a == "object" && a !== null && a.$$typeof === s;
    }
    function Pe() {
      {
        if (ie.current) {
          var a = D(ie.current.type);
          if (a)
            return `

Check the render method of \`` + a + "`.";
        }
        return "";
      }
    }
    function va(a) {
      return "";
    }
    var Oe = {};
    function xa(a) {
      {
        var r = Pe();
        if (!r) {
          var t = typeof a == "string" ? a : a.displayName || a.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function De(a, r) {
      {
        if (!a._store || a._store.validated || a.key != null)
          return;
        a._store.validated = !0;
        var t = xa(r);
        if (Oe[t])
          return;
        Oe[t] = !0;
        var l = "";
        a && a._owner && a._owner !== ie.current && (l = " It was passed a child from " + D(a._owner.type) + "."), L(a), C('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, l), L(null);
      }
    }
    function Ie(a, r) {
      {
        if (typeof a != "object")
          return;
        if (ne(a))
          for (var t = 0; t < a.length; t++) {
            var l = a[t];
            ce(l) && De(l, r);
          }
        else if (ce(a))
          a._store && (a._store.validated = !0);
        else if (a) {
          var p = v(a);
          if (typeof p == "function" && p !== a.entries)
            for (var x = p.call(a), h; !(h = x.next()).done; )
              ce(h.value) && De(h.value, r);
        }
      }
    }
    function ja(a) {
      {
        var r = a.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === g || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === w))
          t = r.propTypes;
        else
          return;
        if (t) {
          var l = D(r);
          oa(t, a.props, "prop", l, a);
        } else if (r.PropTypes !== void 0 && !le) {
          le = !0;
          var p = D(r);
          C("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", p || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && C("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ba(a) {
      {
        for (var r = Object.keys(a.props), t = 0; t < r.length; t++) {
          var l = r[t];
          if (l !== "children" && l !== "key") {
            L(a), C("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", l), L(null);
            break;
          }
        }
        a.ref !== null && (L(a), C("Invalid attribute `ref` supplied to `React.Fragment`."), L(null));
      }
    }
    var Ae = {};
    function Me(a, r, t, l, p, x) {
      {
        var h = Xe(a);
        if (!h) {
          var m = "";
          (a === void 0 || typeof a == "object" && a !== null && Object.keys(a).length === 0) && (m += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var _ = va();
          _ ? m += _ : m += Pe();
          var y;
          a === null ? y = "null" : ne(a) ? y = "array" : a !== void 0 && a.$$typeof === s ? (y = "<" + (D(a.type) || "Unknown") + " />", m = " Did you accidentally export a JSX literal instead of a component?") : y = typeof a, C("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", y, m);
        }
        var N = ga(a, r, t, p, x);
        if (N == null)
          return N;
        if (h) {
          var R = r.children;
          if (R !== void 0)
            if (l)
              if (ne(R)) {
                for (var q = 0; q < R.length; q++)
                  Ie(R[q], a);
                Object.freeze && Object.freeze(R);
              } else
                C("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ie(R, a);
        }
        if (W.call(r, "key")) {
          var z = D(a), T = Object.keys(r).filter(function(ka) {
            return ka !== "key";
          }), de = T.length > 0 ? "{key: someKey, " + T.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ae[z + de]) {
            var Ea = T.length > 0 ? "{" + T.join(": ..., ") + ": ...}" : "{}";
            C(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, de, z, Ea, z), Ae[z + de] = !0;
          }
        }
        return a === i ? ba(N) : ja(N), N;
      }
    }
    function ya(a, r, t) {
      return Me(a, r, t, !0);
    }
    function Ca(a, r, t) {
      return Me(a, r, t, !1);
    }
    var Na = Ca, wa = ya;
    U.Fragment = i, U.jsx = Na, U.jsxs = wa;
  })()), U;
}
var Le;
function Pa() {
  return Le || (Le = 1, process.env.NODE_ENV === "production" ? Z.exports = Ra() : Z.exports = Sa()), Z.exports;
}
var e = Pa();
const Ue = ({
  isOpen: o,
  onClose: s,
  title: n,
  children: i,
  size: d = "md",
  id: c
}) => {
  const [u, j] = P(!1);
  V(() => {
    j(!0);
  }, []), V(() => {
    const f = (w) => {
      w.key === "Escape" && s();
    };
    return o && (window.addEventListener("keydown", f), document.body.style.overflow = "hidden"), () => {
      window.removeEventListener("keydown", f), document.body.style.overflow = "unset";
    };
  }, [o, s]);
  const g = { sm: "400px", md: "600px", lg: "800px", xl: "1100px" }[d], b = o ? /* @__PURE__ */ e.jsx("div", { id: c, className: "modal show", onClick: s, children: /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: "modal-content transition-in",
      style: { maxWidth: g },
      onClick: (f) => f.stopPropagation(),
      children: [
        /* @__PURE__ */ e.jsx("button", { className: "close-button", onClick: s, children: "×" }),
        n && /* @__PURE__ */ e.jsx("div", { className: "modal-header", children: /* @__PURE__ */ e.jsx("h2", { children: n }) }),
        /* @__PURE__ */ e.jsx("div", { className: "modal-body", children: i })
      ]
    }
  ) }) : null;
  return u ? _a(b, document.body) : null;
}, Ve = Ke(void 0), Qa = ({ children: o }) => {
  const [s, n] = P("dark");
  V(() => {
    const c = localStorage.getItem("theme") || "dark";
    n(c);
  }, []), V(() => {
    s && (document.body.setAttribute("data-theme", s), localStorage.setItem("theme", s));
  }, [s]);
  const i = () => {
    n((d) => d === "dark" ? "light" : "dark");
  };
  return /* @__PURE__ */ e.jsx(Ve.Provider, { value: { theme: s, toggleTheme: i }, children: o });
}, X = () => {
  const o = We(Ve);
  if (o === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return o;
}, Oa = [
  /*{ href: '/', text: 'Página Inicial', external: false, disabled: false },*/
  { href: "https://cdkteck.com.br", text: "CDK TECK (Home)", external: !0, disabled: !1 },
  { href: "#", text: "PapoDados", external: !1, disabled: !0 },
  { href: "#", text: "Caça-Preço", external: !1, disabled: !0 },
  { href: "https://sensei.cdkteck.com.br", text: "SenseiDB", external: !0, disabled: !1 },
  { href: "https://gestaorpd.cdkteck.com.br", text: "Gestão RPD", external: !0, disabled: !1 }
], Da = [
  { href: "/sobre", text: "Filosofia & Identidade", external: !1 },
  { href: "/pbi", text: "Portfólio de Dashboards", external: !1 },
  { href: "/portfolio", text: "Laboratório de Projetos", external: !1 },
  { href: "/certificados", text: "Certificados", external: !1 }
], er = ({
  LinkComponent: o,
  usePathname: s,
  theme: n,
  appName: i = "CDK TECK",
  logoHref: d = "/"
}) => {
  const c = X(), u = n || c.theme || "light", j = c.toggleTheme || (() => {
  }), b = o || (({ href: v, className: E, children: C, ...F }) => /* @__PURE__ */ e.jsx("a", { href: v, className: E, ...F, children: C }));
  let f = "/";
  if (s)
    f = s();
  else if (typeof window < "u")
    try {
      f = window.location.pathname;
    } catch {
      f = "/";
    }
  const w = Da.filter((v) => v.href !== f), S = Oa.filter((v) => v.href !== f), O = u === "dark" ? "theme-dark" : "theme-light", I = u === "dark" ? "☀️" : "🌙";
  return /* @__PURE__ */ e.jsxs("header", { className: `cabecalho ${O}`, children: [
    /* @__PURE__ */ e.jsxs(b, { href: d, className: "cabecalho-logo", children: [
      /* @__PURE__ */ e.jsx(
        "img",
        {
          id: "header-logo",
          src: "/assets/logo_header.png",
          alt: `Logo ${i}`,
          width: 60,
          height: 60
        }
      ),
      /* @__PURE__ */ e.jsx("span", { children: i })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "header-actions", children: [
      /* @__PURE__ */ e.jsx(
        "button",
        {
          onClick: j,
          className: "btn-theme theme-toggle-btn",
          "aria-label": "Mudar tema",
          title: `Alternar para tema ${u === "dark" ? "claro" : "escuro"}`,
          children: /* @__PURE__ */ e.jsx("span", { className: "theme-icon", children: I })
        }
      ),
      /* @__PURE__ */ e.jsxs("nav", { className: "main-nav", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "dropdown", children: [
          /* @__PURE__ */ e.jsx("button", { className: "dropdown-toggle", children: "Universo CDK TECK" }),
          /* @__PURE__ */ e.jsx("div", { className: "dropdown-menu", children: S.map((v) => v.disabled ? /* @__PURE__ */ e.jsx("span", { className: "disabled-link", title: "Em desenvolvimento", children: v.text }, v.text) : v.external || v.href.startsWith("http") ? /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: v.href,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "external-link",
              children: [
                v.text,
                " ↗"
              ]
            },
            v.href
          ) : v.href === "/" && f === "/" ? null : /* @__PURE__ */ e.jsx(b, { href: v.href, className: "internal-link", children: v.text }, v.href)) })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "dropdown", children: [
          /* @__PURE__ */ e.jsx("button", { className: "dropdown-toggle", children: "Sobre" }),
          /* @__PURE__ */ e.jsx("div", { className: "dropdown-menu", children: w.map((v) => /* @__PURE__ */ e.jsx(b, { href: v.href, children: v.text }, v.href)) })
        ] })
      ] })
    ] })
  ] });
}, ar = ({ openContactModal: o, LinkComponent: s }) => {
  const n = s || (({ href: i, className: d, children: c }) => /* @__PURE__ */ e.jsx("a", { href: i, className: d, children: c }));
  return /* @__PURE__ */ e.jsxs("footer", { className: "rodape", children: [
    /* @__PURE__ */ e.jsx("p", { className: "rodape_texto", children: "© 2025 CDK TECK. Todos os direitos reservados." }),
    /* @__PURE__ */ e.jsxs("div", { className: "rodape_links", children: [
      /* @__PURE__ */ e.jsx(n, { href: "/privacidade", className: "rodape_link", children: "Privacidade" }),
      /* @__PURE__ */ e.jsx(n, { href: "/termos", className: "rodape_link", children: "Termos" }),
      /* @__PURE__ */ e.jsx("button", { onClick: o, className: "rodape_link", children: "Contato" })
    ] })
  ] });
};
function Ye({ title: o, description: s }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "page-header", children: [
    /* @__PURE__ */ e.jsx("div", { className: "mascot-light", children: /* @__PURE__ */ e.jsx(
      "img",
      {
        src: "/assets/ia.png",
        alt: "Mascote Lourdes Tech",
        width: 180,
        height: 180,
        className: "mascot-img"
      }
    ) }),
    /* @__PURE__ */ e.jsx("div", { className: "mascot-dark", children: /* @__PURE__ */ e.jsx(
      "img",
      {
        src: "/assets/logo.png",
        alt: "Logo CDK TECK",
        width: 180,
        height: 180,
        className: "mascot-img"
      }
    ) }),
    /* @__PURE__ */ e.jsxs("div", { className: "header-text", children: [
      /* @__PURE__ */ e.jsx("h1", { className: "titulo", children: o }),
      /* @__PURE__ */ e.jsx("p", { className: "subtitulo", children: s })
    ] })
  ] });
}
const rr = ({ title: o, imageUrl: s, onClick: n }) => /* @__PURE__ */ e.jsx("div", { className: "card project-card", onClick: n, children: /* @__PURE__ */ e.jsxs("div", { className: "card-content", children: [
  /* @__PURE__ */ e.jsx(
    "img",
    {
      src: s,
      alt: `Imagem do certificado ${o}`,
      width: 400,
      height: 280,
      style: { objectFit: "cover", borderRadius: "15px" },
      onError: (i) => {
        const d = i.target;
        d.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjM0Q0ODU1IiAvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjRkZGIiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0iQXJpYWwiPkltYWdlbSBOb3QgRm91bmQ8L3RleHQ+Cjwvc3ZnPg==", d.alt = "Placeholder para o certificado";
      }
    }
  ),
  /* @__PURE__ */ e.jsx("div", { className: "project-info", children: /* @__PURE__ */ e.jsx("h3", { style: { marginTop: "15px", fontSize: "1rem" }, children: o }) })
] }) }), Ia = [
  { name: "LinkedIn", icon: "fab fa-linkedin", url: "https://www.linkedin.com/in/ciddy-queiroz/" },
  { name: "GitHub", icon: "fab fa-github", url: "https://github.com/CidQueiroz" },
  { name: "WhatsApp", icon: "fab fa-whatsapp", url: "https://api.whatsapp.com/send?phone=5521971583118" },
  { name: "Instagram", icon: "fab fa-instagram", url: "https://www.instagram.com/ciddyqueiroz/" },
  { name: "Facebook", icon: "fab fa-facebook", url: "https://www.facebook.com/cyrd.queiroz/" },
  { name: "Currículo", icon: "fas fa-download", url: "/assets/curriculo.pdf", download: !0 }
], sr = ({ isOpen: o, onClose: s }) => o ? /* @__PURE__ */ e.jsx("div", { id: "contact-modal", className: "modal show", onClick: s, children: /* @__PURE__ */ e.jsxs("div", { className: "modal-content contact-modal-content", onClick: (n) => n.stopPropagation(), children: [
  /* @__PURE__ */ e.jsx("span", { className: "close-button", onClick: s, children: "×" }),
  /* @__PURE__ */ e.jsx(
    "img",
    {
      src: "/assets/foto.jpg",
      alt: "Cidirclay Queiroz",
      title: "Cid Queiroz",
      className: "profile-pic",
      width: 120,
      height: 120
    }
  ),
  /* @__PURE__ */ e.jsx("h2", { id: "contact-title", children: "Cidirclay Queiroz" }),
  /* @__PURE__ */ e.jsx("p", { id: "contact-description", children: "Olá! 👋 Sou Cidirclay Queiroz, Arquiteto de Soluções Cloud em formação e Cientista de Dados OCI Certified. Minha especialidade não é apenas programar em Python/Django/React, mas sim transformar desafios de negócio em soluções de infraestrutura e automação. Sou um profissional unicórnio que une a competência técnica (CI/CD, Cloud) à visão estratégica para entregar projetos de alto desempenho e estabilidade. Se você precisa de lógica e resultados, vamos conversar." }),
  /* @__PURE__ */ e.jsx("div", { className: "social-links", children: Ia.map((n) => /* @__PURE__ */ e.jsxs("a", { href: n.url, target: "_blank", rel: "noopener noreferrer", className: "social-link-item", children: [
    /* @__PURE__ */ e.jsx("i", { className: n.icon }),
    /* @__PURE__ */ e.jsx("span", { children: n.name })
  ] }, n.name)) }),
  /* @__PURE__ */ e.jsx("button", { className: "close-modal", onClick: s, children: "Fechar" })
] }) }) : null, tr = ({ isOpen: o, onClose: s }) => /* @__PURE__ */ e.jsxs(Ue, { isOpen: o, onClose: s, id: "marca-filosofia-modal", children: [
  /* @__PURE__ */ e.jsx("h2", { className: "filosofia-title", children: "O DNA da CDK TECK" }),
  /* @__PURE__ */ e.jsxs("p", { className: "filosofia-narrative", children: [
    "CDK TECK é a união da ",
    /* @__PURE__ */ e.jsx("strong", { children: "Engenharia de IA" }),
    " (a Lógica) com a ",
    /* @__PURE__ */ e.jsx("strong", { children: "Criatividade Humana" }),
    " (o Unicórnio). É onde a arquitetura precisa encontra o propósito, e o circuito encontra o coração."
  ] }),
  /* @__PURE__ */ e.jsxs("div", { className: "filosofia-ratings", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "rating-item", children: [
      /* @__PURE__ */ e.jsx("span", { children: "Hierarquia de layout" }),
      /* @__PURE__ */ e.jsx("span", { className: "rating-score", children: "⭐ 8.5 / 10" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "rating-item", children: [
      /* @__PURE__ */ e.jsx("span", { children: "UX e Legibilidade" }),
      /* @__PURE__ */ e.jsx("span", { className: "rating-score", children: "⭐ 8.5 / 10" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "rating-item", children: [
      /* @__PURE__ */ e.jsx("span", { children: "Coerência entre temas" }),
      /* @__PURE__ */ e.jsx("span", { className: "rating-score", children: "⭐ 9 / 10" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "rating-item", children: [
      /* @__PURE__ */ e.jsx("span", { children: "Estilo Visual" }),
      /* @__PURE__ */ e.jsx("span", { className: "rating-score", children: "⭐ 9 / 10" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "rating-item", children: [
      /* @__PURE__ */ e.jsx("span", { children: "Identidade visual" }),
      /* @__PURE__ */ e.jsx("span", { className: "rating-score", children: "⭐ 9.5 / 10" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "rating-item", children: [
      /* @__PURE__ */ e.jsx("span", { children: "Potencial de Marca" }),
      /* @__PURE__ */ e.jsx("span", { className: "rating-score", children: "⭐ 10 / 10" })
    ] })
  ] }),
  /* @__PURE__ */ e.jsx("blockquote", { className: "filosofia-quote", children: '"Onde a Lógica encontra o seu Unicórnio."' }),
  /* @__PURE__ */ e.jsx("p", { id: "app-version" })
] }), or = ({
  onLogin: o,
  onRegister: s,
  onGoogleLogin: n,
  onFacebookLogin: i,
  onLinkedInLogin: d,
  recoveryPath: c = "/recuperar-senha",
  imageSrc: u,
  title: j = "Bem-vindo ao",
  appName: g = "CDKTECK",
  isLoading: b = !1,
  error: f = null
}) => {
  const { theme: w } = X(), S = w === "light" ? "/assets/ia.png" : "/assets/logo.png", [O, I] = P("login"), [A, v] = P(""), [E, C] = P(""), [F, Q] = P(""), ee = (k) => {
    k.preventDefault(), o({ email: A, password: E });
  }, ae = (k) => {
    if (k.preventDefault(), E !== F) {
      alert("As senhas não coincidem!");
      return;
    }
    s({ email: A, password: E });
  }, re = n || i || d;
  return /* @__PURE__ */ e.jsx("main", { className: "login-page-main bg-vitrine", children: /* @__PURE__ */ e.jsxs("div", { className: "login-page-container", children: [
    /* @__PURE__ */ e.jsx("div", { className: "login-page-header", children: /* @__PURE__ */ e.jsxs("h1", { children: [
      j,
      g && /* @__PURE__ */ e.jsxs("span", { className: "app-name-separator", children: [
        " ",
        /* @__PURE__ */ e.jsx("strong", { className: "app-name", children: g })
      ] })
    ] }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "login-content-row", children: [
      /* @__PURE__ */ e.jsx("section", { className: "login-page-image-section", children: /* @__PURE__ */ e.jsx(
        "img",
        {
          src: u || S,
          alt: "Visual motivacional"
        }
      ) }),
      /* @__PURE__ */ e.jsxs("section", { className: "login-page-form-section", children: [
        f && /* @__PURE__ */ e.jsx("p", { className: "login-error", style: { color: "var(--cor-perigo)", textAlign: "center", marginBottom: "10px" }, children: f }),
        O === "login" ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs("form", { onSubmit: ee, className: "login-page-form", children: [
            /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "email",
                value: A,
                onChange: (k) => v(k.target.value),
                placeholder: "Email",
                required: !0,
                className: "login-page-input"
              }
            ),
            /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "password",
                value: E,
                onChange: (k) => C(k.target.value),
                placeholder: "Senha",
                required: !0,
                className: "login-page-input"
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { textAlign: "right", marginBottom: "5px" }, children: /* @__PURE__ */ e.jsx(Ta, { to: c, className: "forgot-password-link", children: "Esqueceu a senha?" }) }),
            /* @__PURE__ */ e.jsx("button", { type: "submit", disabled: b, className: "login-page-button", children: b ? "Entrando..." : "Entrar" })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "toggle-mode-container", children: [
            /* @__PURE__ */ e.jsx("span", { children: "Não tem uma conta? " }),
            /* @__PURE__ */ e.jsx("button", { onClick: () => I("register"), className: "toggle-mode-btn", children: "Cadastrar" })
          ] })
        ] }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs("form", { onSubmit: ae, className: "login-page-form", children: [
            /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "email",
                value: A,
                onChange: (k) => v(k.target.value),
                placeholder: "Email",
                required: !0,
                className: "login-page-input"
              }
            ),
            /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "password",
                value: E,
                onChange: (k) => C(k.target.value),
                placeholder: "Senha",
                required: !0,
                className: "login-page-input"
              }
            ),
            /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "password",
                value: F,
                onChange: (k) => Q(k.target.value),
                placeholder: "Confirmar Senha",
                required: !0,
                className: "login-page-input"
              }
            ),
            /* @__PURE__ */ e.jsx("button", { type: "submit", disabled: b, className: "login-page-button", children: b ? "Criando conta..." : "Criar Conta" })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "toggle-mode-container", children: [
            /* @__PURE__ */ e.jsx("span", { children: "Já tem uma conta? " }),
            /* @__PURE__ */ e.jsx("button", { onClick: () => I("login"), className: "toggle-mode-btn", children: "Fazer Login" })
          ] })
        ] }),
        re && /* @__PURE__ */ e.jsxs("div", { className: "social-login-section", children: [
          /* @__PURE__ */ e.jsx("div", { className: "login-page-separator", children: "ou continue com" }),
          /* @__PURE__ */ e.jsxs("div", { className: "social-buttons-row", children: [
            n && /* @__PURE__ */ e.jsx("button", { onClick: n, className: "social-btn google", title: "Google", children: /* @__PURE__ */ e.jsxs("svg", { viewBox: "0 0 24 24", width: "24", height: "24", children: [
              /* @__PURE__ */ e.jsx("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
              /* @__PURE__ */ e.jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
              /* @__PURE__ */ e.jsx("path", { fill: "#FBBC05", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }),
              /* @__PURE__ */ e.jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" })
            ] }) }),
            i && /* @__PURE__ */ e.jsx("button", { onClick: i, className: "social-btn facebook", title: "Facebook", children: /* @__PURE__ */ e.jsx("svg", { viewBox: "0 0 24 24", width: "24", height: "24", fill: "#1877F2", children: /* @__PURE__ */ e.jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }) }) }),
            d && /* @__PURE__ */ e.jsx("button", { onClick: d, className: "social-btn linkedin", title: "LinkedIn", children: /* @__PURE__ */ e.jsx("svg", { viewBox: "0 0 24 24", width: "24", height: "24", fill: "#0A66C2", children: /* @__PURE__ */ e.jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) }) })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}, nr = () => /* @__PURE__ */ e.jsxs("div", { className: "bg-vitrine min-h-screen w-full flex flex-col", children: [
  /* @__PURE__ */ e.jsx(
    Ye,
    {
      title: "Política de Privacidade",
      description: "Soberania, transparência e segurança de dados em todo o ecossistema CDK TECK."
    }
  ),
  /* @__PURE__ */ e.jsx("div", { className: "legal-page-wrapper flex-grow", children: /* @__PURE__ */ e.jsx("div", { className: "legal-card", children: /* @__PURE__ */ e.jsxs("div", { className: "legal-content", children: [
    /* @__PURE__ */ e.jsx("p", { className: "legal-meta", children: "Última atualização: 30 de Dezembro de 2025" }),
    /* @__PURE__ */ e.jsx("h2", { children: "1. Compromisso com a Privacidade" }),
    /* @__PURE__ */ e.jsxs("p", { children: [
      "A ",
      /* @__PURE__ */ e.jsx("strong", { children: "CDK TECK" }),
      " assume o compromisso de proteger a privacidade e os dados pessoais de seus usuários, garantindo transparência e controle total, em conformidade com a LGPD (Lei Geral de Proteção de Dados). Este compromisso abrange todos os nossos produtos: ",
      /* @__PURE__ */ e.jsx("strong", { children: "PapoDados, Caça-Preço, GestãoRPD e SenseiDB" }),
      "."
    ] }),
    /* @__PURE__ */ e.jsx("h2", { children: "2. Dados Coletados" }),
    /* @__PURE__ */ e.jsx("div", { className: "legal-highlight-box", children: /* @__PURE__ */ e.jsxs("ul", { className: "legal-list", children: [
      /* @__PURE__ */ e.jsxs("li", { children: [
        /* @__PURE__ */ e.jsx("strong", { children: "Dados de Identificação:" }),
        " Nome, e-mail e telefone fornecidos voluntariamente no cadastro."
      ] }),
      /* @__PURE__ */ e.jsxs("li", { children: [
        /* @__PURE__ */ e.jsx("strong", { children: "Dados de Navegação:" }),
        " Endereço IP, tipo de dispositivo e métricas de uso para otimização da UX."
      ] }),
      /* @__PURE__ */ e.jsxs("li", { children: [
        /* @__PURE__ */ e.jsx("strong", { children: "Dados de Negócio (SaaS):" }),
        " Arquivos e planilhas processados no PapoDados são utilizados estritamente para a sessão de análise, não sendo compartilhados ou vendidos."
      ] })
    ] }) }),
    /* @__PURE__ */ e.jsx("h2", { children: "3. Segurança da Infraestrutura" }),
    /* @__PURE__ */ e.jsx("p", { children: "Utilizamos arquitetura de nuvem de nível corporativo (Oracle Cloud Infrastructure - OCI e Google Cloud Platform), com criptografia AES-256 em repouso e TLS 1.3 em trânsito. Nossos bancos de dados (Oracle Autonomous DB) possuem patches de segurança automatizados (Zero-Day Protection)." }),
    /* @__PURE__ */ e.jsx("h2", { children: "4. Compartilhamento" }),
    /* @__PURE__ */ e.jsx("p", { children: "Não vendemos dados pessoais. O compartilhamento ocorre apenas com provedores essenciais para a operação do serviço (ex: gateways de pagamento, hospedagem cloud) que aderem aos mesmos padrões rigorosos de segurança." }),
    /* @__PURE__ */ e.jsx("p", { className: "legal-footer", children: "© 2025 CDK TECK - Tecnologia para Inovação. Dúvidas? Contate nosso DPO." })
  ] }) }) })
] }), ir = () => /* @__PURE__ */ e.jsxs("div", { className: "bg-vitrine min-h-screen w-full flex flex-col", children: [
  /* @__PURE__ */ e.jsx(
    Ye,
    {
      title: "Termos de Uso",
      description: "Diretrizes, responsabilidades e licença de uso do ecossistema CDK TECK."
    }
  ),
  /* @__PURE__ */ e.jsx("div", { className: "legal-page-wrapper flex-grow", children: /* @__PURE__ */ e.jsx("div", { className: "legal-card", children: /* @__PURE__ */ e.jsxs("div", { className: "legal-content", children: [
    /* @__PURE__ */ e.jsx("p", { className: "legal-meta", children: "Última atualização: 30 de Dezembro de 2025" }),
    /* @__PURE__ */ e.jsx("h2", { children: "1. Aceitação dos Termos" }),
    /* @__PURE__ */ e.jsxs("p", { children: [
      "Ao acessar ou utilizar qualquer serviço da ",
      /* @__PURE__ */ e.jsx("strong", { children: "CDK TECK" }),
      " (incluindo SaaS e APIs), você concorda irrestritamente com estes Termos de Uso. Nossas ferramentas são destinadas ao aprimoramento profissional e eficiência empresarial."
    ] }),
    /* @__PURE__ */ e.jsx("h2", { children: "2. Propriedade Intelectual" }),
    /* @__PURE__ */ e.jsx("p", { children: "Todo o código-fonte, algoritmos de IA, interfaces, logotipos e metodologias (incluindo o framework RAG do SenseiDB e os scrapers do Caça-Preço) são propriedade intelectual exclusiva da CDK TECK. É proibida a engenharia reversa, cópia ou redistribuição não autorizada." }),
    /* @__PURE__ */ e.jsx("h2", { children: "3. Uso Aceitável e Responsabilidades" }),
    /* @__PURE__ */ e.jsxs("div", { className: "legal-highlight-box", children: [
      /* @__PURE__ */ e.jsx("p", { className: "mb-2 font-semibold", children: "O Usuário compromete-se a:" }),
      /* @__PURE__ */ e.jsxs("ul", { className: "legal-list", children: [
        /* @__PURE__ */ e.jsx("li", { children: "Utilizar as ferramentas de acordo com as leis vigentes no Brasil." }),
        /* @__PURE__ */ e.jsx("li", { children: "Não utilizar automações (bots) para sobrecarregar nossos servidores." }),
        /* @__PURE__ */ e.jsx("li", { children: "Manter o sigilo de suas credenciais de acesso." }),
        /* @__PURE__ */ e.jsx("li", { children: "Assumir total responsabilidade pelas decisões de negócio tomadas com base nos insights gerados pela plataforma." })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("h2", { children: "4. Disponibilidade (SLA)" }),
    /* @__PURE__ */ e.jsx("p", { children: "Esforçamo-nos para manter 99.9% de disponibilidade. No entanto, interrupções programadas para manutenção ou falhas em provedores de nuvem (OCI/GCP) podem ocorrer." }),
    /* @__PURE__ */ e.jsx("p", { className: "legal-footer", children: "© 2025 CDK TECK - Tecnologia para Inovação. Foro de eleição: São Paulo/SP." })
  ] }) }) })
] });
const Aa = (o) => o.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Ma = (o) => o.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (s, n, i) => i ? i.toUpperCase() : n.toLowerCase()
), qe = (o) => {
  const s = Ma(o);
  return s.charAt(0).toUpperCase() + s.slice(1);
}, He = (...o) => o.filter((s, n, i) => !!s && s.trim() !== "" && i.indexOf(s) === n).join(" ").trim(), za = (o) => {
  for (const s in o)
    if (s.startsWith("aria-") || s === "role" || s === "title")
      return !0;
};
var Fa = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const La = Be(
  ({
    color: o = "currentColor",
    size: s = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: i,
    className: d = "",
    children: c,
    iconNode: u,
    ...j
  }, g) => ue(
    "svg",
    {
      ref: g,
      ...Fa,
      width: s,
      height: s,
      stroke: o,
      strokeWidth: i ? Number(n) * 24 / Number(s) : n,
      className: He("lucide", d),
      ...!c && !za(j) && { "aria-hidden": "true" },
      ...j
    },
    [
      ...u.map(([b, f]) => ue(b, f)),
      ...Array.isArray(c) ? c : [c]
    ]
  )
);
const $ = (o, s) => {
  const n = Be(
    ({ className: i, ...d }, c) => ue(La, {
      ref: c,
      iconNode: s,
      className: He(
        `lucide-${Aa(qe(o))}`,
        `lucide-${o}`,
        i
      ),
      ...d
    })
  );
  return n.displayName = qe(o), n;
};
const qa = [
  ["path", { d: "M12 18V5", key: "adv99a" }],
  ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" }],
  ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" }],
  ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
  ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
  ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517", key: "1gq6am" }],
  ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
  ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }]
], Ge = $("brain", qa);
const $a = [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
], Je = $("cloud", $a);
const Ka = [
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M17 20v2", key: "1rnc9c" }],
  ["path", { d: "M17 2v2", key: "11trls" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M2 17h2", key: "7oei6x" }],
  ["path", { d: "M2 7h2", key: "asdhe0" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "M20 17h2", key: "1fpfkl" }],
  ["path", { d: "M20 7h2", key: "1o8tra" }],
  ["path", { d: "M7 20v2", key: "4gnj0m" }],
  ["path", { d: "M7 2v2", key: "1i4yhu" }],
  ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
], Wa = $("cpu", Ka);
const Ba = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
], Ua = $("palette", Ba);
const Va = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
], Ya = $("sparkles", Va);
const Ha = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
], Ga = $("terminal", Ha), lr = ({ className: o = "", isDark: s, onToggle: n }) => {
  const { theme: i, toggleTheme: d } = X(), c = s !== void 0 ? s : i === "dark", u = () => {
    n ? n() : d();
  };
  return /* @__PURE__ */ e.jsxs(
    "button",
    {
      onClick: u,
      className: `
        relative flex items-center justify-between w-20 h-10 rounded-full p-1 transition-all duration-500 border-2 shadow-lg
        ${c ? "bg-slate-900 border-cyan-500 shadow-[0_0_15px_rgba(0,174,239,0.3)]" : "bg-white border-purple-400 shadow-[0_0_15px_rgba(236,72,153,0.3)]"}
        ${o}
      `,
      "aria-label": c ? "Ativar Modo Criativo (Lourdes)" : "Ativar Modo Lógico (Engenharia)",
      title: c ? "Ativar Modo Criativo (Lourdes)" : "Ativar Modo Lógico (Engenharia)",
      children: [
        /* @__PURE__ */ e.jsx("span", { className: `z-10 ml-1.5 transition-opacity duration-300 ${c ? "opacity-100" : "opacity-40"}`, children: /* @__PURE__ */ e.jsx(Ge, { size: 16, className: c ? "text-cyan-400" : "text-slate-400" }) }),
        /* @__PURE__ */ e.jsx("span", { className: `z-10 mr-1.5 transition-opacity duration-300 ${c ? "opacity-40" : "opacity-100"}`, children: /* @__PURE__ */ e.jsx(Je, { size: 16, className: c ? "text-slate-400" : "text-pink-500" }) }),
        /* @__PURE__ */ e.jsx(
          "div",
          {
            className: `
          absolute w-7 h-7 rounded-full shadow-sm transform transition-transform duration-500 top-0.5 left-1
          ${c ? "translate-x-0 bg-gradient-to-br from-cyan-600 to-blue-900" : "translate-x-10 bg-gradient-to-br from-purple-400 to-pink-500"}
        `
          }
        )
      ]
    }
  );
}, cr = () => {
  const [o, s] = P(!1), { theme: n } = X(), i = () => s(!o), d = ({ type: c }) => {
    const u = c === "logic";
    return /* @__PURE__ */ e.jsxs("div", { className: `narrative-face ${c}`, children: [
      /* @__PURE__ */ e.jsxs("div", { className: "narrative-header", children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "1rem" }, children: [
          /* @__PURE__ */ e.jsx("div", { className: "narrative-icon-box", children: u ? /* @__PURE__ */ e.jsx(Wa, { size: 28 }) : /* @__PURE__ */ e.jsx(Ua, { size: 28 }) }),
          /* @__PURE__ */ e.jsxs("div", { children: [
            /* @__PURE__ */ e.jsx("div", { style: { fontSize: "0.65rem", fontWeight: 800, letterSpacing: "2px", color: "inherit", marginBottom: "2px", opacity: 0.8 }, children: u ? "CORE_PROCESSOR" : "CREATIVE_FLOW" }),
            /* @__PURE__ */ e.jsx("div", { style: { fontSize: "1.1rem", fontWeight: 900, fontFamily: "var(--fonte-primaria)" }, children: u ? "CID_TECK_v3.0" : "Lourdes Unicorn" })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx("button", { onClick: i, className: "narrative-switch-btn", children: u ? "Conhecer o lado criativo 🌗" : "Conhecer o lado racional 🌗" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "narrative-body", children: [
        /* @__PURE__ */ e.jsx("h2", { className: "narrative-title", children: u ? "A Mente que Estrutura o Futuro" : "O Coração que Humaniza a Tecnologia" }),
        /* @__PURE__ */ e.jsx("div", { className: "narrative-text", children: u ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          "O tema escuro da CDK TECK representa o território onde o pensamento se organiza antes de se tornar realidade. É o espaço da lógica, da análise e da engenharia silenciosa que sustenta tudo o que funciona.",
          /* @__PURE__ */ e.jsx("br", {}),
          /* @__PURE__ */ e.jsx("br", {}),
          "No centro da identidade está o cérebro — símbolo máximo da consciência humana — conectado a circuitos que emanam como ideias em expansão. Cada trilha eletrônica representa um pensamento, uma hipótese, uma tentativa. ",
          /* @__PURE__ */ e.jsx("br", {}),
          "Algumas conexões se fecham em círculos completos, outras permanecem abertas, incompletas.",
          /* @__PURE__ */ e.jsx("br", {}),
          "Ideias boas. Ideias falhas. Tentativas descartadas. Aprendizado constante.",
          /* @__PURE__ */ e.jsx("br", {}),
          "Nada nasce perfeito — nasce processado pela mente.",
          /* @__PURE__ */ e.jsx("br", {}),
          /* @__PURE__ */ e.jsx("br", {}),
          "O símbolo central é dividido por uma linha vertical luminosa, formando a letra I, que separa e, ao mesmo tempo, conecta dois mundos.",
          /* @__PURE__ */ e.jsx("br", {}),
          "À esquerda, a metade do círculo cria o C: o domínio da lógica, do raciocínio, da precisão. À direita, a outra metade forma o D: o espaço da criatividade aplicada, da intuição estruturada, da visão além dos números.",
          /* @__PURE__ */ e.jsx("br", {}),
          "Juntas, essas formas constroem C I D — identidade, assinatura, origem.",
          /* @__PURE__ */ e.jsx("br", {}),
          /* @__PURE__ */ e.jsx("br", {}),
          "Esse é o lado profissional da marca.",
          /* @__PURE__ */ e.jsx("br", {}),
          "O lado que valoriza método, clareza, performance e responsabilidade técnica. Onde dashboards não são apenas gráficos, mas ferramentas de decisão. Onde dados contam histórias reais e a tecnologia é usada com propósito.",
          /* @__PURE__ */ e.jsx("br", {}),
          /* @__PURE__ */ e.jsx("br", {}),
          /* @__PURE__ */ e.jsxs("span", { className: "narrative_colors_span", children: [
            "O Dark Mode é o reino da mente disciplinada.",
            /* @__PURE__ */ e.jsx("br", {})
          ] }),
          /* @__PURE__ */ e.jsx("span", { className: "narrative_colors_span", children: "Onde a tecnologia não impressiona — ela resolve." })
        ] }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          "O tema claro da CDK TECK nasce de algo que nenhuma máquina pode replicar:",
          /* @__PURE__ */ e.jsx("br", {}),
          "o vínculo humano.",
          /* @__PURE__ */ e.jsx("br", {}),
          /* @__PURE__ */ e.jsx("br", {}),
          "Este modo é uma homenagem direta àquilo que dá sentido à tecnologia — a emoção, a imaginação e o afeto. Ele carrega o espírito da infância, da curiosidade sem medo e da capacidade de acreditar no impossível.",
          /* @__PURE__ */ e.jsx("br", {}),
          /* @__PURE__ */ e.jsx("br", {}),
          "O unicórnio, aqui, não é fantasia gratuita.",
          /* @__PURE__ */ e.jsx("br", {}),
          "Ele simboliza o raro, o singular, aquilo que não se encontra facilmente. Assim como profissionais capazes de unir dados, cloud, inteligência artificial e visão estratégica — habilidades escassas em um mercado saturado de superficialidade.",
          /* @__PURE__ */ e.jsx("br", {}),
          /* @__PURE__ */ e.jsx("br", {}),
          "Mas o unicórnio também tem nome.",
          /* @__PURE__ */ e.jsx("br", {}),
          /* @__PURE__ */ e.jsx("strong", { children: "Lourdes" }),
          " é o mascote da CDK TECK, inspirado no apelido carinhoso de ",
          /* @__PURE__ */ e.jsx("strong", { children: "Ludmilla" }),
          ", filha e fonte de inspiração. Ela representa a magia que humaniza o futuro, a lembrança constante de que toda inovação deve preservar sensibilidade, empatia e beleza.",
          /* @__PURE__ */ e.jsx("br", {}),
          /* @__PURE__ */ e.jsx("br", {}),
          "Neste universo, a tecnologia não desaparece — ela se suaviza.",
          /* @__PURE__ */ e.jsx("br", {}),
          "A estrutura permanece, mas agora envolta em cores leves, luz difusa e símbolos que remetem à imaginação. É o equilíbrio entre o rigor técnico e a liberdade criativa.",
          /* @__PURE__ */ e.jsx("br", {}),
          /* @__PURE__ */ e.jsx("br", {}),
          /* @__PURE__ */ e.jsxs("span", { className: "narrative_colors_span", children: [
            "O Light Mode é o reino do coração.",
            /* @__PURE__ */ e.jsx("br", {})
          ] }),
          /* @__PURE__ */ e.jsx("span", { className: "narrative_colors_span", children: "Onde a tecnologia ganha alma, propósito e significado." })
        ] }) }),
        /* @__PURE__ */ e.jsx("div", { className: "narrative-skills-grid", children: [
          { label: u ? "Engine" : "Vibe", val: u ? "Python / OCI" : "UX / Storytelling", icon: u ? /* @__PURE__ */ e.jsx(Ga, { size: 16 }) : /* @__PURE__ */ e.jsx(Ya, { size: 16 }) },
          { label: u ? "Focus" : "Magic", val: u ? "RAG / MLOps" : "Brand Identity", icon: u ? /* @__PURE__ */ e.jsx(Ge, { size: 16 }) : /* @__PURE__ */ e.jsx(Je, { size: 16 }) }
        ].map((j, g) => /* @__PURE__ */ e.jsxs("div", { className: "narrative-skill-item", children: [
          /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.3rem", color: "inherit", opacity: 0.9 }, children: [
            j.icon,
            /* @__PURE__ */ e.jsx("span", { style: { fontSize: "0.55rem", fontWeight: 800, textTransform: "uppercase" }, children: j.label })
          ] }),
          /* @__PURE__ */ e.jsx("div", { style: { fontSize: "0.75rem", fontWeight: 600 }, children: j.val })
        ] }, g)) })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "narrative-footer", children: "TECNOLOGIA COM MENTE. FUTURO COM CORAÇÃO." })
    ] });
  };
  return /* @__PURE__ */ e.jsx("div", { className: "narrative-card-container", children: /* @__PURE__ */ e.jsxs("div", { className: `narrative-card-wrapper ${o ? "flipped" : ""}`, children: [
    /* @__PURE__ */ e.jsx(d, { type: "logic" }),
    /* @__PURE__ */ e.jsx(d, { type: "soul" })
  ] }) });
}, dr = () => {
  const o = "/assets/favicon.png";
  return V(() => {
    (() => {
      document.querySelectorAll("link[rel*='icon']").forEach((d) => d.remove());
      const i = document.createElement("link");
      i.type = "image/png", i.rel = "icon", i.href = o, document.head.appendChild(i);
    })();
  }, []), null;
}, Ze = Ke(void 0), ur = () => {
  const o = We(Ze);
  if (!o)
    throw new Error("useModal must be used within a ModalProvider");
  return o;
}, mr = ({ children: o }) => {
  const [s, n] = P(!1), [i, d] = P(null), [c, u] = P(void 0), j = (f, w) => {
    d(f), u(w), n(!0);
  }, g = () => {
    n(!1), d(null), u(void 0);
  }, b = { showModal: j, hideModal: g };
  return /* @__PURE__ */ e.jsxs(Ze.Provider, { value: b, children: [
    o,
    /* @__PURE__ */ e.jsx(Ue, { isOpen: s, onClose: g, title: c, size: "lg", children: i })
  ] });
}, hr = ({
  children: o,
  variant: s = "primary",
  isLoading: n = !1,
  leftIcon: i,
  rightIcon: d,
  className: c = "",
  disabled: u,
  ...j
}) => {
  const b = `btn ${(() => {
    switch (s) {
      case "secondary":
        return "btn-secundario";
      // Classe do seu global.css
      case "danger":
        return "btn-danger";
      // Vamos adicionar essa classe depois ou usar style direto
      case "ghost":
        return "btn-ghost";
      default:
        return "btn-primario";
    }
  })()} ${c}`;
  return /* @__PURE__ */ e.jsx(
    "button",
    {
      className: b,
      disabled: n || u,
      style: s === "danger" ? { backgroundColor: "var(--cor-perigo)", color: "#fff", borderColor: "var(--cor-perigo)" } : {},
      ...j,
      children: n ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { className: "spinner-border spinner-border-sm", role: "status", "aria-hidden": "true", style: {
          width: "16px",
          height: "16px",
          border: "2px solid rgba(255,255,255,0.3)",
          borderTopColor: "#fff",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        } }),
        /* @__PURE__ */ e.jsx("span", { style: { marginLeft: "8px" }, children: "Carregando..." }),
        /* @__PURE__ */ e.jsx("style", { children: "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }" })
      ] }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        i && /* @__PURE__ */ e.jsx("span", { style: { marginRight: "8px", display: "flex" }, children: i }),
        o,
        d && /* @__PURE__ */ e.jsx("span", { style: { marginLeft: "8px", display: "flex" }, children: d })
      ] })
    }
  );
}, fr = ({
  label: o,
  error: s,
  containerStyle: n,
  className: i = "",
  id: d,
  ...c
}) => {
  const u = d || c.name || Math.random().toString(36).substr(2, 9);
  return /* @__PURE__ */ e.jsxs("div", { style: { width: "100%", marginBottom: "15px", ...n }, children: [
    o && /* @__PURE__ */ e.jsx(
      "label",
      {
        htmlFor: u,
        style: {
          display: "block",
          marginBottom: "5px",
          color: "var(--cor-texto-primario)",
          fontSize: "0.9rem",
          fontWeight: 600
        },
        children: o
      }
    ),
    /* @__PURE__ */ e.jsx(
      "input",
      {
        id: u,
        className: `form-input ${i}`,
        style: s ? { borderColor: "var(--cor-perigo)", boxShadow: "0 0 5px rgba(220, 53, 69, 0.5)" } : {},
        ...c
      }
    ),
    s && /* @__PURE__ */ e.jsx("span", { style: {
      color: "var(--cor-perigo)",
      fontSize: "0.8rem",
      marginTop: "4px",
      display: "block"
    }, children: s })
  ] });
}, pr = ({
  children: o,
  className: s = "",
  hoverEffect: n = !0,
  onClick: i
}) => /* @__PURE__ */ e.jsx(
  "div",
  {
    className: `card ${s}`,
    onClick: i,
    style: {
      cursor: i ? "pointer" : "default",
      transform: n ? void 0 : "none",
      // Desativa hover se false
      transition: "all 0.3s ease"
    },
    children: o
  }
), gr = ({ isLoading: o, text: s = "Carregando..." }) => o ? /* @__PURE__ */ e.jsxs("div", { style: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.7)",
  backdropFilter: "blur(5px)",
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--cor-terciaria)"
}, children: [
  /* @__PURE__ */ e.jsx("div", { className: "spinner", style: {
    width: "50px",
    height: "50px",
    border: "4px solid rgba(255,255,255,0.1)",
    borderTop: "4px solid var(--cor-acao-primaria)",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "20px"
  } }),
  /* @__PURE__ */ e.jsx("h3", { style: { fontFamily: "var(--fonte-primaria)" }, children: s }),
  /* @__PURE__ */ e.jsx("style", { children: "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }" })
] }) : null;
export {
  hr as Button,
  dr as CDKFavicon,
  pr as Card,
  rr as CertificateCard,
  sr as ContactModal,
  tr as FilosofiaModal,
  ar as Footer,
  er as Header,
  fr as Input,
  gr as LoadingOverlay,
  or as LoginPage,
  Ue as Modal,
  mr as ModalProvider,
  cr as NarrativeCard,
  Ye as PageHeader,
  nr as PrivacyPolicy,
  ir as TermsOfUse,
  Qa as ThemeProvider,
  lr as ThemeToggle,
  ur as useModal,
  X as useTheme
};
