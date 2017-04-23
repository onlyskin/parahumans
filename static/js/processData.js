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
