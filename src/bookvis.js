const d3 = require('d3');

const HEIGHT_TO_WIDTH_PIXEL_RATIO_PER_WORD = (1.9/20.3)/76994;

ids = ['worm', 'hp']
titles = ['Worm', 'Harry Potter']
colourOffsets = [90, 220]

function getSeriesLength(books) {
    return books
        .map(book => book.wordCount)
        .reduce((a, b) => a + b);
}

function formatWordCount(book) {
    return Math.round(book.wordCount / 1000).toLocaleString() + 'k words';
}

function randomHueVariant(colourOffset) {
    const saturation = (Math.round(Math.random() * 15) + 20);
    const hue = Math.round(Math.random() * 60) + colourOffset;
    return `linear-gradient(351deg, hsla(${hue},100%,77%,0.8), hsla(${hue},100%,${saturation}%,0.8), hsla(${hue},100%,10%,0.92)), url(grilled.png)`;
}

function updateShelf(series_data, root) {
    const heightScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, HEIGHT_TO_WIDTH_PIXEL_RATIO_PER_WORD * root.clientWidth]);

	const updating = d3.select(root).selectAll('.book')
        .data(series_data.books);

    const entering = updating
        .enter()
        .append('div');

    const merged = entering
        .merge(updating);

    entering
        .attr('class', 'book')
        .attr('title', formatWordCount)
        .style('background', _ => randomHueVariant(series_data.hue))
        .append('div')
        .attr('class', 'title')
        .text(d => d.title);

	merged
		.style('height', d => heightScale(d.wordCount))
		.style('min-width', '100%')
		.style('max-width', '100%');
}

module.exports = { updateShelf };
