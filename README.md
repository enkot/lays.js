<p align="center">
  <img src="docs/lays.png" width="200" alt="Lays.js">
  <br><br>
  <a href="https://travis-ci.org/enkot/lays.js"><img src="https://travis-ci.org/enkot/lays.js.svg?branch=master" alt="travis"></a> <a href="https://david-dm.org/enkot/Lays.js"><img src="https://david-dm.org/Enkot/Lays.js.svg" alt="dependencies Status"></a>
</p>

# Lays.js

Tiny masonry layout library.

- **Size** -> Tiny size (< 2kb)
- **Performance** -> Rerenders only when it needed
- **Dependencies** -> None ( no jQuery :))
- **Support** -> IE 9+

Example (from 'docs' directory): 
https://enkot.github.io/lays.js/

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
<div id="masonry"></div>
```
```javascript
const masonry = document.getElementById("masonry");
const lays = Lays({ parent: masonry });
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

Example usage you can see in the [Docs](https://github.com/enkot/lays.js/tree/master/docs) folder, file [testUsage.js](https://github.com/enkot/lays.js/blob/master/docs/testUsage.js).

[![forthebadge](http://forthebadge.com/images/badges/winter-is-coming.svg)](http://forthebadge.com)

## License
MIT. © 2017 Taras Batenkov
