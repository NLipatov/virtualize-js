'use strict';
import './styles.css';
import {render} from '../src/virtualize.js';

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