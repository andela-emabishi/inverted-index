'use strict';
class Index {

  // Method to create an inverted-index of the documents
  createIndex(filePath) {
    var self = this;

    /* Fetch the file and resolve the promise as a JSON file
    * Throw an error if anything goes wrong with the fetch
    */
    return fetch(filePath).then(function(response) {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          var error = new Error(response.statusText);
          throw error;
        }
      })
      .then(function(finallySomeData) {
        self.books = finallySomeData;
        self.populateIndex(finallySomeData);
      })
      .catch(function(error) {
        throw error;
      });
  }

  populateIndex(bookData) {
    var self = this;
    this.invertedIndexObject = {};
    bookData.forEach((book, docIndex) => {

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

  // Method to return inverted-index from createIndex method
  getIndex() {
    return this.invertedIndexObject;
  }

  // Method to search the index for a term
  searchIndex(term) {
    try {
      if (typeof term === 'string') {
        return this.veifyTermIsString(term);
      }
      if (Array.isArray(term)) {
        return this.verifyTermIsArray(term);
      }
      throw 'Search term type invalid: not string or array.';

    } catch (error) {
      return error;
    }
  }

  verifyTermIsArray(term) {
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
  }

  veifyTermIsString(term) {
    if (term.match(/\s+/)) {
      return this.verifyTermIsPhrase(term);

    } else {
      term = term.toLowerCase().replace(/\W+/g, '');
      if (!(term in this.invertedIndexObject)) {
        return 'No match has been made';

      } else {
        return this.invertedIndexObject[term];
      }
    }
  }

  verifyTermIsPhrase(term) {
    var self = this;
    var result = 'No match has been made';

    self.books.forEach((book, docIndex) => {
      var phraseString = JSON.stringify(book)
        .toLowerCase().replace(/\W+/g, ' ').trim();

      var testRegex = new RegExp(term, 'gi');
      if (testRegex.test(phraseString) === true) {
        result = term + ' found in document ' + docIndex;
      }
    });

    return result;
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
