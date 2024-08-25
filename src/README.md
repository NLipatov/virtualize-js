# virtualize-js

`virtualize-js` is a lightweight library for efficient rendering of large lists by only rendering visible elements and a
buffer around them, improving performance and reducing memory usage.

[Live demo 🚀](https://nlipatov.github.io/virtualize-js/)

## Installation

Install via npm:

```bash
npm install virtualize-js
```

## Usage

Basic example:

```javascript
'use strict';
import { render } from 'virtualize-js';

const itemsContainer = document.getElementById('items-container');
const renderButton = document.getElementById('renderButton');
const itemCountInput = document.getElementById('itemCount');

const colors = ['#f0f0f0', '#d0e8ff', '#d0ffd0', '#fffacd', '#ffd0d0'];

let items = [];

function generateItems(count) {
    items = [];

    for (let i = 0; i < count; i++) {
        const item = document.createElement('div');
        item.textContent = `Item #${i + 1}`;
        item.style.height = `${getRandomHeight(50, 300)}px`;
        item.style.backgroundColor = colors[i % colors.length];
        items.push(item);
    }

    render(items, itemsContainer);
}

const getRandomHeight = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

renderButton.addEventListener('click', function () {
    const count = parseInt(itemCountInput.value, 10);

    if (count > 0) {
        generateItems(count);
        itemsContainer.style.height = `${window.innerHeight - document.querySelector('footer').offsetHeight}px`;
        itemsContainer.style.overflowY = 'scroll';
        render(items, itemsContainer);
    } else {
        alert('Invalid item count!');
    }
});


itemsContainer.addEventListener('scroll', () => {
    render(items, itemsContainer);
});

window.addEventListener('resize', () => {
    itemsContainer.style.height = `${window.innerHeight - document.querySelector('footer').offsetHeight}px`;
    render(items, itemsContainer);
});
```

## API

### `render(items, itemsContainer)`

Renders the visible items and buffers based on scroll position.

- **`items`**: Array of HTML elements to render.
- **`itemsContainer`**: Container in which items should be rendered.

## License

MIT License.