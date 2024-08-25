# virtualize-js

`virtualize-js` is a tiny and simple virtual scrolling library.

Features:
- Variable Element Height Support: Handles items of different heights;
- Dependency-Free: 0 external dependencies;
- Simple API: Only one function — `render`.

[Live demo 🚀](https://nlipatov.github.io/virtualize-js/)

## Installation

Install via npm:

```bash
npm install virtualize-js
```

## Usage

Basic example:

```javascript
import { render } from 'virtualize-js';

//renders items in itemsContainer
render(items, itemsContainer);
```

## API

### `render(items, itemsContainer)`

Renders the visible items and buffers based on scroll position.

- **`items`**: Array of `HTMLElement`.
- **`itemsContainer`**: `HTMLElement` (for example div) in which items should be rendered.

## License

MIT License.