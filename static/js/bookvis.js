//creates svg elements for each book in collection with correct height and
//width
var bookBorderWidth = 1;

ids = ['worm', 'hp']
titles = ['Worm', 'Harry Potter']

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

function getShelfDiv(id, title) {
	if (document.querySelector('#' + id) == null) {
		var shelf = d3.select('body')
			.append('div')
				.classed('shelf', true)
			.attr('id', id);
		shelf.append('div')
			.classed('bookspace', true);
		var wood = shelf.append('div')
			.classed('wood', true);
		wood.append('div')
			.classed('shelfTitle', true)
			.text(title);
	}
	return d3.select('#' + id);
}

function drawShelves(series) {
	var longestSeries = getLongestSeries(series);
	series.map((s, i) => {
		let id = ids[i];
		let title = titles[i];
		var shelfDiv = getShelfDiv(id, title);
		drawShelf(shelfDiv, s, longestSeries);
	})
}

drawShelves(series);

function drawShelf(shelfDiv, books, longestSeries) {
	var bodyWidth = getBodyWidth();
	var totalBookBorderWidth = bookBorderWidth * books.length * 2;

	var svgWidth = bodyWidth - totalBookBorderWidth;

	var height = svgWidth * 0.36;

	var widthScale = d3.scale.linear()
						.domain([0, longestSeries])
						.range([0, svgWidth]);

	var bookspace = shelfDiv.select('.bookspace');


	var books = bookspace.selectAll('.book')
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
			.attr('title', (d) => Math.round(d.wordCount / 1000).toLocaleString() + 'k words')
		.append('div')
			.attr('class', 'title')
			.text((d) => d.title);

	var wood = shelfDiv.select('.wood')
		.style('max-width', bodyWidth + 10)
		.style('min-width', bodyWidth + 10);

};

window.onresize = function() {
	console.log('resize');
	drawShelves(series);
};

screen.onorientationchange = function() {console.log('orientation')};