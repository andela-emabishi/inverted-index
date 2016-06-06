
describe("Read book data", function(){

	var jsonFile;
	it("checks if file has been loaded", function(){
		fetch("../books.json")
		.then(function(response){
			jsonFile = response.blob();
			return jsonFile;
		})
		expect(jsonFile).not.toBe(null);
	});

	it("checks if file is empty", function(){
		var _json;
		fetch("../books.json")
		.then(function(response){
			_json = response.blob();
			_json = _json.toString();
		})
		expect(_json.length).not.toBe(0);
	})
});


describe("Populate index", function(){ 
	it("checks if index has been created once the JSON file has been read", function(){
		expect(getIndex()).not.toBe(null);
	});

	it("verifies the index maps words to the correct objects in the JSON ", function(){
		expect()
	})
});

describe("Search Index", function(){
	it("verifies that searching the Index returns an array of the indices of the correct")
})
