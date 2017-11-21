import { assert } from 'chai';
import { extend, inRange, fillZero, getMax, concatItems } from '../src/tools';

describe('helper functions', function () {
	describe('helper extend function', () => {
		const obj1 = { a: 1 };
		const obj2 = { b: 2 };

		extend(obj1, obj2);

		it('extend obj1 with obj2', () => {
			assert.property(obj1, 'a');
			assert.property(obj1, 'b');
		})
	});
	describe('helper inRange function', () => {
		it('return number between 1 and 10', () => {
			assert.equal(inRange(-23, 1, 10), 1);
			assert.equal(inRange(6, 1, 10), 6);
			assert.equal(inRange(32, 1, 10), 10);
		})
	});
	describe('helper fillZero function', () => {
		it('return given size array filled with zero values', () => {
			assert.deepEqual(fillZero(5), [0,0,0,0,0]);
		})
	});
	describe('helper getMax function', () => {
		it('return max value from array', () => {
			assert.equal(getMax([5, -1, 34, 8, 2]), 34);
		})
	});
	describe('helper concatItems function', () => {
		const arr1 = [23, 3, 56];
		const arr2 = [5, 94];

		concatItems(arr1, arr2);

		it('merge 2 arrays', () => {
			assert.deepEqual(arr1, [23, 3, 56, 5, 94]);
		})
	});
});