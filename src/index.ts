import { worm_data } from './worm_data';
import { hp_data } from './hp_data';
import { updateShelf, zeroBookWidths } from './shelf';

const parahumansStack = document.getElementById('parahumans-stack');
const harryPotterStack = document.getElementById('harry-potter-stack');

window.onresize = function() {
    zeroBookWidths(parahumansStack);
    zeroBookWidths(harryPotterStack);
    updateShelf(worm_data, parahumansStack);
    updateShelf(hp_data, harryPotterStack);
};

updateShelf(worm_data, parahumansStack);
updateShelf(hp_data, harryPotterStack);
