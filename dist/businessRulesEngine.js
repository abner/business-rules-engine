(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("BusinessRulesEngine", [], factory);
	else if(typeof exports === 'object')
		exports["BusinessRulesEngine"] = factory();
	else
		root["BusinessRulesEngine"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ValidationsModule = __webpack_require__(1);
	var ValidatorsModule = __webpack_require__(24);
	var FormSchemaModule = __webpack_require__(76);
	exports.FormSchema = FormSchemaModule;
	exports.Validators = ValidatorsModule;
	exports.Validation = ValidationsModule;
	exports.BusinessRulesEngine = {
	    Validation: ValidationsModule,
	    Validators: ValidatorsModule,
	    FormSchema: FormSchemaModule
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(2));
	__export(__webpack_require__(8));
	__export(__webpack_require__(22));
	__export(__webpack_require__(23));
	__export(__webpack_require__(16));
	__export(__webpack_require__(20));
	__export(__webpack_require__(19));
	__export(__webpack_require__(9));
	__export(__webpack_require__(21));
	__export(__webpack_require__(17));
	__export(__webpack_require__(15));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Q = __webpack_require__(3);
	var _ = __webpack_require__(6);
	var HashMap = __webpack_require__(7);
	var abstract_validation_rule_1 = __webpack_require__(8);
	/**
	     *
	     * @ngdoc object
	     * @name  AbstractListValidationRule
	     * @module Validation
	     *
	     *
	     * @description
	     * It represents an validator for custom object. It enables to assign rules to custom object properties.
	     */
	var AbstractListValidationRule = (function (_super) {
	    __extends(AbstractListValidationRule, _super);
	    //private RowsObserver;
	    function AbstractListValidationRule(Name, validator) {
	        _super.call(this, Name, validator, true);
	        this.Name = Name;
	        this.validator = validator;
	        this.RowsMap = new HashMap();
	    }
	    /**
	     * Performs validation using a validation context and returns a collection of Validation Failures.
	     */
	    AbstractListValidationRule.prototype.Validate = function (context) {
	        //super.Validate(context);
	        this.RefreshRows(context);
	        for (var i = 0; i != context.length; i++) {
	            var validationRule = this.RowsMap.get(context[i]);
	            if (validationRule !== undefined)
	                validationRule.Validate(context[i]);
	        }
	        //this.ClearValidationResult(context);
	        return this.ValidationResult;
	    };
	    /**
	     * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
	     */
	    AbstractListValidationRule.prototype.ValidateAsync = function (context) {
	        var deferred = Q.defer();
	        var promises = [];
	        this.RefreshRows(context);
	        for (var i = 0; i != context.length; i++) {
	            var validationRule = this.RowsMap.get(context[i]);
	            if (validationRule !== undefined)
	                promises.push(validationRule.ValidateAsync(context[i]));
	        }
	        var self = this;
	        Q.all(promises).then(function (result) {
	            //self.ClearValidationResult(context);
	            deferred.resolve(self.ValidationResult);
	        });
	        return deferred.promise;
	    };
	    Object.defineProperty(AbstractListValidationRule.prototype, "Rows", {
	        get: function () {
	            return this.RowsMap.values();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AbstractListValidationRule.prototype.RefreshRows = function (list) {
	        this.refreshList(list);
	        //            var self = this;
	        //            this.RowsObserver = new ObserveJs.ArrayObserver(list, function(splices) {
	        //                // respond to changes to the elements of arr.
	        //                splices.forEach(function(splice) {
	        //                    //var newContext = ObserveJs.ArrayObserver.applySplices(splice, context);
	        //                    var newList = list.splice.apply(list,[splice.index,splice.removed.length].concat(splice.added));
	        //                    self.refreshList(newList);
	        //                });
	        //            });
	    };
	    AbstractListValidationRule.prototype.ClearRows = function (list) {
	        var keysToRemove = _.difference(this.RowsMap.keys(), list);
	        _.each(keysToRemove, function (key) {
	            if (this.has(key))
	                this.remove(key);
	        }, this.RowsMap);
	    };
	    AbstractListValidationRule.prototype.ClearValidationResult = function (list) {
	        this.ClearRows(list);
	        var results = _.map(this.RowsMap.values(), function (item) { return item.ValidationResult; });
	        for (var i = this.ValidationResult.Children.length - 1; i >= 0; i--) {
	            var item = this.ValidationResult.Children[i];
	            if (item === undefined)
	                continue;
	            if (results.indexOf(item) === -1) {
	                this.ValidationResult.Remove(i);
	            }
	        }
	    };
	    AbstractListValidationRule.prototype.getValidationRule = function (key, name) {
	        if (name === undefined)
	            name = "Row";
	        var validationRule;
	        if (!this.RowsMap.has(key)) {
	            validationRule = this.validator.CreateAbstractRule(name);
	            this.ValidationResult.Add(validationRule.ValidationResult);
	            this.RowsMap.set(key, validationRule);
	        }
	        else {
	            validationRule = this.RowsMap.get(key);
	        }
	        return validationRule;
	    };
	    AbstractListValidationRule.prototype.refreshList = function (list) {
	        this.ClearValidationResult(list);
	        _.each(list, function (item) { var rule = this.getValidationRule(item); }, this);
	    };
	    return AbstractListValidationRule;
	}(abstract_validation_rule_1.AbstractValidationRule));
	exports.AbstractListValidationRule = AbstractListValidationRule;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, setImmediate) {// vim:ts=4:sts=4:sw=4:
	/*!
	 *
	 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
	 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
	 *
	 * With parts by Tyler Close
	 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
	 * at http://www.opensource.org/licenses/mit-license.html
	 * Forked at ref_send.js version: 2009-05-11
	 *
	 * With parts by Mark Miller
	 * Copyright (C) 2011 Google Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 */
	
	(function (definition) {
	    // Turn off strict mode for this function so we can assign to global.Q
	    /* jshint strict: false */
	
	    // This file will function properly as a <script> tag, or a module
	    // using CommonJS and NodeJS or RequireJS module formats.  In
	    // Common/Node/RequireJS, the module exports the Q API and when
	    // executed as a simple <script>, it creates a Q global instead.
	
	    // Montage Require
	    if (typeof bootstrap === "function") {
	        bootstrap("promise", definition);
	
	    // CommonJS
	    } else if (true) {
	        module.exports = definition();
	
	    // RequireJS
	    } else if (typeof define === "function" && define.amd) {
	        define(definition);
	
	    // SES (Secure EcmaScript)
	    } else if (typeof ses !== "undefined") {
	        if (!ses.ok()) {
	            return;
	        } else {
	            ses.makeQ = definition;
	        }
	
	    // <script>
	    } else {
	        Q = definition();
	    }
	
	})(function () {
	"use strict";
	
	var hasStacks = false;
	try {
	    throw new Error();
	} catch (e) {
	    hasStacks = !!e.stack;
	}
	
	// All code after this point will be filtered from stack traces reported
	// by Q.
	var qStartingLine = captureLine();
	var qFileName;
	
	// shims
	
	// used for fallback in "allResolved"
	var noop = function () {};
	
	// Use the fastest possible means to execute a task in a future turn
	// of the event loop.
	var nextTick =(function () {
	    // linked list of tasks (single, with head node)
	    var head = {task: void 0, next: null};
	    var tail = head;
	    var flushing = false;
	    var requestTick = void 0;
	    var isNodeJS = false;
	
	    function flush() {
	        /* jshint loopfunc: true */
	
	        while (head.next) {
	            head = head.next;
	            var task = head.task;
	            head.task = void 0;
	            var domain = head.domain;
	
	            if (domain) {
	                head.domain = void 0;
	                domain.enter();
	            }
	
	            try {
	                task();
	
	            } catch (e) {
	                if (isNodeJS) {
	                    // In node, uncaught exceptions are considered fatal errors.
	                    // Re-throw them synchronously to interrupt flushing!
	
	                    // Ensure continuation if the uncaught exception is suppressed
	                    // listening "uncaughtException" events (as domains does).
	                    // Continue in next event to avoid tick recursion.
	                    if (domain) {
	                        domain.exit();
	                    }
	                    setTimeout(flush, 0);
	                    if (domain) {
	                        domain.enter();
	                    }
	
	                    throw e;
	
	                } else {
	                    // In browsers, uncaught exceptions are not fatal.
	                    // Re-throw them asynchronously to avoid slow-downs.
	                    setTimeout(function() {
	                       throw e;
	                    }, 0);
	                }
	            }
	
	            if (domain) {
	                domain.exit();
	            }
	        }
	
	        flushing = false;
	    }
	
	    nextTick = function (task) {
	        tail = tail.next = {
	            task: task,
	            domain: isNodeJS && process.domain,
	            next: null
	        };
	
	        if (!flushing) {
	            flushing = true;
	            requestTick();
	        }
	    };
	
	    if (typeof process !== "undefined" && process.nextTick) {
	        // Node.js before 0.9. Note that some fake-Node environments, like the
	        // Mocha test runner, introduce a `process` global without a `nextTick`.
	        isNodeJS = true;
	
	        requestTick = function () {
	            process.nextTick(flush);
	        };
	
	    } else if (typeof setImmediate === "function") {
	        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
	        if (typeof window !== "undefined") {
	            requestTick = setImmediate.bind(window, flush);
	        } else {
	            requestTick = function () {
	                setImmediate(flush);
	            };
	        }
	
	    } else if (typeof MessageChannel !== "undefined") {
	        // modern browsers
	        // http://www.nonblocking.io/2011/06/windownexttick.html
	        var channel = new MessageChannel();
	        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
	        // working message ports the first time a page loads.
	        channel.port1.onmessage = function () {
	            requestTick = requestPortTick;
	            channel.port1.onmessage = flush;
	            flush();
	        };
	        var requestPortTick = function () {
	            // Opera requires us to provide a message payload, regardless of
	            // whether we use it.
	            channel.port2.postMessage(0);
	        };
	        requestTick = function () {
	            setTimeout(flush, 0);
	            requestPortTick();
	        };
	
	    } else {
	        // old browsers
	        requestTick = function () {
	            setTimeout(flush, 0);
	        };
	    }
	
	    return nextTick;
	})();
	
	// Attempt to make generics safe in the face of downstream
	// modifications.
	// There is no situation where this is necessary.
	// If you need a security guarantee, these primordials need to be
	// deeply frozen anyway, and if you don’t need a security guarantee,
	// this is just plain paranoid.
	// However, this **might** have the nice side-effect of reducing the size of
	// the minified code by reducing x.call() to merely x()
	// See Mark Miller’s explanation of what this does.
	// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
	var call = Function.call;
	function uncurryThis(f) {
	    return function () {
	        return call.apply(f, arguments);
	    };
	}
	// This is equivalent, but slower:
	// uncurryThis = Function_bind.bind(Function_bind.call);
	// http://jsperf.com/uncurrythis
	
	var array_slice = uncurryThis(Array.prototype.slice);
	
	var array_reduce = uncurryThis(
	    Array.prototype.reduce || function (callback, basis) {
	        var index = 0,
	            length = this.length;
	        // concerning the initial value, if one is not provided
	        if (arguments.length === 1) {
	            // seek to the first value in the array, accounting
	            // for the possibility that is is a sparse array
	            do {
	                if (index in this) {
	                    basis = this[index++];
	                    break;
	                }
	                if (++index >= length) {
	                    throw new TypeError();
	                }
	            } while (1);
	        }
	        // reduce
	        for (; index < length; index++) {
	            // account for the possibility that the array is sparse
	            if (index in this) {
	                basis = callback(basis, this[index], index);
	            }
	        }
	        return basis;
	    }
	);
	
	var array_indexOf = uncurryThis(
	    Array.prototype.indexOf || function (value) {
	        // not a very good shim, but good enough for our one use of it
	        for (var i = 0; i < this.length; i++) {
	            if (this[i] === value) {
	                return i;
	            }
	        }
	        return -1;
	    }
	);
	
	var array_map = uncurryThis(
	    Array.prototype.map || function (callback, thisp) {
	        var self = this;
	        var collect = [];
	        array_reduce(self, function (undefined, value, index) {
	            collect.push(callback.call(thisp, value, index, self));
	        }, void 0);
	        return collect;
	    }
	);
	
	var object_create = Object.create || function (prototype) {
	    function Type() { }
	    Type.prototype = prototype;
	    return new Type();
	};
	
	var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
	
	var object_keys = Object.keys || function (object) {
	    var keys = [];
	    for (var key in object) {
	        if (object_hasOwnProperty(object, key)) {
	            keys.push(key);
	        }
	    }
	    return keys;
	};
	
	var object_toString = uncurryThis(Object.prototype.toString);
	
	function isObject(value) {
	    return value === Object(value);
	}
	
	// generator related shims
	
	// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
	function isStopIteration(exception) {
	    return (
	        object_toString(exception) === "[object StopIteration]" ||
	        exception instanceof QReturnValue
	    );
	}
	
	// FIXME: Remove this helper and Q.return once ES6 generators are in
	// SpiderMonkey.
	var QReturnValue;
	if (typeof ReturnValue !== "undefined") {
	    QReturnValue = ReturnValue;
	} else {
	    QReturnValue = function (value) {
	        this.value = value;
	    };
	}
	
	// long stack traces
	
	var STACK_JUMP_SEPARATOR = "From previous event:";
	
	function makeStackTraceLong(error, promise) {
	    // If possible, transform the error stack trace by removing Node and Q
	    // cruft, then concatenating with the stack trace of `promise`. See #57.
	    if (hasStacks &&
	        promise.stack &&
	        typeof error === "object" &&
	        error !== null &&
	        error.stack &&
	        error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
	    ) {
	        var stacks = [];
	        for (var p = promise; !!p; p = p.source) {
	            if (p.stack) {
	                stacks.unshift(p.stack);
	            }
	        }
	        stacks.unshift(error.stack);
	
	        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
	        error.stack = filterStackString(concatedStacks);
	    }
	}
	
	function filterStackString(stackString) {
	    var lines = stackString.split("\n");
	    var desiredLines = [];
	    for (var i = 0; i < lines.length; ++i) {
	        var line = lines[i];
	
	        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
	            desiredLines.push(line);
	        }
	    }
	    return desiredLines.join("\n");
	}
	
	function isNodeFrame(stackLine) {
	    return stackLine.indexOf("(module.js:") !== -1 ||
	           stackLine.indexOf("(node.js:") !== -1;
	}
	
	function getFileNameAndLineNumber(stackLine) {
	    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
	    // In IE10 function name can have spaces ("Anonymous function") O_o
	    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
	    if (attempt1) {
	        return [attempt1[1], Number(attempt1[2])];
	    }
	
	    // Anonymous functions: "at filename:lineNumber:columnNumber"
	    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
	    if (attempt2) {
	        return [attempt2[1], Number(attempt2[2])];
	    }
	
	    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
	    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
	    if (attempt3) {
	        return [attempt3[1], Number(attempt3[2])];
	    }
	}
	
	function isInternalFrame(stackLine) {
	    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
	
	    if (!fileNameAndLineNumber) {
	        return false;
	    }
	
	    var fileName = fileNameAndLineNumber[0];
	    var lineNumber = fileNameAndLineNumber[1];
	
	    return fileName === qFileName &&
	        lineNumber >= qStartingLine &&
	        lineNumber <= qEndingLine;
	}
	
	// discover own file name and line number range for filtering stack
	// traces
	function captureLine() {
	    if (!hasStacks) {
	        return;
	    }
	
	    try {
	        throw new Error();
	    } catch (e) {
	        var lines = e.stack.split("\n");
	        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
	        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
	        if (!fileNameAndLineNumber) {
	            return;
	        }
	
	        qFileName = fileNameAndLineNumber[0];
	        return fileNameAndLineNumber[1];
	    }
	}
	
	function deprecate(callback, name, alternative) {
	    return function () {
	        if (typeof console !== "undefined" &&
	            typeof console.warn === "function") {
	            console.warn(name + " is deprecated, use " + alternative +
	                         " instead.", new Error("").stack);
	        }
	        return callback.apply(callback, arguments);
	    };
	}
	
	// end of shims
	// beginning of real work
	
	/**
	 * Constructs a promise for an immediate reference, passes promises through, or
	 * coerces promises from different systems.
	 * @param value immediate reference or promise
	 */
	function Q(value) {
	    // If the object is already a Promise, return it directly.  This enables
	    // the resolve function to both be used to created references from objects,
	    // but to tolerably coerce non-promises to promises.
	    if (isPromise(value)) {
	        return value;
	    }
	
	    // assimilate thenables
	    if (isPromiseAlike(value)) {
	        return coerce(value);
	    } else {
	        return fulfill(value);
	    }
	}
	Q.resolve = Q;
	
	/**
	 * Performs a task in a future turn of the event loop.
	 * @param {Function} task
	 */
	Q.nextTick = nextTick;
	
	/**
	 * Controls whether or not long stack traces will be on
	 */
	Q.longStackSupport = false;
	
	/**
	 * Constructs a {promise, resolve, reject} object.
	 *
	 * `resolve` is a callback to invoke with a more resolved value for the
	 * promise. To fulfill the promise, invoke `resolve` with any value that is
	 * not a thenable. To reject the promise, invoke `resolve` with a rejected
	 * thenable, or invoke `reject` with the reason directly. To resolve the
	 * promise to another thenable, thus putting it in the same state, invoke
	 * `resolve` with that other thenable.
	 */
	Q.defer = defer;
	function defer() {
	    // if "messages" is an "Array", that indicates that the promise has not yet
	    // been resolved.  If it is "undefined", it has been resolved.  Each
	    // element of the messages array is itself an array of complete arguments to
	    // forward to the resolved promise.  We coerce the resolution value to a
	    // promise using the `resolve` function because it handles both fully
	    // non-thenable values and other thenables gracefully.
	    var messages = [], progressListeners = [], resolvedPromise;
	
	    var deferred = object_create(defer.prototype);
	    var promise = object_create(Promise.prototype);
	
	    promise.promiseDispatch = function (resolve, op, operands) {
	        var args = array_slice(arguments);
	        if (messages) {
	            messages.push(args);
	            if (op === "when" && operands[1]) { // progress operand
	                progressListeners.push(operands[1]);
	            }
	        } else {
	            nextTick(function () {
	                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
	            });
	        }
	    };
	
	    // XXX deprecated
	    promise.valueOf = function () {
	        if (messages) {
	            return promise;
	        }
	        var nearerValue = nearer(resolvedPromise);
	        if (isPromise(nearerValue)) {
	            resolvedPromise = nearerValue; // shorten chain
	        }
	        return nearerValue;
	    };
	
	    promise.inspect = function () {
	        if (!resolvedPromise) {
	            return { state: "pending" };
	        }
	        return resolvedPromise.inspect();
	    };
	
	    if (Q.longStackSupport && hasStacks) {
	        try {
	            throw new Error();
	        } catch (e) {
	            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
	            // accessor around; that causes memory leaks as per GH-111. Just
	            // reify the stack trace as a string ASAP.
	            //
	            // At the same time, cut off the first line; it's always just
	            // "[object Promise]\n", as per the `toString`.
	            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
	        }
	    }
	
	    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
	    // consolidating them into `become`, since otherwise we'd create new
	    // promises with the lines `become(whatever(value))`. See e.g. GH-252.
	
	    function become(newPromise) {
	        resolvedPromise = newPromise;
	        promise.source = newPromise;
	
	        array_reduce(messages, function (undefined, message) {
	            nextTick(function () {
	                newPromise.promiseDispatch.apply(newPromise, message);
	            });
	        }, void 0);
	
	        messages = void 0;
	        progressListeners = void 0;
	    }
	
	    deferred.promise = promise;
	    deferred.resolve = function (value) {
	        if (resolvedPromise) {
	            return;
	        }
	
	        become(Q(value));
	    };
	
	    deferred.fulfill = function (value) {
	        if (resolvedPromise) {
	            return;
	        }
	
	        become(fulfill(value));
	    };
	    deferred.reject = function (reason) {
	        if (resolvedPromise) {
	            return;
	        }
	
	        become(reject(reason));
	    };
	    deferred.notify = function (progress) {
	        if (resolvedPromise) {
	            return;
	        }
	
	        array_reduce(progressListeners, function (undefined, progressListener) {
	            nextTick(function () {
	                progressListener(progress);
	            });
	        }, void 0);
	    };
	
	    return deferred;
	}
	
	/**
	 * Creates a Node-style callback that will resolve or reject the deferred
	 * promise.
	 * @returns a nodeback
	 */
	defer.prototype.makeNodeResolver = function () {
	    var self = this;
	    return function (error, value) {
	        if (error) {
	            self.reject(error);
	        } else if (arguments.length > 2) {
	            self.resolve(array_slice(arguments, 1));
	        } else {
	            self.resolve(value);
	        }
	    };
	};
	
	/**
	 * @param resolver {Function} a function that returns nothing and accepts
	 * the resolve, reject, and notify functions for a deferred.
	 * @returns a promise that may be resolved with the given resolve and reject
	 * functions, or rejected by a thrown exception in resolver
	 */
	Q.Promise = promise; // ES6
	Q.promise = promise;
	function promise(resolver) {
	    if (typeof resolver !== "function") {
	        throw new TypeError("resolver must be a function.");
	    }
	    var deferred = defer();
	    try {
	        resolver(deferred.resolve, deferred.reject, deferred.notify);
	    } catch (reason) {
	        deferred.reject(reason);
	    }
	    return deferred.promise;
	}
	
	promise.race = race; // ES6
	promise.all = all; // ES6
	promise.reject = reject; // ES6
	promise.resolve = Q; // ES6
	
	// XXX experimental.  This method is a way to denote that a local value is
	// serializable and should be immediately dispatched to a remote upon request,
	// instead of passing a reference.
	Q.passByCopy = function (object) {
	    //freeze(object);
	    //passByCopies.set(object, true);
	    return object;
	};
	
	Promise.prototype.passByCopy = function () {
	    //freeze(object);
	    //passByCopies.set(object, true);
	    return this;
	};
	
	/**
	 * If two promises eventually fulfill to the same value, promises that value,
	 * but otherwise rejects.
	 * @param x {Any*}
	 * @param y {Any*}
	 * @returns {Any*} a promise for x and y if they are the same, but a rejection
	 * otherwise.
	 *
	 */
	Q.join = function (x, y) {
	    return Q(x).join(y);
	};
	
	Promise.prototype.join = function (that) {
	    return Q([this, that]).spread(function (x, y) {
	        if (x === y) {
	            // TODO: "===" should be Object.is or equiv
	            return x;
	        } else {
	            throw new Error("Can't join: not the same: " + x + " " + y);
	        }
	    });
	};
	
	/**
	 * Returns a promise for the first of an array of promises to become fulfilled.
	 * @param answers {Array[Any*]} promises to race
	 * @returns {Any*} the first promise to be fulfilled
	 */
	Q.race = race;
	function race(answerPs) {
	    return promise(function(resolve, reject) {
	        // Switch to this once we can assume at least ES5
	        // answerPs.forEach(function(answerP) {
	        //     Q(answerP).then(resolve, reject);
	        // });
	        // Use this in the meantime
	        for (var i = 0, len = answerPs.length; i < len; i++) {
	            Q(answerPs[i]).then(resolve, reject);
	        }
	    });
	}
	
	Promise.prototype.race = function () {
	    return this.then(Q.race);
	};
	
	/**
	 * Constructs a Promise with a promise descriptor object and optional fallback
	 * function.  The descriptor contains methods like when(rejected), get(name),
	 * set(name, value), post(name, args), and delete(name), which all
	 * return either a value, a promise for a value, or a rejection.  The fallback
	 * accepts the operation name, a resolver, and any further arguments that would
	 * have been forwarded to the appropriate method above had a method been
	 * provided with the proper name.  The API makes no guarantees about the nature
	 * of the returned object, apart from that it is usable whereever promises are
	 * bought and sold.
	 */
	Q.makePromise = Promise;
	function Promise(descriptor, fallback, inspect) {
	    if (fallback === void 0) {
	        fallback = function (op) {
	            return reject(new Error(
	                "Promise does not support operation: " + op
	            ));
	        };
	    }
	    if (inspect === void 0) {
	        inspect = function () {
	            return {state: "unknown"};
	        };
	    }
	
	    var promise = object_create(Promise.prototype);
	
	    promise.promiseDispatch = function (resolve, op, args) {
	        var result;
	        try {
	            if (descriptor[op]) {
	                result = descriptor[op].apply(promise, args);
	            } else {
	                result = fallback.call(promise, op, args);
	            }
	        } catch (exception) {
	            result = reject(exception);
	        }
	        if (resolve) {
	            resolve(result);
	        }
	    };
	
	    promise.inspect = inspect;
	
	    // XXX deprecated `valueOf` and `exception` support
	    if (inspect) {
	        var inspected = inspect();
	        if (inspected.state === "rejected") {
	            promise.exception = inspected.reason;
	        }
	
	        promise.valueOf = function () {
	            var inspected = inspect();
	            if (inspected.state === "pending" ||
	                inspected.state === "rejected") {
	                return promise;
	            }
	            return inspected.value;
	        };
	    }
	
	    return promise;
	}
	
	Promise.prototype.toString = function () {
	    return "[object Promise]";
	};
	
	Promise.prototype.then = function (fulfilled, rejected, progressed) {
	    var self = this;
	    var deferred = defer();
	    var done = false;   // ensure the untrusted promise makes at most a
	                        // single call to one of the callbacks
	
	    function _fulfilled(value) {
	        try {
	            return typeof fulfilled === "function" ? fulfilled(value) : value;
	        } catch (exception) {
	            return reject(exception);
	        }
	    }
	
	    function _rejected(exception) {
	        if (typeof rejected === "function") {
	            makeStackTraceLong(exception, self);
	            try {
	                return rejected(exception);
	            } catch (newException) {
	                return reject(newException);
	            }
	        }
	        return reject(exception);
	    }
	
	    function _progressed(value) {
	        return typeof progressed === "function" ? progressed(value) : value;
	    }
	
	    nextTick(function () {
	        self.promiseDispatch(function (value) {
	            if (done) {
	                return;
	            }
	            done = true;
	
	            deferred.resolve(_fulfilled(value));
	        }, "when", [function (exception) {
	            if (done) {
	                return;
	            }
	            done = true;
	
	            deferred.resolve(_rejected(exception));
	        }]);
	    });
	
	    // Progress propagator need to be attached in the current tick.
	    self.promiseDispatch(void 0, "when", [void 0, function (value) {
	        var newValue;
	        var threw = false;
	        try {
	            newValue = _progressed(value);
	        } catch (e) {
	            threw = true;
	            if (Q.onerror) {
	                Q.onerror(e);
	            } else {
	                throw e;
	            }
	        }
	
	        if (!threw) {
	            deferred.notify(newValue);
	        }
	    }]);
	
	    return deferred.promise;
	};
	
	/**
	 * Registers an observer on a promise.
	 *
	 * Guarantees:
	 *
	 * 1. that fulfilled and rejected will be called only once.
	 * 2. that either the fulfilled callback or the rejected callback will be
	 *    called, but not both.
	 * 3. that fulfilled and rejected will not be called in this turn.
	 *
	 * @param value      promise or immediate reference to observe
	 * @param fulfilled  function to be called with the fulfilled value
	 * @param rejected   function to be called with the rejection exception
	 * @param progressed function to be called on any progress notifications
	 * @return promise for the return value from the invoked callback
	 */
	Q.when = when;
	function when(value, fulfilled, rejected, progressed) {
	    return Q(value).then(fulfilled, rejected, progressed);
	}
	
	Promise.prototype.thenResolve = function (value) {
	    return this.then(function () { return value; });
	};
	
	Q.thenResolve = function (promise, value) {
	    return Q(promise).thenResolve(value);
	};
	
	Promise.prototype.thenReject = function (reason) {
	    return this.then(function () { throw reason; });
	};
	
	Q.thenReject = function (promise, reason) {
	    return Q(promise).thenReject(reason);
	};
	
	/**
	 * If an object is not a promise, it is as "near" as possible.
	 * If a promise is rejected, it is as "near" as possible too.
	 * If it’s a fulfilled promise, the fulfillment value is nearer.
	 * If it’s a deferred promise and the deferred has been resolved, the
	 * resolution is "nearer".
	 * @param object
	 * @returns most resolved (nearest) form of the object
	 */
	
	// XXX should we re-do this?
	Q.nearer = nearer;
	function nearer(value) {
	    if (isPromise(value)) {
	        var inspected = value.inspect();
	        if (inspected.state === "fulfilled") {
	            return inspected.value;
	        }
	    }
	    return value;
	}
	
	/**
	 * @returns whether the given object is a promise.
	 * Otherwise it is a fulfilled value.
	 */
	Q.isPromise = isPromise;
	function isPromise(object) {
	    return isObject(object) &&
	        typeof object.promiseDispatch === "function" &&
	        typeof object.inspect === "function";
	}
	
	Q.isPromiseAlike = isPromiseAlike;
	function isPromiseAlike(object) {
	    return isObject(object) && typeof object.then === "function";
	}
	
	/**
	 * @returns whether the given object is a pending promise, meaning not
	 * fulfilled or rejected.
	 */
	Q.isPending = isPending;
	function isPending(object) {
	    return isPromise(object) && object.inspect().state === "pending";
	}
	
	Promise.prototype.isPending = function () {
	    return this.inspect().state === "pending";
	};
	
	/**
	 * @returns whether the given object is a value or fulfilled
	 * promise.
	 */
	Q.isFulfilled = isFulfilled;
	function isFulfilled(object) {
	    return !isPromise(object) || object.inspect().state === "fulfilled";
	}
	
	Promise.prototype.isFulfilled = function () {
	    return this.inspect().state === "fulfilled";
	};
	
	/**
	 * @returns whether the given object is a rejected promise.
	 */
	Q.isRejected = isRejected;
	function isRejected(object) {
	    return isPromise(object) && object.inspect().state === "rejected";
	}
	
	Promise.prototype.isRejected = function () {
	    return this.inspect().state === "rejected";
	};
	
	//// BEGIN UNHANDLED REJECTION TRACKING
	
	// This promise library consumes exceptions thrown in handlers so they can be
	// handled by a subsequent promise.  The exceptions get added to this array when
	// they are created, and removed when they are handled.  Note that in ES6 or
	// shimmed environments, this would naturally be a `Set`.
	var unhandledReasons = [];
	var unhandledRejections = [];
	var trackUnhandledRejections = true;
	
	function resetUnhandledRejections() {
	    unhandledReasons.length = 0;
	    unhandledRejections.length = 0;
	
	    if (!trackUnhandledRejections) {
	        trackUnhandledRejections = true;
	    }
	}
	
	function trackRejection(promise, reason) {
	    if (!trackUnhandledRejections) {
	        return;
	    }
	
	    unhandledRejections.push(promise);
	    if (reason && typeof reason.stack !== "undefined") {
	        unhandledReasons.push(reason.stack);
	    } else {
	        unhandledReasons.push("(no stack) " + reason);
	    }
	}
	
	function untrackRejection(promise) {
	    if (!trackUnhandledRejections) {
	        return;
	    }
	
	    var at = array_indexOf(unhandledRejections, promise);
	    if (at !== -1) {
	        unhandledRejections.splice(at, 1);
	        unhandledReasons.splice(at, 1);
	    }
	}
	
	Q.resetUnhandledRejections = resetUnhandledRejections;
	
	Q.getUnhandledReasons = function () {
	    // Make a copy so that consumers can't interfere with our internal state.
	    return unhandledReasons.slice();
	};
	
	Q.stopUnhandledRejectionTracking = function () {
	    resetUnhandledRejections();
	    trackUnhandledRejections = false;
	};
	
	resetUnhandledRejections();
	
	//// END UNHANDLED REJECTION TRACKING
	
	/**
	 * Constructs a rejected promise.
	 * @param reason value describing the failure
	 */
	Q.reject = reject;
	function reject(reason) {
	    var rejection = Promise({
	        "when": function (rejected) {
	            // note that the error has been handled
	            if (rejected) {
	                untrackRejection(this);
	            }
	            return rejected ? rejected(reason) : this;
	        }
	    }, function fallback() {
	        return this;
	    }, function inspect() {
	        return { state: "rejected", reason: reason };
	    });
	
	    // Note that the reason has not been handled.
	    trackRejection(rejection, reason);
	
	    return rejection;
	}
	
	/**
	 * Constructs a fulfilled promise for an immediate reference.
	 * @param value immediate reference
	 */
	Q.fulfill = fulfill;
	function fulfill(value) {
	    return Promise({
	        "when": function () {
	            return value;
	        },
	        "get": function (name) {
	            return value[name];
	        },
	        "set": function (name, rhs) {
	            value[name] = rhs;
	        },
	        "delete": function (name) {
	            delete value[name];
	        },
	        "post": function (name, args) {
	            // Mark Miller proposes that post with no name should apply a
	            // promised function.
	            if (name === null || name === void 0) {
	                return value.apply(void 0, args);
	            } else {
	                return value[name].apply(value, args);
	            }
	        },
	        "apply": function (thisp, args) {
	            return value.apply(thisp, args);
	        },
	        "keys": function () {
	            return object_keys(value);
	        }
	    }, void 0, function inspect() {
	        return { state: "fulfilled", value: value };
	    });
	}
	
	/**
	 * Converts thenables to Q promises.
	 * @param promise thenable promise
	 * @returns a Q promise
	 */
	function coerce(promise) {
	    var deferred = defer();
	    nextTick(function () {
	        try {
	            promise.then(deferred.resolve, deferred.reject, deferred.notify);
	        } catch (exception) {
	            deferred.reject(exception);
	        }
	    });
	    return deferred.promise;
	}
	
	/**
	 * Annotates an object such that it will never be
	 * transferred away from this process over any promise
	 * communication channel.
	 * @param object
	 * @returns promise a wrapping of that object that
	 * additionally responds to the "isDef" message
	 * without a rejection.
	 */
	Q.master = master;
	function master(object) {
	    return Promise({
	        "isDef": function () {}
	    }, function fallback(op, args) {
	        return dispatch(object, op, args);
	    }, function () {
	        return Q(object).inspect();
	    });
	}
	
	/**
	 * Spreads the values of a promised array of arguments into the
	 * fulfillment callback.
	 * @param fulfilled callback that receives variadic arguments from the
	 * promised array
	 * @param rejected callback that receives the exception if the promise
	 * is rejected.
	 * @returns a promise for the return value or thrown exception of
	 * either callback.
	 */
	Q.spread = spread;
	function spread(value, fulfilled, rejected) {
	    return Q(value).spread(fulfilled, rejected);
	}
	
	Promise.prototype.spread = function (fulfilled, rejected) {
	    return this.all().then(function (array) {
	        return fulfilled.apply(void 0, array);
	    }, rejected);
	};
	
	/**
	 * The async function is a decorator for generator functions, turning
	 * them into asynchronous generators.  Although generators are only part
	 * of the newest ECMAScript 6 drafts, this code does not cause syntax
	 * errors in older engines.  This code should continue to work and will
	 * in fact improve over time as the language improves.
	 *
	 * ES6 generators are currently part of V8 version 3.19 with the
	 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
	 * for longer, but under an older Python-inspired form.  This function
	 * works on both kinds of generators.
	 *
	 * Decorates a generator function such that:
	 *  - it may yield promises
	 *  - execution will continue when that promise is fulfilled
	 *  - the value of the yield expression will be the fulfilled value
	 *  - it returns a promise for the return value (when the generator
	 *    stops iterating)
	 *  - the decorated function returns a promise for the return value
	 *    of the generator or the first rejected promise among those
	 *    yielded.
	 *  - if an error is thrown in the generator, it propagates through
	 *    every following yield until it is caught, or until it escapes
	 *    the generator function altogether, and is translated into a
	 *    rejection for the promise returned by the decorated generator.
	 */
	Q.async = async;
	function async(makeGenerator) {
	    return function () {
	        // when verb is "send", arg is a value
	        // when verb is "throw", arg is an exception
	        function continuer(verb, arg) {
	            var result;
	
	            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
	            // engine that has a deployed base of browsers that support generators.
	            // However, SM's generators use the Python-inspired semantics of
	            // outdated ES6 drafts.  We would like to support ES6, but we'd also
	            // like to make it possible to use generators in deployed browsers, so
	            // we also support Python-style generators.  At some point we can remove
	            // this block.
	
	            if (typeof StopIteration === "undefined") {
	                // ES6 Generators
	                try {
	                    result = generator[verb](arg);
	                } catch (exception) {
	                    return reject(exception);
	                }
	                if (result.done) {
	                    return result.value;
	                } else {
	                    return when(result.value, callback, errback);
	                }
	            } else {
	                // SpiderMonkey Generators
	                // FIXME: Remove this case when SM does ES6 generators.
	                try {
	                    result = generator[verb](arg);
	                } catch (exception) {
	                    if (isStopIteration(exception)) {
	                        return exception.value;
	                    } else {
	                        return reject(exception);
	                    }
	                }
	                return when(result, callback, errback);
	            }
	        }
	        var generator = makeGenerator.apply(this, arguments);
	        var callback = continuer.bind(continuer, "next");
	        var errback = continuer.bind(continuer, "throw");
	        return callback();
	    };
	}
	
	/**
	 * The spawn function is a small wrapper around async that immediately
	 * calls the generator and also ends the promise chain, so that any
	 * unhandled errors are thrown instead of forwarded to the error
	 * handler. This is useful because it's extremely common to run
	 * generators at the top-level to work with libraries.
	 */
	Q.spawn = spawn;
	function spawn(makeGenerator) {
	    Q.done(Q.async(makeGenerator)());
	}
	
	// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
	/**
	 * Throws a ReturnValue exception to stop an asynchronous generator.
	 *
	 * This interface is a stop-gap measure to support generator return
	 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
	 * generators like Chromium 29, just use "return" in your generator
	 * functions.
	 *
	 * @param value the return value for the surrounding generator
	 * @throws ReturnValue exception with the value.
	 * @example
	 * // ES6 style
	 * Q.async(function* () {
	 *      var foo = yield getFooPromise();
	 *      var bar = yield getBarPromise();
	 *      return foo + bar;
	 * })
	 * // Older SpiderMonkey style
	 * Q.async(function () {
	 *      var foo = yield getFooPromise();
	 *      var bar = yield getBarPromise();
	 *      Q.return(foo + bar);
	 * })
	 */
	Q["return"] = _return;
	function _return(value) {
	    throw new QReturnValue(value);
	}
	
	/**
	 * The promised function decorator ensures that any promise arguments
	 * are settled and passed as values (`this` is also settled and passed
	 * as a value).  It will also ensure that the result of a function is
	 * always a promise.
	 *
	 * @example
	 * var add = Q.promised(function (a, b) {
	 *     return a + b;
	 * });
	 * add(Q(a), Q(B));
	 *
	 * @param {function} callback The function to decorate
	 * @returns {function} a function that has been decorated.
	 */
	Q.promised = promised;
	function promised(callback) {
	    return function () {
	        return spread([this, all(arguments)], function (self, args) {
	            return callback.apply(self, args);
	        });
	    };
	}
	
	/**
	 * sends a message to a value in a future turn
	 * @param object* the recipient
	 * @param op the name of the message operation, e.g., "when",
	 * @param args further arguments to be forwarded to the operation
	 * @returns result {Promise} a promise for the result of the operation
	 */
	Q.dispatch = dispatch;
	function dispatch(object, op, args) {
	    return Q(object).dispatch(op, args);
	}
	
	Promise.prototype.dispatch = function (op, args) {
	    var self = this;
	    var deferred = defer();
	    nextTick(function () {
	        self.promiseDispatch(deferred.resolve, op, args);
	    });
	    return deferred.promise;
	};
	
	/**
	 * Gets the value of a property in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @param name      name of property to get
	 * @return promise for the property value
	 */
	Q.get = function (object, key) {
	    return Q(object).dispatch("get", [key]);
	};
	
	Promise.prototype.get = function (key) {
	    return this.dispatch("get", [key]);
	};
	
	/**
	 * Sets the value of a property in a future turn.
	 * @param object    promise or immediate reference for object object
	 * @param name      name of property to set
	 * @param value     new value of property
	 * @return promise for the return value
	 */
	Q.set = function (object, key, value) {
	    return Q(object).dispatch("set", [key, value]);
	};
	
	Promise.prototype.set = function (key, value) {
	    return this.dispatch("set", [key, value]);
	};
	
	/**
	 * Deletes a property in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @param name      name of property to delete
	 * @return promise for the return value
	 */
	Q.del = // XXX legacy
	Q["delete"] = function (object, key) {
	    return Q(object).dispatch("delete", [key]);
	};
	
	Promise.prototype.del = // XXX legacy
	Promise.prototype["delete"] = function (key) {
	    return this.dispatch("delete", [key]);
	};
	
	/**
	 * Invokes a method in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @param name      name of method to invoke
	 * @param value     a value to post, typically an array of
	 *                  invocation arguments for promises that
	 *                  are ultimately backed with `resolve` values,
	 *                  as opposed to those backed with URLs
	 *                  wherein the posted value can be any
	 *                  JSON serializable object.
	 * @return promise for the return value
	 */
	// bound locally because it is used by other methods
	Q.mapply = // XXX As proposed by "Redsandro"
	Q.post = function (object, name, args) {
	    return Q(object).dispatch("post", [name, args]);
	};
	
	Promise.prototype.mapply = // XXX As proposed by "Redsandro"
	Promise.prototype.post = function (name, args) {
	    return this.dispatch("post", [name, args]);
	};
	
	/**
	 * Invokes a method in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @param name      name of method to invoke
	 * @param ...args   array of invocation arguments
	 * @return promise for the return value
	 */
	Q.send = // XXX Mark Miller's proposed parlance
	Q.mcall = // XXX As proposed by "Redsandro"
	Q.invoke = function (object, name /*...args*/) {
	    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
	};
	
	Promise.prototype.send = // XXX Mark Miller's proposed parlance
	Promise.prototype.mcall = // XXX As proposed by "Redsandro"
	Promise.prototype.invoke = function (name /*...args*/) {
	    return this.dispatch("post", [name, array_slice(arguments, 1)]);
	};
	
	/**
	 * Applies the promised function in a future turn.
	 * @param object    promise or immediate reference for target function
	 * @param args      array of application arguments
	 */
	Q.fapply = function (object, args) {
	    return Q(object).dispatch("apply", [void 0, args]);
	};
	
	Promise.prototype.fapply = function (args) {
	    return this.dispatch("apply", [void 0, args]);
	};
	
	/**
	 * Calls the promised function in a future turn.
	 * @param object    promise or immediate reference for target function
	 * @param ...args   array of application arguments
	 */
	Q["try"] =
	Q.fcall = function (object /* ...args*/) {
	    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
	};
	
	Promise.prototype.fcall = function (/*...args*/) {
	    return this.dispatch("apply", [void 0, array_slice(arguments)]);
	};
	
	/**
	 * Binds the promised function, transforming return values into a fulfilled
	 * promise and thrown errors into a rejected one.
	 * @param object    promise or immediate reference for target function
	 * @param ...args   array of application arguments
	 */
	Q.fbind = function (object /*...args*/) {
	    var promise = Q(object);
	    var args = array_slice(arguments, 1);
	    return function fbound() {
	        return promise.dispatch("apply", [
	            this,
	            args.concat(array_slice(arguments))
	        ]);
	    };
	};
	Promise.prototype.fbind = function (/*...args*/) {
	    var promise = this;
	    var args = array_slice(arguments);
	    return function fbound() {
	        return promise.dispatch("apply", [
	            this,
	            args.concat(array_slice(arguments))
	        ]);
	    };
	};
	
	/**
	 * Requests the names of the owned properties of a promised
	 * object in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @return promise for the keys of the eventually settled object
	 */
	Q.keys = function (object) {
	    return Q(object).dispatch("keys", []);
	};
	
	Promise.prototype.keys = function () {
	    return this.dispatch("keys", []);
	};
	
	/**
	 * Turns an array of promises into a promise for an array.  If any of
	 * the promises gets rejected, the whole array is rejected immediately.
	 * @param {Array*} an array (or promise for an array) of values (or
	 * promises for values)
	 * @returns a promise for an array of the corresponding values
	 */
	// By Mark Miller
	// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
	Q.all = all;
	function all(promises) {
	    return when(promises, function (promises) {
	        var countDown = 0;
	        var deferred = defer();
	        array_reduce(promises, function (undefined, promise, index) {
	            var snapshot;
	            if (
	                isPromise(promise) &&
	                (snapshot = promise.inspect()).state === "fulfilled"
	            ) {
	                promises[index] = snapshot.value;
	            } else {
	                ++countDown;
	                when(
	                    promise,
	                    function (value) {
	                        promises[index] = value;
	                        if (--countDown === 0) {
	                            deferred.resolve(promises);
	                        }
	                    },
	                    deferred.reject,
	                    function (progress) {
	                        deferred.notify({ index: index, value: progress });
	                    }
	                );
	            }
	        }, void 0);
	        if (countDown === 0) {
	            deferred.resolve(promises);
	        }
	        return deferred.promise;
	    });
	}
	
	Promise.prototype.all = function () {
	    return all(this);
	};
	
	/**
	 * Waits for all promises to be settled, either fulfilled or
	 * rejected.  This is distinct from `all` since that would stop
	 * waiting at the first rejection.  The promise returned by
	 * `allResolved` will never be rejected.
	 * @param promises a promise for an array (or an array) of promises
	 * (or values)
	 * @return a promise for an array of promises
	 */
	Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
	function allResolved(promises) {
	    return when(promises, function (promises) {
	        promises = array_map(promises, Q);
	        return when(all(array_map(promises, function (promise) {
	            return when(promise, noop, noop);
	        })), function () {
	            return promises;
	        });
	    });
	}
	
	Promise.prototype.allResolved = function () {
	    return allResolved(this);
	};
	
	/**
	 * @see Promise#allSettled
	 */
	Q.allSettled = allSettled;
	function allSettled(promises) {
	    return Q(promises).allSettled();
	}
	
	/**
	 * Turns an array of promises into a promise for an array of their states (as
	 * returned by `inspect`) when they have all settled.
	 * @param {Array[Any*]} values an array (or promise for an array) of values (or
	 * promises for values)
	 * @returns {Array[State]} an array of states for the respective values.
	 */
	Promise.prototype.allSettled = function () {
	    return this.then(function (promises) {
	        return all(array_map(promises, function (promise) {
	            promise = Q(promise);
	            function regardless() {
	                return promise.inspect();
	            }
	            return promise.then(regardless, regardless);
	        }));
	    });
	};
	
	/**
	 * Captures the failure of a promise, giving an oportunity to recover
	 * with a callback.  If the given promise is fulfilled, the returned
	 * promise is fulfilled.
	 * @param {Any*} promise for something
	 * @param {Function} callback to fulfill the returned promise if the
	 * given promise is rejected
	 * @returns a promise for the return value of the callback
	 */
	Q.fail = // XXX legacy
	Q["catch"] = function (object, rejected) {
	    return Q(object).then(void 0, rejected);
	};
	
	Promise.prototype.fail = // XXX legacy
	Promise.prototype["catch"] = function (rejected) {
	    return this.then(void 0, rejected);
	};
	
	/**
	 * Attaches a listener that can respond to progress notifications from a
	 * promise's originating deferred. This listener receives the exact arguments
	 * passed to ``deferred.notify``.
	 * @param {Any*} promise for something
	 * @param {Function} callback to receive any progress notifications
	 * @returns the given promise, unchanged
	 */
	Q.progress = progress;
	function progress(object, progressed) {
	    return Q(object).then(void 0, void 0, progressed);
	}
	
	Promise.prototype.progress = function (progressed) {
	    return this.then(void 0, void 0, progressed);
	};
	
	/**
	 * Provides an opportunity to observe the settling of a promise,
	 * regardless of whether the promise is fulfilled or rejected.  Forwards
	 * the resolution to the returned promise when the callback is done.
	 * The callback can return a promise to defer completion.
	 * @param {Any*} promise
	 * @param {Function} callback to observe the resolution of the given
	 * promise, takes no arguments.
	 * @returns a promise for the resolution of the given promise when
	 * ``fin`` is done.
	 */
	Q.fin = // XXX legacy
	Q["finally"] = function (object, callback) {
	    return Q(object)["finally"](callback);
	};
	
	Promise.prototype.fin = // XXX legacy
	Promise.prototype["finally"] = function (callback) {
	    callback = Q(callback);
	    return this.then(function (value) {
	        return callback.fcall().then(function () {
	            return value;
	        });
	    }, function (reason) {
	        // TODO attempt to recycle the rejection with "this".
	        return callback.fcall().then(function () {
	            throw reason;
	        });
	    });
	};
	
	/**
	 * Terminates a chain of promises, forcing rejections to be
	 * thrown as exceptions.
	 * @param {Any*} promise at the end of a chain of promises
	 * @returns nothing
	 */
	Q.done = function (object, fulfilled, rejected, progress) {
	    return Q(object).done(fulfilled, rejected, progress);
	};
	
	Promise.prototype.done = function (fulfilled, rejected, progress) {
	    var onUnhandledError = function (error) {
	        // forward to a future turn so that ``when``
	        // does not catch it and turn it into a rejection.
	        nextTick(function () {
	            makeStackTraceLong(error, promise);
	            if (Q.onerror) {
	                Q.onerror(error);
	            } else {
	                throw error;
	            }
	        });
	    };
	
	    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
	    var promise = fulfilled || rejected || progress ?
	        this.then(fulfilled, rejected, progress) :
	        this;
	
	    if (typeof process === "object" && process && process.domain) {
	        onUnhandledError = process.domain.bind(onUnhandledError);
	    }
	
	    promise.then(void 0, onUnhandledError);
	};
	
	/**
	 * Causes a promise to be rejected if it does not get fulfilled before
	 * some milliseconds time out.
	 * @param {Any*} promise
	 * @param {Number} milliseconds timeout
	 * @param {String} custom error message (optional)
	 * @returns a promise for the resolution of the given promise if it is
	 * fulfilled before the timeout, otherwise rejected.
	 */
	Q.timeout = function (object, ms, message) {
	    return Q(object).timeout(ms, message);
	};
	
	Promise.prototype.timeout = function (ms, message) {
	    var deferred = defer();
	    var timeoutId = setTimeout(function () {
	        deferred.reject(new Error(message || "Timed out after " + ms + " ms"));
	    }, ms);
	
	    this.then(function (value) {
	        clearTimeout(timeoutId);
	        deferred.resolve(value);
	    }, function (exception) {
	        clearTimeout(timeoutId);
	        deferred.reject(exception);
	    }, deferred.notify);
	
	    return deferred.promise;
	};
	
	/**
	 * Returns a promise for the given value (or promised value), some
	 * milliseconds after it resolved. Passes rejections immediately.
	 * @param {Any*} promise
	 * @param {Number} milliseconds
	 * @returns a promise for the resolution of the given promise after milliseconds
	 * time has elapsed since the resolution of the given promise.
	 * If the given promise rejects, that is passed immediately.
	 */
	Q.delay = function (object, timeout) {
	    if (timeout === void 0) {
	        timeout = object;
	        object = void 0;
	    }
	    return Q(object).delay(timeout);
	};
	
	Promise.prototype.delay = function (timeout) {
	    return this.then(function (value) {
	        var deferred = defer();
	        setTimeout(function () {
	            deferred.resolve(value);
	        }, timeout);
	        return deferred.promise;
	    });
	};
	
	/**
	 * Passes a continuation to a Node function, which is called with the given
	 * arguments provided as an array, and returns a promise.
	 *
	 *      Q.nfapply(FS.readFile, [__filename])
	 *      .then(function (content) {
	 *      })
	 *
	 */
	Q.nfapply = function (callback, args) {
	    return Q(callback).nfapply(args);
	};
	
	Promise.prototype.nfapply = function (args) {
	    var deferred = defer();
	    var nodeArgs = array_slice(args);
	    nodeArgs.push(deferred.makeNodeResolver());
	    this.fapply(nodeArgs).fail(deferred.reject);
	    return deferred.promise;
	};
	
	/**
	 * Passes a continuation to a Node function, which is called with the given
	 * arguments provided individually, and returns a promise.
	 * @example
	 * Q.nfcall(FS.readFile, __filename)
	 * .then(function (content) {
	 * })
	 *
	 */
	Q.nfcall = function (callback /*...args*/) {
	    var args = array_slice(arguments, 1);
	    return Q(callback).nfapply(args);
	};
	
	Promise.prototype.nfcall = function (/*...args*/) {
	    var nodeArgs = array_slice(arguments);
	    var deferred = defer();
	    nodeArgs.push(deferred.makeNodeResolver());
	    this.fapply(nodeArgs).fail(deferred.reject);
	    return deferred.promise;
	};
	
	/**
	 * Wraps a NodeJS continuation passing function and returns an equivalent
	 * version that returns a promise.
	 * @example
	 * Q.nfbind(FS.readFile, __filename)("utf-8")
	 * .then(console.log)
	 * .done()
	 */
	Q.nfbind =
	Q.denodeify = function (callback /*...args*/) {
	    var baseArgs = array_slice(arguments, 1);
	    return function () {
	        var nodeArgs = baseArgs.concat(array_slice(arguments));
	        var deferred = defer();
	        nodeArgs.push(deferred.makeNodeResolver());
	        Q(callback).fapply(nodeArgs).fail(deferred.reject);
	        return deferred.promise;
	    };
	};
	
	Promise.prototype.nfbind =
	Promise.prototype.denodeify = function (/*...args*/) {
	    var args = array_slice(arguments);
	    args.unshift(this);
	    return Q.denodeify.apply(void 0, args);
	};
	
	Q.nbind = function (callback, thisp /*...args*/) {
	    var baseArgs = array_slice(arguments, 2);
	    return function () {
	        var nodeArgs = baseArgs.concat(array_slice(arguments));
	        var deferred = defer();
	        nodeArgs.push(deferred.makeNodeResolver());
	        function bound() {
	            return callback.apply(thisp, arguments);
	        }
	        Q(bound).fapply(nodeArgs).fail(deferred.reject);
	        return deferred.promise;
	    };
	};
	
	Promise.prototype.nbind = function (/*thisp, ...args*/) {
	    var args = array_slice(arguments, 0);
	    args.unshift(this);
	    return Q.nbind.apply(void 0, args);
	};
	
	/**
	 * Calls a method of a Node-style object that accepts a Node-style
	 * callback with a given array of arguments, plus a provided callback.
	 * @param object an object that has the named method
	 * @param {String} name name of the method of object
	 * @param {Array} args arguments to pass to the method; the callback
	 * will be provided by Q and appended to these arguments.
	 * @returns a promise for the value or error
	 */
	Q.nmapply = // XXX As proposed by "Redsandro"
	Q.npost = function (object, name, args) {
	    return Q(object).npost(name, args);
	};
	
	Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
	Promise.prototype.npost = function (name, args) {
	    var nodeArgs = array_slice(args || []);
	    var deferred = defer();
	    nodeArgs.push(deferred.makeNodeResolver());
	    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
	    return deferred.promise;
	};
	
	/**
	 * Calls a method of a Node-style object that accepts a Node-style
	 * callback, forwarding the given variadic arguments, plus a provided
	 * callback argument.
	 * @param object an object that has the named method
	 * @param {String} name name of the method of object
	 * @param ...args arguments to pass to the method; the callback will
	 * be provided by Q and appended to these arguments.
	 * @returns a promise for the value or error
	 */
	Q.nsend = // XXX Based on Mark Miller's proposed "send"
	Q.nmcall = // XXX Based on "Redsandro's" proposal
	Q.ninvoke = function (object, name /*...args*/) {
	    var nodeArgs = array_slice(arguments, 2);
	    var deferred = defer();
	    nodeArgs.push(deferred.makeNodeResolver());
	    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
	    return deferred.promise;
	};
	
	Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
	Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
	Promise.prototype.ninvoke = function (name /*...args*/) {
	    var nodeArgs = array_slice(arguments, 1);
	    var deferred = defer();
	    nodeArgs.push(deferred.makeNodeResolver());
	    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
	    return deferred.promise;
	};
	
	/**
	 * If a function would like to support both Node continuation-passing-style and
	 * promise-returning-style, it can end its internal promise chain with
	 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
	 * elects to use a nodeback, the result will be sent there.  If they do not
	 * pass a nodeback, they will receive the result promise.
	 * @param object a result (or a promise for a result)
	 * @param {Function} nodeback a Node.js-style callback
	 * @returns either the promise or nothing
	 */
	Q.nodeify = nodeify;
	function nodeify(object, nodeback) {
	    return Q(object).nodeify(nodeback);
	}
	
	Promise.prototype.nodeify = function (nodeback) {
	    if (nodeback) {
	        this.then(function (value) {
	            nextTick(function () {
	                nodeback(null, value);
	            });
	        }, function (error) {
	            nextTick(function () {
	                nodeback(error);
	            });
	        });
	    } else {
	        return this;
	    }
	};
	
	// All code before this point will be filtered from stack traces.
	var qEndingLine = captureLine();
	
	return Q;
	
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(5).setImmediate))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(4).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).setImmediate, __webpack_require__(5).clearImmediate))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	
	(function() {
	
	  // Baseline setup
	  // --------------
	
	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;
	
	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;
	
	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
	
	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;
	
	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;
	
	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};
	
	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };
	
	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }
	
	  // Current version.
	  _.VERSION = '1.8.3';
	
	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };
	
	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };
	
	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };
	
	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };
	
	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };
	
	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };
	
	  // Collection Functions
	  // --------------------
	
	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };
	
	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };
	
	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }
	
	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }
	
	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);
	
	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);
	
	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };
	
	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };
	
	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };
	
	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };
	
	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };
	
	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };
	
	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };
	
	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };
	
	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };
	
	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };
	
	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };
	
	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };
	
	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };
	
	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };
	
	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });
	
	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });
	
	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });
	
	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };
	
	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };
	
	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };
	
	  // Array Functions
	  // ---------------
	
	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };
	
	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };
	
	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };
	
	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };
	
	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };
	
	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };
	
	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };
	
	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };
	
	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };
	
	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };
	
	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };
	
	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };
	
	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };
	
	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);
	
	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };
	
	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };
	
	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }
	
	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);
	
	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };
	
	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }
	
	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
	
	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;
	
	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);
	
	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }
	
	    return range;
	  };
	
	  // Function (ahem) Functions
	  // ------------------
	
	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };
	
	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };
	
	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };
	
	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };
	
	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };
	
	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };
	
	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);
	
	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };
	
	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;
	
	    var later = function() {
	      var last = _.now() - timestamp;
	
	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };
	
	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }
	
	      return result;
	    };
	  };
	
	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };
	
	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };
	
	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };
	
	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };
	
	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };
	
	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);
	
	  // Object Functions
	  // ----------------
	
	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
	
	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;
	
	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
	
	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }
	
	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };
	
	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };
	
	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };
	
	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };
	
	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };
	
	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);
	
	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);
	
	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };
	
	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };
	
	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };
	
	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);
	
	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };
	
	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };
	
	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };
	
	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };
	
	
	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }
	
	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;
	
	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	
	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }
	
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	
	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };
	
	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };
	
	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };
	
	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };
	
	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };
	
	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };
	
	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });
	
	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }
	
	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }
	
	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };
	
	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };
	
	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };
	
	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };
	
	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };
	
	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };
	
	  // Utility Functions
	  // -----------------
	
	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };
	
	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };
	
	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };
	
	  _.noop = function(){};
	
	  _.property = property;
	
	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };
	
	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };
	
	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };
	
	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };
	
	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };
	
	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);
	
	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);
	
	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };
	
	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };
	
	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };
	
	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;
	
	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
	
	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };
	
	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);
	
	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');
	
	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;
	
	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }
	
	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";
	
	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
	
	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';
	
	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }
	
	    var template = function(data) {
	      return render.call(this, data, _);
	    };
	
	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';
	
	    return template;
	  };
	
	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };
	
	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.
	
	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };
	
	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };
	
	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);
	
	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });
	
	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });
	
	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };
	
	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
	
	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };
	
	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * HashMap - HashMap Class for JavaScript
	 * @author Ariel Flesler <aflesler@gmail.com>
	 * @version 1.2.0
	 * Homepage: https://github.com/flesler/hashmap
	 */
	
	(function (factory) {
		if (true) {
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			// Node js environment
			exports.HashMap = factory();
		} else {
			// Browser globals (this is window)
			this.HashMap = factory();
		}
	}(function () {
		
		function HashMap() {
			this.clear();
		}
	
		HashMap.prototype = {
			constructor:HashMap,
	
			get:function(key) {
				var data = this._data[this.hash(key)];
				return data && data[1];
			},
			
			set:function(key, value) {
				// Store original key as well (for iteration)
				this._data[this.hash(key)] = [key, value];
			},
			
			has:function(key) {
				return this.hash(key) in this._data;
			},
			
			search:function(value) {
				for (var key in this._data) {
					if (this._data[key][1] === value) {
						return this._data[key][0];
					}
				}
	
				return null;
			},
			
			remove:function(key) {
				delete this._data[this.hash(key)];
			},
	
			type:function(key) {
				var str = Object.prototype.toString.call(key);
				var type = str.slice(8, -1).toLowerCase();
				// Some browsers yield DOMWindow for null and undefined, works fine on Node
				if (type === 'domwindow' && !key) {
					return key + '';
				}
				return type;
			},
	
			keys:function() {
				var keys = [];
				this.forEach(function(value, key) { keys.push(key); });
				return keys;
			},
	
			values:function() {
				var values = [];
				this.forEach(function(value) { values.push(value); });
				return values;
			},
	
			count:function() {
				return this.keys().length;
			},
	
			clear:function() {
				// TODO: Would Object.create(null) make any difference
				this._data = {};
			},
	
			hash:function(key) {
				switch (this.type(key)) {
					case 'undefined':
					case 'null':
					case 'boolean':
					case 'number':
					case 'regexp':
						return key + '';
	
					case 'date':
						return ':' + key.getTime();
	
					case 'string':
						return '"' + key;
	
					case 'array':
						var hashes = [];
						for (var i = 0; i < key.length; i++)
							hashes[i] = this.hash(key[i]);
						return '[' + hashes.join('|');
	
					case 'object':
					default:
						// TODO: Don't use expandos when Object.defineProperty is not available?
						if (!key._hmuid_) {
							key._hmuid_ = ++HashMap.uid;
							hide(key, '_hmuid_');
						}
	
						return '{' + key._hmuid_;
				}
			},
	
			forEach:function(func) {
				for (var key in this._data) {
					var data = this._data[key];
					func.call(this, data[1], data[0]);
				}
			}
		};
	
		HashMap.uid = 0;
	
		
		function hide(obj, prop) {
			// Make non iterable if supported
			if (Object.defineProperty) {
				Object.defineProperty(obj, prop, {enumerable:false});
			}
		};
	
		return HashMap;
	
	}));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(6);
	var Q = __webpack_require__(3);
	var results_1 = __webpack_require__(9);
	var validator_1 = __webpack_require__(15);
	var validation_result_visitor_1 = __webpack_require__(17);
	var property_validation_rule_1 = __webpack_require__(19);
	var validation_context_1 = __webpack_require__(21);
	/**
	     *
	     * @ngdoc object
	     * @name  AbstractValidationRule
	     * @module Validation
	     *
	     *
	     * @description
	     * It represents concreate validator for custom object. It enables to assign validation rules to custom object properties.
	     */
	var AbstractValidationRule = (function () {
	    function AbstractValidationRule(Name, validator, ForList) {
	        this.Name = Name;
	        this.validator = validator;
	        this.ForList = ForList;
	        this.Rules = {};
	        this.Validators = {};
	        this.Children = {};
	        this.ValidationResultVisitor = new validation_result_visitor_1.ValidationResultVisitor(new results_1.CompositeValidationResult(this.Name));
	        if (!this.ForList) {
	            _.each(this.validator.Validators, function (val, key) {
	                this.createRuleFor(key);
	                _.each(val, function (validator) {
	                    this.Rules[key].AddValidator(validator);
	                }, this);
	            }, this);
	            _.each(this.validator.ValidationFunctions, function (val) {
	                _.each(val, function (validation) {
	                    var validator = this.Validators[validation.Name];
	                    if (validator === undefined) {
	                        validator = new validator_1.Validator(validation.Name, validation.ValidationFce, validation.AsyncValidationFce);
	                        this.Validators[validation.Name] = validator;
	                        validator.AcceptVisitor(this.ValidationResultVisitor);
	                    }
	                }, this);
	            }, this);
	            this.addChildren();
	        }
	    }
	    Object.defineProperty(AbstractValidationRule.prototype, "ValidationResult", {
	        get: function () { return this.ValidationResultVisitor.ValidationResult; },
	        set: function (value) { this.ValidationResultVisitor.ValidationResult = value; },
	        enumerable: true,
	        configurable: true
	    });
	    AbstractValidationRule.prototype.AcceptVisitor = function (visitor) {
	        visitor.AddValidator(this);
	    };
	    AbstractValidationRule.prototype.addChildren = function () {
	        _.each(this.validator.AbstractValidators, function (val, key) {
	            var validationRule;
	            if (val.ForList) {
	                validationRule = val.CreateAbstractListRule(key);
	            }
	            else {
	                validationRule = val.CreateAbstractRule(key);
	            }
	            this.Children[key] = validationRule;
	            validationRule.AcceptVisitor(this.ValidationResultVisitor);
	            // this.ValidationResult.Add(validationRule.ValidationResult);
	        }, this);
	    };
	    AbstractValidationRule.prototype.SetOptional = function (fce) {
	        this.ValidationResult.Optional = fce;
	        _.each(this.Rules, function (value, key) { value.Optional = fce; });
	        _.each(this.Validators, function (value, key) { value.Optional = fce; });
	        _.each(this.Children, function (value, key) { value.SetOptional(fce); });
	    };
	    AbstractValidationRule.prototype.createRuleFor = function (prop) {
	        var propValidationRule = new property_validation_rule_1.PropertyValidationRule(prop);
	        this.Rules[prop] = propValidationRule;
	        propValidationRule.AcceptVisitor(this.ValidationResultVisitor);
	        // this.ValidationResult.Add(propValidationRule);
	    };
	    /**
	     * Performs validation using a validation context and returns a collection of Validation Failures.
	     */
	    AbstractValidationRule.prototype.Validate = function (context) {
	        _.each(this.Children, function (val, key) {
	            if (context[key] === undefined)
	                context[key] = val.ForList ? [] : {};
	            val.Validate(context[key]);
	        }, this);
	        for (var propName in this.Rules) {
	            var rule = this.Rules[propName];
	            rule.Validate(new validation_context_1.ValidationContext(propName, context));
	        }
	        _.each(this.validator.ValidationFunctions, function (valFunctions) {
	            _.each(valFunctions, function (valFce) {
	                var validator = this.Validators[valFce.Name];
	                if (validator !== undefined)
	                    validator.Validate(context);
	            }, this);
	        }, this);
	        return this.ValidationResult;
	    };
	    /**
	     * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
	     */
	    AbstractValidationRule.prototype.ValidateAsync = function (context) {
	        var deferred = Q.defer();
	        var promises = [];
	        _.each(this.Children, function (val, key) {
	            promises.push(val.ValidateAsync(context[key]));
	        }, this);
	        for (var propName in this.Rules) {
	            var rule = this.Rules[propName];
	            promises.push(rule.ValidateAsync(new validation_context_1.ValidationContext(propName, context)));
	        }
	        _.each(this.validator.ValidationFunctions, function (valFunctions) {
	            _.each(valFunctions, function (valFce) {
	                var validator = this.Validators[valFce.Name];
	                if (validator !== undefined)
	                    promises.push(validator.ValidateAsync(context));
	            }, this);
	        }, this);
	        var self = this;
	        Q.all(promises).then(function (result) { deferred.resolve(self.ValidationResult); });
	        return deferred.promise;
	    };
	    AbstractValidationRule.prototype.ValidateAll = function (context) {
	        this.Validate(context);
	        return this.ValidateAsync(context);
	    };
	    AbstractValidationRule.prototype.ValidateProperty = function (context, propName) {
	        var childRule = this.Children[propName];
	        if (childRule !== undefined)
	            childRule.Validate(context[propName]);
	        var rule = this.Rules[propName];
	        if (rule !== undefined) {
	            var valContext = new validation_context_1.ValidationContext(propName, context);
	            rule.Validate(valContext);
	            rule.ValidateAsync(valContext);
	        }
	        var validationFces = this.validator.ValidationFunctions[propName];
	        if (validationFces !== undefined) {
	            _.each(validationFces, function (valFce) {
	                var validator = this.Validators[valFce.Name];
	                if (validator !== undefined)
	                    validator.Validate(context);
	            }, this);
	        }
	    };
	    AbstractValidationRule.prototype.add = function (child) {
	        throw 'not implemented';
	        // return false;
	    };
	    AbstractValidationRule.prototype.remove = function (child) {
	        throw 'not implemented';
	        // return false;
	    };
	    AbstractValidationRule.prototype.getChildren = function () {
	        return _.map(this.Children, function (item) {
	            return item;
	        });
	    };
	    AbstractValidationRule.prototype.getName = function () {
	        return this.Name;
	    };
	    AbstractValidationRule.prototype.isItem = function () {
	        return this.getChildren().length === 0;
	    };
	    AbstractValidationRule.id = 0;
	    return AbstractValidationRule;
	}());
	exports.AbstractValidationRule = AbstractValidationRule;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Utils = __webpack_require__(10);
	var _ = __webpack_require__(6);
	/**
	 *
	 * @ngdoc object
	 * @name  ValidationResult
	 * @module Validation
	 *
	 *
	 * @description
	 * It represents simple abstract error object.
	 */
	var ValidationResult = (function () {
	    function ValidationResult(Name) {
	        this.Name = Name;
	        this.ErrorsChanged = new Utils.Signal();
	    }
	    Object.defineProperty(ValidationResult.prototype, "Children", {
	        get: function () {
	            return [];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ValidationResult.prototype.Add = function (error) {
	        throw ('Cannot add to ValidationResult to leaf node.');
	    };
	    ValidationResult.prototype.Remove = function (index) {
	        throw ('Cannot remove ValidationResult from leaf node.');
	    };
	    ValidationResult.prototype.DispatchErrorsChanged = function () {
	        if (this.ErrorsChanged !== undefined)
	            this.ErrorsChanged.dispatch(this);
	    };
	    Object.defineProperty(ValidationResult.prototype, "HasErrorsDirty", {
	        get: function () {
	            return this.IsDirty && this.HasErrors;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ValidationResult.prototype, "HasErrors", {
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ValidationResult.prototype, "ErrorCount", {
	        get: function () {
	            return 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ValidationResult.prototype, "ErrorMessage", {
	        get: function () {
	            return "";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ValidationResult.prototype.add = function (child) { this.add(child); return true; };
	    ValidationResult.prototype.remove = function (child) { this.remove(child); return true; };
	    ValidationResult.prototype.getChildren = function () { return this.Children; };
	    ValidationResult.prototype.getName = function () { return this.Name; };
	    ValidationResult.prototype.isItem = function () { return true; };
	    return ValidationResult;
	}());
	exports.ValidationResult = ValidationResult;
	/**
	 *
	 * @ngdoc object
	 * @name  CompositeValidationResult
	 * @module Validation
	 *
	 *
	 * @description
	 * It represents composite error object.
	 */
	var CompositeValidationResult = (function () {
	    function CompositeValidationResult(Name) {
	        this.Name = Name;
	        this.Children = [];
	        this.ErrorsChanged = new Utils.Signal();
	    }
	    CompositeValidationResult.prototype.AddFirst = function (error) {
	        this.Children.unshift(error);
	    };
	    CompositeValidationResult.prototype.Add = function (error) {
	        this.Children.push(error);
	    };
	    CompositeValidationResult.prototype.Remove = function (index) {
	        this.Children.splice(index, 1);
	    };
	    CompositeValidationResult.prototype.Clear = function () {
	        this.Children.splice(0, this.Children.length);
	    };
	    Object.defineProperty(CompositeValidationResult.prototype, "HasErrorsDirty", {
	        get: function () {
	            if (this.Optional !== undefined && _.isFunction(this.Optional) && this.Optional())
	                return false;
	            return _.some(this.Children, function (error) {
	                return error.HasErrorsDirty;
	            });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CompositeValidationResult.prototype, "HasErrors", {
	        get: function () {
	            if (this.Optional !== undefined && _.isFunction(this.Optional) && this.Optional())
	                return false;
	            return _.some(this.Children, function (error) {
	                return error.HasErrors;
	            });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CompositeValidationResult.prototype, "ErrorCount", {
	        get: function () {
	            if (!this.HasErrors)
	                return 0;
	            return _.reduce(this.Children, function (memo, error) {
	                return memo + error.ErrorCount;
	            }, 0);
	            //return _.filter(this.children, function (error) { return error.HasErrors; }).length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CompositeValidationResult.prototype, "ErrorMessage", {
	        get: function () {
	            if (!this.HasErrors)
	                return "";
	            return _.reduce(this.Children, function (memo, error) {
	                return memo + error.ErrorMessage;
	            }, "");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CompositeValidationResult.prototype, "TranslateArgs", {
	        get: function () {
	            if (!this.HasErrors)
	                return [];
	            var newArgs = [];
	            _.each(this.Children, function (error) {
	                newArgs = newArgs.concat(error.TranslateArgs);
	            });
	            return newArgs;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    CompositeValidationResult.prototype.LogErrors = function (headerMessage) {
	        if (headerMessage === undefined)
	            headerMessage = "Output";
	        console.log("---------------\n");
	        console.log("--- " + headerMessage + " ----\n");
	        console.log("---------------\n");
	        this.traverse(this, 1);
	        console.log("\n\n\n");
	    };
	    Object.defineProperty(CompositeValidationResult.prototype, "Errors", {
	        get: function () {
	            var map = {};
	            _.each(this.Children, function (val) {
	                map[val.Name] = val;
	            });
	            return map;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CompositeValidationResult.prototype, "FlattenErros", {
	        get: function () {
	            var errors = [];
	            this.flattenErrors(this, errors);
	            return errors;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    CompositeValidationResult.prototype.SetDirty = function () {
	        this.SetDirtyEx(this, true);
	    };
	    CompositeValidationResult.prototype.SetPristine = function () {
	        this.SetDirtyEx(this, false);
	    };
	    CompositeValidationResult.prototype.SetDirtyEx = function (node, dirty) {
	        if (node.Children.length === 0) {
	            node["IsDirty"] = dirty;
	        }
	        else {
	            for (var i = 0, len = node.Children.length; i < len; i++) {
	                //stop if there are no children with errors
	                this.SetDirtyEx(node.Children[i], dirty);
	            }
	        }
	    };
	    CompositeValidationResult.prototype.flattenErrors = function (node, errorCollection) {
	        if (node.Children.length === 0) {
	            if (node.HasErrors)
	                errorCollection.push(node);
	        }
	        else {
	            for (var i = 0, len = node.Children.length; i < len; i++) {
	                //stop if there are no children with errors
	                if (node.Children[i].HasErrors)
	                    this.flattenErrors(node.Children[i], errorCollection);
	            }
	        }
	    };
	    // recursively traverse a (sub)tree
	    CompositeValidationResult.prototype.traverse = function (node, indent) {
	        console.log(Array(indent++).join("--") + node.Name + " (" + node.ErrorMessage + ")" + '\n\r');
	        for (var i = 0, len = node.Children.length; i < len; i++) {
	            this.traverse(node.Children[i], indent);
	        }
	    };
	    CompositeValidationResult.prototype.add = function (child) { this.add(child); return true; };
	    CompositeValidationResult.prototype.remove = function (child) { this.remove(child); return true; };
	    CompositeValidationResult.prototype.getChildren = function () { return this.Children; };
	    CompositeValidationResult.prototype.getName = function () { return this.Name; };
	    CompositeValidationResult.prototype.isItem = function () { return false; };
	    return CompositeValidationResult;
	}());
	exports.CompositeValidationResult = CompositeValidationResult;
	/**
	 * It represents mixed validation rule for composite error object and property validation rule error.
	 */
	var MixedValidationResult = (function (_super) {
	    __extends(MixedValidationResult, _super);
	    function MixedValidationResult(Composite, PropRule) {
	        _super.call(this, Composite.Name);
	        this.Composite = Composite;
	        this.PropRule = PropRule;
	    }
	    Object.defineProperty(MixedValidationResult.prototype, "Children", {
	        get: function () { return this.Composite.Children; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MixedValidationResult.prototype, "ValidationFailures", {
	        get: function () { return this.PropRule.ValidationFailures; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MixedValidationResult.prototype, "HasErrorsDirty", {
	        get: function () {
	            if (this.Composite.HasErrorsDirty)
	                return true;
	            if (this.PropRule !== undefined && this.PropRule.HasErrorsDirty)
	                return true;
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MixedValidationResult.prototype, "HasErrors", {
	        get: function () {
	            if (this.Composite.HasErrors)
	                return true;
	            if (this.PropRule !== undefined && this.PropRule.HasErrors)
	                return true;
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MixedValidationResult.prototype, "ErrorCount", {
	        get: function () {
	            if (!this.Composite.HasErrors && this.PropRule !== undefined && !this.PropRule.HasErrors)
	                return 0;
	            return this.Composite.ErrorCount + (this.PropRule !== undefined ? this.PropRule.ErrorCount : 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MixedValidationResult.prototype, "ErrorMessage", {
	        get: function () {
	            if (!this.Composite.HasErrors && this.PropRule !== undefined && !this.PropRule.HasErrors)
	                return "";
	            this.Composite.ErrorMessage + this.PropRule !== undefined ? this.PropRule.ErrorMessage : "";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return MixedValidationResult;
	}(CompositeValidationResult));


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(11));
	__export(__webpack_require__(12));
	__export(__webpack_require__(13));
	__export(__webpack_require__(14));


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	/*
	   It represents utility for making composite object accessible by dot notation.
	*/
	var CompositeDotObject = (function () {
	    function CompositeDotObject() {
	    }
	    /*
	    It transforms composite object to dot accessible composite object.
	        */
	    CompositeDotObject.Transform = function (component, obj) {
	        if (obj === undefined)
	            obj = {};
	        if (component.isItem()) {
	            obj[component.getName()] = component;
	        }
	        else {
	            var children = component.getChildren();
	            var parent = obj[component.getName()] = component;
	            for (var comp in children) {
	                CompositeDotObject.Transform(children[comp], parent);
	            }
	        }
	        return obj;
	    };
	    return CompositeDotObject;
	}());
	exports.CompositeDotObject = CompositeDotObject;


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	/*
	    It represents utility for number manipulation.
	*/
	var NumberFce = (function () {
	    function NumberFce() {
	    }
	    NumberFce.GetNegDigits = function (value) {
	        if (value === undefined) {
	            return 0;
	        }
	        ;
	        var digits = value.toString().split('.');
	        if (digits.length > 1) {
	            var negDigitsLength = digits[1].length;
	            return negDigitsLength;
	        }
	        return 0;
	    };
	    return NumberFce;
	}());
	exports.NumberFce = NumberFce;


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	/*
	    It represents signal (event).
	*/
	var Signal = (function () {
	    function Signal() {
	        this.listeners = [];
	        this.priorities = [];
	    }
	    Signal.prototype.add = function (listener, priority) {
	        if (priority === void 0) { priority = 0; }
	        var index = this.listeners.indexOf(listener);
	        if (index !== -1) {
	            this.priorities[index] = priority;
	            return;
	        }
	        for (var i = 0, l = this.priorities.length; i < l; i++) {
	            if (this.priorities[i] < priority) {
	                this.priorities.splice(i, 0, priority);
	                this.listeners.splice(i, 0, listener);
	                return;
	            }
	        }
	        this.priorities.push(priority);
	        this.listeners.push(listener);
	    };
	    Signal.prototype.remove = function (listener) {
	        var index = this.listeners.indexOf(listener);
	        if (index >= 0) {
	            this.priorities.splice(index, 1);
	            this.listeners.splice(index, 1);
	        }
	    };
	    Signal.prototype.dispatch = function (parameter) {
	        var indexesToRemove;
	        var hasBeenCanceled = this.listeners.every(function (listener) {
	            var result = listener(parameter);
	            return result !== false;
	        });
	        return hasBeenCanceled;
	    };
	    Signal.prototype.clear = function () {
	        this.listeners = [];
	        this.priorities = [];
	    };
	    Signal.prototype.hasListeners = function () {
	        return this.listeners.length > 0;
	    };
	    return Signal;
	}());
	exports.Signal = Signal;


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	/*
	  It represents utility for string manipulation.
	*/
	var StringFce = (function () {
	    function StringFce() {
	    }
	    StringFce.format = function (s, args) {
	        var formatted = s;
	        for (var prop in args) {
	            if (prop) {
	                var regexp = new RegExp('\\{' + prop + '\\}', 'gi');
	                formatted = formatted.replace(regexp, args[prop]);
	            }
	        }
	        return formatted;
	    };
	    return StringFce;
	}());
	exports.StringFce = StringFce;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var results_1 = __webpack_require__(9);
	var errors_1 = __webpack_require__(16);
	var Q = __webpack_require__(3);
	var _ = __webpack_require__(6);
	/**
	     *
	     * @ngdoc object
	     * @name  Validator
	     * @module Validation
	     *
	     *
	     * @description
	     * It represents a custom validator. It enables to define your own shared validation rules
	     */
	var Validator = (function (_super) {
	    __extends(Validator, _super);
	    function Validator(Name, ValidateFce, AsyncValidationFce) {
	        _super.call(this, Name);
	        this.Name = Name;
	        this.ValidateFce = ValidateFce;
	        this.AsyncValidationFce = AsyncValidationFce;
	        this.Error = new errors_1.Error();
	        this.ValidationFailures = {};
	        this.ValidationFailures[this.Name] = new errors_1.ValidationFailure(this.Error, false);
	    }
	    Validator.prototype.Validate = function (context) {
	        var original = this.Error.HasError;
	        if (this.ValidateFce !== undefined)
	            this.ValidateFce.bind(context)(this.Error);
	        if (original !== this.Error.HasError)
	            this.DispatchErrorsChanged();
	        return this.ValidationFailures[this.Name];
	    };
	    Validator.prototype.ValidateAsync = function (context) {
	        var deferred = Q.defer();
	        if (this.AsyncValidationFce === undefined) {
	            deferred.resolve(this.ValidationFailures[this.Name]);
	        }
	        else {
	            var original = this.Error.HasError;
	            var self = this;
	            this.AsyncValidationFce.bind(context)(this.Error).then(function () {
	                if (original !== self.Error.HasError)
	                    self.DispatchErrorsChanged();
	                deferred.resolve(self.ValidationFailures[self.Name]);
	            });
	        }
	        return deferred.promise;
	    };
	    Object.defineProperty(Validator.prototype, "HasError", {
	        get: function () {
	            return this.HasErrors;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Validator.prototype, "Errors", {
	        get: function () {
	            return this.ValidationFailures;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Validator.prototype, "HasErrors", {
	        get: function () {
	            if (this.Optional !== undefined && _.isFunction(this.Optional) && this.Optional())
	                return false;
	            return this.Error.HasError;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Validator.prototype, "ErrorCount", {
	        get: function () {
	            return this.HasErrors ? 1 : 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Validator.prototype, "ErrorMessage", {
	        get: function () {
	            if (!this.HasErrors)
	                return "";
	            return this.Error.ErrorMessage;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Validator.prototype, "TranslateArgs", {
	        get: function () {
	            if (!this.HasErrors)
	                return [];
	            var newArray = [];
	            newArray.push(this.Error.TranslateArgs);
	            return newArray;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Validator.prototype.AcceptVisitor = function (visitor) {
	        visitor.AddValidation(this);
	    };
	    return Validator;
	}(results_1.ValidationResult));
	exports.Validator = Validator;


/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	/**
	 *
	 * @ngdoc object
	 * @name  Error
	 * @module Validation
	 *
	 *
	 * @description
	 * It represents basic error structure.
	 */
	var Error = (function () {
	    function Error() {
	        this.HasError = false;
	        this.ErrorMessage = '';
	    }
	    return Error;
	}());
	exports.Error = Error;
	/**
	     *
	     * @ngdoc object
	     * @name  ValidationFailure
	     * @module Validation
	     *
	     *
	     * @description
	     * It represents validation failure.
	     */
	var ValidationFailure = (function () {
	    function ValidationFailure(Error, IsAsync) {
	        this.Error = Error;
	        this.IsAsync = IsAsync;
	    }
	    Object.defineProperty(ValidationFailure.prototype, "HasError", {
	        get: function () { return this.Error.HasError; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ValidationFailure.prototype, "ErrorMessage", {
	        get: function () { return this.Error.ErrorMessage; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ValidationFailure.prototype, "TranslateArgs", {
	        get: function () { return this.Error.TranslateArgs; },
	        enumerable: true,
	        configurable: true
	    });
	    return ValidationFailure;
	}());
	exports.ValidationFailure = ValidationFailure;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var mixed_validation_result_1 = __webpack_require__(18);
	var _ = __webpack_require__(6);
	/**
	 *  It represents visitor class that enables to separate validation result creation from validation execution.
	 *  You can create your own Visitors for composing ValidationResults on your own.
	 */
	var ValidationResultVisitor = (function () {
	    function ValidationResultVisitor(ValidationResult) {
	        this.ValidationResult = ValidationResult;
	    }
	    ValidationResultVisitor.prototype.AddRule = function (rule) {
	        // if (this.ValidationResult.ErrorsChanged !== undefined) rule.ErrorsChanged = this.ValidationResult.ErrorsChanged;
	        this.ValidationResult.Add(rule);
	    };
	    ValidationResultVisitor.prototype.AddValidator = function (rule) {
	        // mixed composite validation result with property validation error
	        // TODO: find better and more generic way how to solve mixed validation results with the same name
	        var error = _.find(this.ValidationResult.Children, function (item) { return item.Name === rule.ValidationResult.Name; });
	        if (error !== undefined) {
	            // compose composite validation result with property validation result
	            this.ValidationResult.Add(new mixed_validation_result_1.MixedValidationResult(rule.ValidationResult, error));
	        }
	        else {
	            this.ValidationResult.Add(rule.ValidationResult);
	        }
	    };
	    ValidationResultVisitor.prototype.AddValidation = function (validator) {
	        this.ValidationResult.Add(validator);
	    };
	    return ValidationResultVisitor;
	}());
	exports.ValidationResultVisitor = ValidationResultVisitor;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var results_1 = __webpack_require__(9);
	/**
	 * It represents mixed validation rule for composite error object and property validation rule error.
	 */
	var MixedValidationResult = (function (_super) {
	    __extends(MixedValidationResult, _super);
	    function MixedValidationResult(Composite, PropRule) {
	        _super.call(this, Composite.Name);
	        this.Composite = Composite;
	        this.PropRule = PropRule;
	    }
	    Object.defineProperty(MixedValidationResult.prototype, "Children", {
	        get: function () { return this.Composite.Children; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MixedValidationResult.prototype, "ValidationFailures", {
	        get: function () { return this.PropRule.ValidationFailures; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MixedValidationResult.prototype, "HasErrorsDirty", {
	        get: function () {
	            if (this.Composite.HasErrorsDirty)
	                return true;
	            if (this.PropRule !== undefined && this.PropRule.HasErrorsDirty)
	                return true;
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MixedValidationResult.prototype, "HasErrors", {
	        get: function () {
	            if (this.Composite.HasErrors)
	                return true;
	            if (this.PropRule !== undefined && this.PropRule.HasErrors)
	                return true;
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MixedValidationResult.prototype, "ErrorCount", {
	        get: function () {
	            if (!this.Composite.HasErrors && this.PropRule !== undefined && !this.PropRule.HasErrors)
	                return 0;
	            return this.Composite.ErrorCount + (this.PropRule !== undefined ? this.PropRule.ErrorCount : 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MixedValidationResult.prototype, "ErrorMessage", {
	        get: function () {
	            if (!this.Composite.HasErrors && this.PropRule !== undefined && !this.PropRule.HasErrors)
	                return "";
	            this.Composite.ErrorMessage + this.PropRule !== undefined ? this.PropRule.ErrorMessage : "";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return MixedValidationResult;
	}(results_1.CompositeValidationResult));
	exports.MixedValidationResult = MixedValidationResult;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var _ = __webpack_require__(6);
	var Q = __webpack_require__(3);
	var errors_1 = __webpack_require__(16);
	var results_1 = __webpack_require__(9);
	var message_localization_1 = __webpack_require__(20);
	/**
	 *
	 * @ngdoc object
	 * @name  PropertyValidationRule
	 * @module Validation
	 *
	 *
	 * @description
	 * It represents a property validation rule. The property has assigned collection of property validators.
	 */
	var PropertyValidationRule = (function (_super) {
	    __extends(PropertyValidationRule, _super);
	    function PropertyValidationRule(Name, validatorsToAdd) {
	        _super.call(this, Name);
	        this.Name = Name;
	        this.Validators = {};
	        this.ValidationFailures = {};
	        for (var index in validatorsToAdd) {
	            if (index) {
	                this.AddValidator(validatorsToAdd[index]);
	            }
	        }
	    }
	    // public AsyncValidationFailures:{[name:string]: IAsyncValidationFailure} = {};
	    PropertyValidationRule.prototype.AcceptVisitor = function (visitor) {
	        visitor.AddRule(this);
	    };
	    PropertyValidationRule.prototype.AddValidator = function (validator) {
	        this.Validators[validator.tagName] = validator;
	        this.ValidationFailures[validator.tagName] = new errors_1.ValidationFailure(new errors_1.Error(), !!validator.isAsync);
	    };
	    Object.defineProperty(PropertyValidationRule.prototype, "Errors", {
	        get: function () {
	            return this.ValidationFailures;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PropertyValidationRule.prototype, "HasErrors", {
	        get: function () {
	            if (this.Optional !== undefined && _.isFunction(this.Optional) && this.Optional()) {
	                return false;
	            }
	            return _.some(_.values(this.Errors), function (error) {
	                return error.HasError;
	            });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PropertyValidationRule.prototype, "ErrorCount", {
	        get: function () {
	            return this.HasErrors ? 1 : 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PropertyValidationRule.prototype, "ErrorMessage", {
	        get: function () {
	            if (!this.HasErrors) {
	                return '';
	            }
	            return _.reduce(_.values(this.Errors), function (memo, error) {
	                return memo + error.ErrorMessage;
	            }, '');
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PropertyValidationRule.prototype, "TranslateArgs", {
	        get: function () {
	            if (!this.HasErrors) {
	                return [];
	            }
	            var newArray = [];
	            _.each(_.values(this.Errors), function (error) {
	                if (error.HasError) {
	                    newArray.push(error.Error.TranslateArgs);
	                }
	            });
	            return newArray;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Performs validation using a validation context and returns a collection of Validation Failures.
	     */
	    PropertyValidationRule.prototype.Validate = function (context) {
	        try {
	            return this.ValidateEx(context.Value);
	        }
	        catch (e) {
	            // if (this.settings.debug && window.console) {
	            console.log('Exception occurred when checking element ' + context.Key + '.', e);
	            // }
	            throw e;
	        }
	    };
	    PropertyValidationRule.prototype.ValidateEx = function (value) {
	        var lastPriority = 0;
	        var shortCircuited = false;
	        var original = this.HasErrors;
	        for (var index in this.ValidationFailures) {
	            if (index) {
	                var validation = this.ValidationFailures[index];
	                if (validation.IsAsync) {
	                    continue;
	                }
	                var validator = this.Validators[index];
	                try {
	                    var priority = 0;
	                    if (shortCircuited && priority > lastPriority) {
	                        validation.Error.HasError = false;
	                    }
	                    else {
	                        var hasError = ((value === undefined || value === null) && validator.tagName !== 'required')
	                            ? false
	                            : !validator.isAcceptable(value);
	                        validation.Error.HasError = hasError;
	                        validation.Error.TranslateArgs = {
	                            TranslateId: validator.tagName,
	                            MessageArgs: _.extend(validator, { AttemptedValue: value }), CustomMessage: validator.customMessage
	                        };
	                        validation.Error.ErrorMessage = hasError ?
	                            message_localization_1.MessageLocalization.GetValidationMessage(validation.Error.TranslateArgs.MessageArgs) : '';
	                        shortCircuited = hasError;
	                        lastPriority = priority;
	                    }
	                }
	                catch (e) {
	                    // if (this.settings.debug && window.console) {
	                    console.log('Exception occurred when checking element\'' + validator.tagName + '\' method.', e);
	                    // }
	                    throw e;
	                }
	            }
	        }
	        if (original !== this.HasErrors) {
	            this.DispatchErrorsChanged();
	        }
	        return _.filter(this.ValidationFailures, function (item) { return !item.IsAsync; });
	    };
	    /**
	     * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
	     */
	    PropertyValidationRule.prototype.ValidateAsync = function (context) {
	        return this.ValidateAsyncEx(context.Value);
	    };
	    /**
	     * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
	     */
	    PropertyValidationRule.prototype.ValidateAsyncEx = function (value) {
	        var deferred = Q.defer();
	        var promises = [];
	        var original = this.HasErrors;
	        var setResultFce = function (result, validator, validation) {
	            var hasError = !result;
	            validation.Error.HasError = hasError;
	            validation.Error.TranslateArgs = { TranslateId: validator.tagName, MessageArgs: _.extend(validator, { AttemptedValue: value }) };
	            validation.Error.ErrorMessage = hasError ? message_localization_1.MessageLocalization.GetValidationMessage(validation.Error.TranslateArgs.MessageArgs) : '';
	        };
	        var _loop_1 = function(index) {
	            if (index) {
	                var validation_1 = this_1.ValidationFailures[index];
	                if (!validation_1.IsAsync) {
	                    return "continue";
	                }
	                ;
	                var validator_1 = this_1.Validators[index];
	                try {
	                    var hasErrorPromise = ((value === undefined || value === null) && validator_1.tagName !== 'required') ?
	                        Q.when(true) : validator_1.isAcceptable(value);
	                    hasErrorPromise.then(function (result) { return setResultFce(result, validator_1, validation_1); });
	                    promises.push(hasErrorPromise);
	                }
	                catch (e) {
	                    // if (this.settings.debug && window.console) {
	                    console.log('Exception occurred when checking element\'' + validator_1.tagName + '\' method.', e);
	                    // }
	                    throw e;
	                }
	            }
	        };
	        var this_1 = this;
	        for (var index in this.ValidationFailures) {
	            _loop_1(index);
	        }
	        var self = this;
	        Q.all(promises).then(function (result) {
	            if (original !== self.HasErrors) {
	                self.DispatchErrorsChanged();
	            }
	            ;
	            deferred.resolve(_.filter(self.ValidationFailures, function (item) { return item.IsAsync; }));
	        });
	        return deferred.promise;
	    };
	    return PropertyValidationRule;
	}(results_1.ValidationResult));
	exports.PropertyValidationRule = PropertyValidationRule;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var string_fce_1 = __webpack_require__(14);
	var _ = __webpack_require__(6);
	var MessageLocalization = (function () {
	    function MessageLocalization() {
	    }
	    MessageLocalization.GetValidationMessage = function (validator) {
	        var msgText = MessageLocalization.ValidationMessages[validator.tagName];
	        if (msgText === undefined || msgText === '' || !_.isString(msgText)) {
	            msgText = MessageLocalization.customMsg;
	        }
	        return string_fce_1.StringFce.format(msgText, validator);
	    };
	    MessageLocalization.customMsg = 'Please, fix the field.';
	    MessageLocalization.defaultMessages = {
	        'required': 'This field is required.',
	        'remote': 'Please fix the field.',
	        'email': 'Please enter a valid email address.',
	        'url': 'Please enter a valid URL.',
	        'date': 'Please enter a valid date.',
	        'dateISO': 'Please enter a valid date ( ISO ).',
	        'number': 'Please enter a valid number.',
	        'digits': 'Please enter only digits.',
	        'signedDigits': 'Please enter only signed digits.',
	        'creditcard': 'Please enter a valid credit card number.',
	        'equalTo': 'Please enter the same value again.',
	        'maxlength': 'Please enter no more than {MaxLength} characters.',
	        'minlength': 'Please enter at least {MinLength} characters.',
	        'rangelength': 'Please enter a value between {MinLength} and {MaxLength} characters long.',
	        'range': 'Please enter a value between {Min} and {Max}.',
	        'max': 'Please enter a value less than or equal to {Max}.',
	        'min': 'Please enter a value greater than or equal to {Min}.',
	        'step': 'Please enter a value with step {Step}.',
	        'contains': 'Please enter a value from list of values. Attempted value \'{AttemptedValue}\'.',
	        'mask': 'Please enter a value corresponding with {Mask}.',
	        minItems: 'Please enter at least {Min} items.',
	        maxItems: 'Please enter no more than {Max} items.',
	        uniqItems: 'Please enter unique items.',
	        enum: 'Please enter a value from list of permitted values.',
	        type: 'Please enter a value of type \'{Type}\'.',
	        multipleOf: 'Please enter a value that is multiple of {Divider}.',
	        'custom': MessageLocalization.customMsg
	    };
	    MessageLocalization.ValidationMessages = MessageLocalization.defaultMessages;
	    return MessageLocalization;
	}());
	exports.MessageLocalization = MessageLocalization;


/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	/**
	*
	* @ngdoc object
	* @name  ValidationContext
	* @module Validation
	*
	*
	* @description
	* It represents a data context for validation rule.
	*/
	var ValidationContext = (function () {
	    function ValidationContext(Key, Data) {
	        this.Key = Key;
	        this.Data = Data;
	    }
	    Object.defineProperty(ValidationContext.prototype, "Value", {
	        get: function () {
	            return this.Data[this.Key];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ValidationContext;
	}());
	exports.ValidationContext = ValidationContext;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var abstract_validation_rule_1 = __webpack_require__(8);
	var abstract_list_validation_rule_1 = __webpack_require__(2);
	/**
	  *
	  * @ngdoc object
	  * @name  AbstractValidator
	  * @module Validation
	  *
	  *
	  * @description
	  * It enables to create custom validator for your own abstract object (class) and to assign validation rules to its properties.
	  * You can assigned these rules
	  *
	  * +  register property validation rules - use _RuleFor_ property
	  * +  register property async validation rules - use _RuleFor_ property
	  * +  register shared validation rules - use _Validation_ or _ValidationFor_ property
	  * +  register custom object validator - use _ValidatorFor_ property - enables composition of child custom validators
	  */
	var AbstractValidator = (function () {
	    function AbstractValidator() {
	        this.Validators = {};
	        this.AbstractValidators = {};
	        this.ValidationFunctions = {};
	        /**
	        * Return true if this validation rule is intended for list of items, otherwise true.
	        */
	        this.ForList = false;
	    }
	    /**
	     *  Register property validator for property.
	     * @param prop - property name
	     * @param validator - property validator
	     */
	    AbstractValidator.prototype.RuleFor = function (prop, validator) {
	        if (this.Validators[prop] === undefined) {
	            this.Validators[prop] = [];
	        }
	        this.Validators[prop].push(validator);
	    };
	    /**
	     *  Register shared validation and assign property name as dependency on shared rule.
	     *  Dependency = when the property is validated then the shared rule is validated also.
	     * @param prop name
	     * @param fce name validation function
	     */
	    AbstractValidator.prototype.ValidationFor = function (prop, fce) {
	        if (this.ValidationFunctions[prop] === undefined) {
	            this.ValidationFunctions[prop] = [];
	        }
	        this.ValidationFunctions[prop].push(fce);
	    };
	    /**
	     *  Register shared validation. There are no relationship to dependent property.
	     *  Dependency = when the property is validated then the shared rule is validated also.
	     * @param fce name validation function
	     */
	    AbstractValidator.prototype.Validation = function (fce) {
	        if (fce.Name === undefined)
	            throw 'argument must have property Name';
	        this.ValidationFor(fce.Name, fce);
	    };
	    /**
	     * Register child validator for property - composition of validators
	     * @param prop name
	     * @param validator child validator
	     * @param forList true if is array structure, otherwise false
	     */
	    AbstractValidator.prototype.ValidatorFor = function (prop, validator, forList) {
	        validator.ForList = forList;
	        this.AbstractValidators[prop] = validator;
	    };
	    AbstractValidator.prototype.CreateAbstractRule = function (name) {
	        return new abstract_validation_rule_1.AbstractValidationRule(name, this);
	    };
	    AbstractValidator.prototype.CreateAbstractListRule = function (name) {
	        return new abstract_list_validation_rule_1.AbstractListValidationRule(name, this);
	    };
	    AbstractValidator.prototype.CreateRule = function (name) {
	        return new abstract_validation_rule_1.AbstractValidationRule(name, this);
	    };
	    return AbstractValidator;
	}());
	exports.AbstractValidator = AbstractValidator;


/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * It defines compare operators.
	*/
	(function (CompareOperator) {
	    /**
	     * must be less than
	     */
	    CompareOperator[CompareOperator["LessThan"] = 0] = "LessThan";
	    /**
	     * cannot be more than
	     */
	    CompareOperator[CompareOperator["LessThanEqual"] = 1] = "LessThanEqual";
	    /**
	     *  must be the same as
	     */
	    CompareOperator[CompareOperator["Equal"] = 2] = "Equal";
	    /**
	     * must be different from
	     */
	    CompareOperator[CompareOperator["NotEqual"] = 3] = "NotEqual";
	    /**
	     * cannot be less than
	     */
	    CompareOperator[CompareOperator["GreaterThanEqual"] = 4] = "GreaterThanEqual";
	    /**
	     * must be more than
	     */
	    CompareOperator[CompareOperator["GreaterThan"] = 5] = "GreaterThan";
	})(exports.CompareOperator || (exports.CompareOperator = {}));
	var CompareOperator = exports.CompareOperator;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(25));
	__export(__webpack_require__(26));
	__export(__webpack_require__(27));
	__export(__webpack_require__(28));
	__export(__webpack_require__(29));
	__export(__webpack_require__(30));
	__export(__webpack_require__(31));
	__export(__webpack_require__(32));
	__export(__webpack_require__(33));
	__export(__webpack_require__(34));
	__export(__webpack_require__(35));
	__export(__webpack_require__(36));
	__export(__webpack_require__(37));
	__export(__webpack_require__(38));
	__export(__webpack_require__(39));
	__export(__webpack_require__(40));
	__export(__webpack_require__(41));
	__export(__webpack_require__(42));
	__export(__webpack_require__(43));
	__export(__webpack_require__(44));
	__export(__webpack_require__(45));
	__export(__webpack_require__(67));
	__export(__webpack_require__(68));
	__export(__webpack_require__(69));
	__export(__webpack_require__(70));
	__export(__webpack_require__(73));
	__export(__webpack_require__(74));
	__export(__webpack_require__(75));


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Q = __webpack_require__(3);
	var _ = __webpack_require__(6);
	/**
	 * Return true if an value is any of predefined values (using strict equality), otherwise false.
	 * Predefined values are fetched async with options service.
	 *
	 * @require underscore
	 * @require Q
	 */
	var ContainsValidator = (function () {
	    /**
	     * Default constructor.
	     * @param Options - async service that returns array of values.
	     *
	     *
	     */
	    function ContainsValidator(Options) {
	        this.Options = Options;
	        this.isAsync = true;
	        this.tagName = 'contains';
	        if (Options === undefined)
	            this.Options = Q.when([]);
	    }
	    ContainsValidator.prototype.isAcceptable = function (s) {
	        var deferred = Q.defer();
	        this.Options.then(function (result) {
	            var hasSome = _.some(result, function (item) {
	                return item === s;
	            });
	            if (hasSome)
	                deferred.resolve(true);
	            deferred.resolve(false);
	        });
	        return deferred.promise;
	    };
	    return ContainsValidator;
	}());
	exports.ContainsValidator = ContainsValidator;


/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";
	/**
	* Return true if it is a valid Luhn card number based on http://en.wikipedia.org/wiki/Luhn/, otherwise false;
	*/
	var CreditCardValidator = (function () {
	    function CreditCardValidator() {
	        this.tagName = 'creditcard';
	    }
	    // taken from http://jqueryvalidation.org/creditcard-method/
	    CreditCardValidator.prototype.isAcceptable = function (value) {
	        // accept only spaces, digits and dashes
	        if (/[^0-9 \-]+/.test(value)) {
	            return false;
	        }
	        var nCheck = 0, nDigit = 0, bEven = false, n, cDigit;
	        value = value.replace(/\D/g, "");
	        // Basing min and max length on
	        // http://developer.ean.com/general_info/Valid_Credit_Card_Types
	        if (value.length < 13 || value.length > 19) {
	            return false;
	        }
	        for (n = value.length - 1; n >= 0; n--) {
	            cDigit = value.charAt(n);
	            nDigit = parseInt(cDigit, 10);
	            if (bEven) {
	                if ((nDigit *= 2) > 9) {
	                    nDigit -= 9;
	                }
	            }
	            nCheck += nDigit;
	            bEven = !bEven;
	        }
	        return (nCheck % 10) === 0;
	    };
	    return CreditCardValidator;
	}());
	exports.CreditCardValidator = CreditCardValidator;


/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Return true if it is a valid string ISO date representation (can be parsed as ISO date), otherwise false.
	 */
	var DateISOValidator = (function () {
	    function DateISOValidator() {
	        this.tagName = 'dateISO';
	    }
	    DateISOValidator.prototype.isAcceptable = function (s) {
	        return /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(s);
	    };
	    return DateISOValidator;
	}());
	exports.DateISOValidator = DateISOValidator;


/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Return true if it is a valid string date representation (can be parsed as date), otherwise false.
	 */
	var DateValidator = (function () {
	    function DateValidator() {
	        this.tagName = 'date';
	    }
	    DateValidator.prototype.isAcceptable = function (s) {
	        return !/Invalid|NaN/.test(new Date(s).toString());
	    };
	    return DateValidator;
	}());
	exports.DateValidator = DateValidator;


/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Return true if it is a valid digit representation, otherwise false.
	 */
	var DigitValidator = (function () {
	    function DigitValidator() {
	        this.tagName = 'digit';
	    }
	    DigitValidator.prototype.isAcceptable = function (s) {
	        return /^\d+$/.test(s);
	    };
	    return DigitValidator;
	}());
	exports.DigitValidator = DigitValidator;


/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Return true if it is a valid Internet email address as defined by RFC 5322, section 3.4.1, otherwise false
	 */
	var EmailValidator = (function () {
	    function EmailValidator() {
	        this.tagName = 'email';
	        // contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
	        this.emailRegexp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
	    }
	    EmailValidator.prototype.isAcceptable = function (s) {
	        return this.emailRegexp.test(s);
	    };
	    return EmailValidator;
	}());
	exports.EmailValidator = EmailValidator;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(6);
	/**
	 * Return true if an value is any of predefined values (using strict equality), otherwise false.
	 *
	 *  @require underscore
	 */
	var EnumValidator = (function () {
	    /**
	     * Default constructor.
	     * @param Enum - array of values
	     */
	    function EnumValidator(Enum) {
	        this.Enum = Enum;
	        this.tagName = 'enum';
	        if (Enum === undefined) {
	            this.Enum = [];
	        }
	    }
	    EnumValidator.prototype.isAcceptable = function (s) {
	        return _.contains(this.Enum, s);
	    };
	    return EnumValidator;
	}());
	exports.EnumValidator = EnumValidator;


/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";
	/**
	     * Return true if a value is equal (using strict equal) to passed value, otherwise false.
	     */
	var EqualToValidator = (function () {
	    /**
	     *
	     * @param Value
	     */
	    function EqualToValidator(Value) {
	        this.Value = Value;
	        this.tagName = 'equalTo';
	    }
	    EqualToValidator.prototype.isAcceptable = function (s) {
	        return s === this.Value;
	    };
	    return EqualToValidator;
	}());
	exports.EqualToValidator = EqualToValidator;


/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Return true if it is a valid string letter representation, otherwise false.
	 */
	var LettersOnlyValidator = (function () {
	    function LettersOnlyValidator() {
	        this.lettersRegexp = /^[A-Za-z]+$/;
	        this.tagName = 'lettersonly';
	    }
	    LettersOnlyValidator.prototype.isAcceptable = function (s) {
	        return this.lettersRegexp.test(s);
	    };
	    return LettersOnlyValidator;
	}());
	exports.LettersOnlyValidator = LettersOnlyValidator;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var max_length_validator_1 = __webpack_require__(35);
	var _ = __webpack_require__(6);
	/**
	 * Return true if an number of items in array is greater or equal to the value of 'maximum'.
	 *
	 *  @require underscore
	 */
	var MaxItemsValidator = (function () {
	    /**
	     * Default constructor.
	     * @param Max - the value of 'maximum'
	     */
	    function MaxItemsValidator(Max) {
	        this.Max = Max;
	        this.tagName = 'maxItems';
	        if (Max === undefined) {
	            this.Max = max_length_validator_1.MaximalDefaultValue;
	        }
	    }
	    MaxItemsValidator.prototype.isAcceptable = function (s) {
	        if (_.isArray(s)) {
	            return s.length <= this.Max;
	        }
	        return false;
	    };
	    return MaxItemsValidator;
	}());
	exports.MaxItemsValidator = MaxItemsValidator;


/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";
	exports.MaximalDefaultValue = 0;
	/**
	 * Return true if string length is less or equal to MaxLength property.
	 */
	var MaxLengthValidator = (function () {
	    /**
	     * Default constructor.
	     * @param MaxLength - maximal number of characters.
	     */
	    function MaxLengthValidator(MaxLength) {
	        this.MaxLength = MaxLength;
	        this.tagName = 'maxlength';
	        if (MaxLength === undefined) {
	            this.MaxLength = exports.MaximalDefaultValue;
	        }
	    }
	    MaxLengthValidator.prototype.isAcceptable = function (s) {
	        return s.length <= this.MaxLength;
	    };
	    return MaxLengthValidator;
	}());
	exports.MaxLengthValidator = MaxLengthValidator;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var max_length_validator_1 = __webpack_require__(35);
	var _ = __webpack_require__(6);
	/**
	     * Return true only for these conditions
	     * if 'Exclusive' is false, then the instance is valid if it is lower than, or equal to, the value of 'maximum';
	     * if 'Exclusive' is true, the instance is valid if it is strictly lower than the value of 'maximum'.
	     *
	     *  @require underscore
	     */
	var MaxValidator = (function () {
	    /**
	     * Default constructor
	     * @param Max - the value of 'maximum'
	     * @param Exclusive - true = strictly lower, otherwise lower or equal to the value of 'maximum';
	     */
	    function MaxValidator(Max, Exclusive) {
	        this.Max = Max;
	        this.Exclusive = Exclusive;
	        this.tagName = 'max';
	        if (Max === undefined) {
	            this.Max = max_length_validator_1.MaximalDefaultValue;
	        }
	    }
	    MaxValidator.prototype.isAcceptable = function (s) {
	        if (!_.isNumber(s)) {
	            s = parseFloat(s);
	        }
	        return this.Exclusive ? (s < this.Max) : (s <= this.Max);
	    };
	    return MaxValidator;
	}());
	exports.MaxValidator = MaxValidator;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var min_length_validator_1 = __webpack_require__(38);
	var _ = __webpack_require__(6);
	/**
	    * Return true if the number of items in array is lower or equal to the value of "minimum".
	    *
	    *  @require underscore
	    */
	var MinItemsValidator = (function () {
	    /**
	     * Default constructor.
	     * @param Max - the value of "minimum"
	     */
	    function MinItemsValidator(Min) {
	        this.Min = Min;
	        this.tagName = 'minItems';
	        if (Min === undefined) {
	            this.Min = min_length_validator_1.MinimalDefaultValue;
	        }
	    }
	    MinItemsValidator.prototype.isAcceptable = function (s) {
	        if (_.isArray(s)) {
	            return s.length >= this.Min;
	        }
	        return false;
	    };
	    return MinItemsValidator;
	}());
	exports.MinItemsValidator = MinItemsValidator;


/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	exports.MinimalDefaultValue = 0;
	/**
	 * Return true if string length is greater or equal to MinLength property.
	 */
	var MinLengthValidator = (function () {
	    /**
	     * Default constructor
	     * @param MinLength - minimal number of characters.
	     */
	    function MinLengthValidator(MinLength) {
	        this.MinLength = MinLength;
	        this.tagName = 'minlength';
	        if (MinLength === undefined) {
	            this.MinLength = exports.MinimalDefaultValue;
	        }
	    }
	    MinLengthValidator.prototype.isAcceptable = function (s) {
	        return s.length >= this.MinLength;
	    };
	    return MinLengthValidator;
	}());
	exports.MinLengthValidator = MinLengthValidator;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(6);
	var min_length_validator_1 = __webpack_require__(38);
	/**
	 * Return true only for these conditions
	 * if 'Exclusive' is false, then the instance is valid if it is greater than, or equal to, the value of 'minimum';
	 * if 'Exclusive' is true, the instance is valid if it is strictly greater than the value of 'minimum'.
	 *
	 *  @require underscore
	 */
	var MinValidator = (function () {
	    /**
	     * Default constructor.
	     * @param Min - the value of 'minimum'
	     * @param Exclusive - true = strictly greater, otherwise greater or equal to the value of 'minimum';
	     */
	    function MinValidator(Min, Exclusive) {
	        this.Min = Min;
	        this.Exclusive = Exclusive;
	        this.tagName = 'min';
	        if (Min === undefined) {
	            this.Min = min_length_validator_1.MinimalDefaultValue;
	        }
	    }
	    MinValidator.prototype.isAcceptable = function (s) {
	        if (!_.isNumber(s)) {
	            s = parseFloat(s);
	        }
	        return this.Exclusive ? (s > this.Min) : (s >= this.Min);
	    };
	    return MinValidator;
	}());
	exports.MinValidator = MinValidator;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(6);
	/**
	 * Return true if a numeric instance is valid against 'multipleOf' if the result of the division of the instance by this keyword's value is an integer, otherwise false.
	 *
	 *  @require underscore
	 */
	var MultipleOfValidator = (function () {
	    /**
	     * Default constructor
	     * @param Divider
	     */
	    function MultipleOfValidator(Divider) {
	        this.Divider = Divider;
	        this.tagName = 'multipleOf';
	        this.MultipleOfDefaultValue = 1;
	        if (Divider === undefined)
	            this.Divider = this.MultipleOfDefaultValue;
	    }
	    MultipleOfValidator.prototype.isAcceptable = function (s) {
	        if (!_.isNumber(s))
	            return false;
	        return (s % this.Divider) % 1 === 0;
	    };
	    return MultipleOfValidator;
	}());
	exports.MultipleOfValidator = MultipleOfValidator;


/***/ },
/* 41 */
/***/ function(module, exports) {

	"use strict";
	/**
	* Return true if it is a valid number representation, otherwise false.
	*/
	var NumberValidator = (function () {
	    function NumberValidator() {
	        this.tagName = 'number';
	    }
	    NumberValidator.prototype.isAcceptable = function (s) {
	        return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(s);
	    };
	    return NumberValidator;
	}());
	exports.NumberValidator = NumberValidator;


/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Return true if an value is valid against specified pattern, otherwise false.
	 */
	var PatternValidator = (function () {
	    /**
	     * Default constructor.
	     * @param Pattern - pattern
	     */
	    function PatternValidator(Pattern) {
	        this.Pattern = Pattern;
	        this.tagName = 'pattern';
	    }
	    PatternValidator.prototype.isAcceptable = function (s) {
	        return new RegExp(this.Pattern).test(s);
	    };
	    return PatternValidator;
	}());
	exports.PatternValidator = PatternValidator;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var min_length_validator_1 = __webpack_require__(38);
	var max_length_validator_1 = __webpack_require__(35);
	/**
	    * Return true if string length is between MinLength and MaxLength property.
	    */
	var RangeLengthValidator = (function () {
	    /**
	     * Default constructor.
	     * @param RangeLength - array [minimal number of characters, maximal number of characters]
	     */
	    function RangeLengthValidator(RangeLength) {
	        this.RangeLength = RangeLength;
	        this.tagName = 'rangelength';
	        if (RangeLength === undefined) {
	            this.RangeLength = [min_length_validator_1.MinimalDefaultValue, max_length_validator_1.MaximalDefaultValue];
	        }
	    }
	    RangeLengthValidator.prototype.isAcceptable = function (s) {
	        return s.length >= this.MinLength && s.length <= this.MaxLength;
	    };
	    Object.defineProperty(RangeLengthValidator.prototype, "MinLength", {
	        get: function () {
	            return this.RangeLength[0];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RangeLengthValidator.prototype, "MaxLength", {
	        get: function () {
	            return this.RangeLength[1];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return RangeLengthValidator;
	}());
	exports.RangeLengthValidator = RangeLengthValidator;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var min_length_validator_1 = __webpack_require__(38);
	var max_length_validator_1 = __webpack_require__(35);
	var _ = __webpack_require__(6);
	/**
	 * Return true if value is between Min and Max property.
	 *
	 *  @require underscore
	 */
	var RangeValidator = (function () {
	    /**
	     * Default constructor.
	     * @param Range - array [the value of 'minimum', the value of 'maximum']
	     */
	    function RangeValidator(Range) {
	        this.Range = Range;
	        this.tagName = 'range';
	        if (Range === undefined) {
	            this.Range = [min_length_validator_1.MinimalDefaultValue, max_length_validator_1.MaximalDefaultValue];
	        }
	        ;
	    }
	    RangeValidator.prototype.isAcceptable = function (s) {
	        if (!_.isNumber(s)) {
	            s = parseFloat(s);
	        }
	        return s >= this.Min && s <= this.Max;
	    };
	    Object.defineProperty(RangeValidator.prototype, "Min", {
	        /**
	         * Return the value of 'minimum'
	         * @returns {number}
	         */
	        get: function () {
	            return this.Range[0];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RangeValidator.prototype, "Max", {
	        /**
	         * Return the value of 'maximum'
	         * @returns {number}
	         */
	        get: function () {
	            return this.Range[1];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return RangeValidator;
	}());
	exports.RangeValidator = RangeValidator;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Q = __webpack_require__(3);
	var axios = __webpack_require__(46);
	var _ = __webpack_require__(6);
	/**
	 * Return true if remote service returns true, otherwise false.
	 *
	 * @require underscore
	 * @require Q
	 * @require axios
	 *
	 * @example
	 * ```typescript
	 *  url: 'http://test/validateEmail',
	 *  ```
	 */
	var RemoteValidator = (function () {
	    /**
	     * Default constructor
	     * @param Options - remote service url + options
	     */
	    function RemoteValidator(Options) {
	        this.Options = Options;
	        this.tagName = 'remote';
	        this.isAsync = true;
	        this.axios = axios;
	    }
	    RemoteValidator.prototype.isAcceptable = function (s) {
	        var deferred = Q.defer();
	        this.axios.post(this.Options.url, {
	            method: this.Options.type || 'get',
	            data: _.extend({} || this.Options.data, {
	                'value': s
	            })
	        }).then(function (response) {
	            var isAcceptable = response === true || response === 'true';
	            deferred.resolve(isAcceptable);
	        })
	            .catch(function (response) {
	            deferred.resolve(false);
	            console.log(response);
	        });
	        return deferred.promise;
	    };
	    return RemoteValidator;
	}());
	exports.RemoteValidator = RemoteValidator;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(47);

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var Promise = __webpack_require__(48).Promise;
	var defaults = __webpack_require__(58);
	var utils = __webpack_require__(59);
	var spread = __webpack_require__(60);
	
	var axios = module.exports = function axios(config) {
	  config = utils.merge({
	    method: 'get',
	    transformRequest: defaults.transformRequest,
	    transformResponse: defaults.transformResponse
	  }, config);
	
	  // Don't allow overriding defaults.withCredentials
	  config.withCredentials = config.withCredentials || defaults.withCredentials;
	
	  var promise = new Promise(function (resolve, reject) {
	    try {
	      // For browsers use XHR adapter
	      if (typeof window !== 'undefined') {
	        __webpack_require__(61)(resolve, reject, config);
	      }
	      // For node use HTTP adapter
	      else if (typeof process !== 'undefined') {
	        __webpack_require__(61)(resolve, reject, config);
	      }
	    } catch (e) {
	      reject(e);
	    }
	  });
	
	  // Provide alias for success
	  promise.success = function success(fn) {
	    promise.then(function(response) {
	      fn(response.data, response.status, response.headers, response.config);
	    });
	    return promise;
	  };
	
	  // Provide alias for error
	  promise.error = function error(fn) {
	    promise.then(null, function(response) {
	      fn(response.data, response.status, response.headers, response.config);
	    });
	    return promise;
	  };
	
	  return promise;
	};
	
	// Expose defaults
	axios.defaults = defaults;
	
	// Expose all/spread
	axios.all = function (promises) {
	  return Promise.all(promises);
	};
	axios.spread = spread;
	
	// Provide aliases for supported request methods
	createShortMethods('delete', 'get', 'head');
	createShortMethodsWithData('post', 'put', 'patch');
	
	function createShortMethods() {
	  utils.forEach(arguments, function (method) {
	    axios[method] = function (url, config) {
	      return axios(utils.merge(config || {}, {
	        method: method,
	        url: url
	      }));
	    };
	  });
	}
	
	function createShortMethodsWithData() {
	  utils.forEach(arguments, function (method) {
	    axios[method] = function (url, data, config) {
	      return axios(utils.merge(config || {}, {
	        method: method,
	        url: url,
	        data: data
	      }));
	    };
	  });
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Promise = __webpack_require__(49).Promise;
	var polyfill = __webpack_require__(57).polyfill;
	exports.Promise = Promise;
	exports.polyfill = polyfill;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var config = __webpack_require__(50).config;
	var configure = __webpack_require__(50).configure;
	var objectOrFunction = __webpack_require__(51).objectOrFunction;
	var isFunction = __webpack_require__(51).isFunction;
	var now = __webpack_require__(51).now;
	var all = __webpack_require__(52).all;
	var race = __webpack_require__(53).race;
	var staticResolve = __webpack_require__(54).resolve;
	var staticReject = __webpack_require__(55).reject;
	var asap = __webpack_require__(56).asap;
	
	var counter = 0;
	
	config.async = asap; // default async is asap;
	
	function Promise(resolver) {
	  if (!isFunction(resolver)) {
	    throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	  }
	
	  if (!(this instanceof Promise)) {
	    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	  }
	
	  this._subscribers = [];
	
	  invokeResolver(resolver, this);
	}
	
	function invokeResolver(resolver, promise) {
	  function resolvePromise(value) {
	    resolve(promise, value);
	  }
	
	  function rejectPromise(reason) {
	    reject(promise, reason);
	  }
	
	  try {
	    resolver(resolvePromise, rejectPromise);
	  } catch(e) {
	    rejectPromise(e);
	  }
	}
	
	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value, error, succeeded, failed;
	
	  if (hasCallback) {
	    try {
	      value = callback(detail);
	      succeeded = true;
	    } catch(e) {
	      failed = true;
	      error = e;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }
	
	  if (handleThenable(promise, value)) {
	    return;
	  } else if (hasCallback && succeeded) {
	    resolve(promise, value);
	  } else if (failed) {
	    reject(promise, error);
	  } else if (settled === FULFILLED) {
	    resolve(promise, value);
	  } else if (settled === REJECTED) {
	    reject(promise, value);
	  }
	}
	
	var PENDING   = void 0;
	var SEALED    = 0;
	var FULFILLED = 1;
	var REJECTED  = 2;
	
	function subscribe(parent, child, onFulfillment, onRejection) {
	  var subscribers = parent._subscribers;
	  var length = subscribers.length;
	
	  subscribers[length] = child;
	  subscribers[length + FULFILLED] = onFulfillment;
	  subscribers[length + REJECTED]  = onRejection;
	}
	
	function publish(promise, settled) {
	  var child, callback, subscribers = promise._subscribers, detail = promise._detail;
	
	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];
	
	    invokeCallback(settled, child, callback, detail);
	  }
	
	  promise._subscribers = null;
	}
	
	Promise.prototype = {
	  constructor: Promise,
	
	  _state: undefined,
	  _detail: undefined,
	  _subscribers: undefined,
	
	  then: function(onFulfillment, onRejection) {
	    var promise = this;
	
	    var thenPromise = new this.constructor(function() {});
	
	    if (this._state) {
	      var callbacks = arguments;
	      config.async(function invokePromiseCallback() {
	        invokeCallback(promise._state, thenPromise, callbacks[promise._state - 1], promise._detail);
	      });
	    } else {
	      subscribe(this, thenPromise, onFulfillment, onRejection);
	    }
	
	    return thenPromise;
	  },
	
	  'catch': function(onRejection) {
	    return this.then(null, onRejection);
	  }
	};
	
	Promise.all = all;
	Promise.race = race;
	Promise.resolve = staticResolve;
	Promise.reject = staticReject;
	
	function handleThenable(promise, value) {
	  var then = null,
	  resolved;
	
	  try {
	    if (promise === value) {
	      throw new TypeError("A promises callback cannot return that same promise.");
	    }
	
	    if (objectOrFunction(value)) {
	      then = value.then;
	
	      if (isFunction(then)) {
	        then.call(value, function(val) {
	          if (resolved) { return true; }
	          resolved = true;
	
	          if (value !== val) {
	            resolve(promise, val);
	          } else {
	            fulfill(promise, val);
	          }
	        }, function(val) {
	          if (resolved) { return true; }
	          resolved = true;
	
	          reject(promise, val);
	        });
	
	        return true;
	      }
	    }
	  } catch (error) {
	    if (resolved) { return true; }
	    reject(promise, error);
	    return true;
	  }
	
	  return false;
	}
	
	function resolve(promise, value) {
	  if (promise === value) {
	    fulfill(promise, value);
	  } else if (!handleThenable(promise, value)) {
	    fulfill(promise, value);
	  }
	}
	
	function fulfill(promise, value) {
	  if (promise._state !== PENDING) { return; }
	  promise._state = SEALED;
	  promise._detail = value;
	
	  config.async(publishFulfillment, promise);
	}
	
	function reject(promise, reason) {
	  if (promise._state !== PENDING) { return; }
	  promise._state = SEALED;
	  promise._detail = reason;
	
	  config.async(publishRejection, promise);
	}
	
	function publishFulfillment(promise) {
	  publish(promise, promise._state = FULFILLED);
	}
	
	function publishRejection(promise) {
	  publish(promise, promise._state = REJECTED);
	}
	
	exports.Promise = Promise;

/***/ },
/* 50 */
/***/ function(module, exports) {

	"use strict";
	var config = {
	  instrument: false
	};
	
	function configure(name, value) {
	  if (arguments.length === 2) {
	    config[name] = value;
	  } else {
	    return config[name];
	  }
	}
	
	exports.config = config;
	exports.configure = configure;

/***/ },
/* 51 */
/***/ function(module, exports) {

	"use strict";
	function objectOrFunction(x) {
	  return isFunction(x) || (typeof x === "object" && x !== null);
	}
	
	function isFunction(x) {
	  return typeof x === "function";
	}
	
	function isArray(x) {
	  return Object.prototype.toString.call(x) === "[object Array]";
	}
	
	// Date.now is not available in browsers < IE9
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now#Compatibility
	var now = Date.now || function() { return new Date().getTime(); };
	
	
	exports.objectOrFunction = objectOrFunction;
	exports.isFunction = isFunction;
	exports.isArray = isArray;
	exports.now = now;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* global toString */
	
	var isArray = __webpack_require__(51).isArray;
	var isFunction = __webpack_require__(51).isFunction;
	
	/**
	  Returns a promise that is fulfilled when all the given promises have been
	  fulfilled, or rejected if any of them become rejected. The return promise
	  is fulfilled with an array that gives all the values in the order they were
	  passed in the `promises` array argument.
	
	  Example:
	
	  ```javascript
	  var promise1 = RSVP.resolve(1);
	  var promise2 = RSVP.resolve(2);
	  var promise3 = RSVP.resolve(3);
	  var promises = [ promise1, promise2, promise3 ];
	
	  RSVP.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```
	
	  If any of the `promises` given to `RSVP.all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:
	
	  Example:
	
	  ```javascript
	  var promise1 = RSVP.resolve(1);
	  var promise2 = RSVP.reject(new Error("2"));
	  var promise3 = RSVP.reject(new Error("3"));
	  var promises = [ promise1, promise2, promise3 ];
	
	  RSVP.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```
	
	  @method all
	  @for RSVP
	  @param {Array} promises
	  @param {String} label
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	*/
	function all(promises) {
	  /*jshint validthis:true */
	  var Promise = this;
	
	  if (!isArray(promises)) {
	    throw new TypeError('You must pass an array to all.');
	  }
	
	  return new Promise(function(resolve, reject) {
	    var results = [], remaining = promises.length,
	    promise;
	
	    if (remaining === 0) {
	      resolve([]);
	    }
	
	    function resolver(index) {
	      return function(value) {
	        resolveAll(index, value);
	      };
	    }
	
	    function resolveAll(index, value) {
	      results[index] = value;
	      if (--remaining === 0) {
	        resolve(results);
	      }
	    }
	
	    for (var i = 0; i < promises.length; i++) {
	      promise = promises[i];
	
	      if (promise && isFunction(promise.then)) {
	        promise.then(resolver(i), reject);
	      } else {
	        resolveAll(i, promise);
	      }
	    }
	  });
	}
	
	exports.all = all;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* global toString */
	var isArray = __webpack_require__(51).isArray;
	
	/**
	  `RSVP.race` allows you to watch a series of promises and act as soon as the
	  first promise given to the `promises` argument fulfills or rejects.
	
	  Example:
	
	  ```javascript
	  var promise1 = new RSVP.Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve("promise 1");
	    }, 200);
	  });
	
	  var promise2 = new RSVP.Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve("promise 2");
	    }, 100);
	  });
	
	  RSVP.race([promise1, promise2]).then(function(result){
	    // result === "promise 2" because it was resolved before promise1
	    // was resolved.
	  });
	  ```
	
	  `RSVP.race` is deterministic in that only the state of the first completed
	  promise matters. For example, even if other promises given to the `promises`
	  array argument are resolved, but the first completed promise has become
	  rejected before the other promises became fulfilled, the returned promise
	  will become rejected:
	
	  ```javascript
	  var promise1 = new RSVP.Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve("promise 1");
	    }, 200);
	  });
	
	  var promise2 = new RSVP.Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error("promise 2"));
	    }, 100);
	  });
	
	  RSVP.race([promise1, promise2]).then(function(result){
	    // Code here never runs because there are rejected promises!
	  }, function(reason){
	    // reason.message === "promise2" because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```
	
	  @method race
	  @for RSVP
	  @param {Array} promises array of promises to observe
	  @param {String} label optional string for describing the promise returned.
	  Useful for tooling.
	  @return {Promise} a promise that becomes fulfilled with the value the first
	  completed promises is resolved with if the first completed promise was
	  fulfilled, or rejected with the reason that the first completed promise
	  was rejected with.
	*/
	function race(promises) {
	  /*jshint validthis:true */
	  var Promise = this;
	
	  if (!isArray(promises)) {
	    throw new TypeError('You must pass an array to race.');
	  }
	  return new Promise(function(resolve, reject) {
	    var results = [], promise;
	
	    for (var i = 0; i < promises.length; i++) {
	      promise = promises[i];
	
	      if (promise && typeof promise.then === 'function') {
	        promise.then(resolve, reject);
	      } else {
	        resolve(promise);
	      }
	    }
	  });
	}
	
	exports.race = race;

/***/ },
/* 54 */
/***/ function(module, exports) {

	"use strict";
	function resolve(value) {
	  /*jshint validthis:true */
	  if (value && typeof value === 'object' && value.constructor === this) {
	    return value;
	  }
	
	  var Promise = this;
	
	  return new Promise(function(resolve) {
	    resolve(value);
	  });
	}
	
	exports.resolve = resolve;

/***/ },
/* 55 */
/***/ function(module, exports) {

	"use strict";
	/**
	  `RSVP.reject` returns a promise that will become rejected with the passed
	  `reason`. `RSVP.reject` is essentially shorthand for the following:
	
	  ```javascript
	  var promise = new RSVP.Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  var promise = RSVP.reject(new Error('WHOOPS'));
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  @method reject
	  @for RSVP
	  @param {Any} reason value that the returned promise will be rejected with.
	  @param {String} label optional string for identifying the returned promise.
	  Useful for tooling.
	  @return {Promise} a promise that will become rejected with the given
	  `reason`.
	*/
	function reject(reason) {
	  /*jshint validthis:true */
	  var Promise = this;
	
	  return new Promise(function (resolve, reject) {
	    reject(reason);
	  });
	}
	
	exports.reject = reject;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {"use strict";
	var browserGlobal = (typeof window !== 'undefined') ? window : {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var local = (typeof global !== 'undefined') ? global : (this === undefined? window:this);
	
	// node
	function useNextTick() {
	  return function() {
	    process.nextTick(flush);
	  };
	}
	
	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });
	
	  return function() {
	    node.data = (iterations = ++iterations % 2);
	  };
	}
	
	function useSetTimeout() {
	  return function() {
	    local.setTimeout(flush, 1);
	  };
	}
	
	var queue = [];
	function flush() {
	  for (var i = 0; i < queue.length; i++) {
	    var tuple = queue[i];
	    var callback = tuple[0], arg = tuple[1];
	    callback(arg);
	  }
	  queue = [];
	}
	
	var scheduleFlush;
	
	// Decide what async method to use to triggering processing of queued callbacks:
	if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else {
	  scheduleFlush = useSetTimeout();
	}
	
	function asap(callback, arg) {
	  var length = queue.push([callback, arg]);
	  if (length === 1) {
	    // If length is 1, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    scheduleFlush();
	  }
	}
	
	exports.asap = asap;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4)))

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	/*global self*/
	var RSVPPromise = __webpack_require__(49).Promise;
	var isFunction = __webpack_require__(51).isFunction;
	
	function polyfill() {
	  var local;
	
	  if (typeof global !== 'undefined') {
	    local = global;
	  } else if (typeof window !== 'undefined' && window.document) {
	    local = window;
	  } else {
	    local = self;
	  }
	
	  var es6PromiseSupport = 
	    "Promise" in local &&
	    // Some of these methods are missing from
	    // Firefox/Chrome experimental implementations
	    "resolve" in local.Promise &&
	    "reject" in local.Promise &&
	    "all" in local.Promise &&
	    "race" in local.Promise &&
	    // Older version of the spec had a resolver object
	    // as the arg rather than a function
	    (function() {
	      var resolve;
	      new local.Promise(function(r) { resolve = r; });
	      return isFunction(resolve);
	    }());
	
	  if (!es6PromiseSupport) {
	    local.Promise = RSVPPromise;
	  }
	}
	
	exports.polyfill = polyfill;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(59);
	
	var JSON_START = /^\s*(\[|\{[^\{])/;
	var JSON_END = /[\}\]]\s*$/;
	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var CONTENT_TYPE_APPLICATION_JSON = {
	  'Content-Type': 'application/json;charset=utf-8'
	};
	
	module.exports = {
	  transformRequest: [function (data) {
	    return utils.isObject(data) &&
	          !utils.isFile(data) &&
	          !utils.isBlob(data) ?
	            JSON.stringify(data) : data;
	  }],
	
	  transformResponse: [function (data) {
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      if (JSON_START.test(data) && JSON_END.test(data)) {
	        data = JSON.parse(data);
	      }
	    }
	    return data;
	  }],
	
	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*'
	    },
	    patch: utils.merge(CONTENT_TYPE_APPLICATION_JSON),
	    post: utils.merge(CONTENT_TYPE_APPLICATION_JSON),
	    put: utils.merge(CONTENT_TYPE_APPLICATION_JSON)
	  },
	
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN'
	};

/***/ },
/* 59 */
/***/ function(module, exports) {

	// utils is a library of generic helper functions non-specific to axios
	
	var toString = Object.prototype.toString;
	
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}
	
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}
	
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}
	
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}
	
	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}
	
	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}
	
	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}
	
	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}
	
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array or arguments callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
	
	  // Check if obj is array-like
	  var isArray = obj.constructor === Array || typeof obj.callee === 'function';
	
	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray) {
	    obj = [obj];
	  }
	
	  // Iterate over array values
	  if (isArray) {
	    for (var i=0, l=obj.length; i<l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  }
	  // Iterate over object keys
	  else {
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}
	
	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(obj1/*, obj2, obj3, ...*/) {
	  var result = {};
	  forEach(arguments, function (obj) {
	    forEach(obj, function (val, key) {
	      result[key] = val;
	    });
	  });
	  return result;
	}
	
	module.exports = {
	  isArray: isArray,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  forEach: forEach,
	  merge: merge,
	  trim: trim
	};

/***/ },
/* 60 */
/***/ function(module, exports) {

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function (arr) {
	    callback.apply(null, arr);
	  };
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var buildUrl = __webpack_require__(62);
	var cookies = __webpack_require__(63);
	var defaults = __webpack_require__(58);
	var parseHeaders = __webpack_require__(64);
	var transformData = __webpack_require__(65);
	var urlIsSameOrigin = __webpack_require__(66);
	var utils = __webpack_require__(59);
	
	module.exports = function xhrAdapter(resolve, reject, config) {
	  // Transform request data
	  var data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );
	
	  // Merge headers
	  var headers = utils.merge(
	    defaults.headers.common,
	    defaults.headers[config.method] || {},
	    config.headers || {}
	  );
	
	  // Create the request
	  var request = new(XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP');
	  request.open(config.method, buildUrl(config.url, config.params), true);
	
	  // Listen for ready state
	  request.onreadystatechange = function () {
	    if (request && request.readyState === 4) {
	      // Prepare the response
	      var headers = parseHeaders(request.getAllResponseHeaders());
	      var response = {
	        data: transformData(
	          request.responseText,
	          headers,
	          config.transformResponse
	        ),
	        status: request.status,
	        headers: headers,
	        config: config
	      };
	
	      // Resolve or reject the Promise based on the status
	      (request.status >= 200 && request.status < 300
	        ? resolve
	        : reject)(response);
	
	      // Clean up request
	      request = null;
	    }
	  };
	
	  // Add xsrf header
	  var xsrfValue = urlIsSameOrigin(config.url)
	    ? cookies.read(config.xsrfCookieName || defaults.xsrfCookieName)
	    : undefined;
	  if (xsrfValue) {
	    headers[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue;
	  }
	
	  // Add headers to the request
	  utils.forEach(headers, function (val, key) {
	    // Remove Content-Type if data is undefined
	    if (!data && key.toLowerCase() === 'content-type') {
	      delete headers[key];
	    }
	    // Otherwise add header to the request
	    else {
	      request.setRequestHeader(key, val);
	    }
	  });
	
	  // Add withCredentials to request if needed
	  if (config.withCredentials) {
	    request.withCredentials = true;
	  }
	
	  // Add responseType to request if needed
	  if (config.responseType) {
	    try {
	      request.responseType = config.responseType;
	    } catch (e) {
	      if (request.responseType !== 'json') {
	        throw e;
	      }
	    }
	  }
	
	  // Send the request
	  request.send(data);
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(59);
	
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+');
	}
	
	module.exports = function buildUrl(url, params) {
	  if (!params) {
	    return url;
	  }
	
	  var parts = [];
	
	  utils.forEach(params, function (val, key) {
	    if (val === null || typeof val === 'undefined') {
	      return;
	    }
	    if (!utils.isArray(val)) {
	      val = [val];
	    }
	
	    utils.forEach(val, function (v) {
	      if (utils.isDate(v)) {
	        v = v.toISOString();
	      }
	      else if (utils.isObject(v)) {
	        v = JSON.stringify(v);
	      }
	      parts.push(encode(key) + '=' + encode(v));
	    });
	  });
	
	  if (parts.length > 0) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&');
	  }
	
	  return url;
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(59);
	
	module.exports = {
	  write: function write(name, value, expires, path, domain, secure) {
	    var cookie = [];
	    cookie.push(name + '=' + encodeURIComponent(value));
	
	    if (utils.isNumber(expires)) {
	      cookie.push('expires=' + new Date(expires).toGMTString());
	    }
	
	    if (utils.isString(path)) {
	      cookie.push('path=' + path);
	    }
	
	    if (utils.isString(domain)) {
	      cookie.push('domain=' + domain);
	    }
	
	    if (secure === true) {
	      cookie.push('secure');
	    }
	
	    document.cookie = cookie.join('; ');
	  },
	
	  read: function read(name) {
	    var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	    return (match ? decodeURIComponent(match[3]) : null);
	  },
	
	  remove: function remove(name) {
	    this.write(name, '', Date.now() - 86400000);
	  }
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(59);
	
	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {}, key, val, i;
	
	  if (!headers) return parsed;
	
	  utils.forEach(headers.split('\n'), function(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));
	
	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });
	
	  return parsed;
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(59);
	
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  utils.forEach(fns, function (fn) {
	    data = fn(data, headers);
	  });
	
	  return data;
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var msie = /(msie|trident)/i.test(navigator.userAgent);
	var utils = __webpack_require__(59);
	var urlParsingNode = document.createElement('a');
	var originUrl = urlResolve(window.location.href);
	
	/**
	 * Parse a URL to discover it's components
	 *
	 * @param {String} url The URL to be parsed
	 * @returns {Object}
	 */
	function urlResolve(url) {
	  var href = url;
	
	  if (msie) {
	    // IE needs attribute set twice to normalize properties
	    urlParsingNode.setAttribute('href', href);
	    href = urlParsingNode.href;
	  }
	
	  urlParsingNode.setAttribute('href', href);
	
	  // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	  return {
	    href: urlParsingNode.href,
	    protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	    host: urlParsingNode.host,
	    search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	    hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	    hostname: urlParsingNode.hostname,
	    port: urlParsingNode.port,
	    pathname: (urlParsingNode.pathname.charAt(0) === '/')
	      ? urlParsingNode.pathname
	      : '/' + urlParsingNode.pathname
	  };
	}
	
	/**
	 * Determine if a URL shares the same origin as the current location
	 *
	 * @param {String} requestUrl The URL to test
	 * @returns {boolean} True if URL shares the same origin, otherwise false
	 */
	module.exports = function urlIsSameOrigin(requestUrl) {
	  var parsed = (utils.isString(requestUrl)) ? urlResolve(requestUrl) : requestUrl;
	  return (parsed.protocol === originUrl.protocol &&
	        parsed.host === originUrl.host);
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Return true if it is not empty value, otherwise false.
	 */
	var RequiredValidator = (function () {
	    function RequiredValidator() {
	        this.tagName = 'required';
	    }
	    RequiredValidator.prototype.isAcceptable = function (s) {
	        return s !== undefined && s !== '' && s !== null;
	    };
	    return RequiredValidator;
	}());
	exports.RequiredValidator = RequiredValidator;


/***/ },
/* 68 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Return true if it is a valid positive or negative digit representation, otherwise false.
	 */
	var SignedDigitValidator = (function () {
	    function SignedDigitValidator() {
	        this.tagName = 'signedDigit';
	    }
	    SignedDigitValidator.prototype.isAcceptable = function (s) {
	        return /^-?\d+$/.test(s);
	    };
	    return SignedDigitValidator;
	}());
	exports.SignedDigitValidator = SignedDigitValidator;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var number_fce_1 = __webpack_require__(12);
	/**
	     * Return true if an value is multiplier of passed number step, otherwise false.
	     */
	var StepValidator = (function () {
	    /**
	     * Default constructor.
	     * @param Step - step multiplier
	     */
	    function StepValidator(Step) {
	        this.Step = Step;
	        this.tagName = 'step';
	        this.StepDefaultValue = '1';
	        if (Step === undefined) {
	            this.Step = this.StepDefaultValue;
	        }
	    }
	    StepValidator.prototype.isAcceptable = function (s) {
	        var maxNegDigits = Math.max(number_fce_1.NumberFce.GetNegDigits(s), number_fce_1.NumberFce.GetNegDigits(this.Step));
	        var multiplier = Math.pow(10, maxNegDigits);
	        return (parseInt(s, 10) * multiplier) % (parseInt(this.Step, 10) * multiplier) === 0;
	    };
	    return StepValidator;
	}());
	exports.StepValidator = StepValidator;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(6);
	var cnpj_validator_1 = __webpack_require__(71);
	var cpf_validator_1 = __webpack_require__(72);
	/**
	 * Return true if an value is a specified type, otherwise false.
	 *
	 *  @require underscore
	 */
	var TypeValidator = (function () {
	    /*
	     * Default constructor.
	     * @param Type - keywords that defines an concrete type
	     */
	    function TypeValidator(Type) {
	        this.Type = Type;
	        this.tagName = 'type';
	        this.cnpjValidator = new cnpj_validator_1.CNPJValidator();
	        this.cpfValidator = new cpf_validator_1.CPFValidator();
	        if (this.Type === undefined) {
	            this.Type = 'string';
	        }
	    }
	    TypeValidator.prototype.isAcceptable = function (s) {
	        switch (this.Type) {
	            case 'string':
	                return _.isString(s);
	            case 'boolean':
	                return _.isBoolean(s);
	            case 'number':
	                return _.isNumber(s);
	            case 'date':
	                return _.isDate(s);
	            case 'integer':
	                return /^\d+$/.test(s);
	            case 'object':
	                return _.isObject(s);
	            case 'array':
	                return _.isArray(s);
	            case 'cnpj':
	                return this.cnpjValidator.isAcceptable(s);
	            case 'cpf':
	                return this.cpfValidator.isAcceptable(s);
	            case 'cpfcnpj':
	                return this.cpfValidator.isAcceptable(s) || this.cnpjValidator.isAcceptable(s);
	            case 'cnpjcpf':
	                return this.cpfValidator.isAcceptable(s) || this.cnpjValidator.isAcceptable(s);
	            default:
	                return false;
	        }
	    };
	    return TypeValidator;
	}());
	exports.TypeValidator = TypeValidator;


/***/ },
/* 71 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @ngdoc object
	 * @name CNPJValidator
	 *
	 * @description
	 * Return true for valid cpf, otherwise return false.
	 *
	 * @example
	 *
	 * <pre>
	 *  //create validator
	 *  let validator = new CNPJValidator();
	 *
	 *  //valid CNPJ -> return true
	 *  let result = validator.isAcceptable('00000000000191');
	 *  //unvalid CNPJ  -> return false
	 *  let result = validator.isAcceptable('00000000000192');
	 *
	 * </pre>
	 */
	var CNPJValidator = (function () {
	    function CNPJValidator() {
	        this.tagName = 'cnpj';
	    }
	    /**
	     * It checks validity of identification number of CZE company (called ico)
	     * @param input {string} value to check
	     * @returns {boolean} return true for valid value, otherwise false
	     */
	    CNPJValidator.prototype.isAcceptable = function (input) {
	        if (input === undefined)
	            return false;
	        if (input.length === 0 || input.length !== 14)
	            return false;
	        if (!/^\d+$/.test(input))
	            return false;
	        if ([
	            '00000000000000', '11111111111111', '22222222222222', '33333333333333',
	            '44444444444444', '55555555555555', '66666666666666', '77777777777777',
	            '88888888888888', '99999999999999'
	        ].indexOf(input) > -1) {
	            return false;
	        }
	        var Sci = [];
	        var Souc;
	        var Del = input.length;
	        var kon = parseInt(input.substring(Del, Del - 1), 10); // CLng(Right(strInput, 1));
	        // let Numer = parseInt(input.substring(0,Del - 1),10);
	        Del = Del - 1;
	        Souc = 0;
	        for (var a = 0; a < Del; a++) {
	            Sci[a] = parseInt(input.substr((Del - a) - 1, 1), 10);
	            Sci[a] = Sci[a] * (a + 2);
	            Souc = Souc + Sci[a];
	        }
	        if (Souc > 0) {
	            // let resul = 11 - (Souc % 11);
	            var resul = Souc % 11;
	            var mezi = Souc - resul;
	            resul = mezi + 11;
	            resul = resul - Souc;
	            if ((resul === 10 && kon === 0) || (resul === 11 && kon === 1) || (resul === kon))
	                return true;
	        }
	        return false;
	    };
	    return CNPJValidator;
	}());
	exports.CNPJValidator = CNPJValidator;


/***/ },
/* 72 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @ngdoc object
	 * @name CPFValidator
	 *
	 * @description
	 * Return true for valid cpf, otherwise return false.
	 *
	 * @example
	 *
	 * <pre>
	 *  //create validator
	 *  let validator = new CPFValidator();
	 *
	 *  //valid CPF -> return true
	 *  let result = validator.isAcceptable('42752206259');
	 *  //unvalid IC  -> return false
	 *  let result = validator.isAcceptable('11111111111');
	 *
	 * </pre>
	 */
	var CPFValidator = (function () {
	    function CPFValidator() {
	        this.tagName = 'cpf';
	    }
	    /**
	     * It checks validity of identification number of CZE company (called ico)
	     * @param input {string} value to check
	     * @returns {boolean} return true for valid value, otherwise false
	     */
	    CPFValidator.prototype.isAcceptable = function (input) {
	        if (input === undefined)
	            return false;
	        if (input.length === 0 || input.length !== 11)
	            return false;
	        if (!/^\d+$/.test(input))
	            return false;
	        if ([
	            '00000000000', '11111111111', '22222222222', '33333333333',
	            '44444444444', '55555555555', '66666666666', '77777777777',
	            '88888888888', '99999999999'
	        ].indexOf(input) > -1) {
	            return false;
	        }
	        var Sci = [];
	        var Souc;
	        var Del = input.length;
	        var kon = parseInt(input.substring(Del, Del - 1), 10); // CLng(Right(strInput, 1));
	        // let Numer = parseInt(input.substring(0,Del - 1),10);
	        Del = Del - 1;
	        Souc = 0;
	        for (var a = 0; a < Del; a++) {
	            Sci[a] = parseInt(input.substr((Del - a) - 1, 1), 10);
	            Sci[a] = Sci[a] * (a + 2);
	            Souc = Souc + Sci[a];
	        }
	        if (Souc > 0) {
	            // let resul = 11 - (Souc % 11);
	            var resul = Souc % 11;
	            var mezi = Souc - resul;
	            resul = mezi + 11;
	            resul = resul - Souc;
	            if ((resul === 10 && kon === 0) || (resul === 11 && kon === 1) || (resul === kon))
	                return true;
	        }
	        return false;
	    };
	    return CPFValidator;
	}());
	exports.CPFValidator = CPFValidator;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(6);
	/**
	     * Return true if the array contains unique items (using strict equality), otherwise false.
	     *
	     *  @require underscore
	     */
	var UniqItemsValidator = (function () {
	    function UniqItemsValidator() {
	        this.tagName = 'uniqItems';
	    }
	    UniqItemsValidator.prototype.isAcceptable = function (s) {
	        if (_.isArray(s)) {
	            return _.uniq(s).length === s.length;
	        }
	        return false;
	    };
	    return UniqItemsValidator;
	}());
	exports.UniqItemsValidator = UniqItemsValidator;


/***/ },
/* 74 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Return true if it is a valid URI, according to [RFC3986], otherwise false.
	 */
	var UrlValidator = (function () {
	    function UrlValidator() {
	        this.tagName = 'url';
	        // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
	        this.urlRegexp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
	    }
	    UrlValidator.prototype.isAcceptable = function (s) {
	        return this.urlRegexp.test(s);
	    };
	    return UrlValidator;
	}());
	exports.UrlValidator = UrlValidator;


/***/ },
/* 75 */
/***/ function(module, exports) {

	"use strict";
	/**
	  * Return true if it is a valid zip code, otherwise false.
	  */
	var ZipCodeValidator = (function () {
	    function ZipCodeValidator() {
	        this.numberRegexp = /^[0-9]+$/;
	        this.tagName = 'zipcode';
	    }
	    ZipCodeValidator.prototype.isAcceptable = function (s) {
	        return s.length === 5 && this.numberRegexp.test(s);
	    };
	    return ZipCodeValidator;
	}());
	exports.ZipCodeValidator = ZipCodeValidator;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/**
	 * @module foo
	 */
	__export(__webpack_require__(77));
	__export(__webpack_require__(78));
	__export(__webpack_require__(79));


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Validation = __webpack_require__(1);
	var Validators = __webpack_require__(24);
	var _ = __webpack_require__(6);
	/**
	 * It represents the JSON schema factory for creating validation rules based on raw JSON data annotated by validation rules.
	 * It uses constraints keywords from JQuery validation plugin.
	 */
	var JQueryValidationRuleFactory = (function () {
	    /**
	     * Default constructor
	     * @param metaData -  raw JSON data annotated by validation rules
	     */
	    function JQueryValidationRuleFactory(metaData) {
	        this.metaData = metaData;
	    }
	    /**
	     * Return abstract validation rule by traversing raw JSON data annotated by validation rules.
	     * @returns {IAbstractValidator<any>} return validation rule
	     */
	    JQueryValidationRuleFactory.prototype.CreateAbstractValidator = function () {
	        return this.ParseAbstractRule(this.metaData);
	    };
	    /**
	     * Return an concrete validation rule by traversing raw JSON data annotated by validation rules.
	     * @param name validation rule name
	     * @returns {IValidationRule<any>} return validation rule
	     */
	    JQueryValidationRuleFactory.prototype.CreateRule = function (name) {
	        return this.ParseAbstractRule(this.metaData).CreateRule(name);
	    };
	    /**
	     * Returns an concrete validation rule structured according to JSON schema.
	     */
	    JQueryValidationRuleFactory.prototype.ParseAbstractRule = function (metaData) {
	        var rule = new Validation.AbstractValidator();
	        var _loop_1 = function(key) {
	            var item = metaData[key];
	            var rules = item[JQueryValidationRuleFactory.RULES_KEY];
	            if (_.isArray(item)) {
	                if (item[1] !== undefined) {
	                    _.each(this_1.ParseValidationAttribute(item[1]), function (validator) {
	                        rule.RuleFor(key, validator);
	                    });
	                }
	                rule.ValidatorFor(key, this_1.ParseAbstractRule(item[0]), true);
	            }
	            else if (rules !== undefined) {
	                _.each(this_1.ParseValidationAttribute(rules), function (validator) { rule.RuleFor(key, validator); });
	            }
	            else if (_.isObject(item)) {
	                rule.ValidatorFor(key, this_1.ParseAbstractRule(item));
	            }
	            else {
	                // ignore
	                return "continue";
	            }
	        };
	        var this_1 = this;
	        for (var key in metaData) {
	            _loop_1(key);
	        }
	        return rule;
	    };
	    /**
	     * Return list of property validators that corresponds json items for JQuery validation pluging tags.
	     * See specification - http://jqueryvalidation.org/documentation/
	     */
	    JQueryValidationRuleFactory.prototype.ParseValidationAttribute = function (item) {
	        var validators = new Array();
	        if (item === undefined)
	            return validators;
	        var validation = item['required'];
	        if (validation !== undefined && validation) {
	            validators.push(new Validators.RequiredValidator());
	        }
	        validation = item['remote'];
	        if (validation !== undefined && validation) {
	            validators.push(new Validators.RemoteValidator(validation));
	        }
	        // maxLength validation
	        validation = item['maxlength'];
	        if (validation !== undefined) {
	            validators.push(new Validators.MaxLengthValidator(validation));
	        }
	        // minLength validation
	        validation = item['minlength'];
	        if (validation !== undefined) {
	            validators.push(new Validators.MinLengthValidator(validation));
	        }
	        // rangelength validation
	        validation = item['rangelength'];
	        if (validation !== undefined) {
	            validators.push(new Validators.RangeLengthValidator(validation));
	        }
	        // maximum validation
	        validation = item['max'];
	        if (validation !== undefined) {
	            validators.push(new Validators.MaxValidator(validation));
	        }
	        // minimum validation
	        validation = item['min'];
	        if (validation !== undefined) {
	            validators.push(new Validators.MinValidator(validation));
	        }
	        // range validation
	        validation = item['range'];
	        if (validation !== undefined) {
	            validators.push(new Validators.RangeValidator(validation));
	        }
	        validation = item['email'];
	        if (validation !== undefined) {
	            validators.push(new Validators.EmailValidator());
	        }
	        validation = item['url'];
	        if (validation !== undefined) {
	            validators.push(new Validators.UrlValidator());
	        }
	        validation = item['date'];
	        if (validation !== undefined) {
	            validators.push(new Validators.DateValidator());
	        }
	        validation = item['dateISO'];
	        if (validation !== undefined) {
	            validators.push(new Validators.DateISOValidator());
	        }
	        validation = item['number'];
	        if (validation !== undefined) {
	            validators.push(new Validators.NumberValidator());
	        }
	        validation = item['digits'];
	        if (validation !== undefined) {
	            validators.push(new Validators.DigitValidator());
	        }
	        validation = item['creditcard'];
	        if (validation !== undefined) {
	            validators.push(new Validators.CreditCardValidator());
	        }
	        validation = item['equalTo'];
	        if (validation !== undefined) {
	            validators.push(new Validators.EqualToValidator(validation));
	        }
	        // min items validation
	        validation = item['minItems'];
	        if (validation !== undefined) {
	            validators.push(new Validators.MinItemsValidator(validation));
	        }
	        // max items validation
	        validation = item['maxItems'];
	        if (validation !== undefined) {
	            validators.push(new Validators.MaxItemsValidator(validation));
	        }
	        // uniqueItems validation
	        validation = item['uniqueItems'];
	        if (validation !== undefined) {
	            validators.push(new Validators.UniqItemsValidator());
	        }
	        // enum validation
	        validation = item['enum'];
	        if (validation !== undefined) {
	            validators.push(new Validators.EnumValidator(validation));
	        }
	        //           // pattern validation
	        //           validation = item['pattern'];
	        //           if (validation !== undefined) {
	        //               validators.push(new Validators.PatternValidator(validation))
	        //           }
	        return validators;
	    };
	    JQueryValidationRuleFactory.RULES_KEY = 'rules';
	    JQueryValidationRuleFactory.DEFAULT_KEY = 'default';
	    return JQueryValidationRuleFactory;
	}());
	exports.JQueryValidationRuleFactory = JQueryValidationRuleFactory;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(6);
	var Validation = __webpack_require__(1);
	var Validators = __webpack_require__(24);
	var util_1 = __webpack_require__(79);
	/**
	 * @module FormSchema
	 * It represents the JSON schema factory for creating validation rules based on JSON form schema.
	 * It uses constraints keywords from JSON Schema Validation specification.
	 */
	var JsonSchemaRuleFactory = (function () {
	    /**
	     * Default constructor
	     * @param jsonSchema JSON schema for business rules.
	     */
	    function JsonSchemaRuleFactory(jsonSchema) {
	        this.jsonSchema = jsonSchema;
	    }
	    /**
	     * Return abstract validation rule by traversing  JSON schema.
	     * @returns {IAbstractValidator<any>} return validation rule
	     */
	    JsonSchemaRuleFactory.prototype.CreateAbstractValidator = function () {
	        return this.ParseAbstractRule(this.jsonSchema);
	    };
	    /**
	     * Return concrete validation rule structured according to JSON schema.
	     * @param name validation rule name
	     * @returns {IAbstractValidationRule<any>} return validation rule
	     */
	    JsonSchemaRuleFactory.prototype.CreateRule = function (name) {
	        return this.ParseAbstractRule(this.jsonSchema).CreateRule(name);
	    };
	    /**
	     * Returns an concrete validation rules structured according to JSON schema.
	     */
	    JsonSchemaRuleFactory.prototype.ParseAbstractRule = function (formSchema) {
	        var rule = new Validation.AbstractValidator();
	        var _loop_1 = function(key) {
	            var item = formSchema[key];
	            var type = item[util_1.Util.TYPE_KEY];
	            if (type === 'object') {
	                rule.ValidatorFor(key, this_1.ParseAbstractRule(item[util_1.Util.PROPERTIES_KEY]));
	            }
	            else if (type === 'array') {
	                _.each(this_1.ParseValidationAttribute(item), function (validator) { rule.RuleFor(key, validator); });
	                rule.ValidatorFor(key, this_1.ParseAbstractRule(item[util_1.Util.ARRAY_KEY][util_1.Util.PROPERTIES_KEY]), true);
	            }
	            else {
	                _.each(this_1.ParseValidationAttribute(item), function (validator) { rule.RuleFor(key, validator); });
	            }
	        };
	        var this_1 = this;
	        for (var key in formSchema) {
	            _loop_1(key);
	        }
	        return rule;
	    };
	    /**
	     * Return list of property validators that corresponds json items for JSON form validation tags.
	     * See keywords specifications -> http://json-schema.org/latest/json-schema-validation.html
	     */
	    JsonSchemaRuleFactory.prototype.ParseValidationAttribute = function (item) {
	        var validators = new Array();
	        var validation;
	        if (item === undefined)
	            return validators;
	        // 5.  Validation keywords sorted by instance types
	        // http://json-schema.org/latest/json-schema-validation.html
	        // 5.1. - Validation keywords for numeric instances (number and integer)
	        // multipleOf validation
	        validation = item['multipleOf'];
	        if (validation !== undefined) {
	            validators.push(new Validators.MultipleOfValidator(validation));
	        }
	        // maximum validation
	        validation = item['maximum'];
	        if (validation !== undefined) {
	            validators.push(new Validators.MaxValidator(validation, item['exclusiveMaximum']));
	        }
	        // minimum validation
	        validation = item['minimum'];
	        if (validation !== undefined) {
	            validators.push(new Validators.MinValidator(validation, item['exclusiveMinimum']));
	        }
	        // 5.2. - Validation keywords for strings
	        // maxLength validation
	        validation = item['maxLength'];
	        if (validation !== undefined) {
	            validators.push(new Validators.MaxLengthValidator(validation));
	        }
	        // minLength validation
	        validation = item['minLength'];
	        if (validation !== undefined) {
	            validators.push(new Validators.MinLengthValidator(validation));
	        }
	        // pattern validation
	        validation = item['pattern'];
	        if (validation !== undefined) {
	            validators.push(new Validators.PatternValidator(validation));
	        }
	        // 5.3.  Validation keywords for arrays
	        // TODO: additionalItems and items
	        // min items validation
	        validation = item['minItems'];
	        if (validation !== undefined) {
	            validators.push(new Validators.MinItemsValidator(validation));
	        }
	        // max items validation
	        validation = item['maxItems'];
	        if (validation !== undefined) {
	            validators.push(new Validators.MaxItemsValidator(validation));
	        }
	        // uniqueItems validation
	        validation = item['uniqueItems'];
	        if (validation !== undefined) {
	            validators.push(new Validators.UniqItemsValidator());
	        }
	        // 5.4.  Validation keywords for objects
	        // TODO: maxProperties, minProperties, additionalProperties, properties and patternProperties, dependencies
	        // required validation
	        validation = item['required'];
	        if (validation !== undefined && validation) {
	            validators.push(new Validators.RequiredValidator());
	        }
	        // 5.5.  Validation keywords for any instance type
	        //  enum validation
	        validation = item['enum'];
	        if (validation !== undefined) {
	            validators.push(new Validators.EnumValidator(validation));
	        }
	        // type validation
	        validation = item['type'];
	        if (validation !== undefined) {
	            validators.push(new Validators.TypeValidator(validation));
	        }
	        // 7.3.2 email
	        validation = item['email'];
	        if (validation !== undefined) {
	            validators.push(new Validators.EmailValidator());
	        }
	        // 7.3.6 url
	        validation = item['uri'];
	        if (validation !== undefined) {
	            validators.push(new Validators.UrlValidator());
	        }
	        // TODO: allOf,anyOf,oneOf,not,definitions
	        return validators;
	    };
	    return JsonSchemaRuleFactory;
	}());
	exports.JsonSchemaRuleFactory = JsonSchemaRuleFactory;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(6);
	var Util = (function () {
	    function Util() {
	    }
	    /**
	     * Returns the initial JSON data structured according to JSON schema.
	     * The data are initilizied with default values.
	     */
	    Util.InitValues = function (formSchema, dataParam) {
	        var data = dataParam || {};
	        for (var key in formSchema) {
	            var item = formSchema[key];
	            var type = item[Util.TYPE_KEY];
	            if (type === 'object') {
	                data[key] = {};
	                Util.InitValues(item[Util.PROPERTIES_KEY], data[key]);
	            }
	            else if (type === 'array') {
	                data[key] = [];
	            }
	            else {
	                var defaultValue = item[Util.DEFAULT_KEY];
	                if (defaultValue === undefined)
	                    continue;
	                // Type casting
	                if (type === 'boolean') {
	                    if (defaultValue === '0') {
	                        defaultValue = false;
	                    }
	                    else {
	                        defaultValue = !!defaultValue;
	                    }
	                }
	                if ((type === 'number') ||
	                    (type === 'integer')) {
	                    if (_.isString(defaultValue)) {
	                        if (!defaultValue.length) {
	                            defaultValue = null;
	                        }
	                        else if (!isNaN(Number(defaultValue))) {
	                            defaultValue = Number(defaultValue);
	                        }
	                    }
	                }
	                if ((type === 'string') &&
	                    (defaultValue === '')) {
	                    defaultValue = null;
	                }
	                // TODO: default value
	                data[key] = defaultValue;
	            }
	        }
	        return data;
	    };
	    Util.TYPE_KEY = 'type';
	    Util.PROPERTIES_KEY = 'properties';
	    Util.DEFAULT_KEY = 'default';
	    Util.ARRAY_KEY = 'items';
	    return Util;
	}());
	exports.Util = Util;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=businessRulesEngine.js.map