'use strict';

/**
 * Renders the visible elements along with the buffer elements into the provided container.
 *
 * @param {Array} items - An array of HTMLElements representing the list of items to be rendered.
 * @param {HTMLElement} itemsContainer - The container element where the items will be rendered.
 */
export function render(items, itemsContainer) {
    const containerHeight = itemsContainer.clientHeight;
    const scrollTop = itemsContainer.scrollTop;

    const {startIndex, endIndex} = calculateVisibleElements(items, scrollTop, containerHeight);

    const bufferItemsCount = Math.ceil((endIndex - startIndex) * 1.25);

    const renderStartIndex = Math.max(0, startIndex - bufferItemsCount);
    const renderEndIndex = Math.min(items.length, endIndex + bufferItemsCount);

    const topSpacerHeight = items.slice(0, renderStartIndex).reduce((acc, item) => acc + parseInt(item.style.height, 10), 0);
    const bottomSpacerHeight = items.slice(renderEndIndex).reduce((acc, item) => acc + parseInt(item.style.height, 10), 0);

    itemsContainer.innerHTML = '';

    const topSpacer = document.createElement('div');
    topSpacer.style.height = `${topSpacerHeight}px`;
    itemsContainer.appendChild(topSpacer);

    for (let i = renderStartIndex; i < renderEndIndex; i++) {
        itemsContainer.appendChild(items[i]);
    }

    const bottomSpacer = document.createElement('div');
    bottomSpacer.style.height = `${bottomSpacerHeight}px`;
    itemsContainer.appendChild(bottomSpacer);
}

/**
 * Calculates the indices of the items that should be visible within the viewport.
 *
 * @param {Array} items - An array of HTMLElements.
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
        accumulatedHeight += parseInt(items[i].style.height, 10);
        if (accumulatedHeight > scrollTop) {
            startIndex = i;
            break;
        }
    }

    let endIndex = startIndex;
    accumulatedHeight = 0;

    for (let i = startIndex; i < items.length; i++) {
        accumulatedHeight += parseInt(items[i].style.height, 10);
        if (accumulatedHeight >= containerHeight) {
            endIndex = i;
            break;
        }
    }

    if (endIndex === startIndex && parseInt(items[startIndex].style.height, 10) > containerHeight) {
        endIndex = startIndex + 1;
    }

    return {startIndex, endIndex};
}
