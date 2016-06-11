/**
* Elizabeth Mabishi
* Andela Javascript Checkpoint 1: Inverted Index
* Date: 10th June 2016
* version 1.1
*/


'use strict';

// import the file reader
const fs = require('fs');

//ES6 Class declaration
class Index {

  //Method to create an Index
  createIndex(filePath) {

    this.books = JSON.parse(fs.readFileSync(filePath));
    console.log(this.books.length)

    this.indexArray = [];

    this.books.forEach (( book, docIndex ) => {

      var bookObjectString = JSON.stringify(book).toLowerCase().replace(/\W/g, ' ').replace(/\s+/g, ' ').trim();

      this.indexArray = this.indexArray.concat(bookObjectString.split(' ').map((word, wordIndex) => {

        return (word + ' : ' + docIndex + ' : ' + wordIndex);

      }));

    });
  }

  //Method to return inverted-index
  getIndex() {

    return this.indexArray;
  }

  //Method to search the index for a term
  searchIndex(term) {

    var results = this.indexArray.filter(wordStatistics => {

      const wordToSearch = new RegExp(term, 'gi');
      
      // if a true boolean is returned, wordStatistics is added to results array
      return wordToSearch.test(wordStatistics);
    });

    if (results.length === 0) {

      return 'No match has been made';
    }
    return results;
  }
}

// var index = new Index();
// index.createIndex('../books.json');
// console.log(index.getIndex());
// //console.log(index.getIndex().length);
// console.log(index.searchIndex('and'));
// console.log(index.searchIndex('rudyard'));
// console.log(index.searchIndex('astronomy'));

module.exports = Index;
