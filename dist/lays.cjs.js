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
    return num > 1 ? num <= 10 ? num : 10 : 1;
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
    var parent = options.parent,
        cols = options.cols;

    if (!parent) return;

    var items = [];
    var newItems = [];
    var breakpoints = {
        540: 2,
        720: 3,
        1024: 4,
        1280: 5
    };
    var colsNum = 1;
    var parentHeight = 0;

    parent.classList.add('_laysGridContainer');

    extend(breakpoints, cols);

    /**
     * Public method. 
     * Add handler to event, executed when this event is fired.
     *
     * @method add
     * @param {Object} el DOM element that should be added to masonry
     * @param {Boolean} [prepend=false] Add DOM element to the beginning or end of the array of elements
     */
    var add = function add(el, prepand) {
        el.classList.add('_laysGridItem');

        if (prepand) {
            items.unshift(el);
            newItems.unshift(el);
        } else {
            items.push(el);
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

            item.style.cssText += '\n                position: absolute;\n                width: ' + width + 'px;\n                left: ' + left + 'px;\n                top: ' + top + 'px; \n            ';

            col = next(item, columns, col);
        });

        maxHeight = getMax(columns);

        parent.style.cssText += '\n            width: 100%;\n            height: ' + maxHeight + 'px;\n        ';
    };

    /**
     * Place masonry items to DOM.
     *
     * @method placeToDOM
     */
    var placeToDOM = function placeToDOM() {
        if (newItems.length) {
            var fragment = document.createDocumentFragment();

            newItems.map(function (item) {
                fragment.appendChild(item);
            });
            newItems.length = 0;

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
            if (parent.offsetWidth > point) colsNum = inRange(breakpoints[point]);
        });
    };

    /**
     * Add window resize listener to recalculate layout.
     *
     * @method setResizeListener
     */
    var addResizeListener = function addResizeListener() {
        window.addEventListener("resize", render);
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

    // return public methods
    return {
        add: add,
        render: render
    };
};

module.exports = Lays;
