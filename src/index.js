const worm_data = require('./worm_data.js');
const hp_data = require('./hp_data.js');
const drawShelves = require('./bookvis.js');

const series = [worm_data, hp_data]

window.onresize = function() {
    drawShelves(series);
};

drawShelves(series);
