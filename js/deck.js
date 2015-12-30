function Deck(){
	var NOC=52;
	this.cardIndex=0;
	var that = this;
	this.cardHaru =[];
	var that = this;
	for(var i=0;i<NOC;i++){
		this.cardHaru[i] = new Card(i+1);
	}

	this.shuffle = function(){
		that.cardIndex = 0;
		var array_of_random_number = create_array_of_random_number(0,51);
		for(var i=0;i<NOC;i++){
			var rand = array_of_random_number[i];
			that.cardHaru[i] = new Card(rand+1);
		}
	}

	this.drawCard = function(){
		return that.cardHaru[that.cardIndex++];
	}


	this.displayShuffledCards = function(){
		for(var i=0;i<52;i++){
			that.cardHaru[i].displayCard();
		}
	}
}

