(function(){

var _ = require('lodash');

function Rater(options){
	_.extend(this, options);
	this.setDefaultFactors();
}

Rater.prototype = {

	setDefaultFactors: function(){
		this.factors = [
			{
				weight: 1,
				score: Rater.wordScore.bind(this),
			},
			{
				weight: 0.1,
				score: Rater.wordLength.bind(this),
			}
		]
	},

	sorted: function(array){
		return (array || this.array)
			.map(this.transform.bind(this))
			.map(this.process.bind(this))
			.sort(function(a, b){
				return b.totalScore-a.totalScore;
			});
	},

	transform: function(d){
		return d.toLowerCase();
	},

	process: function(d){
		return {
			d: d,
			totalScore: this.factors.reduce(function(score, factor){
				return score + (factor.weight*factor.score(d));
			}, 0),
		};
	},

}


Rater.wordScore = function(word){
	var score = 0;
	var queryIndex = 0;
	var straightMatches = 0;

	for(var i=0, l=word.length; i<l; i++){
		if(word[i]===this.query[queryIndex]){

			straightMatches++;
			score+=straightMatches;

			var weightForMatchPosition = 1/(Math.abs(queryIndex-i)+1);
			score+=weightForMatchPosition;

			queryIndex++;
		}else{
			straightMatches=0;
		}
	}
	return score;
};

Rater.wordLength = function(word){
	return -word.length;
};


if(module && module.exports){
	module.exports = Rater;
}else{
	this.Rater = Rater;
}

})();