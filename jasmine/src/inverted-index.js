//Load JSON from local file, use relative indexing
function Index(){
	this.createIndex = function(fileName){
		var json_file = require("../" + fileName + ".json");
		    return json_file;
	}

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
}

var index_ = new Index();
index_.results = index_.createIndex('books');
index_.getIndex(index_.results);




//Loop through JSON array, getting each document



//Make string of all keys in each object in JSON array and lowercase string



//Remove all stop words from lowercase string



//Loop though string while splitting on space and Create index of words in string
//({term:[1,3],[2,6]},{term2:[1,0],[2,0],[3,3]}})
//See about outputting pretty table


//For function-search (terms) filter index for search terms
//Return object ({term:[1,3],[2,6]},{term2:[1,0],[2,0],[3,3]}})
//Make it clearer---- term + "in Doc" + varname.key[0][0] + "appears" + varname.key[0][1] + "times"

