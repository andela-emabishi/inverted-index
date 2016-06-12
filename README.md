# inverted-index
## Andela Javascript Checkpoint 1
### Description
Develop an [inverted index] (https://www.elastic.co/blog/found-elasticsearch-from-the-bottom-up) object that takes a JSON array of text objects and creates an index from the array. The index allows a user to search for text blocks in the array that contain a specified collection of words.

### Methodology
#### createIndex(filePath)
This Method accepts a filePath as its argument and creates an inverted-index from the input JSON file. Each word in the inverted-index is matched to its source document and its individual position in its source object.

#### getIndex()
This Method returns the result of the createIndex method, an array that has the format:
`['word1 : documentId : wordPositionID',`
`'word2 : documentId : wordPositionID']`

#### searchIndex(term)
This Method takes a `term` as an argument and filters the index for the term, returning the `documentID` and `wordPositionID` for the term.
`['term : documentId : wordPositionID']`

### Functionality
#### Create an instance of the Index Class, for example:
`var index = new Index();`
`index.createIndex('../books.json');`
`console.log(index.getIndex());`

**For the books.JSON test object, the result would be:**

`[ 'title : 0 : 0',`
  `'alice : 0 : 1',`
  `'in : 0 : 2',`
  `'wonderland : 0 : 3',`
  `'text : 0 : 4',`
  `'alice : 0 : 5',`
  `'falls : 0 : 6',`
  `snipped .......`
  `snipped .......]`
  
`console.log(index.searchIndex('and'));`
*The result of this would be:*
`[ 'wonderland : 0 : 3', 'and : 0 : 11', 'and : 1 : 20' ]`

`console.log(index.searchIndex('rudyard'));`
*The result of this would be:*
`[ 'rudyard : 2 : 1' ]`

`console.log(index.searchIndex('astronomy'));`
*The result of this would be:*
`No match has been made`
