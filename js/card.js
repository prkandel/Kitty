function Card(random_number){
	this.cardNumber = random_number;
	this.cardValue;
	this.cardType;
	var that = this;

	var temp = random_number%13;
	if(temp==0)
		that.cardValue = 13; //adjusting value for king
	else if(temp==1)
		that.cardValue = 14; //adjusting value for ace
	else
		that.cardValue = temp;

	if(random_number<=13)
		that.cardType = '\u2660'; //spade
	else if(random_number>13&&random_number<=26)
		that.cardType = '\u2663';	//club
	else if(random_number>26&&random_number<=39)
		that.cardType = '\u2665';	//heart
	else
		that.cardType = '\u2666'; //diamond

	var front = 'images/allcards/Ascending/C'+this.cardNumber.toString() + '.png' ; 
	var back = 'images/allcards/Back/BlueBack.png';
	this.cardFront = document.createElement('img');
	this.cardFront.src = front;
	this.cardBack = document.createElement('img');
	this.cardBack.src = back;

	// console.log(cardValue,cardType);
	// console.log("card-type = ", cardType);

	this.displayIt = function(){
		console.log(that.cardValue,that.cardType);
	}
}