const worm_data = require('./worm_data.js');
const hp_data = require('./hp_data.js');
const { updateShelf } = require('./bookvis.js');

const parahumansStack = document.getElementById('parahumans-stack');
const harryPotterStack = document.getElementById('harry-potter-stack');

window.onresize = function() {
    updateShelf(worm_data, parahumansStack);
    updateShelf(hp_data, harryPotterStack);
};

updateShelf(worm_data, parahumansStack);
updateShelf(hp_data, harryPotterStack);
