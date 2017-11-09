var grid = document.querySelector(".grid");
var masonry = Lays({
	parent: grid,
});

function createBlock () {
	var width = 400;
	var height = Math.round(Math.random() * 400 + 200);
	var block = document.createElement("div");
	var imgUrl = 'https://unsplash.it/' + width + '/' + height + '?random';
	block.classList.add('_laysItem');

	block.innerHTML = [
		'<div class="_laysItemInner">',
			'<div class="_laysItemPicture" style="height: 0; padding-bottom: ' + height / width * 100 + '%">',
				'<img class="_laysItemImage" src="' + imgUrl + '">',
			'</div>',
			'<div class="_laysItemInfo">',
				'<h3>Some text</h3>',
				'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia nesciunt doloribus cupiditate, quasi qui.</p>',
			'</div>',
		'</div>',
	].join('');

	block.getElementsByTagName('img')[0].addEventListener("load", function () {
		block.classList.add("loaded");
	});

	return block;
}

function show () {
	for (var i = 20; i--;) {
		var block = createBlock();
		masonry.add(block);
	}

	masonry.render();
}

show();