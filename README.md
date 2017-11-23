<p align="center">
  <img src="docs/images/lays.png" width="200" alt="Lays.js">
  <br><br>
  <a href="https://travis-ci.org/enkot/lays.js"><img src="https://travis-ci.org/enkot/lays.js.svg?branch=master" alt="travis"></a> <a href="https://david-dm.org/enkot/Lays.js"><img src="https://david-dm.org/Enkot/Lays.js.svg" alt="dependencies Status"></a>
</p>

# Lays.js

Tiny masonry layout library.

- **Size** -> Tiny size (< 2kb)
- **Dynamic** -> Simply add new items
- **No dependencies** -> No jQuery :)
- **Browsers support** -> IE 9+

#### Live: https://enkot.github.io/lays.js/

Example usage you can see in the [Docs](https://github.com/enkot/lays.js/tree/master/docs) folder:
- [basic.html](https://github.com/enkot/lays.js/tree/master/docs/basic.html) - [Live](https://enkot.github.io/lays.js/basic.html)
- [loaded.html](https://github.com/enkot/lays.js/tree/master/docs/loaded.html) - [Live](https://enkot.github.io/lays.js/loaded.html)

## How to Install
Install, using NPM:
```sh
$ npm install lays.js --save
```
### Include
As Node.js/Webpack/Browserify module:
```javascript
import Lays from 'lays.js'
```
In browser:
```html
<script src="https://unpkg.com/lays.js/docs/lays.min.js"></script>
```

## How to Use
Just call it with your element:
```html
<div id="masonry">
  <div class="_laysItem">...</div>
  <div class="_laysItem">...</div>
  <div class="_laysItem">...</div>
  <div class="_laysItem">...</div>
</div>
```
Create masonry layout with existing items and add new item to the end:
```javascript
const masonry = document.getElementById("masonry");
const lays = Lays({ parent: masonry });

const newItem = document.createElement('div');
lays.add(newItem);

lays.render();
```

Will add new item to the beginning and remove last one:
```javascript
const masonry = document.getElementById("masonry");
const lays = Lays({ 
  parent: masonry,
  prependItems: true,
  maxItems: 4, 
});

const newItem = document.createElement('div');
lays.add(newItem);

lays.render();
```

## Options

#### prependItems
Add new items before or after all items.

#### maxItems
Set maximum number of items which should be rendered.

#### breakpoints
Set number of columns for each container size.

### Example
Default values.
```javascript
const lays = Lays({ 
  parent: masonry, 
  prependItems: false,
  maxItems: Infinity, 
  breakpoints: {
    540: 2,
    720: 3,
    1024: 4,
    1280: 5,
  },
});
```

## API methods
After you have created Lays object, this methods become available:

#### add(element)
Add element as new item.
```javascript
const item = document.createElement('div');
lays.add(item);
```

#### render()
Render all items, added before.
```javascript
lays.render();
```


[![forthebadge](http://forthebadge.com/images/badges/winter-is-coming.svg)](http://forthebadge.com)

## License
MIT. © 2017 Taras Batenkov
