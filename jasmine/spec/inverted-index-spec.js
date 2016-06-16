// Instanciate new Index
var index = new Index();

// Run createIndex method and make sure it completes before any test is run
beforeEach(function(done) {
  index.createIndex('/jasmine/spec/test.json').then(function () {
    done();

  });

});

// Test suite for index class
describe("Index", function() {
  describe("Read book data", function() {
    it("should read the JSON file and assert its not empty", function() {
      expect(index.books.length).toBeGreaterThan(0);
    });

  });

  describe("Populate index", function() {
    it("checks if index has been created once the JSON file has been read", function() {
      
      //typeof object,array and null === 'undefined'
      //Make sure it's not either an array or null
      expect(typeof index.indexObj === 'object' && !Array.isArray(index.indexObj) && index.indexObj !== null).toBeTruthy();
    });

    it("should not have an empty object", function() {
      expect(Object.keys(index.indexObj).length).not.toBe(0);
    });

    it("verifies the index maps words to the correct objects in the JSON ", function() {
      expect(index.indexObj).toEqual({testing : [[0, 0],[1,0]], test : [[0,1],[1,1]], again: [[1,2]]});
    });

  });

  describe("Search Index", function() {
    it("verifies that searching the Index returns the correct results", function() {
      expect(index.searchIndex('testing')).toEqual([[0, 0],[1,0]]);
    });

    it("returns no match has been made for search terms not found", function() {
      expect(index.searchIndex('I am not there')).toBe('No match has been made');
    });

  });

});
