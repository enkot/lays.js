import { assert } from 'chai';
import LaysQueue from '../src/LaysQueue';

describe('LaysQueue class', function () {
    const queue = LaysQueue(5);
    queue.push('Jason', 'Ann', 'Petro', 'Mykyta');

    describe('push method', function () {
        it('shift items to the left', () => {
            queue.push('Vasylyna', 'Katrin');

            assert.deepEqual(queue, ['Ann', 'Petro', 'Mykyta', 'Vasylyna', 'Katrin']);
        });
    });

    describe('unshift method', function () {
        it('shift items to the right', () => {
            queue.unshift('Serg', 'Ruslan');

            assert.deepEqual(queue, ['Serg', 'Ruslan', 'Ann', 'Petro', 'Mykyta']);
        });
    });
});