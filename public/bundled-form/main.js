var $R = Object.defineProperty;
var DR = (n, a, o) => a in n ? $R(n, a, { enumerable: !0, configurable: !0, writable: !0, value: o }) : n[a] = o;
var QC = (n, a, o) => (DR(n, typeof a != "symbol" ? a + "" : a, o), o);
function OR(n, a) {
  for (var o = 0; o < a.length; o++) {
    const l = a[o];
    if (typeof l != "string" && !Array.isArray(l)) {
      for (const c in l)
        if (c !== "default" && !(c in n)) {
          const p = Object.getOwnPropertyDescriptor(l, c);
          p && Object.defineProperty(n, c, p.get ? p : {
            enumerable: !0,
            get: () => l[c]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
function AR(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var p5 = { exports: {} }, Vf = {}, h5 = { exports: {} }, Gf = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Gf.exports;
(function(n, a) {
  (function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var o = "18.2.0", l = Symbol.for("react.element"), c = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), d = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), y = Symbol.for("react.provider"), C = Symbol.for("react.context"), $ = Symbol.for("react.forward_ref"), _ = Symbol.for("react.suspense"), R = Symbol.for("react.suspense_list"), S = Symbol.for("react.memo"), k = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), D = Symbol.iterator, z = "@@iterator";
    function L(g) {
      if (g === null || typeof g != "object")
        return null;
      var O = D && g[D] || g[z];
      return typeof O == "function" ? O : null;
    }
    var M = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, V = {
      transition: null
    }, H = {
      current: null,
      // Used to reproduce behavior of `batchedUpdates` in legacy mode.
      isBatchingLegacy: !1,
      didScheduleLegacyUpdate: !1
    }, N = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, P = {}, J = null;
    function me(g) {
      J = g;
    }
    P.setExtraStackFrame = function(g) {
      J = g;
    }, P.getCurrentStack = null, P.getStackAddendum = function() {
      var g = "";
      J && (g += J);
      var O = P.getCurrentStack;
      return O && (g += O() || ""), g;
    };
    var we = !1, ae = !1, de = !1, re = !1, oe = !1, pe = {
      ReactCurrentDispatcher: M,
      ReactCurrentBatchConfig: V,
      ReactCurrentOwner: N
    };
    pe.ReactDebugCurrentFrame = P, pe.ReactCurrentActQueue = H;
    function se(g) {
      {
        for (var O = arguments.length, G = new Array(O > 1 ? O - 1 : 0), Y = 1; Y < O; Y++)
          G[Y - 1] = arguments[Y];
        Ue("warn", g, G);
      }
    }
    function le(g) {
      {
        for (var O = arguments.length, G = new Array(O > 1 ? O - 1 : 0), Y = 1; Y < O; Y++)
          G[Y - 1] = arguments[Y];
        Ue("error", g, G);
      }
    }
    function Ue(g, O, G) {
      {
        var Y = pe.ReactDebugCurrentFrame, ie = Y.getStackAddendum();
        ie !== "" && (O += "%s", G = G.concat([ie]));
        var Le = G.map(function(_e) {
          return String(_e);
        });
        Le.unshift("Warning: " + O), Function.prototype.apply.call(console[g], console, Le);
      }
    }
    var Tt = {};
    function gt(g, O) {
      {
        var G = g.constructor, Y = G && (G.displayName || G.name) || "ReactClass", ie = Y + "." + O;
        if (Tt[ie])
          return;
        le("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", O, Y), Tt[ie] = !0;
      }
    }
    var Et = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function(g) {
        return !1;
      },
      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueForceUpdate: function(g, O, G) {
        gt(g, "forceUpdate");
      },
      /**
       * Replaces all of the state. Always use this or `setState` to mutate state.
       * You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} completeState Next state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueReplaceState: function(g, O, G, Y) {
        gt(g, "replaceState");
      },
      /**
       * Sets a subset of the state. This only exists because _pendingState is
       * internal. This provides a merging strategy that is not available to deep
       * properties which is confusing. TODO: Expose pendingState or don't use it
       * during the merge.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} partialState Next partial state to be merged with state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} Name of the calling function in the public API.
       * @internal
       */
      enqueueSetState: function(g, O, G, Y) {
        gt(g, "setState");
      }
    }, ot = Object.assign, $t = {};
    Object.freeze($t);
    function Rt(g, O, G) {
      this.props = g, this.context = O, this.refs = $t, this.updater = G || Et;
    }
    Rt.prototype.isReactComponent = {}, Rt.prototype.setState = function(g, O) {
      if (typeof g != "object" && typeof g != "function" && g != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, g, O, "setState");
    }, Rt.prototype.forceUpdate = function(g) {
      this.updater.enqueueForceUpdate(this, g, "forceUpdate");
    };
    {
      var Dt = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, jt = function(g, O) {
        Object.defineProperty(Rt.prototype, g, {
          get: function() {
            se("%s(...) is deprecated in plain JavaScript React classes. %s", O[0], O[1]);
          }
        });
      };
      for (var Re in Dt)
        Dt.hasOwnProperty(Re) && jt(Re, Dt[Re]);
    }
    function Fe() {
    }
    Fe.prototype = Rt.prototype;
    function at(g, O, G) {
      this.props = g, this.context = O, this.refs = $t, this.updater = G || Et;
    }
    var Be = at.prototype = new Fe();
    Be.constructor = at, ot(Be, Rt.prototype), Be.isPureReactComponent = !0;
    function Ve() {
      var g = {
        current: null
      };
      return Object.seal(g), g;
    }
    var Ne = Array.isArray;
    function Je(g) {
      return Ne(g);
    }
    function Ze(g) {
      {
        var O = typeof Symbol == "function" && Symbol.toStringTag, G = O && g[Symbol.toStringTag] || g.constructor.name || "Object";
        return G;
      }
    }
    function qt(g) {
      try {
        return kt(g), !1;
      } catch {
        return !0;
      }
    }
    function kt(g) {
      return "" + g;
    }
    function bt(g) {
      if (qt(g))
        return le("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ze(g)), kt(g);
    }
    function dn(g, O, G) {
      var Y = g.displayName;
      if (Y)
        return Y;
      var ie = O.displayName || O.name || "";
      return ie !== "" ? G + "(" + ie + ")" : G;
    }
    function Hn(g) {
      return g.displayName || "Context";
    }
    function Kt(g) {
      if (g == null)
        return null;
      if (typeof g.tag == "number" && le("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof g == "function")
        return g.displayName || g.name || null;
      if (typeof g == "string")
        return g;
      switch (g) {
        case p:
          return "Fragment";
        case c:
          return "Portal";
        case v:
          return "Profiler";
        case d:
          return "StrictMode";
        case _:
          return "Suspense";
        case R:
          return "SuspenseList";
      }
      if (typeof g == "object")
        switch (g.$$typeof) {
          case C:
            var O = g;
            return Hn(O) + ".Consumer";
          case y:
            var G = g;
            return Hn(G._context) + ".Provider";
          case $:
            return dn(g, g.render, "ForwardRef");
          case S:
            var Y = g.displayName || null;
            return Y !== null ? Y : Kt(g.type) || "Memo";
          case k: {
            var ie = g, Le = ie._payload, _e = ie._init;
            try {
              return Kt(_e(Le));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var or = Object.prototype.hasOwnProperty, zt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Zt, $n, $e;
    $e = {};
    function je(g) {
      if (or.call(g, "ref")) {
        var O = Object.getOwnPropertyDescriptor(g, "ref").get;
        if (O && O.isReactWarning)
          return !1;
      }
      return g.ref !== void 0;
    }
    function Se(g) {
      if (or.call(g, "key")) {
        var O = Object.getOwnPropertyDescriptor(g, "key").get;
        if (O && O.isReactWarning)
          return !1;
      }
      return g.key !== void 0;
    }
    function We(g, O) {
      var G = function() {
        Zt || (Zt = !0, le("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", O));
      };
      G.isReactWarning = !0, Object.defineProperty(g, "key", {
        get: G,
        configurable: !0
      });
    }
    function _n(g, O) {
      var G = function() {
        $n || ($n = !0, le("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", O));
      };
      G.isReactWarning = !0, Object.defineProperty(g, "ref", {
        get: G,
        configurable: !0
      });
    }
    function rn(g) {
      if (typeof g.ref == "string" && N.current && g.__self && N.current.stateNode !== g.__self) {
        var O = Kt(N.current.type);
        $e[O] || (le('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', O, g.ref), $e[O] = !0);
      }
    }
    var X = function(g, O, G, Y, ie, Le, _e) {
      var Ie = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: l,
        // Built-in properties that belong on the element
        type: g,
        key: O,
        ref: G,
        props: _e,
        // Record the component responsible for creating this element.
        _owner: Le
      };
      return Ie._store = {}, Object.defineProperty(Ie._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Ie, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Y
      }), Object.defineProperty(Ie, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ie
      }), Object.freeze && (Object.freeze(Ie.props), Object.freeze(Ie)), Ie;
    };
    function ee(g, O, G) {
      var Y, ie = {}, Le = null, _e = null, Ie = null, et = null;
      if (O != null) {
        je(O) && (_e = O.ref, rn(O)), Se(O) && (bt(O.key), Le = "" + O.key), Ie = O.__self === void 0 ? null : O.__self, et = O.__source === void 0 ? null : O.__source;
        for (Y in O)
          or.call(O, Y) && !zt.hasOwnProperty(Y) && (ie[Y] = O[Y]);
      }
      var Ct = arguments.length - 2;
      if (Ct === 1)
        ie.children = G;
      else if (Ct > 1) {
        for (var At = Array(Ct), Lt = 0; Lt < Ct; Lt++)
          At[Lt] = arguments[Lt + 2];
        Object.freeze && Object.freeze(At), ie.children = At;
      }
      if (g && g.defaultProps) {
        var Ht = g.defaultProps;
        for (Y in Ht)
          ie[Y] === void 0 && (ie[Y] = Ht[Y]);
      }
      if (Le || _e) {
        var Xt = typeof g == "function" ? g.displayName || g.name || "Unknown" : g;
        Le && We(ie, Xt), _e && _n(ie, Xt);
      }
      return X(g, Le, _e, Ie, et, N.current, ie);
    }
    function Ae(g, O) {
      var G = X(g.type, O, g.ref, g._self, g._source, g._owner, g.props);
      return G;
    }
    function st(g, O, G) {
      if (g == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + g + ".");
      var Y, ie = ot({}, g.props), Le = g.key, _e = g.ref, Ie = g._self, et = g._source, Ct = g._owner;
      if (O != null) {
        je(O) && (_e = O.ref, Ct = N.current), Se(O) && (bt(O.key), Le = "" + O.key);
        var At;
        g.type && g.type.defaultProps && (At = g.type.defaultProps);
        for (Y in O)
          or.call(O, Y) && !zt.hasOwnProperty(Y) && (O[Y] === void 0 && At !== void 0 ? ie[Y] = At[Y] : ie[Y] = O[Y]);
      }
      var Lt = arguments.length - 2;
      if (Lt === 1)
        ie.children = G;
      else if (Lt > 1) {
        for (var Ht = Array(Lt), Xt = 0; Xt < Lt; Xt++)
          Ht[Xt] = arguments[Xt + 2];
        ie.children = Ht;
      }
      return X(g.type, Le, _e, Ie, et, Ct, ie);
    }
    function ft(g) {
      return typeof g == "object" && g !== null && g.$$typeof === l;
    }
    var fn = ".", Jt = ":";
    function sr(g) {
      var O = /[=:]/g, G = {
        "=": "=0",
        ":": "=2"
      }, Y = g.replace(O, function(ie) {
        return G[ie];
      });
      return "$" + Y;
    }
    var Ot = !1, gr = /\/+/g;
    function Pt(g) {
      return g.replace(gr, "$&/");
    }
    function Ut(g, O) {
      return typeof g == "object" && g !== null && g.key != null ? (bt(g.key), sr("" + g.key)) : O.toString(36);
    }
    function ua(g, O, G, Y, ie) {
      var Le = typeof g;
      (Le === "undefined" || Le === "boolean") && (g = null);
      var _e = !1;
      if (g === null)
        _e = !0;
      else
        switch (Le) {
          case "string":
          case "number":
            _e = !0;
            break;
          case "object":
            switch (g.$$typeof) {
              case l:
              case c:
                _e = !0;
            }
        }
      if (_e) {
        var Ie = g, et = ie(Ie), Ct = Y === "" ? fn + Ut(Ie, 0) : Y;
        if (Je(et)) {
          var At = "";
          Ct != null && (At = Pt(Ct) + "/"), ua(et, O, At, "", function(xp) {
            return xp;
          });
        } else
          et != null && (ft(et) && (et.key && (!Ie || Ie.key !== et.key) && bt(et.key), et = Ae(
            et,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            G + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (et.key && (!Ie || Ie.key !== et.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              Pt("" + et.key) + "/"
            ) : "") + Ct
          )), O.push(et));
        return 1;
      }
      var Lt, Ht, Xt = 0, ht = Y === "" ? fn : Y + Jt;
      if (Je(g))
        for (var Ci = 0; Ci < g.length; Ci++)
          Lt = g[Ci], Ht = ht + Ut(Lt, Ci), Xt += ua(Lt, O, G, Ht, ie);
      else {
        var Zo = L(g);
        if (typeof Zo == "function") {
          var El = g;
          Zo === El.entries && (Ot || se("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Ot = !0);
          for (var _p = Zo.call(El), Ia, Rl = 0; !(Ia = _p.next()).done; )
            Lt = Ia.value, Ht = ht + Ut(Lt, Rl++), Xt += ua(Lt, O, G, Ht, ie);
        } else if (Le === "object") {
          var kl = String(g);
          throw new Error("Objects are not valid as a React child (found: " + (kl === "[object Object]" ? "object with keys {" + Object.keys(g).join(", ") + "}" : kl) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return Xt;
    }
    function Hr(g, O, G) {
      if (g == null)
        return g;
      var Y = [], ie = 0;
      return ua(g, Y, "", "", function(Le) {
        return O.call(G, Le, ie++);
      }), Y;
    }
    function Qi(g) {
      var O = 0;
      return Hr(g, function() {
        O++;
      }), O;
    }
    function Ho(g, O, G) {
      Hr(g, function() {
        O.apply(this, arguments);
      }, G);
    }
    function dl(g) {
      return Hr(g, function(O) {
        return O;
      }) || [];
    }
    function Ji(g) {
      if (!ft(g))
        throw new Error("React.Children.only expected to receive a single React element child.");
      return g;
    }
    function eo(g) {
      var O = {
        $$typeof: C,
        // As a workaround to support multiple concurrent renderers, we categorize
        // some renderers as primary and others as secondary. We only expect
        // there to be two concurrent renderers at most: React Native (primary) and
        // Fabric (secondary); React DOM (primary) and React ART (secondary).
        // Secondary renderers store their context values on separate fields.
        _currentValue: g,
        _currentValue2: g,
        // Used to track how many concurrent renderers this context currently
        // supports within in a single renderer. Such as parallel server rendering.
        _threadCount: 0,
        // These are circular
        Provider: null,
        Consumer: null,
        // Add these to use same hidden class in VM as ServerContext
        _defaultValue: null,
        _globalName: null
      };
      O.Provider = {
        $$typeof: y,
        _context: O
      };
      var G = !1, Y = !1, ie = !1;
      {
        var Le = {
          $$typeof: C,
          _context: O
        };
        Object.defineProperties(Le, {
          Provider: {
            get: function() {
              return Y || (Y = !0, le("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), O.Provider;
            },
            set: function(_e) {
              O.Provider = _e;
            }
          },
          _currentValue: {
            get: function() {
              return O._currentValue;
            },
            set: function(_e) {
              O._currentValue = _e;
            }
          },
          _currentValue2: {
            get: function() {
              return O._currentValue2;
            },
            set: function(_e) {
              O._currentValue2 = _e;
            }
          },
          _threadCount: {
            get: function() {
              return O._threadCount;
            },
            set: function(_e) {
              O._threadCount = _e;
            }
          },
          Consumer: {
            get: function() {
              return G || (G = !0, le("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), O.Consumer;
            }
          },
          displayName: {
            get: function() {
              return O.displayName;
            },
            set: function(_e) {
              ie || (se("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", _e), ie = !0);
            }
          }
        }), O.Consumer = Le;
      }
      return O._currentRenderer = null, O._currentRenderer2 = null, O;
    }
    var Oa = -1, pi = 0, Aa = 1, ca = 2;
    function Br(g) {
      if (g._status === Oa) {
        var O = g._result, G = O();
        if (G.then(function(Le) {
          if (g._status === pi || g._status === Oa) {
            var _e = g;
            _e._status = Aa, _e._result = Le;
          }
        }, function(Le) {
          if (g._status === pi || g._status === Oa) {
            var _e = g;
            _e._status = ca, _e._result = Le;
          }
        }), g._status === Oa) {
          var Y = g;
          Y._status = pi, Y._result = G;
        }
      }
      if (g._status === Aa) {
        var ie = g._result;
        return ie === void 0 && le(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, ie), "default" in ie || le(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, ie), ie.default;
      } else
        throw g._result;
    }
    function da(g) {
      var O = {
        // We use these fields to store the result.
        _status: Oa,
        _result: g
      }, G = {
        $$typeof: k,
        _payload: O,
        _init: Br
      };
      {
        var Y, ie;
        Object.defineProperties(G, {
          defaultProps: {
            configurable: !0,
            get: function() {
              return Y;
            },
            set: function(Le) {
              le("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), Y = Le, Object.defineProperty(G, "defaultProps", {
                enumerable: !0
              });
            }
          },
          propTypes: {
            configurable: !0,
            get: function() {
              return ie;
            },
            set: function(Le) {
              le("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), ie = Le, Object.defineProperty(G, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return G;
    }
    function to(g) {
      g != null && g.$$typeof === S ? le("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof g != "function" ? le("forwardRef requires a render function but was given %s.", g === null ? "null" : typeof g) : g.length !== 0 && g.length !== 2 && le("forwardRef render functions accept exactly two parameters: props and ref. %s", g.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), g != null && (g.defaultProps != null || g.propTypes != null) && le("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var O = {
        $$typeof: $,
        render: g
      };
      {
        var G;
        Object.defineProperty(O, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return G;
          },
          set: function(Y) {
            G = Y, !g.name && !g.displayName && (g.displayName = Y);
          }
        });
      }
      return O;
    }
    var A;
    A = Symbol.for("react.module.reference");
    function te(g) {
      return !!(typeof g == "string" || typeof g == "function" || g === p || g === v || oe || g === d || g === _ || g === R || re || g === x || we || ae || de || typeof g == "object" && g !== null && (g.$$typeof === k || g.$$typeof === S || g.$$typeof === y || g.$$typeof === C || g.$$typeof === $ || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      g.$$typeof === A || g.getModuleId !== void 0));
    }
    function ce(g, O) {
      te(g) || le("memo: The first argument must be a component. Instead received: %s", g === null ? "null" : typeof g);
      var G = {
        $$typeof: S,
        type: g,
        compare: O === void 0 ? null : O
      };
      {
        var Y;
        Object.defineProperty(G, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return Y;
          },
          set: function(ie) {
            Y = ie, !g.name && !g.displayName && (g.displayName = ie);
          }
        });
      }
      return G;
    }
    function be() {
      var g = M.current;
      return g === null && le(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), g;
    }
    function Xe(g) {
      var O = be();
      if (g._context !== void 0) {
        var G = g._context;
        G.Consumer === g ? le("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : G.Provider === g && le("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return O.useContext(g);
    }
    function lt(g) {
      var O = be();
      return O.useState(g);
    }
    function Ge(g, O, G) {
      var Y = be();
      return Y.useReducer(g, O, G);
    }
    function Te(g) {
      var O = be();
      return O.useRef(g);
    }
    function pn(g, O) {
      var G = be();
      return G.useEffect(g, O);
    }
    function Ft(g, O) {
      var G = be();
      return G.useInsertionEffect(g, O);
    }
    function Vt(g, O) {
      var G = be();
      return G.useLayoutEffect(g, O);
    }
    function Bn(g, O) {
      var G = be();
      return G.useCallback(g, O);
    }
    function fa(g, O) {
      var G = be();
      return G.useMemo(g, O);
    }
    function Bo(g, O, G) {
      var Y = be();
      return Y.useImperativeHandle(g, O, G);
    }
    function lr(g, O) {
      {
        var G = be();
        return G.useDebugValue(g, O);
      }
    }
    function yp() {
      var g = be();
      return g.useTransition();
    }
    function La(g) {
      var O = be();
      return O.useDeferredValue(g);
    }
    function Qe() {
      var g = be();
      return g.useId();
    }
    function no(g, O, G) {
      var Y = be();
      return Y.useSyncExternalStore(g, O, G);
    }
    var hi = 0, fl, pl, hl, vl, ml, gl, yl;
    function gc() {
    }
    gc.__reactDisabledLog = !0;
    function bp() {
      {
        if (hi === 0) {
          fl = console.log, pl = console.info, hl = console.warn, vl = console.error, ml = console.group, gl = console.groupCollapsed, yl = console.groupEnd;
          var g = {
            configurable: !0,
            enumerable: !0,
            value: gc,
            writable: !0
          };
          Object.defineProperties(console, {
            info: g,
            log: g,
            warn: g,
            error: g,
            group: g,
            groupCollapsed: g,
            groupEnd: g
          });
        }
        hi++;
      }
    }
    function bl() {
      {
        if (hi--, hi === 0) {
          var g = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ot({}, g, {
              value: fl
            }),
            info: ot({}, g, {
              value: pl
            }),
            warn: ot({}, g, {
              value: hl
            }),
            error: ot({}, g, {
              value: vl
            }),
            group: ot({}, g, {
              value: ml
            }),
            groupCollapsed: ot({}, g, {
              value: gl
            }),
            groupEnd: ot({}, g, {
              value: yl
            })
          });
        }
        hi < 0 && le("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ro = pe.ReactCurrentDispatcher, Ar;
    function vi(g, O, G) {
      {
        if (Ar === void 0)
          try {
            throw Error();
          } catch (ie) {
            var Y = ie.stack.trim().match(/\n( *(at )?)/);
            Ar = Y && Y[1] || "";
          }
        return `
` + Ar + g;
      }
    }
    var mi = !1, jo;
    {
      var wl = typeof WeakMap == "function" ? WeakMap : Map;
      jo = new wl();
    }
    function yc(g, O) {
      if (!g || mi)
        return "";
      {
        var G = jo.get(g);
        if (G !== void 0)
          return G;
      }
      var Y;
      mi = !0;
      var ie = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Le;
      Le = ro.current, ro.current = null, bp();
      try {
        if (O) {
          var _e = function() {
            throw Error();
          };
          if (Object.defineProperty(_e.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(_e, []);
            } catch (ht) {
              Y = ht;
            }
            Reflect.construct(g, [], _e);
          } else {
            try {
              _e.call();
            } catch (ht) {
              Y = ht;
            }
            g.call(_e.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ht) {
            Y = ht;
          }
          g();
        }
      } catch (ht) {
        if (ht && Y && typeof ht.stack == "string") {
          for (var Ie = ht.stack.split(`
`), et = Y.stack.split(`
`), Ct = Ie.length - 1, At = et.length - 1; Ct >= 1 && At >= 0 && Ie[Ct] !== et[At]; )
            At--;
          for (; Ct >= 1 && At >= 0; Ct--, At--)
            if (Ie[Ct] !== et[At]) {
              if (Ct !== 1 || At !== 1)
                do
                  if (Ct--, At--, At < 0 || Ie[Ct] !== et[At]) {
                    var Lt = `
` + Ie[Ct].replace(" at new ", " at ");
                    return g.displayName && Lt.includes("<anonymous>") && (Lt = Lt.replace("<anonymous>", g.displayName)), typeof g == "function" && jo.set(g, Lt), Lt;
                  }
                while (Ct >= 1 && At >= 0);
              break;
            }
        }
      } finally {
        mi = !1, ro.current = Le, bl(), Error.prepareStackTrace = ie;
      }
      var Ht = g ? g.displayName || g.name : "", Xt = Ht ? vi(Ht) : "";
      return typeof g == "function" && jo.set(g, Xt), Xt;
    }
    function Cl(g, O, G) {
      return yc(g, !1);
    }
    function wp(g) {
      var O = g.prototype;
      return !!(O && O.isReactComponent);
    }
    function gi(g, O, G) {
      if (g == null)
        return "";
      if (typeof g == "function")
        return yc(g, wp(g));
      if (typeof g == "string")
        return vi(g);
      switch (g) {
        case _:
          return vi("Suspense");
        case R:
          return vi("SuspenseList");
      }
      if (typeof g == "object")
        switch (g.$$typeof) {
          case $:
            return Cl(g.render);
          case S:
            return gi(g.type, O, G);
          case k: {
            var Y = g, ie = Y._payload, Le = Y._init;
            try {
              return gi(Le(ie), O, G);
            } catch {
            }
          }
        }
      return "";
    }
    var bc = {}, Sl = pe.ReactDebugCurrentFrame;
    function Go(g) {
      if (g) {
        var O = g._owner, G = gi(g.type, g._source, O ? O.type : null);
        Sl.setExtraStackFrame(G);
      } else
        Sl.setExtraStackFrame(null);
    }
    function wc(g, O, G, Y, ie) {
      {
        var Le = Function.call.bind(or);
        for (var _e in g)
          if (Le(g, _e)) {
            var Ie = void 0;
            try {
              if (typeof g[_e] != "function") {
                var et = Error((Y || "React class") + ": " + G + " type `" + _e + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof g[_e] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw et.name = "Invariant Violation", et;
              }
              Ie = g[_e](O, _e, Y, G, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Ct) {
              Ie = Ct;
            }
            Ie && !(Ie instanceof Error) && (Go(ie), le("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Y || "React class", G, _e, typeof Ie), Go(null)), Ie instanceof Error && !(Ie.message in bc) && (bc[Ie.message] = !0, Go(ie), le("Failed %s type: %s", G, Ie.message), Go(null));
          }
      }
    }
    function pt(g) {
      if (g) {
        var O = g._owner, G = gi(g.type, g._source, O ? O.type : null);
        me(G);
      } else
        me(null);
    }
    var _l;
    _l = !1;
    function xl() {
      if (N.current) {
        var g = Kt(N.current.type);
        if (g)
          return `

Check the render method of \`` + g + "`.";
      }
      return "";
    }
    function He(g) {
      if (g !== void 0) {
        var O = g.fileName.replace(/^.*[\\\/]/, ""), G = g.lineNumber;
        return `

Check your code at ` + O + ":" + G + ".";
      }
      return "";
    }
    function Cc(g) {
      return g != null ? He(g.__source) : "";
    }
    var jn = {};
    function ao(g) {
      var O = xl();
      if (!O) {
        var G = typeof g == "string" ? g : g.displayName || g.name;
        G && (O = `

Check the top-level render call using <` + G + ">.");
      }
      return O;
    }
    function yi(g, O) {
      if (!(!g._store || g._store.validated || g.key != null)) {
        g._store.validated = !0;
        var G = ao(O);
        if (!jn[G]) {
          jn[G] = !0;
          var Y = "";
          g && g._owner && g._owner !== N.current && (Y = " It was passed a child from " + Kt(g._owner.type) + "."), pt(g), le('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', G, Y), pt(null);
        }
      }
    }
    function Sc(g, O) {
      if (typeof g == "object") {
        if (Je(g))
          for (var G = 0; G < g.length; G++) {
            var Y = g[G];
            ft(Y) && yi(Y, O);
          }
        else if (ft(g))
          g._store && (g._store.validated = !0);
        else if (g) {
          var ie = L(g);
          if (typeof ie == "function" && ie !== g.entries)
            for (var Le = ie.call(g), _e; !(_e = Le.next()).done; )
              ft(_e.value) && yi(_e.value, O);
        }
      }
    }
    function xn(g) {
      {
        var O = g.type;
        if (O == null || typeof O == "string")
          return;
        var G;
        if (typeof O == "function")
          G = O.propTypes;
        else if (typeof O == "object" && (O.$$typeof === $ || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        O.$$typeof === S))
          G = O.propTypes;
        else
          return;
        if (G) {
          var Y = Kt(O);
          wc(G, g.props, "prop", Y, g);
        } else if (O.PropTypes !== void 0 && !_l) {
          _l = !0;
          var ie = Kt(O);
          le("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ie || "Unknown");
        }
        typeof O.getDefaultProps == "function" && !O.getDefaultProps.isReactClassApproved && le("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Gt(g) {
      {
        for (var O = Object.keys(g.props), G = 0; G < O.length; G++) {
          var Y = O[G];
          if (Y !== "children" && Y !== "key") {
            pt(g), le("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Y), pt(null);
            break;
          }
        }
        g.ref !== null && (pt(g), le("Invalid attribute `ref` supplied to `React.Fragment`."), pt(null));
      }
    }
    function _c(g, O, G) {
      var Y = te(g);
      if (!Y) {
        var ie = "";
        (g === void 0 || typeof g == "object" && g !== null && Object.keys(g).length === 0) && (ie += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Le = Cc(O);
        Le ? ie += Le : ie += xl();
        var _e;
        g === null ? _e = "null" : Je(g) ? _e = "array" : g !== void 0 && g.$$typeof === l ? (_e = "<" + (Kt(g.type) || "Unknown") + " />", ie = " Did you accidentally export a JSX literal instead of a component?") : _e = typeof g, le("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", _e, ie);
      }
      var Ie = ee.apply(this, arguments);
      if (Ie == null)
        return Ie;
      if (Y)
        for (var et = 2; et < arguments.length; et++)
          Sc(arguments[et], g);
      return g === p ? Gt(Ie) : xn(Ie), Ie;
    }
    var yr = !1;
    function ur(g) {
      var O = _c.bind(null, g);
      return O.type = g, yr || (yr = !0, se("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(O, "type", {
        enumerable: !1,
        get: function() {
          return se("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: g
          }), g;
        }
      }), O;
    }
    function pa(g, O, G) {
      for (var Y = st.apply(this, arguments), ie = 2; ie < arguments.length; ie++)
        Sc(arguments[ie], Y.type);
      return xn(Y), Y;
    }
    function Cp(g, O) {
      var G = V.transition;
      V.transition = {};
      var Y = V.transition;
      V.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        g();
      } finally {
        if (V.transition = G, G === null && Y._updatedFibers) {
          var ie = Y._updatedFibers.size;
          ie > 10 && se("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), Y._updatedFibers.clear();
        }
      }
    }
    var Yo = !1, io = null;
    function xc(g) {
      if (io === null)
        try {
          var O = ("require" + Math.random()).slice(0, 7), G = n && n[O];
          io = G.call(n, "timers").setImmediate;
        } catch {
          io = function(ie) {
            Yo === !1 && (Yo = !0, typeof MessageChannel > "u" && le("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var Le = new MessageChannel();
            Le.port1.onmessage = ie, Le.port2.postMessage(void 0);
          };
        }
      return io(g);
    }
    var bi = 0, Ec = !1;
    function Sp(g) {
      {
        var O = bi;
        bi++, H.current === null && (H.current = []);
        var G = H.isBatchingLegacy, Y;
        try {
          if (H.isBatchingLegacy = !0, Y = g(), !G && H.didScheduleLegacyUpdate) {
            var ie = H.current;
            ie !== null && (H.didScheduleLegacyUpdate = !1, Ko(ie));
          }
        } catch (Ht) {
          throw Ma(O), Ht;
        } finally {
          H.isBatchingLegacy = G;
        }
        if (Y !== null && typeof Y == "object" && typeof Y.then == "function") {
          var Le = Y, _e = !1, Ie = {
            then: function(Ht, Xt) {
              _e = !0, Le.then(function(ht) {
                Ma(O), bi === 0 ? Wo(ht, Ht, Xt) : Ht(ht);
              }, function(ht) {
                Ma(O), Xt(ht);
              });
            }
          };
          return !Ec && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            _e || (Ec = !0, le("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Ie;
        } else {
          var et = Y;
          if (Ma(O), bi === 0) {
            var Ct = H.current;
            Ct !== null && (Ko(Ct), H.current = null);
            var At = {
              then: function(Ht, Xt) {
                H.current === null ? (H.current = [], Wo(et, Ht, Xt)) : Ht(et);
              }
            };
            return At;
          } else {
            var Lt = {
              then: function(Ht, Xt) {
                Ht(et);
              }
            };
            return Lt;
          }
        }
      }
    }
    function Ma(g) {
      g !== bi - 1 && le("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), bi = g;
    }
    function Wo(g, O, G) {
      {
        var Y = H.current;
        if (Y !== null)
          try {
            Ko(Y), xc(function() {
              Y.length === 0 ? (H.current = null, O(g)) : Wo(g, O, G);
            });
          } catch (ie) {
            G(ie);
          }
        else
          O(g);
      }
    }
    var wi = !1;
    function Ko(g) {
      if (!wi) {
        wi = !0;
        var O = 0;
        try {
          for (; O < g.length; O++) {
            var G = g[O];
            do
              G = G(!0);
            while (G !== null);
          }
          g.length = 0;
        } catch (Y) {
          throw g = g.slice(O + 1), Y;
        } finally {
          wi = !1;
        }
      }
    }
    var Rc = _c, kc = pa, Tc = ur, $c = {
      map: Hr,
      forEach: Ho,
      count: Qi,
      toArray: dl,
      only: Ji
    };
    a.Children = $c, a.Component = Rt, a.Fragment = p, a.Profiler = v, a.PureComponent = at, a.StrictMode = d, a.Suspense = _, a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = pe, a.cloneElement = kc, a.createContext = eo, a.createElement = Rc, a.createFactory = Tc, a.createRef = Ve, a.forwardRef = to, a.isValidElement = ft, a.lazy = da, a.memo = ce, a.startTransition = Cp, a.unstable_act = Sp, a.useCallback = Bn, a.useContext = Xe, a.useDebugValue = lr, a.useDeferredValue = La, a.useEffect = pn, a.useId = Qe, a.useImperativeHandle = Bo, a.useInsertionEffect = Ft, a.useLayoutEffect = Vt, a.useMemo = fa, a.useReducer = Ge, a.useRef = Te, a.useState = lt, a.useSyncExternalStore = no, a.useTransition = yp, a.version = o, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(Gf, Gf.exports);
var LR = Gf.exports;
h5.exports = LR;
var w = h5.exports;
const wt = /* @__PURE__ */ AR(w), MR = /* @__PURE__ */ OR({
  __proto__: null,
  default: wt
}, [w]);
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function() {
  var n = w, a = Symbol.for("react.element"), o = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), v = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), C = Symbol.for("react.suspense"), $ = Symbol.for("react.suspense_list"), _ = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), k = Symbol.iterator, x = "@@iterator";
  function D(A) {
    if (A === null || typeof A != "object")
      return null;
    var te = k && A[k] || A[x];
    return typeof te == "function" ? te : null;
  }
  var z = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function L(A) {
    {
      for (var te = arguments.length, ce = new Array(te > 1 ? te - 1 : 0), be = 1; be < te; be++)
        ce[be - 1] = arguments[be];
      M("error", A, ce);
    }
  }
  function M(A, te, ce) {
    {
      var be = z.ReactDebugCurrentFrame, Xe = be.getStackAddendum();
      Xe !== "" && (te += "%s", ce = ce.concat([Xe]));
      var lt = ce.map(function(Ge) {
        return String(Ge);
      });
      lt.unshift("Warning: " + te), Function.prototype.apply.call(console[A], console, lt);
    }
  }
  var V = !1, H = !1, N = !1, P = !1, J = !1, me;
  me = Symbol.for("react.module.reference");
  function we(A) {
    return !!(typeof A == "string" || typeof A == "function" || A === l || A === p || J || A === c || A === C || A === $ || P || A === S || V || H || N || typeof A == "object" && A !== null && (A.$$typeof === R || A.$$typeof === _ || A.$$typeof === d || A.$$typeof === v || A.$$typeof === y || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    A.$$typeof === me || A.getModuleId !== void 0));
  }
  function ae(A, te, ce) {
    var be = A.displayName;
    if (be)
      return be;
    var Xe = te.displayName || te.name || "";
    return Xe !== "" ? ce + "(" + Xe + ")" : ce;
  }
  function de(A) {
    return A.displayName || "Context";
  }
  function re(A) {
    if (A == null)
      return null;
    if (typeof A.tag == "number" && L("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof A == "function")
      return A.displayName || A.name || null;
    if (typeof A == "string")
      return A;
    switch (A) {
      case l:
        return "Fragment";
      case o:
        return "Portal";
      case p:
        return "Profiler";
      case c:
        return "StrictMode";
      case C:
        return "Suspense";
      case $:
        return "SuspenseList";
    }
    if (typeof A == "object")
      switch (A.$$typeof) {
        case v:
          var te = A;
          return de(te) + ".Consumer";
        case d:
          var ce = A;
          return de(ce._context) + ".Provider";
        case y:
          return ae(A, A.render, "ForwardRef");
        case _:
          var be = A.displayName || null;
          return be !== null ? be : re(A.type) || "Memo";
        case R: {
          var Xe = A, lt = Xe._payload, Ge = Xe._init;
          try {
            return re(Ge(lt));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var oe = Object.assign, pe = 0, se, le, Ue, Tt, gt, Et, ot;
  function $t() {
  }
  $t.__reactDisabledLog = !0;
  function Rt() {
    {
      if (pe === 0) {
        se = console.log, le = console.info, Ue = console.warn, Tt = console.error, gt = console.group, Et = console.groupCollapsed, ot = console.groupEnd;
        var A = {
          configurable: !0,
          enumerable: !0,
          value: $t,
          writable: !0
        };
        Object.defineProperties(console, {
          info: A,
          log: A,
          warn: A,
          error: A,
          group: A,
          groupCollapsed: A,
          groupEnd: A
        });
      }
      pe++;
    }
  }
  function Dt() {
    {
      if (pe--, pe === 0) {
        var A = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: oe({}, A, {
            value: se
          }),
          info: oe({}, A, {
            value: le
          }),
          warn: oe({}, A, {
            value: Ue
          }),
          error: oe({}, A, {
            value: Tt
          }),
          group: oe({}, A, {
            value: gt
          }),
          groupCollapsed: oe({}, A, {
            value: Et
          }),
          groupEnd: oe({}, A, {
            value: ot
          })
        });
      }
      pe < 0 && L("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var jt = z.ReactCurrentDispatcher, Re;
  function Fe(A, te, ce) {
    {
      if (Re === void 0)
        try {
          throw Error();
        } catch (Xe) {
          var be = Xe.stack.trim().match(/\n( *(at )?)/);
          Re = be && be[1] || "";
        }
      return `
` + Re + A;
    }
  }
  var at = !1, Be;
  {
    var Ve = typeof WeakMap == "function" ? WeakMap : Map;
    Be = new Ve();
  }
  function Ne(A, te) {
    if (!A || at)
      return "";
    {
      var ce = Be.get(A);
      if (ce !== void 0)
        return ce;
    }
    var be;
    at = !0;
    var Xe = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var lt;
    lt = jt.current, jt.current = null, Rt();
    try {
      if (te) {
        var Ge = function() {
          throw Error();
        };
        if (Object.defineProperty(Ge.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(Ge, []);
          } catch (lr) {
            be = lr;
          }
          Reflect.construct(A, [], Ge);
        } else {
          try {
            Ge.call();
          } catch (lr) {
            be = lr;
          }
          A.call(Ge.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (lr) {
          be = lr;
        }
        A();
      }
    } catch (lr) {
      if (lr && be && typeof lr.stack == "string") {
        for (var Te = lr.stack.split(`
`), pn = be.stack.split(`
`), Ft = Te.length - 1, Vt = pn.length - 1; Ft >= 1 && Vt >= 0 && Te[Ft] !== pn[Vt]; )
          Vt--;
        for (; Ft >= 1 && Vt >= 0; Ft--, Vt--)
          if (Te[Ft] !== pn[Vt]) {
            if (Ft !== 1 || Vt !== 1)
              do
                if (Ft--, Vt--, Vt < 0 || Te[Ft] !== pn[Vt]) {
                  var Bn = `
` + Te[Ft].replace(" at new ", " at ");
                  return A.displayName && Bn.includes("<anonymous>") && (Bn = Bn.replace("<anonymous>", A.displayName)), typeof A == "function" && Be.set(A, Bn), Bn;
                }
              while (Ft >= 1 && Vt >= 0);
            break;
          }
      }
    } finally {
      at = !1, jt.current = lt, Dt(), Error.prepareStackTrace = Xe;
    }
    var fa = A ? A.displayName || A.name : "", Bo = fa ? Fe(fa) : "";
    return typeof A == "function" && Be.set(A, Bo), Bo;
  }
  function Je(A, te, ce) {
    return Ne(A, !1);
  }
  function Ze(A) {
    var te = A.prototype;
    return !!(te && te.isReactComponent);
  }
  function qt(A, te, ce) {
    if (A == null)
      return "";
    if (typeof A == "function")
      return Ne(A, Ze(A));
    if (typeof A == "string")
      return Fe(A);
    switch (A) {
      case C:
        return Fe("Suspense");
      case $:
        return Fe("SuspenseList");
    }
    if (typeof A == "object")
      switch (A.$$typeof) {
        case y:
          return Je(A.render);
        case _:
          return qt(A.type, te, ce);
        case R: {
          var be = A, Xe = be._payload, lt = be._init;
          try {
            return qt(lt(Xe), te, ce);
          } catch {
          }
        }
      }
    return "";
  }
  var kt = Object.prototype.hasOwnProperty, bt = {}, dn = z.ReactDebugCurrentFrame;
  function Hn(A) {
    if (A) {
      var te = A._owner, ce = qt(A.type, A._source, te ? te.type : null);
      dn.setExtraStackFrame(ce);
    } else
      dn.setExtraStackFrame(null);
  }
  function Kt(A, te, ce, be, Xe) {
    {
      var lt = Function.call.bind(kt);
      for (var Ge in A)
        if (lt(A, Ge)) {
          var Te = void 0;
          try {
            if (typeof A[Ge] != "function") {
              var pn = Error((be || "React class") + ": " + ce + " type `" + Ge + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof A[Ge] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw pn.name = "Invariant Violation", pn;
            }
            Te = A[Ge](te, Ge, be, ce, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (Ft) {
            Te = Ft;
          }
          Te && !(Te instanceof Error) && (Hn(Xe), L("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", be || "React class", ce, Ge, typeof Te), Hn(null)), Te instanceof Error && !(Te.message in bt) && (bt[Te.message] = !0, Hn(Xe), L("Failed %s type: %s", ce, Te.message), Hn(null));
        }
    }
  }
  var or = Array.isArray;
  function zt(A) {
    return or(A);
  }
  function Zt(A) {
    {
      var te = typeof Symbol == "function" && Symbol.toStringTag, ce = te && A[Symbol.toStringTag] || A.constructor.name || "Object";
      return ce;
    }
  }
  function $n(A) {
    try {
      return $e(A), !1;
    } catch {
      return !0;
    }
  }
  function $e(A) {
    return "" + A;
  }
  function je(A) {
    if ($n(A))
      return L("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Zt(A)), $e(A);
  }
  var Se = z.ReactCurrentOwner, We = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, _n, rn, X;
  X = {};
  function ee(A) {
    if (kt.call(A, "ref")) {
      var te = Object.getOwnPropertyDescriptor(A, "ref").get;
      if (te && te.isReactWarning)
        return !1;
    }
    return A.ref !== void 0;
  }
  function Ae(A) {
    if (kt.call(A, "key")) {
      var te = Object.getOwnPropertyDescriptor(A, "key").get;
      if (te && te.isReactWarning)
        return !1;
    }
    return A.key !== void 0;
  }
  function st(A, te) {
    if (typeof A.ref == "string" && Se.current && te && Se.current.stateNode !== te) {
      var ce = re(Se.current.type);
      X[ce] || (L('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', re(Se.current.type), A.ref), X[ce] = !0);
    }
  }
  function ft(A, te) {
    {
      var ce = function() {
        _n || (_n = !0, L("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", te));
      };
      ce.isReactWarning = !0, Object.defineProperty(A, "key", {
        get: ce,
        configurable: !0
      });
    }
  }
  function fn(A, te) {
    {
      var ce = function() {
        rn || (rn = !0, L("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", te));
      };
      ce.isReactWarning = !0, Object.defineProperty(A, "ref", {
        get: ce,
        configurable: !0
      });
    }
  }
  var Jt = function(A, te, ce, be, Xe, lt, Ge) {
    var Te = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: a,
      // Built-in properties that belong on the element
      type: A,
      key: te,
      ref: ce,
      props: Ge,
      // Record the component responsible for creating this element.
      _owner: lt
    };
    return Te._store = {}, Object.defineProperty(Te._store, "validated", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: !1
    }), Object.defineProperty(Te, "_self", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: be
    }), Object.defineProperty(Te, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: Xe
    }), Object.freeze && (Object.freeze(Te.props), Object.freeze(Te)), Te;
  };
  function sr(A, te, ce, be, Xe) {
    {
      var lt, Ge = {}, Te = null, pn = null;
      ce !== void 0 && (je(ce), Te = "" + ce), Ae(te) && (je(te.key), Te = "" + te.key), ee(te) && (pn = te.ref, st(te, Xe));
      for (lt in te)
        kt.call(te, lt) && !We.hasOwnProperty(lt) && (Ge[lt] = te[lt]);
      if (A && A.defaultProps) {
        var Ft = A.defaultProps;
        for (lt in Ft)
          Ge[lt] === void 0 && (Ge[lt] = Ft[lt]);
      }
      if (Te || pn) {
        var Vt = typeof A == "function" ? A.displayName || A.name || "Unknown" : A;
        Te && ft(Ge, Vt), pn && fn(Ge, Vt);
      }
      return Jt(A, Te, pn, Xe, be, Se.current, Ge);
    }
  }
  var Ot = z.ReactCurrentOwner, gr = z.ReactDebugCurrentFrame;
  function Pt(A) {
    if (A) {
      var te = A._owner, ce = qt(A.type, A._source, te ? te.type : null);
      gr.setExtraStackFrame(ce);
    } else
      gr.setExtraStackFrame(null);
  }
  var Ut;
  Ut = !1;
  function ua(A) {
    return typeof A == "object" && A !== null && A.$$typeof === a;
  }
  function Hr() {
    {
      if (Ot.current) {
        var A = re(Ot.current.type);
        if (A)
          return `

Check the render method of \`` + A + "`.";
      }
      return "";
    }
  }
  function Qi(A) {
    {
      if (A !== void 0) {
        var te = A.fileName.replace(/^.*[\\\/]/, ""), ce = A.lineNumber;
        return `

Check your code at ` + te + ":" + ce + ".";
      }
      return "";
    }
  }
  var Ho = {};
  function dl(A) {
    {
      var te = Hr();
      if (!te) {
        var ce = typeof A == "string" ? A : A.displayName || A.name;
        ce && (te = `

Check the top-level render call using <` + ce + ">.");
      }
      return te;
    }
  }
  function Ji(A, te) {
    {
      if (!A._store || A._store.validated || A.key != null)
        return;
      A._store.validated = !0;
      var ce = dl(te);
      if (Ho[ce])
        return;
      Ho[ce] = !0;
      var be = "";
      A && A._owner && A._owner !== Ot.current && (be = " It was passed a child from " + re(A._owner.type) + "."), Pt(A), L('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ce, be), Pt(null);
    }
  }
  function eo(A, te) {
    {
      if (typeof A != "object")
        return;
      if (zt(A))
        for (var ce = 0; ce < A.length; ce++) {
          var be = A[ce];
          ua(be) && Ji(be, te);
        }
      else if (ua(A))
        A._store && (A._store.validated = !0);
      else if (A) {
        var Xe = D(A);
        if (typeof Xe == "function" && Xe !== A.entries)
          for (var lt = Xe.call(A), Ge; !(Ge = lt.next()).done; )
            ua(Ge.value) && Ji(Ge.value, te);
      }
    }
  }
  function Oa(A) {
    {
      var te = A.type;
      if (te == null || typeof te == "string")
        return;
      var ce;
      if (typeof te == "function")
        ce = te.propTypes;
      else if (typeof te == "object" && (te.$$typeof === y || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      te.$$typeof === _))
        ce = te.propTypes;
      else
        return;
      if (ce) {
        var be = re(te);
        Kt(ce, A.props, "prop", be, A);
      } else if (te.PropTypes !== void 0 && !Ut) {
        Ut = !0;
        var Xe = re(te);
        L("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Xe || "Unknown");
      }
      typeof te.getDefaultProps == "function" && !te.getDefaultProps.isReactClassApproved && L("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function pi(A) {
    {
      for (var te = Object.keys(A.props), ce = 0; ce < te.length; ce++) {
        var be = te[ce];
        if (be !== "children" && be !== "key") {
          Pt(A), L("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", be), Pt(null);
          break;
        }
      }
      A.ref !== null && (Pt(A), L("Invalid attribute `ref` supplied to `React.Fragment`."), Pt(null));
    }
  }
  function Aa(A, te, ce, be, Xe, lt) {
    {
      var Ge = we(A);
      if (!Ge) {
        var Te = "";
        (A === void 0 || typeof A == "object" && A !== null && Object.keys(A).length === 0) && (Te += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var pn = Qi(Xe);
        pn ? Te += pn : Te += Hr();
        var Ft;
        A === null ? Ft = "null" : zt(A) ? Ft = "array" : A !== void 0 && A.$$typeof === a ? (Ft = "<" + (re(A.type) || "Unknown") + " />", Te = " Did you accidentally export a JSX literal instead of a component?") : Ft = typeof A, L("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Ft, Te);
      }
      var Vt = sr(A, te, ce, Xe, lt);
      if (Vt == null)
        return Vt;
      if (Ge) {
        var Bn = te.children;
        if (Bn !== void 0)
          if (be)
            if (zt(Bn)) {
              for (var fa = 0; fa < Bn.length; fa++)
                eo(Bn[fa], A);
              Object.freeze && Object.freeze(Bn);
            } else
              L("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            eo(Bn, A);
      }
      return A === l ? pi(Vt) : Oa(Vt), Vt;
    }
  }
  function ca(A, te, ce) {
    return Aa(A, te, ce, !0);
  }
  function Br(A, te, ce) {
    return Aa(A, te, ce, !1);
  }
  var da = Br, to = ca;
  Vf.Fragment = l, Vf.jsx = da, Vf.jsxs = to;
})();
p5.exports = Vf;
var b = p5.exports;
function v5(n) {
  var a, o, l = "";
  if (typeof n == "string" || typeof n == "number")
    l += n;
  else if (typeof n == "object")
    if (Array.isArray(n))
      for (a = 0; a < n.length; a++)
        n[a] && (o = v5(n[a])) && (l && (l += " "), l += o);
    else
      for (a in n)
        n[a] && (l && (l += " "), l += a);
  return l;
}
function mt() {
  for (var n, a, o = 0, l = ""; o < arguments.length; )
    (n = arguments[o++]) && (a = v5(n)) && (l && (l += " "), l += a);
  return l;
}
function nn(n, a, o, l) {
  Object.defineProperty(n, a, { get: o, set: l, enumerable: !0, configurable: !0 });
}
var m5 = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}, Eg = {}, Df = {}, Zs = m5.parcelRequire91fc;
Zs == null && (Zs = function(n) {
  if (n in Eg)
    return Eg[n].exports;
  if (n in Df) {
    var a = Df[n];
    delete Df[n];
    var o = { id: n, exports: {} };
    return Eg[n] = o, a.call(o.exports, o, o.exports), o.exports;
  }
  var l = new Error("Cannot find module '" + n + "'");
  throw l.code = "MODULE_NOT_FOUND", l;
}, Zs.register = function(a, o) {
  Df[a] = o;
}, m5.parcelRequire91fc = Zs);
var IR = Zs.register;
IR("lDZ5d", function(n, a) {
  (function(o, l) {
    var c = "1.0.37", p = "", d = "?", v = "function", y = "undefined", C = "object", $ = "string", _ = "major", R = "model", S = "name", k = "type", x = "vendor", D = "version", z = "architecture", L = "console", M = "mobile", V = "tablet", H = "smarttv", N = "wearable", P = "embedded", J = 500, me = "Amazon", we = "Apple", ae = "ASUS", de = "BlackBerry", re = "Browser", oe = "Chrome", pe = "Edge", se = "Firefox", le = "Google", Ue = "Huawei", Tt = "LG", gt = "Microsoft", Et = "Motorola", ot = "Opera", $t = "Samsung", Rt = "Sharp", Dt = "Sony", jt = "Xiaomi", Re = "Zebra", Fe = "Facebook", at = "Chromium OS", Be = "Mac OS", Ve = function($e, je) {
      var Se = {};
      for (var We in $e)
        je[We] && je[We].length % 2 === 0 ? Se[We] = je[We].concat($e[We]) : Se[We] = $e[We];
      return Se;
    }, Ne = function($e) {
      for (var je = {}, Se = 0; Se < $e.length; Se++)
        je[$e[Se].toUpperCase()] = $e[Se];
      return je;
    }, Je = function($e, je) {
      return typeof $e === $ ? Ze(je).indexOf(Ze($e)) !== -1 : !1;
    }, Ze = function($e) {
      return $e.toLowerCase();
    }, qt = function($e) {
      return typeof $e === $ ? $e.replace(/[^\d\.]/g, p).split(".")[0] : l;
    }, kt = function($e, je) {
      if (typeof $e === $)
        return $e = $e.replace(/^\s\s*/, p), typeof je === y ? $e : $e.substring(0, J);
    }, bt = function($e, je) {
      for (var Se = 0, We, _n, rn, X, ee, Ae; Se < je.length && !ee; ) {
        var st = je[Se], ft = je[Se + 1];
        for (We = _n = 0; We < st.length && !ee && st[We]; )
          if (ee = st[We++].exec($e), ee)
            for (rn = 0; rn < ft.length; rn++)
              Ae = ee[++_n], X = ft[rn], typeof X === C && X.length > 0 ? X.length === 2 ? typeof X[1] == v ? this[X[0]] = X[1].call(this, Ae) : this[X[0]] = X[1] : X.length === 3 ? typeof X[1] === v && !(X[1].exec && X[1].test) ? this[X[0]] = Ae ? X[1].call(this, Ae, X[2]) : l : this[X[0]] = Ae ? Ae.replace(X[1], X[2]) : l : X.length === 4 && (this[X[0]] = Ae ? X[3].call(this, Ae.replace(X[1], X[2])) : l) : this[X] = Ae || l;
        Se += 2;
      }
    }, dn = function($e, je) {
      for (var Se in je)
        if (typeof je[Se] === C && je[Se].length > 0) {
          for (var We = 0; We < je[Se].length; We++)
            if (Je(je[Se][We], $e))
              return Se === d ? l : Se;
        } else if (Je(je[Se], $e))
          return Se === d ? l : Se;
      return $e;
    }, Hn = {
      "1.0": "/8",
      "1.2": "/1",
      "1.3": "/3",
      "2.0": "/412",
      "2.0.2": "/416",
      "2.0.3": "/417",
      "2.0.4": "/419",
      "?": "/"
    }, Kt = {
      ME: "4.90",
      "NT 3.11": "NT3.51",
      "NT 4.0": "NT4.0",
      2e3: "NT 5.0",
      XP: [
        "NT 5.1",
        "NT 5.2"
      ],
      Vista: "NT 6.0",
      7: "NT 6.1",
      8: "NT 6.2",
      "8.1": "NT 6.3",
      10: [
        "NT 6.4",
        "NT 10.0"
      ],
      RT: "ARM"
    }, or = {
      browser: [
        [
          /\b(?:crmo|crios)\/([\w\.]+)/i
          // Chrome for Android/iOS
        ],
        [
          D,
          [
            S,
            "Chrome"
          ]
        ],
        [
          /edg(?:e|ios|a)?\/([\w\.]+)/i
          // Microsoft Edge
        ],
        [
          D,
          [
            S,
            "Edge"
          ]
        ],
        [
          // Presto based
          /(opera mini)\/([-\w\.]+)/i,
          /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
          /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
          // Opera
        ],
        [
          S,
          D
        ],
        [
          /opios[\/ ]+([\w\.]+)/i
          // Opera mini on iphone >= 8.0
        ],
        [
          D,
          [
            S,
            ot + " Mini"
          ]
        ],
        [
          /\bopr\/([\w\.]+)/i
          // Opera Webkit
        ],
        [
          D,
          [
            S,
            ot
          ]
        ],
        [
          // Mixed
          /\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i
          // Baidu
        ],
        [
          D,
          [
            S,
            "Baidu"
          ]
        ],
        [
          /(kindle)\/([\w\.]+)/i,
          /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
          // Trident based
          /(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,
          /(?:ms|\()(ie) ([\w\.]+)/i,
          // Webkit/KHTML based                                               // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
          /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
          // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ
          /(heytap|ovi)browser\/([\d\.]+)/i,
          /(weibo)__([\d\.]+)/i
          // Weibo
        ],
        [
          S,
          D
        ],
        [
          /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
          // UCBrowser
        ],
        [
          D,
          [
            S,
            "UC" + re
          ]
        ],
        [
          /microm.+\bqbcore\/([\w\.]+)/i,
          /\bqbcore\/([\w\.]+).+microm/i,
          /micromessenger\/([\w\.]+)/i
          // WeChat
        ],
        [
          D,
          [
            S,
            "WeChat"
          ]
        ],
        [
          /konqueror\/([\w\.]+)/i
          // Konqueror
        ],
        [
          D,
          [
            S,
            "Konqueror"
          ]
        ],
        [
          /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
          // IE11
        ],
        [
          D,
          [
            S,
            "IE"
          ]
        ],
        [
          /ya(?:search)?browser\/([\w\.]+)/i
          // Yandex
        ],
        [
          D,
          [
            S,
            "Yandex"
          ]
        ],
        [
          /slbrowser\/([\w\.]+)/i
          // Smart Lenovo Browser
        ],
        [
          D,
          [
            S,
            "Smart Lenovo " + re
          ]
        ],
        [
          /(avast|avg)\/([\w\.]+)/i
          // Avast/AVG Secure Browser
        ],
        [
          [
            S,
            /(.+)/,
            "$1 Secure " + re
          ],
          D
        ],
        [
          /\bfocus\/([\w\.]+)/i
          // Firefox Focus
        ],
        [
          D,
          [
            S,
            se + " Focus"
          ]
        ],
        [
          /\bopt\/([\w\.]+)/i
          // Opera Touch
        ],
        [
          D,
          [
            S,
            ot + " Touch"
          ]
        ],
        [
          /coc_coc\w+\/([\w\.]+)/i
          // Coc Coc Browser
        ],
        [
          D,
          [
            S,
            "Coc Coc"
          ]
        ],
        [
          /dolfin\/([\w\.]+)/i
          // Dolphin
        ],
        [
          D,
          [
            S,
            "Dolphin"
          ]
        ],
        [
          /coast\/([\w\.]+)/i
          // Opera Coast
        ],
        [
          D,
          [
            S,
            ot + " Coast"
          ]
        ],
        [
          /miuibrowser\/([\w\.]+)/i
          // MIUI Browser
        ],
        [
          D,
          [
            S,
            "MIUI " + re
          ]
        ],
        [
          /fxios\/([-\w\.]+)/i
          // Firefox for iOS
        ],
        [
          D,
          [
            S,
            se
          ]
        ],
        [
          /\bqihu|(qi?ho?o?|360)browser/i
          // 360
        ],
        [
          [
            S,
            "360 " + re
          ]
        ],
        [
          /(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i
        ],
        [
          [
            S,
            /(.+)/,
            "$1 " + re
          ],
          D
        ],
        [
          /samsungbrowser\/([\w\.]+)/i
          // Samsung Internet
        ],
        [
          D,
          [
            S,
            $t + " Internet"
          ]
        ],
        [
          /(comodo_dragon)\/([\w\.]+)/i
          // Comodo Dragon
        ],
        [
          [
            S,
            /_/g,
            " "
          ],
          D
        ],
        [
          /metasr[\/ ]?([\d\.]+)/i
          // Sogou Explorer
        ],
        [
          D,
          [
            S,
            "Sogou Explorer"
          ]
        ],
        [
          /(sogou)mo\w+\/([\d\.]+)/i
          // Sogou Mobile
        ],
        [
          [
            S,
            "Sogou Mobile"
          ],
          D
        ],
        [
          /(electron)\/([\w\.]+) safari/i,
          /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
          /m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i
          // QQBrowser/2345 Browser
        ],
        [
          S,
          D
        ],
        [
          /(lbbrowser)/i,
          /\[(linkedin)app\]/i
          // LinkedIn App for iOS & Android
        ],
        [
          S
        ],
        [
          // WebView
          /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
          // Facebook App for iOS & Android
        ],
        [
          [
            S,
            Fe
          ],
          D
        ],
        [
          /(Klarna)\/([\w\.]+)/i,
          /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
          /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
          /safari (line)\/([\w\.]+)/i,
          /\b(line)\/([\w\.]+)\/iab/i,
          /(alipay)client\/([\w\.]+)/i,
          /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i
          // Chromium/Instagram/Snapchat
        ],
        [
          S,
          D
        ],
        [
          /\bgsa\/([\w\.]+) .*safari\//i
          // Google Search Appliance on iOS
        ],
        [
          D,
          [
            S,
            "GSA"
          ]
        ],
        [
          /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i
          // TikTok
        ],
        [
          D,
          [
            S,
            "TikTok"
          ]
        ],
        [
          /headlesschrome(?:\/([\w\.]+)| )/i
          // Chrome Headless
        ],
        [
          D,
          [
            S,
            oe + " Headless"
          ]
        ],
        [
          / wv\).+(chrome)\/([\w\.]+)/i
          // Chrome WebView
        ],
        [
          [
            S,
            oe + " WebView"
          ],
          D
        ],
        [
          /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
          // Android Browser
        ],
        [
          D,
          [
            S,
            "Android " + re
          ]
        ],
        [
          /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
          // Chrome/OmniWeb/Arora/Tizen/Nokia
        ],
        [
          S,
          D
        ],
        [
          /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i
          // Mobile Safari
        ],
        [
          D,
          [
            S,
            "Mobile Safari"
          ]
        ],
        [
          /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i
          // Safari & Safari Mobile
        ],
        [
          D,
          S
        ],
        [
          /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
          // Safari < 3.0
        ],
        [
          S,
          [
            D,
            dn,
            Hn
          ]
        ],
        [
          /(webkit|khtml)\/([\w\.]+)/i
        ],
        [
          S,
          D
        ],
        [
          // Gecko based
          /(navigator|netscape\d?)\/([-\w\.]+)/i
          // Netscape
        ],
        [
          [
            S,
            "Netscape"
          ],
          D
        ],
        [
          /mobile vr; rv:([\w\.]+)\).+firefox/i
          // Firefox Reality
        ],
        [
          D,
          [
            S,
            se + " Reality"
          ]
        ],
        [
          /ekiohf.+(flow)\/([\w\.]+)/i,
          /(swiftfox)/i,
          /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
          // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror/Klar
          /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
          // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
          /(firefox)\/([\w\.]+)/i,
          /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
          // Other
          /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
          // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir/Obigo/Mosaic/Go/ICE/UP.Browser
          /(links) \(([\w\.]+)/i,
          /panasonic;(viera)/i
          // Panasonic Viera
        ],
        [
          S,
          D
        ],
        [
          /(cobalt)\/([\w\.]+)/i
          // Cobalt
        ],
        [
          S,
          [
            D,
            /master.|lts./,
            ""
          ]
        ]
      ],
      cpu: [
        [
          /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i
          // AMD64 (x64)
        ],
        [
          [
            z,
            "amd64"
          ]
        ],
        [
          /(ia32(?=;))/i
          // IA32 (quicktime)
        ],
        [
          [
            z,
            Ze
          ]
        ],
        [
          /((?:i[346]|x)86)[;\)]/i
          // IA32 (x86)
        ],
        [
          [
            z,
            "ia32"
          ]
        ],
        [
          /\b(aarch64|arm(v?8e?l?|_?64))\b/i
          // ARM64
        ],
        [
          [
            z,
            "arm64"
          ]
        ],
        [
          /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
          // ARMHF
        ],
        [
          [
            z,
            "armhf"
          ]
        ],
        [
          // PocketPC mistakenly identified as PowerPC
          /windows (ce|mobile); ppc;/i
        ],
        [
          [
            z,
            "arm"
          ]
        ],
        [
          /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i
          // PowerPC
        ],
        [
          [
            z,
            /ower/,
            p,
            Ze
          ]
        ],
        [
          /(sun4\w)[;\)]/i
          // SPARC
        ],
        [
          [
            z,
            "sparc"
          ]
        ],
        [
          /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
        ],
        [
          [
            z,
            Ze
          ]
        ]
      ],
      device: [
        [
          //////////////////////////
          // MOBILES & TABLETS
          /////////////////////////
          // Samsung
          /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
        ],
        [
          R,
          [
            x,
            $t
          ],
          [
            k,
            V
          ]
        ],
        [
          /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
          /samsung[- ]([-\w]+)/i,
          /sec-(sgh\w+)/i
        ],
        [
          R,
          [
            x,
            $t
          ],
          [
            k,
            M
          ]
        ],
        [
          // Apple
          /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i
          // iPod/iPhone
        ],
        [
          R,
          [
            x,
            we
          ],
          [
            k,
            M
          ]
        ],
        [
          /\((ipad);[-\w\),; ]+apple/i,
          /applecoremedia\/[\w\.]+ \((ipad)/i,
          /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
        ],
        [
          R,
          [
            x,
            we
          ],
          [
            k,
            V
          ]
        ],
        [
          /(macintosh);/i
        ],
        [
          R,
          [
            x,
            we
          ]
        ],
        [
          // Sharp
          /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
        ],
        [
          R,
          [
            x,
            Rt
          ],
          [
            k,
            M
          ]
        ],
        [
          // Huawei
          /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
        ],
        [
          R,
          [
            x,
            Ue
          ],
          [
            k,
            V
          ]
        ],
        [
          /(?:huawei|honor)([-\w ]+)[;\)]/i,
          /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
        ],
        [
          R,
          [
            x,
            Ue
          ],
          [
            k,
            M
          ]
        ],
        [
          // Xiaomi
          /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
          /\b; (\w+) build\/hm\1/i,
          /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
          /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
          /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,
          /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i
          // Xiaomi Mi
        ],
        [
          [
            R,
            /_/g,
            " "
          ],
          [
            x,
            jt
          ],
          [
            k,
            M
          ]
        ],
        [
          /oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,
          /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i
          // Mi Pad tablets
        ],
        [
          [
            R,
            /_/g,
            " "
          ],
          [
            x,
            jt
          ],
          [
            k,
            V
          ]
        ],
        [
          // OPPO
          /; (\w+) bui.+ oppo/i,
          /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
        ],
        [
          R,
          [
            x,
            "OPPO"
          ],
          [
            k,
            M
          ]
        ],
        [
          // Vivo
          /vivo (\w+)(?: bui|\))/i,
          /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
        ],
        [
          R,
          [
            x,
            "Vivo"
          ],
          [
            k,
            M
          ]
        ],
        [
          // Realme
          /\b(rmx[1-3]\d{3})(?: bui|;|\))/i
        ],
        [
          R,
          [
            x,
            "Realme"
          ],
          [
            k,
            M
          ]
        ],
        [
          // Motorola
          /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
          /\bmot(?:orola)?[- ](\w*)/i,
          /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
        ],
        [
          R,
          [
            x,
            Et
          ],
          [
            k,
            M
          ]
        ],
        [
          /\b(mz60\d|xoom[2 ]{0,2}) build\//i
        ],
        [
          R,
          [
            x,
            Et
          ],
          [
            k,
            V
          ]
        ],
        [
          // LG
          /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
        ],
        [
          R,
          [
            x,
            Tt
          ],
          [
            k,
            V
          ]
        ],
        [
          /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
          /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
          /\blg-?([\d\w]+) bui/i
        ],
        [
          R,
          [
            x,
            Tt
          ],
          [
            k,
            M
          ]
        ],
        [
          // Lenovo
          /(ideatab[-\w ]+)/i,
          /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
        ],
        [
          R,
          [
            x,
            "Lenovo"
          ],
          [
            k,
            V
          ]
        ],
        [
          // Nokia
          /(?:maemo|nokia).*(n900|lumia \d+)/i,
          /nokia[-_ ]?([-\w\.]*)/i
        ],
        [
          [
            R,
            /_/g,
            " "
          ],
          [
            x,
            "Nokia"
          ],
          [
            k,
            M
          ]
        ],
        [
          // Google
          /(pixel c)\b/i
          // Google Pixel C
        ],
        [
          R,
          [
            x,
            le
          ],
          [
            k,
            V
          ]
        ],
        [
          /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
          // Google Pixel
        ],
        [
          R,
          [
            x,
            le
          ],
          [
            k,
            M
          ]
        ],
        [
          // Sony
          /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
        ],
        [
          R,
          [
            x,
            Dt
          ],
          [
            k,
            M
          ]
        ],
        [
          /sony tablet [ps]/i,
          /\b(?:sony)?sgp\w+(?: bui|\))/i
        ],
        [
          [
            R,
            "Xperia Tablet"
          ],
          [
            x,
            Dt
          ],
          [
            k,
            V
          ]
        ],
        [
          // OnePlus
          / (kb2005|in20[12]5|be20[12][59])\b/i,
          /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
        ],
        [
          R,
          [
            x,
            "OnePlus"
          ],
          [
            k,
            M
          ]
        ],
        [
          // Amazon
          /(alexa)webm/i,
          /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
          /(kf[a-z]+)( bui|\)).+silk\//i
          // Kindle Fire HD
        ],
        [
          R,
          [
            x,
            me
          ],
          [
            k,
            V
          ]
        ],
        [
          /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
          // Fire Phone
        ],
        [
          [
            R,
            /(.+)/g,
            "Fire Phone $1"
          ],
          [
            x,
            me
          ],
          [
            k,
            M
          ]
        ],
        [
          // BlackBerry
          /(playbook);[-\w\),; ]+(rim)/i
          // BlackBerry PlayBook
        ],
        [
          R,
          x,
          [
            k,
            V
          ]
        ],
        [
          /\b((?:bb[a-f]|st[hv])100-\d)/i,
          /\(bb10; (\w+)/i
          // BlackBerry 10
        ],
        [
          R,
          [
            x,
            de
          ],
          [
            k,
            M
          ]
        ],
        [
          // Asus
          /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
        ],
        [
          R,
          [
            x,
            ae
          ],
          [
            k,
            V
          ]
        ],
        [
          / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
        ],
        [
          R,
          [
            x,
            ae
          ],
          [
            k,
            M
          ]
        ],
        [
          // HTC
          /(nexus 9)/i
          // HTC Nexus 9
        ],
        [
          R,
          [
            x,
            "HTC"
          ],
          [
            k,
            V
          ]
        ],
        [
          /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
          // ZTE
          /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
          /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
          // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
        ],
        [
          x,
          [
            R,
            /_/g,
            " "
          ],
          [
            k,
            M
          ]
        ],
        [
          // Acer
          /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
        ],
        [
          R,
          [
            x,
            "Acer"
          ],
          [
            k,
            V
          ]
        ],
        [
          // Meizu
          /droid.+; (m[1-5] note) bui/i,
          /\bmz-([-\w]{2,})/i
        ],
        [
          R,
          [
            x,
            "Meizu"
          ],
          [
            k,
            M
          ]
        ],
        [
          // Ulefone
          /; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i
        ],
        [
          R,
          [
            x,
            "Ulefone"
          ],
          [
            k,
            M
          ]
        ],
        [
          // MIXED
          /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,
          // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
          /(hp) ([\w ]+\w)/i,
          /(asus)-?(\w+)/i,
          /(microsoft); (lumia[\w ]+)/i,
          /(lenovo)[-_ ]?([-\w]+)/i,
          /(jolla)/i,
          /(oppo) ?([\w ]+) bui/i
          // OPPO
        ],
        [
          x,
          R,
          [
            k,
            M
          ]
        ],
        [
          /(kobo)\s(ereader|touch)/i,
          /(archos) (gamepad2?)/i,
          /(hp).+(touchpad(?!.+tablet)|tablet)/i,
          /(kindle)\/([\w\.]+)/i,
          /(nook)[\w ]+build\/(\w+)/i,
          /(dell) (strea[kpr\d ]*[\dko])/i,
          /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
          /(trinity)[- ]*(t\d{3}) bui/i,
          /(gigaset)[- ]+(q\w{1,9}) bui/i,
          /(vodafone) ([\w ]+)(?:\)| bui)/i
          // Vodafone
        ],
        [
          x,
          R,
          [
            k,
            V
          ]
        ],
        [
          /(surface duo)/i
          // Surface Duo
        ],
        [
          R,
          [
            x,
            gt
          ],
          [
            k,
            V
          ]
        ],
        [
          /droid [\d\.]+; (fp\du?)(?: b|\))/i
          // Fairphone
        ],
        [
          R,
          [
            x,
            "Fairphone"
          ],
          [
            k,
            M
          ]
        ],
        [
          /(u304aa)/i
          // AT&T
        ],
        [
          R,
          [
            x,
            "AT&T"
          ],
          [
            k,
            M
          ]
        ],
        [
          /\bsie-(\w*)/i
          // Siemens
        ],
        [
          R,
          [
            x,
            "Siemens"
          ],
          [
            k,
            M
          ]
        ],
        [
          /\b(rct\w+) b/i
          // RCA Tablets
        ],
        [
          R,
          [
            x,
            "RCA"
          ],
          [
            k,
            V
          ]
        ],
        [
          /\b(venue[\d ]{2,7}) b/i
          // Dell Venue Tablets
        ],
        [
          R,
          [
            x,
            "Dell"
          ],
          [
            k,
            V
          ]
        ],
        [
          /\b(q(?:mv|ta)\w+) b/i
          // Verizon Tablet
        ],
        [
          R,
          [
            x,
            "Verizon"
          ],
          [
            k,
            V
          ]
        ],
        [
          /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i
          // Barnes & Noble Tablet
        ],
        [
          R,
          [
            x,
            "Barnes & Noble"
          ],
          [
            k,
            V
          ]
        ],
        [
          /\b(tm\d{3}\w+) b/i
        ],
        [
          R,
          [
            x,
            "NuVision"
          ],
          [
            k,
            V
          ]
        ],
        [
          /\b(k88) b/i
          // ZTE K Series Tablet
        ],
        [
          R,
          [
            x,
            "ZTE"
          ],
          [
            k,
            V
          ]
        ],
        [
          /\b(nx\d{3}j) b/i
          // ZTE Nubia
        ],
        [
          R,
          [
            x,
            "ZTE"
          ],
          [
            k,
            M
          ]
        ],
        [
          /\b(gen\d{3}) b.+49h/i
          // Swiss GEN Mobile
        ],
        [
          R,
          [
            x,
            "Swiss"
          ],
          [
            k,
            M
          ]
        ],
        [
          /\b(zur\d{3}) b/i
          // Swiss ZUR Tablet
        ],
        [
          R,
          [
            x,
            "Swiss"
          ],
          [
            k,
            V
          ]
        ],
        [
          /\b((zeki)?tb.*\b) b/i
          // Zeki Tablets
        ],
        [
          R,
          [
            x,
            "Zeki"
          ],
          [
            k,
            V
          ]
        ],
        [
          /\b([yr]\d{2}) b/i,
          /\b(dragon[- ]+touch |dt)(\w{5}) b/i
          // Dragon Touch Tablet
        ],
        [
          [
            x,
            "Dragon Touch"
          ],
          R,
          [
            k,
            V
          ]
        ],
        [
          /\b(ns-?\w{0,9}) b/i
          // Insignia Tablets
        ],
        [
          R,
          [
            x,
            "Insignia"
          ],
          [
            k,
            V
          ]
        ],
        [
          /\b((nxa|next)-?\w{0,9}) b/i
          // NextBook Tablets
        ],
        [
          R,
          [
            x,
            "NextBook"
          ],
          [
            k,
            V
          ]
        ],
        [
          /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i
          // Voice Xtreme Phones
        ],
        [
          [
            x,
            "Voice"
          ],
          R,
          [
            k,
            M
          ]
        ],
        [
          /\b(lvtel\-)?(v1[12]) b/i
          // LvTel Phones
        ],
        [
          [
            x,
            "LvTel"
          ],
          R,
          [
            k,
            M
          ]
        ],
        [
          /\b(ph-1) /i
          // Essential PH-1
        ],
        [
          R,
          [
            x,
            "Essential"
          ],
          [
            k,
            M
          ]
        ],
        [
          /\b(v(100md|700na|7011|917g).*\b) b/i
          // Envizen Tablets
        ],
        [
          R,
          [
            x,
            "Envizen"
          ],
          [
            k,
            V
          ]
        ],
        [
          /\b(trio[-\w\. ]+) b/i
          // MachSpeed Tablets
        ],
        [
          R,
          [
            x,
            "MachSpeed"
          ],
          [
            k,
            V
          ]
        ],
        [
          /\btu_(1491) b/i
          // Rotor Tablets
        ],
        [
          R,
          [
            x,
            "Rotor"
          ],
          [
            k,
            V
          ]
        ],
        [
          /(shield[\w ]+) b/i
          // Nvidia Shield Tablets
        ],
        [
          R,
          [
            x,
            "Nvidia"
          ],
          [
            k,
            V
          ]
        ],
        [
          /(sprint) (\w+)/i
          // Sprint Phones
        ],
        [
          x,
          R,
          [
            k,
            M
          ]
        ],
        [
          /(kin\.[onetw]{3})/i
          // Microsoft Kin
        ],
        [
          [
            R,
            /\./g,
            " "
          ],
          [
            x,
            gt
          ],
          [
            k,
            M
          ]
        ],
        [
          /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
          // Zebra
        ],
        [
          R,
          [
            x,
            Re
          ],
          [
            k,
            V
          ]
        ],
        [
          /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
        ],
        [
          R,
          [
            x,
            Re
          ],
          [
            k,
            M
          ]
        ],
        [
          ///////////////////
          // SMARTTVS
          ///////////////////
          /smart-tv.+(samsung)/i
          // Samsung
        ],
        [
          x,
          [
            k,
            H
          ]
        ],
        [
          /hbbtv.+maple;(\d+)/i
        ],
        [
          [
            R,
            /^/,
            "SmartTV"
          ],
          [
            x,
            $t
          ],
          [
            k,
            H
          ]
        ],
        [
          /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
          // LG SmartTV
        ],
        [
          [
            x,
            Tt
          ],
          [
            k,
            H
          ]
        ],
        [
          /(apple) ?tv/i
          // Apple TV
        ],
        [
          x,
          [
            R,
            we + " TV"
          ],
          [
            k,
            H
          ]
        ],
        [
          /crkey/i
          // Google Chromecast
        ],
        [
          [
            R,
            oe + "cast"
          ],
          [
            x,
            le
          ],
          [
            k,
            H
          ]
        ],
        [
          /droid.+aft(\w+)( bui|\))/i
          // Fire TV
        ],
        [
          R,
          [
            x,
            me
          ],
          [
            k,
            H
          ]
        ],
        [
          /\(dtv[\);].+(aquos)/i,
          /(aquos-tv[\w ]+)\)/i
          // Sharp
        ],
        [
          R,
          [
            x,
            Rt
          ],
          [
            k,
            H
          ]
        ],
        [
          /(bravia[\w ]+)( bui|\))/i
          // Sony
        ],
        [
          R,
          [
            x,
            Dt
          ],
          [
            k,
            H
          ]
        ],
        [
          /(mitv-\w{5}) bui/i
          // Xiaomi
        ],
        [
          R,
          [
            x,
            jt
          ],
          [
            k,
            H
          ]
        ],
        [
          /Hbbtv.*(technisat) (.*);/i
          // TechniSAT
        ],
        [
          x,
          R,
          [
            k,
            H
          ]
        ],
        [
          /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
          /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i
          // HbbTV devices
        ],
        [
          [
            x,
            kt
          ],
          [
            R,
            kt
          ],
          [
            k,
            H
          ]
        ],
        [
          /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
          // SmartTV from Unidentified Vendors
        ],
        [
          [
            k,
            H
          ]
        ],
        [
          ///////////////////
          // CONSOLES
          ///////////////////
          /(ouya)/i,
          /(nintendo) ([wids3utch]+)/i
          // Nintendo
        ],
        [
          x,
          R,
          [
            k,
            L
          ]
        ],
        [
          /droid.+; (shield) bui/i
          // Nvidia
        ],
        [
          R,
          [
            x,
            "Nvidia"
          ],
          [
            k,
            L
          ]
        ],
        [
          /(playstation [345portablevi]+)/i
          // Playstation
        ],
        [
          R,
          [
            x,
            Dt
          ],
          [
            k,
            L
          ]
        ],
        [
          /\b(xbox(?: one)?(?!; xbox))[\); ]/i
          // Microsoft Xbox
        ],
        [
          R,
          [
            x,
            gt
          ],
          [
            k,
            L
          ]
        ],
        [
          ///////////////////
          // WEARABLES
          ///////////////////
          /((pebble))app/i
          // Pebble
        ],
        [
          x,
          R,
          [
            k,
            N
          ]
        ],
        [
          /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i
          // Apple Watch
        ],
        [
          R,
          [
            x,
            we
          ],
          [
            k,
            N
          ]
        ],
        [
          /droid.+; (glass) \d/i
          // Google Glass
        ],
        [
          R,
          [
            x,
            le
          ],
          [
            k,
            N
          ]
        ],
        [
          /droid.+; (wt63?0{2,3})\)/i
        ],
        [
          R,
          [
            x,
            Re
          ],
          [
            k,
            N
          ]
        ],
        [
          /(quest( 2| pro)?)/i
          // Oculus Quest
        ],
        [
          R,
          [
            x,
            Fe
          ],
          [
            k,
            N
          ]
        ],
        [
          ///////////////////
          // EMBEDDED
          ///////////////////
          /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
          // Tesla
        ],
        [
          x,
          [
            k,
            P
          ]
        ],
        [
          /(aeobc)\b/i
          // Echo Dot
        ],
        [
          R,
          [
            x,
            me
          ],
          [
            k,
            P
          ]
        ],
        [
          ////////////////////
          // MIXED (GENERIC)
          ///////////////////
          /droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i
          // Android Phones from Unidentified Vendors
        ],
        [
          R,
          [
            k,
            M
          ]
        ],
        [
          /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
          // Android Tablets from Unidentified Vendors
        ],
        [
          R,
          [
            k,
            V
          ]
        ],
        [
          /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
          // Unidentifiable Tablet
        ],
        [
          [
            k,
            V
          ]
        ],
        [
          /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i
          // Unidentifiable Mobile
        ],
        [
          [
            k,
            M
          ]
        ],
        [
          /(android[-\w\. ]{0,9});.+buil/i
          // Generic Android Device
        ],
        [
          R,
          [
            x,
            "Generic"
          ]
        ]
      ],
      engine: [
        [
          /windows.+ edge\/([\w\.]+)/i
          // EdgeHTML
        ],
        [
          D,
          [
            S,
            pe + "HTML"
          ]
        ],
        [
          /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
          // Blink
        ],
        [
          D,
          [
            S,
            "Blink"
          ]
        ],
        [
          /(presto)\/([\w\.]+)/i,
          /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
          /ekioh(flow)\/([\w\.]+)/i,
          /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
          /(icab)[\/ ]([23]\.[\d\.]+)/i,
          /\b(libweb)/i
        ],
        [
          S,
          D
        ],
        [
          /rv\:([\w\.]{1,9})\b.+(gecko)/i
          // Gecko
        ],
        [
          D,
          S
        ]
      ],
      os: [
        [
          // Windows
          /microsoft (windows) (vista|xp)/i
          // Windows (iTunes)
        ],
        [
          S,
          D
        ],
        [
          /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i
          // Windows Phone
        ],
        [
          S,
          [
            D,
            dn,
            Kt
          ]
        ],
        [
          /windows nt 6\.2; (arm)/i,
          /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
          /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i
        ],
        [
          [
            D,
            dn,
            Kt
          ],
          [
            S,
            "Windows"
          ]
        ],
        [
          // iOS/macOS
          /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
          /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
          /cfnetwork\/.+darwin/i
        ],
        [
          [
            D,
            /_/g,
            "."
          ],
          [
            S,
            "iOS"
          ]
        ],
        [
          /(mac os x) ?([\w\. ]*)/i,
          /(macintosh|mac_powerpc\b)(?!.+haiku)/i
          // Mac OS
        ],
        [
          [
            S,
            Be
          ],
          [
            D,
            /_/g,
            "."
          ]
        ],
        [
          // Mobile OSes
          /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i
          // Android-x86/HarmonyOS
        ],
        [
          D,
          S
        ],
        [
          /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
          /(blackberry)\w*\/([\w\.]*)/i,
          /(tizen|kaios)[\/ ]([\w\.]+)/i,
          /\((series40);/i
          // Series 40
        ],
        [
          S,
          D
        ],
        [
          /\(bb(10);/i
          // BlackBerry 10
        ],
        [
          D,
          [
            S,
            de
          ]
        ],
        [
          /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i
          // Symbian
        ],
        [
          D,
          [
            S,
            "Symbian"
          ]
        ],
        [
          /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
          // Firefox OS
        ],
        [
          D,
          [
            S,
            se + " OS"
          ]
        ],
        [
          /web0s;.+rt(tv)/i,
          /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
          // WebOS
        ],
        [
          D,
          [
            S,
            "webOS"
          ]
        ],
        [
          /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i
          // watchOS
        ],
        [
          D,
          [
            S,
            "watchOS"
          ]
        ],
        [
          // Google Chromecast
          /crkey\/([\d\.]+)/i
          // Google Chromecast
        ],
        [
          D,
          [
            S,
            oe + "cast"
          ]
        ],
        [
          /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i
          // Chromium OS
        ],
        [
          [
            S,
            at
          ],
          D
        ],
        [
          // Smart TVs
          /panasonic;(viera)/i,
          /(netrange)mmh/i,
          /(nettv)\/(\d+\.[\w\.]+)/i,
          // Console
          /(nintendo|playstation) ([wids345portablevuch]+)/i,
          /(xbox); +xbox ([^\);]+)/i,
          // Other
          /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
          /(mint)[\/\(\) ]?(\w*)/i,
          /(mageia|vectorlinux)[; ]/i,
          /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
          // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
          /(hurd|linux) ?([\w\.]*)/i,
          /(gnu) ?([\w\.]*)/i,
          /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
          /(haiku) (\w+)/i
          // Haiku
        ],
        [
          S,
          D
        ],
        [
          /(sunos) ?([\w\.\d]*)/i
          // Solaris
        ],
        [
          [
            S,
            "Solaris"
          ],
          D
        ],
        [
          /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
          /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
          /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
          /(unix) ?([\w\.]*)/i
          // UNIX
        ],
        [
          S,
          D
        ]
      ]
    }, zt = function($e, je) {
      if (typeof $e === C && (je = $e, $e = l), !(this instanceof zt))
        return new zt($e, je).getResult();
      var Se = typeof o !== y && o.navigator ? o.navigator : l, We = $e || (Se && Se.userAgent ? Se.userAgent : p), _n = Se && Se.userAgentData ? Se.userAgentData : l, rn = je ? Ve(or, je) : or, X = Se && Se.userAgent == We;
      return this.getBrowser = function() {
        var ee = {};
        return ee[S] = l, ee[D] = l, bt.call(ee, We, rn.browser), ee[_] = qt(ee[D]), X && Se && Se.brave && typeof Se.brave.isBrave == v && (ee[S] = "Brave"), ee;
      }, this.getCPU = function() {
        var ee = {};
        return ee[z] = l, bt.call(ee, We, rn.cpu), ee;
      }, this.getDevice = function() {
        var ee = {};
        return ee[x] = l, ee[R] = l, ee[k] = l, bt.call(ee, We, rn.device), X && !ee[k] && _n && _n.mobile && (ee[k] = M), X && ee[R] == "Macintosh" && Se && typeof Se.standalone !== y && Se.maxTouchPoints && Se.maxTouchPoints > 2 && (ee[R] = "iPad", ee[k] = V), ee;
      }, this.getEngine = function() {
        var ee = {};
        return ee[S] = l, ee[D] = l, bt.call(ee, We, rn.engine), ee;
      }, this.getOS = function() {
        var ee = {};
        return ee[S] = l, ee[D] = l, bt.call(ee, We, rn.os), X && !ee[S] && _n && _n.platform != "Unknown" && (ee[S] = _n.platform.replace(/chrome os/i, at).replace(/macos/i, Be)), ee;
      }, this.getResult = function() {
        return {
          ua: this.getUA(),
          browser: this.getBrowser(),
          engine: this.getEngine(),
          os: this.getOS(),
          device: this.getDevice(),
          cpu: this.getCPU()
        };
      }, this.getUA = function() {
        return We;
      }, this.setUA = function(ee) {
        return We = typeof ee === $ && ee.length > J ? kt(ee, J) : ee, this;
      }, this.setUA(We), this;
    };
    zt.VERSION = c, zt.BROWSER = Ne([
      S,
      D,
      _
    ]), zt.CPU = Ne([
      z
    ]), zt.DEVICE = Ne([
      R,
      x,
      k,
      L,
      M,
      H,
      V,
      N,
      P
    ]), zt.ENGINE = zt.OS = Ne([
      S,
      D
    ]), typeof a !== y ? (n.exports && (a = n.exports = zt), a.UAParser = zt) : typeof define === v && define.amd ? define(function() {
      return zt;
    }) : typeof o !== y && (o.UAParser = zt);
    var Zt = typeof o !== y && (o.jQuery || o.Zepto);
    if (Zt && !Zt.ua) {
      var $n = new zt();
      Zt.ua = $n.getResult(), Zt.ua.get = function() {
        return $n.getUA();
      }, Zt.ua.set = function($e) {
        $n.setUA($e);
        var je = $n.getResult();
        for (var Se in je)
          Zt.ua[Se] = je[Se];
      };
    }
  })(typeof window == "object" ? window : this);
});
var fy = {};
fy = JSON.parse(`{"name":"@slashid/slashid","private":false,"publishConfig":{"access":"public"},"version":"3.20.0","description":"Client SDK for the /id platform","homepage":"https://slashid.dev","author":"SlashID","license":"MIT","main":"./dist/bundle/slashid.js","module":"./dist/esmodule/slashid.esm.js","esmodule":"./dist/esmodule/slashid.esm.js","commonjs":"./dist/commonjs/slashid.cjs.js","bundle":"./dist/bundle/slashid.js","types":"./dist/types/slashid.d.ts","exports":{".":{"require":"./dist/commonjs/slashid.cjs.js","import":"./dist/esmodule/slashid.esm.js","default":"./dist/commonjs/slashid.cjs.js","types":"./dist/types/slashid.d.ts"}},"targets":{"esmodule":{"source":"src/targets/package.ts","context":"browser","isLibrary":true,"outputFormat":"esmodule","engines":{"browsers":["and_chr >= 73","chrome >= 73","and_ff >= 67","android >= 114","edge >= 79","samsung >= 11.2","safari >= 13","ios_saf >= 13.1","opera >= 60","firefox >= 67","unreleased and_chr versions","unreleased chrome versions","unreleased and_ff versions","unreleased android versions","unreleased edge versions","unreleased samsung versions","unreleased safari versions","unreleased ios_saf versions","unreleased opera versions","unreleased firefox versions"]}},"commonjs":{"source":"src/targets/package.ts","context":"node","isLibrary":true,"outputFormat":"commonjs","engines":{"node":">= 12"}},"bundle":{"source":"src/targets/bundle.ts","context":"browser","outputFormat":"global","engines":{"browsers":["> 0.5%","last 2 versions","not dead"]}},"page":{"source":"static/sdk.html","context":"browser","engines":{"browsers":["and_chr >= 73","chrome >= 73","and_ff >= 67","android >= 114","edge >= 79","samsung >= 11.2","safari >= 13","ios_saf >= 13.1","opera >= 60","firefox >= 67","unreleased and_chr versions","unreleased chrome versions","unreleased and_ff versions","unreleased android versions","unreleased edge versions","unreleased samsung versions","unreleased safari versions","unreleased ios_saf versions","unreleased opera versions","unreleased firefox versions"]}},"types":{"source":"src/targets/package.ts"}},"files":["dist/*"],"keywords":["slashid","SlashID","auth","openid","authentication","jwt","browser"],"scripts":{"clean":"rm -rf dist docs","lint":"eslint ./src --ext .ts","format":"prettier --config .prettierrc.json 'src/**/*.ts' --write","test:ts":"tsc --project tsconfig.json --noEmit","test:unit":"jest","test:unit:watch":"jest --watch","test:unit:ci":"jest --ci","test:integration":"playwright test","build":"rm -rf dist && parcel build && cp compat/esmodule/package.json dist/esmodule","docs":"rm -rf docs && typedoc","dist":"npm run lint && npm run build","all":"npm run dist && npm run docs","serve:all":"parcel serve 'static/*.html' --port 8080","serve:example":"parcel serve static/index.html --port 8080","serve:jump":"parcel serve static/sdk.html --port 8080","serve:docs":"parcel serve docs/index.html --port 8081","push:docs":"aws s3 sync docs s3://slashiddoc/sdk/v$(node tools/version.js --major) && (aws cloudfront create-invalidation --distribution-id ETLBNGAAF97EN --paths \\"/*\\")","changeset":"changeset","prepublishOnly":"npm run all","publish:ci":"npm run build && changeset publish"},"devDependencies":{"@parcel/core":"2.12.0","@parcel/packager-ts":"2.12.0","@parcel/transformer-babel":"2.12.0","@parcel/transformer-js":"2.12.0","@parcel/transformer-json":"2.12.0","@parcel/transformer-react-refresh-wrap":"2.12.0","@parcel/transformer-typescript-types":"2.12.0","@playwright/test":"^1.25.0","@types/jest":"^28.1.7","@types/node":"~15.0.2","@types/qrcode":"^1.5.0","@types/ua-parser-js":"^0.7.39","@typescript-eslint/eslint-plugin":"^4.15.1","@typescript-eslint/parser":"^4.15.1","danger":"^11.2.6","eslint":"^7.20.0","eslint-config-prettier":"^8.5.0","eslint-plugin-prettier":"^4.2.1","isomorphic-fetch":"^3.0.0","jest":"^28.1.3","jest-environment-jsdom":"^28.1.3","jest-fetch-mock":"^3.0.3","parcel":"2.12.0","prettier":"^2.7.1","ts-jest":"^28.0.8","typedoc":"^0.23.00","typedoc-plugin-mdn-links":"^2.0.0","typedoc-plugin-missing-exports":"^1.0.0","typescript":"~4.7.0"},"dependencies":{"@changesets/cli":"^2.26.2","@types/uuid":"8.3.4","changeset":"^0.2.6","compare-versions":"^6.1.0","docdash":"^1.2.0","jwt-decode":"^3.1.2","qrcode":"^1.5.1","querystring-es3":"^0.2.1","regenerator-runtime":"^0.13.9","ua-parser-js":"^1.0.37","url":"^0.11.0","uuid":"8.3.2"}}`);
const [qR, zR, NR] = fy.version.split("."), Un = {
  major: qR,
  minor: zR,
  patch: NR,
  raw: fy.version
}, PR = "https://api.slashid.com".replace(/\/+$/, "");
class si {
  set config(a) {
    this.configuration = a;
  }
  get basePath() {
    return this.configuration.basePath != null ? this.configuration.basePath : PR;
  }
  get fetchApi() {
    return this.configuration.fetchApi;
  }
  get middleware() {
    return this.configuration.middleware || [];
  }
  get queryParamsStringify() {
    return this.configuration.queryParamsStringify || g5;
  }
  get username() {
    return this.configuration.username;
  }
  get password() {
    return this.configuration.password;
  }
  get apiKey() {
    const a = this.configuration.apiKey;
    if (a)
      return typeof a == "function" ? a : () => a;
  }
  get accessToken() {
    const a = this.configuration.accessToken;
    if (a)
      return typeof a == "function" ? a : async () => a;
  }
  get headers() {
    return this.configuration.headers;
  }
  get credentials() {
    return this.configuration.credentials;
  }
  constructor(a = {}) {
    this.configuration = a;
  }
}
const li = new si();
class Zi {
  withMiddleware(...a) {
    const o = this.clone();
    return o.middleware = o.middleware.concat(...a), o;
  }
  withPreMiddleware(...a) {
    const o = a.map((l) => ({
      pre: l
    }));
    return this.withMiddleware(...o);
  }
  withPostMiddleware(...a) {
    const o = a.map((l) => ({
      post: l
    }));
    return this.withMiddleware(...o);
  }
  /**
   * Check if the given MIME is a JSON MIME.
   * JSON MIME examples:
   *   application/json
   *   application/json; charset=UTF8
   *   APPLICATION/JSON
   *   application/vnd.company+json
   * @param mime - MIME (Multipurpose Internet Mail Extensions)
   * @return True if the given MIME is JSON, false otherwise.
   */
  isJsonMime(a) {
    return a ? Zi.jsonRegex.test(a) : !1;
  }
  async request(a, o) {
    const { url: l, init: c } = await this.createFetchParams(a, o), p = await this.fetchApi(l, c);
    if (p && p.status >= 200 && p.status < 300)
      return p;
    throw new VR(p, "Response returned an error code");
  }
  async createFetchParams(a, o) {
    let l = this.configuration.basePath + a.path;
    a.query !== void 0 && Object.keys(a.query).length !== 0 && (l += "?" + this.configuration.queryParamsStringify(a.query));
    const c = Object.assign({}, this.configuration.headers, a.headers);
    Object.keys(c).forEach((C) => c[C] === void 0 ? delete c[C] : {});
    const p = typeof o == "function" ? o : async () => o, d = {
      method: a.method,
      headers: c,
      body: a.body,
      credentials: this.configuration.credentials
    }, v = {
      ...d,
      ...await p({
        init: d,
        context: a
      })
    }, y = {
      ...v,
      body: FR(v.body) || v.body instanceof URLSearchParams || UR(v.body) ? v.body : JSON.stringify(v.body)
    };
    return {
      url: l,
      init: y
    };
  }
  /**
   * Create a shallow clone of `this` by constructing a new instance
   * and then shallow cloning data members.
   */
  clone() {
    const a = this.constructor, o = new a(this.configuration);
    return o.middleware = this.middleware.slice(), o;
  }
  constructor(a = li) {
    this.configuration = a, this.fetchApi = async (o, l) => {
      let c = {
        url: o,
        init: l
      };
      for (const d of this.middleware)
        d.pre && (c = await d.pre({
          fetch: this.fetchApi,
          ...c
        }) || c);
      let p;
      try {
        p = await (this.configuration.fetchApi || fetch)(c.url, c.init);
      } catch (d) {
        for (const v of this.middleware)
          v.onError && (p = await v.onError({
            fetch: this.fetchApi,
            url: c.url,
            init: c.init,
            error: d,
            response: p ? p.clone() : void 0
          }) || p);
        if (p === void 0)
          throw d instanceof Error ? new HR(d, "The request failed and the interceptors did not return an alternative response") : d;
      }
      for (const d of this.middleware)
        d.post && (p = await d.post({
          fetch: this.fetchApi,
          url: c.url,
          init: c.init,
          response: p.clone()
        }) || p);
      return p;
    }, this.middleware = a.middleware;
  }
}
Zi.jsonRegex = new RegExp("^(:?application/json|[^;/ 	]+/[^;/ 	]+[+]json)[ 	]*(:?;.*)?$", "i");
function UR(n) {
  return typeof Blob < "u" && n instanceof Blob;
}
function FR(n) {
  return typeof FormData < "u" && n instanceof FormData;
}
class VR extends Error {
  constructor(a, o) {
    super(o), this.response = a, this.name = "ResponseError";
  }
}
class HR extends Error {
  constructor(a, o) {
    super(o), this.cause = a, this.name = "FetchError";
  }
}
class tn extends Error {
  constructor(a, o) {
    super(o), this.field = a, this.name = "RequiredError";
  }
}
const Rg = {
  csv: ",",
  ssv: " ",
  tsv: "	",
  pipes: "|"
};
function Ee(n, a) {
  const o = n[a];
  return o != null;
}
function g5(n, a = "") {
  return Object.keys(n).map((o) => y5(o, n[o], a)).filter((o) => o.length > 0).join("&");
}
function y5(n, a, o = "") {
  const l = o + (o.length ? `[${n}]` : n);
  if (a instanceof Array) {
    const c = a.map((p) => encodeURIComponent(String(p))).join(`&${encodeURIComponent(l)}=`);
    return `${encodeURIComponent(l)}=${c}`;
  }
  if (a instanceof Set) {
    const c = Array.from(a);
    return y5(n, c, o);
  }
  return a instanceof Date ? `${encodeURIComponent(l)}=${encodeURIComponent(a.toISOString())}` : a instanceof Object ? g5(a, l) : `${encodeURIComponent(l)}=${encodeURIComponent(String(a))}`;
}
class Sn {
  async value() {
    return this.transformer(await this.raw.json());
  }
  constructor(a, o = (l) => l) {
    this.raw = a, this.transformer = o;
  }
}
class Yf {
  async value() {
  }
  constructor(a) {
    this.raw = a;
  }
}
function BR(n) {
  return jR(n);
}
function jR(n, a) {
  return n == null ? n : {
    limit: n.limit,
    offset: n.offset,
    total_count: n.total_count
  };
}
function sa(n) {
  return GR(n);
}
function GR(n, a) {
  return n == null ? n : {
    pagination: Ee(n, "pagination") ? BR(n.pagination) : void 0
  };
}
function la(n) {
  return YR(n);
}
function YR(n, a) {
  return n == null ? n : {
    httpcode: Ee(n, "httpcode") ? n.httpcode : void 0,
    message: Ee(n, "message") ? n.message : void 0
  };
}
function kg(n) {
  return WR(n);
}
function WR(n, a) {
  return n == null ? n : {
    meta: Ee(n, "meta") ? sa(n.meta) : void 0,
    errors: Ee(n, "errors") ? n.errors.map(la) : void 0
  };
}
const mr = {
  Proxy: "proxy",
  WebauthnCreate: "webauthn_create",
  WebauthnGet: "webauthn_get",
  Nonce: "nonce",
  Otp: "otp",
  Oidc: "oidc",
  Saml: "saml",
  PasswordSet: "password_set",
  PasswordVerify: "password_verify",
  PasswordReset: "password_reset",
  TotpRegister: "totp_register",
  TotpVerify: "totp_verify"
};
function Fr(n) {
  return KR(n);
}
function KR(n, a) {
  return n;
}
function ZR(n) {
  if (n !== void 0)
    return n === null ? null : {
      challenge: n.challenge
    };
}
function XR(n) {
  if (n !== void 0)
    return n === null ? null : {
      challenge_id: n.challenge_id,
      challenge_type: n.challenge_type,
      data: ZR(n.data)
    };
}
function QR(n) {
  if (n !== void 0)
    return n === null ? null : {
      otp: n.otp
    };
}
function JR(n) {
  if (n !== void 0)
    return n === null ? null : {
      challenge_id: n.challenge_id,
      challenge_type: n.challenge_type,
      data: QR(n.data)
    };
}
function ek(n) {
  if (n !== void 0)
    return n === null ? null : {
      password: n.password
    };
}
function tk(n) {
  if (n !== void 0)
    return n === null ? null : {
      challenge_id: n.challenge_id,
      challenge_type: n.challenge_type,
      data: ek(n.data)
    };
}
function nk(n) {
  if (n !== void 0)
    return n === null ? null : {
      password: n.password
    };
}
function rk(n) {
  if (n !== void 0)
    return n === null ? null : {
      challenge_id: n.challenge_id,
      challenge_type: n.challenge_type,
      data: nk(n.data)
    };
}
function ak(n) {
  if (n !== void 0)
    return n === null ? null : {
      password: n.password
    };
}
function ik(n) {
  if (n !== void 0)
    return n === null ? null : {
      challenge_id: n.challenge_id,
      challenge_type: n.challenge_type,
      data: ak(n.data)
    };
}
function ok(n) {
  if (n !== void 0)
    return n === null ? null : {
      otp: n.otp
    };
}
function sk(n) {
  if (n !== void 0)
    return n === null ? null : {
      challenge_id: n.challenge_id,
      challenge_type: n.challenge_type,
      data: ok(n.data)
    };
}
function lk(n) {
  if (n !== void 0)
    return n === null ? null : {
      otp: n.otp
    };
}
function uk(n) {
  if (n !== void 0)
    return n === null ? null : {
      challenge_id: n.challenge_id,
      challenge_type: n.challenge_type,
      data: lk(n.data)
    };
}
function ck(n) {
  if (n !== void 0)
    return n === null ? null : {
      challenge_id: n.challenge_id,
      challenge_type: n.challenge_type,
      data: n.data
    };
}
function dk(n) {
  if (n !== void 0)
    return n === null ? null : {
      challenge_id: n.challenge_id,
      challenge_type: n.challenge_type,
      data: n.data
    };
}
function JC(n) {
  if (n !== void 0) {
    if (n === null)
      return null;
    switch (n.challenge_type) {
      case "nonce":
        return XR(n);
      case "otp":
        return JR(n);
      case "password_reset":
        return tk(n);
      case "password_set":
        return rk(n);
      case "password_verify":
        return ik(n);
      case "totp_register":
        return sk(n);
      case "totp_verify":
        return uk(n);
      case "webauthn_create":
        return ck(n);
      case "webauthn_get":
        return dk(n);
      default:
        throw new Error(`No variant of Attestation exists with 'challenge_type=${n.challenge_type}'`);
    }
  }
}
const ir = {
  Webauthn: "webauthn",
  EmailLink: "email_link",
  SmsLink: "sms_link",
  OtpViaSms: "otp_via_sms",
  OtpViaEmail: "otp_via_email",
  Totp: "totp",
  Oidc: "oidc",
  Saml: "saml",
  Api: "api",
  DirectId: "direct_id",
  Password: "password",
  Impersonate: "impersonate"
};
function Vr(n) {
  return fk(n);
}
function fk(n, a) {
  return n;
}
function b5(n) {
  return n;
}
const Xs = {
  EmailAddress: "email_address",
  PhoneNumber: "phone_number"
};
function pk(n) {
  return hk(n);
}
function hk(n, a) {
  return n;
}
function w5(n) {
  return vk(n);
}
function vk(n, a) {
  return n == null ? n : {
    type: pk(n.type),
    value: n.value
  };
}
function ip(n) {
  if (n !== void 0)
    return n === null ? null : {
      type: n.type,
      value: n.value
    };
}
function mk(n) {
  return gk(n);
}
function gk(n, a) {
  return n;
}
function yk(n) {
  return bk(n);
}
function bk(n, a) {
  return n == null ? n : {
    challenge: Ee(n, "challenge") ? n.challenge : void 0
  };
}
function wk(n, a) {
  return n == null ? n : {
    id: n.id,
    type: Fr(n.type),
    authentication_method: Vr(n.authentication_method),
    options: Ee(n, "options") ? yk(n.options) : void 0
  };
}
function Ck(n) {
  return Sk(n);
}
function Sk(n, a) {
  return n == null ? n : {
    auth_code_url: n.auth_code_url
  };
}
function _k(n, a) {
  return n == null ? n : {
    id: n.id,
    type: Fr(n.type),
    authentication_method: Vr(n.authentication_method),
    options: Ck(n.options)
  };
}
function xk(n, a) {
  return n == null ? n : {
    id: n.id,
    type: Fr(n.type),
    authentication_method: Vr(n.authentication_method)
  };
}
function Ek(n) {
  return Rk(n);
}
function Rk(n, a) {
  return n;
}
function kk(n) {
  return Tk(n);
}
function Tk(n, a) {
  return n;
}
function $k(n) {
  return Dk(n);
}
function Dk(n, a) {
  return n == null ? n : {
    name: mk(n.name),
    pattern: n.pattern,
    match_type: Ek(n.match_type),
    pattern_qualifiers: Ee(n, "pattern_qualifiers") ? n.pattern_qualifiers.map(kk) : void 0
  };
}
function C5(n) {
  return Ok(n);
}
function Ok(n, a) {
  return n == null ? n : {
    regular_expressions: Ee(n, "regular_expressions") ? n.regular_expressions.map($k) : void 0
  };
}
function Ak(n) {
  return Lk(n);
}
function Lk(n, a) {
  return n == null ? n : {
    validation_rules: C5(n.validation_rules)
  };
}
function Mk(n, a) {
  return n == null ? n : {
    id: n.id,
    type: Fr(n.type),
    authentication_method: Vr(n.authentication_method),
    options: Ak(n.options)
  };
}
function Ik(n) {
  return qk(n);
}
function qk(n, a) {
  return n == null ? n : {
    validation_rules: C5(n.validation_rules)
  };
}
function zk(n, a) {
  return n == null ? n : {
    id: n.id,
    type: Fr(n.type),
    authentication_method: Vr(n.authentication_method),
    options: Ik(n.options)
  };
}
function Nk(n, a) {
  return n == null ? n : {
    id: n.id,
    type: Fr(n.type),
    authentication_method: Vr(n.authentication_method)
  };
}
function Pk(n) {
  return Uk(n);
}
function Uk(n, a) {
  return n == null ? n : {
    challenge_id: Ee(n, "challenge_id") ? n.challenge_id : void 0
  };
}
function Fk(n, a) {
  return n == null ? n : {
    id: n.id,
    type: Fr(n.type),
    authentication_method: Vr(n.authentication_method),
    options: Ee(n, "options") ? Pk(n.options) : void 0
  };
}
function Vk(n) {
  return Hk(n);
}
function Hk(n, a) {
  return n == null ? n : {
    start_authentication_url: n.start_authentication_url
  };
}
function Bk(n, a) {
  return n == null ? n : {
    id: n.id,
    type: Fr(n.type),
    authentication_method: Vr(n.authentication_method),
    options: Vk(n.options)
  };
}
function jk(n) {
  return Gk(n);
}
function Gk(n, a) {
  return n == null ? n : {
    key_uri: n.key_uri,
    qr_code_data_b64: n.qr_code_data_b64,
    recovery_codes: n.recovery_codes
  };
}
function Yk(n, a) {
  return n == null ? n : {
    id: n.id,
    type: Fr(n.type),
    authentication_method: Vr(n.authentication_method),
    options: Ee(n, "options") ? jk(n.options) : void 0
  };
}
function Wk(n, a) {
  return n == null ? n : {
    id: n.id,
    type: Fr(n.type),
    authentication_method: Vr(n.authentication_method)
  };
}
function Kk(n, a) {
  return n == null ? n : {
    id: n.id,
    type: Fr(n.type),
    authentication_method: Vr(n.authentication_method),
    options: Ee(n, "options") ? n.options : void 0
  };
}
function Zk(n, a) {
  return n == null ? n : {
    id: n.id,
    type: Fr(n.type),
    authentication_method: Vr(n.authentication_method),
    options: Ee(n, "options") ? n.options : void 0
  };
}
function Xk(n) {
  return Qk(n);
}
function Qk(n, a) {
  if (n == null)
    return n;
  switch (n.type) {
    case "nonce":
      return {
        ...wk(n, !0),
        type: "nonce"
      };
    case "oidc":
      return {
        ..._k(n, !0),
        type: "oidc"
      };
    case "otp":
      return {
        ...xk(n, !0),
        type: "otp"
      };
    case "password_reset":
      return {
        ...Mk(n, !0),
        type: "password_reset"
      };
    case "password_set":
      return {
        ...zk(n, !0),
        type: "password_set"
      };
    case "password_verify":
      return {
        ...Nk(n, !0),
        type: "password_verify"
      };
    case "proxy":
      return {
        ...Fk(n, !0),
        type: "proxy"
      };
    case "saml":
      return {
        ...Bk(n, !0),
        type: "saml"
      };
    case "totp_register":
      return {
        ...Yk(n, !0),
        type: "totp_register"
      };
    case "totp_verify":
      return {
        ...Wk(n, !0),
        type: "totp_verify"
      };
    case "webauthn_create":
      return {
        ...Kk(n, !0),
        type: "webauthn_create"
      };
    case "webauthn_get":
      return {
        ...Zk(n, !0),
        type: "webauthn_get"
      };
    default:
      throw new Error(`No variant of ChallengeListInner exists with 'type=${n.type}'`);
  }
}
function Jk(n) {
  return eT(n);
}
function eT(n, a) {
  return n;
}
const Bs = {
  AuthenticationSucceededV1: "AuthenticationSucceeded_v1",
  AuthenticationFailedV1: "AuthenticationFailed_v1",
  PersonCreatedV1: "PersonCreated_v1",
  PersonDeletedV1: "PersonDeleted_v1",
  VirtualPageLoadedV1: "VirtualPageLoaded_v1",
  SlashIdsdkLoadedV1: "SlashIDSDKLoaded_v1",
  PersonIdentifiedV1: "PersonIdentified_v1",
  PersonLoggedOutV1: "PersonLoggedOut_v1",
  TokenMintedV1: "TokenMinted_v1",
  PasswordChangedV1: "PasswordChanged_v1",
  GdprConsentsChangedV1: "GdprConsentsChanged_v1",
  GateServerStartedV1: "GateServerStarted_v1",
  GateRequestHandledV1: "GateRequestHandled_v1"
};
function tT(n) {
  if (n !== void 0)
    return n === null ? null : {
      event_name: n.event_name,
      person_id: n.person_id,
      authenticated_methods: n.authenticated_methods === void 0 ? void 0 : n.authenticated_methods.map(b5),
      failed_authn_method: n.failed_authn_method,
      failure_reason: n.failure_reason,
      failure_detail: n.failure_detail,
      handle: ip(n.handle),
      challenge_id: n.challenge_id
    };
}
function nT(n) {
  if (n !== void 0)
    return n === null ? null : {
      event_name: n.event_name,
      person_id: n.person_id,
      success_authn_method: n.success_authn_method,
      authenticated_methods: n.authenticated_methods.map(b5),
      handle: ip(n.handle)
    };
}
function rT(n) {
  if (n !== void 0)
    return n === null ? null : {
      event_name: n.event_name,
      person_id: n.person_id
    };
}
function aT(n) {
  if (n !== void 0)
    return n === null ? null : {
      event_name: n.event_name,
      person_id: n.person_id
    };
}
function iT(n) {
  if (n !== void 0)
    return n === null ? null : {
      event_name: n.event_name
    };
}
function oT(n) {
  if (n !== void 0)
    return n === null ? null : {
      event_name: n.event_name,
      person_id: n.person_id
    };
}
function sT(n) {
  if (n !== void 0) {
    if (n === null)
      return null;
    switch (n.event_name) {
      case "AuthenticationFailed_v1":
        return tT(n);
      case "AuthenticationSucceeded_v1":
        return nT(n);
      case "PersonIdentified_v1":
        return rT(n);
      case "PersonLoggedOut_v1":
        return aT(n);
      case "SlashIDSDKLoaded_v1":
        return iT(n);
      case "VirtualPageLoaded_v1":
        return oT(n);
      default:
        throw new Error(`No variant of EventPostRequestEventData exists with 'event_name=${n.event_name}'`);
    }
  }
}
function e2(n) {
  if (n !== void 0)
    return n === null ? null : {
      organization_id: n.organization_id,
      analytics_correlation_id: n.analytics_correlation_id,
      window_location: n.window_location,
      user_agent: n.user_agent,
      event_data: sT(n.event_data)
    };
}
function lT(n) {
  return uT(n);
}
function uT(n, a) {
  return n == null ? n : {
    params: Ee(n, "params") ? n.params : void 0,
    type: Jk(n.type),
    label: Ee(n, "label") ? n.label : void 0,
    id: n.id,
    last_used: Ee(n, "last_used") ? new Date(n.last_used) : void 0
  };
}
const tc = {
  Popup: "popup",
  Redirect: "redirect"
};
function cT(n) {
  let a = !0;
  return a = a && "client_id" in n, a = a && "provider" in n, a;
}
function dT(n) {
  if (n !== void 0)
    return n === null ? null : {
      client_id: n.client_id,
      provider: n.provider,
      ux_mode: n.ux_mode,
      redirect_target: n.redirect_target,
      requires_groups: n.requires_groups,
      pkce_code_challenge: n.pkce_code_challenge,
      csrf_token: n.csrf_token
    };
}
const nc = {
  Popup: "popup",
  Redirect: "redirect"
};
function fT(n) {
  let a = !0;
  return a = a && "provider_credentials_id" in n, a;
}
function pT(n) {
  if (n !== void 0)
    return n === null ? null : {
      provider_credentials_id: n.provider_credentials_id,
      ux_mode: n.ux_mode,
      redirect_target: n.redirect_target,
      pkce_code_challenge: n.pkce_code_challenge,
      csrf_token: n.csrf_token
    };
}
const hT = {
  None: "none",
  Indirect: "indirect",
  Direct: "direct"
};
const t2 = {
  Any: "any",
  Platform: "platform",
  CrossPlatform: "cross_platform"
};
const vT = {
  Discouraged: "discouraged",
  Preferred: "preferred",
  Required: "required"
};
const mT = {
  Discouraged: "discouraged",
  Preferred: "preferred",
  Required: "required"
};
function gT(n) {
  return !0;
}
function yT(n) {
  if (n !== void 0)
    return n === null ? null : {
      scope: n.scope,
      available_credential_ids: n.available_credential_ids,
      attachment: n.attachment,
      user_verification: n.user_verification,
      resident_key: n.resident_key,
      attestation: n.attestation
    };
}
function bT(n) {
  if (n !== void 0)
    return n === null ? null : cT(n) ? dT(n) : fT(n) ? pT(n) : gT(n) ? yT(n) : {};
}
function wT(n) {
  if (n !== void 0)
    return n === null ? null : {
      method: n.method,
      options: bT(n.options)
    };
}
function CT(n) {
  return ST(n);
}
function ST(n, a) {
  return n;
}
function _T(n) {
  return n;
}
function xT(n) {
  return ET(n);
}
function ET(n, a) {
  return n == null ? n : {
    consent_level: CT(n.consent_level),
    created_at: new Date(n.created_at)
  };
}
function n2(n) {
  if (n !== void 0)
    return n === null ? null : {
      consent_levels: n.consent_levels.map(_T)
    };
}
function S5(n) {
  return RT(n);
}
function RT(n, a) {
  return n == null ? n : {
    consents: n.consents.map(xT)
  };
}
function kT(n) {
  return TT(n);
}
function TT(n, a) {
  return n == null ? n : {
    meta: Ee(n, "meta") ? sa(n.meta) : void 0,
    errors: Ee(n, "errors") ? n.errors.map(la) : void 0,
    result: Ee(n, "result") ? n.result : void 0
  };
}
function $T(n) {
  return DT(n);
}
function DT(n, a) {
  return n == null ? n : {
    meta: Ee(n, "meta") ? sa(n.meta) : void 0,
    errors: Ee(n, "errors") ? n.errors.map(la) : void 0,
    result: Ee(n, "result") ? n.result : void 0
  };
}
function r2(n) {
  return OT(n);
}
function OT(n, a) {
  return n == null ? n : {
    meta: Ee(n, "meta") ? sa(n.meta) : void 0,
    errors: Ee(n, "errors") ? n.errors.map(la) : void 0,
    result: Ee(n, "result") ? n.result : void 0
  };
}
function Tg(n) {
  return AT(n);
}
function AT(n, a) {
  return n == null ? n : {
    meta: Ee(n, "meta") ? sa(n.meta) : void 0,
    errors: Ee(n, "errors") ? n.errors.map(la) : void 0,
    result: Ee(n, "result") ? n.result : void 0
  };
}
function LT(n) {
  return MT(n);
}
function MT(n, a) {
  return n == null ? n : {
    meta: Ee(n, "meta") ? sa(n.meta) : void 0,
    errors: Ee(n, "errors") ? n.errors.map(la) : void 0,
    result: Ee(n, "result") ? S5(n.result) : void 0
  };
}
function IT(n) {
  return qT(n);
}
function qT(n, a) {
  return n == null ? n : {
    id: n.id,
    org_name: n.org_name,
    tenant_name: n.tenant_name
  };
}
function zT(n) {
  return NT(n);
}
function NT(n, a) {
  return n == null ? n : {
    id: n.id,
    org_name: n.org_name,
    tenant_name: n.tenant_name,
    managed_organizations: Ee(n, "managed_organizations") ? n.managed_organizations.map(IT) : void 0
  };
}
function PT(n) {
  return UT(n);
}
function UT(n, a) {
  return n == null ? n : {
    id: n.id,
    parent_id: Ee(n, "parent_id") ? n.parent_id : void 0,
    name: Ee(n, "name") ? n.name : void 0,
    tenant_name: Ee(n, "tenant_name") ? n.tenant_name : void 0,
    children_ids: Ee(n, "children_ids") ? n.children_ids : void 0,
    person_pool_orgs_ids: Ee(n, "person_pool_orgs_ids") ? n.person_pool_orgs_ids : void 0,
    group_pool_orgs_ids: Ee(n, "group_pool_orgs_ids") ? n.group_pool_orgs_ids : void 0,
    manager_org_id: Ee(n, "manager_org_id") ? n.manager_org_id : void 0,
    person_in_manager_org: n.person_in_manager_org
  };
}
function FT(n) {
  return VT(n);
}
function VT(n, a) {
  return n == null ? n : {
    active: n.active,
    person_id: n.person_id,
    roles: Ee(n, "roles") ? n.roles : void 0,
    region: n.region,
    handles: Ee(n, "handles") ? n.handles.map(w5) : void 0,
    groups: Ee(n, "groups") ? n.groups : void 0,
    attributes: Ee(n, "attributes") ? n.attributes : void 0
  };
}
function HT(n) {
  return BT(n);
}
function BT(n, a) {
  return n == null ? n : {
    person: FT(n.person),
    organizations: n.organizations.map(zT),
    org_hierarchy: n.org_hierarchy.map(PT),
    handles: n.handles.map(w5),
    credentials: n.credentials.map(lT)
  };
}
function jT(n) {
  return GT(n);
}
function GT(n, a) {
  return n == null ? n : {
    meta: Ee(n, "meta") ? sa(n.meta) : void 0,
    errors: Ee(n, "errors") ? n.errors.map(la) : void 0,
    result: HT(n.result)
  };
}
function YT(n) {
  if (n !== void 0)
    return n === null ? null : {
      handle: ip(n.handle),
      factor: wT(n.factor)
    };
}
function WT(n) {
  return KT(n);
}
function KT(n, a) {
  return n == null ? n : {
    meta: Ee(n, "meta") ? sa(n.meta) : void 0,
    errors: Ee(n, "errors") ? n.errors.map(la) : void 0,
    result: Ee(n, "result") ? n.result : void 0
  };
}
function $g(n) {
  return ZT(n);
}
function ZT(n, a) {
  return n == null ? n : {
    meta: Ee(n, "meta") ? sa(n.meta) : void 0,
    errors: Ee(n, "errors") ? n.errors.map(la) : void 0,
    result: Ee(n, "result") ? n.result.map(Xk) : void 0
  };
}
function XT(n) {
  if (n !== void 0)
    return n === null ? null : {
      challenge_id: n.challenge_id,
      code: n.code,
      pkce_code_verifier: n.pkce_code_verifier
    };
}
function QT(n) {
  return JT(n);
}
function JT(n, a) {
  return n == null ? n : {
    valid: n.valid,
    invalidity_reason: Ee(n, "invalidity_reason") ? n.invalidity_reason : void 0,
    expires_in_seconds: Ee(n, "expires_in_seconds") ? n.expires_in_seconds : void 0,
    expires_at: Ee(n, "expires_at") ? new Date(n.expires_at) : void 0
  };
}
function e$(n) {
  return t$(n);
}
function t$(n, a) {
  return n == null ? n : {
    meta: Ee(n, "meta") ? sa(n.meta) : void 0,
    errors: Ee(n, "errors") ? n.errors.map(la) : void 0,
    result: Ee(n, "result") ? QT(n.result) : void 0
  };
}
function a2(n) {
  return n$(n);
}
function n$(n, a) {
  return n == null ? n : {
    meta: Ee(n, "meta") ? sa(n.meta) : void 0,
    errors: Ee(n, "errors") ? n.errors.map(la) : void 0,
    result: S5(n.result)
  };
}
function r$(n) {
  if (n !== void 0)
    return n === null ? null : {
      method: n.method
    };
}
function a$(n) {
  if (n !== void 0)
    return n === null ? null : {
      handle: ip(n.handle),
      factor: r$(n.factor)
    };
}
function i$(n) {
  if (n !== void 0)
    return n === null ? null : {
      token: n.token
    };
}
class i2 extends Zi {
  /**
   * Delete attributes from a single bucket
   */
  async deleteAttributesBucketNameRaw(a, o) {
    if (a.bucketName === null || a.bucketName === void 0)
      throw new tn("bucketName", "Required parameter requestParameters.bucketName was null or undefined when calling deleteAttributesBucketName.");
    const l = {};
    a.attributes && (l.attributes = a.attributes.join(Rg.csv));
    const c = {};
    if (a.slashIDSdkVersion !== void 0 && a.slashIDSdkVersion !== null && (c["SlashID-SdkVersion"] = String(a.slashIDSdkVersion)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/attributes/{bucket_name}".replace("{bucket_name}", encodeURIComponent(String(a.bucketName))),
      method: "DELETE",
      headers: c,
      query: l
    }, o);
    return new Sn(p, (d) => kg(d));
  }
  /**
   * Delete attributes from a single bucket
   */
  async deleteAttributesBucketName(a, o) {
    return await (await this.deleteAttributesBucketNameRaw(a, o)).value();
  }
  /**
   * Retrieve attributes from multiple buckets
   */
  async getAttributesRaw(a, o) {
    const l = {};
    a.buckets && (l.buckets = a.buckets.join(Rg.csv));
    const c = {};
    if (a.slashIDSdkVersion !== void 0 && a.slashIDSdkVersion !== null && (c["SlashID-SdkVersion"] = String(a.slashIDSdkVersion)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/attributes",
      method: "GET",
      headers: c,
      query: l
    }, o);
    return new Sn(p, (d) => kT(d));
  }
  /**
   * Retrieve attributes from multiple buckets
   */
  async getAttributes(a = {}, o) {
    return await (await this.getAttributesRaw(a, o)).value();
  }
  /**
   * Retrieve attributes from a single bucket
   */
  async getAttributesBucketNameRaw(a, o) {
    if (a.bucketName === null || a.bucketName === void 0)
      throw new tn("bucketName", "Required parameter requestParameters.bucketName was null or undefined when calling getAttributesBucketName.");
    const l = {};
    a.attributes && (l.attributes = a.attributes.join(Rg.csv));
    const c = {};
    if (a.slashIDSdkVersion !== void 0 && a.slashIDSdkVersion !== null && (c["SlashID-SdkVersion"] = String(a.slashIDSdkVersion)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/attributes/{bucket_name}".replace("{bucket_name}", encodeURIComponent(String(a.bucketName))),
      method: "GET",
      headers: c,
      query: l
    }, o);
    return new Sn(p, (d) => $T(d));
  }
  /**
   * Retrieve attributes from a single bucket
   */
  async getAttributesBucketName(a, o) {
    return await (await this.getAttributesBucketNameRaw(a, o)).value();
  }
  /**
   * Create or modify attributes in multiple buckets
   */
  async putAttributesRaw(a, o) {
    if (a.body === null || a.body === void 0)
      throw new tn("body", "Required parameter requestParameters.body was null or undefined when calling putAttributes.");
    const l = {}, c = {};
    if (c["Content-Type"] = "application/json", a.slashIDSdkVersion !== void 0 && a.slashIDSdkVersion !== null && (c["SlashID-SdkVersion"] = String(a.slashIDSdkVersion)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/attributes",
      method: "PUT",
      headers: c,
      query: l,
      body: a.body
    }, o);
    return new Sn(p, (d) => kg(d));
  }
  /**
   * Create or modify attributes in multiple buckets
   */
  async putAttributes(a, o) {
    return await (await this.putAttributesRaw(a, o)).value();
  }
  /**
   * Create or modify attributes in a single bucket
   */
  async putAttributesBucketNameRaw(a, o) {
    if (a.bucketName === null || a.bucketName === void 0)
      throw new tn("bucketName", "Required parameter requestParameters.bucketName was null or undefined when calling putAttributesBucketName.");
    if (a.body === null || a.body === void 0)
      throw new tn("body", "Required parameter requestParameters.body was null or undefined when calling putAttributesBucketName.");
    const l = {}, c = {};
    if (c["Content-Type"] = "application/json", a.slashIDSdkVersion !== void 0 && a.slashIDSdkVersion !== null && (c["SlashID-SdkVersion"] = String(a.slashIDSdkVersion)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/attributes/{bucket_name}".replace("{bucket_name}", encodeURIComponent(String(a.bucketName))),
      method: "PUT",
      headers: c,
      query: l,
      body: a.body
    }, o);
    return new Sn(p, (d) => kg(d));
  }
  /**
   * Create or modify attributes in a single bucket
   */
  async putAttributesBucketName(a, o) {
    return await (await this.putAttributesBucketNameRaw(a, o)).value();
  }
}
class Po extends Zi {
  /**
   */
  async getChallengeChallengeIdRaw(a, o) {
    if (a.challengeId === null || a.challengeId === void 0)
      throw new tn("challengeId", "Required parameter requestParameters.challengeId was null or undefined when calling getChallengeChallengeId.");
    const l = {}, c = {};
    if (a.slashIDSdkVersion !== void 0 && a.slashIDSdkVersion !== null && (c["SlashID-SdkVersion"] = String(a.slashIDSdkVersion)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/challenge/{challenge_id}".replace("{challenge_id}", encodeURIComponent(String(a.challengeId))),
      method: "GET",
      headers: c,
      query: l
    }, o);
    return new Sn(p, (d) => r2(d));
  }
  /**
   */
  async getChallengeChallengeId(a, o) {
    return await (await this.getChallengeChallengeIdRaw(a, o)).value();
  }
  /**
   */
  async getChallengeChallengeIdV2Raw(a, o) {
    if (a.challengeId === null || a.challengeId === void 0)
      throw new tn("challengeId", "Required parameter requestParameters.challengeId was null or undefined when calling getChallengeChallengeIdV2.");
    const l = {}, c = {};
    if (a.slashIDSdkVersion !== void 0 && a.slashIDSdkVersion !== null && (c["SlashID-SdkVersion"] = String(a.slashIDSdkVersion)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/challenge/{challenge_id}/v2".replace("{challenge_id}", encodeURIComponent(String(a.challengeId))),
      method: "GET",
      headers: c,
      query: l
    }, o);
    return new Sn(p, (d) => Tg(d));
  }
  /**
   */
  async getChallengeChallengeIdV2(a, o) {
    return await (await this.getChallengeChallengeIdV2Raw(a, o)).value();
  }
  /**
   */
  async getChallengePackChallengePackIdRaw(a, o) {
    if (a.challengePackId === null || a.challengePackId === void 0)
      throw new tn("challengePackId", "Required parameter requestParameters.challengePackId was null or undefined when calling getChallengePackChallengePackId.");
    const l = {}, c = {};
    if (a.slashIDSdkVersion !== void 0 && a.slashIDSdkVersion !== null && (c["SlashID-SdkVersion"] = String(a.slashIDSdkVersion)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/challenge_pack/{challenge_pack_id}".replace("{challenge_pack_id}", encodeURIComponent(String(a.challengePackId))),
      method: "GET",
      headers: c,
      query: l
    }, o);
    return new Sn(p, (d) => $g(d));
  }
  /**
   */
  async getChallengePackChallengePackId(a, o) {
    return await (await this.getChallengePackChallengePackIdRaw(a, o)).value();
  }
  /**
   * Retrieve details of the person and all the organizations they belong to, including:  - The organization of the request: the person must be a member of the organization you authenticate    with for you to be allowed to retrieve this list  - Any other organizations that share the person pool with the organization specified in the request and to which the person also belongs.    A hierarchy of organizations can be created using [this API endpoint](/docs/api/post-organizations-suborganizations).    When organizations are configured to share a person pool, if the same person registers with multiple organizations    in the pool using the same handle, all organizations will see the same person ID for that person. 
   * Retrieve the person details and list of organizations
   */
  async getMeRaw(a) {
    const o = {}, l = {};
    if (this.configuration && this.configuration.accessToken) {
      const p = this.configuration.accessToken, d = await p("Bearer", []);
      d && (l.Authorization = `Bearer ${d}`);
    }
    const c = await this.request({
      path: "/me",
      method: "GET",
      headers: l,
      query: o
    }, a);
    return new Sn(c, (p) => jT(p));
  }
  /**
   * Retrieve details of the person and all the organizations they belong to, including:  - The organization of the request: the person must be a member of the organization you authenticate    with for you to be allowed to retrieve this list  - Any other organizations that share the person pool with the organization specified in the request and to which the person also belongs.    A hierarchy of organizations can be created using [this API endpoint](/docs/api/post-organizations-suborganizations).    When organizations are configured to share a person pool, if the same person registers with multiple organizations    in the pool using the same handle, all organizations will see the same person ID for that person. 
   * Retrieve the person details and list of organizations
   */
  async getMe(a) {
    return await (await this.getMeRaw(a)).value();
  }
  /**
   * Given a token for a Person in an Organization, return a new token for the same user in the Organization specified in the SlashID-OrgID request header. For the call to succeed the following conditions must be met: - the token must be valid at the time of the request - the two Organizations must share the same person pool - the user must be a member of both Organizations This operation does not count as an authentication, so the new token will have the same expiration time as the original. 
   * Get a new token for the specified Organization ID
   */
  async getTokenRaw(a, o) {
    if (a.slashIDOrgID === null || a.slashIDOrgID === void 0)
      throw new tn("slashIDOrgID", "Required parameter requestParameters.slashIDOrgID was null or undefined when calling getToken.");
    const l = {}, c = {};
    if (a.slashIDSdkVersion !== void 0 && a.slashIDSdkVersion !== null && (c["SlashID-SdkVersion"] = String(a.slashIDSdkVersion)), a.slashIDOrgID !== void 0 && a.slashIDOrgID !== null && (c["SlashID-OrgID"] = String(a.slashIDOrgID)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/token",
      method: "GET",
      headers: c,
      query: l
    }, o);
    return new Sn(p, (d) => Tg(d));
  }
  /**
   * Given a token for a Person in an Organization, return a new token for the same user in the Organization specified in the SlashID-OrgID request header. For the call to succeed the following conditions must be met: - the token must be valid at the time of the request - the two Organizations must share the same person pool - the user must be a member of both Organizations This operation does not count as an authentication, so the new token will have the same expiration time as the original. 
   * Get a new token for the specified Organization ID
   */
  async getToken(a, o) {
    return await (await this.getTokenRaw(a, o)).value();
  }
  /**
   */
  async postAttestationRaw(a, o) {
    if (a.attestation === null || a.attestation === void 0)
      throw new tn("attestation", "Required parameter requestParameters.attestation was null or undefined when calling postAttestation.");
    const l = {}, c = {};
    if (c["Content-Type"] = "application/json", a.slashIDSdkVersion !== void 0 && a.slashIDSdkVersion !== null && (c["SlashID-SdkVersion"] = String(a.slashIDSdkVersion)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/attestation",
      method: "POST",
      headers: c,
      query: l,
      body: JC(a.attestation)
    }, o);
    return new Sn(p, (d) => r2(d));
  }
  /**
   */
  async postAttestation(a, o) {
    return await (await this.postAttestationRaw(a, o)).value();
  }
  /**
   */
  async postAttestationV2Raw(a, o) {
    if (a.attestation === null || a.attestation === void 0)
      throw new tn("attestation", "Required parameter requestParameters.attestation was null or undefined when calling postAttestationV2.");
    const l = {}, c = {};
    if (c["Content-Type"] = "application/json", a.slashIDSdkVersion !== void 0 && a.slashIDSdkVersion !== null && (c["SlashID-SdkVersion"] = String(a.slashIDSdkVersion)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/attestation/v2",
      method: "POST",
      headers: c,
      query: l,
      body: JC(a.attestation)
    }, o);
    return new Sn(p, (d) => Tg(d));
  }
  /**
   */
  async postAttestationV2(a, o) {
    return await (await this.postAttestationV2Raw(a, o)).value();
  }
  /**
   */
  async postDirectIdRaw(a, o) {
    const l = {}, c = {};
    if (a.slashIDSdkVersion !== void 0 && a.slashIDSdkVersion !== null && (c["SlashID-SdkVersion"] = String(a.slashIDSdkVersion)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/direct-id",
      method: "POST",
      headers: c,
      query: l
    }, o);
    return new Sn(p, (d) => WT(d));
  }
  /**
   */
  async postDirectId(a = {}, o) {
    return await (await this.postDirectIdRaw(a, o)).value();
  }
  /**
   */
  async postIdRaw(a, o) {
    if (a.slashIDOrgID === null || a.slashIDOrgID === void 0)
      throw new tn("slashIDOrgID", "Required parameter requestParameters.slashIDOrgID was null or undefined when calling postId.");
    if (a.iDRequest === null || a.iDRequest === void 0)
      throw new tn("iDRequest", "Required parameter requestParameters.iDRequest was null or undefined when calling postId.");
    const l = {}, c = {};
    if (c["Content-Type"] = "application/json", a.slashIDOrgID !== void 0 && a.slashIDOrgID !== null && (c["SlashID-OrgID"] = String(a.slashIDOrgID)), a.slashIDSdkVersion !== void 0 && a.slashIDSdkVersion !== null && (c["SlashID-SdkVersion"] = String(a.slashIDSdkVersion)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/id",
      method: "POST",
      headers: c,
      query: l,
      body: YT(a.iDRequest)
    }, o);
    return new Sn(p, (d) => $g(d));
  }
  /**
   */
  async postId(a, o) {
    return await (await this.postIdRaw(a, o)).value();
  }
  /**
   */
  async postRecoverRaw(a, o) {
    if (a.slashIDOrgID === null || a.slashIDOrgID === void 0)
      throw new tn("slashIDOrgID", "Required parameter requestParameters.slashIDOrgID was null or undefined when calling postRecover.");
    if (a.recoverRequest === null || a.recoverRequest === void 0)
      throw new tn("recoverRequest", "Required parameter requestParameters.recoverRequest was null or undefined when calling postRecover.");
    const l = {}, c = {};
    if (c["Content-Type"] = "application/json", a.slashIDOrgID !== void 0 && a.slashIDOrgID !== null && (c["SlashID-OrgID"] = String(a.slashIDOrgID)), a.slashIDSdkVersion !== void 0 && a.slashIDSdkVersion !== null && (c["SlashID-SdkVersion"] = String(a.slashIDSdkVersion)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/recover",
      method: "POST",
      headers: c,
      query: l,
      body: a$(a.recoverRequest)
    }, o);
    return new Sn(p, (d) => $g(d));
  }
  /**
   */
  async postRecover(a, o) {
    return await (await this.postRecoverRaw(a, o)).value();
  }
  /**
   * Resolve endpoint for SSO flows using PKCE.
   * SSO resolve challenge endpoint
   */
  async postSsoResolveRaw(a, o) {
    if (a.slashIDOrgID === null || a.slashIDOrgID === void 0)
      throw new tn("slashIDOrgID", "Required parameter requestParameters.slashIDOrgID was null or undefined when calling postSsoResolve.");
    const l = {}, c = {};
    if (c["Content-Type"] = "application/json", a.slashIDOrgID !== void 0 && a.slashIDOrgID !== null && (c["SlashID-OrgID"] = String(a.slashIDOrgID)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/sso/resolve",
      method: "POST",
      headers: c,
      query: l,
      body: XT(a.postSsoResolveRequest)
    }, o);
    return new Yf(p);
  }
  /**
   * Resolve endpoint for SSO flows using PKCE.
   * SSO resolve challenge endpoint
   */
  async postSsoResolve(a, o) {
    await this.postSsoResolveRaw(a, o);
  }
}
class o$ extends Zi {
  /**
   * Post information that can used to build and publish an event originating from the SlashID SDK
   * Publish an event from the SDK
   */
  async postActionsSdkRaw(a, o) {
    if (a.eventPostRequest === null || a.eventPostRequest === void 0)
      throw new tn("eventPostRequest", "Required parameter requestParameters.eventPostRequest was null or undefined when calling postActionsSdk.");
    const l = {}, c = {};
    if (c["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/actions/sdk",
      method: "POST",
      headers: c,
      query: l,
      body: e2(a.eventPostRequest)
    }, o);
    return new Yf(p);
  }
  /**
   * Post information that can used to build and publish an event originating from the SlashID SDK
   * Publish an event from the SDK
   */
  async postActionsSdk(a, o) {
    await this.postActionsSdkRaw(a, o);
  }
  /**
   * Post information that can used to build and publish an event. Deprecated, use `/actions`.
   * Publish an event
   */
  async postEventsRaw(a, o) {
    if (a.eventPostRequest === null || a.eventPostRequest === void 0)
      throw new tn("eventPostRequest", "Required parameter requestParameters.eventPostRequest was null or undefined when calling postEvents.");
    const l = {}, c = {};
    if (c["Content-Type"] = "application/json", this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/events",
      method: "POST",
      headers: c,
      query: l,
      body: e2(a.eventPostRequest)
    }, o);
    return new Yf(p);
  }
  /**
   * Post information that can used to build and publish an event. Deprecated, use `/actions`.
   * Publish an event
   */
  async postEvents(a, o) {
    await this.postEventsRaw(a, o);
  }
}
class o2 extends Zi {
  /**
   * Removes the specified GDPR consent, or all consents.
   * Remove GDPR consent of current user
   */
  async deleteConsentGdprRaw(a, o) {
    const l = {};
    a.consentLevels && (l.consent_levels = a.consentLevels), a.deleteAll !== void 0 && (l.deleteAll = a.deleteAll);
    const c = {};
    if (a.slashIDSdkVersion !== void 0 && a.slashIDSdkVersion !== null && (c["SlashID-SdkVersion"] = String(a.slashIDSdkVersion)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/consent/gdpr",
      method: "DELETE",
      headers: c,
      query: l
    }, o);
    return new Yf(p);
  }
  /**
   * Removes the specified GDPR consent, or all consents.
   * Remove GDPR consent of current user
   */
  async deleteConsentGdpr(a = {}, o) {
    await this.deleteConsentGdprRaw(a, o);
  }
  /**
   * Returns the GDPR consent levels and timestamp for current person, if it exists. 
   * Get GDPR consent of current user
   */
  async getConsentGdprRaw(a, o) {
    const l = {}, c = {};
    if (a.slashIDSdkVersion !== void 0 && a.slashIDSdkVersion !== null && (c["SlashID-SdkVersion"] = String(a.slashIDSdkVersion)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/consent/gdpr",
      method: "GET",
      headers: c,
      query: l
    }, o);
    return new Sn(p, (d) => LT(d));
  }
  /**
   * Returns the GDPR consent levels and timestamp for current person, if it exists. 
   * Get GDPR consent of current user
   */
  async getConsentGdpr(a = {}, o) {
    return await (await this.getConsentGdprRaw(a, o)).value();
  }
  /**
   * Stores the GDPR consent levels and timestamp. Returns the consent levels and the timestamp at which the consent information was received. This will overwrite existing GDPR consent levels for the specified person. The consent levels indicate the types of data classes the person has allowed during their use of your services, in accordance with GDPR. 
   * Store GDPR consent of current user
   */
  async postConsentGdprRaw(a, o) {
    if (a.gDPRConsentRequest === null || a.gDPRConsentRequest === void 0)
      throw new tn("gDPRConsentRequest", "Required parameter requestParameters.gDPRConsentRequest was null or undefined when calling postConsentGdpr.");
    const l = {}, c = {};
    if (c["Content-Type"] = "application/json", a.slashIDSdkVersion !== void 0 && a.slashIDSdkVersion !== null && (c["SlashID-SdkVersion"] = String(a.slashIDSdkVersion)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/consent/gdpr",
      method: "POST",
      headers: c,
      query: l,
      body: n2(a.gDPRConsentRequest)
    }, o);
    return new Sn(p, (d) => a2(d));
  }
  /**
   * Stores the GDPR consent levels and timestamp. Returns the consent levels and the timestamp at which the consent information was received. This will overwrite existing GDPR consent levels for the specified person. The consent levels indicate the types of data classes the person has allowed during their use of your services, in accordance with GDPR. 
   * Store GDPR consent of current user
   */
  async postConsentGdpr(a, o) {
    return await (await this.postConsentGdprRaw(a, o)).value();
  }
  /**
   * Stores the GDPR consent levels and timestamp. Returns the consent levels and the timestamp at which the consent information was received. This will overwrite existing GDPR consent levels for the specified person. The consent levels indicate the types of data classes the person has allowed during their use of your services, in accordance with GDPR. 
   * Set GDPR consent of current user
   */
  async putConsentGdprRaw(a, o) {
    if (a.gDPRConsentRequest === null || a.gDPRConsentRequest === void 0)
      throw new tn("gDPRConsentRequest", "Required parameter requestParameters.gDPRConsentRequest was null or undefined when calling putConsentGdpr.");
    const l = {}, c = {};
    if (c["Content-Type"] = "application/json", a.slashIDSdkVersion !== void 0 && a.slashIDSdkVersion !== null && (c["SlashID-SdkVersion"] = String(a.slashIDSdkVersion)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/consent/gdpr",
      method: "PUT",
      headers: c,
      query: l,
      body: n2(a.gDPRConsentRequest)
    }, o);
    return new Sn(p, (d) => a2(d));
  }
  /**
   * Stores the GDPR consent levels and timestamp. Returns the consent levels and the timestamp at which the consent information was received. This will overwrite existing GDPR consent levels for the specified person. The consent levels indicate the types of data classes the person has allowed during their use of your services, in accordance with GDPR. 
   * Set GDPR consent of current user
   */
  async putConsentGdpr(a, o) {
    return await (await this.putConsentGdprRaw(a, o)).value();
  }
}
class s2 extends Zi {
  /**
   * This endpoint validates a SlashID user token. The response indicates whether the token is valid and its expiration time if so. If the token is not valid, the reason is returned. 
   * Validate a user token
   */
  async postTokenValidateRaw(a, o) {
    if (a.validateTokenReq === null || a.validateTokenReq === void 0)
      throw new tn("validateTokenReq", "Required parameter requestParameters.validateTokenReq was null or undefined when calling postTokenValidate.");
    const l = {}, c = {};
    if (c["Content-Type"] = "application/json", a.slashIDSdkVersion !== void 0 && a.slashIDSdkVersion !== null && (c["SlashID-SdkVersion"] = String(a.slashIDSdkVersion)), this.configuration && this.configuration.accessToken) {
      const d = this.configuration.accessToken, v = await d("Bearer", []);
      v && (c.Authorization = `Bearer ${v}`);
    }
    const p = await this.request({
      path: "/token/validate",
      method: "POST",
      headers: c,
      query: l,
      body: i$(a.validateTokenReq)
    }, o);
    return new Sn(p, (d) => e$(d));
  }
  /**
   * This endpoint validates a SlashID user token. The response indicates whether the token is valid and its expiration time if so. If the token is not valid, the reason is returned. 
   * Validate a user token
   */
  async postTokenValidate(a, o) {
    return await (await this.postTokenValidateRaw(a, o)).value();
  }
}
function s$() {
  const o = window.screenX + (window.innerWidth - 400) / 2;
  return `width=400,height=600,top=${window.screenY + (window.innerHeight - 600) / 2},left=${o},resizable,scrollbars=yes,status=1`;
}
function _5() {
  const n = s$(), a = window.open(window.location.href, "/id:popup", n);
  if (!a)
    throw new Error("SlashId: Popup blocked, please consider redirect instead");
  const o = '<div style="position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);">You will be redirected in a moment...</div>';
  try {
    var l;
    a == null || (l = a.document) === null || l === void 0 || l.write(o);
  } catch (p) {
    console.error(p), a.document && a.document.body && (a.document.body.innerHTML = o);
  } finally {
    a.blur();
  }
  return [
    a,
    (p) => (a && (a.location = p, a.focus()), a)
  ];
}
function l$(n, a) {
  return n.origin + n.pathname === a.origin + a.pathname;
}
function x5(n) {
  let a;
  try {
    a = new URL(n);
  } catch {
    return !1;
  }
  return a.protocol === "http:" || a.protocol === "https:";
}
var Of, u$ = new Uint8Array(16);
function c$() {
  if (!Of && (Of = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !Of))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Of(u$);
}
var d$ = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function f$(n) {
  return typeof n == "string" && d$.test(n);
}
var p$ = f$, Pn = [];
for (var Dg = 0; Dg < 256; ++Dg)
  Pn.push((Dg + 256).toString(16).substr(1));
function h$(n) {
  var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, o = (Pn[n[a + 0]] + Pn[n[a + 1]] + Pn[n[a + 2]] + Pn[n[a + 3]] + "-" + Pn[n[a + 4]] + Pn[n[a + 5]] + "-" + Pn[n[a + 6]] + Pn[n[a + 7]] + "-" + Pn[n[a + 8]] + Pn[n[a + 9]] + "-" + Pn[n[a + 10]] + Pn[n[a + 11]] + Pn[n[a + 12]] + Pn[n[a + 13]] + Pn[n[a + 14]] + Pn[n[a + 15]]).toLowerCase();
  if (!p$(o))
    throw TypeError("Stringified UUID is invalid");
  return o;
}
var v$ = h$;
function m$(n, a, o) {
  n = n || {};
  var l = n.random || (n.rng || c$)();
  if (l[6] = l[6] & 15 | 64, l[8] = l[8] & 63 | 128, a) {
    o = o || 0;
    for (var c = 0; c < 16; ++c)
      a[o + c] = l[c];
    return a;
  }
  return v$(l);
}
var Qs = m$;
function Ws(n) {
  const a = n.replace(/_/g, "/").replace(/-/g, "+"), o = atob(a);
  return Uint8Array.from(o, (l) => l.charCodeAt(0));
}
function ai(n, a = !0) {
  const o = String.fromCharCode(...n), l = btoa(o);
  return a ? l.replace(/\//g, "_").replace(/\+/g, "-").replace(/=/g, "") : l;
}
const g$ = "challenges", y$ = "sidcp", Xg = "@SLASHID/CSRF_TOKEN", Qg = "@SLASHID/PKCE_CODE_VERIFIER";
var Wf;
(function(n) {
  n[n.StorageGetItem = 0] = "StorageGetItem", n[n.StorageSetItem = 1] = "StorageSetItem", n[n.Ping = 2] = "Ping", n[n.ChallengeWebauthnCreate = 3] = "ChallengeWebauthnCreate", n[n.ChallengeWebauthnGet = 4] = "ChallengeWebauthnGet", n[n.SSOChallenge = 5] = "SSOChallenge";
})(Wf || (Wf = {}));
class b$ {
  constructor() {
    this.id = cc(), this.type = 2;
  }
}
class l2 {
  constructor(a, o) {
    this.id = a, this.error = o;
  }
}
class w$ {
  constructor(a, o) {
    this.type = 3, this.id = cc(), this.slashIDOptions = a, this.challenge = o;
  }
}
class u2 {
  constructor(a, o, l) {
    this.id = a, this.attestation = o, this.error = l;
  }
}
class C$ {
  constructor(a, o) {
    this.type = 4, this.id = cc(), this.slashIDOptions = a, this.challenge = o;
  }
}
class c2 {
  constructor(a, o, l) {
    this.id = a, this.attestation = o, this.error = l;
  }
}
class S$ {
  constructor(a) {
    this.type = 0, this.id = cc(), this.key = a;
  }
}
class d2 {
  constructor(a, o, l) {
    this.id = a, this.value = o, this.error = l;
  }
}
class _$ {
  constructor(a, o) {
    this.id = cc(), this.type = 1, this.key = a, this.value = o;
  }
}
class f2 {
  constructor(a, o) {
    this.id = a, this.error = o;
  }
}
function cc() {
  const n = new Uint32Array(1);
  return window.crypto.getRandomValues(n), n[0];
}
function p2(n) {
  const a = new URLSearchParams(n), o = a.get("sso_challenge_id"), l = a.get("sso_code"), c = a.get("csrf_token");
  return !o || !l || !c ? null : {
    ssoChallengeID: o,
    ssoCode: l,
    csrfToken: c
  };
}
function x$(n) {
  return n.type === 3;
}
function E$(n) {
  return n.type === 4;
}
function R$(n) {
  return n && n.type === 5;
}
function k$(n) {
  return n.type === 2;
}
function T$(n) {
  return typeof n == "object" && !!n.baseURL && !!n.sdkURL;
}
const $$ = [
  "http:",
  "https:"
];
function D$(n) {
  if (!n)
    throw new TypeError("options cannot be null");
  if (n.environment) {
    if (typeof n.environment == "string" && n.environment !== "production" && n.environment !== "sandbox")
      throw new TypeError("If 'environment' is set as a string, it must be either 'production' or 'sandbox'");
    if (typeof n.environment == "object") {
      if (typeof n.environment.baseURL != "string")
        throw new TypeError("'environment.baseURL' must be a string");
      if (typeof n.environment.sdkURL != "string")
        throw new TypeError("'environment.sdkURL' must be a string");
    }
  }
  if (n.environment && (n.baseURL || n.sdkURL))
    throw new TypeError("If 'environment' is set, 'baseURL' and 'sdkURL' cannot be set at the same time. Use a custom environment instead.");
  if (n.baseURL) {
    if (typeof n.baseURL != "string")
      throw new TypeError("'baseURL' must be a string");
    let l;
    try {
      l = new URL(n.baseURL);
    } catch {
      throw new TypeError("'baseURL' must be a valid URL");
    }
    if ($$.indexOf(l.protocol) === -1)
      throw new TypeError("'baseURL' must be either an http or https URL");
  }
  if (n.sdkURL) {
    if (typeof n.sdkURL != "string")
      throw new TypeError("'sdkURL' must be a string");
    try {
      new URL(n.sdkURL);
    } catch {
      throw new TypeError("'sdkURL' must be a valid URL");
    }
  }
  const { analyticsEnabled: a = !0, oid: o } = n;
  if (a && !o)
    throw new Error("Analytics require the 'oid' parameter to be set when instantiating SlashID()");
}
function O$(n) {
  return n.environment ? A$(n.environment) : {
    baseURL: n.baseURL || Jg.production.baseURL,
    sdkURL: n.sdkURL || Jg.production.sdkURL
  };
}
const Jg = {
  production: {
    baseURL: "https://api.slashid.com",
    sdkURL: "https://cdn.slashid.com/sdk.html"
  },
  sandbox: {
    baseURL: "https://api.sandbox.slashid.com",
    sdkURL: "https://cdn.sandbox.slashid.com/sdk.html"
  }
};
function A$(n) {
  if (typeof n == "string")
    return Jg[n];
  if (T$(n))
    return {
      baseURL: n.baseURL,
      sdkURL: n.sdkURL
    };
  throw new TypeError("'environment' must be either a string or an object");
}
function E5(n) {
  const a = O$(n);
  var o;
  return {
    oid: n.oid,
    analyticsEnabled: (o = n.analyticsEnabled) !== null && o !== void 0 ? o : !0,
    ...a
  };
}
class R5 {
  constructor(a) {
    this.getOTP = a == null ? void 0 : a.getOTP;
  }
}
async function k5() {
  const n = Qs(), a = Qs() + Qs(), o = new TextEncoder().encode(a), l = await window.crypto.subtle.digest("SHA-256", o), c = ai(new Uint8Array(l));
  return window.localStorage.setItem(Xg, n), window.localStorage.setItem(Qg, a), {
    csrf_token: n,
    pkce_code_challenge: c
  };
}
async function L$(n) {
  if (n.method !== "oidc")
    throw new Error(`Can't create OIDC extras for method: ${n.method}`);
  let a = {};
  const { client_id: o, provider: l } = n.options;
  let { ux_mode: c, redirect_target: p } = n.options;
  if (c || (c = tc.Popup), p || (p = window.location.href), c === tc.Redirect && !x5(p))
    throw new Error(`If OIDC ux_mode was set to "redirect" a "redirect_target" is required, got ${p}`);
  if (c === tc.Popup) {
    const [y, C] = _5();
    a = {
      ...a,
      popup: y,
      setPopupUrl: C
    };
  }
  const { csrf_token: d, pkce_code_challenge: v } = await k5();
  return {
    ...n,
    options: {
      ...n.options,
      client_id: o,
      provider: l,
      ux_mode: c,
      redirect_target: p,
      csrf_token: d,
      pkce_code_challenge: v
    },
    extras: a
  };
}
async function M$(n) {
  if (n.method !== "saml")
    throw new Error(`Can't create SAML extras for method: ${n.method}`);
  let a = {}, { ux_mode: o, redirect_target: l } = n.options;
  if (o || (o = nc.Popup), l || (l = window.location.href), o === nc.Redirect && !x5(l))
    throw new Error(`If SAML ux_mode was set to "redirect" a "redirect_target" is required, got ${l}`);
  if (o === nc.Popup) {
    const [d, v] = _5();
    a = {
      ...a,
      popup: d,
      setPopupUrl: v
    };
  }
  const { csrf_token: c, pkce_code_challenge: p } = await k5();
  return {
    ...n,
    options: {
      ...n.options,
      ux_mode: o,
      redirect_target: l,
      csrf_token: c,
      pkce_code_challenge: p
    },
    extras: a
  };
}
function ey(n) {
  this.message = n;
}
ey.prototype = new Error(), ey.prototype.name = "InvalidCharacterError";
var h2 = typeof window < "u" && window.atob && window.atob.bind(window) || function(n) {
  var a = String(n).replace(/=+$/, "");
  if (a.length % 4 == 1)
    throw new ey("'atob' failed: The string to be decoded is not correctly encoded.");
  for (var o, l, c = 0, p = 0, d = ""; l = a.charAt(p++); ~l && (o = c % 4 ? 64 * o + l : l, c++ % 4) && (d += String.fromCharCode(255 & o >> (-2 * c & 6))))
    l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(l);
  return d;
};
function I$(n) {
  var a = n.replace(/-/g, "+").replace(/_/g, "/");
  switch (a.length % 4) {
    case 0:
      break;
    case 2:
      a += "==";
      break;
    case 3:
      a += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }
  try {
    return function(o) {
      return decodeURIComponent(h2(o).replace(/(.)/g, function(l, c) {
        var p = c.charCodeAt(0).toString(16).toUpperCase();
        return p.length < 2 && (p = "0" + p), "%" + p;
      }));
    }(a);
  } catch {
    return h2(a);
  }
}
function Kf(n) {
  this.message = n;
}
function q$(n, a) {
  if (typeof n != "string")
    throw new Kf("Invalid token specified");
  var o = (a = a || {}).header === !0 ? 0 : 1;
  try {
    return JSON.parse(I$(n.split(".")[o]));
  } catch (l) {
    throw new Kf("Invalid token specified: " + l.message);
  }
}
Kf.prototype = new Error(), Kf.prototype.name = "InvalidTokenError";
var Og = q$;
const z$ = {
  end_user_read_write: "end_user_read_write",
  end_user_read_only: "end_user_read_only",
  end_user_no_access: "end_user_no_access",
  "person_pool-end_user_read_write": "person_pool-end_user_read_write",
  "person_pool-end_user_read_only": "person_pool-end_user_read_only",
  "person_pool-end_user_no_access": "person_pool-end_user_no_access"
};
class N$ {
  /**
   * Retrieve attributes for a person from the bucket
   *
   * @param attributeNames You can optionally filter which attributes to retrieve by supplying a list of attribute names. If you don't the method returns all attributes.
   *
   * @returns A map from `string` to basic types containing user data previously associated with {@link set}.
   * @throws `Error` if the operation fails.
   */
  async get(a) {
    const o = await this.user.getAttributesClient().getAttributesBucketName({
      bucketName: this.bucketName,
      attributes: a,
      slashIDSdkVersion: Un.raw
    }, {
      cache: "no-cache"
    }), l = o.errors;
    if (l)
      throw l;
    return o.result;
  }
  /**
   * Set attributes for a person in the bucket
   *
   * @param attributes A serializable object to associate with the user credential.
   * @throws `Error` if the operation fails.
   */
  async set(a) {
    const l = (await this.user.getAttributesClient().putAttributesBucketName({
      bucketName: this.bucketName,
      body: a,
      slashIDSdkVersion: Un.raw
    }, {
      cache: "no-cache"
    })).errors;
    if (l)
      throw l;
  }
  /**
   * Delete person attributes from the bucket
   *
   * @param attributeNames You must specify which data attributes to delete by supplying a list of filter strings.
   * @throws `Error` if the operation fails.
   */
  async delete(a) {
    const l = (await this.user.getAttributesClient().deleteAttributesBucketName({
      bucketName: this.bucketName,
      slashIDSdkVersion: Un.raw,
      attributes: a
    }, {
      cache: "no-cache"
    })).errors;
    if (l)
      throw l;
  }
  constructor({ user: a, bucketName: o }) {
    this.user = a, this.bucketName = o;
  }
}
function P$(n) {
  return n ? typeof n.user_token == "string" : !1;
}
class T5 {
  /**
   * Must be called in the constructor, before anything else happens.
   * Initializes the internal state of the instance.
   */
  initialize(a, o) {
    try {
      a = JSON.parse(a);
    } catch {
    }
    if (typeof a != "string")
      throw new TypeError("token must be a string");
    try {
      const c = Og(a);
      P$(c) ? (this._token = c.user_token, this._tokenContainer = a) : this._token = a;
    } catch (c) {
      throw new TypeError(c.toString());
    }
    this._clientOptions = E5(o ?? {});
    const l = new si({
      ...li,
      ...(o == null ? void 0 : o.baseURL) && {
        basePath: o.baseURL
      },
      accessToken: this._token
    });
    this._apiClient = new Po(l), this._attrsClient = new i2(l), this._tokenClient = new s2(l), this._personConsentsApi = new o2(l);
  }
  /**
   * Use a new token to update the internal state of the user. Same set of options is reused.
   */
  updateToken(a) {
    this.initialize(a, this._clientOptions);
  }
  get decoded() {
    if (!this._token)
      throw new Error("Cannot call methods on unauthenticated user");
    try {
      return Og(this._token);
    } catch (a) {
      throw new TypeError(a.toString());
    }
  }
  /**
   * The claims of the user token.
   * @returns {api.UserToken}
   */
  get tokenClaims() {
    return this.decoded;
  }
  get decodedTokenContainer() {
    if (this._tokenContainer)
      try {
        return Og(this._tokenContainer);
      } catch (a) {
        throw new TypeError(a.toString());
      }
  }
  /**
   * If the user instance is created with a {@link Types.TokenContainer} this will return the claims of the token container.
   * Otherwise it will return undefined.
   * @returns {api.TokenContainer | undefined}
   */
  get tokenContainerClaims() {
    return this.decodedTokenContainer;
  }
  updateClient(a) {
    var o;
    this._token = a;
    const l = new si({
      ...li,
      ...((o = this._clientOptions) === null || o === void 0 ? void 0 : o.baseURL) && {
        basePath: this._clientOptions.baseURL
      },
      accessToken: a
    });
    this._apiClient = new Po(l), this._attrsClient = new i2(l), this._tokenClient = new s2(l), this._personConsentsApi = new o2(l);
  }
  /**
   * This user's ID. Use this property in your backend services when interacting with the [SlashID User Management API](https://developer.slashid.dev/docs/category/api/persons).
   */
  get ID() {
    return this.decoded.person_id;
  }
  /**
   * The entire, signed authentication token of this user.
   */
  get token() {
    var a;
    return (a = this._token) !== null && a !== void 0 ? a : "";
  }
  /**
   * The entire token container
   * @returns either the token container string or an empty string
   */
  get tokenContainer() {
    return this._tokenContainer || "";
  }
  /**
   * The organization ID this user belongs to.
   */
  get oid() {
    return this.decoded.oid;
  }
  /**
   * Indicates whether the user has been just registered, otherwise it's a returning user.
   */
  get firstLogin() {
    return this.decoded.first_token;
  }
  /**
   * Indicates which authentication methods the user has been verified with. It can contain multiple items in case of multi factor authentication.
   */
  get authentication() {
    return this.decoded.authenticated_methods || [];
  }
  /**
   * Indicates which authentication methods the user has been verified with, including the handles used for each method.
   */
  get authentications() {
    return this.decoded.authentications || [];
  }
  /**
   * Create a DirectID based on your token
   * @returns directID token
   */
  async createDirectID() {
    const { result: a } = await this._apiClient.postDirectId({
      slashIDSdkVersion: Un.raw
    });
    return a;
  }
  /**
   * Log out of the current session. Clears the SlashID token.
   */
  async logout() {
    this.updateClient(void 0), this._tokenContainer = void 0;
  }
  /**
   * Resolves to a token validity info object which tells if the token is genuine and if it has expired yet.
   * @returns {Promise} Token validity info
   */
  async validateToken() {
    var a;
    const o = await ((a = this._tokenClient) === null || a === void 0 ? void 0 : a.postTokenValidate({
      validateTokenReq: {
        token: this.token
      },
      slashIDSdkVersion: Un.raw
    }, {
      cache: "no-cache"
    })), l = o.errors;
    if (l)
      throw l;
    return o.result;
  }
  /**
   * Get an array of group names that the user belongs to.
   */
  getGroups() {
    const a = this.decoded.groups_claim_name || "groups";
    return this.decoded[a];
  }
  /**
   * Exposes the attributes client so the Bucket instance can access it
   */
  getAttributesClient() {
    return this._attrsClient;
  }
  /**
   *  Creates a {@link Types.Bucket} object used to access attributes.
   *
   * @param bucketName name of the bucket we want to access - uses "end_user_read_write" as default.
   * You can pass in any string that corresponds to a name of a bucket set up for your organization.
   * You can use any of the preset bucket names with corresponding permissions and scopes - {@link Types.DefaultBucketName}.
   * @returns
   */
  getBucket(a = z$.end_user_read_write) {
    return new N$({
      user: this,
      bucketName: a
    });
  }
  /**
   * @deprecated Use {@link getBucket} instead.
   */
  async get(a) {
    return this.getBucket().get(a);
  }
  /**
   * @deprecated Use {@link getBucket} instead.
   */
  async set(a) {
    return this.getBucket().set(a);
  }
  /**
   * @deprecated Use {@link getBucket} instead.
   */
  async delete(a) {
    return this.getBucket().delete(a);
  }
  /**
   * Fetch the GDPR consent levels for the current user.
   * @returns {Promise} GDPR consent info
   */
  async getGDPRConsent() {
    const a = await this._personConsentsApi.getConsentGdpr({
      slashIDSdkVersion: Un.raw
    }), o = a.errors;
    if (o)
      throw o;
    return a.result;
  }
  /**
   * Set the GDPR consent levels for the current user.
   * This will overwrite any existing consent levels and set the consent levels to only the ones included with the request.
   *
   * @param {api.GDPRConsentRequest} request with consentLevels to set
   * @returns {Promise} GDPR consent info
   */
  async setGDPRConsent({ consentLevels: a }) {
    const o = await this._personConsentsApi.putConsentGdpr({
      gDPRConsentRequest: {
        consent_levels: a
      },
      slashIDSdkVersion: Un.raw
    }), l = o.errors;
    if (l)
      throw l;
    return o.result;
  }
  /**
   * Add the GDPR consent levels to the current user.
   * Consent levels not included in the request will not be changed.
   *
   * @param {api.GDPRConsentRequest} request with consent levels to add
   * @returns {Promise} GDPR consent info
   */
  async addGDPRConsent({ consentLevels: a }) {
    const o = await this._personConsentsApi.postConsentGdpr({
      gDPRConsentRequest: {
        consent_levels: a
      },
      slashIDSdkVersion: Un.raw
    }), l = o.errors;
    if (l)
      throw l;
    return o.result;
  }
  /**
   * Remove the GDPR consent levels from the current user.
   * Consent levels not included in the request will not be changed.
   *
   * @param {api.ConsentGdprDeleteRequest} request with consentLevels to remove
   */
  async removeGDPRConsent({ consentLevels: a }) {
    return this._personConsentsApi.deleteConsentGdpr({
      slashIDSdkVersion: Un.raw,
      consentLevels: a
    });
  }
  /**
   * Remove all stored GDPR consent levels from the current user.
   * Consent levels not included in the request will not be changed, unless deleteAll flag is set to true.
   */
  async removeGDPRConsentAll() {
    return this._personConsentsApi.deleteConsentGdpr({
      slashIDSdkVersion: Un.raw,
      deleteAll: !0
    });
  }
  /**
   * Get the organizations the user belongs to.
   * @returns {Promise} A list of organizations the user belongs to
   */
  async getOrganizations() {
    const a = await this._apiClient.getMe(), o = a.errors;
    if (o)
      throw o;
    return a.result.organizations;
  }
  /**
   * Fetch all the handles associated with this user from the SlashID API.
   * @returns {Promise} A list of handles available for the user
   */
  async getHandles() {
    const { errors: a, result: o } = await this._apiClient.getMe();
    if (a)
      throw a;
    return o.handles;
  }
  /**
   * Given an organization ID, get a new token for the same user in the Organization specified by the Organization ID.
   *
   * For the call to succeed the following conditions must be met:
   * - the token must be valid at the time of the request
   * - the two Organizations must share the same person pool
   * - the user must be a member of both Organizations
   *
   * This operation does not count as an authentication, so the new token will have the same expiration time as the original.
   * @param oid
   * @returns {Promise} A new token for the specified Organization ID
   */
  async getTokenForOrganization(a) {
    const o = await this._apiClient.getToken({
      slashIDOrgID: a,
      slashIDSdkVersion: Un.raw
    }), l = o.errors;
    if (l)
      throw l;
    return o.result;
  }
  /**
   * User objects stringify to their token value for convenience:
   *
   * @example
   * ```js
   * user.toString() === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBTbWl0aCIsImlhdCI6MTUxNjIzOTAyMn0.dzKuKf6u9G7Crk9tsFnS2cey1zglWTFQv_hjWjmtXms"
   * ```
   */
  toString() {
    var a, o;
    return (o = (a = this._tokenContainer) !== null && a !== void 0 ? a : this._token) !== null && o !== void 0 ? o : "";
  }
  /**
   * User objects encode to JSON as a string containing their token value.
   *
   * @example
   * ```js
   * JSON.stringify(user) === "\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBTbWl0aCIsImlhdCI6MTUxNjIzOTAyMn0.dzKuKf6u9G7Crk9tsFnS2cey1zglWTFQv_hjWjmtXms\""
   * ```
   */
  toJSON() {
    var a, o;
    return `${(o = (a = this._tokenContainer) !== null && a !== void 0 ? a : this._token) !== null && o !== void 0 ? o : ""}`;
  }
  /**
   * Reconstruct an authenticated user from its token value.
   *
   * @param token A user {@link token} value.
   * @param optionsOrSid SlashID instance or SlashID connection options. It is preferred to pass in the SlashID instance
   *
   * @throws `TypeError` If the given `optionsOrSid`, if defined, fail validation, or
   * the given token cannot be decoded.
   */
  constructor(a, o) {
    this.initialize(a, o);
  }
}
var Wt = {};
nn(Wt, "InvalidAuthenticationMethodError", function() {
  return zo;
});
nn(Wt, "isResponseError", function() {
  return Fo;
});
nn(Wt, "isSlashIDError", function() {
  return dc;
});
nn(Wt, "RESPONSE_HEADERS", function() {
  return $5;
});
nn(Wt, "serialiseResponseError", function() {
  return D5;
});
nn(Wt, "isRateLimitError", function() {
  return hy;
});
nn(Wt, "isTimeoutError", function() {
  return O5;
});
nn(Wt, "isBadPasskeyScopeError", function() {
  return A5;
});
nn(Wt, "isPasskeyPromptError", function() {
  return L5;
});
nn(Wt, "isThrownResponse", function() {
  return Zf;
});
nn(Wt, "isTimeoutInPayload", function() {
  return M5;
});
nn(Wt, "isRateLimitInPayload", function() {
  return I5;
});
nn(Wt, "isOIDCPopupBlockedError", function() {
  return q5;
});
nn(Wt, "RateLimitError", function() {
  return ic;
});
nn(Wt, "clientGeneratedErrorSlugs", function() {
  return z5;
});
nn(Wt, "isClientGeneratedErrorSlug", function() {
  return U$;
});
nn(Wt, "SlashIDError", function() {
  return No;
});
nn(Wt, "toSlashIDError", function() {
  return N5;
});
nn(Wt, "ensureError", function() {
  return F$;
});
nn(Wt, "getErrorMessage", function() {
  return vy;
});
nn(Wt, "createEventFromError", function() {
  return P5;
});
class zo extends Error {
  constructor(a, o) {
    super(`Authentication method '${a}': ${o}`);
  }
}
const op = async (n) => {
  var a, o, l, c, p, d, v;
  if (Fo(n))
    return (v = (o = (await n.response.clone().json()).errors) === null || o === void 0 || (a = o[0]) === null || a === void 0 ? void 0 : a.message) !== null && v !== void 0 ? v : n.message;
  var y;
  return dc(n) ? (y = (d = n.context.response) === null || d === void 0 || (p = d.body) === null || p === void 0 || (c = p.errors) === null || c === void 0 || (l = c[0]) === null || l === void 0 ? void 0 : l.message) !== null && y !== void 0 ? y : n.message : n instanceof Error ? n.message : "";
}, py = (n) => {
  var a, o;
  return Fo(n) ? n.response.status : dc(n) ? (a = n.context.response) === null || a === void 0 ? void 0 : a.status : (o = n.response) === null || o === void 0 ? void 0 : o.status;
};
function Fo(n) {
  return n.name === "ResponseError" && n.response instanceof Response;
}
const $5 = {
  SlashIDCorrelationID: "slashid-correlation-id"
}, D5 = async (n) => ({
  status: n.response.status,
  statusText: n.response.statusText,
  url: n.response.url,
  type: n.response.type,
  ok: n.response.ok,
  redirected: n.response.redirected,
  headers: Object.fromEntries(n.response.headers),
  body: await n.response.clone().json()
});
function hy(n) {
  return py(n) === 429;
}
async function O5(n) {
  const a = py(n), o = await op(n);
  return (a === 401 || a === 403) && o === "authentication has expired";
}
async function A5(n) {
  const a = /selected scope '(.*?)' is not equal to or a registrable domain suffix of origin '(.*?)'/, o = py(n), l = await op(n);
  return o === 400 && a.test(l);
}
async function L5(n) {
  const a = /The operation either timed out or was not allowed. See: https:\/\/www.w3.org\/TR\/webauthn-2\/#sctn-privacy-considerations-client./, o = /This request has been cancelled by the user./, l = /The operation was aborted./, c = /Operation failed./, p = /The WebAuthn API is not available in the current environment/, d = /An unknown error occurred while talking to the credential manager./, v = await op(n);
  return n instanceof Error && (a.test(v) || o.test(v) || l.test(v) || c.test(v) || p.test(v) || d.test(v));
}
function Zf(n) {
  return typeof n == "object" && Array.isArray(n.errors) && n.errors.every((a) => typeof a.httpcode == "number" && typeof a.message == "string");
}
function M5(n) {
  return n.errors.some((a) => a.message === "authentication has expired");
}
function I5(n) {
  return n.errors.some((a) => a.httpcode === 429);
}
async function q5(n) {
  const a = /Popup blocked, please consider redirect instead/, o = await op(n);
  return n instanceof DOMException && a.test(o);
}
class ic extends Error {
  static async fromResponseError(a) {
    const l = (await a.response.clone().json()).errors.find((c) => c.httpcode === 429);
    return l ? new ic(a, l.message) : new ic(a);
  }
  constructor(a, o) {
    super(o || "Too many requests!"), this.name = "RateLimitError", this.response = a.response;
  }
}
const z5 = [
  "incorrect_otp_code_via_email",
  "incorrect_otp_code_via_sms",
  "incorrect_otp_code",
  "invalid_password",
  "incorrect_password",
  "recovery_failed",
  "passkey_bad_scope",
  "passkey_prompt_failed",
  "oidc_popup_blocked",
  "rate_limit_exceeded",
  "timeout",
  "client_side_error",
  "unspecified"
], U$ = (n) => z5.includes(n);
class No extends Error {
  static fromError(a, o) {
    return new No({
      name: a.name,
      message: a.message,
      context: o,
      cause: a
    });
  }
  constructor({ name: a = "SlashIDError", message: o = "An error occured in @slashid/slashid", context: l = {}, cause: c }) {
    super(o, {
      cause: c
    }), this.name = a, this.context = l;
  }
}
function dc(n) {
  return n instanceof No;
}
async function N5(n) {
  if (n instanceof Error) {
    if (Fo(n)) {
      const l = await D5(n);
      return No.fromError(n, {
        response: l,
        correlationId: l.headers[$5.SlashIDCorrelationID]
      });
    }
    return No.fromError(n);
  }
  let a = "[Unable to stringify the thrown value]";
  try {
    a = JSON.stringify(n);
  } catch {
  }
  const o = new Error(`Non-Error thrown: ${a}`);
  return No.fromError(o);
}
function F$(n) {
  if (n instanceof Error)
    return n;
  let a = "[Unable to stringify the thrown value]";
  try {
    a = JSON.stringify(n);
  } catch {
  }
  return new Error(`Non-Error thrown: ${a}`);
}
async function vy(n) {
  return (dc(n) ? n : await N5(n)).message;
}
async function P5(n, { authenticationFactor: a, handle: o, previousToken: l, challengeId: c }) {
  const p = await (async () => {
    if (await L5(n))
      return "passkey_prompt_failed";
    if (await q5(n))
      return "oidc_popup_blocked";
    if (!dc(n) && !Fo(n) && !Zf(n))
      return null;
    if (hy(n))
      return "rate_limit_exceeded";
    if (await O5(n))
      return "timeout";
    if (await A5(n))
      return "passkey_bad_scope";
    if (Zf(n)) {
      if (M5(n))
        return "timeout";
      if (I5(n))
        return "rate_limit_exceeded";
    }
    return "unspecified";
  })();
  return {
    authenticationFactor: a,
    handle: o,
    errorText: p || "client_side_error",
    previousToken: l,
    challengeId: c,
    failureDetail: await vy(n)
  };
}
function rc(n) {
  return new Promise((a) => setTimeout(a, n));
}
async function v2() {
  const n = document.hasFocus();
  for (; !n && !document.hasFocus(); )
    await rc(50);
  return n;
}
const m2 = {
  PopupBlocked: "Popup blocked",
  BadOAuthURL: "Bad OAuth sign in URL"
}, g2 = {
  PopupBlocked: "Popup blocked",
  BadAuthURL: "Bad authentication URL"
};
function V$(n) {
  return n.errorText === "client_side_error";
}
const H$ = [
  "otpSmsSent",
  "otpCodeSent",
  "otpIncorrectCodeSubmitted",
  "passwordSetReady",
  "passwordResetReady",
  "passwordVerifyReady",
  "invalidPasswordSubmitted",
  "incorrectPasswordSubmitted",
  "oauthFlowStarted",
  "oauthFlowFailed",
  "userAuthenticatedFromURL",
  "idFlowSucceeded",
  "idFlowStarted",
  "idFlowFailed",
  "recoveryFlowStarted",
  "recoveryFlowSucceeded",
  "recoveryFlowFailed",
  "webAuthnChallengeProcessed"
], B$ = [
  "otpCodeSubmitted",
  "passwordSubmitted"
], j$ = [
  "clientSideError"
];
function y2(n) {
  return H$.includes(n);
}
function G$(n) {
  return B$.includes(n);
}
function Ag(n) {
  return j$.includes(n);
}
function Y$() {
  const n = /* @__PURE__ */ new Map();
  function a(l) {
    function c(p) {
      l(p.payload);
    }
    return n.set(l, c), c;
  }
  function o(l) {
    if (n.has(l))
      return n.get(l);
  }
  return {
    decorate: a,
    getDecorator: o
  };
}
async function ty(n) {
  return new Promise(async (o, l) => {
    const c = new b$();
    let p = !1;
    const d = (v) => {
      const y = v.data;
      y.id === c.id && (window.removeEventListener("message", d), y.error ? l(y.error) : (p = !0, o(n)));
    };
    for (window.addEventListener("message", d); !p; )
      n.postMessage(c, "*"), await rc(50);
  });
}
class W$ {
  async getRemoteWindow() {
    var a;
    const o = (a = this.remote) === null || a === void 0 ? void 0 : a.contentWindow;
    if (!o)
      throw new Error("this context has no remote");
    return this.remoteReady || (await ty(o), this.remoteReady = !0), o;
  }
  async processEvent(a) {
    let o = null;
    if (window.parent && a.source === window.parent && (o = window.parent), !!o)
      switch (a.data.type) {
        case Wf.StorageGetItem:
          {
            const l = a.data;
            try {
              const c = await this.localGetItem(l.key);
              o.postMessage(new d2(a.data.id, c), "*");
            } catch (c) {
              o.postMessage(new d2(a.data.id, null, c), "*");
            }
          }
          break;
        case Wf.StorageSetItem:
          {
            const l = a.data;
            try {
              await this.localSetItem(l.key, l.value), o.postMessage(new f2(a.data.id), "*");
            } catch (c) {
              o.postMessage(new f2(a.data.id, c), "*");
            }
          }
          break;
      }
  }
  async localGetItem(a) {
    return window.localStorage.getItem(a);
  }
  async remoteGetItem(a) {
    let o = null;
    return this.remote && (o = await new Promise((l, c) => {
      const p = new S$(a), d = (v) => {
        const y = v.data;
        y.id === p.id && (window.removeEventListener("message", d), y.error ? c(y.error) : l(y.value));
      };
      window.addEventListener("message", d), this.getRemoteWindow().then((v) => {
        v.postMessage(p, "*");
      });
    })), o;
  }
  async localSetItem(a, o) {
    return window.localStorage.setItem(a, o);
  }
  async remoteSetItem(a, o) {
    this.remote && await new Promise((l, c) => {
      const p = new _$(a, o), d = (v) => {
        const y = v.data;
        y.id === p.id && (window.removeEventListener("message", d), y.error ? c(y.error) : l());
      };
      window.addEventListener("message", d), this.getRemoteWindow().then((v) => {
        v.postMessage(p, "*");
      });
    });
  }
  constructor(a, o) {
    this.remoteReady = !1, this.remote = a, this.remoteOrigin = o, this.remote || window.addEventListener("message", this.processEvent.bind(this));
  }
}
class U5 {
  constructor(a) {
    this.store = a;
  }
}
class ka extends U5 {
  stringify(a) {
    return JSON.stringify(a);
  }
  parse(a) {
    return a ? JSON.parse(a) : [];
  }
  async getAll() {
    const a = this.parse(await this.store.localGetItem(ka.LOCAL_STORAGE_IDENTIFIERS_KEY)), o = this.parse(await this.store.remoteGetItem(ka.LOCAL_STORAGE_IDENTIFIERS_KEY));
    return ka.merge(a, o);
  }
  async add(a) {
    const o = await this.getAll(), l = this.stringify(ka.merge(o, [
      a
    ]));
    await this.store.localSetItem(ka.LOCAL_STORAGE_IDENTIFIERS_KEY, l), await this.store.remoteSetItem(ka.LOCAL_STORAGE_IDENTIFIERS_KEY, l);
  }
  static identifiersEqual(a, o) {
    return a.type === o.type && a.value === o.value;
  }
  static merge(a, o) {
    return a.concat(...o).reduce((l, c) => {
      for (const p of l)
        if (ka.identifiersEqual(p, c))
          return l;
      return l.push(c), l;
    }, []);
  }
}
ka.LOCAL_STORAGE_IDENTIFIERS_KEY = "SLASHID_IDENTIFIERS";
class sp extends U5 {
  static identifiersEqual(a, o) {
    return a === o;
  }
  static merge(a, o) {
    return a.concat(...o).reduce((l, c) => {
      for (const p of l)
        if (sp.identifiersEqual(p, c))
          return l;
      return l.push(c), l;
    }, []);
  }
}
class oi extends sp {
  stringify(a) {
    return JSON.stringify(a);
  }
  parse(a) {
    if (!a)
      return [];
    let o = null;
    try {
      o = JSON.parse(a);
    } catch {
      return [
        a
      ];
    }
    return Array.isArray(o) ? o.filter((c) => typeof c == "string") : [];
  }
  async getAll() {
    const a = this.parse(await this.store.localGetItem(oi.LOCAL_STORAGE_WEBAUTHN_CREDENTIAL_ID_KEY)), o = this.parse(await this.store.remoteGetItem(oi.LOCAL_STORAGE_WEBAUTHN_CREDENTIAL_ID_KEY));
    return oi.merge(a, o);
  }
  async add(a) {
    const o = await this.getAll(), l = this.stringify(oi.merge(o, [
      a
    ]));
    await this.store.localSetItem(oi.LOCAL_STORAGE_WEBAUTHN_CREDENTIAL_ID_KEY, l), await this.store.remoteSetItem(oi.LOCAL_STORAGE_WEBAUTHN_CREDENTIAL_ID_KEY, l);
  }
}
oi.LOCAL_STORAGE_WEBAUTHN_CREDENTIAL_ID_KEY = "SLASHID_WEBAUTHN_CREDENTIAL_ID";
class oc extends sp {
  stringify(a) {
    return JSON.stringify(a);
  }
  parse(a) {
    if (!a)
      return {};
    let o = null;
    try {
      o = JSON.parse(a);
    } catch {
      return {};
    }
    if (typeof o != "object")
      return {};
    const l = {};
    for (const c of Object.keys(o)) {
      if (typeof c != "string" || !Array.isArray(o[c]))
        continue;
      const p = o[c].filter((d) => typeof d == "string");
      l[c] = p;
    }
    return l;
  }
  async getAll() {
    return this.parse(await this.store.localGetItem(oc.LOCAL_STORAGE_WEBAUTHN_CREDENTIAL_ID_KEY_V2));
  }
  async get(a) {
    return !this.store.remoteOrigin || this.store.remoteOrigin.endsWith(a) ? this.v1Storage.getAll() : (await this.getAll())[a] || [];
  }
  async add(a, o) {
    if (!this.store.remoteOrigin || this.store.remoteOrigin.endsWith(a)) {
      this.v1Storage.add(o);
      return;
    }
    const l = await this.getAll(), c = l[a] || [];
    for (const d of c)
      if (d === o) {
        console.warn(`Attempted to add already present credential ID: scope=${a} credId=${o}`);
        return;
      }
    c.push(o), l[a] = c;
    const p = this.stringify(l);
    await this.store.localSetItem(oc.LOCAL_STORAGE_WEBAUTHN_CREDENTIAL_ID_KEY_V2, p);
  }
  constructor(a) {
    super(a), this.v1Storage = new oi(a);
  }
}
oc.LOCAL_STORAGE_WEBAUTHN_CREDENTIAL_ID_KEY_V2 = "SLASHID_WEBAUTHN_CREDENTIAL_ID_V2";
class Ks extends T5 {
  /**
   * Request the user to authenticate with the given method. This method is essentially equivalent to
   * {@link SlashID.id}, but since the user is already authenticated you can omit the `handle` or
   * `authenticationFactor` parameters, depending on the desired outcome. Please refer to the examples
   * for the use cases this method covers.
   *
   * @param handle A user handle, either a new one to be associated to the user, or an existing
   * one to deliver the authetication request to.
   *
   * @param authenticationFactor The authentication factor, please to refer to {@link SlashID.id}
   * documentation for details.
   *
   * @throws `slashid.errors.InvalidAuthenticationMethodError` if the chosen method is
   * incompatible with the given handle or is not available on the current device.
   * `Error` if the operation fails otherwise.
   *
   * @example
   *
   * One thing you can do with `mfa()` is attach other handles to the user.
   * For example, the user has already authenticated via e-mail magic link with
   * {@link SlashID.id}, but you want to also attach their phone number. In that case all
   * the method requires is the handle, not
   *
   * ```js
   * await user.mfa({
   *   type: "phone_number",
   *   value: "+13337777777"
   * })
   * ```
   *
   * SlashID will send a challenge SMS to the phone number to verify it. If `mfa()` returns
   * without throwing any error the procedure is complete and the user object will have been
   * updated with a refreshed {@link token}. For future authentications the user will be able
   * to use the newly-attached phone number as an alternative to the e-mail address. Consider
   * though that this call only verified ownership of the phone number and added it to the user
   * handles, as such the {@link authentication} array stays unchanged.
   *
   * If you want to step-up the user authentication, or simply re-authenticate the user,
   * you can do so by also providing an authentication factor. For example let's assume
   * you want to send a magic link to one of the user's e-mail address:
   *
   * ```js
   * await user.mfa({
   *   type: "email_address",
   *   value: "..." // one previously-attached address, or a new one to be attached
   * }, {
   *   method: "email_link"
   * })
   * ```
   *
   * If the e-mail address provided above was not attached to the user, SlashID will verify it
   * and also perform the authentication. Once again, when `mfa()` returns the user will have
   * a refreshed {@link token}, but this time its {@link authentication} array will also include
   * `"email_link"` in addition to the method chosen for the first authentication with
   * {@link SlashID.id}.
   *
   * The only edge case to note is that for performing MFA with WebAuthn authentication
   * there's no need to specify an handle, as the ceremony happens on the current device:
   *
   * ```js
   * await user.mfa(undefined, {
   *   method: "webauthn"
   * })
   * ```
   */
  async mfa(a, o) {
    let l;
    if (!a)
      throw new Error("at least one of PersonHandle or Factor is required");
    a.type && a.value && (l = a), a.method && (o = a);
    const c = await this._slashid._id(this.decoded.oid, l, o, this._token);
    this.updateToken(c.toString());
  }
  constructor(a, o) {
    super(a, o), this._slashid = o instanceof Xf ? o : new Xf(o);
  }
}
function K$(n, a) {
  return a.get ? a.get.call(n) : a.value;
}
function F5(n, a, o) {
  if (!a.has(n))
    throw new TypeError("attempted to " + o + " private field on non-instance");
  return a.get(n);
}
function Z$(n, a) {
  var o = F5(n, a, "get");
  return K$(n, o);
}
function V5(n, a) {
  if (a.has(n))
    throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function X$(n, a, o) {
  V5(n, a), a.set(n, o);
}
function Q$(n, a, o) {
  if (a.set)
    a.set.call(n, o);
  else {
    if (!a.writable)
      throw new TypeError("attempted to set read only private field");
    a.value = o;
  }
}
function J$(n, a, o) {
  var l = F5(n, a, "set");
  return Q$(n, l, o), o;
}
function eD(n, a, o) {
  if (!a.has(n))
    throw new TypeError("attempted to get private field on non-instance");
  return o;
}
function tD(n, a) {
  V5(n, a), a.add(n);
}
var Lg = /* @__PURE__ */ new WeakMap(), b2 = /* @__PURE__ */ new WeakSet();
class nD {
  subscribeToDomainEvents() {
    this.sdk.subscribe("idFlowSucceeded", (o) => this.trackAuthenticationSuccess(o)), this.sdk.subscribe("idFlowFailed", (o) => this.trackAuthenticationFailure(o)), this.sdk.subscribe("invalidPasswordSubmitted", (o) => this.trackAuthenticationFailure({
      ...o,
      errorText: "invalid_password"
    })), this.sdk.subscribe("incorrectPasswordSubmitted", (o) => this.trackAuthenticationFailure({
      ...o,
      errorText: "incorrect_password"
    })), this.sdk.subscribe("otpIncorrectCodeSubmitted", (o) => {
      var l;
      const c = (() => {
        var p, d;
        return ((p = o.factor) === null || p === void 0 ? void 0 : p.method) === "otp_via_email" ? "incorrect_otp_code_via_email" : ((d = o.factor) === null || d === void 0 ? void 0 : d.method) === "otp_via_sms" ? "incorrect_otp_code_via_sms" : "incorrect_otp_code";
      })();
      this.trackAuthenticationFailure({
        errorText: c,
        authenticationFactor: {
          method: (l = o.factor) === null || l === void 0 ? void 0 : l.method
        },
        challengeId: o.challengeId
      });
    }), G5(this.sdk).subscribe("clientSideError", (o) => {
      this.trackAuthenticationFailure({
        ...o,
        errorText: "client_side_error"
      });
    });
  }
  getFlowID() {
    return Qs();
  }
  createEventMetadata({ location: a = window.location.href } = {}) {
    var o, l, c;
    return {
      organization_id: (c = (l = this.sdk.oid) !== null && l !== void 0 ? l : (o = this.user) === null || o === void 0 ? void 0 : o.oid) !== null && c !== void 0 ? c : "",
      analytics_correlation_id: Z$(this, Lg),
      window_location: a,
      user_agent: navigator.userAgent
    };
  }
  sendEvent(a) {
    const o = new Blob([
      JSON.stringify(a)
    ], {
      type: "application/json"
    });
    navigator.sendBeacon(`${this.sdk.baseURL}/actions/sdk`, o);
  }
  trackPersonIdentified({ user: a }) {
    const o = {
      event_name: Bs.PersonIdentifiedV1,
      person_id: a.ID
    }, l = {
      ...this.createEventMetadata(),
      event_data: o
    };
    this.sendEvent(l);
  }
  trackPersonLoggedOut(a) {
    const o = this.sdk.getUser(a.token), l = {
      event_name: Bs.PersonLoggedOutV1,
      person_id: o.ID
    }, c = {
      ...this.createEventMetadata(),
      event_data: l
    };
    this.sendEvent(c);
  }
  trackAuthenticationSuccess(a) {
    var o;
    const l = this.sdk.getUser(a.token);
    this.identify(l);
    const c = {
      event_name: Bs.AuthenticationSucceededV1,
      person_id: l.ID,
      success_authn_method: (o = a.authenticationFactor) === null || o === void 0 ? void 0 : o.method,
      authenticated_methods: l.authentication,
      ...a.handle && {
        handle: a.handle
      }
    }, p = {
      ...this.createEventMetadata(),
      event_data: c
    };
    this.sendEvent(p);
  }
  trackAuthenticationFailure(a) {
    var o;
    const l = a.previousToken ? this.sdk.getUser(a.previousToken) : void 0, c = {
      event_name: Bs.AuthenticationFailedV1,
      failed_authn_method: (o = a.authenticationFactor) === null || o === void 0 ? void 0 : o.method,
      authenticated_methods: l == null ? void 0 : l.authentication,
      failure_reason: a.errorText,
      ...a.handle && {
        handle: a.handle
      },
      ...a.challengeId && {
        challenge_id: a.challengeId
      },
      ...a.failureDetail && {
        failure_detail: a.failureDetail
      }
    }, p = {
      ...this.createEventMetadata({}),
      event_data: c
    };
    this.sendEvent(p);
  }
  trackSdkLoaded() {
    const a = {
      ...this.createEventMetadata(),
      event_data: {
        event_name: Bs.SlashIdsdkLoadedV1
      }
    };
    this.sendEvent(a);
  }
  /**
   * Identifies a user for the purpose of user activity tracking. Where possible
   * user identification is done automatically.
   *
   * @param user The user being identified.
   */
  identify(a) {
    this.user = a, this.trackPersonIdentified({
      user: a
    });
  }
  /**
   * Logs the user out from the point-of-view of the {@link Types.Analytics} class only,
   * this method does not have a side-effect which affects the logged in state of the user.
   *
   * After removing a stored token this method should be called to record the log out event.
   */
  logout() {
    const a = this.user;
    a && (this.trackPersonLoggedOut({
      token: a.token
    }), this.user = void 0);
  }
  /**
   * Tracks a virtual page view
   *
   * A virtual page view allows you to track a page view, even when a page is not physically
   * loaded in the browser. For example, when navigating using a client-side router in a
   * single page application, or navigating within a sub-section of a page (like a tabbed pane,
   * or navigation drawer) without changing the page itself.
   *
   * The exact meaning of a virtual page view will vary by implementation, it depends on your
   * routing paradigm and what you're trying to track. You will need to implement this event
   * in a way which makes sense for your product.
   *
   * @param options.url The URL of the page to track as the subject of the virtual page view.
   */
  trackVirtualPageView(a) {
    const { url: o = window.location.href } = a, l = {
      event_name: Bs.VirtualPageLoadedV1
    }, c = {
      ...this.createEventMetadata({
        location: o
      }),
      event_data: l
    };
    this.sendEvent(c);
  }
  constructor(a) {
    tD(this, b2), X$(this, Lg, {
      writable: !0,
      value: void 0
    }), this.sdk = a.sdk, this.eventsAPI = new o$(new si({
      ...li,
      basePath: this.sdk.baseURL
    })), this.user = a.user, this.subscribeToDomainEvents(), this.trackSdkLoaded(), J$(this, Lg, eD(this, b2, rD).call(this));
  }
}
function rD() {
  const n = "@slashid/EVENTS_CORRELATION_ID";
  try {
    const o = sessionStorage.getItem(n);
    if (o)
      return o;
  } catch {
  }
  const a = Qs();
  try {
    sessionStorage.setItem(n, a);
  } catch {
  }
  return a;
}
function aD(n) {
  var a;
  const o = (a = n.pattern_qualifiers) === null || a === void 0 ? void 0 : a.reduce((c, p) => p === "case_insensitive" ? c + "i" : c, "");
  return new RegExp(n.pattern, o);
}
function w2(n) {
  const a = n.options.validation_rules.regular_expressions;
  return a ? a.map((l) => {
    const c = aD(l);
    return {
      type: "regex",
      name: l.name,
      regexp: c,
      matchType: l.match_type
    };
  }) : [];
}
function C2({ password: n, rules: a }) {
  const o = [];
  return a.forEach((l) => {
    const c = l.regexp.test(n);
    (c && l.matchType === "must_not_match" || !c && l.matchType === "must_match") && o.push(l);
  }), o.length === 0 ? {
    valid: !0,
    failedRules: []
  } : {
    valid: !1,
    failedRules: o
  };
}
class ac {
  updateClient(a) {
    this.authnClient = new Po(new si({
      ...li,
      basePath: this.slashID.baseURL,
      ...a && {
        accessToken: a
      }
    }));
  }
  async processChallenges({ challenges: a, authnFactor: o, previousToken: l }) {
    this.updateClient(l);
    let c;
    for (const p of a)
      c = await this.process(p, o);
    if (!c)
      throw new Error("no user token in attestation response");
    return c;
  }
  async process(a, o) {
    let l;
    switch (a.type) {
      case mr.Proxy:
        return this.processProxyChallenge(a);
      case mr.Nonce:
        l = await this.processNonceChallenge(a);
        break;
      case mr.Otp: {
        const d = new R5(o == null ? void 0 : o.options);
        l = await this.processOTPChallenge(a, d);
        break;
      }
      case mr.WebauthnGet:
        l = await this.processWebAuthnGetChallenge(a);
        break;
      case mr.WebauthnCreate:
        l = await this.processWebAuthnCreateChallenge(a);
        break;
      case mr.Oidc:
        return this.processOIDCChallenge(a, o);
      case mr.Saml:
        return this.processSAMLChallenge(a, o);
      case mr.PasswordSet:
        l = await this.processPasswordSetChallenge(a);
        break;
      case mr.PasswordVerify:
        l = await this.processPasswordVerifyChallenge(a);
        break;
      case mr.PasswordReset:
        l = await this.processPasswordResetChallenge(a);
        break;
      default:
        throw new Error("unhandled challenge type: " + a.toString());
    }
    let c;
    try {
      c = await this.authnClient.postAttestationV2({
        // @ts-expect-error challenge_type is typed as possible undefined
        attestation: l,
        slashIDSdkVersion: Un.raw
      }, {
        cache: "no-cache"
      });
    } catch (d) {
      if (Fo(d))
        c = await d.response.json();
      else
        throw d;
    }
    if (Zf(c) && c.errors.length) {
      if (c.errors[0].httpcode === 400 && a.type === mr.PasswordSet)
        return this.notifySlashID("invalidPasswordSubmitted", {
          failedRules: [],
          authenticationFactor: o,
          challengeId: a.id,
          failureDetail: c.errors[0].message
        }), this.process(a, o);
      if (c.errors[0].httpcode === 401 && a.type === mr.PasswordVerify)
        return this.notifySlashID("incorrectPasswordSubmitted", {
          authenticationFactor: o,
          challengeId: a.id,
          failureDetail: c.errors[0].message
        }), this.process(a, o);
      if (c.errors[0].httpcode === 401 && a.type === mr.Otp)
        return this.notifySlashID("otpIncorrectCodeSubmitted", {
          factor: o,
          challengeId: a.id
        }), this.process(a, o);
      throw c;
    }
    const p = c.result;
    if (!p)
      throw new Error("no user token in attestation response");
    if (a.type === mr.WebauthnCreate) {
      const d = a.options;
      this.slashID.credentialStorage.add(d.rp.id, l.data.rawId);
    }
    return p;
  }
  async processProxyChallenge(a) {
    let o;
    for (; !o; ) {
      await rc(1e3);
      const l = await this.authnClient.getChallengeChallengeIdV2({
        challengeId: a.options.challenge_id,
        slashIDSdkVersion: Un.raw
      }, {
        cache: "no-cache"
      });
      if (l.errors && (l.errors.length !== 1 || l.errors[0].httpcode !== 202))
        throw l;
      o = l.result;
    }
    return o;
  }
  async processNonceChallenge(a) {
    var o;
    return {
      challenge_id: a.id,
      challenge_type: a.type,
      data: {
        challenge: (o = a.options) === null || o === void 0 ? void 0 : o.challenge
      }
    };
  }
  shouldProcessEvent(a) {
    var o, l, c, p;
    return !a.meta || !a.meta.authFlowId && !a.meta.recoveryFlowId ? !0 : !(!((o = this.flowMeta) === null || o === void 0) && o.authFlowId && ((l = a.meta) === null || l === void 0 ? void 0 : l.authFlowId) !== this.flowMeta.authFlowId || !((c = this.flowMeta) === null || c === void 0) && c.recoveryFlowId && ((p = a.meta) === null || p === void 0 ? void 0 : p.recoveryFlowId) !== this.flowMeta.recoveryFlowId);
  }
  async processOTPChallenge(a, o) {
    this.notifySlashID("otpSmsSent"), this.notifySlashID("otpCodeSent");
    const l = new Promise((d) => {
      const v = (y) => {
        this.shouldProcessEvent(y) && (this.emitter.off("otpCodeSubmitted", v), d(y.payload));
      };
      this.emitter.on("otpCodeSubmitted", v);
    });
    typeof o.getOTP == "function" && o.getOTP().then((d) => this.notifySlashID("otpCodeSubmitted", d));
    const c = await l;
    if (!c)
      throw new Error("no OTP code provided");
    return {
      challenge_id: a.id,
      challenge_type: a.type,
      data: {
        otp: c
      }
    };
  }
  async processWebAuthnGetChallenge(a) {
    const o = await v2(), l = a.options;
    if (this.slashID.isLocalScope(l.rpId)) {
      const c = {
        challenge: Ws(l.challenge),
        extensions: l.extensions,
        rpId: l.rpId,
        timeout: l.timeout,
        userVerification: l.userVerification
      }, p = l.allowCredentials;
      if (p) {
        c.allowCredentials = new Array(p.length);
        for (let _ = 0; _ < p.length; _++) {
          const R = p[_];
          c.allowCredentials[_] = {
            id: Ws(R.id),
            type: R.type,
            transports: R.transports
          };
        }
      }
      const d = await navigator.credentials.get({
        publicKey: c
      });
      if (!d)
        throw new Error("could not create assert credential");
      const v = d.response, y = ai(new Uint8Array(d.rawId)), C = {
        id: d.id,
        rawId: y,
        type: d.type,
        clientExtensionResults: d.getClientExtensionResults(),
        response: {
          clientDataJSON: ai(new Uint8Array(v.clientDataJSON)),
          authenticatorData: ai(new Uint8Array(v.authenticatorData)),
          signature: ai(new Uint8Array(v.signature)),
          userHandle: v.userHandle ? ai(new Uint8Array(v.userHandle)) : null
        }
      }, $ = {
        challenge_id: a.id,
        challenge_type: a.type,
        data: C
      };
      return this.notifySlashID("webAuthnChallengeProcessed", {
        credentialId: y
      }), $;
    } else {
      const c = this.slashID.getSDKUrl();
      let p;
      if (await Xf.canGetPublicKeyCredentialsInIFrame()) {
        if (p = this.slashID.iframe.contentWindow, !p)
          throw new Error("cannot get global id iframe");
      } else if (o || await rc(200), p = window.open(c.toString()), !p)
        throw new Error("cannot open global id window");
      return new Promise((v, y) => {
        const C = new C$({
          baseURL: this.slashID.baseURL,
          sdkURL: this.slashID.sdkURL
        }, a), $ = (_) => {
          const R = _.data;
          R.id === C.id && (p.close(), window.removeEventListener("message", $), R.error ? y(R.error) : v(R.attestation));
        };
        window.addEventListener("message", $), ty(p).then((_) => {
          _.postMessage(C, c.origin);
        });
      });
    }
  }
  async processWebAuthnCreateChallenge(a) {
    const o = await v2(), l = a.options;
    if (this.slashID.isLocalScope(l.rp.id)) {
      const c = {
        challenge: Ws(l.challenge),
        rp: l.rp,
        user: {
          id: Ws(l.user.id),
          name: l.user.name,
          displayName: l.user.displayName
        },
        pubKeyCredParams: l.pubKeyCredParams,
        authenticatorSelection: l.authenticatorSelection,
        timeout: l.timeout,
        extensions: l.extensions,
        attestation: l.attestation
      }, p = l.excludeCredentials;
      if (p) {
        c.excludeCredentials = new Array(p.length);
        for (let _ = 0; _ < p.length; _++) {
          const R = p[_];
          c.excludeCredentials[_] = {
            id: Ws(R.id),
            type: R.type,
            transports: R.transports
          };
        }
      }
      const d = await navigator.credentials.create({
        publicKey: c
      });
      if (!d)
        throw new Error("cannot create credential");
      const v = d.response, y = ai(new Uint8Array(d.rawId)), C = {
        id: d.id,
        rawId: y,
        type: d.type,
        clientExtensionResults: d.getClientExtensionResults(),
        response: {
          attestationObject: ai(new Uint8Array(v.attestationObject)),
          clientDataJSON: ai(new Uint8Array(v.clientDataJSON))
        }
      }, $ = {
        challenge_id: a.id,
        challenge_type: a.type,
        data: C
      };
      return this.notifySlashID("webAuthnChallengeProcessed", {
        credentialId: y
      }), $;
    } else
      return o || await rc(200), new Promise((p, d) => {
        const v = this.slashID.getSDKUrl(), y = window.open(v.toString());
        if (!y) {
          d(new Error("cannot open global id window"));
          return;
        }
        const C = new w$({
          baseURL: this.slashID.baseURL,
          sdkURL: this.slashID.sdkURL
        }, a), $ = (_) => {
          const R = _.data;
          R.id === C.id && (y.close(), window.removeEventListener("message", $), R.error ? d(R.error) : p(R.attestation));
        };
        window.addEventListener("message", $), ty(y).then((_) => {
          _.postMessage(C, v.origin);
        });
      });
  }
  async processOIDCChallenge(a, o) {
    if (o.options.ux_mode === tc.Popup) {
      var l;
      const p = o.extras.setPopupUrl(a.options.auth_code_url);
      if (!(!(a == null || (l = a.options) === null || l === void 0) && l.auth_code_url)) {
        var c;
        throw this.notifySlashID("oauthFlowFailed", {
          ...o.options,
          reason: m2.BadOAuthURL
        }), new Error(`Bad OAuth URL - got ${a == null || (c = a.options) === null || c === void 0 ? void 0 : c.auth_code_url}`);
      }
      if (!p)
        throw this.notifySlashID("oauthFlowFailed", {
          ...o.options,
          reason: m2.PopupBlocked
        }), new Error("OIDC flow unsuccesful!");
    } else if (o.options.ux_mode === tc.Redirect)
      window.location.assign(a.options.auth_code_url);
    else
      throw new Error(`Unsupported OAuth ux_mode - got ${o.options.ux_mode}`);
    return this.notifySlashID("oauthFlowStarted", o.options), "";
  }
  async processSAMLChallenge(a, o) {
    if (o.options.ux_mode === nc.Popup) {
      var l;
      const p = o.extras.setPopupUrl(a.options.start_authentication_url);
      if (!(!(a == null || (l = a.options) === null || l === void 0) && l.start_authentication_url)) {
        var c;
        throw this.notifySlashID("popupFailed", {
          reason: g2.BadAuthURL
        }), new Error(`Bad authentication URL - got ${a == null || (c = a.options) === null || c === void 0 ? void 0 : c.start_authentication_url}`);
      }
      if (!p)
        throw this.notifySlashID("popupFailed", {
          reason: g2.PopupBlocked
        }), new Error("SAML flow unsuccesful!");
    } else if (o.options.ux_mode === nc.Redirect)
      window.location.assign(a.options.start_authentication_url);
    else
      throw new Error(`Unsupported SAML ux_mode - got ${o.options.ux_mode}`);
    return "";
  }
  async processPasswordSetChallenge(a) {
    this.notifySlashID("passwordSetReady");
    const l = await new Promise((d) => {
      const v = (y) => {
        this.shouldProcessEvent(y) && (this.emitter.off("passwordSubmitted", v), d(y.payload));
      };
      this.emitter.on("passwordSubmitted", v);
    }), c = C2({
      password: l,
      rules: w2(a)
    });
    return c.valid ? {
      challenge_id: a.id,
      challenge_type: a.type,
      data: {
        password: l
      }
    } : (this.notifySlashID("invalidPasswordSubmitted", {
      failedRules: c.failedRules,
      challengeId: a.id,
      failureDetail: `invalid_password: ${c.failedRules.map((d) => d.name).join(",")}`
    }), await this.processPasswordSetChallenge(a));
  }
  processPasswordVerifyChallenge(a) {
    return this.notifySlashID("passwordVerifyReady"), new Promise((l) => {
      const c = (p) => {
        this.shouldProcessEvent(p) && (this.emitter.off("passwordSubmitted", c), l(p.payload));
      };
      this.emitter.on("passwordSubmitted", c);
    }).then((l) => {
      if (!l)
        throw new Error("No password provided");
      return {
        challenge_id: a.id,
        challenge_type: a.type,
        data: {
          password: l
        }
      };
    });
  }
  /**
   * TODO complete copy paste of password set challenge
   * TODO write docs
   */
  async processPasswordResetChallenge(a) {
    this.notifySlashID("passwordResetReady");
    const l = await new Promise((d) => {
      const v = (y) => {
        this.shouldProcessEvent(y) && (this.emitter.off("passwordSubmitted", v), d(y.payload));
      };
      this.emitter.on("passwordSubmitted", v);
    }), c = C2({
      password: l,
      rules: w2(a)
    });
    return c.valid ? {
      challenge_id: a.id,
      challenge_type: a.type,
      data: {
        password: l
      }
    } : (this.notifySlashID("invalidPasswordSubmitted", {
      failedRules: c.failedRules,
      challengeId: a.id,
      failureDetail: `invalid_password: ${c.failedRules.map((d) => d.name).join(",")}`
    }), await this.processPasswordSetChallenge(a));
  }
  constructor(a, o, l) {
    this.notifySlashID = (c, p) => {
      this.emitter.emit({
        name: c,
        payload: p,
        meta: {
          access: "public",
          ...this.flowMeta
        }
      });
    }, this.slashID = a, this.authnClient = new Po(new si({
      ...li,
      basePath: this.slashID.baseURL
    })), this.emitter = o, this.flowMeta = l;
  }
}
class S2 {
  shouldProcessEvent(a) {
    var o;
    return !(this.flowId && ((o = a.meta) === null || o === void 0 ? void 0 : o.authFlowId) !== this.flowId);
  }
  async id(a, o, l) {
    return this._id(a, o, l);
  }
  /**
   * @internal
   */
  async _id(a, o, l, c) {
    if (l)
      switch (l.method) {
        case ir.Webauthn.toString():
          {
            if (!(navigator && window.PublicKeyCredential))
              throw new zo(ir.Webauthn, "The WebAuthn API is not available in the current environment");
            let _ = l.options;
            _ || (_ = {}), _.scope || (_.scope = window.location.hostname);
            const R = await this.slashID.credentialStorage.get(_.scope);
            if (R && (_.available_credential_ids = R), _.attachment || (_.attachment = t2.Any), _.user_verification || (_.user_verification = mT.Preferred), _.resident_key || (_.resident_key = vT.Preferred), _.attestation || (_.attestation = hT.None), _.attachment === t2.Platform && !await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable())
              throw new zo(ir.Webauthn, `This device has no authenticator available with attachment '${_.attachment}'`);
            l.options = _;
          }
          break;
        case ir.EmailLink.toString():
        case ir.OtpViaEmail.toString():
          if (o && o.type !== Xs.EmailAddress)
            throw new zo(l.method, `A handle of type '${Xs.EmailAddress}' is required, got '${o.type}' instead`);
          break;
        case ir.SmsLink.toString():
        case ir.OtpViaSms.toString():
          if (o && o.type !== Xs.PhoneNumber)
            throw new zo(l.method, `A handle of type '${Xs.PhoneNumber}' is required, got '${o.type}' instead`);
          l.options = new R5(l.options);
          break;
        case ir.Oidc.toString():
          {
            if (o)
              throw new zo(l.method, "OIDC should not be used with handles");
            l = await L$(l);
            const _ = (R) => {
              var S, k;
              if (!this.shouldProcessEvent(R))
                return;
              const x = l;
              !(x == null || (S = x.extras) === null || S === void 0) && S.popup && (x == null || (k = x.extras) === null || k === void 0 || k.popup.close()), this.emitter.off("oauthFlowFailed", _);
            };
            this.emitter.on("oauthFlowFailed", _);
          }
          break;
        case ir.Saml.toString():
          {
            if (o)
              throw new zo(l.method, "SAML should not be used with handles");
            l = await M$(l);
            const _ = (R) => {
              var S, k;
              if (!this.shouldProcessEvent(R))
                return;
              const x = l;
              !(x == null || (S = x.extras) === null || S === void 0) && S.popup && (x == null || (k = x.extras) === null || k === void 0 || k.popup.close()), this.emitter.off("popupFailed", _);
            };
            this.emitter.on("popupFailed", _);
          }
          break;
      }
    const p = {
      method: l == null ? void 0 : l.method,
      options: l == null ? void 0 : l.options
    };
    this.emitter.emit({
      name: "idFlowStarted",
      payload: {
        authenticationFactor: l
      },
      meta: {
        authFlowId: this.flowId,
        access: "public"
      }
    });
    const v = await new Po(new si({
      ...li,
      basePath: this.slashID.baseURL,
      ...c && {
        accessToken: c
      }
    })).postId({
      slashIDOrgID: a,
      slashIDSdkVersion: Un.raw,
      iDRequest: {
        handle: o,
        factor: p
      }
    }, {
      cache: "no-cache"
    });
    if (v.errors)
      throw v;
    const y = v.result;
    if (!y)
      throw new Error("no challenges in ID response");
    const $ = await new ac(this.slashID, this.emitter, {
      authFlowId: this.flowId
    }).processChallenges({
      challenges: y,
      authnFactor: l,
      previousToken: c
    });
    if (o)
      try {
        this.slashID.identifiersStorage.add(o);
      } catch (_) {
        console.warn(_);
      }
    return this.emitter.emit({
      name: "idFlowSucceeded",
      payload: {
        token: `${$}`,
        authenticationFactor: l,
        handle: o
      },
      meta: {
        authFlowId: this.flowId,
        access: "public"
      }
    }), this.slashID.getUser($);
  }
  /**
   * Use a verified handle and a factor to start the account recovery flow.
   * The user will receive instructions on how to proceed using a delivery mechanism based on the given handle.
   * After this method resolves, the user will be able to authenticate using the same handle and factor.
   */
  async recover({ handle: a, factor: o }) {
    const l = new Po(new si({
      ...li,
      basePath: this.slashID.baseURL
    })), { result: c } = await l.postRecover({
      recoverRequest: {
        handle: a,
        factor: o
      },
      slashIDSdkVersion: Un.raw,
      slashIDOrgID: this.slashID.oid
    });
    if (!c)
      throw new Error("no result in recover response");
    await new ac(this.slashID, this.emitter, {
      recoveryFlowId: this.flowId
    }).processChallenges({
      challenges: c,
      authnFactor: o
    });
  }
  constructor(a, o) {
    this.slashID = a, this.flowId = Qs(), this.emitter = o;
  }
}
function iD() {
  const n = {}, a = /* @__PURE__ */ new Set();
  function o(d, v) {
    n[d] || (n[d] = /* @__PURE__ */ new Set()), n[d].add(v);
  }
  function l(d, v) {
    const y = n[d];
    y && y.delete(v);
  }
  function c(d) {
    const v = n[d.name];
    if (!v || !v.size)
      return;
    let y = !1;
    const C = a.size > 0 ? [
      ...a
    ].reduce(($, _) => y ? $ : _($, () => {
      y = !0;
    }) || $, d) : d;
    y || v.forEach(($) => $(C));
  }
  function p(d) {
    a.add(d);
  }
  return {
    on: o,
    off: l,
    emit: c,
    use: p
  };
}
const _2 = "__SlashID_iframe", H5 = Symbol(), B5 = Symbol(), j5 = Symbol(), G5 = (n) => ({
  publish: (a, o) => n[H5](a, o),
  subscribe: (a, o) => n[B5](a, o),
  unsubscribe: (a, o) => n[j5](a, o)
});
class Xf {
  /**
   * Get an instance of the Analytics class. Use the instance to track virtual page views.
   * @throws `Error` If analytics is not enabled or oid is not set.
   * @returns Analytics instance
   */
  getAnalytics() {
    if (!this.analytics)
      throw new Error("Analytics has to be enabled and oid has to be set to use this method");
    return this.analytics;
  }
  static async canGetPublicKeyCredentialsInIFrame() {
    const a = window;
    return !!a.chrome && (!!a.chrome.webstore || !!a.chrome.runtime);
  }
  /**
   * Event emitter middleware that prevents events leaking between flows
   */
  createFlowScopeMiddleware() {
    const a = this;
    return function(l, c) {
      var p, d, v, y;
      return l.meta && l.meta.authFlowId && (!((p = a.authFlow) === null || p === void 0) && p.flowId) && ((d = a.authFlow) === null || d === void 0 ? void 0 : d.flowId) !== l.meta.authFlowId || l.meta && l.meta.recoveryFlowId && (!((v = a.recoveryFlow) === null || v === void 0) && v.flowId) && ((y = a.recoveryFlow) === null || y === void 0 ? void 0 : y.flowId) !== l.meta.recoveryFlowId ? c() : l;
    };
  }
  /**
   * Publish an event to the SDK. Currently available events are listed in {@link Types.PublicWriteEvents}.
   * @param type
   * @param event
   */
  publish(a, o) {
    var l, c;
    if (!G$(a))
      throw new Error(`Unsupported event name: ${a}`);
    this.emitter.emit({
      name: a,
      payload: o,
      meta: {
        access: "public",
        authFlowId: (l = this.authFlow) === null || l === void 0 ? void 0 : l.flowId,
        recoveryFlowId: (c = this.recoveryFlow) === null || c === void 0 ? void 0 : c.flowId
      }
    });
  }
  /**
   * Variant of [publish] for private events
   */
  [H5](a, o) {
    var l, c;
    if (!Ag(a))
      throw new Error(`Unsupported event name: ${a}`);
    this.emitter.emit({
      name: a,
      payload: o,
      meta: {
        access: "private",
        authFlowId: (l = this.authFlow) === null || l === void 0 ? void 0 : l.flowId,
        recoveryFlowId: (c = this.recoveryFlow) === null || c === void 0 ? void 0 : c.flowId
      }
    });
  }
  /**
   * Subscribe to the events published by the SDK. Currently available events are listed in {@link Types.PublicReadEvents}.
   * @param type
   * @param handler
   */
  subscribe(a, o) {
    if (!y2(a))
      throw new Error(`Unsupported event name: ${a}`);
    const l = this.emitterDecoratorFactory.decorate(o);
    this.emitter.on(a, l);
  }
  /**
   * Variant of [subscribe] for private events
   */
  [B5](a, o) {
    if (!Ag(a))
      throw new Error(`Unsupported event name: ${a}`);
    const l = this.emitterDecoratorFactory.decorate(o);
    this.emitter.on(a, l);
  }
  /**
   * Unsubscribe from the SDK events. Currently available events are listed in {@link Types.PublicReadEvents}.
   * @param type
   * @param handler
   */
  unsubscribe(a, o) {
    if (!y2(a))
      throw new Error(`Unsupported event name: ${a}`);
    const l = this.emitterDecoratorFactory.getDecorator(o);
    l && this.emitter.off(a, l);
  }
  /**
   * Variant of [subscribe] for private events
   */
  [j5](a, o) {
    if (!Ag(a))
      throw new Error(`Unsupported event name: ${a}`);
    const l = this.emitterDecoratorFactory.getDecorator(o);
    l && this.emitter.off(a, l);
  }
  /**
   * Get a Promise that resolves to an array of challenge objects.
   */
  async getChallengesFromURL() {
    const a = window.location.search, o = new URLSearchParams(a);
    let l;
    const c = o.get(y$), p = o.get(g$);
    if (c && p)
      throw new Error("found both 'challenges' and 'sidcp' URL query parameters");
    if (c) {
      const d = await this.authnClient.getChallengePackChallengePackId({
        challengePackId: c,
        slashIDSdkVersion: Un.raw
      }, {
        cache: "no-cache"
      });
      if (d.errors)
        throw d;
      l = d.result;
    } else if (p) {
      const d = Ws(p), v = new TextDecoder("utf-8").decode(d);
      l = JSON.parse(v);
    }
    return l;
  }
  /**
   * Process authentication challenges from the URL query parameters.
   * You can use this in conjunction with the Direct-ID API to allow your users to land on your
   * target page already authenticated.
   *
   * @returns The authenticated user from the `challenges` URL parameter, if present, `null` otherwise.
   */
  async getUserFromURL() {
    if (!this.urlChallengesUser) {
      let o;
      try {
        o = await this.getChallengesFromURL();
      } catch (l) {
        throw await this.processError(l, {}), l;
      }
      if (o) {
        var a;
        const l = p2(window.location.search);
        l && this.resolveSSOChallenge(l);
        let c;
        try {
          c = await new ac(this, this.emitter).processChallenges({
            challenges: o
          });
        } catch (p) {
          throw await this.processError(p, {}), p;
        }
        if (this.urlChallengesUser = new T5(c, {
          baseURL: this.baseURL,
          sdkURL: this.sdkURL
        }), !((a = this.urlChallengesUser.authentications) === null || a === void 0) && a.length) {
          const p = this.urlChallengesUser.authentications[this.urlChallengesUser.authentications.length - 1];
          this.emitter.emit({
            name: "idFlowSucceeded",
            payload: {
              token: c,
              authenticationFactor: {
                method: p.method
              },
              handle: p.handle
            },
            meta: {
              access: "public"
            }
          });
        }
      }
    }
    return this.urlChallengesUser && this.emitter.emit({
      name: "userAuthenticatedFromURL",
      payload: {
        token: this.urlChallengesUser.token
      },
      meta: {
        access: "public"
      }
    }), this.urlChallengesUser;
  }
  /**
   * This method first checks for URL params associated with SSO. If they are present, it:
   *  - performs CSRF protection checks
   *  - resolves SSO challenge
   * @returns void
   */
  async resolveSSOChallenge({ ssoChallengeID: a, ssoCode: o, csrfToken: l }) {
    if (!(!a || !o || !l))
      try {
        const c = window.localStorage.getItem(Xg);
        if (!c)
          throw new Error("no CSRF token stored");
        if (l !== c)
          throw new Error("CSRF token mismatch");
        const p = window.localStorage.getItem(Qg);
        if (!p)
          throw new Error("no PKCE code verifier stored");
        await this.authnClient.postSsoResolve({
          slashIDOrgID: this.oid,
          postSsoResolveRequest: {
            challenge_id: a,
            code: o,
            pkce_code_verifier: p
          }
        });
      } catch (c) {
        this.processError(c, {});
      } finally {
        window.localStorage.removeItem(Xg), window.localStorage.removeItem(Qg);
      }
  }
  async processEvent(a) {
    if (R$(a.data)) {
      if (a.origin !== this.baseURL)
        return;
      const l = p2(a.data.urlParams);
      l && await this.resolveSSOChallenge(l);
      return;
    }
    let o = null;
    if (window.opener && a.source === window.opener && (o = window.opener), window.parent && a.source === window.parent && (o = window.parent), !!o) {
      if (k$(a.data)) {
        const l = a.data;
        try {
          o.postMessage(new l2(l.id), "*");
        } catch (c) {
          o.postMessage(new l2(l.id, c.toString()), "*");
        }
      }
      if (x$(a.data)) {
        const l = a.data;
        try {
          const p = await new ac(this, this.emitter).processWebAuthnCreateChallenge(l.challenge);
          o.postMessage(new u2(l.id, p), "*");
        } catch (c) {
          o.postMessage(new u2(l.id, null, c.toString()), "*");
        }
      }
      if (E$(a.data)) {
        const l = a.data;
        try {
          const p = await new ac(this, this.emitter).processWebAuthnGetChallenge(l.challenge);
          o.postMessage(new c2(l.id, p), "*");
        } catch (c) {
          o.postMessage(new c2(l.id, null, c.toString()), "*");
        }
      }
    }
  }
  async listenForEvents() {
    window.addEventListener("message", this.processEvent.bind(this));
  }
  setupIFrame() {
    const a = this.getSDKUrl().toString();
    if (l$(new URL(window.location.href), new URL(this.sdkURL)))
      return null;
    let o = document.getElementById(_2);
    return o && o.src !== a && (o.remove(), o = null), o || (o = document.createElement("iframe"), o.id = _2, o.allow = "publickey-credentials-get *", o.src = a, o.style.display = "none", document.body.appendChild(o)), o;
  }
  /**
   * List the available authentication methods for the chosen handle type. Currently available
   * authentication methods are listed in {@link Types.FactorMethod}. Before choosing a method to pass
   * to {@link id} you should consult the result of this method. In particular the availability of
   * the {@link Types.FactorMethod['Webauthn']} method depends on the current device configuration and
   * might not always be available.
   *
   * It's important to note that you can rely on some authentication methods to always be available:
   *
   *  - for {@link PersonHandleType['EmailAddress']}: {@link Types.FactorMethod['OtpViaEmail']} and
   *    {@link Types.FactorMethod['EmailLink']} are always available;
   *  - for {@link PersonHandleType['PhoneNumber']}: {@link Types.FactorMethod['OtpViaSms']} and
   *    {@link Types.FactorMethod['SmsLink']} are always available;
   *
   * On the contrary, the availability of {@link Types.FactorMethod['Webauthn']} depends exclusively on the
   * current device configuration.
   *
   * @remarks The availability of authetication methods can vary over time, you probably should not
   * cache or store the result and instead invoke the method any time you need to authenticate a user.
   *
   * @example
   *
   * SlashID supports a number of handle types, each in turn supporting a set of
   * authentication methods. Supposing you identify your users with e-mail addresses,
   * you should check the authentication methods available on the current device before
   * kicking off the authentication flow:
   *
   * ```js
   * const availableMethods = sid.getAvailableAuthenticationMethods("email_address")
   * // => availableMethods === ["webauthn", "email_link"]
   * ```
   *
   * At this point you can choose which method to use in {@link id}. You could decide based on
   * one or a combination of:
   *
   *  - Your static preference: e.g. require WebAuthn, prefer WebAuthn ({@link Types.FactorMethod['Webauthn']})
   *    if available, otherwise fallback to magic link via e-mail ({@link Types.FactorMethod['EmailLink']})
   *    ```
   *    const chosenMethod = availableMethods.includes("webauthn") ? "webauthn" : "email_link"
   *    ```
   *  - User's choice: you could present your users with a selection of the available methods;
   *
   * In general the SlashID SDK does not impose any restriction on how you decide to choose which
   * authentication method to use.
   *
   * @param handleType Available handle types are ``"email_address"``, ``"phone_number"``
   * @returns  An array of the available authentication methods on this device.
   */
  async getAvailableAuthenticationMethods(a) {
    const o = [
      ir.Password
    ];
    switch (a) {
      case Xs.EmailAddress:
        o.push(ir.EmailLink, ir.OtpViaEmail);
        break;
      case Xs.PhoneNumber:
        o.push(ir.SmsLink, ir.OtpViaSms);
        break;
      default:
        throw new Error(`unhandled handle type: ${a}`);
    }
    return navigator && window.PublicKeyCredential && o.unshift(ir.Webauthn), o;
  }
  /**
   * Preferred way of creating  a {@link Types.BaseUser} instance based on an existing token.
   *
   * @param token A user {@link Types.UserTokenText} value.
   * @returns User instance
   */
  getUser(a) {
    return new Ks(a, this);
  }
  /**
   * Identify a user. This method implements the SlashID authentication flow.
   * In particular the flow is:
   *
   *  - **passwordless**: all you need to specify to authenticate a user is their handle,
   *    be it an e-mail address or phone number, and how they wish to authenticate; please see
   *    the parameters documentation for more details;
   *
   *  - **unified**: it does not require you to differentiate between first registration and
   *    subsequent logins attempts. The SlashID service takes care of the distinction and will
   *    perform the necessary verification ceremonies on your behalf under the hood.
   *
   *  - **synchronous**: on successful return the user has verified their identity; even when
   *    the authentication spans multiple devices and is comprised of multiple steps (e.g
   *    clicking a magic link on the provided e-mail address and creating a new biometric
   *    credential on the current device), this method will not return until all steps have
   *    completed or errors have been encountered.
   *
   *
   * Before utilizing any authentication method you should check whether it is available with {@link getAvailableAuthenticationMethods}.
   *
   * The currently available options for the `authenticationFactor.method` field are:
   *
   *  - **``"webauthn"``**: Authenticate the user via WebAuthn on this device. If available this
   *    usually entails built-in biometric authentication or the use of an external FIDO key, with a
   *    preference for the former. Please also see the [WebAuthn scope](#webauthn_scope) and
   *    [WebAuthn attachment](#webauthn_attachment) sections below for details.
   *
   *  - **``"email_link"``**: Deliver a magic link via e-mail.
   *
   *  - **``"otp_via_email"``**: Deliver an OTP security code via e-mail. This authentication method requires you to {@link publish} an
   *    `otpCodeSubmitted` event to the SDK. The event payload must be a string containing the OTP
   *    value, which your user will receive via e-mail.
   *
   *  - **``"sms_link"``**: Deliver a magic link via SMS.
   *
   *  - **``"otp_via_sms"``**: Deliver an OTP security code via SMS. This authentication method requires you to {@link publish} an
   *    `otpCodeSubmitted` event to the SDK. The event payload must be a string containing the OTP
   *    value, which your user will receive via SMS.
   *
   *  - **``oidc``**: Authenticate the user using OIDC through a preconfigured Identity Provider.
   *
   * <a name="webauthn_scope"></a>
   * <b>WebAuthn scope</b>
   *
   * In case you have chosen the WebAuthn method, you have the option to specify a `scope`
   * in the `options` field. This field allows you to control the breadth of your users' WebAuthn credentials.
   * The field is optional, but if specified it can either be your domain or any "registrable domain suffix" of it.
   * E.g. if your domain is `shop.domain.com` you have two options to choose from:
   *
   *  - `shop.domain.com`: scope your users to the current domain. Credentials created here will not be shared with sibling domains such as `services.domain.com`;
   *  - `domain.com`: scope your users to the least specific domain. Credentials created here will be allowed to access all subdomains such as `services.domain.com`;
   *
   * Please consult the HTML spec for the formal definition of [registrable domain suffix](https://html.spec.whatwg.org/multipage/origin.html#is-a-registrable-domain-suffix-of-or-is-equal-to)
   * if you need detailed information. When not specified the `scope` option defaults to the current origin, `shop.domain.com`
   * in the example above.
   *
   * <a name="webauthn_attachment"></a>
   * <b>WebAuthn attachment</b>
   *
   * Users can perform WebAuthn either with built-in authenticators (FaceID, TouchID, fingerprint readers, etc.)
   * or external security keys, and in case you have a preference you can control which authenticator type to use
   * by specifying an `attachment` option field in the `options` field.
   * The field is optional and has 3 allowed values from the {@link WebAuthnAuthenticatorAttachment} enum:
   *
   *  - `"platform"`: mandate use of built-in authenticators;
   *  - `"cross-platform"`: mandate use of external security keys;
   *  - `"any"`: the default value if unspecified, allows both types;
   *
   * If left unspecified (or explicitly set to `"any"`) the user will be prompted with a system dialog to choose
   * which type of authenticator they prefer. By providing one of the other options instead (e.g. `"platform"`)
   * you explicitly limit the authenticator types the user can choose from. On most devices this results in the
   * most seamless WebAuthn user experience possible, as the system dialog will not be shown and the user will be
   * prompted to authenticate directly.
   *
   * @param oid Your organization ID.
   * @param handle How the user wishes to identify, e.g. their e-mail address.
   * @param authenticationFactor How to verify the user's identity matches the handle.
   *
   * @throws `slashid.errors.InvalidAuthenticationMethodError` if the chosen method is
   * incompatible with the given handle or is not available on the current device.
   *
   * @fires {@link Types.IdFlowSucceededEvent} when the flow resolves successfully
   *
   * @returns The authenticated user.
   *
   * @example
   *
   * Authenticating a user is as simple as:
   *
   * ```js
   * const user = await slashID.id({
   *   type: "phone_number",
   *   value: "+13337777777",
   * }, {
   *   method: "webauthn"
   * })
   * ```
   *
   * At this point the user has been authenticated; either registered or logged in.
   *
   * You can use it in a header in your HTTP requests:
   *
   * ```js
   * const response = await fetch(url, {
   *   ...
   *   headers: {
   *     'Authorization': `Bearer ${user.token}`,
   *      ...
   *   }
   * });
   * ```
   *
   * You can collect and associate user attributes:
   *
   * ```js
   * const userDetails = { name: "...", streetAddress: "..." }
   * await user.set(userDetails)
   * ```
   *
   * You can perform multi-factor authentication before proceeding with your application logic:
   *
   * ```js
   * await user.mfa({
   *   type: "email_address",
   *   value: "my.email@example.com"
   * }, {
   *   method: "email_link"
   * })
   * ```
   */
  async id(a, o, l) {
    return this._id(a, o, l);
  }
  createAuthFlow() {
    const a = new S2(this, this.emitter);
    return this.authFlow = a, a;
  }
  clearAuthFlow(a) {
    this.authFlow === a && (this.authFlow = null);
  }
  createRecoveryFlow() {
    const a = new S2(this, this.emitter);
    return this.recoveryFlow = a, a;
  }
  clearRecoveryFlow(a) {
    this.recoveryFlow === a && (this.recoveryFlow = null);
  }
  /**
   * @internal
   */
  async _id(a, o, l, c) {
    const p = this.createAuthFlow();
    try {
      return await p._id(a, o, l, c);
    } catch (d) {
      throw await this.processError(d, {
        authenticationFactor: l,
        handle: o,
        previousToken: c
      }), Fo(d) && hy(d) ? await ic.fromResponseError(d) : d;
    } finally {
      this.clearAuthFlow(p);
    }
  }
  /**
   * List the handles previously used to authenticate successfully.
   *
   * @remarks Use of this method is in no way required to authenticate with SlashID. The SDK
   * provides it to allow you to more easily implement loging suggestion drop-down lists
   * and similar UX niceties, by e.g. tying it to a `<datalist>`:
   *
   * ```js
   * const handles = await sid.getAvailableIdentifiers()
   * const options = handles.map((handle) => {
   *   const option = document.createElement("option")
   *   option.value = handle.value
   *   return option
   * })
   * const datalist = document.getElementById("available_identifiers")
   * datalist.replaceChildren(...options)
   *
   * ...
   *
   * <input ... list="available_identifiers" />
   * ```
   *
   * Depending on browser settings, it may not be possible to discover these
   * identifiers.
   *
   * @returns An array of identifiers of previously-authenticated users.
   */
  async getAvailableIdentifiers() {
    try {
      return this.identifiersStorage.getAll();
    } catch (a) {
      return console.warn(a), [];
    }
  }
  /**
   * Use a verified handle and a factor to start the account recovery flow.
   * The user will receive instructions on how to proceed using a delivery mechanism based on the given handle.
   * After this method resolves, the user will be able to authenticate using the same handle and factor.
   */
  async recover({ handle: a, factor: o }) {
    if (!this.oid)
      throw new Error("oid is required - please initialize the SDK with an organization ID");
    const l = this.createRecoveryFlow();
    this.emitter.emit({
      name: "recoveryFlowStarted",
      payload: {
        handle: a,
        authenticationFactor: o
      },
      meta: {
        access: "public",
        recoveryFlowId: l.flowId
      }
    });
    try {
      await l.recover({
        handle: a,
        factor: o
      }), this.recoveryFlow = null, this.emitter.emit({
        name: "recoveryFlowSucceeded",
        payload: {
          handle: a,
          authenticationFactor: o
        },
        meta: {
          access: "public",
          recoveryFlowId: l.flowId
        }
      });
    } catch (c) {
      const p = await vy(c), d = {
        errorText: "recovery_failed",
        authenticationFactor: o,
        handle: a,
        failureDetail: p
      };
      throw this.emitter.emit({
        name: "recoveryFlowFailed",
        payload: d,
        meta: {
          access: "public",
          recoveryFlowId: l.flowId
        }
      }), c;
    } finally {
      this.clearRecoveryFlow(l);
    }
  }
  getSDKUrl() {
    const a = new URL(this.sdkURL);
    return a.searchParams.append("v", Un.raw), a;
  }
  isLocalScope(a) {
    return window.location.hostname.endsWith(a);
  }
  /**
   * Examine the error object and publish the proper event as a reaction to it.
   */
  async processError(a, { authenticationFactor: o, handle: l, previousToken: c, challengeId: p }) {
    var d, v;
    const y = await P5(a, {
      authenticationFactor: o,
      handle: l,
      previousToken: c,
      challengeId: p
    });
    V$(y) ? G5(this).publish("clientSideError", y) : this.emitter.emit({
      name: "idFlowFailed",
      payload: y,
      meta: {
        access: "public",
        authFlowId: (d = this.authFlow) === null || d === void 0 ? void 0 : d.flowId,
        recoveryFlowId: (v = this.recoveryFlow) === null || v === void 0 ? void 0 : v.flowId
      }
    });
  }
  /**
   * @example
   *
   * For production you can simply create your _SlashID_ instance with:
   *
   * ```js
   * import * as slashid from "slashid"
   * const sid = new slashid.SlashID()
   * ```
   *
   * If you want to experiment and connect to the sandbox environment instead:
   *
   * ```js
   * const sid = new slashid.SlashID({
   *   environment: "sandbox"
   * })
   * ```
   *
   * @param options Your SlashID connection options.
   * @throws `TypeError` If the given `options`, if defined, fail validation
   */
  constructor(a) {
    a && D$(a);
    const { baseURL: o, sdkURL: l, oid: c, analyticsEnabled: p = !0 } = E5(a ?? {});
    this.baseURL = o, this.sdkURL = l, this.oid = c, this.authFlow = null, this.recoveryFlow = null, this.authnClient = new Po(new si({
      ...li,
      basePath: this.baseURL
    })), this.iframe = this.setupIFrame();
    const d = new W$(this.iframe, this.getSDKUrl().origin);
    this.identifiersStorage = new ka(d), this.credentialStorage = new oc(d), this.urlChallengesUser = null, this.emitter = iD(), this.emitter.use(this.createFlowScopeMiddleware()), this.emitterDecoratorFactory = Y$(), this.analytics = p ? new nD({
      sdk: this
    }) : void 0, this.listenForEvents();
  }
}
Zs("lDZ5d");
({
  ...Wt
});
const x2 = {
  ...Wt
};
var E2 = "sid-theme-root", oD = "_1fuhtfd2", sD = "_1fuhtfd0", lD = "_1fuhtfd1", Y5 = { color: { background: "var(--sid-color-background)", mute: "var(--sid-color-mute)", panel: "var(--sid-color-panel)", foreground: "var(--sid-color-foreground)", contrast: "var(--sid-color-contrast)", secondary: "var(--sid-color-secondary)", tertiary: "var(--sid-color-tertiary)", placeholder: "var(--sid-color-placeholder)", smooth: "var(--sid-color-smooth)", subtle: "var(--sid-color-subtle)", soft: "var(--sid-color-soft)", offset: "var(--sid-color-offset)", primary: "var(--sid-color-primary)", primaryHover: "var(--sid-color-primary-hover)", transparent: "var(--sid-color-transparent)", error: "var(--sid-color-error)", auxiliary: "var(--sid-color-auxiliary)", success: "var(--sid-color-success)", foregroundSuccess: "var(--sid-color-foreground-success)", backgroundSuccess: "var(--sid-color-background-success)", failure: "var(--sid-color-failure)", foregroundFailure: "var(--sid-color-foreground-failure)", backgroundFailure: "var(--sid-color-background-failure)" }, font: { fontFamily: "var(--sid-font-family)" }, border: { radius: "var(--sid-button-border-radius)", width: { panel: "var(--sid-border-width-panel)" } }, input: { border: { radius: "var(--sid-input-border-radius)", color: "var(--sid-input-border-color)" }, label: { color: "var(--sid-input-label-color)" } }, button: { border: { radius: "var(--sid-button-border-radius)" } }, form: { border: { radius: "var(--sid-form-border-radius)" }, logo: { width: "var(--sid-form-logo-width)" } } }, uD = "_1fuhtfd3";
function ny() {
  return typeof window < "u" && globalThis === window;
}
function W5({ theme: n, className: a }) {
  return mt(
    E2,
    `${E2}__${n}`,
    uD,
    {
      [sD]: n === "dark",
      [oD]: n === "auto",
      [lD]: n === "light"
    },
    a
  );
}
function cD({ theme: n, className: a }) {
  const o = W5({ theme: n, className: a });
  document.body.classList.add(...o.split(" "));
}
const K5 = ({ children: n }) => /* @__PURE__ */ b.jsx("div", { className: W5({ theme: "light" }), children: n }), dD = ({ children: n, theme: a = "light", className: o }) => {
  const [l, c] = wt.useState(!1);
  return w.useLayoutEffect(() => {
    l || c(!0);
  }, [o, l, a]), w.useLayoutEffect(() => {
    l && cD({ theme: a, className: o });
  }, [o, l, a]), l ? /* @__PURE__ */ b.jsx(b.Fragment, { children: n }) : /* @__PURE__ */ b.jsx(K5, { children: n });
};
function fD({ children: n, theme: a = "light", className: o }) {
  return ny() ? /* @__PURE__ */ b.jsx(dD, { theme: a, className: o, children: n }) : /* @__PURE__ */ b.jsx(K5, { children: n });
}
var pD = { default: "_1v32gdc2 _1v32gdc1", short: "_1v32gdc3 _1v32gdc1" };
const Z5 = ({ className: n, variant: a = "default" }) => /* @__PURE__ */ b.jsx("div", { className: mt(pD[a], n) });
var hD = { primary: "_154fc2o2 _154fc2o0", secondary: "_154fc2o3 _154fc2o0", secondaryMd: "_154fc2o4 _154fc2o0 _154fc2o1", neutral: "_154fc2o5 _154fc2o0", neutralMd: "_154fc2o6 _154fc2o0 _154fc2o1", ghost: "_154fc2o7 _154fc2o0", ghostMd: "_154fc2o8 _154fc2o0 _154fc2o1" }, vD = "_154fc2o9", mD = "_154fc2oa", gD = { primary: "_154fc2ob", secondary: "_154fc2oc", secondaryMd: "_154fc2od", neutral: "_154fc2oe", neutralMd: "_154fc2of", ghost: "_154fc2og", ghostMd: "_154fc2oh" };
const nl = w.forwardRef(
  ({
    children: n,
    onClick: a,
    className: o,
    type: l = "button",
    variant: c = "primary",
    testId: p,
    icon: d,
    disabled: v,
    loading: y = !1,
    style: C
  }, $) => /* @__PURE__ */ b.jsx(
    "button",
    {
      style: C,
      ref: $,
      "data-testid": p,
      type: l,
      disabled: v,
      className: mt(
        "sid-button",
        `sid-button--${c}`,
        hD[c],
        { [vD]: v },
        o
      ),
      onClick: a,
      children: y ? /* @__PURE__ */ b.jsx(Z5, { variant: "short", className: gD[c] }) : /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
        d ? /* @__PURE__ */ b.jsx("i", { className: mD, children: d }) : null,
        n
      ] })
    }
  )
);
nl.displayName = "Button";
const yD = ({ className: n }) => /* @__PURE__ */ b.jsx(
  "svg",
  {
    className: mt(n),
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ b.jsx(
      "path",
      {
        d: "M10.25 3.75L5.75 8L10.25 12.25",
        stroke: Y5.color.tertiary,
        strokeOpacity: "0.5",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
);
var bD = { base: "axg5it0", back: "axg5it2 axg5it0" };
const lp = ({
  children: n,
  onClick: a,
  className: o,
  type: l = "button",
  variant: c = "base",
  testId: p
}) => /* @__PURE__ */ b.jsxs(
  "button",
  {
    "data-testid": p,
    type: l,
    className: mt("sid-link-button", bD[c], o),
    onClick: a,
    children: [
      c === "back" ? /* @__PURE__ */ b.jsx(yD, {}) : null,
      n
    ]
  }
);
var wD = "_1c8zcycb", CD = "_1c8zcyc2", X5 = "_1c8zcyc4", my = "_1c8zcyc3", SD = "_1c8zcyc0", _D = { text: "_1c8zcyc6 _1c8zcyc5", email: "_1c8zcyc7 _1c8zcyc5", password: "_1c8zcyc8 _1c8zcyc5", tel: "_1c8zcyc9 _1c8zcyc5" }, xD = "_1c8zcyca", ED = "_1c8zcycc", RD = "_1c8zcyc1";
const gy = ({
  id: n,
  name: a,
  label: o,
  placeholder: l = "",
  autoComplete: c = "",
  value: p,
  onChange: d,
  type: v = "text",
  style: y
}) => {
  const C = w.useCallback(
    ($) => {
      d($);
    },
    [d]
  );
  return /* @__PURE__ */ b.jsxs("div", { className: _D[v], children: [
    /* @__PURE__ */ b.jsx("label", { htmlFor: n, className: xD, children: o }),
    /* @__PURE__ */ b.jsx(
      "input",
      {
        style: y,
        type: v,
        id: n,
        name: a,
        className: SD,
        placeholder: l,
        value: p,
        onChange: C,
        autoComplete: c
      }
    )
  ] });
}, kD = ({
  name: n,
  id: a,
  label: o,
  placeholder: l = "",
  className: c = "",
  type: p = "text",
  value: d,
  error: v,
  onChange: y,
  style: C
}) => /* @__PURE__ */ b.jsx(
  "div",
  {
    className: mt(
      "sid-input",
      `sid-input--${p}`,
      my,
      v && X5,
      c
    ),
    children: /* @__PURE__ */ b.jsx(
      gy,
      {
        style: C,
        id: a,
        name: n,
        label: o,
        placeholder: l,
        className: c,
        type: p,
        value: d,
        onChange: y
      }
    )
  }
), Or = `
@media (prefers-color-scheme: dark) {
  .sid-theme-root__auto path { fill: white; }
}

.sid-theme-root__dark path { fill: white; }
`, TD = () => /* @__PURE__ */ b.jsxs(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ b.jsx("style", { children: Or }),
      /* @__PURE__ */ b.jsx(
        "path",
        {
          d: "M11.0791 0C11.1164 0 11.1536 0 11.1929 0C11.2843 1.12835 10.8536 1.97146 10.3302 2.582C9.81657 3.18834 9.11328 3.7764 7.9758 3.68717C7.89992 2.57498 8.33131 1.79441 8.85403 1.18526C9.33881 0.617573 10.2276 0.112414 11.0791 0Z",
          fill: "black"
        }
      ),
      /* @__PURE__ */ b.jsx(
        "path",
        {
          d: "M14.5225 11.7444C14.5225 11.7557 14.5225 11.7655 14.5225 11.776C14.2028 12.7442 13.7468 13.574 13.1904 14.344C12.6824 15.0431 12.0599 15.9838 10.9484 15.9838C9.988 15.9838 9.35005 15.3663 8.36573 15.3494C7.32449 15.3325 6.75188 15.8658 5.79988 16C5.69098 16 5.58208 16 5.47529 16C4.77621 15.8988 4.21203 15.3452 3.80102 14.8463C2.58906 13.3723 1.65251 11.4683 1.47827 9.03174C1.47827 8.79286 1.47827 8.55469 1.47827 8.31581C1.55204 6.57199 2.39936 5.15417 3.52561 4.46704C4.12 4.10169 4.9371 3.79045 5.84695 3.92956C6.23689 3.98998 6.63526 4.12347 6.98444 4.25556C7.31536 4.38273 7.72918 4.60826 8.12123 4.59631C8.3868 4.58859 8.65098 4.45018 8.91866 4.35252C9.70275 4.06937 10.4714 3.74478 11.4845 3.89724C12.7021 4.08132 13.5663 4.62231 14.1002 5.45698C13.0702 6.1125 12.2559 7.10033 12.3951 8.78724C12.5187 10.3196 13.4096 11.2161 14.5225 11.7444Z",
          fill: "black"
        }
      )
    ]
  }
), $D = () => /* @__PURE__ */ b.jsxs(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ b.jsx("style", { children: Or }),
      /* @__PURE__ */ b.jsxs("g", { id: "microsoft-icon 1", clipPath: "url(#clip0_2115_8900)", children: [
        /* @__PURE__ */ b.jsx("path", { id: "Vector", d: "M0 0H7.6031V7.6031H0V0Z", fill: "#F25022" }),
        /* @__PURE__ */ b.jsx("path", { id: "Vector_2", d: "M8.39691 0H16V7.6031H8.39691V0Z", fill: "#7FBA00" }),
        /* @__PURE__ */ b.jsx("path", { id: "Vector_3", d: "M0 8.3969H7.6031V16H0V8.3969Z", fill: "#00A4EF" }),
        /* @__PURE__ */ b.jsx(
          "path",
          {
            id: "Vector_4",
            d: "M8.39691 8.3969H16V16H8.39691V8.3969Z",
            fill: "#FFB900"
          }
        )
      ] }),
      /* @__PURE__ */ b.jsx("defs", { children: /* @__PURE__ */ b.jsx("clipPath", { id: "clip0_2115_8900", children: /* @__PURE__ */ b.jsx("rect", { width: "16", height: "16", fill: "white" }) }) })
    ]
  }
), DD = () => /* @__PURE__ */ b.jsxs(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ b.jsx("style", { children: Or }),
      /* @__PURE__ */ b.jsx("g", { clipPath: "url(#clip0_505_1607)", children: /* @__PURE__ */ b.jsxs("g", { clipPath: "url(#clip1_505_1607)", children: [
        /* @__PURE__ */ b.jsx(
          "path",
          {
            d: "M0.575299 0.87666C0.501037 0.8757 0.427465 0.891009 0.359751 0.921512C0.292036 0.952016 0.231821 0.996974 0.183333 1.05323C0.134846 1.10949 0.099262 1.17567 0.0790809 1.24715C0.0588998 1.31862 0.0546107 1.39365 0.066515 1.46695L2.2264 14.5788C2.2533 14.7392 2.33588 14.8851 2.45964 14.9907C2.58339 15.0963 2.74041 15.1549 2.9031 15.1563H13.2649C13.3868 15.1578 13.5053 15.1155 13.5986 15.0371C13.692 14.9586 13.7541 14.8493 13.7736 14.7289L15.9335 1.4695C15.9454 1.39619 15.9411 1.32118 15.9209 1.24971C15.9007 1.17825 15.8651 1.11208 15.8166 1.05583C15.7681 0.999591 15.7079 0.954646 15.6402 0.924154C15.5725 0.893661 15.4989 0.878361 15.4247 0.879327L0.575299 0.87666ZM9.67013 10.3531H6.36292L5.46743 5.67469H10.4715L9.67013 10.3531Z",
            fill: "#2684FF"
          }
        ),
        /* @__PURE__ */ b.jsx(
          "path",
          {
            d: "M15.2335 5.66811H10.4623L9.66148 10.3428H6.35693L2.45502 14.9743C2.57869 15.0812 2.73636 15.1407 2.89985 15.142H13.2559C13.3778 15.1436 13.4961 15.1013 13.5894 15.023C13.6828 14.9446 13.7448 14.8353 13.7643 14.715L15.2335 5.66811Z",
            fill: "url(#paint0_linear_505_1607)"
          }
        )
      ] }) }),
      /* @__PURE__ */ b.jsxs("defs", { children: [
        /* @__PURE__ */ b.jsxs(
          "linearGradient",
          {
            id: "paint0_linear_505_1607",
            x1: "16.3366",
            y1: "6.97722",
            x2: "10.8251",
            y2: "14.803",
            gradientUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ b.jsx("stop", { offset: "0.18", stopColor: "#0052CC" }),
              /* @__PURE__ */ b.jsx("stop", { offset: "1", stopColor: "#2684FF" })
            ]
          }
        ),
        /* @__PURE__ */ b.jsx("clipPath", { id: "clip0_505_1607", children: /* @__PURE__ */ b.jsx("rect", { width: "16", height: "16", fill: "white" }) }),
        /* @__PURE__ */ b.jsx("clipPath", { id: "clip1_505_1607", children: /* @__PURE__ */ b.jsx(
          "rect",
          {
            width: "16",
            height: "14.4384",
            fill: "white",
            transform: "translate(0 0.780792)"
          }
        ) })
      ] })
    ]
  }
), OD = () => /* @__PURE__ */ b.jsxs(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ b.jsx("style", { children: Or }),
      /* @__PURE__ */ b.jsx("g", { clipPath: "url(#clip0_244_1220)", children: /* @__PURE__ */ b.jsx(
        "path",
        {
          d: "M8 0.0410004C3.582 0.0410004 0 3.623 0 8.041C0 12.0517 2.95467 15.3637 6.804 15.9423V10.161H4.82467V8.05833H6.804V6.659C6.804 4.34233 7.93267 3.32567 9.858 3.32567C10.78 3.32567 11.268 3.39433 11.4987 3.425V5.26033H10.1853C9.368 5.26033 9.08267 6.03567 9.08267 6.909V8.05833H11.478L11.1533 10.161H9.08267V15.959C12.9873 15.4297 16 12.091 16 8.041C16 3.623 12.418 0.0410004 8 0.0410004Z",
          fill: "#1877F2"
        }
      ) }),
      /* @__PURE__ */ b.jsx("defs", { children: /* @__PURE__ */ b.jsx("clipPath", { id: "clip0_244_1220", children: /* @__PURE__ */ b.jsx("rect", { width: "16", height: "16", fill: "white" }) }) })
    ]
  }
), AD = () => /* @__PURE__ */ b.jsxs(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ b.jsx("style", { children: Or }),
      /* @__PURE__ */ b.jsx("g", { clipPath: "url(#clip0_505_1582)", children: /* @__PURE__ */ b.jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M7.97616 0.163269C3.56555 0.163269 0 3.75511 0 8.1987C0 11.7507 2.28457 14.7574 5.45388 15.8216C5.85012 15.9016 5.99527 15.6487 5.99527 15.4359C5.99527 15.2496 5.9822 14.6111 5.9822 13.9458C3.76343 14.4248 3.30139 12.9879 3.30139 12.9879C2.94482 12.0567 2.41649 11.8173 2.41649 11.8173C1.69029 11.3251 2.46939 11.3251 2.46939 11.3251C3.27494 11.3783 3.69763 12.1499 3.69763 12.1499C4.41061 13.3737 5.55951 13.0279 6.02171 12.815C6.08767 12.2962 6.2991 11.937 6.52359 11.7375C4.75396 11.5512 2.89208 10.8594 2.89208 7.7729C2.89208 6.89486 3.20882 6.17649 3.71069 5.6178C3.63151 5.41829 3.35412 4.59331 3.79004 3.48915C3.79004 3.48915 4.46351 3.27625 5.98204 4.31396C6.63218 4.13807 7.30265 4.04859 7.97616 4.04784C8.64963 4.04784 9.33616 4.14106 9.97012 4.31396C11.4888 3.27625 12.1623 3.48915 12.1623 3.48915C12.5982 4.59331 12.3207 5.41829 12.2415 5.6178C12.7566 6.17649 13.0602 6.89486 13.0602 7.7729C13.0602 10.8594 11.1984 11.5378 9.41551 11.7375C9.70612 11.9902 9.9569 12.4691 9.9569 13.2274C9.9569 14.305 9.94384 15.1698 9.94384 15.4358C9.94384 15.6487 10.0891 15.9016 10.4852 15.8217C13.6545 14.7572 15.9391 11.7507 15.9391 8.1987C15.9522 3.75511 12.3736 0.163269 7.97616 0.163269Z",
          fill: "#24292F"
        }
      ) }),
      /* @__PURE__ */ b.jsx("defs", { children: /* @__PURE__ */ b.jsx("clipPath", { id: "clip0_505_1582", children: /* @__PURE__ */ b.jsx("rect", { width: "16", height: "16", fill: "white" }) }) })
    ]
  }
), LD = () => /* @__PURE__ */ b.jsxs(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ b.jsx("style", { children: Or }),
      /* @__PURE__ */ b.jsxs("g", { clipPath: "url(#clip0_505_1689)", children: [
        /* @__PURE__ */ b.jsx(
          "path",
          {
            d: "M15.7337 6.39379L15.7112 6.33631L13.5335 0.652895C13.4892 0.541503 13.4107 0.447009 13.3094 0.382971C13.2079 0.32002 13.0897 0.289702 12.9705 0.296108C12.8513 0.302514 12.7369 0.345337 12.6429 0.418794C12.5498 0.494361 12.4824 0.596756 12.4496 0.712045L10.9792 5.21079H5.02499L3.55457 0.712045C3.52268 0.596128 3.45505 0.49322 3.36129 0.417961C3.26722 0.344503 3.15287 0.301681 3.03368 0.295274C2.9145 0.288868 2.79622 0.319187 2.69481 0.382138C2.5937 0.446435 2.51531 0.540846 2.47071 0.652062L0.288816 6.33298L0.267156 6.39046C-0.046338 7.20957 -0.0850337 8.1084 0.156903 8.95142C0.39884 9.79444 0.908292 10.536 1.60845 11.0642L1.61595 11.07L1.63594 11.0842L4.95335 13.5685L6.59456 14.8106L7.59428 15.5654C7.71122 15.6542 7.85401 15.7023 8.00083 15.7023C8.14766 15.7023 8.29045 15.6542 8.40739 15.5654L9.40711 14.8106L11.0483 13.5685L14.3857 11.0692L14.3941 11.0625C15.0926 10.5342 15.6009 9.79344 15.8425 8.95156C16.084 8.10967 16.0459 7.21213 15.7337 6.39379Z",
            fill: "#E24329"
          }
        ),
        /* @__PURE__ */ b.jsx(
          "path",
          {
            d: "M15.7336 6.39379L15.7111 6.3363C14.65 6.55411 13.6501 7.00358 12.7828 7.6526L7.99994 11.2691C9.62865 12.5013 11.0466 13.5718 11.0466 13.5718L14.384 11.0725L14.3923 11.0658C15.0919 10.5375 15.601 9.79631 15.8429 8.9537C16.0848 8.1111 16.0464 7.21272 15.7336 6.39379Z",
            fill: "#FC6D26"
          }
        ),
        /* @__PURE__ */ b.jsx(
          "path",
          {
            d: "M4.95331 13.5718L6.59452 14.8139L7.59424 15.5687C7.71118 15.6575 7.85397 15.7056 8.00079 15.7056C8.14762 15.7056 8.29041 15.6575 8.40735 15.5687L9.40707 14.8139L11.0483 13.5718C11.0483 13.5718 9.62867 12.4979 7.99996 11.2691C6.37125 12.4979 4.95331 13.5718 4.95331 13.5718Z",
            fill: "#FCA326"
          }
        ),
        /* @__PURE__ */ b.jsx(
          "path",
          {
            d: "M3.21633 7.65262C2.34974 7.00226 1.35002 6.55163 0.288816 6.33299L0.267156 6.39048C-0.046338 7.20959 -0.0850337 8.10841 0.156903 8.95143C0.398839 9.79446 0.908292 10.536 1.60845 11.0642L1.61595 11.07L1.63594 11.0842L4.95335 13.5685C4.95335 13.5685 6.36962 12.4979 8 11.2658L3.21633 7.65262Z",
            fill: "#FC6D26"
          }
        )
      ] }),
      /* @__PURE__ */ b.jsx("defs", { children: /* @__PURE__ */ b.jsx("clipPath", { id: "clip0_505_1689", children: /* @__PURE__ */ b.jsx("rect", { width: "16", height: "16", fill: "white" }) }) })
    ]
  }
), MD = () => /* @__PURE__ */ b.jsxs(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ b.jsx("style", { children: Or }),
      /* @__PURE__ */ b.jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M15.6801 8.1818C15.6801 7.61453 15.6292 7.06908 15.5346 6.54544H8.00006V9.63999H12.3055C12.1201 10.64 11.5564 11.4873 10.7092 12.0545V14.0618H13.2946C14.8073 12.6691 15.6801 10.6182 15.6801 8.1818Z",
          fill: "#4285F4"
        }
      ),
      /* @__PURE__ */ b.jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M8.00001 16C10.16 16 11.9709 15.2836 13.2946 14.0618L10.7091 12.0545C9.99274 12.5345 9.07638 12.8182 8.00001 12.8182C5.91638 12.8182 4.15274 11.4109 3.52365 9.52H0.850922V11.5927C2.16729 14.2073 4.87274 16 8.00001 16Z",
          fill: "#34A853"
        }
      ),
      /* @__PURE__ */ b.jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M3.52364 9.51998C3.36364 9.03998 3.27273 8.52726 3.27273 7.99998C3.27273 7.47271 3.36364 6.95998 3.52364 6.47998V4.40726H0.850909C0.309091 5.48726 0 6.70908 0 7.99998C0 9.29089 0.309091 10.5127 0.850909 11.5927L3.52364 9.51998Z",
          fill: "#FBBC05"
        }
      ),
      /* @__PURE__ */ b.jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M8.00001 3.18182C9.17456 3.18182 10.2291 3.58545 11.0582 4.37818L13.3527 2.08364C11.9673 0.792727 10.1564 0 8.00001 0C4.87274 0 2.16729 1.79273 0.850922 4.40727L3.52365 6.48C4.15274 4.58909 5.91638 3.18182 8.00001 3.18182Z",
          fill: "#EA4335"
        }
      )
    ]
  }
), ID = () => /* @__PURE__ */ b.jsxs(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ b.jsx("style", { children: Or }),
      /* @__PURE__ */ b.jsxs("g", { clipPath: "url(#clip0_505_1637)", children: [
        /* @__PURE__ */ b.jsx(
          "path",
          {
            d: "M12.5339 16H3.46615C1.55208 16 0 14.4479 0 12.5339V3.46615C0 1.55208 1.55208 0 3.46615 0H12.5326C14.4479 0 15.9987 1.55208 15.9987 3.46615V12.5326C16 14.4479 14.4479 16 12.5339 16Z",
            fill: "#00B900"
          }
        ),
        /* @__PURE__ */ b.jsx(
          "path",
          {
            d: "M13.7995 7.29688C13.7995 4.69011 11.1862 2.56902 7.97396 2.56902C4.76172 2.56902 2.14844 4.69011 2.14844 7.29688C2.14844 9.63412 4.22135 11.5912 7.02083 11.9609C7.21094 12.0013 7.46875 12.0859 7.53385 12.2487C7.59245 12.3958 7.57161 12.6263 7.55208 12.7747C7.55208 12.7747 7.48438 13.1862 7.46875 13.2734C7.44271 13.4206 7.35156 13.849 7.97396 13.5872C8.59505 13.3255 11.3294 11.612 12.5508 10.2057C13.3945 9.27865 13.7995 8.33985 13.7995 7.29688Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ b.jsx(
          "path",
          {
            d: "M6.79039 6.03645H6.38153C6.31903 6.03645 6.26825 6.08723 6.26825 6.14973V8.6875C6.26825 8.75 6.31903 8.80078 6.38153 8.80078H6.79039C6.85289 8.80078 6.90367 8.75 6.90367 8.6875V6.14973C6.90367 6.08723 6.85289 6.03645 6.79039 6.03645Z",
            fill: "#00B900"
          }
        ),
        /* @__PURE__ */ b.jsx(
          "path",
          {
            d: "M9.60286 6.03646H9.19401C9.13151 6.03646 9.08073 6.08724 9.08073 6.14974V7.65756L7.91797 6.08724C7.91536 6.08334 7.91276 6.07943 7.90885 6.07553C7.90885 6.07553 7.90885 6.07553 7.90885 6.07422C7.90625 6.07162 7.90365 6.06902 7.90234 6.06771C7.90104 6.06771 7.90104 6.06641 7.89974 6.06511C7.89714 6.06381 7.89583 6.0612 7.89323 6.0599C7.89193 6.0586 7.89193 6.0586 7.89062 6.0573C7.88932 6.05599 7.88672 6.05469 7.88542 6.05339C7.88411 6.05209 7.88281 6.05209 7.88151 6.05079C7.87891 6.04948 7.8776 6.04818 7.875 6.04688C7.8737 6.04688 7.8724 6.04558 7.87109 6.04558C7.86849 6.04428 7.86719 6.04297 7.86458 6.04297C7.86328 6.04297 7.86198 6.04167 7.86068 6.04167C7.85807 6.04037 7.85677 6.04037 7.85417 6.03907C7.85286 6.03907 7.85156 6.03907 7.85026 6.03777C7.84766 6.03777 7.84635 6.03646 7.84375 6.03646C7.84245 6.03646 7.84115 6.03646 7.83854 6.03516C7.83594 6.03516 7.83464 6.03516 7.83203 6.03386C7.82943 6.03386 7.82813 6.03386 7.82682 6.03386C7.82552 6.03386 7.82422 6.03386 7.82292 6.03386H7.41406C7.35156 6.03386 7.30078 6.08464 7.30078 6.14714V8.6849C7.30078 8.7474 7.35156 8.79818 7.41406 8.79818H7.82292C7.88542 8.79818 7.9362 8.7474 7.9362 8.6849V7.18099L9.10026 8.75391C9.10807 8.76563 9.11849 8.77475 9.12891 8.78126C9.12891 8.78126 9.13021 8.78125 9.13021 8.78256C9.13281 8.78386 9.13542 8.78516 9.13672 8.78646C9.13802 8.78646 9.13932 8.78777 9.14062 8.78777C9.14193 8.78907 9.14453 8.78907 9.14583 8.79037C9.14714 8.79167 9.14974 8.79167 9.15104 8.79297C9.15234 8.79297 9.15365 8.79428 9.15495 8.79428C9.15755 8.79558 9.16016 8.79558 9.16276 8.79688H9.16406C9.17318 8.79948 9.18359 8.80079 9.19271 8.80079H9.60156C9.66406 8.80079 9.71484 8.75001 9.71484 8.68751V6.14974C9.71615 6.08724 9.66536 6.03646 9.60286 6.03646Z",
            fill: "#00B900"
          }
        ),
        /* @__PURE__ */ b.jsx(
          "path",
          {
            d: "M5.80597 8.16536H4.69529V6.14973C4.69529 6.08723 4.64451 6.03645 4.58201 6.03645H4.17316C4.11066 6.03645 4.05988 6.08723 4.05988 6.14973V8.68749C4.05988 8.71744 4.07159 8.74609 4.09113 8.76562L4.09243 8.76692L4.09373 8.76822C4.11456 8.78775 4.14191 8.79947 4.17185 8.79947H5.80467C5.86717 8.79947 5.91795 8.74869 5.91795 8.68619V8.27734C5.91925 8.21744 5.86847 8.16536 5.80597 8.16536Z",
            fill: "#00B900"
          }
        ),
        /* @__PURE__ */ b.jsx(
          "path",
          {
            d: "M11.8594 6.67187C11.9219 6.67187 11.9726 6.62109 11.9726 6.55859V6.14973C11.9726 6.08723 11.9219 6.03645 11.8594 6.03645H10.2265C10.1966 6.03645 10.1679 6.04817 10.1484 6.06901L10.1471 6.07031C10.1471 6.07161 10.1458 6.07161 10.1458 6.07291C10.1263 6.09374 10.1146 6.12109 10.1146 6.15104V8.6888C10.1146 8.71875 10.1263 8.74739 10.1458 8.76692L10.1471 8.76822L10.1484 8.76953C10.1693 8.78906 10.1966 8.80208 10.2265 8.80208H11.8594C11.9219 8.80208 11.9726 8.7513 11.9726 8.6888V8.27994C11.9726 8.21744 11.9219 8.16666 11.8594 8.16666H10.7487V7.73828H11.8594C11.9219 7.73828 11.9726 7.68749 11.9726 7.62499V7.21614C11.9726 7.15364 11.9219 7.10286 11.8594 7.10286H10.7487V6.67447H11.8594V6.67187Z",
            fill: "#00B900"
          }
        )
      ] }),
      /* @__PURE__ */ b.jsx("defs", { children: /* @__PURE__ */ b.jsx("clipPath", { id: "clip0_505_1637", children: /* @__PURE__ */ b.jsx("rect", { width: "16", height: "16", fill: "white" }) }) })
    ]
  }
), qD = () => /* @__PURE__ */ b.jsxs(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ b.jsx("style", { children: Or }),
      /* @__PURE__ */ b.jsx("g", { clipPath: "url(#clip0_3100_16)", children: /* @__PURE__ */ b.jsx("g", { clipPath: "url(#clip1_3100_16)", children: /* @__PURE__ */ b.jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M8.80298 0.115361L8.47375 4.16602C8.31816 4.14796 8.16258 4.13894 8.00298 4.13894C7.80323 4.13894 7.6075 4.15198 7.41578 4.18307L7.22908 2.22094C7.22506 2.15875 7.27425 2.10458 7.33648 2.10458H7.66973L7.50913 0.120377C7.50511 0.0581823 7.5543 0.00401306 7.61151 0.00401306H8.7006C8.76283 0.00401306 8.81202 0.0581823 8.80298 0.115361ZM7.13573 4.23223C6.78441 4.31248 6.45116 4.44088 6.14401 4.60941L5.29483 2.82884C5.26873 2.77567 5.29483 2.70947 5.35304 2.6864L5.66823 2.57103L4.83711 0.759374C4.81101 0.706207 4.83711 0.640001 4.89533 0.616928L5.91816 0.243762C5.97538 0.221693 6.03761 0.257806 6.05568 0.314985C6.05969 0.314985 7.13573 4.23223 7.13573 4.23223ZM3.54828 1.44351L5.9001 4.75586C5.60198 4.95147 5.33096 5.18219 5.1001 5.44903L3.68981 4.0637C3.64564 4.01956 3.65066 3.94834 3.69483 3.90821L3.95279 3.69455L2.55154 2.27812C2.50737 2.23398 2.51239 2.16276 2.56057 2.12263L3.39269 1.42546C3.44087 1.38533 3.50813 1.39436 3.54326 1.44351H3.54828ZM4.92243 5.67072C4.70863 5.9506 4.53598 6.26157 4.4065 6.59461L2.61076 5.77304C2.55254 5.75097 2.53046 5.67975 2.56158 5.62658L2.73021 5.33768L0.925441 4.48502C0.872242 4.45893 0.850159 4.39172 0.881276 4.33856L1.42331 3.39762C1.45442 3.34445 1.52569 3.3264 1.57488 3.36151L4.92243 5.67072ZM0.244889 5.9195C0.253923 5.8573 0.316156 5.8222 0.373371 5.83524L4.30813 6.86144C4.20574 7.19448 4.14853 7.54558 4.13949 7.90972L2.17011 7.74922C2.10788 7.7452 2.06271 7.68702 2.07676 7.62483L2.13397 7.2968L0.14652 7.11022C0.0842868 7.1052 0.04514 7.04803 0.0531701 6.98583L0.23987 5.91549L0.244889 5.9195ZM0.0943244 8.5748L4.14451 8.20163C4.16258 8.56176 4.23385 8.91285 4.34426 9.24088L2.44213 9.76552C2.38391 9.77856 2.32168 9.74345 2.31264 9.68125L2.25543 9.35223L0.32519 9.85379C0.267976 9.86784 0.205742 9.83173 0.196708 9.76953L0.00498944 8.69919C-0.00404444 8.63699 0.0361061 8.57981 0.0983395 8.5748H0.0943244ZM0.730711 11.3906C0.699594 11.3374 0.721677 11.2712 0.774876 11.2441L4.44765 9.5037C4.58517 9.83173 4.77187 10.1387 4.9937 10.4135L3.38466 11.5591C3.33548 11.5952 3.26421 11.5812 3.23309 11.528L3.06446 11.2351L1.42431 12.3677C1.37513 12.4028 1.30386 12.3857 1.27274 12.3325C1.27274 12.3325 0.725692 11.3906 0.730711 11.3906ZM6.0075 11.2973L4.8873 12.9224C4.85217 12.9766 4.7809 12.9846 4.73171 12.9455L4.47375 12.7278L3.31841 14.3529C3.28228 14.402 3.21603 14.411 3.16685 14.3709L2.33071 13.6737C2.28253 13.6336 2.27751 13.5624 2.32168 13.5182L5.1804 10.6272C5.42532 10.884 5.70537 11.1107 6.0075 11.2973ZM4.61628 15.2677C4.55806 15.2456 4.53197 15.1784 4.55806 15.1253L6.25242 11.4307C6.56358 11.5902 6.90185 11.7106 7.25317 11.7768L6.7543 13.6868C6.74125 13.744 6.675 13.7801 6.61678 13.758L6.3016 13.6426L5.77262 15.5656C5.75455 15.6228 5.69232 15.6589 5.6341 15.6359L4.61227 15.2637L4.61628 15.2677ZM8.00399 11.8571C8.20374 11.8571 8.39947 11.843 8.59018 11.8119L8.77688 13.775C8.7819 13.8372 8.73272 13.8904 8.67048 13.8904H8.33724L8.49683 15.8756C8.50587 15.9378 8.45769 15.991 8.39545 15.991H7.30537C7.24815 15.991 7.19897 15.9378 7.20298 15.8756L7.53222 11.826C7.6878 11.848 7.84338 11.8571 8.00399 11.8571ZM9.75555 4.55122C9.44439 4.39574 9.11114 4.27536 8.7548 4.20514L9.25267 2.29517C9.27074 2.23699 9.33297 2.20188 9.39119 2.22395L9.70637 2.33931L10.2354 0.416301C10.2534 0.359123 10.3157 0.32301 10.3739 0.345079L11.3957 0.718245C11.4539 0.740314 11.481 0.802508 11.4539 0.86069L9.75555 4.55122ZM13.6863 2.47273L10.8266 5.36376C10.5867 5.10596 10.3116 4.88025 10.0045 4.69367L11.1247 3.06759C11.1608 3.01944 11.2321 3.00539 11.2803 3.04552L11.5382 3.2632L12.6946 1.63812C12.7297 1.58897 12.801 1.57994 12.8451 1.62006L13.6813 2.31724C13.7305 2.35737 13.7305 2.42859 13.6863 2.47273ZM15.2291 4.75085L11.5563 6.49229C11.4138 6.16326 11.2321 5.8563 11.0093 5.58144L12.6183 4.43586C12.6675 4.39574 12.7387 4.41379 12.7699 4.46696L12.9385 4.75586L14.5796 3.62332C14.6288 3.59223 14.6991 3.60527 14.7302 3.65843L15.2773 4.60038C15.3084 4.65354 15.2913 4.71975 15.2331 4.74683L15.2291 4.75085ZM15.8113 6.22044L15.998 7.29078C16.007 7.35298 15.9668 7.40614 15.9046 7.41517L11.8544 7.79235C11.8364 7.42821 11.7651 7.08213 11.6547 6.7531L13.5578 6.22947C13.615 6.21141 13.6773 6.25154 13.6863 6.31373L13.7445 6.64276L15.6737 6.14019C15.732 6.12715 15.7942 6.16326 15.8022 6.22545L15.8113 6.22044ZM15.6246 10.1457L11.6898 9.1195C11.7922 8.78646 11.8504 8.43636 11.8594 8.07223L13.8288 8.23172C13.8911 8.24075 13.9312 8.29392 13.9222 8.35611L13.864 8.68514L15.8514 8.87173C15.9136 8.87975 15.9538 8.93292 15.9448 8.99511L15.7581 10.0655C15.749 10.1276 15.6868 10.1638 15.6296 10.1507L15.6246 10.1457ZM14.5796 12.5924C14.5485 12.6455 14.4773 12.6586 14.4281 12.6275L11.0805 10.3182C11.2943 10.0384 11.467 9.7274 11.5965 9.39436L13.3922 10.2159C13.4504 10.243 13.4725 10.3092 13.4414 10.3624L13.2727 10.6513L15.0775 11.504C15.1307 11.531 15.1528 11.5972 15.1217 11.6504L14.5796 12.5924ZM10.0978 11.2291C10.396 11.0385 10.663 10.8028 10.8988 10.5369L12.3081 11.9223C12.3523 11.9664 12.3523 12.0376 12.3031 12.0777L12.0451 12.2904L13.4464 13.7078C13.4865 13.752 13.4865 13.8232 13.4374 13.8623L12.6062 14.5605C12.5611 14.5996 12.4898 14.5916 12.4547 14.5424L10.1029 11.2291H10.0978ZM10.0798 15.7412C10.0226 15.7633 9.96032 15.7282 9.94225 15.67L8.86622 11.7537C9.21754 11.6735 9.55079 11.5451 9.85794 11.3755L10.7071 13.1571C10.7332 13.2143 10.7071 13.2815 10.6489 13.2986L10.3337 13.4139L11.1648 15.2266C11.1909 15.2838 11.1648 15.346 11.1066 15.368L10.0848 15.7412H10.0798Z",
          fill: "black"
        }
      ) }) }),
      /* @__PURE__ */ b.jsxs("defs", { children: [
        /* @__PURE__ */ b.jsx("clipPath", { id: "clip0_3100_16", children: /* @__PURE__ */ b.jsx("rect", { width: "16", height: "16", fill: "white" }) }),
        /* @__PURE__ */ b.jsx("clipPath", { id: "clip1_3100_16", children: /* @__PURE__ */ b.jsx("rect", { width: "16", height: "16", fill: "white" }) })
      ] })
    ]
  }
), zD = ({ className: n }) => /* @__PURE__ */ b.jsx(
  "svg",
  {
    className: n,
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ b.jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M0.716186 4.04581C0 5.03155 0 6.4377 0 9.25V10.75C0 13.5623 0 14.9684 0.716186 15.9542C0.947485 16.2725 1.22745 16.5525 1.54581 16.7838C2.53155 17.5 3.9377 17.5 6.75 17.5H11.25V19.375C11.25 19.8582 11.7749 20.1587 12.1916 19.9139L16.25 17.5C16.6491 17.2339 16.8487 17.1009 17.0291 16.9642C18.7741 15.6422 19.8543 13.6238 19.9863 11.4386C20 11.2126 20 10.9727 20 10.4931V8.53757C20 6.40191 20 5.33408 19.5778 4.52129C19.222 3.83642 18.6636 3.278 17.9787 2.92223C17.1659 2.5 16.0981 2.5 13.9624 2.5H6.75C3.9377 2.5 2.53155 2.5 1.54581 3.21619C1.22745 3.44748 0.947485 3.72745 0.716186 4.04581ZM2.5 7.1875C2.5 6.66973 2.91973 6.25 3.4375 6.25H10.3125C10.8303 6.25 11.25 6.66973 11.25 7.1875C11.25 7.70527 10.8303 8.125 10.3125 8.125H3.4375C2.91973 8.125 2.5 7.70527 2.5 7.1875ZM3.4375 10.625C2.91973 10.625 2.5 11.0447 2.5 11.5625C2.5 12.0803 2.91973 12.5 3.4375 12.5H6.5625C7.08027 12.5 7.5 12.0803 7.5 11.5625C7.5 11.0447 7.08027 10.625 6.5625 10.625H3.4375Z",
        fill: "white"
      }
    )
  }
), ND = ({ className: n }) => /* @__PURE__ */ b.jsxs(
  "svg",
  {
    className: mt(n),
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ b.jsx("style", { children: Or }),
      /* @__PURE__ */ b.jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM12.0676 5.49021C12.3384 5.17673 12.3037 4.70312 11.9902 4.43238C11.6767 4.16164 11.2031 4.1963 10.9324 4.50979L6.78035 9.3174L5.59201 7.78954C5.33771 7.46258 4.86651 7.40368 4.53954 7.65799C4.21258 7.91229 4.15368 8.3835 4.40799 8.71045L6.15799 10.9605C6.29594 11.1378 6.50614 11.244 6.73076 11.2498C6.95538 11.2555 7.17075 11.1603 7.31762 10.9902L12.0676 5.49021Z",
          fill: "#142049"
        }
      )
    ]
  }
), PD = ({ className: n }) => /* @__PURE__ */ b.jsx(
  "svg",
  {
    className: n,
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ b.jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M0.408726 4.54754C0 5.3497 0 6.3998 0 8.5V11.5C0 13.6002 0 14.6503 0.408726 15.4525C0.768251 16.1581 1.34193 16.7317 2.04754 17.0913C2.8497 17.5 3.8998 17.5 6 17.5H14C16.1002 17.5 17.1503 17.5 17.9525 17.0913C18.6581 16.7317 19.2317 16.1581 19.5913 15.4525C20 14.6503 20 13.6002 20 11.5V8.5C20 6.3998 20 5.3497 19.5913 4.54754C19.2317 3.84193 18.6581 3.26825 17.9525 2.90873C17.1503 2.5 16.1002 2.5 14 2.5H6C3.8998 2.5 2.8497 2.5 2.04754 2.90873C1.34193 3.26825 0.768251 3.84193 0.408726 4.54754ZM4.28165 5.97781C3.85518 5.68419 3.27144 5.79188 2.97782 6.21835C2.6842 6.64481 2.79189 7.22855 3.21835 7.52217L9.26883 11.6879C9.71786 11.9971 10.3112 11.9965 10.7596 11.6864L16.7832 7.52109C17.2091 7.2266 17.3156 6.64264 17.0211 6.21678C16.7266 5.79091 16.1426 5.68441 15.7168 5.9789L10.0124 9.92348L4.28165 5.97781Z",
        fill: "white"
      }
    )
  }
);
function UD() {
  return /* @__PURE__ */ b.jsxs(
    "svg",
    {
      width: "5",
      height: "20",
      viewBox: "0 0 5 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ b.jsx(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M2.5 0C3.32843 1.19209e-07 4 0.671573 4 1.5L4 11.5C4 12.3284 3.32843 13 2.5 13C1.67157 13 1 12.3284 1 11.5L1 1.5C1 0.671573 1.67157 -1.19209e-07 2.5 0Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ b.jsx(
          "path",
          {
            d: "M4.5 18C4.5 19.1046 3.60457 20 2.5 20C1.39543 20 0.5 19.1046 0.5 18C0.5 16.8954 1.39543 16 2.5 16C3.60457 16 4.5 16.8954 4.5 18Z",
            fill: "white"
          }
        )
      ]
    }
  );
}
const FD = () => /* @__PURE__ */ b.jsxs(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ b.jsx("style", { children: Or }),
      /* @__PURE__ */ b.jsx("g", { clipPath: "url(#clip0_2610_9920)", children: /* @__PURE__ */ b.jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M0.220551 7.4C1.00905 5.8258 3.50342 2 8.00001 2C12.4966 2 14.991 5.8258 15.7796 7.4C16.0733 7.98635 16.0737 8.0153 15.7796 8.60228C14.99 10.1778 12.4949 14 8.00001 14C3.50298 14 1.00762 10.1738 0.219399 8.6C-0.0739824 8.01422 -0.0726647 7.98539 0.220551 7.4ZM8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12ZM9.5 8C9.5 8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8Z",
          fill: "#142049"
        }
      ) }),
      /* @__PURE__ */ b.jsx("defs", { children: /* @__PURE__ */ b.jsx("clipPath", { id: "clip0_2610_9920", children: /* @__PURE__ */ b.jsx("rect", { width: "16", height: "16", fill: "white" }) }) })
    ]
  }
), VD = () => /* @__PURE__ */ b.jsxs(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ b.jsx("style", { children: Or }),
      /* @__PURE__ */ b.jsxs("g", { clipPath: "url(#clip0_2610_9933)", children: [
        /* @__PURE__ */ b.jsx(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M0.220551 7.4C1.00905 5.8258 3.50342 2 8.00001 2C12.4966 2 14.991 5.8258 15.7796 7.4C16.0733 7.98635 16.0737 8.0153 15.7796 8.60228C14.99 10.1778 12.4949 14 8.00001 14C3.50298 14 1.00762 10.1738 0.219399 8.6C-0.0739824 8.01422 -0.0726647 7.98539 0.220551 7.4ZM8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12ZM9.5 8C9.5 8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8Z",
            fill: "#142049"
          }
        ),
        /* @__PURE__ */ b.jsx(
          "path",
          {
            d: "M2.34314 2.34315L13.6568 13.6569",
            stroke: "#142049",
            strokeWidth: "1.5",
            strokeLinecap: "round"
          }
        )
      ] }),
      /* @__PURE__ */ b.jsx("defs", { children: /* @__PURE__ */ b.jsx("clipPath", { id: "clip0_2610_9933", children: /* @__PURE__ */ b.jsx("rect", { width: "16", height: "16", fill: "white" }) }) })
    ]
  }
), Q5 = ({ className: n }) => /* @__PURE__ */ b.jsx(
  "svg",
  {
    width: "16",
    className: mt(n),
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ b.jsx(
      "path",
      {
        d: "M3.75 5.75L8 10.25L12.25 5.75",
        stroke: Y5.color.foreground,
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
), yy = () => /* @__PURE__ */ b.jsxs(
  "svg",
  {
    width: "32",
    height: "32",
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ b.jsx("style", { children: Or }),
      /* @__PURE__ */ b.jsx(
        "path",
        {
          d: "M10.1489 8L1.6001 24.1824H4.1585L12.7073 8H10.1489Z",
          fill: "#2A6AFF"
        }
      ),
      /* @__PURE__ */ b.jsx(
        "path",
        {
          d: "M15.8339 12.5552C16.7499 12.5552 17.4979 11.7856 17.4979 10.8704C17.4979 9.9552 16.7499 9.1856 15.8339 9.1856C14.8979 9.1856 14.1499 9.9552 14.1499 10.8704C14.1499 11.7856 14.8979 12.5552 15.8339 12.5552ZM14.4619 14.0112V24.1824H17.1659V14.0112H14.4619ZM27.3507 8V14.8016C26.5377 14.1118 25.5049 13.7356 24.4387 13.7408C21.4851 13.7408 19.2595 16.112 19.2595 19.1072C19.2595 22.1024 21.4851 24.4736 24.4387 24.4736C25.6659 24.4736 26.7475 24.016 27.5587 23.2256V24.1824H30.0547V8H27.3507ZM24.7507 21.936C23.1907 21.936 22.0467 20.7296 22.0467 19.1072C22.0467 17.4848 23.1907 16.2784 24.7507 16.2784C26.3107 16.2784 27.4547 17.4848 27.4547 19.1072C27.4547 20.7296 26.3107 21.936 24.7507 21.936Z",
          fill: "#142049"
        }
      )
    ]
  }
), R2 = (n) => {
  const [a, o] = w.useState(!1);
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: mt(
        "sid-input",
        "sid-input--password",
        my,
        n.error && X5,
        n.className
      ),
      style: n.style,
      children: [
        /* @__PURE__ */ b.jsx(gy, { ...n, type: a ? "text" : "password" }),
        /* @__PURE__ */ b.jsx(
          "button",
          {
            tabIndex: -1,
            className: ED,
            type: "button",
            onClick: () => o(!a),
            children: a ? /* @__PURE__ */ b.jsx(VD, {}) : /* @__PURE__ */ b.jsx(FD, {})
          }
        )
      ]
    }
  );
};
var HD = "dv1j860", BD = "dv1j861";
const jD = ({
  onChange: n,
  value: a = "",
  numInputs: o = 4,
  shouldAutoFocus: l = !1,
  inputType: c = "text"
}) => {
  const [p, d] = w.useState(0), v = w.useRef([]), y = () => a ? a.toString().split("") : [], C = c === "number";
  w.useEffect(() => {
    v.current = v.current.slice(0, o);
  }, [o]);
  const $ = (N) => C ? !isNaN(Number(N)) : typeof N == "string", _ = (N) => $(N) && N.trim().length === 1, R = (N) => {
    const { value: P } = N.target;
    _(P) && (M(P), L(p + 1));
  }, S = (N) => {
    const P = y(), J = N.slice(0, o).split(""), me = Math.min(J.length, o);
    if (!(C && J.some((we) => isNaN(Number(we))))) {
      for (let we = 0; we < o; ++we)
        we >= 0 && J.length > 0 && (P[we] = J.shift() ?? "");
      L(me), V(P);
    }
  }, k = (N) => {
    const { value: P } = N.target;
    if (!$(P)) {
      N.target.value = "";
      return;
    }
    P.length === o && S(P);
  }, x = (N) => (P) => {
    d(P), N.target.select();
  }, D = () => {
    d(p - 1);
  }, z = (N) => {
    const P = y();
    [N.code, N.key].includes("Backspace") ? (N.preventDefault(), M(""), L(p - 1)) : N.code === "Delete" ? (N.preventDefault(), M("")) : N.code === "ArrowLeft" ? (N.preventDefault(), L(p - 1)) : N.code === "ArrowRight" || N.key === P[p] ? (N.preventDefault(), L(p + 1)) : (N.code === "Spacebar" || N.code === "Space" || N.code === "ArrowUp" || N.code === "ArrowDown") && N.preventDefault();
  }, L = (N) => {
    var J, me;
    const P = Math.max(Math.min(o - 1, N), 0);
    v.current[P] && ((J = v.current[P]) == null || J.focus(), (me = v.current[P]) == null || me.select(), d(P));
  }, M = (N) => {
    const P = y();
    P[p] = N[0], V(P);
  }, V = (N) => {
    n(N.join(""));
  }, H = (N) => {
    var J;
    N.preventDefault();
    const P = (J = N.clipboardData) == null ? void 0 : J.getData("text/plain");
    S(P);
  };
  return /* @__PURE__ */ b.jsx("div", { className: mt("sid-otp-input", HD), children: Array.from({ length: o }, (N, P) => P).map((N) => /* @__PURE__ */ b.jsx(
    "input",
    {
      className: BD,
      autoComplete: "one-time-code",
      maxLength: o,
      autoFocus: N === 0 && l,
      type: "text",
      inputMode: C ? "numeric" : "text",
      "aria-label": `Please enter OTP ${C ? "digit" : "character"} ${N + 1}`,
      value: y()[N] ?? "",
      ref: (P) => v.current[N] = P,
      onChange: R,
      onFocus: (P) => x(P)(N),
      onBlur: D,
      onKeyDown: z,
      onPaste: H,
      onInput: k
    },
    N
  )) });
};
var Mg = /* @__PURE__ */ new Map();
function k2(n) {
  if (Mg.has(n))
    return Mg.get(n);
  var a = GD(n);
  return Mg.set(n, a), a;
}
var GD = function() {
  var n = null;
  try {
    n = document.createElement("canvas").getContext("2d");
  } catch {
  }
  if (!n)
    return function() {
      return !1;
    };
  var a = 25, o = 20, l = Math.floor(a / 2);
  return n.font = l + "px Arial, Sans-Serif", n.textBaseline = "top", n.canvas.width = o * 2, n.canvas.height = a, function(c) {
    n.clearRect(0, 0, o * 2, a), n.fillStyle = "#FF0000", n.fillText(c, 0, 22), n.fillStyle = "#0000FF", n.fillText(c, o, 22);
    for (var p = n.getImageData(0, 0, o, a).data, d = p.length, v = 0; v < d && !p[v + 3]; v += 4)
      ;
    if (v >= d)
      return !1;
    var y = o + v / 4 % o, C = Math.floor(v / 4 / o), $ = n.getImageData(y, C, 1, 1).data;
    return !(p[v] !== $[0] || p[v + 2] !== $[2] || n.measureText(c).width >= o);
  };
}();
function YD(n = "Twemoji Country Flags", a = "https://cdn.jsdelivr.net/npm/country-flag-emoji-polyfill@0.1/dist/TwemojiCountryFlags.woff2") {
  if (k2("😊") && !k2("🇨🇭")) {
    const o = document.createElement("style");
    return o.textContent = `@font-face {
      font-family: "${n}";
      unicode-range: U+1F1E6-1F1FF, U+1F3F4, U+E0062-E0063, U+E0065, U+E0067,
        U+E006C, U+E006E, U+E0073-E0074, U+E0077, U+E007F;
      src: url('${a}') format('woff2');
      font-display: swap;
    }`, document.head.appendChild(o), !0;
  }
  return !1;
}
var ia = {}, by = {};
Object.defineProperty(by, "__esModule", { value: !0 });
var WD = [
  { name: "Afghanistan", dial_code: "+93", code: "AF", flag: "🇦🇫" },
  { name: "Albania", dial_code: "+355", code: "AL", flag: "🇦🇱" },
  { name: "Algeria", dial_code: "+213", code: "DZ", flag: "🇩🇿" },
  { name: "AmericanSamoa", dial_code: "+1684", code: "AS", flag: "🇦🇸" },
  { name: "Andorra", dial_code: "+376", code: "AD", flag: "🇦🇩" },
  { name: "Angola", dial_code: "+244", code: "AO", flag: "🇦🇴" },
  { name: "Anguilla", dial_code: "+1264", code: "AI", flag: "🇦🇮" },
  { name: "Antarctica", dial_code: "+672", code: "AQ", flag: "🇦🇶" },
  { name: "Antigua and Barbuda", dial_code: "+1268", code: "AG", flag: "🇦🇬" },
  { name: "Argentina", dial_code: "+54", code: "AR", flag: "🇦🇷" },
  { name: "Armenia", dial_code: "+374", code: "AM", flag: "🇦🇲" },
  { name: "Aruba", dial_code: "+297", code: "AW", flag: "🇦🇼" },
  { name: "Australia", dial_code: "+61", code: "AU", preferred: !0, flag: "🇦🇺" },
  { name: "Austria", dial_code: "+43", code: "AT", flag: "🇦🇹" },
  { name: "Azerbaijan", dial_code: "+994", code: "AZ", flag: "🇦🇿" },
  { name: "Bahamas", dial_code: "+1242", code: "BS", flag: "🇧🇸" },
  { name: "Bahrain", dial_code: "+973", code: "BH", flag: "🇧🇭" },
  { name: "Bangladesh", dial_code: "+880", code: "BD", flag: "🇧🇩" },
  { name: "Barbados", dial_code: "+1246", code: "BB", flag: "🇧🇧" },
  { name: "Belarus", dial_code: "+375", code: "BY", flag: "🇧🇾" },
  { name: "Belgium", dial_code: "+32", code: "BE", flag: "🇧🇪" },
  { name: "Belize", dial_code: "+501", code: "BZ", flag: "🇧🇿" },
  { name: "Benin", dial_code: "+229", code: "BJ", flag: "🇧🇯" },
  { name: "Bermuda", dial_code: "+1441", code: "BM", flag: "🇧🇲" },
  { name: "Bhutan", dial_code: "+975", code: "BT", flag: "🇧🇹" },
  { name: "Bolivia, Plurinational State of", dial_code: "+591", code: "BO", flag: "🇧🇴" },
  { name: "Bosnia and Herzegovina", dial_code: "+387", code: "BA", flag: "🇧🇦" },
  { name: "Botswana", dial_code: "+267", code: "BW", flag: "🇧🇼" },
  { name: "Brazil", dial_code: "+55", code: "BR", flag: "🇧🇷" },
  { name: "British Indian Ocean Territory", dial_code: "+246", code: "IO", flag: "🇮🇴" },
  { name: "Brunei Darussalam", dial_code: "+673", code: "BN", flag: "🇧🇳" },
  { name: "Bulgaria", dial_code: "+359", code: "BG", flag: "🇧🇬" },
  { name: "Burkina Faso", dial_code: "+226", code: "BF", flag: "🇧🇫" },
  { name: "Burundi", dial_code: "+257", code: "BI", flag: "🇧🇮" },
  { name: "Cambodia", dial_code: "+855", code: "KH", flag: "🇰🇭" },
  { name: "Cameroon", dial_code: "+237", code: "CM", flag: "🇨🇲" },
  { name: "Canada", dial_code: "+1", code: "CA", flag: "🇨🇦" },
  { name: "Cape Verde", dial_code: "+238", code: "CV", flag: "🇨🇻" },
  { name: "Cayman Islands", dial_code: "+345", code: "KY", flag: "🇰🇾" },
  { name: "Central African Republic", dial_code: "+236", code: "CF", flag: "🇨🇫" },
  { name: "Chad", dial_code: "+235", code: "TD", flag: "🇹🇩" },
  { name: "Chile", dial_code: "+56", code: "CL", flag: "🇨🇱" },
  { name: "China", dial_code: "+86", code: "CN", flag: "🇨🇳" },
  { name: "Christmas Island", dial_code: "+61", code: "CX", flag: "🇨🇽" },
  { name: "Cocos (Keeling) Islands", dial_code: "+61", code: "CC", flag: "🇨🇨" },
  { name: "Colombia", dial_code: "+57", code: "CO", flag: "🇨🇴" },
  { name: "Comoros", dial_code: "+269", code: "KM", flag: "🇰🇲" },
  { name: "Congo", dial_code: "+242", code: "CG", flag: "🇨🇬" },
  { name: "Congo, The Democratic Republic of the", dial_code: "+243", code: "CD", flag: "🇨🇩" },
  { name: "Cook Islands", dial_code: "+682", code: "CK", flag: "🇨🇰" },
  { name: "Costa Rica", dial_code: "+506", code: "CR", flag: "🇨🇷" },
  { name: "Cote d'Ivoire", dial_code: "+225", code: "CI", flag: "🇨🇮" },
  { name: "Croatia", dial_code: "+385", code: "HR", flag: "🇭🇷" },
  { name: "Cuba", dial_code: "+53", code: "CU", flag: "🇨🇺" },
  { name: "Cyprus", dial_code: "+357", code: "CY", flag: "🇨🇾" },
  { name: "Czech Republic", dial_code: "+420", code: "CZ", flag: "🇨🇿" },
  { name: "Denmark", dial_code: "+45", code: "DK", flag: "🇩🇰" },
  { name: "Djibouti", dial_code: "+253", code: "DJ", flag: "🇩🇯" },
  { name: "Dominica", dial_code: "+1767", code: "DM", flag: "🇩🇲" },
  { name: "Dominican Republic", dial_code: "+1849", code: "DO", flag: "🇩🇴" },
  { name: "Ecuador", dial_code: "+593", code: "EC", flag: "🇪🇨" },
  { name: "Egypt", dial_code: "+20", code: "EG", flag: "🇪🇬" },
  { name: "El Salvador", dial_code: "+503", code: "SV", flag: "🇸🇻" },
  { name: "Equatorial Guinea", dial_code: "+240", code: "GQ", flag: "🇬🇶" },
  { name: "Eritrea", dial_code: "+291", code: "ER", flag: "🇪🇷" },
  { name: "Estonia", dial_code: "+372", code: "EE", flag: "🇪🇪" },
  { name: "Ethiopia", dial_code: "+251", code: "ET", flag: "🇪🇹" },
  { name: "Falkland Islands (Malvinas)", dial_code: "+500", code: "FK", flag: "🇫🇰" },
  { name: "Faroe Islands", dial_code: "+298", code: "FO", flag: "🇫🇴" },
  { name: "Fiji", dial_code: "+679", code: "FJ", flag: "🇫🇯" },
  { name: "Finland", dial_code: "+358", code: "FI", flag: "🇫🇮" },
  { name: "France", dial_code: "+33", code: "FR", flag: "🇫🇷" },
  { name: "French Guiana", dial_code: "+594", code: "GF", flag: "🇬🇫" },
  { name: "French Polynesia", dial_code: "+689", code: "PF", flag: "🇵🇫" },
  { name: "Gabon", dial_code: "+241", code: "GA", flag: "🇬🇦" },
  { name: "Gambia", dial_code: "+220", code: "GM", flag: "🇬🇲" },
  { name: "Georgia", dial_code: "+995", code: "GE", flag: "🇬🇪" },
  { name: "Germany", dial_code: "+49", code: "DE", flag: "🇩🇪" },
  { name: "Ghana", dial_code: "+233", code: "GH", flag: "🇬🇭" },
  { name: "Gibraltar", dial_code: "+350", code: "GI", flag: "🇬🇮" },
  { name: "Greece", dial_code: "+30", code: "GR", flag: "🇬🇷" },
  { name: "Greenland", dial_code: "+299", code: "GL", flag: "🇬🇱" },
  { name: "Grenada", dial_code: "+1473", code: "GD", flag: "🇬🇩" },
  { name: "Guadeloupe", dial_code: "+590", code: "GP", flag: "🇬🇵" },
  { name: "Guam", dial_code: "+1671", code: "GU", flag: "🇬🇺" },
  { name: "Guatemala", dial_code: "+502", code: "GT", flag: "🇬🇹" },
  { name: "Guernsey", dial_code: "+44", code: "GG", flag: "🇬🇬" },
  { name: "Guinea", dial_code: "+224", code: "GN", flag: "🇬🇳" },
  { name: "Guinea-Bissau", dial_code: "+245", code: "GW", flag: "🇬🇼" },
  { name: "Guyana", dial_code: "+592", code: "GY", flag: "🇬🇾" },
  { name: "Haiti", dial_code: "+509", code: "HT", flag: "🇭🇹" },
  { name: "Holy See (Vatican City State)", dial_code: "+379", code: "VA", flag: "🇻🇦" },
  { name: "Honduras", dial_code: "+504", code: "HN", flag: "🇭🇳" },
  { name: "Hong Kong", dial_code: "+852", code: "HK", flag: "🇭🇰" },
  { name: "Hungary", dial_code: "+36", code: "HU", flag: "🇭🇺" },
  { name: "Iceland", dial_code: "+354", code: "IS", flag: "🇮🇸" },
  { name: "India", dial_code: "+91", code: "IN", preferred: !0, flag: "🇮🇳" },
  { name: "Indonesia", dial_code: "+62", code: "ID", flag: "🇮🇩" },
  { name: "Iran, Islamic Republic of", dial_code: "+98", code: "IR", flag: "🇮🇷" },
  { name: "Iraq", dial_code: "+964", code: "IQ", flag: "🇮🇶" },
  { name: "Ireland", dial_code: "+353", code: "IE", flag: "🇮🇪" },
  { name: "Isle of Man", dial_code: "+44", code: "IM", flag: "🇮🇲" },
  { name: "Israel", dial_code: "+972", code: "IL", flag: "🇮🇱" },
  { name: "Italy", dial_code: "+39", code: "IT", flag: "🇮🇹" },
  { name: "Jamaica", dial_code: "+1876", code: "JM", flag: "🇯🇲" },
  { name: "Japan", dial_code: "+81", code: "JP", flag: "🇯🇵" },
  { name: "Jersey", dial_code: "+44", code: "JE", flag: "🇯🇪" },
  { name: "Jordan", dial_code: "+962", code: "JO", flag: "🇯🇴" },
  { name: "Kazakhstan", dial_code: "+77", code: "KZ", flag: "🇰🇿" },
  { name: "Kenya", dial_code: "+254", code: "KE", flag: "🇰🇪" },
  { name: "Kiribati", dial_code: "+686", code: "KI", flag: "🇰🇮" },
  { name: "Korea, Democratic People's Republic of", dial_code: "+850", code: "KP", flag: "🇰🇵" },
  { name: "Korea, Republic of", dial_code: "+82", code: "KR", flag: "🇰🇷" },
  { name: "Kuwait", dial_code: "+965", code: "KW", flag: "🇰🇼" },
  { name: "Kyrgyzstan", dial_code: "+996", code: "KG", flag: "🇰🇬" },
  { name: "Lao People's Democratic Republic", dial_code: "+856", code: "LA", flag: "🇱🇦" },
  { name: "Latvia", dial_code: "+371", code: "LV", flag: "🇱🇻" },
  { name: "Lebanon", dial_code: "+961", code: "LB", flag: "🇱🇧" },
  { name: "Lesotho", dial_code: "+266", code: "LS", flag: "🇱🇸" },
  { name: "Liberia", dial_code: "+231", code: "LR", flag: "🇱🇷" },
  { name: "Libyan Arab Jamahiriya", dial_code: "+218", code: "LY", flag: "🇱🇾" },
  { name: "Liechtenstein", dial_code: "+423", code: "LI", flag: "🇱🇮" },
  { name: "Lithuania", dial_code: "+370", code: "LT", flag: "🇱🇹" },
  { name: "Luxembourg", dial_code: "+352", code: "LU", flag: "🇱🇺" },
  { name: "Macao", dial_code: "+853", code: "MO", flag: "🇲🇴" },
  { name: "Macedonia, The Former Yugoslav Republic of", dial_code: "+389", code: "MK", flag: "🇲🇰" },
  { name: "Madagascar", dial_code: "+261", code: "MG", flag: "🇲🇬" },
  { name: "Malawi", dial_code: "+265", code: "MW", flag: "🇲🇼" },
  { name: "Malaysia", dial_code: "+60", code: "MY", flag: "🇲🇾" },
  { name: "Maldives", dial_code: "+960", code: "MV", flag: "🇲🇻" },
  { name: "Mali", dial_code: "+223", code: "ML", flag: "🇲🇱" },
  { name: "Malta", dial_code: "+356", code: "MT", flag: "🇲🇹" },
  { name: "Marshall Islands", dial_code: "+692", code: "MH", flag: "🇲🇭" },
  { name: "Martinique", dial_code: "+596", code: "MQ", flag: "🇲🇶" },
  { name: "Mauritania", dial_code: "+222", code: "MR", flag: "🇲🇷" },
  { name: "Mauritius", dial_code: "+230", code: "MU", flag: "🇲🇺" },
  { name: "Mayotte", dial_code: "+262", code: "YT", flag: "🇾🇹" },
  { name: "Mexico", dial_code: "+52", code: "MX", flag: "🇲🇽" },
  { name: "Micronesia, Federated States of", dial_code: "+691", code: "FM", flag: "🇫🇲" },
  { name: "Moldova, Republic of", dial_code: "+373", code: "MD", flag: "🇲🇩" },
  { name: "Monaco", dial_code: "+377", code: "MC", flag: "🇲🇨" },
  { name: "Mongolia", dial_code: "+976", code: "MN", flag: "🇲🇳" },
  { name: "Montenegro", dial_code: "+382", code: "ME", flag: "🇲🇪" },
  { name: "Montserrat", dial_code: "+1664", code: "MS", flag: "🇲🇸" },
  { name: "Morocco", dial_code: "+212", code: "MA", flag: "🇲🇦" },
  { name: "Mozambique", dial_code: "+258", code: "MZ", flag: "🇲🇿" },
  { name: "Myanmar", dial_code: "+95", code: "MM", flag: "🇲🇲" },
  { name: "Namibia", dial_code: "+264", code: "NA", flag: "🇳🇦" },
  { name: "Nauru", dial_code: "+674", code: "NR", flag: "🇳🇷" },
  { name: "Nepal", dial_code: "+977", code: "NP", flag: "🇳🇵" },
  { name: "Netherlands", dial_code: "+31", code: "NL", flag: "🇳🇱" },
  { name: "Netherlands Antilles", dial_code: "+599", code: "AN", flag: "🇦🇳" },
  { name: "New Caledonia", dial_code: "+687", code: "NC", flag: "🇳🇨" },
  { name: "New Zealand", dial_code: "+64", code: "NZ", flag: "🇳🇿" },
  { name: "Nicaragua", dial_code: "+505", code: "NI", flag: "🇳🇮" },
  { name: "Niger", dial_code: "+227", code: "NE", flag: "🇳🇪" },
  { name: "Nigeria", dial_code: "+234", code: "NG", flag: "🇳🇬" },
  { name: "Niue", dial_code: "+683", code: "NU", flag: "🇳🇺" },
  { name: "Norfolk Island", dial_code: "+672", code: "NF", flag: "🇳🇫" },
  { name: "Northern Mariana Islands", dial_code: "+1670", code: "MP", flag: "🇲🇵" },
  { name: "Norway", dial_code: "+47", code: "NO", flag: "🇳🇴" },
  { name: "Oman", dial_code: "+968", code: "OM", flag: "🇴🇲" },
  { name: "Pakistan", dial_code: "+92", code: "PK", flag: "🇵🇰" },
  { name: "Palau", dial_code: "+680", code: "PW", flag: "🇵🇼" },
  { name: "Palestinian Territory, Occupied", dial_code: "+970", code: "PS", flag: "🇵🇸" },
  { name: "Panama", dial_code: "+507", code: "PA", flag: "🇵🇦" },
  { name: "Papua New Guinea", dial_code: "+675", code: "PG", flag: "🇵🇬" },
  { name: "Paraguay", dial_code: "+595", code: "PY", flag: "🇵🇾" },
  { name: "Peru", dial_code: "+51", code: "PE", flag: "🇵🇪" },
  { name: "Philippines", dial_code: "+63", code: "PH", flag: "🇵🇭" },
  { name: "Pitcairn", dial_code: "+872", code: "PN", flag: "🇵🇳" },
  { name: "Poland", dial_code: "+48", code: "PL", flag: "🇵🇱" },
  { name: "Portugal", dial_code: "+351", code: "PT", flag: "🇵🇹" },
  { name: "Puerto Rico", dial_code: "+1939", code: "PR", flag: "🇵🇷" },
  { name: "Qatar", dial_code: "+974", code: "QA", flag: "🇶🇦" },
  { name: "Romania", dial_code: "+40", code: "RO", flag: "🇷🇴" },
  { name: "Russia", dial_code: "+7", code: "RU", flag: "🇷🇺" },
  { name: "Rwanda", dial_code: "+250", code: "RW", flag: "🇷🇼" },
  { name: "Réunion", dial_code: "+262", code: "RE", flag: "🇷🇪" },
  { name: "Saint Barthélemy", dial_code: "+590", code: "BL", flag: "🇧🇱" },
  { name: "Saint Helena, Ascension and Tristan Da Cunha", dial_code: "+290", code: "SH", flag: "🇸🇭" },
  { name: "Saint Kitts and Nevis", dial_code: "+1869", code: "KN", flag: "🇰🇳" },
  { name: "Saint Lucia", dial_code: "+1758", code: "LC", flag: "🇱🇨" },
  { name: "Saint Martin", dial_code: "+590", code: "MF", flag: "🇲🇫" },
  { name: "Saint Pierre and Miquelon", dial_code: "+508", code: "PM", flag: "🇵🇲" },
  { name: "Saint Vincent and the Grenadines", dial_code: "+1784", code: "VC", flag: "🇻🇨" },
  { name: "Samoa", dial_code: "+685", code: "WS", flag: "🇼🇸" },
  { name: "San Marino", dial_code: "+378", code: "SM", flag: "🇸🇲" },
  { name: "Sao Tome and Principe", dial_code: "+239", code: "ST", flag: "🇸🇹" },
  { name: "Saudi Arabia", dial_code: "+966", code: "SA", flag: "🇸🇦" },
  { name: "Senegal", dial_code: "+221", code: "SN", flag: "🇸🇳" },
  { name: "Serbia", dial_code: "+381", code: "RS", flag: "🇷🇸" },
  { name: "Seychelles", dial_code: "+248", code: "SC", flag: "🇸🇨" },
  { name: "Sierra Leone", dial_code: "+232", code: "SL", flag: "🇸🇱" },
  { name: "Singapore", dial_code: "+65", code: "SG", flag: "🇸🇬" },
  { name: "Slovakia", dial_code: "+421", code: "SK", flag: "🇸🇰" },
  { name: "Slovenia", dial_code: "+386", code: "SI", flag: "🇸🇮" },
  { name: "Solomon Islands", dial_code: "+677", code: "SB", flag: "🇸🇧" },
  { name: "Somalia", dial_code: "+252", code: "SO", flag: "🇸🇴" },
  { name: "South Africa", dial_code: "+27", code: "ZA", flag: "🇿🇦" },
  { name: "South Georgia and the South Sandwich Islands", dial_code: "+500", code: "GS", flag: "🇬🇸" },
  { name: "Spain", dial_code: "+34", code: "ES", flag: "🇪🇸" },
  { name: "Sri Lanka", dial_code: "+94", code: "LK", flag: "🇱🇰" },
  { name: "Sudan", dial_code: "+249", code: "SD", flag: "🇸🇩" },
  { name: "South Sudan", dial_code: "+211", code: "SS", flag: "🇸🇸" },
  { name: "Suriname", dial_code: "+597", code: "SR", flag: "🇸🇷" },
  { name: "Svalbard and Jan Mayen", dial_code: "+47", code: "SJ", flag: "🇸🇯" },
  { name: "Swaziland", dial_code: "+268", code: "SZ", flag: "🇸🇿" },
  { name: "Sweden", dial_code: "+46", code: "SE", flag: "🇸🇪" },
  { name: "Switzerland", dial_code: "+41", code: "CH", flag: "🇨🇭" },
  { name: "Syrian Arab Republic", dial_code: "+963", code: "SY", flag: "🇸🇾" },
  { name: "Taiwan, Province of China", dial_code: "+886", code: "TW", flag: "🇹🇼" },
  { name: "Tajikistan", dial_code: "+992", code: "TJ", flag: "🇹🇯" },
  { name: "Tanzania, United Republic of", dial_code: "+255", code: "TZ", flag: "🇹🇿" },
  { name: "Thailand", dial_code: "+66", code: "TH", flag: "🇹🇭" },
  { name: "Timor-Leste", dial_code: "+670", code: "TL", flag: "🇹🇱" },
  { name: "Togo", dial_code: "+228", code: "TG", flag: "🇹🇬" },
  { name: "Tokelau", dial_code: "+690", code: "TK", flag: "🇹🇰" },
  { name: "Tonga", dial_code: "+676", code: "TO", flag: "🇹🇴" },
  { name: "Trinidad and Tobago", dial_code: "+1868", code: "TT", flag: "🇹🇹" },
  { name: "Tunisia", dial_code: "+216", code: "TN", flag: "🇹🇳" },
  { name: "Turkey", dial_code: "+90", code: "TR", flag: "🇹🇷" },
  { name: "Turkmenistan", dial_code: "+993", code: "TM", flag: "🇹🇲" },
  { name: "Turks and Caicos Islands", dial_code: "+1649", code: "TC", flag: "🇹🇨" },
  { name: "Tuvalu", dial_code: "+688", code: "TV", flag: "🇹🇻" },
  { name: "Uganda", dial_code: "+256", code: "UG", flag: "🇺🇬" },
  { name: "Ukraine", dial_code: "+380", code: "UA", flag: "🇺🇦" },
  { name: "United Arab Emirates", dial_code: "+971", code: "AE", preferred: !0, flag: "🇦🇪" },
  { name: "United Kingdom", dial_code: "+44", code: "GB", preferred: !0, flag: "🇬🇧" },
  { name: "United States", dial_code: "+1", code: "US", preferred: !0, flag: "🇺🇸" },
  { name: "Uruguay", dial_code: "+598", code: "UY", flag: "🇺🇾" },
  { name: "Uzbekistan", dial_code: "+998", code: "UZ", flag: "🇺🇿" },
  { name: "Vanuatu", dial_code: "+678", code: "VU", flag: "🇻🇺" },
  { name: "Venezuela, Bolivarian Republic of", dial_code: "+58", code: "VE", flag: "🇻🇪" },
  { name: "Viet Nam", dial_code: "+84", code: "VN", flag: "🇻🇳" },
  { name: "Virgin Islands, British", dial_code: "+1284", code: "VG", flag: "🇻🇬" },
  { name: "Virgin Islands, U.S.", dial_code: "+1340", code: "VI", flag: "🇻🇮" },
  { name: "Wallis and Futuna", dial_code: "+681", code: "WF", flag: "🇼🇫" },
  { name: "Yemen", dial_code: "+967", code: "YE", flag: "🇾🇪" },
  { name: "Zambia", dial_code: "+260", code: "ZM", flag: "🇿🇲" },
  { name: "Zimbabwe", dial_code: "+263", code: "ZW", flag: "🇿🇼" },
  { name: "Åland Islands", dial_code: "+358", code: "AX", flag: "🇦🇽" }
];
by.default = WD;
Object.defineProperty(ia, "__esModule", { value: !0 });
ia.searchFlag = ia.findFlagsByDialCode = J5 = ia.findFlagByDialCode = wy = ia.findFlag = Cy = ia.getList = void 0;
var up = by, KD = function(n) {
  return up.default.find(function(a) {
    return a.code.toLowerCase() === n.toLowerCase();
  });
}, wy = ia.findFlag = KD, ZD = function(n) {
  var a, o = eS(n), l = o.find(function(c) {
    return c.dial_code === n && c.preferred;
  });
  return l || ((a = o[0]) !== null && a !== void 0 ? a : null);
}, J5 = ia.findFlagByDialCode = ZD, eS = function(n) {
  return up.default.filter(function(a) {
    return a.dial_code === n;
  });
};
ia.findFlagsByDialCode = eS;
var XD = function() {
  return up.default;
}, Cy = ia.getList = XD, QD = function(n) {
  return up.default.filter(function(a) {
    return a.code.toLowerCase().includes(n.toLowerCase()) || a.name.toLowerCase().includes(n.toLowerCase()) || a.dial_code.toLowerCase().includes(n.toLowerCase());
  });
};
ia.searchFlag = QD;
const JD = ({
  name: n,
  id: a,
  label: o,
  placeholder: l = "",
  className: c = "",
  value: p,
  flag: d,
  onChange: v,
  onFlagChange: y
}) => {
  w.useLayoutEffect(() => {
    YD();
  }, []);
  const C = w.useCallback(
    ($) => {
      const _ = $.target.value;
      y(wy(_));
    },
    [y]
  );
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: mt("sid-input", "sid-input--tel", my, c),
      children: [
        d ? /* @__PURE__ */ b.jsxs("div", { className: CD, children: [
          /* @__PURE__ */ b.jsxs("div", { className: wD, children: [
            /* @__PURE__ */ b.jsxs("div", { children: [
              d.flag,
              " ",
              d.dial_code
            ] }),
            /* @__PURE__ */ b.jsx(Q5, {})
          ] }),
          /* @__PURE__ */ b.jsx(
            "select",
            {
              className: RD,
              value: d.code,
              onChange: C,
              children: Cy().map(($) => /* @__PURE__ */ b.jsxs("option", { value: $.code, children: [
                $.name,
                " ",
                $.dial_code
              ] }, $.code))
            }
          )
        ] }) : null,
        /* @__PURE__ */ b.jsx(
          gy,
          {
            id: a,
            name: n,
            label: o,
            placeholder: l,
            className: c,
            type: "tel",
            value: p,
            onChange: v
          }
        )
      ]
    }
  );
};
var eO = "_1dpv0n91", tO = "_1dpv0n90", T2 = "_1dpv0n92";
const nO = ({ children: n }) => /* @__PURE__ */ b.jsxs("div", { className: mt("sid-divider", tO), children: [
  /* @__PURE__ */ b.jsx("hr", { className: T2 }),
  /* @__PURE__ */ b.jsx("span", { className: eO, children: n }),
  /* @__PURE__ */ b.jsx("hr", { className: T2 })
] });
function dt() {
  return dt = Object.assign ? Object.assign.bind() : function(n) {
    for (var a = 1; a < arguments.length; a++) {
      var o = arguments[a];
      for (var l in o)
        Object.prototype.hasOwnProperty.call(o, l) && (n[l] = o[l]);
    }
    return n;
  }, dt.apply(this, arguments);
}
function fc(n, a = []) {
  let o = [];
  function l(p, d) {
    const v = /* @__PURE__ */ w.createContext(d), y = o.length;
    o = [
      ...o,
      d
    ];
    function C(_) {
      const { scope: R, children: S, ...k } = _, x = (R == null ? void 0 : R[n][y]) || v, D = w.useMemo(
        () => k,
        Object.values(k)
      );
      return /* @__PURE__ */ w.createElement(x.Provider, {
        value: D
      }, S);
    }
    function $(_, R) {
      const S = (R == null ? void 0 : R[n][y]) || v, k = w.useContext(S);
      if (k)
        return k;
      if (d !== void 0)
        return d;
      throw new Error(`\`${_}\` must be used within \`${p}\``);
    }
    return C.displayName = p + "Provider", [
      C,
      $
    ];
  }
  const c = () => {
    const p = o.map((d) => /* @__PURE__ */ w.createContext(d));
    return function(v) {
      const y = (v == null ? void 0 : v[n]) || p;
      return w.useMemo(
        () => ({
          [`__scope${n}`]: {
            ...v,
            [n]: y
          }
        }),
        [
          v,
          y
        ]
      );
    };
  };
  return c.scopeName = n, [
    l,
    rO(c, ...a)
  ];
}
function rO(...n) {
  const a = n[0];
  if (n.length === 1)
    return a;
  const o = () => {
    const l = n.map(
      (c) => ({
        useScope: c(),
        scopeName: c.scopeName
      })
    );
    return function(p) {
      const d = l.reduce((v, { useScope: y, scopeName: C }) => {
        const _ = y(p)[`__scope${C}`];
        return {
          ...v,
          ..._
        };
      }, {});
      return w.useMemo(
        () => ({
          [`__scope${a.scopeName}`]: d
        }),
        [
          d
        ]
      );
    };
  };
  return o.scopeName = a.scopeName, o;
}
function aO(n, a) {
  typeof n == "function" ? n(a) : n != null && (n.current = a);
}
function tS(...n) {
  return (a) => n.forEach(
    (o) => aO(o, a)
  );
}
function Fn(...n) {
  return w.useCallback(tS(...n), n);
}
const sc = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { children: o, ...l } = n, c = w.Children.toArray(o), p = c.find(oO);
  if (p) {
    const d = p.props.children, v = c.map((y) => y === p ? w.Children.count(d) > 1 ? w.Children.only(null) : /* @__PURE__ */ w.isValidElement(d) ? d.props.children : null : y);
    return /* @__PURE__ */ w.createElement(ry, dt({}, l, {
      ref: a
    }), /* @__PURE__ */ w.isValidElement(d) ? /* @__PURE__ */ w.cloneElement(d, void 0, v) : null);
  }
  return /* @__PURE__ */ w.createElement(ry, dt({}, l, {
    ref: a
  }), o);
});
sc.displayName = "Slot";
const ry = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { children: o, ...l } = n;
  return /* @__PURE__ */ w.isValidElement(o) ? /* @__PURE__ */ w.cloneElement(o, {
    ...sO(l, o.props),
    ref: a ? tS(a, o.ref) : o.ref
  }) : w.Children.count(o) > 1 ? w.Children.only(null) : null;
});
ry.displayName = "SlotClone";
const iO = ({ children: n }) => /* @__PURE__ */ w.createElement(w.Fragment, null, n);
function oO(n) {
  return /* @__PURE__ */ w.isValidElement(n) && n.type === iO;
}
function sO(n, a) {
  const o = {
    ...a
  };
  for (const l in a) {
    const c = n[l], p = a[l];
    /^on[A-Z]/.test(l) ? c && p ? o[l] = (...v) => {
      p(...v), c(...v);
    } : c && (o[l] = c) : l === "style" ? o[l] = {
      ...c,
      ...p
    } : l === "className" && (o[l] = [
      c,
      p
    ].filter(Boolean).join(" "));
  }
  return {
    ...n,
    ...o
  };
}
function nS(n) {
  const a = n + "CollectionProvider", [o, l] = fc(a), [c, p] = o(a, {
    collectionRef: {
      current: null
    },
    itemMap: /* @__PURE__ */ new Map()
  }), d = (S) => {
    const { scope: k, children: x } = S, D = wt.useRef(null), z = wt.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ wt.createElement(c, {
      scope: k,
      itemMap: z,
      collectionRef: D
    }, x);
  }, v = n + "CollectionSlot", y = /* @__PURE__ */ wt.forwardRef((S, k) => {
    const { scope: x, children: D } = S, z = p(v, x), L = Fn(k, z.collectionRef);
    return /* @__PURE__ */ wt.createElement(sc, {
      ref: L
    }, D);
  }), C = n + "CollectionItemSlot", $ = "data-radix-collection-item", _ = /* @__PURE__ */ wt.forwardRef((S, k) => {
    const { scope: x, children: D, ...z } = S, L = wt.useRef(null), M = Fn(k, L), V = p(C, x);
    return wt.useEffect(() => (V.itemMap.set(L, {
      ref: L,
      ...z
    }), () => void V.itemMap.delete(L))), /* @__PURE__ */ wt.createElement(sc, {
      [$]: "",
      ref: M
    }, D);
  });
  function R(S) {
    const k = p(n + "CollectionConsumer", S);
    return wt.useCallback(() => {
      const D = k.collectionRef.current;
      if (!D)
        return [];
      const z = Array.from(D.querySelectorAll(`[${$}]`));
      return Array.from(k.itemMap.values()).sort(
        (V, H) => z.indexOf(V.ref.current) - z.indexOf(H.ref.current)
      );
    }, [
      k.collectionRef,
      k.itemMap
    ]);
  }
  return [
    {
      Provider: d,
      Slot: y,
      ItemSlot: _
    },
    R,
    l
  ];
}
function It(n, a, { checkForDefaultPrevented: o = !0 } = {}) {
  return function(c) {
    if (n == null || n(c), o === !1 || !c.defaultPrevented)
      return a == null ? void 0 : a(c);
  };
}
function $a(n) {
  const a = w.useRef(n);
  return w.useEffect(() => {
    a.current = n;
  }), w.useMemo(
    () => (...o) => {
      var l;
      return (l = a.current) === null || l === void 0 ? void 0 : l.call(a, ...o);
    },
    []
  );
}
function Qf({ prop: n, defaultProp: a, onChange: o = () => {
} }) {
  const [l, c] = lO({
    defaultProp: a,
    onChange: o
  }), p = n !== void 0, d = p ? n : l, v = $a(o), y = w.useCallback((C) => {
    if (p) {
      const _ = typeof C == "function" ? C(n) : C;
      _ !== n && v(_);
    } else
      c(C);
  }, [
    p,
    n,
    c,
    v
  ]);
  return [
    d,
    y
  ];
}
function lO({ defaultProp: n, onChange: a }) {
  const o = w.useState(n), [l] = o, c = w.useRef(l), p = $a(a);
  return w.useEffect(() => {
    c.current !== l && (p(l), c.current = l);
  }, [
    l,
    c,
    p
  ]), o;
}
var rS = { exports: {} }, kr = {}, aS = { exports: {} }, iS = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(n) {
  (function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var a = !1, o = !1, l = 5;
    function c(X, ee) {
      var Ae = X.length;
      X.push(ee), v(X, ee, Ae);
    }
    function p(X) {
      return X.length === 0 ? null : X[0];
    }
    function d(X) {
      if (X.length === 0)
        return null;
      var ee = X[0], Ae = X.pop();
      return Ae !== ee && (X[0] = Ae, y(X, Ae, 0)), ee;
    }
    function v(X, ee, Ae) {
      for (var st = Ae; st > 0; ) {
        var ft = st - 1 >>> 1, fn = X[ft];
        if (C(fn, ee) > 0)
          X[ft] = ee, X[st] = fn, st = ft;
        else
          return;
      }
    }
    function y(X, ee, Ae) {
      for (var st = Ae, ft = X.length, fn = ft >>> 1; st < fn; ) {
        var Jt = (st + 1) * 2 - 1, sr = X[Jt], Ot = Jt + 1, gr = X[Ot];
        if (C(sr, ee) < 0)
          Ot < ft && C(gr, sr) < 0 ? (X[st] = gr, X[Ot] = ee, st = Ot) : (X[st] = sr, X[Jt] = ee, st = Jt);
        else if (Ot < ft && C(gr, ee) < 0)
          X[st] = gr, X[Ot] = ee, st = Ot;
        else
          return;
      }
    }
    function C(X, ee) {
      var Ae = X.sortIndex - ee.sortIndex;
      return Ae !== 0 ? Ae : X.id - ee.id;
    }
    var $ = 1, _ = 2, R = 3, S = 4, k = 5;
    function x(X, ee) {
    }
    var D = typeof performance == "object" && typeof performance.now == "function";
    if (D) {
      var z = performance;
      n.unstable_now = function() {
        return z.now();
      };
    } else {
      var L = Date, M = L.now();
      n.unstable_now = function() {
        return L.now() - M;
      };
    }
    var V = 1073741823, H = -1, N = 250, P = 5e3, J = 1e4, me = V, we = [], ae = [], de = 1, re = null, oe = R, pe = !1, se = !1, le = !1, Ue = typeof setTimeout == "function" ? setTimeout : null, Tt = typeof clearTimeout == "function" ? clearTimeout : null, gt = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Et(X) {
      for (var ee = p(ae); ee !== null; ) {
        if (ee.callback === null)
          d(ae);
        else if (ee.startTime <= X)
          d(ae), ee.sortIndex = ee.expirationTime, c(we, ee);
        else
          return;
        ee = p(ae);
      }
    }
    function ot(X) {
      if (le = !1, Et(X), !se)
        if (p(we) !== null)
          se = !0, je($t);
        else {
          var ee = p(ae);
          ee !== null && Se(ot, ee.startTime - X);
        }
    }
    function $t(X, ee) {
      se = !1, le && (le = !1, We()), pe = !0;
      var Ae = oe;
      try {
        var st;
        if (!o)
          return Rt(X, ee);
      } finally {
        re = null, oe = Ae, pe = !1;
      }
    }
    function Rt(X, ee) {
      var Ae = ee;
      for (Et(Ae), re = p(we); re !== null && !a && !(re.expirationTime > Ae && (!X || Hn())); ) {
        var st = re.callback;
        if (typeof st == "function") {
          re.callback = null, oe = re.priorityLevel;
          var ft = re.expirationTime <= Ae, fn = st(ft);
          Ae = n.unstable_now(), typeof fn == "function" ? re.callback = fn : re === p(we) && d(we), Et(Ae);
        } else
          d(we);
        re = p(we);
      }
      if (re !== null)
        return !0;
      var Jt = p(ae);
      return Jt !== null && Se(ot, Jt.startTime - Ae), !1;
    }
    function Dt(X, ee) {
      switch (X) {
        case $:
        case _:
        case R:
        case S:
        case k:
          break;
        default:
          X = R;
      }
      var Ae = oe;
      oe = X;
      try {
        return ee();
      } finally {
        oe = Ae;
      }
    }
    function jt(X) {
      var ee;
      switch (oe) {
        case $:
        case _:
        case R:
          ee = R;
          break;
        default:
          ee = oe;
          break;
      }
      var Ae = oe;
      oe = ee;
      try {
        return X();
      } finally {
        oe = Ae;
      }
    }
    function Re(X) {
      var ee = oe;
      return function() {
        var Ae = oe;
        oe = ee;
        try {
          return X.apply(this, arguments);
        } finally {
          oe = Ae;
        }
      };
    }
    function Fe(X, ee, Ae) {
      var st = n.unstable_now(), ft;
      if (typeof Ae == "object" && Ae !== null) {
        var fn = Ae.delay;
        typeof fn == "number" && fn > 0 ? ft = st + fn : ft = st;
      } else
        ft = st;
      var Jt;
      switch (X) {
        case $:
          Jt = H;
          break;
        case _:
          Jt = N;
          break;
        case k:
          Jt = me;
          break;
        case S:
          Jt = J;
          break;
        case R:
        default:
          Jt = P;
          break;
      }
      var sr = ft + Jt, Ot = {
        id: de++,
        callback: ee,
        priorityLevel: X,
        startTime: ft,
        expirationTime: sr,
        sortIndex: -1
      };
      return ft > st ? (Ot.sortIndex = ft, c(ae, Ot), p(we) === null && Ot === p(ae) && (le ? We() : le = !0, Se(ot, ft - st))) : (Ot.sortIndex = sr, c(we, Ot), !se && !pe && (se = !0, je($t))), Ot;
    }
    function at() {
    }
    function Be() {
      !se && !pe && (se = !0, je($t));
    }
    function Ve() {
      return p(we);
    }
    function Ne(X) {
      X.callback = null;
    }
    function Je() {
      return oe;
    }
    var Ze = !1, qt = null, kt = -1, bt = l, dn = -1;
    function Hn() {
      var X = n.unstable_now() - dn;
      return !(X < bt);
    }
    function Kt() {
    }
    function or(X) {
      if (X < 0 || X > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      X > 0 ? bt = Math.floor(1e3 / X) : bt = l;
    }
    var zt = function() {
      if (qt !== null) {
        var X = n.unstable_now();
        dn = X;
        var ee = !0, Ae = !0;
        try {
          Ae = qt(ee, X);
        } finally {
          Ae ? Zt() : (Ze = !1, qt = null);
        }
      } else
        Ze = !1;
    }, Zt;
    if (typeof gt == "function")
      Zt = function() {
        gt(zt);
      };
    else if (typeof MessageChannel < "u") {
      var $n = new MessageChannel(), $e = $n.port2;
      $n.port1.onmessage = zt, Zt = function() {
        $e.postMessage(null);
      };
    } else
      Zt = function() {
        Ue(zt, 0);
      };
    function je(X) {
      qt = X, Ze || (Ze = !0, Zt());
    }
    function Se(X, ee) {
      kt = Ue(function() {
        X(n.unstable_now());
      }, ee);
    }
    function We() {
      Tt(kt), kt = -1;
    }
    var _n = Kt, rn = null;
    n.unstable_IdlePriority = k, n.unstable_ImmediatePriority = $, n.unstable_LowPriority = S, n.unstable_NormalPriority = R, n.unstable_Profiling = rn, n.unstable_UserBlockingPriority = _, n.unstable_cancelCallback = Ne, n.unstable_continueExecution = Be, n.unstable_forceFrameRate = or, n.unstable_getCurrentPriorityLevel = Je, n.unstable_getFirstCallbackNode = Ve, n.unstable_next = jt, n.unstable_pauseExecution = at, n.unstable_requestPaint = _n, n.unstable_runWithPriority = Dt, n.unstable_scheduleCallback = Fe, n.unstable_shouldYield = Hn, n.unstable_wrapCallback = Re, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(iS);
aS.exports = iS;
var uO = aS.exports;
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function() {
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
  var n = w, a = uO, o = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, l = !1;
  function c(e) {
    l = e;
  }
  function p(e) {
    if (!l) {
      for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
        r[i - 1] = arguments[i];
      v("warn", e, r);
    }
  }
  function d(e) {
    if (!l) {
      for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
        r[i - 1] = arguments[i];
      v("error", e, r);
    }
  }
  function v(e, t, r) {
    {
      var i = o.ReactDebugCurrentFrame, s = i.getStackAddendum();
      s !== "" && (t += "%s", r = r.concat([s]));
      var u = r.map(function(f) {
        return String(f);
      });
      u.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, u);
    }
  }
  var y = 0, C = 1, $ = 2, _ = 3, R = 4, S = 5, k = 6, x = 7, D = 8, z = 9, L = 10, M = 11, V = 12, H = 13, N = 14, P = 15, J = 16, me = 17, we = 18, ae = 19, de = 21, re = 22, oe = 23, pe = 24, se = 25, le = !0, Ue = !1, Tt = !1, gt = !1, Et = !1, ot = !0, $t = !1, Rt = !1, Dt = !0, jt = !0, Re = !0, Fe = /* @__PURE__ */ new Set(), at = {}, Be = {};
  function Ve(e, t) {
    Ne(e, t), Ne(e + "Capture", t);
  }
  function Ne(e, t) {
    at[e] && d("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), at[e] = t;
    {
      var r = e.toLowerCase();
      Be[r] = e, e === "onDoubleClick" && (Be.ondblclick = e);
    }
    for (var i = 0; i < t.length; i++)
      Fe.add(t[i]);
  }
  var Je = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Ze = Object.prototype.hasOwnProperty;
  function qt(e) {
    {
      var t = typeof Symbol == "function" && Symbol.toStringTag, r = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
      return r;
    }
  }
  function kt(e) {
    try {
      return bt(e), !1;
    } catch {
      return !0;
    }
  }
  function bt(e) {
    return "" + e;
  }
  function dn(e, t) {
    if (kt(e))
      return d("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, qt(e)), bt(e);
  }
  function Hn(e) {
    if (kt(e))
      return d("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", qt(e)), bt(e);
  }
  function Kt(e, t) {
    if (kt(e))
      return d("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, qt(e)), bt(e);
  }
  function or(e, t) {
    if (kt(e))
      return d("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, qt(e)), bt(e);
  }
  function zt(e) {
    if (kt(e))
      return d("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", qt(e)), bt(e);
  }
  function Zt(e) {
    if (kt(e))
      return d("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", qt(e)), bt(e);
  }
  var $n = 0, $e = 1, je = 2, Se = 3, We = 4, _n = 5, rn = 6, X = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ee = X + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Ae = new RegExp("^[" + X + "][" + ee + "]*$"), st = {}, ft = {};
  function fn(e) {
    return Ze.call(ft, e) ? !0 : Ze.call(st, e) ? !1 : Ae.test(e) ? (ft[e] = !0, !0) : (st[e] = !0, d("Invalid attribute name: `%s`", e), !1);
  }
  function Jt(e, t, r) {
    return t !== null ? t.type === $n : r ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
  }
  function sr(e, t, r, i) {
    if (r !== null && r.type === $n)
      return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean": {
        if (i)
          return !1;
        if (r !== null)
          return !r.acceptsBooleans;
        var s = e.toLowerCase().slice(0, 5);
        return s !== "data-" && s !== "aria-";
      }
      default:
        return !1;
    }
  }
  function Ot(e, t, r, i) {
    if (t === null || typeof t > "u" || sr(e, t, r, i))
      return !0;
    if (i)
      return !1;
    if (r !== null)
      switch (r.type) {
        case Se:
          return !t;
        case We:
          return t === !1;
        case _n:
          return isNaN(t);
        case rn:
          return isNaN(t) || t < 1;
      }
    return !1;
  }
  function gr(e) {
    return Ut.hasOwnProperty(e) ? Ut[e] : null;
  }
  function Pt(e, t, r, i, s, u, f) {
    this.acceptsBooleans = t === je || t === Se || t === We, this.attributeName = i, this.attributeNamespace = s, this.mustUseProperty = r, this.propertyName = e, this.type = t, this.sanitizeURL = u, this.removeEmptyString = f;
  }
  var Ut = {}, ua = [
    "children",
    "dangerouslySetInnerHTML",
    // TODO: This prevents the assignment of defaultValue to regular
    // elements (not just inputs). Now that ReactDOMInput assigns to the
    // defaultValue property -- do we need this?
    "defaultValue",
    "defaultChecked",
    "innerHTML",
    "suppressContentEditableWarning",
    "suppressHydrationWarning",
    "style"
  ];
  ua.forEach(function(e) {
    Ut[e] = new Pt(
      e,
      $n,
      !1,
      // mustUseProperty
      e,
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0], r = e[1];
    Ut[t] = new Pt(
      t,
      $e,
      !1,
      // mustUseProperty
      r,
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    Ut[e] = new Pt(
      e,
      je,
      !1,
      // mustUseProperty
      e.toLowerCase(),
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    Ut[e] = new Pt(
      e,
      je,
      !1,
      // mustUseProperty
      e,
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), [
    "allowFullScreen",
    "async",
    // Note: there is a special case that prevents it from being written to the DOM
    // on the client side because the browsers are inconsistent. Instead we call focus().
    "autoFocus",
    "autoPlay",
    "controls",
    "default",
    "defer",
    "disabled",
    "disablePictureInPicture",
    "disableRemotePlayback",
    "formNoValidate",
    "hidden",
    "loop",
    "noModule",
    "noValidate",
    "open",
    "playsInline",
    "readOnly",
    "required",
    "reversed",
    "scoped",
    "seamless",
    // Microdata
    "itemScope"
  ].forEach(function(e) {
    Ut[e] = new Pt(
      e,
      Se,
      !1,
      // mustUseProperty
      e.toLowerCase(),
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), [
    "checked",
    // Note: `option.selected` is not updated if `select.multiple` is
    // disabled with `removeAttribute`. We have special logic for handling this.
    "multiple",
    "muted",
    "selected"
    // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function(e) {
    Ut[e] = new Pt(
      e,
      Se,
      !0,
      // mustUseProperty
      e,
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), [
    "capture",
    "download"
    // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function(e) {
    Ut[e] = new Pt(
      e,
      We,
      !1,
      // mustUseProperty
      e,
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), [
    "cols",
    "rows",
    "size",
    "span"
    // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function(e) {
    Ut[e] = new Pt(
      e,
      rn,
      !1,
      // mustUseProperty
      e,
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), ["rowSpan", "start"].forEach(function(e) {
    Ut[e] = new Pt(
      e,
      _n,
      !1,
      // mustUseProperty
      e.toLowerCase(),
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  });
  var Hr = /[\-\:]([a-z])/g, Qi = function(e) {
    return e[1].toUpperCase();
  };
  [
    "accent-height",
    "alignment-baseline",
    "arabic-form",
    "baseline-shift",
    "cap-height",
    "clip-path",
    "clip-rule",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "dominant-baseline",
    "enable-background",
    "fill-opacity",
    "fill-rule",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-name",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "horiz-adv-x",
    "horiz-origin-x",
    "image-rendering",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "overline-position",
    "overline-thickness",
    "paint-order",
    "panose-1",
    "pointer-events",
    "rendering-intent",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "strikethrough-position",
    "strikethrough-thickness",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "underline-position",
    "underline-thickness",
    "unicode-bidi",
    "unicode-range",
    "units-per-em",
    "v-alphabetic",
    "v-hanging",
    "v-ideographic",
    "v-mathematical",
    "vector-effect",
    "vert-adv-y",
    "vert-origin-x",
    "vert-origin-y",
    "word-spacing",
    "writing-mode",
    "xmlns:xlink",
    "x-height"
    // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function(e) {
    var t = e.replace(Hr, Qi);
    Ut[t] = new Pt(
      t,
      $e,
      !1,
      // mustUseProperty
      e,
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), [
    "xlink:actuate",
    "xlink:arcrole",
    "xlink:role",
    "xlink:show",
    "xlink:title",
    "xlink:type"
    // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function(e) {
    var t = e.replace(Hr, Qi);
    Ut[t] = new Pt(
      t,
      $e,
      !1,
      // mustUseProperty
      e,
      "http://www.w3.org/1999/xlink",
      !1,
      // sanitizeURL
      !1
    );
  }), [
    "xml:base",
    "xml:lang",
    "xml:space"
    // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function(e) {
    var t = e.replace(Hr, Qi);
    Ut[t] = new Pt(
      t,
      $e,
      !1,
      // mustUseProperty
      e,
      "http://www.w3.org/XML/1998/namespace",
      !1,
      // sanitizeURL
      !1
    );
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    Ut[e] = new Pt(
      e,
      $e,
      !1,
      // mustUseProperty
      e.toLowerCase(),
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  });
  var Ho = "xlinkHref";
  Ut[Ho] = new Pt(
    "xlinkHref",
    $e,
    !1,
    // mustUseProperty
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    // sanitizeURL
    !1
  ), ["src", "href", "action", "formAction"].forEach(function(e) {
    Ut[e] = new Pt(
      e,
      $e,
      !1,
      // mustUseProperty
      e.toLowerCase(),
      // attributeName
      null,
      // attributeNamespace
      !0,
      // sanitizeURL
      !0
    );
  });
  var dl = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Ji = !1;
  function eo(e) {
    !Ji && dl.test(e) && (Ji = !0, d("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
  }
  function Oa(e, t, r, i) {
    if (i.mustUseProperty) {
      var s = i.propertyName;
      return e[s];
    } else {
      dn(r, t), i.sanitizeURL && eo("" + r);
      var u = i.attributeName, f = null;
      if (i.type === We) {
        if (e.hasAttribute(u)) {
          var h = e.getAttribute(u);
          return h === "" ? !0 : Ot(t, r, i, !1) ? h : h === "" + r ? r : h;
        }
      } else if (e.hasAttribute(u)) {
        if (Ot(t, r, i, !1))
          return e.getAttribute(u);
        if (i.type === Se)
          return r;
        f = e.getAttribute(u);
      }
      return Ot(t, r, i, !1) ? f === null ? r : f : f === "" + r ? r : f;
    }
  }
  function pi(e, t, r, i) {
    {
      if (!fn(t))
        return;
      if (!e.hasAttribute(t))
        return r === void 0 ? void 0 : null;
      var s = e.getAttribute(t);
      return dn(r, t), s === "" + r ? r : s;
    }
  }
  function Aa(e, t, r, i) {
    var s = gr(t);
    if (!Jt(t, s, i)) {
      if (Ot(t, r, s, i) && (r = null), i || s === null) {
        if (fn(t)) {
          var u = t;
          r === null ? e.removeAttribute(u) : (dn(r, t), e.setAttribute(u, "" + r));
        }
        return;
      }
      var f = s.mustUseProperty;
      if (f) {
        var h = s.propertyName;
        if (r === null) {
          var m = s.type;
          e[h] = m === Se ? !1 : "";
        } else
          e[h] = r;
        return;
      }
      var E = s.attributeName, T = s.attributeNamespace;
      if (r === null)
        e.removeAttribute(E);
      else {
        var q = s.type, I;
        q === Se || q === We && r === !0 ? I = "" : (dn(r, E), I = "" + r, s.sanitizeURL && eo(I.toString())), T ? e.setAttributeNS(T, E, I) : e.setAttribute(E, I);
      }
    }
  }
  var ca = Symbol.for("react.element"), Br = Symbol.for("react.portal"), da = Symbol.for("react.fragment"), to = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), te = Symbol.for("react.provider"), ce = Symbol.for("react.context"), be = Symbol.for("react.forward_ref"), Xe = Symbol.for("react.suspense"), lt = Symbol.for("react.suspense_list"), Ge = Symbol.for("react.memo"), Te = Symbol.for("react.lazy"), pn = Symbol.for("react.scope"), Ft = Symbol.for("react.debug_trace_mode"), Vt = Symbol.for("react.offscreen"), Bn = Symbol.for("react.legacy_hidden"), fa = Symbol.for("react.cache"), Bo = Symbol.for("react.tracing_marker"), lr = Symbol.iterator, yp = "@@iterator";
  function La(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = lr && e[lr] || e[yp];
    return typeof t == "function" ? t : null;
  }
  var Qe = Object.assign, no = 0, hi, fl, pl, hl, vl, ml, gl;
  function yl() {
  }
  yl.__reactDisabledLog = !0;
  function gc() {
    {
      if (no === 0) {
        hi = console.log, fl = console.info, pl = console.warn, hl = console.error, vl = console.group, ml = console.groupCollapsed, gl = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: yl,
          writable: !0
        };
        Object.defineProperties(console, {
          info: e,
          log: e,
          warn: e,
          error: e,
          group: e,
          groupCollapsed: e,
          groupEnd: e
        });
      }
      no++;
    }
  }
  function bp() {
    {
      if (no--, no === 0) {
        var e = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: Qe({}, e, {
            value: hi
          }),
          info: Qe({}, e, {
            value: fl
          }),
          warn: Qe({}, e, {
            value: pl
          }),
          error: Qe({}, e, {
            value: hl
          }),
          group: Qe({}, e, {
            value: vl
          }),
          groupCollapsed: Qe({}, e, {
            value: ml
          }),
          groupEnd: Qe({}, e, {
            value: gl
          })
        });
      }
      no < 0 && d("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var bl = o.ReactCurrentDispatcher, ro;
  function Ar(e, t, r) {
    {
      if (ro === void 0)
        try {
          throw Error();
        } catch (s) {
          var i = s.stack.trim().match(/\n( *(at )?)/);
          ro = i && i[1] || "";
        }
      return `
` + ro + e;
    }
  }
  var vi = !1, mi;
  {
    var jo = typeof WeakMap == "function" ? WeakMap : Map;
    mi = new jo();
  }
  function wl(e, t) {
    if (!e || vi)
      return "";
    {
      var r = mi.get(e);
      if (r !== void 0)
        return r;
    }
    var i;
    vi = !0;
    var s = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var u;
    u = bl.current, bl.current = null, gc();
    try {
      if (t) {
        var f = function() {
          throw Error();
        };
        if (Object.defineProperty(f.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(f, []);
          } catch (j) {
            i = j;
          }
          Reflect.construct(e, [], f);
        } else {
          try {
            f.call();
          } catch (j) {
            i = j;
          }
          e.call(f.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (j) {
          i = j;
        }
        e();
      }
    } catch (j) {
      if (j && i && typeof j.stack == "string") {
        for (var h = j.stack.split(`
`), m = i.stack.split(`
`), E = h.length - 1, T = m.length - 1; E >= 1 && T >= 0 && h[E] !== m[T]; )
          T--;
        for (; E >= 1 && T >= 0; E--, T--)
          if (h[E] !== m[T]) {
            if (E !== 1 || T !== 1)
              do
                if (E--, T--, T < 0 || h[E] !== m[T]) {
                  var q = `
` + h[E].replace(" at new ", " at ");
                  return e.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", e.displayName)), typeof e == "function" && mi.set(e, q), q;
                }
              while (E >= 1 && T >= 0);
            break;
          }
      }
    } finally {
      vi = !1, bl.current = u, bp(), Error.prepareStackTrace = s;
    }
    var I = e ? e.displayName || e.name : "", B = I ? Ar(I) : "";
    return typeof e == "function" && mi.set(e, B), B;
  }
  function yc(e, t, r) {
    return wl(e, !0);
  }
  function Cl(e, t, r) {
    return wl(e, !1);
  }
  function wp(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function gi(e, t, r) {
    if (e == null)
      return "";
    if (typeof e == "function")
      return wl(e, wp(e));
    if (typeof e == "string")
      return Ar(e);
    switch (e) {
      case Xe:
        return Ar("Suspense");
      case lt:
        return Ar("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case be:
          return Cl(e.render);
        case Ge:
          return gi(e.type, t, r);
        case Te: {
          var i = e, s = i._payload, u = i._init;
          try {
            return gi(u(s), t, r);
          } catch {
          }
        }
      }
    return "";
  }
  function bc(e) {
    switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
      case S:
        return Ar(e.type);
      case J:
        return Ar("Lazy");
      case H:
        return Ar("Suspense");
      case ae:
        return Ar("SuspenseList");
      case y:
      case $:
      case P:
        return Cl(e.type);
      case M:
        return Cl(e.type.render);
      case C:
        return yc(e.type);
      default:
        return "";
    }
  }
  function Sl(e) {
    try {
      var t = "", r = e;
      do
        t += bc(r), r = r.return;
      while (r);
      return t;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  function Go(e, t, r) {
    var i = e.displayName;
    if (i)
      return i;
    var s = t.displayName || t.name || "";
    return s !== "" ? r + "(" + s + ")" : r;
  }
  function wc(e) {
    return e.displayName || "Context";
  }
  function pt(e) {
    if (e == null)
      return null;
    if (typeof e.tag == "number" && d("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case da:
        return "Fragment";
      case Br:
        return "Portal";
      case A:
        return "Profiler";
      case to:
        return "StrictMode";
      case Xe:
        return "Suspense";
      case lt:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ce:
          var t = e;
          return wc(t) + ".Consumer";
        case te:
          var r = e;
          return wc(r._context) + ".Provider";
        case be:
          return Go(e, e.render, "ForwardRef");
        case Ge:
          var i = e.displayName || null;
          return i !== null ? i : pt(e.type) || "Memo";
        case Te: {
          var s = e, u = s._payload, f = s._init;
          try {
            return pt(f(u));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  function _l(e, t, r) {
    var i = t.displayName || t.name || "";
    return e.displayName || (i !== "" ? r + "(" + i + ")" : r);
  }
  function xl(e) {
    return e.displayName || "Context";
  }
  function He(e) {
    var t = e.tag, r = e.type;
    switch (t) {
      case pe:
        return "Cache";
      case z:
        var i = r;
        return xl(i) + ".Consumer";
      case L:
        var s = r;
        return xl(s._context) + ".Provider";
      case we:
        return "DehydratedFragment";
      case M:
        return _l(r, r.render, "ForwardRef");
      case x:
        return "Fragment";
      case S:
        return r;
      case R:
        return "Portal";
      case _:
        return "Root";
      case k:
        return "Text";
      case J:
        return pt(r);
      case D:
        return r === to ? "StrictMode" : "Mode";
      case re:
        return "Offscreen";
      case V:
        return "Profiler";
      case de:
        return "Scope";
      case H:
        return "Suspense";
      case ae:
        return "SuspenseList";
      case se:
        return "TracingMarker";
      case C:
      case y:
      case me:
      case $:
      case N:
      case P:
        if (typeof r == "function")
          return r.displayName || r.name || null;
        if (typeof r == "string")
          return r;
        break;
    }
    return null;
  }
  var Cc = o.ReactDebugCurrentFrame, jn = null, ao = !1;
  function yi() {
    {
      if (jn === null)
        return null;
      var e = jn._debugOwner;
      if (e !== null && typeof e < "u")
        return He(e);
    }
    return null;
  }
  function Sc() {
    return jn === null ? "" : Sl(jn);
  }
  function xn() {
    Cc.getCurrentStack = null, jn = null, ao = !1;
  }
  function Gt(e) {
    Cc.getCurrentStack = e === null ? null : Sc, jn = e, ao = !1;
  }
  function _c() {
    return jn;
  }
  function yr(e) {
    ao = e;
  }
  function ur(e) {
    return "" + e;
  }
  function pa(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return Zt(e), e;
      default:
        return "";
    }
  }
  var Cp = {
    button: !0,
    checkbox: !0,
    image: !0,
    hidden: !0,
    radio: !0,
    reset: !0,
    submit: !0
  };
  function Yo(e, t) {
    Cp[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || d("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || d("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
  }
  function io(e) {
    var t = e.type, r = e.nodeName;
    return r && r.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function xc(e) {
    return e._valueTracker;
  }
  function bi(e) {
    e._valueTracker = null;
  }
  function Ec(e) {
    var t = "";
    return e && (io(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
  }
  function Sp(e) {
    var t = io(e) ? "checked" : "value", r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    Zt(e[t]);
    var i = "" + e[t];
    if (!(e.hasOwnProperty(t) || typeof r > "u" || typeof r.get != "function" || typeof r.set != "function")) {
      var s = r.get, u = r.set;
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return s.call(this);
        },
        set: function(h) {
          Zt(h), i = "" + h, u.call(this, h);
        }
      }), Object.defineProperty(e, t, {
        enumerable: r.enumerable
      });
      var f = {
        getValue: function() {
          return i;
        },
        setValue: function(h) {
          Zt(h), i = "" + h;
        },
        stopTracking: function() {
          bi(e), delete e[t];
        }
      };
      return f;
    }
  }
  function Ma(e) {
    xc(e) || (e._valueTracker = Sp(e));
  }
  function Wo(e) {
    if (!e)
      return !1;
    var t = xc(e);
    if (!t)
      return !0;
    var r = t.getValue(), i = Ec(e);
    return i !== r ? (t.setValue(i), !0) : !1;
  }
  function wi(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Ko = !1, Rc = !1, kc = !1, Tc = !1;
  function $c(e) {
    var t = e.type === "checkbox" || e.type === "radio";
    return t ? e.checked != null : e.value != null;
  }
  function g(e, t) {
    var r = e, i = t.checked, s = Qe({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: i ?? r._wrapperState.initialChecked
    });
    return s;
  }
  function O(e, t) {
    Yo("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !Rc && (d("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", yi() || "A component", t.type), Rc = !0), t.value !== void 0 && t.defaultValue !== void 0 && !Ko && (d("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", yi() || "A component", t.type), Ko = !0);
    var r = e, i = t.defaultValue == null ? "" : t.defaultValue;
    r._wrapperState = {
      initialChecked: t.checked != null ? t.checked : t.defaultChecked,
      initialValue: pa(t.value != null ? t.value : i),
      controlled: $c(t)
    };
  }
  function G(e, t) {
    var r = e, i = t.checked;
    i != null && Aa(r, "checked", i, !1);
  }
  function Y(e, t) {
    var r = e;
    {
      var i = $c(t);
      !r._wrapperState.controlled && i && !Tc && (d("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Tc = !0), r._wrapperState.controlled && !i && !kc && (d("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), kc = !0);
    }
    G(e, t);
    var s = pa(t.value), u = t.type;
    if (s != null)
      u === "number" ? (s === 0 && r.value === "" || // We explicitly want to coerce to number here if possible.
      // eslint-disable-next-line
      r.value != s) && (r.value = ur(s)) : r.value !== ur(s) && (r.value = ur(s));
    else if (u === "submit" || u === "reset") {
      r.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Ie(r, t.type, s) : t.hasOwnProperty("defaultValue") && Ie(r, t.type, pa(t.defaultValue)), t.checked == null && t.defaultChecked != null && (r.defaultChecked = !!t.defaultChecked);
  }
  function ie(e, t, r) {
    var i = e;
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var s = t.type, u = s === "submit" || s === "reset";
      if (u && (t.value === void 0 || t.value === null))
        return;
      var f = ur(i._wrapperState.initialValue);
      r || f !== i.value && (i.value = f), i.defaultValue = f;
    }
    var h = i.name;
    h !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, h !== "" && (i.name = h);
  }
  function Le(e, t) {
    var r = e;
    Y(r, t), _e(r, t);
  }
  function _e(e, t) {
    var r = t.name;
    if (t.type === "radio" && r != null) {
      for (var i = e; i.parentNode; )
        i = i.parentNode;
      dn(r, "name");
      for (var s = i.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), u = 0; u < s.length; u++) {
        var f = s[u];
        if (!(f === e || f.form !== e.form)) {
          var h = vd(f);
          if (!h)
            throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
          Wo(f), Y(f, h);
        }
      }
    }
  }
  function Ie(e, t, r) {
    // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
    (t !== "number" || wi(e.ownerDocument) !== e) && (r == null ? e.defaultValue = ur(e._wrapperState.initialValue) : e.defaultValue !== ur(r) && (e.defaultValue = ur(r)));
  }
  var et = !1, Ct = !1, At = !1;
  function Lt(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? n.Children.forEach(t.children, function(r) {
      r != null && (typeof r == "string" || typeof r == "number" || Ct || (Ct = !0, d("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && (At || (At = !0, d("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !et && (d("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), et = !0);
  }
  function Ht(e, t) {
    t.value != null && e.setAttribute("value", ur(pa(t.value)));
  }
  var Xt = Array.isArray;
  function ht(e) {
    return Xt(e);
  }
  var Ci;
  Ci = !1;
  function Zo() {
    var e = yi();
    return e ? `

Check the render method of \`` + e + "`." : "";
  }
  var El = ["value", "defaultValue"];
  function _p(e) {
    {
      Yo("select", e);
      for (var t = 0; t < El.length; t++) {
        var r = El[t];
        if (e[r] != null) {
          var i = ht(e[r]);
          e.multiple && !i ? d("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", r, Zo()) : !e.multiple && i && d("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", r, Zo());
        }
      }
    }
  }
  function Ia(e, t, r, i) {
    var s = e.options;
    if (t) {
      for (var u = r, f = {}, h = 0; h < u.length; h++)
        f["$" + u[h]] = !0;
      for (var m = 0; m < s.length; m++) {
        var E = f.hasOwnProperty("$" + s[m].value);
        s[m].selected !== E && (s[m].selected = E), E && i && (s[m].defaultSelected = !0);
      }
    } else {
      for (var T = ur(pa(r)), q = null, I = 0; I < s.length; I++) {
        if (s[I].value === T) {
          s[I].selected = !0, i && (s[I].defaultSelected = !0);
          return;
        }
        q === null && !s[I].disabled && (q = s[I]);
      }
      q !== null && (q.selected = !0);
    }
  }
  function Rl(e, t) {
    return Qe({}, t, {
      value: void 0
    });
  }
  function kl(e, t) {
    var r = e;
    _p(t), r._wrapperState = {
      wasMultiple: !!t.multiple
    }, t.value !== void 0 && t.defaultValue !== void 0 && !Ci && (d("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Ci = !0);
  }
  function xp(e, t) {
    var r = e;
    r.multiple = !!t.multiple;
    var i = t.value;
    i != null ? Ia(r, !!t.multiple, i, !1) : t.defaultValue != null && Ia(r, !!t.multiple, t.defaultValue, !0);
  }
  function h6(e, t) {
    var r = e, i = r._wrapperState.wasMultiple;
    r._wrapperState.wasMultiple = !!t.multiple;
    var s = t.value;
    s != null ? Ia(r, !!t.multiple, s, !1) : i !== !!t.multiple && (t.defaultValue != null ? Ia(r, !!t.multiple, t.defaultValue, !0) : Ia(r, !!t.multiple, t.multiple ? [] : "", !1));
  }
  function v6(e, t) {
    var r = e, i = t.value;
    i != null && Ia(r, !!t.multiple, i, !1);
  }
  var Gy = !1;
  function Ep(e, t) {
    var r = e;
    if (t.dangerouslySetInnerHTML != null)
      throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
    var i = Qe({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: ur(r._wrapperState.initialValue)
    });
    return i;
  }
  function Yy(e, t) {
    var r = e;
    Yo("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Gy && (d("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", yi() || "A component"), Gy = !0);
    var i = t.value;
    if (i == null) {
      var s = t.children, u = t.defaultValue;
      if (s != null) {
        d("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
        {
          if (u != null)
            throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
          if (ht(s)) {
            if (s.length > 1)
              throw new Error("<textarea> can only have at most one child.");
            s = s[0];
          }
          u = s;
        }
      }
      u == null && (u = ""), i = u;
    }
    r._wrapperState = {
      initialValue: pa(i)
    };
  }
  function Wy(e, t) {
    var r = e, i = pa(t.value), s = pa(t.defaultValue);
    if (i != null) {
      var u = ur(i);
      u !== r.value && (r.value = u), t.defaultValue == null && r.defaultValue !== u && (r.defaultValue = u);
    }
    s != null && (r.defaultValue = ur(s));
  }
  function Ky(e, t) {
    var r = e, i = r.textContent;
    i === r._wrapperState.initialValue && i !== "" && i !== null && (r.value = i);
  }
  function m6(e, t) {
    Wy(e, t);
  }
  var qa = "http://www.w3.org/1999/xhtml", g6 = "http://www.w3.org/1998/Math/MathML", Rp = "http://www.w3.org/2000/svg";
  function kp(e) {
    switch (e) {
      case "svg":
        return Rp;
      case "math":
        return g6;
      default:
        return qa;
    }
  }
  function Tp(e, t) {
    return e == null || e === qa ? kp(t) : e === Rp && t === "foreignObject" ? qa : e;
  }
  var y6 = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, r, i, s) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, r, i, s);
      });
    } : e;
  }, Dc, Zy = y6(function(e, t) {
    if (e.namespaceURI === Rp && !("innerHTML" in e)) {
      Dc = Dc || document.createElement("div"), Dc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var r = Dc.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; r.firstChild; )
        e.appendChild(r.firstChild);
      return;
    }
    e.innerHTML = t;
  }), cr = 1, za = 3, an = 8, Na = 9, $p = 11, Oc = function(e, t) {
    if (t) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === za) {
        r.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }, b6 = {
    animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
    background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
    backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
    border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
    borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
    borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
    borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
    borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
    borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
    borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
    borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
    borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
    borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
    borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
    borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
    borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
    borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
    columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
    columns: ["columnCount", "columnWidth"],
    flex: ["flexBasis", "flexGrow", "flexShrink"],
    flexFlow: ["flexDirection", "flexWrap"],
    font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
    fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
    gap: ["columnGap", "rowGap"],
    grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
    gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
    gridColumn: ["gridColumnEnd", "gridColumnStart"],
    gridColumnGap: ["columnGap"],
    gridGap: ["columnGap", "rowGap"],
    gridRow: ["gridRowEnd", "gridRowStart"],
    gridRowGap: ["rowGap"],
    gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
    listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
    margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
    marker: ["markerEnd", "markerMid", "markerStart"],
    mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
    maskPosition: ["maskPositionX", "maskPositionY"],
    outline: ["outlineColor", "outlineStyle", "outlineWidth"],
    overflow: ["overflowX", "overflowY"],
    padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
    placeContent: ["alignContent", "justifyContent"],
    placeItems: ["alignItems", "justifyItems"],
    placeSelf: ["alignSelf", "justifySelf"],
    textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
    textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
    transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
    wordWrap: ["overflowWrap"]
  }, Tl = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    // SVG-related properties
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  };
  function w6(e, t) {
    return e + t.charAt(0).toUpperCase() + t.substring(1);
  }
  var C6 = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Tl).forEach(function(e) {
    C6.forEach(function(t) {
      Tl[w6(t, e)] = Tl[e];
    });
  });
  function Dp(e, t, r) {
    var i = t == null || typeof t == "boolean" || t === "";
    return i ? "" : !r && typeof t == "number" && t !== 0 && !(Tl.hasOwnProperty(e) && Tl[e]) ? t + "px" : (or(t, e), ("" + t).trim());
  }
  var S6 = /([A-Z])/g, _6 = /^ms-/;
  function x6(e) {
    return e.replace(S6, "-$1").toLowerCase().replace(_6, "-ms-");
  }
  var Xy = function() {
  };
  {
    var E6 = /^(?:webkit|moz|o)[A-Z]/, R6 = /^-ms-/, k6 = /-(.)/g, Qy = /;\s*$/, Xo = {}, Op = {}, Jy = !1, e1 = !1, T6 = function(e) {
      return e.replace(k6, function(t, r) {
        return r.toUpperCase();
      });
    }, $6 = function(e) {
      Xo.hasOwnProperty(e) && Xo[e] || (Xo[e] = !0, d(
        "Unsupported style property %s. Did you mean %s?",
        e,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        T6(e.replace(R6, "ms-"))
      ));
    }, D6 = function(e) {
      Xo.hasOwnProperty(e) && Xo[e] || (Xo[e] = !0, d("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, O6 = function(e, t) {
      Op.hasOwnProperty(t) && Op[t] || (Op[t] = !0, d(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Qy, "")));
    }, A6 = function(e, t) {
      Jy || (Jy = !0, d("`NaN` is an invalid value for the `%s` css style property.", e));
    }, L6 = function(e, t) {
      e1 || (e1 = !0, d("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    Xy = function(e, t) {
      e.indexOf("-") > -1 ? $6(e) : E6.test(e) ? D6(e) : Qy.test(t) && O6(e, t), typeof t == "number" && (isNaN(t) ? A6(e, t) : isFinite(t) || L6(e, t));
    };
  }
  var M6 = Xy;
  function I6(e) {
    {
      var t = "", r = "";
      for (var i in e)
        if (e.hasOwnProperty(i)) {
          var s = e[i];
          if (s != null) {
            var u = i.indexOf("--") === 0;
            t += r + (u ? i : x6(i)) + ":", t += Dp(i, s, u), r = ";";
          }
        }
      return t || null;
    }
  }
  function t1(e, t) {
    var r = e.style;
    for (var i in t)
      if (t.hasOwnProperty(i)) {
        var s = i.indexOf("--") === 0;
        s || M6(i, t[i]);
        var u = Dp(i, t[i], s);
        i === "float" && (i = "cssFloat"), s ? r.setProperty(i, u) : r[i] = u;
      }
  }
  function q6(e) {
    return e == null || typeof e == "boolean" || e === "";
  }
  function n1(e) {
    var t = {};
    for (var r in e)
      for (var i = b6[r] || [r], s = 0; s < i.length; s++)
        t[i[s]] = r;
    return t;
  }
  function z6(e, t) {
    {
      if (!t)
        return;
      var r = n1(e), i = n1(t), s = {};
      for (var u in r) {
        var f = r[u], h = i[u];
        if (h && f !== h) {
          var m = f + "," + h;
          if (s[m])
            continue;
          s[m] = !0, d("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", q6(e[f]) ? "Removing" : "Updating", f, h);
        }
      }
    }
  }
  var N6 = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
    // NOTE: menuitem's close tag should be omitted, but that causes problems.
  }, P6 = Qe({
    menuitem: !0
  }, N6), U6 = "__html";
  function Ap(e, t) {
    if (t) {
      if (P6[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof t.dangerouslySetInnerHTML != "object" || !(U6 in t.dangerouslySetInnerHTML))
          throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
      }
      if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && d("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
        throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
    }
  }
  function oo(e, t) {
    if (e.indexOf("-") === -1)
      return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Ac = {
    // HTML
    accept: "accept",
    acceptcharset: "acceptCharset",
    "accept-charset": "acceptCharset",
    accesskey: "accessKey",
    action: "action",
    allowfullscreen: "allowFullScreen",
    alt: "alt",
    as: "as",
    async: "async",
    autocapitalize: "autoCapitalize",
    autocomplete: "autoComplete",
    autocorrect: "autoCorrect",
    autofocus: "autoFocus",
    autoplay: "autoPlay",
    autosave: "autoSave",
    capture: "capture",
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    challenge: "challenge",
    charset: "charSet",
    checked: "checked",
    children: "children",
    cite: "cite",
    class: "className",
    classid: "classID",
    classname: "className",
    cols: "cols",
    colspan: "colSpan",
    content: "content",
    contenteditable: "contentEditable",
    contextmenu: "contextMenu",
    controls: "controls",
    controlslist: "controlsList",
    coords: "coords",
    crossorigin: "crossOrigin",
    dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
    data: "data",
    datetime: "dateTime",
    default: "default",
    defaultchecked: "defaultChecked",
    defaultvalue: "defaultValue",
    defer: "defer",
    dir: "dir",
    disabled: "disabled",
    disablepictureinpicture: "disablePictureInPicture",
    disableremoteplayback: "disableRemotePlayback",
    download: "download",
    draggable: "draggable",
    enctype: "encType",
    enterkeyhint: "enterKeyHint",
    for: "htmlFor",
    form: "form",
    formmethod: "formMethod",
    formaction: "formAction",
    formenctype: "formEncType",
    formnovalidate: "formNoValidate",
    formtarget: "formTarget",
    frameborder: "frameBorder",
    headers: "headers",
    height: "height",
    hidden: "hidden",
    high: "high",
    href: "href",
    hreflang: "hrefLang",
    htmlfor: "htmlFor",
    httpequiv: "httpEquiv",
    "http-equiv": "httpEquiv",
    icon: "icon",
    id: "id",
    imagesizes: "imageSizes",
    imagesrcset: "imageSrcSet",
    innerhtml: "innerHTML",
    inputmode: "inputMode",
    integrity: "integrity",
    is: "is",
    itemid: "itemID",
    itemprop: "itemProp",
    itemref: "itemRef",
    itemscope: "itemScope",
    itemtype: "itemType",
    keyparams: "keyParams",
    keytype: "keyType",
    kind: "kind",
    label: "label",
    lang: "lang",
    list: "list",
    loop: "loop",
    low: "low",
    manifest: "manifest",
    marginwidth: "marginWidth",
    marginheight: "marginHeight",
    max: "max",
    maxlength: "maxLength",
    media: "media",
    mediagroup: "mediaGroup",
    method: "method",
    min: "min",
    minlength: "minLength",
    multiple: "multiple",
    muted: "muted",
    name: "name",
    nomodule: "noModule",
    nonce: "nonce",
    novalidate: "noValidate",
    open: "open",
    optimum: "optimum",
    pattern: "pattern",
    placeholder: "placeholder",
    playsinline: "playsInline",
    poster: "poster",
    preload: "preload",
    profile: "profile",
    radiogroup: "radioGroup",
    readonly: "readOnly",
    referrerpolicy: "referrerPolicy",
    rel: "rel",
    required: "required",
    reversed: "reversed",
    role: "role",
    rows: "rows",
    rowspan: "rowSpan",
    sandbox: "sandbox",
    scope: "scope",
    scoped: "scoped",
    scrolling: "scrolling",
    seamless: "seamless",
    selected: "selected",
    shape: "shape",
    size: "size",
    sizes: "sizes",
    span: "span",
    spellcheck: "spellCheck",
    src: "src",
    srcdoc: "srcDoc",
    srclang: "srcLang",
    srcset: "srcSet",
    start: "start",
    step: "step",
    style: "style",
    summary: "summary",
    tabindex: "tabIndex",
    target: "target",
    title: "title",
    type: "type",
    usemap: "useMap",
    value: "value",
    width: "width",
    wmode: "wmode",
    wrap: "wrap",
    // SVG
    about: "about",
    accentheight: "accentHeight",
    "accent-height": "accentHeight",
    accumulate: "accumulate",
    additive: "additive",
    alignmentbaseline: "alignmentBaseline",
    "alignment-baseline": "alignmentBaseline",
    allowreorder: "allowReorder",
    alphabetic: "alphabetic",
    amplitude: "amplitude",
    arabicform: "arabicForm",
    "arabic-form": "arabicForm",
    ascent: "ascent",
    attributename: "attributeName",
    attributetype: "attributeType",
    autoreverse: "autoReverse",
    azimuth: "azimuth",
    basefrequency: "baseFrequency",
    baselineshift: "baselineShift",
    "baseline-shift": "baselineShift",
    baseprofile: "baseProfile",
    bbox: "bbox",
    begin: "begin",
    bias: "bias",
    by: "by",
    calcmode: "calcMode",
    capheight: "capHeight",
    "cap-height": "capHeight",
    clip: "clip",
    clippath: "clipPath",
    "clip-path": "clipPath",
    clippathunits: "clipPathUnits",
    cliprule: "clipRule",
    "clip-rule": "clipRule",
    color: "color",
    colorinterpolation: "colorInterpolation",
    "color-interpolation": "colorInterpolation",
    colorinterpolationfilters: "colorInterpolationFilters",
    "color-interpolation-filters": "colorInterpolationFilters",
    colorprofile: "colorProfile",
    "color-profile": "colorProfile",
    colorrendering: "colorRendering",
    "color-rendering": "colorRendering",
    contentscripttype: "contentScriptType",
    contentstyletype: "contentStyleType",
    cursor: "cursor",
    cx: "cx",
    cy: "cy",
    d: "d",
    datatype: "datatype",
    decelerate: "decelerate",
    descent: "descent",
    diffuseconstant: "diffuseConstant",
    direction: "direction",
    display: "display",
    divisor: "divisor",
    dominantbaseline: "dominantBaseline",
    "dominant-baseline": "dominantBaseline",
    dur: "dur",
    dx: "dx",
    dy: "dy",
    edgemode: "edgeMode",
    elevation: "elevation",
    enablebackground: "enableBackground",
    "enable-background": "enableBackground",
    end: "end",
    exponent: "exponent",
    externalresourcesrequired: "externalResourcesRequired",
    fill: "fill",
    fillopacity: "fillOpacity",
    "fill-opacity": "fillOpacity",
    fillrule: "fillRule",
    "fill-rule": "fillRule",
    filter: "filter",
    filterres: "filterRes",
    filterunits: "filterUnits",
    floodopacity: "floodOpacity",
    "flood-opacity": "floodOpacity",
    floodcolor: "floodColor",
    "flood-color": "floodColor",
    focusable: "focusable",
    fontfamily: "fontFamily",
    "font-family": "fontFamily",
    fontsize: "fontSize",
    "font-size": "fontSize",
    fontsizeadjust: "fontSizeAdjust",
    "font-size-adjust": "fontSizeAdjust",
    fontstretch: "fontStretch",
    "font-stretch": "fontStretch",
    fontstyle: "fontStyle",
    "font-style": "fontStyle",
    fontvariant: "fontVariant",
    "font-variant": "fontVariant",
    fontweight: "fontWeight",
    "font-weight": "fontWeight",
    format: "format",
    from: "from",
    fx: "fx",
    fy: "fy",
    g1: "g1",
    g2: "g2",
    glyphname: "glyphName",
    "glyph-name": "glyphName",
    glyphorientationhorizontal: "glyphOrientationHorizontal",
    "glyph-orientation-horizontal": "glyphOrientationHorizontal",
    glyphorientationvertical: "glyphOrientationVertical",
    "glyph-orientation-vertical": "glyphOrientationVertical",
    glyphref: "glyphRef",
    gradienttransform: "gradientTransform",
    gradientunits: "gradientUnits",
    hanging: "hanging",
    horizadvx: "horizAdvX",
    "horiz-adv-x": "horizAdvX",
    horizoriginx: "horizOriginX",
    "horiz-origin-x": "horizOriginX",
    ideographic: "ideographic",
    imagerendering: "imageRendering",
    "image-rendering": "imageRendering",
    in2: "in2",
    in: "in",
    inlist: "inlist",
    intercept: "intercept",
    k1: "k1",
    k2: "k2",
    k3: "k3",
    k4: "k4",
    k: "k",
    kernelmatrix: "kernelMatrix",
    kernelunitlength: "kernelUnitLength",
    kerning: "kerning",
    keypoints: "keyPoints",
    keysplines: "keySplines",
    keytimes: "keyTimes",
    lengthadjust: "lengthAdjust",
    letterspacing: "letterSpacing",
    "letter-spacing": "letterSpacing",
    lightingcolor: "lightingColor",
    "lighting-color": "lightingColor",
    limitingconeangle: "limitingConeAngle",
    local: "local",
    markerend: "markerEnd",
    "marker-end": "markerEnd",
    markerheight: "markerHeight",
    markermid: "markerMid",
    "marker-mid": "markerMid",
    markerstart: "markerStart",
    "marker-start": "markerStart",
    markerunits: "markerUnits",
    markerwidth: "markerWidth",
    mask: "mask",
    maskcontentunits: "maskContentUnits",
    maskunits: "maskUnits",
    mathematical: "mathematical",
    mode: "mode",
    numoctaves: "numOctaves",
    offset: "offset",
    opacity: "opacity",
    operator: "operator",
    order: "order",
    orient: "orient",
    orientation: "orientation",
    origin: "origin",
    overflow: "overflow",
    overlineposition: "overlinePosition",
    "overline-position": "overlinePosition",
    overlinethickness: "overlineThickness",
    "overline-thickness": "overlineThickness",
    paintorder: "paintOrder",
    "paint-order": "paintOrder",
    panose1: "panose1",
    "panose-1": "panose1",
    pathlength: "pathLength",
    patterncontentunits: "patternContentUnits",
    patterntransform: "patternTransform",
    patternunits: "patternUnits",
    pointerevents: "pointerEvents",
    "pointer-events": "pointerEvents",
    points: "points",
    pointsatx: "pointsAtX",
    pointsaty: "pointsAtY",
    pointsatz: "pointsAtZ",
    prefix: "prefix",
    preservealpha: "preserveAlpha",
    preserveaspectratio: "preserveAspectRatio",
    primitiveunits: "primitiveUnits",
    property: "property",
    r: "r",
    radius: "radius",
    refx: "refX",
    refy: "refY",
    renderingintent: "renderingIntent",
    "rendering-intent": "renderingIntent",
    repeatcount: "repeatCount",
    repeatdur: "repeatDur",
    requiredextensions: "requiredExtensions",
    requiredfeatures: "requiredFeatures",
    resource: "resource",
    restart: "restart",
    result: "result",
    results: "results",
    rotate: "rotate",
    rx: "rx",
    ry: "ry",
    scale: "scale",
    security: "security",
    seed: "seed",
    shaperendering: "shapeRendering",
    "shape-rendering": "shapeRendering",
    slope: "slope",
    spacing: "spacing",
    specularconstant: "specularConstant",
    specularexponent: "specularExponent",
    speed: "speed",
    spreadmethod: "spreadMethod",
    startoffset: "startOffset",
    stddeviation: "stdDeviation",
    stemh: "stemh",
    stemv: "stemv",
    stitchtiles: "stitchTiles",
    stopcolor: "stopColor",
    "stop-color": "stopColor",
    stopopacity: "stopOpacity",
    "stop-opacity": "stopOpacity",
    strikethroughposition: "strikethroughPosition",
    "strikethrough-position": "strikethroughPosition",
    strikethroughthickness: "strikethroughThickness",
    "strikethrough-thickness": "strikethroughThickness",
    string: "string",
    stroke: "stroke",
    strokedasharray: "strokeDasharray",
    "stroke-dasharray": "strokeDasharray",
    strokedashoffset: "strokeDashoffset",
    "stroke-dashoffset": "strokeDashoffset",
    strokelinecap: "strokeLinecap",
    "stroke-linecap": "strokeLinecap",
    strokelinejoin: "strokeLinejoin",
    "stroke-linejoin": "strokeLinejoin",
    strokemiterlimit: "strokeMiterlimit",
    "stroke-miterlimit": "strokeMiterlimit",
    strokewidth: "strokeWidth",
    "stroke-width": "strokeWidth",
    strokeopacity: "strokeOpacity",
    "stroke-opacity": "strokeOpacity",
    suppresscontenteditablewarning: "suppressContentEditableWarning",
    suppresshydrationwarning: "suppressHydrationWarning",
    surfacescale: "surfaceScale",
    systemlanguage: "systemLanguage",
    tablevalues: "tableValues",
    targetx: "targetX",
    targety: "targetY",
    textanchor: "textAnchor",
    "text-anchor": "textAnchor",
    textdecoration: "textDecoration",
    "text-decoration": "textDecoration",
    textlength: "textLength",
    textrendering: "textRendering",
    "text-rendering": "textRendering",
    to: "to",
    transform: "transform",
    typeof: "typeof",
    u1: "u1",
    u2: "u2",
    underlineposition: "underlinePosition",
    "underline-position": "underlinePosition",
    underlinethickness: "underlineThickness",
    "underline-thickness": "underlineThickness",
    unicode: "unicode",
    unicodebidi: "unicodeBidi",
    "unicode-bidi": "unicodeBidi",
    unicoderange: "unicodeRange",
    "unicode-range": "unicodeRange",
    unitsperem: "unitsPerEm",
    "units-per-em": "unitsPerEm",
    unselectable: "unselectable",
    valphabetic: "vAlphabetic",
    "v-alphabetic": "vAlphabetic",
    values: "values",
    vectoreffect: "vectorEffect",
    "vector-effect": "vectorEffect",
    version: "version",
    vertadvy: "vertAdvY",
    "vert-adv-y": "vertAdvY",
    vertoriginx: "vertOriginX",
    "vert-origin-x": "vertOriginX",
    vertoriginy: "vertOriginY",
    "vert-origin-y": "vertOriginY",
    vhanging: "vHanging",
    "v-hanging": "vHanging",
    videographic: "vIdeographic",
    "v-ideographic": "vIdeographic",
    viewbox: "viewBox",
    viewtarget: "viewTarget",
    visibility: "visibility",
    vmathematical: "vMathematical",
    "v-mathematical": "vMathematical",
    vocab: "vocab",
    widths: "widths",
    wordspacing: "wordSpacing",
    "word-spacing": "wordSpacing",
    writingmode: "writingMode",
    "writing-mode": "writingMode",
    x1: "x1",
    x2: "x2",
    x: "x",
    xchannelselector: "xChannelSelector",
    xheight: "xHeight",
    "x-height": "xHeight",
    xlinkactuate: "xlinkActuate",
    "xlink:actuate": "xlinkActuate",
    xlinkarcrole: "xlinkArcrole",
    "xlink:arcrole": "xlinkArcrole",
    xlinkhref: "xlinkHref",
    "xlink:href": "xlinkHref",
    xlinkrole: "xlinkRole",
    "xlink:role": "xlinkRole",
    xlinkshow: "xlinkShow",
    "xlink:show": "xlinkShow",
    xlinktitle: "xlinkTitle",
    "xlink:title": "xlinkTitle",
    xlinktype: "xlinkType",
    "xlink:type": "xlinkType",
    xmlbase: "xmlBase",
    "xml:base": "xmlBase",
    xmllang: "xmlLang",
    "xml:lang": "xmlLang",
    xmlns: "xmlns",
    "xml:space": "xmlSpace",
    xmlnsxlink: "xmlnsXlink",
    "xmlns:xlink": "xmlnsXlink",
    xmlspace: "xmlSpace",
    y1: "y1",
    y2: "y2",
    y: "y",
    ychannelselector: "yChannelSelector",
    z: "z",
    zoomandpan: "zoomAndPan"
  }, r1 = {
    "aria-current": 0,
    // state
    "aria-description": 0,
    "aria-details": 0,
    "aria-disabled": 0,
    // state
    "aria-hidden": 0,
    // state
    "aria-invalid": 0,
    // state
    "aria-keyshortcuts": 0,
    "aria-label": 0,
    "aria-roledescription": 0,
    // Widget Attributes
    "aria-autocomplete": 0,
    "aria-checked": 0,
    "aria-expanded": 0,
    "aria-haspopup": 0,
    "aria-level": 0,
    "aria-modal": 0,
    "aria-multiline": 0,
    "aria-multiselectable": 0,
    "aria-orientation": 0,
    "aria-placeholder": 0,
    "aria-pressed": 0,
    "aria-readonly": 0,
    "aria-required": 0,
    "aria-selected": 0,
    "aria-sort": 0,
    "aria-valuemax": 0,
    "aria-valuemin": 0,
    "aria-valuenow": 0,
    "aria-valuetext": 0,
    // Live Region Attributes
    "aria-atomic": 0,
    "aria-busy": 0,
    "aria-live": 0,
    "aria-relevant": 0,
    // Drag-and-Drop Attributes
    "aria-dropeffect": 0,
    "aria-grabbed": 0,
    // Relationship Attributes
    "aria-activedescendant": 0,
    "aria-colcount": 0,
    "aria-colindex": 0,
    "aria-colspan": 0,
    "aria-controls": 0,
    "aria-describedby": 0,
    "aria-errormessage": 0,
    "aria-flowto": 0,
    "aria-labelledby": 0,
    "aria-owns": 0,
    "aria-posinset": 0,
    "aria-rowcount": 0,
    "aria-rowindex": 0,
    "aria-rowspan": 0,
    "aria-setsize": 0
  }, Qo = {}, F6 = new RegExp("^(aria)-[" + ee + "]*$"), V6 = new RegExp("^(aria)[A-Z][" + ee + "]*$");
  function H6(e, t) {
    {
      if (Ze.call(Qo, t) && Qo[t])
        return !0;
      if (V6.test(t)) {
        var r = "aria-" + t.slice(4).toLowerCase(), i = r1.hasOwnProperty(r) ? r : null;
        if (i == null)
          return d("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), Qo[t] = !0, !0;
        if (t !== i)
          return d("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), Qo[t] = !0, !0;
      }
      if (F6.test(t)) {
        var s = t.toLowerCase(), u = r1.hasOwnProperty(s) ? s : null;
        if (u == null)
          return Qo[t] = !0, !1;
        if (t !== u)
          return d("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, u), Qo[t] = !0, !0;
      }
    }
    return !0;
  }
  function B6(e, t) {
    {
      var r = [];
      for (var i in t) {
        var s = H6(e, i);
        s || r.push(i);
      }
      var u = r.map(function(f) {
        return "`" + f + "`";
      }).join(", ");
      r.length === 1 ? d("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", u, e) : r.length > 1 && d("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", u, e);
    }
  }
  function j6(e, t) {
    oo(e, t) || B6(e, t);
  }
  var a1 = !1;
  function G6(e, t) {
    {
      if (e !== "input" && e !== "textarea" && e !== "select")
        return;
      t != null && t.value === null && !a1 && (a1 = !0, e === "select" && t.multiple ? d("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : d("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var i1 = function() {
  };
  {
    var Qn = {}, o1 = /^on./, Y6 = /^on[^A-Z]/, W6 = new RegExp("^(aria)-[" + ee + "]*$"), K6 = new RegExp("^(aria)[A-Z][" + ee + "]*$");
    i1 = function(e, t, r, i) {
      if (Ze.call(Qn, t) && Qn[t])
        return !0;
      var s = t.toLowerCase();
      if (s === "onfocusin" || s === "onfocusout")
        return d("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Qn[t] = !0, !0;
      if (i != null) {
        var u = i.registrationNameDependencies, f = i.possibleRegistrationNames;
        if (u.hasOwnProperty(t))
          return !0;
        var h = f.hasOwnProperty(s) ? f[s] : null;
        if (h != null)
          return d("Invalid event handler property `%s`. Did you mean `%s`?", t, h), Qn[t] = !0, !0;
        if (o1.test(t))
          return d("Unknown event handler property `%s`. It will be ignored.", t), Qn[t] = !0, !0;
      } else if (o1.test(t))
        return Y6.test(t) && d("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Qn[t] = !0, !0;
      if (W6.test(t) || K6.test(t))
        return !0;
      if (s === "innerhtml")
        return d("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Qn[t] = !0, !0;
      if (s === "aria")
        return d("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Qn[t] = !0, !0;
      if (s === "is" && r !== null && r !== void 0 && typeof r != "string")
        return d("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof r), Qn[t] = !0, !0;
      if (typeof r == "number" && isNaN(r))
        return d("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Qn[t] = !0, !0;
      var m = gr(t), E = m !== null && m.type === $n;
      if (Ac.hasOwnProperty(s)) {
        var T = Ac[s];
        if (T !== t)
          return d("Invalid DOM property `%s`. Did you mean `%s`?", t, T), Qn[t] = !0, !0;
      } else if (!E && t !== s)
        return d("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, s), Qn[t] = !0, !0;
      return typeof r == "boolean" && sr(t, r, m, !1) ? (r ? d('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', r, t, t, r, t) : d('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', r, t, t, r, t, t, t), Qn[t] = !0, !0) : E ? !0 : sr(t, r, m, !1) ? (Qn[t] = !0, !1) : ((r === "false" || r === "true") && m !== null && m.type === Se && (d("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", r, t, r === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, r), Qn[t] = !0), !0);
    };
  }
  var Z6 = function(e, t, r) {
    {
      var i = [];
      for (var s in t) {
        var u = i1(e, s, t[s], r);
        u || i.push(s);
      }
      var f = i.map(function(h) {
        return "`" + h + "`";
      }).join(", ");
      i.length === 1 ? d("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e) : i.length > 1 && d("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e);
    }
  };
  function X6(e, t, r) {
    oo(e, t) || Z6(e, t, r);
  }
  var s1 = 1, Lp = 2, $l = 4, Q6 = s1 | Lp | $l, Dl = null;
  function J6(e) {
    Dl !== null && d("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Dl = e;
  }
  function e3() {
    Dl === null && d("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Dl = null;
  }
  function t3(e) {
    return e === Dl;
  }
  function Mp(e) {
    var t = e.target || e.srcElement || window;
    return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === za ? t.parentNode : t;
  }
  var Ip = null, Jo = null, es = null;
  function l1(e) {
    var t = $i(e);
    if (t) {
      if (typeof Ip != "function")
        throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
      var r = t.stateNode;
      if (r) {
        var i = vd(r);
        Ip(t.stateNode, t.type, i);
      }
    }
  }
  function n3(e) {
    Ip = e;
  }
  function u1(e) {
    Jo ? es ? es.push(e) : es = [e] : Jo = e;
  }
  function r3() {
    return Jo !== null || es !== null;
  }
  function c1() {
    if (Jo) {
      var e = Jo, t = es;
      if (Jo = null, es = null, l1(e), t)
        for (var r = 0; r < t.length; r++)
          l1(t[r]);
    }
  }
  var d1 = function(e, t) {
    return e(t);
  }, f1 = function() {
  }, qp = !1;
  function a3() {
    var e = r3();
    e && (f1(), c1());
  }
  function p1(e, t, r) {
    if (qp)
      return e(t, r);
    qp = !0;
    try {
      return d1(e, t, r);
    } finally {
      qp = !1, a3();
    }
  }
  function i3(e, t, r) {
    d1 = e, f1 = r;
  }
  function o3(e) {
    return e === "button" || e === "input" || e === "select" || e === "textarea";
  }
  function s3(e, t, r) {
    switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        return !!(r.disabled && o3(t));
      default:
        return !1;
    }
  }
  function Ol(e, t) {
    var r = e.stateNode;
    if (r === null)
      return null;
    var i = vd(r);
    if (i === null)
      return null;
    var s = i[t];
    if (s3(t, e.type, i))
      return null;
    if (s && typeof s != "function")
      throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof s + "` type.");
    return s;
  }
  var zp = !1;
  if (Je)
    try {
      var Al = {};
      Object.defineProperty(Al, "passive", {
        get: function() {
          zp = !0;
        }
      }), window.addEventListener("test", Al, Al), window.removeEventListener("test", Al, Al);
    } catch {
      zp = !1;
    }
  function h1(e, t, r, i, s, u, f, h, m) {
    var E = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(r, E);
    } catch (T) {
      this.onError(T);
    }
  }
  var v1 = h1;
  if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
    var Np = document.createElement("react");
    v1 = function(t, r, i, s, u, f, h, m, E) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var T = document.createEvent("Event"), q = !1, I = !0, B = window.event, j = Object.getOwnPropertyDescriptor(window, "event");
      function W() {
        Np.removeEventListener(K, ke, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = B);
      }
      var ge = Array.prototype.slice.call(arguments, 3);
      function ke() {
        q = !0, W(), r.apply(i, ge), I = !1;
      }
      var xe, rt = !1, Ke = !1;
      function U(F) {
        if (xe = F.error, rt = !0, xe === null && F.colno === 0 && F.lineno === 0 && (Ke = !0), F.defaultPrevented && xe != null && typeof xe == "object")
          try {
            xe._suppressLogging = !0;
          } catch {
          }
      }
      var K = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", U), Np.addEventListener(K, ke, !1), T.initEvent(K, !1, !1), Np.dispatchEvent(T), j && Object.defineProperty(window, "event", j), q && I && (rt ? Ke && (xe = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : xe = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(xe)), window.removeEventListener("error", U), !q)
        return W(), h1.apply(this, arguments);
    };
  }
  var l3 = v1, ts = !1, Lc = null, Mc = !1, Pp = null, u3 = {
    onError: function(e) {
      ts = !0, Lc = e;
    }
  };
  function Up(e, t, r, i, s, u, f, h, m) {
    ts = !1, Lc = null, l3.apply(u3, arguments);
  }
  function c3(e, t, r, i, s, u, f, h, m) {
    if (Up.apply(this, arguments), ts) {
      var E = Fp();
      Mc || (Mc = !0, Pp = E);
    }
  }
  function d3() {
    if (Mc) {
      var e = Pp;
      throw Mc = !1, Pp = null, e;
    }
  }
  function f3() {
    return ts;
  }
  function Fp() {
    if (ts) {
      var e = Lc;
      return ts = !1, Lc = null, e;
    } else
      throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
  }
  function ns(e) {
    return e._reactInternals;
  }
  function p3(e) {
    return e._reactInternals !== void 0;
  }
  function h3(e, t) {
    e._reactInternals = t;
  }
  var De = (
    /*                      */
    0
  ), rs = (
    /*                */
    1
  ), on = (
    /*                    */
    2
  ), it = (
    /*                       */
    4
  ), so = (
    /*                */
    16
  ), Ll = (
    /*                 */
    32
  ), Vp = (
    /*                     */
    64
  ), vt = (
    /*                   */
    128
  ), Pa = (
    /*            */
    256
  ), Si = (
    /*                          */
    512
  ), lo = (
    /*                     */
    1024
  ), jr = (
    /*                      */
    2048
  ), Ua = (
    /*                    */
    4096
  ), uo = (
    /*                   */
    8192
  ), Ic = (
    /*             */
    16384
  ), v3 = jr | it | Vp | Si | lo | Ic, m3 = (
    /*               */
    32767
  ), Ml = (
    /*                   */
    32768
  ), Jn = (
    /*                */
    65536
  ), Hp = (
    /* */
    131072
  ), m1 = (
    /*                       */
    1048576
  ), Bp = (
    /*                    */
    2097152
  ), co = (
    /*                 */
    4194304
  ), jp = (
    /*                */
    8388608
  ), Fa = (
    /*               */
    16777216
  ), qc = (
    /*              */
    33554432
  ), Gp = (
    // TODO: Remove Update flag from before mutation phase by re-landing Visibility
    // flag logic (see #20043)
    it | lo | 0
  ), Yp = on | it | so | Ll | Si | Ua | uo, Il = it | Vp | Si | uo, as = jr | so, Va = co | jp | Bp, g3 = o.ReactCurrentOwner;
  function fo(e) {
    var t = e, r = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var i = t;
      do
        t = i, (t.flags & (on | Ua)) !== De && (r = t.return), i = t.return;
      while (i);
    }
    return t.tag === _ ? r : null;
  }
  function g1(e) {
    if (e.tag === H) {
      var t = e.memoizedState;
      if (t === null) {
        var r = e.alternate;
        r !== null && (t = r.memoizedState);
      }
      if (t !== null)
        return t.dehydrated;
    }
    return null;
  }
  function y1(e) {
    return e.tag === _ ? e.stateNode.containerInfo : null;
  }
  function y3(e) {
    return fo(e) === e;
  }
  function b3(e) {
    {
      var t = g3.current;
      if (t !== null && t.tag === C) {
        var r = t, i = r.stateNode;
        i._warnedAboutRefsInRender || d("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", He(r) || "A component"), i._warnedAboutRefsInRender = !0;
      }
    }
    var s = ns(e);
    return s ? fo(s) === s : !1;
  }
  function b1(e) {
    if (fo(e) !== e)
      throw new Error("Unable to find node on an unmounted component.");
  }
  function w1(e) {
    var t = e.alternate;
    if (!t) {
      var r = fo(e);
      if (r === null)
        throw new Error("Unable to find node on an unmounted component.");
      return r !== e ? null : e;
    }
    for (var i = e, s = t; ; ) {
      var u = i.return;
      if (u === null)
        break;
      var f = u.alternate;
      if (f === null) {
        var h = u.return;
        if (h !== null) {
          i = s = h;
          continue;
        }
        break;
      }
      if (u.child === f.child) {
        for (var m = u.child; m; ) {
          if (m === i)
            return b1(u), e;
          if (m === s)
            return b1(u), t;
          m = m.sibling;
        }
        throw new Error("Unable to find node on an unmounted component.");
      }
      if (i.return !== s.return)
        i = u, s = f;
      else {
        for (var E = !1, T = u.child; T; ) {
          if (T === i) {
            E = !0, i = u, s = f;
            break;
          }
          if (T === s) {
            E = !0, s = u, i = f;
            break;
          }
          T = T.sibling;
        }
        if (!E) {
          for (T = f.child; T; ) {
            if (T === i) {
              E = !0, i = f, s = u;
              break;
            }
            if (T === s) {
              E = !0, s = f, i = u;
              break;
            }
            T = T.sibling;
          }
          if (!E)
            throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
        }
      }
      if (i.alternate !== s)
        throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
    }
    if (i.tag !== _)
      throw new Error("Unable to find node on an unmounted component.");
    return i.stateNode.current === i ? e : t;
  }
  function C1(e) {
    var t = w1(e);
    return t !== null ? S1(t) : null;
  }
  function S1(e) {
    if (e.tag === S || e.tag === k)
      return e;
    for (var t = e.child; t !== null; ) {
      var r = S1(t);
      if (r !== null)
        return r;
      t = t.sibling;
    }
    return null;
  }
  function w3(e) {
    var t = w1(e);
    return t !== null ? _1(t) : null;
  }
  function _1(e) {
    if (e.tag === S || e.tag === k)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== R) {
        var r = _1(t);
        if (r !== null)
          return r;
      }
      t = t.sibling;
    }
    return null;
  }
  var x1 = a.unstable_scheduleCallback, C3 = a.unstable_cancelCallback, S3 = a.unstable_shouldYield, _3 = a.unstable_requestPaint, En = a.unstable_now, x3 = a.unstable_getCurrentPriorityLevel, zc = a.unstable_ImmediatePriority, Wp = a.unstable_UserBlockingPriority, po = a.unstable_NormalPriority, E3 = a.unstable_LowPriority, Kp = a.unstable_IdlePriority, R3 = a.unstable_yieldValue, k3 = a.unstable_setDisableYieldValue, is = null, Gn = null, he = null, ha = !1, Gr = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function T3(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return d("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      Dt && (e = Qe({}, e, {
        getLaneLabelMap: M3,
        injectProfilingHooks: L3
      })), is = t.inject(e), Gn = t;
    } catch (r) {
      d("React instrumentation encountered an error: %s.", r);
    }
    return !!t.checkDCE;
  }
  function $3(e, t) {
    if (Gn && typeof Gn.onScheduleFiberRoot == "function")
      try {
        Gn.onScheduleFiberRoot(is, e, t);
      } catch (r) {
        ha || (ha = !0, d("React instrumentation encountered an error: %s", r));
      }
  }
  function D3(e, t) {
    if (Gn && typeof Gn.onCommitFiberRoot == "function")
      try {
        var r = (e.current.flags & vt) === vt;
        if (jt) {
          var i;
          switch (t) {
            case Cr:
              i = zc;
              break;
            case Ba:
              i = Wp;
              break;
            case ja:
              i = po;
              break;
            case Bc:
              i = Kp;
              break;
            default:
              i = po;
              break;
          }
          Gn.onCommitFiberRoot(is, e, i, r);
        }
      } catch (s) {
        ha || (ha = !0, d("React instrumentation encountered an error: %s", s));
      }
  }
  function O3(e) {
    if (Gn && typeof Gn.onPostCommitFiberRoot == "function")
      try {
        Gn.onPostCommitFiberRoot(is, e);
      } catch (t) {
        ha || (ha = !0, d("React instrumentation encountered an error: %s", t));
      }
  }
  function A3(e) {
    if (Gn && typeof Gn.onCommitFiberUnmount == "function")
      try {
        Gn.onCommitFiberUnmount(is, e);
      } catch (t) {
        ha || (ha = !0, d("React instrumentation encountered an error: %s", t));
      }
  }
  function Rn(e) {
    if (typeof R3 == "function" && (k3(e), c(e)), Gn && typeof Gn.setStrictMode == "function")
      try {
        Gn.setStrictMode(is, e);
      } catch (t) {
        ha || (ha = !0, d("React instrumentation encountered an error: %s", t));
      }
  }
  function L3(e) {
    he = e;
  }
  function M3() {
    {
      for (var e = /* @__PURE__ */ new Map(), t = 1, r = 0; r < Xp; r++) {
        var i = e7(t);
        e.set(t, i), t *= 2;
      }
      return e;
    }
  }
  function I3(e) {
    he !== null && typeof he.markCommitStarted == "function" && he.markCommitStarted(e);
  }
  function E1() {
    he !== null && typeof he.markCommitStopped == "function" && he.markCommitStopped();
  }
  function ql(e) {
    he !== null && typeof he.markComponentRenderStarted == "function" && he.markComponentRenderStarted(e);
  }
  function os() {
    he !== null && typeof he.markComponentRenderStopped == "function" && he.markComponentRenderStopped();
  }
  function q3(e) {
    he !== null && typeof he.markComponentPassiveEffectMountStarted == "function" && he.markComponentPassiveEffectMountStarted(e);
  }
  function z3() {
    he !== null && typeof he.markComponentPassiveEffectMountStopped == "function" && he.markComponentPassiveEffectMountStopped();
  }
  function N3(e) {
    he !== null && typeof he.markComponentPassiveEffectUnmountStarted == "function" && he.markComponentPassiveEffectUnmountStarted(e);
  }
  function P3() {
    he !== null && typeof he.markComponentPassiveEffectUnmountStopped == "function" && he.markComponentPassiveEffectUnmountStopped();
  }
  function U3(e) {
    he !== null && typeof he.markComponentLayoutEffectMountStarted == "function" && he.markComponentLayoutEffectMountStarted(e);
  }
  function F3() {
    he !== null && typeof he.markComponentLayoutEffectMountStopped == "function" && he.markComponentLayoutEffectMountStopped();
  }
  function R1(e) {
    he !== null && typeof he.markComponentLayoutEffectUnmountStarted == "function" && he.markComponentLayoutEffectUnmountStarted(e);
  }
  function k1() {
    he !== null && typeof he.markComponentLayoutEffectUnmountStopped == "function" && he.markComponentLayoutEffectUnmountStopped();
  }
  function V3(e, t, r) {
    he !== null && typeof he.markComponentErrored == "function" && he.markComponentErrored(e, t, r);
  }
  function H3(e, t, r) {
    he !== null && typeof he.markComponentSuspended == "function" && he.markComponentSuspended(e, t, r);
  }
  function B3(e) {
    he !== null && typeof he.markLayoutEffectsStarted == "function" && he.markLayoutEffectsStarted(e);
  }
  function j3() {
    he !== null && typeof he.markLayoutEffectsStopped == "function" && he.markLayoutEffectsStopped();
  }
  function G3(e) {
    he !== null && typeof he.markPassiveEffectsStarted == "function" && he.markPassiveEffectsStarted(e);
  }
  function Y3() {
    he !== null && typeof he.markPassiveEffectsStopped == "function" && he.markPassiveEffectsStopped();
  }
  function T1(e) {
    he !== null && typeof he.markRenderStarted == "function" && he.markRenderStarted(e);
  }
  function W3() {
    he !== null && typeof he.markRenderYielded == "function" && he.markRenderYielded();
  }
  function $1() {
    he !== null && typeof he.markRenderStopped == "function" && he.markRenderStopped();
  }
  function K3(e) {
    he !== null && typeof he.markRenderScheduled == "function" && he.markRenderScheduled(e);
  }
  function Z3(e, t) {
    he !== null && typeof he.markForceUpdateScheduled == "function" && he.markForceUpdateScheduled(e, t);
  }
  function Zp(e, t) {
    he !== null && typeof he.markStateUpdateScheduled == "function" && he.markStateUpdateScheduled(e, t);
  }
  var Oe = (
    /*                         */
    0
  ), tt = (
    /*                 */
    1
  ), St = (
    /*                    */
    2
  ), sn = (
    /*               */
    8
  ), va = (
    /*              */
    16
  ), D1 = Math.clz32 ? Math.clz32 : J3, X3 = Math.log, Q3 = Math.LN2;
  function J3(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (X3(t) / Q3 | 0) | 0;
  }
  var Xp = 31, Q = (
    /*                        */
    0
  ), kn = (
    /*                          */
    0
  ), qe = (
    /*                        */
    1
  ), ss = (
    /*    */
    2
  ), Ha = (
    /*             */
    4
  ), ho = (
    /*            */
    8
  ), ma = (
    /*                     */
    16
  ), zl = (
    /*                */
    32
  ), ls = (
    /*                       */
    4194240
  ), Nl = (
    /*                        */
    64
  ), Qp = (
    /*                        */
    128
  ), Jp = (
    /*                        */
    256
  ), eh = (
    /*                        */
    512
  ), th = (
    /*                        */
    1024
  ), nh = (
    /*                        */
    2048
  ), rh = (
    /*                        */
    4096
  ), ah = (
    /*                        */
    8192
  ), ih = (
    /*                        */
    16384
  ), oh = (
    /*                       */
    32768
  ), sh = (
    /*                       */
    65536
  ), lh = (
    /*                       */
    131072
  ), uh = (
    /*                       */
    262144
  ), ch = (
    /*                       */
    524288
  ), dh = (
    /*                       */
    1048576
  ), fh = (
    /*                       */
    2097152
  ), Nc = (
    /*                            */
    130023424
  ), us = (
    /*                             */
    4194304
  ), ph = (
    /*                             */
    8388608
  ), hh = (
    /*                             */
    16777216
  ), vh = (
    /*                             */
    33554432
  ), mh = (
    /*                             */
    67108864
  ), O1 = us, Pl = (
    /*          */
    134217728
  ), A1 = (
    /*                          */
    268435455
  ), Ul = (
    /*               */
    268435456
  ), vo = (
    /*                        */
    536870912
  ), br = (
    /*                   */
    1073741824
  );
  function e7(e) {
    {
      if (e & qe)
        return "Sync";
      if (e & ss)
        return "InputContinuousHydration";
      if (e & Ha)
        return "InputContinuous";
      if (e & ho)
        return "DefaultHydration";
      if (e & ma)
        return "Default";
      if (e & zl)
        return "TransitionHydration";
      if (e & ls)
        return "Transition";
      if (e & Nc)
        return "Retry";
      if (e & Pl)
        return "SelectiveHydration";
      if (e & Ul)
        return "IdleHydration";
      if (e & vo)
        return "Idle";
      if (e & br)
        return "Offscreen";
    }
  }
  var Nt = -1, Pc = Nl, Uc = us;
  function Fl(e) {
    switch (mo(e)) {
      case qe:
        return qe;
      case ss:
        return ss;
      case Ha:
        return Ha;
      case ho:
        return ho;
      case ma:
        return ma;
      case zl:
        return zl;
      case Nl:
      case Qp:
      case Jp:
      case eh:
      case th:
      case nh:
      case rh:
      case ah:
      case ih:
      case oh:
      case sh:
      case lh:
      case uh:
      case ch:
      case dh:
      case fh:
        return e & ls;
      case us:
      case ph:
      case hh:
      case vh:
      case mh:
        return e & Nc;
      case Pl:
        return Pl;
      case Ul:
        return Ul;
      case vo:
        return vo;
      case br:
        return br;
      default:
        return d("Should have found matching lanes. This is a bug in React."), e;
    }
  }
  function Fc(e, t) {
    var r = e.pendingLanes;
    if (r === Q)
      return Q;
    var i = Q, s = e.suspendedLanes, u = e.pingedLanes, f = r & A1;
    if (f !== Q) {
      var h = f & ~s;
      if (h !== Q)
        i = Fl(h);
      else {
        var m = f & u;
        m !== Q && (i = Fl(m));
      }
    } else {
      var E = r & ~s;
      E !== Q ? i = Fl(E) : u !== Q && (i = Fl(u));
    }
    if (i === Q)
      return Q;
    if (t !== Q && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (t & s) === Q) {
      var T = mo(i), q = mo(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        T >= q || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        T === ma && (q & ls) !== Q
      )
        return t;
    }
    (i & Ha) !== Q && (i |= r & ma);
    var I = e.entangledLanes;
    if (I !== Q)
      for (var B = e.entanglements, j = i & I; j > 0; ) {
        var W = go(j), ge = 1 << W;
        i |= B[W], j &= ~ge;
      }
    return i;
  }
  function t7(e, t) {
    for (var r = e.eventTimes, i = Nt; t > 0; ) {
      var s = go(t), u = 1 << s, f = r[s];
      f > i && (i = f), t &= ~u;
    }
    return i;
  }
  function n7(e, t) {
    switch (e) {
      case qe:
      case ss:
      case Ha:
        return t + 250;
      case ho:
      case ma:
      case zl:
      case Nl:
      case Qp:
      case Jp:
      case eh:
      case th:
      case nh:
      case rh:
      case ah:
      case ih:
      case oh:
      case sh:
      case lh:
      case uh:
      case ch:
      case dh:
      case fh:
        return t + 5e3;
      case us:
      case ph:
      case hh:
      case vh:
      case mh:
        return Nt;
      case Pl:
      case Ul:
      case vo:
      case br:
        return Nt;
      default:
        return d("Should have found matching lanes. This is a bug in React."), Nt;
    }
  }
  function r7(e, t) {
    for (var r = e.pendingLanes, i = e.suspendedLanes, s = e.pingedLanes, u = e.expirationTimes, f = r; f > 0; ) {
      var h = go(f), m = 1 << h, E = u[h];
      E === Nt ? ((m & i) === Q || (m & s) !== Q) && (u[h] = n7(m, t)) : E <= t && (e.expiredLanes |= m), f &= ~m;
    }
  }
  function a7(e) {
    return Fl(e.pendingLanes);
  }
  function gh(e) {
    var t = e.pendingLanes & ~br;
    return t !== Q ? t : t & br ? br : Q;
  }
  function i7(e) {
    return (e & qe) !== Q;
  }
  function yh(e) {
    return (e & A1) !== Q;
  }
  function L1(e) {
    return (e & Nc) === e;
  }
  function o7(e) {
    var t = qe | Ha | ma;
    return (e & t) === Q;
  }
  function s7(e) {
    return (e & ls) === e;
  }
  function Vc(e, t) {
    var r = ss | Ha | ho | ma;
    return (t & r) !== Q;
  }
  function l7(e, t) {
    return (t & e.expiredLanes) !== Q;
  }
  function M1(e) {
    return (e & ls) !== Q;
  }
  function I1() {
    var e = Pc;
    return Pc <<= 1, (Pc & ls) === Q && (Pc = Nl), e;
  }
  function u7() {
    var e = Uc;
    return Uc <<= 1, (Uc & Nc) === Q && (Uc = us), e;
  }
  function mo(e) {
    return e & -e;
  }
  function Vl(e) {
    return mo(e);
  }
  function go(e) {
    return 31 - D1(e);
  }
  function bh(e) {
    return go(e);
  }
  function wr(e, t) {
    return (e & t) !== Q;
  }
  function cs(e, t) {
    return (e & t) === t;
  }
  function Ye(e, t) {
    return e | t;
  }
  function Hc(e, t) {
    return e & ~t;
  }
  function q1(e, t) {
    return e & t;
  }
  function Vq(e) {
    return e;
  }
  function c7(e, t) {
    return e !== kn && e < t ? e : t;
  }
  function wh(e) {
    for (var t = [], r = 0; r < Xp; r++)
      t.push(e);
    return t;
  }
  function Hl(e, t, r) {
    e.pendingLanes |= t, t !== vo && (e.suspendedLanes = Q, e.pingedLanes = Q);
    var i = e.eventTimes, s = bh(t);
    i[s] = r;
  }
  function d7(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var r = e.expirationTimes, i = t; i > 0; ) {
      var s = go(i), u = 1 << s;
      r[s] = Nt, i &= ~u;
    }
  }
  function z1(e, t, r) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function f7(e, t) {
    var r = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = Q, e.pingedLanes = Q, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var i = e.entanglements, s = e.eventTimes, u = e.expirationTimes, f = r; f > 0; ) {
      var h = go(f), m = 1 << h;
      i[h] = Q, s[h] = Nt, u[h] = Nt, f &= ~m;
    }
  }
  function Ch(e, t) {
    for (var r = e.entangledLanes |= t, i = e.entanglements, s = r; s; ) {
      var u = go(s), f = 1 << u;
      // Is this one of the newly entangled lanes?
      f & t | // Is this lane transitively entangled with the newly entangled lanes?
      i[u] & t && (i[u] |= t), s &= ~f;
    }
  }
  function p7(e, t) {
    var r = mo(t), i;
    switch (r) {
      case Ha:
        i = ss;
        break;
      case ma:
        i = ho;
        break;
      case Nl:
      case Qp:
      case Jp:
      case eh:
      case th:
      case nh:
      case rh:
      case ah:
      case ih:
      case oh:
      case sh:
      case lh:
      case uh:
      case ch:
      case dh:
      case fh:
      case us:
      case ph:
      case hh:
      case vh:
      case mh:
        i = zl;
        break;
      case vo:
        i = Ul;
        break;
      default:
        i = kn;
        break;
    }
    return (i & (e.suspendedLanes | t)) !== kn ? kn : i;
  }
  function N1(e, t, r) {
    if (Gr)
      for (var i = e.pendingUpdatersLaneMap; r > 0; ) {
        var s = bh(r), u = 1 << s, f = i[s];
        f.add(t), r &= ~u;
      }
  }
  function P1(e, t) {
    if (Gr)
      for (var r = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
        var s = bh(t), u = 1 << s, f = r[s];
        f.size > 0 && (f.forEach(function(h) {
          var m = h.alternate;
          (m === null || !i.has(m)) && i.add(h);
        }), f.clear()), t &= ~u;
      }
  }
  function U1(e, t) {
    return null;
  }
  var Cr = qe, Ba = Ha, ja = ma, Bc = vo, Bl = kn;
  function Yr() {
    return Bl;
  }
  function Tn(e) {
    Bl = e;
  }
  function h7(e, t) {
    var r = Bl;
    try {
      return Bl = e, t();
    } finally {
      Bl = r;
    }
  }
  function v7(e, t) {
    return e !== 0 && e < t ? e : t;
  }
  function m7(e, t) {
    return e === 0 || e > t ? e : t;
  }
  function Sh(e, t) {
    return e !== 0 && e < t;
  }
  function F1(e) {
    var t = mo(e);
    return Sh(Cr, t) ? Sh(Ba, t) ? yh(t) ? ja : Bc : Ba : Cr;
  }
  function jc(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var V1;
  function g7(e) {
    V1 = e;
  }
  function y7(e) {
    V1(e);
  }
  var _h;
  function b7(e) {
    _h = e;
  }
  var H1;
  function w7(e) {
    H1 = e;
  }
  var B1;
  function C7(e) {
    B1 = e;
  }
  var j1;
  function S7(e) {
    j1 = e;
  }
  var xh = !1, Gc = [], _i = null, xi = null, Ei = null, jl = /* @__PURE__ */ new Map(), Gl = /* @__PURE__ */ new Map(), Ri = [], _7 = [
    "mousedown",
    "mouseup",
    "touchcancel",
    "touchend",
    "touchstart",
    "auxclick",
    "dblclick",
    "pointercancel",
    "pointerdown",
    "pointerup",
    "dragend",
    "dragstart",
    "drop",
    "compositionend",
    "compositionstart",
    "keydown",
    "keypress",
    "keyup",
    "input",
    "textInput",
    // Intentionally camelCase
    "copy",
    "cut",
    "paste",
    "click",
    "change",
    "contextmenu",
    "reset",
    "submit"
  ];
  function x7(e) {
    return _7.indexOf(e) > -1;
  }
  function E7(e, t, r, i, s) {
    return {
      blockedOn: e,
      domEventName: t,
      eventSystemFlags: r,
      nativeEvent: s,
      targetContainers: [i]
    };
  }
  function G1(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        _i = null;
        break;
      case "dragenter":
      case "dragleave":
        xi = null;
        break;
      case "mouseover":
      case "mouseout":
        Ei = null;
        break;
      case "pointerover":
      case "pointerout": {
        var r = t.pointerId;
        jl.delete(r);
        break;
      }
      case "gotpointercapture":
      case "lostpointercapture": {
        var i = t.pointerId;
        Gl.delete(i);
        break;
      }
    }
  }
  function Yl(e, t, r, i, s, u) {
    if (e === null || e.nativeEvent !== u) {
      var f = E7(t, r, i, s, u);
      if (t !== null) {
        var h = $i(t);
        h !== null && _h(h);
      }
      return f;
    }
    e.eventSystemFlags |= i;
    var m = e.targetContainers;
    return s !== null && m.indexOf(s) === -1 && m.push(s), e;
  }
  function R7(e, t, r, i, s) {
    switch (t) {
      case "focusin": {
        var u = s;
        return _i = Yl(_i, e, t, r, i, u), !0;
      }
      case "dragenter": {
        var f = s;
        return xi = Yl(xi, e, t, r, i, f), !0;
      }
      case "mouseover": {
        var h = s;
        return Ei = Yl(Ei, e, t, r, i, h), !0;
      }
      case "pointerover": {
        var m = s, E = m.pointerId;
        return jl.set(E, Yl(jl.get(E) || null, e, t, r, i, m)), !0;
      }
      case "gotpointercapture": {
        var T = s, q = T.pointerId;
        return Gl.set(q, Yl(Gl.get(q) || null, e, t, r, i, T)), !0;
      }
    }
    return !1;
  }
  function Y1(e) {
    var t = wo(e.target);
    if (t !== null) {
      var r = fo(t);
      if (r !== null) {
        var i = r.tag;
        if (i === H) {
          var s = g1(r);
          if (s !== null) {
            e.blockedOn = s, j1(e.priority, function() {
              H1(r);
            });
            return;
          }
        } else if (i === _) {
          var u = r.stateNode;
          if (jc(u)) {
            e.blockedOn = y1(r);
            return;
          }
        }
      }
    }
    e.blockedOn = null;
  }
  function k7(e) {
    for (var t = B1(), r = {
      blockedOn: null,
      target: e,
      priority: t
    }, i = 0; i < Ri.length && Sh(t, Ri[i].priority); i++)
      ;
    Ri.splice(i, 0, r), i === 0 && Y1(r);
  }
  function Yc(e) {
    if (e.blockedOn !== null)
      return !1;
    for (var t = e.targetContainers; t.length > 0; ) {
      var r = t[0], i = kh(e.domEventName, e.eventSystemFlags, r, e.nativeEvent);
      if (i === null) {
        var s = e.nativeEvent, u = new s.constructor(s.type, s);
        J6(u), s.target.dispatchEvent(u), e3();
      } else {
        var f = $i(i);
        return f !== null && _h(f), e.blockedOn = i, !1;
      }
      t.shift();
    }
    return !0;
  }
  function W1(e, t, r) {
    Yc(e) && r.delete(t);
  }
  function T7() {
    xh = !1, _i !== null && Yc(_i) && (_i = null), xi !== null && Yc(xi) && (xi = null), Ei !== null && Yc(Ei) && (Ei = null), jl.forEach(W1), Gl.forEach(W1);
  }
  function Wl(e, t) {
    e.blockedOn === t && (e.blockedOn = null, xh || (xh = !0, a.unstable_scheduleCallback(a.unstable_NormalPriority, T7)));
  }
  function Kl(e) {
    if (Gc.length > 0) {
      Wl(Gc[0], e);
      for (var t = 1; t < Gc.length; t++) {
        var r = Gc[t];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    _i !== null && Wl(_i, e), xi !== null && Wl(xi, e), Ei !== null && Wl(Ei, e);
    var i = function(h) {
      return Wl(h, e);
    };
    jl.forEach(i), Gl.forEach(i);
    for (var s = 0; s < Ri.length; s++) {
      var u = Ri[s];
      u.blockedOn === e && (u.blockedOn = null);
    }
    for (; Ri.length > 0; ) {
      var f = Ri[0];
      if (f.blockedOn !== null)
        break;
      Y1(f), f.blockedOn === null && Ri.shift();
    }
  }
  var ds = o.ReactCurrentBatchConfig, Eh = !0;
  function K1(e) {
    Eh = !!e;
  }
  function $7() {
    return Eh;
  }
  function D7(e, t, r) {
    var i = Z1(t), s;
    switch (i) {
      case Cr:
        s = O7;
        break;
      case Ba:
        s = A7;
        break;
      case ja:
      default:
        s = Rh;
        break;
    }
    return s.bind(null, t, r, e);
  }
  function O7(e, t, r, i) {
    var s = Yr(), u = ds.transition;
    ds.transition = null;
    try {
      Tn(Cr), Rh(e, t, r, i);
    } finally {
      Tn(s), ds.transition = u;
    }
  }
  function A7(e, t, r, i) {
    var s = Yr(), u = ds.transition;
    ds.transition = null;
    try {
      Tn(Ba), Rh(e, t, r, i);
    } finally {
      Tn(s), ds.transition = u;
    }
  }
  function Rh(e, t, r, i) {
    Eh && L7(e, t, r, i);
  }
  function L7(e, t, r, i) {
    var s = kh(e, t, r, i);
    if (s === null) {
      Fh(e, t, i, Wc, r), G1(e, i);
      return;
    }
    if (R7(s, e, t, r, i)) {
      i.stopPropagation();
      return;
    }
    if (G1(e, i), t & $l && x7(e)) {
      for (; s !== null; ) {
        var u = $i(s);
        u !== null && y7(u);
        var f = kh(e, t, r, i);
        if (f === null && Fh(e, t, i, Wc, r), f === s)
          break;
        s = f;
      }
      s !== null && i.stopPropagation();
      return;
    }
    Fh(e, t, i, null, r);
  }
  var Wc = null;
  function kh(e, t, r, i) {
    Wc = null;
    var s = Mp(i), u = wo(s);
    if (u !== null) {
      var f = fo(u);
      if (f === null)
        u = null;
      else {
        var h = f.tag;
        if (h === H) {
          var m = g1(f);
          if (m !== null)
            return m;
          u = null;
        } else if (h === _) {
          var E = f.stateNode;
          if (jc(E))
            return y1(f);
          u = null;
        } else
          f !== u && (u = null);
      }
    }
    return Wc = u, null;
  }
  function Z1(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return Cr;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return Ba;
      case "message": {
        var t = x3();
        switch (t) {
          case zc:
            return Cr;
          case Wp:
            return Ba;
          case po:
          case E3:
            return ja;
          case Kp:
            return Bc;
          default:
            return ja;
        }
      }
      default:
        return ja;
    }
  }
  function M7(e, t, r) {
    return e.addEventListener(t, r, !1), r;
  }
  function I7(e, t, r) {
    return e.addEventListener(t, r, !0), r;
  }
  function q7(e, t, r, i) {
    return e.addEventListener(t, r, {
      capture: !0,
      passive: i
    }), r;
  }
  function z7(e, t, r, i) {
    return e.addEventListener(t, r, {
      passive: i
    }), r;
  }
  var Zl = null, Th = null, Xl = null;
  function N7(e) {
    return Zl = e, Th = Q1(), !0;
  }
  function P7() {
    Zl = null, Th = null, Xl = null;
  }
  function X1() {
    if (Xl)
      return Xl;
    var e, t = Th, r = t.length, i, s = Q1(), u = s.length;
    for (e = 0; e < r && t[e] === s[e]; e++)
      ;
    var f = r - e;
    for (i = 1; i <= f && t[r - i] === s[u - i]; i++)
      ;
    var h = i > 1 ? 1 - i : void 0;
    return Xl = s.slice(e, h), Xl;
  }
  function Q1() {
    return "value" in Zl ? Zl.value : Zl.textContent;
  }
  function Kc(e) {
    var t, r = e.keyCode;
    return "charCode" in e ? (t = e.charCode, t === 0 && r === 13 && (t = 13)) : t = r, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
  }
  function Zc() {
    return !0;
  }
  function J1() {
    return !1;
  }
  function Sr(e) {
    function t(r, i, s, u, f) {
      this._reactName = r, this._targetInst = s, this.type = i, this.nativeEvent = u, this.target = f, this.currentTarget = null;
      for (var h in e)
        if (e.hasOwnProperty(h)) {
          var m = e[h];
          m ? this[h] = m(u) : this[h] = u[h];
        }
      var E = u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1;
      return E ? this.isDefaultPrevented = Zc : this.isDefaultPrevented = J1, this.isPropagationStopped = J1, this;
    }
    return Qe(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var r = this.nativeEvent;
        r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = Zc);
      },
      stopPropagation: function() {
        var r = this.nativeEvent;
        r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = Zc);
      },
      /**
       * We release all dispatched `SyntheticEvent`s after each event loop, adding
       * them back into the pool. This allows a way to hold onto a reference that
       * won't be added back into the pool.
       */
      persist: function() {
      },
      /**
       * Checks if this event should be released back into the pool.
       *
       * @return {boolean} True if this should not be released, false otherwise.
       */
      isPersistent: Zc
    }), t;
  }
  var fs = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, $h = Sr(fs), Ql = Qe({}, fs, {
    view: 0,
    detail: 0
  }), U7 = Sr(Ql), Dh, Oh, Jl;
  function F7(e) {
    e !== Jl && (Jl && e.type === "mousemove" ? (Dh = e.screenX - Jl.screenX, Oh = e.screenY - Jl.screenY) : (Dh = 0, Oh = 0), Jl = e);
  }
  var Xc = Qe({}, Ql, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Lh,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (F7(e), Dh);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Oh;
    }
  }), eb = Sr(Xc), V7 = Qe({}, Xc, {
    dataTransfer: 0
  }), H7 = Sr(V7), B7 = Qe({}, Ql, {
    relatedTarget: 0
  }), Ah = Sr(B7), j7 = Qe({}, fs, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), G7 = Sr(j7), Y7 = Qe({}, fs, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), W7 = Sr(Y7), K7 = Qe({}, fs, {
    data: 0
  }), tb = Sr(K7), Z7 = tb, X7 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Q7 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  };
  function J7(e) {
    if (e.key) {
      var t = X7[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    if (e.type === "keypress") {
      var r = Kc(e);
      return r === 13 ? "Enter" : String.fromCharCode(r);
    }
    return e.type === "keydown" || e.type === "keyup" ? Q7[e.keyCode] || "Unidentified" : "";
  }
  var e8 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function t8(e) {
    var t = this, r = t.nativeEvent;
    if (r.getModifierState)
      return r.getModifierState(e);
    var i = e8[e];
    return i ? !!r[i] : !1;
  }
  function Lh(e) {
    return t8;
  }
  var n8 = Qe({}, Ql, {
    key: J7,
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Lh,
    // Legacy Interface
    charCode: function(e) {
      return e.type === "keypress" ? Kc(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Kc(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), r8 = Sr(n8), a8 = Qe({}, Xc, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), nb = Sr(a8), i8 = Qe({}, Ql, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Lh
  }), o8 = Sr(i8), s8 = Qe({}, fs, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), l8 = Sr(s8), u8 = Qe({}, Xc, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : (
        // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
        "wheelDeltaX" in e ? -e.wheelDeltaX : 0
      );
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : (
        // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
        "wheelDeltaY" in e ? -e.wheelDeltaY : (
          // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
          "wheelDelta" in e ? -e.wheelDelta : 0
        )
      );
    },
    deltaZ: 0,
    // Browsers without "deltaMode" is reporting in raw wheel delta where one
    // notch on the scroll is always +/- 120, roughly equivalent to pixels.
    // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
    // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
    deltaMode: 0
  }), c8 = Sr(u8), d8 = [9, 13, 27, 32], rb = 229, Mh = Je && "CompositionEvent" in window, eu = null;
  Je && "documentMode" in document && (eu = document.documentMode);
  var f8 = Je && "TextEvent" in window && !eu, ab = Je && (!Mh || eu && eu > 8 && eu <= 11), ib = 32, ob = String.fromCharCode(ib);
  function p8() {
    Ve("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Ve("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Ve("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Ve("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
  }
  var sb = !1;
  function h8(e) {
    return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
    !(e.ctrlKey && e.altKey);
  }
  function v8(e) {
    switch (e) {
      case "compositionstart":
        return "onCompositionStart";
      case "compositionend":
        return "onCompositionEnd";
      case "compositionupdate":
        return "onCompositionUpdate";
    }
  }
  function m8(e, t) {
    return e === "keydown" && t.keyCode === rb;
  }
  function lb(e, t) {
    switch (e) {
      case "keyup":
        return d8.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== rb;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function ub(e) {
    var t = e.detail;
    return typeof t == "object" && "data" in t ? t.data : null;
  }
  function cb(e) {
    return e.locale === "ko";
  }
  var ps = !1;
  function g8(e, t, r, i, s) {
    var u, f;
    if (Mh ? u = v8(t) : ps ? lb(t, i) && (u = "onCompositionEnd") : m8(t, i) && (u = "onCompositionStart"), !u)
      return null;
    ab && !cb(i) && (!ps && u === "onCompositionStart" ? ps = N7(s) : u === "onCompositionEnd" && ps && (f = X1()));
    var h = nd(r, u);
    if (h.length > 0) {
      var m = new tb(u, t, null, i, s);
      if (e.push({
        event: m,
        listeners: h
      }), f)
        m.data = f;
      else {
        var E = ub(i);
        E !== null && (m.data = E);
      }
    }
  }
  function y8(e, t) {
    switch (e) {
      case "compositionend":
        return ub(t);
      case "keypress":
        var r = t.which;
        return r !== ib ? null : (sb = !0, ob);
      case "textInput":
        var i = t.data;
        return i === ob && sb ? null : i;
      default:
        return null;
    }
  }
  function b8(e, t) {
    if (ps) {
      if (e === "compositionend" || !Mh && lb(e, t)) {
        var r = X1();
        return P7(), ps = !1, r;
      }
      return null;
    }
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!h8(t)) {
          if (t.char && t.char.length > 1)
            return t.char;
          if (t.which)
            return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return ab && !cb(t) ? null : t.data;
      default:
        return null;
    }
  }
  function w8(e, t, r, i, s) {
    var u;
    if (f8 ? u = y8(t, i) : u = b8(t, i), !u)
      return null;
    var f = nd(r, "onBeforeInput");
    if (f.length > 0) {
      var h = new Z7("onBeforeInput", "beforeinput", null, i, s);
      e.push({
        event: h,
        listeners: f
      }), h.data = u;
    }
  }
  function C8(e, t, r, i, s, u, f) {
    g8(e, t, r, i, s), w8(e, t, r, i, s);
  }
  var S8 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function db(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!S8[e.type] : t === "textarea";
  }
  /**
   * Checks if an event is supported in the current execution environment.
   *
   * NOTE: This will not work correctly for non-generic events such as `change`,
   * `reset`, `load`, `error`, and `select`.
   *
   * Borrows from Modernizr.
   *
   * @param {string} eventNameSuffix Event name, e.g. "click".
   * @return {boolean} True if the event is supported.
   * @internal
   * @license Modernizr 3.0.0pre (Custom Build) | MIT
   */
  function _8(e) {
    if (!Je)
      return !1;
    var t = "on" + e, r = t in document;
    if (!r) {
      var i = document.createElement("div");
      i.setAttribute(t, "return;"), r = typeof i[t] == "function";
    }
    return r;
  }
  function x8() {
    Ve("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
  }
  function fb(e, t, r, i) {
    u1(i);
    var s = nd(t, "onChange");
    if (s.length > 0) {
      var u = new $h("onChange", "change", null, r, i);
      e.push({
        event: u,
        listeners: s
      });
    }
  }
  var tu = null, nu = null;
  function E8(e) {
    var t = e.nodeName && e.nodeName.toLowerCase();
    return t === "select" || t === "input" && e.type === "file";
  }
  function R8(e) {
    var t = [];
    fb(t, nu, e, Mp(e)), p1(k8, t);
  }
  function k8(e) {
    Db(e, 0);
  }
  function Qc(e) {
    var t = bs(e);
    if (Wo(t))
      return e;
  }
  function T8(e, t) {
    if (e === "change")
      return t;
  }
  var pb = !1;
  Je && (pb = _8("input") && (!document.documentMode || document.documentMode > 9));
  function $8(e, t) {
    tu = e, nu = t, tu.attachEvent("onpropertychange", vb);
  }
  function hb() {
    tu && (tu.detachEvent("onpropertychange", vb), tu = null, nu = null);
  }
  function vb(e) {
    e.propertyName === "value" && Qc(nu) && R8(e);
  }
  function D8(e, t, r) {
    e === "focusin" ? (hb(), $8(t, r)) : e === "focusout" && hb();
  }
  function O8(e, t) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Qc(nu);
  }
  function A8(e) {
    var t = e.nodeName;
    return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
  }
  function L8(e, t) {
    if (e === "click")
      return Qc(t);
  }
  function M8(e, t) {
    if (e === "input" || e === "change")
      return Qc(t);
  }
  function I8(e) {
    var t = e._wrapperState;
    !t || !t.controlled || e.type !== "number" || Ie(e, "number", e.value);
  }
  function q8(e, t, r, i, s, u, f) {
    var h = r ? bs(r) : window, m, E;
    if (E8(h) ? m = T8 : db(h) ? pb ? m = M8 : (m = O8, E = D8) : A8(h) && (m = L8), m) {
      var T = m(t, r);
      if (T) {
        fb(e, T, i, s);
        return;
      }
    }
    E && E(t, h, r), t === "focusout" && I8(h);
  }
  function z8() {
    Ne("onMouseEnter", ["mouseout", "mouseover"]), Ne("onMouseLeave", ["mouseout", "mouseover"]), Ne("onPointerEnter", ["pointerout", "pointerover"]), Ne("onPointerLeave", ["pointerout", "pointerover"]);
  }
  function N8(e, t, r, i, s, u, f) {
    var h = t === "mouseover" || t === "pointerover", m = t === "mouseout" || t === "pointerout";
    if (h && !t3(i)) {
      var E = i.relatedTarget || i.fromElement;
      if (E && (wo(E) || gu(E)))
        return;
    }
    if (!(!m && !h)) {
      var T;
      if (s.window === s)
        T = s;
      else {
        var q = s.ownerDocument;
        q ? T = q.defaultView || q.parentWindow : T = window;
      }
      var I, B;
      if (m) {
        var j = i.relatedTarget || i.toElement;
        if (I = r, B = j ? wo(j) : null, B !== null) {
          var W = fo(B);
          (B !== W || B.tag !== S && B.tag !== k) && (B = null);
        }
      } else
        I = null, B = r;
      if (I !== B) {
        var ge = eb, ke = "onMouseLeave", xe = "onMouseEnter", rt = "mouse";
        (t === "pointerout" || t === "pointerover") && (ge = nb, ke = "onPointerLeave", xe = "onPointerEnter", rt = "pointer");
        var Ke = I == null ? T : bs(I), U = B == null ? T : bs(B), K = new ge(ke, rt + "leave", I, i, s);
        K.target = Ke, K.relatedTarget = U;
        var F = null, ne = wo(s);
        if (ne === r) {
          var ye = new ge(xe, rt + "enter", B, i, s);
          ye.target = U, ye.relatedTarget = Ke, F = ye;
        }
        l9(e, K, F, I, B);
      }
    }
  }
  function P8(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var _r = typeof Object.is == "function" ? Object.is : P8;
  function ru(e, t) {
    if (_r(e, t))
      return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var r = Object.keys(e), i = Object.keys(t);
    if (r.length !== i.length)
      return !1;
    for (var s = 0; s < r.length; s++) {
      var u = r[s];
      if (!Ze.call(t, u) || !_r(e[u], t[u]))
        return !1;
    }
    return !0;
  }
  function mb(e) {
    for (; e && e.firstChild; )
      e = e.firstChild;
    return e;
  }
  function U8(e) {
    for (; e; ) {
      if (e.nextSibling)
        return e.nextSibling;
      e = e.parentNode;
    }
  }
  function gb(e, t) {
    for (var r = mb(e), i = 0, s = 0; r; ) {
      if (r.nodeType === za) {
        if (s = i + r.textContent.length, i <= t && s >= t)
          return {
            node: r,
            offset: t - i
          };
        i = s;
      }
      r = mb(U8(r));
    }
  }
  function F8(e) {
    var t = e.ownerDocument, r = t && t.defaultView || window, i = r.getSelection && r.getSelection();
    if (!i || i.rangeCount === 0)
      return null;
    var s = i.anchorNode, u = i.anchorOffset, f = i.focusNode, h = i.focusOffset;
    try {
      s.nodeType, f.nodeType;
    } catch {
      return null;
    }
    return V8(e, s, u, f, h);
  }
  function V8(e, t, r, i, s) {
    var u = 0, f = -1, h = -1, m = 0, E = 0, T = e, q = null;
    e:
      for (; ; ) {
        for (var I = null; T === t && (r === 0 || T.nodeType === za) && (f = u + r), T === i && (s === 0 || T.nodeType === za) && (h = u + s), T.nodeType === za && (u += T.nodeValue.length), (I = T.firstChild) !== null; )
          q = T, T = I;
        for (; ; ) {
          if (T === e)
            break e;
          if (q === t && ++m === r && (f = u), q === i && ++E === s && (h = u), (I = T.nextSibling) !== null)
            break;
          T = q, q = T.parentNode;
        }
        T = I;
      }
    return f === -1 || h === -1 ? null : {
      start: f,
      end: h
    };
  }
  function H8(e, t) {
    var r = e.ownerDocument || document, i = r && r.defaultView || window;
    if (i.getSelection) {
      var s = i.getSelection(), u = e.textContent.length, f = Math.min(t.start, u), h = t.end === void 0 ? f : Math.min(t.end, u);
      if (!s.extend && f > h) {
        var m = h;
        h = f, f = m;
      }
      var E = gb(e, f), T = gb(e, h);
      if (E && T) {
        if (s.rangeCount === 1 && s.anchorNode === E.node && s.anchorOffset === E.offset && s.focusNode === T.node && s.focusOffset === T.offset)
          return;
        var q = r.createRange();
        q.setStart(E.node, E.offset), s.removeAllRanges(), f > h ? (s.addRange(q), s.extend(T.node, T.offset)) : (q.setEnd(T.node, T.offset), s.addRange(q));
      }
    }
  }
  function yb(e) {
    return e && e.nodeType === za;
  }
  function bb(e, t) {
    return !e || !t ? !1 : e === t ? !0 : yb(e) ? !1 : yb(t) ? bb(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function B8(e) {
    return e && e.ownerDocument && bb(e.ownerDocument.documentElement, e);
  }
  function j8(e) {
    try {
      return typeof e.contentWindow.location.href == "string";
    } catch {
      return !1;
    }
  }
  function wb() {
    for (var e = window, t = wi(); t instanceof e.HTMLIFrameElement; ) {
      if (j8(t))
        e = t.contentWindow;
      else
        return t;
      t = wi(e.document);
    }
    return t;
  }
  function Ih(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function G8() {
    var e = wb();
    return {
      focusedElem: e,
      selectionRange: Ih(e) ? W8(e) : null
    };
  }
  function Y8(e) {
    var t = wb(), r = e.focusedElem, i = e.selectionRange;
    if (t !== r && B8(r)) {
      i !== null && Ih(r) && K8(r, i);
      for (var s = [], u = r; u = u.parentNode; )
        u.nodeType === cr && s.push({
          element: u,
          left: u.scrollLeft,
          top: u.scrollTop
        });
      typeof r.focus == "function" && r.focus();
      for (var f = 0; f < s.length; f++) {
        var h = s[f];
        h.element.scrollLeft = h.left, h.element.scrollTop = h.top;
      }
    }
  }
  function W8(e) {
    var t;
    return "selectionStart" in e ? t = {
      start: e.selectionStart,
      end: e.selectionEnd
    } : t = F8(e), t || {
      start: 0,
      end: 0
    };
  }
  function K8(e, t) {
    var r = t.start, i = t.end;
    i === void 0 && (i = r), "selectionStart" in e ? (e.selectionStart = r, e.selectionEnd = Math.min(i, e.value.length)) : H8(e, t);
  }
  var Z8 = Je && "documentMode" in document && document.documentMode <= 11;
  function X8() {
    Ve("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
  }
  var hs = null, qh = null, au = null, zh = !1;
  function Q8(e) {
    if ("selectionStart" in e && Ih(e))
      return {
        start: e.selectionStart,
        end: e.selectionEnd
      };
    var t = e.ownerDocument && e.ownerDocument.defaultView || window, r = t.getSelection();
    return {
      anchorNode: r.anchorNode,
      anchorOffset: r.anchorOffset,
      focusNode: r.focusNode,
      focusOffset: r.focusOffset
    };
  }
  function J8(e) {
    return e.window === e ? e.document : e.nodeType === Na ? e : e.ownerDocument;
  }
  function Cb(e, t, r) {
    var i = J8(r);
    if (!(zh || hs == null || hs !== wi(i))) {
      var s = Q8(hs);
      if (!au || !ru(au, s)) {
        au = s;
        var u = nd(qh, "onSelect");
        if (u.length > 0) {
          var f = new $h("onSelect", "select", null, t, r);
          e.push({
            event: f,
            listeners: u
          }), f.target = hs;
        }
      }
    }
  }
  function e9(e, t, r, i, s, u, f) {
    var h = r ? bs(r) : window;
    switch (t) {
      case "focusin":
        (db(h) || h.contentEditable === "true") && (hs = h, qh = r, au = null);
        break;
      case "focusout":
        hs = null, qh = null, au = null;
        break;
      case "mousedown":
        zh = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        zh = !1, Cb(e, i, s);
        break;
      case "selectionchange":
        if (Z8)
          break;
      case "keydown":
      case "keyup":
        Cb(e, i, s);
    }
  }
  function Jc(e, t) {
    var r = {};
    return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit" + e] = "webkit" + t, r["Moz" + e] = "moz" + t, r;
  }
  var vs = {
    animationend: Jc("Animation", "AnimationEnd"),
    animationiteration: Jc("Animation", "AnimationIteration"),
    animationstart: Jc("Animation", "AnimationStart"),
    transitionend: Jc("Transition", "TransitionEnd")
  }, Nh = {}, Sb = {};
  Je && (Sb = document.createElement("div").style, "AnimationEvent" in window || (delete vs.animationend.animation, delete vs.animationiteration.animation, delete vs.animationstart.animation), "TransitionEvent" in window || delete vs.transitionend.transition);
  function ed(e) {
    if (Nh[e])
      return Nh[e];
    if (!vs[e])
      return e;
    var t = vs[e];
    for (var r in t)
      if (t.hasOwnProperty(r) && r in Sb)
        return Nh[e] = t[r];
    return e;
  }
  var _b = ed("animationend"), xb = ed("animationiteration"), Eb = ed("animationstart"), Rb = ed("transitionend"), kb = /* @__PURE__ */ new Map(), Tb = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
  function ki(e, t) {
    kb.set(e, t), Ve(t, [e]);
  }
  function t9() {
    for (var e = 0; e < Tb.length; e++) {
      var t = Tb[e], r = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
      ki(r, "on" + i);
    }
    ki(_b, "onAnimationEnd"), ki(xb, "onAnimationIteration"), ki(Eb, "onAnimationStart"), ki("dblclick", "onDoubleClick"), ki("focusin", "onFocus"), ki("focusout", "onBlur"), ki(Rb, "onTransitionEnd");
  }
  function n9(e, t, r, i, s, u, f) {
    var h = kb.get(t);
    if (h !== void 0) {
      var m = $h, E = t;
      switch (t) {
        case "keypress":
          if (Kc(i) === 0)
            return;
        case "keydown":
        case "keyup":
          m = r8;
          break;
        case "focusin":
          E = "focus", m = Ah;
          break;
        case "focusout":
          E = "blur", m = Ah;
          break;
        case "beforeblur":
        case "afterblur":
          m = Ah;
          break;
        case "click":
          if (i.button === 2)
            return;
        case "auxclick":
        case "dblclick":
        case "mousedown":
        case "mousemove":
        case "mouseup":
        case "mouseout":
        case "mouseover":
        case "contextmenu":
          m = eb;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          m = H7;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          m = o8;
          break;
        case _b:
        case xb:
        case Eb:
          m = G7;
          break;
        case Rb:
          m = l8;
          break;
        case "scroll":
          m = U7;
          break;
        case "wheel":
          m = c8;
          break;
        case "copy":
        case "cut":
        case "paste":
          m = W7;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          m = nb;
          break;
      }
      var T = (u & $l) !== 0;
      {
        var q = !T && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", I = o9(r, h, i.type, T, q);
        if (I.length > 0) {
          var B = new m(h, E, null, i, s);
          e.push({
            event: B,
            listeners: I
          });
        }
      }
    }
  }
  t9(), z8(), x8(), X8(), p8();
  function r9(e, t, r, i, s, u, f) {
    n9(e, t, r, i, s, u);
    var h = (u & Q6) === 0;
    h && (N8(e, t, r, i, s), q8(e, t, r, i, s), e9(e, t, r, i, s), C8(e, t, r, i, s));
  }
  var iu = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Ph = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(iu));
  function $b(e, t, r) {
    var i = e.type || "unknown-event";
    e.currentTarget = r, c3(i, t, void 0, e), e.currentTarget = null;
  }
  function a9(e, t, r) {
    var i;
    if (r)
      for (var s = t.length - 1; s >= 0; s--) {
        var u = t[s], f = u.instance, h = u.currentTarget, m = u.listener;
        if (f !== i && e.isPropagationStopped())
          return;
        $b(e, m, h), i = f;
      }
    else
      for (var E = 0; E < t.length; E++) {
        var T = t[E], q = T.instance, I = T.currentTarget, B = T.listener;
        if (q !== i && e.isPropagationStopped())
          return;
        $b(e, B, I), i = q;
      }
  }
  function Db(e, t) {
    for (var r = (t & $l) !== 0, i = 0; i < e.length; i++) {
      var s = e[i], u = s.event, f = s.listeners;
      a9(u, f, r);
    }
    d3();
  }
  function i9(e, t, r, i, s) {
    var u = Mp(r), f = [];
    r9(f, e, i, r, u, t), Db(f, t);
  }
  function Bt(e, t) {
    Ph.has(e) || d('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var r = !1, i = I_(t), s = u9(e, r);
    i.has(s) || (Ob(t, e, Lp, r), i.add(s));
  }
  function Uh(e, t, r) {
    Ph.has(e) && !t && d('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var i = 0;
    t && (i |= $l), Ob(r, e, i, t);
  }
  var td = "_reactListening" + Math.random().toString(36).slice(2);
  function ou(e) {
    if (!e[td]) {
      e[td] = !0, Fe.forEach(function(r) {
        r !== "selectionchange" && (Ph.has(r) || Uh(r, !1, e), Uh(r, !0, e));
      });
      var t = e.nodeType === Na ? e : e.ownerDocument;
      t !== null && (t[td] || (t[td] = !0, Uh("selectionchange", !1, t)));
    }
  }
  function Ob(e, t, r, i, s) {
    var u = D7(e, t, r), f = void 0;
    zp && (t === "touchstart" || t === "touchmove" || t === "wheel") && (f = !0), e = e, i ? f !== void 0 ? q7(e, t, u, f) : I7(e, t, u) : f !== void 0 ? z7(e, t, u, f) : M7(e, t, u);
  }
  function Ab(e, t) {
    return e === t || e.nodeType === an && e.parentNode === t;
  }
  function Fh(e, t, r, i, s) {
    var u = i;
    if (!(t & s1) && !(t & Lp)) {
      var f = s;
      if (i !== null) {
        var h = i;
        e:
          for (; ; ) {
            if (h === null)
              return;
            var m = h.tag;
            if (m === _ || m === R) {
              var E = h.stateNode.containerInfo;
              if (Ab(E, f))
                break;
              if (m === R)
                for (var T = h.return; T !== null; ) {
                  var q = T.tag;
                  if (q === _ || q === R) {
                    var I = T.stateNode.containerInfo;
                    if (Ab(I, f))
                      return;
                  }
                  T = T.return;
                }
              for (; E !== null; ) {
                var B = wo(E);
                if (B === null)
                  return;
                var j = B.tag;
                if (j === S || j === k) {
                  h = u = B;
                  continue e;
                }
                E = E.parentNode;
              }
            }
            h = h.return;
          }
      }
    }
    p1(function() {
      return i9(e, t, r, u);
    });
  }
  function su(e, t, r) {
    return {
      instance: e,
      listener: t,
      currentTarget: r
    };
  }
  function o9(e, t, r, i, s, u) {
    for (var f = t !== null ? t + "Capture" : null, h = i ? f : t, m = [], E = e, T = null; E !== null; ) {
      var q = E, I = q.stateNode, B = q.tag;
      if (B === S && I !== null && (T = I, h !== null)) {
        var j = Ol(E, h);
        j != null && m.push(su(E, j, T));
      }
      if (s)
        break;
      E = E.return;
    }
    return m;
  }
  function nd(e, t) {
    for (var r = t + "Capture", i = [], s = e; s !== null; ) {
      var u = s, f = u.stateNode, h = u.tag;
      if (h === S && f !== null) {
        var m = f, E = Ol(s, r);
        E != null && i.unshift(su(s, E, m));
        var T = Ol(s, t);
        T != null && i.push(su(s, T, m));
      }
      s = s.return;
    }
    return i;
  }
  function ms(e) {
    if (e === null)
      return null;
    do
      e = e.return;
    while (e && e.tag !== S);
    return e || null;
  }
  function s9(e, t) {
    for (var r = e, i = t, s = 0, u = r; u; u = ms(u))
      s++;
    for (var f = 0, h = i; h; h = ms(h))
      f++;
    for (; s - f > 0; )
      r = ms(r), s--;
    for (; f - s > 0; )
      i = ms(i), f--;
    for (var m = s; m--; ) {
      if (r === i || i !== null && r === i.alternate)
        return r;
      r = ms(r), i = ms(i);
    }
    return null;
  }
  function Lb(e, t, r, i, s) {
    for (var u = t._reactName, f = [], h = r; h !== null && h !== i; ) {
      var m = h, E = m.alternate, T = m.stateNode, q = m.tag;
      if (E !== null && E === i)
        break;
      if (q === S && T !== null) {
        var I = T;
        if (s) {
          var B = Ol(h, u);
          B != null && f.unshift(su(h, B, I));
        } else if (!s) {
          var j = Ol(h, u);
          j != null && f.push(su(h, j, I));
        }
      }
      h = h.return;
    }
    f.length !== 0 && e.push({
      event: t,
      listeners: f
    });
  }
  function l9(e, t, r, i, s) {
    var u = i && s ? s9(i, s) : null;
    i !== null && Lb(e, t, i, u, !1), s !== null && r !== null && Lb(e, r, s, u, !0);
  }
  function u9(e, t) {
    return e + "__" + (t ? "capture" : "bubble");
  }
  var dr = !1, lu = "dangerouslySetInnerHTML", rd = "suppressContentEditableWarning", Ti = "suppressHydrationWarning", Mb = "autoFocus", yo = "children", bo = "style", ad = "__html", Vh, id, uu, Ib, od, qb, zb;
  Vh = {
    // There are working polyfills for <dialog>. Let people use it.
    dialog: !0,
    // Electron ships a custom <webview> tag to display external web content in
    // an isolated frame and process.
    // This tag is not present in non Electron environments such as JSDom which
    // is often used for testing purposes.
    // @see https://electronjs.org/docs/api/webview-tag
    webview: !0
  }, id = function(e, t) {
    j6(e, t), G6(e, t), X6(e, t, {
      registrationNameDependencies: at,
      possibleRegistrationNames: Be
    });
  }, qb = Je && !document.documentMode, uu = function(e, t, r) {
    if (!dr) {
      var i = sd(r), s = sd(t);
      s !== i && (dr = !0, d("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(s), JSON.stringify(i)));
    }
  }, Ib = function(e) {
    if (!dr) {
      dr = !0;
      var t = [];
      e.forEach(function(r) {
        t.push(r);
      }), d("Extra attributes from the server: %s", t);
    }
  }, od = function(e, t) {
    t === !1 ? d("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : d("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
  }, zb = function(e, t) {
    var r = e.namespaceURI === qa ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
    return r.innerHTML = t, r.innerHTML;
  };
  var c9 = /\r\n?/g, d9 = /\u0000|\uFFFD/g;
  function sd(e) {
    zt(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(c9, `
`).replace(d9, "");
  }
  function ld(e, t, r, i) {
    var s = sd(t), u = sd(e);
    if (u !== s && (i && (dr || (dr = !0, d('Text content did not match. Server: "%s" Client: "%s"', u, s))), r && le))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function Nb(e) {
    return e.nodeType === Na ? e : e.ownerDocument;
  }
  function f9() {
  }
  function ud(e) {
    e.onclick = f9;
  }
  function p9(e, t, r, i, s) {
    for (var u in i)
      if (i.hasOwnProperty(u)) {
        var f = i[u];
        if (u === bo)
          f && Object.freeze(f), t1(t, f);
        else if (u === lu) {
          var h = f ? f[ad] : void 0;
          h != null && Zy(t, h);
        } else if (u === yo)
          if (typeof f == "string") {
            var m = e !== "textarea" || f !== "";
            m && Oc(t, f);
          } else
            typeof f == "number" && Oc(t, "" + f);
        else
          u === rd || u === Ti || u === Mb || (at.hasOwnProperty(u) ? f != null && (typeof f != "function" && od(u, f), u === "onScroll" && Bt("scroll", t)) : f != null && Aa(t, u, f, s));
      }
  }
  function h9(e, t, r, i) {
    for (var s = 0; s < t.length; s += 2) {
      var u = t[s], f = t[s + 1];
      u === bo ? t1(e, f) : u === lu ? Zy(e, f) : u === yo ? Oc(e, f) : Aa(e, u, f, i);
    }
  }
  function v9(e, t, r, i) {
    var s, u = Nb(r), f, h = i;
    if (h === qa && (h = kp(e)), h === qa) {
      if (s = oo(e, t), !s && e !== e.toLowerCase() && d("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
        var m = u.createElement("div");
        m.innerHTML = "<script><\/script>";
        var E = m.firstChild;
        f = m.removeChild(E);
      } else if (typeof t.is == "string")
        f = u.createElement(e, {
          is: t.is
        });
      else if (f = u.createElement(e), e === "select") {
        var T = f;
        t.multiple ? T.multiple = !0 : t.size && (T.size = t.size);
      }
    } else
      f = u.createElementNS(h, e);
    return h === qa && !s && Object.prototype.toString.call(f) === "[object HTMLUnknownElement]" && !Ze.call(Vh, e) && (Vh[e] = !0, d("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), f;
  }
  function m9(e, t) {
    return Nb(t).createTextNode(e);
  }
  function g9(e, t, r, i) {
    var s = oo(t, r);
    id(t, r);
    var u;
    switch (t) {
      case "dialog":
        Bt("cancel", e), Bt("close", e), u = r;
        break;
      case "iframe":
      case "object":
      case "embed":
        Bt("load", e), u = r;
        break;
      case "video":
      case "audio":
        for (var f = 0; f < iu.length; f++)
          Bt(iu[f], e);
        u = r;
        break;
      case "source":
        Bt("error", e), u = r;
        break;
      case "img":
      case "image":
      case "link":
        Bt("error", e), Bt("load", e), u = r;
        break;
      case "details":
        Bt("toggle", e), u = r;
        break;
      case "input":
        O(e, r), u = g(e, r), Bt("invalid", e);
        break;
      case "option":
        Lt(e, r), u = r;
        break;
      case "select":
        kl(e, r), u = Rl(e, r), Bt("invalid", e);
        break;
      case "textarea":
        Yy(e, r), u = Ep(e, r), Bt("invalid", e);
        break;
      default:
        u = r;
    }
    switch (Ap(t, u), p9(t, e, i, u, s), t) {
      case "input":
        Ma(e), ie(e, r, !1);
        break;
      case "textarea":
        Ma(e), Ky(e);
        break;
      case "option":
        Ht(e, r);
        break;
      case "select":
        xp(e, r);
        break;
      default:
        typeof u.onClick == "function" && ud(e);
        break;
    }
  }
  function y9(e, t, r, i, s) {
    id(t, i);
    var u = null, f, h;
    switch (t) {
      case "input":
        f = g(e, r), h = g(e, i), u = [];
        break;
      case "select":
        f = Rl(e, r), h = Rl(e, i), u = [];
        break;
      case "textarea":
        f = Ep(e, r), h = Ep(e, i), u = [];
        break;
      default:
        f = r, h = i, typeof f.onClick != "function" && typeof h.onClick == "function" && ud(e);
        break;
    }
    Ap(t, h);
    var m, E, T = null;
    for (m in f)
      if (!(h.hasOwnProperty(m) || !f.hasOwnProperty(m) || f[m] == null))
        if (m === bo) {
          var q = f[m];
          for (E in q)
            q.hasOwnProperty(E) && (T || (T = {}), T[E] = "");
        } else
          m === lu || m === yo || m === rd || m === Ti || m === Mb || (at.hasOwnProperty(m) ? u || (u = []) : (u = u || []).push(m, null));
    for (m in h) {
      var I = h[m], B = f != null ? f[m] : void 0;
      if (!(!h.hasOwnProperty(m) || I === B || I == null && B == null))
        if (m === bo)
          if (I && Object.freeze(I), B) {
            for (E in B)
              B.hasOwnProperty(E) && (!I || !I.hasOwnProperty(E)) && (T || (T = {}), T[E] = "");
            for (E in I)
              I.hasOwnProperty(E) && B[E] !== I[E] && (T || (T = {}), T[E] = I[E]);
          } else
            T || (u || (u = []), u.push(m, T)), T = I;
        else if (m === lu) {
          var j = I ? I[ad] : void 0, W = B ? B[ad] : void 0;
          j != null && W !== j && (u = u || []).push(m, j);
        } else
          m === yo ? (typeof I == "string" || typeof I == "number") && (u = u || []).push(m, "" + I) : m === rd || m === Ti || (at.hasOwnProperty(m) ? (I != null && (typeof I != "function" && od(m, I), m === "onScroll" && Bt("scroll", e)), !u && B !== I && (u = [])) : (u = u || []).push(m, I));
    }
    return T && (z6(T, h[bo]), (u = u || []).push(bo, T)), u;
  }
  function b9(e, t, r, i, s) {
    r === "input" && s.type === "radio" && s.name != null && G(e, s);
    var u = oo(r, i), f = oo(r, s);
    switch (h9(e, t, u, f), r) {
      case "input":
        Y(e, s);
        break;
      case "textarea":
        Wy(e, s);
        break;
      case "select":
        h6(e, s);
        break;
    }
  }
  function w9(e) {
    {
      var t = e.toLowerCase();
      return Ac.hasOwnProperty(t) && Ac[t] || null;
    }
  }
  function C9(e, t, r, i, s, u, f) {
    var h, m;
    switch (h = oo(t, r), id(t, r), t) {
      case "dialog":
        Bt("cancel", e), Bt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        Bt("load", e);
        break;
      case "video":
      case "audio":
        for (var E = 0; E < iu.length; E++)
          Bt(iu[E], e);
        break;
      case "source":
        Bt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        Bt("error", e), Bt("load", e);
        break;
      case "details":
        Bt("toggle", e);
        break;
      case "input":
        O(e, r), Bt("invalid", e);
        break;
      case "option":
        Lt(e, r);
        break;
      case "select":
        kl(e, r), Bt("invalid", e);
        break;
      case "textarea":
        Yy(e, r), Bt("invalid", e);
        break;
    }
    Ap(t, r);
    {
      m = /* @__PURE__ */ new Set();
      for (var T = e.attributes, q = 0; q < T.length; q++) {
        var I = T[q].name.toLowerCase();
        switch (I) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            m.add(T[q].name);
        }
      }
    }
    var B = null;
    for (var j in r)
      if (r.hasOwnProperty(j)) {
        var W = r[j];
        if (j === yo)
          typeof W == "string" ? e.textContent !== W && (r[Ti] !== !0 && ld(e.textContent, W, u, f), B = [yo, W]) : typeof W == "number" && e.textContent !== "" + W && (r[Ti] !== !0 && ld(e.textContent, W, u, f), B = [yo, "" + W]);
        else if (at.hasOwnProperty(j))
          W != null && (typeof W != "function" && od(j, W), j === "onScroll" && Bt("scroll", e));
        else if (f && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof h == "boolean") {
          var ge = void 0, ke = h && $t ? null : gr(j);
          if (r[Ti] !== !0) {
            if (!(j === rd || j === Ti || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            j === "value" || j === "checked" || j === "selected")) {
              if (j === lu) {
                var xe = e.innerHTML, rt = W ? W[ad] : void 0;
                if (rt != null) {
                  var Ke = zb(e, rt);
                  Ke !== xe && uu(j, xe, Ke);
                }
              } else if (j === bo) {
                if (m.delete(j), qb) {
                  var U = I6(W);
                  ge = e.getAttribute("style"), U !== ge && uu(j, ge, U);
                }
              } else if (h && !$t)
                m.delete(j.toLowerCase()), ge = pi(e, j, W), W !== ge && uu(j, ge, W);
              else if (!Jt(j, ke, h) && !Ot(j, W, ke, h)) {
                var K = !1;
                if (ke !== null)
                  m.delete(ke.attributeName), ge = Oa(e, j, W, ke);
                else {
                  var F = i;
                  if (F === qa && (F = kp(t)), F === qa)
                    m.delete(j.toLowerCase());
                  else {
                    var ne = w9(j);
                    ne !== null && ne !== j && (K = !0, m.delete(ne)), m.delete(j);
                  }
                  ge = pi(e, j, W);
                }
                var ye = $t;
                !ye && W !== ge && !K && uu(j, ge, W);
              }
            }
          }
        }
      }
    switch (f && // $FlowFixMe - Should be inferred as not undefined.
    m.size > 0 && r[Ti] !== !0 && Ib(m), t) {
      case "input":
        Ma(e), ie(e, r, !0);
        break;
      case "textarea":
        Ma(e), Ky(e);
        break;
      case "select":
      case "option":
        break;
      default:
        typeof r.onClick == "function" && ud(e);
        break;
    }
    return B;
  }
  function S9(e, t, r) {
    var i = e.nodeValue !== t;
    return i;
  }
  function Hh(e, t) {
    {
      if (dr)
        return;
      dr = !0, d("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
    }
  }
  function Bh(e, t) {
    {
      if (dr)
        return;
      dr = !0, d('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
    }
  }
  function jh(e, t, r) {
    {
      if (dr)
        return;
      dr = !0, d("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
    }
  }
  function Gh(e, t) {
    {
      if (t === "" || dr)
        return;
      dr = !0, d('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
    }
  }
  function _9(e, t, r) {
    switch (t) {
      case "input":
        Le(e, r);
        return;
      case "textarea":
        m6(e, r);
        return;
      case "select":
        v6(e, r);
        return;
    }
  }
  var cu = function() {
  }, du = function() {
  };
  {
    var x9 = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], Pb = [
      "applet",
      "caption",
      "html",
      "table",
      "td",
      "th",
      "marquee",
      "object",
      "template",
      // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
      // TODO: Distinguish by namespace here -- for <title>, including it here
      // errs on the side of fewer warnings
      "foreignObject",
      "desc",
      "title"
    ], E9 = Pb.concat(["button"]), R9 = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], Ub = {
      current: null,
      formTag: null,
      aTagInScope: null,
      buttonTagInScope: null,
      nobrTagInScope: null,
      pTagInButtonScope: null,
      listItemTagAutoclosing: null,
      dlItemTagAutoclosing: null
    };
    du = function(e, t) {
      var r = Qe({}, e || Ub), i = {
        tag: t
      };
      return Pb.indexOf(t) !== -1 && (r.aTagInScope = null, r.buttonTagInScope = null, r.nobrTagInScope = null), E9.indexOf(t) !== -1 && (r.pTagInButtonScope = null), x9.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (r.listItemTagAutoclosing = null, r.dlItemTagAutoclosing = null), r.current = i, t === "form" && (r.formTag = i), t === "a" && (r.aTagInScope = i), t === "button" && (r.buttonTagInScope = i), t === "nobr" && (r.nobrTagInScope = i), t === "p" && (r.pTagInButtonScope = i), t === "li" && (r.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (r.dlItemTagAutoclosing = i), r;
    };
    var k9 = function(e, t) {
      switch (t) {
        case "select":
          return e === "option" || e === "optgroup" || e === "#text";
        case "optgroup":
          return e === "option" || e === "#text";
        case "option":
          return e === "#text";
        case "tr":
          return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
        case "tbody":
        case "thead":
        case "tfoot":
          return e === "tr" || e === "style" || e === "script" || e === "template";
        case "colgroup":
          return e === "col" || e === "template";
        case "table":
          return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
        case "head":
          return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
        case "html":
          return e === "head" || e === "body" || e === "frameset";
        case "frameset":
          return e === "frame";
        case "#document":
          return e === "html";
      }
      switch (e) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
        case "rp":
        case "rt":
          return R9.indexOf(t) === -1;
        case "body":
        case "caption":
        case "col":
        case "colgroup":
        case "frameset":
        case "frame":
        case "head":
        case "html":
        case "tbody":
        case "td":
        case "tfoot":
        case "th":
        case "thead":
        case "tr":
          return t == null;
      }
      return !0;
    }, T9 = function(e, t) {
      switch (e) {
        case "address":
        case "article":
        case "aside":
        case "blockquote":
        case "center":
        case "details":
        case "dialog":
        case "dir":
        case "div":
        case "dl":
        case "fieldset":
        case "figcaption":
        case "figure":
        case "footer":
        case "header":
        case "hgroup":
        case "main":
        case "menu":
        case "nav":
        case "ol":
        case "p":
        case "section":
        case "summary":
        case "ul":
        case "pre":
        case "listing":
        case "table":
        case "hr":
        case "xmp":
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return t.pTagInButtonScope;
        case "form":
          return t.formTag || t.pTagInButtonScope;
        case "li":
          return t.listItemTagAutoclosing;
        case "dd":
        case "dt":
          return t.dlItemTagAutoclosing;
        case "button":
          return t.buttonTagInScope;
        case "a":
          return t.aTagInScope;
        case "nobr":
          return t.nobrTagInScope;
      }
      return null;
    }, Fb = {};
    cu = function(e, t, r) {
      r = r || Ub;
      var i = r.current, s = i && i.tag;
      t != null && (e != null && d("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var u = k9(e, s) ? null : i, f = u ? null : T9(e, r), h = u || f;
      if (h) {
        var m = h.tag, E = !!u + "|" + e + "|" + m;
        if (!Fb[E]) {
          Fb[E] = !0;
          var T = e, q = "";
          if (e === "#text" ? /\S/.test(t) ? T = "Text nodes" : (T = "Whitespace text nodes", q = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : T = "<" + e + ">", u) {
            var I = "";
            m === "table" && e === "tr" && (I += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), d("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", T, m, q, I);
          } else
            d("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", T, m);
        }
      }
    };
  }
  var cd = "suppressHydrationWarning", dd = "$", fd = "/$", fu = "$?", pu = "$!", $9 = "style", Yh = null, Wh = null;
  function D9(e) {
    var t, r, i = e.nodeType;
    switch (i) {
      case Na:
      case $p: {
        t = i === Na ? "#document" : "#fragment";
        var s = e.documentElement;
        r = s ? s.namespaceURI : Tp(null, "");
        break;
      }
      default: {
        var u = i === an ? e.parentNode : e, f = u.namespaceURI || null;
        t = u.tagName, r = Tp(f, t);
        break;
      }
    }
    {
      var h = t.toLowerCase(), m = du(null, h);
      return {
        namespace: r,
        ancestorInfo: m
      };
    }
  }
  function O9(e, t, r) {
    {
      var i = e, s = Tp(i.namespace, t), u = du(i.ancestorInfo, t);
      return {
        namespace: s,
        ancestorInfo: u
      };
    }
  }
  function Hq(e) {
    return e;
  }
  function A9(e) {
    Yh = $7(), Wh = G8();
    var t = null;
    return K1(!1), t;
  }
  function L9(e) {
    Y8(Wh), K1(Yh), Yh = null, Wh = null;
  }
  function M9(e, t, r, i, s) {
    var u;
    {
      var f = i;
      if (cu(e, null, f.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
        var h = "" + t.children, m = du(f.ancestorInfo, e);
        cu(null, h, m);
      }
      u = f.namespace;
    }
    var E = v9(e, t, r, u);
    return mu(s, E), nv(E, t), E;
  }
  function I9(e, t) {
    e.appendChild(t);
  }
  function q9(e, t, r, i, s) {
    switch (g9(e, t, r, i), t) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        return !!r.autoFocus;
      case "img":
        return !0;
      default:
        return !1;
    }
  }
  function z9(e, t, r, i, s, u) {
    {
      var f = u;
      if (typeof i.children != typeof r.children && (typeof i.children == "string" || typeof i.children == "number")) {
        var h = "" + i.children, m = du(f.ancestorInfo, t);
        cu(null, h, m);
      }
    }
    return y9(e, t, r, i);
  }
  function Kh(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  function N9(e, t, r, i) {
    {
      var s = r;
      cu(null, e, s.ancestorInfo);
    }
    var u = m9(e, t);
    return mu(i, u), u;
  }
  function P9() {
    var e = window.event;
    return e === void 0 ? ja : Z1(e.type);
  }
  var Zh = typeof setTimeout == "function" ? setTimeout : void 0, U9 = typeof clearTimeout == "function" ? clearTimeout : void 0, Xh = -1, Vb = typeof Promise == "function" ? Promise : void 0, F9 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Vb < "u" ? function(e) {
    return Vb.resolve(null).then(e).catch(V9);
  } : Zh;
  function V9(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function H9(e, t, r, i) {
    switch (t) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        r.autoFocus && e.focus();
        return;
      case "img": {
        r.src && (e.src = r.src);
        return;
      }
    }
  }
  function B9(e, t, r, i, s, u) {
    b9(e, t, r, i, s), nv(e, s);
  }
  function Hb(e) {
    Oc(e, "");
  }
  function j9(e, t, r) {
    e.nodeValue = r;
  }
  function G9(e, t) {
    e.appendChild(t);
  }
  function Y9(e, t) {
    var r;
    e.nodeType === an ? (r = e.parentNode, r.insertBefore(t, e)) : (r = e, r.appendChild(t));
    var i = e._reactRootContainer;
    i == null && r.onclick === null && ud(r);
  }
  function W9(e, t, r) {
    e.insertBefore(t, r);
  }
  function K9(e, t, r) {
    e.nodeType === an ? e.parentNode.insertBefore(t, r) : e.insertBefore(t, r);
  }
  function Z9(e, t) {
    e.removeChild(t);
  }
  function X9(e, t) {
    e.nodeType === an ? e.parentNode.removeChild(t) : e.removeChild(t);
  }
  function Qh(e, t) {
    var r = t, i = 0;
    do {
      var s = r.nextSibling;
      if (e.removeChild(r), s && s.nodeType === an) {
        var u = s.data;
        if (u === fd)
          if (i === 0) {
            e.removeChild(s), Kl(t);
            return;
          } else
            i--;
        else
          (u === dd || u === fu || u === pu) && i++;
      }
      r = s;
    } while (r);
    Kl(t);
  }
  function Q9(e, t) {
    e.nodeType === an ? Qh(e.parentNode, t) : e.nodeType === cr && Qh(e, t), Kl(e);
  }
  function J9(e) {
    e = e;
    var t = e.style;
    typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
  }
  function e_(e) {
    e.nodeValue = "";
  }
  function t_(e, t) {
    e = e;
    var r = t[$9], i = r != null && r.hasOwnProperty("display") ? r.display : null;
    e.style.display = Dp("display", i);
  }
  function n_(e, t) {
    e.nodeValue = t;
  }
  function r_(e) {
    e.nodeType === cr ? e.textContent = "" : e.nodeType === Na && e.documentElement && e.removeChild(e.documentElement);
  }
  function a_(e, t, r) {
    return e.nodeType !== cr || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
  }
  function i_(e, t) {
    return t === "" || e.nodeType !== za ? null : e;
  }
  function o_(e) {
    return e.nodeType !== an ? null : e;
  }
  function Bb(e) {
    return e.data === fu;
  }
  function Jh(e) {
    return e.data === pu;
  }
  function s_(e) {
    var t = e.nextSibling && e.nextSibling.dataset, r, i, s;
    return t && (r = t.dgst, i = t.msg, s = t.stck), {
      message: i,
      digest: r,
      stack: s
    };
  }
  function l_(e, t) {
    e._reactRetry = t;
  }
  function pd(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === cr || t === za)
        break;
      if (t === an) {
        var r = e.data;
        if (r === dd || r === pu || r === fu)
          break;
        if (r === fd)
          return null;
      }
    }
    return e;
  }
  function hu(e) {
    return pd(e.nextSibling);
  }
  function u_(e) {
    return pd(e.firstChild);
  }
  function c_(e) {
    return pd(e.firstChild);
  }
  function d_(e) {
    return pd(e.nextSibling);
  }
  function f_(e, t, r, i, s, u, f) {
    mu(u, e), nv(e, r);
    var h;
    {
      var m = s;
      h = m.namespace;
    }
    var E = (u.mode & tt) !== Oe;
    return C9(e, t, r, h, i, E, f);
  }
  function p_(e, t, r, i) {
    return mu(r, e), r.mode & tt, S9(e, t);
  }
  function h_(e, t) {
    mu(t, e);
  }
  function v_(e) {
    for (var t = e.nextSibling, r = 0; t; ) {
      if (t.nodeType === an) {
        var i = t.data;
        if (i === fd) {
          if (r === 0)
            return hu(t);
          r--;
        } else
          (i === dd || i === pu || i === fu) && r++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function jb(e) {
    for (var t = e.previousSibling, r = 0; t; ) {
      if (t.nodeType === an) {
        var i = t.data;
        if (i === dd || i === pu || i === fu) {
          if (r === 0)
            return t;
          r--;
        } else
          i === fd && r++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function m_(e) {
    Kl(e);
  }
  function g_(e) {
    Kl(e);
  }
  function y_(e) {
    return e !== "head" && e !== "body";
  }
  function b_(e, t, r, i) {
    var s = !0;
    ld(t.nodeValue, r, i, s);
  }
  function w_(e, t, r, i, s, u) {
    if (t[cd] !== !0) {
      var f = !0;
      ld(i.nodeValue, s, u, f);
    }
  }
  function C_(e, t) {
    t.nodeType === cr ? Hh(e, t) : t.nodeType === an || Bh(e, t);
  }
  function S_(e, t) {
    {
      var r = e.parentNode;
      r !== null && (t.nodeType === cr ? Hh(r, t) : t.nodeType === an || Bh(r, t));
    }
  }
  function __(e, t, r, i, s) {
    (s || t[cd] !== !0) && (i.nodeType === cr ? Hh(r, i) : i.nodeType === an || Bh(r, i));
  }
  function x_(e, t, r) {
    jh(e, t);
  }
  function E_(e, t) {
    Gh(e, t);
  }
  function R_(e, t, r) {
    {
      var i = e.parentNode;
      i !== null && jh(i, t);
    }
  }
  function k_(e, t) {
    {
      var r = e.parentNode;
      r !== null && Gh(r, t);
    }
  }
  function T_(e, t, r, i, s, u) {
    (u || t[cd] !== !0) && jh(r, i);
  }
  function $_(e, t, r, i, s) {
    (s || t[cd] !== !0) && Gh(r, i);
  }
  function D_(e) {
    d("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
  }
  function O_(e) {
    ou(e);
  }
  var gs = Math.random().toString(36).slice(2), ys = "__reactFiber$" + gs, ev = "__reactProps$" + gs, vu = "__reactContainer$" + gs, tv = "__reactEvents$" + gs, A_ = "__reactListeners$" + gs, L_ = "__reactHandles$" + gs;
  function M_(e) {
    delete e[ys], delete e[ev], delete e[tv], delete e[A_], delete e[L_];
  }
  function mu(e, t) {
    t[ys] = e;
  }
  function hd(e, t) {
    t[vu] = e;
  }
  function Gb(e) {
    e[vu] = null;
  }
  function gu(e) {
    return !!e[vu];
  }
  function wo(e) {
    var t = e[ys];
    if (t)
      return t;
    for (var r = e.parentNode; r; ) {
      if (t = r[vu] || r[ys], t) {
        var i = t.alternate;
        if (t.child !== null || i !== null && i.child !== null)
          for (var s = jb(e); s !== null; ) {
            var u = s[ys];
            if (u)
              return u;
            s = jb(s);
          }
        return t;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function $i(e) {
    var t = e[ys] || e[vu];
    return t && (t.tag === S || t.tag === k || t.tag === H || t.tag === _) ? t : null;
  }
  function bs(e) {
    if (e.tag === S || e.tag === k)
      return e.stateNode;
    throw new Error("getNodeFromInstance: Invalid argument.");
  }
  function vd(e) {
    return e[ev] || null;
  }
  function nv(e, t) {
    e[ev] = t;
  }
  function I_(e) {
    var t = e[tv];
    return t === void 0 && (t = e[tv] = /* @__PURE__ */ new Set()), t;
  }
  var Yb = {}, Wb = o.ReactDebugCurrentFrame;
  function md(e) {
    if (e) {
      var t = e._owner, r = gi(e.type, e._source, t ? t.type : null);
      Wb.setExtraStackFrame(r);
    } else
      Wb.setExtraStackFrame(null);
  }
  function Wr(e, t, r, i, s) {
    {
      var u = Function.call.bind(Ze);
      for (var f in e)
        if (u(e, f)) {
          var h = void 0;
          try {
            if (typeof e[f] != "function") {
              var m = Error((i || "React class") + ": " + r + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw m.name = "Invariant Violation", m;
            }
            h = e[f](t, f, i, r, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (E) {
            h = E;
          }
          h && !(h instanceof Error) && (md(s), d("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", r, f, typeof h), md(null)), h instanceof Error && !(h.message in Yb) && (Yb[h.message] = !0, md(s), d("Failed %s type: %s", r, h.message), md(null));
        }
    }
  }
  var rv = [], gd;
  gd = [];
  var Ga = -1;
  function Di(e) {
    return {
      current: e
    };
  }
  function Yn(e, t) {
    if (Ga < 0) {
      d("Unexpected pop.");
      return;
    }
    t !== gd[Ga] && d("Unexpected Fiber popped."), e.current = rv[Ga], rv[Ga] = null, gd[Ga] = null, Ga--;
  }
  function Wn(e, t, r) {
    Ga++, rv[Ga] = e.current, gd[Ga] = r, e.current = t;
  }
  var av;
  av = {};
  var xr = {};
  Object.freeze(xr);
  var Ya = Di(xr), ga = Di(!1), iv = xr;
  function ws(e, t, r) {
    return r && ya(t) ? iv : Ya.current;
  }
  function Kb(e, t, r) {
    {
      var i = e.stateNode;
      i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = r;
    }
  }
  function Cs(e, t) {
    {
      var r = e.type, i = r.contextTypes;
      if (!i)
        return xr;
      var s = e.stateNode;
      if (s && s.__reactInternalMemoizedUnmaskedChildContext === t)
        return s.__reactInternalMemoizedMaskedChildContext;
      var u = {};
      for (var f in i)
        u[f] = t[f];
      {
        var h = He(e) || "Unknown";
        Wr(i, u, "context", h);
      }
      return s && Kb(e, t, u), u;
    }
  }
  function yd() {
    return ga.current;
  }
  function ya(e) {
    {
      var t = e.childContextTypes;
      return t != null;
    }
  }
  function bd(e) {
    Yn(ga, e), Yn(Ya, e);
  }
  function ov(e) {
    Yn(ga, e), Yn(Ya, e);
  }
  function Zb(e, t, r) {
    {
      if (Ya.current !== xr)
        throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
      Wn(Ya, t, e), Wn(ga, r, e);
    }
  }
  function Xb(e, t, r) {
    {
      var i = e.stateNode, s = t.childContextTypes;
      if (typeof i.getChildContext != "function") {
        {
          var u = He(e) || "Unknown";
          av[u] || (av[u] = !0, d("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", u, u));
        }
        return r;
      }
      var f = i.getChildContext();
      for (var h in f)
        if (!(h in s))
          throw new Error((He(e) || "Unknown") + '.getChildContext(): key "' + h + '" is not defined in childContextTypes.');
      {
        var m = He(e) || "Unknown";
        Wr(s, f, "child context", m);
      }
      return Qe({}, r, f);
    }
  }
  function wd(e) {
    {
      var t = e.stateNode, r = t && t.__reactInternalMemoizedMergedChildContext || xr;
      return iv = Ya.current, Wn(Ya, r, e), Wn(ga, ga.current, e), !0;
    }
  }
  function Qb(e, t, r) {
    {
      var i = e.stateNode;
      if (!i)
        throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
      if (r) {
        var s = Xb(e, t, iv);
        i.__reactInternalMemoizedMergedChildContext = s, Yn(ga, e), Yn(Ya, e), Wn(Ya, s, e), Wn(ga, r, e);
      } else
        Yn(ga, e), Wn(ga, r, e);
    }
  }
  function q_(e) {
    {
      if (!y3(e) || e.tag !== C)
        throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
      var t = e;
      do {
        switch (t.tag) {
          case _:
            return t.stateNode.context;
          case C: {
            var r = t.type;
            if (ya(r))
              return t.stateNode.__reactInternalMemoizedMergedChildContext;
            break;
          }
        }
        t = t.return;
      } while (t !== null);
      throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  var Oi = 0, Cd = 1, Wa = null, sv = !1, lv = !1;
  function Jb(e) {
    Wa === null ? Wa = [e] : Wa.push(e);
  }
  function z_(e) {
    sv = !0, Jb(e);
  }
  function e0() {
    sv && Ai();
  }
  function Ai() {
    if (!lv && Wa !== null) {
      lv = !0;
      var e = 0, t = Yr();
      try {
        var r = !0, i = Wa;
        for (Tn(Cr); e < i.length; e++) {
          var s = i[e];
          do
            s = s(r);
          while (s !== null);
        }
        Wa = null, sv = !1;
      } catch (u) {
        throw Wa !== null && (Wa = Wa.slice(e + 1)), x1(zc, Ai), u;
      } finally {
        Tn(t), lv = !1;
      }
    }
    return null;
  }
  var Ss = [], _s = 0, Sd = null, _d = 0, Lr = [], Mr = 0, Co = null, Ka = 1, Za = "";
  function N_(e) {
    return _o(), (e.flags & m1) !== De;
  }
  function P_(e) {
    return _o(), _d;
  }
  function U_() {
    var e = Za, t = Ka, r = t & ~F_(t);
    return r.toString(32) + e;
  }
  function So(e, t) {
    _o(), Ss[_s++] = _d, Ss[_s++] = Sd, Sd = e, _d = t;
  }
  function t0(e, t, r) {
    _o(), Lr[Mr++] = Ka, Lr[Mr++] = Za, Lr[Mr++] = Co, Co = e;
    var i = Ka, s = Za, u = xd(i) - 1, f = i & ~(1 << u), h = r + 1, m = xd(t) + u;
    if (m > 30) {
      var E = u - u % 5, T = (1 << E) - 1, q = (f & T).toString(32), I = f >> E, B = u - E, j = xd(t) + B, W = h << B, ge = W | I, ke = q + s;
      Ka = 1 << j | ge, Za = ke;
    } else {
      var xe = h << u, rt = xe | f, Ke = s;
      Ka = 1 << m | rt, Za = Ke;
    }
  }
  function uv(e) {
    _o();
    var t = e.return;
    if (t !== null) {
      var r = 1, i = 0;
      So(e, r), t0(e, r, i);
    }
  }
  function xd(e) {
    return 32 - D1(e);
  }
  function F_(e) {
    return 1 << xd(e) - 1;
  }
  function cv(e) {
    for (; e === Sd; )
      Sd = Ss[--_s], Ss[_s] = null, _d = Ss[--_s], Ss[_s] = null;
    for (; e === Co; )
      Co = Lr[--Mr], Lr[Mr] = null, Za = Lr[--Mr], Lr[Mr] = null, Ka = Lr[--Mr], Lr[Mr] = null;
  }
  function V_() {
    return _o(), Co !== null ? {
      id: Ka,
      overflow: Za
    } : null;
  }
  function H_(e, t) {
    _o(), Lr[Mr++] = Ka, Lr[Mr++] = Za, Lr[Mr++] = Co, Ka = t.id, Za = t.overflow, Co = e;
  }
  function _o() {
    On() || d("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var Dn = null, Ir = null, Kr = !1, xo = !1, Li = null;
  function B_() {
    Kr && d("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function n0() {
    xo = !0;
  }
  function j_() {
    return xo;
  }
  function G_(e) {
    var t = e.stateNode.containerInfo;
    return Ir = c_(t), Dn = e, Kr = !0, Li = null, xo = !1, !0;
  }
  function Y_(e, t, r) {
    return Ir = d_(t), Dn = e, Kr = !0, Li = null, xo = !1, r !== null && H_(e, r), !0;
  }
  function r0(e, t) {
    switch (e.tag) {
      case _: {
        C_(e.stateNode.containerInfo, t);
        break;
      }
      case S: {
        var r = (e.mode & tt) !== Oe;
        __(
          e.type,
          e.memoizedProps,
          e.stateNode,
          t,
          // TODO: Delete this argument when we remove the legacy root API.
          r
        );
        break;
      }
      case H: {
        var i = e.memoizedState;
        i.dehydrated !== null && S_(i.dehydrated, t);
        break;
      }
    }
  }
  function a0(e, t) {
    r0(e, t);
    var r = ZE();
    r.stateNode = t, r.return = e;
    var i = e.deletions;
    i === null ? (e.deletions = [r], e.flags |= so) : i.push(r);
  }
  function dv(e, t) {
    {
      if (xo)
        return;
      switch (e.tag) {
        case _: {
          var r = e.stateNode.containerInfo;
          switch (t.tag) {
            case S:
              var i = t.type;
              t.pendingProps, x_(r, i);
              break;
            case k:
              var s = t.pendingProps;
              E_(r, s);
              break;
          }
          break;
        }
        case S: {
          var u = e.type, f = e.memoizedProps, h = e.stateNode;
          switch (t.tag) {
            case S: {
              var m = t.type, E = t.pendingProps, T = (e.mode & tt) !== Oe;
              T_(
                u,
                f,
                h,
                m,
                E,
                // TODO: Delete this argument when we remove the legacy root API.
                T
              );
              break;
            }
            case k: {
              var q = t.pendingProps, I = (e.mode & tt) !== Oe;
              $_(
                u,
                f,
                h,
                q,
                // TODO: Delete this argument when we remove the legacy root API.
                I
              );
              break;
            }
          }
          break;
        }
        case H: {
          var B = e.memoizedState, j = B.dehydrated;
          if (j !== null)
            switch (t.tag) {
              case S:
                var W = t.type;
                t.pendingProps, R_(j, W);
                break;
              case k:
                var ge = t.pendingProps;
                k_(j, ge);
                break;
            }
          break;
        }
        default:
          return;
      }
    }
  }
  function i0(e, t) {
    t.flags = t.flags & ~Ua | on, dv(e, t);
  }
  function o0(e, t) {
    switch (e.tag) {
      case S: {
        var r = e.type;
        e.pendingProps;
        var i = a_(t, r);
        return i !== null ? (e.stateNode = i, Dn = e, Ir = u_(i), !0) : !1;
      }
      case k: {
        var s = e.pendingProps, u = i_(t, s);
        return u !== null ? (e.stateNode = u, Dn = e, Ir = null, !0) : !1;
      }
      case H: {
        var f = o_(t);
        if (f !== null) {
          var h = {
            dehydrated: f,
            treeContext: V_(),
            retryLane: br
          };
          e.memoizedState = h;
          var m = XE(f);
          return m.return = e, e.child = m, Dn = e, Ir = null, !0;
        }
        return !1;
      }
      default:
        return !1;
    }
  }
  function fv(e) {
    return (e.mode & tt) !== Oe && (e.flags & vt) === De;
  }
  function pv(e) {
    throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
  }
  function hv(e) {
    if (Kr) {
      var t = Ir;
      if (!t) {
        fv(e) && (dv(Dn, e), pv()), i0(Dn, e), Kr = !1, Dn = e;
        return;
      }
      var r = t;
      if (!o0(e, t)) {
        fv(e) && (dv(Dn, e), pv()), t = hu(r);
        var i = Dn;
        if (!t || !o0(e, t)) {
          i0(Dn, e), Kr = !1, Dn = e;
          return;
        }
        a0(i, r);
      }
    }
  }
  function W_(e, t, r) {
    var i = e.stateNode, s = !xo, u = f_(i, e.type, e.memoizedProps, t, r, e, s);
    return e.updateQueue = u, u !== null;
  }
  function K_(e) {
    var t = e.stateNode, r = e.memoizedProps, i = p_(t, r, e);
    if (i) {
      var s = Dn;
      if (s !== null)
        switch (s.tag) {
          case _: {
            var u = s.stateNode.containerInfo, f = (s.mode & tt) !== Oe;
            b_(
              u,
              t,
              r,
              // TODO: Delete this argument when we remove the legacy root API.
              f
            );
            break;
          }
          case S: {
            var h = s.type, m = s.memoizedProps, E = s.stateNode, T = (s.mode & tt) !== Oe;
            w_(
              h,
              m,
              E,
              t,
              r,
              // TODO: Delete this argument when we remove the legacy root API.
              T
            );
            break;
          }
        }
    }
    return i;
  }
  function Z_(e) {
    var t = e.memoizedState, r = t !== null ? t.dehydrated : null;
    if (!r)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    h_(r, e);
  }
  function X_(e) {
    var t = e.memoizedState, r = t !== null ? t.dehydrated : null;
    if (!r)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    return v_(r);
  }
  function s0(e) {
    for (var t = e.return; t !== null && t.tag !== S && t.tag !== _ && t.tag !== H; )
      t = t.return;
    Dn = t;
  }
  function Ed(e) {
    if (e !== Dn)
      return !1;
    if (!Kr)
      return s0(e), Kr = !0, !1;
    if (e.tag !== _ && (e.tag !== S || y_(e.type) && !Kh(e.type, e.memoizedProps))) {
      var t = Ir;
      if (t)
        if (fv(e))
          l0(e), pv();
        else
          for (; t; )
            a0(e, t), t = hu(t);
    }
    return s0(e), e.tag === H ? Ir = X_(e) : Ir = Dn ? hu(e.stateNode) : null, !0;
  }
  function Q_() {
    return Kr && Ir !== null;
  }
  function l0(e) {
    for (var t = Ir; t; )
      r0(e, t), t = hu(t);
  }
  function xs() {
    Dn = null, Ir = null, Kr = !1, xo = !1;
  }
  function u0() {
    Li !== null && (rC(Li), Li = null);
  }
  function On() {
    return Kr;
  }
  function vv(e) {
    Li === null ? Li = [e] : Li.push(e);
  }
  var J_ = o.ReactCurrentBatchConfig, e4 = null;
  function t4() {
    return J_.transition;
  }
  var Zr = {
    recordUnsafeLifecycleWarnings: function(e, t) {
    },
    flushPendingUnsafeLifecycleWarnings: function() {
    },
    recordLegacyContextWarning: function(e, t) {
    },
    flushLegacyContextWarning: function() {
    },
    discardPendingWarnings: function() {
    }
  };
  {
    var n4 = function(e) {
      for (var t = null, r = e; r !== null; )
        r.mode & sn && (t = r), r = r.return;
      return t;
    }, Eo = function(e) {
      var t = [];
      return e.forEach(function(r) {
        t.push(r);
      }), t.sort().join(", ");
    }, yu = [], bu = [], wu = [], Cu = [], Su = [], _u = [], Ro = /* @__PURE__ */ new Set();
    Zr.recordUnsafeLifecycleWarnings = function(e, t) {
      Ro.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && yu.push(e), e.mode & sn && typeof t.UNSAFE_componentWillMount == "function" && bu.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && wu.push(e), e.mode & sn && typeof t.UNSAFE_componentWillReceiveProps == "function" && Cu.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && Su.push(e), e.mode & sn && typeof t.UNSAFE_componentWillUpdate == "function" && _u.push(e));
    }, Zr.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      yu.length > 0 && (yu.forEach(function(I) {
        e.add(He(I) || "Component"), Ro.add(I.type);
      }), yu = []);
      var t = /* @__PURE__ */ new Set();
      bu.length > 0 && (bu.forEach(function(I) {
        t.add(He(I) || "Component"), Ro.add(I.type);
      }), bu = []);
      var r = /* @__PURE__ */ new Set();
      wu.length > 0 && (wu.forEach(function(I) {
        r.add(He(I) || "Component"), Ro.add(I.type);
      }), wu = []);
      var i = /* @__PURE__ */ new Set();
      Cu.length > 0 && (Cu.forEach(function(I) {
        i.add(He(I) || "Component"), Ro.add(I.type);
      }), Cu = []);
      var s = /* @__PURE__ */ new Set();
      Su.length > 0 && (Su.forEach(function(I) {
        s.add(He(I) || "Component"), Ro.add(I.type);
      }), Su = []);
      var u = /* @__PURE__ */ new Set();
      if (_u.length > 0 && (_u.forEach(function(I) {
        u.add(He(I) || "Component"), Ro.add(I.type);
      }), _u = []), t.size > 0) {
        var f = Eo(t);
        d(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, f);
      }
      if (i.size > 0) {
        var h = Eo(i);
        d(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, h);
      }
      if (u.size > 0) {
        var m = Eo(u);
        d(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, m);
      }
      if (e.size > 0) {
        var E = Eo(e);
        p(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, E);
      }
      if (r.size > 0) {
        var T = Eo(r);
        p(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, T);
      }
      if (s.size > 0) {
        var q = Eo(s);
        p(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, q);
      }
    };
    var Rd = /* @__PURE__ */ new Map(), c0 = /* @__PURE__ */ new Set();
    Zr.recordLegacyContextWarning = function(e, t) {
      var r = n4(e);
      if (r === null) {
        d("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      if (!c0.has(e.type)) {
        var i = Rd.get(r);
        (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], Rd.set(r, i)), i.push(e));
      }
    }, Zr.flushLegacyContextWarning = function() {
      Rd.forEach(function(e, t) {
        if (e.length !== 0) {
          var r = e[0], i = /* @__PURE__ */ new Set();
          e.forEach(function(u) {
            i.add(He(u) || "Component"), c0.add(u.type);
          });
          var s = Eo(i);
          try {
            Gt(r), d(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, s);
          } finally {
            xn();
          }
        }
      });
    }, Zr.discardPendingWarnings = function() {
      yu = [], bu = [], wu = [], Cu = [], Su = [], _u = [], Rd = /* @__PURE__ */ new Map();
    };
  }
  function Xr(e, t) {
    if (e && e.defaultProps) {
      var r = Qe({}, t), i = e.defaultProps;
      for (var s in i)
        r[s] === void 0 && (r[s] = i[s]);
      return r;
    }
    return t;
  }
  var mv = Di(null), gv;
  gv = {};
  var kd = null, Es = null, yv = null, Td = !1;
  function $d() {
    kd = null, Es = null, yv = null, Td = !1;
  }
  function d0() {
    Td = !0;
  }
  function f0() {
    Td = !1;
  }
  function p0(e, t, r) {
    Wn(mv, t._currentValue, e), t._currentValue = r, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== gv && d("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = gv;
  }
  function bv(e, t) {
    var r = mv.current;
    Yn(mv, t), e._currentValue = r;
  }
  function wv(e, t, r) {
    for (var i = e; i !== null; ) {
      var s = i.alternate;
      if (cs(i.childLanes, t) ? s !== null && !cs(s.childLanes, t) && (s.childLanes = Ye(s.childLanes, t)) : (i.childLanes = Ye(i.childLanes, t), s !== null && (s.childLanes = Ye(s.childLanes, t))), i === r)
        break;
      i = i.return;
    }
    i !== r && d("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function r4(e, t, r) {
    a4(e, t, r);
  }
  function a4(e, t, r) {
    var i = e.child;
    for (i !== null && (i.return = e); i !== null; ) {
      var s = void 0, u = i.dependencies;
      if (u !== null) {
        s = i.child;
        for (var f = u.firstContext; f !== null; ) {
          if (f.context === t) {
            if (i.tag === C) {
              var h = Vl(r), m = Xa(Nt, h);
              m.tag = Od;
              var E = i.updateQueue;
              if (E !== null) {
                var T = E.shared, q = T.pending;
                q === null ? m.next = m : (m.next = q.next, q.next = m), T.pending = m;
              }
            }
            i.lanes = Ye(i.lanes, r);
            var I = i.alternate;
            I !== null && (I.lanes = Ye(I.lanes, r)), wv(i.return, r, e), u.lanes = Ye(u.lanes, r);
            break;
          }
          f = f.next;
        }
      } else if (i.tag === L)
        s = i.type === e.type ? null : i.child;
      else if (i.tag === we) {
        var B = i.return;
        if (B === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        B.lanes = Ye(B.lanes, r);
        var j = B.alternate;
        j !== null && (j.lanes = Ye(j.lanes, r)), wv(B, r, e), s = i.sibling;
      } else
        s = i.child;
      if (s !== null)
        s.return = i;
      else
        for (s = i; s !== null; ) {
          if (s === e) {
            s = null;
            break;
          }
          var W = s.sibling;
          if (W !== null) {
            W.return = s.return, s = W;
            break;
          }
          s = s.return;
        }
      i = s;
    }
  }
  function Rs(e, t) {
    kd = e, Es = null, yv = null;
    var r = e.dependencies;
    if (r !== null) {
      var i = r.firstContext;
      i !== null && (wr(r.lanes, t) && zu(), r.firstContext = null);
    }
  }
  function ln(e) {
    Td && d("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    var t = e._currentValue;
    if (yv !== e) {
      var r = {
        context: e,
        memoizedValue: t,
        next: null
      };
      if (Es === null) {
        if (kd === null)
          throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
        Es = r, kd.dependencies = {
          lanes: Q,
          firstContext: r
        };
      } else
        Es = Es.next = r;
    }
    return t;
  }
  var ko = null;
  function Cv(e) {
    ko === null ? ko = [e] : ko.push(e);
  }
  function i4() {
    if (ko !== null) {
      for (var e = 0; e < ko.length; e++) {
        var t = ko[e], r = t.interleaved;
        if (r !== null) {
          t.interleaved = null;
          var i = r.next, s = t.pending;
          if (s !== null) {
            var u = s.next;
            s.next = i, r.next = u;
          }
          t.pending = r;
        }
      }
      ko = null;
    }
  }
  function h0(e, t, r, i) {
    var s = t.interleaved;
    return s === null ? (r.next = r, Cv(t)) : (r.next = s.next, s.next = r), t.interleaved = r, Dd(e, i);
  }
  function o4(e, t, r, i) {
    var s = t.interleaved;
    s === null ? (r.next = r, Cv(t)) : (r.next = s.next, s.next = r), t.interleaved = r;
  }
  function s4(e, t, r, i) {
    var s = t.interleaved;
    return s === null ? (r.next = r, Cv(t)) : (r.next = s.next, s.next = r), t.interleaved = r, Dd(e, i);
  }
  function fr(e, t) {
    return Dd(e, t);
  }
  var l4 = Dd;
  function Dd(e, t) {
    e.lanes = Ye(e.lanes, t);
    var r = e.alternate;
    r !== null && (r.lanes = Ye(r.lanes, t)), r === null && (e.flags & (on | Ua)) !== De && vC(e);
    for (var i = e, s = e.return; s !== null; )
      s.childLanes = Ye(s.childLanes, t), r = s.alternate, r !== null ? r.childLanes = Ye(r.childLanes, t) : (s.flags & (on | Ua)) !== De && vC(e), i = s, s = s.return;
    if (i.tag === _) {
      var u = i.stateNode;
      return u;
    } else
      return null;
  }
  var v0 = 0, m0 = 1, Od = 2, Sv = 3, Ad = !1, _v, Ld;
  _v = !1, Ld = null;
  function xv(e) {
    var t = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        interleaved: null,
        lanes: Q
      },
      effects: null
    };
    e.updateQueue = t;
  }
  function g0(e, t) {
    var r = t.updateQueue, i = e.updateQueue;
    if (r === i) {
      var s = {
        baseState: i.baseState,
        firstBaseUpdate: i.firstBaseUpdate,
        lastBaseUpdate: i.lastBaseUpdate,
        shared: i.shared,
        effects: i.effects
      };
      t.updateQueue = s;
    }
  }
  function Xa(e, t) {
    var r = {
      eventTime: e,
      lane: t,
      tag: v0,
      payload: null,
      callback: null,
      next: null
    };
    return r;
  }
  function Mi(e, t, r) {
    var i = e.updateQueue;
    if (i === null)
      return null;
    var s = i.shared;
    if (Ld === s && !_v && (d("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), _v = !0), lE()) {
      var u = s.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), s.pending = t, l4(e, r);
    } else
      return s4(e, s, t, r);
  }
  function Md(e, t, r) {
    var i = t.updateQueue;
    if (i !== null) {
      var s = i.shared;
      if (M1(r)) {
        var u = s.lanes;
        u = q1(u, e.pendingLanes);
        var f = Ye(u, r);
        s.lanes = f, Ch(e, f);
      }
    }
  }
  function Ev(e, t) {
    var r = e.updateQueue, i = e.alternate;
    if (i !== null) {
      var s = i.updateQueue;
      if (r === s) {
        var u = null, f = null, h = r.firstBaseUpdate;
        if (h !== null) {
          var m = h;
          do {
            var E = {
              eventTime: m.eventTime,
              lane: m.lane,
              tag: m.tag,
              payload: m.payload,
              callback: m.callback,
              next: null
            };
            f === null ? u = f = E : (f.next = E, f = E), m = m.next;
          } while (m !== null);
          f === null ? u = f = t : (f.next = t, f = t);
        } else
          u = f = t;
        r = {
          baseState: s.baseState,
          firstBaseUpdate: u,
          lastBaseUpdate: f,
          shared: s.shared,
          effects: s.effects
        }, e.updateQueue = r;
        return;
      }
    }
    var T = r.lastBaseUpdate;
    T === null ? r.firstBaseUpdate = t : T.next = t, r.lastBaseUpdate = t;
  }
  function u4(e, t, r, i, s, u) {
    switch (r.tag) {
      case m0: {
        var f = r.payload;
        if (typeof f == "function") {
          d0();
          var h = f.call(u, i, s);
          {
            if (e.mode & sn) {
              Rn(!0);
              try {
                f.call(u, i, s);
              } finally {
                Rn(!1);
              }
            }
            f0();
          }
          return h;
        }
        return f;
      }
      case Sv:
        e.flags = e.flags & ~Jn | vt;
      case v0: {
        var m = r.payload, E;
        if (typeof m == "function") {
          d0(), E = m.call(u, i, s);
          {
            if (e.mode & sn) {
              Rn(!0);
              try {
                m.call(u, i, s);
              } finally {
                Rn(!1);
              }
            }
            f0();
          }
        } else
          E = m;
        return E == null ? i : Qe({}, i, E);
      }
      case Od:
        return Ad = !0, i;
    }
    return i;
  }
  function Id(e, t, r, i) {
    var s = e.updateQueue;
    Ad = !1, Ld = s.shared;
    var u = s.firstBaseUpdate, f = s.lastBaseUpdate, h = s.shared.pending;
    if (h !== null) {
      s.shared.pending = null;
      var m = h, E = m.next;
      m.next = null, f === null ? u = E : f.next = E, f = m;
      var T = e.alternate;
      if (T !== null) {
        var q = T.updateQueue, I = q.lastBaseUpdate;
        I !== f && (I === null ? q.firstBaseUpdate = E : I.next = E, q.lastBaseUpdate = m);
      }
    }
    if (u !== null) {
      var B = s.baseState, j = Q, W = null, ge = null, ke = null, xe = u;
      do {
        var rt = xe.lane, Ke = xe.eventTime;
        if (cs(i, rt)) {
          if (ke !== null) {
            var K = {
              eventTime: Ke,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: kn,
              tag: xe.tag,
              payload: xe.payload,
              callback: xe.callback,
              next: null
            };
            ke = ke.next = K;
          }
          B = u4(e, s, xe, B, t, r);
          var F = xe.callback;
          if (F !== null && // If the update was already committed, we should not queue its
          // callback again.
          xe.lane !== kn) {
            e.flags |= Vp;
            var ne = s.effects;
            ne === null ? s.effects = [xe] : ne.push(xe);
          }
        } else {
          var U = {
            eventTime: Ke,
            lane: rt,
            tag: xe.tag,
            payload: xe.payload,
            callback: xe.callback,
            next: null
          };
          ke === null ? (ge = ke = U, W = B) : ke = ke.next = U, j = Ye(j, rt);
        }
        if (xe = xe.next, xe === null) {
          if (h = s.shared.pending, h === null)
            break;
          var ye = h, fe = ye.next;
          ye.next = null, xe = fe, s.lastBaseUpdate = ye, s.shared.pending = null;
        }
      } while (!0);
      ke === null && (W = B), s.baseState = W, s.firstBaseUpdate = ge, s.lastBaseUpdate = ke;
      var Me = s.shared.interleaved;
      if (Me !== null) {
        var Pe = Me;
        do
          j = Ye(j, Pe.lane), Pe = Pe.next;
        while (Pe !== Me);
      } else
        u === null && (s.shared.lanes = Q);
      Ku(j), e.lanes = j, e.memoizedState = B;
    }
    Ld = null;
  }
  function c4(e, t) {
    if (typeof e != "function")
      throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
    e.call(t);
  }
  function y0() {
    Ad = !1;
  }
  function qd() {
    return Ad;
  }
  function b0(e, t, r) {
    var i = t.effects;
    if (t.effects = null, i !== null)
      for (var s = 0; s < i.length; s++) {
        var u = i[s], f = u.callback;
        f !== null && (u.callback = null, c4(f, r));
      }
  }
  var Rv = {}, w0 = new n.Component().refs, kv, Tv, $v, Dv, Ov, C0, zd, Av, Lv, Mv;
  {
    kv = /* @__PURE__ */ new Set(), Tv = /* @__PURE__ */ new Set(), $v = /* @__PURE__ */ new Set(), Dv = /* @__PURE__ */ new Set(), Av = /* @__PURE__ */ new Set(), Ov = /* @__PURE__ */ new Set(), Lv = /* @__PURE__ */ new Set(), Mv = /* @__PURE__ */ new Set();
    var S0 = /* @__PURE__ */ new Set();
    zd = function(e, t) {
      if (!(e === null || typeof e == "function")) {
        var r = t + "_" + e;
        S0.has(r) || (S0.add(r), d("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
      }
    }, C0 = function(e, t) {
      if (t === void 0) {
        var r = pt(e) || "Component";
        Ov.has(r) || (Ov.add(r), d("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", r));
      }
    }, Object.defineProperty(Rv, "_processChildContext", {
      enumerable: !1,
      value: function() {
        throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
      }
    }), Object.freeze(Rv);
  }
  function Iv(e, t, r, i) {
    var s = e.memoizedState, u = r(i, s);
    {
      if (e.mode & sn) {
        Rn(!0);
        try {
          u = r(i, s);
        } finally {
          Rn(!1);
        }
      }
      C0(t, u);
    }
    var f = u == null ? s : Qe({}, s, u);
    if (e.memoizedState = f, e.lanes === Q) {
      var h = e.updateQueue;
      h.baseState = f;
    }
  }
  var qv = {
    isMounted: b3,
    enqueueSetState: function(e, t, r) {
      var i = ns(e), s = nr(), u = Vi(i), f = Xa(s, u);
      f.payload = t, r != null && (zd(r, "setState"), f.callback = r);
      var h = Mi(i, f, u);
      h !== null && (Cn(h, i, u, s), Md(h, i, u)), Zp(i, u);
    },
    enqueueReplaceState: function(e, t, r) {
      var i = ns(e), s = nr(), u = Vi(i), f = Xa(s, u);
      f.tag = m0, f.payload = t, r != null && (zd(r, "replaceState"), f.callback = r);
      var h = Mi(i, f, u);
      h !== null && (Cn(h, i, u, s), Md(h, i, u)), Zp(i, u);
    },
    enqueueForceUpdate: function(e, t) {
      var r = ns(e), i = nr(), s = Vi(r), u = Xa(i, s);
      u.tag = Od, t != null && (zd(t, "forceUpdate"), u.callback = t);
      var f = Mi(r, u, s);
      f !== null && (Cn(f, r, s, i), Md(f, r, s)), Z3(r, s);
    }
  };
  function _0(e, t, r, i, s, u, f) {
    var h = e.stateNode;
    if (typeof h.shouldComponentUpdate == "function") {
      var m = h.shouldComponentUpdate(i, u, f);
      {
        if (e.mode & sn) {
          Rn(!0);
          try {
            m = h.shouldComponentUpdate(i, u, f);
          } finally {
            Rn(!1);
          }
        }
        m === void 0 && d("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", pt(t) || "Component");
      }
      return m;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !ru(r, i) || !ru(s, u) : !0;
  }
  function d4(e, t, r) {
    var i = e.stateNode;
    {
      var s = pt(t) || "Component", u = i.render;
      u || (t.prototype && typeof t.prototype.render == "function" ? d("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", s) : d("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", s)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && d("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", s), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && d("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", s), i.propTypes && d("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", s), i.contextType && d("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", s), i.contextTypes && d("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", s), t.contextType && t.contextTypes && !Lv.has(t) && (Lv.add(t), d("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", s)), typeof i.componentShouldUpdate == "function" && d("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", s), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && d("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", pt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && d("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", s), typeof i.componentDidReceiveProps == "function" && d("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", s), typeof i.componentWillRecieveProps == "function" && d("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", s), typeof i.UNSAFE_componentWillRecieveProps == "function" && d("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", s);
      var f = i.props !== r;
      i.props !== void 0 && f && d("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", s, s), i.defaultProps && d("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", s, s), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !$v.has(t) && ($v.add(t), d("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", pt(t))), typeof i.getDerivedStateFromProps == "function" && d("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", s), typeof i.getDerivedStateFromError == "function" && d("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", s), typeof t.getSnapshotBeforeUpdate == "function" && d("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", s);
      var h = i.state;
      h && (typeof h != "object" || ht(h)) && d("%s.state: must be set to an object or null", s), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && d("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", s);
    }
  }
  function x0(e, t) {
    t.updater = qv, e.stateNode = t, h3(t, e), t._reactInternalInstance = Rv;
  }
  function E0(e, t, r) {
    var i = !1, s = xr, u = xr, f = t.contextType;
    if ("contextType" in t) {
      var h = (
        // Allow null for conditional declaration
        f === null || f !== void 0 && f.$$typeof === ce && f._context === void 0
      );
      if (!h && !Mv.has(t)) {
        Mv.add(t);
        var m = "";
        f === void 0 ? m = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? m = " However, it is set to a " + typeof f + "." : f.$$typeof === te ? m = " Did you accidentally pass the Context.Provider instead?" : f._context !== void 0 ? m = " Did you accidentally pass the Context.Consumer instead?" : m = " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", d("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", pt(t) || "Component", m);
      }
    }
    if (typeof f == "object" && f !== null)
      u = ln(f);
    else {
      s = ws(e, t, !0);
      var E = t.contextTypes;
      i = E != null, u = i ? Cs(e, s) : xr;
    }
    var T = new t(r, u);
    if (e.mode & sn) {
      Rn(!0);
      try {
        T = new t(r, u);
      } finally {
        Rn(!1);
      }
    }
    var q = e.memoizedState = T.state !== null && T.state !== void 0 ? T.state : null;
    x0(e, T);
    {
      if (typeof t.getDerivedStateFromProps == "function" && q === null) {
        var I = pt(t) || "Component";
        Tv.has(I) || (Tv.add(I), d("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", I, T.state === null ? "null" : "undefined", I));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof T.getSnapshotBeforeUpdate == "function") {
        var B = null, j = null, W = null;
        if (typeof T.componentWillMount == "function" && T.componentWillMount.__suppressDeprecationWarning !== !0 ? B = "componentWillMount" : typeof T.UNSAFE_componentWillMount == "function" && (B = "UNSAFE_componentWillMount"), typeof T.componentWillReceiveProps == "function" && T.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? j = "componentWillReceiveProps" : typeof T.UNSAFE_componentWillReceiveProps == "function" && (j = "UNSAFE_componentWillReceiveProps"), typeof T.componentWillUpdate == "function" && T.componentWillUpdate.__suppressDeprecationWarning !== !0 ? W = "componentWillUpdate" : typeof T.UNSAFE_componentWillUpdate == "function" && (W = "UNSAFE_componentWillUpdate"), B !== null || j !== null || W !== null) {
          var ge = pt(t) || "Component", ke = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          Dv.has(ge) || (Dv.add(ge), d(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, ge, ke, B !== null ? `
  ` + B : "", j !== null ? `
  ` + j : "", W !== null ? `
  ` + W : ""));
        }
      }
    }
    return i && Kb(e, s, u), T;
  }
  function f4(e, t) {
    var r = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), r !== t.state && (d("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", He(e) || "Component"), qv.enqueueReplaceState(t, t.state, null));
  }
  function R0(e, t, r, i) {
    var s = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(r, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(r, i), t.state !== s) {
      {
        var u = He(e) || "Component";
        kv.has(u) || (kv.add(u), d("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", u));
      }
      qv.enqueueReplaceState(t, t.state, null);
    }
  }
  function zv(e, t, r, i) {
    d4(e, t, r);
    var s = e.stateNode;
    s.props = r, s.state = e.memoizedState, s.refs = w0, xv(e);
    var u = t.contextType;
    if (typeof u == "object" && u !== null)
      s.context = ln(u);
    else {
      var f = ws(e, t, !0);
      s.context = Cs(e, f);
    }
    {
      if (s.state === r) {
        var h = pt(t) || "Component";
        Av.has(h) || (Av.add(h), d("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", h));
      }
      e.mode & sn && Zr.recordLegacyContextWarning(e, s), Zr.recordUnsafeLifecycleWarnings(e, s);
    }
    s.state = e.memoizedState;
    var m = t.getDerivedStateFromProps;
    if (typeof m == "function" && (Iv(e, t, m, r), s.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof s.getSnapshotBeforeUpdate != "function" && (typeof s.UNSAFE_componentWillMount == "function" || typeof s.componentWillMount == "function") && (f4(e, s), Id(e, r, s, i), s.state = e.memoizedState), typeof s.componentDidMount == "function") {
      var E = it;
      E |= co, (e.mode & va) !== Oe && (E |= Fa), e.flags |= E;
    }
  }
  function p4(e, t, r, i) {
    var s = e.stateNode, u = e.memoizedProps;
    s.props = u;
    var f = s.context, h = t.contextType, m = xr;
    if (typeof h == "object" && h !== null)
      m = ln(h);
    else {
      var E = ws(e, t, !0);
      m = Cs(e, E);
    }
    var T = t.getDerivedStateFromProps, q = typeof T == "function" || typeof s.getSnapshotBeforeUpdate == "function";
    !q && (typeof s.UNSAFE_componentWillReceiveProps == "function" || typeof s.componentWillReceiveProps == "function") && (u !== r || f !== m) && R0(e, s, r, m), y0();
    var I = e.memoizedState, B = s.state = I;
    if (Id(e, r, s, i), B = e.memoizedState, u === r && I === B && !yd() && !qd()) {
      if (typeof s.componentDidMount == "function") {
        var j = it;
        j |= co, (e.mode & va) !== Oe && (j |= Fa), e.flags |= j;
      }
      return !1;
    }
    typeof T == "function" && (Iv(e, t, T, r), B = e.memoizedState);
    var W = qd() || _0(e, t, u, r, I, B, m);
    if (W) {
      if (!q && (typeof s.UNSAFE_componentWillMount == "function" || typeof s.componentWillMount == "function") && (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function") {
        var ge = it;
        ge |= co, (e.mode & va) !== Oe && (ge |= Fa), e.flags |= ge;
      }
    } else {
      if (typeof s.componentDidMount == "function") {
        var ke = it;
        ke |= co, (e.mode & va) !== Oe && (ke |= Fa), e.flags |= ke;
      }
      e.memoizedProps = r, e.memoizedState = B;
    }
    return s.props = r, s.state = B, s.context = m, W;
  }
  function h4(e, t, r, i, s) {
    var u = t.stateNode;
    g0(e, t);
    var f = t.memoizedProps, h = t.type === t.elementType ? f : Xr(t.type, f);
    u.props = h;
    var m = t.pendingProps, E = u.context, T = r.contextType, q = xr;
    if (typeof T == "object" && T !== null)
      q = ln(T);
    else {
      var I = ws(t, r, !0);
      q = Cs(t, I);
    }
    var B = r.getDerivedStateFromProps, j = typeof B == "function" || typeof u.getSnapshotBeforeUpdate == "function";
    !j && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (f !== m || E !== q) && R0(t, u, i, q), y0();
    var W = t.memoizedState, ge = u.state = W;
    if (Id(t, i, u, s), ge = t.memoizedState, f === m && W === ge && !yd() && !qd() && !Tt)
      return typeof u.componentDidUpdate == "function" && (f !== e.memoizedProps || W !== e.memoizedState) && (t.flags |= it), typeof u.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || W !== e.memoizedState) && (t.flags |= lo), !1;
    typeof B == "function" && (Iv(t, r, B, i), ge = t.memoizedState);
    var ke = qd() || _0(t, r, h, i, W, ge, q) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    Tt;
    return ke ? (!j && (typeof u.UNSAFE_componentWillUpdate == "function" || typeof u.componentWillUpdate == "function") && (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(i, ge, q), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(i, ge, q)), typeof u.componentDidUpdate == "function" && (t.flags |= it), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= lo)) : (typeof u.componentDidUpdate == "function" && (f !== e.memoizedProps || W !== e.memoizedState) && (t.flags |= it), typeof u.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || W !== e.memoizedState) && (t.flags |= lo), t.memoizedProps = i, t.memoizedState = ge), u.props = i, u.state = ge, u.context = q, ke;
  }
  var Nv, Pv, Uv, Fv, Vv, k0 = function(e, t) {
  };
  Nv = !1, Pv = !1, Uv = {}, Fv = {}, Vv = {}, k0 = function(e, t) {
    if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
      if (typeof e._store != "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      e._store.validated = !0;
      var r = He(t) || "Component";
      Fv[r] || (Fv[r] = !0, d('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
    }
  };
  function xu(e, t, r) {
    var i = r.ref;
    if (i !== null && typeof i != "function" && typeof i != "object") {
      if ((e.mode & sn || Rt) && // We warn in ReactElement.js if owner and self are equal for string refs
      // because these cannot be automatically converted to an arrow function
      // using a codemod. Therefore, we don't have to warn about string refs again.
      !(r._owner && r._self && r._owner.stateNode !== r._self)) {
        var s = He(e) || "Component";
        Uv[s] || (d('A string ref, "%s", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', i), Uv[s] = !0);
      }
      if (r._owner) {
        var u = r._owner, f;
        if (u) {
          var h = u;
          if (h.tag !== C)
            throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
          f = h.stateNode;
        }
        if (!f)
          throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
        var m = f;
        Kt(i, "ref");
        var E = "" + i;
        if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === E)
          return t.ref;
        var T = function(q) {
          var I = m.refs;
          I === w0 && (I = m.refs = {}), q === null ? delete I[E] : I[E] = q;
        };
        return T._stringRef = E, T;
      } else {
        if (typeof i != "string")
          throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
        if (!r._owner)
          throw new Error("Element ref was specified as a string (" + i + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
      }
    }
    return i;
  }
  function Nd(e, t) {
    var r = Object.prototype.toString.call(t);
    throw new Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
  }
  function Pd(e) {
    {
      var t = He(e) || "Component";
      if (Vv[t])
        return;
      Vv[t] = !0, d("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
    }
  }
  function T0(e) {
    var t = e._payload, r = e._init;
    return r(t);
  }
  function $0(e) {
    function t(U, K) {
      if (e) {
        var F = U.deletions;
        F === null ? (U.deletions = [K], U.flags |= so) : F.push(K);
      }
    }
    function r(U, K) {
      if (!e)
        return null;
      for (var F = K; F !== null; )
        t(U, F), F = F.sibling;
      return null;
    }
    function i(U, K) {
      for (var F = /* @__PURE__ */ new Map(), ne = K; ne !== null; )
        ne.key !== null ? F.set(ne.key, ne) : F.set(ne.index, ne), ne = ne.sibling;
      return F;
    }
    function s(U, K) {
      var F = Io(U, K);
      return F.index = 0, F.sibling = null, F;
    }
    function u(U, K, F) {
      if (U.index = F, !e)
        return U.flags |= m1, K;
      var ne = U.alternate;
      if (ne !== null) {
        var ye = ne.index;
        return ye < K ? (U.flags |= on, K) : ye;
      } else
        return U.flags |= on, K;
    }
    function f(U) {
      return e && U.alternate === null && (U.flags |= on), U;
    }
    function h(U, K, F, ne) {
      if (K === null || K.tag !== k) {
        var ye = vg(F, U.mode, ne);
        return ye.return = U, ye;
      } else {
        var fe = s(K, F);
        return fe.return = U, fe;
      }
    }
    function m(U, K, F, ne) {
      var ye = F.type;
      if (ye === da)
        return T(U, K, F.props.children, ne, F.key);
      if (K !== null && (K.elementType === ye || // Keep this check inline so it only runs on the false path:
      bC(K, F) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof ye == "object" && ye !== null && ye.$$typeof === Te && T0(ye) === K.type)) {
        var fe = s(K, F.props);
        return fe.ref = xu(U, K, F), fe.return = U, fe._debugSource = F._source, fe._debugOwner = F._owner, fe;
      }
      var Me = hg(F, U.mode, ne);
      return Me.ref = xu(U, K, F), Me.return = U, Me;
    }
    function E(U, K, F, ne) {
      if (K === null || K.tag !== R || K.stateNode.containerInfo !== F.containerInfo || K.stateNode.implementation !== F.implementation) {
        var ye = mg(F, U.mode, ne);
        return ye.return = U, ye;
      } else {
        var fe = s(K, F.children || []);
        return fe.return = U, fe;
      }
    }
    function T(U, K, F, ne, ye) {
      if (K === null || K.tag !== x) {
        var fe = Bi(F, U.mode, ne, ye);
        return fe.return = U, fe;
      } else {
        var Me = s(K, F);
        return Me.return = U, Me;
      }
    }
    function q(U, K, F) {
      if (typeof K == "string" && K !== "" || typeof K == "number") {
        var ne = vg("" + K, U.mode, F);
        return ne.return = U, ne;
      }
      if (typeof K == "object" && K !== null) {
        switch (K.$$typeof) {
          case ca: {
            var ye = hg(K, U.mode, F);
            return ye.ref = xu(U, null, K), ye.return = U, ye;
          }
          case Br: {
            var fe = mg(K, U.mode, F);
            return fe.return = U, fe;
          }
          case Te: {
            var Me = K._payload, Pe = K._init;
            return q(U, Pe(Me), F);
          }
        }
        if (ht(K) || La(K)) {
          var xt = Bi(K, U.mode, F, null);
          return xt.return = U, xt;
        }
        Nd(U, K);
      }
      return typeof K == "function" && Pd(U), null;
    }
    function I(U, K, F, ne) {
      var ye = K !== null ? K.key : null;
      if (typeof F == "string" && F !== "" || typeof F == "number")
        return ye !== null ? null : h(U, K, "" + F, ne);
      if (typeof F == "object" && F !== null) {
        switch (F.$$typeof) {
          case ca:
            return F.key === ye ? m(U, K, F, ne) : null;
          case Br:
            return F.key === ye ? E(U, K, F, ne) : null;
          case Te: {
            var fe = F._payload, Me = F._init;
            return I(U, K, Me(fe), ne);
          }
        }
        if (ht(F) || La(F))
          return ye !== null ? null : T(U, K, F, ne, null);
        Nd(U, F);
      }
      return typeof F == "function" && Pd(U), null;
    }
    function B(U, K, F, ne, ye) {
      if (typeof ne == "string" && ne !== "" || typeof ne == "number") {
        var fe = U.get(F) || null;
        return h(K, fe, "" + ne, ye);
      }
      if (typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case ca: {
            var Me = U.get(ne.key === null ? F : ne.key) || null;
            return m(K, Me, ne, ye);
          }
          case Br: {
            var Pe = U.get(ne.key === null ? F : ne.key) || null;
            return E(K, Pe, ne, ye);
          }
          case Te:
            var xt = ne._payload, ut = ne._init;
            return B(U, K, F, ut(xt), ye);
        }
        if (ht(ne) || La(ne)) {
          var en = U.get(F) || null;
          return T(K, en, ne, ye, null);
        }
        Nd(K, ne);
      }
      return typeof ne == "function" && Pd(K), null;
    }
    function j(U, K, F) {
      {
        if (typeof U != "object" || U === null)
          return K;
        switch (U.$$typeof) {
          case ca:
          case Br:
            k0(U, F);
            var ne = U.key;
            if (typeof ne != "string")
              break;
            if (K === null) {
              K = /* @__PURE__ */ new Set(), K.add(ne);
              break;
            }
            if (!K.has(ne)) {
              K.add(ne);
              break;
            }
            d("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", ne);
            break;
          case Te:
            var ye = U._payload, fe = U._init;
            j(fe(ye), K, F);
            break;
        }
      }
      return K;
    }
    function W(U, K, F, ne) {
      for (var ye = null, fe = 0; fe < F.length; fe++) {
        var Me = F[fe];
        ye = j(Me, ye, U);
      }
      for (var Pe = null, xt = null, ut = K, en = 0, ct = 0, Qt = null; ut !== null && ct < F.length; ct++) {
        ut.index > ct ? (Qt = ut, ut = null) : Qt = ut.sibling;
        var Zn = I(U, ut, F[ct], ne);
        if (Zn === null) {
          ut === null && (ut = Qt);
          break;
        }
        e && ut && Zn.alternate === null && t(U, ut), en = u(Zn, en, ct), xt === null ? Pe = Zn : xt.sibling = Zn, xt = Zn, ut = Qt;
      }
      if (ct === F.length) {
        if (r(U, ut), On()) {
          var Nn = ct;
          So(U, Nn);
        }
        return Pe;
      }
      if (ut === null) {
        for (; ct < F.length; ct++) {
          var Rr = q(U, F[ct], ne);
          Rr !== null && (en = u(Rr, en, ct), xt === null ? Pe = Rr : xt.sibling = Rr, xt = Rr);
        }
        if (On()) {
          var rr = ct;
          So(U, rr);
        }
        return Pe;
      }
      for (var ar = i(U, ut); ct < F.length; ct++) {
        var Xn = B(ar, U, ct, F[ct], ne);
        Xn !== null && (e && Xn.alternate !== null && ar.delete(Xn.key === null ? ct : Xn.key), en = u(Xn, en, ct), xt === null ? Pe = Xn : xt.sibling = Xn, xt = Xn);
      }
      if (e && ar.forEach(function(Hs) {
        return t(U, Hs);
      }), On()) {
        var ri = ct;
        So(U, ri);
      }
      return Pe;
    }
    function ge(U, K, F, ne) {
      var ye = La(F);
      if (typeof ye != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        F[Symbol.toStringTag] === "Generator" && (Pv || d("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Pv = !0), F.entries === ye && (Nv || d("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Nv = !0);
        var fe = ye.call(F);
        if (fe)
          for (var Me = null, Pe = fe.next(); !Pe.done; Pe = fe.next()) {
            var xt = Pe.value;
            Me = j(xt, Me, U);
          }
      }
      var ut = ye.call(F);
      if (ut == null)
        throw new Error("An iterable object provided no iterator.");
      for (var en = null, ct = null, Qt = K, Zn = 0, Nn = 0, Rr = null, rr = ut.next(); Qt !== null && !rr.done; Nn++, rr = ut.next()) {
        Qt.index > Nn ? (Rr = Qt, Qt = null) : Rr = Qt.sibling;
        var ar = I(U, Qt, rr.value, ne);
        if (ar === null) {
          Qt === null && (Qt = Rr);
          break;
        }
        e && Qt && ar.alternate === null && t(U, Qt), Zn = u(ar, Zn, Nn), ct === null ? en = ar : ct.sibling = ar, ct = ar, Qt = Rr;
      }
      if (rr.done) {
        if (r(U, Qt), On()) {
          var Xn = Nn;
          So(U, Xn);
        }
        return en;
      }
      if (Qt === null) {
        for (; !rr.done; Nn++, rr = ut.next()) {
          var ri = q(U, rr.value, ne);
          ri !== null && (Zn = u(ri, Zn, Nn), ct === null ? en = ri : ct.sibling = ri, ct = ri);
        }
        if (On()) {
          var Hs = Nn;
          So(U, Hs);
        }
        return en;
      }
      for (var ec = i(U, Qt); !rr.done; Nn++, rr = ut.next()) {
        var Ra = B(ec, U, Nn, rr.value, ne);
        Ra !== null && (e && Ra.alternate !== null && ec.delete(Ra.key === null ? Nn : Ra.key), Zn = u(Ra, Zn, Nn), ct === null ? en = Ra : ct.sibling = Ra, ct = Ra);
      }
      if (e && ec.forEach(function(TR) {
        return t(U, TR);
      }), On()) {
        var kR = Nn;
        So(U, kR);
      }
      return en;
    }
    function ke(U, K, F, ne) {
      if (K !== null && K.tag === k) {
        r(U, K.sibling);
        var ye = s(K, F);
        return ye.return = U, ye;
      }
      r(U, K);
      var fe = vg(F, U.mode, ne);
      return fe.return = U, fe;
    }
    function xe(U, K, F, ne) {
      for (var ye = F.key, fe = K; fe !== null; ) {
        if (fe.key === ye) {
          var Me = F.type;
          if (Me === da) {
            if (fe.tag === x) {
              r(U, fe.sibling);
              var Pe = s(fe, F.props.children);
              return Pe.return = U, Pe._debugSource = F._source, Pe._debugOwner = F._owner, Pe;
            }
          } else if (fe.elementType === Me || // Keep this check inline so it only runs on the false path:
          bC(fe, F) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof Me == "object" && Me !== null && Me.$$typeof === Te && T0(Me) === fe.type) {
            r(U, fe.sibling);
            var xt = s(fe, F.props);
            return xt.ref = xu(U, fe, F), xt.return = U, xt._debugSource = F._source, xt._debugOwner = F._owner, xt;
          }
          r(U, fe);
          break;
        } else
          t(U, fe);
        fe = fe.sibling;
      }
      if (F.type === da) {
        var ut = Bi(F.props.children, U.mode, ne, F.key);
        return ut.return = U, ut;
      } else {
        var en = hg(F, U.mode, ne);
        return en.ref = xu(U, K, F), en.return = U, en;
      }
    }
    function rt(U, K, F, ne) {
      for (var ye = F.key, fe = K; fe !== null; ) {
        if (fe.key === ye)
          if (fe.tag === R && fe.stateNode.containerInfo === F.containerInfo && fe.stateNode.implementation === F.implementation) {
            r(U, fe.sibling);
            var Me = s(fe, F.children || []);
            return Me.return = U, Me;
          } else {
            r(U, fe);
            break;
          }
        else
          t(U, fe);
        fe = fe.sibling;
      }
      var Pe = mg(F, U.mode, ne);
      return Pe.return = U, Pe;
    }
    function Ke(U, K, F, ne) {
      var ye = typeof F == "object" && F !== null && F.type === da && F.key === null;
      if (ye && (F = F.props.children), typeof F == "object" && F !== null) {
        switch (F.$$typeof) {
          case ca:
            return f(xe(U, K, F, ne));
          case Br:
            return f(rt(U, K, F, ne));
          case Te:
            var fe = F._payload, Me = F._init;
            return Ke(U, K, Me(fe), ne);
        }
        if (ht(F))
          return W(U, K, F, ne);
        if (La(F))
          return ge(U, K, F, ne);
        Nd(U, F);
      }
      return typeof F == "string" && F !== "" || typeof F == "number" ? f(ke(U, K, "" + F, ne)) : (typeof F == "function" && Pd(U), r(U, K));
    }
    return Ke;
  }
  var ks = $0(!0), D0 = $0(!1);
  function v4(e, t) {
    if (e !== null && t.child !== e.child)
      throw new Error("Resuming work not yet implemented.");
    if (t.child !== null) {
      var r = t.child, i = Io(r, r.pendingProps);
      for (t.child = i, i.return = t; r.sibling !== null; )
        r = r.sibling, i = i.sibling = Io(r, r.pendingProps), i.return = t;
      i.sibling = null;
    }
  }
  function m4(e, t) {
    for (var r = e.child; r !== null; )
      jE(r, t), r = r.sibling;
  }
  var Eu = {}, Ii = Di(Eu), Ru = Di(Eu), Ud = Di(Eu);
  function Fd(e) {
    if (e === Eu)
      throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
    return e;
  }
  function O0() {
    var e = Fd(Ud.current);
    return e;
  }
  function Hv(e, t) {
    Wn(Ud, t, e), Wn(Ru, e, e), Wn(Ii, Eu, e);
    var r = D9(t);
    Yn(Ii, e), Wn(Ii, r, e);
  }
  function Ts(e) {
    Yn(Ii, e), Yn(Ru, e), Yn(Ud, e);
  }
  function Bv() {
    var e = Fd(Ii.current);
    return e;
  }
  function A0(e) {
    Fd(Ud.current);
    var t = Fd(Ii.current), r = O9(t, e.type);
    t !== r && (Wn(Ru, e, e), Wn(Ii, r, e));
  }
  function jv(e) {
    Ru.current === e && (Yn(Ii, e), Yn(Ru, e));
  }
  var g4 = 0, L0 = 1, M0 = 1, ku = 2, Qr = Di(g4);
  function Gv(e, t) {
    return (e & t) !== 0;
  }
  function $s(e) {
    return e & L0;
  }
  function Yv(e, t) {
    return e & L0 | t;
  }
  function y4(e, t) {
    return e | t;
  }
  function qi(e, t) {
    Wn(Qr, t, e);
  }
  function Ds(e) {
    Yn(Qr, e);
  }
  function b4(e, t) {
    var r = e.memoizedState;
    return r !== null ? r.dehydrated !== null : (e.memoizedProps, !0);
  }
  function Vd(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === H) {
        var r = t.memoizedState;
        if (r !== null) {
          var i = r.dehydrated;
          if (i === null || Bb(i) || Jh(i))
            return t;
        }
      } else if (t.tag === ae && // revealOrder undefined can't be trusted because it don't
      // keep track of whether it suspended or not.
      t.memoizedProps.revealOrder !== void 0) {
        var s = (t.flags & vt) !== De;
        if (s)
          return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e)
        return null;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e)
          return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var pr = (
    /*   */
    0
  ), hn = (
    /* */
    1
  ), ba = (
    /*  */
    2
  ), vn = (
    /*    */
    4
  ), An = (
    /*   */
    8
  ), Wv = [];
  function Kv() {
    for (var e = 0; e < Wv.length; e++) {
      var t = Wv[e];
      t._workInProgressVersionPrimary = null;
    }
    Wv.length = 0;
  }
  function w4(e, t) {
    var r = t._getVersion, i = r(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
  }
  var ve = o.ReactCurrentDispatcher, Tu = o.ReactCurrentBatchConfig, Zv, Os;
  Zv = /* @__PURE__ */ new Set();
  var To = Q, _t = null, mn = null, gn = null, Hd = !1, $u = !1, Du = 0, C4 = 0, S4 = 25, Z = null, qr = null, zi = -1, Xv = !1;
  function yt() {
    {
      var e = Z;
      qr === null ? qr = [e] : qr.push(e);
    }
  }
  function ue() {
    {
      var e = Z;
      qr !== null && (zi++, qr[zi] !== e && _4(e));
    }
  }
  function As(e) {
    e != null && !ht(e) && d("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", Z, typeof e);
  }
  function _4(e) {
    {
      var t = He(_t);
      if (!Zv.has(t) && (Zv.add(t), qr !== null)) {
        for (var r = "", i = 30, s = 0; s <= zi; s++) {
          for (var u = qr[s], f = s === zi ? e : u, h = s + 1 + ". " + u; h.length < i; )
            h += " ";
          h += f + `
`, r += h;
        }
        d(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, r);
      }
    }
  }
  function Kn() {
    throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
  }
  function Qv(e, t) {
    if (Xv)
      return !1;
    if (t === null)
      return d("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", Z), !1;
    e.length !== t.length && d(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, Z, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
    for (var r = 0; r < t.length && r < e.length; r++)
      if (!_r(e[r], t[r]))
        return !1;
    return !0;
  }
  function Ls(e, t, r, i, s, u) {
    To = u, _t = t, qr = e !== null ? e._debugHookTypes : null, zi = -1, Xv = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = Q, e !== null && e.memoizedState !== null ? ve.current = nw : qr !== null ? ve.current = tw : ve.current = ew;
    var f = r(i, s);
    if ($u) {
      var h = 0;
      do {
        if ($u = !1, Du = 0, h >= S4)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        h += 1, Xv = !1, mn = null, gn = null, t.updateQueue = null, zi = -1, ve.current = rw, f = r(i, s);
      } while ($u);
    }
    ve.current = nf, t._debugHookTypes = qr;
    var m = mn !== null && mn.next !== null;
    if (To = Q, _t = null, mn = null, gn = null, Z = null, qr = null, zi = -1, e !== null && (e.flags & Va) !== (t.flags & Va) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & tt) !== Oe && d("Internal React error: Expected static flag was missing. Please notify the React team."), Hd = !1, m)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return f;
  }
  function Ms() {
    var e = Du !== 0;
    return Du = 0, e;
  }
  function I0(e, t, r) {
    t.updateQueue = e.updateQueue, (t.mode & va) !== Oe ? t.flags &= ~(qc | Fa | jr | it) : t.flags &= ~(jr | it), e.lanes = Hc(e.lanes, r);
  }
  function q0() {
    if (ve.current = nf, Hd) {
      for (var e = _t.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Hd = !1;
    }
    To = Q, _t = null, mn = null, gn = null, qr = null, zi = -1, Z = null, K0 = !1, $u = !1, Du = 0;
  }
  function wa() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return gn === null ? _t.memoizedState = gn = e : gn = gn.next = e, gn;
  }
  function zr() {
    var e;
    if (mn === null) {
      var t = _t.alternate;
      t !== null ? e = t.memoizedState : e = null;
    } else
      e = mn.next;
    var r;
    if (gn === null ? r = _t.memoizedState : r = gn.next, r !== null)
      gn = r, r = gn.next, mn = e;
    else {
      if (e === null)
        throw new Error("Rendered more hooks than during the previous render.");
      mn = e;
      var i = {
        memoizedState: mn.memoizedState,
        baseState: mn.baseState,
        baseQueue: mn.baseQueue,
        queue: mn.queue,
        next: null
      };
      gn === null ? _t.memoizedState = gn = i : gn = gn.next = i;
    }
    return gn;
  }
  function z0() {
    return {
      lastEffect: null,
      stores: null
    };
  }
  function Jv(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function em(e, t, r) {
    var i = wa(), s;
    r !== void 0 ? s = r(t) : s = t, i.memoizedState = i.baseState = s;
    var u = {
      pending: null,
      interleaved: null,
      lanes: Q,
      dispatch: null,
      lastRenderedReducer: e,
      lastRenderedState: s
    };
    i.queue = u;
    var f = u.dispatch = k4.bind(null, _t, u);
    return [i.memoizedState, f];
  }
  function tm(e, t, r) {
    var i = zr(), s = i.queue;
    if (s === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    s.lastRenderedReducer = e;
    var u = mn, f = u.baseQueue, h = s.pending;
    if (h !== null) {
      if (f !== null) {
        var m = f.next, E = h.next;
        f.next = E, h.next = m;
      }
      u.baseQueue !== f && d("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), u.baseQueue = f = h, s.pending = null;
    }
    if (f !== null) {
      var T = f.next, q = u.baseState, I = null, B = null, j = null, W = T;
      do {
        var ge = W.lane;
        if (cs(To, ge)) {
          if (j !== null) {
            var xe = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: kn,
              action: W.action,
              hasEagerState: W.hasEagerState,
              eagerState: W.eagerState,
              next: null
            };
            j = j.next = xe;
          }
          if (W.hasEagerState)
            q = W.eagerState;
          else {
            var rt = W.action;
            q = e(q, rt);
          }
        } else {
          var ke = {
            lane: ge,
            action: W.action,
            hasEagerState: W.hasEagerState,
            eagerState: W.eagerState,
            next: null
          };
          j === null ? (B = j = ke, I = q) : j = j.next = ke, _t.lanes = Ye(_t.lanes, ge), Ku(ge);
        }
        W = W.next;
      } while (W !== null && W !== T);
      j === null ? I = q : j.next = B, _r(q, i.memoizedState) || zu(), i.memoizedState = q, i.baseState = I, i.baseQueue = j, s.lastRenderedState = q;
    }
    var Ke = s.interleaved;
    if (Ke !== null) {
      var U = Ke;
      do {
        var K = U.lane;
        _t.lanes = Ye(_t.lanes, K), Ku(K), U = U.next;
      } while (U !== Ke);
    } else
      f === null && (s.lanes = Q);
    var F = s.dispatch;
    return [i.memoizedState, F];
  }
  function nm(e, t, r) {
    var i = zr(), s = i.queue;
    if (s === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    s.lastRenderedReducer = e;
    var u = s.dispatch, f = s.pending, h = i.memoizedState;
    if (f !== null) {
      s.pending = null;
      var m = f.next, E = m;
      do {
        var T = E.action;
        h = e(h, T), E = E.next;
      } while (E !== m);
      _r(h, i.memoizedState) || zu(), i.memoizedState = h, i.baseQueue === null && (i.baseState = h), s.lastRenderedState = h;
    }
    return [h, u];
  }
  function Bq(e, t, r) {
  }
  function jq(e, t, r) {
  }
  function rm(e, t, r) {
    var i = _t, s = wa(), u, f = On();
    if (f) {
      if (r === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      u = r(), Os || u !== r() && (d("The result of getServerSnapshot should be cached to avoid an infinite loop"), Os = !0);
    } else {
      if (u = t(), !Os) {
        var h = t();
        _r(u, h) || (d("The result of getSnapshot should be cached to avoid an infinite loop"), Os = !0);
      }
      var m = Cf();
      if (m === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Vc(m, To) || N0(i, t, u);
    }
    s.memoizedState = u;
    var E = {
      value: u,
      getSnapshot: t
    };
    return s.queue = E, Wd(U0.bind(null, i, E, e), [e]), i.flags |= jr, Ou(hn | An, P0.bind(null, i, E, u, t), void 0, null), u;
  }
  function Bd(e, t, r) {
    var i = _t, s = zr(), u = t();
    if (!Os) {
      var f = t();
      _r(u, f) || (d("The result of getSnapshot should be cached to avoid an infinite loop"), Os = !0);
    }
    var h = s.memoizedState, m = !_r(h, u);
    m && (s.memoizedState = u, zu());
    var E = s.queue;
    if (Lu(U0.bind(null, i, E, e), [e]), E.getSnapshot !== t || m || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    gn !== null && gn.memoizedState.tag & hn) {
      i.flags |= jr, Ou(hn | An, P0.bind(null, i, E, u, t), void 0, null);
      var T = Cf();
      if (T === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Vc(T, To) || N0(i, t, u);
    }
    return u;
  }
  function N0(e, t, r) {
    e.flags |= Ic;
    var i = {
      getSnapshot: t,
      value: r
    }, s = _t.updateQueue;
    if (s === null)
      s = z0(), _t.updateQueue = s, s.stores = [i];
    else {
      var u = s.stores;
      u === null ? s.stores = [i] : u.push(i);
    }
  }
  function P0(e, t, r, i) {
    t.value = r, t.getSnapshot = i, F0(t) && V0(e);
  }
  function U0(e, t, r) {
    var i = function() {
      F0(t) && V0(e);
    };
    return r(i);
  }
  function F0(e) {
    var t = e.getSnapshot, r = e.value;
    try {
      var i = t();
      return !_r(r, i);
    } catch {
      return !0;
    }
  }
  function V0(e) {
    var t = fr(e, qe);
    t !== null && Cn(t, e, qe, Nt);
  }
  function jd(e) {
    var t = wa();
    typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
    var r = {
      pending: null,
      interleaved: null,
      lanes: Q,
      dispatch: null,
      lastRenderedReducer: Jv,
      lastRenderedState: e
    };
    t.queue = r;
    var i = r.dispatch = T4.bind(null, _t, r);
    return [t.memoizedState, i];
  }
  function am(e) {
    return tm(Jv);
  }
  function im(e) {
    return nm(Jv);
  }
  function Ou(e, t, r, i) {
    var s = {
      tag: e,
      create: t,
      destroy: r,
      deps: i,
      // Circular
      next: null
    }, u = _t.updateQueue;
    if (u === null)
      u = z0(), _t.updateQueue = u, u.lastEffect = s.next = s;
    else {
      var f = u.lastEffect;
      if (f === null)
        u.lastEffect = s.next = s;
      else {
        var h = f.next;
        f.next = s, s.next = h, u.lastEffect = s;
      }
    }
    return s;
  }
  function om(e) {
    var t = wa();
    {
      var r = {
        current: e
      };
      return t.memoizedState = r, r;
    }
  }
  function Gd(e) {
    var t = zr();
    return t.memoizedState;
  }
  function Au(e, t, r, i) {
    var s = wa(), u = i === void 0 ? null : i;
    _t.flags |= e, s.memoizedState = Ou(hn | t, r, void 0, u);
  }
  function Yd(e, t, r, i) {
    var s = zr(), u = i === void 0 ? null : i, f = void 0;
    if (mn !== null) {
      var h = mn.memoizedState;
      if (f = h.destroy, u !== null) {
        var m = h.deps;
        if (Qv(u, m)) {
          s.memoizedState = Ou(t, r, f, u);
          return;
        }
      }
    }
    _t.flags |= e, s.memoizedState = Ou(hn | t, r, f, u);
  }
  function Wd(e, t) {
    return (_t.mode & va) !== Oe ? Au(qc | jr | jp, An, e, t) : Au(jr | jp, An, e, t);
  }
  function Lu(e, t) {
    return Yd(jr, An, e, t);
  }
  function sm(e, t) {
    return Au(it, ba, e, t);
  }
  function Kd(e, t) {
    return Yd(it, ba, e, t);
  }
  function lm(e, t) {
    var r = it;
    return r |= co, (_t.mode & va) !== Oe && (r |= Fa), Au(r, vn, e, t);
  }
  function Zd(e, t) {
    return Yd(it, vn, e, t);
  }
  function H0(e, t) {
    if (typeof t == "function") {
      var r = t, i = e();
      return r(i), function() {
        r(null);
      };
    } else if (t != null) {
      var s = t;
      s.hasOwnProperty("current") || d("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(s).join(", ") + "}");
      var u = e();
      return s.current = u, function() {
        s.current = null;
      };
    }
  }
  function um(e, t, r) {
    typeof t != "function" && d("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var i = r != null ? r.concat([e]) : null, s = it;
    return s |= co, (_t.mode & va) !== Oe && (s |= Fa), Au(s, vn, H0.bind(null, t, e), i);
  }
  function Xd(e, t, r) {
    typeof t != "function" && d("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var i = r != null ? r.concat([e]) : null;
    return Yd(it, vn, H0.bind(null, t, e), i);
  }
  function x4(e, t) {
  }
  var Qd = x4;
  function cm(e, t) {
    var r = wa(), i = t === void 0 ? null : t;
    return r.memoizedState = [e, i], e;
  }
  function Jd(e, t) {
    var r = zr(), i = t === void 0 ? null : t, s = r.memoizedState;
    if (s !== null && i !== null) {
      var u = s[1];
      if (Qv(i, u))
        return s[0];
    }
    return r.memoizedState = [e, i], e;
  }
  function dm(e, t) {
    var r = wa(), i = t === void 0 ? null : t, s = e();
    return r.memoizedState = [s, i], s;
  }
  function ef(e, t) {
    var r = zr(), i = t === void 0 ? null : t, s = r.memoizedState;
    if (s !== null && i !== null) {
      var u = s[1];
      if (Qv(i, u))
        return s[0];
    }
    var f = e();
    return r.memoizedState = [f, i], f;
  }
  function fm(e) {
    var t = wa();
    return t.memoizedState = e, e;
  }
  function B0(e) {
    var t = zr(), r = mn, i = r.memoizedState;
    return G0(t, i, e);
  }
  function j0(e) {
    var t = zr();
    if (mn === null)
      return t.memoizedState = e, e;
    var r = mn.memoizedState;
    return G0(t, r, e);
  }
  function G0(e, t, r) {
    var i = !o7(To);
    if (i) {
      if (!_r(r, t)) {
        var s = I1();
        _t.lanes = Ye(_t.lanes, s), Ku(s), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, zu()), e.memoizedState = r, r;
  }
  function E4(e, t, r) {
    var i = Yr();
    Tn(v7(i, Ba)), e(!0);
    var s = Tu.transition;
    Tu.transition = {};
    var u = Tu.transition;
    Tu.transition._updatedFibers = /* @__PURE__ */ new Set();
    try {
      e(!1), t();
    } finally {
      if (Tn(i), Tu.transition = s, s === null && u._updatedFibers) {
        var f = u._updatedFibers.size;
        f > 10 && p("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), u._updatedFibers.clear();
      }
    }
  }
  function pm() {
    var e = jd(!1), t = e[0], r = e[1], i = E4.bind(null, r), s = wa();
    return s.memoizedState = i, [t, i];
  }
  function Y0() {
    var e = am(), t = e[0], r = zr(), i = r.memoizedState;
    return [t, i];
  }
  function W0() {
    var e = im(), t = e[0], r = zr(), i = r.memoizedState;
    return [t, i];
  }
  var K0 = !1;
  function R4() {
    return K0;
  }
  function hm() {
    var e = wa(), t = Cf(), r = t.identifierPrefix, i;
    if (On()) {
      var s = U_();
      i = ":" + r + "R" + s;
      var u = Du++;
      u > 0 && (i += "H" + u.toString(32)), i += ":";
    } else {
      var f = C4++;
      i = ":" + r + "r" + f.toString(32) + ":";
    }
    return e.memoizedState = i, i;
  }
  function tf() {
    var e = zr(), t = e.memoizedState;
    return t;
  }
  function k4(e, t, r) {
    typeof arguments[3] == "function" && d("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var i = Vi(e), s = {
      lane: i,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Z0(e))
      X0(t, s);
    else {
      var u = h0(e, t, s, i);
      if (u !== null) {
        var f = nr();
        Cn(u, e, i, f), Q0(u, t, i);
      }
    }
    J0(e, i);
  }
  function T4(e, t, r) {
    typeof arguments[3] == "function" && d("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var i = Vi(e), s = {
      lane: i,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Z0(e))
      X0(t, s);
    else {
      var u = e.alternate;
      if (e.lanes === Q && (u === null || u.lanes === Q)) {
        var f = t.lastRenderedReducer;
        if (f !== null) {
          var h;
          h = ve.current, ve.current = Jr;
          try {
            var m = t.lastRenderedState, E = f(m, r);
            if (s.hasEagerState = !0, s.eagerState = E, _r(E, m)) {
              o4(e, t, s, i);
              return;
            }
          } catch {
          } finally {
            ve.current = h;
          }
        }
      }
      var T = h0(e, t, s, i);
      if (T !== null) {
        var q = nr();
        Cn(T, e, i, q), Q0(T, t, i);
      }
    }
    J0(e, i);
  }
  function Z0(e) {
    var t = e.alternate;
    return e === _t || t !== null && t === _t;
  }
  function X0(e, t) {
    $u = Hd = !0;
    var r = e.pending;
    r === null ? t.next = t : (t.next = r.next, r.next = t), e.pending = t;
  }
  function Q0(e, t, r) {
    if (M1(r)) {
      var i = t.lanes;
      i = q1(i, e.pendingLanes);
      var s = Ye(i, r);
      t.lanes = s, Ch(e, s);
    }
  }
  function J0(e, t, r) {
    Zp(e, t);
  }
  var nf = {
    readContext: ln,
    useCallback: Kn,
    useContext: Kn,
    useEffect: Kn,
    useImperativeHandle: Kn,
    useInsertionEffect: Kn,
    useLayoutEffect: Kn,
    useMemo: Kn,
    useReducer: Kn,
    useRef: Kn,
    useState: Kn,
    useDebugValue: Kn,
    useDeferredValue: Kn,
    useTransition: Kn,
    useMutableSource: Kn,
    useSyncExternalStore: Kn,
    useId: Kn,
    unstable_isNewReconciler: Ue
  }, ew = null, tw = null, nw = null, rw = null, Ca = null, Jr = null, rf = null;
  {
    var vm = function() {
      d("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, ze = function() {
      d("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    ew = {
      readContext: function(e) {
        return ln(e);
      },
      useCallback: function(e, t) {
        return Z = "useCallback", yt(), As(t), cm(e, t);
      },
      useContext: function(e) {
        return Z = "useContext", yt(), ln(e);
      },
      useEffect: function(e, t) {
        return Z = "useEffect", yt(), As(t), Wd(e, t);
      },
      useImperativeHandle: function(e, t, r) {
        return Z = "useImperativeHandle", yt(), As(r), um(e, t, r);
      },
      useInsertionEffect: function(e, t) {
        return Z = "useInsertionEffect", yt(), As(t), sm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return Z = "useLayoutEffect", yt(), As(t), lm(e, t);
      },
      useMemo: function(e, t) {
        Z = "useMemo", yt(), As(t);
        var r = ve.current;
        ve.current = Ca;
        try {
          return dm(e, t);
        } finally {
          ve.current = r;
        }
      },
      useReducer: function(e, t, r) {
        Z = "useReducer", yt();
        var i = ve.current;
        ve.current = Ca;
        try {
          return em(e, t, r);
        } finally {
          ve.current = i;
        }
      },
      useRef: function(e) {
        return Z = "useRef", yt(), om(e);
      },
      useState: function(e) {
        Z = "useState", yt();
        var t = ve.current;
        ve.current = Ca;
        try {
          return jd(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return Z = "useDebugValue", yt(), void 0;
      },
      useDeferredValue: function(e) {
        return Z = "useDeferredValue", yt(), fm(e);
      },
      useTransition: function() {
        return Z = "useTransition", yt(), pm();
      },
      useMutableSource: function(e, t, r) {
        return Z = "useMutableSource", yt(), void 0;
      },
      useSyncExternalStore: function(e, t, r) {
        return Z = "useSyncExternalStore", yt(), rm(e, t, r);
      },
      useId: function() {
        return Z = "useId", yt(), hm();
      },
      unstable_isNewReconciler: Ue
    }, tw = {
      readContext: function(e) {
        return ln(e);
      },
      useCallback: function(e, t) {
        return Z = "useCallback", ue(), cm(e, t);
      },
      useContext: function(e) {
        return Z = "useContext", ue(), ln(e);
      },
      useEffect: function(e, t) {
        return Z = "useEffect", ue(), Wd(e, t);
      },
      useImperativeHandle: function(e, t, r) {
        return Z = "useImperativeHandle", ue(), um(e, t, r);
      },
      useInsertionEffect: function(e, t) {
        return Z = "useInsertionEffect", ue(), sm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return Z = "useLayoutEffect", ue(), lm(e, t);
      },
      useMemo: function(e, t) {
        Z = "useMemo", ue();
        var r = ve.current;
        ve.current = Ca;
        try {
          return dm(e, t);
        } finally {
          ve.current = r;
        }
      },
      useReducer: function(e, t, r) {
        Z = "useReducer", ue();
        var i = ve.current;
        ve.current = Ca;
        try {
          return em(e, t, r);
        } finally {
          ve.current = i;
        }
      },
      useRef: function(e) {
        return Z = "useRef", ue(), om(e);
      },
      useState: function(e) {
        Z = "useState", ue();
        var t = ve.current;
        ve.current = Ca;
        try {
          return jd(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return Z = "useDebugValue", ue(), void 0;
      },
      useDeferredValue: function(e) {
        return Z = "useDeferredValue", ue(), fm(e);
      },
      useTransition: function() {
        return Z = "useTransition", ue(), pm();
      },
      useMutableSource: function(e, t, r) {
        return Z = "useMutableSource", ue(), void 0;
      },
      useSyncExternalStore: function(e, t, r) {
        return Z = "useSyncExternalStore", ue(), rm(e, t, r);
      },
      useId: function() {
        return Z = "useId", ue(), hm();
      },
      unstable_isNewReconciler: Ue
    }, nw = {
      readContext: function(e) {
        return ln(e);
      },
      useCallback: function(e, t) {
        return Z = "useCallback", ue(), Jd(e, t);
      },
      useContext: function(e) {
        return Z = "useContext", ue(), ln(e);
      },
      useEffect: function(e, t) {
        return Z = "useEffect", ue(), Lu(e, t);
      },
      useImperativeHandle: function(e, t, r) {
        return Z = "useImperativeHandle", ue(), Xd(e, t, r);
      },
      useInsertionEffect: function(e, t) {
        return Z = "useInsertionEffect", ue(), Kd(e, t);
      },
      useLayoutEffect: function(e, t) {
        return Z = "useLayoutEffect", ue(), Zd(e, t);
      },
      useMemo: function(e, t) {
        Z = "useMemo", ue();
        var r = ve.current;
        ve.current = Jr;
        try {
          return ef(e, t);
        } finally {
          ve.current = r;
        }
      },
      useReducer: function(e, t, r) {
        Z = "useReducer", ue();
        var i = ve.current;
        ve.current = Jr;
        try {
          return tm(e, t, r);
        } finally {
          ve.current = i;
        }
      },
      useRef: function(e) {
        return Z = "useRef", ue(), Gd();
      },
      useState: function(e) {
        Z = "useState", ue();
        var t = ve.current;
        ve.current = Jr;
        try {
          return am(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return Z = "useDebugValue", ue(), Qd();
      },
      useDeferredValue: function(e) {
        return Z = "useDeferredValue", ue(), B0(e);
      },
      useTransition: function() {
        return Z = "useTransition", ue(), Y0();
      },
      useMutableSource: function(e, t, r) {
        return Z = "useMutableSource", ue(), void 0;
      },
      useSyncExternalStore: function(e, t, r) {
        return Z = "useSyncExternalStore", ue(), Bd(e, t);
      },
      useId: function() {
        return Z = "useId", ue(), tf();
      },
      unstable_isNewReconciler: Ue
    }, rw = {
      readContext: function(e) {
        return ln(e);
      },
      useCallback: function(e, t) {
        return Z = "useCallback", ue(), Jd(e, t);
      },
      useContext: function(e) {
        return Z = "useContext", ue(), ln(e);
      },
      useEffect: function(e, t) {
        return Z = "useEffect", ue(), Lu(e, t);
      },
      useImperativeHandle: function(e, t, r) {
        return Z = "useImperativeHandle", ue(), Xd(e, t, r);
      },
      useInsertionEffect: function(e, t) {
        return Z = "useInsertionEffect", ue(), Kd(e, t);
      },
      useLayoutEffect: function(e, t) {
        return Z = "useLayoutEffect", ue(), Zd(e, t);
      },
      useMemo: function(e, t) {
        Z = "useMemo", ue();
        var r = ve.current;
        ve.current = rf;
        try {
          return ef(e, t);
        } finally {
          ve.current = r;
        }
      },
      useReducer: function(e, t, r) {
        Z = "useReducer", ue();
        var i = ve.current;
        ve.current = rf;
        try {
          return nm(e, t, r);
        } finally {
          ve.current = i;
        }
      },
      useRef: function(e) {
        return Z = "useRef", ue(), Gd();
      },
      useState: function(e) {
        Z = "useState", ue();
        var t = ve.current;
        ve.current = rf;
        try {
          return im(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return Z = "useDebugValue", ue(), Qd();
      },
      useDeferredValue: function(e) {
        return Z = "useDeferredValue", ue(), j0(e);
      },
      useTransition: function() {
        return Z = "useTransition", ue(), W0();
      },
      useMutableSource: function(e, t, r) {
        return Z = "useMutableSource", ue(), void 0;
      },
      useSyncExternalStore: function(e, t, r) {
        return Z = "useSyncExternalStore", ue(), Bd(e, t);
      },
      useId: function() {
        return Z = "useId", ue(), tf();
      },
      unstable_isNewReconciler: Ue
    }, Ca = {
      readContext: function(e) {
        return vm(), ln(e);
      },
      useCallback: function(e, t) {
        return Z = "useCallback", ze(), yt(), cm(e, t);
      },
      useContext: function(e) {
        return Z = "useContext", ze(), yt(), ln(e);
      },
      useEffect: function(e, t) {
        return Z = "useEffect", ze(), yt(), Wd(e, t);
      },
      useImperativeHandle: function(e, t, r) {
        return Z = "useImperativeHandle", ze(), yt(), um(e, t, r);
      },
      useInsertionEffect: function(e, t) {
        return Z = "useInsertionEffect", ze(), yt(), sm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return Z = "useLayoutEffect", ze(), yt(), lm(e, t);
      },
      useMemo: function(e, t) {
        Z = "useMemo", ze(), yt();
        var r = ve.current;
        ve.current = Ca;
        try {
          return dm(e, t);
        } finally {
          ve.current = r;
        }
      },
      useReducer: function(e, t, r) {
        Z = "useReducer", ze(), yt();
        var i = ve.current;
        ve.current = Ca;
        try {
          return em(e, t, r);
        } finally {
          ve.current = i;
        }
      },
      useRef: function(e) {
        return Z = "useRef", ze(), yt(), om(e);
      },
      useState: function(e) {
        Z = "useState", ze(), yt();
        var t = ve.current;
        ve.current = Ca;
        try {
          return jd(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return Z = "useDebugValue", ze(), yt(), void 0;
      },
      useDeferredValue: function(e) {
        return Z = "useDeferredValue", ze(), yt(), fm(e);
      },
      useTransition: function() {
        return Z = "useTransition", ze(), yt(), pm();
      },
      useMutableSource: function(e, t, r) {
        return Z = "useMutableSource", ze(), yt(), void 0;
      },
      useSyncExternalStore: function(e, t, r) {
        return Z = "useSyncExternalStore", ze(), yt(), rm(e, t, r);
      },
      useId: function() {
        return Z = "useId", ze(), yt(), hm();
      },
      unstable_isNewReconciler: Ue
    }, Jr = {
      readContext: function(e) {
        return vm(), ln(e);
      },
      useCallback: function(e, t) {
        return Z = "useCallback", ze(), ue(), Jd(e, t);
      },
      useContext: function(e) {
        return Z = "useContext", ze(), ue(), ln(e);
      },
      useEffect: function(e, t) {
        return Z = "useEffect", ze(), ue(), Lu(e, t);
      },
      useImperativeHandle: function(e, t, r) {
        return Z = "useImperativeHandle", ze(), ue(), Xd(e, t, r);
      },
      useInsertionEffect: function(e, t) {
        return Z = "useInsertionEffect", ze(), ue(), Kd(e, t);
      },
      useLayoutEffect: function(e, t) {
        return Z = "useLayoutEffect", ze(), ue(), Zd(e, t);
      },
      useMemo: function(e, t) {
        Z = "useMemo", ze(), ue();
        var r = ve.current;
        ve.current = Jr;
        try {
          return ef(e, t);
        } finally {
          ve.current = r;
        }
      },
      useReducer: function(e, t, r) {
        Z = "useReducer", ze(), ue();
        var i = ve.current;
        ve.current = Jr;
        try {
          return tm(e, t, r);
        } finally {
          ve.current = i;
        }
      },
      useRef: function(e) {
        return Z = "useRef", ze(), ue(), Gd();
      },
      useState: function(e) {
        Z = "useState", ze(), ue();
        var t = ve.current;
        ve.current = Jr;
        try {
          return am(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return Z = "useDebugValue", ze(), ue(), Qd();
      },
      useDeferredValue: function(e) {
        return Z = "useDeferredValue", ze(), ue(), B0(e);
      },
      useTransition: function() {
        return Z = "useTransition", ze(), ue(), Y0();
      },
      useMutableSource: function(e, t, r) {
        return Z = "useMutableSource", ze(), ue(), void 0;
      },
      useSyncExternalStore: function(e, t, r) {
        return Z = "useSyncExternalStore", ze(), ue(), Bd(e, t);
      },
      useId: function() {
        return Z = "useId", ze(), ue(), tf();
      },
      unstable_isNewReconciler: Ue
    }, rf = {
      readContext: function(e) {
        return vm(), ln(e);
      },
      useCallback: function(e, t) {
        return Z = "useCallback", ze(), ue(), Jd(e, t);
      },
      useContext: function(e) {
        return Z = "useContext", ze(), ue(), ln(e);
      },
      useEffect: function(e, t) {
        return Z = "useEffect", ze(), ue(), Lu(e, t);
      },
      useImperativeHandle: function(e, t, r) {
        return Z = "useImperativeHandle", ze(), ue(), Xd(e, t, r);
      },
      useInsertionEffect: function(e, t) {
        return Z = "useInsertionEffect", ze(), ue(), Kd(e, t);
      },
      useLayoutEffect: function(e, t) {
        return Z = "useLayoutEffect", ze(), ue(), Zd(e, t);
      },
      useMemo: function(e, t) {
        Z = "useMemo", ze(), ue();
        var r = ve.current;
        ve.current = Jr;
        try {
          return ef(e, t);
        } finally {
          ve.current = r;
        }
      },
      useReducer: function(e, t, r) {
        Z = "useReducer", ze(), ue();
        var i = ve.current;
        ve.current = Jr;
        try {
          return nm(e, t, r);
        } finally {
          ve.current = i;
        }
      },
      useRef: function(e) {
        return Z = "useRef", ze(), ue(), Gd();
      },
      useState: function(e) {
        Z = "useState", ze(), ue();
        var t = ve.current;
        ve.current = Jr;
        try {
          return im(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return Z = "useDebugValue", ze(), ue(), Qd();
      },
      useDeferredValue: function(e) {
        return Z = "useDeferredValue", ze(), ue(), j0(e);
      },
      useTransition: function() {
        return Z = "useTransition", ze(), ue(), W0();
      },
      useMutableSource: function(e, t, r) {
        return Z = "useMutableSource", ze(), ue(), void 0;
      },
      useSyncExternalStore: function(e, t, r) {
        return Z = "useSyncExternalStore", ze(), ue(), Bd(e, t);
      },
      useId: function() {
        return Z = "useId", ze(), ue(), tf();
      },
      unstable_isNewReconciler: Ue
    };
  }
  var Ni = a.unstable_now, aw = 0, af = -1, Mu = -1, of = -1, mm = !1, sf = !1;
  function iw() {
    return mm;
  }
  function $4() {
    sf = !0;
  }
  function D4() {
    mm = !1, sf = !1;
  }
  function O4() {
    mm = sf, sf = !1;
  }
  function ow() {
    return aw;
  }
  function sw() {
    aw = Ni();
  }
  function gm(e) {
    Mu = Ni(), e.actualStartTime < 0 && (e.actualStartTime = Ni());
  }
  function lw(e) {
    Mu = -1;
  }
  function lf(e, t) {
    if (Mu >= 0) {
      var r = Ni() - Mu;
      e.actualDuration += r, t && (e.selfBaseDuration = r), Mu = -1;
    }
  }
  function Sa(e) {
    if (af >= 0) {
      var t = Ni() - af;
      af = -1;
      for (var r = e.return; r !== null; ) {
        switch (r.tag) {
          case _:
            var i = r.stateNode;
            i.effectDuration += t;
            return;
          case V:
            var s = r.stateNode;
            s.effectDuration += t;
            return;
        }
        r = r.return;
      }
    }
  }
  function ym(e) {
    if (of >= 0) {
      var t = Ni() - of;
      of = -1;
      for (var r = e.return; r !== null; ) {
        switch (r.tag) {
          case _:
            var i = r.stateNode;
            i !== null && (i.passiveEffectDuration += t);
            return;
          case V:
            var s = r.stateNode;
            s !== null && (s.passiveEffectDuration += t);
            return;
        }
        r = r.return;
      }
    }
  }
  function _a() {
    af = Ni();
  }
  function bm() {
    of = Ni();
  }
  function wm(e) {
    for (var t = e.child; t; )
      e.actualDuration += t.actualDuration, t = t.sibling;
  }
  function $o(e, t) {
    return {
      value: e,
      source: t,
      stack: Sl(t),
      digest: null
    };
  }
  function Cm(e, t, r) {
    return {
      value: e,
      source: null,
      stack: r ?? null,
      digest: t ?? null
    };
  }
  function A4(e, t) {
    return !0;
  }
  function Sm(e, t) {
    try {
      var r = A4(e, t);
      if (r === !1)
        return;
      var i = t.value, s = t.source, u = t.stack, f = u !== null ? u : "";
      if (i != null && i._suppressLogging) {
        if (e.tag === C)
          return;
        console.error(i);
      }
      var h = s ? He(s) : null, m = h ? "The above error occurred in the <" + h + "> component:" : "The above error occurred in one of your React components:", E;
      if (e.tag === _)
        E = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var T = He(e) || "Anonymous";
        E = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + T + ".");
      }
      var q = m + `
` + f + `

` + ("" + E);
      console.error(q);
    } catch (I) {
      setTimeout(function() {
        throw I;
      });
    }
  }
  var L4 = typeof WeakMap == "function" ? WeakMap : Map;
  function uw(e, t, r) {
    var i = Xa(Nt, r);
    i.tag = Sv, i.payload = {
      element: null
    };
    var s = t.value;
    return i.callback = function() {
      EE(s), Sm(e, t);
    }, i;
  }
  function _m(e, t, r) {
    var i = Xa(Nt, r);
    i.tag = Sv;
    var s = e.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var u = t.value;
      i.payload = function() {
        return s(u);
      }, i.callback = function() {
        wC(e), Sm(e, t);
      };
    }
    var f = e.stateNode;
    return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
      wC(e), Sm(e, t), typeof s != "function" && _E(this);
      var m = t.value, E = t.stack;
      this.componentDidCatch(m, {
        componentStack: E !== null ? E : ""
      }), typeof s != "function" && (wr(e.lanes, qe) || d("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", He(e) || "Unknown"));
    }), i;
  }
  function cw(e, t, r) {
    var i = e.pingCache, s;
    if (i === null ? (i = e.pingCache = new L4(), s = /* @__PURE__ */ new Set(), i.set(t, s)) : (s = i.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), i.set(t, s))), !s.has(r)) {
      s.add(r);
      var u = RE.bind(null, e, t, r);
      Gr && Zu(e, r), t.then(u, u);
    }
  }
  function M4(e, t, r, i) {
    var s = e.updateQueue;
    if (s === null) {
      var u = /* @__PURE__ */ new Set();
      u.add(r), e.updateQueue = u;
    } else
      s.add(r);
  }
  function I4(e, t) {
    var r = e.tag;
    if ((e.mode & tt) === Oe && (r === y || r === M || r === P)) {
      var i = e.alternate;
      i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function dw(e) {
    var t = e;
    do {
      if (t.tag === H && b4(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function fw(e, t, r, i, s) {
    if ((e.mode & tt) === Oe) {
      if (e === t)
        e.flags |= Jn;
      else {
        if (e.flags |= vt, r.flags |= Hp, r.flags &= ~(v3 | Ml), r.tag === C) {
          var u = r.alternate;
          if (u === null)
            r.tag = me;
          else {
            var f = Xa(Nt, qe);
            f.tag = Od, Mi(r, f, qe);
          }
        }
        r.lanes = Ye(r.lanes, qe);
      }
      return e;
    }
    return e.flags |= Jn, e.lanes = s, e;
  }
  function q4(e, t, r, i, s) {
    if (r.flags |= Ml, Gr && Zu(e, s), i !== null && typeof i == "object" && typeof i.then == "function") {
      var u = i;
      I4(r), On() && r.mode & tt && n0();
      var f = dw(t);
      if (f !== null) {
        f.flags &= ~Pa, fw(f, t, r, e, s), f.mode & tt && cw(e, u, s), M4(f, e, u);
        return;
      } else {
        if (!i7(s)) {
          cw(e, u, s), ng();
          return;
        }
        var h = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        i = h;
      }
    } else if (On() && r.mode & tt) {
      n0();
      var m = dw(t);
      if (m !== null) {
        (m.flags & Jn) === De && (m.flags |= Pa), fw(m, t, r, e, s), vv($o(i, r));
        return;
      }
    }
    i = $o(i, r), vE(i);
    var E = t;
    do {
      switch (E.tag) {
        case _: {
          var T = i;
          E.flags |= Jn;
          var q = Vl(s);
          E.lanes = Ye(E.lanes, q);
          var I = uw(E, T, q);
          Ev(E, I);
          return;
        }
        case C:
          var B = i, j = E.type, W = E.stateNode;
          if ((E.flags & vt) === De && (typeof j.getDerivedStateFromError == "function" || W !== null && typeof W.componentDidCatch == "function" && !dC(W))) {
            E.flags |= Jn;
            var ge = Vl(s);
            E.lanes = Ye(E.lanes, ge);
            var ke = _m(E, B, ge);
            Ev(E, ke);
            return;
          }
          break;
      }
      E = E.return;
    } while (E !== null);
  }
  function z4() {
    return null;
  }
  var Iu = o.ReactCurrentOwner, ea = !1, xm, qu, Em, Rm, km, Do, Tm, uf;
  xm = {}, qu = {}, Em = {}, Rm = {}, km = {}, Do = !1, Tm = {}, uf = {};
  function er(e, t, r, i) {
    e === null ? t.child = D0(t, null, r, i) : t.child = ks(t, e.child, r, i);
  }
  function N4(e, t, r, i) {
    t.child = ks(t, e.child, null, i), t.child = ks(t, null, r, i);
  }
  function pw(e, t, r, i, s) {
    if (t.type !== t.elementType) {
      var u = r.propTypes;
      u && Wr(
        u,
        i,
        // Resolved props
        "prop",
        pt(r)
      );
    }
    var f = r.render, h = t.ref, m, E;
    Rs(t, s), ql(t);
    {
      if (Iu.current = t, yr(!0), m = Ls(e, t, f, i, h, s), E = Ms(), t.mode & sn) {
        Rn(!0);
        try {
          m = Ls(e, t, f, i, h, s), E = Ms();
        } finally {
          Rn(!1);
        }
      }
      yr(!1);
    }
    return os(), e !== null && !ea ? (I0(e, t, s), Qa(e, t, s)) : (On() && E && uv(t), t.flags |= rs, er(e, t, m, s), t.child);
  }
  function hw(e, t, r, i, s) {
    if (e === null) {
      var u = r.type;
      if (HE(u) && r.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      r.defaultProps === void 0) {
        var f = u;
        return f = Vs(u), t.tag = P, t.type = f, Om(t, u), vw(e, t, f, i, s);
      }
      {
        var h = u.propTypes;
        h && Wr(
          h,
          i,
          // Resolved props
          "prop",
          pt(u)
        );
      }
      var m = pg(r.type, null, i, t, t.mode, s);
      return m.ref = t.ref, m.return = t, t.child = m, m;
    }
    {
      var E = r.type, T = E.propTypes;
      T && Wr(
        T,
        i,
        // Resolved props
        "prop",
        pt(E)
      );
    }
    var q = e.child, I = zm(e, s);
    if (!I) {
      var B = q.memoizedProps, j = r.compare;
      if (j = j !== null ? j : ru, j(B, i) && e.ref === t.ref)
        return Qa(e, t, s);
    }
    t.flags |= rs;
    var W = Io(q, i);
    return W.ref = t.ref, W.return = t, t.child = W, W;
  }
  function vw(e, t, r, i, s) {
    if (t.type !== t.elementType) {
      var u = t.elementType;
      if (u.$$typeof === Te) {
        var f = u, h = f._payload, m = f._init;
        try {
          u = m(h);
        } catch {
          u = null;
        }
        var E = u && u.propTypes;
        E && Wr(
          E,
          i,
          // Resolved (SimpleMemoComponent has no defaultProps)
          "prop",
          pt(u)
        );
      }
    }
    if (e !== null) {
      var T = e.memoizedProps;
      if (ru(T, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (ea = !1, t.pendingProps = i = T, zm(e, s))
          (e.flags & Hp) !== De && (ea = !0);
        else
          return t.lanes = e.lanes, Qa(e, t, s);
    }
    return $m(e, t, r, i, s);
  }
  function mw(e, t, r) {
    var i = t.pendingProps, s = i.children, u = e !== null ? e.memoizedState : null;
    if (i.mode === "hidden" || gt)
      if ((t.mode & tt) === Oe) {
        var f = {
          baseLanes: Q,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = f, Sf(t, r);
      } else if (wr(r, br)) {
        var q = {
          baseLanes: Q,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = q;
        var I = u !== null ? u.baseLanes : r;
        Sf(t, I);
      } else {
        var h = null, m;
        if (u !== null) {
          var E = u.baseLanes;
          m = Ye(E, r);
        } else
          m = r;
        t.lanes = t.childLanes = br;
        var T = {
          baseLanes: m,
          cachePool: h,
          transitions: null
        };
        return t.memoizedState = T, t.updateQueue = null, Sf(t, m), null;
      }
    else {
      var B;
      u !== null ? (B = Ye(u.baseLanes, r), t.memoizedState = null) : B = r, Sf(t, B);
    }
    return er(e, t, s, r), t.child;
  }
  function P4(e, t, r) {
    var i = t.pendingProps;
    return er(e, t, i, r), t.child;
  }
  function U4(e, t, r) {
    var i = t.pendingProps.children;
    return er(e, t, i, r), t.child;
  }
  function F4(e, t, r) {
    {
      t.flags |= it;
      {
        var i = t.stateNode;
        i.effectDuration = 0, i.passiveEffectDuration = 0;
      }
    }
    var s = t.pendingProps, u = s.children;
    return er(e, t, u, r), t.child;
  }
  function gw(e, t) {
    var r = t.ref;
    (e === null && r !== null || e !== null && e.ref !== r) && (t.flags |= Si, t.flags |= Bp);
  }
  function $m(e, t, r, i, s) {
    if (t.type !== t.elementType) {
      var u = r.propTypes;
      u && Wr(
        u,
        i,
        // Resolved props
        "prop",
        pt(r)
      );
    }
    var f;
    {
      var h = ws(t, r, !0);
      f = Cs(t, h);
    }
    var m, E;
    Rs(t, s), ql(t);
    {
      if (Iu.current = t, yr(!0), m = Ls(e, t, r, i, f, s), E = Ms(), t.mode & sn) {
        Rn(!0);
        try {
          m = Ls(e, t, r, i, f, s), E = Ms();
        } finally {
          Rn(!1);
        }
      }
      yr(!1);
    }
    return os(), e !== null && !ea ? (I0(e, t, s), Qa(e, t, s)) : (On() && E && uv(t), t.flags |= rs, er(e, t, m, s), t.child);
  }
  function yw(e, t, r, i, s) {
    {
      switch (aR(t)) {
        case !1: {
          var u = t.stateNode, f = t.type, h = new f(t.memoizedProps, u.context), m = h.state;
          u.updater.enqueueSetState(u, m, null);
          break;
        }
        case !0: {
          t.flags |= vt, t.flags |= Jn;
          var E = new Error("Simulated error coming from DevTools"), T = Vl(s);
          t.lanes = Ye(t.lanes, T);
          var q = _m(t, $o(E, t), T);
          Ev(t, q);
          break;
        }
      }
      if (t.type !== t.elementType) {
        var I = r.propTypes;
        I && Wr(
          I,
          i,
          // Resolved props
          "prop",
          pt(r)
        );
      }
    }
    var B;
    ya(r) ? (B = !0, wd(t)) : B = !1, Rs(t, s);
    var j = t.stateNode, W;
    j === null ? (df(e, t), E0(t, r, i), zv(t, r, i, s), W = !0) : e === null ? W = p4(t, r, i, s) : W = h4(e, t, r, i, s);
    var ge = Dm(e, t, r, W, B, s);
    {
      var ke = t.stateNode;
      W && ke.props !== i && (Do || d("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", He(t) || "a component"), Do = !0);
    }
    return ge;
  }
  function Dm(e, t, r, i, s, u) {
    gw(e, t);
    var f = (t.flags & vt) !== De;
    if (!i && !f)
      return s && Qb(t, r, !1), Qa(e, t, u);
    var h = t.stateNode;
    Iu.current = t;
    var m;
    if (f && typeof r.getDerivedStateFromError != "function")
      m = null, lw();
    else {
      ql(t);
      {
        if (yr(!0), m = h.render(), t.mode & sn) {
          Rn(!0);
          try {
            h.render();
          } finally {
            Rn(!1);
          }
        }
        yr(!1);
      }
      os();
    }
    return t.flags |= rs, e !== null && f ? N4(e, t, m, u) : er(e, t, m, u), t.memoizedState = h.state, s && Qb(t, r, !0), t.child;
  }
  function bw(e) {
    var t = e.stateNode;
    t.pendingContext ? Zb(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Zb(e, t.context, !1), Hv(e, t.containerInfo);
  }
  function V4(e, t, r) {
    if (bw(t), e === null)
      throw new Error("Should have a current fiber. This is a bug in React.");
    var i = t.pendingProps, s = t.memoizedState, u = s.element;
    g0(e, t), Id(t, i, null, r);
    var f = t.memoizedState;
    t.stateNode;
    var h = f.element;
    if (s.isDehydrated) {
      var m = {
        element: h,
        isDehydrated: !1,
        cache: f.cache,
        pendingSuspenseBoundaries: f.pendingSuspenseBoundaries,
        transitions: f.transitions
      }, E = t.updateQueue;
      if (E.baseState = m, t.memoizedState = m, t.flags & Pa) {
        var T = $o(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
        return ww(e, t, h, r, T);
      } else if (h !== u) {
        var q = $o(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return ww(e, t, h, r, q);
      } else {
        G_(t);
        var I = D0(t, null, h, r);
        t.child = I;
        for (var B = I; B; )
          B.flags = B.flags & ~on | Ua, B = B.sibling;
      }
    } else {
      if (xs(), h === u)
        return Qa(e, t, r);
      er(e, t, h, r);
    }
    return t.child;
  }
  function ww(e, t, r, i, s) {
    return xs(), vv(s), t.flags |= Pa, er(e, t, r, i), t.child;
  }
  function H4(e, t, r) {
    A0(t), e === null && hv(t);
    var i = t.type, s = t.pendingProps, u = e !== null ? e.memoizedProps : null, f = s.children, h = Kh(i, s);
    return h ? f = null : u !== null && Kh(i, u) && (t.flags |= Ll), gw(e, t), er(e, t, f, r), t.child;
  }
  function B4(e, t) {
    return e === null && hv(t), null;
  }
  function j4(e, t, r, i) {
    df(e, t);
    var s = t.pendingProps, u = r, f = u._payload, h = u._init, m = h(f);
    t.type = m;
    var E = t.tag = BE(m), T = Xr(m, s), q;
    switch (E) {
      case y:
        return Om(t, m), t.type = m = Vs(m), q = $m(null, t, m, T, i), q;
      case C:
        return t.type = m = sg(m), q = yw(null, t, m, T, i), q;
      case M:
        return t.type = m = lg(m), q = pw(null, t, m, T, i), q;
      case N: {
        if (t.type !== t.elementType) {
          var I = m.propTypes;
          I && Wr(
            I,
            T,
            // Resolved for outer only
            "prop",
            pt(m)
          );
        }
        return q = hw(
          null,
          t,
          m,
          Xr(m.type, T),
          // The inner type can have defaults too
          i
        ), q;
      }
    }
    var B = "";
    throw m !== null && typeof m == "object" && m.$$typeof === Te && (B = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + m + ". " + ("Lazy element type must resolve to a class or function." + B));
  }
  function G4(e, t, r, i, s) {
    df(e, t), t.tag = C;
    var u;
    return ya(r) ? (u = !0, wd(t)) : u = !1, Rs(t, s), E0(t, r, i), zv(t, r, i, s), Dm(null, t, r, !0, u, s);
  }
  function Y4(e, t, r, i) {
    df(e, t);
    var s = t.pendingProps, u;
    {
      var f = ws(t, r, !1);
      u = Cs(t, f);
    }
    Rs(t, i);
    var h, m;
    ql(t);
    {
      if (r.prototype && typeof r.prototype.render == "function") {
        var E = pt(r) || "Unknown";
        xm[E] || (d("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", E, E), xm[E] = !0);
      }
      t.mode & sn && Zr.recordLegacyContextWarning(t, null), yr(!0), Iu.current = t, h = Ls(null, t, r, s, u, i), m = Ms(), yr(!1);
    }
    if (os(), t.flags |= rs, typeof h == "object" && h !== null && typeof h.render == "function" && h.$$typeof === void 0) {
      var T = pt(r) || "Unknown";
      qu[T] || (d("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", T, T, T), qu[T] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof h == "object" && h !== null && typeof h.render == "function" && h.$$typeof === void 0
    ) {
      {
        var q = pt(r) || "Unknown";
        qu[q] || (d("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", q, q, q), qu[q] = !0);
      }
      t.tag = C, t.memoizedState = null, t.updateQueue = null;
      var I = !1;
      return ya(r) ? (I = !0, wd(t)) : I = !1, t.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, xv(t), x0(t, h), zv(t, r, s, i), Dm(null, t, r, !0, I, i);
    } else {
      if (t.tag = y, t.mode & sn) {
        Rn(!0);
        try {
          h = Ls(null, t, r, s, u, i), m = Ms();
        } finally {
          Rn(!1);
        }
      }
      return On() && m && uv(t), er(null, t, h, i), Om(t, r), t.child;
    }
  }
  function Om(e, t) {
    {
      if (t && t.childContextTypes && d("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
        var r = "", i = yi();
        i && (r += `

Check the render method of \`` + i + "`.");
        var s = i || "", u = e._debugSource;
        u && (s = u.fileName + ":" + u.lineNumber), km[s] || (km[s] = !0, d("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", r));
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var f = pt(t) || "Unknown";
        Rm[f] || (d("%s: Function components do not support getDerivedStateFromProps.", f), Rm[f] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var h = pt(t) || "Unknown";
        Em[h] || (d("%s: Function components do not support contextType.", h), Em[h] = !0);
      }
    }
  }
  var Am = {
    dehydrated: null,
    treeContext: null,
    retryLane: kn
  };
  function Lm(e) {
    return {
      baseLanes: e,
      cachePool: z4(),
      transitions: null
    };
  }
  function W4(e, t) {
    var r = null;
    return {
      baseLanes: Ye(e.baseLanes, t),
      cachePool: r,
      transitions: e.transitions
    };
  }
  function K4(e, t, r, i) {
    if (t !== null) {
      var s = t.memoizedState;
      if (s === null)
        return !1;
    }
    return Gv(e, ku);
  }
  function Z4(e, t) {
    return Hc(e.childLanes, t);
  }
  function Cw(e, t, r) {
    var i = t.pendingProps;
    iR(t) && (t.flags |= vt);
    var s = Qr.current, u = !1, f = (t.flags & vt) !== De;
    if (f || K4(s, e) ? (u = !0, t.flags &= ~vt) : (e === null || e.memoizedState !== null) && (s = y4(s, M0)), s = $s(s), qi(t, s), e === null) {
      hv(t);
      var h = t.memoizedState;
      if (h !== null) {
        var m = h.dehydrated;
        if (m !== null)
          return tx(t, m);
      }
      var E = i.children, T = i.fallback;
      if (u) {
        var q = X4(t, E, T, r), I = t.child;
        return I.memoizedState = Lm(r), t.memoizedState = Am, q;
      } else
        return Mm(t, E);
    } else {
      var B = e.memoizedState;
      if (B !== null) {
        var j = B.dehydrated;
        if (j !== null)
          return nx(e, t, f, i, j, B, r);
      }
      if (u) {
        var W = i.fallback, ge = i.children, ke = J4(e, t, ge, W, r), xe = t.child, rt = e.child.memoizedState;
        return xe.memoizedState = rt === null ? Lm(r) : W4(rt, r), xe.childLanes = Z4(e, r), t.memoizedState = Am, ke;
      } else {
        var Ke = i.children, U = Q4(e, t, Ke, r);
        return t.memoizedState = null, U;
      }
    }
  }
  function Mm(e, t, r) {
    var i = e.mode, s = {
      mode: "visible",
      children: t
    }, u = Im(s, i);
    return u.return = e, e.child = u, u;
  }
  function X4(e, t, r, i) {
    var s = e.mode, u = e.child, f = {
      mode: "hidden",
      children: t
    }, h, m;
    return (s & tt) === Oe && u !== null ? (h = u, h.childLanes = Q, h.pendingProps = f, e.mode & St && (h.actualDuration = 0, h.actualStartTime = -1, h.selfBaseDuration = 0, h.treeBaseDuration = 0), m = Bi(r, s, i, null)) : (h = Im(f, s), m = Bi(r, s, i, null)), h.return = e, m.return = e, h.sibling = m, e.child = h, m;
  }
  function Im(e, t, r) {
    return SC(e, t, Q, null);
  }
  function Sw(e, t) {
    return Io(e, t);
  }
  function Q4(e, t, r, i) {
    var s = e.child, u = s.sibling, f = Sw(s, {
      mode: "visible",
      children: r
    });
    if ((t.mode & tt) === Oe && (f.lanes = i), f.return = t, f.sibling = null, u !== null) {
      var h = t.deletions;
      h === null ? (t.deletions = [u], t.flags |= so) : h.push(u);
    }
    return t.child = f, f;
  }
  function J4(e, t, r, i, s) {
    var u = t.mode, f = e.child, h = f.sibling, m = {
      mode: "hidden",
      children: r
    }, E;
    if (
      // In legacy mode, we commit the primary tree as if it successfully
      // completed, even though it's in an inconsistent state.
      (u & tt) === Oe && // Make sure we're on the second pass, i.e. the primary child fragment was
      // already cloned. In legacy mode, the only case where this isn't true is
      // when DevTools forces us to display a fallback; we skip the first render
      // pass entirely and go straight to rendering the fallback. (In Concurrent
      // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
      // only codepath.)
      t.child !== f
    ) {
      var T = t.child;
      E = T, E.childLanes = Q, E.pendingProps = m, t.mode & St && (E.actualDuration = 0, E.actualStartTime = -1, E.selfBaseDuration = f.selfBaseDuration, E.treeBaseDuration = f.treeBaseDuration), t.deletions = null;
    } else
      E = Sw(f, m), E.subtreeFlags = f.subtreeFlags & Va;
    var q;
    return h !== null ? q = Io(h, i) : (q = Bi(i, u, s, null), q.flags |= on), q.return = t, E.return = t, E.sibling = q, t.child = E, q;
  }
  function cf(e, t, r, i) {
    i !== null && vv(i), ks(t, e.child, null, r);
    var s = t.pendingProps, u = s.children, f = Mm(t, u);
    return f.flags |= on, t.memoizedState = null, f;
  }
  function ex(e, t, r, i, s) {
    var u = t.mode, f = {
      mode: "visible",
      children: r
    }, h = Im(f, u), m = Bi(i, u, s, null);
    return m.flags |= on, h.return = t, m.return = t, h.sibling = m, t.child = h, (t.mode & tt) !== Oe && ks(t, e.child, null, s), m;
  }
  function tx(e, t, r) {
    return (e.mode & tt) === Oe ? (d("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = qe) : Jh(t) ? e.lanes = ho : e.lanes = br, null;
  }
  function nx(e, t, r, i, s, u, f) {
    if (r)
      if (t.flags & Pa) {
        t.flags &= ~Pa;
        var U = Cm(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return cf(e, t, f, U);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= vt, null;
        var K = i.children, F = i.fallback, ne = ex(e, t, K, F, f), ye = t.child;
        return ye.memoizedState = Lm(f), t.memoizedState = Am, ne;
      }
    else {
      if (B_(), (t.mode & tt) === Oe)
        return cf(
          e,
          t,
          f,
          // TODO: When we delete legacy mode, we should make this error argument
          // required — every concurrent mode path that causes hydration to
          // de-opt to client rendering should have an error message.
          null
        );
      if (Jh(s)) {
        var h, m, E;
        {
          var T = s_(s);
          h = T.digest, m = T.message, E = T.stack;
        }
        var q;
        m ? q = new Error(m) : q = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var I = Cm(q, h, E);
        return cf(e, t, f, I);
      }
      var B = wr(f, e.childLanes);
      if (ea || B) {
        var j = Cf();
        if (j !== null) {
          var W = p7(j, f);
          if (W !== kn && W !== u.retryLane) {
            u.retryLane = W;
            var ge = Nt;
            fr(e, W), Cn(j, e, W, ge);
          }
        }
        ng();
        var ke = Cm(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return cf(e, t, f, ke);
      } else if (Bb(s)) {
        t.flags |= vt, t.child = e.child;
        var xe = kE.bind(null, e);
        return l_(s, xe), null;
      } else {
        Y_(t, s, u.treeContext);
        var rt = i.children, Ke = Mm(t, rt);
        return Ke.flags |= Ua, Ke;
      }
    }
  }
  function _w(e, t, r) {
    e.lanes = Ye(e.lanes, t);
    var i = e.alternate;
    i !== null && (i.lanes = Ye(i.lanes, t)), wv(e.return, t, r);
  }
  function rx(e, t, r) {
    for (var i = t; i !== null; ) {
      if (i.tag === H) {
        var s = i.memoizedState;
        s !== null && _w(i, r, e);
      } else if (i.tag === ae)
        _w(i, r, e);
      else if (i.child !== null) {
        i.child.return = i, i = i.child;
        continue;
      }
      if (i === e)
        return;
      for (; i.sibling === null; ) {
        if (i.return === null || i.return === e)
          return;
        i = i.return;
      }
      i.sibling.return = i.return, i = i.sibling;
    }
  }
  function ax(e) {
    for (var t = e, r = null; t !== null; ) {
      var i = t.alternate;
      i !== null && Vd(i) === null && (r = t), t = t.sibling;
    }
    return r;
  }
  function ix(e) {
    if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !Tm[e])
      if (Tm[e] = !0, typeof e == "string")
        switch (e.toLowerCase()) {
          case "together":
          case "forwards":
          case "backwards": {
            d('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
            break;
          }
          case "forward":
          case "backward": {
            d('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
            break;
          }
          default:
            d('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
            break;
        }
      else
        d('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
  }
  function ox(e, t) {
    e !== void 0 && !uf[e] && (e !== "collapsed" && e !== "hidden" ? (uf[e] = !0, d('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (uf[e] = !0, d('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
  }
  function xw(e, t) {
    {
      var r = ht(e), i = !r && typeof La(e) == "function";
      if (r || i) {
        var s = r ? "array" : "iterable";
        return d("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", s, t, s), !1;
      }
    }
    return !0;
  }
  function sx(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if (ht(e)) {
        for (var r = 0; r < e.length; r++)
          if (!xw(e[r], r))
            return;
      } else {
        var i = La(e);
        if (typeof i == "function") {
          var s = i.call(e);
          if (s)
            for (var u = s.next(), f = 0; !u.done; u = s.next()) {
              if (!xw(u.value, f))
                return;
              f++;
            }
        } else
          d('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
      }
  }
  function qm(e, t, r, i, s) {
    var u = e.memoizedState;
    u === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: r,
      tailMode: s
    } : (u.isBackwards = t, u.rendering = null, u.renderingStartTime = 0, u.last = i, u.tail = r, u.tailMode = s);
  }
  function Ew(e, t, r) {
    var i = t.pendingProps, s = i.revealOrder, u = i.tail, f = i.children;
    ix(s), ox(u, s), sx(f, s), er(e, t, f, r);
    var h = Qr.current, m = Gv(h, ku);
    if (m)
      h = Yv(h, ku), t.flags |= vt;
    else {
      var E = e !== null && (e.flags & vt) !== De;
      E && rx(t, t.child, r), h = $s(h);
    }
    if (qi(t, h), (t.mode & tt) === Oe)
      t.memoizedState = null;
    else
      switch (s) {
        case "forwards": {
          var T = ax(t.child), q;
          T === null ? (q = t.child, t.child = null) : (q = T.sibling, T.sibling = null), qm(
            t,
            !1,
            // isBackwards
            q,
            T,
            u
          );
          break;
        }
        case "backwards": {
          var I = null, B = t.child;
          for (t.child = null; B !== null; ) {
            var j = B.alternate;
            if (j !== null && Vd(j) === null) {
              t.child = B;
              break;
            }
            var W = B.sibling;
            B.sibling = I, I = B, B = W;
          }
          qm(
            t,
            !0,
            // isBackwards
            I,
            null,
            // last
            u
          );
          break;
        }
        case "together": {
          qm(
            t,
            !1,
            // isBackwards
            null,
            // tail
            null,
            // last
            void 0
          );
          break;
        }
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function lx(e, t, r) {
    Hv(t, t.stateNode.containerInfo);
    var i = t.pendingProps;
    return e === null ? t.child = ks(t, null, i, r) : er(e, t, i, r), t.child;
  }
  var Rw = !1;
  function ux(e, t, r) {
    var i = t.type, s = i._context, u = t.pendingProps, f = t.memoizedProps, h = u.value;
    {
      "value" in u || Rw || (Rw = !0, d("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var m = t.type.propTypes;
      m && Wr(m, u, "prop", "Context.Provider");
    }
    if (p0(t, s, h), f !== null) {
      var E = f.value;
      if (_r(E, h)) {
        if (f.children === u.children && !yd())
          return Qa(e, t, r);
      } else
        r4(t, s, r);
    }
    var T = u.children;
    return er(e, t, T, r), t.child;
  }
  var kw = !1;
  function cx(e, t, r) {
    var i = t.type;
    i._context === void 0 ? i !== i.Consumer && (kw || (kw = !0, d("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
    var s = t.pendingProps, u = s.children;
    typeof u != "function" && d("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Rs(t, r);
    var f = ln(i);
    ql(t);
    var h;
    return Iu.current = t, yr(!0), h = u(f), yr(!1), os(), t.flags |= rs, er(e, t, h, r), t.child;
  }
  function zu() {
    ea = !0;
  }
  function df(e, t) {
    (t.mode & tt) === Oe && e !== null && (e.alternate = null, t.alternate = null, t.flags |= on);
  }
  function Qa(e, t, r) {
    return e !== null && (t.dependencies = e.dependencies), lw(), Ku(t.lanes), wr(r, t.childLanes) ? (v4(e, t), t.child) : null;
  }
  function dx(e, t, r) {
    {
      var i = t.return;
      if (i === null)
        throw new Error("Cannot swap the root fiber.");
      if (e.alternate = null, t.alternate = null, r.index = t.index, r.sibling = t.sibling, r.return = t.return, r.ref = t.ref, t === i.child)
        i.child = r;
      else {
        var s = i.child;
        if (s === null)
          throw new Error("Expected parent to have a child.");
        for (; s.sibling !== t; )
          if (s = s.sibling, s === null)
            throw new Error("Expected to find the previous sibling.");
        s.sibling = r;
      }
      var u = i.deletions;
      return u === null ? (i.deletions = [e], i.flags |= so) : u.push(e), r.flags |= on, r;
    }
  }
  function zm(e, t) {
    var r = e.lanes;
    return !!wr(r, t);
  }
  function fx(e, t, r) {
    switch (t.tag) {
      case _:
        bw(t), t.stateNode, xs();
        break;
      case S:
        A0(t);
        break;
      case C: {
        var i = t.type;
        ya(i) && wd(t);
        break;
      }
      case R:
        Hv(t, t.stateNode.containerInfo);
        break;
      case L: {
        var s = t.memoizedProps.value, u = t.type._context;
        p0(t, u, s);
        break;
      }
      case V:
        {
          var f = wr(r, t.childLanes);
          f && (t.flags |= it);
          {
            var h = t.stateNode;
            h.effectDuration = 0, h.passiveEffectDuration = 0;
          }
        }
        break;
      case H: {
        var m = t.memoizedState;
        if (m !== null) {
          if (m.dehydrated !== null)
            return qi(t, $s(Qr.current)), t.flags |= vt, null;
          var E = t.child, T = E.childLanes;
          if (wr(r, T))
            return Cw(e, t, r);
          qi(t, $s(Qr.current));
          var q = Qa(e, t, r);
          return q !== null ? q.sibling : null;
        } else
          qi(t, $s(Qr.current));
        break;
      }
      case ae: {
        var I = (e.flags & vt) !== De, B = wr(r, t.childLanes);
        if (I) {
          if (B)
            return Ew(e, t, r);
          t.flags |= vt;
        }
        var j = t.memoizedState;
        if (j !== null && (j.rendering = null, j.tail = null, j.lastEffect = null), qi(t, Qr.current), B)
          break;
        return null;
      }
      case re:
      case oe:
        return t.lanes = Q, mw(e, t, r);
    }
    return Qa(e, t, r);
  }
  function Tw(e, t, r) {
    if (t._debugNeedsRemount && e !== null)
      return dx(e, t, pg(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
    if (e !== null) {
      var i = e.memoizedProps, s = t.pendingProps;
      if (i !== s || yd() || // Force a re-render if the implementation changed due to hot reload:
      t.type !== e.type)
        ea = !0;
      else {
        var u = zm(e, r);
        if (!u && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & vt) === De)
          return ea = !1, fx(e, t, r);
        (e.flags & Hp) !== De ? ea = !0 : ea = !1;
      }
    } else if (ea = !1, On() && N_(t)) {
      var f = t.index, h = P_();
      t0(t, h, f);
    }
    switch (t.lanes = Q, t.tag) {
      case $:
        return Y4(e, t, t.type, r);
      case J: {
        var m = t.elementType;
        return j4(e, t, m, r);
      }
      case y: {
        var E = t.type, T = t.pendingProps, q = t.elementType === E ? T : Xr(E, T);
        return $m(e, t, E, q, r);
      }
      case C: {
        var I = t.type, B = t.pendingProps, j = t.elementType === I ? B : Xr(I, B);
        return yw(e, t, I, j, r);
      }
      case _:
        return V4(e, t, r);
      case S:
        return H4(e, t, r);
      case k:
        return B4(e, t);
      case H:
        return Cw(e, t, r);
      case R:
        return lx(e, t, r);
      case M: {
        var W = t.type, ge = t.pendingProps, ke = t.elementType === W ? ge : Xr(W, ge);
        return pw(e, t, W, ke, r);
      }
      case x:
        return P4(e, t, r);
      case D:
        return U4(e, t, r);
      case V:
        return F4(e, t, r);
      case L:
        return ux(e, t, r);
      case z:
        return cx(e, t, r);
      case N: {
        var xe = t.type, rt = t.pendingProps, Ke = Xr(xe, rt);
        if (t.type !== t.elementType) {
          var U = xe.propTypes;
          U && Wr(
            U,
            Ke,
            // Resolved for outer only
            "prop",
            pt(xe)
          );
        }
        return Ke = Xr(xe.type, Ke), hw(e, t, xe, Ke, r);
      }
      case P:
        return vw(e, t, t.type, t.pendingProps, r);
      case me: {
        var K = t.type, F = t.pendingProps, ne = t.elementType === K ? F : Xr(K, F);
        return G4(e, t, K, ne, r);
      }
      case ae:
        return Ew(e, t, r);
      case de:
        break;
      case re:
        return mw(e, t, r);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function Is(e) {
    e.flags |= it;
  }
  function $w(e) {
    e.flags |= Si, e.flags |= Bp;
  }
  var Dw, Nm, Ow, Aw;
  Dw = function(e, t, r, i) {
    for (var s = t.child; s !== null; ) {
      if (s.tag === S || s.tag === k)
        I9(e, s.stateNode);
      else if (s.tag !== R) {
        if (s.child !== null) {
          s.child.return = s, s = s.child;
          continue;
        }
      }
      if (s === t)
        return;
      for (; s.sibling === null; ) {
        if (s.return === null || s.return === t)
          return;
        s = s.return;
      }
      s.sibling.return = s.return, s = s.sibling;
    }
  }, Nm = function(e, t) {
  }, Ow = function(e, t, r, i, s) {
    var u = e.memoizedProps;
    if (u !== i) {
      var f = t.stateNode, h = Bv(), m = z9(f, r, u, i, s, h);
      t.updateQueue = m, m && Is(t);
    }
  }, Aw = function(e, t, r, i) {
    r !== i && Is(t);
  };
  function Nu(e, t) {
    if (!On())
      switch (e.tailMode) {
        case "hidden": {
          for (var r = e.tail, i = null; r !== null; )
            r.alternate !== null && (i = r), r = r.sibling;
          i === null ? e.tail = null : i.sibling = null;
          break;
        }
        case "collapsed": {
          for (var s = e.tail, u = null; s !== null; )
            s.alternate !== null && (u = s), s = s.sibling;
          u === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : u.sibling = null;
          break;
        }
      }
  }
  function Ln(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, r = Q, i = De;
    if (t) {
      if ((e.mode & St) !== Oe) {
        for (var m = e.selfBaseDuration, E = e.child; E !== null; )
          r = Ye(r, Ye(E.lanes, E.childLanes)), i |= E.subtreeFlags & Va, i |= E.flags & Va, m += E.treeBaseDuration, E = E.sibling;
        e.treeBaseDuration = m;
      } else
        for (var T = e.child; T !== null; )
          r = Ye(r, Ye(T.lanes, T.childLanes)), i |= T.subtreeFlags & Va, i |= T.flags & Va, T.return = e, T = T.sibling;
      e.subtreeFlags |= i;
    } else {
      if ((e.mode & St) !== Oe) {
        for (var s = e.actualDuration, u = e.selfBaseDuration, f = e.child; f !== null; )
          r = Ye(r, Ye(f.lanes, f.childLanes)), i |= f.subtreeFlags, i |= f.flags, s += f.actualDuration, u += f.treeBaseDuration, f = f.sibling;
        e.actualDuration = s, e.treeBaseDuration = u;
      } else
        for (var h = e.child; h !== null; )
          r = Ye(r, Ye(h.lanes, h.childLanes)), i |= h.subtreeFlags, i |= h.flags, h.return = e, h = h.sibling;
      e.subtreeFlags |= i;
    }
    return e.childLanes = r, t;
  }
  function px(e, t, r) {
    if (Q_() && (t.mode & tt) !== Oe && (t.flags & vt) === De)
      return l0(t), xs(), t.flags |= Pa | Ml | Jn, !1;
    var i = Ed(t);
    if (r !== null && r.dehydrated !== null)
      if (e === null) {
        if (!i)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (Z_(t), Ln(t), (t.mode & St) !== Oe) {
          var s = r !== null;
          if (s) {
            var u = t.child;
            u !== null && (t.treeBaseDuration -= u.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (xs(), (t.flags & vt) === De && (t.memoizedState = null), t.flags |= it, Ln(t), (t.mode & St) !== Oe) {
          var f = r !== null;
          if (f) {
            var h = t.child;
            h !== null && (t.treeBaseDuration -= h.treeBaseDuration);
          }
        }
        return !1;
      }
    else
      return u0(), !0;
  }
  function Lw(e, t, r) {
    var i = t.pendingProps;
    switch (cv(t), t.tag) {
      case $:
      case J:
      case P:
      case y:
      case M:
      case x:
      case D:
      case V:
      case z:
      case N:
        return Ln(t), null;
      case C: {
        var s = t.type;
        return ya(s) && bd(t), Ln(t), null;
      }
      case _: {
        var u = t.stateNode;
        if (Ts(t), ov(t), Kv(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), e === null || e.child === null) {
          var f = Ed(t);
          if (f)
            Is(t);
          else if (e !== null) {
            var h = e.memoizedState;
            // Check if this is a client root
            (!h.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & Pa) !== De) && (t.flags |= lo, u0());
          }
        }
        return Nm(e, t), Ln(t), null;
      }
      case S: {
        jv(t);
        var m = O0(), E = t.type;
        if (e !== null && t.stateNode != null)
          Ow(e, t, E, i, m), e.ref !== t.ref && $w(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return Ln(t), null;
          }
          var T = Bv(), q = Ed(t);
          if (q)
            W_(t, m, T) && Is(t);
          else {
            var I = M9(E, i, m, T, t);
            Dw(I, t, !1, !1), t.stateNode = I, q9(I, E, i, m) && Is(t);
          }
          t.ref !== null && $w(t);
        }
        return Ln(t), null;
      }
      case k: {
        var B = i;
        if (e && t.stateNode != null) {
          var j = e.memoizedProps;
          Aw(e, t, j, B);
        } else {
          if (typeof B != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var W = O0(), ge = Bv(), ke = Ed(t);
          ke ? K_(t) && Is(t) : t.stateNode = N9(B, W, ge, t);
        }
        return Ln(t), null;
      }
      case H: {
        Ds(t);
        var xe = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var rt = px(e, t, xe);
          if (!rt)
            return t.flags & Jn ? t : null;
        }
        if ((t.flags & vt) !== De)
          return t.lanes = r, (t.mode & St) !== Oe && wm(t), t;
        var Ke = xe !== null, U = e !== null && e.memoizedState !== null;
        if (Ke !== U && Ke) {
          var K = t.child;
          if (K.flags |= uo, (t.mode & tt) !== Oe) {
            var F = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !Et);
            F || Gv(Qr.current, M0) ? hE() : ng();
          }
        }
        var ne = t.updateQueue;
        if (ne !== null && (t.flags |= it), Ln(t), (t.mode & St) !== Oe && Ke) {
          var ye = t.child;
          ye !== null && (t.treeBaseDuration -= ye.treeBaseDuration);
        }
        return null;
      }
      case R:
        return Ts(t), Nm(e, t), e === null && O_(t.stateNode.containerInfo), Ln(t), null;
      case L:
        var fe = t.type._context;
        return bv(fe, t), Ln(t), null;
      case me: {
        var Me = t.type;
        return ya(Me) && bd(t), Ln(t), null;
      }
      case ae: {
        Ds(t);
        var Pe = t.memoizedState;
        if (Pe === null)
          return Ln(t), null;
        var xt = (t.flags & vt) !== De, ut = Pe.rendering;
        if (ut === null)
          if (xt)
            Nu(Pe, !1);
          else {
            var en = mE() && (e === null || (e.flags & vt) === De);
            if (!en)
              for (var ct = t.child; ct !== null; ) {
                var Qt = Vd(ct);
                if (Qt !== null) {
                  xt = !0, t.flags |= vt, Nu(Pe, !1);
                  var Zn = Qt.updateQueue;
                  return Zn !== null && (t.updateQueue = Zn, t.flags |= it), t.subtreeFlags = De, m4(t, r), qi(t, Yv(Qr.current, ku)), t.child;
                }
                ct = ct.sibling;
              }
            Pe.tail !== null && En() > eC() && (t.flags |= vt, xt = !0, Nu(Pe, !1), t.lanes = O1);
          }
        else {
          if (!xt) {
            var Nn = Vd(ut);
            if (Nn !== null) {
              t.flags |= vt, xt = !0;
              var Rr = Nn.updateQueue;
              if (Rr !== null && (t.updateQueue = Rr, t.flags |= it), Nu(Pe, !0), Pe.tail === null && Pe.tailMode === "hidden" && !ut.alternate && !On())
                return Ln(t), null;
            } else
              // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              En() * 2 - Pe.renderingStartTime > eC() && r !== br && (t.flags |= vt, xt = !0, Nu(Pe, !1), t.lanes = O1);
          }
          if (Pe.isBackwards)
            ut.sibling = t.child, t.child = ut;
          else {
            var rr = Pe.last;
            rr !== null ? rr.sibling = ut : t.child = ut, Pe.last = ut;
          }
        }
        if (Pe.tail !== null) {
          var ar = Pe.tail;
          Pe.rendering = ar, Pe.tail = ar.sibling, Pe.renderingStartTime = En(), ar.sibling = null;
          var Xn = Qr.current;
          return xt ? Xn = Yv(Xn, ku) : Xn = $s(Xn), qi(t, Xn), ar;
        }
        return Ln(t), null;
      }
      case de:
        break;
      case re:
      case oe: {
        tg(t);
        var ri = t.memoizedState, Hs = ri !== null;
        if (e !== null) {
          var ec = e.memoizedState, Ra = ec !== null;
          Ra !== Hs && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !gt && (t.flags |= uo);
        }
        return !Hs || (t.mode & tt) === Oe ? Ln(t) : wr(Ea, br) && (Ln(t), t.subtreeFlags & (on | it) && (t.flags |= uo)), null;
      }
      case pe:
        return null;
      case se:
        return null;
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function hx(e, t, r) {
    switch (cv(t), t.tag) {
      case C: {
        var i = t.type;
        ya(i) && bd(t);
        var s = t.flags;
        return s & Jn ? (t.flags = s & ~Jn | vt, (t.mode & St) !== Oe && wm(t), t) : null;
      }
      case _: {
        t.stateNode, Ts(t), ov(t), Kv();
        var u = t.flags;
        return (u & Jn) !== De && (u & vt) === De ? (t.flags = u & ~Jn | vt, t) : null;
      }
      case S:
        return jv(t), null;
      case H: {
        Ds(t);
        var f = t.memoizedState;
        if (f !== null && f.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          xs();
        }
        var h = t.flags;
        return h & Jn ? (t.flags = h & ~Jn | vt, (t.mode & St) !== Oe && wm(t), t) : null;
      }
      case ae:
        return Ds(t), null;
      case R:
        return Ts(t), null;
      case L:
        var m = t.type._context;
        return bv(m, t), null;
      case re:
      case oe:
        return tg(t), null;
      case pe:
        return null;
      default:
        return null;
    }
  }
  function Mw(e, t, r) {
    switch (cv(t), t.tag) {
      case C: {
        var i = t.type.childContextTypes;
        i != null && bd(t);
        break;
      }
      case _: {
        t.stateNode, Ts(t), ov(t), Kv();
        break;
      }
      case S: {
        jv(t);
        break;
      }
      case R:
        Ts(t);
        break;
      case H:
        Ds(t);
        break;
      case ae:
        Ds(t);
        break;
      case L:
        var s = t.type._context;
        bv(s, t);
        break;
      case re:
      case oe:
        tg(t);
        break;
    }
  }
  var Iw = null;
  Iw = /* @__PURE__ */ new Set();
  var ff = !1, Mn = !1, vx = typeof WeakSet == "function" ? WeakSet : Set, Ce = null, qs = null, zs = null;
  function mx(e) {
    Up(null, function() {
      throw e;
    }), Fp();
  }
  var gx = function(e, t) {
    if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & St)
      try {
        _a(), t.componentWillUnmount();
      } finally {
        Sa(e);
      }
    else
      t.componentWillUnmount();
  };
  function qw(e, t) {
    try {
      Pi(vn, e);
    } catch (r) {
      Mt(e, t, r);
    }
  }
  function Pm(e, t, r) {
    try {
      gx(e, r);
    } catch (i) {
      Mt(e, t, i);
    }
  }
  function yx(e, t, r) {
    try {
      r.componentDidMount();
    } catch (i) {
      Mt(e, t, i);
    }
  }
  function zw(e, t) {
    try {
      Pw(e);
    } catch (r) {
      Mt(e, t, r);
    }
  }
  function Ns(e, t) {
    var r = e.ref;
    if (r !== null)
      if (typeof r == "function") {
        var i;
        try {
          if (jt && Re && e.mode & St)
            try {
              _a(), i = r(null);
            } finally {
              Sa(e);
            }
          else
            i = r(null);
        } catch (s) {
          Mt(e, t, s);
        }
        typeof i == "function" && d("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", He(e));
      } else
        r.current = null;
  }
  function pf(e, t, r) {
    try {
      r();
    } catch (i) {
      Mt(e, t, i);
    }
  }
  var Nw = !1;
  function bx(e, t) {
    A9(e.containerInfo), Ce = t, wx();
    var r = Nw;
    return Nw = !1, r;
  }
  function wx() {
    for (; Ce !== null; ) {
      var e = Ce, t = e.child;
      (e.subtreeFlags & Gp) !== De && t !== null ? (t.return = e, Ce = t) : Cx();
    }
  }
  function Cx() {
    for (; Ce !== null; ) {
      var e = Ce;
      Gt(e);
      try {
        Sx(e);
      } catch (r) {
        Mt(e, e.return, r);
      }
      xn();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, Ce = t;
        return;
      }
      Ce = e.return;
    }
  }
  function Sx(e) {
    var t = e.alternate, r = e.flags;
    if ((r & lo) !== De) {
      switch (Gt(e), e.tag) {
        case y:
        case M:
        case P:
          break;
        case C: {
          if (t !== null) {
            var i = t.memoizedProps, s = t.memoizedState, u = e.stateNode;
            e.type === e.elementType && !Do && (u.props !== e.memoizedProps && d("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", He(e) || "instance"), u.state !== e.memoizedState && d("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", He(e) || "instance"));
            var f = u.getSnapshotBeforeUpdate(e.elementType === e.type ? i : Xr(e.type, i), s);
            {
              var h = Iw;
              f === void 0 && !h.has(e.type) && (h.add(e.type), d("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", He(e)));
            }
            u.__reactInternalSnapshotBeforeUpdate = f;
          }
          break;
        }
        case _: {
          {
            var m = e.stateNode;
            r_(m.containerInfo);
          }
          break;
        }
        case S:
        case k:
        case R:
        case me:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
      xn();
    }
  }
  function ta(e, t, r) {
    var i = t.updateQueue, s = i !== null ? i.lastEffect : null;
    if (s !== null) {
      var u = s.next, f = u;
      do {
        if ((f.tag & e) === e) {
          var h = f.destroy;
          f.destroy = void 0, h !== void 0 && ((e & An) !== pr ? N3(t) : (e & vn) !== pr && R1(t), (e & ba) !== pr && Xu(!0), pf(t, r, h), (e & ba) !== pr && Xu(!1), (e & An) !== pr ? P3() : (e & vn) !== pr && k1());
        }
        f = f.next;
      } while (f !== u);
    }
  }
  function Pi(e, t) {
    var r = t.updateQueue, i = r !== null ? r.lastEffect : null;
    if (i !== null) {
      var s = i.next, u = s;
      do {
        if ((u.tag & e) === e) {
          (e & An) !== pr ? q3(t) : (e & vn) !== pr && U3(t);
          var f = u.create;
          (e & ba) !== pr && Xu(!0), u.destroy = f(), (e & ba) !== pr && Xu(!1), (e & An) !== pr ? z3() : (e & vn) !== pr && F3();
          {
            var h = u.destroy;
            if (h !== void 0 && typeof h != "function") {
              var m = void 0;
              (u.tag & vn) !== De ? m = "useLayoutEffect" : (u.tag & ba) !== De ? m = "useInsertionEffect" : m = "useEffect";
              var E = void 0;
              h === null ? E = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof h.then == "function" ? E = `

It looks like you wrote ` + m + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + m + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : E = " You returned: " + h, d("%s must not return anything besides a function, which is used for clean-up.%s", m, E);
            }
          }
        }
        u = u.next;
      } while (u !== s);
    }
  }
  function _x(e, t) {
    if ((t.flags & it) !== De)
      switch (t.tag) {
        case V: {
          var r = t.stateNode.passiveEffectDuration, i = t.memoizedProps, s = i.id, u = i.onPostCommit, f = ow(), h = t.alternate === null ? "mount" : "update";
          iw() && (h = "nested-update"), typeof u == "function" && u(s, h, r, f);
          var m = t.return;
          e:
            for (; m !== null; ) {
              switch (m.tag) {
                case _:
                  var E = m.stateNode;
                  E.passiveEffectDuration += r;
                  break e;
                case V:
                  var T = m.stateNode;
                  T.passiveEffectDuration += r;
                  break e;
              }
              m = m.return;
            }
          break;
        }
      }
  }
  function xx(e, t, r, i) {
    if ((r.flags & Il) !== De)
      switch (r.tag) {
        case y:
        case M:
        case P: {
          if (!Mn)
            if (r.mode & St)
              try {
                _a(), Pi(vn | hn, r);
              } finally {
                Sa(r);
              }
            else
              Pi(vn | hn, r);
          break;
        }
        case C: {
          var s = r.stateNode;
          if (r.flags & it && !Mn)
            if (t === null)
              if (r.type === r.elementType && !Do && (s.props !== r.memoizedProps && d("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", He(r) || "instance"), s.state !== r.memoizedState && d("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", He(r) || "instance")), r.mode & St)
                try {
                  _a(), s.componentDidMount();
                } finally {
                  Sa(r);
                }
              else
                s.componentDidMount();
            else {
              var u = r.elementType === r.type ? t.memoizedProps : Xr(r.type, t.memoizedProps), f = t.memoizedState;
              if (r.type === r.elementType && !Do && (s.props !== r.memoizedProps && d("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", He(r) || "instance"), s.state !== r.memoizedState && d("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", He(r) || "instance")), r.mode & St)
                try {
                  _a(), s.componentDidUpdate(u, f, s.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  Sa(r);
                }
              else
                s.componentDidUpdate(u, f, s.__reactInternalSnapshotBeforeUpdate);
            }
          var h = r.updateQueue;
          h !== null && (r.type === r.elementType && !Do && (s.props !== r.memoizedProps && d("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", He(r) || "instance"), s.state !== r.memoizedState && d("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", He(r) || "instance")), b0(r, h, s));
          break;
        }
        case _: {
          var m = r.updateQueue;
          if (m !== null) {
            var E = null;
            if (r.child !== null)
              switch (r.child.tag) {
                case S:
                  E = r.child.stateNode;
                  break;
                case C:
                  E = r.child.stateNode;
                  break;
              }
            b0(r, m, E);
          }
          break;
        }
        case S: {
          var T = r.stateNode;
          if (t === null && r.flags & it) {
            var q = r.type, I = r.memoizedProps;
            H9(T, q, I);
          }
          break;
        }
        case k:
          break;
        case R:
          break;
        case V: {
          {
            var B = r.memoizedProps, j = B.onCommit, W = B.onRender, ge = r.stateNode.effectDuration, ke = ow(), xe = t === null ? "mount" : "update";
            iw() && (xe = "nested-update"), typeof W == "function" && W(r.memoizedProps.id, xe, r.actualDuration, r.treeBaseDuration, r.actualStartTime, ke);
            {
              typeof j == "function" && j(r.memoizedProps.id, xe, ge, ke), CE(r);
              var rt = r.return;
              e:
                for (; rt !== null; ) {
                  switch (rt.tag) {
                    case _:
                      var Ke = rt.stateNode;
                      Ke.effectDuration += ge;
                      break e;
                    case V:
                      var U = rt.stateNode;
                      U.effectDuration += ge;
                      break e;
                  }
                  rt = rt.return;
                }
            }
          }
          break;
        }
        case H: {
          Ax(e, r);
          break;
        }
        case ae:
        case me:
        case de:
        case re:
        case oe:
        case se:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    Mn || r.flags & Si && Pw(r);
  }
  function Ex(e) {
    switch (e.tag) {
      case y:
      case M:
      case P: {
        if (e.mode & St)
          try {
            _a(), qw(e, e.return);
          } finally {
            Sa(e);
          }
        else
          qw(e, e.return);
        break;
      }
      case C: {
        var t = e.stateNode;
        typeof t.componentDidMount == "function" && yx(e, e.return, t), zw(e, e.return);
        break;
      }
      case S: {
        zw(e, e.return);
        break;
      }
    }
  }
  function Rx(e, t) {
    for (var r = null, i = e; ; ) {
      if (i.tag === S) {
        if (r === null) {
          r = i;
          try {
            var s = i.stateNode;
            t ? J9(s) : t_(i.stateNode, i.memoizedProps);
          } catch (f) {
            Mt(e, e.return, f);
          }
        }
      } else if (i.tag === k) {
        if (r === null)
          try {
            var u = i.stateNode;
            t ? e_(u) : n_(u, i.memoizedProps);
          } catch (f) {
            Mt(e, e.return, f);
          }
      } else if (!((i.tag === re || i.tag === oe) && i.memoizedState !== null && i !== e)) {
        if (i.child !== null) {
          i.child.return = i, i = i.child;
          continue;
        }
      }
      if (i === e)
        return;
      for (; i.sibling === null; ) {
        if (i.return === null || i.return === e)
          return;
        r === i && (r = null), i = i.return;
      }
      r === i && (r = null), i.sibling.return = i.return, i = i.sibling;
    }
  }
  function Pw(e) {
    var t = e.ref;
    if (t !== null) {
      var r = e.stateNode, i;
      switch (e.tag) {
        case S:
          i = r;
          break;
        default:
          i = r;
      }
      if (typeof t == "function") {
        var s;
        if (e.mode & St)
          try {
            _a(), s = t(i);
          } finally {
            Sa(e);
          }
        else
          s = t(i);
        typeof s == "function" && d("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", He(e));
      } else
        t.hasOwnProperty("current") || d("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", He(e)), t.current = i;
    }
  }
  function kx(e) {
    var t = e.alternate;
    t !== null && (t.return = null), e.return = null;
  }
  function Uw(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Uw(t));
    {
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === S) {
        var r = e.stateNode;
        r !== null && M_(r);
      }
      e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
  }
  function Tx(e) {
    for (var t = e.return; t !== null; ) {
      if (Fw(t))
        return t;
      t = t.return;
    }
    throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
  }
  function Fw(e) {
    return e.tag === S || e.tag === _ || e.tag === R;
  }
  function Vw(e) {
    var t = e;
    e:
      for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || Fw(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== S && t.tag !== k && t.tag !== we; ) {
          if (t.flags & on || t.child === null || t.tag === R)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & on))
          return t.stateNode;
      }
  }
  function $x(e) {
    var t = Tx(e);
    switch (t.tag) {
      case S: {
        var r = t.stateNode;
        t.flags & Ll && (Hb(r), t.flags &= ~Ll);
        var i = Vw(e);
        Fm(e, i, r);
        break;
      }
      case _:
      case R: {
        var s = t.stateNode.containerInfo, u = Vw(e);
        Um(e, u, s);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function Um(e, t, r) {
    var i = e.tag, s = i === S || i === k;
    if (s) {
      var u = e.stateNode;
      t ? K9(r, u, t) : Y9(r, u);
    } else if (i !== R) {
      var f = e.child;
      if (f !== null) {
        Um(f, t, r);
        for (var h = f.sibling; h !== null; )
          Um(h, t, r), h = h.sibling;
      }
    }
  }
  function Fm(e, t, r) {
    var i = e.tag, s = i === S || i === k;
    if (s) {
      var u = e.stateNode;
      t ? W9(r, u, t) : G9(r, u);
    } else if (i !== R) {
      var f = e.child;
      if (f !== null) {
        Fm(f, t, r);
        for (var h = f.sibling; h !== null; )
          Fm(h, t, r), h = h.sibling;
      }
    }
  }
  var In = null, na = !1;
  function Dx(e, t, r) {
    {
      var i = t;
      e:
        for (; i !== null; ) {
          switch (i.tag) {
            case S: {
              In = i.stateNode, na = !1;
              break e;
            }
            case _: {
              In = i.stateNode.containerInfo, na = !0;
              break e;
            }
            case R: {
              In = i.stateNode.containerInfo, na = !0;
              break e;
            }
          }
          i = i.return;
        }
      if (In === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      Hw(e, t, r), In = null, na = !1;
    }
    kx(r);
  }
  function Ui(e, t, r) {
    for (var i = r.child; i !== null; )
      Hw(e, t, i), i = i.sibling;
  }
  function Hw(e, t, r) {
    switch (A3(r), r.tag) {
      case S:
        Mn || Ns(r, t);
      case k: {
        {
          var i = In, s = na;
          In = null, Ui(e, t, r), In = i, na = s, In !== null && (na ? X9(In, r.stateNode) : Z9(In, r.stateNode));
        }
        return;
      }
      case we: {
        In !== null && (na ? Q9(In, r.stateNode) : Qh(In, r.stateNode));
        return;
      }
      case R: {
        {
          var u = In, f = na;
          In = r.stateNode.containerInfo, na = !0, Ui(e, t, r), In = u, na = f;
        }
        return;
      }
      case y:
      case M:
      case N:
      case P: {
        if (!Mn) {
          var h = r.updateQueue;
          if (h !== null) {
            var m = h.lastEffect;
            if (m !== null) {
              var E = m.next, T = E;
              do {
                var q = T, I = q.destroy, B = q.tag;
                I !== void 0 && ((B & ba) !== pr ? pf(r, t, I) : (B & vn) !== pr && (R1(r), r.mode & St ? (_a(), pf(r, t, I), Sa(r)) : pf(r, t, I), k1())), T = T.next;
              } while (T !== E);
            }
          }
        }
        Ui(e, t, r);
        return;
      }
      case C: {
        if (!Mn) {
          Ns(r, t);
          var j = r.stateNode;
          typeof j.componentWillUnmount == "function" && Pm(r, t, j);
        }
        Ui(e, t, r);
        return;
      }
      case de: {
        Ui(e, t, r);
        return;
      }
      case re: {
        if (
          // TODO: Remove this dead flag
          r.mode & tt
        ) {
          var W = Mn;
          Mn = W || r.memoizedState !== null, Ui(e, t, r), Mn = W;
        } else
          Ui(e, t, r);
        break;
      }
      default: {
        Ui(e, t, r);
        return;
      }
    }
  }
  function Ox(e) {
    e.memoizedState;
  }
  function Ax(e, t) {
    var r = t.memoizedState;
    if (r === null) {
      var i = t.alternate;
      if (i !== null) {
        var s = i.memoizedState;
        if (s !== null) {
          var u = s.dehydrated;
          u !== null && g_(u);
        }
      }
    }
  }
  function Bw(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var r = e.stateNode;
      r === null && (r = e.stateNode = new vx()), t.forEach(function(i) {
        var s = TE.bind(null, e, i);
        if (!r.has(i)) {
          if (r.add(i), Gr)
            if (qs !== null && zs !== null)
              Zu(zs, qs);
            else
              throw Error("Expected finished root and lanes to be set. This is a bug in React.");
          i.then(s, s);
        }
      });
    }
  }
  function Lx(e, t, r) {
    qs = r, zs = e, Gt(t), jw(t, e), Gt(t), qs = null, zs = null;
  }
  function ra(e, t, r) {
    var i = t.deletions;
    if (i !== null)
      for (var s = 0; s < i.length; s++) {
        var u = i[s];
        try {
          Dx(e, t, u);
        } catch (m) {
          Mt(u, t, m);
        }
      }
    var f = _c();
    if (t.subtreeFlags & Yp)
      for (var h = t.child; h !== null; )
        Gt(h), jw(h, e), h = h.sibling;
    Gt(f);
  }
  function jw(e, t, r) {
    var i = e.alternate, s = e.flags;
    switch (e.tag) {
      case y:
      case M:
      case N:
      case P: {
        if (ra(t, e), xa(e), s & it) {
          try {
            ta(ba | hn, e, e.return), Pi(ba | hn, e);
          } catch (Me) {
            Mt(e, e.return, Me);
          }
          if (e.mode & St) {
            try {
              _a(), ta(vn | hn, e, e.return);
            } catch (Me) {
              Mt(e, e.return, Me);
            }
            Sa(e);
          } else
            try {
              ta(vn | hn, e, e.return);
            } catch (Me) {
              Mt(e, e.return, Me);
            }
        }
        return;
      }
      case C: {
        ra(t, e), xa(e), s & Si && i !== null && Ns(i, i.return);
        return;
      }
      case S: {
        ra(t, e), xa(e), s & Si && i !== null && Ns(i, i.return);
        {
          if (e.flags & Ll) {
            var u = e.stateNode;
            try {
              Hb(u);
            } catch (Me) {
              Mt(e, e.return, Me);
            }
          }
          if (s & it) {
            var f = e.stateNode;
            if (f != null) {
              var h = e.memoizedProps, m = i !== null ? i.memoizedProps : h, E = e.type, T = e.updateQueue;
              if (e.updateQueue = null, T !== null)
                try {
                  B9(f, T, E, m, h, e);
                } catch (Me) {
                  Mt(e, e.return, Me);
                }
            }
          }
        }
        return;
      }
      case k: {
        if (ra(t, e), xa(e), s & it) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var q = e.stateNode, I = e.memoizedProps, B = i !== null ? i.memoizedProps : I;
          try {
            j9(q, B, I);
          } catch (Me) {
            Mt(e, e.return, Me);
          }
        }
        return;
      }
      case _: {
        if (ra(t, e), xa(e), s & it && i !== null) {
          var j = i.memoizedState;
          if (j.isDehydrated)
            try {
              m_(t.containerInfo);
            } catch (Me) {
              Mt(e, e.return, Me);
            }
        }
        return;
      }
      case R: {
        ra(t, e), xa(e);
        return;
      }
      case H: {
        ra(t, e), xa(e);
        var W = e.child;
        if (W.flags & uo) {
          var ge = W.stateNode, ke = W.memoizedState, xe = ke !== null;
          if (ge.isHidden = xe, xe) {
            var rt = W.alternate !== null && W.alternate.memoizedState !== null;
            rt || pE();
          }
        }
        if (s & it) {
          try {
            Ox(e);
          } catch (Me) {
            Mt(e, e.return, Me);
          }
          Bw(e);
        }
        return;
      }
      case re: {
        var Ke = i !== null && i.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & tt
        ) {
          var U = Mn;
          Mn = U || Ke, ra(t, e), Mn = U;
        } else
          ra(t, e);
        if (xa(e), s & uo) {
          var K = e.stateNode, F = e.memoizedState, ne = F !== null, ye = e;
          if (K.isHidden = ne, ne && !Ke && (ye.mode & tt) !== Oe) {
            Ce = ye;
            for (var fe = ye.child; fe !== null; )
              Ce = fe, Ix(fe), fe = fe.sibling;
          }
          Rx(ye, ne);
        }
        return;
      }
      case ae: {
        ra(t, e), xa(e), s & it && Bw(e);
        return;
      }
      case de:
        return;
      default: {
        ra(t, e), xa(e);
        return;
      }
    }
  }
  function xa(e) {
    var t = e.flags;
    if (t & on) {
      try {
        $x(e);
      } catch (r) {
        Mt(e, e.return, r);
      }
      e.flags &= ~on;
    }
    t & Ua && (e.flags &= ~Ua);
  }
  function Mx(e, t, r) {
    qs = r, zs = t, Ce = e, Gw(e, t, r), qs = null, zs = null;
  }
  function Gw(e, t, r) {
    for (var i = (e.mode & tt) !== Oe; Ce !== null; ) {
      var s = Ce, u = s.child;
      if (s.tag === re && i) {
        var f = s.memoizedState !== null, h = f || ff;
        if (h) {
          Vm(e, t, r);
          continue;
        } else {
          var m = s.alternate, E = m !== null && m.memoizedState !== null, T = E || Mn, q = ff, I = Mn;
          ff = h, Mn = T, Mn && !I && (Ce = s, qx(s));
          for (var B = u; B !== null; )
            Ce = B, Gw(
              B,
              // New root; bubble back up to here and stop.
              t,
              r
            ), B = B.sibling;
          Ce = s, ff = q, Mn = I, Vm(e, t, r);
          continue;
        }
      }
      (s.subtreeFlags & Il) !== De && u !== null ? (u.return = s, Ce = u) : Vm(e, t, r);
    }
  }
  function Vm(e, t, r) {
    for (; Ce !== null; ) {
      var i = Ce;
      if ((i.flags & Il) !== De) {
        var s = i.alternate;
        Gt(i);
        try {
          xx(t, s, i, r);
        } catch (f) {
          Mt(i, i.return, f);
        }
        xn();
      }
      if (i === e) {
        Ce = null;
        return;
      }
      var u = i.sibling;
      if (u !== null) {
        u.return = i.return, Ce = u;
        return;
      }
      Ce = i.return;
    }
  }
  function Ix(e) {
    for (; Ce !== null; ) {
      var t = Ce, r = t.child;
      switch (t.tag) {
        case y:
        case M:
        case N:
        case P: {
          if (t.mode & St)
            try {
              _a(), ta(vn, t, t.return);
            } finally {
              Sa(t);
            }
          else
            ta(vn, t, t.return);
          break;
        }
        case C: {
          Ns(t, t.return);
          var i = t.stateNode;
          typeof i.componentWillUnmount == "function" && Pm(t, t.return, i);
          break;
        }
        case S: {
          Ns(t, t.return);
          break;
        }
        case re: {
          var s = t.memoizedState !== null;
          if (s) {
            Yw(e);
            continue;
          }
          break;
        }
      }
      r !== null ? (r.return = t, Ce = r) : Yw(e);
    }
  }
  function Yw(e) {
    for (; Ce !== null; ) {
      var t = Ce;
      if (t === e) {
        Ce = null;
        return;
      }
      var r = t.sibling;
      if (r !== null) {
        r.return = t.return, Ce = r;
        return;
      }
      Ce = t.return;
    }
  }
  function qx(e) {
    for (; Ce !== null; ) {
      var t = Ce, r = t.child;
      if (t.tag === re) {
        var i = t.memoizedState !== null;
        if (i) {
          Ww(e);
          continue;
        }
      }
      r !== null ? (r.return = t, Ce = r) : Ww(e);
    }
  }
  function Ww(e) {
    for (; Ce !== null; ) {
      var t = Ce;
      Gt(t);
      try {
        Ex(t);
      } catch (i) {
        Mt(t, t.return, i);
      }
      if (xn(), t === e) {
        Ce = null;
        return;
      }
      var r = t.sibling;
      if (r !== null) {
        r.return = t.return, Ce = r;
        return;
      }
      Ce = t.return;
    }
  }
  function zx(e, t, r, i) {
    Ce = t, Nx(t, e, r, i);
  }
  function Nx(e, t, r, i) {
    for (; Ce !== null; ) {
      var s = Ce, u = s.child;
      (s.subtreeFlags & as) !== De && u !== null ? (u.return = s, Ce = u) : Px(e, t, r, i);
    }
  }
  function Px(e, t, r, i) {
    for (; Ce !== null; ) {
      var s = Ce;
      if ((s.flags & jr) !== De) {
        Gt(s);
        try {
          Ux(t, s, r, i);
        } catch (f) {
          Mt(s, s.return, f);
        }
        xn();
      }
      if (s === e) {
        Ce = null;
        return;
      }
      var u = s.sibling;
      if (u !== null) {
        u.return = s.return, Ce = u;
        return;
      }
      Ce = s.return;
    }
  }
  function Ux(e, t, r, i) {
    switch (t.tag) {
      case y:
      case M:
      case P: {
        if (t.mode & St) {
          bm();
          try {
            Pi(An | hn, t);
          } finally {
            ym(t);
          }
        } else
          Pi(An | hn, t);
        break;
      }
    }
  }
  function Fx(e) {
    Ce = e, Vx();
  }
  function Vx() {
    for (; Ce !== null; ) {
      var e = Ce, t = e.child;
      if ((Ce.flags & so) !== De) {
        var r = e.deletions;
        if (r !== null) {
          for (var i = 0; i < r.length; i++) {
            var s = r[i];
            Ce = s, jx(s, e);
          }
          {
            var u = e.alternate;
            if (u !== null) {
              var f = u.child;
              if (f !== null) {
                u.child = null;
                do {
                  var h = f.sibling;
                  f.sibling = null, f = h;
                } while (f !== null);
              }
            }
          }
          Ce = e;
        }
      }
      (e.subtreeFlags & as) !== De && t !== null ? (t.return = e, Ce = t) : Hx();
    }
  }
  function Hx() {
    for (; Ce !== null; ) {
      var e = Ce;
      (e.flags & jr) !== De && (Gt(e), Bx(e), xn());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, Ce = t;
        return;
      }
      Ce = e.return;
    }
  }
  function Bx(e) {
    switch (e.tag) {
      case y:
      case M:
      case P: {
        e.mode & St ? (bm(), ta(An | hn, e, e.return), ym(e)) : ta(An | hn, e, e.return);
        break;
      }
    }
  }
  function jx(e, t) {
    for (; Ce !== null; ) {
      var r = Ce;
      Gt(r), Yx(r, t), xn();
      var i = r.child;
      i !== null ? (i.return = r, Ce = i) : Gx(e);
    }
  }
  function Gx(e) {
    for (; Ce !== null; ) {
      var t = Ce, r = t.sibling, i = t.return;
      if (Uw(t), t === e) {
        Ce = null;
        return;
      }
      if (r !== null) {
        r.return = i, Ce = r;
        return;
      }
      Ce = i;
    }
  }
  function Yx(e, t) {
    switch (e.tag) {
      case y:
      case M:
      case P: {
        e.mode & St ? (bm(), ta(An, e, t), ym(e)) : ta(An, e, t);
        break;
      }
    }
  }
  function Wx(e) {
    switch (e.tag) {
      case y:
      case M:
      case P: {
        try {
          Pi(vn | hn, e);
        } catch (r) {
          Mt(e, e.return, r);
        }
        break;
      }
      case C: {
        var t = e.stateNode;
        try {
          t.componentDidMount();
        } catch (r) {
          Mt(e, e.return, r);
        }
        break;
      }
    }
  }
  function Kx(e) {
    switch (e.tag) {
      case y:
      case M:
      case P: {
        try {
          Pi(An | hn, e);
        } catch (t) {
          Mt(e, e.return, t);
        }
        break;
      }
    }
  }
  function Zx(e) {
    switch (e.tag) {
      case y:
      case M:
      case P: {
        try {
          ta(vn | hn, e, e.return);
        } catch (r) {
          Mt(e, e.return, r);
        }
        break;
      }
      case C: {
        var t = e.stateNode;
        typeof t.componentWillUnmount == "function" && Pm(e, e.return, t);
        break;
      }
    }
  }
  function Xx(e) {
    switch (e.tag) {
      case y:
      case M:
      case P:
        try {
          ta(An | hn, e, e.return);
        } catch (t) {
          Mt(e, e.return, t);
        }
    }
  }
  if (typeof Symbol == "function" && Symbol.for) {
    var Pu = Symbol.for;
    Pu("selector.component"), Pu("selector.has_pseudo_class"), Pu("selector.role"), Pu("selector.test_id"), Pu("selector.text");
  }
  var Qx = [];
  function Jx() {
    Qx.forEach(function(e) {
      return e();
    });
  }
  var eE = o.ReactCurrentActQueue;
  function tE(e) {
    {
      var t = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      ), r = typeof jest < "u";
      return r && t !== !1;
    }
  }
  function Kw() {
    {
      var e = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      );
      return !e && eE.current !== null && d("The current testing environment is not configured to support act(...)"), e;
    }
  }
  var nE = Math.ceil, Hm = o.ReactCurrentDispatcher, Bm = o.ReactCurrentOwner, qn = o.ReactCurrentBatchConfig, aa = o.ReactCurrentActQueue, yn = (
    /*             */
    0
  ), Zw = (
    /*               */
    1
  ), zn = (
    /*                */
    2
  ), Nr = (
    /*                */
    4
  ), Ja = 0, Uu = 1, Oo = 2, hf = 3, Fu = 4, Xw = 5, jm = 6, nt = yn, tr = null, Yt = null, bn = Q, Ea = Q, Gm = Di(Q), wn = Ja, Vu = null, vf = Q, Hu = Q, mf = Q, Bu = null, hr = null, Ym = 0, Qw = 500, Jw = 1 / 0, rE = 500, ei = null;
  function ju() {
    Jw = En() + rE;
  }
  function eC() {
    return Jw;
  }
  var gf = !1, Wm = null, Ps = null, Ao = !1, Fi = null, Gu = Q, Km = [], Zm = null, aE = 50, Yu = 0, Xm = null, Qm = !1, yf = !1, iE = 50, Us = 0, bf = null, Wu = Nt, wf = Q, tC = !1;
  function Cf() {
    return tr;
  }
  function nr() {
    return (nt & (zn | Nr)) !== yn ? En() : (Wu !== Nt || (Wu = En()), Wu);
  }
  function Vi(e) {
    var t = e.mode;
    if ((t & tt) === Oe)
      return qe;
    if ((nt & zn) !== yn && bn !== Q)
      return Vl(bn);
    var r = t4() !== e4;
    if (r) {
      if (qn.transition !== null) {
        var i = qn.transition;
        i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
      }
      return wf === kn && (wf = I1()), wf;
    }
    var s = Yr();
    if (s !== kn)
      return s;
    var u = P9();
    return u;
  }
  function oE(e) {
    var t = e.mode;
    return (t & tt) === Oe ? qe : u7();
  }
  function Cn(e, t, r, i) {
    DE(), tC && d("useInsertionEffect must not schedule updates."), Qm && (yf = !0), Hl(e, r, i), (nt & zn) !== Q && e === tr ? LE(t) : (Gr && N1(e, t, r), ME(t), e === tr && ((nt & zn) === yn && (Hu = Ye(Hu, r)), wn === Fu && Hi(e, bn)), vr(e, i), r === qe && nt === yn && (t.mode & tt) === Oe && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !aa.isBatchingLegacy && (ju(), e0()));
  }
  function sE(e, t, r) {
    var i = e.current;
    i.lanes = t, Hl(e, t, r), vr(e, r);
  }
  function lE(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (nt & zn) !== yn
    );
  }
  function vr(e, t) {
    var r = e.callbackNode;
    r7(e, t);
    var i = Fc(e, e === tr ? bn : Q);
    if (i === Q) {
      r !== null && gC(r), e.callbackNode = null, e.callbackPriority = kn;
      return;
    }
    var s = mo(i), u = e.callbackPriority;
    if (u === s && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(aa.current !== null && r !== ig)) {
      r == null && u !== qe && d("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    r != null && gC(r);
    var f;
    if (s === qe)
      e.tag === Oi ? (aa.isBatchingLegacy !== null && (aa.didScheduleLegacyUpdate = !0), z_(aC.bind(null, e))) : Jb(aC.bind(null, e)), aa.current !== null ? aa.current.push(Ai) : F9(function() {
        (nt & (zn | Nr)) === yn && Ai();
      }), f = null;
    else {
      var h;
      switch (F1(i)) {
        case Cr:
          h = zc;
          break;
        case Ba:
          h = Wp;
          break;
        case ja:
          h = po;
          break;
        case Bc:
          h = Kp;
          break;
        default:
          h = po;
          break;
      }
      f = og(h, nC.bind(null, e));
    }
    e.callbackPriority = s, e.callbackNode = f;
  }
  function nC(e, t) {
    if (D4(), Wu = Nt, wf = Q, (nt & (zn | Nr)) !== yn)
      throw new Error("Should not already be working.");
    var r = e.callbackNode, i = ni();
    if (i && e.callbackNode !== r)
      return null;
    var s = Fc(e, e === tr ? bn : Q);
    if (s === Q)
      return null;
    var u = !Vc(e, s) && !l7(e, s) && !t, f = u ? yE(e, s) : _f(e, s);
    if (f !== Ja) {
      if (f === Oo) {
        var h = gh(e);
        h !== Q && (s = h, f = Jm(e, h));
      }
      if (f === Uu) {
        var m = Vu;
        throw Lo(e, Q), Hi(e, s), vr(e, En()), m;
      }
      if (f === jm)
        Hi(e, s);
      else {
        var E = !Vc(e, s), T = e.current.alternate;
        if (E && !cE(T)) {
          if (f = _f(e, s), f === Oo) {
            var q = gh(e);
            q !== Q && (s = q, f = Jm(e, q));
          }
          if (f === Uu) {
            var I = Vu;
            throw Lo(e, Q), Hi(e, s), vr(e, En()), I;
          }
        }
        e.finishedWork = T, e.finishedLanes = s, uE(e, f, s);
      }
    }
    return vr(e, En()), e.callbackNode === r ? nC.bind(null, e) : null;
  }
  function Jm(e, t) {
    var r = Bu;
    if (jc(e)) {
      var i = Lo(e, t);
      i.flags |= Pa, D_(e.containerInfo);
    }
    var s = _f(e, t);
    if (s !== Oo) {
      var u = hr;
      hr = r, u !== null && rC(u);
    }
    return s;
  }
  function rC(e) {
    hr === null ? hr = e : hr.push.apply(hr, e);
  }
  function uE(e, t, r) {
    switch (t) {
      case Ja:
      case Uu:
        throw new Error("Root did not complete. This is a bug in React.");
      case Oo: {
        Mo(e, hr, ei);
        break;
      }
      case hf: {
        if (Hi(e, r), L1(r) && // do not delay if we're inside an act() scope
        !yC()) {
          var i = Ym + Qw - En();
          if (i > 10) {
            var s = Fc(e, Q);
            if (s !== Q)
              break;
            var u = e.suspendedLanes;
            if (!cs(u, r)) {
              nr(), z1(e, u);
              break;
            }
            e.timeoutHandle = Zh(Mo.bind(null, e, hr, ei), i);
            break;
          }
        }
        Mo(e, hr, ei);
        break;
      }
      case Fu: {
        if (Hi(e, r), s7(r))
          break;
        if (!yC()) {
          var f = t7(e, r), h = f, m = En() - h, E = $E(m) - m;
          if (E > 10) {
            e.timeoutHandle = Zh(Mo.bind(null, e, hr, ei), E);
            break;
          }
        }
        Mo(e, hr, ei);
        break;
      }
      case Xw: {
        Mo(e, hr, ei);
        break;
      }
      default:
        throw new Error("Unknown root exit status.");
    }
  }
  function cE(e) {
    for (var t = e; ; ) {
      if (t.flags & Ic) {
        var r = t.updateQueue;
        if (r !== null) {
          var i = r.stores;
          if (i !== null)
            for (var s = 0; s < i.length; s++) {
              var u = i[s], f = u.getSnapshot, h = u.value;
              try {
                if (!_r(f(), h))
                  return !1;
              } catch {
                return !1;
              }
            }
        }
      }
      var m = t.child;
      if (t.subtreeFlags & Ic && m !== null) {
        m.return = t, t = m;
        continue;
      }
      if (t === e)
        return !0;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e)
          return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return !0;
  }
  function Hi(e, t) {
    t = Hc(t, mf), t = Hc(t, Hu), d7(e, t);
  }
  function aC(e) {
    if (O4(), (nt & (zn | Nr)) !== yn)
      throw new Error("Should not already be working.");
    ni();
    var t = Fc(e, Q);
    if (!wr(t, qe))
      return vr(e, En()), null;
    var r = _f(e, t);
    if (e.tag !== Oi && r === Oo) {
      var i = gh(e);
      i !== Q && (t = i, r = Jm(e, i));
    }
    if (r === Uu) {
      var s = Vu;
      throw Lo(e, Q), Hi(e, t), vr(e, En()), s;
    }
    if (r === jm)
      throw new Error("Root did not complete. This is a bug in React.");
    var u = e.current.alternate;
    return e.finishedWork = u, e.finishedLanes = t, Mo(e, hr, ei), vr(e, En()), null;
  }
  function dE(e, t) {
    t !== Q && (Ch(e, Ye(t, qe)), vr(e, En()), (nt & (zn | Nr)) === yn && (ju(), Ai()));
  }
  function eg(e, t) {
    var r = nt;
    nt |= Zw;
    try {
      return e(t);
    } finally {
      nt = r, nt === yn && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !aa.isBatchingLegacy && (ju(), e0());
    }
  }
  function fE(e, t, r, i, s) {
    var u = Yr(), f = qn.transition;
    try {
      return qn.transition = null, Tn(Cr), e(t, r, i, s);
    } finally {
      Tn(u), qn.transition = f, nt === yn && ju();
    }
  }
  function ti(e) {
    Fi !== null && Fi.tag === Oi && (nt & (zn | Nr)) === yn && ni();
    var t = nt;
    nt |= Zw;
    var r = qn.transition, i = Yr();
    try {
      return qn.transition = null, Tn(Cr), e ? e() : void 0;
    } finally {
      Tn(i), qn.transition = r, nt = t, (nt & (zn | Nr)) === yn && Ai();
    }
  }
  function iC() {
    return (nt & (zn | Nr)) !== yn;
  }
  function Sf(e, t) {
    Wn(Gm, Ea, e), Ea = Ye(Ea, t);
  }
  function tg(e) {
    Ea = Gm.current, Yn(Gm, e);
  }
  function Lo(e, t) {
    e.finishedWork = null, e.finishedLanes = Q;
    var r = e.timeoutHandle;
    if (r !== Xh && (e.timeoutHandle = Xh, U9(r)), Yt !== null)
      for (var i = Yt.return; i !== null; ) {
        var s = i.alternate;
        Mw(s, i), i = i.return;
      }
    tr = e;
    var u = Io(e.current, null);
    return Yt = u, bn = Ea = t, wn = Ja, Vu = null, vf = Q, Hu = Q, mf = Q, Bu = null, hr = null, i4(), Zr.discardPendingWarnings(), u;
  }
  function oC(e, t) {
    do {
      var r = Yt;
      try {
        if ($d(), q0(), xn(), Bm.current = null, r === null || r.return === null) {
          wn = Uu, Vu = t, Yt = null;
          return;
        }
        if (jt && r.mode & St && lf(r, !0), Dt)
          if (os(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var i = t;
            H3(r, i, bn);
          } else
            V3(r, t, bn);
        q4(e, r.return, r, t, bn), cC(r);
      } catch (s) {
        t = s, Yt === r && r !== null ? (r = r.return, Yt = r) : r = Yt;
        continue;
      }
      return;
    } while (!0);
  }
  function sC() {
    var e = Hm.current;
    return Hm.current = nf, e === null ? nf : e;
  }
  function lC(e) {
    Hm.current = e;
  }
  function pE() {
    Ym = En();
  }
  function Ku(e) {
    vf = Ye(e, vf);
  }
  function hE() {
    wn === Ja && (wn = hf);
  }
  function ng() {
    (wn === Ja || wn === hf || wn === Oo) && (wn = Fu), tr !== null && (yh(vf) || yh(Hu)) && Hi(tr, bn);
  }
  function vE(e) {
    wn !== Fu && (wn = Oo), Bu === null ? Bu = [e] : Bu.push(e);
  }
  function mE() {
    return wn === Ja;
  }
  function _f(e, t) {
    var r = nt;
    nt |= zn;
    var i = sC();
    if (tr !== e || bn !== t) {
      if (Gr) {
        var s = e.memoizedUpdaters;
        s.size > 0 && (Zu(e, bn), s.clear()), P1(e, t);
      }
      ei = U1(), Lo(e, t);
    }
    T1(t);
    do
      try {
        gE();
        break;
      } catch (u) {
        oC(e, u);
      }
    while (!0);
    if ($d(), nt = r, lC(i), Yt !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return $1(), tr = null, bn = Q, wn;
  }
  function gE() {
    for (; Yt !== null; )
      uC(Yt);
  }
  function yE(e, t) {
    var r = nt;
    nt |= zn;
    var i = sC();
    if (tr !== e || bn !== t) {
      if (Gr) {
        var s = e.memoizedUpdaters;
        s.size > 0 && (Zu(e, bn), s.clear()), P1(e, t);
      }
      ei = U1(), ju(), Lo(e, t);
    }
    T1(t);
    do
      try {
        bE();
        break;
      } catch (u) {
        oC(e, u);
      }
    while (!0);
    return $d(), lC(i), nt = r, Yt !== null ? (W3(), Ja) : ($1(), tr = null, bn = Q, wn);
  }
  function bE() {
    for (; Yt !== null && !S3(); )
      uC(Yt);
  }
  function uC(e) {
    var t = e.alternate;
    Gt(e);
    var r;
    (e.mode & St) !== Oe ? (gm(e), r = rg(t, e, Ea), lf(e, !0)) : r = rg(t, e, Ea), xn(), e.memoizedProps = e.pendingProps, r === null ? cC(e) : Yt = r, Bm.current = null;
  }
  function cC(e) {
    var t = e;
    do {
      var r = t.alternate, i = t.return;
      if ((t.flags & Ml) === De) {
        Gt(t);
        var s = void 0;
        if ((t.mode & St) === Oe ? s = Lw(r, t, Ea) : (gm(t), s = Lw(r, t, Ea), lf(t, !1)), xn(), s !== null) {
          Yt = s;
          return;
        }
      } else {
        var u = hx(r, t);
        if (u !== null) {
          u.flags &= m3, Yt = u;
          return;
        }
        if ((t.mode & St) !== Oe) {
          lf(t, !1);
          for (var f = t.actualDuration, h = t.child; h !== null; )
            f += h.actualDuration, h = h.sibling;
          t.actualDuration = f;
        }
        if (i !== null)
          i.flags |= Ml, i.subtreeFlags = De, i.deletions = null;
        else {
          wn = jm, Yt = null;
          return;
        }
      }
      var m = t.sibling;
      if (m !== null) {
        Yt = m;
        return;
      }
      t = i, Yt = t;
    } while (t !== null);
    wn === Ja && (wn = Xw);
  }
  function Mo(e, t, r) {
    var i = Yr(), s = qn.transition;
    try {
      qn.transition = null, Tn(Cr), wE(e, t, r, i);
    } finally {
      qn.transition = s, Tn(i);
    }
    return null;
  }
  function wE(e, t, r, i) {
    do
      ni();
    while (Fi !== null);
    if (OE(), (nt & (zn | Nr)) !== yn)
      throw new Error("Should not already be working.");
    var s = e.finishedWork, u = e.finishedLanes;
    if (I3(u), s === null)
      return E1(), null;
    if (u === Q && d("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = Q, s === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = kn;
    var f = Ye(s.lanes, s.childLanes);
    f7(e, f), e === tr && (tr = null, Yt = null, bn = Q), ((s.subtreeFlags & as) !== De || (s.flags & as) !== De) && (Ao || (Ao = !0, Zm = r, og(po, function() {
      return ni(), null;
    })));
    var h = (s.subtreeFlags & (Gp | Yp | Il | as)) !== De, m = (s.flags & (Gp | Yp | Il | as)) !== De;
    if (h || m) {
      var E = qn.transition;
      qn.transition = null;
      var T = Yr();
      Tn(Cr);
      var q = nt;
      nt |= Nr, Bm.current = null, bx(e, s), sw(), Lx(e, s, u), L9(e.containerInfo), e.current = s, B3(u), Mx(s, e, u), j3(), _3(), nt = q, Tn(T), qn.transition = E;
    } else
      e.current = s, sw();
    var I = Ao;
    if (Ao ? (Ao = !1, Fi = e, Gu = u) : (Us = 0, bf = null), f = e.pendingLanes, f === Q && (Ps = null), I || hC(e.current, !1), D3(s.stateNode, i), Gr && e.memoizedUpdaters.clear(), Jx(), vr(e, En()), t !== null)
      for (var B = e.onRecoverableError, j = 0; j < t.length; j++) {
        var W = t[j], ge = W.stack, ke = W.digest;
        B(W.value, {
          componentStack: ge,
          digest: ke
        });
      }
    if (gf) {
      gf = !1;
      var xe = Wm;
      throw Wm = null, xe;
    }
    return wr(Gu, qe) && e.tag !== Oi && ni(), f = e.pendingLanes, wr(f, qe) ? ($4(), e === Xm ? Yu++ : (Yu = 0, Xm = e)) : Yu = 0, Ai(), E1(), null;
  }
  function ni() {
    if (Fi !== null) {
      var e = F1(Gu), t = m7(ja, e), r = qn.transition, i = Yr();
      try {
        return qn.transition = null, Tn(t), SE();
      } finally {
        Tn(i), qn.transition = r;
      }
    }
    return !1;
  }
  function CE(e) {
    Km.push(e), Ao || (Ao = !0, og(po, function() {
      return ni(), null;
    }));
  }
  function SE() {
    if (Fi === null)
      return !1;
    var e = Zm;
    Zm = null;
    var t = Fi, r = Gu;
    if (Fi = null, Gu = Q, (nt & (zn | Nr)) !== yn)
      throw new Error("Cannot flush passive effects while already rendering.");
    Qm = !0, yf = !1, G3(r);
    var i = nt;
    nt |= Nr, Fx(t.current), zx(t, t.current, r, e);
    {
      var s = Km;
      Km = [];
      for (var u = 0; u < s.length; u++) {
        var f = s[u];
        _x(t, f);
      }
    }
    Y3(), hC(t.current, !0), nt = i, Ai(), yf ? t === bf ? Us++ : (Us = 0, bf = t) : Us = 0, Qm = !1, yf = !1, O3(t);
    {
      var h = t.current.stateNode;
      h.effectDuration = 0, h.passiveEffectDuration = 0;
    }
    return !0;
  }
  function dC(e) {
    return Ps !== null && Ps.has(e);
  }
  function _E(e) {
    Ps === null ? Ps = /* @__PURE__ */ new Set([e]) : Ps.add(e);
  }
  function xE(e) {
    gf || (gf = !0, Wm = e);
  }
  var EE = xE;
  function fC(e, t, r) {
    var i = $o(r, t), s = uw(e, i, qe), u = Mi(e, s, qe), f = nr();
    u !== null && (Hl(u, qe, f), vr(u, f));
  }
  function Mt(e, t, r) {
    if (mx(r), Xu(!1), e.tag === _) {
      fC(e, e, r);
      return;
    }
    var i = null;
    for (i = t; i !== null; ) {
      if (i.tag === _) {
        fC(i, e, r);
        return;
      } else if (i.tag === C) {
        var s = i.type, u = i.stateNode;
        if (typeof s.getDerivedStateFromError == "function" || typeof u.componentDidCatch == "function" && !dC(u)) {
          var f = $o(r, e), h = _m(i, f, qe), m = Mi(i, h, qe), E = nr();
          m !== null && (Hl(m, qe, E), vr(m, E));
          return;
        }
      }
      i = i.return;
    }
    d(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, r);
  }
  function RE(e, t, r) {
    var i = e.pingCache;
    i !== null && i.delete(t);
    var s = nr();
    z1(e, r), IE(e), tr === e && cs(bn, r) && (wn === Fu || wn === hf && L1(bn) && En() - Ym < Qw ? Lo(e, Q) : mf = Ye(mf, r)), vr(e, s);
  }
  function pC(e, t) {
    t === kn && (t = oE(e));
    var r = nr(), i = fr(e, t);
    i !== null && (Hl(i, t, r), vr(i, r));
  }
  function kE(e) {
    var t = e.memoizedState, r = kn;
    t !== null && (r = t.retryLane), pC(e, r);
  }
  function TE(e, t) {
    var r = kn, i;
    switch (e.tag) {
      case H:
        i = e.stateNode;
        var s = e.memoizedState;
        s !== null && (r = s.retryLane);
        break;
      case ae:
        i = e.stateNode;
        break;
      default:
        throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
    }
    i !== null && i.delete(t), pC(e, r);
  }
  function $E(e) {
    return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : nE(e / 1960) * 1960;
  }
  function DE() {
    if (Yu > aE)
      throw Yu = 0, Xm = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Us > iE && (Us = 0, bf = null, d("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function OE() {
    Zr.flushLegacyContextWarning(), Zr.flushPendingUnsafeLifecycleWarnings();
  }
  function hC(e, t) {
    Gt(e), xf(e, Fa, Zx), t && xf(e, qc, Xx), xf(e, Fa, Wx), t && xf(e, qc, Kx), xn();
  }
  function xf(e, t, r) {
    for (var i = e, s = null; i !== null; ) {
      var u = i.subtreeFlags & t;
      i !== s && i.child !== null && u !== De ? i = i.child : ((i.flags & t) !== De && r(i), i.sibling !== null ? i = i.sibling : i = s = i.return);
    }
  }
  var Ef = null;
  function vC(e) {
    {
      if ((nt & zn) !== yn || !(e.mode & tt))
        return;
      var t = e.tag;
      if (t !== $ && t !== _ && t !== C && t !== y && t !== M && t !== N && t !== P)
        return;
      var r = He(e) || "ReactComponent";
      if (Ef !== null) {
        if (Ef.has(r))
          return;
        Ef.add(r);
      } else
        Ef = /* @__PURE__ */ new Set([r]);
      var i = jn;
      try {
        Gt(e), d("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        i ? Gt(e) : xn();
      }
    }
  }
  var rg;
  {
    var AE = null;
    rg = function(e, t, r) {
      var i = _C(AE, t);
      try {
        return Tw(e, t, r);
      } catch (u) {
        if (j_() || u !== null && typeof u == "object" && typeof u.then == "function")
          throw u;
        if ($d(), q0(), Mw(e, t), _C(t, i), t.mode & St && gm(t), Up(null, Tw, null, e, t, r), f3()) {
          var s = Fp();
          typeof s == "object" && s !== null && s._suppressLogging && typeof u == "object" && u !== null && !u._suppressLogging && (u._suppressLogging = !0);
        }
        throw u;
      }
    };
  }
  var mC = !1, ag;
  ag = /* @__PURE__ */ new Set();
  function LE(e) {
    if (ao && !R4())
      switch (e.tag) {
        case y:
        case M:
        case P: {
          var t = Yt && He(Yt) || "Unknown", r = t;
          if (!ag.has(r)) {
            ag.add(r);
            var i = He(e) || "Unknown";
            d("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
          }
          break;
        }
        case C: {
          mC || (d("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), mC = !0);
          break;
        }
      }
  }
  function Zu(e, t) {
    if (Gr) {
      var r = e.memoizedUpdaters;
      r.forEach(function(i) {
        N1(e, i, t);
      });
    }
  }
  var ig = {};
  function og(e, t) {
    {
      var r = aa.current;
      return r !== null ? (r.push(t), ig) : x1(e, t);
    }
  }
  function gC(e) {
    if (e !== ig)
      return C3(e);
  }
  function yC() {
    return aa.current !== null;
  }
  function ME(e) {
    {
      if (e.mode & tt) {
        if (!Kw())
          return;
      } else if (!tE() || nt !== yn || e.tag !== y && e.tag !== M && e.tag !== P)
        return;
      if (aa.current === null) {
        var t = jn;
        try {
          Gt(e), d(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, He(e));
        } finally {
          t ? Gt(e) : xn();
        }
      }
    }
  }
  function IE(e) {
    e.tag !== Oi && Kw() && aa.current === null && d(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
  }
  function Xu(e) {
    tC = e;
  }
  var Pr = null, Fs = null, qE = function(e) {
    Pr = e;
  };
  function Vs(e) {
    {
      if (Pr === null)
        return e;
      var t = Pr(e);
      return t === void 0 ? e : t.current;
    }
  }
  function sg(e) {
    return Vs(e);
  }
  function lg(e) {
    {
      if (Pr === null)
        return e;
      var t = Pr(e);
      if (t === void 0) {
        if (e != null && typeof e.render == "function") {
          var r = Vs(e.render);
          if (e.render !== r) {
            var i = {
              $$typeof: be,
              render: r
            };
            return e.displayName !== void 0 && (i.displayName = e.displayName), i;
          }
        }
        return e;
      }
      return t.current;
    }
  }
  function bC(e, t) {
    {
      if (Pr === null)
        return !1;
      var r = e.elementType, i = t.type, s = !1, u = typeof i == "object" && i !== null ? i.$$typeof : null;
      switch (e.tag) {
        case C: {
          typeof i == "function" && (s = !0);
          break;
        }
        case y: {
          (typeof i == "function" || u === Te) && (s = !0);
          break;
        }
        case M: {
          (u === be || u === Te) && (s = !0);
          break;
        }
        case N:
        case P: {
          (u === Ge || u === Te) && (s = !0);
          break;
        }
        default:
          return !1;
      }
      if (s) {
        var f = Pr(r);
        if (f !== void 0 && f === Pr(i))
          return !0;
      }
      return !1;
    }
  }
  function wC(e) {
    {
      if (Pr === null || typeof WeakSet != "function")
        return;
      Fs === null && (Fs = /* @__PURE__ */ new WeakSet()), Fs.add(e);
    }
  }
  var zE = function(e, t) {
    {
      if (Pr === null)
        return;
      var r = t.staleFamilies, i = t.updatedFamilies;
      ni(), ti(function() {
        ug(e.current, i, r);
      });
    }
  }, NE = function(e, t) {
    {
      if (e.context !== xr)
        return;
      ni(), ti(function() {
        Qu(t, e, null, null);
      });
    }
  };
  function ug(e, t, r) {
    {
      var i = e.alternate, s = e.child, u = e.sibling, f = e.tag, h = e.type, m = null;
      switch (f) {
        case y:
        case P:
        case C:
          m = h;
          break;
        case M:
          m = h.render;
          break;
      }
      if (Pr === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var E = !1, T = !1;
      if (m !== null) {
        var q = Pr(m);
        q !== void 0 && (r.has(q) ? T = !0 : t.has(q) && (f === C ? T = !0 : E = !0));
      }
      if (Fs !== null && (Fs.has(e) || i !== null && Fs.has(i)) && (T = !0), T && (e._debugNeedsRemount = !0), T || E) {
        var I = fr(e, qe);
        I !== null && Cn(I, e, qe, Nt);
      }
      s !== null && !T && ug(s, t, r), u !== null && ug(u, t, r);
    }
  }
  var PE = function(e, t) {
    {
      var r = /* @__PURE__ */ new Set(), i = new Set(t.map(function(s) {
        return s.current;
      }));
      return cg(e.current, i, r), r;
    }
  };
  function cg(e, t, r) {
    {
      var i = e.child, s = e.sibling, u = e.tag, f = e.type, h = null;
      switch (u) {
        case y:
        case P:
        case C:
          h = f;
          break;
        case M:
          h = f.render;
          break;
      }
      var m = !1;
      h !== null && t.has(h) && (m = !0), m ? UE(e, r) : i !== null && cg(i, t, r), s !== null && cg(s, t, r);
    }
  }
  function UE(e, t) {
    {
      var r = FE(e, t);
      if (r)
        return;
      for (var i = e; ; ) {
        switch (i.tag) {
          case S:
            t.add(i.stateNode);
            return;
          case R:
            t.add(i.stateNode.containerInfo);
            return;
          case _:
            t.add(i.stateNode.containerInfo);
            return;
        }
        if (i.return === null)
          throw new Error("Expected to reach root first.");
        i = i.return;
      }
    }
  }
  function FE(e, t) {
    for (var r = e, i = !1; ; ) {
      if (r.tag === S)
        i = !0, t.add(r.stateNode);
      else if (r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === e)
        return i;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === e)
          return i;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
    return !1;
  }
  var dg;
  {
    dg = !1;
    try {
      var CC = Object.preventExtensions({});
    } catch {
      dg = !0;
    }
  }
  function VE(e, t, r, i) {
    this.tag = e, this.key = r, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = De, this.subtreeFlags = De, this.deletions = null, this.lanes = Q, this.childLanes = Q, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !dg && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var Er = function(e, t, r, i) {
    return new VE(e, t, r, i);
  };
  function fg(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function HE(e) {
    return typeof e == "function" && !fg(e) && e.defaultProps === void 0;
  }
  function BE(e) {
    if (typeof e == "function")
      return fg(e) ? C : y;
    if (e != null) {
      var t = e.$$typeof;
      if (t === be)
        return M;
      if (t === Ge)
        return N;
    }
    return $;
  }
  function Io(e, t) {
    var r = e.alternate;
    r === null ? (r = Er(e.tag, t, e.key, e.mode), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r._debugSource = e._debugSource, r._debugOwner = e._debugOwner, r._debugHookTypes = e._debugHookTypes, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.type = e.type, r.flags = De, r.subtreeFlags = De, r.deletions = null, r.actualDuration = 0, r.actualStartTime = -1), r.flags = e.flags & Va, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue;
    var i = e.dependencies;
    switch (r.dependencies = i === null ? null : {
      lanes: i.lanes,
      firstContext: i.firstContext
    }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r.selfBaseDuration = e.selfBaseDuration, r.treeBaseDuration = e.treeBaseDuration, r._debugNeedsRemount = e._debugNeedsRemount, r.tag) {
      case $:
      case y:
      case P:
        r.type = Vs(e.type);
        break;
      case C:
        r.type = sg(e.type);
        break;
      case M:
        r.type = lg(e.type);
        break;
    }
    return r;
  }
  function jE(e, t) {
    e.flags &= Va | on;
    var r = e.alternate;
    if (r === null)
      e.childLanes = Q, e.lanes = t, e.child = null, e.subtreeFlags = De, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
    else {
      e.childLanes = r.childLanes, e.lanes = r.lanes, e.child = r.child, e.subtreeFlags = De, e.deletions = null, e.memoizedProps = r.memoizedProps, e.memoizedState = r.memoizedState, e.updateQueue = r.updateQueue, e.type = r.type;
      var i = r.dependencies;
      e.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, e.selfBaseDuration = r.selfBaseDuration, e.treeBaseDuration = r.treeBaseDuration;
    }
    return e;
  }
  function GE(e, t, r) {
    var i;
    return e === Cd ? (i = tt, t === !0 && (i |= sn, i |= va)) : i = Oe, Gr && (i |= St), Er(_, null, null, i);
  }
  function pg(e, t, r, i, s, u) {
    var f = $, h = e;
    if (typeof e == "function")
      fg(e) ? (f = C, h = sg(h)) : h = Vs(h);
    else if (typeof e == "string")
      f = S;
    else
      e:
        switch (e) {
          case da:
            return Bi(r.children, s, u, t);
          case to:
            f = D, s |= sn, (s & tt) !== Oe && (s |= va);
            break;
          case A:
            return YE(r, s, u, t);
          case Xe:
            return WE(r, s, u, t);
          case lt:
            return KE(r, s, u, t);
          case Vt:
            return SC(r, s, u, t);
          case Bn:
          case pn:
          case fa:
          case Bo:
          case Ft:
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case te:
                  f = L;
                  break e;
                case ce:
                  f = z;
                  break e;
                case be:
                  f = M, h = lg(h);
                  break e;
                case Ge:
                  f = N;
                  break e;
                case Te:
                  f = J, h = null;
                  break e;
              }
            var m = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (m += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var E = i ? He(i) : null;
              E && (m += `

Check the render method of \`` + E + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + m));
          }
        }
    var T = Er(f, r, t, s);
    return T.elementType = e, T.type = h, T.lanes = u, T._debugOwner = i, T;
  }
  function hg(e, t, r) {
    var i = null;
    i = e._owner;
    var s = e.type, u = e.key, f = e.props, h = pg(s, u, f, i, t, r);
    return h._debugSource = e._source, h._debugOwner = e._owner, h;
  }
  function Bi(e, t, r, i) {
    var s = Er(x, e, i, t);
    return s.lanes = r, s;
  }
  function YE(e, t, r, i) {
    typeof e.id != "string" && d('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var s = Er(V, e, i, t | St);
    return s.elementType = A, s.lanes = r, s.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, s;
  }
  function WE(e, t, r, i) {
    var s = Er(H, e, i, t);
    return s.elementType = Xe, s.lanes = r, s;
  }
  function KE(e, t, r, i) {
    var s = Er(ae, e, i, t);
    return s.elementType = lt, s.lanes = r, s;
  }
  function SC(e, t, r, i) {
    var s = Er(re, e, i, t);
    s.elementType = Vt, s.lanes = r;
    var u = {
      isHidden: !1
    };
    return s.stateNode = u, s;
  }
  function vg(e, t, r) {
    var i = Er(k, e, null, t);
    return i.lanes = r, i;
  }
  function ZE() {
    var e = Er(S, null, null, Oe);
    return e.elementType = "DELETED", e;
  }
  function XE(e) {
    var t = Er(we, null, null, Oe);
    return t.stateNode = e, t;
  }
  function mg(e, t, r) {
    var i = e.children !== null ? e.children : [], s = Er(R, i, e.key, t);
    return s.lanes = r, s.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, s;
  }
  function _C(e, t) {
    return e === null && (e = Er($, null, null, Oe)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function QE(e, t, r, i, s) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Xh, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = kn, this.eventTimes = wh(Q), this.expirationTimes = wh(Nt), this.pendingLanes = Q, this.suspendedLanes = Q, this.pingedLanes = Q, this.expiredLanes = Q, this.mutableReadLanes = Q, this.finishedLanes = Q, this.entangledLanes = Q, this.entanglements = wh(Q), this.identifierPrefix = i, this.onRecoverableError = s, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
    {
      this.memoizedUpdaters = /* @__PURE__ */ new Set();
      for (var u = this.pendingUpdatersLaneMap = [], f = 0; f < Xp; f++)
        u.push(/* @__PURE__ */ new Set());
    }
    switch (t) {
      case Cd:
        this._debugRootType = r ? "hydrateRoot()" : "createRoot()";
        break;
      case Oi:
        this._debugRootType = r ? "hydrate()" : "render()";
        break;
    }
  }
  function xC(e, t, r, i, s, u, f, h, m, E) {
    var T = new QE(e, t, r, h, m), q = GE(t, u);
    T.current = q, q.stateNode = T;
    {
      var I = {
        element: i,
        isDehydrated: r,
        cache: null,
        // not enabled yet
        transitions: null,
        pendingSuspenseBoundaries: null
      };
      q.memoizedState = I;
    }
    return xv(q), T;
  }
  var gg = "18.2.0";
  function JE(e, t, r) {
    var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
    return Hn(i), {
      // This tag allow us to uniquely identify this as a React Portal
      $$typeof: Br,
      key: i == null ? null : "" + i,
      children: e,
      containerInfo: t,
      implementation: r
    };
  }
  var yg, bg;
  yg = !1, bg = {};
  function EC(e) {
    if (!e)
      return xr;
    var t = ns(e), r = q_(t);
    if (t.tag === C) {
      var i = t.type;
      if (ya(i))
        return Xb(t, i, r);
    }
    return r;
  }
  function eR(e, t) {
    {
      var r = ns(e);
      if (r === void 0) {
        if (typeof e.render == "function")
          throw new Error("Unable to find node on an unmounted component.");
        var i = Object.keys(e).join(",");
        throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
      }
      var s = C1(r);
      if (s === null)
        return null;
      if (s.mode & sn) {
        var u = He(r) || "Component";
        if (!bg[u]) {
          bg[u] = !0;
          var f = jn;
          try {
            Gt(s), r.mode & sn ? d("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, u) : d("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, u);
          } finally {
            f ? Gt(f) : xn();
          }
        }
      }
      return s.stateNode;
    }
  }
  function RC(e, t, r, i, s, u, f, h) {
    var m = !1, E = null;
    return xC(e, t, m, E, r, i, s, u, f);
  }
  function kC(e, t, r, i, s, u, f, h, m, E) {
    var T = !0, q = xC(r, i, T, e, s, u, f, h, m);
    q.context = EC(null);
    var I = q.current, B = nr(), j = Vi(I), W = Xa(B, j);
    return W.callback = t ?? null, Mi(I, W, j), sE(q, j, B), q;
  }
  function Qu(e, t, r, i) {
    $3(t, e);
    var s = t.current, u = nr(), f = Vi(s);
    K3(f);
    var h = EC(r);
    t.context === null ? t.context = h : t.pendingContext = h, ao && jn !== null && !yg && (yg = !0, d(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, He(jn) || "Unknown"));
    var m = Xa(u, f);
    m.payload = {
      element: e
    }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && d("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), m.callback = i);
    var E = Mi(s, m, f);
    return E !== null && (Cn(E, s, f, u), Md(E, s, f)), f;
  }
  function Rf(e) {
    var t = e.current;
    if (!t.child)
      return null;
    switch (t.child.tag) {
      case S:
        return t.child.stateNode;
      default:
        return t.child.stateNode;
    }
  }
  function tR(e) {
    switch (e.tag) {
      case _: {
        var t = e.stateNode;
        if (jc(t)) {
          var r = a7(t);
          dE(t, r);
        }
        break;
      }
      case H: {
        ti(function() {
          var s = fr(e, qe);
          if (s !== null) {
            var u = nr();
            Cn(s, e, qe, u);
          }
        });
        var i = qe;
        wg(e, i);
        break;
      }
    }
  }
  function TC(e, t) {
    var r = e.memoizedState;
    r !== null && r.dehydrated !== null && (r.retryLane = c7(r.retryLane, t));
  }
  function wg(e, t) {
    TC(e, t);
    var r = e.alternate;
    r && TC(r, t);
  }
  function nR(e) {
    if (e.tag === H) {
      var t = Pl, r = fr(e, t);
      if (r !== null) {
        var i = nr();
        Cn(r, e, t, i);
      }
      wg(e, t);
    }
  }
  function rR(e) {
    if (e.tag === H) {
      var t = Vi(e), r = fr(e, t);
      if (r !== null) {
        var i = nr();
        Cn(r, e, t, i);
      }
      wg(e, t);
    }
  }
  function $C(e) {
    var t = w3(e);
    return t === null ? null : t.stateNode;
  }
  var DC = function(e) {
    return null;
  };
  function aR(e) {
    return DC(e);
  }
  var OC = function(e) {
    return !1;
  };
  function iR(e) {
    return OC(e);
  }
  var AC = null, LC = null, MC = null, IC = null, qC = null, zC = null, NC = null, PC = null, UC = null;
  {
    var FC = function(e, t, r) {
      var i = t[r], s = ht(e) ? e.slice() : Qe({}, e);
      return r + 1 === t.length ? (ht(s) ? s.splice(i, 1) : delete s[i], s) : (s[i] = FC(e[i], t, r + 1), s);
    }, VC = function(e, t) {
      return FC(e, t, 0);
    }, HC = function(e, t, r, i) {
      var s = t[i], u = ht(e) ? e.slice() : Qe({}, e);
      if (i + 1 === t.length) {
        var f = r[i];
        u[f] = u[s], ht(u) ? u.splice(s, 1) : delete u[s];
      } else
        u[s] = HC(
          // $FlowFixMe number or string is fine here
          e[s],
          t,
          r,
          i + 1
        );
      return u;
    }, BC = function(e, t, r) {
      if (t.length !== r.length) {
        p("copyWithRename() expects paths of the same length");
        return;
      } else
        for (var i = 0; i < r.length - 1; i++)
          if (t[i] !== r[i]) {
            p("copyWithRename() expects paths to be the same except for the deepest key");
            return;
          }
      return HC(e, t, r, 0);
    }, jC = function(e, t, r, i) {
      if (r >= t.length)
        return i;
      var s = t[r], u = ht(e) ? e.slice() : Qe({}, e);
      return u[s] = jC(e[s], t, r + 1, i), u;
    }, GC = function(e, t, r) {
      return jC(e, t, 0, r);
    }, Cg = function(e, t) {
      for (var r = e.memoizedState; r !== null && t > 0; )
        r = r.next, t--;
      return r;
    };
    AC = function(e, t, r, i) {
      var s = Cg(e, t);
      if (s !== null) {
        var u = GC(s.memoizedState, r, i);
        s.memoizedState = u, s.baseState = u, e.memoizedProps = Qe({}, e.memoizedProps);
        var f = fr(e, qe);
        f !== null && Cn(f, e, qe, Nt);
      }
    }, LC = function(e, t, r) {
      var i = Cg(e, t);
      if (i !== null) {
        var s = VC(i.memoizedState, r);
        i.memoizedState = s, i.baseState = s, e.memoizedProps = Qe({}, e.memoizedProps);
        var u = fr(e, qe);
        u !== null && Cn(u, e, qe, Nt);
      }
    }, MC = function(e, t, r, i) {
      var s = Cg(e, t);
      if (s !== null) {
        var u = BC(s.memoizedState, r, i);
        s.memoizedState = u, s.baseState = u, e.memoizedProps = Qe({}, e.memoizedProps);
        var f = fr(e, qe);
        f !== null && Cn(f, e, qe, Nt);
      }
    }, IC = function(e, t, r) {
      e.pendingProps = GC(e.memoizedProps, t, r), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var i = fr(e, qe);
      i !== null && Cn(i, e, qe, Nt);
    }, qC = function(e, t) {
      e.pendingProps = VC(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var r = fr(e, qe);
      r !== null && Cn(r, e, qe, Nt);
    }, zC = function(e, t, r) {
      e.pendingProps = BC(e.memoizedProps, t, r), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var i = fr(e, qe);
      i !== null && Cn(i, e, qe, Nt);
    }, NC = function(e) {
      var t = fr(e, qe);
      t !== null && Cn(t, e, qe, Nt);
    }, PC = function(e) {
      DC = e;
    }, UC = function(e) {
      OC = e;
    };
  }
  function oR(e) {
    var t = C1(e);
    return t === null ? null : t.stateNode;
  }
  function sR(e) {
    return null;
  }
  function lR() {
    return jn;
  }
  function uR(e) {
    var t = e.findFiberByHostInstance, r = o.ReactCurrentDispatcher;
    return T3({
      bundleType: e.bundleType,
      version: e.version,
      rendererPackageName: e.rendererPackageName,
      rendererConfig: e.rendererConfig,
      overrideHookState: AC,
      overrideHookStateDeletePath: LC,
      overrideHookStateRenamePath: MC,
      overrideProps: IC,
      overridePropsDeletePath: qC,
      overridePropsRenamePath: zC,
      setErrorHandler: PC,
      setSuspenseHandler: UC,
      scheduleUpdate: NC,
      currentDispatcherRef: r,
      findHostInstanceByFiber: oR,
      findFiberByHostInstance: t || sR,
      // React Refresh
      findHostInstancesForRefresh: PE,
      scheduleRefresh: zE,
      scheduleRoot: NE,
      setRefreshHandler: qE,
      // Enables DevTools to append owner stacks to error messages in DEV mode.
      getCurrentFiber: lR,
      // Enables DevTools to detect reconciler version rather than renderer version
      // which may not match for third party renderers.
      reconcilerVersion: gg
    });
  }
  var YC = typeof reportError == "function" ? (
    // In modern browsers, reportError will dispatch an error event,
    // emulating an uncaught JavaScript error.
    reportError
  ) : function(e) {
    console.error(e);
  };
  function Sg(e) {
    this._internalRoot = e;
  }
  kf.prototype.render = Sg.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
      throw new Error("Cannot update an unmounted root.");
    {
      typeof arguments[1] == "function" ? d("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : Tf(arguments[1]) ? d("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && d("You passed a second argument to root.render(...) but it only accepts one argument.");
      var r = t.containerInfo;
      if (r.nodeType !== an) {
        var i = $C(t.current);
        i && i.parentNode !== r && d("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
      }
    }
    Qu(e, t, null, null);
  }, kf.prototype.unmount = Sg.prototype.unmount = function() {
    typeof arguments[0] == "function" && d("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      iC() && d("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), ti(function() {
        Qu(null, e, null, null);
      }), Gb(t);
    }
  };
  function cR(e, t) {
    if (!Tf(e))
      throw new Error("createRoot(...): Target container is not a DOM element.");
    WC(e);
    var r = !1, i = !1, s = "", u = YC;
    t != null && (t.hydrate ? p("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === ca && d(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (r = !0), t.identifierPrefix !== void 0 && (s = t.identifierPrefix), t.onRecoverableError !== void 0 && (u = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var f = RC(e, Cd, null, r, i, s, u);
    hd(f.current, e);
    var h = e.nodeType === an ? e.parentNode : e;
    return ou(h), new Sg(f);
  }
  function kf(e) {
    this._internalRoot = e;
  }
  function dR(e) {
    e && k7(e);
  }
  kf.prototype.unstable_scheduleHydration = dR;
  function fR(e, t, r) {
    if (!Tf(e))
      throw new Error("hydrateRoot(...): Target container is not a DOM element.");
    WC(e), t === void 0 && d("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var i = r ?? null, s = r != null && r.hydratedSources || null, u = !1, f = !1, h = "", m = YC;
    r != null && (r.unstable_strictMode === !0 && (u = !0), r.identifierPrefix !== void 0 && (h = r.identifierPrefix), r.onRecoverableError !== void 0 && (m = r.onRecoverableError));
    var E = kC(t, null, e, Cd, i, u, f, h, m);
    if (hd(E.current, e), ou(e), s)
      for (var T = 0; T < s.length; T++) {
        var q = s[T];
        w4(E, q);
      }
    return new kf(E);
  }
  function Tf(e) {
    return !!(e && (e.nodeType === cr || e.nodeType === Na || e.nodeType === $p || !ot));
  }
  function Ju(e) {
    return !!(e && (e.nodeType === cr || e.nodeType === Na || e.nodeType === $p || e.nodeType === an && e.nodeValue === " react-mount-point-unstable "));
  }
  function WC(e) {
    e.nodeType === cr && e.tagName && e.tagName.toUpperCase() === "BODY" && d("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), gu(e) && (e._reactRootContainer ? d("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : d("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var pR = o.ReactCurrentOwner, KC;
  KC = function(e) {
    if (e._reactRootContainer && e.nodeType !== an) {
      var t = $C(e._reactRootContainer.current);
      t && t.parentNode !== e && d("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var r = !!e._reactRootContainer, i = _g(e), s = !!(i && $i(i));
    s && !r && d("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === cr && e.tagName && e.tagName.toUpperCase() === "BODY" && d("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
  };
  function _g(e) {
    return e ? e.nodeType === Na ? e.documentElement : e.firstChild : null;
  }
  function ZC() {
  }
  function hR(e, t, r, i, s) {
    if (s) {
      if (typeof i == "function") {
        var u = i;
        i = function() {
          var I = Rf(f);
          u.call(I);
        };
      }
      var f = kC(
        t,
        i,
        e,
        Oi,
        null,
        // hydrationCallbacks
        !1,
        // isStrictMode
        !1,
        // concurrentUpdatesByDefaultOverride,
        "",
        // identifierPrefix
        ZC
      );
      e._reactRootContainer = f, hd(f.current, e);
      var h = e.nodeType === an ? e.parentNode : e;
      return ou(h), ti(), f;
    } else {
      for (var m; m = e.lastChild; )
        e.removeChild(m);
      if (typeof i == "function") {
        var E = i;
        i = function() {
          var I = Rf(T);
          E.call(I);
        };
      }
      var T = RC(
        e,
        Oi,
        null,
        // hydrationCallbacks
        !1,
        // isStrictMode
        !1,
        // concurrentUpdatesByDefaultOverride,
        "",
        // identifierPrefix
        ZC
      );
      e._reactRootContainer = T, hd(T.current, e);
      var q = e.nodeType === an ? e.parentNode : e;
      return ou(q), ti(function() {
        Qu(t, T, r, i);
      }), T;
    }
  }
  function vR(e, t) {
    e !== null && typeof e != "function" && d("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function $f(e, t, r, i, s) {
    KC(r), vR(s === void 0 ? null : s, "render");
    var u = r._reactRootContainer, f;
    if (!u)
      f = hR(r, t, e, s, i);
    else {
      if (f = u, typeof s == "function") {
        var h = s;
        s = function() {
          var m = Rf(f);
          h.call(m);
        };
      }
      Qu(t, f, e, s);
    }
    return Rf(f);
  }
  function mR(e) {
    {
      var t = pR.current;
      if (t !== null && t.stateNode !== null) {
        var r = t.stateNode._warnedAboutRefsInRender;
        r || d("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", pt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === cr ? e : eR(e, "findDOMNode");
  }
  function gR(e, t, r) {
    if (d("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Ju(t))
      throw new Error("Target container is not a DOM element.");
    {
      var i = gu(t) && t._reactRootContainer === void 0;
      i && d("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
    }
    return $f(null, e, t, !0, r);
  }
  function yR(e, t, r) {
    if (d("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Ju(t))
      throw new Error("Target container is not a DOM element.");
    {
      var i = gu(t) && t._reactRootContainer === void 0;
      i && d("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return $f(null, e, t, !1, r);
  }
  function bR(e, t, r, i) {
    if (d("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Ju(r))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !p3(e))
      throw new Error("parentComponent must be a valid React Component");
    return $f(e, t, r, !1, i);
  }
  function wR(e) {
    if (!Ju(e))
      throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
    {
      var t = gu(e) && e._reactRootContainer === void 0;
      t && d("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
    }
    if (e._reactRootContainer) {
      {
        var r = _g(e), i = r && !$i(r);
        i && d("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
      }
      return ti(function() {
        $f(null, null, e, !1, function() {
          e._reactRootContainer = null, Gb(e);
        });
      }), !0;
    } else {
      {
        var s = _g(e), u = !!(s && $i(s)), f = e.nodeType === cr && Ju(e.parentNode) && !!e.parentNode._reactRootContainer;
        u && d("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", f ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
      }
      return !1;
    }
  }
  g7(tR), b7(nR), w7(rR), C7(Yr), S7(h7), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && d("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), n3(_9), i3(eg, fE, ti);
  function CR(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Tf(t))
      throw new Error("Target container is not a DOM element.");
    return JE(e, t, null, r);
  }
  function SR(e, t, r, i) {
    return bR(e, t, r, i);
  }
  var xg = {
    usingClientEntryPoint: !1,
    // Keep in sync with ReactTestUtils.js.
    // This is an array for better minification.
    Events: [$i, bs, vd, u1, c1, eg]
  };
  function _R(e, t) {
    return xg.usingClientEntryPoint || d('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), cR(e, t);
  }
  function xR(e, t, r) {
    return xg.usingClientEntryPoint || d('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), fR(e, t, r);
  }
  function ER(e) {
    return iC() && d("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), ti(e);
  }
  var RR = uR({
    findFiberByHostInstance: wo,
    bundleType: 1,
    version: gg,
    rendererPackageName: "react-dom"
  });
  if (!RR && Je && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var XC = window.location.protocol;
    /^(https?|file):$/.test(XC) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (XC === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  kr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = xg, kr.createPortal = CR, kr.createRoot = _R, kr.findDOMNode = mR, kr.flushSync = ER, kr.hydrate = gR, kr.hydrateRoot = xR, kr.render = yR, kr.unmountComponentAtNode = wR, kr.unstable_batchedUpdates = eg, kr.unstable_renderSubtreeIntoContainer = SR, kr.version = gg, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
rS.exports = kr;
var rl = rS.exports;
const cO = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul"
], un = cO.reduce((n, a) => {
  const o = /* @__PURE__ */ w.forwardRef((l, c) => {
    const { asChild: p, ...d } = l, v = p ? sc : a;
    return w.useEffect(() => {
      window[Symbol.for("radix-ui")] = !0;
    }, []), /* @__PURE__ */ w.createElement(v, dt({}, d, {
      ref: c
    }));
  });
  return o.displayName = `Primitive.${a}`, {
    ...n,
    [a]: o
  };
}, {});
function dO(n, a) {
  n && rl.flushSync(
    () => n.dispatchEvent(a)
  );
}
const Dr = globalThis != null && globalThis.document ? w.useLayoutEffect : () => {
};
function fO(n, a) {
  return w.useReducer((o, l) => {
    const c = a[o][l];
    return c ?? o;
  }, n);
}
const oS = (n) => {
  const { present: a, children: o } = n, l = pO(a), c = typeof o == "function" ? o({
    present: l.isPresent
  }) : w.Children.only(o), p = Fn(l.ref, c.ref);
  return typeof o == "function" || l.isPresent ? /* @__PURE__ */ w.cloneElement(c, {
    ref: p
  }) : null;
};
oS.displayName = "Presence";
function pO(n) {
  const [a, o] = w.useState(), l = w.useRef({}), c = w.useRef(n), p = w.useRef("none"), d = n ? "mounted" : "unmounted", [v, y] = fO(d, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return w.useEffect(() => {
    const C = Af(l.current);
    p.current = v === "mounted" ? C : "none";
  }, [
    v
  ]), Dr(() => {
    const C = l.current, $ = c.current;
    if ($ !== n) {
      const R = p.current, S = Af(C);
      n ? y("MOUNT") : S === "none" || (C == null ? void 0 : C.display) === "none" ? y("UNMOUNT") : y($ && R !== S ? "ANIMATION_OUT" : "UNMOUNT"), c.current = n;
    }
  }, [
    n,
    y
  ]), Dr(() => {
    if (a) {
      const C = (_) => {
        const S = Af(l.current).includes(_.animationName);
        _.target === a && S && rl.flushSync(
          () => y("ANIMATION_END")
        );
      }, $ = (_) => {
        _.target === a && (p.current = Af(l.current));
      };
      return a.addEventListener("animationstart", $), a.addEventListener("animationcancel", C), a.addEventListener("animationend", C), () => {
        a.removeEventListener("animationstart", $), a.removeEventListener("animationcancel", C), a.removeEventListener("animationend", C);
      };
    } else
      y("ANIMATION_END");
  }, [
    a,
    y
  ]), {
    isPresent: [
      "mounted",
      "unmountSuspended"
    ].includes(v),
    ref: w.useCallback((C) => {
      C && (l.current = getComputedStyle(C)), o(C);
    }, [])
  };
}
function Af(n) {
  return (n == null ? void 0 : n.animationName) || "none";
}
const hO = MR["useId".toString()] || (() => {
});
let vO = 0;
function pc(n) {
  const [a, o] = w.useState(hO());
  return Dr(() => {
    n || o(
      (l) => l ?? String(vO++)
    );
  }, [
    n
  ]), n || (a ? `radix-${a}` : "");
}
const mO = /* @__PURE__ */ w.createContext(void 0);
function Sy(n) {
  const a = w.useContext(mO);
  return n || a || "ltr";
}
function gO(n, a = globalThis == null ? void 0 : globalThis.document) {
  const o = $a(n);
  w.useEffect(() => {
    const l = (c) => {
      c.key === "Escape" && o(c);
    };
    return a.addEventListener("keydown", l), () => a.removeEventListener("keydown", l);
  }, [
    o,
    a
  ]);
}
let Ig = 0;
function yO() {
  w.useEffect(() => {
    var n, a;
    const o = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", (n = o[0]) !== null && n !== void 0 ? n : $2()), document.body.insertAdjacentElement("beforeend", (a = o[1]) !== null && a !== void 0 ? a : $2()), Ig++, () => {
      Ig === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach(
        (l) => l.remove()
      ), Ig--;
    };
  }, []);
}
function $2() {
  const n = document.createElement("span");
  return n.setAttribute("data-radix-focus-guard", ""), n.tabIndex = 0, n.style.cssText = "outline: none; opacity: 0; position: fixed; pointer-events: none", n;
}
var Ta = function() {
  return Ta = Object.assign || function(a) {
    for (var o, l = 1, c = arguments.length; l < c; l++) {
      o = arguments[l];
      for (var p in o)
        Object.prototype.hasOwnProperty.call(o, p) && (a[p] = o[p]);
    }
    return a;
  }, Ta.apply(this, arguments);
};
function sS(n, a) {
  var o = {};
  for (var l in n)
    Object.prototype.hasOwnProperty.call(n, l) && a.indexOf(l) < 0 && (o[l] = n[l]);
  if (n != null && typeof Object.getOwnPropertySymbols == "function")
    for (var c = 0, l = Object.getOwnPropertySymbols(n); c < l.length; c++)
      a.indexOf(l[c]) < 0 && Object.prototype.propertyIsEnumerable.call(n, l[c]) && (o[l[c]] = n[l[c]]);
  return o;
}
function bO(n, a, o) {
  if (o || arguments.length === 2)
    for (var l = 0, c = a.length, p; l < c; l++)
      (p || !(l in a)) && (p || (p = Array.prototype.slice.call(a, 0, l)), p[l] = a[l]);
  return n.concat(p || Array.prototype.slice.call(a));
}
var Hf = "right-scroll-bar-position", Bf = "width-before-scroll-bar", wO = "with-scroll-bars-hidden", CO = "--removed-body-scroll-bar-size";
function SO(n, a) {
  return typeof n == "function" ? n(a) : n && (n.current = a), n;
}
function _O(n, a) {
  var o = w.useState(function() {
    return {
      // value
      value: n,
      // last callback
      callback: a,
      // "memoized" public interface
      facade: {
        get current() {
          return o.value;
        },
        set current(l) {
          var c = o.value;
          c !== l && (o.value = l, o.callback(l, c));
        }
      }
    };
  })[0];
  return o.callback = a, o.facade;
}
function xO(n, a) {
  return _O(a || null, function(o) {
    return n.forEach(function(l) {
      return SO(l, o);
    });
  });
}
function EO(n) {
  return n;
}
function RO(n, a) {
  a === void 0 && (a = EO);
  var o = [], l = !1, c = {
    read: function() {
      if (l)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return o.length ? o[o.length - 1] : n;
    },
    useMedium: function(p) {
      var d = a(p, l);
      return o.push(d), function() {
        o = o.filter(function(v) {
          return v !== d;
        });
      };
    },
    assignSyncMedium: function(p) {
      for (l = !0; o.length; ) {
        var d = o;
        o = [], d.forEach(p);
      }
      o = {
        push: function(v) {
          return p(v);
        },
        filter: function() {
          return o;
        }
      };
    },
    assignMedium: function(p) {
      l = !0;
      var d = [];
      if (o.length) {
        var v = o;
        o = [], v.forEach(p), d = o;
      }
      var y = function() {
        var $ = d;
        d = [], $.forEach(p);
      }, C = function() {
        return Promise.resolve().then(y);
      };
      C(), o = {
        push: function($) {
          d.push($), C();
        },
        filter: function($) {
          return d = d.filter($), o;
        }
      };
    }
  };
  return c;
}
function kO(n) {
  n === void 0 && (n = {});
  var a = RO(null);
  return a.options = Ta({ async: !0, ssr: !1 }, n), a;
}
var lS = function(n) {
  var a = n.sideCar, o = sS(n, ["sideCar"]);
  if (!a)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var l = a.read();
  if (!l)
    throw new Error("Sidecar medium not found");
  return w.createElement(l, Ta({}, o));
};
lS.isSideCarExport = !0;
function TO(n, a) {
  return n.useMedium(a), lS;
}
var uS = kO(), qg = function() {
}, cp = w.forwardRef(function(n, a) {
  var o = w.useRef(null), l = w.useState({
    onScrollCapture: qg,
    onWheelCapture: qg,
    onTouchMoveCapture: qg
  }), c = l[0], p = l[1], d = n.forwardProps, v = n.children, y = n.className, C = n.removeScrollBar, $ = n.enabled, _ = n.shards, R = n.sideCar, S = n.noIsolation, k = n.inert, x = n.allowPinchZoom, D = n.as, z = D === void 0 ? "div" : D, L = sS(n, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as"]), M = R, V = xO([o, a]), H = Ta(Ta({}, L), c);
  return w.createElement(
    w.Fragment,
    null,
    $ && w.createElement(M, { sideCar: uS, removeScrollBar: C, shards: _, noIsolation: S, inert: k, setCallbacks: p, allowPinchZoom: !!x, lockRef: o }),
    d ? w.cloneElement(w.Children.only(v), Ta(Ta({}, H), { ref: V })) : w.createElement(z, Ta({}, H, { className: y, ref: V }), v)
  );
});
cp.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
cp.classNames = {
  fullWidth: Bf,
  zeroRight: Hf
};
var D2, $O = function() {
  if (D2)
    return D2;
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function DO() {
  if (!document)
    return null;
  var n = document.createElement("style");
  n.type = "text/css";
  var a = $O();
  return a && n.setAttribute("nonce", a), n;
}
function OO(n, a) {
  n.styleSheet ? n.styleSheet.cssText = a : n.appendChild(document.createTextNode(a));
}
function AO(n) {
  var a = document.head || document.getElementsByTagName("head")[0];
  a.appendChild(n);
}
var LO = function() {
  var n = 0, a = null;
  return {
    add: function(o) {
      n == 0 && (a = DO()) && (OO(a, o), AO(a)), n++;
    },
    remove: function() {
      n--, !n && a && (a.parentNode && a.parentNode.removeChild(a), a = null);
    }
  };
}, MO = function() {
  var n = LO();
  return function(a, o) {
    w.useEffect(function() {
      return n.add(a), function() {
        n.remove();
      };
    }, [a && o]);
  };
}, cS = function() {
  var n = MO(), a = function(o) {
    var l = o.styles, c = o.dynamic;
    return n(l, c), null;
  };
  return a;
}, IO = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, zg = function(n) {
  return parseInt(n || "", 10) || 0;
}, qO = function(n) {
  var a = window.getComputedStyle(document.body), o = a[n === "padding" ? "paddingLeft" : "marginLeft"], l = a[n === "padding" ? "paddingTop" : "marginTop"], c = a[n === "padding" ? "paddingRight" : "marginRight"];
  return [zg(o), zg(l), zg(c)];
}, zO = function(n) {
  if (n === void 0 && (n = "margin"), typeof window > "u")
    return IO;
  var a = qO(n), o = document.documentElement.clientWidth, l = window.innerWidth;
  return {
    left: a[0],
    top: a[1],
    right: a[2],
    gap: Math.max(0, l - o + a[2] - a[0])
  };
}, NO = cS(), PO = function(n, a, o, l) {
  var c = n.left, p = n.top, d = n.right, v = n.gap;
  return o === void 0 && (o = "margin"), `
  .`.concat(wO, ` {
   overflow: hidden `).concat(l, `;
   padding-right: `).concat(v, "px ").concat(l, `;
  }
  body {
    overflow: hidden `).concat(l, `;
    overscroll-behavior: contain;
    `).concat([
    a && "position: relative ".concat(l, ";"),
    o === "margin" && `
    padding-left: `.concat(c, `px;
    padding-top: `).concat(p, `px;
    padding-right: `).concat(d, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(v, "px ").concat(l, `;
    `),
    o === "padding" && "padding-right: ".concat(v, "px ").concat(l, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Hf, ` {
    right: `).concat(v, "px ").concat(l, `;
  }
  
  .`).concat(Bf, ` {
    margin-right: `).concat(v, "px ").concat(l, `;
  }
  
  .`).concat(Hf, " .").concat(Hf, ` {
    right: 0 `).concat(l, `;
  }
  
  .`).concat(Bf, " .").concat(Bf, ` {
    margin-right: 0 `).concat(l, `;
  }
  
  body {
    `).concat(CO, ": ").concat(v, `px;
  }
`);
}, UO = function(n) {
  var a = n.noRelative, o = n.noImportant, l = n.gapMode, c = l === void 0 ? "margin" : l, p = w.useMemo(function() {
    return zO(c);
  }, [c]);
  return w.createElement(NO, { styles: PO(p, !a, c, o ? "" : "!important") });
}, ay = !1;
if (typeof window < "u")
  try {
    var Lf = Object.defineProperty({}, "passive", {
      get: function() {
        return ay = !0, !0;
      }
    });
    window.addEventListener("test", Lf, Lf), window.removeEventListener("test", Lf, Lf);
  } catch {
    ay = !1;
  }
var js = ay ? { passive: !1 } : !1, FO = function(n) {
  return n.tagName === "TEXTAREA";
}, dS = function(n, a) {
  var o = window.getComputedStyle(n);
  return (
    // not-not-scrollable
    o[a] !== "hidden" && // contains scroll inside self
    !(o.overflowY === o.overflowX && !FO(n) && o[a] === "visible")
  );
}, VO = function(n) {
  return dS(n, "overflowY");
}, HO = function(n) {
  return dS(n, "overflowX");
}, O2 = function(n, a) {
  var o = a;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var l = fS(n, o);
    if (l) {
      var c = pS(n, o), p = c[1], d = c[2];
      if (p > d)
        return !0;
    }
    o = o.parentNode;
  } while (o && o !== document.body);
  return !1;
}, BO = function(n) {
  var a = n.scrollTop, o = n.scrollHeight, l = n.clientHeight;
  return [
    a,
    o,
    l
  ];
}, jO = function(n) {
  var a = n.scrollLeft, o = n.scrollWidth, l = n.clientWidth;
  return [
    a,
    o,
    l
  ];
}, fS = function(n, a) {
  return n === "v" ? VO(a) : HO(a);
}, pS = function(n, a) {
  return n === "v" ? BO(a) : jO(a);
}, GO = function(n, a) {
  return n === "h" && a === "rtl" ? -1 : 1;
}, YO = function(n, a, o, l, c) {
  var p = GO(n, window.getComputedStyle(a).direction), d = p * l, v = o.target, y = a.contains(v), C = !1, $ = d > 0, _ = 0, R = 0;
  do {
    var S = pS(n, v), k = S[0], x = S[1], D = S[2], z = x - D - p * k;
    (k || z) && fS(n, v) && (_ += z, R += k), v = v.parentNode;
  } while (
    // portaled content
    !y && v !== document.body || // self content
    y && (a.contains(v) || a === v)
  );
  return ($ && (c && _ === 0 || !c && d > _) || !$ && (c && R === 0 || !c && -d > R)) && (C = !0), C;
}, Mf = function(n) {
  return "changedTouches" in n ? [n.changedTouches[0].clientX, n.changedTouches[0].clientY] : [0, 0];
}, A2 = function(n) {
  return [n.deltaX, n.deltaY];
}, L2 = function(n) {
  return n && "current" in n ? n.current : n;
}, WO = function(n, a) {
  return n[0] === a[0] && n[1] === a[1];
}, KO = function(n) {
  return `
  .block-interactivity-`.concat(n, ` {pointer-events: none;}
  .allow-interactivity-`).concat(n, ` {pointer-events: all;}
`);
}, ZO = 0, Gs = [];
function XO(n) {
  var a = w.useRef([]), o = w.useRef([0, 0]), l = w.useRef(), c = w.useState(ZO++)[0], p = w.useState(function() {
    return cS();
  })[0], d = w.useRef(n);
  w.useEffect(function() {
    d.current = n;
  }, [n]), w.useEffect(function() {
    if (n.inert) {
      document.body.classList.add("block-interactivity-".concat(c));
      var x = bO([n.lockRef.current], (n.shards || []).map(L2), !0).filter(Boolean);
      return x.forEach(function(D) {
        return D.classList.add("allow-interactivity-".concat(c));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(c)), x.forEach(function(D) {
          return D.classList.remove("allow-interactivity-".concat(c));
        });
      };
    }
  }, [n.inert, n.lockRef.current, n.shards]);
  var v = w.useCallback(function(x, D) {
    if ("touches" in x && x.touches.length === 2)
      return !d.current.allowPinchZoom;
    var z = Mf(x), L = o.current, M = "deltaX" in x ? x.deltaX : L[0] - z[0], V = "deltaY" in x ? x.deltaY : L[1] - z[1], H, N = x.target, P = Math.abs(M) > Math.abs(V) ? "h" : "v";
    if ("touches" in x && P === "h" && N.type === "range")
      return !1;
    var J = O2(P, N);
    if (!J)
      return !0;
    if (J ? H = P : (H = P === "v" ? "h" : "v", J = O2(P, N)), !J)
      return !1;
    if (!l.current && "changedTouches" in x && (M || V) && (l.current = H), !H)
      return !0;
    var me = l.current || H;
    return YO(me, D, x, me === "h" ? M : V, !0);
  }, []), y = w.useCallback(function(x) {
    var D = x;
    if (!(!Gs.length || Gs[Gs.length - 1] !== p)) {
      var z = "deltaY" in D ? A2(D) : Mf(D), L = a.current.filter(function(H) {
        return H.name === D.type && H.target === D.target && WO(H.delta, z);
      })[0];
      if (L && L.should) {
        D.cancelable && D.preventDefault();
        return;
      }
      if (!L) {
        var M = (d.current.shards || []).map(L2).filter(Boolean).filter(function(H) {
          return H.contains(D.target);
        }), V = M.length > 0 ? v(D, M[0]) : !d.current.noIsolation;
        V && D.cancelable && D.preventDefault();
      }
    }
  }, []), C = w.useCallback(function(x, D, z, L) {
    var M = { name: x, delta: D, target: z, should: L };
    a.current.push(M), setTimeout(function() {
      a.current = a.current.filter(function(V) {
        return V !== M;
      });
    }, 1);
  }, []), $ = w.useCallback(function(x) {
    o.current = Mf(x), l.current = void 0;
  }, []), _ = w.useCallback(function(x) {
    C(x.type, A2(x), x.target, v(x, n.lockRef.current));
  }, []), R = w.useCallback(function(x) {
    C(x.type, Mf(x), x.target, v(x, n.lockRef.current));
  }, []);
  w.useEffect(function() {
    return Gs.push(p), n.setCallbacks({
      onScrollCapture: _,
      onWheelCapture: _,
      onTouchMoveCapture: R
    }), document.addEventListener("wheel", y, js), document.addEventListener("touchmove", y, js), document.addEventListener("touchstart", $, js), function() {
      Gs = Gs.filter(function(x) {
        return x !== p;
      }), document.removeEventListener("wheel", y, js), document.removeEventListener("touchmove", y, js), document.removeEventListener("touchstart", $, js);
    };
  }, []);
  var S = n.removeScrollBar, k = n.inert;
  return w.createElement(
    w.Fragment,
    null,
    k ? w.createElement(p, { styles: KO(c) }) : null,
    S ? w.createElement(UO, { gapMode: "margin" }) : null
  );
}
const QO = TO(uS, XO);
var hS = w.forwardRef(function(n, a) {
  return w.createElement(cp, Ta({}, n, { ref: a, sideCar: QO }));
});
hS.classNames = cp.classNames;
const JO = hS;
var eA = function(n) {
  if (typeof document > "u")
    return null;
  var a = Array.isArray(n) ? n[0] : n;
  return a.ownerDocument.body;
}, Ys = /* @__PURE__ */ new WeakMap(), If = /* @__PURE__ */ new WeakMap(), qf = {}, Ng = 0, vS = function(n) {
  return n && (n.host || vS(n.parentNode));
}, tA = function(n, a) {
  return a.map(function(o) {
    if (n.contains(o))
      return o;
    var l = vS(o);
    return l && n.contains(l) ? l : (console.error("aria-hidden", o, "in not contained inside", n, ". Doing nothing"), null);
  }).filter(function(o) {
    return !!o;
  });
}, nA = function(n, a, o, l) {
  var c = tA(a, Array.isArray(n) ? n : [n]);
  qf[o] || (qf[o] = /* @__PURE__ */ new WeakMap());
  var p = qf[o], d = [], v = /* @__PURE__ */ new Set(), y = new Set(c), C = function(_) {
    !_ || v.has(_) || (v.add(_), C(_.parentNode));
  };
  c.forEach(C);
  var $ = function(_) {
    !_ || y.has(_) || Array.prototype.forEach.call(_.children, function(R) {
      if (v.has(R))
        $(R);
      else {
        var S = R.getAttribute(l), k = S !== null && S !== "false", x = (Ys.get(R) || 0) + 1, D = (p.get(R) || 0) + 1;
        Ys.set(R, x), p.set(R, D), d.push(R), x === 1 && k && If.set(R, !0), D === 1 && R.setAttribute(o, "true"), k || R.setAttribute(l, "true");
      }
    });
  };
  return $(a), v.clear(), Ng++, function() {
    d.forEach(function(_) {
      var R = Ys.get(_) - 1, S = p.get(_) - 1;
      Ys.set(_, R), p.set(_, S), R || (If.has(_) || _.removeAttribute(l), If.delete(_)), S || _.removeAttribute(o);
    }), Ng--, Ng || (Ys = /* @__PURE__ */ new WeakMap(), Ys = /* @__PURE__ */ new WeakMap(), If = /* @__PURE__ */ new WeakMap(), qf = {});
  };
}, rA = function(n, a, o) {
  o === void 0 && (o = "data-aria-hidden");
  var l = Array.from(Array.isArray(n) ? n : [n]), c = a || eA(n);
  return c ? (l.push.apply(l, Array.from(c.querySelectorAll("[aria-live]"))), nA(l, c, o, "aria-hidden")) : function() {
    return null;
  };
};
function aA(n) {
  const a = w.useRef({
    value: n,
    previous: n
  });
  return w.useMemo(() => (a.current.value !== n && (a.current.previous = a.current.value, a.current.value = n), a.current.previous), [
    n
  ]);
}
function iA(n) {
  const [a, o] = w.useState(void 0);
  return Dr(() => {
    if (n) {
      o({
        width: n.offsetWidth,
        height: n.offsetHeight
      });
      const l = new ResizeObserver((c) => {
        if (!Array.isArray(c) || !c.length)
          return;
        const p = c[0];
        let d, v;
        if ("borderBoxSize" in p) {
          const y = p.borderBoxSize, C = Array.isArray(y) ? y[0] : y;
          d = C.inlineSize, v = C.blockSize;
        } else
          d = n.offsetWidth, v = n.offsetHeight;
        o({
          width: d,
          height: v
        });
      });
      return l.observe(n, {
        box: "border-box"
      }), () => l.unobserve(n);
    } else
      o(void 0);
  }, [
    n
  ]), a;
}
var oA = "q9c0is3", sA = "q9c0isj", lA = { blue: "q9c0isg q9c0ise", red: "q9c0ish q9c0ise", primary: "q9c0isi q9c0ise" }, uA = "q9c0isf", cA = { blue: "q9c0isb q9c0is9", red: "q9c0isc q9c0is9", primary: "q9c0isd q9c0is9" }, dA = "q9c0isa", fA = { blue: "q9c0is6 q9c0is4", red: "q9c0is7 q9c0is4", primary: "q9c0is8 q9c0is4" }, pA = "q9c0is5";
const hc = ({
  children: n,
  className: a,
  variant: o = "blue",
  shouldAnimate: l = !0
}) => /* @__PURE__ */ b.jsxs("div", { className: mt(oA, a), children: [
  /* @__PURE__ */ b.jsx(
    "div",
    {
      className: mt(fA[o], {
        [pA]: l
      })
    }
  ),
  /* @__PURE__ */ b.jsx(
    "div",
    {
      className: mt(cA[o], {
        [dA]: l
      })
    }
  ),
  /* @__PURE__ */ b.jsx(
    "div",
    {
      className: mt(lA[o], {
        [uA]: l
      })
    }
  ),
  /* @__PURE__ */ b.jsx("div", { className: sA, children: n })
] });
function hA(n, a, o) {
  return a in n ? Object.defineProperty(n, a, {
    value: o,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[a] = o, n;
}
function M2(n, a) {
  var o = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(n);
    a && (l = l.filter(function(c) {
      return Object.getOwnPropertyDescriptor(n, c).enumerable;
    })), o.push.apply(o, l);
  }
  return o;
}
function I2(n) {
  for (var a = 1; a < arguments.length; a++) {
    var o = arguments[a] != null ? arguments[a] : {};
    a % 2 ? M2(Object(o), !0).forEach(function(l) {
      hA(n, l, o[l]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o)) : M2(Object(o)).forEach(function(l) {
      Object.defineProperty(n, l, Object.getOwnPropertyDescriptor(o, l));
    });
  }
  return n;
}
var vA = (n, a, o) => {
  for (var l of Object.keys(n)) {
    var c;
    if (n[l] !== ((c = a[l]) !== null && c !== void 0 ? c : o[l]))
      return !1;
  }
  return !0;
}, mA = (n) => (a) => {
  var o = n.defaultClassName, l = I2(I2({}, n.defaultVariants), a);
  for (var c in l) {
    var p, d = (p = l[c]) !== null && p !== void 0 ? p : n.defaultVariants[c];
    if (d != null) {
      var v = d;
      typeof v == "boolean" && (v = v === !0 ? "true" : "false");
      var y = (
        // @ts-expect-error
        n.variantClassNames[c][v]
      );
      y && (o += " " + y);
    }
  }
  for (var [C, $] of n.compoundVariants)
    vA(C, l, n.defaultVariants) && (o += " " + $);
  return o;
};
function gA(n, a) {
  if (typeof n != "object" || n === null)
    return n;
  var o = n[Symbol.toPrimitive];
  if (o !== void 0) {
    var l = o.call(n, a || "default");
    if (typeof l != "object")
      return l;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (a === "string" ? String : Number)(n);
}
function yA(n) {
  var a = gA(n, "string");
  return typeof a == "symbol" ? a : String(a);
}
function bA(n, a, o) {
  return a = yA(a), a in n ? Object.defineProperty(n, a, {
    value: o,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[a] = o, n;
}
function q2(n, a) {
  var o = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(n);
    a && (l = l.filter(function(c) {
      return Object.getOwnPropertyDescriptor(n, c).enumerable;
    })), o.push.apply(o, l);
  }
  return o;
}
function Pg(n) {
  for (var a = 1; a < arguments.length; a++) {
    var o = arguments[a] != null ? arguments[a] : {};
    a % 2 ? q2(Object(o), !0).forEach(function(l) {
      bA(n, l, o[l]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o)) : q2(Object(o)).forEach(function(l) {
      Object.defineProperty(n, l, Object.getOwnPropertyDescriptor(o, l));
    });
  }
  return n;
}
var wA = (n) => function() {
  for (var a = arguments.length, o = new Array(a), l = 0; l < a; l++)
    o[l] = arguments[l];
  var c = Object.assign({}, ...o.map((y) => y.styles)), p = Object.keys(c), d = p.filter((y) => "mappings" in c[y]), v = (y) => {
    var C = [], $ = {}, _ = Pg({}, y), R = !1;
    for (var S of d) {
      var k = y[S];
      if (k != null) {
        var x = c[S];
        R = !0;
        for (var D of x.mappings)
          $[D] = k, _[D] == null && delete _[D];
      }
    }
    var z = R ? Pg(Pg({}, $), _) : y, L = function() {
      var N = z[M], P = c[M];
      try {
        if (P.mappings)
          return "continue";
        if (typeof N == "string" || typeof N == "number") {
          if (!P.values[N].defaultClass)
            throw new Error();
          C.push(P.values[N].defaultClass);
        } else if (Array.isArray(N))
          for (var J = 0; J < N.length; J++) {
            var me = N[J];
            if (me != null) {
              var we = P.responsiveArray[J];
              if (!P.values[me].conditions[we])
                throw new Error();
              C.push(P.values[me].conditions[we]);
            }
          }
        else
          for (var ae in N) {
            var de = N[ae];
            if (de != null) {
              if (!P.values[de].conditions[ae])
                throw new Error();
              C.push(P.values[de].conditions[ae]);
            }
          }
      } catch (Tt) {
        {
          class gt extends Error {
            constructor(ot) {
              super(ot), this.name = "SprinklesError";
            }
          }
          var re = (Et) => typeof Et == "string" ? '"'.concat(Et, '"') : Et, oe = (Et, ot, $t) => {
            throw new gt('"'.concat(Et, '" has no value ').concat(re(ot), ". Possible values are ").concat(Object.keys($t).map(re).join(", ")));
          };
          if (!P)
            throw new gt('"'.concat(M, '" is not a valid sprinkle'));
          if ((typeof N == "string" || typeof N == "number") && (N in P.values || oe(M, N, P.values), !P.values[N].defaultClass))
            throw new gt('"'.concat(M, '" has no default condition. You must specify which conditions to target explicitly. Possible options are ').concat(Object.keys(P.values[N].conditions).map(re).join(", ")));
          if (typeof N == "object") {
            if (!("conditions" in P.values[Object.keys(P.values)[0]]))
              throw new gt('"'.concat(M, '" is not a conditional property'));
            if (Array.isArray(N)) {
              if (!("responsiveArray" in P))
                throw new gt('"'.concat(M, '" does not support responsive arrays'));
              var pe = P.responsiveArray.length;
              if (pe < N.length)
                throw new gt('"'.concat(M, '" only supports up to ').concat(pe, " breakpoints. You passed ").concat(N.length));
              for (var se of N)
                P.values[se] || oe(M, se, P.values);
            } else
              for (var le in N) {
                var Ue = N[le];
                if (Ue != null && (P.values[Ue] || oe(M, Ue, P.values), !P.values[Ue].conditions[le]))
                  throw new gt('"'.concat(M, '" has no condition named ').concat(re(le), ". Possible values are ").concat(Object.keys(P.values[Ue].conditions).map(re).join(", ")));
              }
          }
        }
        throw Tt;
      }
    };
    for (var M in z)
      var V = L();
    return n(C.join(" "));
  };
  return Object.assign(v, {
    properties: new Set(p)
  });
}, CA = (n) => n, SA = function() {
  return wA(CA)(...arguments);
}, oa = SA({ conditions: { defaultCondition: "lightMode", conditionNames: ["lightMode", "darkMode"], responsiveArray: void 0 }, styles: { color: { values: { background: { conditions: { lightMode: "kqvzqt0", darkMode: "kqvzqt1" }, defaultClass: "kqvzqt0" }, mute: { conditions: { lightMode: "kqvzqt2", darkMode: "kqvzqt3" }, defaultClass: "kqvzqt2" }, panel: { conditions: { lightMode: "kqvzqt4", darkMode: "kqvzqt5" }, defaultClass: "kqvzqt4" }, foreground: { conditions: { lightMode: "kqvzqt6", darkMode: "kqvzqt7" }, defaultClass: "kqvzqt6" }, contrast: { conditions: { lightMode: "kqvzqt8", darkMode: "kqvzqt9" }, defaultClass: "kqvzqt8" }, secondary: { conditions: { lightMode: "kqvzqta", darkMode: "kqvzqtb" }, defaultClass: "kqvzqta" }, tertiary: { conditions: { lightMode: "kqvzqtc", darkMode: "kqvzqtd" }, defaultClass: "kqvzqtc" }, placeholder: { conditions: { lightMode: "kqvzqte", darkMode: "kqvzqtf" }, defaultClass: "kqvzqte" }, smooth: { conditions: { lightMode: "kqvzqtg", darkMode: "kqvzqth" }, defaultClass: "kqvzqtg" }, subtle: { conditions: { lightMode: "kqvzqti", darkMode: "kqvzqtj" }, defaultClass: "kqvzqti" }, soft: { conditions: { lightMode: "kqvzqtk", darkMode: "kqvzqtl" }, defaultClass: "kqvzqtk" }, offset: { conditions: { lightMode: "kqvzqtm", darkMode: "kqvzqtn" }, defaultClass: "kqvzqtm" }, primary: { conditions: { lightMode: "kqvzqto", darkMode: "kqvzqtp" }, defaultClass: "kqvzqto" }, primaryHover: { conditions: { lightMode: "kqvzqtq", darkMode: "kqvzqtr" }, defaultClass: "kqvzqtq" }, transparent: { conditions: { lightMode: "kqvzqts", darkMode: "kqvzqtt" }, defaultClass: "kqvzqts" }, error: { conditions: { lightMode: "kqvzqtu", darkMode: "kqvzqtv" }, defaultClass: "kqvzqtu" }, auxiliary: { conditions: { lightMode: "kqvzqtw", darkMode: "kqvzqtx" }, defaultClass: "kqvzqtw" }, success: { conditions: { lightMode: "kqvzqty", darkMode: "kqvzqtz" }, defaultClass: "kqvzqty" }, foregroundSuccess: { conditions: { lightMode: "kqvzqt10", darkMode: "kqvzqt11" }, defaultClass: "kqvzqt10" }, backgroundSuccess: { conditions: { lightMode: "kqvzqt12", darkMode: "kqvzqt13" }, defaultClass: "kqvzqt12" }, failure: { conditions: { lightMode: "kqvzqt14", darkMode: "kqvzqt15" }, defaultClass: "kqvzqt14" }, foregroundFailure: { conditions: { lightMode: "kqvzqt16", darkMode: "kqvzqt17" }, defaultClass: "kqvzqt16" }, backgroundFailure: { conditions: { lightMode: "kqvzqt18", darkMode: "kqvzqt19" }, defaultClass: "kqvzqt18" } } }, backgroundColor: { values: { background: { conditions: { lightMode: "kqvzqt1a", darkMode: "kqvzqt1b" }, defaultClass: "kqvzqt1a" }, mute: { conditions: { lightMode: "kqvzqt1c", darkMode: "kqvzqt1d" }, defaultClass: "kqvzqt1c" }, panel: { conditions: { lightMode: "kqvzqt1e", darkMode: "kqvzqt1f" }, defaultClass: "kqvzqt1e" }, foreground: { conditions: { lightMode: "kqvzqt1g", darkMode: "kqvzqt1h" }, defaultClass: "kqvzqt1g" }, contrast: { conditions: { lightMode: "kqvzqt1i", darkMode: "kqvzqt1j" }, defaultClass: "kqvzqt1i" }, secondary: { conditions: { lightMode: "kqvzqt1k", darkMode: "kqvzqt1l" }, defaultClass: "kqvzqt1k" }, tertiary: { conditions: { lightMode: "kqvzqt1m", darkMode: "kqvzqt1n" }, defaultClass: "kqvzqt1m" }, placeholder: { conditions: { lightMode: "kqvzqt1o", darkMode: "kqvzqt1p" }, defaultClass: "kqvzqt1o" }, smooth: { conditions: { lightMode: "kqvzqt1q", darkMode: "kqvzqt1r" }, defaultClass: "kqvzqt1q" }, subtle: { conditions: { lightMode: "kqvzqt1s", darkMode: "kqvzqt1t" }, defaultClass: "kqvzqt1s" }, soft: { conditions: { lightMode: "kqvzqt1u", darkMode: "kqvzqt1v" }, defaultClass: "kqvzqt1u" }, offset: { conditions: { lightMode: "kqvzqt1w", darkMode: "kqvzqt1x" }, defaultClass: "kqvzqt1w" }, primary: { conditions: { lightMode: "kqvzqt1y", darkMode: "kqvzqt1z" }, defaultClass: "kqvzqt1y" }, primaryHover: { conditions: { lightMode: "kqvzqt20", darkMode: "kqvzqt21" }, defaultClass: "kqvzqt20" }, transparent: { conditions: { lightMode: "kqvzqt22", darkMode: "kqvzqt23" }, defaultClass: "kqvzqt22" }, error: { conditions: { lightMode: "kqvzqt24", darkMode: "kqvzqt25" }, defaultClass: "kqvzqt24" }, auxiliary: { conditions: { lightMode: "kqvzqt26", darkMode: "kqvzqt27" }, defaultClass: "kqvzqt26" }, success: { conditions: { lightMode: "kqvzqt28", darkMode: "kqvzqt29" }, defaultClass: "kqvzqt28" }, foregroundSuccess: { conditions: { lightMode: "kqvzqt2a", darkMode: "kqvzqt2b" }, defaultClass: "kqvzqt2a" }, backgroundSuccess: { conditions: { lightMode: "kqvzqt2c", darkMode: "kqvzqt2d" }, defaultClass: "kqvzqt2c" }, failure: { conditions: { lightMode: "kqvzqt2e", darkMode: "kqvzqt2f" }, defaultClass: "kqvzqt2e" }, foregroundFailure: { conditions: { lightMode: "kqvzqt2g", darkMode: "kqvzqt2h" }, defaultClass: "kqvzqt2g" }, backgroundFailure: { conditions: { lightMode: "kqvzqt2i", darkMode: "kqvzqt2j" }, defaultClass: "kqvzqt2i" } } } } }, { conditions: void 0, styles: { marginY: { mappings: ["marginTop", "marginBottom"] }, marginX: { mappings: ["marginLeft", "marginRight"] }, gap: { values: { 0: { defaultClass: "kqvzqt2k" }, 1: { defaultClass: "kqvzqt2l" }, 2: { defaultClass: "kqvzqt2m" }, 3: { defaultClass: "kqvzqt2n" }, 4: { defaultClass: "kqvzqt2o" }, 5: { defaultClass: "kqvzqt2p" }, 6: { defaultClass: "kqvzqt2q" }, 7: { defaultClass: "kqvzqt2r" }, 8: { defaultClass: "kqvzqt2s" }, 9: { defaultClass: "kqvzqt2t" }, 10: { defaultClass: "kqvzqt2u" }, 11: { defaultClass: "kqvzqt2v" }, 12: { defaultClass: "kqvzqt2w" }, 13: { defaultClass: "kqvzqt2x" }, 14: { defaultClass: "kqvzqt2y" }, 15: { defaultClass: "kqvzqt2z" }, 16: { defaultClass: "kqvzqt30" }, 20: { defaultClass: "kqvzqt31" }, 24: { defaultClass: "kqvzqt32" }, 28: { defaultClass: "kqvzqt33" }, 32: { defaultClass: "kqvzqt34" }, 36: { defaultClass: "kqvzqt35" }, 40: { defaultClass: "kqvzqt36" }, 44: { defaultClass: "kqvzqt37" }, 48: { defaultClass: "kqvzqt38" }, 52: { defaultClass: "kqvzqt39" }, 56: { defaultClass: "kqvzqt3a" }, 60: { defaultClass: "kqvzqt3b" }, 64: { defaultClass: "kqvzqt3c" }, 68: { defaultClass: "kqvzqt3d" }, 72: { defaultClass: "kqvzqt3e" }, 76: { defaultClass: "kqvzqt3f" }, 80: { defaultClass: "kqvzqt3g" }, 96: { defaultClass: "kqvzqt3h" }, px: { defaultClass: "kqvzqt3i" }, "0.25": { defaultClass: "kqvzqt3j" }, "0.5": { defaultClass: "kqvzqt3k" }, "0.75": { defaultClass: "kqvzqt3l" }, "1.5": { defaultClass: "kqvzqt3m" }, "2.5": { defaultClass: "kqvzqt3n" }, "3.5": { defaultClass: "kqvzqt3o" } } }, marginTop: { values: { 0: { defaultClass: "kqvzqt3p" }, 1: { defaultClass: "kqvzqt3q" }, 2: { defaultClass: "kqvzqt3r" }, 3: { defaultClass: "kqvzqt3s" }, 4: { defaultClass: "kqvzqt3t" }, 5: { defaultClass: "kqvzqt3u" }, 6: { defaultClass: "kqvzqt3v" }, 7: { defaultClass: "kqvzqt3w" }, 8: { defaultClass: "kqvzqt3x" }, 9: { defaultClass: "kqvzqt3y" }, 10: { defaultClass: "kqvzqt3z" }, 11: { defaultClass: "kqvzqt40" }, 12: { defaultClass: "kqvzqt41" }, 13: { defaultClass: "kqvzqt42" }, 14: { defaultClass: "kqvzqt43" }, 15: { defaultClass: "kqvzqt44" }, 16: { defaultClass: "kqvzqt45" }, 20: { defaultClass: "kqvzqt46" }, 24: { defaultClass: "kqvzqt47" }, 28: { defaultClass: "kqvzqt48" }, 32: { defaultClass: "kqvzqt49" }, 36: { defaultClass: "kqvzqt4a" }, 40: { defaultClass: "kqvzqt4b" }, 44: { defaultClass: "kqvzqt4c" }, 48: { defaultClass: "kqvzqt4d" }, 52: { defaultClass: "kqvzqt4e" }, 56: { defaultClass: "kqvzqt4f" }, 60: { defaultClass: "kqvzqt4g" }, 64: { defaultClass: "kqvzqt4h" }, 68: { defaultClass: "kqvzqt4i" }, 72: { defaultClass: "kqvzqt4j" }, 76: { defaultClass: "kqvzqt4k" }, 80: { defaultClass: "kqvzqt4l" }, 96: { defaultClass: "kqvzqt4m" }, px: { defaultClass: "kqvzqt4n" }, "0.25": { defaultClass: "kqvzqt4o" }, "0.5": { defaultClass: "kqvzqt4p" }, "0.75": { defaultClass: "kqvzqt4q" }, "1.5": { defaultClass: "kqvzqt4r" }, "2.5": { defaultClass: "kqvzqt4s" }, "3.5": { defaultClass: "kqvzqt4t" } } }, marginBottom: { values: { 0: { defaultClass: "kqvzqt4u" }, 1: { defaultClass: "kqvzqt4v" }, 2: { defaultClass: "kqvzqt4w" }, 3: { defaultClass: "kqvzqt4x" }, 4: { defaultClass: "kqvzqt4y" }, 5: { defaultClass: "kqvzqt4z" }, 6: { defaultClass: "kqvzqt50" }, 7: { defaultClass: "kqvzqt51" }, 8: { defaultClass: "kqvzqt52" }, 9: { defaultClass: "kqvzqt53" }, 10: { defaultClass: "kqvzqt54" }, 11: { defaultClass: "kqvzqt55" }, 12: { defaultClass: "kqvzqt56" }, 13: { defaultClass: "kqvzqt57" }, 14: { defaultClass: "kqvzqt58" }, 15: { defaultClass: "kqvzqt59" }, 16: { defaultClass: "kqvzqt5a" }, 20: { defaultClass: "kqvzqt5b" }, 24: { defaultClass: "kqvzqt5c" }, 28: { defaultClass: "kqvzqt5d" }, 32: { defaultClass: "kqvzqt5e" }, 36: { defaultClass: "kqvzqt5f" }, 40: { defaultClass: "kqvzqt5g" }, 44: { defaultClass: "kqvzqt5h" }, 48: { defaultClass: "kqvzqt5i" }, 52: { defaultClass: "kqvzqt5j" }, 56: { defaultClass: "kqvzqt5k" }, 60: { defaultClass: "kqvzqt5l" }, 64: { defaultClass: "kqvzqt5m" }, 68: { defaultClass: "kqvzqt5n" }, 72: { defaultClass: "kqvzqt5o" }, 76: { defaultClass: "kqvzqt5p" }, 80: { defaultClass: "kqvzqt5q" }, 96: { defaultClass: "kqvzqt5r" }, px: { defaultClass: "kqvzqt5s" }, "0.25": { defaultClass: "kqvzqt5t" }, "0.5": { defaultClass: "kqvzqt5u" }, "0.75": { defaultClass: "kqvzqt5v" }, "1.5": { defaultClass: "kqvzqt5w" }, "2.5": { defaultClass: "kqvzqt5x" }, "3.5": { defaultClass: "kqvzqt5y" } } }, marginLeft: { values: { 0: { defaultClass: "kqvzqt5z" }, 1: { defaultClass: "kqvzqt60" }, 2: { defaultClass: "kqvzqt61" }, 3: { defaultClass: "kqvzqt62" }, 4: { defaultClass: "kqvzqt63" }, 5: { defaultClass: "kqvzqt64" }, 6: { defaultClass: "kqvzqt65" }, 7: { defaultClass: "kqvzqt66" }, 8: { defaultClass: "kqvzqt67" }, 9: { defaultClass: "kqvzqt68" }, 10: { defaultClass: "kqvzqt69" }, 11: { defaultClass: "kqvzqt6a" }, 12: { defaultClass: "kqvzqt6b" }, 13: { defaultClass: "kqvzqt6c" }, 14: { defaultClass: "kqvzqt6d" }, 15: { defaultClass: "kqvzqt6e" }, 16: { defaultClass: "kqvzqt6f" }, 20: { defaultClass: "kqvzqt6g" }, 24: { defaultClass: "kqvzqt6h" }, 28: { defaultClass: "kqvzqt6i" }, 32: { defaultClass: "kqvzqt6j" }, 36: { defaultClass: "kqvzqt6k" }, 40: { defaultClass: "kqvzqt6l" }, 44: { defaultClass: "kqvzqt6m" }, 48: { defaultClass: "kqvzqt6n" }, 52: { defaultClass: "kqvzqt6o" }, 56: { defaultClass: "kqvzqt6p" }, 60: { defaultClass: "kqvzqt6q" }, 64: { defaultClass: "kqvzqt6r" }, 68: { defaultClass: "kqvzqt6s" }, 72: { defaultClass: "kqvzqt6t" }, 76: { defaultClass: "kqvzqt6u" }, 80: { defaultClass: "kqvzqt6v" }, 96: { defaultClass: "kqvzqt6w" }, px: { defaultClass: "kqvzqt6x" }, "0.25": { defaultClass: "kqvzqt6y" }, "0.5": { defaultClass: "kqvzqt6z" }, "0.75": { defaultClass: "kqvzqt70" }, "1.5": { defaultClass: "kqvzqt71" }, "2.5": { defaultClass: "kqvzqt72" }, "3.5": { defaultClass: "kqvzqt73" } } }, marginRight: { values: { 0: { defaultClass: "kqvzqt74" }, 1: { defaultClass: "kqvzqt75" }, 2: { defaultClass: "kqvzqt76" }, 3: { defaultClass: "kqvzqt77" }, 4: { defaultClass: "kqvzqt78" }, 5: { defaultClass: "kqvzqt79" }, 6: { defaultClass: "kqvzqt7a" }, 7: { defaultClass: "kqvzqt7b" }, 8: { defaultClass: "kqvzqt7c" }, 9: { defaultClass: "kqvzqt7d" }, 10: { defaultClass: "kqvzqt7e" }, 11: { defaultClass: "kqvzqt7f" }, 12: { defaultClass: "kqvzqt7g" }, 13: { defaultClass: "kqvzqt7h" }, 14: { defaultClass: "kqvzqt7i" }, 15: { defaultClass: "kqvzqt7j" }, 16: { defaultClass: "kqvzqt7k" }, 20: { defaultClass: "kqvzqt7l" }, 24: { defaultClass: "kqvzqt7m" }, 28: { defaultClass: "kqvzqt7n" }, 32: { defaultClass: "kqvzqt7o" }, 36: { defaultClass: "kqvzqt7p" }, 40: { defaultClass: "kqvzqt7q" }, 44: { defaultClass: "kqvzqt7r" }, 48: { defaultClass: "kqvzqt7s" }, 52: { defaultClass: "kqvzqt7t" }, 56: { defaultClass: "kqvzqt7u" }, 60: { defaultClass: "kqvzqt7v" }, 64: { defaultClass: "kqvzqt7w" }, 68: { defaultClass: "kqvzqt7x" }, 72: { defaultClass: "kqvzqt7y" }, 76: { defaultClass: "kqvzqt7z" }, 80: { defaultClass: "kqvzqt80" }, 96: { defaultClass: "kqvzqt81" }, px: { defaultClass: "kqvzqt82" }, "0.25": { defaultClass: "kqvzqt83" }, "0.5": { defaultClass: "kqvzqt84" }, "0.75": { defaultClass: "kqvzqt85" }, "1.5": { defaultClass: "kqvzqt86" }, "2.5": { defaultClass: "kqvzqt87" }, "3.5": { defaultClass: "kqvzqt88" } } } } });
var _A = mA({ defaultClassName: "_1qam6z30", variantClassNames: { size: { xs: "_1qam6z31", sm: "_1qam6z32", base: "_1qam6z33", xl: "_1qam6z34", "2xl-title": "_1qam6z35" }, weight: { medium: "_1qam6z36", semibold: "_1qam6z37", bold: "_1qam6z38" }, color: { contrast: "_1qam6z39", tertiary: "_1qam6z3a", placeholder: "_1qam6z3b", white: "_1qam6z3c", success: "_1qam6z3d", failure: "_1qam6z3e" } }, defaultVariants: { size: "base", weight: "medium" }, compoundVariants: [] });
const xA = {
  text: {}
}, _y = w.createContext(xA);
_y.displayName = "SlashIDTextContext";
const EA = ({ text: n, children: a }) => {
  const o = w.useMemo(() => ({
    text: n
  }), [n]);
  return /* @__PURE__ */ b.jsx(_y.Provider, { value: o, children: a });
};
function RA() {
  const { text: n } = wt.useContext(_y);
  return n;
}
const Ug = {
  opening: "{{",
  closing: "}}"
};
function mS(n, a) {
  return n.includes(Ug.opening) ? Object.keys(a).reduce(
    (l, c) => l.replace(
      `${Ug.opening}${c}${Ug.closing}`,
      a[c]
    ),
    n
  ) : n;
}
const kA = ({
  as: n,
  t: a,
  tokens: o,
  variant: l,
  className: c,
  children: p
}) => {
  const d = RA(), v = n || "p";
  return /* @__PURE__ */ b.jsxs(
    v,
    {
      className: mt(
        "sid-text",
        `sid-text--${n}`,
        _A(l),
        c
      ),
      children: [
        o ? mS(d[a], o) : d[a],
        p || null
      ]
    }
  );
};
function z2(n, [a, o]) {
  return Math.min(o, Math.max(a, n));
}
const iy = "dismissableLayer.update", TA = "dismissableLayer.pointerDownOutside", $A = "dismissableLayer.focusOutside";
let N2;
const DA = /* @__PURE__ */ w.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), OA = /* @__PURE__ */ w.forwardRef((n, a) => {
  var o;
  const { disableOutsidePointerEvents: l = !1, onEscapeKeyDown: c, onPointerDownOutside: p, onFocusOutside: d, onInteractOutside: v, onDismiss: y, ...C } = n, $ = w.useContext(DA), [_, R] = w.useState(null), S = (o = _ == null ? void 0 : _.ownerDocument) !== null && o !== void 0 ? o : globalThis == null ? void 0 : globalThis.document, [, k] = w.useState({}), x = Fn(
    a,
    (J) => R(J)
  ), D = Array.from($.layers), [z] = [
    ...$.layersWithOutsidePointerEventsDisabled
  ].slice(-1), L = D.indexOf(z), M = _ ? D.indexOf(_) : -1, V = $.layersWithOutsidePointerEventsDisabled.size > 0, H = M >= L, N = AA((J) => {
    const me = J.target, we = [
      ...$.branches
    ].some(
      (ae) => ae.contains(me)
    );
    !H || we || (p == null || p(J), v == null || v(J), J.defaultPrevented || y == null || y());
  }, S), P = LA((J) => {
    const me = J.target;
    [
      ...$.branches
    ].some(
      (ae) => ae.contains(me)
    ) || (d == null || d(J), v == null || v(J), J.defaultPrevented || y == null || y());
  }, S);
  return gO((J) => {
    M === $.layers.size - 1 && (c == null || c(J), !J.defaultPrevented && y && (J.preventDefault(), y()));
  }, S), w.useEffect(() => {
    if (_)
      return l && ($.layersWithOutsidePointerEventsDisabled.size === 0 && (N2 = S.body.style.pointerEvents, S.body.style.pointerEvents = "none"), $.layersWithOutsidePointerEventsDisabled.add(_)), $.layers.add(_), P2(), () => {
        l && $.layersWithOutsidePointerEventsDisabled.size === 1 && (S.body.style.pointerEvents = N2);
      };
  }, [
    _,
    S,
    l,
    $
  ]), w.useEffect(() => () => {
    _ && ($.layers.delete(_), $.layersWithOutsidePointerEventsDisabled.delete(_), P2());
  }, [
    _,
    $
  ]), w.useEffect(() => {
    const J = () => k({});
    return document.addEventListener(iy, J), () => document.removeEventListener(iy, J);
  }, []), /* @__PURE__ */ w.createElement(un.div, dt({}, C, {
    ref: x,
    style: {
      pointerEvents: V ? H ? "auto" : "none" : void 0,
      ...n.style
    },
    onFocusCapture: It(n.onFocusCapture, P.onFocusCapture),
    onBlurCapture: It(n.onBlurCapture, P.onBlurCapture),
    onPointerDownCapture: It(n.onPointerDownCapture, N.onPointerDownCapture)
  }));
});
function AA(n, a = globalThis == null ? void 0 : globalThis.document) {
  const o = $a(n), l = w.useRef(!1), c = w.useRef(() => {
  });
  return w.useEffect(() => {
    const p = (v) => {
      if (v.target && !l.current) {
        let $ = function() {
          gS(TA, o, C, {
            discrete: !0
          });
        };
        var y = $;
        const C = {
          originalEvent: v
        };
        v.pointerType === "touch" ? (a.removeEventListener("click", c.current), c.current = $, a.addEventListener("click", c.current, {
          once: !0
        })) : $();
      }
      l.current = !1;
    }, d = window.setTimeout(() => {
      a.addEventListener("pointerdown", p);
    }, 0);
    return () => {
      window.clearTimeout(d), a.removeEventListener("pointerdown", p), a.removeEventListener("click", c.current);
    };
  }, [
    a,
    o
  ]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => l.current = !0
  };
}
function LA(n, a = globalThis == null ? void 0 : globalThis.document) {
  const o = $a(n), l = w.useRef(!1);
  return w.useEffect(() => {
    const c = (p) => {
      p.target && !l.current && gS($A, o, {
        originalEvent: p
      }, {
        discrete: !1
      });
    };
    return a.addEventListener("focusin", c), () => a.removeEventListener("focusin", c);
  }, [
    a,
    o
  ]), {
    onFocusCapture: () => l.current = !0,
    onBlurCapture: () => l.current = !1
  };
}
function P2() {
  const n = new CustomEvent(iy);
  document.dispatchEvent(n);
}
function gS(n, a, o, { discrete: l }) {
  const c = o.originalEvent.target, p = new CustomEvent(n, {
    bubbles: !1,
    cancelable: !0,
    detail: o
  });
  a && c.addEventListener(n, a, {
    once: !0
  }), l ? dO(c, p) : c.dispatchEvent(p);
}
const Fg = "focusScope.autoFocusOnMount", Vg = "focusScope.autoFocusOnUnmount", U2 = {
  bubbles: !1,
  cancelable: !0
}, MA = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { loop: o = !1, trapped: l = !1, onMountAutoFocus: c, onUnmountAutoFocus: p, ...d } = n, [v, y] = w.useState(null), C = $a(c), $ = $a(p), _ = w.useRef(null), R = Fn(
    a,
    (x) => y(x)
  ), S = w.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  w.useEffect(() => {
    if (l) {
      let L = function(N) {
        if (S.paused || !v)
          return;
        const P = N.target;
        v.contains(P) ? _.current = P : Gi(_.current, {
          select: !0
        });
      }, M = function(N) {
        if (S.paused || !v)
          return;
        const P = N.relatedTarget;
        P !== null && (v.contains(P) || Gi(_.current, {
          select: !0
        }));
      }, V = function(N) {
        const P = document.activeElement;
        for (const J of N)
          J.removedNodes.length > 0 && (v != null && v.contains(P) || Gi(v));
      };
      var x = L, D = M, z = V;
      document.addEventListener("focusin", L), document.addEventListener("focusout", M);
      const H = new MutationObserver(V);
      return v && H.observe(v, {
        childList: !0,
        subtree: !0
      }), () => {
        document.removeEventListener("focusin", L), document.removeEventListener("focusout", M), H.disconnect();
      };
    }
  }, [
    l,
    v,
    S.paused
  ]), w.useEffect(() => {
    if (v) {
      V2.add(S);
      const x = document.activeElement;
      if (!v.contains(x)) {
        const z = new CustomEvent(Fg, U2);
        v.addEventListener(Fg, C), v.dispatchEvent(z), z.defaultPrevented || (IA(UA(yS(v)), {
          select: !0
        }), document.activeElement === x && Gi(v));
      }
      return () => {
        v.removeEventListener(Fg, C), setTimeout(() => {
          const z = new CustomEvent(Vg, U2);
          v.addEventListener(Vg, $), v.dispatchEvent(z), z.defaultPrevented || Gi(x ?? document.body, {
            select: !0
          }), v.removeEventListener(Vg, $), V2.remove(S);
        }, 0);
      };
    }
  }, [
    v,
    C,
    $,
    S
  ]);
  const k = w.useCallback((x) => {
    if (!o && !l || S.paused)
      return;
    const D = x.key === "Tab" && !x.altKey && !x.ctrlKey && !x.metaKey, z = document.activeElement;
    if (D && z) {
      const L = x.currentTarget, [M, V] = qA(L);
      M && V ? !x.shiftKey && z === V ? (x.preventDefault(), o && Gi(M, {
        select: !0
      })) : x.shiftKey && z === M && (x.preventDefault(), o && Gi(V, {
        select: !0
      })) : z === L && x.preventDefault();
    }
  }, [
    o,
    l,
    S.paused
  ]);
  return /* @__PURE__ */ w.createElement(un.div, dt({
    tabIndex: -1
  }, d, {
    ref: R,
    onKeyDown: k
  }));
});
function IA(n, { select: a = !1 } = {}) {
  const o = document.activeElement;
  for (const l of n)
    if (Gi(l, {
      select: a
    }), document.activeElement !== o)
      return;
}
function qA(n) {
  const a = yS(n), o = F2(a, n), l = F2(a.reverse(), n);
  return [
    o,
    l
  ];
}
function yS(n) {
  const a = [], o = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (l) => {
      const c = l.tagName === "INPUT" && l.type === "hidden";
      return l.disabled || l.hidden || c ? NodeFilter.FILTER_SKIP : l.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; o.nextNode(); )
    a.push(o.currentNode);
  return a;
}
function F2(n, a) {
  for (const o of n)
    if (!zA(o, {
      upTo: a
    }))
      return o;
}
function zA(n, { upTo: a }) {
  if (getComputedStyle(n).visibility === "hidden")
    return !0;
  for (; n; ) {
    if (a !== void 0 && n === a)
      return !1;
    if (getComputedStyle(n).display === "none")
      return !0;
    n = n.parentElement;
  }
  return !1;
}
function NA(n) {
  return n instanceof HTMLInputElement && "select" in n;
}
function Gi(n, { select: a = !1 } = {}) {
  if (n && n.focus) {
    const o = document.activeElement;
    n.focus({
      preventScroll: !0
    }), n !== o && NA(n) && a && n.select();
  }
}
const V2 = PA();
function PA() {
  let n = [];
  return {
    add(a) {
      const o = n[0];
      a !== o && (o == null || o.pause()), n = H2(n, a), n.unshift(a);
    },
    remove(a) {
      var o;
      n = H2(n, a), (o = n[0]) === null || o === void 0 || o.resume();
    }
  };
}
function H2(n, a) {
  const o = [
    ...n
  ], l = o.indexOf(a);
  return l !== -1 && o.splice(l, 1), o;
}
function UA(n) {
  return n.filter(
    (a) => a.tagName !== "A"
  );
}
const FA = ["top", "right", "bottom", "left"], Yi = Math.min, Tr = Math.max, Jf = Math.round, zf = Math.floor, Wi = (n) => ({
  x: n,
  y: n
}), VA = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, HA = {
  start: "end",
  end: "start"
};
function oy(n, a, o) {
  return Tr(n, Yi(a, o));
}
function ui(n, a) {
  return typeof n == "function" ? n(a) : n;
}
function ci(n) {
  return n.split("-")[0];
}
function al(n) {
  return n.split("-")[1];
}
function xy(n) {
  return n === "x" ? "y" : "x";
}
function Ey(n) {
  return n === "y" ? "height" : "width";
}
function il(n) {
  return ["top", "bottom"].includes(ci(n)) ? "y" : "x";
}
function Ry(n) {
  return xy(il(n));
}
function BA(n, a, o) {
  o === void 0 && (o = !1);
  const l = al(n), c = Ry(n), p = Ey(c);
  let d = c === "x" ? l === (o ? "end" : "start") ? "right" : "left" : l === "start" ? "bottom" : "top";
  return a.reference[p] > a.floating[p] && (d = ep(d)), [d, ep(d)];
}
function jA(n) {
  const a = ep(n);
  return [sy(n), a, sy(a)];
}
function sy(n) {
  return n.replace(/start|end/g, (a) => HA[a]);
}
function GA(n, a, o) {
  const l = ["left", "right"], c = ["right", "left"], p = ["top", "bottom"], d = ["bottom", "top"];
  switch (n) {
    case "top":
    case "bottom":
      return o ? a ? c : l : a ? l : c;
    case "left":
    case "right":
      return a ? p : d;
    default:
      return [];
  }
}
function YA(n, a, o, l) {
  const c = al(n);
  let p = GA(ci(n), o === "start", l);
  return c && (p = p.map((d) => d + "-" + c), a && (p = p.concat(p.map(sy)))), p;
}
function ep(n) {
  return n.replace(/left|right|bottom|top/g, (a) => VA[a]);
}
function WA(n) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...n
  };
}
function bS(n) {
  return typeof n != "number" ? WA(n) : {
    top: n,
    right: n,
    bottom: n,
    left: n
  };
}
function tp(n) {
  return {
    ...n,
    top: n.y,
    left: n.x,
    right: n.x + n.width,
    bottom: n.y + n.height
  };
}
function B2(n, a, o) {
  let {
    reference: l,
    floating: c
  } = n;
  const p = il(a), d = Ry(a), v = Ey(d), y = ci(a), C = p === "y", $ = l.x + l.width / 2 - c.width / 2, _ = l.y + l.height / 2 - c.height / 2, R = l[v] / 2 - c[v] / 2;
  let S;
  switch (y) {
    case "top":
      S = {
        x: $,
        y: l.y - c.height
      };
      break;
    case "bottom":
      S = {
        x: $,
        y: l.y + l.height
      };
      break;
    case "right":
      S = {
        x: l.x + l.width,
        y: _
      };
      break;
    case "left":
      S = {
        x: l.x - c.width,
        y: _
      };
      break;
    default:
      S = {
        x: l.x,
        y: l.y
      };
  }
  switch (al(a)) {
    case "start":
      S[d] -= R * (o && C ? -1 : 1);
      break;
    case "end":
      S[d] += R * (o && C ? -1 : 1);
      break;
  }
  return S;
}
const KA = async (n, a, o) => {
  const {
    placement: l = "bottom",
    strategy: c = "absolute",
    middleware: p = [],
    platform: d
  } = o, v = p.filter(Boolean), y = await (d.isRTL == null ? void 0 : d.isRTL(a));
  let C = await d.getElementRects({
    reference: n,
    floating: a,
    strategy: c
  }), {
    x: $,
    y: _
  } = B2(C, l, y), R = l, S = {}, k = 0;
  for (let x = 0; x < v.length; x++) {
    const {
      name: D,
      fn: z
    } = v[x], {
      x: L,
      y: M,
      data: V,
      reset: H
    } = await z({
      x: $,
      y: _,
      initialPlacement: l,
      placement: R,
      strategy: c,
      middlewareData: S,
      rects: C,
      platform: d,
      elements: {
        reference: n,
        floating: a
      }
    });
    if ($ = L ?? $, _ = M ?? _, S = {
      ...S,
      [D]: {
        ...S[D],
        ...V
      }
    }, H && k <= 50) {
      k++, typeof H == "object" && (H.placement && (R = H.placement), H.rects && (C = H.rects === !0 ? await d.getElementRects({
        reference: n,
        floating: a,
        strategy: c
      }) : H.rects), {
        x: $,
        y: _
      } = B2(C, R, y)), x = -1;
      continue;
    }
  }
  return {
    x: $,
    y: _,
    placement: R,
    strategy: c,
    middlewareData: S
  };
};
async function lc(n, a) {
  var o;
  a === void 0 && (a = {});
  const {
    x: l,
    y: c,
    platform: p,
    rects: d,
    elements: v,
    strategy: y
  } = n, {
    boundary: C = "clippingAncestors",
    rootBoundary: $ = "viewport",
    elementContext: _ = "floating",
    altBoundary: R = !1,
    padding: S = 0
  } = ui(a, n), k = bS(S), D = v[R ? _ === "floating" ? "reference" : "floating" : _], z = tp(await p.getClippingRect({
    element: (o = await (p.isElement == null ? void 0 : p.isElement(D))) == null || o ? D : D.contextElement || await (p.getDocumentElement == null ? void 0 : p.getDocumentElement(v.floating)),
    boundary: C,
    rootBoundary: $,
    strategy: y
  })), L = _ === "floating" ? {
    ...d.floating,
    x: l,
    y: c
  } : d.reference, M = await (p.getOffsetParent == null ? void 0 : p.getOffsetParent(v.floating)), V = await (p.isElement == null ? void 0 : p.isElement(M)) ? await (p.getScale == null ? void 0 : p.getScale(M)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, H = tp(p.convertOffsetParentRelativeRectToViewportRelativeRect ? await p.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: L,
    offsetParent: M,
    strategy: y
  }) : L);
  return {
    top: (z.top - H.top + k.top) / V.y,
    bottom: (H.bottom - z.bottom + k.bottom) / V.y,
    left: (z.left - H.left + k.left) / V.x,
    right: (H.right - z.right + k.right) / V.x
  };
}
const j2 = (n) => ({
  name: "arrow",
  options: n,
  async fn(a) {
    const {
      x: o,
      y: l,
      placement: c,
      rects: p,
      platform: d,
      elements: v,
      middlewareData: y
    } = a, {
      element: C,
      padding: $ = 0
    } = ui(n, a) || {};
    if (C == null)
      return {};
    const _ = bS($), R = {
      x: o,
      y: l
    }, S = Ry(c), k = Ey(S), x = await d.getDimensions(C), D = S === "y", z = D ? "top" : "left", L = D ? "bottom" : "right", M = D ? "clientHeight" : "clientWidth", V = p.reference[k] + p.reference[S] - R[S] - p.floating[k], H = R[S] - p.reference[S], N = await (d.getOffsetParent == null ? void 0 : d.getOffsetParent(C));
    let P = N ? N[M] : 0;
    (!P || !await (d.isElement == null ? void 0 : d.isElement(N))) && (P = v.floating[M] || p.floating[k]);
    const J = V / 2 - H / 2, me = P / 2 - x[k] / 2 - 1, we = Yi(_[z], me), ae = Yi(_[L], me), de = we, re = P - x[k] - ae, oe = P / 2 - x[k] / 2 + J, pe = oy(de, oe, re), se = !y.arrow && al(c) != null && oe != pe && p.reference[k] / 2 - (oe < de ? we : ae) - x[k] / 2 < 0, le = se ? oe < de ? oe - de : oe - re : 0;
    return {
      [S]: R[S] + le,
      data: {
        [S]: pe,
        centerOffset: oe - pe - le,
        ...se && {
          alignmentOffset: le
        }
      },
      reset: se
    };
  }
}), ZA = function(n) {
  return n === void 0 && (n = {}), {
    name: "flip",
    options: n,
    async fn(a) {
      var o, l;
      const {
        placement: c,
        middlewareData: p,
        rects: d,
        initialPlacement: v,
        platform: y,
        elements: C
      } = a, {
        mainAxis: $ = !0,
        crossAxis: _ = !0,
        fallbackPlacements: R,
        fallbackStrategy: S = "bestFit",
        fallbackAxisSideDirection: k = "none",
        flipAlignment: x = !0,
        ...D
      } = ui(n, a);
      if ((o = p.arrow) != null && o.alignmentOffset)
        return {};
      const z = ci(c), L = ci(v) === v, M = await (y.isRTL == null ? void 0 : y.isRTL(C.floating)), V = R || (L || !x ? [ep(v)] : jA(v));
      !R && k !== "none" && V.push(...YA(v, x, k, M));
      const H = [v, ...V], N = await lc(a, D), P = [];
      let J = ((l = p.flip) == null ? void 0 : l.overflows) || [];
      if ($ && P.push(N[z]), _) {
        const de = BA(c, d, M);
        P.push(N[de[0]], N[de[1]]);
      }
      if (J = [...J, {
        placement: c,
        overflows: P
      }], !P.every((de) => de <= 0)) {
        var me, we;
        const de = (((me = p.flip) == null ? void 0 : me.index) || 0) + 1, re = H[de];
        if (re)
          return {
            data: {
              index: de,
              overflows: J
            },
            reset: {
              placement: re
            }
          };
        let oe = (we = J.filter((pe) => pe.overflows[0] <= 0).sort((pe, se) => pe.overflows[1] - se.overflows[1])[0]) == null ? void 0 : we.placement;
        if (!oe)
          switch (S) {
            case "bestFit": {
              var ae;
              const pe = (ae = J.map((se) => [se.placement, se.overflows.filter((le) => le > 0).reduce((le, Ue) => le + Ue, 0)]).sort((se, le) => se[1] - le[1])[0]) == null ? void 0 : ae[0];
              pe && (oe = pe);
              break;
            }
            case "initialPlacement":
              oe = v;
              break;
          }
        if (c !== oe)
          return {
            reset: {
              placement: oe
            }
          };
      }
      return {};
    }
  };
};
function G2(n, a) {
  return {
    top: n.top - a.height,
    right: n.right - a.width,
    bottom: n.bottom - a.height,
    left: n.left - a.width
  };
}
function Y2(n) {
  return FA.some((a) => n[a] >= 0);
}
const XA = function(n) {
  return n === void 0 && (n = {}), {
    name: "hide",
    options: n,
    async fn(a) {
      const {
        rects: o
      } = a, {
        strategy: l = "referenceHidden",
        ...c
      } = ui(n, a);
      switch (l) {
        case "referenceHidden": {
          const p = await lc(a, {
            ...c,
            elementContext: "reference"
          }), d = G2(p, o.reference);
          return {
            data: {
              referenceHiddenOffsets: d,
              referenceHidden: Y2(d)
            }
          };
        }
        case "escaped": {
          const p = await lc(a, {
            ...c,
            altBoundary: !0
          }), d = G2(p, o.floating);
          return {
            data: {
              escapedOffsets: d,
              escaped: Y2(d)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function QA(n, a) {
  const {
    placement: o,
    platform: l,
    elements: c
  } = n, p = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), d = ci(o), v = al(o), y = il(o) === "y", C = ["left", "top"].includes(d) ? -1 : 1, $ = p && y ? -1 : 1, _ = ui(a, n);
  let {
    mainAxis: R,
    crossAxis: S,
    alignmentAxis: k
  } = typeof _ == "number" ? {
    mainAxis: _,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ..._
  };
  return v && typeof k == "number" && (S = v === "end" ? k * -1 : k), y ? {
    x: S * $,
    y: R * C
  } : {
    x: R * C,
    y: S * $
  };
}
const JA = function(n) {
  return n === void 0 && (n = 0), {
    name: "offset",
    options: n,
    async fn(a) {
      const {
        x: o,
        y: l
      } = a, c = await QA(a, n);
      return {
        x: o + c.x,
        y: l + c.y,
        data: c
      };
    }
  };
}, eL = function(n) {
  return n === void 0 && (n = {}), {
    name: "shift",
    options: n,
    async fn(a) {
      const {
        x: o,
        y: l,
        placement: c
      } = a, {
        mainAxis: p = !0,
        crossAxis: d = !1,
        limiter: v = {
          fn: (D) => {
            let {
              x: z,
              y: L
            } = D;
            return {
              x: z,
              y: L
            };
          }
        },
        ...y
      } = ui(n, a), C = {
        x: o,
        y: l
      }, $ = await lc(a, y), _ = il(ci(c)), R = xy(_);
      let S = C[R], k = C[_];
      if (p) {
        const D = R === "y" ? "top" : "left", z = R === "y" ? "bottom" : "right", L = S + $[D], M = S - $[z];
        S = oy(L, S, M);
      }
      if (d) {
        const D = _ === "y" ? "top" : "left", z = _ === "y" ? "bottom" : "right", L = k + $[D], M = k - $[z];
        k = oy(L, k, M);
      }
      const x = v.fn({
        ...a,
        [R]: S,
        [_]: k
      });
      return {
        ...x,
        data: {
          x: x.x - o,
          y: x.y - l
        }
      };
    }
  };
}, tL = function(n) {
  return n === void 0 && (n = {}), {
    options: n,
    fn(a) {
      const {
        x: o,
        y: l,
        placement: c,
        rects: p,
        middlewareData: d
      } = a, {
        offset: v = 0,
        mainAxis: y = !0,
        crossAxis: C = !0
      } = ui(n, a), $ = {
        x: o,
        y: l
      }, _ = il(c), R = xy(_);
      let S = $[R], k = $[_];
      const x = ui(v, a), D = typeof x == "number" ? {
        mainAxis: x,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...x
      };
      if (y) {
        const M = R === "y" ? "height" : "width", V = p.reference[R] - p.floating[M] + D.mainAxis, H = p.reference[R] + p.reference[M] - D.mainAxis;
        S < V ? S = V : S > H && (S = H);
      }
      if (C) {
        var z, L;
        const M = R === "y" ? "width" : "height", V = ["top", "left"].includes(ci(c)), H = p.reference[_] - p.floating[M] + (V && ((z = d.offset) == null ? void 0 : z[_]) || 0) + (V ? 0 : D.crossAxis), N = p.reference[_] + p.reference[M] + (V ? 0 : ((L = d.offset) == null ? void 0 : L[_]) || 0) - (V ? D.crossAxis : 0);
        k < H ? k = H : k > N && (k = N);
      }
      return {
        [R]: S,
        [_]: k
      };
    }
  };
}, nL = function(n) {
  return n === void 0 && (n = {}), {
    name: "size",
    options: n,
    async fn(a) {
      const {
        placement: o,
        rects: l,
        platform: c,
        elements: p
      } = a, {
        apply: d = () => {
        },
        ...v
      } = ui(n, a), y = await lc(a, v), C = ci(o), $ = al(o), _ = il(o) === "y", {
        width: R,
        height: S
      } = l.floating;
      let k, x;
      C === "top" || C === "bottom" ? (k = C, x = $ === (await (c.isRTL == null ? void 0 : c.isRTL(p.floating)) ? "start" : "end") ? "left" : "right") : (x = C, k = $ === "end" ? "top" : "bottom");
      const D = S - y[k], z = R - y[x], L = !a.middlewareData.shift;
      let M = D, V = z;
      if (_) {
        const N = R - y.left - y.right;
        V = $ || L ? Yi(z, N) : N;
      } else {
        const N = S - y.top - y.bottom;
        M = $ || L ? Yi(D, N) : N;
      }
      if (L && !$) {
        const N = Tr(y.left, 0), P = Tr(y.right, 0), J = Tr(y.top, 0), me = Tr(y.bottom, 0);
        _ ? V = R - 2 * (N !== 0 || P !== 0 ? N + P : Tr(y.left, y.right)) : M = S - 2 * (J !== 0 || me !== 0 ? J + me : Tr(y.top, y.bottom));
      }
      await d({
        ...a,
        availableWidth: V,
        availableHeight: M
      });
      const H = await c.getDimensions(p.floating);
      return R !== H.width || S !== H.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Ki(n) {
  return wS(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function $r(n) {
  var a;
  return (n == null || (a = n.ownerDocument) == null ? void 0 : a.defaultView) || window;
}
function fi(n) {
  var a;
  return (a = (wS(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : a.documentElement;
}
function wS(n) {
  return n instanceof Node || n instanceof $r(n).Node;
}
function di(n) {
  return n instanceof Element || n instanceof $r(n).Element;
}
function Da(n) {
  return n instanceof HTMLElement || n instanceof $r(n).HTMLElement;
}
function W2(n) {
  return typeof ShadowRoot > "u" ? !1 : n instanceof ShadowRoot || n instanceof $r(n).ShadowRoot;
}
function vc(n) {
  const {
    overflow: a,
    overflowX: o,
    overflowY: l,
    display: c
  } = Ur(n);
  return /auto|scroll|overlay|hidden|clip/.test(a + l + o) && !["inline", "contents"].includes(c);
}
function rL(n) {
  return ["table", "td", "th"].includes(Ki(n));
}
function ky(n) {
  const a = Ty(), o = Ur(n);
  return o.transform !== "none" || o.perspective !== "none" || (o.containerType ? o.containerType !== "normal" : !1) || !a && (o.backdropFilter ? o.backdropFilter !== "none" : !1) || !a && (o.filter ? o.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((l) => (o.willChange || "").includes(l)) || ["paint", "layout", "strict", "content"].some((l) => (o.contain || "").includes(l));
}
function aL(n) {
  let a = el(n);
  for (; Da(a) && !dp(a); ) {
    if (ky(a))
      return a;
    a = el(a);
  }
  return null;
}
function Ty() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function dp(n) {
  return ["html", "body", "#document"].includes(Ki(n));
}
function Ur(n) {
  return $r(n).getComputedStyle(n);
}
function fp(n) {
  return di(n) ? {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  } : {
    scrollLeft: n.pageXOffset,
    scrollTop: n.pageYOffset
  };
}
function el(n) {
  if (Ki(n) === "html")
    return n;
  const a = (
    // Step into the shadow DOM of the parent of a slotted node.
    n.assignedSlot || // DOM Element detected.
    n.parentNode || // ShadowRoot detected.
    W2(n) && n.host || // Fallback.
    fi(n)
  );
  return W2(a) ? a.host : a;
}
function CS(n) {
  const a = el(n);
  return dp(a) ? n.ownerDocument ? n.ownerDocument.body : n.body : Da(a) && vc(a) ? a : CS(a);
}
function uc(n, a, o) {
  var l;
  a === void 0 && (a = []), o === void 0 && (o = !0);
  const c = CS(n), p = c === ((l = n.ownerDocument) == null ? void 0 : l.body), d = $r(c);
  return p ? a.concat(d, d.visualViewport || [], vc(c) ? c : [], d.frameElement && o ? uc(d.frameElement) : []) : a.concat(c, uc(c, [], o));
}
function SS(n) {
  const a = Ur(n);
  let o = parseFloat(a.width) || 0, l = parseFloat(a.height) || 0;
  const c = Da(n), p = c ? n.offsetWidth : o, d = c ? n.offsetHeight : l, v = Jf(o) !== p || Jf(l) !== d;
  return v && (o = p, l = d), {
    width: o,
    height: l,
    $: v
  };
}
function $y(n) {
  return di(n) ? n : n.contextElement;
}
function Js(n) {
  const a = $y(n);
  if (!Da(a))
    return Wi(1);
  const o = a.getBoundingClientRect(), {
    width: l,
    height: c,
    $: p
  } = SS(a);
  let d = (p ? Jf(o.width) : o.width) / l, v = (p ? Jf(o.height) : o.height) / c;
  return (!d || !Number.isFinite(d)) && (d = 1), (!v || !Number.isFinite(v)) && (v = 1), {
    x: d,
    y: v
  };
}
const iL = /* @__PURE__ */ Wi(0);
function _S(n) {
  const a = $r(n);
  return !Ty() || !a.visualViewport ? iL : {
    x: a.visualViewport.offsetLeft,
    y: a.visualViewport.offsetTop
  };
}
function oL(n, a, o) {
  return a === void 0 && (a = !1), !o || a && o !== $r(n) ? !1 : a;
}
function Uo(n, a, o, l) {
  a === void 0 && (a = !1), o === void 0 && (o = !1);
  const c = n.getBoundingClientRect(), p = $y(n);
  let d = Wi(1);
  a && (l ? di(l) && (d = Js(l)) : d = Js(n));
  const v = oL(p, o, l) ? _S(p) : Wi(0);
  let y = (c.left + v.x) / d.x, C = (c.top + v.y) / d.y, $ = c.width / d.x, _ = c.height / d.y;
  if (p) {
    const R = $r(p), S = l && di(l) ? $r(l) : l;
    let k = R.frameElement;
    for (; k && l && S !== R; ) {
      const x = Js(k), D = k.getBoundingClientRect(), z = Ur(k), L = D.left + (k.clientLeft + parseFloat(z.paddingLeft)) * x.x, M = D.top + (k.clientTop + parseFloat(z.paddingTop)) * x.y;
      y *= x.x, C *= x.y, $ *= x.x, _ *= x.y, y += L, C += M, k = $r(k).frameElement;
    }
  }
  return tp({
    width: $,
    height: _,
    x: y,
    y: C
  });
}
function sL(n) {
  let {
    rect: a,
    offsetParent: o,
    strategy: l
  } = n;
  const c = Da(o), p = fi(o);
  if (o === p)
    return a;
  let d = {
    scrollLeft: 0,
    scrollTop: 0
  }, v = Wi(1);
  const y = Wi(0);
  if ((c || !c && l !== "fixed") && ((Ki(o) !== "body" || vc(p)) && (d = fp(o)), Da(o))) {
    const C = Uo(o);
    v = Js(o), y.x = C.x + o.clientLeft, y.y = C.y + o.clientTop;
  }
  return {
    width: a.width * v.x,
    height: a.height * v.y,
    x: a.x * v.x - d.scrollLeft * v.x + y.x,
    y: a.y * v.y - d.scrollTop * v.y + y.y
  };
}
function lL(n) {
  return Array.from(n.getClientRects());
}
function xS(n) {
  return Uo(fi(n)).left + fp(n).scrollLeft;
}
function uL(n) {
  const a = fi(n), o = fp(n), l = n.ownerDocument.body, c = Tr(a.scrollWidth, a.clientWidth, l.scrollWidth, l.clientWidth), p = Tr(a.scrollHeight, a.clientHeight, l.scrollHeight, l.clientHeight);
  let d = -o.scrollLeft + xS(n);
  const v = -o.scrollTop;
  return Ur(l).direction === "rtl" && (d += Tr(a.clientWidth, l.clientWidth) - c), {
    width: c,
    height: p,
    x: d,
    y: v
  };
}
function cL(n, a) {
  const o = $r(n), l = fi(n), c = o.visualViewport;
  let p = l.clientWidth, d = l.clientHeight, v = 0, y = 0;
  if (c) {
    p = c.width, d = c.height;
    const C = Ty();
    (!C || C && a === "fixed") && (v = c.offsetLeft, y = c.offsetTop);
  }
  return {
    width: p,
    height: d,
    x: v,
    y
  };
}
function dL(n, a) {
  const o = Uo(n, !0, a === "fixed"), l = o.top + n.clientTop, c = o.left + n.clientLeft, p = Da(n) ? Js(n) : Wi(1), d = n.clientWidth * p.x, v = n.clientHeight * p.y, y = c * p.x, C = l * p.y;
  return {
    width: d,
    height: v,
    x: y,
    y: C
  };
}
function K2(n, a, o) {
  let l;
  if (a === "viewport")
    l = cL(n, o);
  else if (a === "document")
    l = uL(fi(n));
  else if (di(a))
    l = dL(a, o);
  else {
    const c = _S(n);
    l = {
      ...a,
      x: a.x - c.x,
      y: a.y - c.y
    };
  }
  return tp(l);
}
function ES(n, a) {
  const o = el(n);
  return o === a || !di(o) || dp(o) ? !1 : Ur(o).position === "fixed" || ES(o, a);
}
function fL(n, a) {
  const o = a.get(n);
  if (o)
    return o;
  let l = uc(n, [], !1).filter((v) => di(v) && Ki(v) !== "body"), c = null;
  const p = Ur(n).position === "fixed";
  let d = p ? el(n) : n;
  for (; di(d) && !dp(d); ) {
    const v = Ur(d), y = ky(d);
    !y && v.position === "fixed" && (c = null), (p ? !y && !c : !y && v.position === "static" && !!c && ["absolute", "fixed"].includes(c.position) || vc(d) && !y && ES(n, d)) ? l = l.filter(($) => $ !== d) : c = v, d = el(d);
  }
  return a.set(n, l), l;
}
function pL(n) {
  let {
    element: a,
    boundary: o,
    rootBoundary: l,
    strategy: c
  } = n;
  const d = [...o === "clippingAncestors" ? fL(a, this._c) : [].concat(o), l], v = d[0], y = d.reduce((C, $) => {
    const _ = K2(a, $, c);
    return C.top = Tr(_.top, C.top), C.right = Yi(_.right, C.right), C.bottom = Yi(_.bottom, C.bottom), C.left = Tr(_.left, C.left), C;
  }, K2(a, v, c));
  return {
    width: y.right - y.left,
    height: y.bottom - y.top,
    x: y.left,
    y: y.top
  };
}
function hL(n) {
  return SS(n);
}
function vL(n, a, o) {
  const l = Da(a), c = fi(a), p = o === "fixed", d = Uo(n, !0, p, a);
  let v = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const y = Wi(0);
  if (l || !l && !p)
    if ((Ki(a) !== "body" || vc(c)) && (v = fp(a)), l) {
      const C = Uo(a, !0, p, a);
      y.x = C.x + a.clientLeft, y.y = C.y + a.clientTop;
    } else
      c && (y.x = xS(c));
  return {
    x: d.left + v.scrollLeft - y.x,
    y: d.top + v.scrollTop - y.y,
    width: d.width,
    height: d.height
  };
}
function Z2(n, a) {
  return !Da(n) || Ur(n).position === "fixed" ? null : a ? a(n) : n.offsetParent;
}
function RS(n, a) {
  const o = $r(n);
  if (!Da(n))
    return o;
  let l = Z2(n, a);
  for (; l && rL(l) && Ur(l).position === "static"; )
    l = Z2(l, a);
  return l && (Ki(l) === "html" || Ki(l) === "body" && Ur(l).position === "static" && !ky(l)) ? o : l || aL(n) || o;
}
const mL = async function(n) {
  let {
    reference: a,
    floating: o,
    strategy: l
  } = n;
  const c = this.getOffsetParent || RS, p = this.getDimensions;
  return {
    reference: vL(a, await c(o), l),
    floating: {
      x: 0,
      y: 0,
      ...await p(o)
    }
  };
};
function gL(n) {
  return Ur(n).direction === "rtl";
}
const yL = {
  convertOffsetParentRelativeRectToViewportRelativeRect: sL,
  getDocumentElement: fi,
  getClippingRect: pL,
  getOffsetParent: RS,
  getElementRects: mL,
  getClientRects: lL,
  getDimensions: hL,
  getScale: Js,
  isElement: di,
  isRTL: gL
};
function bL(n, a) {
  let o = null, l;
  const c = fi(n);
  function p() {
    clearTimeout(l), o && o.disconnect(), o = null;
  }
  function d(v, y) {
    v === void 0 && (v = !1), y === void 0 && (y = 1), p();
    const {
      left: C,
      top: $,
      width: _,
      height: R
    } = n.getBoundingClientRect();
    if (v || a(), !_ || !R)
      return;
    const S = zf($), k = zf(c.clientWidth - (C + _)), x = zf(c.clientHeight - ($ + R)), D = zf(C), L = {
      rootMargin: -S + "px " + -k + "px " + -x + "px " + -D + "px",
      threshold: Tr(0, Yi(1, y)) || 1
    };
    let M = !0;
    function V(H) {
      const N = H[0].intersectionRatio;
      if (N !== y) {
        if (!M)
          return d();
        N ? d(!1, N) : l = setTimeout(() => {
          d(!1, 1e-7);
        }, 100);
      }
      M = !1;
    }
    try {
      o = new IntersectionObserver(V, {
        ...L,
        // Handle <iframe>s
        root: c.ownerDocument
      });
    } catch {
      o = new IntersectionObserver(V, L);
    }
    o.observe(n);
  }
  return d(!0), p;
}
function wL(n, a, o, l) {
  l === void 0 && (l = {});
  const {
    ancestorScroll: c = !0,
    ancestorResize: p = !0,
    elementResize: d = typeof ResizeObserver == "function",
    layoutShift: v = typeof IntersectionObserver == "function",
    animationFrame: y = !1
  } = l, C = $y(n), $ = c || p ? [...C ? uc(C) : [], ...uc(a)] : [];
  $.forEach((z) => {
    c && z.addEventListener("scroll", o, {
      passive: !0
    }), p && z.addEventListener("resize", o);
  });
  const _ = C && v ? bL(C, o) : null;
  let R = -1, S = null;
  d && (S = new ResizeObserver((z) => {
    let [L] = z;
    L && L.target === C && S && (S.unobserve(a), cancelAnimationFrame(R), R = requestAnimationFrame(() => {
      S && S.observe(a);
    })), o();
  }), C && !y && S.observe(C), S.observe(a));
  let k, x = y ? Uo(n) : null;
  y && D();
  function D() {
    const z = Uo(n);
    x && (z.x !== x.x || z.y !== x.y || z.width !== x.width || z.height !== x.height) && o(), x = z, k = requestAnimationFrame(D);
  }
  return o(), () => {
    $.forEach((z) => {
      c && z.removeEventListener("scroll", o), p && z.removeEventListener("resize", o);
    }), _ && _(), S && S.disconnect(), S = null, y && cancelAnimationFrame(k);
  };
}
const CL = (n, a, o) => {
  const l = /* @__PURE__ */ new Map(), c = {
    platform: yL,
    ...o
  }, p = {
    ...c.platform,
    _c: l
  };
  return KA(n, a, {
    ...c,
    platform: p
  });
}, SL = (n) => {
  function a(o) {
    return {}.hasOwnProperty.call(o, "current");
  }
  return {
    name: "arrow",
    options: n,
    fn(o) {
      const {
        element: l,
        padding: c
      } = typeof n == "function" ? n(o) : n;
      return l && a(l) ? l.current != null ? j2({
        element: l.current,
        padding: c
      }).fn(o) : {} : l ? j2({
        element: l,
        padding: c
      }).fn(o) : {};
    }
  };
};
var jf = typeof document < "u" ? w.useLayoutEffect : w.useEffect;
function np(n, a) {
  if (n === a)
    return !0;
  if (typeof n != typeof a)
    return !1;
  if (typeof n == "function" && n.toString() === a.toString())
    return !0;
  let o, l, c;
  if (n && a && typeof n == "object") {
    if (Array.isArray(n)) {
      if (o = n.length, o != a.length)
        return !1;
      for (l = o; l-- !== 0; )
        if (!np(n[l], a[l]))
          return !1;
      return !0;
    }
    if (c = Object.keys(n), o = c.length, o !== Object.keys(a).length)
      return !1;
    for (l = o; l-- !== 0; )
      if (!{}.hasOwnProperty.call(a, c[l]))
        return !1;
    for (l = o; l-- !== 0; ) {
      const p = c[l];
      if (!(p === "_owner" && n.$$typeof) && !np(n[p], a[p]))
        return !1;
    }
    return !0;
  }
  return n !== n && a !== a;
}
function kS(n) {
  return typeof window > "u" ? 1 : (n.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function X2(n, a) {
  const o = kS(n);
  return Math.round(a * o) / o;
}
function Q2(n) {
  const a = w.useRef(n);
  return jf(() => {
    a.current = n;
  }), a;
}
function _L(n) {
  n === void 0 && (n = {});
  const {
    placement: a = "bottom",
    strategy: o = "absolute",
    middleware: l = [],
    platform: c,
    elements: {
      reference: p,
      floating: d
    } = {},
    transform: v = !0,
    whileElementsMounted: y,
    open: C
  } = n, [$, _] = w.useState({
    x: 0,
    y: 0,
    strategy: o,
    placement: a,
    middlewareData: {},
    isPositioned: !1
  }), [R, S] = w.useState(l);
  np(R, l) || S(l);
  const [k, x] = w.useState(null), [D, z] = w.useState(null), L = w.useCallback((se) => {
    se != N.current && (N.current = se, x(se));
  }, [x]), M = w.useCallback((se) => {
    se !== P.current && (P.current = se, z(se));
  }, [z]), V = p || k, H = d || D, N = w.useRef(null), P = w.useRef(null), J = w.useRef($), me = Q2(y), we = Q2(c), ae = w.useCallback(() => {
    if (!N.current || !P.current)
      return;
    const se = {
      placement: a,
      strategy: o,
      middleware: R
    };
    we.current && (se.platform = we.current), CL(N.current, P.current, se).then((le) => {
      const Ue = {
        ...le,
        isPositioned: !0
      };
      de.current && !np(J.current, Ue) && (J.current = Ue, rl.flushSync(() => {
        _(Ue);
      }));
    });
  }, [R, a, o, we]);
  jf(() => {
    C === !1 && J.current.isPositioned && (J.current.isPositioned = !1, _((se) => ({
      ...se,
      isPositioned: !1
    })));
  }, [C]);
  const de = w.useRef(!1);
  jf(() => (de.current = !0, () => {
    de.current = !1;
  }), []), jf(() => {
    if (V && (N.current = V), H && (P.current = H), V && H) {
      if (me.current)
        return me.current(V, H, ae);
      ae();
    }
  }, [V, H, ae, me]);
  const re = w.useMemo(() => ({
    reference: N,
    floating: P,
    setReference: L,
    setFloating: M
  }), [L, M]), oe = w.useMemo(() => ({
    reference: V,
    floating: H
  }), [V, H]), pe = w.useMemo(() => {
    const se = {
      position: o,
      left: 0,
      top: 0
    };
    if (!oe.floating)
      return se;
    const le = X2(oe.floating, $.x), Ue = X2(oe.floating, $.y);
    return v ? {
      ...se,
      transform: "translate(" + le + "px, " + Ue + "px)",
      ...kS(oe.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: o,
      left: le,
      top: Ue
    };
  }, [o, v, oe.floating, $.x, $.y]);
  return w.useMemo(() => ({
    ...$,
    update: ae,
    refs: re,
    elements: oe,
    floatingStyles: pe
  }), [$, ae, re, oe, pe]);
}
const TS = "Popper", [$S, DS] = fc(TS), [xL, OS] = $S(TS), EL = (n) => {
  const { __scopePopper: a, children: o } = n, [l, c] = w.useState(null);
  return /* @__PURE__ */ w.createElement(xL, {
    scope: a,
    anchor: l,
    onAnchorChange: c
  }, o);
}, RL = "PopperAnchor", kL = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { __scopePopper: o, virtualRef: l, ...c } = n, p = OS(RL, o), d = w.useRef(null), v = Fn(a, d);
  return w.useEffect(() => {
    p.onAnchorChange((l == null ? void 0 : l.current) || d.current);
  }), l ? null : /* @__PURE__ */ w.createElement(un.div, dt({}, c, {
    ref: v
  }));
}), AS = "PopperContent", [TL, Yq] = $S(AS), $L = /* @__PURE__ */ w.forwardRef((n, a) => {
  var o, l, c, p, d, v, y, C;
  const { __scopePopper: $, side: _ = "bottom", sideOffset: R = 0, align: S = "center", alignOffset: k = 0, arrowPadding: x = 0, collisionBoundary: D = [], collisionPadding: z = 0, sticky: L = "partial", hideWhenDetached: M = !1, avoidCollisions: V = !0, onPlaced: H, ...N } = n, P = OS(AS, $), [J, me] = w.useState(null), we = Fn(
    a,
    (Ze) => me(Ze)
  ), [ae, de] = w.useState(null), re = iA(ae), oe = (o = re == null ? void 0 : re.width) !== null && o !== void 0 ? o : 0, pe = (l = re == null ? void 0 : re.height) !== null && l !== void 0 ? l : 0, se = _ + (S !== "center" ? "-" + S : ""), le = typeof z == "number" ? z : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...z
  }, Ue = Array.isArray(D) ? D : [
    D
  ], Tt = Ue.length > 0, gt = {
    padding: le,
    boundary: Ue.filter(DL),
    // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
    altBoundary: Tt
  }, { refs: Et, floatingStyles: ot, placement: $t, isPositioned: Rt, middlewareData: Dt } = _L({
    // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
    strategy: "fixed",
    placement: se,
    whileElementsMounted: wL,
    elements: {
      reference: P.anchor
    },
    middleware: [
      JA({
        mainAxis: R + pe,
        alignmentAxis: k
      }),
      V && eL({
        mainAxis: !0,
        crossAxis: !1,
        limiter: L === "partial" ? tL() : void 0,
        ...gt
      }),
      V && ZA({
        ...gt
      }),
      nL({
        ...gt,
        apply: ({ elements: Ze, rects: qt, availableWidth: kt, availableHeight: bt }) => {
          const { width: dn, height: Hn } = qt.reference, Kt = Ze.floating.style;
          Kt.setProperty("--radix-popper-available-width", `${kt}px`), Kt.setProperty("--radix-popper-available-height", `${bt}px`), Kt.setProperty("--radix-popper-anchor-width", `${dn}px`), Kt.setProperty("--radix-popper-anchor-height", `${Hn}px`);
        }
      }),
      ae && SL({
        element: ae,
        padding: x
      }),
      OL({
        arrowWidth: oe,
        arrowHeight: pe
      }),
      M && XA({
        strategy: "referenceHidden"
      })
    ]
  }), [jt, Re] = LS($t), Fe = $a(H);
  Dr(() => {
    Rt && (Fe == null || Fe());
  }, [
    Rt,
    Fe
  ]);
  const at = (c = Dt.arrow) === null || c === void 0 ? void 0 : c.x, Be = (p = Dt.arrow) === null || p === void 0 ? void 0 : p.y, Ve = ((d = Dt.arrow) === null || d === void 0 ? void 0 : d.centerOffset) !== 0, [Ne, Je] = w.useState();
  return Dr(() => {
    J && Je(window.getComputedStyle(J).zIndex);
  }, [
    J
  ]), /* @__PURE__ */ w.createElement("div", {
    ref: Et.setFloating,
    "data-radix-popper-content-wrapper": "",
    style: {
      ...ot,
      transform: Rt ? ot.transform : "translate(0, -200%)",
      // keep off the page when measuring
      minWidth: "max-content",
      zIndex: Ne,
      "--radix-popper-transform-origin": [
        (v = Dt.transformOrigin) === null || v === void 0 ? void 0 : v.x,
        (y = Dt.transformOrigin) === null || y === void 0 ? void 0 : y.y
      ].join(" ")
    },
    dir: n.dir
  }, /* @__PURE__ */ w.createElement(TL, {
    scope: $,
    placedSide: jt,
    onArrowChange: de,
    arrowX: at,
    arrowY: Be,
    shouldHideArrow: Ve
  }, /* @__PURE__ */ w.createElement(un.div, dt({
    "data-side": jt,
    "data-align": Re
  }, N, {
    ref: we,
    style: {
      ...N.style,
      // if the PopperContent hasn't been placed yet (not all measurements done)
      // we prevent animations so that users's animation don't kick in too early referring wrong sides
      animation: Rt ? void 0 : "none",
      // hide the content if using the hide middleware and should be hidden
      opacity: (C = Dt.hide) !== null && C !== void 0 && C.referenceHidden ? 0 : void 0
    }
  }))));
});
function DL(n) {
  return n !== null;
}
const OL = (n) => ({
  name: "transformOrigin",
  options: n,
  fn(a) {
    var o, l, c, p, d;
    const { placement: v, rects: y, middlewareData: C } = a, _ = ((o = C.arrow) === null || o === void 0 ? void 0 : o.centerOffset) !== 0, R = _ ? 0 : n.arrowWidth, S = _ ? 0 : n.arrowHeight, [k, x] = LS(v), D = {
      start: "0%",
      center: "50%",
      end: "100%"
    }[x], z = ((l = (c = C.arrow) === null || c === void 0 ? void 0 : c.x) !== null && l !== void 0 ? l : 0) + R / 2, L = ((p = (d = C.arrow) === null || d === void 0 ? void 0 : d.y) !== null && p !== void 0 ? p : 0) + S / 2;
    let M = "", V = "";
    return k === "bottom" ? (M = _ ? D : `${z}px`, V = `${-S}px`) : k === "top" ? (M = _ ? D : `${z}px`, V = `${y.floating.height + S}px`) : k === "right" ? (M = `${-S}px`, V = _ ? D : `${L}px`) : k === "left" && (M = `${y.floating.width + S}px`, V = _ ? D : `${L}px`), {
      data: {
        x: M,
        y: V
      }
    };
  }
});
function LS(n) {
  const [a, o = "center"] = n.split("-");
  return [
    a,
    o
  ];
}
const AL = EL, LL = kL, ML = $L, IL = /* @__PURE__ */ w.forwardRef((n, a) => /* @__PURE__ */ w.createElement(un.span, dt({}, n, {
  ref: a,
  style: {
    // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
    position: "absolute",
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal",
    ...n.style
  }
}))), qL = [
  " ",
  "Enter",
  "ArrowUp",
  "ArrowDown"
], zL = [
  " ",
  "Enter"
], pp = "Select", [hp, vp, NL] = nS(pp), [ol, Wq] = fc(pp, [
  NL,
  DS
]), Dy = DS(), [PL, Vo] = ol(pp), [UL, FL] = ol(pp), VL = (n) => {
  const { __scopeSelect: a, children: o, open: l, defaultOpen: c, onOpenChange: p, value: d, defaultValue: v, onValueChange: y, dir: C, name: $, autoComplete: _, disabled: R, required: S } = n, k = Dy(a), [x, D] = w.useState(null), [z, L] = w.useState(null), [M, V] = w.useState(!1), H = Sy(C), [N = !1, P] = Qf({
    prop: l,
    defaultProp: c,
    onChange: p
  }), [J, me] = Qf({
    prop: d,
    defaultProp: v,
    onChange: y
  }), we = w.useRef(null), ae = x ? !!x.closest("form") : !0, [de, re] = w.useState(/* @__PURE__ */ new Set()), oe = Array.from(de).map(
    (pe) => pe.props.value
  ).join(";");
  return /* @__PURE__ */ w.createElement(AL, k, /* @__PURE__ */ w.createElement(PL, {
    required: S,
    scope: a,
    trigger: x,
    onTriggerChange: D,
    valueNode: z,
    onValueNodeChange: L,
    valueNodeHasChildren: M,
    onValueNodeHasChildrenChange: V,
    contentId: pc(),
    value: J,
    onValueChange: me,
    open: N,
    onOpenChange: P,
    dir: H,
    triggerPointerDownPosRef: we,
    disabled: R
  }, /* @__PURE__ */ w.createElement(hp.Provider, {
    scope: a
  }, /* @__PURE__ */ w.createElement(UL, {
    scope: n.__scopeSelect,
    onNativeOptionAdd: w.useCallback((pe) => {
      re(
        (se) => new Set(se).add(pe)
      );
    }, []),
    onNativeOptionRemove: w.useCallback((pe) => {
      re((se) => {
        const le = new Set(se);
        return le.delete(pe), le;
      });
    }, [])
  }, o)), ae ? /* @__PURE__ */ w.createElement(zS, {
    key: oe,
    "aria-hidden": !0,
    required: S,
    tabIndex: -1,
    name: $,
    autoComplete: _,
    value: J,
    onChange: (pe) => me(pe.target.value),
    disabled: R
  }, J === void 0 ? /* @__PURE__ */ w.createElement("option", {
    value: ""
  }) : null, Array.from(de)) : null));
}, HL = "SelectTrigger", BL = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { __scopeSelect: o, disabled: l = !1, ...c } = n, p = Dy(o), d = Vo(HL, o), v = d.disabled || l, y = Fn(a, d.onTriggerChange), C = vp(o), [$, _, R] = NS((k) => {
    const x = C().filter(
      (L) => !L.disabled
    ), D = x.find(
      (L) => L.value === d.value
    ), z = PS(x, k, D);
    z !== void 0 && d.onValueChange(z.value);
  }), S = () => {
    v || (d.onOpenChange(!0), R());
  };
  return /* @__PURE__ */ w.createElement(LL, dt({
    asChild: !0
  }, p), /* @__PURE__ */ w.createElement(un.button, dt({
    type: "button",
    role: "combobox",
    "aria-controls": d.contentId,
    "aria-expanded": d.open,
    "aria-required": d.required,
    "aria-autocomplete": "none",
    dir: d.dir,
    "data-state": d.open ? "open" : "closed",
    disabled: v,
    "data-disabled": v ? "" : void 0,
    "data-placeholder": d.value === void 0 ? "" : void 0
  }, c, {
    ref: y,
    onClick: It(c.onClick, (k) => {
      k.currentTarget.focus();
    }),
    onPointerDown: It(c.onPointerDown, (k) => {
      const x = k.target;
      x.hasPointerCapture(k.pointerId) && x.releasePointerCapture(k.pointerId), k.button === 0 && k.ctrlKey === !1 && (S(), d.triggerPointerDownPosRef.current = {
        x: Math.round(k.pageX),
        y: Math.round(k.pageY)
      }, k.preventDefault());
    }),
    onKeyDown: It(c.onKeyDown, (k) => {
      const x = $.current !== "";
      !(k.ctrlKey || k.altKey || k.metaKey) && k.key.length === 1 && _(k.key), !(x && k.key === " ") && qL.includes(k.key) && (S(), k.preventDefault());
    })
  })));
}), jL = "SelectValue", GL = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { __scopeSelect: o, className: l, style: c, children: p, placeholder: d, ...v } = n, y = Vo(jL, o), { onValueNodeHasChildrenChange: C } = y, $ = p !== void 0, _ = Fn(a, y.onValueNodeChange);
  return Dr(() => {
    C($);
  }, [
    C,
    $
  ]), /* @__PURE__ */ w.createElement(un.span, dt({}, v, {
    ref: _,
    style: {
      pointerEvents: "none"
    }
  }), y.value === void 0 && d !== void 0 ? d : p);
}), tl = "SelectContent", YL = /* @__PURE__ */ w.forwardRef((n, a) => {
  const o = Vo(tl, n.__scopeSelect), [l, c] = w.useState();
  if (Dr(() => {
    c(new DocumentFragment());
  }, []), !o.open) {
    const p = l;
    return p ? /* @__PURE__ */ rl.createPortal(/* @__PURE__ */ w.createElement(MS, {
      scope: n.__scopeSelect
    }, /* @__PURE__ */ w.createElement(hp.Slot, {
      scope: n.__scopeSelect
    }, /* @__PURE__ */ w.createElement("div", null, n.children))), p) : null;
  }
  return /* @__PURE__ */ w.createElement(WL, dt({}, n, {
    ref: a
  }));
}), ii = 10, [MS, sl] = ol(tl), WL = /* @__PURE__ */ w.forwardRef((n, a) => {
  const {
    __scopeSelect: o,
    position: l = "item-aligned",
    onCloseAutoFocus: c,
    onEscapeKeyDown: p,
    onPointerDownOutside: d,
    side: v,
    sideOffset: y,
    align: C,
    alignOffset: $,
    arrowPadding: _,
    collisionBoundary: R,
    collisionPadding: S,
    sticky: k,
    hideWhenDetached: x,
    avoidCollisions: D,
    //
    ...z
  } = n, L = Vo(tl, o), [M, V] = w.useState(null), [H, N] = w.useState(null), P = Fn(
    a,
    (Re) => V(Re)
  ), [J, me] = w.useState(null), [we, ae] = w.useState(null), de = vp(o), [re, oe] = w.useState(!1), pe = w.useRef(!1);
  w.useEffect(() => {
    if (M)
      return rA(M);
  }, [
    M
  ]), yO();
  const se = w.useCallback((Re) => {
    const [Fe, ...at] = de().map(
      (Ne) => Ne.ref.current
    ), [Be] = at.slice(-1), Ve = document.activeElement;
    for (const Ne of Re)
      if (Ne === Ve || (Ne == null || Ne.scrollIntoView({
        block: "nearest"
      }), Ne === Fe && H && (H.scrollTop = 0), Ne === Be && H && (H.scrollTop = H.scrollHeight), Ne == null || Ne.focus(), document.activeElement !== Ve))
        return;
  }, [
    de,
    H
  ]), le = w.useCallback(
    () => se([
      J,
      M
    ]),
    [
      se,
      J,
      M
    ]
  );
  w.useEffect(() => {
    re && le();
  }, [
    re,
    le
  ]);
  const { onOpenChange: Ue, triggerPointerDownPosRef: Tt } = L;
  w.useEffect(() => {
    if (M) {
      let Re = {
        x: 0,
        y: 0
      };
      const Fe = (Be) => {
        var Ve, Ne, Je, Ze;
        Re = {
          x: Math.abs(Math.round(Be.pageX) - ((Ve = (Ne = Tt.current) === null || Ne === void 0 ? void 0 : Ne.x) !== null && Ve !== void 0 ? Ve : 0)),
          y: Math.abs(Math.round(Be.pageY) - ((Je = (Ze = Tt.current) === null || Ze === void 0 ? void 0 : Ze.y) !== null && Je !== void 0 ? Je : 0))
        };
      }, at = (Be) => {
        Re.x <= 10 && Re.y <= 10 ? Be.preventDefault() : M.contains(Be.target) || Ue(!1), document.removeEventListener("pointermove", Fe), Tt.current = null;
      };
      return Tt.current !== null && (document.addEventListener("pointermove", Fe), document.addEventListener("pointerup", at, {
        capture: !0,
        once: !0
      })), () => {
        document.removeEventListener("pointermove", Fe), document.removeEventListener("pointerup", at, {
          capture: !0
        });
      };
    }
  }, [
    M,
    Ue,
    Tt
  ]), w.useEffect(() => {
    const Re = () => Ue(!1);
    return window.addEventListener("blur", Re), window.addEventListener("resize", Re), () => {
      window.removeEventListener("blur", Re), window.removeEventListener("resize", Re);
    };
  }, [
    Ue
  ]);
  const [gt, Et] = NS((Re) => {
    const Fe = de().filter(
      (Ve) => !Ve.disabled
    ), at = Fe.find(
      (Ve) => Ve.ref.current === document.activeElement
    ), Be = PS(Fe, Re, at);
    Be && setTimeout(
      () => Be.ref.current.focus()
    );
  }), ot = w.useCallback((Re, Fe, at) => {
    const Be = !pe.current && !at;
    (L.value !== void 0 && L.value === Fe || Be) && (me(Re), Be && (pe.current = !0));
  }, [
    L.value
  ]), $t = w.useCallback(
    () => M == null ? void 0 : M.focus(),
    [
      M
    ]
  ), Rt = w.useCallback((Re, Fe, at) => {
    const Be = !pe.current && !at;
    (L.value !== void 0 && L.value === Fe || Be) && ae(Re);
  }, [
    L.value
  ]), Dt = l === "popper" ? J2 : KL, jt = Dt === J2 ? {
    side: v,
    sideOffset: y,
    align: C,
    alignOffset: $,
    arrowPadding: _,
    collisionBoundary: R,
    collisionPadding: S,
    sticky: k,
    hideWhenDetached: x,
    avoidCollisions: D
  } : {};
  return /* @__PURE__ */ w.createElement(MS, {
    scope: o,
    content: M,
    viewport: H,
    onViewportChange: N,
    itemRefCallback: ot,
    selectedItem: J,
    onItemLeave: $t,
    itemTextRefCallback: Rt,
    focusSelectedItem: le,
    selectedItemText: we,
    position: l,
    isPositioned: re,
    searchRef: gt
  }, /* @__PURE__ */ w.createElement(JO, {
    as: sc,
    allowPinchZoom: !0
  }, /* @__PURE__ */ w.createElement(MA, {
    asChild: !0,
    trapped: L.open,
    onMountAutoFocus: (Re) => {
      Re.preventDefault();
    },
    onUnmountAutoFocus: It(c, (Re) => {
      var Fe;
      (Fe = L.trigger) === null || Fe === void 0 || Fe.focus({
        preventScroll: !0
      }), Re.preventDefault();
    })
  }, /* @__PURE__ */ w.createElement(OA, {
    asChild: !0,
    disableOutsidePointerEvents: !0,
    onEscapeKeyDown: p,
    onPointerDownOutside: d,
    onFocusOutside: (Re) => Re.preventDefault(),
    onDismiss: () => L.onOpenChange(!1)
  }, /* @__PURE__ */ w.createElement(Dt, dt({
    role: "listbox",
    id: L.contentId,
    "data-state": L.open ? "open" : "closed",
    dir: L.dir,
    onContextMenu: (Re) => Re.preventDefault()
  }, z, jt, {
    onPlaced: () => oe(!0),
    ref: P,
    style: {
      // flex layout so we can place the scroll buttons properly
      display: "flex",
      flexDirection: "column",
      // reset the outline by default as the content MAY get focused
      outline: "none",
      ...z.style
    },
    onKeyDown: It(z.onKeyDown, (Re) => {
      const Fe = Re.ctrlKey || Re.altKey || Re.metaKey;
      if (Re.key === "Tab" && Re.preventDefault(), !Fe && Re.key.length === 1 && Et(Re.key), [
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End"
      ].includes(Re.key)) {
        let Be = de().filter(
          (Ve) => !Ve.disabled
        ).map(
          (Ve) => Ve.ref.current
        );
        if ([
          "ArrowUp",
          "End"
        ].includes(Re.key) && (Be = Be.slice().reverse()), [
          "ArrowUp",
          "ArrowDown"
        ].includes(Re.key)) {
          const Ve = Re.target, Ne = Be.indexOf(Ve);
          Be = Be.slice(Ne + 1);
        }
        setTimeout(
          () => se(Be)
        ), Re.preventDefault();
      }
    })
  }))))));
}), KL = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { __scopeSelect: o, onPlaced: l, ...c } = n, p = Vo(tl, o), d = sl(tl, o), [v, y] = w.useState(null), [C, $] = w.useState(null), _ = Fn(
    a,
    (P) => $(P)
  ), R = vp(o), S = w.useRef(!1), k = w.useRef(!0), { viewport: x, selectedItem: D, selectedItemText: z, focusSelectedItem: L } = d, M = w.useCallback(() => {
    if (p.trigger && p.valueNode && v && C && x && D && z) {
      const P = p.trigger.getBoundingClientRect(), J = C.getBoundingClientRect(), me = p.valueNode.getBoundingClientRect(), we = z.getBoundingClientRect();
      if (p.dir !== "rtl") {
        const Ve = we.left - J.left, Ne = me.left - Ve, Je = P.left - Ne, Ze = P.width + Je, qt = Math.max(Ze, J.width), kt = window.innerWidth - ii, bt = z2(Ne, [
          ii,
          kt - qt
        ]);
        v.style.minWidth = Ze + "px", v.style.left = bt + "px";
      } else {
        const Ve = J.right - we.right, Ne = window.innerWidth - me.right - Ve, Je = window.innerWidth - P.right - Ne, Ze = P.width + Je, qt = Math.max(Ze, J.width), kt = window.innerWidth - ii, bt = z2(Ne, [
          ii,
          kt - qt
        ]);
        v.style.minWidth = Ze + "px", v.style.right = bt + "px";
      }
      const ae = R(), de = window.innerHeight - ii * 2, re = x.scrollHeight, oe = window.getComputedStyle(C), pe = parseInt(oe.borderTopWidth, 10), se = parseInt(oe.paddingTop, 10), le = parseInt(oe.borderBottomWidth, 10), Ue = parseInt(oe.paddingBottom, 10), Tt = pe + se + re + Ue + le, gt = Math.min(D.offsetHeight * 5, Tt), Et = window.getComputedStyle(x), ot = parseInt(Et.paddingTop, 10), $t = parseInt(Et.paddingBottom, 10), Rt = P.top + P.height / 2 - ii, Dt = de - Rt, jt = D.offsetHeight / 2, Re = D.offsetTop + jt, Fe = pe + se + Re, at = Tt - Fe;
      if (Fe <= Rt) {
        const Ve = D === ae[ae.length - 1].ref.current;
        v.style.bottom = "0px";
        const Ne = C.clientHeight - x.offsetTop - x.offsetHeight, Je = Math.max(Dt, jt + (Ve ? $t : 0) + Ne + le), Ze = Fe + Je;
        v.style.height = Ze + "px";
      } else {
        const Ve = D === ae[0].ref.current;
        v.style.top = "0px";
        const Je = Math.max(Rt, pe + x.offsetTop + (Ve ? ot : 0) + jt) + at;
        v.style.height = Je + "px", x.scrollTop = Fe - Rt + x.offsetTop;
      }
      v.style.margin = `${ii}px 0`, v.style.minHeight = gt + "px", v.style.maxHeight = de + "px", l == null || l(), requestAnimationFrame(
        () => S.current = !0
      );
    }
  }, [
    R,
    p.trigger,
    p.valueNode,
    v,
    C,
    x,
    D,
    z,
    p.dir,
    l
  ]);
  Dr(
    () => M(),
    [
      M
    ]
  );
  const [V, H] = w.useState();
  Dr(() => {
    C && H(window.getComputedStyle(C).zIndex);
  }, [
    C
  ]);
  const N = w.useCallback((P) => {
    P && k.current === !0 && (M(), L == null || L(), k.current = !1);
  }, [
    M,
    L
  ]);
  return /* @__PURE__ */ w.createElement(ZL, {
    scope: o,
    contentWrapper: v,
    shouldExpandOnScrollRef: S,
    onScrollButtonChange: N
  }, /* @__PURE__ */ w.createElement("div", {
    ref: y,
    style: {
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      zIndex: V
    }
  }, /* @__PURE__ */ w.createElement(un.div, dt({}, c, {
    ref: _,
    style: {
      // When we get the height of the content, it includes borders. If we were to set
      // the height without having `boxSizing: 'border-box'` it would be too big.
      boxSizing: "border-box",
      // We need to ensure the content doesn't get taller than the wrapper
      maxHeight: "100%",
      ...c.style
    }
  }))));
}), J2 = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { __scopeSelect: o, align: l = "start", collisionPadding: c = ii, ...p } = n, d = Dy(o);
  return /* @__PURE__ */ w.createElement(ML, dt({}, d, p, {
    ref: a,
    align: l,
    collisionPadding: c,
    style: {
      // Ensure border-box for floating-ui calculations
      boxSizing: "border-box",
      ...p.style,
      "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
      "--radix-select-content-available-width": "var(--radix-popper-available-width)",
      "--radix-select-content-available-height": "var(--radix-popper-available-height)",
      "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
      "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
    }
  }));
}), [ZL, IS] = ol(tl, {}), e5 = "SelectViewport", XL = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { __scopeSelect: o, ...l } = n, c = sl(e5, o), p = IS(e5, o), d = Fn(a, c.onViewportChange), v = w.useRef(0);
  return /* @__PURE__ */ w.createElement(w.Fragment, null, /* @__PURE__ */ w.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
    }
  }), /* @__PURE__ */ w.createElement(hp.Slot, {
    scope: o
  }, /* @__PURE__ */ w.createElement(un.div, dt({
    "data-radix-select-viewport": "",
    role: "presentation"
  }, l, {
    ref: d,
    style: {
      // we use position: 'relative' here on the `viewport` so that when we call
      // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
      // (independent of the scrollUpButton).
      position: "relative",
      flex: 1,
      overflow: "auto",
      ...l.style
    },
    onScroll: It(l.onScroll, (y) => {
      const C = y.currentTarget, { contentWrapper: $, shouldExpandOnScrollRef: _ } = p;
      if (_ != null && _.current && $) {
        const R = Math.abs(v.current - C.scrollTop);
        if (R > 0) {
          const S = window.innerHeight - ii * 2, k = parseFloat($.style.minHeight), x = parseFloat($.style.height), D = Math.max(k, x);
          if (D < S) {
            const z = D + R, L = Math.min(S, z), M = z - L;
            $.style.height = L + "px", $.style.bottom === "0px" && (C.scrollTop = M > 0 ? M : 0, $.style.justifyContent = "flex-end");
          }
        }
      }
      v.current = C.scrollTop;
    })
  }))));
}), QL = "SelectGroup", [JL, Kq] = ol(QL), eM = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { __scopeSelect: o, ...l } = n, c = pc();
  return /* @__PURE__ */ w.createElement(JL, {
    scope: o,
    id: c
  }, /* @__PURE__ */ w.createElement(un.div, dt({
    role: "group",
    "aria-labelledby": c
  }, l, {
    ref: a
  })));
}), ly = "SelectItem", [tM, qS] = ol(ly), nM = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { __scopeSelect: o, value: l, disabled: c = !1, textValue: p, ...d } = n, v = Vo(ly, o), y = sl(ly, o), C = v.value === l, [$, _] = w.useState(p ?? ""), [R, S] = w.useState(!1), k = Fn(a, (z) => {
    var L;
    return (L = y.itemRefCallback) === null || L === void 0 ? void 0 : L.call(y, z, l, c);
  }), x = pc(), D = () => {
    c || (v.onValueChange(l), v.onOpenChange(!1));
  };
  return /* @__PURE__ */ w.createElement(tM, {
    scope: o,
    value: l,
    disabled: c,
    textId: x,
    isSelected: C,
    onItemTextChange: w.useCallback((z) => {
      _((L) => {
        var M;
        return L || ((M = z == null ? void 0 : z.textContent) !== null && M !== void 0 ? M : "").trim();
      });
    }, [])
  }, /* @__PURE__ */ w.createElement(hp.ItemSlot, {
    scope: o,
    value: l,
    disabled: c,
    textValue: $
  }, /* @__PURE__ */ w.createElement(un.div, dt({
    role: "option",
    "aria-labelledby": x,
    "data-highlighted": R ? "" : void 0,
    "aria-selected": C && R,
    "data-state": C ? "checked" : "unchecked",
    "aria-disabled": c || void 0,
    "data-disabled": c ? "" : void 0,
    tabIndex: c ? void 0 : -1
  }, d, {
    ref: k,
    onFocus: It(
      d.onFocus,
      () => S(!0)
    ),
    onBlur: It(
      d.onBlur,
      () => S(!1)
    ),
    onPointerUp: It(d.onPointerUp, D),
    onPointerMove: It(d.onPointerMove, (z) => {
      if (c) {
        var L;
        (L = y.onItemLeave) === null || L === void 0 || L.call(y);
      } else
        z.currentTarget.focus({
          preventScroll: !0
        });
    }),
    onPointerLeave: It(d.onPointerLeave, (z) => {
      if (z.currentTarget === document.activeElement) {
        var L;
        (L = y.onItemLeave) === null || L === void 0 || L.call(y);
      }
    }),
    onKeyDown: It(d.onKeyDown, (z) => {
      var L;
      ((L = y.searchRef) === null || L === void 0 ? void 0 : L.current) !== "" && z.key === " " || (zL.includes(z.key) && D(), z.key === " " && z.preventDefault());
    })
  }))));
}), Nf = "SelectItemText", rM = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { __scopeSelect: o, className: l, style: c, ...p } = n, d = Vo(Nf, o), v = sl(Nf, o), y = qS(Nf, o), C = FL(Nf, o), [$, _] = w.useState(null), R = Fn(
    a,
    (z) => _(z),
    y.onItemTextChange,
    (z) => {
      var L;
      return (L = v.itemTextRefCallback) === null || L === void 0 ? void 0 : L.call(v, z, y.value, y.disabled);
    }
  ), S = $ == null ? void 0 : $.textContent, k = w.useMemo(
    () => /* @__PURE__ */ w.createElement("option", {
      key: y.value,
      value: y.value,
      disabled: y.disabled
    }, S),
    [
      y.disabled,
      y.value,
      S
    ]
  ), { onNativeOptionAdd: x, onNativeOptionRemove: D } = C;
  return Dr(() => (x(k), () => D(k)), [
    x,
    D,
    k
  ]), /* @__PURE__ */ w.createElement(w.Fragment, null, /* @__PURE__ */ w.createElement(un.span, dt({
    id: y.textId
  }, p, {
    ref: R
  })), y.isSelected && d.valueNode && !d.valueNodeHasChildren ? /* @__PURE__ */ rl.createPortal(p.children, d.valueNode) : null);
}), aM = "SelectItemIndicator", iM = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { __scopeSelect: o, ...l } = n;
  return qS(aM, o).isSelected ? /* @__PURE__ */ w.createElement(un.span, dt({
    "aria-hidden": !0
  }, l, {
    ref: a
  })) : null;
}), t5 = "SelectScrollDownButton", oM = /* @__PURE__ */ w.forwardRef((n, a) => {
  const o = sl(t5, n.__scopeSelect), l = IS(t5, n.__scopeSelect), [c, p] = w.useState(!1), d = Fn(a, l.onScrollButtonChange);
  return Dr(() => {
    if (o.viewport && o.isPositioned) {
      let C = function() {
        const $ = y.scrollHeight - y.clientHeight, _ = Math.ceil(y.scrollTop) < $;
        p(_);
      };
      var v = C;
      const y = o.viewport;
      return C(), y.addEventListener("scroll", C), () => y.removeEventListener("scroll", C);
    }
  }, [
    o.viewport,
    o.isPositioned
  ]), c ? /* @__PURE__ */ w.createElement(sM, dt({}, n, {
    ref: d,
    onAutoScroll: () => {
      const { viewport: v, selectedItem: y } = o;
      v && y && (v.scrollTop = v.scrollTop + y.offsetHeight);
    }
  })) : null;
}), sM = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { __scopeSelect: o, onAutoScroll: l, ...c } = n, p = sl("SelectScrollButton", o), d = w.useRef(null), v = vp(o), y = w.useCallback(() => {
    d.current !== null && (window.clearInterval(d.current), d.current = null);
  }, []);
  return w.useEffect(() => () => y(), [
    y
  ]), Dr(() => {
    var C;
    const $ = v().find(
      (_) => _.ref.current === document.activeElement
    );
    $ == null || (C = $.ref.current) === null || C === void 0 || C.scrollIntoView({
      block: "nearest"
    });
  }, [
    v
  ]), /* @__PURE__ */ w.createElement(un.div, dt({
    "aria-hidden": !0
  }, c, {
    ref: a,
    style: {
      flexShrink: 0,
      ...c.style
    },
    onPointerDown: It(c.onPointerDown, () => {
      d.current === null && (d.current = window.setInterval(l, 50));
    }),
    onPointerMove: It(c.onPointerMove, () => {
      var C;
      (C = p.onItemLeave) === null || C === void 0 || C.call(p), d.current === null && (d.current = window.setInterval(l, 50));
    }),
    onPointerLeave: It(c.onPointerLeave, () => {
      y();
    })
  }));
}), zS = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { value: o, ...l } = n, c = w.useRef(null), p = Fn(a, c), d = aA(o);
  return w.useEffect(() => {
    const v = c.current, y = window.HTMLSelectElement.prototype, $ = Object.getOwnPropertyDescriptor(y, "value").set;
    if (d !== o && $) {
      const _ = new Event("change", {
        bubbles: !0
      });
      $.call(v, o), v.dispatchEvent(_);
    }
  }, [
    d,
    o
  ]), /* @__PURE__ */ w.createElement(IL, {
    asChild: !0
  }, /* @__PURE__ */ w.createElement("select", dt({}, l, {
    ref: p,
    defaultValue: o
  })));
});
zS.displayName = "BubbleSelect";
function NS(n) {
  const a = $a(n), o = w.useRef(""), l = w.useRef(0), c = w.useCallback((d) => {
    const v = o.current + d;
    a(v), function y(C) {
      o.current = C, window.clearTimeout(l.current), C !== "" && (l.current = window.setTimeout(
        () => y(""),
        1e3
      ));
    }(v);
  }, [
    a
  ]), p = w.useCallback(() => {
    o.current = "", window.clearTimeout(l.current);
  }, []);
  return w.useEffect(() => () => window.clearTimeout(l.current), []), [
    o,
    c,
    p
  ];
}
function PS(n, a, o) {
  const c = a.length > 1 && Array.from(a).every(
    (C) => C === a[0]
  ) ? a[0] : a, p = o ? n.indexOf(o) : -1;
  let d = lM(n, Math.max(p, 0));
  c.length === 1 && (d = d.filter(
    (C) => C !== o
  ));
  const y = d.find(
    (C) => C.textValue.toLowerCase().startsWith(c.toLowerCase())
  );
  return y !== o ? y : void 0;
}
function lM(n, a) {
  return n.map(
    (o, l) => n[(a + l) % n.length]
  );
}
const uM = VL, cM = BL, dM = GL, fM = YL, pM = XL, hM = eM, vM = nM, mM = rM, gM = iM, yM = oM;
var bM = "_1wo163v3", wM = "_1wo163v6", CM = "_1wo163v2", SM = "_1wo163v5", _M = "_1wo163v1", xM = "_1wo163v7", EM = "_1wo163v0", RM = "_1wo163v4";
const kM = ({
  label: n,
  items: a,
  defaultValue: o,
  onChange: l,
  className: c,
  contentProps: p,
  disabled: d = !1
}) => {
  const [v, y] = w.useState(o), C = w.useCallback(
    ($) => {
      y($), l($);
    },
    [l]
  );
  return /* @__PURE__ */ b.jsx("div", { className: "sid-dropdown", children: /* @__PURE__ */ b.jsxs(
    uM,
    {
      disabled: d,
      onValueChange: C,
      defaultValue: o,
      children: [
        /* @__PURE__ */ b.jsxs(
          cM,
          {
            className: mt("sid-dropdown__trigger", EM, c),
            children: [
              /* @__PURE__ */ b.jsx("label", { className: mt("sid-dropdown__trigger__label", _M), children: n }),
              /* @__PURE__ */ b.jsx("div", { className: mt("sid-dropdown__trigger__input", CM), children: /* @__PURE__ */ b.jsx(dM, {}) }),
              /* @__PURE__ */ b.jsx(
                Q5,
                {
                  className: mt("sid-dropdown__trigger__icon", wM)
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ b.jsxs(
          fM,
          {
            ...p,
            className: mt(
              "sid-dropdown__popover",
              bM,
              p == null ? void 0 : p.className
            ),
            children: [
              /* @__PURE__ */ b.jsx(
                pM,
                {
                  className: mt("sid-dropdown__viewport", RM),
                  children: /* @__PURE__ */ b.jsx(hM, { children: a.map(($) => /* @__PURE__ */ b.jsxs(
                    vM,
                    {
                      className: mt(
                        "sid-dropdown__item",
                        $.value === v && "sid-dropdown__item--selected",
                        SM
                      ),
                      value: $.value,
                      textValue: $.textValue,
                      children: [
                        /* @__PURE__ */ b.jsx(mM, { children: $.label }),
                        /* @__PURE__ */ b.jsx(gM, { className: xM, children: /* @__PURE__ */ b.jsx(ND, { className: "sid-dropdown__item--selected__icon" }) })
                      ]
                    },
                    $.value
                  )) })
                }
              ),
              /* @__PURE__ */ b.jsx(yM, {})
            ]
          }
        )
      ]
    }
  ) });
}, Hg = "rovingFocusGroup.onEntryFocus", TM = {
  bubbles: !1,
  cancelable: !0
}, Oy = "RovingFocusGroup", [uy, US, $M] = nS(Oy), [DM, FS] = fc(Oy, [
  $M
]), [OM, AM] = DM(Oy), LM = /* @__PURE__ */ w.forwardRef((n, a) => /* @__PURE__ */ w.createElement(uy.Provider, {
  scope: n.__scopeRovingFocusGroup
}, /* @__PURE__ */ w.createElement(uy.Slot, {
  scope: n.__scopeRovingFocusGroup
}, /* @__PURE__ */ w.createElement(MM, dt({}, n, {
  ref: a
}))))), MM = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { __scopeRovingFocusGroup: o, orientation: l, loop: c = !1, dir: p, currentTabStopId: d, defaultCurrentTabStopId: v, onCurrentTabStopIdChange: y, onEntryFocus: C, ...$ } = n, _ = w.useRef(null), R = Fn(a, _), S = Sy(p), [k = null, x] = Qf({
    prop: d,
    defaultProp: v,
    onChange: y
  }), [D, z] = w.useState(!1), L = $a(C), M = US(o), V = w.useRef(!1), [H, N] = w.useState(0);
  return w.useEffect(() => {
    const P = _.current;
    if (P)
      return P.addEventListener(Hg, L), () => P.removeEventListener(Hg, L);
  }, [
    L
  ]), /* @__PURE__ */ w.createElement(OM, {
    scope: o,
    orientation: l,
    dir: S,
    loop: c,
    currentTabStopId: k,
    onItemFocus: w.useCallback(
      (P) => x(P),
      [
        x
      ]
    ),
    onItemShiftTab: w.useCallback(
      () => z(!0),
      []
    ),
    onFocusableItemAdd: w.useCallback(
      () => N(
        (P) => P + 1
      ),
      []
    ),
    onFocusableItemRemove: w.useCallback(
      () => N(
        (P) => P - 1
      ),
      []
    )
  }, /* @__PURE__ */ w.createElement(un.div, dt({
    tabIndex: D || H === 0 ? -1 : 0,
    "data-orientation": l
  }, $, {
    ref: R,
    style: {
      outline: "none",
      ...n.style
    },
    onMouseDown: It(n.onMouseDown, () => {
      V.current = !0;
    }),
    onFocus: It(n.onFocus, (P) => {
      const J = !V.current;
      if (P.target === P.currentTarget && J && !D) {
        const me = new CustomEvent(Hg, TM);
        if (P.currentTarget.dispatchEvent(me), !me.defaultPrevented) {
          const we = M().filter(
            (pe) => pe.focusable
          ), ae = we.find(
            (pe) => pe.active
          ), de = we.find(
            (pe) => pe.id === k
          ), oe = [
            ae,
            de,
            ...we
          ].filter(Boolean).map(
            (pe) => pe.ref.current
          );
          VS(oe);
        }
      }
      V.current = !1;
    }),
    onBlur: It(
      n.onBlur,
      () => z(!1)
    )
  })));
}), IM = "RovingFocusGroupItem", qM = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { __scopeRovingFocusGroup: o, focusable: l = !0, active: c = !1, tabStopId: p, ...d } = n, v = pc(), y = p || v, C = AM(IM, o), $ = C.currentTabStopId === y, _ = US(o), { onFocusableItemAdd: R, onFocusableItemRemove: S } = C;
  return w.useEffect(() => {
    if (l)
      return R(), () => S();
  }, [
    l,
    R,
    S
  ]), /* @__PURE__ */ w.createElement(uy.ItemSlot, {
    scope: o,
    id: y,
    focusable: l,
    active: c
  }, /* @__PURE__ */ w.createElement(un.span, dt({
    tabIndex: $ ? 0 : -1,
    "data-orientation": C.orientation
  }, d, {
    ref: a,
    onMouseDown: It(n.onMouseDown, (k) => {
      l ? C.onItemFocus(y) : k.preventDefault();
    }),
    onFocus: It(
      n.onFocus,
      () => C.onItemFocus(y)
    ),
    onKeyDown: It(n.onKeyDown, (k) => {
      if (k.key === "Tab" && k.shiftKey) {
        C.onItemShiftTab();
        return;
      }
      if (k.target !== k.currentTarget)
        return;
      const x = PM(k, C.orientation, C.dir);
      if (x !== void 0) {
        k.preventDefault();
        let z = _().filter(
          (L) => L.focusable
        ).map(
          (L) => L.ref.current
        );
        if (x === "last")
          z.reverse();
        else if (x === "prev" || x === "next") {
          x === "prev" && z.reverse();
          const L = z.indexOf(k.currentTarget);
          z = C.loop ? UM(z, L + 1) : z.slice(L + 1);
        }
        setTimeout(
          () => VS(z)
        );
      }
    })
  })));
}), zM = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function NM(n, a) {
  return a !== "rtl" ? n : n === "ArrowLeft" ? "ArrowRight" : n === "ArrowRight" ? "ArrowLeft" : n;
}
function PM(n, a, o) {
  const l = NM(n.key, o);
  if (!(a === "vertical" && [
    "ArrowLeft",
    "ArrowRight"
  ].includes(l)) && !(a === "horizontal" && [
    "ArrowUp",
    "ArrowDown"
  ].includes(l)))
    return zM[l];
}
function VS(n) {
  const a = document.activeElement;
  for (const o of n)
    if (o === a || (o.focus(), document.activeElement !== a))
      return;
}
function UM(n, a) {
  return n.map(
    (o, l) => n[(a + l) % n.length]
  );
}
const FM = LM, VM = qM, HS = "Tabs", [HM, Zq] = fc(HS, [
  FS
]), BS = FS(), [BM, Ay] = HM(HS), jM = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { __scopeTabs: o, value: l, onValueChange: c, defaultValue: p, orientation: d = "horizontal", dir: v, activationMode: y = "automatic", ...C } = n, $ = Sy(v), [_, R] = Qf({
    prop: l,
    onChange: c,
    defaultProp: p
  });
  return /* @__PURE__ */ w.createElement(BM, {
    scope: o,
    baseId: pc(),
    value: _,
    onValueChange: R,
    orientation: d,
    dir: $,
    activationMode: y
  }, /* @__PURE__ */ w.createElement(un.div, dt({
    dir: $,
    "data-orientation": d
  }, C, {
    ref: a
  })));
}), GM = "TabsList", YM = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { __scopeTabs: o, loop: l = !0, ...c } = n, p = Ay(GM, o), d = BS(o);
  return /* @__PURE__ */ w.createElement(FM, dt({
    asChild: !0
  }, d, {
    orientation: p.orientation,
    dir: p.dir,
    loop: l
  }), /* @__PURE__ */ w.createElement(un.div, dt({
    role: "tablist",
    "aria-orientation": p.orientation
  }, c, {
    ref: a
  })));
}), WM = "TabsTrigger", KM = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { __scopeTabs: o, value: l, disabled: c = !1, ...p } = n, d = Ay(WM, o), v = BS(o), y = jS(d.baseId, l), C = GS(d.baseId, l), $ = l === d.value;
  return /* @__PURE__ */ w.createElement(VM, dt({
    asChild: !0
  }, v, {
    focusable: !c,
    active: $
  }), /* @__PURE__ */ w.createElement(un.button, dt({
    type: "button",
    role: "tab",
    "aria-selected": $,
    "aria-controls": C,
    "data-state": $ ? "active" : "inactive",
    "data-disabled": c ? "" : void 0,
    disabled: c,
    id: y
  }, p, {
    ref: a,
    onMouseDown: It(n.onMouseDown, (_) => {
      !c && _.button === 0 && _.ctrlKey === !1 ? d.onValueChange(l) : _.preventDefault();
    }),
    onKeyDown: It(n.onKeyDown, (_) => {
      [
        " ",
        "Enter"
      ].includes(_.key) && d.onValueChange(l);
    }),
    onFocus: It(n.onFocus, () => {
      const _ = d.activationMode !== "manual";
      !$ && !c && _ && d.onValueChange(l);
    })
  })));
}), ZM = "TabsContent", XM = /* @__PURE__ */ w.forwardRef((n, a) => {
  const { __scopeTabs: o, value: l, forceMount: c, children: p, ...d } = n, v = Ay(ZM, o), y = jS(v.baseId, l), C = GS(v.baseId, l), $ = l === v.value, _ = w.useRef($);
  return w.useEffect(() => {
    const R = requestAnimationFrame(
      () => _.current = !1
    );
    return () => cancelAnimationFrame(R);
  }, []), /* @__PURE__ */ w.createElement(
    oS,
    {
      present: c || $
    },
    ({ present: R }) => /* @__PURE__ */ w.createElement(un.div, dt({
      "data-state": $ ? "active" : "inactive",
      "data-orientation": v.orientation,
      role: "tabpanel",
      "aria-labelledby": y,
      hidden: !R,
      id: C,
      tabIndex: 0
    }, d, {
      ref: a,
      style: {
        ...n.style,
        animationDuration: _.current ? "0s" : void 0
      }
    }), R && p)
  );
});
function jS(n, a) {
  return `${n}-trigger-${a}`;
}
function GS(n, a) {
  return `${n}-content-${a}`;
}
const QM = jM, JM = YM, eI = KM, tI = XM;
var nI = "_1bc2uou0", rI = "_1bc2uou1";
const aI = ({
  className: n,
  tabs: a,
  defaultValue: o,
  testId: l
}) => {
  var c;
  return a.length ? /* @__PURE__ */ b.jsxs(
    QM,
    {
      "data-testid": l,
      className: mt("sid-tabs", n),
      defaultValue: o ?? ((c = a[0]) == null ? void 0 : c.id),
      children: [
        /* @__PURE__ */ b.jsx(JM, { className: nI, "aria-label": "SlashID Tabs", children: a.map(({ id: p, title: d }) => /* @__PURE__ */ b.jsx(eI, { className: rI, value: p, children: d }, p)) }),
        a.map(({ id: p, content: d }) => /* @__PURE__ */ b.jsx(tI, { value: p, children: d }, p))
      ]
    }
  ) : null;
};
class n5 {
  constructor() {
    QC(this, "data", /* @__PURE__ */ new Map());
  }
  clear() {
    this.data.clear();
  }
  getItem(a) {
    return this.data.get(String(a)) ?? null;
  }
  removeItem(a) {
    this.data.delete(String(a));
  }
  key(a) {
    return Array.from(this.data.keys())[Number(a)] ?? null;
  }
  setItem(a, o) {
    this.data.set(String(a), String(o));
  }
  get length() {
    return this.data.size;
  }
}
var rp = function() {
  return rp = Object.assign || function(a) {
    for (var o, l = 1, c = arguments.length; l < c; l++) {
      o = arguments[l];
      for (var p in o)
        Object.prototype.hasOwnProperty.call(o, p) && (a[p] = o[p]);
    }
    return a;
  }, rp.apply(this, arguments);
};
function iI(n, a) {
  return Object.prototype.hasOwnProperty.call(n, a);
}
function oI(n) {
  return n.replace(/[.*+?^$|[\](){}\\-]/g, "\\$&");
}
function sI(n) {
  var a = n.charAt(n.length - 1), o = parseInt(n, 10), l = /* @__PURE__ */ new Date();
  switch (a) {
    case "Y":
      l.setFullYear(l.getFullYear() + o);
      break;
    case "M":
      l.setMonth(l.getMonth() + o);
      break;
    case "D":
      l.setDate(l.getDate() + o);
      break;
    case "h":
      l.setHours(l.getHours() + o);
      break;
    case "m":
      l.setMinutes(l.getMinutes() + o);
      break;
    case "s":
      l.setSeconds(l.getSeconds() + o);
      break;
    default:
      l = new Date(n);
  }
  return l;
}
function lI(n) {
  for (var a = "", o = 0, l = Object.keys(n); o < l.length; o++) {
    var c = l[o];
    if (/^expires$/i.test(c)) {
      var p = n[c], d = void 0;
      typeof p == "object" ? d = p : (p += typeof p == "number" ? "D" : "", d = sI(String(p))), a += ";".concat(c, "=").concat(d.toUTCString());
    } else
      /^secure|partitioned$/.test(c) ? n[c] && (a += ";".concat(c)) : a += ";".concat(c, "=").concat(n[c]);
  }
  return iI(n, "path") || (a += ";path=/"), a;
}
function uI(n, a) {
  if (a === void 0 && (a = decodeURIComponent), typeof n != "string" || !n)
    return null;
  var o = new RegExp("(?:^|; )".concat(oI(n), "(?:=([^;]*))?(?:;|$)")), l = o.exec(document.cookie);
  return l === null ? null : typeof a == "function" ? a(l[1]) : l[1];
}
function Bg(n) {
  n === void 0 && (n = decodeURIComponent);
  for (var a = /(?:^|; )([^=]+?)(?:=([^;]*))?(?:;|$)/g, o = {}, l; l = a.exec(document.cookie); )
    a.lastIndex = l.index + l.length - 1, o[l[1]] = typeof n == "function" ? n(l[2]) : l[2];
  return o;
}
function YS(n, a, o, l) {
  o === void 0 && (o = encodeURIComponent), typeof o == "object" && o !== null && (l = o, o = encodeURIComponent);
  var c = lI(l || {}), p = typeof o == "function" ? o(a) : a, d = "".concat(n, "=").concat(p).concat(c);
  document.cookie = d;
}
function r5(n, a) {
  var o = { expires: -1 };
  return a && (o = rp(rp({}, a), o)), YS(n, "a", o);
}
class cI {
  clear() {
    const a = Bg(), o = Object.keys(a);
    for (const l of o)
      r5(String(l));
  }
  getItem(a) {
    return uI(String(a));
  }
  removeItem(a) {
    r5(String(a));
  }
  key(a) {
    return [...Object.keys(Bg())][Number(a)] ?? null;
  }
  setItem(a, o) {
    YS(String(a), String(o));
  }
  get length() {
    return Object.keys(Bg()).length;
  }
}
function dI({ delayMs: n, children: a, fallback: o, className: l }) {
  const [c, p] = w.useState(!1);
  return w.useEffect(() => {
    const d = setTimeout(() => {
      p(!0);
    }, n);
    return () => clearTimeout(d);
  }, [n]), /* @__PURE__ */ b.jsx("div", { className: l, children: c ? a : o ?? null });
}
async function fI({
  user: n,
  sid: a,
  middleware: o
}) {
  return o === void 0 ? n : (Array.isArray(o) ? o : [o]).reduce((c, p) => c.then((d) => p({ user: d, sid: a })), Promise.resolve(n));
}
const WS = {
  sid: void 0,
  user: void 0,
  sdkState: "initial",
  logOut: () => {
  },
  logIn: () => Promise.reject("NYI"),
  mfa: () => Promise.reject("NYI"),
  recover: () => Promise.reject("NYI"),
  validateToken: async () => !1,
  __switchOrganizationInContext: async () => {
  }
}, Ly = w.createContext(WS);
Ly.displayName = "SlashIDContext";
const Pf = "@slashid/USER_TOKEN", pI = (n) => {
  switch (n) {
    case "memory":
      return new n5();
    case "localStorage":
      return window.localStorage;
    case "cookie":
      return new cI();
    default:
      return new n5();
  }
}, hI = ({
  oid: n,
  initialToken: a,
  tokenStorage: o = "memory",
  environment: l,
  baseApiUrl: c,
  sdkUrl: p,
  analyticsEnabled: d,
  themeProps: v,
  children: y
}) => {
  const [C, $] = w.useState(n), [_, R] = w.useState(a), [S, k] = w.useState(WS.sdkState), [x, D] = w.useState(void 0), z = w.useRef(void 0), L = w.useRef(void 0), M = w.useCallback(
    async ({ oid: ae }) => {
      if (!x)
        return;
      const de = await x.getTokenForOrganization(ae);
      R(de), $(ae), k("initial");
    },
    [x]
  ), V = w.useCallback(
    (ae) => {
      var de, re;
      if (S !== "initial") {
        D(ae), (de = z.current) == null || de.setItem(Pf, ae.token);
        try {
          (re = L.current) == null || re.getAnalytics().identify(ae);
        } catch {
        }
        ae.oid !== C && M({ oid: ae.oid });
      }
    },
    [S, M, C]
  ), H = w.useCallback(() => {
    var ae, de;
    if (S !== "initial" && ((ae = z.current) == null || ae.removeItem(Pf), !!x)) {
      try {
        (de = L.current) == null || de.getAnalytics().logout();
      } catch {
      }
      x.logout(), D(void 0), $(n);
    }
  }, [S, x, n]), N = w.useCallback(
    async ({ factor: ae, handle: de }, { middleware: re } = {}) => {
      if (S === "initial")
        return;
      const oe = L.current;
      if (oe)
        try {
          const pe = ae.method === "oidc" || de === void 0 ? null : {
            type: de.type,
            value: de.value
          }, se = await oe.id(C, pe, ae).then(async (le) => fI({ user: le, sid: oe, middleware: re }));
          return V(se), se;
        } catch (pe) {
          throw H(), pe;
        }
    },
    [C, S, V, H]
  ), P = w.useCallback(
    async ({ handle: ae, factor: de }) => {
      if (S === "initial" || !x)
        return;
      await x.mfa(ae, de);
      const re = new Ks(x.toString(), L.current);
      return V(re), re;
    },
    [S, x, V]
  ), J = w.useCallback(
    async ({ factor: ae, handle: de }) => {
      var re;
      if (!(S !== "ready" || !L.current))
        return (re = L.current) == null ? void 0 : re.recover({ factor: ae, handle: de });
    },
    [S]
  ), me = w.useCallback(async (ae) => {
    const de = new Ks(ae, L.current);
    try {
      return (await de.validateToken()).valid;
    } catch (re) {
      return console.error(re), !1;
    }
  }, []);
  w.useEffect(() => {
    if (S === "initial") {
      const ae = new Xf({
        oid: C,
        ...l && { environment: l },
        ...c && { baseURL: c },
        ...p && { sdkURL: p },
        ...d && { analyticsEnabled: d }
      }), de = pI(o);
      z.current = de, L.current = ae, k("loaded");
    }
  }, [
    C,
    c,
    p,
    S,
    o,
    d,
    l
  ]), w.useEffect(() => {
    if (S !== "loaded")
      return;
    const ae = L.current, de = z.current, re = async () => {
      try {
        const se = await ae.getUserFromURL();
        return se ? (V(new Ks(se.token, L.current)), !0) : !1;
      } catch (se) {
        return console.error(se), !1;
      }
    }, oe = async () => {
      const se = de.getItem(Pf);
      return se ? await me(se) ? (V(new Ks(se, L.current)), !0) : (de.removeItem(Pf), !1) : !1;
    }, pe = async () => {
      _ ? V(new Ks(_, L.current)) : await re() || await oe(), k("ready");
    };
    k("retrievingToken"), pe();
  }, [S, _, V, me]);
  const we = w.useMemo(() => S === "initial" ? {
    sid: void 0,
    user: x,
    sdkState: S,
    logOut: H,
    logIn: N,
    mfa: P,
    recover: J,
    validateToken: me,
    __switchOrganizationInContext: M
  } : {
    sid: L.current,
    user: x,
    sdkState: S,
    logOut: H,
    logIn: N,
    mfa: P,
    recover: J,
    validateToken: me,
    __switchOrganizationInContext: M
  }, [
    S,
    x,
    H,
    N,
    P,
    J,
    me,
    M
  ]);
  return /* @__PURE__ */ b.jsx(Ly.Provider, { value: we, children: /* @__PURE__ */ b.jsx(fD, { ...v, children: y }) });
};
function mp() {
  const n = wt.useContext(Ly), a = w.useMemo(
    () => n.sdkState !== "ready",
    [n.sdkState]
  ), o = w.useMemo(
    () => n.user !== void 0,
    [n.user]
  );
  return {
    ...n,
    isLoading: a,
    isAuthenticated: o
  };
}
function KS(n) {
  if (n instanceof Error)
    return n;
  let a = "[Unable to stringify the thrown value]";
  try {
    a = JSON.stringify(n);
  } catch {
  }
  return new Error(
    `This value was thrown as is, not through an Error: ${a}`
  );
}
const ZS = ["email_address", "phone_number"], vI = (n) => {
  if (!n || Array.isArray(n) || typeof n != "object")
    return !1;
  const { type: a, value: o } = n;
  return ZS.includes(a) ? typeof o == "string" : !1;
};
function mI(n) {
  return "allowedHandleTypes" in n ? n.allowedHandleTypes.every(
    (a) => ZS.includes(a)
  ) : !1;
}
const gI = [
  "webauthn",
  "otp_via_email",
  "email_link",
  "password"
], yI = ["otp_via_sms", "sms_link", "password"], bI = ["oidc", "saml"];
function a5(n, a) {
  return mI(n) ? n.allowedHandleTypes.includes(a) : !0;
}
function wI(n) {
  const a = /* @__PURE__ */ new Set();
  return gI.includes(n.method) && a5(n, "email_address") && a.add("email_address"), yI.includes(n.method) && a5(n, "phone_number") && a.add("phone_number"), a;
}
function My(n) {
  const a = /* @__PURE__ */ new Set();
  return n.forEach((o) => {
    wI(o).forEach(
      (l) => a.add(l)
    );
  }), Array.from(a);
}
function CI(n, a) {
  return n.filter(
    (o) => My([o]).includes(a)
  );
}
function XS(n) {
  return n.method === "otp_via_email";
}
function QS(n) {
  return n.method === "otp_via_sms";
}
function SI(n) {
  return XS(n) || QS(n);
}
function _I(n) {
  return JS(n);
}
function JS(n) {
  return n.method === "password";
}
function e6(n) {
  return n.method === "oidc";
}
function cy(n) {
  return bI.includes(n.method);
}
function xI(n) {
  return n.method === "email_link";
}
function EI(n) {
  return n.method === "sms_link";
}
function t6(n) {
  return n.method !== "oidc";
}
function RI(n) {
  return n.some(cy) && n.some((a) => !cy(a));
}
function jg(n, a) {
  if (!(!n || n.type !== a))
    return n.value;
}
function kI(n) {
  for (const a of Cy())
    if (n.startsWith(a.dial_code))
      return {
        dialCode: a.dial_code,
        number: n.substring(a.dial_code.length).trim(),
        countryCode: J5(a.dial_code).code
      };
}
const i5 = (n) => ({
  status: "initial",
  logIn: (a, o) => {
    n({ type: "sid_login", config: a, options: o });
  }
}), o5 = (n, a, o, l) => {
  function c() {
    return o(a.config, a.options).then((d) => {
      n(d ? { type: "sid_login.success", user: d } : {
        type: "sid_login.error",
        error: new Error("User not returned from /id")
      });
    }).catch((d) => {
      n({ type: "sid_login.error", error: d });
    });
  }
  async function p() {
    if (!(!_I(a.config.factor) || !a.config.handle))
      try {
        return await l({
          factor: a.config.factor,
          handle: a.config.handle
        });
      } catch (d) {
        n({ type: "sid_login.error", error: KS(d) });
      }
  }
  return {
    status: "authenticating",
    context: {
      attempt: a.attempt,
      config: a.config,
      options: a.options
    },
    retry: () => {
      n({ type: "sid_retry", context: a });
    },
    recover: p,
    cancel: () => {
      n({ type: "sid_cancel" });
    },
    entry: c
  };
}, TI = () => ({
  status: "success"
}), $I = (n, a) => ({
  status: "error",
  context: a,
  retry: () => {
    n({ type: "sid_retry", context: a });
  },
  cancel: () => {
    n({ type: "sid_cancel" });
  }
});
function DI(n = {}) {
  let a, o, l = [];
  const c = (_) => {
    $(_);
  };
  let p = i5(c);
  const d = [{ state: p, event: { type: "sid_init" } }], { onSuccess: v, onError: y } = n;
  function C(_, R) {
    p = _, d.push({ state: p, event: R }), typeof p.entry == "function" && p.entry(), l.forEach((S) => S(p, R));
  }
  async function $(_) {
    switch (_.type) {
      case "sid_login":
        if (!a || !o)
          break;
        const R = {
          config: _.config,
          options: _.options,
          attempt: 1
        };
        C(
          o5(c, R, a, o),
          _
        );
        break;
      case "sid_login.success":
        typeof v == "function" && v(_.user), C(TI(), _);
        break;
      case "sid_login.error":
        if (p.status !== "authenticating")
          break;
        const S = {
          ...p.context,
          error: KS(_.error)
        };
        typeof y == "function" && y(_.error, S), C($I(c, S), _);
        break;
      case "sid_retry":
        if (!a || !o)
          break;
        const k = {
          config: _.context.config,
          options: _.context.options,
          attempt: _.context.attempt + 1
        };
        C(
          o5(c, k, a, o),
          _
        );
        break;
      case "sid_cancel":
        C(i5(c), _);
        break;
    }
  }
  return {
    history: d,
    unsubscribe: (_) => {
      l = l.filter((R) => R === _);
    },
    subscribe: (_) => {
      l.push(_);
    },
    // SDK is instantiated asynchronously, so we need to set the logIn and recover functions when it is ready
    setLogIn: (_) => {
      a = _;
    },
    setRecover: (_) => {
      o = _;
    },
    state: p
  };
}
function OI(n = {}) {
  const { logIn: a, mfa: o, recover: l, user: c, sdkState: p } = mp(), d = w.useRef(DI(n)), [v, y] = w.useState(d.current.state);
  return w.useEffect(() => {
    const C = d.current;
    return C.subscribe(y), () => C.unsubscribe(y);
  }, []), w.useEffect(() => {
    p === "ready" && d.current.setRecover(l);
  }, [l, p]), w.useEffect(() => {
    c ? d.current.setLogIn(o) : d.current.setLogIn(a);
  }, [a, o, c]), v;
}
const n6 = {
  "": "NYI",
  "footer.branding": "Top-tier security by SlashID",
  "initial.title": "Welcome to SlashID",
  "initial.subtitle": "Sign in to your account",
  "initial.oidc": "Sign in with",
  "initial.sso": "Sign in with",
  "initial.authenticationMethod": "Authentication method",
  "initial.handle.email": "Email address",
  "initial.handle.phone": "Phone number",
  "initial.handle.email.placeholder": "Type your email",
  "initial.handle.phone.placeholder": "Type your phone number",
  "initial.submit": "Continue",
  "initial.divider": "or",
  "authenticating.password.label": "Password",
  "authenticating.password.placeholder": "Type your password",
  "authenticating.passwordConfirm.label": "Confirm password",
  "authenticating.retryPrompt": "Didn’t receive the code?",
  "authenticating.retry": "Resend",
  "authenticating.back": "Back",
  "authenticating.initial.password.title": "Log in with a password.",
  "authenticating.initial.password.message.email": "If you are using a password for the first time, you will receive an email to verify your email address.",
  "authenticating.initial.password.message.phone": "If you are using a password for the first time, you will receive a message to verify your phone number.",
  "authenticating.setPassword.title": "Create your password",
  "authenticating.setPassword.message": "Define a secure password to sign up.",
  "authenticating.setPassword.validation.required": "Password is required",
  "authenticating.setPassword.validation.mismatch": "Passwords should match",
  "authenticating.setPassword.validation.incorrect": "Incorrect handle or password",
  "authenticating.setPassword.validation.length": "8-256 characters required",
  "authenticating.setPassword.validation.password_variants": "Contains word 'password'",
  "authenticating.setPassword.validation.admin_variants": "Contains word 'admin'",
  "authenticating.setPassword.validation.user_variants": "Contains word 'user'",
  "authenticating.setPassword.validation.alphanumeric_sequences_1": "Illegal sequence: {{ILLEGAL_SEQUENCE}}",
  "authenticating.setPassword.validation.alphanumeric_sequences_2": "Illegal sequence: {{ILLEGAL_SEQUENCE}}",
  "authenticating.setPassword.validation.numeric_sequences_ascending": "Illegal sequence: {{ILLEGAL_SEQUENCE}}",
  "authenticating.setPassword.validation.numeric_subsequences_ascending": "Illegal sequence: {{ILLEGAL_SEQUENCE}}",
  "authenticating.setPassword.validation.numeric_sequences_descending": "Illegal sequence: {{ILLEGAL_SEQUENCE}}",
  "authenticating.setPassword.validation.numeric_subsequences_descending": "Illegal sequence: {{ILLEGAL_SEQUENCE}}",
  "authenticating.setPassword.validation.common_password_xkcd": "Common password",
  "authenticating.verifyPassword.title": "Enter your password",
  "authenticating.verifyPassword.message": "Type your password to sign in.",
  "authenticating.verifyPassword.recover.prompt": "Forgot password?",
  "authenticating.verifyPassword.recover.cta": "Reset",
  "authenticating.recoverPassword.title.email": "Check your email",
  "authenticating.recoverPassword.message.email": "We have sent an email to {{EMAIL_ADDRESS}} with instructions for resetting your password. This email can take a few minutes to arrive, make sure to check your spam.",
  "authenticating.recoverPassword.title.phone": "Check your phone",
  "authenticating.recoverPassword.message.phone": "We have sent a message to {{PHONE_NUMBER}} with instructions for resetting your password. This message can take a few minutes to arrive, make sure to check your spam.",
  "authenticating.password.submit": "Continue",
  "authenticating.submitting.password.title": "Logging you in...",
  "authenticating.submitting.password.message": "This may take some time.",
  "authenticating.message.webauthn": "If you are registering for the first time, you will receive an email to verify your email address.",
  "authenticating.title.webauthn": "You'll be prompted to validate your login via your device",
  "authenticating.message.emailLink": "We have sent you a link via email. Follow the link provided to complete your registration.",
  "authenticating.title.emailLink": "Check your email",
  "authenticating.message.smsLink": "We have sent you a link via text. Follow the link provided to complete your registration.",
  "authenticating.title.smsLink": "Check your phone",
  "authenticating.message.emailOtp": "We have sent you a code via email. Please insert it here.",
  "authenticating.title.emailOtp": "Check your email",
  "authenticating.submitting.message.emailOtp": "We are verifying the code.",
  "authenticating.submitting.title.emailOtp": "Please wait",
  "authenticating.retry.message.emailOtp": "We are resending the OTP code...",
  "authenticating.retry.title.emailOtp": "Please wait",
  "authenticating.message.smsOtp": "We have sent you a code via text. Please insert it here.",
  "authenticating.title.smsOtp": "Check your phone",
  "authenticating.submitting.message.smsOtp": "We are verifying the code.",
  "authenticating.submitting.title.smsOtp": "Please wait",
  "authenticating.retry.message.smsOtp": "We are resending the OTP code...",
  "authenticating.retry.title.smsOtp": "Please wait",
  "authenticating.message.oidc": "Please follow the instructions in the login screen from your SSO provider.",
  "authenticating.title.oidc": "Sign in with ",
  "authenticating.otpInput": "OTP",
  "authenticating.otpInput.submit": "Submit",
  "authenticating.otpInput.submit.error": "Please enter a valid code",
  "success.title": "You are now authenticated!",
  "success.subtitle": "You can now close this page.",
  "error.title": "Something went wrong...",
  "error.subtitle": "There has been an error while submitting your form. Please try again.",
  "error.subtitle.rateLimit": "Your request has been rate limited. Please try again later.",
  "error.retry": "Try again",
  "factor.webauthn": "Passkeys",
  "factor.otpViaSms": "OTP via SMS",
  "factor.otpViaEmail": "OTP via email",
  "factor.emailLink": "Email link",
  "factor.smsLink": "SMS link",
  "factor.password": "Password",
  "validationError.otp": "Please enter the OTP code.",
  "validationError.email": "Please enter your email address.",
  "validationError.phoneNumber": "Please enter your phone number.",
  // KYC
  "kyc.mobile.end.title": "Upload was successful.",
  "kyc.mobile.end.description": "Please return to desktop.",
  "kyc.mobile.failure.generic.title": "Something went wrong",
  "kyc.mobile.failure.generic.description": "Please try again",
  "kyc.mobile.failure.upload_not_supported.title": "Upload not supported",
  "kyc.mobile.failure.upload_not_supported.description": "Please try with a different browser or device",
  // Technical message to alert the consumer
  "kyc.mobile.failure.invalid_state.title": "Invalid State",
  "kyc.mobile.failure.invalid_state.description": "Cannot render anything due to inconsistent state",
  "kyc.upload.mobile.empty.id_card.front": "Upload the front side of your ID card",
  "kyc.upload.mobile.empty.id_card.back": "Upload the back side of your ID card",
  "kyc.upload.mobile.empty.driver_license.front": "Upload the front side of your driver license",
  "kyc.upload.mobile.empty.driver_license.back": "Upload the back side of your driver license",
  "kyc.upload.mobile.empty.passport.front": "Upload the front side of your passport",
  "kyc.upload.mobile.empty.passport.back": "Upload the back side of your passport",
  "kyc.upload.mobile.empty.cta": "Upload",
  "kyc.upload.mobile.loading.message": "Checking image quality",
  "kyc.upload.mobile.failure.generic.title": "Cannot load image",
  "kyc.upload.mobile.failure.generic.description": "Please try with a different image",
  "kyc.upload.mobile.failure.quality.title": "Invalid Image",
  "kyc.upload.mobile.failure.quality.description": "Please try with a different image",
  "kyc.upload.mobile.failure.quality.detect_blur.title": "Image is too blurry",
  "kyc.upload.mobile.failure.quality.detect_blur.description": "Please try with a different image",
  "kyc.upload.mobile.failure.quality.detect_cutoff.title": "Document is not entirely visible",
  "kyc.upload.mobile.failure.quality.detect_cutoff.description": "Please try with a different image",
  "kyc.upload.mobile.failure.quality.document_detection.title": "Document not found",
  "kyc.upload.mobile.failure.quality.document_detection.description": "Please try with a different image",
  "kyc.upload.mobile.success.title": "Image looks good",
  "kyc.upload.mobile.upload.cta.continue": "Continue",
  "kyc.upload.mobile.upload.cta.again": "Upload again",
  "kyc.upload.mobile.title": "Your document",
  "kyc.upload.mobile.subtitle": "Upload the required images of your documents",
  "kyc.livephoto.mobile.upload.cta.continue": "Continue",
  "kyc.livephoto.mobile.upload.cta.again": "Upload again",
  "kyc.livephoto.mobile.empty": "Upload a selfie picture.",
  "kyc.livephoto.mobile.empty.cta": "Upload",
  "kyc.livephoto.mobile.loading.message": "Validating picture",
  "kyc.livephoto.mobile.failure.generic.title": "Cannot load image",
  "kyc.livephoto.mobile.failure.generic.description": "Please try with a different image",
  "kyc.livephoto.mobile.failure.validation.title": "An error occurred",
  "kyc.livephoto.mobile.failure.validation.description": "Please try with a different image",
  "kyc.livephoto.mobile.failure.validation.face_detection.title": "Face not detected",
  "kyc.livephoto.mobile.failure.validation.face_detection.description": "Please try with a different image",
  "kyc.livephoto.mobile.success.title": "Image looks good",
  "kyc.livephoto.mobile.title": "Selfie Check",
  "kyc.livephoto.mobile.subtitle": "Upload a selfie picture to confirm your identity.",
  "org.switcher.label": "Organization",
  // gdpr
  "gdpr.dialog.title": "We value your privacy",
  "gdpr.dialog.subtitle": "We use cookies to improve your experience. Learn more in our Cookie policy.",
  "gdpr.consent.necessary.title": "Necessary cookies",
  "gdpr.consent.necessary.description": "Cookies that are essential to provide the service you have requested or which are required to comply with legal requirements, like data protection laws.",
  "gdpr.consent.analytics.title": "Analytics",
  "gdpr.consent.analytics.description": "Cookies that are used for analytics or performance measurement purposes, like counting the number of unique visitors to our site, how long you stay on the site, and what parts of our site you visit.",
  "gdpr.consent.marketing.title": "Marketing",
  "gdpr.consent.marketing.description": "Cookies that are used to display advertising personalised to you (whether on or off our site) based on your browsing and profile.",
  "gdpr.consent.retargeting.title": "Retargeting",
  "gdpr.consent.retargeting.description": "Cookies that are used to display advertising personalised to you (whether on or off our site) based on your browsing and profile.",
  "gdpr.consent.tracking.title": "Tracking",
  "gdpr.consent.tracking.description": "Cookies that track your online behaviour, such as clicks, preferences, device specifications, location, and search history. This data helps in targeted advertising and gathering website analytics.",
  "gdpr.dialog.error.title": "Oops!",
  "gdpr.dialog.error.subtitle": "Looks like something went wrong...",
  // deprecated keys
  /**
   * @deprecated Use 'initial.handle.email.placeholder' instead
   */
  "initial.handle.phone.email": ""
}, dy = {
  text: n6,
  factors: [{ method: "webauthn" }, { method: "email_link" }],
  logo: /* @__PURE__ */ b.jsx(yy, {}),
  storeLastHandle: !1,
  showBanner: !0,
  defaultCountryCode: "US"
}, Iy = w.createContext(dy);
Iy.displayName = "SlashIDConfigurationContext";
const r6 = ({
  text: n,
  children: a,
  ...o
}) => {
  const l = w.useMemo(() => ({
    ...dy,
    ...o,
    text: n ? { ...n6, ...n } : dy.text
  }), [o, n]);
  return /* @__PURE__ */ b.jsx(Iy.Provider, { value: l, children: /* @__PURE__ */ b.jsx(EA, { text: l.text, children: a }) });
};
function cn() {
  return wt.useContext(Iy);
}
const AI = {
  registerField: () => () => null,
  registerSubmit: () => () => null,
  resetForm: () => null,
  setError: () => null,
  hasError: () => !1,
  clearError: () => null,
  values: {},
  errors: {},
  status: "valid"
}, a6 = w.createContext(AI), s5 = ({ children: n }) => {
  const [a, o] = w.useState("valid"), [l, c] = w.useState({}), [p, d] = w.useState({}), v = w.useRef({}), y = w.useCallback(
    (x, { validator: D, defaultValue: z } = {}) => (Object.keys(v.current).includes(x) || (v.current[x] = {
      defaultValue: z,
      validator: D
    }), (L) => {
      c((M) => ({ ...M, [x]: L.target.value })), D && a === "invalid" && (o("valid"), d({}));
    }),
    [a]
  );
  w.useEffect(() => {
    Object.entries(v.current).forEach(
      ([x, { defaultValue: D }]) => {
        D && l[x] === void 0 && c((z) => ({ ...z, [x]: D }));
      }
    );
  }, [l]);
  const C = w.useCallback(
    (x) => (D) => {
      D.preventDefault();
      let z = !1;
      if (Object.entries(v.current).forEach(
        ([L, { validator: M }]) => {
          const V = l[L];
          if (M) {
            const H = M(V);
            H && (z = !0, d((N) => ({ ...N, [L]: H })));
          }
        }
      ), z) {
        o("invalid");
        return;
      }
      x(D);
    },
    [l]
  ), $ = w.useCallback(() => {
    c({}), d({}), o("valid"), v.current = {};
  }, [c, d, o]), _ = w.useCallback((x, D) => {
    d((z) => ({ ...z, [x]: D }));
  }, []), R = w.useCallback(
    (x) => !!p[x],
    [p]
  ), S = w.useCallback((x) => {
    d((D) => {
      const { [x]: z, ...L } = { ...D };
      return L;
    });
  }, []), k = w.useMemo(
    () => ({
      registerField: y,
      registerSubmit: C,
      resetForm: $,
      setError: _,
      hasError: R,
      clearError: S,
      values: l,
      status: a,
      errors: p
    }),
    [
      y,
      C,
      $,
      _,
      R,
      S,
      l,
      a,
      p
    ]
  );
  return /* @__PURE__ */ b.jsx(a6.Provider, { value: k, children: n });
}, ll = () => w.useContext(a6);
var LI = "_1xl24760";
const qy = ({ name: n }) => {
  const { errors: a } = ll(), o = a[n];
  return o ? /* @__PURE__ */ b.jsx("span", { "data-testid": "sid-form-error-message", className: LI, children: o.message }) : null;
}, MI = new RegExp(
  "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[-\b\v\f-!#-[]-]|\\[-	\v\f-])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[-\b\v\f-!-ZS-]|\\[-	\v\f-])+)\\])"
), i6 = 6, II = (n) => !(typeof n != "string" || n === ""), qI = (n) => typeof n != "string" || n === "" ? !1 : MI.test(n), l5 = (n) => !(Number.isNaN(Number(n)) || n.length !== i6);
function zI(n) {
  return `authenticating.setPassword.validation.${n.failedRules[0].name}`;
}
function NI({
  errorEvent: n,
  password: a
}) {
  const o = n.failedRules[0];
  let l = "";
  if (o.matchType === "must_not_match") {
    const c = o.regexp.exec(a);
    l = c !== null ? c[0] : "";
  }
  return l ? {
    ILLEGAL_SEQUENCE: l
  } : {};
}
var PI = "_1xoz4765", UI = "_1xoz4764", Gg = "_1xoz4763", FI = "_1xoz4762", VI = "_1xoz4760", u5 = "_1xoz4766", HI = "_1xoz4761";
const o6 = wt.createContext(
  {
    flowState: null,
    lastHandle: void 0,
    submitPayloadRef: { current: {} },
    handleSubmit: () => null,
    selectedFactor: void 0,
    setSelectedFactor: () => null
  }
), ul = () => wt.useContext(o6), BI = {
  email_link: "factor.emailLink",
  otp_via_sms: "factor.otpViaSms",
  otp_via_email: "factor.otpViaEmail",
  sms_link: "factor.smsLink",
  webauthn: "factor.webauthn",
  password: "factor.password",
  oidc: "",
  saml: "",
  totp: ""
}, ap = {
  email: "email",
  phone: "phone"
}, jI = {
  phone_number: ap.phone,
  email_address: ap.email
}, mc = ({ children: n }) => {
  const { factors: a, text: o } = cn(), { handleSubmit: l, submitPayloadRef: c, selectedFactor: p } = ul(), { registerSubmit: d } = ll(), v = w.useMemo(
    () => a.filter(($) => t6($)),
    [a]
  ), y = w.useMemo(() => My(a), [a]);
  if (v.length === 0)
    return null;
  const C = ($) => {
    if ($.preventDefault(), !c.current.handleType || !c.current.handleValue || !p)
      return;
    const { handleType: _, handleValue: R, flag: S } = c.current;
    _ === "phone_number" && !S || l(p, {
      type: _,
      value: _ === "phone_number" ? `${S.dial_code}${R}` : R
    });
  };
  return typeof n == "function" ? /* @__PURE__ */ b.jsx("div", { "data-testid": "sid-form-initial-function", children: n({ handleSubmit: l, factors: v, handleTypes: y, text: o }) }) : w.Children.count(n) > 0 ? /* @__PURE__ */ b.jsx(
    "form",
    {
      "data-testid": "sid-form-initial-children",
      onSubmit: d(C),
      children: n
    }
  ) : /* @__PURE__ */ b.jsxs(
    "form",
    {
      "data-testid": "sid-form-initial-default",
      onSubmit: d(C),
      children: [
        /* @__PURE__ */ b.jsx(zy, {}),
        /* @__PURE__ */ b.jsx(Ny, {})
      ]
    }
  );
}, zy = ({ children: n }) => {
  const { lastHandle: a } = ul(), { factors: o, text: l } = cn(), c = w.useMemo(
    () => o.filter((d) => t6(d)),
    [o]
  ), p = w.useMemo(() => My(o), [o]);
  return typeof n == "function" ? /* @__PURE__ */ b.jsx(b.Fragment, { children: n({ factors: c, handleTypes: p }) }) : w.Children.count(n) > 0 ? /* @__PURE__ */ b.jsx(b.Fragment, { children: n }) : p.length === 1 ? /* @__PURE__ */ b.jsx(b.Fragment, { children: /* @__PURE__ */ b.jsx(
    Yg,
    {
      factors: c,
      handleType: p[0],
      defaultValue: jg(a, p[0])
    }
  ) }) : /* @__PURE__ */ b.jsx(
    aI,
    {
      testId: "sid-handle-type-tabs",
      className: oa({ marginY: "6" }),
      defaultValue: jI[(a == null ? void 0 : a.type) ?? "email_address"],
      tabs: [
        {
          id: ap.email,
          title: l["initial.handle.email"],
          content: /* @__PURE__ */ b.jsx(
            Yg,
            {
              factors: c,
              handleType: "email_address",
              defaultValue: jg(
                a,
                "email_address"
              )
            }
          )
        },
        {
          id: ap.phone,
          title: l["initial.handle.phone"],
          content: /* @__PURE__ */ b.jsx(
            Yg,
            {
              factors: c,
              handleType: "phone_number",
              defaultValue: jg(
                a,
                "phone_number"
              )
            }
          )
        }
      ]
    }
  );
};
zy.displayName = "Input";
const Ny = ({ children: n }) => {
  const { text: a } = cn(), { status: o } = ll();
  return typeof n == "function" ? /* @__PURE__ */ b.jsx(b.Fragment, { children: n({ text: a, status: o }) }) : w.Children.count(n) > 0 ? /* @__PURE__ */ b.jsx(b.Fragment, { children: n }) : /* @__PURE__ */ b.jsx(
    nl,
    {
      className: oa({
        marginTop: "6"
      }),
      type: "submit",
      variant: "primary",
      testId: "sid-form-initial-submit-button",
      disabled: o === "invalid",
      children: a["initial.submit"]
    }
  );
};
Ny.displayName = "Submit";
const Yg = ({
  handleType: n,
  factors: a,
  defaultValue: o
}) => {
  const { setSelectedFactor: l, submitPayloadRef: c } = ul(), p = w.useMemo(
    () => CI(a, n).filter((D) => !e6(D)),
    [a, n]
  ), { text: d, defaultCountryCode: v } = cn(), { registerField: y, values: C, resetForm: $ } = ll(), _ = p.length > 1, R = kI(o ?? ""), [S, k] = w.useState(
    wy((R == null ? void 0 : R.countryCode) ?? v)
  );
  w.useEffect(() => {
    l(p[0]);
  }, [p, l]), w.useEffect(() => $, [$]), w.useEffect(() => {
    c.current.flag = S;
  }, [S, c]), w.useEffect(() => {
    const D = C[n];
    c.current = {
      ...c.current,
      handleType: n,
      handleValue: D
    };
  }, [n, c, C]);
  const x = w.useMemo(() => n === "phone_number" ? /* @__PURE__ */ b.jsx(
    JD,
    {
      className: oa({ marginTop: "4" }),
      id: `sid-input-${n}`,
      name: n,
      label: d["initial.handle.phone"],
      placeholder: d["initial.handle.phone.placeholder"],
      value: C[n] ?? "",
      flag: S,
      onChange: y(n, {
        defaultValue: R == null ? void 0 : R.number,
        validator: (D) => {
          if (!II(D))
            return { message: d["validationError.phoneNumber"] };
        }
      }),
      onFlagChange: k
    }
  ) : /* @__PURE__ */ b.jsx(
    kD,
    {
      className: oa({ marginTop: "4" }),
      id: `sid-input-${n}`,
      name: n,
      label: d["initial.handle.email"],
      placeholder: d["initial.handle.phone.email"] || d["initial.handle.email.placeholder"],
      value: C[n] ?? "",
      onChange: y(n, {
        defaultValue: o,
        validator: (D) => {
          if (!qI(D))
            return { message: d["validationError.email"] };
        }
      })
    }
  ), [
    S,
    n,
    d,
    y,
    C,
    o,
    R
  ]);
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    _ && /* @__PURE__ */ b.jsx(
      kM,
      {
        defaultValue: p[0].method,
        className: oa({ marginBottom: "3", marginTop: "6" }),
        label: d["initial.authenticationMethod"],
        items: p.map((D) => ({
          label: d[BI[D.method]],
          value: D.method
        })),
        onChange: (D) => {
          const z = p.find((L) => L.method === D);
          l(z);
        },
        contentProps: {
          className: PI,
          position: "popper"
        }
      }
    ),
    x,
    /* @__PURE__ */ b.jsx(qy, { name: n })
  ] });
};
mc.displayName = "Controls";
mc.Input = zy;
mc.Submit = Ny;
const GI = ({ logo: n }) => {
  if (typeof n == "string" && n)
    return /* @__PURE__ */ b.jsx("div", { className: mt("sid-logo", "sid-logo--image", Gg), children: /* @__PURE__ */ b.jsx("div", { children: /* @__PURE__ */ b.jsx(
      "img",
      {
        className: Gg,
        src: n,
        alt: "Company logo"
      }
    ) }) });
  const a = n || /* @__PURE__ */ b.jsx(yy, {});
  return n || console.info("SlashID: No logo provided. Using default logo."), /* @__PURE__ */ b.jsx("div", { className: mt("sid-logo", "sid-logo--component", Gg), children: a });
}, Py = ({
  children: n
}) => {
  const { logo: a } = cn();
  return typeof n != "function" ? /* @__PURE__ */ b.jsx(GI, { logo: a }) : /* @__PURE__ */ b.jsx(b.Fragment, { children: n({ logo: a }) });
};
Py.displayName = "Logo";
const Vn = (n) => /* @__PURE__ */ b.jsx(kA, { ...n }), Uy = ({
  children: n
}) => {
  const { text: a } = cn(), o = wt.useMemo(() => /* @__PURE__ */ b.jsxs("div", { className: UI, children: [
    /* @__PURE__ */ b.jsx(
      Vn,
      {
        as: "h1",
        variant: { size: "2xl-title", weight: "bold" },
        t: "initial.title"
      }
    ),
    /* @__PURE__ */ b.jsx(
      Vn,
      {
        variant: { color: "contrast", weight: "semibold" },
        as: "h2",
        t: "initial.subtitle"
      }
    )
  ] }), []);
  return typeof n == "function" ? /* @__PURE__ */ b.jsx(b.Fragment, { children: n({ text: a }) }) : wt.Children.count(n) > 0 ? /* @__PURE__ */ b.jsx(b.Fragment, { children: n }) : o;
};
Uy.displayName = "Header";
const YI = {
  google: /* @__PURE__ */ b.jsx(MD, {}),
  facebook: /* @__PURE__ */ b.jsx(OD, {}),
  github: /* @__PURE__ */ b.jsx(AD, {}),
  gitlab: /* @__PURE__ */ b.jsx(LD, {}),
  line: /* @__PURE__ */ b.jsx(ID, {}),
  bitbucket: /* @__PURE__ */ b.jsx(DD, {}),
  azuread: /* @__PURE__ */ b.jsx($D, {}),
  okta: /* @__PURE__ */ b.jsx(qD, {}),
  apple: /* @__PURE__ */ b.jsx(TD, {})
}, WI = {
  google: "Google",
  facebook: "Facebook",
  github: "GitHub",
  gitlab: "GitLab",
  line: "LINE",
  bitbucket: "Bitbucket",
  azuread: "Azure AD",
  okta: "Okta",
  apple: "Apple"
};
function KI({ provider: n, handleClick: a }) {
  var l;
  const { text: o } = cn();
  return (l = n.options) != null && l.provider_credentials_id ? /* @__PURE__ */ b.jsxs(
    nl,
    {
      onClick: () => a({ method: "saml", options: n.options }),
      variant: "secondary",
      icon: /* @__PURE__ */ b.jsx(ZI, { logo: n.logo, id: n.options.provider_credentials_id }),
      className: mt("sid-saml--button"),
      children: [
        o["initial.sso"],
        /* @__PURE__ */ b.jsx("span", { className: HI, children: n.label || "SAML" })
      ]
    }
  ) : null;
}
function ZI({ logo: n, id: a }) {
  return n ? typeof n == "string" ? /* @__PURE__ */ b.jsx(
    "img",
    {
      className: mt("sid-sso-logo", `sid-sso-logo--${a}`, u5),
      src: n,
      alt: "SSO provider logo"
    }
  ) : /* @__PURE__ */ b.jsx(
    "div",
    {
      className: mt("sid-sso-logo", `sid-sso-logo--${a}`, u5),
      children: n
    }
  ) : null;
}
function XI({ provider: n, handleClick: a }) {
  var l, c, p;
  const { text: o } = cn();
  return (l = n.options) != null && l.provider ? /* @__PURE__ */ b.jsxs(
    nl,
    {
      onClick: () => a({ method: "oidc", options: n.options }),
      variant: "secondary",
      icon: YI[(c = n.options) == null ? void 0 : c.provider],
      className: mt("sid-oidc--button"),
      children: [
        o["initial.oidc"],
        /* @__PURE__ */ b.jsx("span", { className: VI, children: n.label || WI[(p = n.options) == null ? void 0 : p.provider] })
      ]
    }
  ) : null;
}
function s6({ providers: n, handleClick: a }) {
  return n.length ? /* @__PURE__ */ b.jsx(
    "div",
    {
      className: mt(
        "sid-form-sso",
        oa({ marginTop: "4" }),
        FI
      ),
      children: n.map((o) => {
        var l, c;
        switch (o.method) {
          case "oidc":
            return /* @__PURE__ */ b.jsx(
              XI,
              {
                provider: o,
                handleClick: a
              },
              (l = o.options) == null ? void 0 : l.client_id
            );
          case "saml":
            return /* @__PURE__ */ b.jsx(
              KI,
              {
                provider: o,
                handleClick: a
              },
              (c = o.options) == null ? void 0 : c.provider_credentials_id
            );
          default:
            throw new Error("unsupported SSO method");
        }
      })
    }
  ) : null;
}
const l6 = () => {
  const { factors: n, text: a } = cn(), o = w.useMemo(
    () => RI(n),
    [n]
  );
  return /* @__PURE__ */ b.jsx(b.Fragment, { children: o && /* @__PURE__ */ b.jsx(nO, { children: a["initial.divider"] }) });
}, u6 = ({
  children: n
}) => {
  const { factors: a } = cn(), { handleSubmit: o } = ul(), l = a.filter(e6), c = wt.useMemo(() => /* @__PURE__ */ b.jsx(s6, { providers: l, handleClick: o }), [o, l]);
  return typeof n == "function" ? /* @__PURE__ */ b.jsx(b.Fragment, { children: n({ factors: l, handleClick: o }) }) : wt.Children.count(n) > 0 ? /* @__PURE__ */ b.jsx(b.Fragment, { children: n }) : c;
};
u6.displayName = "OIDC";
const Fy = ({
  children: n
}) => {
  const { factors: a } = cn(), { handleSubmit: o } = ul(), l = a.filter(cy), c = wt.useMemo(() => /* @__PURE__ */ b.jsx(s6, { providers: l, handleClick: o }), [o, l]);
  return typeof n == "function" ? /* @__PURE__ */ b.jsx(b.Fragment, { children: n({ factors: l, handleClick: o }) }) : wt.Children.count(n) > 0 ? /* @__PURE__ */ b.jsx(b.Fragment, { children: n }) : c;
};
Fy.displayName = "SSO";
const Xi = () => /* @__PURE__ */ b.jsxs("article", { "data-testid": "sid-form-initial-state", children: [
  /* @__PURE__ */ b.jsx(Py, {}),
  /* @__PURE__ */ b.jsx(Uy, {}),
  /* @__PURE__ */ b.jsx(mc, {}),
  /* @__PURE__ */ b.jsx(l6, {}),
  /* @__PURE__ */ b.jsx(Fy, {})
] });
Xi.Logo = Py;
Xi.Header = Uy;
Xi.Controls = mc;
Xi.Divider = l6;
Xi.OIDC = u6;
Xi.SSO = Fy;
function c6(n, { isSubmitting: a, hasRetried: o } = {
  isSubmitting: !1,
  hasRetried: !1
}) {
  switch (n.method) {
    case "oidc":
      return {
        message: "authenticating.message.oidc",
        title: "authenticating.title.oidc"
      };
    case "webauthn":
      return {
        message: "authenticating.message.webauthn",
        title: "authenticating.title.webauthn"
      };
    case "sms_link":
      return {
        message: "authenticating.message.smsLink",
        title: "authenticating.title.smsLink"
      };
    case "otp_via_sms":
      return a && o ? {
        message: "authenticating.retry.message.smsOtp",
        title: "authenticating.retry.title.smsOtp"
      } : a ? {
        message: "authenticating.submitting.message.smsOtp",
        title: "authenticating.submitting.title.smsOtp"
      } : {
        message: "authenticating.message.smsOtp",
        title: "authenticating.title.smsOtp"
      };
    case "otp_via_email":
      return a && o ? {
        message: "authenticating.retry.message.emailOtp",
        title: "authenticating.retry.title.emailOtp"
      } : a ? {
        message: "authenticating.submitting.message.emailOtp",
        title: "authenticating.submitting.title.emailOtp"
      } : {
        message: "authenticating.message.emailOtp",
        title: "authenticating.title.emailOtp"
      };
    case "email_link":
    default:
      return {
        message: "authenticating.message.emailLink",
        title: "authenticating.title.emailLink"
      };
  }
}
var QI = "h1jwma5", JI = "h1jwma3", eq = "h1jwma1", tq = "h1jwma2", nq = "h1jwma4", rq = "h1jwma0", aq = "h1jwma7";
const cl = () => /* @__PURE__ */ b.jsx(hc, { children: /* @__PURE__ */ b.jsx(Z5, {}) }), gp = () => /* @__PURE__ */ b.jsx(hc, { children: /* @__PURE__ */ b.jsx(PD, {}) }), Vy = () => /* @__PURE__ */ b.jsx(hc, { children: /* @__PURE__ */ b.jsx(zD, {}) }), Hy = ({ onCancel: n }) => {
  const { text: a } = cn();
  return /* @__PURE__ */ b.jsx(
    lp,
    {
      className: oa({ marginBottom: "4" }),
      testId: "sid-form-authenticating-cancel-button",
      variant: "back",
      onClick: n,
      children: a["authenticating.back"]
    }
  );
}, d6 = ({ onRetry: n }) => {
  const { text: a } = cn();
  return /* @__PURE__ */ b.jsxs("div", { className: rq, children: [
    /* @__PURE__ */ b.jsx(
      Vn,
      {
        variant: { size: "sm", color: "tertiary", weight: "semibold" },
        t: "authenticating.retryPrompt"
      }
    ),
    /* @__PURE__ */ b.jsx(
      lp,
      {
        className: oa({ marginLeft: "1" }),
        type: "button",
        testId: "sid-form-authenticating-retry-button",
        onClick: n,
        children: a["authenticating.retry"]
      }
    )
  ] });
}, iq = ({ factor: n }) => xI(n) ? /* @__PURE__ */ b.jsx(gp, {}) : EI(n) ? /* @__PURE__ */ b.jsx(Vy, {}) : /* @__PURE__ */ b.jsx(cl, {}), oq = ({ factor: n }) => XS(n) ? /* @__PURE__ */ b.jsx(gp, {}) : QS(n) ? /* @__PURE__ */ b.jsx(Vy, {}) : /* @__PURE__ */ b.jsx(cl, {}), sq = 2e3, lq = ({ flowState: n }) => {
  const { text: a } = cn(), { sid: o } = mp(), { values: l, registerField: c, registerSubmit: p, setError: d, clearError: v } = ll(), [y, C] = w.useState("initial"), $ = w.useRef(null), _ = n.context.config.factor, R = n.context.attempt > 1, { title: S, message: k } = c6(_, {
    isSubmitting: y === "submitting",
    hasRetried: R
  }), x = w.useCallback(
    (L) => {
      L.preventDefault(), C("submitting"), o == null || o.publish("otpCodeSubmitted", l.otp);
    },
    [o, l]
  );
  w.useEffect(() => {
    const L = () => {
      d("otp", {
        message: a["authenticating.otpInput.submit.error"]
      }), l.otp = "";
    };
    return o == null || o.subscribe("otpIncorrectCodeSubmitted", L), () => o == null ? void 0 : o.unsubscribe("otpIncorrectCodeSubmitted", L);
  }, [d, o, a, l]);
  const D = w.useCallback(
    (L) => {
      const M = c("otp", {
        validator: (H) => {
          if (!l5(H))
            return { message: a["validationError.otp"] };
        }
      }), V = {
        target: {
          value: L
        }
      };
      v("otp"), M(V);
    },
    [v, c, a]
  ), z = () => {
    n.retry(), v("otp"), C("submitting");
  };
  return w.useEffect(() => {
    var L;
    l5(l.otp) && ((L = $.current) == null || L.click());
  }, [l]), w.useEffect(() => {
    const L = () => C("input");
    y === "initial" && (o == null || o.subscribe("otpCodeSent", L));
  }, [y, o]), /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsx(Hy, { onCancel: () => n.cancel() }),
    /* @__PURE__ */ b.jsx(Vn, { as: "h1", t: S, variant: { size: "2xl-title", weight: "bold" } }),
    /* @__PURE__ */ b.jsx(Vn, { t: k, variant: { color: "contrast", weight: "semibold" } }),
    y === "initial" && /* @__PURE__ */ b.jsx(oq, { factor: _ }),
    y === "input" && /* @__PURE__ */ b.jsx(
      "form",
      {
        onSubmit: p(x),
        className: tq,
        children: /* @__PURE__ */ b.jsxs("div", { className: QI, children: [
          /* @__PURE__ */ b.jsx(
            jD,
            {
              shouldAutoFocus: !0,
              inputType: "number",
              value: l.otp ?? "",
              onChange: D,
              numInputs: i6
            }
          ),
          /* @__PURE__ */ b.jsx("input", { hidden: !0, type: "submit", ref: $ }),
          /* @__PURE__ */ b.jsx(qy, { name: "otp" })
        ] })
      }
    ),
    y === "submitting" ? R ? /* @__PURE__ */ b.jsx(gp, {}) : /* @__PURE__ */ b.jsx(cl, {}) : null,
    y === "input" && // fallback to prevent layout shift
    /* @__PURE__ */ b.jsx(
      dI,
      {
        delayMs: sq * n.context.attempt,
        fallback: /* @__PURE__ */ b.jsx("div", { style: { height: 16 } }),
        children: /* @__PURE__ */ b.jsx("div", { className: aq, children: /* @__PURE__ */ b.jsx(d6, { onRetry: z }) })
      }
    )
  ] });
}, uq = ({
  onRecoverClick: n
}) => {
  const { text: a } = cn();
  return /* @__PURE__ */ b.jsxs("div", { className: nq, children: [
    /* @__PURE__ */ b.jsx(
      Vn,
      {
        variant: { size: "sm", color: "tertiary", weight: "semibold" },
        t: "authenticating.verifyPassword.recover.prompt"
      }
    ),
    /* @__PURE__ */ b.jsx(
      lp,
      {
        className: oa({ marginLeft: "1" }),
        type: "button",
        testId: "sid-form-authenticating-retry-button",
        onClick: n,
        children: a["authenticating.verifyPassword.recover.cta"]
      }
    )
  ] });
}, cq = ({
  formState: n,
  handleType: a
}) => {
  if (n === "submitting")
    return /* @__PURE__ */ b.jsx(cl, {});
  if (n === "recoverPassword") {
    if (a === "email_address")
      return /* @__PURE__ */ b.jsx(gp, {});
    if (a === "phone_number")
      return /* @__PURE__ */ b.jsx(Vy, {});
  }
  return null;
};
function dq(n, a) {
  var l, c;
  return {
    initial: {
      title: "authenticating.initial.password.title",
      message: ((l = a.context.config.handle) == null ? void 0 : l.type) === "email_address" ? "authenticating.initial.password.message.email" : "authenticating.initial.password.message.phone"
    },
    setPassword: {
      title: "authenticating.setPassword.title",
      message: "authenticating.setPassword.message"
    },
    verifyPassword: {
      title: "authenticating.verifyPassword.title",
      message: "authenticating.verifyPassword.message"
    },
    recoverPassword: ((c = a.context.config.handle) == null ? void 0 : c.type) === "email_address" ? {
      title: "authenticating.recoverPassword.title.email",
      message: "authenticating.recoverPassword.message.email"
    } : {
      title: "authenticating.recoverPassword.title.phone",
      message: "authenticating.recoverPassword.message.phone"
    },
    submitting: {
      title: "authenticating.submitting.password.title",
      message: "authenticating.submitting.password.message"
    }
  }[n];
}
const fq = ({ flowState: n }) => {
  var L, M, V, H;
  const { sid: a } = mp(), { text: o } = cn(), {
    values: l,
    registerField: c,
    setError: p,
    hasError: d,
    clearError: v,
    registerSubmit: y
  } = ll(), [C, $] = w.useState("initial"), { title: _, message: R } = dq(C, n), S = C === "recoverPassword" ? {
    ...((L = n.context.config.handle) == null ? void 0 : L.type) === "email_address" && {
      EMAIL_ADDRESS: n.context.config.handle.value
    },
    ...((M = n.context.config.handle) == null ? void 0 : M.type) === "phone_number" && {
      PHONE_NUMBER: n.context.config.handle.value
    }
  } : void 0, k = w.useCallback(
    (N) => {
      if (N.preventDefault(), !l.password) {
        p("password", {
          message: o["authenticating.setPassword.validation.required"]
        });
        return;
      }
      if (C === "setPassword" && l.password !== l.passwordConfirm) {
        p("password", {
          message: o["authenticating.setPassword.validation.mismatch"]
        });
        return;
      }
      $("submitting"), a == null || a.publish("passwordSubmitted", l.password);
    },
    [C, p, a, o, l]
  ), x = w.useCallback(
    (N) => {
      c("password", {})(N), v("password");
    },
    [v, c]
  ), D = w.useCallback(
    (N) => {
      c("passwordConfirm", {})(N), v("password");
    },
    [v, c]
  ), z = w.useCallback(async () => {
    if (C === "verifyPassword") {
      $("recoverPassword");
      try {
        await n.recover(), $("verifyPassword");
      } catch {
      }
    }
  }, [n, C]);
  return w.useEffect(() => {
    const N = () => $("setPassword"), P = () => $("verifyPassword"), J = () => p("password", {
      message: o["authenticating.setPassword.validation.incorrect"]
    }), me = (we) => p("password", {
      message: mS(
        o[zI(we)],
        NI({
          errorEvent: we,
          password: l.password
        })
      )
    });
    return a == null || a.subscribe("passwordSetReady", N), a == null || a.subscribe("passwordVerifyReady", P), a == null || a.subscribe("incorrectPasswordSubmitted", J), a == null || a.subscribe("invalidPasswordSubmitted", me), () => {
      a == null || a.unsubscribe("passwordSetReady", N), a == null || a.unsubscribe("passwordVerifyReady", P), a == null || a.unsubscribe("incorrectPasswordSubmitted", J), a == null || a.unsubscribe("invalidPasswordSubmitted", me);
    };
  }, [p, a, o, l]), /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsx(Hy, { onCancel: () => n.cancel() }),
    /* @__PURE__ */ b.jsx(Vn, { as: "h1", t: _, variant: { size: "2xl-title", weight: "bold" } }),
    /* @__PURE__ */ b.jsx(
      Vn,
      {
        t: R,
        variant: { color: "contrast", weight: "semibold" },
        tokens: S
      }
    ),
    C === "initial" && /* @__PURE__ */ b.jsx(cl, {}),
    (C === "setPassword" || C === "verifyPassword") && /* @__PURE__ */ b.jsxs("form", { onSubmit: y(k), children: [
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "hidden",
          name: "username",
          value: (V = n.context.config.handle) == null ? void 0 : V.value,
          autoComplete: "username"
        }
      ),
      /* @__PURE__ */ b.jsxs("div", { className: JI, children: [
        /* @__PURE__ */ b.jsx(
          R2,
          {
            id: "password-input",
            label: o["authenticating.password.label"],
            placeholder: o["authenticating.password.placeholder"],
            name: "password",
            value: l.password ?? "",
            onChange: x,
            error: d("password"),
            autoComplete: C === "setPassword" ? "new-password" : "current-password"
          }
        ),
        C === "setPassword" && /* @__PURE__ */ b.jsx(
          R2,
          {
            id: "password-input-confirm",
            label: o["authenticating.passwordConfirm.label"],
            placeholder: o["authenticating.password.placeholder"],
            name: "passwordConfirm",
            value: l.passwordConfirm ?? "",
            onChange: D,
            error: d("password"),
            className: oa({ marginTop: "4" })
          }
        ),
        /* @__PURE__ */ b.jsx(qy, { name: "password" }),
        C === "verifyPassword" && /* @__PURE__ */ b.jsx(uq, { onRecoverClick: z })
      ] }),
      /* @__PURE__ */ b.jsx(
        nl,
        {
          type: "submit",
          variant: "primary",
          testId: "sid-form-initial-submit-button",
          children: o["authenticating.password.submit"]
        }
      )
    ] }),
    /* @__PURE__ */ b.jsx(
      cq,
      {
        formState: C,
        handleType: (H = n.context.config.handle) == null ? void 0 : H.type
      }
    )
  ] });
}, pq = ({ flowState: n }) => {
  var c;
  const a = n.context.config.factor, { title: o, message: l } = c6(a);
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsx(Hy, { onCancel: () => n.cancel() }),
    /* @__PURE__ */ b.jsx(Vn, { as: "h1", t: o, variant: { size: "2xl-title", weight: "bold" }, children: a.method === "oidc" ? /* @__PURE__ */ b.jsx("span", { className: eq, children: (c = a.options) == null ? void 0 : c.provider }) : void 0 }),
    /* @__PURE__ */ b.jsx(Vn, { t: l, variant: { color: "contrast", weight: "semibold" } }),
    /* @__PURE__ */ b.jsx(iq, { factor: a }),
    /* @__PURE__ */ b.jsx(d6, { onRetry: () => n.retry() })
  ] });
};
function Wg({ children: n }) {
  return /* @__PURE__ */ b.jsx("article", { "data-testid": "sid-form-authenticating-state", children: n });
}
const hq = ({ flowState: n }) => {
  const a = n.context.config.factor;
  return SI(a) ? /* @__PURE__ */ b.jsx(Wg, { children: /* @__PURE__ */ b.jsx(lq, { flowState: n }) }) : JS(a) ? /* @__PURE__ */ b.jsx(Wg, { children: /* @__PURE__ */ b.jsx(fq, { flowState: n }) }) : /* @__PURE__ */ b.jsx(Wg, { children: /* @__PURE__ */ b.jsx(pq, { flowState: n }) });
}, vq = () => /* @__PURE__ */ b.jsx(hc, { variant: "red", shouldAnimate: !1, children: /* @__PURE__ */ b.jsx(UD, {}) });
function mq(n) {
  return x2.isResponseError(n) ? "response" : x2.isRateLimitError(n) ? "rateLimit" : "unknown";
}
function gq(n) {
  switch (n) {
    case "rateLimit":
      return "error.subtitle.rateLimit";
    default:
      return "error.subtitle";
  }
}
const By = ({ children: n }) => {
  const { flowState: a } = ul();
  return (a == null ? void 0 : a.status) !== "error" ? null : typeof n == "function" ? /* @__PURE__ */ b.jsx("div", { "data-testid": "sid-form-error-function", children: n({
    context: a.context,
    retry: a.retry,
    cancel: a.cancel
  }) }) : w.Children.count(n) > 0 ? /* @__PURE__ */ b.jsx("div", { "data-testid": "sid-form-error-children", children: n }) : /* @__PURE__ */ b.jsx(yq, { flowState: a });
};
By.displayName = "Form.Error";
const yq = ({ flowState: n }) => {
  const { text: a } = cn(), o = mq(n.context.error);
  return /* @__PURE__ */ b.jsxs("article", { "data-testid": "sid-form-error-state", children: [
    /* @__PURE__ */ b.jsx(
      lp,
      {
        className: oa({ marginBottom: "4" }),
        testId: "sid-form-authenticating-cancel-button",
        variant: "back",
        onClick: () => n.cancel(),
        children: a["authenticating.back"]
      }
    ),
    /* @__PURE__ */ b.jsx(
      Vn,
      {
        as: "h1",
        t: "error.title",
        variant: { size: "2xl-title", weight: "bold" }
      }
    ),
    /* @__PURE__ */ b.jsx(
      Vn,
      {
        as: "h2",
        t: gq(o),
        variant: { color: "contrast", weight: "semibold" }
      }
    ),
    /* @__PURE__ */ b.jsx(vq, {}),
    /* @__PURE__ */ b.jsx(
      nl,
      {
        type: "submit",
        variant: "primary",
        testId: "sid-form-error-retry-button",
        onClick: () => n.retry(),
        children: a["error.retry"]
      }
    )
  ] });
}, bq = () => /* @__PURE__ */ b.jsx(hc, { children: /* @__PURE__ */ b.jsx(
  "svg",
  {
    width: "21",
    height: "18",
    viewBox: "0 0 21 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ b.jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M19.8505 0.705985C20.6342 1.38283 20.7209 2.56684 20.044 3.35055L8.16908 17.1005C7.80192 17.5256 7.2635 17.7637 6.70195 17.7493C6.1404 17.7349 5.61489 17.4695 5.27002 17.0261L0.895049 11.4011C0.259296 10.5837 0.406547 9.4057 1.22394 8.76995C2.04134 8.13419 3.21935 8.28145 3.8551 9.09884L6.82592 12.9185L17.2059 0.89949C17.8828 0.115778 19.0668 0.0291434 19.8505 0.705985Z",
        fill: "white"
      }
    )
  }
) }), wq = () => /* @__PURE__ */ b.jsxs("article", { "data-testid": "sid-form-success-state", children: [
  /* @__PURE__ */ b.jsx(
    Vn,
    {
      as: "h1",
      t: "success.title",
      variant: { size: "2xl-title", weight: "bold" }
    }
  ),
  /* @__PURE__ */ b.jsx(
    Vn,
    {
      as: "h2",
      t: "success.subtitle",
      variant: { color: "contrast", weight: "semibold" }
    }
  ),
  /* @__PURE__ */ b.jsx(bq, {})
] });
var Cq = "gwp8o20";
var Sq = "_1iedw350";
const _q = () => /* @__PURE__ */ b.jsx(
  Vn,
  {
    className: Sq,
    t: "footer.branding",
    variant: { size: "xs", weight: "semibold" }
  }
), c5 = "@slashid/LAST_HANDLE", xq = () => {
  const { storeLastHandle: n } = cn(), { sid: a } = mp(), o = w.useMemo(() => {
    if (ny())
      try {
        const c = window.localStorage.getItem(c5);
        return !n || !c ? void 0 : JSON.parse(c);
      } catch {
        return;
      }
  }, [n]), l = w.useCallback(({ handle: c }) => {
    if (ny() && vI(c))
      try {
        window.localStorage.setItem(
          c5,
          JSON.stringify(c)
        );
      } catch {
      }
  }, []);
  return w.useEffect(() => (n && a && a.subscribe("idFlowSucceeded", l), () => {
    n && a && a.unsubscribe("idFlowSucceeded", l);
  }), [n, a, l]), { lastHandle: o };
};
function Eq({
  factors: n,
  text: a,
  children: o
}) {
  const l = cn();
  return !n && !a ? /* @__PURE__ */ b.jsx(b.Fragment, { children: o }) : /* @__PURE__ */ b.jsx(
    r6,
    {
      ...l,
      text: {
        ...l.text,
        ...a
      },
      factors: n || l.factors,
      children: o
    }
  );
}
function f6({ children: n, name: a }) {
  return /* @__PURE__ */ b.jsx("div", { className: `sid-slot-${a}`, children: n });
}
function Rq({ children: n, defaultSlots: a }) {
  return wt.useMemo(() => {
    const l = { ...a };
    return wt.Children.forEach(n, (c) => {
      if (wt.isValidElement(c)) {
        if (c.type !== f6) {
          console.warn(`Passed a non-<Slot> component to a slot: ${c.type}`);
          return;
        }
        c.props.name in a ? l[c.props.name] = c : console.warn(
          `Passed a <Slot> with an unsupported name: ${c.props.name}`
        );
      }
    }), l;
  }, [n, a]);
}
const jy = ({
  className: n,
  onSuccess: a,
  onError: o,
  factors: l,
  text: c,
  middleware: p,
  children: d
}) => {
  const v = OI({ onSuccess: a, onError: o }), { showBanner: y } = cn(), { lastHandle: C } = xq(), $ = wt.useRef({
    handleType: void 0,
    handleValue: void 0,
    flag: void 0
  }), [_, R] = wt.useState(), { status: S } = v, k = wt.useMemo(() => ({
    footer: y ? /* @__PURE__ */ b.jsx(_q, {}) : null,
    initial: S === "initial" ? /* @__PURE__ */ b.jsx(Xi, {}) : void 0,
    authenticating: S === "authenticating" ? /* @__PURE__ */ b.jsx(hq, { flowState: v }) : void 0,
    success: S === "success" ? /* @__PURE__ */ b.jsx(wq, { flowState: v }) : void 0,
    error: S === "error" ? /* @__PURE__ */ b.jsx(By, {}) : void 0
  }), [S, y, v]), x = Rq({ children: d, defaultSlots: k }), D = w.useCallback(
    (z, L) => {
      v.status === "initial" && v.logIn(
        {
          factor: z,
          handle: L
        },
        { middleware: p }
      );
    },
    [v, p]
  );
  return /* @__PURE__ */ b.jsx(
    o6.Provider,
    {
      value: {
        flowState: v,
        lastHandle: C,
        handleSubmit: D,
        submitPayloadRef: $,
        selectedFactor: _,
        setSelectedFactor: R
      },
      children: /* @__PURE__ */ b.jsx("div", { className: mt("sid-form", Cq, n), children: /* @__PURE__ */ b.jsxs(Eq, { text: c, factors: l, children: [
        v.status === "initial" && /* @__PURE__ */ b.jsx(s5, { children: x.initial }),
        v.status === "authenticating" && /* @__PURE__ */ b.jsx(s5, { children: x.authenticating }),
        v.status === "success" && x.success,
        v.status === "error" && x.error,
        x.footer
      ] }) })
    }
  );
};
jy.Initial = Xi;
jy.Error = By;
var p6, d5 = rl;
{
  var f5 = d5.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  p6 = function(n, a) {
    f5.usingClientEntryPoint = !0;
    try {
      return d5.createRoot(n, a);
    } finally {
      f5.usingClientEntryPoint = !1;
    }
  };
}
var kq = Object.defineProperty, Tq = (n, a, o) => a in n ? kq(n, a, { enumerable: !0, configurable: !0, writable: !0, value: o }) : n[a] = o, Uf = (n, a, o) => (Tq(n, typeof a != "symbol" ? a + "" : a, o), o);
const $q = {
  stringify: (n) => n,
  parse: (n) => n
}, Dq = {
  stringify: (n) => `${n}`,
  parse: (n) => parseFloat(n)
}, Oq = {
  stringify: (n) => n ? "true" : "false",
  parse: (n) => /^[ty1-9]/i.test(n)
}, Aq = {
  stringify: (n) => n.name,
  parse: (n, a) => {
    const o = (() => {
      if (typeof window < "u" && n in window)
        return window[n];
      if (typeof global < "u" && n in global)
        return global[n];
    })();
    return typeof o == "function" ? o.bind(a) : void 0;
  }
}, Lq = {
  stringify: (n) => JSON.stringify(n),
  parse: (n) => JSON.parse(n)
}, Kg = {
  string: $q,
  number: Dq,
  boolean: Oq,
  function: Aq,
  json: Lq
}, Zg = Symbol.for("r2wc.render"), Ff = Symbol.for("r2wc.connected"), qo = Symbol.for("r2wc.context"), ji = Symbol.for("r2wc.props");
function Mq(n, a, o) {
  var l, c, p;
  a.props || (a.props = n.propTypes ? Object.keys(n.propTypes) : []);
  const d = (Array.isArray(a.props) ? a.props.slice() : Object.keys(a.props)).filter((_) => _ !== "container"), v = {}, y = {}, C = {};
  for (const _ of d) {
    v[_] = Array.isArray(a.props) ? "string" : a.props[_];
    const R = Iq(_);
    y[_] = R, C[R] = _;
  }
  class $ extends HTMLElement {
    constructor() {
      super(), Uf(this, l, !0), Uf(this, c), Uf(this, p, {}), Uf(this, "container"), a.shadow ? this.container = this.attachShadow({
        mode: a.shadow
      }) : this.container = this, this[ji].container = this.container;
      for (const R of d) {
        const S = y[R], k = this.getAttribute(S), x = v[R], D = Kg[x];
        k && D != null && D.parse && (this[ji][R] = D.parse(k, this));
      }
    }
    static get observedAttributes() {
      return Object.keys(C);
    }
    connectedCallback() {
      this[Ff] = !0, this[Zg]();
    }
    disconnectedCallback() {
      this[Ff] = !1, this[qo] && o.unmount(this[qo]), delete this[qo];
    }
    attributeChangedCallback(R, S, k) {
      const x = C[R], D = v[x], z = Kg[D];
      x in v && z != null && z.parse && (this[ji][x] = z.parse(k, this), this[Zg]());
    }
    [(l = Ff, c = qo, p = ji, Zg)]() {
      this[Ff] && (this[qo] ? o.update(this[qo], this[ji]) : this[qo] = o.mount(
        this.container,
        n,
        this[ji]
      ));
    }
  }
  for (const _ of d) {
    const R = y[_], S = v[_];
    Object.defineProperty($.prototype, _, {
      enumerable: !0,
      configurable: !0,
      get() {
        return this[ji][_];
      },
      set(k) {
        this[ji][_] = k;
        const x = Kg[S];
        if (x != null && x.stringify) {
          const D = x.stringify(k);
          this.getAttribute(R) !== D && this.setAttribute(R, D);
        }
      }
    });
  }
  return $;
}
function Iq(n = "") {
  return n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
function qq(n, a, o) {
  const l = p6(n), c = wt.createElement(a, o);
  return l.render(c), {
    root: l,
    ReactComponent: a
  };
}
function zq({ root: n, ReactComponent: a }, o) {
  const l = wt.createElement(a, o);
  n.render(l);
}
function Nq({ root: n }) {
  n.unmount();
}
function Pq(n, a = {}) {
  return Mq(n, a, { mount: qq, update: zq, unmount: Nq });
}
const Uq = ({
  // provider
  oid: n,
  initialToken: a,
  tokenStorage: o,
  environment: l,
  analyticsEnabled: c,
  themeProps: p,
  // overides
  logo: d = /* @__PURE__ */ b.jsx(yy, {}),
  factors: v,
  text: y,
  storeLastHandle: C,
  defaultCountryCode: $ = "US",
  // form
  onSuccess: _,
  onError: R,
  middleware: S,
  // slots
  slotSuccessIndeterminate: k
}) => /* @__PURE__ */ b.jsx("div", { style: { width: "440px", display: "block" }, children: /* @__PURE__ */ b.jsx(
  hI,
  {
    oid: n,
    initialToken: a,
    themeProps: p,
    environment: l,
    tokenStorage: o,
    analyticsEnabled: c,
    children: /* @__PURE__ */ b.jsx(
      r6,
      {
        logo: d,
        factors: v,
        text: y,
        storeLastHandle: C,
        defaultCountryCode: $,
        children: /* @__PURE__ */ b.jsx(jy, { onSuccess: _, onError: R, middleware: S, children: k ? /* @__PURE__ */ b.jsx(f6, { name: "success", children: /* @__PURE__ */ b.jsxs("article", { "data-testid": "sid-form-success-state", children: [
          /* @__PURE__ */ b.jsx(
            Vn,
            {
              as: "h1",
              t: "success.title",
              variant: { size: "2xl-title", weight: "bold" }
            }
          ),
          /* @__PURE__ */ b.jsx(
            Vn,
            {
              as: "h2",
              t: "success.subtitle",
              variant: { color: "contrast", weight: "semibold" }
            }
          ),
          /* @__PURE__ */ b.jsx(cl, {})
        ] }) }) : void 0 })
      }
    )
  }
) }), Fq = Pq(Uq, {
  props: {
    // slashid provider
    oid: "string",
    initialToken: "string",
    tokenStorage: "string",
    analyticsEnabled: "boolean",
    themeProps: "json",
    environment: "string",
    // config provider
    logo: "string",
    text: "json",
    factors: "json",
    storeLastHandle: "boolean",
    defaultCountryCode: "string",
    // form
    onSuccess: "function",
    onError: "function",
    middleware: "function",
    // slots
    slotSuccessIndeterminate: "boolean"
  }
});
customElements.define("slashid-form", Fq);
//# sourceMappingURL=main.js.map
