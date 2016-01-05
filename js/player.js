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
				var minirank = that.getMiniRank(cardsTemp[k],cardsTemp[k+1],cardsTemp[k+2]);
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
			var minirank = that.getMiniRank(cardsTemp[k],cardsTemp[k+1],cardsTemp[k+2]);
			rankTemporary.push(minirank);
			// console.log(minirank);
		}
		that.arrangeMini(rankTemporary,cardsTemp);
		var rankFinal = [];
		for(var k=0;k<that.cards.length;k+=3){
			var minirank = that.getMiniRank(that.cards[k],that.cards[k+1],that.cards[k+2]);
			rankFinal.push(minirank);
		}
		// console.log('rank final ', rankFinal);
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
	function istrial(Card1,Card2,Card3){
		var a = Card1.cardValue;
		var b = Card2.cardValue;
		var c = Card3.cardValue;
		if((a==b)&&(b==c))
	        return true;
	    else
	        return false;
	}	

	function isrun(Card1,Card2,Card3){
		var a = Card1.cardValue;
		var b = Card2.cardValue;
		var c = Card3.cardValue;
		//adjusting for ekka, duwa ra tirki. Tyo pani ta run ho ni, jhan second
		//thulo run ho, teslai ta birsinai bhayena ni.. haha

		if(a==14 && ((b+c)==5))
			return true;
		else if(b==14 &&((a+c)==5))
			return true;
		else if(c==14 &&((a+b)==5))
			return true;

		else{
			var m,n,p;
			m=a>b?a-b:b-a;
		    n=b>c?b-c:c-b;
		    p=a>c?a-c:c-a;
		    if(((m==1&&n==1)||(m==1&&p==1)||(n==1&&p==1))&&(a!=b&&b!=c&&c!=a))
		        return true;
		    else
		        return false;
		}
	}	

	function isdoublerun(Card1,Card2,Card3){
		var a = Card1.cardType;
		var b = Card2.cardType;
		var c = Card3.cardType;

		if((isrun(Card1,Card2,Card3)==true)&&((a==b)&&(b==c)))
			return true;
		else
			return false;
	}

	function iscolor(Card1,Card2,Card3){
		var a = Card1.cardType;
		var b = Card2.cardType;
		var c = Card3.cardType;

		if((a==b)&&(b==c))
	        return true;
	    else
	        return false;
	}

	function isjoute(Card1,Card2,Card3){
		var a = Card1.cardValue;
		var b = Card2.cardValue;
		var c = Card3.cardValue;

		if(a==b||b==c||a==c)
	        return true;
	    else
	        return false;
	}
	function findCommonFromJoute(a,b,c){
		 if(a==b)
		 	return a;
		 else
		 	return c;
	}
	function findUnCommonFromJoute(a,b,c){
		if(a==b)
			return c;
		else if(b==c)
			return a;
		else
			return b;
	}
	function grtofthree(a,b,c){
		return (a>b? a:b)> c? (a>b?a:b):c;
	}

	function sec_grtthree(a,b,c){
		if(((b-a)>0&&(b-c)<0)||((b-a)<0&&(b-c)>0))
	        return b;
	    else if (((c-b)>0&&(c-a)<0)||((c-b)<0&&(c-a)>0))
	        return c;
	    else
	        return a;
	}

	function leastofthree(a,b,c){
		 return (a<b? a:b)< c? (a<b?a:b):c;
	}

	this.getMiniRank = function(card1,card2,card3){
		if(istrial(card1,card2,card3))
			return (600 + card1.cardValue/14*(100+10+1));
		
		else if(isdoublerun(card1,card2,card3)){
			var grt = grtofthree(card1.cardValue,card2.cardValue,card3.cardValue);
			var sec_grt = sec_grtthree(card1.cardValue,card2.cardValue,card3.cardValue);
			var least = leastofthree(card1.cardValue,card2.cardValue,card3.cardValue);

			return (500 + grt/14*100 + sec_grt/14*10 + least/14);
		}

		else if(isrun(card1,card2,card3)){
			var grt = grtofthree(card1.cardValue,card2.cardValue,card3.cardValue);
			var sec_grt = sec_grtthree(card1.cardValue,card2.cardValue,card3.cardValue);
			var least = leastofthree(card1.cardValue,card2.cardValue,card3.cardValue);

			return (400 + grt/14*100 + sec_grt/14*10 + least/14);
		}

		else if(iscolor(card1,card2,card3)){
			var grt = grtofthree(card1.cardValue,card2.cardValue,card3.cardValue);
			var sec_grt = sec_grtthree(card1.cardValue,card2.cardValue,card3.cardValue);
			var least = leastofthree(card1.cardValue,card2.cardValue,card3.cardValue);

			return (300 + grt/14*100 + sec_grt/14*10 + least/14);
		}

		else if(isjoute(card1,card2,card3)){
			var common = findCommonFromJoute(card1.cardValue,card2.cardValue,card3.cardValue);
			var uncommon = findUnCommonFromJoute(card1.cardValue,card2.cardValue,card3.cardValue);
			return (200 + common/14*100 + common/14*10 + uncommon/14);
		}

		else{
			var grt = grtofthree(card1.cardValue,card2.cardValue,card3.cardValue);
			var sec_grt = sec_grtthree(card1.cardValue,card2.cardValue,card3.cardValue);
			var least = leastofthree(card1.cardValue,card2.cardValue,card3.cardValue);

			return (100 + grt/14*100 + sec_grt/14*10 + least/14);
		}

	}
}