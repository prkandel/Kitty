function Player(){
	var that = this;
	this.setCards = function(cards){
		that.cards = cards;
	}
	this.findOrder = function(){
		var rankOverall = 0;
		var cardsTemp = [];
		for(var i=0;i<data.length;i++){
			var rankTemporary = [];
			var order = data[i];
			for(var j=0;j<that.cards.length;j++){
				var temp = order[j];
				cardsTemp[j] = that.cards[temp];
			}
			for(var k=0; k<that.cards.length; k+=3){
				// var minirank = getMiniRank(that.cardsTemp[k],that.cardsTemp[k+1],that.cardsTemp[k+2]);
				var minirank = getMiniRank(cardsTemp[k],cardsTemp[k+1],cardsTemp[k+2]);
				rankTemporary.push(minirank);
				// console.log(minirank);
			}
			var ranksum = rankTemporary[0]+rankTemporary[1]+rankTemporary[2];
			rankTemporary = [];
			if(ranksum > rankOverall){
				rankOverall = ranksum;
				bestRankOrderNumber = i;
			 }
		}
		return bestRankOrderNumber;
	}

	//yo ahile ekchin lai check garna lai  matra yesari kaam gardai
	//chhu, kitty complete arrange bhaisakeko chhaina ajhai

	this.arrange = function(){
		var cardsTemp = [];		
		var bestRankOrderNumber = that.findOrder();
		var order = data[bestRankOrderNumber];
		for(var i=0;i<that.cards.length;i++)
			cardsTemp[i] = that.cards[order[i]];
		//arranging the order of the three groups of three cards
		//The highest ranked group should come first in Kitty
		//Adjusting it here.
		var rankTemporary  = [];
		for(var k=0;k<that.cards.length;k+=3){
			var minirank = getMiniRank(cardsTemp[k],cardsTemp[k+1],cardsTemp[k+2]);
			rankTemporary.push(minirank);
			// console.log(minirank);
		}
		that.arrangeMini(rankTemporary,cardsTemp);
		var rankFinal = [];
		for(var k=0;k<that.cards.length;k+=3){
			var minirank = getMiniRank(that.cards[k],that.cards[k+1],that.cards[k+2]);
			rankFinal.push(minirank);
		}
		console.log('rank final ', rankFinal);
		return rankFinal;
	}

	this.arrangeMini = function(rankTemporary,cardsTemp){
		if(rankTemporary[0] == grtofthree(rankTemporary[0],rankTemporary[1],rankTemporary[2])){
			
			for(var i=0;i<3;i++){
				that.cards[i] = cardsTemp[i];
			}

			if(rankTemporary[1]>rankTemporary[2]){
				for(var i=3;i<that.cards.length;i++){
					that.cards[i] = cardsTemp[i];
				}
			} else {
				for(var i=3;i<6;i++){
					that.cards[i] = cardsTemp[i+3];
				}
				for(var i=6;i<that.cards.length;i++){
					that.cards[i] = cardsTemp[i-3];	
				}
			}
		}else if(rankTemporary[1] == grtofthree(rankTemporary[0],rankTemporary[1],rankTemporary[2])) {
			for(var i=0;i<3;i++){
				that.cards[i] = cardsTemp[i+3];
			}
			if(rankTemporary[0]>rankTemporary[2]){
				for(var i=3;i<6;i++){
					that.cards[i] = cardsTemp[i-3];
				}
				for(var i=6;i<that.cards.length;i++){
					that.cards[i] = cardsTemp[i];
				}
			}
			else{
				for(var i=3;i<6;i++){
					that.cards[i] = cardsTemp[i+3];
				}
				for(var i=6;i<that.cards.length;i++){
					that.cards[i] = cardsTemp[i-6];
				}
			}
		}
		else{
			for(var i=0;i<3;i++){
				that.cards[i] = cardsTemp[i+6];
			}
			if(rankTemporary[0]>rankTemporary[1]){
				for(var i=3;i<6;i++){
					that.cards[i] = cardsTemp[i-3];
				}
				for(var i=6;i<that.cards.length;i++){
					that.cards[i] = cardsTemp[i-3];
				}
			}
			else{
				for(var i=3;i<6;i++){
					that.cards[i] = cardsTemp[i];
				}
				for(var i=6;i<that.cards.length;i++){
					that.cards[i] = cardsTemp[i-6];
				}
			}

		}
	}
}