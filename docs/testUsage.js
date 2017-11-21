var grid = document.querySelector(".grid");
var masonry = Lays({
	parent: grid,
	maxItems: 10,
	prependItems: true
});

function createBlock (data) {
	var width = 400;
	var height = Math.round(Math.random() * 400 + 200);
	var block = document.createElement("div");
	var imgUrl = 'https://unsplash.it/' + width + '/' + height + '?random';

	block.innerHTML = [
		'<div class="_laysItemInner">',
			'<div class="_laysItemPicture" style="height: 0; padding-bottom: ' + height / width * 100 + '%">',
				'<img class="_laysItemImage" src="' + imgUrl + '">',
			'</div>',
			'<div class="_laysItemInfo">',
				'<h4>' + data.title + '</h4>',
				'<p>' + data.body + '</p>',
			'</div>',
		'</div>',
	].join('');

	block.getElementsByTagName('img')[0].addEventListener("load", function () {
		block.classList.add("loaded");
	});

	return block;
}

function getData(show) {
	function json(response) {
	  return response.json()
	}

	fetch('https://my-json-server.typicode.com/enkot/lays.js/posts')
		.then(json)
		.then(function(data) {
			show(data);
		})
		.catch(function(error) {
			console.log('Fetch Error :-S', error);
		});
}

function show (data) {
	for (var i = 20; i--;) {
		var block = createBlock(data[i]);
		masonry.add(block);
	}

	masonry.render();
}

getData(show);

setTimeout(() => {
	var block = createBlock({title: 'New post', body: 'Post body'});
	masonry.add(block);
	masonry.render();
}, 6000);