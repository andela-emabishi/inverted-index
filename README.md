# Andela Javascript Checkpoint 1: inverted-index
## Description
Develop an [inverted index] (https://www.elastic.co/blog/found-elasticsearch-from-the-bottom-up) object that takes a JSON array of text objects and creates an index from the array. The index allows a user to search for text blocks in the array that contain a specified collection of words.

## Methodology
### createIndex(filePath)
This Method accepts a filePath as its argument and creates an inverted-index from the input JSON file. Each word in the inverted-index is matched to its source document and its individual position in its source object.

### getIndex()
This Method returns the result of the createIndex method, an object that has the format:
`{ word : [[documentID, wordPositionID]],`
   `word2 : [[documentID, wordPositionID],[documentId, wordPositionID]]}`

### searchIndex(term)
This Method takes a `term` as an argument and filters the index for the term, returning the `documentID` and `wordPositionID` for the term.
`[documentId, wordPositionID]`

## Functionality
### Create an instance of the Index Class and call the createIndex and getIndex methods, for example:

`var _index = new Index();`

`_index.createIndex('/jasmine/books.json').then(function() {`

  `console.log(_index.getIndex());`

  `// Search for these 'terms'`
  `console.log(_index.searchIndex('alice'));`
  `console.log(_index.searchIndex('and'));`
  `console.log(_index.searchIndex('rudyard'));`
  `console.log(_index.searchIndex('astronomy'));`
  `console.log(_index.searchIndex('wonderland'));`

  `// Will it throw an invalid type error for non-string type entries?`
  `console.log(_index.searchIndex(090));`
  `console.log(_index.searchIndex(true));`

`});`

**For the books.JSON test object, the result would be:**

`{  title : [0 , 0],`
  `'alice : [[0 , 1],[0 , 5]],`
  `'in : [0 , 2],`
  `'wonderland : [0 , 3],`
  `'text : [0 , 4],`
  `'falls : [0 , 6],`
  `snipped .......}`
  
`console.log(index.searchIndex('and'));`
*The result of this would be:*
`[[0 , 3] , [0 , 11] , [ 1 , 20]`

`console.log(index.searchIndex('rudyard'));`
*The result of this would be:*
`[2 , 1]`

`console.log(index.searchIndex('astronomy'));`
*The result of this would be:*
`No match has been made`

### Dependencies
*To run the tests, start a server at the root inverted-index folder by typing:
`  python -m SimpleHTTPServer  8000` 
into your terminal program.
Copy the addresses `localhost:8000` into a browser of your choice. Click into the jasmine then SpecRunner folder to run.

