/**
 * Lays.js helper functions.
 */

export const extend = (obj1, obj2) => {
    for (let attrname in obj2) { obj1[attrname] = obj2[attrname]; }
};

export const inRange = (num) => (
    num > 1 ? (num <= 10 ? num : 10) : 1
);

export const fillZero = (cols) => (
    Array.apply(null, Array(cols)).map(() => 0)
);

export const getMax = (elements) => (
	elements.reduce((max, value) => (
      value > max ? value : max
    ), 0)
);