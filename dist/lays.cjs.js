'use strict';

/**
 * Lays.js helper functions.
 */

var extend = function extend(obj1, obj2) {
    for (var attrname in obj2) {
        obj1[attrname] = obj2[attrname];
    }
};

var inRange = function inRange(num) {
    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
    return num > from ? num <= to ? num : to : from;
};

var fillZero = function fillZero(cols) {
    return Array.apply(null, Array(cols)).map(function () {
        return 0;
    });
};

var getMax = function getMax(elements) {
    return elements.reduce(function (max, value) {
        return value > max ? value : max;
    }, 0);
};

var concatItems = function concatItems(arr1, arr2) {
    [].push.apply(arr1, arr2);
};

var LaysQueue = function LaysQueue(size) {
    var queue = [];

    size = size || Infinity;

    queue.fixedSize = size;

    queue.push = function () {
        [].push.apply(this, arguments);

        if (this.length <= this.fixedSize) return [];

        return this.splice(0, this.length - this.fixedSize);
    };

    queue.unshift = function () {
        [].unshift.apply(this, arguments);

        if (this.length <= this.fixedSize) return [];

        return this.splice(this.fixedSize);
    };

    return queue;
};

/**
 * Lays.js v1.0.0
 * @description Tiny masonry layout library.
 * @author BatenkovT
 */

/**
 * Returns new object with Lays methods.
 *
 * @module Lays
 * @param {Object} options Object with wrapper element and breakpoints
 */
var Lays = function Lays(options) {
    var parent = options.parent;

    if (!parent) return;

    var defaults = {
        prependItems: false,
        maxItems: undefined,
        breakpoints: {
            540: 2,
            720: 3,
            1024: 4,
            1280: 5
        }
    };

    extend(defaults.breakpoints, options.breakpoints);
    extend(defaults, options);

    var prependItems = defaults.prependItems,
        maxItems = defaults.maxItems,
        breakpoints = defaults.breakpoints;


    var items = LaysQueue(maxItems);
    var newItems = LaysQueue(maxItems);
    var restItems = [];
    var colsNum = 1;
    var parentHeight = 0;

    parent.classList.add('_laysContainer');

    /**
     * Public method. 
     * Add handler to event, executed when this event is fired.
     *
     * @method add
     * @param {Object} el DOM element that should be added to masonry
     * @param {Boolean} [prepend=false] Add DOM element to the beginning or end of the array of elements
     */
    var add = function add(el) {
        el.classList.add('_laysItem');

        if (prependItems) {
            concatItems(restItems, items.unshift(el));
            newItems.unshift(el);
        } else {
            concatItems(restItems, items.push(el));
            newItems.push(el);
        }
    };

    /**
     * Return next column to which masonry item should be added.
     *
     * @method next
     * @param {Object} item DOM element
     * @param {Array} columns Array with maximum column heights
     * @param {Number} col Current column number
     * @return {Number} col Next column number
     */
    var next = function next(item, columns, col) {
        columns[col] += item.offsetHeight;

        columns.map(function (height, index) {
            col = height < columns[col] ? index : col;
        });

        return col;
    };

    /**
     * Set masonry items position.
     *
     * @method setPosition
     */
    var setPosition = function setPosition() {
        var columns = fillZero(colsNum);
        var width = parent.offsetWidth / colsNum;
        var maxHeight = 0;
        var col = 0;

        items.map(function (item) {
            var left = width * col;
            var top = columns[col];

            item.style.cssText += 'position:absolute;width:' + width + 'px;left:' + left + 'px;top:' + top + 'px;';

            col = next(item, columns, col);
        });

        maxHeight = getMax(columns);

        parent.style.cssText += 'width:100%;height:' + maxHeight + 'px;';
    };

    /**
     * Append new (only new) masonry items to DOM.
     *
     * @method placeToDOM
     */
    var placeToDOM = function placeToDOM() {
        if (newItems.length) {
            var fragment = document.createDocumentFragment();

            restItems.map(function (item) {
                if (parent.contains(item)) parent.removeChild(item);
            });
            newItems.map(function (item) {
                if (!parent.contains(item)) fragment.appendChild(item);
            });
            newItems.length = 0;
            restItems.length = 0;

            parent.appendChild(fragment);
        }
    };

    /**
     * Set columns number depends on parent element width.
     *
     * @method setCols
     */
    var setCols = function setCols() {
        colsNum = 1;

        Object.keys(breakpoints).map(function (point) {
            if (parent.offsetWidth > point) colsNum = inRange(breakpoints[point], 1, 10);
        });
    };

    /**
     * Add window resize listener to recalculate layout.
     *
     * @method setResizeListener
     */
    var addResizeListener = function addResizeListener() {
        var resizeTimer = void 0;

        window.addEventListener("resize", function () {

            // disable transitions when window resizing
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {

                parent.classList.remove('stopTransition');
            }, 250);

            parent.classList.add('stopTransition');

            render();
        });
    };

    var init = function init() {
        [].map.call(parent.children, function (el) {
            return add(el);
        });
    };

    /**
     * Public method. 
     * Renders masonry layout.
     *
     * @method render
     */
    var render = function render() {
        placeToDOM();
        setCols();
        setPosition();
    };

    addResizeListener();
    init();

    // return public methods
    return {
        add: add,
        render: render,
        _items: items
    };
};

module.exports = Lays;
