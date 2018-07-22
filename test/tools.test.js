import chai, {
	expect,
	assert,
} from 'chai';
import spies from 'chai-spies';
import {
	extend,
	inRange,
	fillZero,
	getMax,
	wait,
} from '../src/tools';

chai.use(spies);

describe('helper functions', function () {
	describe('helper extend function', () => {
		const obj1 = {
			a: 1
		};
		const obj2 = {
			b: 2
		};

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
			assert.deepEqual(fillZero(5), [0, 0, 0, 0, 0]);
		})
	});
	describe('helper getMax function', () => {
		it('return max value from array', () => {
			assert.equal(getMax([5, -1, 34, 8, 2]), 34);
		})
	});
	describe('helper wait function', () => {
		it('call method after 200ms, after few calles, only once', (done) => {
			const spy = chai.spy();
			const func = wait(spy, 200);

			func();
			func();

			setTimeout(() => {
				expect(spy).to.have.been.called.once;
				done();
			}, 200);
		})
	});
});