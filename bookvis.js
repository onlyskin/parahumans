//processes .csv file of fields Collection/Book/Chapter/WordCount to json of
//format {'collection': string
//		  'books': [{'title': string,
//					 'wordcount': integer,
//					 'chapters': [{'title': string,
//								   'wordcount': integer
//								 }]
//					}]
//		 }
function jsonifyThreeTier(csvFile) {
	var result = {};
	var previous_book = '';
	for (var key in csvFile) {
		row = csvFile[key];
		collection = row['collection']
		book = row['book']
		chapter = row['chapter']
		wordCount = row['wordCount']
		if (!result['collection']) {
			result['collection'] = collection;
			result['books'] = [];
		}
		if (book != previous_book) {
			result['books'].push({'title': book,
								  'chapters': [],
								  'wordCount': 0})
			previous_book = book;
		}
		books = result['books']
		for (var i = 0; i < books.length; i++) {
			if (books[i]['title'] == book) {
				books[i]['chapters'].push({'title': chapter,
											'wordCount': wordCount});
				books[i]['wordCount'] += Number(wordCount);
			}
		}
	}
	return result;
}

//processes .csv file of fields Collection/Book/WordCount to json of
//format {'collection': string
//		  'books': [{'title': string,
//					 'wordCount': integer,
//					}]
//		 }
function jsonifyTwoTier(csvFile) {}


//creates svg elements for each book in collection with correct height and
//width
function drawShelf(divId, csvData) {
	var jsonData = jsonifyThreeTier(csvData);
	var div = d3.select('#'+divId);
	var bookHeightRatio = 0.22 * window.innerWidth;
	bookHeightRatio = 700;
	var heightScale = d3.scale.linear()
							  .range([0, bookHeightRatio]);
	var widthScale = d3.scale.linear()
						.domain([0, 500000])
						.range([0, bookHeightRatio]);
	var books = div.selectAll('svg')
				   .data(jsonData.books)
				   .enter()
				   .append('svg')
				   .attr('class', function(d) { return d['title']; })
				   .attr('overflow', 'visible')
				   .attr('height', heightScale(1))
		   		   .attr('width', function(d) {
		   		   					return widthScale(d.wordCount);
		   		   					});
	var outlines = books.append('rect')
	                    .attr('x', 0)
	                    .attr('y', 0)
	                    .attr('width', '100%')
	                    .attr('height', '100%')
	                    .style('stroke', 'black')
	                    .style('stroke-width', 1)
	                    .style('fill', 'none');
	var titles = books.append('text')
					  .text(function(d) { return d.title; })
					  .attr('y', '50%')
					  .attr('x', '50%')
					  .attr('text-anchor', 'middle')
					  .attr('alignment-baseline', 'middle')
					  .attr('font-size', '8px');


	books.on('mouseover', function(d) {
		var multiplier = 1;
		var chapterBreakdown = d3.select('#chapterBreakdown');
		var title = chapterBreakdown.append('div')
								  .classed('chapters', true)
								  .html(d['title']);
		var chapterDiv = chapterBreakdown.append('div')
								  .classed('chapters', true)
								  .style('margin', 'auto');
		var chapters = chapterDiv.selectAll('svg')
						.data(d['chapters'])
						.enter()
						.append('svg')
					    .attr('overflow', 'visible')
					    .attr('height', multiplier * heightScale(1))
			   		    .attr('width', function(d) {
			   		   					return multiplier * widthScale(d.wordCount);
			   		   					});

		var numbers = ['1', '2', '3', '4', '5',
				       '6', '7', '8', '9', '10',
				       '11', '12', '13', '14'];

		var chapterOutlines = chapters.append('rect')
                    .attr('x', 0)
                    .attr('y', 0)
					.attr('height', multiplier * heightScale(1))
			   		.attr('width', function(d) {
			   		   					return multiplier * widthScale(d.wordCount);
			   		   					})
                    .style('stroke', 'black')
                    .style('stroke-width', 0.5)
                    .style('fill', function(d) {
                    			try {
	                    			if (numbers.indexOf(d.title.split('.')[1]) != -1)
	                    			{return 'none';}
	                    			else {return 'grey';}
	                    		}
	                    		catch(TypeError) {return 'none';}
	                    		});


	});

	books.on('mouseout', function() {d3.selectAll('.chapters').remove();});

/*	books.on('mouseover', function(d) {
		console.log(div.select('svg.'+d['title']));
								var chapters = div.select('svg.'+d['title'])
											 .data(d['chapters'])
											 .enter()
											 .append('rect')
											 .attr('height', heightScale(1))
									   		 .attr('width', function(d) {
									   		   					return widthScale(d.wordCount);
									   		   					})
						                    .attr('x', 0)
						                    .attr('y', 0)
						                    .style('stroke', 'black')
						                    .style('stroke-width', 0.5)
						                    .style('fill', 'none');
						                })
*/
}

var jsonData = d3.csv('data/hp.csv', drawShelf.bind(null, 'hp'))
var jsonData = d3.csv('data/worm.csv', drawShelf.bind(null, 'worm'))