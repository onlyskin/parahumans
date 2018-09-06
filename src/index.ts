import { worm_data } from './worm_data';
import { hp_data } from './hp_data';
import { updateShelf } from './bookvis';

const parahumansStack = document.getElementById('parahumans-stack');
const harryPotterStack = document.getElementById('harry-potter-stack');

window.onresize = function() {
    updateShelf(worm_data, parahumansStack);
    updateShelf(hp_data, harryPotterStack);
};

updateShelf(worm_data, parahumansStack);
updateShelf(hp_data, harryPotterStack);
