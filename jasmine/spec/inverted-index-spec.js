var Index = require('../src/inverted-index');
var index = new Index();

describe("Index", function(){//for index
	describe("Read book data", function(){
		it("should read the JSON file and assert its not empty", function(){
        	index.readJSONFromFile(__dirname + '/../books.json')
        	expect(index.books.length).toBeGreaterThan(0);
		});
	});

	beforeEach(function () {
		index.books = [
			{
				testing: 'test'
			}
		];
		index.createIndex();
	});

	describe("Populate index", function(){
		it("checks if index has been created once the JSON file has been read", function(){
			expect(Array.isArray(index.getIndex())).toBeTruthy();
		});
		it("checks if the index array is empty", function(){
			index.createIndex();
			expect(index.indexArray.length).not.toBe(0)
		})

		it("verifies the index maps words to the correct objects in the JSON ", function (){
			expect(index.getIndex()).toEqual(['testing : 0 : 0','test : 0 : 1']);
		});
	});

	describe("Search Index", function(){
		it("verifies that searching the Index returns the correct results", function () {
			expect(index.searchIndex('testing')).toEqual(['testing : 0 : 0']);
		});

		it("verifies search index returns correct position", function () {
			var testIndex = index.searchIndex('test');
			var pos = testIndex[0].split(' ')[4];
			expect(parseInt(pos)).toEqual(0);
		});

		it("returns no match has been made for missing indexes", function () {
			expect(index.searchIndex('I am not there')).toBe('No match has been made');
		});
	});

});
