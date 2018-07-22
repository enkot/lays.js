import {
    extend,
    fillZero,
    getMax,
    inRange,
    wait
} from './tools';
import LaysQueue from './LaysQueue';
import LaysEvent from './LaysEvent';

/**
 * Lays.js v1.1.1
 * @description Tiny masonry layout library.
 * @author BatenkovT
 */

/**
 * Returns new object with Lays methods.
 *
 * @module Lays
 * @param {Object} options Object with wrapper element and breakpoints
 */
const Lays = (options) => {
    const {
        parent
    } = options;
    if (!parent) return;

    const defaults = {
        prependItems: false,
        maxItems: undefined,
        breakpoints: {
            540: 2,
            720: 3,
            1024: 4,
            1280: 5,
        }
    };

    extend(defaults.breakpoints, options.breakpoints);
    extend(defaults, options);

    const {
        prependItems,
        maxItems,
        breakpoints
    } = defaults;

    const pushType = prependItems ? 'unshift' : 'push';

    // all items
    const items = LaysQueue(maxItems);

    // items to add
    const newItems = LaysQueue(maxItems);

    // items to remove
    const restItems = [];

    let colsNum = 1;

    parent.classList.add('_laysContainer');

    /**
     * Public method. 
     * Add new DOM element to show in layout.
     *
     * @method add
     * @param {Object} el DOM element that should be added to masonry
     * @param {Boolean} [prepend=false] Add DOM element to the beginning or end of the array of elements
     */
    const add = (el) => {
        el.classList.add('_laysItem');

        [].push.apply(restItems, items[pushType](el));
        newItems[pushType](el);
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
    const next = (item, columns, col) => {
        columns[col] += item.offsetHeight;

        columns.map((height, index) => {
            col = height < columns[col] ? index : col;
        });

        return col;
    };

    /**
     * Set masonry items position.
     *
     * @method setPosition
     */
    const setPosition = () => {
        const columns = fillZero(colsNum);
        const width = parent.offsetWidth / colsNum;
        let maxHeight = 0;
        let col = 0;

        items.map((item) => {
            const left = width * col;
            const top = columns[col];

            item.style.cssText += `position:absolute;width:${width}px;-ms-transform:translate(${left}px,${top}px);transform:translate(${left}px,${top}px);`;

            col = next(item, columns, col);
        });

        maxHeight = getMax(columns);

        parent.style.cssText += `width:100%;height:${maxHeight}px;`;
    };

    /**
     * Append new (only new) masonry items to DOM.
     *
     * @method placeToDOM
     */
    const placeToDOM = () => {
        if (!newItems.length) return;

        const fragment = document.createDocumentFragment();

        restItems.map((item) => parent.removeChild(item));
        newItems.map((item) => fragment.appendChild(item));

        newItems.length = 0;
        restItems.length = 0;

        parent.appendChild(fragment);
    };

    /**
     * Set columns number depends on parent element width.
     *
     * @method setCols
     */
    const setCols = () => {
        colsNum = 1;

        Object.keys(breakpoints).map((point) => {
            if (parent.offsetWidth > point)
                colsNum = inRange(breakpoints[point], 1, 10);
        });
    };

    /**
     * Add window resize listener to recalculate layout.
     *
     * @method setResizeListener
     */
    const addResizeListener = () => {
        window.addEventListener('resize', wait(() => {
            LaysEvent.fire('resize');

            render();
        }, 200));
    };

    const init = () => {
        [].map.call(parent.children, (el) => add(el));
    };

    /**
     * Public method. 
     * Renders masonry layout.
     *
     * @method render
     */
    const render = () => {
        placeToDOM();
        setCols();
        setPosition();
    };

    addResizeListener();
    init();

    // return public methods
    return {
        add,
        render,
        on: LaysEvent.on,
        _items: items,
    };
};

// export to use as module
export default Lays;