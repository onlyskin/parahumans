import { worm_data } from './worm_data';
import { twilight_data } from './twilight_data';
import { lotr_data } from './lotr_data';
import { updateShelf, zeroBookWidths } from './shelf';

const parahumansStack = document.getElementById('parahumans-stack');
const twilightStack = document.getElementById('twilight-stack');
const lotrStack = document.getElementById('lotr-stack');

window.onresize = function() {
    zeroBookWidths(parahumansStack);
    zeroBookWidths(twilightStack);
    zeroBookWidths(lotrStack);
    updateShelf(worm_data, parahumansStack);
    updateShelf(twilight_data, twilightStack);
    updateShelf(lotr_data, lotrStack);
};

updateShelf(worm_data, parahumansStack);
updateShelf(twilight_data, twilightStack);
updateShelf(lotr_data, lotrStack);
