
describe("Read book data", function(){
	var loaded_json;
	it("checks if file has been loaded", function(){
		fetch("../books.json")
		.then(function(response){
			loaded_json = response.blob();
			return loaded_json;
		})
		expect(loaded_json).not.toBe(null);
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

/*
describe("Populate index", function(){
	it("checks if index has been populated", function(){
		expect(getIndex()).not.toBe(null);
	});
});

*/