'use strict';

const itemsContainer = document.getElementById('items-container');
const renderButton = document.getElementById('renderButton');
const itemCountInput = document.getElementById('itemCount');

const colors = ['#f0f0f0', '#d0e8ff', '#d0ffd0', '#fffacd', '#ffd0d0'];

let items = [];

function generateItems(count) {
    items = [];

    for (let i = 0; i < count; i++) {
        const height = getRandomHeight(50, 300);
        const colorIndex = i % colors.length;
        items.push({
            index: i,
            text: `Item #${i + 1}`,
            height,
            color: colors[colorIndex],
        });
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