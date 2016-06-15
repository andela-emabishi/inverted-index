// Import the file reader
class Index {

  // Method to create an Index
  createIndex(filePath) {
    var self = this;

    this.indexObj = {};

    return fetch(filePath).then(function (response) {

      return response.json();

      })
      .then(function (finally_some_data) {
        self.books = finally_some_data;
        populateIndexArray();
      });


    // For each document, turn to string, lowercase, remove special characters
    // and trim beginning of line spaces.

    function populateIndexArray() {
      // Use forEach to iterate through each document obtaining its position in the document.
      self.books.forEach((book, docIndex) => {

        var bookObjectString = JSON.stringify(book).toLowerCase().replace(/\W/g, ' ').replace(/\s+/g, ' ').trim();

        // Concatenate document and split at space to form individual words.
        // Map each word to its position in the document
        var indexArray = bookObjectString.split(' ');
        indexArray.forEach((word, wordIndex) => {
          if (word in self.indexObj) {
            self.indexObj[word].push([docIndex, wordIndex]);
          } else {
            self.indexObj[word] = [[docIndex, wordIndex]];
          }
        });
      });
      console.log(self.indexObj);
    }
  }

  // Method to return inverted-index from create index method
  getIndex() {
    return this.indexObj;
  }



  // Method to search the index for a term
  searchIndex(term) {

    try {

      if (typeof term === 'string') {
        term = term.toLowerCase();
        if (!(term in this.indexObj)) {

          return 'No match has been made';
        }
        return this.indexObj[term];

      } else {
        throw "Search term type invalid: not type string.";
      }

    } catch (error) {
      return error;
    }
  }
}

// var index = new Index();
// index.createIndex('../books.json');
// console.log(index.getIndex());
// console.log(index.searchIndex('and'));
// console.log(index.searchIndex('rudyard'));
// console.log(index.searchIndex('astronomy'));
// console.log(index.searchIndex(090));
// console.log(index.searchIndex(true));

var index = new Index();
index.createIndex('/jasmine/books.json').then(function () {
  // console.log(index.getIndex());
  console.log(index.searchIndex('alice'))
});


