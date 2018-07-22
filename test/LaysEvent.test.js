import chai, {
    expect,
    assert,
} from 'chai';
import spies from 'chai-spies';
import LaysEvent from '../src/LaysEvent';

chai.use(spies);

describe('LaysEvent class', function () {
    describe('fire registered handler for event', function () {
        it('shift items to the left', (done) => {
            const spy = chai.spy();

            LaysEvent.on('event', spy);

            setTimeout(() => {
                LaysEvent.fire('event');
            }, 10);
            setTimeout(() => {
                expect(spy).to.have.been.called.once;
                done();
            }, 10);
        });
    });
});