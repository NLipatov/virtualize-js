export function render(items, itemsContainer) {
    const containerHeight = itemsContainer.clientHeight;
    const scrollTop = itemsContainer.scrollTop;

    const {startIndex, endIndex} = calculateVisibleElements(items, scrollTop, containerHeight);

    const bufferItemsCount = Math.ceil((endIndex - startIndex) / 2);

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

    return {startIndex, endIndex};
}