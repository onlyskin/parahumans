//creates svg elements for each book in collection with correct height and
//width
function drawShelf(selector, csvData) {
	var jsonData = jsonifyThreeTier(csvData).books;
	var container = d3.select(selector);

	var maxWords = Math.max(...jsonData.map((o) => o.wordCount))
	var widthScale = d3.scale.linear()
						.domain([0, maxWords])
						.range([0, 150]);

	var books = container.selectAll('.book')
				   .data(jsonData);

	var booksEnter = books.enter()
				   .append('div')
				   .attr('class', 'book')
				   .style('height', () => window.innerHeight * 0.8 + 'px')
				   .style('min-width', (d) => widthScale(d.wordCount))
				   .style('max-width', (d) => widthScale(d.wordCount));

	booksEnter.append('div')
					.attr('class', 'title')
					.style('transform', (d, i) => {
						let books = document.querySelectorAll('.book');
						let thisBook = books[i];
						let bookWidth = thisBook.clientWidth;
						return 'translate(' + (bookWidth / 2 - 8) + 'px, 0px) rotate(90deg)'
				})
					.text((d) => d.title);
	};

	// books.on('mouseover', function(d) {
	// 	var multiplier = 1;
	// 	var chapterBreakdown = d3.select('#chapterBreakdown');
	// 	var title = chapterBreakdown.append('div')
	// 							  .classed('chapters', true)
	// 							  .html(d['title']);
	// 	var chapterDiv = chapterBreakdown.append('div')
	// 							  .classed('chapters', true)
	// 							  .style('margin', 'auto');
	// 	var chapters = chapterDiv.selectAll('svg')
	// 					.data(d['chapters'])
	// 					.enter()
	// 					.append('svg')
	// 				    .attr('overflow', 'visible')
	// 				    .attr('height', multiplier * heightScale(1))
	// 		   		    .attr('width', function(d) {
	// 		   		   					return multiplier * widthScale(d.wordCount);
	// 		   		   					});

	// 	var numbers = ['1', '2', '3', '4', '5',
	// 			       '6', '7', '8', '9', '10',
	// 			       '11', '12', '13', '14'];

	// 	var chapterOutlines = chapters.append('rect')
 //                    .attr('x', 0)
 //                    .attr('y', 0)
	// 				.attr('height', multiplier * heightScale(1))
	// 		   		.attr('width', function(d) {
	// 		   		   					return multiplier * widthScale(d.wordCount);
	// 		   		   					})
 //                    .style('stroke', 'black')
 //                    .style('stroke-width', 0.5)
 //                    .style('fill', function(d) {
 //                    			try {
	//                     			if (numbers.indexOf(d.title.split('.')[1]) != -1)
	//                     			{return 'none';}
	//                     			else {return 'grey';}
	//                     		}
	//                     		catch(TypeError) {return 'none';}
	//                     		});


d3.csv('data/worm.csv', drawShelf.bind(null, '#worm'))
d3.csv('data/hp.csv', drawShelf.bind(null, '#hp'))