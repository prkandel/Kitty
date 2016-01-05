function Game(Number_Of_Players,Per_Player_Card){
	var DECK = new Deck();
	this.players = [];
	var that=this;	
	

	for(var i=0;i<Number_Of_Players;i++){
		this.players[i] = new Player();
	}

	this.init = function(){
		DECK.shuffle();
		that.distributeCards();
	 	// that.displayDistributed();
	 	// that.displayRank();
	 	that.arrangeKitty();
	}

	this.distributeCards = function(){
		for(var i=0; i<Number_Of_Players;i++){
			var currentPlayerCards = [];
			for(var j=0;j<Per_Player_Card;j++){
				var currentcard = DECK.drawCard();
				// console.log(' pl ',i,' cd ',j,currentcard);
				currentPlayerCards.push(currentcard);
			}
			that.players[i].setCards(currentPlayerCards);
		}
	}
	

	this.arrangeKitty = function(){
		for(var i=0;i<Number_Of_Players-1;i++)
			that.players[i].arrange();
	}

	this.displayDistributed = function(){
		for(var i=0;i<Number_Of_Players;i++){
			for(var j=0;j<Per_Player_Card;j++){
				that.players[i].cards[j].displayIt();
			}
		}
	}

	this.roundOneWinner = function(){
		var minirankArray = [];
		for(var i=0;i<Number_Of_Players;i++){
			var minirank = that.players[i].getMiniRank(that.players[i].cards[0],that.players[i].cards[1],that.players[i].cards[2]);
			minirankArray.push(minirank);
		}
		var greatest=minirankArray[0],secondGreat,indexOfGreatest=0;
		for(var i=1;i<minirankArray.length;i++){
			if(minirankArray[i]>=greatest){
				secondGreat = greatest;
				greatest = minirankArray[i];
				indexOfGreatest = i;
			}
		}
		if(secondGreat == greatest)
			return -1;
		else
			return indexOfGreatest+1;


	}
	this.roundTwoWinner = function(){
		var minirankArray = [];
		for(var i=0;i<Number_Of_Players;i++){
			var minirank = that.players[i].getMiniRank(that.players[i].cards[3],that.players[i].cards[4],that.players[i].cards[5]);
			minirankArray.push(minirank);
		}
		var greatest=minirankArray[0],secondGreat,indexOfGreatest=0;
		for(var i=1;i<minirankArray.length;i++){
			if(minirankArray[i]>=greatest){
				secondGreat = greatest;
				greatest = minirankArray[i];
				indexOfGreatest = i;
			}
		}
		if(secondGreat == greatest)
			return -1;
		else
			return indexOfGreatest+1;


	}
	this.roundThreeWinner = function(){
		var minirankArray = [];
		for(var i=0;i<Number_Of_Players;i++){
			var minirank = that.players[i].getMiniRank(that.players[i].cards[6],that.players[i].cards[7],that.players[i].cards[8]);
			minirankArray.push(minirank);
		}
		var greatest=minirankArray[0],secondGreat,indexOfGreatest=0;
		for(var i=1;i<minirankArray.length;i++){
			if(minirankArray[i]>=greatest){
				secondGreat = greatest;
				greatest = minirankArray[i];
				indexOfGreatest = i;
			}
		}
		if(secondGreat == greatest)
			return -1;
		else
			return indexOfGreatest+1;
	}

	this.checkCardsOrderofPlayer = function(){
		var i=3; //User is player number three
		var minirank1 = that.players[i].getMiniRank(that.players[i].cards[0],that.players[i].cards[1],that.players[i].cards[2]);
		var minirank2 = that.players[i].getMiniRank(that.players[i].cards[3],that.players[i].cards[4],that.players[i].cards[5]);
		var minirank3 = that.players[i].getMiniRank(that.players[i].cards[6],that.players[i].cards[7],that.players[i].cards[8]);

		if(minirank1>=minirank2 && minirank2>=minirank3)
			return true;
		else
			return false;
	}
}