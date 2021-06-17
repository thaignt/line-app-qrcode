! function (e, t) {
  if ("object" == typeof exports && "object" == typeof module) module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    var n = t();
    for (var o in n)("object" == typeof exports ? exports : e)[o] = n[o]
  }
}(window, function () {
  return o = {}, r.m = n = [function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var c = n(4),
      a = n(15),
      s = n(1),
      o = (Object.defineProperty(r.prototype, "instanceId", {
        get: function () {
          return this.instanceId_
        },
        enumerable: !0,
        configurable: !0
      }), r.prototype.enqueueCb = function (e, t, n) {
        for (var o = [], r = 3; r < arguments.length; r++) o[r - 3] = arguments[r];
        var i = {
          resolve: function (e) {
            t && s.isFunction(t) && t(e)
          },
          reject: function (e) {
            n && s.isFunction(n) && n(e)
          }
        };
        return this.enqueue.apply(this, [e, new a.Result(i)].concat(o))
      }, r.prototype.enqueuePromise = function (e, t) {
        for (var n, o, r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
        return this.enqueueCb.apply(this, [e, function (e) {
          n(t ? t(e) : e)
        }, function (e) {
          o(e)
        }].concat(r)), new Promise(function (e, t) {
          n = e, o = t
        })
      }, r.prototype.registerCallback = function (e, t) {
        this.callback.registerCallback(this.instanceId, e, t)
      }, r.prototype.unregisterCallback = function (e) {
        this.callback.unregisterCallback(this.instanceId, e)
      }, r.prototype.testArguments = function (n) {
        for (var e = [], t = 1; t < arguments.length; t++) e[t - 1] = arguments[t];
        return n.length === e.length && e.every(function (e, t) {
          return typeof n[t] === e
        })
      }, r.prototype.enqueue = function (e, t) {
        for (var n, o = [], r = 2; r < arguments.length; r++) o[r - 2] = arguments[r];
        return (n = this.queue).enqueue.apply(n, [this.className, e, this.instanceId_, t].concat(o))
      }, r);

    function r(e, t, n, o) {
      for (var r, i = [], a = 4; a < arguments.length; a++) i[a - 4] = arguments[a];
      if ("string" != typeof e || !(n instanceof c.Queue)) throw Error("Invalid arguments.");
      this.instanceId_ = s.generateId(), this.className = e, this.config = t, this.queue = n, this.callback = o, 0 < i.length && (r = this.queue).enqueue.apply(r, [this.className, "_jsConstructor", this.instanceId_, null].concat(i))
    }
    t.Base = o
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return "number" == typeof e
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.generateId = function () {
      return Date.now().toString(36) + Math.random().toString(36).slice(2)
    }, t.parseSemanticVersion = function (e) {
      var t = 0,
        n = /^(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:\.(?:\d+))?$/.exec(e);
      return n && 1 < n.length && n.slice(1).forEach(function (e) {
        t = 1e3 * t + parseInt(e || "0", 10)
      }), t
    }, t.isFunction = function (e) {
      return typeof Function == typeof e
    }, t.isNumber = o, t.isInteger = function (e) {
      return o(e) && Math.floor(e) === e
    }, t.isString = function (e) {
      return "string" == typeof e
    }, t.parsePercent = function (e) {
      var t = /^-?(\d*(?:\.\d*)?)%$/.exec(e);
      return t && 1 < t.length ? parseFloat(t[1]) : null
    }
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var a, i = n(7),
      c = n(0),
      s = n(3),
      u = (r(l, a = c.Base), l.prototype.createReader = function () {
        return new i.DirectoryReader(this.config, this.queue, this.callback, this.fullPath)
      }, l.prototype.getParent = function (t, e) {
        var n = this,
          o = {
            fullPath: this.fullPath
          };
        a.prototype.enqueueCb.call(this, "getParent", function (e) {
          e && e.name && e.fullPath && t && t(new l(n.config, n.queue, n.callback, e.name, e.fullPath))
        }, e, o)
      }, l.prototype.getFile = function (e, t, n, o) {
        var r = this;
        (t = t || {}).filePath = e, t.fullPath = this.fullPath, a.prototype.enqueueCb.call(this, "getFile", function (e) {
          e && e.name && e.fullPath && n && n(new s.FileEntry(r.config, r.queue, r.callback, e.name, e.fullPath))
        }, o, t)
      }, l.prototype.getDirectory = function (e, t, n, o) {
        var r = this;
        (t = t || {}).path = e, t.fullPath = this.fullPath, a.prototype.enqueueCb.call(this, "getDirectory", function (e) {
          e && e.name && e.fullPath && n && n(new l(r.config, r.queue, r.callback, e.name, e.fullPath))
        }, o, t)
      }, l.prototype.moveTo = function (e, t, n, o) {
        var r = this,
          i = {
            fullPath: this.fullPath,
            parentPath: e.fullPath,
            newName: t || this.name
          };
        a.prototype.enqueueCb.call(this, "moveTo", function (e) {
          e && e.name && e.fullPath && n && n(new l(r.config, r.queue, r.callback, e.name, e.fullPath))
        }, o, i)
      }, l.prototype.copyTo = function (e, t, n, o) {
        var r = this,
          i = {
            fullPath: this.fullPath,
            parentPath: e.fullPath,
            newName: t || this.name
          };
        a.prototype.enqueueCb.call(this, "copyTo", function (e) {
          e && e.name && e.fullPath && n && n(new l(r.config, r.queue, r.callback, e.name, e.fullPath))
        }, o, i)
      }, l.prototype.remove = function (e, t) {
        var n = {
          fullPath: this.fullPath
        };
        a.prototype.enqueueCb.call(this, "remove", e, t, n)
      }, l.prototype.removeRecursively = function (e, t) {
        var n = {
          fullPath: this.fullPath
        };
        a.prototype.enqueueCb.call(this, "removeRecursively", e, t, n)
      }, l.prototype.toURL = function () {
        return this.fullPath
      }, l.API_CLASS_ID = "applican.filesystem.directoryentry", l);

    function l(e, t, n, o, r) {
      var i = a.call(this, l.API_CLASS_ID, e, t, n) || this;
      return i.name = o, i.fullPath = r, i.isFile = !1, i.isDirectory = !0, i.filesystem = null, i
    }
    t.DirectoryEntry = u
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var a, i = n(0),
      c = n(6),
      s = n(2),
      u = n(8),
      l = (r(p, a = i.Base), p.prototype.createWriter = function (n, e) {
        var o = this,
          t = {
            name: this.name,
            fullPath: this.fullPath
          };
        a.prototype.enqueueCb.call(this, "createWriter", function (e) {
          if (e && e.name && e.fullPath && n) {
            var t = new c._File(e.name, e.fullPath, e.type, e.lastModifiedDate, e.size);
            n(new u.FileWriter(o.config, o.queue, o.callback, t))
          }
        }, e, t)
      }, p.prototype.file = function (t, e) {
        var n = {
          name: this.name,
          fullPath: this.fullPath
        };
        a.prototype.enqueueCb.call(this, "file", function (e) {
          e && e.name && e.fullPath && t && t(new c._File(e.name, e.fullPath, e.type, e.lastModifiedDate, e.size))
        }, e, n)
      }, p.prototype.getParent = function (t, e) {
        var n = this,
          o = {
            fullPath: this.fullPath
          };
        a.prototype.enqueueCb.call(this, "getParent", function (e) {
          e && e.name && e.fullPath && t && t(new s.DirectoryEntry(n.config, n.queue, n.callback, e.name, e.fullPath))
        }, e, o)
      }, p.prototype.moveTo = function (e, t, n, o) {
        var r = {
          fullPath: this.fullPath,
          parentPath: e.fullPath,
          newName: t || this.name
        };
        a.prototype.enqueueCb.call(this, "moveTo", function (e) {
          e && e.name && e.fullPath && n && n(new c._File(e.name, e.fullPath, e.type, e.lastModifiedDate, e.size))
        }, o, r)
      }, p.prototype.copyTo = function (e, t, n, o) {
        var r = {
          fullPath: this.fullPath,
          parentPath: e.fullPath,
          newName: t || this.name
        };
        a.prototype.enqueueCb.call(this, "copyTo", function (e) {
          e && e.name && e.fullPath && n && n(new c._File(e.name, e.fullPath, e.type, e.lastModifiedDate, e.size))
        }, o, r)
      }, p.prototype.remove = function (e, t) {
        var n = {
          fullPath: this.fullPath
        };
        a.prototype.enqueueCb.call(this, "remove", e, t, n)
      }, p.prototype.toURL = function () {
        return this.fullPath
      }, p.API_CLASS_ID = "applican.filesystem.fileentry", p);

    function p(e, t, n, o, r) {
      var i = a.call(this, p.API_CLASS_ID, e, t, n) || this;
      return i.name = o, i.fullPath = r, i.isFile = !0, i.isDirectory = !1, i.filesystem = null, i
    }
    t.FileEntry = l
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var s = n(13),
      o = (u.prototype.clear = function () {
        for (var e = 0, t = this.commands; e < t.length; e++) {
          var n = t[e],
            o = this.results[n.transactionId];
          o && (o.reject(new Error("Operation cancelled.")), delete this.results[n.transactionId])
        }
        this.commands = [], this.results = {}
      }, u.prototype.enqueue = function (e, t, n, o) {
        for (var r = [], i = 4; i < arguments.length; i++) r[i - 4] = arguments[i];
        var a = new(s.Command.bind.apply(s.Command, [void 0, this.sessionId, e, t, n].concat(r)));
        this.commands.push(a);
        var c = a.transactionId;
        return o && (this.results[c] = o), window.location.href = u.APPLICAN_API_ENQUEUE_URL + "?session_id=" + this.sessionId, c
      }, u.prototype.deque = function () {
        if (0 === this.commands.length) return null;
        var e = this.commands.shift();
        return e && (e.remainApis = this.commands.length), e || null
      }, u.prototype.resolve = function (e, t) {
        var n = this.results[e];
        return !!n && (n.resolve(t), delete this.results[e], !0)
      }, u.prototype.reject = function (e, t) {
        var n = this.results[e];
        return !!n && (n.reject(t), delete this.results[e], !0)
      }, u.APPLICAN_API_ENQUEUE_URL = "applican-api://localhost/enqueue", u);

    function u(e) {
      this.sessionId = e, this.commands = [], this.results = {}
    }
    t.Queue = o
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = (r.FIND_ALL_FIELDS = ["*"], r);

    function r(e, t, n) {
      this.filter = e, this.multiple = t, this.fields = n, this.filter = this.filter || "", this.fields = this.fields || r.FIND_ALL_FIELDS, void 0 === this.multiple && (this.multiple = !1)
    }
    t._ContactFindOptions = o
  }, function (e, t, n) {
    "use strict";
    var o;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), (o = t.FileError || (t.FileError = {}))[o.NOT_FOUND_ERR = 1] = "NOT_FOUND_ERR", o[o.SECURITY_ERR = 2] = "SECURITY_ERR", o[o.ABORT_ERR = 3] = "ABORT_ERR", o[o.NOT_READABLE_ERR = 4] = "NOT_READABLE_ERR", o[o.ENCODING_ERR = 5] = "ENCODING_ERR", o[o.NO_MODIFICATION_ALLOWED_ERR = 6] = "NO_MODIFICATION_ALLOWED_ERR", o[o.INVALID_STATE_ERR = 7] = "INVALID_STATE_ERR", o[o.SYNTAX_ERR = 8] = "SYNTAX_ERR", o[o.INVALID_MODIFICATION_ERR = 9] = "INVALID_MODIFICATION_ERR", o[o.QUOTA_EXCEEDED_ERR = 10] = "QUOTA_EXCEEDED_ERR", o[o.TYPE_MISMATCH_ERR = 11] = "TYPE_MISMATCH_ERR", o[o.PATH_EXISTS_ERR = 12] = "PATH_EXISTS_ERR", t._File = function (e, t, n, o, r) {
      this.name = e, this.fullPath = t, this.type = n, this.lastModifiedDate = o, this.size = r, this.name = this.name || "", this.fullPath = this.fullPath || null, this.type = this.type || null, this.lastModifiedDate = this.lastModifiedDate || null, this.size = this.size || 0, this.start = 0, this.end = this.size
    }
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      s = n(2),
      u = n(3),
      c = (r(l, i = a.Base), l.prototype.readEntries = function (a, e) {
        var c = this,
          t = {
            path: this.path
          };
        i.prototype.enqueueCb.call(this, "readEntries", function (e) {
          if (Array.isArray(e) && a) {
            for (var t = [], n = 0, o = e; n < o.length; n++) {
              var r = o[n],
                i = void 0;
              r.isDirectory ? i = new s.DirectoryEntry(c.config, c.queue, c.callback, r.name, r.fullPath) : r.isFile && (i = new u.FileEntry(c.config, c.queue, c.callback, r.name, r.fullPath)), i && t.push(i)
            }
            a(t)
          }
        }, e, t)
      }, l.API_CLASS_ID = "applican.filesystem.directoryreader", l);

    function l(e, t, n, o) {
      var r = i.call(this, l.API_CLASS_ID, e, t, n) || this;
      return r.path = o, r.path = r.path || null, r
    }
    t.DirectoryReader = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.abort = function () {}, s.prototype.write = function (e) {
        var t = {
          text: e,
          position: this.position,
          fileName: this.fileName,
          length: this.length
        };
        i.prototype.enqueueCb.call(this, "write", null, null, t)
      }, s.prototype._onWriteStart = function (e) {
        return this.onwritestart && this.onwritestart(e), !0
      }, s.prototype._onWrite = function (e) {
        return this.onwrite && this.onwrite(e), !0
      }, s.prototype._onWriteEnd = function (e) {
        return this.onwriteend && this.onwriteend(e), !0
      }, s.prototype._onWriteError = function (e) {
        return this.onerror && this.onerror(e), !0
      }, s.prototype._onWriteProgress = function (e) {
        return this.onprogress && this.onprogress(e), !0
      }, s.prototype._onWriteAbort = function (e) {
        return this.onabort && this.onabort(e), !0
      }, s.INIT = 0, s.WRITING = 1, s.DONE = 2, s.API_CLASS_ID = "applican.filesystem.filewriter", s);

    function s(e, t, n, o) {
      var r = i.call(this, s.API_CLASS_ID, e, t, n) || this;
      return r.fileName = null, r.length = 0, r.position = 0, r.onwritestart = null, r.onprogress = null, r.onwrite = null, r.onwriteend = null, r.onabort = null, r.onerror = null, o && (r.fileName = o.fullPath || o.name, r.length = o.size || 0), i.prototype.registerCallback.call(r, "onWriteStart", r._onWriteStart.bind(r)), i.prototype.registerCallback.call(r, "onWrite", r._onWrite.bind(r)), i.prototype.registerCallback.call(r, "onWriteEnd", r._onWriteEnd.bind(r)), i.prototype.registerCallback.call(r, "onWriteError", r._onWriteError.bind(r)), i.prototype.registerCallback.call(r, "onWriteProgress", r._onWriteProgress.bind(r)), i.prototype.registerCallback.call(r, "onWriteAbort", r._onWriteAbort.bind(r)), r
    }
    t.FileWriter = c
  }, function (e, t, n) {
    e.exports = n(10)
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(11),
      r = n(12),
      i = n(4),
      a = n(14),
      c = n(1),
      s = n(16),
      u = n(17),
      l = n(18),
      p = n(19),
      h = n(20),
      f = n(21),
      y = n(22),
      _ = n(23),
      d = n(24),
      b = n(25),
      C = n(26),
      E = n(27),
      g = n(28),
      P = n(29),
      v = n(30),
      O = n(31),
      I = n(32),
      A = n(33),
      S = n(39),
      m = n(40),
      R = n(42),
      T = n(43),
      L = n(52),
      N = n(53),
      w = n(54),
      D = n(55),
      F = n(56),
      G = n(57),
      k = n(58),
      q = n(59),
      M = n(60),
      B = n(61),
      U = n(62),
      j = n(63),
      W = n(64),
      V = n(65),
      x = n(66),
      H = n(69),
      Y = n(70),
      K = n(71),
      z = n(72),
      X = n(73),
      Z = n(74),
      Q = n(75),
      J = n(76),
      $ = n(77),
      ee = n(78),
      te = n(79),
      ne = n(80),
      oe = n(81),
      re = n(82),
      ie = n(83),
      ae = n(84),
      ce = n(85);
    window.ApplicanError = f.ApplicanError;
    var se = (ue.initialize = function () {
        // app debug
        this.config = {
          version: '1.5',
          version_num: 1.005000,
          debug: true,
          device_os: 'UNKNOWN'
        };
        // OS判定
        if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0) {
          this.config.device_os = "IOS";
        } else if (navigator.userAgent.indexOf('Android') > 0) {
          this.config.device_os = "ANDROID";
        }
        if (navigator.userAgent.indexOf('APP_CLINET/WEBVIEW') > 0) {
          this.config.debug = false;
        }
        if (this.config.debug) {
          // 排他制御
          var Queue = function () {
            this.pf_schemeQueue = [];
            this.pf_last_call_api_time = 0;
            this.PF_QUEUE_INTERVAL = 50;
            this.is_wait = false;
            this.pf_callApi = function (scheme, callbackStack, success, fail) {
              var _callbackId = -1;
              var current_time = (new Date()).getTime();
              if (typeof callbackStack != 'undefined') {
                applican.callbackId++;
                applican.callbacks[applican.callbackId] = {
                  success: success,
                  fail: fail
                };
                scheme += "#callbackId_" + applican.callbackId;
                _callbackId = applican.callbackId;
              }
              if (current_time - this.pf_last_call_api_time < this.PF_QUEUE_INTERVAL) {
                this.pf_schemeQueue.push(scheme);
                if (!this.is_wait) {
                  this.is_wait = true;
                  setTimeout(function () {
                    applican.queue.pf_callSchemeQueue();
                  }, this.PF_QUEUE_INTERVAL);
                }
                return _callbackId;
              }
              this.pf_last_call_api_time = current_time;
              location.href = scheme;
              return _callbackId;
            };
            this.pf_callSchemeQueue = function () {
              if (this.pf_schemeQueue.length < 1) {
                this.is_wait = false;
                return;
              }
              var scheme = this.pf_schemeQueue[0];
              var current_time = (new Date()).getTime();
              if (current_time - this.pf_last_call_api_time >= this.PF_QUEUE_INTERVAL) {
                this.pf_last_call_api_time = current_time;
                this.pf_schemeQueue.shift();
                location.href = scheme;
                if (this.pf_schemeQueue.length > 0) {
                  this.is_wait = true;
                  setTimeout(function () {
                    applican.queue.pf_callSchemeQueue();
                  }, this.PF_QUEUE_INTERVAL);
                } else {
                  this.is_wait = false;
                }
              } else {
                this.is_wait = true;
                setTimeout(function () {
                  applican.queue.pf_callSchemeQueue();
                }, this.PF_QUEUE_INTERVAL);
              }
            };
          };
          /////////////////////////
          //バーコード Barcode
          // ----------------------------------------
          // Barcode
          // http://doc.applican.com/Barcode/index.html
          // ----------------------------------------
          var Barcode = function(config, queue) {
            this.config = config;
            this.barcodeSuccess = null;
            this.barcodeError = null;
            this.barcodeOptions = null;
            this.isExecute = false;
            this.timer = null;
            this.queue = queue;

            ////////
            //バーコード読み取り
            this.captureBarcode = function(barcodeSuccess, barcodeError, barcodeOptions){
              if(this.isExecute){
                barcodeError();
                return;
              }
              this.isExecute = true;

              this.barcodeSuccess = barcodeSuccess;
              this.barcodeError = barcodeError;
              this.barcodeOptions = barcodeOptions;

              if(this.config.debug){
                var me = this;
                var data = 'http://www.google.co.jp/';
                if (typeof(applican_debug_settings) != 'undefined'){
                  if (typeof(applican_debug_settings.barcode) != 'undefined'){
                    if (typeof(applican_debug_settings.barcode.data) != 'undefined') data=applican_debug_settings.barcode.data;
                  }
                }
                setTimeout(
                    function(){ me._captureBarcodeSuccess(1, data); },
                  100);
              }else{
                var scheme = 'applican-api://barcode/captureBarcode/'+encodeURIComponent(JSON.stringify(barcodeOptions));
                this.queue.pf_callApi(scheme);
              }
            };
            //成功
            this._captureBarcodeSuccess = function(codeType, codeData){
              var code = {codeType:codeType, codeData:codeData};
              this.isExecute = false;
              this.barcodeSuccess(code);
            };
            //失敗
            this._captureBarcodeError = function(){
              this.isExecute = false;
              this.barcodeError();
            };
          };
          // ///////////////////////
          // 位置情報 Geolocation
          // ----------------------------------------
          // Geolocation
          // http://doc.applican.com/GEOLocation/index.html
          // ----------------------------------------
          var Geolocation = function (config, queue) {
            this.config = config;
            this.geolocationSuccess = null;
            this.geolocationError = null;
            this.geolocationOptions = null;
            this.isExecute = false;
            this.timer = null;
            this.queue = queue;
            // //////
            // 現在位置を取得
            this.getCurrentPosition = function (geolocationSuccess, geolocationError, geolocationOptions) {
              if (this.isExecute) {
                var error = {
                  code: PositionError.POSITION_BUSY_ERR,
                  message: 'watchPosition is running'
                };
                geolocationError(error);
                return;
              }
              this.isExecute = true;
              this.geolocationSuccess = geolocationSuccess;
              this.geolocationError = geolocationError;
              this.geolocationOptions = geolocationOptions;
              if (this.config.debug) {
                var me = this;
                setTimeout(function () {
                  me._getCurrentPositionSuccess(135.0, 36.0, 10, 10, 10, 180.0, 5.0, (new Date()).getTime());
                }, 1000);
              } else {
                var scheme = 'applican-api://geolocation/getCurrentPosition/' + encodeURIComponent(JSON.stringify(geolocationOptions));
                this.queue.pf_callApi(scheme);
              }
            };
            // 成功
            this._getCurrentPositionSuccess = function (latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed, timestamp) {
              var position = {
                coords: {
                  latitude: latitude,
                  longitude: longitude,
                  altitude: altitude,
                  accuracy: accuracy,
                  altitudeAccuracy: altitudeAccuracy,
                  heading: heading,
                  speed: speed
                },
                timestamp: timestamp
              };
              this.isExecute = false;
              this.geolocationSuccess(position);
            };
            // 失敗
            this._getCurrentPositionError = function (errorCode, errorMessage) {
              var error = {
                code: errorCode,
                message: errorMessage
              };
              this.isExecute = false;
              this.geolocationError(error);
            };
            // //////
            // 現在位置を一定の時間間隔で取得
            this.watchPosition = function (geolocationSuccess, geolocationError, geolocationOptions) {
              if (this.isExecute) {
                var error = {
                  code: PositionError.POSITION_BUSY_ERR,
                  message: 'Geolocation is running'
                };
                geolocationError(error);
                return;
              }
              this.isExecute = true;
              this.geolocationSuccess = geolocationSuccess;
              this.geolocationError = geolocationError;
              this.geolocationOptions = geolocationOptions;
              if (!geolocationOptions.frequency) {
                this.geolocationOptions = {
                  frequency: 1000
                };
              }
              if (this.config.debug) {
                var me = this;
                this.timer = setInterval(function () {
                  me._watchPositionSuccess(135.0, 36.0, 10, 10, 10, 180.0, 5.0, (new Date()).getTime());
                }, 1000);
              } else {
                var scheme = 'applican-api://geolocation/watchPosition/' + encodeURIComponent(JSON.stringify(geolocationOptions));
                this.queue.pf_callApi(scheme);
              }
              return this.timer;
            };
            // 成功
            this._watchPositionSuccess = function (latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed, timestamp) {
              var position = {
                coords: {
                  latitude: latitude,
                  longitude: longitude,
                  altitude: altitude,
                  accuracy: accuracy,
                  altitudeAccuracy: altitudeAccuracy,
                  heading: heading,
                  speed: speed
                },
                timestamp: timestamp
              };
              this.geolocationSuccess(position);
            };
            // 失敗
            this._watchPositionError = function (errorCode, errorMessage) {
              var error = {
                code: errorCode,
                message: errorMessage
              };
              this.isExecute = false;
              this.geolocationError(error);
              if (this.config.debug) {
                clearInterval(this.timer);
              }
            };
            // //////
            // 現在位置の監視を停止
            this.clearWatch = function (watchID) {
              if (this.config.debug) {
                clearInterval(watchID);
              } else {
                var scheme = 'applican-api://geolocation/clearWatch/' + watchID;
                this.queue.pf_callApi(scheme);
              }
              this.isExecute = false;
            };
          };
          // ///////////////////////
          // デバイス Device
          // ----------------------------------------
          // Device
          // http://doc.applican.com/Device/index.html
          // ----------------------------------------
          var _Device = function (config, queue) {
            this.config = config;
            this.deviceSuccess = null;
            this.deviceError = null;
            this.deviceOptions = null;
            this.isExecute = false;
            this.queue = queue;
            // //////
            // Push通知用のデバイストークンを取得
            this.getPushToken = function (deviceSuccess, deviceError, deviceOptions) {
              if (this.isExecute) {
                deviceError();
                return;
              }
              this.isExecute = true;
              this.deviceSuccess = deviceSuccess;
              this.deviceError = deviceError;
              this.deviceOptions = deviceOptions;
              if (this.config.debug) {
                var me = this;
                setTimeout(function () {
                  me._getPushTokenSuccess('1234567890');
                }, 100);
              } else {
                var scheme = 'applican-api://device/getPushToken/';
                this.queue.pf_callApi(scheme);
              }
            };
            // 成功
            this._getPushTokenSuccess = function (pushToken) {
              var res = {
                pushToken: pushToken
              };
              this.isExecute = false;
              this.deviceSuccess(res);
            };
            // 失敗
            this._getPushTokenError = function ( /* errorCode */ ) {
              this.isExecute = false;
              this.deviceError();
            };
            this.light = function (enable) {
              var options = {};
              options.enable = enable;
              if (applican.config.debug) {} else {
                var scheme = 'applican-api://device/light/' + encodeURIComponent(JSON.stringify(options));
                applican.queue.pf_callApi(scheme);
              }
            };
            this.getDisplayInfo = function (successCallback, errorCallback) {
              if (this.config.debug) {
                successCallback({
                  orientation: "PORTRAIT",
                  width: 360,
                  height: 560
                });
              } else {
                var scheme = 'applican-api://device/getDisplayInfo/';
                this.queue.pf_callApi(scheme, true, successCallback, errorCallback);
              }
            };
            // 画面の常時点灯
            this.keepScreenOn = function (enable) {
              var options = {};
              options.enable = enable;
              if (applican.config.debug) {} else {
                var scheme = 'applican-api://device/keepScreenOn/' + encodeURIComponent(JSON.stringify(options));
                applican.queue.pf_callApi(scheme);
              }
            };
            // IDFA
            this.getAdvertisingId = function (successCallback, errorCallback) {
              if (this.config.debug) {
                successCallback("00000000-0000-0000-0000-000000000000");
              } else {
                var scheme = 'applican-api://device/getAdvertisingId/';
                this.queue.pf_callApi(scheme, true, successCallback, errorCallback);
              }
            };
          };
          // ///////////////////////
          // デバイス通知機能
          // ----------------------------------------
          // Notification
          // http://doc.applican.com/Notification/index.html
          // ----------------------------------------
          var _Notification = function (config, queue) {
            this.config = config;
            this.notificationSuccess = null;
            this.notificationError = null;
            this.notificationOptions = null;
            this.isExecute = false;
            this.timer = null;
            this.queue = queue;
            // alert
            this.alert = function (message, alertCallback, title, buttonName) {
              this.notificationSuccess = alertCallback;
        	  console.log("title:" + title);
        	  console.log("buttonName:" + buttonName);

              if (typeof title === "undefined") title = "Alert";
              if (typeof buttonName === "undefined") buttonName = "OK";
              if (this.config.debug) {
                var me = this;
                alert("[title]" + title + "\n" + "[message]" + message + "\n" + "[buttonName]" + buttonName);
                me._alertSuccess();
              } else {
                var opt = {
                  message: message,
                  title: title,
                  buttonName: buttonName
                };
                var scheme = 'applican-api://notification/alert/' + encodeURIComponent(JSON.stringify(opt));
                this.queue.pf_callApi(scheme);
              }
            };
            // 成功
            this._alertSuccess = function () {
              this.isExecute = false;
              this.notificationSuccess();
            };
            // confirm
            this.confirm = function (message, confirmCallback, title, buttonName) {
              this.notificationSuccess = confirmCallback;
              if (typeof title === "undefined") title = "Confirm";
              if (typeof buttonName === "undefined") buttonName = "OK,Cancel";
              if (this.config.debug) {
                var me = this;
                var res = confirm("[title]" + title + "\n" + "[message]" + message + "\n" + "[buttonName]" + buttonName);
                if (res) {
                  me._confirmSuccess(1);
                } else {
                  me._confirmSuccess(2);
                }
              } else {
                var opt = {
                  message: message,
                  title: title,
                  buttonName: buttonName
                };
                var scheme = 'applican-api://notification/confirm/' + encodeURIComponent(JSON.stringify(opt));
                this.queue.pf_callApi(scheme);
              }
            };
            // 成功
            this._confirmSuccess = function (result) {
              // var res = {result:result};
              this.isExecute = false;
              this.notificationSuccess(result);
            };
            // beep
            this.beep = function (times) {
              if (typeof times === "undefined" || !times) times = 1;
              if (this.config.debug) {
                // alert("Beep times:"+times);
              } else {
                var opt = {
                  times: times
                };
                var scheme = 'applican-api://notification/beep/' + encodeURIComponent(JSON.stringify(opt));
                this.queue.pf_callApi(scheme);
              }
            };
            // vibrate
            this.vibrate = function (milliseconds) {
              if (typeof milliseconds === "undefined" || !milliseconds) milliseconds = 1000;
              if (this.config.debug) {} else {
                var opt = {
                  milliseconds: milliseconds
                };
                var scheme = 'applican-api://notification/vibrate/' + encodeURIComponent(JSON.stringify(opt));
                this.queue.pf_callApi(scheme);
              }
            };
          };
          // ///////////////////////
          // ローカル通知機能
          // ----------------------------------------
          // LocalNotification
          // http://doc.applican.com/LocalNotification/index.html
          // ----------------------------------------
          var _LocalNotification = function (config, queue) {
            this.config = config;
            this.localNotificationSuccess = null;
            this.localNotificationError = null;
            this.localNotificationOptions = null;
            this.isExecute = false;
            this.timer = null;
            this.queue = queue;
            this.schedule = function (localNotificationSuccess, localNotificationError, localNotificationOptions) {
              if (this.isExecute) {
                localNotificationError({
                  code: LocalNotificationError.NOTIFICATIO_BUSY_ERR
                });
                return;
              }
              this.isExecute = true;
              this.localNotificationSuccess = localNotificationSuccess;
              this.localNotificationError = localNotificationError;
              this.localNotificationOptions = localNotificationOptions;
              if (this.config.debug) {
                this._scheduleSuccess();
              } else {
                var scheme = 'applican-api://localNotification/schedule/' + encodeURIComponent(JSON.stringify(localNotificationOptions));
                this.queue.pf_callApi(scheme);
              }
            };
            // 成功
            this._scheduleSuccess = function () {
              this.isExecute = false;
              this.localNotificationSuccess();
            };
            // 失敗
            this._scheduleError = function (errorCode) {
              var error = {
                code: errorCode
              };
              this.isExecute = false;
              this.localNotificationError(error);
            };
            this.cancel = function (options) {
              if (this.config.debug) {
                // var me = this;
              } else {
                var scheme = 'applican-api://localNotification/cancel/' + encodeURIComponent(JSON.stringify(options));
                this.queue.pf_callApi(scheme);
              }
            };
            this.allCancel = function () {
              if (this.config.debug) {
                // var me = this;
              } else {
                var scheme = 'applican-api://localNotification/allCancel/';
                this.queue.pf_callApi(scheme);
              }
            };
            this.getBadgeNum = function (localNotificationSuccess) {
              this.localNotificationSuccess = localNotificationSuccess;
              if (this.config.debug || this.config.device_os == "ANDROID") {
                this._getBadgeNumSuccess(0);
              } else {
                var scheme = 'applican-api://localNotification/getBadgeNum/';
                this.queue.pf_callApi(scheme);
              }
            };
            // 成功
            this._getBadgeNumSuccess = function (result) {
              this.localNotificationSuccess(result);
            };
            this.setBadgeNum = function (num) {
              var options = {};
              options.num = num;
              if (this.config.debug) {} else {
                var scheme = 'applican-api://localNotification/setBadgeNum/' + encodeURIComponent(JSON.stringify(options));
                this.queue.pf_callApi(scheme);
              }
            };
          };
          // ///////////////////////
          // イベント
          var _Event = function (config, queue) {
            this.config = config;
            this.queue = queue;
            this._callback = function (tag) {
              var evt = document.createEvent("HTMLEvents");
              evt.initEvent(tag, false, false);
              document.dispatchEvent(evt);
            };
            this._battery = function (tag, level, isPlugged) {
              var evt = document.createEvent("HTMLEvents");
              evt.initEvent(tag, false, false);
              evt.level = level;
              evt.isPlugged = isPlugged;
              document.dispatchEvent(evt);
            };
            this._orientation = function (orientation) {
              var evt = document.createEvent("HTMLEvents");
              evt.initEvent("orientationchanged", false, false);
              evt.orientation = orientation;
              document.dispatchEvent(evt);
            };
          };
          // ///////////////////////
          // Livepass
          //
          var _Livepass = function (config, queue) {
            this.config = config;
            this.isExecute = false;
            this.queue = queue;
            this.success = null;
            this.error = null;
            this.currentWatchId = -1;
            this.start = function (apiKey, apiSecret, successCallback, errorCallback, senderId) {
              if (this.isExecute) {
                var error = {
                  code: LivepassError.BUSY_ERROR,
                  message: ""
                };
                errorCallback(error);
                return;
              }
              this.isExecute = true;
              this.success = successCallback;
              this.error = errorCallback;
              var options = {};
              options.apiKey = apiKey;
              options.apiSecret = apiSecret;
              options.senderId = senderId;
              if (applican.config.debug) {
                this.isExecute = false;
                successCallback({
                  registrationId: "registrationId_xxxxxxxx"
                });
              } else {
                var scheme = 'applican-api://livepass/start/' + encodeURIComponent(JSON.stringify(options));
                this.queue.pf_callApi(scheme);
              }
            };
            this.getEid = function (successCallback, errorCallback) {
                if (this.isExecute) {
                  var error = {
                    code: LivepassError.BUSY_ERROR,
                    message: ""
                  };
                  errorCallback(error);
                  return;
                }
                this.isExecute = true;
                this.success = successCallback;
                this.error = errorCallback;
                var options = {};
                if (applican.config.debug) {
                  this.isExecute = false;
                  successCallback({
                	  eid: "registrationId_xxxxxxxx"
                  });
// successCallback("registrationId_xxxxxxxx");
                } else {
                  var scheme = 'applican-api://livepass/start/' + encodeURIComponent(JSON.stringify(options));
                  this.queue.pf_callApi(scheme);
                }
              };
            this._startSuccess = function (result) {
              this.isExecute = false;
              this.success(result);
            };
            this._startError = function (error) {
              this.isExecute = false;
              this.error(error);
            };
            this.setSettings = function (options, successCallback, errorCallback) {
              if (this.isExecute) {
                var error = {
                  code: LivepassError.BUSY_ERROR,
                  message: ""
                };
                errorCallback(error);
                return;
              }
              this.isExecute = true;
              this.success = successCallback;
              this.error = errorCallback;
              if (applican.config.debug) {
                this.isExecute = false;
                successCallback();
              } else {
                var scheme = 'applican-api://livepass/setSettings/' + encodeURIComponent(JSON.stringify(options));
                this.queue.pf_callApi(scheme);
              }
            };
            this._setSettingsSuccess = function (result) {
              this.isExecute = false;
              this.success(result);
            };
            this._setSettingsError = function (error) {
              this.isExecute = false;
              this.error(error);
            };
            this.getSettings = function (successCallback, errorCallback) {
              if (this.isExecute) {
                var error = {
                  code: LivepassError.BUSY_ERROR,
                  message: ""
                };
                errorCallback(error);
                return;
              }
              this.isExecute = true;
              this.success = successCallback;
              this.error = errorCallback;
              if (applican.config.debug) {
                this.isExecute = false;
                successCallback({
                  notificationEnabled: true,
                  locationEnabled: true,
                  alias: "alias",
                  tags: ["tag1", "tag2"]
                });
              } else {
                var scheme = 'applican-api://livepass/getSettings/';
                this.queue.pf_callApi(scheme);
              }
            };
            this._getSettingsSuccess = function (result) {
              this.isExecute = false;
              this.success(result);
            };
            this._getSettingsError = function (error) {
              this.isExecute = false;
              this.error(error);
            };
          };
          // ///////////////////////
          // infosound
          // ----------------------------------------
          // Infosound
          // http://doc.applican.com/Infosound/index.html
          // ----------------------------------------
          var _infosound = function (config, queue) {
            this.config = config;
            this.listeningInProgress = false;
            this.queue = queue;
            this.success = null;
            this.error = null;
            /*
            	+++ startListening
			 */
            /*
					available modes:

			    	TAG_ALL
			    	TAG_NEW
			 */
            this.startListening = function (mode, successCallback, errorCallback, tagCallback) {
              if (this.listeningInProgress) {
                errorCallback({
                  code: InfosoundError.ErrorCodeRecordingInProgress
                });
                return;
              }
              var options = {};
              options.mode = mode;
              this.success = successCallback;
              this.error = errorCallback;
              this.tag_callback = tagCallback;
              this.listeningInProgress = true;
              if (this.config.debug) {
                successCallback();
                this.listeningInProgress = false;
              } else {
                this.queue.pf_callApi('applican-api://infosound/startListening/' + encodeURIComponent(JSON.stringify(options)));
              }
            };
            this._startListeningSuccess = function (result) {
              this.listeningInProgress = false;
              this.success();
            };
            this._startListeningError = function (error) {
              this.listeningInProgress = false;
              this.error(error);
            };
            this._tagCallback = function (tag) {
              this.tag_callback(tag);
            };
            /*
            	+++ stopListening
			 */
            this.stopListening = function (successCallback, errorCallback) {
              this.success = successCallback;
              this.error = errorCallback;
              this.listeningInProgress = false;
              if (this.config.debug) {
                successCallback();
              } else {
                this.queue.pf_callApi('applican-api://infosound/stopListening/');
              }
            };
            this.init = function (APP_ID, APP_SECRET, successCallback, errorCallback) {
              this.success = successCallback;
              this.error = errorCallback;
              this.listeningInProgress = false;
              if (this.config.debug) {
                successCallback();
              }
            };
            this.getSyncDataSize = function (type, successCallback, errorCallback) {
              this.success = successCallback;
              this.error = errorCallback;
              this.listeningInProgress = false;
              if (this.config.debug) {
                successCallback(6000000);
              }
            };
            this.sync = function (type, progressCallback, successCallback, errorCallback) {
              this.success = successCallback;
              this.error = errorCallback;
              this.listeningInProgress = false;
              if (this.config.debug) {
                for(var i=1;i<6;i++){
                  progressCallback(100, i*20);
                }
                setTimeout(function() {
              	  successCallback();
  //successCallback();
                }, 5000);
              }
            };
            this.setLanguageCode = function (type, successCallback, errorCallback) {
              this.success = successCallback;
               this.error = errorCallback;
               this.listeningInProgress = false;
               if (this.config.debug) {
                 successCallback();
               }
            };
            this.setMicRecordCategory = function (type, successCallback, errorCallback) {
              this.success = successCallback;
              this.error = errorCallback;
              this.listeningInProgress = false;
              if (this.config.debug) {
                successCallback();
              }
            };
            this.setMicRecordCategory = function (type, successCallback, errorCallback) {
              this.success = successCallback;
              this.error = errorCallback;
              this.listeningInProgress = false;
              if (this.config.debug) {
                successCallback();
              }
            };
            this.start = function (mode, tagCallback, successCallback, errorCallback) {
                if (this.listeningInProgress) {
                  errorCallback({
                    code: InfosoundError.ErrorCodeRecordingInProgress
                  });
                  return;
                }
                var options = {};
                options.mode = mode;
                this.success = successCallback;
                this.error = errorCallback;
                this.tag_callback = tagCallback;
                this.listeningInProgress = true;
                if (this.config.debug) {
                	var result = {
                			"content": {
                				"uuid": "5c8a1f2a-2435-404e-935b-3ac6a397b96f",
                				"triggerHash": "77c79857d1378fc48812aa66b61192ac",
                				"image": "",
                				"text": "10時14分発の銚子駅行きは強風のため、5分程度遅れています。"
                			},
                			"spot": {
                				"address": "東京都港区高輪２丁目２−１７−１１",
                				"title": "受信SDKテストスポット1",
                				"displayRefuge": false,
                				"uuid": "xxxxxxxx-aa20-4875-8647-567c774843dd",
                				"wifiData": {
                					"password": "",
                					"ssid": "y-plus5",
                					"iconTitle": "Wi-Fi",
                					"icon": ""
                				},
                				"freeLinkList": [],
                				"supportStatus": "SoundUDに対応しています。",
                				"icon": ""
                			}
                		};
// this.tag_callback("ANNOUNCE", result);
                	setTimeout(function() {
                    	tagCallback("ANNOUNCE", result);
// successCallback();
                	  }, 2000);
// successCallback();
                  this.listeningInProgress = false;
                } else {
                  this.queue.pf_callApi('applican-api://infosound/startListening/' + encodeURIComponent(JSON.stringify(options)));
                }
              };
            this.stop = function (successCallback, errorCallback) {
              this.success = successCallback;
              this.error = errorCallback;
              this.listeningInProgress = false;
              if (this.config.debug) {
                successCallback();
              }
            };
            this._stopListeningSuccess = function (result) {
              this.success();
            };
            this._stopListeningError = function (result) {
              this.error(result);
            };
          };
          // ///////////////////////
          // Utilities
          var _Utilities = function (config, queue) {
            this.config = config;
            this.isExecute = false;
            this.queue = queue;
            this.success = null;
            this.error = null;
            this.progress = null;
            this.download = function (options, progressCallback, successCallback, errorCallback) {
              this.error = errorCallback;
              this.success = successCallback;
              this.progress = progressCallback;
              if (applican.config.debug) {
                errorCallback({
                  code: UtilitiesError.NOT_FOUND,
                  message: ''
                });
              } else {
                var scheme = 'applican-api://utilities/download/' + encodeURIComponent(JSON.stringify(options));
                this.queue.pf_callApi(scheme);
              }
              this._downloadProgress = function (progress) {
                this.progress(progress);
              }
              this._downloadSuccess = function (path) {
                this.success(path);
              }
              this._downloadError = function (event) {
                this.error(event);
              }
            };
            this.unzip = function (options, successCallback, errorCallback) {
              this.error = errorCallback;
              this.success = successCallback;
              if (applican.config.debug) {
                errorCallback({
                  code: UtilitiesError.NOT_FOUND,
                  message: ''
                });
              } else {
                var scheme = 'applican-api://utilities/unzip/' + encodeURIComponent(JSON.stringify(options));
                this.queue.pf_callApi(scheme);
              }
              this._unzipSuccess = function (path) {
                this.success(path);
              }
              this._unzipError = function (description) {
                this.error(description);
              }
            };
          };
          // ///////////////////////
          // Tracking
          var _Tracking = function (config, queue) {
            this.config = config;
            this.queue = queue;
            this.getTrackingId = function (successCallback, errorCallback) {
              this.getTrackingId.successCallback = successCallback;
              this.getTrackingId.errorCallback = errorCallback;
              if (applican.config.debug) {
                successCallback("debug-tracking-id");
              } else {
                var scheme = 'applican-api://tracking/getTrackingId/';
                this.queue.pf_callApi(scheme);
              }
              this._getTrackingIdSuccess = function (trackingID) {
                this.getTrackingId.successCallback(trackingID);
              }
              this._getTrackingIdError = function (error) {
                this.getTrackingId.errorCallback(error);
              }
            };
          };
          // ///////////////////////
          // ScreenBacklight
          var _ScreenBacklight = function (config, queue) {
            this.config = config;
            this.queue = queue;
            this.getScreenBacklightLevel = function (successCallback, errorCallback) {
              this.getScreenBacklightLevel.successCallback = successCallback;
              this.getScreenBacklightLevel.errorCallback = errorCallback;
              if (this.config.debug) {
                // successCallback;
                console.log("getScreenBacklightLevel is debug");
              } else {
                var scheme = 'applican-api://screenbacklight/getScreenBacklightLevel/';
                this.queue.pf_callApi(scheme);
              }
              this._getScreenBacklightLevelSuccess = function (params) {
                this.getScreenBacklightLevel.successCallback(params);
              }
              this._getScreenBacklightLevelError = function (params) {
                this.getScreenBacklightLevel.errorCallback(params);
              }
            };
            this.setScreenBacklightLevel = function (level, successCallback, errorCallback) {
              this.setScreenBacklightLevel.successCallback = successCallback;
              this.setScreenBacklightLevel.errorCallback = errorCallback;
              options = {};
              options.level = level;
              console.log("options.level =" + options.level);
              if (this.config.debug) {
                // successCallback;
                console.log("config setting is debug");
              } else {
                var scheme = 'applican-api://screenbacklight/setScreenBacklightLevel/' + encodeURIComponent(JSON.stringify(options));
                this.queue.pf_callApi(scheme);
              }
              this._setScreenBacklightLevelSuccess = function (params) {
                this.setScreenBacklightLevel.successCallback(params);
              }
              this._setScreenBacklightLevelError = function (params) {
                this.setScreenBacklightLevel.errorCallback(params);
              }
            };
          }
          // ///////////////////////
          // 親クラス
          var applicanRoot = function () {
            this.callbackId = 0;
            this.callbacks = {};
            this.idCounter = 0;
            this.mediaCounter = 0;
            this.config = {
              version: '1.12.0',
              version_num: 1.012000,
              debug: true,
              device_os: 'UNKNOWN'
            };
            // OS判定
            if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0) {
              this.config.device_os = "IOS";
            } else if (navigator.userAgent.indexOf('Android') > 0) {
              this.config.device_os = "ANDROID";
            }
            // スマホアプリかどうか
            if (navigator.userAgent.indexOf('APP_CLINET/WEBVIEW') > 0) {
              this.config.debug = false;
            }
            // 各クラスのインスタンスを生成
            this.queue = new Queue();
            this.geolocation = new Geolocation(this.config, this.queue);
        	this.barcode = new Barcode(this.config, this.queue);
            this.notification = new _Notification(this.config, this.queue);
            this.localNotification = new _LocalNotification(this.config, this.queue);
            this.livepass = new _Livepass(this.config, this.queue);
            this.infosound = new _infosound(this.config, this.queue);
            this.omotenashiguidesdk = new _infosound(this.config, this.queue);
            this.utilities = new _Utilities(this.config, this.queue);
            this.tracking = new _Tracking(this.config, this.queue);
            this.screenbacklight = new _ScreenBacklight(this.config, this.queue);
            // デバッグモードの場合、デバッグ用設定値をセットする
            if (this.config.debug) {
              if (typeof (applican_debug_settings) != 'undefined') {
                // 通信状態
                if (typeof (applican_debug_settings.connection) != 'undefined') {
                  if (typeof (applican_debug_settings.connection.type) != 'undefined') this.connection.type = applican_debug_settings.connection.type;
                }
              }
            }
            // 初期化処理
            // 成功
            this._applicanInitSuccess = function (device_info) {
              // WebViewの時、コンソールログとエラーを確認できるようにする
              if (!this.config.debug) {
                var me = this;
                console.log = function (msg) {
                  var options = {
                    message: msg
                  };
                  var log = "";
                  try {
                    log = JSON.stringify(options);
                  } catch (e) {
                    try {
                      var txt = Object.prototype.toString.apply(msg) + "\n";
                      for (var one in msg) {
                        if (msg.hasOwnProperty(one)) {
                          txt += one + "=" + msg[one] + "\n";
                        }
                      }
                      log = JSON.stringify({
                        message: (txt)
                      });
                    } catch (ex) {}
                  }
// var scheme = 'applican-api://console/log/' + encodeURIComponent(log);
// me.queue.pf_callApi(scheme);
                };
                window.onerror = function (errMsg, url, lineNumber) {
                  var options = {
                    message: errMsg,
                    url: url,
                    line: lineNumber
                  };
//                  var scheme = 'applican-api://console/error/' + encodeURIComponent(JSON.stringify(options));
// me.queue.pf_callApi(scheme);
                };
              }
              this.device = new _Device(this.config, this.queue);
              this.device.name = device_info.name;
              this.device.platform = device_info.platform;
              this.device.uuid = device_info.uuid;
              this.device.uuid_rfc4122 = device_info.uuid_rfc4122;
              this.device.version = device_info.version;
              this.device.applican = device_info.applican;
              this.device.applican_num = device_info.applican_num;
              this.device.applican_type = device_info.applican_type;
              this.device.package_name = device_info.package_name;
              var evt = document.createEvent("HTMLEvents"); // カスタムイベントを作成
              evt.initEvent("deviceready", false, false); // イベントの詳細を設定
              document.dispatchEvent(evt); // イベントを強制的に発生させる
              this.event = new _Event(this.config, this.queue);
            };
            this._init = function () {
              if (this.config.debug) {
                var device_info = {
                  name: "",
                  platform: "",
                  uuid: "",
                  version: "",
                  applican: "",
                  applican_num: 0,
                  applican_type: "",
                  package_name: ""
                };
                if (typeof (applican_debug_settings) != 'undefined') {
                  if (typeof (applican_debug_settings.device) != 'undefined') {
                    if (typeof (applican_debug_settings.device.name) != 'undefined') device_info.name = applican_debug_settings.device.name;
                    if (typeof (applican_debug_settings.device.platform) != 'undefined') device_info.platform = applican_debug_settings.device.platform;
                    if (typeof (applican_debug_settings.device.uuid) != 'undefined') device_info.uuid = applican_debug_settings.device.uuid;
                    if (typeof (applican_debug_settings.device.uuid_rfc4122) != 'undefined') device_info.uuid = applican_debug_settings.device.uuid_rfc4122;
                    if (typeof (applican_debug_settings.device.version) != 'undefined') device_info.version = applican_debug_settings.device.version;
                    if (typeof (applican_debug_settings.device.applican) != 'undefined') device_info.applican = applican_debug_settings.device.applican;
                    if (typeof (applican_debug_settings.device.applican_num) != 'undefined') device_info.applican_num = applican_debug_settings.device.applican_num;
                    if (typeof (applican_debug_settings.device.applican_type) != 'undefined') device_info.applican_type = applican_debug_settings.device.applican_type;
                    if (typeof (applican_debug_settings.device.package_name) != 'undefined') device_info.package_name = applican_debug_settings.device.package_name;
                  }
                }
                this._applicanInitSuccess(device_info);
              } else {
                var scheme = 'applican-api://applican/init/';
                this.queue.pf_callApi(scheme);
              }
            };
          };
          // インスタンス作成
          window.applican = new applicanRoot();
          setTimeout(function () {
            applican._init();
          }, 50);
          return true;
        }
      ue.sharedInstance.loadApi()
    }, Object.defineProperty(ue, "sharedInstance", {
      get: function () {
        return ue.instance || (ue.instance = new ue), ue.instance
      },
      enumerable: !0,
      configurable: !0
    }), ue.nativeOnReady = function (e) {
      return ue.sharedInstance.handleNativeOnReady(e)
    }, ue.nativeDeque = function (e) {
      return ue.sharedInstance.handleNativeDeque(e)
    }, ue.nativeResolve = function (e) {
      return ue.sharedInstance.handleNativeResolve(e)
    }, ue.nativeReject = function (e) {
      return ue.sharedInstance.handleNativeReject(e)
    }, ue.nativeCallback = function (e) {
      return ue.sharedInstance.handleNativeCallback(e)
    }, ue.nativeFireHTMLEvent = function (e) {
      return ue.sharedInstance.handleNativeFireHTMLEvent(e)
    }, ue.nativeFireBatteryEvent = function (e, t, n) {
      return ue.sharedInstance.handleNativeFireBatteryEvent(e, t, n)
    }, ue.nativeFireOrientationEvent = function (e) {
      return ue.sharedInstance.handleNativeFireOrientationEvent(e)
    }, ue.nativeFireWhitelistBlockedEvent = function (e, t, n) {
      return ue.sharedInstance.handleNativeFireWhitelistBlockedEvent(e, t, n)
    }, ue.nativeFirePushTokenReceivedEvent = function (e) {
      return ue.sharedInstance.handleNativeFirePushTokenReceivedEvent(e)
    }, ue.nativeFireDeviceReadyEvent = function () {
      return ue.sharedInstance.handleNativeFireDeviceReadyEvent()
    }, ue.nativeFireKeyboardShownEvent = function () {
      return ue.sharedInstance.handleNativeFireKeyboardShownEvent()
    }, ue.nativeFireKeyboardHiddenEvent = function () {
      return ue.sharedInstance.handleNativeFireKeyboardHiddenEvent()
    }, ue.nativeEchoCallback = function (e) {
      return e
    }, ue.prototype.addLaunchWebviewCloseEventListener = function (e) {
      this.webView && this.webView.addLaunchWebviewCloseEventListener(e)
    }, ue.prototype.finish = function () {
      this.application && this.application.finish()
    }, ue.prototype.showLogConsole = function () {
      this.console && this.console.show()
    }, ue.prototype.openDatabase = function (e, t, n) {
      this.database && this.database.open(e, t, n)
    }, ue.prototype.getApplicationFilesRoot = function (e, t) {
      this.filesystem && this.filesystem.getApplicationFilesRoot(e, t)
    }, ue.prototype.getApplicationExternalFilesRoot = function (e, t) {
      this.filesystem && this.filesystem.getApplicationExternalFilesRoot(e, t)
    }, ue.prototype.getApplicationCacheRoot = function (e, t) {
      this.filesystem && this.filesystem.getApplicationCacheRoot(e, t)
    }, ue.prototype.getApplicationExternalCacheRoot = function (e, t) {
      this.filesystem && this.filesystem.getApplicationExternalCacheRoot(e, t)
    }, ue.prototype.requestFileSystem = function (e, t, n, o) {
      this.filesystem && this.filesystem.requestFileSystem(e, t, n, o)
    }, Object.defineProperty(ue.prototype, "config", {
      get: function () {
        return this.config_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "sessionId", {
      get: function () {
        return this.sessionId_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "initialized", {
      get: function () {
        return this.initialized_
      },
      enumerable: !0,
      configurable: !0
    }), ue.prototype.loadApi = function () {
      "interactive" === document.readyState || "complete" === document.readyState ? this.init() : document.addEventListener("DOMContentLoaded", this.onDOMContentLoaded.bind(this))
    }, ue.prototype.onDOMContentLoaded = function () {
      document.removeEventListener("DOMContentLoaded", this.onDOMContentLoaded), this.init()
    }, ue.prototype.init = function () {
      this.initialized || (window.location.href = "applican-api://localhost/init?session_id=" + this.sessionId_ + "&version=" + c.parseSemanticVersion(ue.API_VERSION_STR) + "&protocol=" + ue.CURRENT_PROTOCOL_VERSION + "&interface=" + ue.CURRENT_INTERFACE_VERSION)
    }, ue.prototype.handleNativeOnReady = function (e) {
      var t = this;
      return this.webViewInfo_ ? this.webViewInfo_ : e && e.sessionId ? (this.config_ = new r.Config(ue.API_VERSION_STR, e.device.platformName, e.baseAppVersion, e.protocolVersion || 0), ue.APPLICAN_PROTOCOL_VERSION_2 <= this.config_.baseAppProtocolVersion && e.nativeSessionId ? this.sessionId_ = e.nativeSessionId : this.sessionId_ = c.generateId(), this.queue_ = new i.Queue(this.sessionId), this.callback_ = new o.Callback(this.sessionId), this.initializeApiInstance(this.config_, this.queue_, this.callback_, e), this.initializeWindowObject(), ue.APPLICAN_PROTOCOL_VERSION_2 > this.config_.baseAppProtocolVersion && window.setTimeout(function () {
        t.handleNativeFireDeviceReadyEvent()
      }, 0), this.webViewInfo_ = {
        sessionId: this.sessionId
      }, this.webView && (this.webViewInfo_.webViewInstanceId = this.webView.instanceId), this.initialized_ = !0, this.webViewInfo_) : null
    }, ue.prototype.initializeApiInstance = function (e, t, n, o) {
      this.accelerometer_ = new h.Accelerometer(e, t, n), this.application_ = new y.Application(e, t, n, o.appVersion, o.buildVersion), this.barcode_ = new _.Barcode(e, t, n), this.beacon_ = new d.Beacon(e, t, n), this.bluetooth_ = new b.Bluetooth(e, t, n), this.bleucode_ = new C.Bleucode(e, t, n), this.camera_ = new E.Camera(e, t, n), this.capture_ = new g.Capture(e, t, n), this.cloudpreferences_ = new P.CloudPreferences(e, t, n), this.compass_ = new v.Compass(e, t, n), this.connection_ = new O.Connection(e, t, n), this.console_ = new I.Console(e, t, n), this.contacts_ = new A.Contacts(e, t, n), this.contents_ = new S.Contents(e, t, n, o.contents), this.database_ = new m.DatabaseFactory(e, t, n), this.device_ = new s.Device(e, t, n, o.device), this.dcmlocation_ = new R.DocomoGeolocation(e, t, n), this.event_ = new u._Event(e, t, n), this.filesystem_ = new T.FileSystemFactory(e, t, n), this.firebaseanalytics_ = new L.FirebaseAnalytics(e, t, n), this.gamesound_ = new N.GameSound(e, t, n), this.geofencing_ = new w.Geofencing(e, t, n), this.geolocation_ = new D.Geolocation(e, t, n), this.geopla_ = new F.Geopla(e, t, n), this.geopop_ = new G.Geopop(e, t, n), this.globalization_ = new k.Globalization(e, t, n), this.googanalytics_ = new q.GoogleAnalytics(e, t, n), this.http_ = new M.Http(e, t, n), this.keyboard_ = new B.Keyboard(e, t, n), this.launcher_ = new U.Launcher(e, t, n), this.list_ = new l._List(e, t, n), this.livepass_ = new W.Livepass(e, t, n), this.localnotification_ = new j.LocalNotification(e, t, n), this.maps_ = new V.Maps(e, t, n), this.media_ = new x.Media(e, t, n), this.notification_ = new H.Notification(e, t, n), this.omotenashiguidesdk_ = new Y.OmotenashiGuideSdk(e, t, n), this.pinable_ = new ce.Pinable(e, t, n), this.platform_ = new K.Platform(e, t, n), this.popinfo_ = new z.Popinfo(e, t, n), this.purchase_ = new X.Purchase(e, t, n), this.repro_ = new Z.Repro(e, t, n), this.scanner_ = new Q.Scanner(e, t, n), this.security_ = new J.Security(e, t, n), this.simplestorage_ = new $.SimpleStorage(e, t, n), this.slidemenu_ = new ee.SlideMenu(e, t, n), this.splash_ = new te.SplashScreen(e, t, n), this.tab_ = new ne.Tab(e, t, n), this.test_ = new a.Test(e, t, n), this.utilities_ = new oe.Utilities(e, t, n), this.video_ = new re.Video(e, t, n), this.websocket_ = new p._WebSocket(e, t, n), this.webview_ = new ie.WebView(e, t, n), this.wifi_ = new ae.WiFi(e, t, n)
    }, ue.prototype.initializeWindowObject = function () {
      window.applican || (window.applican = this)
    }, ue.prototype.handleNativeDeque = function (e) {
      if (!this.initialized) return null;
      if (!e || !e.sessionId || e.sessionId !== this.sessionId || !this.queue_) return null;
      var t = this.queue_.deque();
      return t ? JSON.stringify(t) : null
    }, ue.prototype.handleNativeResolve = function (e) {
      return !!this.initialized && !!(e && e.sessionId && e.sessionId === this.sessionId && this.queue_) && this.queue_.resolve(e.transactionId, e.result)
    }, ue.prototype.handleNativeReject = function (e) {
      if (!this.initialized) return !1;
      if (!e || !e.sessionId || e.sessionId !== this.sessionId || !this.queue_) return !1;
      if (this.config_ && this.config_.promiseEnabled && e.error && e.error.hasOwnProperty("message") && e.error.hasOwnProperty("code") && e.error.hasOwnProperty("apiClassName") && e.error.hasOwnProperty("apiMethodName")) {
        var t = e.error;
        return this.queue_.reject(e.transactionId, new f.ApplicanError(t.message, t.code, t.apiClassName, t.apiMethodName))
      }
      return this.queue_.reject(e.transactionId, e.error)
    }, ue.prototype.handleNativeCallback = function (e) {
      return !!this.initialized && !!(e && e.sessionId && e.sessionId === this.sessionId && this.callback_) && this.callback_.handleCallback(e.sessionId, e.instanceId, e.callbackName, e.args)
    }, ue.prototype.handleNativeFireHTMLEvent = function (e) {
      return u._Event.nativeFireHTMLEvent(e), !0
    }, ue.prototype.handleNativeFireBatteryEvent = function (e, t, n) {
      return u._Event.nativeFireBatteryEvent(e, t, n), !0
    }, ue.prototype.handleNativeFireOrientationEvent = function (e) {
      return u._Event.nativeFireOrientationEvent(e), !0
    }, ue.prototype.handleNativeFireWhitelistBlockedEvent = function (e, t, n) {
      return u._Event.nativeFireWhitelistBlockedEvent(e, t, n), !0
    }, ue.prototype.handleNativeFirePushTokenReceivedEvent = function (e) {
      return u._Event.nativeFirePushTokenReceivedEvent(e), !0
    }, ue.prototype.handleNativeFireDeviceReadyEvent = function () {
      return u._Event.nativeFireDeviceReadyEvent(), !0
    }, ue.prototype.handleNativeFireKeyboardShownEvent = function () {
      return u._Event.nativeFireKeyboardShownEvent(), !0
    }, ue.prototype.handleNativeFireKeyboardHiddenEvent = function () {
      return u._Event.nativeFireKeyboardHiddenEvent(), !0
    }, Object.defineProperty(ue.prototype, "accelerometer", {
      get: function () {
        return this.accelerometer_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "barcode", {
      get: function () {
        return this.barcode_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "beacon", {
      get: function () {
        return this.beacon_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "bluetooth", {
      get: function () {
        return this.bluetooth_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "bleucode", {
      get: function () {
        return this.bleucode_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "camera", {
      get: function () {
        return this.camera_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "capture", {
      get: function () {
        return this.capture_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "cloudpreferences", {
      get: function () {
        return this.cloudpreferences_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "compass", {
      get: function () {
        return this.compass_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "connection", {
      get: function () {
        return this.connection_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "contacts", {
      get: function () {
        return this.contacts_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "console", {
      get: function () {
        return this.console_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "contents", {
      get: function () {
        return this.contents_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "device", {
      get: function () {
        return this.device_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "screenbacklight", {
        get: function () {
          return this.device_
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(ue.prototype, "docomolocation", {
      get: function () {
        return this.dcmlocation_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "event", {
      get: function () {
        return this.event_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "firebaseAnalytics", {
      get: function () {
        return this.firebaseanalytics_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "gamesound", {
      get: function () {
        return this.gamesound_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "geopla", {
      get: function () {
        return this.geopla_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "geopop", {
      get: function () {
        return this.geopop_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "geofencing", {
      get: function () {
        return this.geofencing_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "geolocation", {
      get: function () {
        return this.geolocation_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "globalization", {
      get: function () {
        return this.globalization_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "googleAnalytics", {
      get: function () {
        return this.googanalytics_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "http", {
      get: function () {
        return this.http_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "keyboard", {
      get: function () {
        return this.keyboard_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "launcher", {
      get: function () {
        return this.launcher_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "list", {
      get: function () {
        return this.list_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "livepass", {
      get: function () {
        return this.livepass_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "localNotification", {
      get: function () {
        return this.localnotification_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "maps", {
      get: function () {
        return this.maps_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "notification", {
      get: function () {
        return this.notification_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "omotenashiguidesdk", {
      get: function () {
        return this.omotenashiguidesdk_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "pinable", {
      get: function () {
        return this.pinable_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "platform", {
      get: function () {
        return this.platform_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "popinfo", {
      get: function () {
        return this.popinfo_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "purchase", {
      get: function () {
        return this.purchase_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "repro", {
      get: function () {
        return this.repro_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "scanner", {
      get: function () {
        return this.scanner_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "security", {
      get: function () {
        return this.security_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "simpleStorage", {
      get: function () {
        return this.simplestorage_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "slideMenu", {
      get: function () {
        return this.slidemenu_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "splashscreen", {
      get: function () {
        return this.splash_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "tab", {
      get: function () {
        return this.tab_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "test", {
      get: function () {
        return this.test_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "utilities", {
      get: function () {
        return this.utilities_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "video", {
      get: function () {
        return this.video_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "webSocket", {
      get: function () {
        return this.websocket_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "webView", {
      get: function () {
        return this.webview_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "wifi", {
      get: function () {
        return this.wifi_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "application", {
      get: function () {
        return this.application_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "database", {
      get: function () {
        return this.database_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "filesystem", {
      get: function () {
        return this.filesystem_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(ue.prototype, "media", {
      get: function () {
        return this.media_
      },
      enumerable: !0,
      configurable: !0
    }), ue.APPLICAN_PROTOCOL_VERSION_2 = 2, ue.APPLICAN_INTERFACE_VERSION_2_2 = 2002, ue.APPLICAN_INTERFACE_VERSION_2_3 = 2003, ue.APPLICAN_INTERFACE_VERSION_2_4 = 2004, ue.APPLICAN_INTERFACE_VERSION_2_5 = 2005, ue.API_VERSION_STR = "2.5.2", ue.CURRENT_PROTOCOL_VERSION = ue.APPLICAN_PROTOCOL_VERSION_2, ue.CURRENT_INTERFACE_VERSION = ue.APPLICAN_INTERFACE_VERSION_2_5, ue);

    function ue() {
      this.initialized_ = !1, this.webViewInfo_ = null, this.config_ = null, this.queue_ = null, this.callback_ = null, this.accelerometer_ = null, this.application_ = null, this.barcode_ = null, this.beacon_ = null, this.bluetooth_ = null, this.bleucode_ = null, this.camera_ = null, this.capture_ = null, this.cloudpreferences_ = null, this.compass_ = null, this.connection_ = null, this.console_ = null, this.contacts_ = null, this.contents_ = null, this.database_ = null, this.device_ = null, this.dcmlocation_ = null, this.event_ = null, this.filesystem_ = null, this.firebaseanalytics_ = null, this.gamesound_ = null, this.geopla_ = null, this.geopop_ = null, this.geofencing_ = null, this.geolocation_ = null, this.globalization_ = null, this.googanalytics_ = null, this.http_ = null, this.keyboard_ = null, this.launcher_ = null, this.list_ = null, this.livepass_ = null, this.localnotification_ = null, this.maps_ = null, this.media_ = null, this.notification_ = null, this.omotenashiguidesdk_ = null, this.platform_ = null, this.popinfo_ = null, this.purchase_ = null, this.repro_ = null, this.scanner_ = null, this.security_ = null, this.simplestorage_ = null, this.slidemenu_ = null, this.splash_ = null, this.pinable_ = null, this.tab_ = null, this.test_ = null, this.utilities_ = null, this.video_ = null, this.websocket_ = null, this.webview_ = null, this.wifi_ = null, this.sessionId_ = c.generateId()
    }(t.Applican = se).initialize()
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = (r.prototype.registerCallback = function (e, t, n) {
      var o = this.handlers[e];
      o || (o = this.handlers[e] = {}), o[t] = n
    }, r.prototype.unregisterCallback = function (e, t) {
      if (e && t) {
        var n = this.handlers[e];
        n && n[t] && delete n[t]
      }
    }, r.prototype.handleCallback = function (e, t, n, o) {
      if (this.sessionId !== e) return !1;
      if (!n) return !1;
      var r = this.handlers[t];
      return !!r && !!r[n] && r[n](o)
    }, r);

    function r(e) {
      this.sessionId = e, this.handlers = {}
    }
    t.Callback = o
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = n(1),
      o = (Object.defineProperty(i.prototype, "apiVersion", {
        get: function () {
          return this.apiVersion_
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(i.prototype, "baseAppVersion", {
        get: function () {
          return this.baseAppVersion_
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(i.prototype, "baseAppVersionNumber", {
        get: function () {
          return this.baseAppVersionNumber_
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(i.prototype, "baseAppProtocolVersion", {
        get: function () {
          return this.baseAppProtocolVersion_
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(i.prototype, "debug", {
        get: function () {
          return this.debug_
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(i.prototype, "deviceOS", {
        get: function () {
          return this.deviceOS_
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(i.prototype, "device_os", {
        get: function () {
          var osName = this.deviceOS;
          if (osName && osName === "iOS") {
        	  osName = "IOS";
          } else if (osName && osName === "Android") {
        	  osName = "ANDROID";
          }
          return osName
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(i.prototype, "promiseEnabled", {
        get: function () {
          return this.promiseEnabled_
        },
        set: function (e) {
          "undefined" != typeof Promise && -1 !== Promise.toString().indexOf("[native code]") && (this.promiseEnabled_ = e)
        },
        enumerable: !0,
        configurable: !0
      }), i);

    function i(e, t, n, o) {
      this.deviceOS_ = "UNKNOWN", this.debug_ = !1, this.promiseEnabled_ = !1, this.apiVersion_ = e, this.deviceOS_ = t, this.baseAppVersion_ = n, this.baseAppVersionNumber_ = r.parseSemanticVersion(n), this.baseAppProtocolVersion_ = o
    }
    t.Config = o
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var a = n(1),
      o = (Object.defineProperty(r.prototype, "remainApis", {
        get: function () {
          return this.remainApis_
        },
        set: function (e) {
          this.remainApis_ = e
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(r.prototype, "args", {
        get: function () {
          return this.args_
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(r.prototype, "transactionId", {
        get: function () {
          return this.transactionId_
        },
        enumerable: !0,
        configurable: !0
      }), r.prototype.toJSON = function () {
        var e = null;
        return 1 < this.args_.length ? e = this.args_ : 1 === this.args_.length && (e = this.args_[0]), {
          sessionId: this.sessionId,
          className: this.className,
          methodName: this.methodName,
          instanceId: this.instanceId,
          args: e,
          remainApis: this.remainApis_,
          transactionId: this.transactionId_
        }
      }, r);

    function r(e, t, n, o) {
      for (var r = [], i = 4; i < arguments.length; i++) r[i - 4] = arguments[i];
      this.sessionId = e, this.className = t, this.methodName = n, this.instanceId = o, this.remainApis_ = 0, this.transactionId_ = a.generateId(), this.sessionId = this.sessionId || "", this.className = this.className || "", this.methodName = this.methodName || "", this.instanceId = this.instanceId || "", this.args_ = r || []
    }
    t.Command = o
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.apiReady = function () {
        i.prototype.enqueueCb.call(this, "apiReady", null, null)
      }, s.API_CLASS_ID = "applican.test", s);

    function s(e, t, n) {
      return i.call(this, s.API_CLASS_ID, e, t, n) || this
    }
    t.Test = c
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = (r.prototype.resolve = function (e) {
      this.callback && this.callback.resolve && this.callback.resolve(e)
    }, r.prototype.reject = function (e) {
      this.callback && this.callback.reject && this.callback.reject(e)
    }, r);

    function r(e) {
      this.callback = e
    }
    t.Result = o
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.getPushToken = function (e, t, n) {
        i.prototype.enqueueCb.call(this, "getPushToken", e, t, n)
      }, s.prototype.light = function (e, t, n) {
        var o = {
          enable: e
        };
        i.prototype.enqueueCb.call(this, "light", t || null, n || null, o)
      }, s.prototype.getDisplayInfo = function (e, t) {
        i.prototype.enqueueCb.call(this, "getDisplayInfo", e, t)
      }, s.prototype.keepScreenOn = function (e, t, n) {
        var o = {
          enable: e
        };
        i.prototype.enqueueCb.call(this, "keepScreenOn", t || null, n || null, o)
      }, s.prototype.getAdvertisingId = function (e, t) {
        i.prototype.enqueueCb.call(this, "getAdvertisingId", e, t)
      }, s.prototype.getScreenBacklightLevel = function (e, t) {
        i.prototype.enqueueCb.call(this, "getScreenBacklightLevel", e, t)
      }, s.prototype.setScreenBacklightLevel = function (e, t, n) {
        var o = {
          level: e
        };
        i.prototype.enqueueCb.call(this, "setScreenBacklightLevel", t, n, o)
      }, Object.defineProperty(s.prototype, "platformName", {
        get: function () {
          return this.deviceInfo.platformName
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(s.prototype, "platformVersion", {
        get: function () {
          return this.deviceInfo.platformVersion
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(s.prototype, "modelName", {
        get: function () {
          return this.deviceInfo.modelName
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(s.prototype, "name", {
        get: function () {
          return this.deviceInfo.modelName
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(s.prototype, "platform", {
        get: function () {
          return this.deviceInfo.platformName
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(s.prototype, "uuid", {
        get: function () {
          return this.deviceInfo.uuid
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(s.prototype, "uuid_rfc4122", {
        get: function () {
          return this.deviceInfo.uuid_rfc4122
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(s.prototype, "uuid_rfc_4122", {
        get: function () {
          return this.deviceInfo.uuid_rfc_4122
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(s.prototype, "version", {
        get: function () {
          return this.deviceInfo.platformVersion
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(s.prototype, "applican", {
        get: function () {
          return this.deviceInfo.applican
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(s.prototype, "applican_type", {
        get: function () {
          return this.deviceInfo.applican_type
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(s.prototype, "package_name", {
        get: function () {
          return this.deviceInfo.package_name
        },
        enumerable: !0,
        configurable: !0
      }), s.API_CLASS_ID = "applican.device", s);

    function s(e, t, n, o) {
      var r = i.call(this, s.API_CLASS_ID, e, t, n) || this;
      return r.deviceInfo = o, r
    }
    t.Device = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.nativeFireHTMLEvent = function (e) {
        var t = document.createEvent("HTMLEvents");
        t.initEvent(e, !1, !1), document.dispatchEvent(t)
      }, s.nativeFireBatteryEvent = function (e, t, n) {
        var o = document.createEvent("HTMLEvents");
        o.initEvent(e, !1, !1), o.level = t, o.isPlugged = n, document.dispatchEvent(o)
      }, s.nativeFireOrientationEvent = function (e) {
        var t = document.createEvent("HTMLEvents");
        t.initEvent("orientationchanged", !1, !1), t.orientation = e, document.dispatchEvent(t)
      }, s.nativeFireWhitelistBlockedEvent = function (e, t, n) {
        var o = document.createEvent("HTMLEvents");
        o.initEvent("whitelistblocked", !1, !1), o.applican_whitelist_url = e, o.applican_whitelist_scope = t, o.applican_whitelist_api = n, document.dispatchEvent(o)
      }, s.nativeFirePushTokenReceivedEvent = function (e) {
        var t = document.createEvent("HTMLEvents");
        t.initEvent("pushtokenreceived", !1, !1), t.token = e, document.dispatchEvent(t)
      }, s.nativeFireDeviceReadyEvent = function () {
        var e = document.createEvent("HTMLEvents");
        e.initEvent("deviceready", !1, !1), document.dispatchEvent(e)
      }, s.nativeFireKeyboardShownEvent = function () {
        var e = document.createEvent("HTMLEvents");
        e.initEvent("keyboardshown", !1, !1), document.dispatchEvent(e)
      }, s.nativeFireKeyboardHiddenEvent = function () {
        var e = document.createEvent("HTMLEvents");
        e.initEvent("keyboardhidden", !1, !1), document.dispatchEvent(e)
      }, s.API_CLASS_ID = "applican.event", s);

    function s(e, t, n) {
      return i.call(this, s.API_CLASS_ID, e, t, n) || this
    }
    t._Event = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c, s, u = n(0),
      l = n(1);
    (a = i = t.ListError || (t.ListError = {})).CANCELED = "CANCELED", a.BUSY = "BUSY", (s = c = t.ListType || (t.ListType = {}))[s.TITLE = 1] = "TITLE", s[s.SUBTITLE = 2] = "SUBTITLE", s[s.VALUE = 3] = "VALUE", s[s.SUBTITLE_VALUE = 4] = "SUBTITLE_VALUE", s[s.PICTURE = 5] = "PICTURE", s[s.PICTURE_SUBTITLE = 6] = "PICTURE_SUBTITLE", s[s.PICTURE_VALUE = 7] = "PICTURE_VALUE", s[s.PICTURE_SUBTITLE_VALUE = 8] = "PICTURE_SUBTITLE_VALUE", window.ListError = i;
    var p, h = (r(f, p = u.Base), Object.defineProperty(f.prototype, "ListType", {
      get: function () {
        return this.LIST_TYPE_VALUE
      },
      enumerable: !0,
      configurable: !0
    }), f.prototype.show = function (e, t, n, o, r, i) {
      var a = this,
        c = i || {};
      c.type = e, c.title = t, c.listData = n, c.width = c.width || f.DEFAULT_WIDTH, c.height = c.height || f.DEFAULT_HEIGHT, this.listItems = n, p.prototype.enqueueCb.call(this, "show", function (e) {
        if (e && l.isInteger(e.index) && !(e.index < 0) && o) {
          var t = a.listItems ? a.listItems[e.index] : null;
          o(t || null)
        }
      }, r, c)
    }, f.API_CLASS_ID = "applican.list", f.DEFAULT_WIDTH = 50, f.DEFAULT_HEIGHT = 50, f);

    function f(e, t, n) {
      var o = p.call(this, f.API_CLASS_ID, e, t, n) || this;
      return o.LIST_TYPE_VALUE = {
        TITLE: c.TITLE,
        SUBTITLE: c.SUBTITLE,
        VALUE: c.VALUE,
        SUBTITLE_VALUE: c.SUBTITLE_VALUE,
        PICTURE: c.PICTURE,
        PICTURE_SUBTITLE: c.PICTURE_SUBTITLE,
        PICTURE_VALUE: c.PICTURE_VALUE,
        PICTURE_SUBTITLE_VALUE: c.PICTURE_SUBTITLE_VALUE
      }, o.listItems = null, o
    }
    t._List = h
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.open = function (e, t, n, o, r) {
        this.ws || (this.ws = new WebSocket(e), this.onopen_ = t, this.onmessage_ = n, this.onclose_ = o, this.onerror_ = r, this.ws.onopen = this.onWsOpen.bind(this), this.ws.onmessage = this.onWsMessage.bind(this), this.ws.onclose = this.onWsClose.bind(this), this.ws.onerror = this.onWsError.bind(this))
      }, s.prototype.send = function (e) {
        this.ws && this.ws.send(e)
      }, s.prototype.close = function (e, t) {
        this.ws && (this.ws.close(e, t), this.ws = null)
      }, s.prototype.onWsOpen = function (e) {
        this.onopen_ && this.onopen_(e)
      }, s.prototype.onWsMessage = function (e) {
        this.onmessage_ && this.onmessage_(e)
      }, s.prototype.onWsClose = function (e) {
        this.onclose_ && this.onclose_(e)
      }, s.prototype.onWsError = function (e) {
        this.onerror_ && this.onerror_(e)
      }, s.API_CLASS_ID = "applican.websocket", s);

    function s(e, t, n) {
      var o = i.call(this, s.API_CLASS_ID, e, t, n) || this;
      return o.ws = null, o.onopen_ = null, o.onmessage_ = null, o.onclose_ = null, o.onerror_ = null, o
    }
    t._WebSocket = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.getCurrentAcceleration = function (e, t) {
        i.prototype.enqueueCb.call(this, "getCurrentAcceleration", e, t)
      }, s.prototype.watchAcceleration = function (e, t, n) {
        var o = {
          frequency: (n = n || {}).frequency || 1e3,
          watchId: this.currentWatchId
        };
        return i.prototype.enqueueCb.call(this, "watchAcceleration", e, t, o), this.successCb[this.currentWatchId] = e, this.errorCb[this.currentWatchId] = t, this.currentWatchId++
      }, s.prototype.clearWatch = function (e) {
        var t = {
          watchId: e
        };
        this.successCb[e] && delete this.successCb[e], this.errorCb[e] && delete this.errorCb[e], i.prototype.enqueueCb.call(this, "clearWatch", null, null, t)
      }, s.prototype.watchShake = function (e, t) {
        this.shakeCb = e, i.prototype.enqueueCb.call(this, "watchShake", e, t)
      }, s.prototype.clearWatchShake = function (e, t) {
        this.shakeCb = null, i.prototype.enqueueCb.call(this, "clearWatchShake", e, t)
      }, s.prototype.onWatchAccelerometer = function (e) {
        return !(!e || void 0 === e.id || !this.successCb[e.id] || (this.successCb[e.id](e), 0))
      }, s.prototype.onWatchShake = function (e) {
        return !!this.shakeCb && (this.shakeCb(), !0)
      }, s.API_CLASS_ID = "applican.accelerometer", s);

    function s(e, t, n) {
      var o = i.call(this, s.API_CLASS_ID, e, t, n) || this;
      return o.currentWatchId = 0, o.successCb = {}, o.errorCb = {}, o.shakeCb = null, i.prototype.registerCallback.call(o, "onWatchAccelerometer", o.onWatchAccelerometer.bind(o)), i.prototype.registerCallback.call(o, "onWatchShake", o.onWatchShake.bind(o)), o
    }
    t.Accelerometer = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = (r(c, i = Error), c);

    function c(e, t, n, o) {
      var r = i.call(this, n + "." + o + ": " + e) || this;
      return r.code = t, r.apiClassName = n, r.apiMethodName = o, r
    }
    t.ApplicanError = a
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var a, i = n(0),
      c = (r(s, a = i.Base), Object.defineProperty(s.prototype, "versionName", {
        get: function () {
          return this.versionName_
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(s.prototype, "versionCode", {
        get: function () {
          return this.versionCode_
        },
        enumerable: !0,
        configurable: !0
      }), s.prototype.finish = function () {
        a.prototype.enqueueCb.call(this, "finish", null, null)
      }, s.API_CLASS_ID = "applican.application", s);

    function s(e, t, n, o, r) {
      var i = a.call(this, s.API_CLASS_ID, e, t, n) || this;
      return i.versionName_ = o, i.versionCode_ = r, i
    }
    t.Application = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c = n(0);
    (a = i || (i = {}))[a.AZTEC = 0] = "AZTEC", a[a.CODABAR = 1] = "CODABAR", a[a.CODE_39 = 2] = "CODE_39", a[a.CODE_93 = 3] = "CODE_93", a[a.CODE_128 = 4] = "CODE_128", a[a.DATA_MATRIX = 5] = "DATA_MATRIX", a[a.EAN_8 = 6] = "EAN_8", a[a.EAN_13 = 7] = "EAN_13", a[a.ITF = 8] = "ITF", a[a.MAXICODE = 9] = "MAXICODE", a[a.PDF_417 = 10] = "PDF_417", a[a.QR_CODE = 11] = "QR_CODE", a[a.RSS_14 = 12] = "RSS_14", a[a.RSS_EXPANDED = 13] = "RSS_EXPANDED", a[a.UPC_A = 14] = "UPC_A", a[a.UPC_E = 15] = "UPC_E", a[a.UPC_EAN_EXTENSION = 16] = "UPC_EAN_EXTENSION";
    var s, u = (r(l, s = c.Base), l.prototype.captureBarcode = function (t, e, n) {
      s.prototype.enqueueCb.call(this, "captureBarcode", function (e) {
        e && t(e)
      }, e, n)
    }, Object.defineProperty(l.prototype, "BarcodeType", {
      get: function () {
        return this.barcodeType_
      },
      enumerable: !0,
      configurable: !0
    }), l.API_CLASS_ID = "applican.barcode", l);

    function l(e, t, n) {
      var o = s.call(this, l.API_CLASS_ID, e, t, n) || this;
      return o.barcodeType_ = {
        AZTEC: i.AZTEC,
        CODABAR: i.CODABAR,
        CODE_39: i.CODE_39,
        CODE_93: i.CODE_93,
        CODE_128: i.CODE_128,
        DATA_MATRIX: i.DATA_MATRIX,
        EAN_8: i.EAN_8,
        EAN_13: i.EAN_13,
        ITF: i.ITF,
        MAXICODE: i.MAXICODE,
        PDF_417: i.PDF_417,
        QR_CODE: i.QR_CODE,
        RSS_14: i.RSS_14,
        RSS_EXPANDED: i.RSS_EXPANDED,
        UPC_A: i.UPC_A,
        UPC_E: i.UPC_E,
        UPC_EAN_EXTENSION: i.UPC_EAN_EXTENSION
      }, o
    }
    t.Barcode = u
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.init = function (e, t) {
        i.prototype.enqueueCb.call(this, "init", e, t)
      }, s.prototype.startMonitoring = function (e, t) {
        i.prototype.enqueueCb.call(this, "startMonitoring", e, t)
      }, s.prototype.stopMonitoring = function (e, t) {
        i.prototype.enqueueCb.call(this, "stopMonitoring", e, t)
      }, s.prototype.isMonitoring = function (e, t) {
        i.prototype.enqueueCb.call(this, "isMonitoring", e, t)
      }, s.prototype.watchBeacon = function (e, t, n, o) {
        var r = {
          watchId: this.currentWatchId_,
          beacon: e
        };
        return this.watchBeaconCallbacks[this.currentWatchId_] = t, i.prototype.enqueueCb.call(this, "watchBeacon", n, o, r), this.currentWatchId_++
      }, s.prototype.clearBeacon = function (e) {
        this.watchBeaconCallbacks[e] && delete this.watchBeaconCallbacks[e];
        var t = {
          watchId: e
        };
        i.prototype.enqueueCb.call(this, "clearBeacon", null, null, t)
      }, s.prototype.getBeaconHistory = function (e, t, n) {
        i.prototype.enqueueCb.call(this, "getBeaconHistory", t, n, e)
      }, s.prototype.onWatchBeacon = function (e) {
        return !!e && (this.watchBeaconCallbacks[e.watchId] && this.watchBeaconCallbacks[e.watchId](e.beacon, e.error), !0)
      }, s.API_CLASS_ID = "applican.beacon", s);

    function s(e, t, n) {
      var o = i.call(this, s.API_CLASS_ID, e, t, n) || this;
      return o.currentWatchId_ = 0, o.watchBeaconCallbacks = {}, i.prototype.registerCallback.call(o, "onWatchBeacon", o.onWatchBeacon.bind(o)), o
    }
    t.Beacon = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c = n(0);
    (a = i = t.BluetoothError || (t.BluetoothError = {})).BUSY_ERROR = "BUSY_ERROR", a.BLUETOOT_NOT_SUPPORTED = "BLUETOOTH_NOT_SUPPORTED", a.UNKNOWN_ERROR = "UNKNOWN_ERROR", a.BLUETOOT_DISABLED = "BLUETOOTH_DISABLED", a.BLUETOOTH_NOT_SUPPORTED = "BLUETOOTH_NOT_SUPPORTED", a.BLUETOOTH_DISABLED = "BLUETOOTH_DISABLED", window.BluetoothError = i;
    var s, u = (r(l, s = c.Base), l.prototype.isSupported = function (e, t) {
      s.prototype.enqueueCb.call(this, "isSupported", e, t)
    }, l.prototype.isEnabled = function (e, t) {
      s.prototype.enqueueCb.call(this, "isEnabled", e, t)
    }, l.prototype.enable = function (e, t) {
      s.prototype.enqueueCb.call(this, "enable", e, t)
    }, l.prototype.disable = function (e, t) {
      s.prototype.enqueueCb.call(this, "disable", e, t)
    }, l.prototype.discover = function (t, n, e) {
      s.prototype.registerCallback.call(this, "discoveredCallback", function (e) {
        return !!t && (t(e), !0)
      }), s.prototype.registerCallback.call(this, "finishedCallback", function (e) {
        return !!n && (n(e), !0)
      }), s.prototype.enqueueCb.call(this, "discover", null, e)
    }, l.prototype.discoverableOn = function (e, t, n) {
      var o = {
        discoverableDuration: e
      };
      s.prototype.enqueueCb.call(this, "discoverableOn", t, n, o)
    }, l.prototype.getBondedDevices = function (e, t) {
      s.prototype.enqueueCb.call(this, "getBondedDevices", e, t)
    }, l.prototype.cancelDiscovery = function (e, t) {
      s.prototype.enqueueCb.call(this, "cancelDiscovery", e, t)
    }, l.prototype.watchConnection = function (t, n, o, r) {
      s.prototype.registerCallback.call(this, "onWatchConnectionOpen", function (e) {
        return !!t && (t(), !0)
      }), s.prototype.registerCallback.call(this, "onWatchConnectionMessage", function (e) {
        return !!n && (n(e), !0)
      }), s.prototype.registerCallback.call(this, "onWatchConnectionClose", function (e) {
        return !!o && (o(), !0)
      }), s.prototype.registerCallback.call(this, "onWatchConnectionError", function (e) {
        return !!r && (r(e), !0)
      }), s.prototype.enqueueCb.call(this, "watchConnection", null, null)
    }, l.prototype.connect = function (e, t, n, o, r) {
      s.prototype.registerCallback.call(this, "onConnectionOpen", function (e) {
        return !!t && (t(), !0)
      }), s.prototype.registerCallback.call(this, "onConnectionMessage", function (e) {
        return !!n && (n(e), !0)
      }), s.prototype.registerCallback.call(this, "onConnectionClose", function (e) {
        return !!o && (o(), !0)
      }), s.prototype.registerCallback.call(this, "onConnectionError", function (e) {
        return !!r && (r(e), !0)
      });
      var i = {
        address: e
      };
      s.prototype.enqueueCb.call(this, "connect", null, null, i)
    }, l.prototype.send = function (e) {
      var t = {
        data: e
      };
      s.prototype.enqueueCb.call(this, "send", null, null, t)
    }, l.prototype.disconnect = function () {
      s.prototype.enqueueCb.call(this, "disconnect", null, null)
    }, l.API_CLASS_ID = "applican.bluetooth", l);

    function l(e, t, n) {
      return s.call(this, l.API_CLASS_ID, e, t, n) || this
    }
    t.Bluetooth = u
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.init = function (e, t) {
        i.prototype.enqueueCb.call(this, "init", e, t)
      }, s.prototype.startMonitoring = function (e, t) {
        i.prototype.enqueueCb.call(this, "startMonitoring", e, t)
      }, s.prototype.stopMonitoring = function (e, t) {
        i.prototype.enqueueCb.call(this, "stopMonitoring", e, t)
      }, s.prototype.watchBeacon = function (e, t, n, o) {
        var r = {
          watchId: this.currentWatchId_,
          beacon: e
        };
        return this.BleucodeCallback[this.currentWatchId_] = t, i.prototype.enqueueCb.call(this, "watchBeacon", n, o, r), this.currentWatchId_++
      }, s.prototype.clearBeacon = function (e) {
        this.BleucodeCallback[e] && delete this.BleucodeCallback[e];
        var t = {
          watchId: e
        };
        i.prototype.enqueueCb.call(this, "clearBeacon", null, null, t)
      }, s.prototype.onWatchBeacon = function (e) {
        return !!e && (this.BleucodeCallback[e.watchId] && this.BleucodeCallback[e.watchId](e.beacon, e.error), !0)
      }, s.API_CLASS_ID = "applican.bleucode", s);

    function s(e, t, n) {
      var o = i.call(this, s.API_CLASS_ID, e, t, n) || this;
      return o.currentWatchId_ = 0, o.BleucodeCallback = {}, i.prototype.registerCallback.call(o, "onWatchBeacon", o.onWatchBeacon.bind(o)), o
    }
    t.Bleucode = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c, s, u, l, p, h, f = n(0);
    (a = i || (i = {}))[a.DATA_URL = 0] = "DATA_URL", a[a.FILE_URI = 1] = "FILE_URI", (s = c || (c = {}))[s.PHOTOLIBRARY = 0] = "PHOTOLIBRARY", s[s.CAMERA = 1] = "CAMERA", s[s.SAVEDPHOTOALBUM = 2] = "SAVEDPHOTOALBUM", (l = u || (u = {}))[l.JPEG = 0] = "JPEG", l[l.PNG = 1] = "PNG", (h = p || (p = {}))[h.PICTURE = 0] = "PICTURE", h[h.VIDEO = 1] = "VIDEO", h[h.ALLMEDIA = 2] = "ALLMEDIA";
    var y, _ = (r(d, y = f.Base), Object.defineProperty(d.prototype, "DestinationType", {
      get: function () {
        return this.destinationType_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(d.prototype, "PictureSourceType", {
      get: function () {
        return this.pictureSourceType_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(d.prototype, "EncodingType", {
      get: function () {
        return this.encodingType_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(d.prototype, "MediaType", {
      get: function () {
        return this.mediaType_
      },
      enumerable: !0,
      configurable: !0
    }), d.prototype.takePicture = function (e, t, n) {
      y.prototype.enqueueCb.call(this, "takePicture", e, t, n)
    }, d.prototype.getPicture = function (e, t, n) {
      y.prototype.enqueueCb.call(this, "getPicture", e, t, n)
    }, d.prototype.cleanup = function (e, t) {
      y.prototype.enqueueCb.call(this, "cleanup", e, t)
    }, d.prototype.saveToPhotoAlbum = function (e, t, n) {
      y.prototype.enqueueCb.call(this, "saveToPhotoAlbum", t, n, {
        data: e
      })
    }, d.prototype.light = function (e, t, n) {
      var o = {
        enable: e
      };
      y.prototype.enqueueCb.call(this, "light", t || null, n || null, o)
    }, d.API_CLASS_ID = "applican.camera", d);

    function d(e, t, n) {
      var o = y.call(this, d.API_CLASS_ID, e, t, n) || this;
      return o.destinationType_ = {
        DATA_URL: i.DATA_URL,
        FILE_URI: i.FILE_URI
      }, o.pictureSourceType_ = {
        PHOTOLIBRARY: c.PHOTOLIBRARY,
        CAMERA: c.CAMERA,
        SAVEDPHOTOALBUM: c.SAVEDPHOTOALBUM
      }, o.encodingType_ = {
        JPEG: u.JPEG,
        PNG: u.PNG
      }, o.mediaType_ = {
        PICTURE: p.PICTURE,
        VIDEO: p.VIDEO,
        ALLMEDIA: p.ALLMEDIA
      }, o
    }
    t.Camera = _
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c = n(0);
    (a = i = t.CaptureError || (t.CaptureError = {}))[a.CAPTURE_INTERNAL_ERR = 0] = "CAPTURE_INTERNAL_ERR", a[a.CAPTURE_APPLICATION_BUSY = 1] = "CAPTURE_APPLICATION_BUSY", a[a.CAPTURE_INVALID_ARGUMENT = 2] = "CAPTURE_INVALID_ARGUMENT", a[a.CAPTURE_NO_MEDIA_FILES = 3] = "CAPTURE_NO_MEDIA_FILES", a[a.CAPTURE_NOT_SUPPORTED = 20] = "CAPTURE_NOT_SUPPORTED", a[a.CAPTURE_BUSY = 30] = "CAPTURE_BUSY", window.CaptureError = i;
    var s, u = (r(l, s = c.Base), l.prototype.captureWithOverlay = function (e, t, n) {
      s.prototype.enqueueCb.call(this, "captureWithOverlay", e, t, n)
    }, l.prototype.captureAudio = function (e, t) {
      s.prototype.enqueueCb.call(this, "captureAudio", e, t)
    }, l.prototype.captureVideo = function (e, t) {
      s.prototype.enqueueCb.call(this, "captureVideo", e, t)
    }, l.prototype.captureImage = function (e, t) {
      s.prototype.enqueueCb.call(this, "captureImage", e, t)
    }, l.API_CLASS_ID = "applican.capture", l);

    function l(e, t, n) {
      return s.call(this, l.API_CLASS_ID, e, t, n) || this
    }
    t.Capture = u
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.getValue = function (e, t, n) {
        var o = {
          key: e
        };
        i.prototype.enqueueCb.call(this, "getValue", t, n, o)
      }, s.prototype.setValue = function (e, t, n, o) {
        var r = {
          key: e,
          value: t
        };
        i.prototype.enqueueCb.call(this, "setValue", n, o, r)
      }, s.prototype.deleteValue = function (e, t, n) {
        var o = {
          key: e
        };
        i.prototype.enqueueCb.call(this, "deleteValue", t, n, o)
      }, s.API_CLASS_ID = "applican.cloudpreferences", s);

    function s(e, t, n) {
      return i.call(this, s.API_CLASS_ID, e, t, n) || this
    }
    t.CloudPreferences = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c = n(0);
    (a = i = t.CompassError || (t.CompassError = {})).COMPASS_INTERNAL_ERR = "COMPASS_INTERNAL_ERR", a.COMPASS_NOT_SUPPORTED = "COMPASS_NOT_SUPPORTED", a.COMPASS_BUSY_ERR = "COMPASS_BUSY_ERR", window.CompassError = i;
    var s, u = (r(l, s = c.Base), l.prototype.getCurrentHeading = function (e, t) {
      s.prototype.enqueueCb.call(this, "getCurrentHeading", e, t)
    }, l.prototype.watchHeading = function (e, t, n) {
      var o = {
        filter: (n = n || {}).filter,
        frequency: n.frequency || 1e3,
        watchId: this.currentWatchId
      };
      return s.prototype.enqueueCb.call(this, "watchHeading", e, t, o), this.watchCb[this.currentWatchId] = e, this.currentWatchId++
    }, l.prototype.clearWatch = function (e) {
      var t = {
        watchId: e
      };
      this.watchCb[e] && delete this.watchCb[e], s.prototype.enqueueCb.call(this, "clearWatch", null, null, t)
    }, l.prototype.onWatchHeading = function (e) {
      return !(!e || void 0 === e.id || !this.watchCb[e.id] || (this.watchCb[e.id](e), 0))
    }, l.API_CLASS_ID = "applican.compass", l);

    function l(e, t, n) {
      var o = s.call(this, l.API_CLASS_ID, e, t, n) || this;
      return o.currentWatchId = 0, o.watchCb = {}, s.prototype.registerCallback.call(o, "onWatchHeading", o.onWatchHeading.bind(o)), o
    }
    t.Compass = u
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0);
    (i = t.ConnectionType || (t.ConnectionType = {})).CELL = "CELL", i.WIFI = "WIFI", i.NONE = "NONE", i.UNKNOWN = "UNKNOWN";
    var c, s = (r(u, c = a.Base), u.prototype.getCurrentConnectionType = function (e, t) {
      c.prototype.enqueueCb.call(this, "getCurrentConnectionType", e, t)
    }, u.API_CLASS_ID = "applican.connection", u);

    function u(e, t, n) {
      return c.call(this, u.API_CLASS_ID, e, t, n) || this
    }
    t.Connection = s
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.show = function () {
        i.prototype.enqueueCb.call(this, "show", null, null)
      }, s.prototype.verbose = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var n = {
          args: e
        };
        i.prototype.enqueueCb.call(this, "verbose", null, null, n)
      }, s.prototype.debug = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var n = {
          args: e
        };
        i.prototype.enqueueCb.call(this, "debug", null, null, n)
      }, s.prototype.info = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var n = {
          args: e
        };
        i.prototype.enqueueCb.call(this, "info", null, null, n)
      }, s.prototype.warn = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var n = {
          args: e
        };
        i.prototype.enqueueCb.call(this, "warn", null, null, n)
      }, s.prototype.error = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var n = {
          args: e
        };
        i.prototype.enqueueCb.call(this, "error", null, null, n)
      }, s.API_CLASS_ID = "applican.console", s);

    function s(e, t, n) {
      return i.call(this, s.API_CLASS_ID, e, t, n) || this
    }
    t.Console = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var c, i = n(0),
      s = n(34),
      u = n(5),
      a = (r(l, c = i.Base), l.prototype.create = function (e) {
        return new s.Contact(this.config, this.queue, this.callback, e)
      }, l.prototype.find = function (e, i, t, n) {
        var a = this;
        e = e || u._ContactFindOptions.FIND_ALL_FIELDS, (n = n || {}).fields = e, c.prototype.enqueueCb.call(this, "find", function (e) {
          if (Array.isArray(e)) {
            for (var t = [], n = 0, o = e; n < o.length; n++) {
              var r = o[n];
              t.push(new s.Contact(a.config, a.queue, a.callback, r))
            }
            i && i(t)
          }
        }, t, n)
      }, l.API_CLASS_ID = "applican.contacts", l);

    function l(e, t, n) {
      return c.call(this, l.API_CLASS_ID, e, t, n) || this
    }
    t.Contacts = a
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = n(35),
      s = n(36),
      u = n(5),
      l = n(37),
      p = n(38);
    (i = t.ContactError || (t.ContactError = {}))[i.UNKNOWN_ERROR = 0] = "UNKNOWN_ERROR", i[i.INVALID_ARGUMENT_ERROR = 1] = "INVALID_ARGUMENT_ERROR", i[i.TIMEOUT_ERROR = 2] = "TIMEOUT_ERROR", i[i.PENDING_OPERATION_ERROR = 3] = "PENDING_OPERATION_ERROR", i[i.IO_ERROR = 4] = "IO_ERROR", i[i.NOT_SUPPORTED_ERROR = 5] = "NOT_SUPPORTED_ERROR", i[i.PERMISSION_DENIED_ERROR = 20] = "PERMISSION_DENIED_ERROR", i[i.CONTACT_BUSY = 30] = "CONTACT_BUSY", window.ContactAddress = c._ContactAddress, window.ContactField = s._ContactField, window.ContactFindOptions = u._ContactFindOptions, window.ContactName = l._ContactName, window.ContactOrganization = p._ContactOrganization;
    var h, f = (r(y, h = a.Base), y.prototype.getRawId = function () {
      return this.rawId
    }, y.prototype.remove = function (e, t) {
      var n = {
        id: this.id
      };
      h.prototype.enqueueCb.call(this, "remove", e, t, n)
    }, y.prototype.clone = function () {
      var e = {
        id: this.id,
        displayName: this.displayName,
        nickname: this.nickname,
        note: this.note,
        name: this.name,
        phoneNumbers: this.phoneNumbers,
        emails: this.emails,
        addresses: this.addresses,
        ims: this.ims,
        organizations: this.organizations,
        photos: this.photos,
        categories: this.categories,
        urls: this.urls,
        birthday: this.birthday
      };
      return new y(this.config, this.queue_, this.callback, e)
    }, y.prototype.save = function (e, t) {
      var n = {
        id: this.id,
        displayName: this.displayName,
        nickname: this.nickname,
        note: this.note,
        name: this.name,
        phoneNumbers: this.phoneNumbers,
        emails: this.emails,
        addresses: this.addresses,
        ims: this.ims,
        organizations: this.organizations,
        photos: this.photos,
        categories: this.categories,
        urls: this.urls,
        birthday: this.birthday
      };
      h.prototype.enqueueCb.call(this, "save", e, t, n)
    }, y.API_CLASS_ID = "applican.contact", y);

    function y(e, t, n, o) {
      var r = h.call(this, y.API_CLASS_ID, e, t, n) || this;
      return r.id = null, r.displayName = null, r.name = null, r.nickname = null, r.phoneNumbers = null, r.emails = null, r.addresses = null, r.ims = null, r.organizations = null, r.birthday = null, r.note = null, r.photos = null, r.categories = null, r.urls = null, r.queue_ = t, r.rawId = null, o && (r.id = o.id, r.displayName = o.displayName, r.name = o.name, r.nickname = o.nickname, r.phoneNumbers = o.phoneNumbers, r.emails = o.emails, r.addresses = o.addresses, r.ims = o.ims, r.organizations = o.organizations, r.birthday = o.birthday, r.note = o.note, r.photos = o.photos, r.categories = o.categories, r.urls = o.urls), r.id = r.id || null, r.displayName = r.displayName || null, r.name = r.name || null, r.nickname = r.nickname || null, r.phoneNumbers = r.phoneNumbers || null, r.emails = r.emails || null, r.addresses = r.addresses || null, r.ims = r.ims || null, r.organizations = r.organizations || null, r.birthday = r.birthday || null, r.note = r.note || null, r.photos = r.photos || null, r.categories = r.categories || null, r.urls = r.urls || null, r
    }
    t.Contact = f
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t._ContactAddress = function (e, t, n, o, r, i, a, c) {
      this.pref = e, this.type = t, this.formatted = n, this.streetAddress = o, this.locality = r, this.region = i, this.postalCode = a, this.country = c, this.id = null, this.pref = this.pref || !1, this.type = this.type || null, this.formatted = this.formatted || null, this.streetAddress = this.streetAddress || null, this.locality = this.locality || null, this.region = this.region || null, this.postalCode = this.postalCode || null, this.country = this.country || null
    }
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t._ContactField = function (e, t, n) {
      this.type = e, this.value = t, this.pref = n, this.id = null, this.type = this.type && this.type.toString() || null, this.value = this.value && this.value.toString() || null, this.pref = void 0 !== this.pref && this.pref
    }
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t._ContactName = function (e, t, n, o, r, i) {
      this.formatted = e, this.familyName = t, this.givenName = n, this.middleName = o, this.honorificPrefix = r, this.honorificSuffix = i, this.formatted = this.formatted || null, this.familyName = this.familyName || null, this.givenName = this.givenName || null, this.middleName = this.middleName || null, this.honorificPrefix = this.honorificPrefix || null, this.honorificSuffix = this.honorificSuffix || null
    }
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t._ContactOrganization = function (e, t, n, o, r) {
      this.pref = e, this.type = t, this.name = n, this.department = o, this.title = r, this.id = null, this.pref = this.pref || !1, this.type = this.type || null, this.name = this.name || null, this.department = this.department || null, this.title = this.title || null
    }
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), Object.defineProperty(s.prototype, "localVersion", {
        get: function () {
          return this.contentsInfo && this.contentsInfo.localVersion
        },
        enumerable: !0,
        configurable: !0
      }), s.API_CLASS_ID = "applican.contents", s);

    function s(e, t, n, o) {
      var r = i.call(this, s.API_CLASS_ID, e, t, n) || this;
      return r.contentsInfo = o, r
    }
    t.Contents = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = n(41),
      s = (r(u, i = a.Base), u.prototype.open = function (e, n, t) {
        var o = this,
          r = {
            name: e
          };
        i.prototype.enqueueCb.call(this, "open", function (e) {
          if (e && n && e.name) {
            var t = new c.Database(o.config, o.queue, o.callback, e.name);
            o.databases_[t.instanceId] = t, n(t)
          }
        }, t, r)
      }, u.prototype.closeAllDatabases = function (e, t) {
        i.prototype.enqueueCb.call(this, "closeAllDatabases", e, t)
      }, u.prototype.onDatabaseClosed = function (e) {
        return !(!e || !e.instanceId || (this.databases_[e.instanceId] && delete this.databases_[e.instanceId], 0))
      }, u.API_CLASS_ID = "applican.database.databasefactory", u);

    function u(e, t, n) {
      var o = i.call(this, u.API_CLASS_ID, e, t, n) || this;
      return o.databases_ = {}, i.prototype.registerCallback.call(o, "onDatabaseClosed", o.onDatabaseClosed.bind(o)), o
    }
    t.DatabaseFactory = s
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.close = function (e, t) {
        i.prototype.enqueueCb.call(this, "close", e, t)
      }, s.prototype.exec = function (e, t, n) {
        var o = {
          sql: e
        };
        i.prototype.enqueueCb.call(this, "exec", t, n, o)
      }, s.prototype.execTransaction = function (e, t, n) {
        var o = {
          sqls: e
        };
        i.prototype.enqueueCb.call(this, "execTransaction", t, n, o)
      }, s.prototype.query = function (e, t, n) {
        var o = {
          sql: e
        };
        i.prototype.enqueueCb.call(this, "query", t, n, o)
      }, s.API_CLASS_ID = "applican.database", s);

    function s(e, t, n, o) {
      var r = i.call(this, s.API_CLASS_ID, e, t, n, {
        name: o
      }) || this;
      return r.name = o, r
    }
    t.Database = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(g, i = a.Base), g.getFirstChildText = function (e, t) {
        var n = "",
          o = e.getElementsByTagName(t);
        if (o) {
          var r = o.item(0);
          r && r.textContent && (n = r.textContent)
        }
        return n
      }, g.parseAddressString = function (e) {
        var t = e.match(/^(東京都|京都府|[^都道府県]+[都道府県])/);
        if (!t) return null;
        var n = t[0],
          o = "",
          r = (e = e.replace(new RegExp("^" + n), "")).split("");
        if (e.match(/区/))
          for (var i = 0, a = r.length; i < a && (o += c = r[i], "区" !== c); ++i);
        else if (e.match(/^(市川市|四日市市|八日市市|町田市|十日町市|大町市|原町市|武蔵村山市|東村山市|羽村市|村上市|中村市|大村市|村山市|市来町|東市来町|余市町|種市町|市貝町|上市町|野々市町|市川大門町|市川町|下市町|六日市町|市場町|野市町|大町町|鹿町町|村田町|玉村町|村松町|村岡町|市浦村)/)) o = RegExp.$1;
        else if (e.match(/[市町村]/))
          for (i = 0, a = r.length; i < a; ++i) {
            var c;
            if (o += c = r[i], c.match(/[市町村]/)) break
          }
        return {
          region: n,
          city: o,
          street: e = e.replace(new RegExp("^" + o), "")
        }
      }, g.prototype.getCurrentPosition = function (d, b, e) {
        var t = '\n<?xml version="1.0" encoding="UTF-8"?>\n<DDF ver="1.0">\n  <RequestInfo>\n    <RequestParam>\n      <APIKey>\n        <APIKey1_ID>' + e.APIKey1 + "</APIKey1_ID >\n        <APIKey2>" + e.APIKey2 + "</APIKey2>\n      </APIKey>\n      <OptionProperty>\n        <AreaCode></AreaCode>\n        <AreaName></AreaName>\n        <Adr></Adr>\n        <AdrCode></AdrCode>\n        <PostCode></PostCode>\n      </OptionProperty>\n    </RequestParam>\n  </RequestInfo>\n</DDF>",
          C = new XMLHttpRequest;
        C.open("POST", "https://api.spmode.ne.jp/nwLocation/GetLocation", !0), C.setRequestHeader("If-Modified-Since", "Mon, 27 Mar 1972 00:00:00 GMT"), C.setRequestHeader("Content-Type", "application/xml; charset=UTF-8"), C.send(t);
        var E = window.setTimeout(function () {
          C.abort(), b && b({
            code: 0,
            message: "タイムアウト"
          })
        }, 3e3);
        C.onload = function (e) {
          window.clearTimeout(E);
          var t = C.responseXML,
            n = {
              status: C.status,
              statusText: C.statusText,
              responseText: C.responseText,
              responseXML: t,
              code: 0,
              message: ""
            };
          if (200 !== C.status || !t) return n.message = "通信エラー", void(b && b(n));
          var o = g.getFirstChildText(t, "ResultCode");
          if (!o) return n.message = "不正な応答", void(b && b(n));
          var r = parseInt(o, 10);
          n.code = r;
          var i = g.getFirstChildText(t, "Message");
          if (n.message = i, r < 2e3 || 3e3 <= r) b && b(n);
          else {
            var a = g.getFirstChildText(t, "Lat"),
              c = g.getFirstChildText(t, "Lon"),
              s = g.getFirstChildText(t, "Time"),
              u = g.getFirstChildText(t, "AdrCode"),
              l = g.getFirstChildText(t, "AreaCode"),
              p = g.getFirstChildText(t, "AreaName"),
              h = g.getFirstChildText(t, "adrCode"),
              f = g.getFirstChildText(t, "Adr"),
              y = g.parseAddressString(f),
              _ = {
                coords: {
                  latitude: parseFloat(a.replace(/^[A-Z]/, "")),
                  longitude: parseFloat(c.replace(/^[A-Z]/, "")),
                  Lat: a,
                  Lon: c
                },
                address: {
                  region: y && y.region || "",
                  city: y && y.city || "",
                  street: y && y.street || "",
                  postalCode: u,
                  AreaCode: l,
                  AreaName: p,
                  Adr: f,
                  AdrCode: h,
                  PostalCode: u
                },
                timestamp: s,
                code: r,
                message: i
              };
            d && d(_)
          }
        }
      }, g.API_CLASS_ID = "applican.docomogeolocation", g);

    function g(e, t, n) {
      return i.call(this, g.API_CLASS_ID, e, t, n) || this
    }
    t.DocomoGeolocation = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = n(0),
      a = n(6),
      c = n(44),
      s = n(2),
      u = n(7),
      l = n(3),
      p = n(45),
      h = n(46),
      f = n(8),
      y = n(51);
    window.LocalFileSystem = y.LocalFileSystem, window.FileError = a.FileError;
    var _, d = (r(b, _ = i.Base), b.prototype.getApplicationFilesRoot = function (e, t) {
      _.prototype.enqueueCb.call(this, "getApplicationFilesRoot", e, t)
    }, b.prototype.getApplicationExternalFilesRoot = function (e, t) {
      _.prototype.enqueueCb.call(this, "getApplicationExternalFilesRoot", e, t)
    }, b.prototype.getApplicationCacheRoot = function (e, t) {
      _.prototype.enqueueCb.call(this, "getApplicationCacheRoot", e, t)
    }, b.prototype.getApplicationExternalCacheRoot = function (e, t) {
      _.prototype.enqueueCb.call(this, "getApplicationExternalCacheRoot", e, t)
    }, b.prototype.requestFileSystem = function (e, t, n, o) {
      var r = this,
        i = {
          type: e,
          size: t
        };
      _.prototype.enqueueCb.call(this, "requestFileSystem", function (e) {
        if (e && n) {
          var t = new p.FileSystem(r.config, r.queue, r.callback, e.name, new s.DirectoryEntry(r.config, r.queue, r.callback, e.root_name, e.root_path));
          n(t)
        }
      }, o, i)
    }, b.prototype.createDirectoryEntry = function (e, t) {
      return new s.DirectoryEntry(this.config, this.queue, this.callback, e, t)
    }, b.prototype.createDirectoryReader = function (e) {
      return new u.DirectoryReader(this.config, this.queue, this.callback, e)
    }, b.prototype.createFileEntry = function (e, t) {
      return new l.FileEntry(this.config, this.queue, this.callback, e, t)
    }, b.prototype.createFileReader = function () {
      return new c._FileReader(this.config, this.queue, this.callback)
    }, b.prototype.createFileWriter = function (e) {
      return new f.FileWriter(this.config, this.queue, this.callback, e)
    }, b.prototype.createFileTransfer = function () {
      return new h.FileTransfer(this.config, this.queue, this.callback)
    }, b.API_CLASS_ID = "applican.filesystem.filesystemfactory", b);

    function b(e, t, n) {
      return _.call(this, b.API_CLASS_ID, e, t, n) || this
    }
    t.FileSystemFactory = d
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.readAsText = function (e, t) {
        var n = {
          fullPath: e.fullPath,
          encoding: t
        };
        i.prototype.enqueueCb.call(this, "readAsText", null, null, n)
      }, s.prototype.readAsDataURL = function (e) {
        var t = {
          fullPath: e.fullPath
        };
        i.prototype.enqueueCb.call(this, "readAsDataURL", null, null, t)
      }, s.prototype.abort = function () {}, s.prototype.readAsBinaryString = function (e) {
        this.abort()
      }, s.prototype.readAsArrayBuffer = function (e) {
        this.abort()
      }, s.prototype._onLoadStart = function (e) {
        return this.onloadstart && this.onloadstart(e), !0
      }, s.prototype._onLoad = function (e) {
        return this.onload && this.onload(e), !0
      }, s.prototype._onLoadEnd = function (e) {
        return this.onloadend && this.onloadend(e), !0
      }, s.prototype._onLoadError = function (e) {
        return this.onerror && this.onerror(e), !0
      }, s.prototype._onLoadProgress = function (e) {
        return this.onprogress && this.onprogress(e), !0
      }, s.prototype._onLoadAbort = function (e) {
        return this.onabort && this.onabort(e), !0
      }, s.EMPTY = 0, s.LOADING = 1, s.DONE = 2, s.API_CLASS_ID = "applican.filesystem.filereader", s);

    function s(e, t, n) {
      var o = i.call(this, s.API_CLASS_ID, e, t, n) || this;
      return o.onloadend = null, o.onloadstart = null, o.onerror = null, o.onprogress = null, o.onload = null, o.onabort = null, i.prototype.registerCallback.call(o, "onLoadStart", o._onLoadStart.bind(o)), i.prototype.registerCallback.call(o, "onLoad", o._onLoad.bind(o)), i.prototype.registerCallback.call(o, "onLoadEnd", o._onLoadEnd.bind(o)), i.prototype.registerCallback.call(o, "onLoadError", o._onLoadError.bind(o)), i.prototype.registerCallback.call(o, "onLoadProgress", o._onLoadProgress.bind(o)), i.prototype.registerCallback.call(o, "onLoadAbort", o._onLoadAbort.bind(o)), o
    }
    t._FileReader = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var a, i = n(0),
      c = n(2),
      s = (r(u, a = i.Base), u.API_CLASS_ID = "applican.filesystem", u);

    function u(e, t, n, o, r) {
      var i = a.call(this, u.API_CLASS_ID, e, t, n) || this;
      return i.name = o, i.root = null, r && (i.root = new c.DirectoryEntry(e, t, n, r.name, r.fullPath)), i
    }
    t.FileSystem = s
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = n(0),
      a = n(47),
      c = n(3),
      s = n(48),
      u = n(49),
      l = n(50);
    window.FileTransferError = s.FileTransferError, window.FileUploadOptions = a._FileUploadOptions, window.FileUploadResult = u.FileUploadResult;
    var p, h = (r(f, p = i.Base), f.prototype.upload = function (e, t, n, o, r, i) {
      (r = r || {}).filePath = e, r.server = t, r.trustAllHosts = i || !1, p.prototype.enqueueCb.call(this, "upload", function (e) {
        e && n && n(e)
      }, o, r)
    }, f.prototype.download = function (e, t, n, o, r) {
      var i = this,
        a = {
          source: e,
          target: t,
          trustAllHosts: r
        };
      p.prototype.enqueueCb.call(this, "download", function (e) {
        e && n && n(new c.FileEntry(i.config, i.queue, i.callback, e.name, e.fullPath))
      }, o, a)
    }, f.prototype.abort = function (e, t) {
      p.prototype.enqueueCb.call(this, "abort", e, t)
    }, f.prototype._onProgress = function (e) {
      if (!e) return !1;
      if (this.onprogress) {
        var t = new l.ProgressEvent(e.total, e.loaded);
        this.onprogress(t)
      }
      return !0
    }, f.API_CLASS_ID = "applican.filesystem.filetransfer", f);

    function f(e, t, n) {
      var o = p.call(this, f.API_CLASS_ID, e, t, n) || this;
      return o.onprogress = null, p.prototype.registerCallback.call(o, "onProgress", o._onProgress.bind(o)), o
    }
    t.FileTransfer = h
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t._FileUploadOptions = function (e, t, n, o, r) {
      this.fileKey = e, this.fileName = t, this.mimeType = n, this.params = o, this.headers = r
    }
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = (r.FILE_NOT_FOUND_ERR = 1, r.INVALID_URL_ERR = 2, r.CONNECTION_ERR = 3, r.ABORT_ERR = 4, r);

    function r(e, t, n, o, r) {
      this.code = e || null, this.source = t || null, this.target = n || null, this.http_status = o || null, this.body = r || null
    }
    t.FileTransferError = o
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.FileUploadResult = function () {
      this.bytesSent = 0, this.responseCode = 0, this.response = null
    }
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.ProgressEvent = function (e, t) {
      this.total = e, this.loaded = t, this.lengthComputable = 0 < this.total
    }
  }, function (e, t, n) {
    "use strict";
    var o;
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), (o = t.LocalFileSystemType || (t.LocalFileSystemType = {}))[o.TEMPORARY = 0] = "TEMPORARY", o[o.PERSISTENT = 1] = "PERSISTENT";
    var r = (i.TEMPORARY = 0, i.PERSISTENT = 1, i);

    function i() {}
    t.LocalFileSystem = r
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c = n(0);
    (a = i || (i = {}))[a.NOT_INITIALIZED = -1] = "NOT_INITIALIZED", a[a.INVALID_ARGUMENTS = -2] = "INVALID_ARGUMENTS", a[a.UNSUPPORTED_PLATFORM = -3] = "UNSUPPORTED_PLATFORM";
    var s, u = (r(l, s = c.Base), Object.defineProperty(l.prototype, "ERROR_NOT_INITIALIZED", {
      get: function () {
        return i.NOT_INITIALIZED
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(l.prototype, "ERROR_INVALID_ARGUMENTS", {
      get: function () {
        return i.INVALID_ARGUMENTS
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(l.prototype, "ERROR_UNSUPPORTED_PLATFORM", {
      get: function () {
        return i.UNSUPPORTED_PLATFORM
      },
      enumerable: !0,
      configurable: !0
    }), l.prototype.init = function (e, t) {
      s.prototype.enqueueCb.call(this, "init", e, t)
    }, l.prototype.setMinimumSessionInterval = function (e, t, n) {
      var o = {
        interval: e
      };
      s.prototype.enqueueCb.call(this, "setMinimumSessionInterval", t, n, o)
    }, l.prototype.setSessionTimeoutInterval = function (e, t, n) {
      var o = {
        interval: e
      };
      s.prototype.enqueueCb.call(this, "setSessionTimeoutInterval", t, n, o)
    }, l.prototype.logEvent = function (e, t, n, o) {
      var r = {
        name: e,
        parameters: t
      };
      s.prototype.enqueueCb.call(this, "logEvent", n, o, r)
    }, l.prototype.setUserProperty = function (e, t, n, o) {
      var r = {
        name: e,
        value: t
      };
      s.prototype.enqueueCb.call(this, "setUserProperty", n, o, r)
    }, l.prototype.setUserID = function (e, t, n) {
      var o = {
        userID: e
      };
      s.prototype.enqueueCb.call(this, "setUserID", t, n, o)
    }, l.prototype.setScreenName = function (e, t, n) {
      var o = {
        screenName: e
      };
      s.prototype.enqueueCb.call(this, "setScreenName", t, n, o)
    }, l.prototype.getAppInstanceID = function (e, t) {
      s.prototype.enqueueCb.call(this, "getAppInstanceID", e, t)
    }, l.prototype.resetAnalyticsData = function (e, t) {
      s.prototype.enqueueCb.call(this, "resetAnalyticsData", e, t)
    }, l.API_CLASS_ID = "applican.firebaseanalytics", l);

    function l(e, t, n) {
      return s.call(this, l.API_CLASS_ID, e, t, n) || this
    }
    t.FirebaseAnalytics = u
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c = n(0);
    (a = i = t.GameSoundError || (t.GameSoundError = {}))[a.INVALID_DATA = 1] = "INVALID_DATA", a[a.ILLEGAL_TRACK = 2] = "ILLEGAL_TRACK", a[a.NOW_LOADING = 3] = "NOW_LOADING", a[a.BUSY_ERROR = 4] = "BUSY_ERROR", window.GameSoundError = i;
    var s, u = (r(l, s = c.Base), l.prototype.loadBGM = function (e, t, n) {
      var o = {
        list: e
      };
      s.prototype.enqueueCb.call(this, "loadBGM", t, n, o)
    }, l.prototype.setBGMVolume = function (e, t) {
      var n = {
        track: e,
        volume: t
      };
      s.prototype.enqueueCb.call(this, "setBGMVolume", null, null, n)
    }, l.prototype.playBGM = function (e) {
      s.prototype.enqueueCb.call(this, "playBGM", null, null, e)
    }, l.prototype.pauseBGM = function (e) {
      var t = {
        track: e
      };
      s.prototype.enqueueCb.call(this, "pauseBGM", null, null, t)
    }, l.prototype.stopBGM = function (e) {
      var t = {
        track: e
      };
      s.prototype.enqueueCb.call(this, "stopBGM", null, null, t)
    }, l.prototype.stopAllBGM = function () {
      s.prototype.enqueueCb.call(this, "stopAllBGM", null, null)
    }, l.prototype.releaseAllBGM = function () {
      s.prototype.enqueueCb.call(this, "releaseAllBGM", null, null)
    }, l.prototype.loadSE = function (e, t, n) {
      var o = {
        list: e
      };
      s.prototype.enqueueCb.call(this, "loadSE", t, n, o)
    }, l.prototype.setSEVolume = function (e, t) {
      var n = {
        track: e,
        volume: t
      };
      s.prototype.enqueueCb.call(this, "setSEVolume", null, null, n)
    }, l.prototype.playSE = function (e) {
      var t = {
        track: e
      };
      s.prototype.enqueueCb.call(this, "playSE", null, null, t)
    }, l.prototype.pauseSE = function (e) {
      var t = {
        track: e
      };
      s.prototype.enqueueCb.call(this, "pauseSE", null, null, t)
    }, l.prototype.stopSE = function (e) {
      var t = {
        track: e
      };
      s.prototype.enqueueCb.call(this, "stopSE", null, null, t)
    }, l.prototype.stopAllSE = function () {
      s.prototype.enqueueCb.call(this, "stopAllSE", null, null)
    }, l.prototype.releaseAllSE = function () {
      s.prototype.enqueueCb.call(this, "releaseAllSE", null, null)
    }, l.API_CLASS_ID = "applican.gamesound", l);

    function l(e, t, n) {
      return s.call(this, l.API_CLASS_ID, e, t, n) || this
    }
    t.GameSound = u
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.init = function (e, t) {
        i.prototype.enqueueCb.call(this, "init", e, t)
      }, s.prototype.addFence = function (e, t, n) {
        i.prototype.enqueueCb.call(this, "addFence", t, n, e)
      }, s.prototype.removeFence = function (e, t, n) {
        var o = {
          identifier: e
        };
        i.prototype.enqueueCb.call(this, "removeFence", t, n, o)
      }, s.prototype.getFences = function (e, t) {
        i.prototype.enqueueCb.call(this, "getFences", e, t)
      }, s.API_CLASS_ID = "applican.geofencing", s);

    function s(e, t, n) {
      return i.call(this, s.API_CLASS_ID, e, t, n) || this
    }
    t.Geofencing = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c = n(0);
    (a = i = t.PositionError || (t.PositionError = {})).PERMISSION_DENIED = "PERMISSION_DENIED", a.POSITION_UNAVAILABLE = "POSITION_UNAVAILABLE", a.TIMEOUT = "TIMEOUT", a.POSITION_BUSY_ERR = "POSITION_BUSY_ERR", window.PositionError = i;
    var s, u = (r(l, s = c.Base), l.prototype.getCurrentPosition = function (e, t, n) {
      s.prototype.enqueueCb.call(this, "getCurrentPosition", e, t, n)
    }, l.prototype.watchPosition = function (e, t, n) {
      var o = (n = n || {}) || {};
      return o.watchId = this.currentWatchId, o.frequency = o.frequency || 1e3, s.prototype.enqueueCb.call(this, "watchPosition", e, t, o), this.watchCb[this.currentWatchId] = e, this.currentWatchId++
    }, l.prototype.clearWatch = function (e) {
      var t = {
        watchId: e
      };
      this.watchCb[e] && delete this.watchCb[e], s.prototype.enqueueCb.call(this, "clearWatch", null, null, t)
    }, l.prototype.onWatchPosition = function (e) {
      return !(!e || void 0 === e.id || !this.watchCb[e.id] || (this.watchCb[e.id](e), 0))
    }, l.API_CLASS_ID = "applican.geolocation", l);

    function l(e, t, n) {
      var o = s.call(this, l.API_CLASS_ID, e, t, n) || this;
      return o.currentWatchId = 0, o.watchCb = {}, s.prototype.registerCallback.call(o, "onWatchPosition", o.onWatchPosition.bind(o)), o
    }
    t.Geolocation = u
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c, s, u, l, p, h, f, y, _, d, b, C, E, g, P, v, O, I, A, S, m, R, T, L, N, w = n(0),
      D = n(1);
    (a = i = t.GFPGPSGeofencingLocationUpdateFrequency || (t.GFPGPSGeofencingLocationUpdateFrequency = {}))[a.GFPGPSGeofencingLocationUpdateFrequencyHigh = 0] = "GFPGPSGeofencingLocationUpdateFrequencyHigh", a[a.GFPGPSGeofencingLocationUpdateFrequencyLow = 1] = "GFPGPSGeofencingLocationUpdateFrequencyLow", (s = c = t.GFPFetchingDataSettings || (t.GFPFetchingDataSettings = {}))[s.GFPFetchingDataSettingsPriorityCache = 0] = "GFPFetchingDataSettingsPriorityCache", s[s.GFPFetchingDataSettingsPriorityNetwork = 1] = "GFPFetchingDataSettingsPriorityNetwork", s[s.GFPFetchingDataSettingsOnlyCache = 2] = "GFPFetchingDataSettingsOnlyCache", s[s.GFPFetchingDataSettingsOnlyNetwork = 3] = "GFPFetchingDataSettingsOnlyNetwork", (l = u = t.GFPMonitoringEnabledType || (t.GFPMonitoringEnabledType = {}))[l.GFPMonitoringTypeDisable = 0] = "GFPMonitoringTypeDisable", l[l.GFPMonitoringEnabledGPS = 1] = "GFPMonitoringEnabledGPS", l[l.GFPMonitoringEnabledWifi = 2] = "GFPMonitoringEnabledWifi", l[l.GFPMonitoringEnabledBeacon = 4] = "GFPMonitoringEnabledBeacon", l[l.GFPMonitoringEnabledUbiquitous = 8] = "GFPMonitoringEnabledUbiquitous", l[l.GFPMonitoringEnabledAll = 15] = "GFPMonitoringEnabledAll", (h = p = t.GFPBeaconMonitoringScheduleType || (t.GFPBeaconMonitoringScheduleType = {}))[h.GFPBeaconMonitoringScheduleTypeOnStartService = 0] = "GFPBeaconMonitoringScheduleTypeOnStartService", h[h.GFPBeaconMonitoringScheduleTypeOnEnterGeoArea = 1] = "GFPBeaconMonitoringScheduleTypeOnEnterGeoArea", h[h.GFPBeaconMonitoringScheduleTypeNone = 2] = "GFPBeaconMonitoringScheduleTypeNone", (y = f = t.GFPSendingLogScheduleType || (t.GFPSendingLogScheduleType = {}))[y.GFPSendingLogScheduleTypeSendImmediate = 0] = "GFPSendingLogScheduleTypeSendImmediate", y[y.GFPSendingLogScheduleTypeUserInterval = 1] = "GFPSendingLogScheduleTypeUserInterval", y[y.GFPSendingLogScheduleTypeNone = 2] = "GFPSendingLogScheduleTypeNone", (d = _ = t.GFPErrorType || (t.GFPErrorType = {}))[d.GFPErrorTypeNotAuthorized = 0] = "GFPErrorTypeNotAuthorized", d[d.GFPErrorTypeNoNetworkConnection = 1] = "GFPErrorTypeNoNetworkConnection", d[d.GFPErrorTypeWifiObserverAlreadyStarted = 2] = "GFPErrorTypeWifiObserverAlreadyStarted", d[d.GFPErrorTypeAppAuthorizationAppIdInvalid = 3] = "GFPErrorTypeAppAuthorizationAppIdInvalid", d[d.GFPErrorTypeUserPermissionDeny = 4] = "GFPErrorTypeUserPermissionDeny", d[d.GFPErrorTypeServerAuthroizedFailed = 5] = "GFPErrorTypeServerAuthroizedFailed", d[d.GFPErrorTypeServerResponseTimedout = 6] = "GFPErrorTypeServerResponseTimedout", d[d.GFPErrorTypeServerUnknownError = 7] = "GFPErrorTypeServerUnknownError", d[d.GFPErrorTypeInvalidLocationAttribute = 8] = "GFPErrorTypeInvalidLocationAttribute", d[d.GFPErrorTypeInvalidArgument = 9] = "GFPErrorTypeInvalidArgument", d[d.GFPErrorTypeInvalidState = 10] = "GFPErrorTypeInvalidState", d[d.GFPErrorTypeLocationServicePermissionDeny = 11] = "GFPErrorTypeLocationServicePermissionDeny", d[d.GFPErrorTypeLocationServiceUnknownError = 12] = "GFPErrorTypeLocationServiceUnknownError", d[d.GFPErrorTypeBeaconMonitoringFailed = 13] = "GFPErrorTypeBeaconMonitoringFailed", d[d.GFPErrorTypeBeaconRangingFailed = 14] = "GFPErrorTypeBeaconRangingFailed", d[d.GFPErrorTypeNoBeaconsInGPSPoint = 15] = "GFPErrorTypeNoBeaconsInGPSPoint", d[d.GFPErrorTypeNoBeaconsInGeoArea = 16] = "GFPErrorTypeNoBeaconsInGeoArea", d[d.GFPErrorTypeExpiredCacheError = 17] = "GFPErrorTypeExpiredCacheError", d[d.GFPErrorTypeFetchingCacheError = 18] = "GFPErrorTypeFetchingCacheError", d[d.GFPErrorTypeFailedToFetchAllBeaconPoints = 19] = "GFPErrorTypeFailedToFetchAllBeaconPoints", d[d.GFPErrorTypeFailedToFetchAllWifiPoints = 20] = "GFPErrorTypeFailedToFetchAllWifiPoints", d[d.GFPErrorTypeFailedToFetchAllUbiquitousPoints = 21] = "GFPErrorTypeFailedToFetchAllUbiquitousPoints", d[d.GFPErrorTypeUnknown = 22] = "GFPErrorTypeUnknown", (C = b = t.GpsGeofencingSettings || (t.GpsGeofencingSettings = {}))[C.LOCATION_REQUEST_INTERVAL_HIGH_ACCURACY_IN_MILLIS = 6e4] = "LOCATION_REQUEST_INTERVAL_HIGH_ACCURACY_IN_MILLIS", C[C.LOCATION_REQUEST_INTERVAL_MIDDLE_ACCURACY_IN_MILLIS = 3e5] = "LOCATION_REQUEST_INTERVAL_MIDDLE_ACCURACY_IN_MILLIS", C[C.LOCATION_REQUEST_INTERVAL_LOW_ACCURACY_IN_MILLIS = 9e5] = "LOCATION_REQUEST_INTERVAL_LOW_ACCURACY_IN_MILLIS", (g = E = t.WifiGeofencingSettings || (t.WifiGeofencingSettings = {}))[g.GFPWifiGeofencingScanIntervalHigh = 10] = "GFPWifiGeofencingScanIntervalHigh", g[g.GFPWifiGeofencingScanIntervalMiddle = 60] = "GFPWifiGeofencingScanIntervalMiddle", g[g.GFPWifiGeofencingScanIntervalLow = 300] = "GFPWifiGeofencingScanIntervalLow", (v = P = t.BeaconGenreBulkFetchGeofencing || (t.BeaconGenreBulkFetchGeofencing = {}))[v.TARGET_NONE = 0] = "TARGET_NONE", v[v.TARGET_UBIQUITOUS = 1] = "TARGET_UBIQUITOUS", v[v.TARGET_TRACKR = 2] = "TARGET_TRACKR", (I = O = t.BeaconGeofencingSettings || (t.BeaconGeofencingSettings = {}))[I.GFPBeaconGeofencingScanIntervalHigh = 10] = "GFPBeaconGeofencingScanIntervalHigh", I[I.GFPBeaconGeofencingScanIntervalMiddle = 60] = "GFPBeaconGeofencingScanIntervalMiddle", I[I.GFPBeaconGeofencingScanIntervalLow = 300] = "GFPBeaconGeofencingScanIntervalLow", I[I.GFPBLEBeaconGeofencingScanIntervalHigh = 1.5] = "GFPBLEBeaconGeofencingScanIntervalHigh", I[I.GFPBLEBeaconGeofencingScanIntervalMiddle = 60] = "GFPBLEBeaconGeofencingScanIntervalMiddle", I[I.GFPBLEBeaconGeofencingScanIntervalLow = 300] = "GFPBLEBeaconGeofencingScanIntervalLow", (S = A = t.BeaconGeofencing || (t.BeaconGeofencing = {}))[S.TARGET_IBEACON = 1] = "TARGET_IBEACON", S[S.TARGET_UBIQUITOUS = 2] = "TARGET_UBIQUITOUS", (R = m = t.GeoplaEventType || (t.GeoplaEventType = {})).ENTER = "ENTER", R.EXIT = "EXIT", R.RANGING = "RANGING", R.ALL = "ALL", (L = T = t.GeoplaEventAction || (t.GeoplaEventAction = {})).HTTP_GET = "HTTP_GET", L.HTTP_POST = "HTTP_POST", L.HTTP_PUT = "HTTP_PUT", L.HTTP_DELETE = "HTTP_DELETE", (N = t.GFPIBeaconProximity || (t.GFPIBeaconProximity = {}))[N.GFPIBeaconProximityUnknown = 0] = "GFPIBeaconProximityUnknown", N[N.GFPIBeaconProximityImmediate = 1] = "GFPIBeaconProximityImmediate", N[N.GFPIBeaconProximityNear = 2] = "GFPIBeaconProximityNear", N[N.GFPIBeaconProximityFar = 3] = "GFPIBeaconProximityFar", window.BeaconGenreBulkFetchGeofencing = P, window.BeaconGeofencing = A, window.BeaconGeofencingSettings = O, window.GeoplaEventAction = T, window.GeoplaEventType = m, window.GFPBeaconMonitoringScheduleType = p, window.GFPErrorType = _, window.GFPFetchingDataSettings = c, window.GFPGPSGeofencingLocationUpdateFrequency = i, window.GFPMonitoringEnabledType = u, window.GFPSendingLogScheduleType = f, window.GpsGeofencingSettings = b, window.WifiGeofencingSettings = E;
    var F, G = (r(k, F = w.Base), k.prototype.init = function (e, t, n) {
      this.geoplaCallback = e, F.prototype.enqueueCb.call(this, "init", t, n)
    }, k.prototype.showTermsOfService = function (e, t) {
      F.prototype.enqueueCb.call(this, "showTermsOfService", e, t)
    }, k.prototype.getTermsOfServiceVersion = function (e, t) {
      F.prototype.enqueueCb.call(this, "getTermsOfServiceVersion", e, t)
    }, k.prototype.clearCache = function (e, t) {
      F.prototype.enqueueCb.call(this, "clearCache", e, t)
    }, k.prototype.getVersion = function (e, t) {
      F.prototype.enqueueCb.call(this, "getVersion", e, t)
    }, k.prototype.getClientId = function (e, t) {
      F.prototype.enqueueCb.call(this, "getClientId", e, t)
    }, k.prototype.getGenres = function (e, t) {
      F.prototype.enqueueCb.call(this, "getGenres", e, t)
    }, k.prototype.getSSID = function (e, t) {
      F.prototype.enqueueCb.call(this, "getSSID", e, t)
    }, k.prototype.setExternalParameters = function (e, t, n) {
      F.prototype.enqueueCb.call(this, "setExternalParameters", t, n, e)
    }, k.prototype.setSendingLogScheduleType = function (e, t, n, o) {
      var r = {
        type: e,
        interval: t
      };
      F.prototype.enqueueCb.call(this, "setSendingLogScheduleType", n, o, r)
    }, k.prototype.sendLog = function (e, t) {
      F.prototype.enqueueCb.call(this, "sendLog", e, t)
    }, k.prototype.startGpsMeshGeofencing = function (e, t, n) {
      F.prototype.enqueueCb.call(this, "startGpsMeshGeofencing", t, n, e)
    }, k.prototype.stopGpsMeshGeofencing = function (e, t) {
      F.prototype.enqueueCb.call(this, "stopGpsMeshGeofencing", e, t)
    }, k.prototype.startGpsGenreGeofencing = function (e, t, n) {
      F.prototype.enqueueCb.call(this, "startGpsGenreGeofencing", t, n, e)
    }, k.prototype.stopGpsGenreGeofencing = function (e, t) {
      F.prototype.enqueueCb.call(this, "stopGpsGenreGeofencing", e, t)
    }, k.prototype.startWifiGenreGeofencing = function (e, t, n) {
      F.prototype.enqueueCb.call(this, "startWifiGenreGeofencing", t, n, e)
    }, k.prototype.stopWifiGenreGeofencing = function (e, t) {
      F.prototype.enqueueCb.call(this, "stopWifiGenreGeofencing", e, t)
    }, k.prototype.startWifiNearbyGeofencing = function (e, t, n) {
      F.prototype.enqueueCb.call(this, "startWifiNearbyGeofencing", t, n, e)
    }, k.prototype.stopWifiNearbyGeofencing = function (e, t) {
      F.prototype.enqueueCb.call(this, "stopWifiNearbyGeofencing", e, t)
    }, k.prototype.startBeaconGenreGeofencing = function (e, t, n) {
      F.prototype.enqueueCb.call(this, "startBeaconGenreGeofencing", t, n, e)
    }, k.prototype.stopBeaconGenreGeofencing = function (e, t) {
      F.prototype.enqueueCb.call(this, "stopBeaconGenreGeofencing", e, t)
    }, k.prototype.startIBeaconGenreGeofencing = function (e, t, n) {
      F.prototype.enqueueCb.call(this, "startIBeaconGenreGeofencing", t, n, e)
    }, k.prototype.stopIBeaconGenreGeofencing = function (e, t) {
      F.prototype.enqueueCb.call(this, "stopIBeaconGenreGeofencing", e, t)
    }, k.prototype.startBLEBeaconGenreGeofencing = function (e, t, n) {
      F.prototype.enqueueCb.call(this, "startBLEBeaconGenreGeofencing", t, n, e)
    }, k.prototype.stopBLEBeaconGenreGeofencing = function (e, t) {
      F.prototype.enqueueCb.call(this, "stopBLEBeaconGenreGeofencing", e, t)
    }, k.prototype.changeLocationUpdateFrequency = function (e, t, n) {
      var o = {
        interval: e
      };
      F.prototype.enqueueCb.call(this, "changeLocationUpdateFrequency", t, n, o)
    }, k.prototype.startGpsV1Geofencing = function (e, t, n) {
      F.prototype.enqueueCb.call(this, "startGpsV1Geofencing", t, n, e)
    }, k.prototype.stopGpsV1Geofencing = function (e, t) {
      F.prototype.enqueueCb.call(this, "stopGpsV1Geofencing", e, t)
    }, k.prototype.startWifiV1Geofencing = function (e, t, n) {
      F.prototype.enqueueCb.call(this, "startWifiV1Geofencing", t, n, e)
    }, k.prototype.stopWifiV1Geofencing = function (e, t) {
      F.prototype.enqueueCb.call(this, "stopWifiV1Geofencing", e, t)
    }, k.prototype.startBeaconV1Geofencing = function (e, t, n) {
      F.prototype.enqueueCb.call(this, "startBeaconV1Geofencing", t, n, e)
    }, k.prototype.stopBeaconV1Geofencing = function (e, t) {
      F.prototype.enqueueCb.call(this, "stopBeaconV1Geofencing", e, t)
    }, k.prototype.startIBeaconV1Geofencing = function (e, t, n) {
      F.prototype.enqueueCb.call(this, "startIBeaconV1Geofencing", t, n, e)
    }, k.prototype.stopIBeaconV1Geofencing = function (e, t) {
      F.prototype.enqueueCb.call(this, "stopIBeaconV1Geofencing", e, t)
    }, k.prototype.startBLEBeaconV1Geofencing = function (e, t, n) {
      F.prototype.enqueueCb.call(this, "startBLEBeaconV1Geofencing", t, n, e)
    }, k.prototype.stopBLEBeaconV1Geofencing = function (e, t) {
      F.prototype.enqueueCb.call(this, "stopBLEBeaconV1Geofencing", e, t)
    }, k.prototype.startLogSender = function (e, t, n) {
      var o = {
        interval: e
      };
      F.prototype.enqueueCb.call(this, "startLogSender", t, n, o)
    }, k.prototype.stopLogSender = function (e, t) {
      F.prototype.enqueueCb.call(this, "stopLogSender", e, t)
    }, k.prototype.onDidEnterWithEvent = function (e) {
      return !(!this.geoplaCallback || !this.geoplaCallback.didEnterWithEvent || (D.isFunction(this.geoplaCallback.didEnterWithEvent) && this.geoplaCallback.didEnterWithEvent(e), 0))
    }, k.prototype.onDidExitWithEvent = function (e) {
      return !(!this.geoplaCallback || !this.geoplaCallback.didExitWithEvent || (D.isFunction(this.geoplaCallback.didExitWithEvent) && this.geoplaCallback.didExitWithEvent(e), 0))
    }, k.prototype.onDidFailWithError = function (e) {
      return !(!this.geoplaCallback || !this.geoplaCallback.didFailWithError || (D.isFunction(this.geoplaCallback.didFailWithError) && this.geoplaCallback.didFailWithError(e), 0))
    }, k.prototype.onDidRangeWithBeaconEvent = function (e) {
      return !(!this.geoplaCallback || !this.geoplaCallback.didRangeWithBeaconEvent || (D.isFunction(this.geoplaCallback.didRangeWithBeaconEvent) && this.geoplaCallback.didRangeWithBeaconEvent(e), 0))
    }, k.prototype.onDidEnterWithGpsEvent = function (e) {
      return !(!this.geoplaCallback || !this.geoplaCallback.didEnterWithGpsEvent || (D.isFunction(this.geoplaCallback.didEnterWithGpsEvent) && this.geoplaCallback.didEnterWithGpsEvent(e), 0))
    }, k.prototype.onDidExitWithGpsEvent = function (e) {
      return !(!this.geoplaCallback || !this.geoplaCallback.didExitWithGpsEvent || (D.isFunction(this.geoplaCallback.didExitWithGpsEvent) && this.geoplaCallback.didExitWithGpsEvent(e), 0))
    }, k.prototype.onDidEnterWithWifiEvent = function (e) {
      return !(!this.geoplaCallback || !this.geoplaCallback.didEnterWithWifiEvent || (D.isFunction(this.geoplaCallback.didEnterWithWifiEvent) && this.geoplaCallback.didEnterWithWifiEvent(e), 0))
    }, k.prototype.onDidExitWithWifiEvent = function (e) {
      return !(!this.geoplaCallback || !this.geoplaCallback.didExitWithWifiEvent || (D.isFunction(this.geoplaCallback.didExitWithWifiEvent) && this.geoplaCallback.didExitWithWifiEvent(e), 0))
    }, k.prototype.onDidEnterWithBeaconEvent = function (e) {
      return !(!this.geoplaCallback || !this.geoplaCallback.didEnterWithBeaconEvent || (D.isFunction(this.geoplaCallback.didEnterWithBeaconEvent) && this.geoplaCallback.didEnterWithBeaconEvent(e), 0))
    }, k.prototype.onDidExitWithBeaconEvent = function (e) {
      return !(!this.geoplaCallback || !this.geoplaCallback.didExitWithBeaconEvent || (D.isFunction(this.geoplaCallback.didExitWithBeaconEvent) && this.geoplaCallback.didExitWithBeaconEvent(e), 0))
    }, k.API_CLASS_ID = "applican.geopla", k);

    function k(e, t, n) {
      var o = F.call(this, k.API_CLASS_ID, e, t, n) || this;
      for (var r in o.geoplaCallback = null, o.registeredCallbacks = {
          didEnterWithEvent: o.onDidEnterWithEvent,
          didExitWithEvent: o.onDidExitWithEvent,
          didFailWithError: o.onDidFailWithError,
          didRangeWithBeaconEvent: o.onDidRangeWithBeaconEvent,
          didEnterWithGpsEvent: o.onDidEnterWithGpsEvent,
          didExitWithGpsEvent: o.onDidExitWithGpsEvent,
          didEnterWithWifiEvent: o.onDidEnterWithWifiEvent,
          didExitWithWifiEvent: o.onDidExitWithWifiEvent,
          didEnterWithBeaconEvent: o.onDidEnterWithBeaconEvent,
          didExitWithBeaconEvent: o.onDidExitWithBeaconEvent
        }, o.registeredCallbacks) r && F.prototype.registerCallback.call(o, r, o.registeredCallbacks[r].bind(o));
      return o
    }
    t.Geopla = G
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.showGeopopList = function (e, t) {
        i.prototype.enqueueCb.call(this, "showGeopopList", e, t)
      }, s.prototype.startGpsMeshGeofencing = function (e, t, n) {
        i.prototype.enqueueCb.call(this, "startGpsMeshGeofencing", t, n, e)
      }, s.prototype.startWifiGenreGeofencing = function (e, t, n) {
        i.prototype.enqueueCb.call(this, "startWifiGenreGeofencing", t, n, e)
      }, s.prototype.startIBeaconGenreGeofencing = function (e, t, n) {
        i.prototype.enqueueCb.call(this, "startIBeaconGenreGeofencing", t, n, e)
      }, s.prototype.stopGpsMeshGeofencing = function (e, t) {
        i.prototype.enqueueCb.call(this, "stopGpsMeshGeofencing", e, t)
      }, s.prototype.stopWifiGenreGeofencing = function (e, t) {
        i.prototype.enqueueCb.call(this, "stopWifiGenreGeofencing", e, t)
      }, s.prototype.stopIBeaconGenreGeofencing = function (e, t) {
        i.prototype.enqueueCb.call(this, "stopIBeaconGenreGeofencing", e, t)
      }, s.API_CLASS_ID = "applican.geopop", s);

    function s(e, t, n) {
      return i.call(this, s.API_CLASS_ID, e, t, n) || this
    }
    t.Geopop = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c = n(0);
    (a = i = t.GlobalizationError || (t.GlobalizationError = {}))[a.UNKNOWN_ERROR = 0] = "UNKNOWN_ERROR", a[a.FORMATTING_ERROR = 1] = "FORMATTING_ERROR", a[a.PARSING_ERROR = 2] = "PARSING_ERROR", a[a.PATTERN_ERROR = 3] = "PATTERN_ERROR", a[a.BUSY_ERROR = 30] = "BUSY_ERROR", window.GlobalizationError = i;
    var s, u = (r(l, s = c.Base), l.prototype.getPreferredLanguage = function (e, t) {
      s.prototype.enqueueCb.call(this, "getPreferredLanguage", e, t)
    }, l.prototype.getLocaleName = function (e, t) {
      s.prototype.enqueueCb.call(this, "getLocaleName", e, t)
    }, l.prototype.getCountry = function (e, t) {
      s.prototype.enqueueCb.call(this, "getCountry", e, t)
    }, l.prototype.dateToString = function (e, t, n) {
      var o = {
        date: e.getTime() / 1e3
      };
      s.prototype.enqueueCb.call(this, "dateToString", t, n, o)
    }, l.API_CLASS_ID = "applican.globalization", l);

    function l(e, t, n) {
      return s.call(this, l.API_CLASS_ID, e, t, n) || this
    }
    t.Globalization = u
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var c, i = n(0),
      a = (r(s, c = i.Base), s.prototype.trackView = function (e, t, n) {
        var o = {
          screen: e
        };
        c.prototype.enqueueCb.call(this, "trackView", t, n, o)
      }, s.prototype.trackEvent = function (e, t, n, o, r, i) {
        var a = {
          category: e,
          action: t,
          label: n,
          value: o
        };
        c.prototype.enqueueCb.call(this, "trackEvent", r, i, a)
      }, s.API_CLASS_ID = "applican.googleanalytics", s);

    function s(e, t, n) {
      return c.call(this, s.API_CLASS_ID, e, t, n) || this
    }
    t.GoogleAnalytics = a
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.get = function (e, t, n, o) {
        var r = t = t || {};
        r.url = e, i.prototype.enqueueCb.call(this, "get", n, o, r)
      }, s.prototype.post = function (e, t, n, o) {
        var r = t = t || {};
        r.url = e, i.prototype.enqueueCb.call(this, "post", n, o, r)
      }, s.API_CLASS_ID = "applican.http", s);

    function s(e, t, n) {
      return i.call(this, s.API_CLASS_ID, e, t, n) || this
    }
    t.Http = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.watchKeyDown = function (t) {
        this.watchKeyDownCallback = function (e) {
          t && t(e)
        }, i.prototype.enqueueCb.call(this, "watchKeyDown", t, null)
      }, s.prototype.clearWatchKeyDown = function () {
        this.watchKeyDownCallback = null, i.prototype.enqueueCb.call(this, "clearWatchKeyDown", null, null)
      }, s.prototype.watchKeyUp = function (t) {
        this.watchKeyUpCallback = function (e) {
          t && t(e)
        }, i.prototype.enqueueCb.call(this, "watchKeyUp", t, null)
      }, s.prototype.clearWatchKeyUp = function () {
        this.watchKeyUpCallback = null, i.prototype.enqueueCb.call(this, "clearWatchKeyUp", null, null)
      }, s.prototype.onKeyDown = function (e) {
        return !!e && (this.watchKeyDownCallback && this.watchKeyDownCallback(e), !0)
      }, s.prototype.onKeyUp = function (e) {
        return !!e && (this.watchKeyUpCallback && this.watchKeyUpCallback(e), !0)
      }, s.API_CLASS_ID = "applican.keyboard", s);

    function s(e, t, n) {
      var o = i.call(this, s.API_CLASS_ID, e, t, n) || this;
      return o.watchKeyDownCallback = null, o.watchKeyUpCallback = null, o.registerCallback("onKeyUp", o.onKeyUp.bind(o)), o.registerCallback("onKeyDown", o.onKeyDown.bind(o)), o
    }
    t.Keyboard = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c, s, u, l = n(0);
    (a = i = t.LauncherError || (t.LauncherError = {})).BUSY_ERROR = "BUSY_ERROR", a.NOT_FOUND = "NOT_FOUND", (s = c = t.LauncherWebViewTransitionStyle || (t.LauncherWebViewTransitionStyle = {})).COVER = "cover", s.FLIP = "flip", s.CURL = "curl", s.CROSS = "cross", (u = t.LauncherWebViewToolbarPosition || (t.LauncherWebViewToolbarPosition = {})).TOP = "top", u.BOTTOM = "bottom", window.LauncherError = i;
    var p, h = (r(f, p = l.Base), f.prototype.urlScheme = function (e, t) {
      var n = {
        url: e
      };
      p.prototype.enqueueCb.call(this, "urlScheme", null, t, n)
    }, f.prototype.webview = function (e, t, n) {
      var o = t || {};
      o.url = e, o.transitionStyle = o.transitionStyle || c.COVER, p.prototype.enqueueCb.call(this, "webview", null, n || null, o)
    }, f.API_CLASS_ID = "applican.launcher", f);

    function f(e, t, n) {
      return p.call(this, f.API_CLASS_ID, e, t, n) || this
    }
    t.Launcher = h
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c = n(0);
    (a = i = t.LocalNotificationError || (t.LocalNotificationError = {})).ILLEGAL_PARAMETER = "ILLEGAL_PARAMETER", a.NOTIFICATIO_BUSY_ERR = "NOTIFICATIO_BUSY_ERR", a.NOT_ALLOWED = "NOT_ALLOWED", window.LocalNotificationError = i;
    var s, u = (r(l, s = c.Base), l.prototype.schedule = function (e, t, n) {
      s.prototype.enqueueCb.call(this, "schedule", e, t, n)
    }, l.prototype.cancel = function (e) {
      s.prototype.enqueueCb.call(this, "cancel", null, null, e)
    }, l.prototype.allCancel = function () {
      s.prototype.enqueueCb.call(this, "allCancel", null, null)
    }, l.prototype.getBadgeNum = function (e) {
      s.prototype.enqueueCb.call(this, "getBadgeNum", e, null)
    }, l.prototype.setBadgeNum = function (e) {
      var t = {
        num: e
      };
      s.prototype.enqueueCb.call(this, "setBadgeNum", null, null, t)
    }, l.API_CLASS_ID = "applican.localnotification", l);

    function l(e, t, n) {
      return s.call(this, l.API_CLASS_ID, e, t, n) || this
    }
    t.LocalNotification = u
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.getEid = function (e, t) {
        i.prototype.enqueueCb.call(this, "getEid", e, t)
      }, s.API_CLASS_ID = "applican.livepass", s);

    function s(e, t, n) {
      return i.call(this, s.API_CLASS_ID, e, t, n) || this
    }
    t.Livepass = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
        return (o = Object.setPrototypeOf || {
            __proto__: []
          }
          instanceof Array && function (e, t) {
            e.__proto__ = t
          } || function (e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
          })(e, t)
      }, function (e, t) {
        function n() {
          this.constructor = e
        }
        o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
      }),
      u = this && this.__assign || function () {
        return (u = Object.assign || function (e) {
          for (var t, n = 1, o = arguments.length; n < o; n++)
            for (var r in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          return e
        }).apply(this, arguments)
      };
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c, s, l, p, h, f, y = n(0),
      _ = n(1);
    (a = i || (i = {}))[a.STANDARD = 1] = "STANDARD", a[a.SATELLITE = 2] = "SATELLITE", a[a.TERRAIN = 3] = "TERRAIN", a[a.HYBRID = 4] = "HYBRID", a[a.SATELLITE_FLYOVER = 5] = "SATELLITE_FLYOVER", a[a.HYBRID_FLYOVER = 6] = "HYBRID_FLYOVER", a[a.MUTED_STANDARD = 7] = "MUTED_STANDARD", (s = c || (c = {}))[s.NONE = 0] = "NONE", s[s.LOW = 1] = "LOW", s[s.MEDIUM = 2] = "MEDIUM", s[s.HIGH = 3] = "HIGH", (p = l || (l = {}))[p.INVALID_API_KEY = -1] = "INVALID_API_KEY", p[p.MAP_NOT_SHOWN = -2] = "MAP_NOT_SHOWN", p[p.INVALID_ARGUMENTS = -3] = "INVALID_ARGUMENTS", p[p.USER_LOCATION_DENIED = -4] = "USER_LOCATION_DENIED", (f = h || (h = {}))[f.NONE = 0] = "NONE", f[f.FOLLOW = 1] = "FOLLOW", f[f.FOLLOW_WITH_HEADING = 2] = "FOLLOW_WITH_HEADING";
    var d, b = (r(C, d = y.Base), C.parseClientPercent = function (e, t) {
      if ("string" == typeof e) {
        var n = _.parsePercent(e);
        if (n) return t * n;
        if (n = parseFloat(e), _.isNumber(n)) return n
      }
      return 0
    }, Object.defineProperty(C.prototype, "MAP_TYPE_STANDARD", {
      get: function () {
        return i.STANDARD
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(C.prototype, "MAP_TYPE_SATELLITE", {
      get: function () {
        return i.SATELLITE
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(C.prototype, "MAP_TYPE_TERRAIN", {
      get: function () {
        return i.TERRAIN
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(C.prototype, "MAP_TYPE_HYBRID", {
      get: function () {
        return i.HYBRID
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(C.prototype, "MAP_TYPE_SATELLITE_FLYOVER", {
      get: function () {
        return i.SATELLITE_FLYOVER
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(C.prototype, "MAP_TYPE_HYBRID_FLYOVER", {
      get: function () {
        return i.HYBRID_FLYOVER
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(C.prototype, "MAP_TYPE_MUTED_STANDARD", {
      get: function () {
        return i.MUTED_STANDARD
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(C.prototype, "ACCURACY_NONE", {
      get: function () {
        return c.NONE
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(C.prototype, "ACCURACY_LOW", {
      get: function () {
        return c.LOW
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(C.prototype, "ACCURACY_MEDIUM", {
      get: function () {
        return c.MEDIUM
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(C.prototype, "ACCURACY_HIGH", {
      get: function () {
        return c.HIGH
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(C.prototype, "TRACKING_MODE_NONE", {
      get: function () {
        return h.NONE
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(C.prototype, "TRACKING_MODE_FOLLOW", {
      get: function () {
        return h.FOLLOW
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(C.prototype, "TRACKING_MODE_FOLLOW_WITH_HEADING", {
      get: function () {
        return h.FOLLOW_WITH_HEADING
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(C.prototype, "ERROR_INVALID_API_KEY", {
      get: function () {
        return l.INVALID_API_KEY
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(C.prototype, "ERROR_MAP_NOT_SHOWN", {
      get: function () {
        return l.MAP_NOT_SHOWN
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(C.prototype, "ERROR_INVALID_ARGUMENTS", {
      get: function () {
        return l.INVALID_ARGUMENTS
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(C.prototype, "ERROR_USER_LOCATION_DENIED", {
      get: function () {
        return l.USER_LOCATION_DENIED
      },
      enumerable: !0,
      configurable: !0
    }), C.prototype.show = function () {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
      4 === e.length ? this.showInternal(e[0], e[1], e[2], e[3]) : 3 === e.length && this.showInternal(e[0], 0, e[1], e[2])
    }, C.prototype.hide = function (e, t) {
      this.cameraPositionWillChangeCb = null, this.cameraPositionChangedCb = null, this.userLocationChangedCb = null, this.markerClickedCb = null, this.markerPopupClickedCb = null, this.mapClickedCb = null, this.mapLongClickedCb = null, this.currentPositionClickedCb = null, d.prototype.enqueueCb.call(this, "hide", e, t)
    }, C.prototype.setCameraPosition = function (e, t, n, o) {
      var r = {
        cameraPosition: e,
        duration: t
      };
      d.prototype.enqueueCb.call(this, "setCameraPosition", n, o, r)
    }, C.prototype.getCameraPosition = function (e, t) {
      d.prototype.enqueueCb.call(this, "getCameraPosition", e, t)
    }, C.prototype.getRegion = function (e, t) {
      d.prototype.enqueueCb.call(this, "getRegion", e, t)
    }, C.prototype.addMarkers = function (e, t, n) {
      var o = 0,
        r = 0;
      document.documentElement && (document.documentElement.clientWidth && (o = document.documentElement.clientWidth), document.documentElement.clientHeight && (r = document.documentElement.clientHeight));
      var i = {
        markers: e,
        clientWidth: o,
        clientHeight: r
      };
      d.prototype.enqueueCb.call(this, "addMarkers", t, n, i)
    }, C.prototype.getMarkers = function (e, t) {
      var n = 0,
        o = 0;
      document.documentElement && (document.documentElement.clientWidth && (n = document.documentElement.clientWidth), document.documentElement.clientHeight && (o = document.documentElement.clientHeight));
      var r = {
        clientWidth: n,
        clientHeight: o
      };
      d.prototype.enqueueCb.call(this, "getMarkers", e, t, r)
    }, C.prototype.removeMarkers = function (e, t, n) {
      var o = {
        identifiers: e
      };
      d.prototype.enqueueCb.call(this, "removeMarkers", t, n, o)
    }, C.prototype.removeAllMarkers = function (e, t) {
      d.prototype.enqueueCb.call(this, "removeAllMarkers", e, t)
    }, C.prototype.showInternal = function (e, t, n, o) {
      this.cameraPositionWillChangeCb = e.onCameraPositionWillChange || null, this.cameraPositionChangedCb = e.onCameraPositionChanged || null, this.userLocationChangedCb = e.onUserLocationChanged || null, this.markerClickedCb = e.onMarkerClicked || null, this.markerPopupClickedCb = e.onMarkerPopupClicked || null, this.mapClickedCb = e.onMapClicked || null, this.mapLongClickedCb = e.onMapLongClicked || null, this.currentPositionClickedCb = e.onCurrentPositionButtonClicked || null;
      var r = 0,
        i = 0;
      document.documentElement && (document.documentElement.clientWidth && (r = document.documentElement.clientWidth), document.documentElement.clientHeight && (i = document.documentElement.clientHeight));
      var a = e.position || {},
        c = e.margin || {};
      a.x || (c.left = C.parseClientPercent(c.left, r) || 0, c.right = C.parseClientPercent(c.right, r) || 0, a.x = c.left, a.width = r - a.x - c.right), a.width = a.width || r, a.y || (c.top = C.parseClientPercent(c.top, i) || 0, c.bottom = C.parseClientPercent(c.bottom, i) || 0, a.y = c.top, a.height = i - a.y - c.bottom), a.height = a.height || i;
      var s = u({}, e, {
        position: a,
        duration: t || 0,
        clientWidth: r,
        clientHeight: i
      });
      d.prototype.enqueueCb.call(this, "show", n, o, s)
    }, C.prototype.onCameraPositionWillChange = function (e) {
      if (this.cameraPositionWillChangeCb) {
        if (!_.isFunction(this.cameraPositionWillChangeCb)) return !1;
        this.cameraPositionWillChangeCb(e)
      }
      return !0
    }, C.prototype.onCameraPositionChanged = function (e) {
      if (this.cameraPositionChangedCb) {
        if (!_.isFunction(this.cameraPositionChangedCb)) return !1;
        this.cameraPositionChangedCb(e)
      }
      return !0
    }, C.prototype.onUserLocationChanged = function (e) {
      if (this.userLocationChangedCb) {
        if (!_.isFunction(this.userLocationChangedCb)) return !1;
        this.userLocationChangedCb(e)
      }
      return !0
    }, C.prototype.onMarkerClicked = function (e) {
      if (this.markerClickedCb) {
        if (!_.isFunction(this.markerClickedCb)) return !1;
        this.markerClickedCb(e.identifier, e.coordinate)
      }
      return !0
    }, C.prototype.onMarkerPopupClicked = function (e) {
      if (this.markerPopupClickedCb) {
        if (!_.isFunction(this.markerPopupClickedCb)) return !1;
        this.markerPopupClickedCb(e.identifier, e.coordinate)
      }
      return !0
    }, C.prototype.onMapClicked = function (e) {
      if (this.mapClickedCb) {
        if (!_.isFunction(this.mapClickedCb)) return !1;
        this.mapClickedCb(e)
      }
      return !0
    }, C.prototype.onMapLongClicked = function (e) {
      if (this.mapLongClickedCb) {
        if (!_.isFunction(this.mapLongClickedCb)) return !1;
        this.mapLongClickedCb(e)
      }
      return !0
    }, C.prototype.onCurrentPositionButtonClicked = function (e) {
      return !(!this.currentPositionClickedCb || !_.isFunction(this.currentPositionClickedCb) || (this.currentPositionClickedCb(e), 0))
    }, C.API_CLASS_ID = "applican.maps", C);

    function C(e, t, n) {
      var o = d.call(this, C.API_CLASS_ID, e, t, n) || this;
      return o.cameraPositionWillChangeCb = null, o.cameraPositionChangedCb = null, o.userLocationChangedCb = null, o.markerClickedCb = null, o.markerPopupClickedCb = null, o.mapClickedCb = null, o.mapLongClickedCb = null, o.currentPositionClickedCb = null, d.prototype.registerCallback.call(o, "onCameraPositionWillChange", o.onCameraPositionWillChange.bind(o)), d.prototype.registerCallback.call(o, "onCameraPositionChanged", o.onCameraPositionChanged.bind(o)), d.prototype.registerCallback.call(o, "onUserLocationChanged", o.onUserLocationChanged.bind(o)), d.prototype.registerCallback.call(o, "onMarkerClicked", o.onMarkerClicked.bind(o)), d.prototype.registerCallback.call(o, "onMarkerPopupClicked", o.onMarkerPopupClicked.bind(o)), d.prototype.registerCallback.call(o, "onMapClicked", o.onMapClicked.bind(o)), d.prototype.registerCallback.call(o, "onMapLongClicked", o.onMapLongClicked.bind(o)), d.prototype.registerCallback.call(o, "onCurrentPositionButtonClicked", o.onCurrentPositionButtonClicked.bind(o)), o
    }
    t.Maps = b
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = n(67),
      s = n(68),
      u = (r(l, i = a.Base), l.prototype.createMediaPlayer = function (e, n, t) {
        var o = this,
          r = {
            infile: e
          };
        i.prototype.enqueueCb.call(this, "createMediaPlayer", function (e) {
          if (e && n && e.infile) {
            var t = new c.MediaPlayer(o.config, o.queue, o.callback, e.infile);
            o.players_[t.instanceId] = t, n(t)
          }
        }, t, r)
      }, l.prototype.createMediaRecorder = function (e, n, t) {
        var o = this,
          r = {
            outfile: e
          };
        i.prototype.enqueueCb.call(this, "createMediaRecorder", function (e) {
          if (e && n && e.outfile) {
            var t = new s.MediaRecorder(o.config, o.queue, o.callback, e.outfile);
            o.recorders_[t.instanceId] = t, n(t)
          }
        }, t, r)
      }, l.prototype.onMediaPlayerReleased = function (e) {
        return !(!e || !e.instanceId || (this.players_[e.instanceId] && delete this.players_[e.instanceId], 0))
      }, l.prototype.onMediaRecorderReleased = function (e) {
        return !(!e || !e.instanceId || (this.recorders_[e.instanceId] && delete this.recorders_[e.instanceId], 0))
      }, l.API_CLASS_ID = "applican.media", l);

    function l(e, t, n) {
      var o = i.call(this, l.API_CLASS_ID, e, t, n) || this;
      return o.players_ = {}, o.recorders_ = {}, i.prototype.registerCallback.call(o, "onMediaPlayerReleased", o.onMediaPlayerReleased.bind(o)), i.prototype.registerCallback.call(o, "onMediaRecorderReleased", o.onMediaRecorderReleased.bind(o)), o
    }
    t.Media = u
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.release = function (e, t) {
        i.prototype.enqueueCb.call(this, "release", e, t)
      }, s.prototype.play = function (e, t, n) {
        e = e || {}, i.prototype.enqueueCb.call(this, "play", t, n, e)
      }, s.prototype.stop = function (e, t) {
        i.prototype.enqueueCb.call(this, "stop", e, t)
      }, s.prototype.pause = function (e, t) {
        i.prototype.enqueueCb.call(this, "pause", e, t)
      }, s.prototype.seekTo = function (e, t, n) {
        var o = {
          position: e
        };
        i.prototype.enqueueCb.call(this, "seekTo", function (e) {
          e && !e.position && t && t(e.position)
        }, n, o)
      }, s.prototype.getDuration = function (t, e) {
        i.prototype.enqueueCb.call(this, "getDuration", function (e) {
          e && !e.duration && t && t(e.duration)
        }, e)
      }, s.prototype.getCurrentPosition = function (t, e) {
        i.prototype.enqueueCb.call(this, "getCurrentPosition", function (e) {
          e && !e.position && t && t(e.position)
        }, e)
      }, s.prototype.setVolume = function (e, t, n) {
        var o = {
          volume: e
        };
        i.prototype.enqueueCb.call(this, "setVolume", function (e) {
          e && !e.volume && t && t(e.volume)
        }, n, o)
      }, s.prototype.getVolume = function (t, e) {
        i.prototype.enqueueCb.call(this, "getVolume", function (e) {
          e && !e.volume && t && t(e.volume)
        }, e)
      }, s.prototype.onPlaybackFinished = function (e) {
        return this.onplaybackfinished && this.onplaybackfinished(), !0
      }, s.API_CLASS_ID = "applican.media.mediaplayer", s);

    function s(e, t, n, o) {
      var r = i.call(this, s.API_CLASS_ID, e, t, n, {
        infile: o
      }) || this;
      return r.onplaybackfinished = null, i.prototype.registerCallback.call(r, "onPlaybackFinished", r.onPlaybackFinished.bind(r)), r
    }
    t.MediaPlayer = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.release = function (e, t) {
        i.prototype.enqueueCb.call(this, "release", e, t)
      }, s.prototype.record = function (e, t, n) {
        e = e || {}, i.prototype.enqueueCb.call(this, "record", t, n, e)
      }, s.prototype.stop = function (e, t) {
        i.prototype.enqueueCb.call(this, "stop", e, t)
      }, s.prototype.onRecordingFinished = function (e) {
        return this.onrecordfinished && this.onrecordfinished(), !0
      }, s.API_CLASS_ID = "applican.media.mediarecorder", s);

    function s(e, t, n, o) {
      var r = i.call(this, s.API_CLASS_ID, e, t, n, {
        outfile: o
      }) || this;
      return r.onrecordfinished = null, i.prototype.registerCallback.call(r, "onRecordingFinished", r.onRecordingFinished.bind(r)), r
    }
    t.MediaRecorder = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.alert = function (e, t, n, o) {
        var r = {
          message: e,
          title: n = n === "undefined" ? "Alert" : n,
          buttonName: o = o === "undefined" ? "OK" : o,
        };
        i.prototype.enqueueCb.call(this, "alert", t, null, r)
      }, s.prototype.confirm = function (e, t, n, o) {
        var r = {
          message: e,
          title: n = n === "undefined" ? "Confirm" : n,
          buttonName: o = o === "undefined" ? "OK,Cancel" : o,
        };
        i.prototype.enqueueCb.call(this, "confirm", t, null, r)
      }, s.prototype.beep = function (e) {
        var t = {
          times: e = e || 1
        };
        i.prototype.enqueueCb.call(this, "beep", null, null, t)
      }, s.prototype.vibrate = function (e) {
        var t = {
          milliseconds: e = e || 100
        };
        i.prototype.enqueueCb.call(this, "vibrate", null, null, t)
      }, s.API_CLASS_ID = "applican.notification", s);

    function s(e, t, n) {
      return i.call(this, s.API_CLASS_ID, e, t, n) || this
    }
    t.Notification = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c, s, u, l, p, h, f, y, _, d, b, C, E, g, P, v, O = n(0),
      I = n(1);
    (a = i = t.OmotenashiGuideSdkSyncType || (t.OmotenashiGuideSdkSyncType = {}))[a.MINIMAL = 0] = "MINIMAL", a[a.EMERGENCY = 1] = "EMERGENCY", a[a.TEXT_FULL = 2] = "TEXT_FULL", a[a.FULL = 3] = "FULL", a[a.NEVER = 4] = "NEVER", (s = c = t.OmotenashiGuideSdkSyncError || (t.OmotenashiGuideSdkSyncError = {}))[s.NETWORK_UNREACHABLE = 0] = "NETWORK_UNREACHABLE", s[s.RESOURCE_LIST_FETCH_FAILED = 1] = "RESOURCE_LIST_FETCH_FAILED", s[s.RESOURCE_FETCH_FAILED = 2] = "RESOURCE_FETCH_FAILED", s[s.MULTIPLE_STARTUP_UNSUPPORTED = 3] = "MULTIPLE_STARTUP_UNSUPPORTED", (l = u = t.OmotenashiGuideSdkStartMode || (t.OmotenashiGuideSdkStartMode = {}))[l.MIC = 1] = "MIC", l[l.POLLINIG = 2] = "POLLINIG", l[l.BEACON = 4] = "BEACON", l[l.ALL = 8] = "ALL", (h = p = t.OmotenashiGuideSdkDescriptionMode || (t.OmotenashiGuideSdkDescriptionMode = {}))[h.TEXT = 0] = "TEXT", h[h.WEB = 1] = "WEB", h[h.NONE = 2] = "NONE", (y = f = t.OmotenashiGuideSdkLogMode || (t.OmotenashiGuideSdkLogMode = {}))[y.USER = 0] = "USER", y[y.DEVELOPER = 1] = "DEVELOPER", (d = _ = t.OmotenashiGuideSdkRecordCategory || (t.OmotenashiGuideSdkRecordCategory = {}))[d.RECORD = 0] = "RECORD", d[d.PLAY_AND_RECORD = 1] = "PLAY_AND_RECORD", (C = b = t.OmotenashiGuideSdkMicPermission || (t.OmotenashiGuideSdkMicPermission = {}))[C.ALLOW = 0] = "ALLOW", C[C.DENY = 1] = "DENY", C[C.RESTRICTED = 2] = "RESTRICTED", C[C.NOT_DETERMINED = 3] = "NOT_DETERMINED", (g = E = t.OmotenashiGuideSdkContentReceivedError || (t.OmotenashiGuideSdkContentReceivedError = {}))[g.NETWORK_UNREACHABLE = 0] = "NETWORK_UNREACHABLE", g[g.CONTENT_NOT_FOUND = 1] = "CONTENT_NOT_FOUND", g[g.STOPPED = 2] = "STOPPED", g[g.START_FAIL = 3] = "START_FAIL", (v = P = t.OmotenashiGuideSdkNotification || (t.OmotenashiGuideSdkNotification = {})).ANNOUNCE = "ANNOUNCE", v.EMERGENCY_ANNOUNCE = "EMERGENCY_ANNOUNCE", v.SPOT = "SPOT", window.OmotenashiGuideSdkContentReceivedError = E, window.OmotenashiGuideSdkDescriptionMode = p, window.OmotenashiGuideSdkLogMode = f, window.OmotenashiGuideSdkMicPermission = b, window.OmotenashiGuideSdkNotification = P, window.OmotenashiGuideSdkRecordCategory = _, window.OmotenashiGuideSdkStartMode = u, window.OmotenashiGuideSdkSyncError = c, window.OmotenashiGuideSdkSyncType = i;
    var A, S = (r(m, A = O.Base), m.prototype.init = function (e, t, n, o) {
      var r = {
        appId: e,
        appSecretKey: t
      };
      A.prototype.enqueueCb.call(this, "init", n, o, r)
    }, m.prototype.sync = function (e, t, n, o) {
      this.syncProgressCb = t;
      var r = {
        syncType: e
      };
      A.prototype.enqueueCb.call(this, "sync", n, o, r)
    }, m.prototype.updateSync = function (e, t, n) {
      this.updateSyncProgressCb = e, A.prototype.enqueueCb.call(this, "updateSync", t, n)
    }, m.prototype.iconSync = function (e, t, n) {
      this.iconSyncProgressCb = e, A.prototype.enqueueCb.call(this, "iconSync", t, n)
    }, m.prototype.getSyncDataSize = function (e, t, n) {
      var o = {
        syncType: e
      };
      A.prototype.enqueueCb.call(this, "getSyncDataSize", t, n, o)
    }, m.prototype.getUpdateSyncDataSize = function (e, t) {
      A.prototype.enqueueCb.call(this, "getUpdateSyncDataSize", e, t)
    }, m.prototype.getIconSyncDataSize = function (e, t) {
      A.prototype.enqueueCb.call(this, "getIconSyncDataSize", e, t)
    }, m.prototype.contentsDownload = function (e, t, n) {
      var o = {
        uuid: e
      };
      A.prototype.enqueueCb.call(this, "contentsDownload", t, n, o)
    }, m.prototype.start = function (e, t, n, o) {
      var r = {
        startMode: e
      };
      this.receivedContentCb = t, A.prototype.enqueueCb.call(this, "start", n, o, r)
    }, m.prototype.stop = function (e, t) {
      this.receivedContentCb = null, A.prototype.enqueueCb.call(this, "stop", e, t)
    }, m.prototype.clearLastSyncDate = function (e, t) {
      A.prototype.enqueueCb.call(this, "clearLastSyncDate", e, t)
    }, m.prototype.vibrate = function (e, t) {
      A.prototype.enqueueCb.call(this, "vibrate", e, t)
    }, m.prototype.clearSensor = function (e, t) {
      A.prototype.enqueueCb.call(this, "clearSensor", e, t)
    }, m.prototype.requestMicPermission = function (e, t) {
      A.prototype.enqueueCb.call(this, "requestMicPermission", e, t)
    }, m.prototype.authorizeOnce = function (e, t) {
      A.prototype.enqueueCb.call(this, "authorizeOnce", e, t)
    }, m.prototype.setMicRecordCategory = function (e, t, n) {
      var o = {
        category: e
      };
      A.prototype.enqueueCb.call(this, "setMicRecordCategory", t, n, o)
    }, m.prototype.micAuthorized = function (e, t) {
      A.prototype.enqueueCb.call(this, "micAuthorized", e, t)
    }, m.prototype.isStarted = function (e, t) {
      A.prototype.enqueueCb.call(this, "isStarted", e, t)
    }, m.prototype.setUseSecondMic = function (e, t, n) {
      var o = {
        useSecondMic: e
      };
      A.prototype.enqueueCb.call(this, "setUseSecondMic", t, n, o)
    }, m.prototype.getSignalLevel = function (e, t) {
      A.prototype.enqueueCb.call(this, "getSignalLevel", e, t)
    }, m.prototype.getLanguageCode = function (e, t) {
      A.prototype.enqueueCb.call(this, "getLanguageCode", e, t)
    }, m.prototype.setLanguageCode = function (e, t, n) {
      var o = {
        lang: e
      };
      A.prototype.enqueueCb.call(this, "setLanguageCode", t, n, o)
    }, m.prototype.getAvailableLanguages = function (e, t) {
      A.prototype.enqueueCb.call(this, "getAvailableLanguages", e, t)
    }, m.prototype.getCurrentLanguage = function (e, t) {
      A.prototype.enqueueCb.call(this, "getCurrentLanguage", e, t)
    }, m.prototype.setLogMode = function (e, t, n) {
      var o = {
        mode: e
      };
      A.prototype.enqueueCb.call(this, "setLogMode", t, n, o)
    }, m.prototype.getLogMode = function (e, t) {
      A.prototype.enqueueCb.call(this, "getLogMode", e, t)
    }, m.prototype.getLastSyncDate = function (n, e) {
      A.prototype.enqueueCb.call(this, "getLastSyncDate", function (e) {
        var t = null;
        e && (e.lastSyncDateMillis ? t = new Date(e.lastSyncDateMillis) : e.lastSyncDate && (t = new Date(Date.parse(e.lastSyncDate)))), n(t)
      }, e)
    }, m.prototype.getSyncType = function (e, t) {
      A.prototype.enqueueCb.call(this, "getSyncType", e, t)
    }, m.prototype.onSyncProgress = function (e) {
      return e && e.totalCount && e.current && this.syncProgressCb && I.isFunction(this.syncProgressCb) && this.syncProgressCb(e.totalCount, e.current), !0
    }, m.prototype.onUpdateSyncProgress = function (e) {
      return e && e.totalCount && e.current && this.updateSyncProgressCb && I.isFunction(this.updateSyncProgressCb) && this.updateSyncProgressCb(e.totalCount, e.current), !0
    }, m.prototype.onIconSyncProgress = function (e) {
      return e && e.totalCount && e.current && this.iconSyncProgressCb && I.isFunction(this.iconSyncProgressCb) && this.iconSyncProgressCb(e.totalCount, e.current), !0
    }, m.prototype.onAnnounceContentReceived = function (e) {
      return e && this.receivedContentCb && I.isFunction(this.receivedContentCb) && this.receivedContentCb(P.ANNOUNCE, e), !0
    }, m.prototype.onEmergencyAnnounceContentReceived = function (e) {
      return e && this.receivedContentCb && I.isFunction(this.receivedContentCb) && this.receivedContentCb(P.EMERGENCY_ANNOUNCE, e), !0
    }, m.prototype.onSpotContentReceived = function (e) {
      return e && this.receivedContentCb && I.isFunction(this.receivedContentCb) && this.receivedContentCb(P.SPOT, e), !0
    }, m.API_CLASS_ID = "applican.omotenashiguidesdk", m);

    function m(e, t, n) {
      var o = A.call(this, m.API_CLASS_ID, e, t, n) || this;
      return o.syncProgressCb = null, o.updateSyncProgressCb = null, o.iconSyncProgressCb = null, o.receivedContentCb = null, A.prototype.registerCallback.call(o, "onSyncProgress", o.onSyncProgress.bind(o)), A.prototype.registerCallback.call(o, "onUpdateSyncProgress", o.onUpdateSyncProgress.bind(o)), A.prototype.registerCallback.call(o, "onIconSyncProgress", o.onIconSyncProgress.bind(o)), A.prototype.registerCallback.call(o, "onAnnounceContentReceived", o.onAnnounceContentReceived.bind(o)), A.prototype.registerCallback.call(o, "onEmergencyAnnounceContentReceived", o.onEmergencyAnnounceContentReceived.bind(o)), A.prototype.registerCallback.call(o, "onSpotContentReceived", o.onSpotContentReceived.bind(o)), o
    }
    t.OmotenashiGuideSdk = S
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.getLibraryVersion = function () {
        return this.config.apiVersion
      }, s.prototype.getBaseVersion = function () {
        return this.config.baseAppVersion
      }, s.API_CLASS_ID = "applican.platform", s);

    function s(e, t, n) {
      return i.call(this, s.API_CLASS_ID, e, t, n) || this
    }
    t.Platform = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.init = function (e, t) {
        i.prototype.enqueueCb.call(this, "init", e, t)
      }, s.prototype.showPopinfoList = function (e, t) {
        i.prototype.enqueueCb.call(this, "showPopinfoList", e, t)
      }, s.prototype.showPopinfoDetail = function (e, t) {
        i.prototype.enqueueCb.call(this, "showPopinfoDetail", e, t)
      }, s.prototype.getId = function (e, t) {
        i.prototype.enqueueCb.call(this, "getId", e, t)
      }, s.prototype.showPopinfoSettings = function (e, t) {
        i.prototype.enqueueCb.call(this, "showPopinfoSettings", e, t)
      }, s.prototype.showSegmentSettings = function (e, t) {
        i.prototype.enqueueCb.call(this, "showSegmentSettings", e, t)
      }, s.API_CLASS_ID = "applican.popinfo", s);

    function s(e, t, n) {
      return i.call(this, s.API_CLASS_ID, e, t, n) || this
    }
    t.Popinfo = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c = n(0);
    (a = i = t.PurchaseError || (t.PurchaseError = {}))[a.UNKNOWN_ERROR = 0] = "UNKNOWN_ERROR", a[a.INVALID_ARGUMENT = 1] = "INVALID_ARGUMENT", a[a.BUSY = 2] = "BUSY", a[a.NOT_SUPPORTED = 3] = "NOT_SUPPORTED", a[a.CANCELED = 4] = "CANCELED", a[a.ALREADY_OWNED = 5] = "ALREADY_OWNED", a[a.NOT_OWNED = 6] = "NOT_OWNED", window.PurchaseError = i;
    var s, u = (r(l, s = c.Base), l.prototype.getProducts = function (e, t, n, o) {
      var r = {
        productIds: e,
        productType: t
      };
      s.prototype.enqueueCb.call(this, "getProducts", n, o, r)
    }, l.prototype.makePurchase = function (e, t, n, o, r) {
      var i = {
        productId: e,
        productType: t,
        verify: r && r.verify,
        sandbox: r && r.sandbox
      };
      s.prototype.enqueueCb.call(this, "makePurchase", n, o, i)
    }, l.prototype.finishPurchase = function (e, t, n) {
      var o = {
        purchaseId: e
      };
      s.prototype.enqueueCb.call(this, "finishPurchase", t, n, o)
    }, l.prototype.restorePurchase = function (e, t, n, o) {
      var r = {
        productType: e,
        verify: o && o.verify,
        sandbox: o && o.sandbox
      };
      s.prototype.enqueueCb.call(this, "restorePurchase", t, n, r)
    }, l.prototype.finishAllPurchases = function (e) {
      s.prototype.enqueueCb.call(this, "finishAllPurchases", e, null)
    }, l.prototype.isSandboxed = function (e, t) {
      s.prototype.enqueueCb.call(this, "isSandboxed", e, t)
    }, l.prototype.toggleSandbox = function (e, t) {
      var n = {
        enabled: e
      };
      s.prototype.enqueueCb.call(this, "toggleSandbox", t, null, n)
    }, l.prototype.setSharedPassword = function (e, t) {
      var n = {
        password: e
      };
      s.prototype.enqueueCb.call(this, "setSharedPassword", t, null, n)
    }, l.API_CLASS_ID = "applican.purchase", l);

    function l(e, t, n) {
      return s.call(this, l.API_CLASS_ID, e, t, n) || this
    }
    t.Purchase = u
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c, s, u = n(0);
    (a = i = t.ReproUserGender || (t.ReproUserGender = {}))[a.OTHER = 0] = "OTHER", a[a.MALE = 1] = "MALE", a[a.FEMALE = 2] = "FEMALE", (s = c = t.ReproLogLevel || (t.ReproLogLevel = {})).DEBUG = "Debug", s.INFO = "Info", s.WARN = "Warn", s.ERROR = "Error", s.NONE = "None", window.ReproLogLevel = c, window.ReproUserGender = i;
    var l, p = (r(h, l = u.Base), h.prototype.setUserID = function (e, t, n) {
      var o = {
        userId: e
      };
      l.prototype.enqueueCb.call(this, "setUserID", t, n, o)
    }, h.prototype.getUserID = function (e, t) {
      l.prototype.enqueueCb.call(this, "getUserID", e, t)
    }, h.prototype.getDeviceID = function (e, t) {
      l.prototype.enqueueCb.call(this, "getDeviceID", e, t)
    }, h.prototype.setUserProfile = function (e, t, n) {
      var o = {
        profile: e
      };
      l.prototype.enqueueCb.call(this, "setUserProfile", t, n, o)
    }, h.prototype.setStringUserProfile = function (e, t, n, o) {
      var r = {
        key: e,
        value: t
      };
      l.prototype.enqueueCb.call(this, "setStringUserProfile", n, o, r)
    }, h.prototype.setIntUserProfile = function (e, t, n, o) {
      var r = {
        key: e,
        value: t
      };
      l.prototype.enqueueCb.call(this, "setIntUserProfile", n, o, r)
    }, h.prototype.setDoubleUserProfile = function (e, t, n, o) {
      var r = {
        key: e,
        value: t
      };
      l.prototype.enqueueCb.call(this, "setDoubleUserProfile", n, o, r)
    }, h.prototype.setDateUserProfile = function (e, t, n, o) {
      var r = {
        key: e,
        value: t
      };
      l.prototype.enqueueCb.call(this, "setDateUserProfile", n, o, r)
    }, h.prototype.setUserGender = function (e, t, n) {
      var o = {
        gender: e
      };
      l.prototype.enqueueCb.call(this, "setUserGender", t, n, o)
    }, h.prototype.setUserEmailAddress = function (e, t, n) {
      var o = {
        address: e
      };
      l.prototype.enqueueCb.call(this, "setUserEmailAddress", t, n, o)
    }, h.prototype.track = function (e, t, n) {
      var o = {
        name: e
      };
      l.prototype.enqueueCb.call(this, "track", t, n, o)
    }, h.prototype.trackWithProperties = function (e, t, n, o) {
      var r = {
        name: e,
        properties: t
      };
      l.prototype.enqueueCb.call(this, "trackWithProperties", n, o, r)
    }, h.prototype.startWebViewTracking = function (e, t) {
      l.prototype.enqueueCb.call(this, "startWebViewTracking", e, t)
    }, h.prototype.trackViewContent = function (e, t, n, o) {
      var r = {
        contentID: e,
        properties: t
      };
      l.prototype.enqueueCb.call(this, "trackViewContent", n, o, r)
    }, h.prototype.trackSearch = function (e, t, n) {
      var o = {
        properties: e
      };
      l.prototype.enqueueCb.call(this, "trackSearch", t, n, o)
    }, h.prototype.trackAddToCart = function (e, t, n, o) {
      var r = {
        contentID: e,
        properties: t
      };
      l.prototype.enqueueCb.call(this, "trackAddToCart", n, o, r)
    }, h.prototype.trackAddToWishlist = function (e, t, n) {
      var o = {
        properties: e
      };
      l.prototype.enqueueCb.call(this, "trackAddToWishlist", t, n, o)
    }, h.prototype.trackInitiateCheckout = function (e, t, n) {
      var o = {
        properties: e
      };
      l.prototype.enqueueCb.call(this, "trackInitiateCheckout", t, n, o)
    }, h.prototype.trackAddPaymentInfo = function (e, t, n) {
      var o = {
        properties: e
      };
      l.prototype.enqueueCb.call(this, "trackAddPaymentInfo", t, n, o)
    }, h.prototype.trackPurchase = function (e, t, n, o) {
      var r = {
        contentID: e,
        properties: t
      };
      l.prototype.enqueueCb.call(this, "trackPurchase", n, o, r)
    }, h.prototype.trackShare = function (e, t, n) {
      var o = {
        properties: e
      };
      l.prototype.enqueueCb.call(this, "trackShare", t, n, o)
    }, h.prototype.trackLead = function (e, t, n) {
      var o = {
        properties: e
      };
      l.prototype.enqueueCb.call(this, "trackLead", t, n, o)
    }, h.prototype.trackCompleteRegistration = function (e, t, n) {
      var o = {
        properties: e
      };
      l.prototype.enqueueCb.call(this, "trackCompleteRegistration", t, n, o)
    }, h.prototype.startRecording = function (e, t) {
      l.prototype.enqueueCb.call(this, "startRecording", e, t)
    }, h.prototype.stopRecording = function (e, t) {
      l.prototype.enqueueCb.call(this, "stopRecording", e, t)
    }, h.prototype.pauseRecording = function (e, t) {
      l.prototype.enqueueCb.call(this, "pauseRecording", e, t)
    }, h.prototype.resumeRecording = function (e, t) {
      l.prototype.enqueueCb.call(this, "resumeRecording", e, t)
    }, h.prototype.maskWithRect = function (e, t, n, o, r, i, a) {
      var c = {
        key: e,
        x: t,
        y: n,
        width: o,
        height: r
      };
      document.documentElement && (c.clientWidth = document.documentElement.clientWidth, c.clientHeight = document.documentElement.clientHeight), l.prototype.enqueueCb.call(this, "maskWithRect", i, a, c)
    }, h.prototype.unmask = function (e, t, n) {
      var o = {
        key: e
      };
      l.prototype.enqueueCb.call(this, "unmask", t, n, o)
    }, h.prototype.setLogLevel = function (e, t, n) {
      var o = {
        level: e
      };
      l.prototype.enqueueCb.call(this, "setLogLevel", t, n, o)
    }, h.prototype.disableInAppMessageOnActive = function (e, t) {
      l.prototype.enqueueCb.call(this, "disableInAppMessageOnActive", e, t)
    }, h.prototype.showInAppMessage = function (e, t) {
      l.prototype.enqueueCb.call(this, "showInAppMessage", e, t)
    }, h.prototype.integrateRtoaster = function (e, t, n) {
      var o = {
        accountID: e
      };
      l.prototype.enqueueCb.call(this, "integrateRtoaster", t, n, o)
    }, h.API_CLASS_ID = "applican.repro", h);

    function h(e, t, n) {
      return l.call(this, h.API_CLASS_ID, e, t, n) || this
    }
    t.Repro = p
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c, s, u = n(0);
    (a = i = t.ScannerType || (t.ScannerType = {}))[a.RECEIPT = 1] = "RECEIPT", (s = c = t.ScannerResultCode || (t.ScannerResultCode = {}))[s.RESULT_RECEIPT_OK = 0] = "RESULT_RECEIPT_OK", s[s.RESULT_RECEIPT_OK_AMAZON = 1] = "RESULT_RECEIPT_OK_AMAZON", s[s.RESULT_RECEIPT_ANALYZE_ERR = -1] = "RESULT_RECEIPT_ANALYZE_ERR", s[s.RESULT_RECEIPT_OCR_ERR = -2] = "RESULT_RECEIPT_OCR_ERR", s[s.RESULT_RECEIPT_MEM_ERR = -10] = "RESULT_RECEIPT_MEM_ERR", s[s.RESULT_RECEIPT_LOAD_ERR = -11] = "RESULT_RECEIPT_LOAD_ERR", s[s.RESULT_RECEIPT_SYS_ERR = -12] = "RESULT_RECEIPT_SYS_ERR", s[s.RESULT_RECEIPT_EXPIRED_ERR = -13] = "RESULT_RECEIPT_EXPIRED_ERR", s[s.RESULT_CANCELLED = -100] = "RESULT_CANCELLED", window.ScannerResultCode = c, window.ScannerType = i;
    var l, p = (r(h, l = u.Base), h.prototype.getVersion = function (e, t) {
      l.prototype.enqueueCb.call(this, "getVersion", e, t)
    }, h.prototype.analyze = function (e, t, n, o) {
      (t = t || {}).type = e, l.prototype.enqueueCb.call(this, "analyze", n, o, t)
    }, h.prototype.cancel = function () {
      l.prototype.enqueueCb.call(this, "cancel", null, null)
    }, h.API_CLASS_ID = "applican.scanner", h);

    function h(e, t, n) {
      return l.call(this, h.API_CLASS_ID, e, t, n) || this
    }
    t.Scanner = p
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
        return (o = Object.setPrototypeOf || {
            __proto__: []
          }
          instanceof Array && function (e, t) {
            e.__proto__ = t
          } || function (e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
          })(e, t)
      }, function (e, t) {
        function n() {
          this.constructor = e
        }
        o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
      }),
      a = this && this.__assign || function () {
        return (a = Object.assign || function (e) {
          for (var t, n = 1, o = arguments.length; n < o; n++)
            for (var r in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          return e
        }).apply(this, arguments)
      };
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, c, s, u, l, p, h, f, y, _, d = n(0);
    (c = i || (i = {})).NONE = "NONE", c.BASE64 = "BASE64", (u = s || (s = {})).DES = "DES", u.TRIPLE_DES = "3DES", u.AES128 = "AES128", u.AES192 = "AES192", u.AES256 = "AES256", (p = l || (l = {})).MD5 = "MD5", p.SHA1 = "SHA1", p.SHA224 = "SHA224", p.SHA256 = "SHA256", p.SHA384 = "SHA384", p.SHA512 = "SHA512", (f = h || (h = {})).ECB = "ECB", f.CBC = "CBC", f.CFB128 = "CFB128", f.OFB128 = "OFB128", f.CTR128 = "CTR128", f.NCBC = "NCBC", (_ = y || (y = {})).NONE = "NONE", _.ZERO = "ZERO", _.PKCS5 = "PKCS5", _.PKCS7 = "PKCS7";
    var b, C = (r(E, b = d.Base), Object.defineProperty(E.prototype, "Encoding", {
      get: function () {
        return E.encoding_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(E.prototype, "EncryptionAlgorithm", {
      get: function () {
        return E.encryptionAlgorithm_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(E.prototype, "Mode", {
      get: function () {
        return E.mode_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(E.prototype, "Padding", {
      get: function () {
        return E.padding_
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(E.prototype, "HashAlgorithm", {
      get: function () {
        return E.hashAlgorithm_
      },
      enumerable: !0,
      configurable: !0
    }), E.prototype.keyExists = function (e, t, n) {
      var o = {
        keyAlias: e
      };
      b.prototype.enqueueCb.call(this, "keyExists", t, n, o)
    }, E.prototype.generateKey = function (e, t, n, o) {
      var r = a({
        keyAlias: e
      }, t);
      b.prototype.enqueueCb.call(this, "generateKey", n, o, r)
    }, E.prototype.getKeyInfo = function (e, t, n) {
      var o = {
        keyAlias: e
      };
      b.prototype.enqueueCb.call(this, "getKeyInfo", t, n, o)
    }, E.prototype.deleteKey = function (e, t, n) {
      var o = {
        keyAlias: e
      };
      b.prototype.enqueueCb.call(this, "deleteKey", t, n, o)
    }, E.prototype.encrypt = function (e, t, n, o) {
      var r = a({
        value: e
      }, t);
      b.prototype.enqueueCb.call(this, "encrypt", n, o, r)
    }, E.prototype.decrypt = function (e, t, n, o) {
      var r = a({
        value: e
      }, t);
      b.prototype.enqueueCb.call(this, "decrypt", n, o, r)
    }, E.prototype.encryptFile = function (e, t, n, o, r) {
      var i = a({
        src: e,
        dst: t
      }, n);
      b.prototype.enqueueCb.call(this, "encryptFile", o, r, i)
    }, E.prototype.decryptFile = function (e, t, n, o, r) {
      var i = a({
        src: e,
        dst: t
      }, n);
      b.prototype.enqueueCb.call(this, "decryptFile", o, r, i)
    }, E.prototype.digest = function (e, t, n, o) {
      var r = a({
        value: e
      }, t);
      b.prototype.enqueueCb.call(this, "digest", n, o, r)
    }, E.prototype.digestFile = function (e, t, n, o) {
      var r = a({
        value: e
      }, t);
      b.prototype.enqueueCb.call(this, "digestFile", n, o, r)
    }, E.prototype.hmac = function (e, t, n, o, r) {
      var i = a({
        value: e,
        key: t
      }, n);
      b.prototype.enqueueCb.call(this, "hmac", o, r, i)
    }, E.API_CLASS_ID = "applican.security", E.encoding_ = {
      NONE: i.NONE,
      BASE64: i.BASE64
    }, E.encryptionAlgorithm_ = {
      DES: s.DES,
      TRIPLE_DES: s.TRIPLE_DES,
      AES128: s.AES128,
      AES192: s.AES192,
      AES256: s.AES256
    }, E.mode_ = {
      ECB: h.ECB,
      CBC: h.CBC,
      CFB128: h.CFB128,
      OFB128: h.OFB128,
      CTR128: h.CTR128,
      NCBC: h.NCBC
    }, E.padding_ = {
      NONE: y.NONE,
      ZERO: y.ZERO,
      PKCS5: y.PKCS5,
      PKCS7: y.PKCS7
    }, E.hashAlgorithm_ = {
      MD5: l.MD5,
      SHA1: l.SHA1,
      SHA224: l.SHA224,
      SHA256: l.SHA256,
      SHA384: l.SHA384,
      SHA512: l.SHA512
    }, E);

    function E(e, t, n) {
      return b.call(this, E.API_CLASS_ID, e, t, n) || this
    }
    t.Security = C
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.get = function (e, t) {
        var n = {
          key: e
        };
        i.prototype.enqueueCb.call(this, "get", t, null, n)
      }, s.prototype.set = function (e, t, n) {
        var o = {
          key: e,
          value: t
        };
        i.prototype.enqueueCb.call(this, "set", n, null, o)
      }, s.prototype.remove = function (e, t) {
        var n = {
          key: e
        };
        i.prototype.enqueueCb.call(this, "remove", t, null, n)
      }, s.prototype.clear = function (e) {
        i.prototype.enqueueCb.call(this, "clear", e, null)
      }, s.API_CLASS_ID = "applican.simplestorage", s);

    function s(e, t, n) {
      return i.call(this, s.API_CLASS_ID, e, t, n) || this
    }
    t.SimpleStorage = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.getCurrentMenu = function (e) {
        i.prototype.enqueueCb.call(this, "getCurrentMenu", e, null)
      }, s.prototype.setMenu = function (e) {
        var t = {
          menu: e
        };
        i.prototype.enqueueCb.call(this, "setMenu", null, null, t)
      }, s.prototype.resetMenu = function () {
        i.prototype.enqueueCb.call(this, "resetMenu", null, null)
      }, s.API_CLASS_ID = "applican.slidemenu", s);

    function s(e, t, n) {
      return i.call(this, s.API_CLASS_ID, e, t, n) || this
    }
    t.SlideMenu = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.show = function (e, t, n) {
        var o = {
          portrait: "",
          landscape: "",
          timeout: -1
        };
        o.portrait = e || o.portrait, o.landscape = t || o.landscape, o.timeout = n || o.timeout, i.prototype.enqueueCb.call(this, "show", null, null, o)
      }, s.prototype.hide = function () {
        i.prototype.enqueueCb.call(this, "hide", null, null)
      }, s.API_CLASS_ID = "applican.splashscreen", s);

    function s(e, t, n) {
      return i.call(this, s.API_CLASS_ID, e, t, n) || this
    }
    t.SplashScreen = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.setBadge = function (e, t) {
        var n = {
          tab: e,
          num: t
        };
        i.prototype.enqueueCb.call(this, "setBadge", null, null, n)
      }, s.prototype.changeTabImage = function (e) {
        var t = {
          folder: e
        };
        i.prototype.enqueueCb.call(this, "changeTabImage", null, null, t)
      }, s.API_CLASS_ID = "applican.tab", s);

    function s(e, t, n) {
      return i.call(this, s.API_CLASS_ID, e, t, n) || this
    }
    t.Tab = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c = n(0);
    (a = i = t.UtilitiesError || (t.UtilitiesError = {})).NOT_FOUND_ERR = "NOT_FOUND_ERR", a[a.UNZIP_INVALID_PATH = 1] = "UNZIP_INVALID_PATH", a[a.UNZIP_UNZIP_ERROR = 2] = "UNZIP_UNZIP_ERROR", window.UtilitiesError = i;
    var s, u = (r(l, s = c.Base), l.prototype.download = function (e, t, n, o) {
      this.downloadProgressCallback = t, s.prototype.enqueueCb.call(this, "download", n, o, e)
    }, l.prototype.unzip = function (e, t, n) {
      s.prototype.enqueueCb.call(this, "unzip", t, n, e)
    }, l.prototype.onDownloadProgress = function (e) {
      return !!this.downloadProgressCallback && (this.downloadProgressCallback(e), !0)
    }, l.API_CLASS_ID = "applican.utilities", l);

    function l(e, t, n) {
      var o = s.call(this, l.API_CLASS_ID, e, t, n) || this;
      return o.downloadProgressCallback = null, s.prototype.registerCallback.call(o, "downloadProgress", o.onDownloadProgress.bind(o)), o
    }
    t.Utilities = u
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c = n(0);
    (a = i = t.VideoError || (t.VideoError = {})).NOT_FOUND_ERR = "NOT_FOUND_ERR", a.CANCELED = "CANCELED", a.BUSY = "BUSY", window.VideoError = i;
    var s, u = (r(l, s = c.Base), l.prototype.play = function (e, t, n, o) {
      var r = o || {};
      r.src = e, document.documentElement ? (r.clientWidth = document.documentElement.clientWidth, r.clientHeight = document.documentElement.clientHeight) : (r.clientWidth = 0, r.clientHeight = 0), r.width = r.width || r.clientWidth, r.height = r.height || r.clientHeight, r.top || (r.bottom ? r.top = r.clientHeight - r.height - r.bottom : r.top = 0), r.left || (r.right ? r.left = r.clientWidth - r.width - r.right : r.left = 0), r.control = r.control || !1, s.prototype.enqueueCb.call(this, "play", t, n, o)
    }, l.prototype.stop = function () {
      s.prototype.enqueueCb.call(this, "stop", null, null)
    }, l.API_CLASS_ID = "applican.video", l);

    function l(e, t, n) {
      return s.call(this, l.API_CLASS_ID, e, t, n) || this
    }
    t.Video = u
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.goBack = function () {
        i.prototype.enqueueCb.call(this, "goBack", null, null)
      }, s.prototype.goForward = function () {
        i.prototype.enqueueCb.call(this, "goForward", null, null)
      }, s.prototype.reload = function () {
        i.prototype.enqueueCb.call(this, "reload", null, null)
      }, s.prototype.loadUrl = function (e, t, n) {
        var o = t || {};
        o.url = e, i.prototype.enqueueCb.call(this, "loadUrl", null, n, o)
      }, s.prototype.addLaunchWebviewCloseEventListener = function (e) {
        e && this.launchWebViewClosedEventListeners.push(e)
      }, s.prototype.onWebViewClosed = function () {
        for (var e = 0, t = this.launchWebViewClosedEventListeners; e < t.length; e++)(0, t[e])();
        return !0
      }, s.API_CLASS_ID = "applican.webview", s);

    function s(e, t, n) {
      var o = i.call(this, s.API_CLASS_ID, e, t, n) || this;
      return o.launchWebViewClosedEventListeners = [], i.prototype.registerCallback.call(o, "onWebViewClosed", o.onWebViewClosed.bind(o)), o
    }
    t.WebView = c
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a, c, s, u, l, p, h = n(0);
    (a = i = t.WiFiError || (t.WiFiError = {})).PERMISSION_DENIED = "PERMISSION_DENIED", a.UNKNOWN_ERROR = "UNKNOWN_ERROR", a.DISCONNECT = "DISCONNECT", a.ILLEGAL_PARAMETER = "ILLEGAL_PARAMETER", a.CONNECT_FAILED = "CONNECT_FAILED", a.NOT_SUPPORTED = "NOT_SUPPORTED", a.BUSY = "BUSY", (s = c = t.WiFiStatus || (t.WiFiStatus = {})).WIFI_ON = "WIFI_ON", s.WIFI_OFF = "WIFI_OFF", (l = u = t.SecurityType || (t.SecurityType = {})).WPA = "WPA", l.WEP = "WEP", l.NONE = "NONE", (p = t.WiFiConfiguredNetworkStatus || (t.WiFiConfiguredNetworkStatus = {})).CURRENT = "CURRENT", p.DISABLED = "DISABLED", p.ENABLED = "ENABLED", window.WiFiError = i, window.WiFiStatus = c;
    var f, y = (r(_, f = h.Base), Object.defineProperty(_.prototype, "SecurityType", {
      get: function () {
        return this.SECURITY_TYPE_VALUE
      },
      enumerable: !0,
      configurable: !0
    }), _.prototype.getStatus = function (e, t) {
      f.prototype.enqueueCb.call(this, "getStatus", e, t)
    }, _.prototype.connect = function (e, t, n) {
      f.prototype.enqueueCb.call(this, "connect", e, t, n)
    }, _.prototype.hadConnected = function (e, t, n) {
      var o = {
        ssid: e
      };
      f.prototype.enqueueCb.call(this, "hadConnected", t, n, o)
    }, _.prototype.on = function (e, t) {
      f.prototype.enqueueCb.call(this, "on", e, t)
    }, _.prototype.off = function (e, t) {
      f.prototype.enqueueCb.call(this, "off", e, t)
    }, _.prototype.getSSIDList = function (e, t) {
      f.prototype.enqueueCb.call(this, "getSSIDList", e, t)
    }, _.prototype.getCurrentSSID = function (e, t) {
      f.prototype.enqueueCb.call(this, "getCurrentSSID", e, t)
    }, _.prototype.getCurrentBSSID = function (e, t) {
      f.prototype.enqueueCb.call(this, "getCurrentBSSID", e, t)
    }, _.prototype.getCurrentIPv4Address = function (e, t) {
      f.prototype.enqueueCb.call(this, "getCurrentIPv4Address", e, t)
    }, _.prototype.getCurrentIPv6Address = function (e, t) {
      f.prototype.enqueueCb.call(this, "getCurrentIPv6Address", e, t)
    }, _.prototype.getAccessPointList = function (e, t) {
      f.prototype.enqueueCb.call(this, "getAccessPointList", e, t)
    }, _.prototype.getConfiguredNetworks = function (e, t) {
      f.prototype.enqueueCb.call(this, "getConfiguredNetworks", e, t)
    }, _.API_CLASS_ID = "applican.wifi", _);

    function _(e, t, n) {
      var o = f.call(this, _.API_CLASS_ID, e, t, n) || this;
      return o.SECURITY_TYPE_VALUE = {
        NONE: u.NONE,
        WEP: u.WEP,
        WPA: u.WPA
      }, o
    }
    t.WiFi = y
  }, function (e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function (e, t) {
      return (o = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (e, t) {
          e.__proto__ = t
        } || function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        })(e, t)
    }, function (e, t) {
      function n() {
        this.constructor = e
      }
      o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, a = n(0),
      c = (r(s, i = a.Base), s.prototype.init = function (e, t, n) {
        i.prototype.enqueueCb.call(this, "init", t, n, e)
      }, s.prototype.getAppName = function (e, t) {
        i.prototype.enqueueCb.call(this, "getAppName", e, t)
      }, s.prototype.getAppKey = function (e, t) {
        i.prototype.enqueueCb.call(this, "getAppKey", e, t)
      }, s.prototype.getLocaleId = function (e, t) {
        i.prototype.enqueueCb.call(this, "getLocaleId", e, t)
      }, s.prototype.getLocaleDefault = function (e, t) {
        i.prototype.enqueueCb.call(this, "getLocaleDefault", e, t)
      }, s.prototype.getDeviceId = function (e, t) {
        i.prototype.enqueueCb.call(this, "getDeviceId", e, t)
      }, s.prototype.getDeviceToken = function (e, t) {
        i.prototype.enqueueCb.call(this, "getDeviceToken", e, t)
      }, s.prototype.getIdfa = function (e, t) {
        i.prototype.enqueueCb.call(this, "getIdfa", e, t)
      }, s.prototype.setIdfa = function (e, t, n) {
        var o = {
          idfa: e
        };
        i.prototype.enqueueCb.call(this, "setIdfa", t, n, o)
      }, s.prototype.getBeaconDetected = function (e, t) {
        i.prototype.enqueueCb.call(this, "getBeaconDetected", e, t)
      }, s.prototype.setDetectBeacon = function (e, t, n) {
        var o = {
          on: e
        };
        i.prototype.enqueueCb.call(this, "setDetectBeacon", t, n, o)
      }, s.prototype.getDetectBeacon = function (e, t) {
        i.prototype.enqueueCb.call(this, "getDetectBeacon", e, t)
      }, s.prototype.scanStart = function (e, t) {
        i.prototype.enqueueCb.call(this, "scanStart", e, t)
      }, s.prototype.scanStop = function (e, t) {
        i.prototype.enqueueCb.call(this, "scanStop", e, t)
      }, s.prototype.useOffer = function (e, t, n) {
        var o = {
          offerId: e
        };
        i.prototype.enqueueCb.call(this, "useOffer", t, n, o)
      }, s.prototype.removeOffer = function (e, t, n) {
        var o = {
          offerId: e
        };
        i.prototype.enqueueCb.call(this, "removeOffer", t, n, o)
      }, s.prototype.clearAllOffer = function (e, t) {
        i.prototype.enqueueCb.call(this, "clearAllOffer", e, t)
      }, s.prototype.clearActionOffer = function (e, t, n) {
        var o = {
          action: e
        };
        i.prototype.enqueueCb.call(this, "clearActionOffer", t, n, o)
      }, s.prototype.checkConnected = function (e, t) {
        i.prototype.enqueueCb.call(this, "checkConnected", e, t)
      }, s.prototype.getInnerBeaconOffers = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var n = {},
          o = function () {},
          r = function () {};
        3 === e.length ? (n.beaconId = e[0], o = e[1], r = e[2]) : 5 === e.length && (n.uuid = e[0], n.major = e[1], n.minor = e[2], o = e[3], r = e[4]), i.prototype.enqueueCb.call(this, "getInnerBeaconOffers", o, r, n)
      }, s.prototype.getOffers = function (e, t) {
        i.prototype.enqueueCb.call(this, "getOffers", e, t)
      }, s.prototype.getInnerBeacons = function (e, t, n) {
        var o = {};
        "string" == typeof e ? o.beaconId = e : "object" == typeof e && (o.info = e), i.prototype.enqueueCb.call(this, "getInnerBeacons", t, n, o)
      }, s.API_CLASS_ID = "applican.pinable", s);

    function s(e, t, n) {
      return i.call(this, s.API_CLASS_ID, e, t, n) || this
    }
    t.Pinable = c
  }], r.c = o, r.d = function (e, t, n) {
    r.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: n
    })
  }, r.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    })
  }, r.t = function (t, e) {
    if (1 & e && (t = r(t)), 8 & e) return t;
    if (4 & e && "object" == typeof t && t && t.__esModule) return t;
    var n = Object.create(null);
    if (r.r(n), Object.defineProperty(n, "default", {
        enumerable: !0,
        value: t
      }), 2 & e && "string" != typeof t)
      for (var o in t) r.d(n, o, function (e) {
        return t[e]
      }.bind(null, o));
    return n
  }, r.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default
    } : function () {
      return e
    };
    return r.d(t, "a", t), t
  }, r.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, r.p = "", r(r.s = 9);

  function r(e) {
    if (o[e]) return o[e].exports;
    var t = o[e] = {
      i: e,
      l: !1,
      exports: {}
    };
    return n[e].call(t.exports, t, t.exports, r), t.l = !0, t.exports
  }
  var n, o
});