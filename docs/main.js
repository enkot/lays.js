// Initialize Lays with options
var container = document.querySelector(".masonry");
var masonry = Lays({
    parent: container,
    maxItems: 20,
    prependItems: true
});

// Create simple template: photo, title, body
// IMPORTANT! Places for images should have fixed height (library doesn`t wait for images by default).
// In order to save image aspect ratio, use 'padding': height / width * 100 + '%'
function createBlock (data) {
    var width = 400;
    var height = Math.round(Math.random() * width + 200);
    var block = document.createElement("div");
    var imgUrl = 'https://picsum.photos/' + width + '/' + height + '?random';
    var color = data.gender == 'female' ? '_pinkColor' : '_blueColor';

    block.innerHTML = [
        '<div class="_laysItemInner ' + color + '" style="overflow: hidden;">',
            '<div class="_laysItemUser">',
                '<div class="_laysItemUserPicture">',
                    '<img class="" src="' + data.picture.thumbnail + '">',
                '</div>',
                '<h5>' + data.name.first + ' ' + data.name.last + '</h5>',
            '</div>',
            '<div class="_laysItemPicture" style="height: 0; padding-bottom: ' + height / width * 100 + '%">',
                '<img class="_laysItemImage" src="' + imgUrl + '">',
            '</div>',
            '<div class="_laysItemInfo">',
                '<p>' + data.location.street + '</p>',
            '</div>',
        '</div>',
    ].join('');

    onImagesLoaded(block, function () {
        block.classList.add("loaded");
    });

    return block;
}

// Show block after all images have loaded
function onImagesLoaded(block, cb) {
    var imgs = block.getElementsByTagName('img'),
    len = imgs.length,
    counter = 0;

    [].forEach.call(imgs, function(img) {
        img.addEventListener('load', incrementCounter, false);
    });

    function incrementCounter() {
        counter++;
        if (counter === len) 
            cb();
    }
}

// Get some test data from API server
// I recommend you to use 'randomuser.me' server in development :) 
function getData(cb) {
    makeRequest('https://randomuser.me/api/?results=100&inc=gender,name,location,picture', function(data) {
        console.log(data);
        cb(data);
    });
}

// Make Ajax request to server
function makeRequest(path, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.send(); 
    
    xhr.onreadystatechange = function() { 
          if (xhr.readyState != 4) return;
    
          if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
          } else {
            var data = JSON.parse(xhr.responseText);

            cb(data);
          }
    }
}

// Every 7 seconds add new blocks with random data and renders on the page.
// First time generates 20 items, after that - 1 or 2.
function show(data) {
    let odd = true;
    let max = 20;

    const generateBlocks = () => {
        for (var i = max; i--;) {
            var randomData = Math.floor(Math.random() * 100); 

            var block = createBlock(data.results[randomData]);

            masonry.add(block);
        }
        masonry.render();

        odd = !odd;
        max = !odd ? 1 : 2;
    };

    setInterval(generateBlocks, 7000);
    generateBlocks();
}

getData(show);

