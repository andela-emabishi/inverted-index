//Load JSON from local file, use relative indexing
function Index(){
	this.createIndex = function(fileName){
		var json_file = require("../" + fileName + ".json");
		    //console.log(json_file);
	
/*
	this.getIndex = function(file){
		var arr = [];
		for(var i = 0; i < file.length; i++){
			console.log(file[i])
			for (keys in file[i]){
				console.log(keys)
				console.log(file[i][keys])
				arr.push(file[i][keys])
				console.log(arr)
			}
		}
	}
*/

	this.searchIndex = function(terms){
	var results = [];

	json_file.map((book, index) => {
		const wordToSearch = new RegExp(terms, 'gi');
		if (wordToSearch.test(book.title) || wordToSearch.test(book.text)) {
			results.push(index); 
			//console.log(book);
		}
	});

	if(results.length > 0) {
		console.log(terms + " has been found in the following documents" + " " + results)
	} else{
		console.log("No match has been made")
	}
	};
};
};
var index_ = new Index();
index_.createIndex('books');
//index_.getIndex(index_.results);
index_.searchIndex('lord');






