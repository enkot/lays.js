/**
 * Lays.js helper functions.
 */

export const extend = (obj1, obj2) => {
    for (let attrname in obj2) { obj1[attrname] = obj2[attrname]; }
};

export const inRange = (num, from = 1, to = Infinity) => (
    num > from ? (num <= to ? num : to) : from
);

export const fillZero = (cols) => (
    Array.apply(null, Array(cols)).map(() => 0)
);

export const getMax = (elements) => (
	elements.reduce((max, value) => (
      value > max ? value : max
    ), 0)
);

export function wait (func, delta) {
    let to;
  
    return () => {
        if (to) clearTimeout(to);
    
        to = setTimeout(func, delta);
    };
};