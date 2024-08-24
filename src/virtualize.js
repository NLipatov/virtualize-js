'use strict';

let bufferMultiplier = 2;

/**
 * Sets the buffer multiplier that controls the number of additional elements rendered
 * above and below the viewport.
 *
 * For example:
 * - If the viewport can display 10 items and the bufferMultiplier is set to 2,
 *   then 20 additional items will be rendered above and 20 below the viewport.
 * - This means a total of 50 items will be rendered: 10 visible items, 20 in the top buffer,
 *   and 20 in the bottom buffer.
 *
 * @param {number} multiplier - The multiplier used to determine the number of buffer items to render.
 */
export function setBufferMultiplier(multiplier) {
    bufferMultiplier = multiplier;
}

export function render(items, itemsContainer) {
    const containerHeight = itemsContainer.clientHeight;
    const scrollTop = itemsContainer.scrollTop;

    const {startIndex, endIndex} = calculateVisibleElements(items, scrollTop, containerHeight);

    const bufferItemsCount = Math.ceil((endIndex - startIndex) * bufferMultiplier);

    const renderStartIndex = Math.max(0, startIndex - bufferItemsCount);
    const renderEndIndex = Math.min(items.length, endIndex + bufferItemsCount);

    itemsContainer.innerHTML = '';

    const topSpacer = document.createElement('div');
    const topSpacerHeight = items.slice(0, renderStartIndex).reduce((acc, item) => acc + item.height, 0);
    topSpacer.style.height = `${topSpacerHeight}px`;
    itemsContainer.appendChild(topSpacer);

    for (let i = renderStartIndex; i < renderEndIndex; i++) {
        const message = document.createElement('div');
        message.textContent = `${items[i].text}`;
        message.style.height = `${items[i].height}px`;
        message.style.backgroundColor = items[i].color;
        itemsContainer.appendChild(message);
    }

    const bottomSpacer = document.createElement('div');
    const bottomSpacerHeight = items.slice(renderEndIndex).reduce((acc, item) => acc + item.height, 0);
    bottomSpacer.style.height = `${bottomSpacerHeight}px`;
    itemsContainer.appendChild(bottomSpacer);
}

/**
 * Calculates the indices of the items that should be visible within the viewport.
 *
 * This function determines the start and end indices of the items that need to be rendered
 * based on the current scroll position (`scrollTop`) and the height of the container (`containerHeight`).
 *
 * The function works as follows:
 * - First, it calculates the `startIndex`, which is the index of the first item that should be visible
 *   in the viewport, by summing up the heights of the items until the cumulative height exceeds the scroll position.
 * - Next, it calculates the `endIndex`, which is the index of the last item that should be visible
 *   in the viewport, by summing up the heights of the items starting from the `startIndex`
 *   until the cumulative height exceeds the container's height.
 * - If the height of the item at `startIndex` is greater than the container's height and no other items
 *   would fit, the function ensures that at least one item is rendered by incrementing the `endIndex`.
 *
 * @param {Array} items - An array of item objects, where each item has a `height` property.
 * @param {number} scrollTop - The current vertical scroll position of the container.
 * @param {number} containerHeight - The height of the container (viewport) in pixels.
 *
 * @returns {Object} - An object containing `startIndex` and `endIndex`, representing the range of items
 *                     that should be rendered based on the visible viewport.
 */
function calculateVisibleElements(items, scrollTop, containerHeight) {
    let startIndex = 0;
    let accumulatedHeight = 0;

    for (let i = 0; i < items.length; i++) {
        accumulatedHeight += items[i].height;
        if (accumulatedHeight > scrollTop) {
            startIndex = i;
            break;
        }
    }

    let endIndex = startIndex;
    accumulatedHeight = 0;
    for (let i = startIndex; i < items.length; i++) {
        accumulatedHeight += items[i].height;
        if (accumulatedHeight >= containerHeight) {
            endIndex = i;
            break;
        }
    }

    // Ensure at least one element is rendered, even if it is taller than the container
    if (endIndex === startIndex && items[startIndex].height > containerHeight) {
        endIndex = startIndex + 1;
    }

    return {startIndex, endIndex};
}