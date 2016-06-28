(function(){

var _ = require('lodash');

function Rater(options){
	_.defaults(this, {
		factors: []
	});
	_.extend(this, options);

	this.factors.push({
		weight: 1,
		score: wordScore
	});
}

Rater.prototype = {

	sorted: function(){
		return this.array
			.map(function(d){
				return d.toLowerCase();
			})
			.map(this.process.bind(this))
			.sort(function(a, b){
				return b.totalScore-a.totalScore;
			});
	},

	process: function(d){
		return {
			d: d,
			totalScore: this.factors.reduce((score, factor) => {
				return score + factor.score(this.query.toLowerCase(), d);
			}, 0),
		};
	},

}

function wordScore(query, word){
	var score = 0;
	var queryIndex = 0;
	var straightMatches = 0;

	for(var i=0, l=word.length; i<l; i++){
		if(word[i]===query[queryIndex]){
			straightMatches++;
			score+=straightMatches;
			queryIndex++;
		}else{
			straightMatches=0;
		}
	}
	return score;
}


if(module && module.exports){
	module.exports = Rater;
}else{
	this.Rater = Rater;
}

})();