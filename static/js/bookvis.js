//creates svg elements for each book in collection with correct height and
//width
var bookBorderWidth = 1;
var shelfHeight = '60px';

ids = ['worm', 'hp']
titles = ['Worm', 'Harry Potter']
colourOffsets = [90, 220]

series = [worm_data, hp_data]

function pxToInt(px) {
	return parseInt(px.replace('px', ''));
}

function getBodyWidth() {
	var windowWidth = window.innerWidth;
	var body = document.querySelector('body');
	var bodyMargin = window.getComputedStyle(body, null).margin;
	var bodyWidth = windowWidth - 2 * pxToInt(bodyMargin);
	return bodyWidth
}

function getWindowHeight() {
	var windowHeight = window.innerHeight;
	var body = document.querySelector('body');
	var bodyMargin = window.getComputedStyle(body, null).margin;
	var bodyHeight = windowHeight - pxToInt(shelfHeight) - 2 * pxToInt(bodyMargin);
	return bodyHeight;
}

function getLongestBook(books) {
	return Math.max(...books.map(function(b) {return b.wordCount;}));
}

function getLongestSeries(series) {
	var seriesLengths = series.map(function(o) {
		return o.map(function (p) { return p.wordCount }).reduce(function(a,b) { return a + b });
	});
	return Math.max(...seriesLengths)
}

function getShelfDiv(id, title) {
	if (document.querySelector('#' + id) == null) {
		var shelf = d3.select('body')
			.append('div')
				.classed('shelf', true)
			.attr('id', id);
		shelf.append('div')
			.classed('bookspace', true);
		var wood = shelf.append('div')
			.classed('wood', true)
			.style('height', shelfHeight);
		wood.append('div')
			.classed('shelfTitle', true)
			.text(title);
	}
	return d3.select('#' + id);
}

function drawShelves(series) {
	var longestSeries = getLongestSeries(series);
	series.map(function(s, i) {
		var id = ids[i];
		var title = titles[i];
		var colourOffset = colourOffsets[i];
		var shelfDiv = getShelfDiv(id, title);
		drawShelf(shelfDiv, s, longestSeries, colourOffset);
	})
}

drawShelves(series);

function drawShelf(shelfDiv, books, longestSeries, colourOffset) {
	var totalBookBorderWidth = bookBorderWidth * books.length * 2;

	if (window.innerWidth >= 900) {
		var bodyWidth = getBodyWidth();
		var svgWidth = bodyWidth - totalBookBorderWidth;
		var svgHeight = svgWidth * 0.36;
	} else {
		var windowHeight = getWindowHeight();
		var svgHeight = windowHeight - bookBorderWidth * 2;
		var svgWidth = svgHeight / 0.36;
	}

	console.log(svgWidth);

	var widthScale = d3.scale.linear()
						.domain([0, longestSeries])
						.range([0, svgWidth]);

	var bookspace = shelfDiv.select('.bookspace');


	var books = bookspace.selectAll('.book')
				   .data(books);

	// update
	books
		.style('height', function() { return svgHeight + 'px'; })
		.style('min-width', function(d) { return widthScale(d.wordCount); })
		.style('max-width', function(d) { return widthScale(d.wordCount); });

	// enter
	var booksEnter = books.enter()
		.append('div')
			.attr('class', 'book')
			.style('height', function() { return svgHeight + 'px'; })
			.style('min-width', function(d) { return widthScale(d.wordCount); })
			.style('max-width', function(d) { return widthScale(d.wordCount); })
			.attr('title', function(d) { return Math.round(d.wordCount / 1000).toLocaleString() + 'k words'; })
			.style('background', function(d) {
				var mainSaturation = (Math.round(Math.random() * 15) + 20);
				var hue = Math.round(Math.random() * 60) + colourOffset;
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