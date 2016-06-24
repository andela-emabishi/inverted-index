# Andela Javascript Checkpoint 1: inverted-index

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/eac2940021d2465e99f296cbdbad182a)](https://www.codacy.com/app/elizabeth-wakio/inverted-index?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=andela-emabishi/inverted-index&amp;utm_campaign=Badge_Grade)

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
This Method takes a `term`, a string, array or phrase, as an argument and filters the index for the term or terms.

For a single word `string`:
```javaScript
[documentId, wordPositionID]
```
For an `array`:
```javaScript
{ term1 : [documentId, wordPositionId],
  term2 : [[documentId, wordPositionId],[documentId, wordPositionId]]}
```
For a `phrase`:
```javaScript
phrase has been found in document: docIndex
```

### getFrequency(term, docReference)
This method takes a `term` and `docReference` as an argument and returns a value repersenting how many times the `term` appears in the document referenced. If no `docReference` is provided, then the method is executed for the entire inverted-index.

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

  //What about passing an array?
  console.log(_index.searchIndex(['Alice','Lord','Author','Tolkien']));
  
  // Will it throw an invalid type error for non-string type entries?
  console.log(_index.searchIndex(090));
  console.log(_index.searchIndex(true));

  // Get the frequency of these terms
  console.log(_index.getFrequency('lord'));
  console.log(_index.getFrequency('alice'));
  console.log(_index.getFrequency('ring', 1));
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
  

*The result of:*
```javaScript
console.log(index.searchIndex('and'));
``` 
*would be:*

```javaScript
[[0 , 3] , [0 , 11] , [ 1 , 20]
```

*The result of:*
```javaScript
console.log(index.searchIndex('rudyard'));
```
*would be:*

```javaScript
[2 , 1]
```

*The result of:*
```javaScript
console.log(index.searchIndex('astronomy'));
```
*would be:*

```javaScript
No match has been made
```

*The result of:*
```javaScript
 console.log(_index.searchIndex(['Lord','Author','Tolkien']));
```
*would be:*
```javaScript
{ lord: [1,2], author: [2,1] }
```

*The result of:*
```javaScript
console.log(_index.getFrequency('alice'));
```
*would be:* 
```javaScript
2
```
*The result of:*
```javaScript
console.log(_index.getFrequency('ring', 1));
```
*would be:* 
```javaScript
2
```

*The result of:*
```javaScript
console.log(_index.getFrequency('inappropriate'));
```
*would be:*
```javaScript
Term not found in file
```


### Dependencies
To run the tests: 
* Clone this repository with the command: `git clone https://github.com/andela-emabishi/inverted-index.git`
* Install [node.js v6.2.2] (https://nodejs.org/en/) on your machine.
* Install server dependencies by running the command ` npm install http-server -g`. More on this [here] (https://www.npmjs.com/package/http-server)
* Start a server at the root inverted-index folder by typing `http-server` into your terminal program.
* Copy the address given i.e. `http://127.0.0.1:8080` into a browser of your choice. From the browser, click into the jasmine then SpecRunner folder or use `http://127.0.0.1:8080/jasmine/SpecRunner.html` to run.

### License
This project was created under a GNU Public License. See [here] (https://github.com/andela-emabishi/inverted-index/blob/dev/LICENSE) for more information.

### Let's chat
You can find the author [@emabishi] (https://github.com/emabishi) or [@andela-emabishi] (https://github.com/andela-emabishi) on github and @emabishi on twitter.
