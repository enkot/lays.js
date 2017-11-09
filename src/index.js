import { extend, inRange, fillZero, getMax } from './tools';

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
const Lays = (options) => {
    const { parent, cols } = options;
    if (!parent) return;

    const items = [];
    const newItems = [];
    const breakpoints = {
        540: 2,
        720: 3,
        1024: 4,
        1280: 5,
    };
    let colsNum = 1;
    let parentHeight = 0;

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
    const add = (el, prepand) => {
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

            item.style.cssText += `
                position: absolute;
                width: ${width}px;
                left: ${left}px;
                top: ${top}px; 
            `;

            col = next(item, columns, col);
        });

        maxHeight = getMax(columns);

        parent.style.cssText += `
            width: 100%;
            height: ${maxHeight}px;
        `;
    };

    /**
     * Place masonry items to DOM.
     *
     * @method placeToDOM
     */
    const placeToDOM = () => {
        if (newItems.length) {
            const fragment = document.createDocumentFragment();

            newItems.map((item) => {
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
    const setCols = () => {
        colsNum = 1;

        Object.keys(breakpoints).map((point) => {
            if (parent.offsetWidth > point)
                colsNum = inRange(breakpoints[point]);
        });
    };

    /**
     * Add window resize listener to recalculate layout.
     *
     * @method setResizeListener
     */
    const addResizeListener = () => {
        window.addEventListener("resize", render);
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

    // return public methods
    return {
        add,
        render
    };
};

// export to use as module
export default Lays;