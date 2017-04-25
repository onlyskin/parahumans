//creates svg elements for each book in collection with correct height and
//width
var bookBorderWidth = 1;

selectors = ['#worm', '#hp']

series = [worm_data, hp_data]

function getBodyWidth() {
	var windowWidth = window.innerWidth;
	var body = document.querySelector('body');
	var bodyMargin = window.getComputedStyle(body, null).margin;
	var bodyWidth = window.innerWidth - 2 * parseInt(bodyMargin.replace('px', ''));
	return bodyWidth
}

function getLongestBook(books) {
	return Math.max(...books.map((b) => b.wordCount))
}

function getLongestSeries(series) {
	var seriesLengths = series.map((o) => {
		return o.map((p) => p.wordCount ).reduce((a,b) => a + b )
	});
	return Math.max(...seriesLengths)
}

function drawShelves(series) {
	var longestSeries = getLongestSeries(series);
	series.map((s, i) => {
		let selector = selectors[i];
		drawShelf(selector, s, longestSeries)
	})
}

drawShelves(series);

function drawShelf(selector, books, longestSeries) {
	var bodyWidth = getBodyWidth();
	var totalBookBorderWidth = bookBorderWidth * books.length * 2;

	var svgWidth = bodyWidth - totalBookBorderWidth - 10;

	var height = svgWidth * 0.36;

	var widthScale = d3.scale.linear()
						.domain([0, longestSeries])
						.range([0, svgWidth]);

	var container = d3.select(selector);


	var books = container.selectAll('.book')
				   .data(books);

	// update
	books
		.style('height', () => height + 'px')
		.style('min-width', (d) => widthScale(d.wordCount))
		.style('max-width', (d) => widthScale(d.wordCount));

	// enter
	var booksEnter = books.enter()
		.append('div')
			.attr('class', 'book')
			.style('height', () => height + 'px')
			.style('min-width', (d) => widthScale(d.wordCount))
			.style('max-width', (d) => widthScale(d.wordCount))
		.append('div')
			.attr('class', 'title')
			.text((d) => d.title);

	console.log(container);
	var wood = container.append('div')
		.classed('wood', true)
		.text('testing title');

};

window.onresize = function() {
	console.log('resize');
	drawShelves(series);
};

screen.onorientationchange = function() {console.log('orientation')};