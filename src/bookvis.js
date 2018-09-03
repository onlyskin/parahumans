const worm_data = require('./worm_data.js');
const hp_data = require('./hp_data.js');
const d3 = require('d3');

//creates svg elements for each book in collection with correct height and
//width
const BOOK_BORDER_WIDTH = 1;
const SHELF_HEIGHT = '60px';

ids = ['worm', 'hp']
titles = ['Worm', 'Harry Potter']
colourOffsets = [90, 220]

series = [worm_data, hp_data]

function pxToInt(px) {
	return parseInt(px.replace('px', ''));
}

function intToPx(number) {
	return number + 'px';
}

function getBodyWidth() {
	const windowWidth = window.innerWidth;
	const body = document.querySelector('body');
	const bodyMargin = window.getComputedStyle(body, null).margin;
	const bodyWidth = windowWidth - 2 * pxToInt(bodyMargin);
	return bodyWidth
}

function getWindowHeight() {
	const windowHeight = window.innerHeight;
	const body = document.querySelector('body');
	const bodyMargin = window.getComputedStyle(body, null).margin;
	const bodyHeight = windowHeight - pxToInt(SHELF_HEIGHT) - 2 * pxToInt(bodyMargin);
	return bodyHeight;
}

function getLongestBook(books) {
	return Math.max(...books.map(function(b) {return b.wordCount;}));
}

function getLongestSeries(series) {
	const seriesLengths = series.map(function(o) {
		return o.map(function (p) { return p.wordCount }).reduce(function(a,b) { return a + b });
	});
	return Math.max(...seriesLengths)
}

function bookHeight(books) {
	if (window.innerWidth >= 900) {
		return (getBodyWidth() - bookBorders(books)) * 0.36;
	} else {
		return getWindowHeight() - bookBorder();
	}
}

function bookWidth(books) {
	if (window.innerWidth >= 900) {
		return getBodyWidth() - bookBorders(books);
	} else {
		return (getWindowHeight() - bookBorder()) / 0.36;
	}
}

function bookBorder() {
    return BOOK_BORDER_WIDTH * 2;
}

function bookBorders(books) {
    return bookBorder() * books.length;
}

function getShelfDiv(id, title) {
	if (document.querySelector('#' + id) == null) {
		const shelf = d3.select('body')
			.append('div')
				.classed('shelf', true)
			.attr('id', id);
		shelf.append('div')
			.classed('bookspace', true);
		const wood = shelf.append('div')
			.classed('wood', true)
			.style('height', SHELF_HEIGHT);
		wood.append('div')
			.classed('shelfTitle', true)
			.text(title);
	}
	return d3.select('#' + id);
}

function drawShelves(series) {
	series.map(function(booksFromSeries, index) {
        const widthScale = d3.scale.linear()
            .domain([0, getLongestSeries(series)])
            .range([0, bookWidth(booksFromSeries)]);

		drawShelf(
            getShelfDiv(ids[index], titles[index]),
            booksFromSeries,
            intToPx(bookHeight(booksFromSeries)),
            widthScale,
            colourOffsets[index],
        );
	})
}

function formatWordCount(book) {
    return Math.round(book.wordCount / 1000).toLocaleString() + 'k words';
}

function randomHueVariant(colourOffset) {
    const saturation = (Math.round(Math.random() * 15) + 20);
    const hue = Math.round(Math.random() * 60) + colourOffset;
    return `linear-gradient(261deg, hsla(${hue},100%,77%,0.8), hsla(${hue},100%,${saturation}%,0.8), hsla(${hue},100%,10%,0.92)), url(static/css/grilled.png)`;
}

function drawShelf(
    root,
    books,
    bookHeight,
    widthScale,
    colourOffset,
) {
	const updating = root.select('.bookspace').selectAll('.book')
        .data(books);

    const entering = updating
        .enter()
        .append('div');

	updating
		.style('height', bookHeight)
		.style('min-width', d => widthScale(d.wordCount))
		.style('max-width', d => widthScale(d.wordCount));

    entering
        .attr('class', 'book')
		.style('height', bookHeight)
        .style('min-width', d => widthScale(d.wordCount))
        .style('max-width', d => widthScale(d.wordCount))
        .attr('title', formatWordCount)
        .style('background', _ => randomHueVariant(colourOffset))
        .append('div')
        .attr('class', 'title')
        .text(d => d.title);
};

window.onresize = function() {
    console.log('resize');
    drawShelves(series);
};

screen.onorientationchange = function() {console.log('orientation')};

drawShelves(series);
