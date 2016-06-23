// Instanciate new Index
'use strict';
var index = new Index();

describe('Expose fetch errors', function() {
  it('should expose an error if something went wrong with fetching the JSON', function(done) {
    index.createIndex('/jasmine/spec/tester.json').catch((error) => {
      expect(error).toEqual(jasmine.any(Error));
      //expect(error.toString()).toEqual('Error: Not Found');
      done();
    });

  });

});


describe('Index test suite', function(){

//Run createIndex method and make sure it completes before any test is run
beforeEach(done => {
  index.createIndex('/jasmine/spec/test.json').then(() => {
    done();
  });

});

// Test suite for Index class
  describe('Read book data', () => {
    it('should read the JSON file and assert its not empty', () => {
      expect(index.books.length).toBeGreaterThan(0);
    });

  });

  describe('Populate index', () => {
    it('checks if index has been created once the JSON file has been read', () => {

      // typeof object,array and null === 'object'
      // Make sure it's not either an array or null
      expect(typeof index.invertedIndexObject === 'object' && !Array.isArray(index.invertedIndexObject) && 
        index.invertedIndexObject !== null).toBeTruthy();
    });

    it('verifies that the index does not have an empty object', () => {
      expect(Object.keys(index.invertedIndexObject).length).not.toBe(0);
    });

    it('verifies the index maps words to the correct objects in the JSON ', () => {
      expect(index.invertedIndexObject).toEqual({ testing: [[0, 0],[1, 0]], test: [[0, 1],[1, 1]], again: [[1, 2]] });
    });

  });

  describe('Search Index', () => {
    it('verifies that searching the Index returns the correct results', () => {
      expect(index.searchIndex('testing')).toEqual([[0, 0],[1, 0]]);
    });

    it('returns -no match has been made- for search terms not found', () => {
      expect(index.searchIndex('appropriate')).toBe('No match has been made');
      expect(index.searchIndex('I am not there')).toBe('No match has been made');
    });

    it('throws an error when a non string or non array type term has been searched', () => {
      expect(index.searchIndex(true)).toBe('Search term type invalid: not string or array.');
      expect(index.searchIndex(900)).toBe('Search term type invalid: not string or array.');
    });

    it('can parse an array passed into the searchIndex ', () => {
      expect(index.searchIndex(['Testing','again'])).toEqual({ testing: [[0,0], [1,0]], again: [[1,2]] });
    });

    it('supports phrase searching', () => {
      expect(index.searchIndex('Test again')).toBe('Test again found in document 1');
    });

  });

  describe('Get Frequency', () => {
    it('verifies that only words in the inverted-index are matched to a frequency', () => {
      expect(index.getFrequency('appropriate')).toBe('Term not found');
    });

    it('verifies that the correct frequency has been assigned to a term', () => {
      expect(index.getFrequency('test')).toBe(2);
      expect(index.getFrequency('again')).toBe(1);
    });

    it('verifies that the correct frequency has been assigned to a term in a particular document', () => {
      expect(index.getFrequency('again',1)).toBe(1);
    });

  });
});
