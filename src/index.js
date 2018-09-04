const worm_data = require('./worm_data.js');
const hp_data = require('./hp_data.js');
const { updateShelf } = require('./bookvis.js');

const series = [worm_data, hp_data]

const bookshelf = document.getElementById('bookshelf');

window.onresize = function() {
    updateShelf(worm_data, bookshelf, 90);
};

updateShelf(worm_data, bookshelf);
