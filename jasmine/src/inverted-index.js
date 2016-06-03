"use strict";

function Index(){
	this.createIndex = function(fileName){
		var json_file = require("../" + fileName + ".json");
		    //console.log(json_file);
	
	this.getIndex = function(){
		json_file.map((book, docIndex) => {
	var wordsArray = [];
	var books = JSON.stringify(book).toLowerCase().split(/\W/g).filter(function (string_){
		return string_.length !== 0;});
	books.map((words) => {
		var IndexObject = (words + ":" + " " + docIndex);
		wordsArray.push(IndexObject)

			});
		console.log(wordsArray);
		})
	}

	this.searchIndex = function(terms){
	var results = [];

	json_file.map((book, index) => {
		const wordToSearch = new RegExp(terms, 'gi');
		if (wordToSearch.test(book.title) || wordToSearch.test(book.text)) {
			results.push(index); 
		}
	});

	if(results.length > 0) {
		console.log(terms + " has been found in the following documents" + " " + results)
	} else{
		console.log("No match has been made")
	}
	};
};
}
var index_ = new Index();
index_.createIndex('books');
index_.searchIndex('lord');






