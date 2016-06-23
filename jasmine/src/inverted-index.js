'use strict';
class Index {

  // Method to create an inverted-index of the documents
  createIndex(filePath) {
    var self = this;
    this.invertedIndexObject = {};

    // Fetch the file and resolve the promise as a JSON file
    return fetch(filePath).then(function(response) {
        return response.json();
      })
      .then(function(finallySomeData) {
        self.books = finallySomeData;
        populateIndex();
      });

    function populateIndex() {
      self.books.forEach((book, docIndex) => {

        /* For each document, turn to string, lowercase, remove special 
         * characters,
         * trim beginning of line spaces and split into individual words.
         */
        var indexArray = JSON.stringify(book)
          .toLowerCase().replace(/\W+/g, ' ').trim().split(' ');

        indexArray.forEach((word, wordIndex) => {
          if (word in self.invertedIndexObject) {
            self.invertedIndexObject[word].push([docIndex, wordIndex]);
          } else {
            self.invertedIndexObject[word] = [
              [docIndex, wordIndex]
            ];
          }
        });
      });
    }
  }

  // Method to return inverted-index from createIndex method
  getIndex() {
    return this.invertedIndexObject;
  }

  // Method to search the index for a term
  searchIndex(term) {
    try {

      // Check if the term provided is a phrase/sentence: 
      if (typeof term === 'string' && term.match(/\s+/)) {

        var result = 'No match has been made';

        this.books.forEach((book, docIndex) => {
          var phraseString = JSON.stringify(book)
            .toLowerCase().replace(/\W+/g, ' ').trim();

          var testRegex = new RegExp(term, 'gi');

          if (testRegex.test(phraseString) === true) {
            result = term + ' found in document ' + docIndex;
          }
        });

        return result;

        // Check if the term is a string
      } else if (typeof term === 'string') {
        term = term.toLowerCase().replace(/\W+/g, '');
        if (!(term in this.invertedIndexObject)) {
          return 'No match has been made';
        }

        // Return the value under the 'term' property in the inverted-index
        return this.invertedIndexObject[term];

        // Check if term is an array

      } else if (Array.isArray(term) === true) {
        this.termArrayObject = {};

        term.map(word => {
          word = word.toLowerCase();
          if (!(word in this.invertedIndexObject)) {
            this.termArrayObject[word] = 'No match has been made';

          } else {
            this.termArrayObject[word] = this.invertedIndexObject[word];
          }
        });

        return this.termArrayObject;
      } else {
        throw 'Search term type invalid: not string or array.';
      }
    } catch (error) {
      return error;
    }
  }

  // Method to get the frequency of a term in the inverted-index
  getFrequency(term, docReference) {
    if (!(term in this.invertedIndexObject)) {
      return 'Term not found';
    } else if (docReference === undefined) {
      return (this.invertedIndexObject[term]).length;

      // If the document argument has been provided
    } else {
      var frequency = 0;
      for (var i = 0; i < this.invertedIndexObject[term].length; i++) {
        if (this.invertedIndexObject[term][i][0] === docReference) {
          frequency++;
        }
      }

      return frequency;
    }
  }
}
