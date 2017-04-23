//creates svg elements for each book in collection with correct height and
//width
selectors = ['#worm', '#hp']

series = [worm_data, hp_data]

function getLongestBook(books) {
	return Math.max(...books.map((b) => b.wordCount))
}

function drawShelves(series) {
	longestBookLengths = series.map((series) => getLongestBook(series));
	longestBookLength = Math.max(...longestBookLengths);
	series.map((s, i) => {
		let selector = selectors[i];
		drawShelf(selector, s, longestBookLength)
	})
}

drawShelves(series);

function drawShelf(selector, books, longestBookLength) {
	var height = window.innerHeight * 0.7;
	var width = height * 0.3;
	var container = d3.select(selector);
	var widthScale = d3.scale.linear()
						.domain([0, longestBookLength])
						.range([0, width]);

	var books = container.selectAll('.book')
				   .data(books);

	var booksEnter = books.enter()
				   .append('div')
				   .attr('class', 'book')
				   .style('height', () => height + 'px')
				   .style('min-width', (d) => widthScale(d.wordCount))
				   .style('max-width', (d) => widthScale(d.wordCount));

	booksEnter.append('div')
					.attr('class', 'title')
					.text((d) => d.title);
};
