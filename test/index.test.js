import chai, {
	expect
} from 'chai';
import chaiDOM from 'chai-dom';
import Lays from '../src/index';

chai.use(chaiDOM);

describe('library methods', function () {
	const grid = document.createElement('div');
	const masonry = Lays({
		parent: grid
	});

	it('should be an object', () => {
		expect(masonry).to.be.an.instanceof(Object);
	})

	describe('"add" method', () => {
		const itemEnd = document.createElement('div');
		const itemBeg = document.createElement('div');
		const items = masonry._items;

		masonry.add(document.createElement('div'));
		masonry.add(itemBeg);
		masonry.add(itemEnd);

		it('add class to masonry item', () => {
			expect(itemEnd).to.have.class('_laysItem');
		});
		it('add element to the end of the elements', () => {
			expect(items.pop()).to.eql(itemEnd);
		});
	});

	describe('"render" method', () => {
		masonry.render();

		it('place masonry items to DOM', () => {
			expect(grid).to.have.descendants('._laysItem').and.have.length(3);
		});
	});
});