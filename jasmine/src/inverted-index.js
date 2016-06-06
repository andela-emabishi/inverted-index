"use strict";

function Index(){
	this.createIndex = function(fileName){
		var jsonFile = require("../" + fileName + ".json");
				var indexArray;
				var wordsArray = [];

		jsonFile.map((book, docIndex) => {
				var books = JSON.stringify(book).toLowerCase().split(/\W/g).filter(function (string_){
					return string_.length !== 0;
				});

				books.map((words) => {
					var IndexObject = (words + ":" + " " + docIndex);
					wordsArray.push(IndexObject)
				});

				this.indexArray =  wordsArray;
				return wordsArray;
			})
	
	
		this.getIndex = function(){
			console.log(this.indexArray);			
		}

		this.searchIndex = function(terms){
			var results = [];

			this.indexArray.map((element) => {
				const wordToSearch = new RegExp(terms, 'gi');
			
				if (wordToSearch.test(element)) {
					results.push(element); 
				}
			});

			if(results.length > 0) {
				console.log(results)
			}
		 	else{
				console.log("No match has been made")
			}
		};
	};
}

var index = new Index();
index.createIndex('books');
index.getIndex();
index.searchIndex('alice');