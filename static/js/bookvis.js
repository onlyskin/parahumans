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
	const longestSeries = getLongestSeries(series);
	series.map(function(s, i) {
		const id = ids[i];
		const title = titles[i];
		const colourOffset = colourOffsets[i];
		const shelfDiv = getShelfDiv(id, title);
		drawShelf(shelfDiv, s, longestSeries, colourOffset);
	})
}

drawShelves(series);

function drawShelf(shelfDiv, books, longestSeries, colourOffset) {
	const totalBookBorderWidth = BOOK_BORDER_WIDTH * books.length * 2;
    let bodyWidth;
    let windowHeight;
    let svgWidth;
    let svgHeight;

	if (window.innerWidth >= 900) {
		bodyWidth = getBodyWidth();
		svgWidth = bodyWidth - totalBookBorderWidth;
		svgHeight = svgWidth * 0.36;
	} else {
		windowHeight = getWindowHeight();
		svgHeight = windowHeight - BOOK_BORDER_WIDTH * 2;
		svgWidth = svgHeight / 0.36;
	}

	console.log(svgWidth);

	const widthScale = d3.scale.linear()
						.domain([0, longestSeries])
						.range([0, svgWidth]);

	const bookspace = shelfDiv.select('.bookspace');


	const updating = bookspace.selectAll('.book')
				   .data(books);

	// update
	updating
		.style('height', function() { return svgHeight + 'px'; })
		.style('min-width', function(d) { return widthScale(d.wordCount); })
		.style('max-width', function(d) { return widthScale(d.wordCount); });

	// enter
	const booksEnter = updating.enter()
		.append('div')
			.attr('class', 'book')
			.style('height', function() { return svgHeight + 'px'; })
			.style('min-width', function(d) { return widthScale(d.wordCount); })
			.style('max-width', function(d) { return widthScale(d.wordCount); })
			.attr('title', function(d) { return Math.round(d.wordCount / 1000).toLocaleString() + 'k words'; })
			.style('background', function(d) {
				const mainSaturation = (Math.round(Math.random() * 15) + 20);
				const hue = Math.round(Math.random() * 60) + colourOffset;
				return 'linear-gradient(261deg , hsla(' + hue + ',100%,77%,0.8), hsla(' + hue + ',100%,' + mainSaturation + '%,0.8), hsla(' + hue + ',100%,10%,0.92)), url(static/css/grilled.png)';
		})
		.append('div')
			.attr('class', 'title')
			.text(function(d) { return d.title; });

};

window.onresize = function() {
	console.log('resize');
	drawShelves(series);
};

screen.onorientationchange = function() {console.log('orientation')};
