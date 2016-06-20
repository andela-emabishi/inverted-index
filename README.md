# Andela Javascript Checkpoint 1: inverted-index
## Description
Develop an [inverted index] (https://www.elastic.co/blog/found-elasticsearch-from-the-bottom-up) object that takes a JSON array of text objects and creates an index from the array. The index allows a user to search for text blocks in the array that contain a specified collection of words.

## Methodology
### createIndex(filePath)
This Method accepts a filePath as its argument and creates an inverted-index from the input JSON file. Each word in the inverted-index is matched to its source document and its individual position in its source object.

### getIndex()
This Method returns the result of the createIndex method, an object that has the format:
```javaScript
{ word : [[documentID, wordPositionID]],
  word2 : [[documentID, wordPositionID],[documentId, wordPositionID]]}
 ```
`documentID` refers to the numerical identity of the document in which the word is found.
`wordPositionID` refers to the poistion of the word in the document it is found.

### searchIndex(term)
This Method takes a `term` as an argument and filters the index for the term, returning the `documentID` and `wordPositionID` for the term:
```javaScript
[documentId, wordPositionID]
```

### getFrequency(term)
This method takes a `term` as an argument and returns a value repersenting how many times the 'term' appears in the input file.

## Functionality
#### Create an instance of the Index Class and call the createIndex and getIndex methods, for example:

```javaScript
var _index = new Index();
_index.createIndex('/jasmine/books.json').then(function() {
  console.log(_index.getIndex());

  // Search for these 'terms'
  console.log(_index.searchIndex('alice'));
  console.log(_index.searchIndex('and'));
  console.log(_index.searchIndex('rudyard'));
  console.log(_index.searchIndex('astronomy'));
  console.log(_index.searchIndex('wonderland'));
  
  // Will it throw an invalid type error for non-string type entries?
  console.log(_index.searchIndex(090));
  console.log(_index.searchIndex(true));

  // Get the frequency of these terms
  console.log(_index.getFrequency('lord'));
  console.log(_index.getFrequency('alice'));
  console.log(_index.getFrequency('inappropriate'));

});
```

**For the books.JSON test objects first document, alice, the result would be:**

```javaScript
   { title : [0 , 0],
	   alice : [[0 , 1],[0 , 5]],
	   in : [0 , 2],
	   wonderland : [0 , 3],
	   text : [0 , 4],
	   falls : [0 , 6],
	   snipped .......
   }
```
  
```javaScript
console.log(index.searchIndex('and'));
```
*The result of this would be:*
```javaScript
[[0 , 3] , [0 , 11] , [ 1 , 20]
```

```javaScript
console.log(index.searchIndex('rudyard'));
```
*The result of this would be:*
```javaScript
[2 , 1]
```

```javaScript
console.log(index.searchIndex('astronomy'));
```
*The result of this would be:*
```
No match has been made
```

```javaScript
console.log(_index.getFrequency('alice'));
```
*The result of this would be:* `2`

```javaScript
console.log(_index.getFrequency('inappropriate'));
```
*The result of this would be:*
```Term not found in file```


### Dependencies
To run the tests: 
1. Clone this repository with the command: `git clone https://github.com/andela-emabishi/inverted-index.git`
2. Install [node.js v6.2.2] (https://nodejs.org/en/) on your machine.
3. Install server dependencies by running the command ` npm install http-server -g`. More on this [here] (https://www.npmjs.com/package/http-server)
4. Start a server at the root inverted-index folder by typing `http-server` into your terminal program.
5. Copy the address given i.e. `http://127.0.0.1:8080` into a browser of your choice. From the browser, click into the jasmine then SpecRunner folder or `http://127.0.0.1:8080/jasmine/SpecRunner.html` to run.

### License
This project was created under a GNU Public License. See [here] (https://github.com/andela-emabishi/inverted-index/blob/dev/LICENSE) for more information.

### Let's chat
You can find the author [@emabishi] (https://github.com/emabishi) or [@andela-emabishi] (https://github.com/andela-emabishi) on github and @emabishi on twitter.
