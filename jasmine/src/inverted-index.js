class Index {

    // Method to create an inverted-index of the documents
    createIndex(filePath) {

        // Here, self refers to the Index object
        var self = this;

        // Initialise Object to store the inverted-index
        this.indexObj = {};

        /* Fetch the document 
         * Resolve the promise and 
         * store the data in a variable, 'finallySomeData'
         */
        return fetch(filePath).then(function(response) {
            return response.json();
        })
        .then(function(finallySomeData) {
            self.books = finallySomeData;

            // Call the populateIndex function to create the inverted-index
            populateIndex();
        });

        function populateIndex() {
            /* Iterate through the data 
            * obtaining each book's position in the document.
            */
            self.books.forEach((book, docIndex) => {

                /* For each document, turn to string, 
                * lowercase, remove special characters
                 * and trim beginning of line spaces.
                 */
                var bookObjectString = JSON.stringify(book)
                    .toLowerCase().replace(/\W/g, ' ')
                    .replace(/\s+/g, ' ').trim();

                // For each document, split at space to form individual words.
                var indexArray = bookObjectString.split(' ');

                indexArray.forEach((word, wordIndex) => {

                    /* If the word already exists in the indexObject, 
                     * add an array with the word's docIndex 
                     * and wordIndex for this occurrence, 
                     * under the 'word' property
                     */

                    if (word in self.indexObj) {

                        self.indexObj[word].push([docIndex, wordIndex]);

                    } else {
                        // Else create a new array for that word
                        self.indexObj[word] = [
                            [docIndex, wordIndex]
                        ];

                    }

                });

            });
            //console.log(self.indexObj);
        }

    }

    // Method to return inverted-index from createIndex method
    getIndex() {
        return this.indexObj;

    }

    // Method to search the index for a term
    searchIndex(term) {
        try {
            // Check if the 'term' provided is a string or an array
            if (typeof term === 'string') {
                // Normalise input
                term = term.toLowerCase();

                // 'term' is not in the inverted-index
                if (!(term in this.indexObj)) {
                    return 'No match has been made';

                }

                /* Return the value under the 'term' property 
                * in the inverted-index
                */
                return this.indexObj[term];

            } else {
                /* If an invalid input 
                * is entered as a search term,
                * throw this error
                */
                throw 'Search term type invalid: not string or array.';
            }

            // Catch the error here and display it
        } catch (error) {
            return error;

        }

    }

    // Method to get the frequency of a term in the inverted-index
    getFrequency(term) {

        /* The term is not in the inverted-index,
        * its frequency cannot be established
        */
        if (!(term in this.indexObj)) {
            return 'Term not found';

        } else {
            // Run getIndex to make the index object accessible
            index.getIndex();

            /* Go through the index and get the length 
            * of the array corresponding to the word
            * i.e. term: [[1,2],[2,3]] , (indexObject[term]).length = 2
            */

            return (this.indexObj[term]).length
        }

    }

}

// Instanciate the index,create,get,search and getFequency methods
var _index = new Index();

// Ensure the result of createIndex is returned before getIndex is run
_index.createIndex('/jasmine/books.json').then(function() {

    console.log(_index.getIndex());

    // Search for these 'terms'
    console.log(_index.searchIndex('alice'));
    console.log(_index.searchIndex('and'));
    console.log(_index.searchIndex('rudyard'));
    console.log(_index.searchIndex('astronomy'));
    console.log(_index.searchIndex('wonderland'));

    // Will it throw an invalid type error for non-string type entries?
    console.log(_index.searchIndex(90));
    console.log(_index.searchIndex(true));

    // Get the frequency of these terms
    console.log(_index.getFrequency('lord'));
    console.log(_index.getFrequency('alice'));
    console.log(_index.getFrequency('inappropriate'));

});
