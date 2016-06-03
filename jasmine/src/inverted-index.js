"use strict";

function Index(){
	this.createIndex = function(fileName){
		var jsonFile = require("../" + fileName + ".json");
		    //console.log(jsonFile);
	
	this.getIndex = function(){
		jsonFile.map((book, docIndex) => {
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

	jsonFile.map((book, index) => {
		const wordToSearch = new RegExp(terms, 'gi');
		var books = JSON.stringify(book).toLowerCase().split(/\W/g).filter(function (string_){
		return string_.length != 0;});
		if (wordToSearch.test(books) || wordToSearch.test(books)) {
			results.push(index); 
		}
	});

	if(results.length > 0) {
		console.log(terms + " has been found in the following documents:" + " " + results)
	} else{
		console.log("No match has been made")
	}
	};
};
}

var index = new Index();
index.createIndex('books');
index.searchIndex('title');
index.getIndex();






