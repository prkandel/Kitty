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
	function random_number(min,max) {
    	return (Math.round((max-min) * Math.random() + min));
	}

	function create_array_of_random_number(min,max) {
	    var temp, nums = new Array;
	    for (var i=0; i<52; i++) {
	        while((temp=number_found(random_number(min,max),nums))==-1);
	        nums[i] = temp;
	    }
	    return (nums);
	}

	function number_found (random_number,number_array) {
	    for (var element=0; element<number_array.length; element++) {
	        if (random_number==number_array[element]) {
	            return (-1);
			}
		}

	    return (random_number);
	}
}

