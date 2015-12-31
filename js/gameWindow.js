function GameWindow(divId,gmwidth,gmheight){
	//last edited 11:04pm so far
	
	this.mainWindowWidth=gmwidth; this.mainWindowHeight = gmheight;
	var currentGameWindow = document.getElementById(divId);
	var numberOfPlayers = 4;
	var numberOfCards = 9;
	var currentGame = new Game(numberOfPlayers,numberOfCards);
	// currentGame.init();
	

	var that=this;

	function initvars(){
		that.playerId  = [];
		for (var i = 0; i < numberOfPlayers; i++){
			that.playerId[i] = divId+'PlayerId'+i;
		}
		that.titlebarId = divId + 'Titlebar';
		that.titlebarHeight = 50;
		that.titlebarWidth = that.mainWindowWidth;
		
		that.gameBodyId = divId+'GameBody';
		that.gameBodyHeight = that.mainWindowHeight-that.titlebarHeight;
		that.gameBodyWidth = that.mainWindowWidth;

		that.sideBarId = divId+'Sidebar';
		that.sideBarWidth = 0.2*that.gameBodyWidth;
		that.sideBarHeight = that.gameBodyHeight;

		that.arenaId = divId + 'Arena';
		that.arenaWidth = that.gameBodyWidth-that.sideBarWidth;
		that.arenaHeight = that.gameBodyHeight;

		that.playerOneHeight = that.arenaHeight;
		that.playerOneWidth = 0.15*that.arenaWidth;
		that.playerOneTop = 0;that.playerOneLeft =0;

		that.playerTwoHeight = 0.22 * that.arenaHeight;
		that.playerTwoWidth = 0.7 * that.arenaWidth;
		that.playerTwoTop = 0; that.playerTwoLeft = 0.15*that.arenaWidth;

		that.playerThreeHeight = that.arenaHeight;
		that.playerThreeWidth = that.arenaWidth - that.playerOneWidth - that.playerTwoWidth;
		that.playerThreeTop = 0; that.playerThreeLeft = that.playerOneWidth+ that.playerTwoWidth;

		that.dealerId = divId + 'Dealer';
		that.dealerWidth = that.playerTwoWidth;
		that.dealerHeight = 0.56 * that.arenaHeight;
		that.dealerTop = that.playerTwoHeight; that.dealerLeft = that.playerOneWidth;

		that.playerFourHeight = that.arenaHeight - that.playerTwoHeight- that.dealerHeight;
		that.playerFourWidth = that.playerTwoWidth;
		that.playerFourTop  = that.dealerHeight + that.playerTwoHeight;
		that.playerFourLeft = that.playerOneWidth;

		that.horizontalCleary = 10;
		that.cardHeight = that.playerTwoHeight;
		that.cardWidth  = that.playerTwoWidth / 9;

		that.overlapVerticalCard = 40;

		that.clearx =  (that.playerOneWidth - that.cardWidth) / 2;
		that.cleary = (that.playerOneHeight - that.cardHeight - 8*that.overlapVerticalCard)/2;  

		that.dealerDeckLeft = that.dealerLeft + that.dealerWidth/2 - that.cardWidth/2;
		that.dealerDeckTop = that.dealerTop + that.dealerHeight/2 - that.cardHeight/2;
		that.distributeButtonFlag = true;
	}

	this.arrangeComputersCards  = function(){
		console.log('I am called right here');
	}

	this.init = function(){
		//console.log('I am created');
		initvars();
		currentGame.init();
		currentGameWindow.style.width = that.mainWindowWidth + 'px';
		currentGameWindow.style.height = that.mainWindowHeight + 'px';
		currentGameWindow.style.background = 'green';
		currentGameWindow.style.position = 'relative';
		currentGameWindow.appendChild(createTitleBar());
		currentGameWindow.appendChild(createGameBody());
		//displayDistribution();
		// that.animate();
	
	}
	function createTitleBar(){
		var titleBar = document.createElement('div');
		titleBar.setAttribute('id',that.titlebarId);
		titleBar.style.width = that.titlebarWidth + 'px';
		titleBar.style.height = that.titlebarHeight + 'px';
		titleBar.innerHTML = '<p style = "text-align: center; line-height: 50px;" >A game of KITTY</p>';
		return titleBar;
	}

	function createGameBody(){
		var gameWindow = document.createElement('div');
		gameWindow.setAttribute('id',that.gameBodyId);
		gameWindow.style.width = that.gameBodyWidth  + 'px';
		gameWindow.style.height = that.gameBodyHeight + 'px';
		gameWindow.style.background = 'yellow';
		gameWindow.appendChild(createSidebar());
		gameWindow.appendChild(createArena());
		return gameWindow;
	}

	function createSidebar(){
		var sidebar = document.createElement('div');
		sidebar.setAttribute('id',that.sideBarId);
		sidebar.style.width = that.sideBarWidth + 'px';
		sidebar.style.height = that.sideBarHeight + 'px';
		sidebar.style.background = 'gray';
		sidebar.style.float = 'left';
		sidebar.appendChild(createReplayButton());
		sidebar.appendChild(createDistributeButton());
		sidebar.appendChild(createUserArrangeButton());
		sidebar.appendChild(createPlayButton());
		sidebar.appendChild(createDealOneButton());
		sidebar.appendChild(createDealTwoButton());
		sidebar.appendChild(createDealThreeButton());
		return sidebar;



		function createPlayButton(){
			var playButtonDiv = document.createElement('div');
			var playButton = document.createElement('button');
			playButton.onclick = function(){
				 currentGame.players[numberOfPlayers-1].arrange(); 
				// for(var i=0;i<numberOfPlayers;i++){
					// currentGame.players[i].arrange();
				// }
				refreshCards();
			};
			playButton.innerHTML = 'What would Computer do';
			playButton.style.width = '100%';
			playButton.style.height = '50px';
			return playButton;
		}

		function createDistributeButton(){
			var distributeDiv = document.createElement('div');
			var distributeButton = document.createElement('button');
			distributeButton.onclick = function(){
				if(that.distributeButtonFlag==true){
					that.distributeButtonFlag = false;
					that.completed = false;
					displayDeal.playerCounter = 0;
					displayDeal.cardCounter = 0;
					if(!that.completed)
						that.dealId = setInterval(displayDeal,30);
				}
			};
			distributeButton.innerHTML = 'Distribute';
			distributeButton.style.width = '100%';
			distributeButton.style.height = '50px';
			return distributeButton;
		}
		/*function createDistributeButton(){
			var distributeButton = document.createElement('button');
			distributeButton.onclick = function(){
				displayDistributionKandel();
				// distributeButton.removeAttribute("onclick");
			};
			distributeButton.innerHTML = 'Distribute';
			distributeButton.style.width = '100%';
			distributeButton.style.height = '50px';
			return distributeButton;

		}*/
		function createReplayButton(){
			var playButtonDiv = document.createElement('div');
			var playButton = document.createElement('button');
			playButton.onclick = function(){
				// currentGame.init(); 
				// refreshCards();
				var el = document.getElementById(divId);
				while ( el.firstChild ) {
					el.removeChild( el.firstChild );
				}
				that.init();
			};
			playButton.innerHTML = 'New Game';
			playButton.style.width = '100%';
			playButton.style.height = '50px';
			return playButton;
		}

		function createDealOneButton(){
			// var dealOneDiv = document.createElement('div');
			var dealOneButton = document.createElement('button');
			dealOneButton.onclick = function(){
				clearDealArea();
				dealOneShowCards();
				setTimeout(function(){
					showRoundWinner(currentGame.roundOneWinner())},3000);
			}
			dealOneButton.innerHTML = 'Round One';
			dealOneButton.style.width = '100%';
			dealOneButton.style.height = '50px';
			return dealOneButton;
		}

		function createDealTwoButton(){
			// var dealTwoDiv = document.createElement('div');
			var dealTwoButton = document.createElement('button');
			dealTwoButton.onclick = function(){
				clearDealArea();
				dealTwoShowCards();
				setTimeout(function(){
					showRoundWinner(currentGame.roundTwoWinner())},3000);
			}
			dealTwoButton.innerHTML = 'Round Two';
			dealTwoButton.style.width = '100%';
			dealTwoButton.style.height = '50px';
			return dealTwoButton;
		}

		function createDealThreeButton(){
			// var dealThreeDiv = document.createElement('div');
			var dealThreeButton = document.createElement('button');
			dealThreeButton.onclick = function(){
				clearDealArea();
				dealThreeShowCards();
				setTimeout(function(){
					showRoundWinner(currentGame.roundThreeWinner())},3000);
				setTimeout(showOverallWinner,6000);
			}
			dealThreeButton.innerHTML = 'Round Three';
			dealThreeButton.style.width = '100%';
			dealThreeButton.style.height = '50px';
			return dealThreeButton;
		}

		function createUserArrangeButton(){
			var userArrangeButton = document.createElement('button');
			userArrangeButton.onclick = function(){
				showCardsToUser();
			}
			userArrangeButton.innerHTML = 'User Arrange';
			userArrangeButton.style.width = '100%';
			userArrangeButton.style.height = '50px';
			return userArrangeButton;
		}
		
	}

	
	function createArena(){
		var arena = document.createElement('div');
		arena.setAttribute('id',that.arenaId);
		arena.style.width = that.arenaWidth + 'px';
		arena.style.height = that.arenaHeight + 'px';
		arena.style.background = 'blue';
		arena.style.float = 'right';
		arena.style.position = 'relative';
		arena.appendChild(createPlayerOne());
		arena.appendChild(createDealer());
		arena.appendChild(createPlayerTwo());
		arena.appendChild(createPlayerThree());
		arena.appendChild(createPlayerFour());
		return arena;

	}

	function createPlayerOne(){
		var playerOneArea = document.createElement('div');
		playerOneArea.setAttribute('id',that.playerId[0]);
		playerOneArea.style.width = that.playerOneWidth + 'px';
		playerOneArea.style.height = that.playerOneHeight+ 'px';
		playerOneArea.style.left = that.playerOneLeft + 'px';
		playerOneArea.style.top = that.playerOneTop + 'px';
		playerOneArea.style.background = '#076707';
		playerOneArea.style.position = 'absolute';
		createVerticalCards(playerOneArea,numberOfCards);
		// that.createCardArea(PlayerOneArea,0,PlayerOneAreaId,0);
		return playerOneArea;
	}

	function createPlayerTwo(){
		var playerTwoArea = document.createElement('div');
		playerTwoArea.setAttribute('id',that.playerId[1]);
		playerTwoArea.style.width = that.playerTwoWidth+ 'px';
		playerTwoArea.style.height = that.playerTwoHeight+ 'px';
		playerTwoArea.style.left = that.playerTwoLeft + 'px';
		playerTwoArea.style.top = that.playerTwoTop + 'px';
		playerTwoArea.style.background = '#076707';
		playerTwoArea.style.position = 'absolute';
		createHorizontalCards(playerTwoArea,numberOfCards);
		// that.createCardArea(PlayerTwoArea,1,PlayerTwoAreaId,350);
		return playerTwoArea;
	}

	function createPlayerThree(){
		var playerThreeArea = document.createElement('div');
		playerThreeArea.setAttribute('id',that.playerId[2]);
		playerThreeArea.style.width = that.playerThreeWidth + 'px';
		playerThreeArea.style.height = that.playerThreeHeight + 'px';
		playerThreeArea.style.left = that.playerThreeLeft + 'px';
		playerThreeArea.style.top = that.playerThreeTop + 'px';
		playerThreeArea.style.background = '#076707';
		playerThreeArea.style.position = 'absolute';
		createVerticalCards(playerThreeArea,numberOfCards);
		return playerThreeArea;
	}

	function createPlayerFour(){
		var playerFourArea = document.createElement('div');
		playerFourArea.setAttribute('id',that.playerId[3]);
		playerFourArea.style.width = that.playerFourWidth + 'px';
		playerFourArea.style.height = that.playerFourHeight + 'px';
		playerFourArea.style.left = that.playerFourLeft + 'px';
		playerFourArea.style.top = that.playerFourTop + 'px';
		playerFourArea.style.background = '#076707';
		playerFourArea.style.position = 'absolute';
		createHorizontalCards(playerFourArea,numberOfCards);
		return playerFourArea;
	}

	function createDealer(){
		var dealerArea = document.createElement('div');
		dealerArea.setAttribute('id',that.dealerId);
		dealerArea.style.width = that.dealerWidth + 'px';
		dealerArea.style.height = that.dealerHeight + 'px';
		dealerArea.style.left = that.dealerLeft + 'px';
		dealerArea.style.top = that.dealerTop + 'px';
		dealerArea.style.background = '#076707';
		dealerArea.style.position = 'absolute';
		// createDeckArea(dealerArea);
		createPlayerOneDealArea(dealerArea);
		createPlayerTwoDealArea(dealerArea);
		createPlayerThreeDealArea(dealerArea);
		createPlayerFourDealArea(dealerArea);
		createWinnerDisplayArea(dealerArea);
		return dealerArea;
	}

	function createHorizontalCards(parent,n){
		for(var i = 0; i < n ;i++){
			var cardDiv =  document.createElement('div');
			cardDiv.setAttribute('id',parent.id+'CardArea'+i);
			var topPosition = parseInt(parent.style.top);
			cardDiv.style.top = that.horizontalCleary + 'px';
			// cardDiv.style.top = parent.style.top;
			cardDiv.style.left = i*that.cardWidth + 'px';
			cardDiv.style.height = (that.cardHeight - 2*that.horizontalCleary) + 'px';
			cardDiv.style.width = that.cardWidth + 'px';
			cardDiv.style.position = 'absolute';
			// cardDiv.style.background = '#074007';

			if(parent.id == that.playerId[3]){
				cardDiv.ondrop = function drop(ev){
					ev.preventDefault ();
					var src = document.getElementById (ev.dataTransfer.getData ("src"));
					// console.log(src);
					var srcParent = src.parentNode;
					var tgt = ev.currentTarget.firstElementChild;
					// console.log(tgt);

					ev.currentTarget.replaceChild (src, tgt);
					srcParent.appendChild (tgt);

					var index1 = parseInt((src.id).split('').reverse().join(''));
					var index2 = parseInt((tgt.id).split('').reverse().join(''));

					console.log(index1);
					console.log(index2);
					var temp = currentGame.players[3].cards[index1];
					currentGame.players[3].cards[index1] = currentGame.players[3].cards[index2];
					currentGame.players[3].cards[index2] = temp;

					var temp = src.id;
					src.id = tgt.id;
					tgt.id = temp;

					console.log(currentGame.players[3].cards);
					for(var i=0;i<9;i++){
						currentGame.players[3].cards[i].displayIt();
					}	
				}
				cardDiv.ondragover = function allowDrop(ev){
					ev.preventDefault();
				}

			}

			parent.appendChild(cardDiv);
		}

	}

	function createDealerHorizontalCards(parent,n){
		for(var i = 0; i < n ;i++){
			var cardDiv =  document.createElement('div');
			cardDiv.setAttribute('id',parent.id+'CardArea'+i);
			// var topPosition = parseInt(parent.style.top);
			// cardDiv.style.top = that.horizontalCleary + 'px';
			// cardDiv.style.top = parent.style.top;
			cardDiv.style.left = i*that.cardWidth + 'px';
			cardDiv.style.height = (that.cardHeight - 2*that.horizontalCleary) + 'px';
			cardDiv.style.width = that.cardWidth + 'px';
			cardDiv.style.position = 'absolute';
			// cardDiv.style.background = '#074007';
			parent.appendChild(cardDiv);
		}

	}

	function createRotatedCards(parent,n){
		for(var i=0;i<n;i++){
			var cardDiv =  document.createElement('div');
			cardDiv.setAttribute('id',parent.id+'CardArea'+i);
			var topPosition = parseInt(parent.style.top);
			cardDiv.style.top = i*that.cardWidth + 'px';
			// cardDiv.style.top = parent.style.top;
			// cardDiv.style.left = i*that.cardWidth + 'px';
			cardDiv.style.height = that.cardWidth + 'px';
			cardDiv.style.width = (that.cardHeight - 2*that.horizontalCleary) + 'px';
			cardDiv.style.position = 'absolute';
			// cardDiv.style.background = '#074007';
			parent.appendChild(cardDiv);	
		}
	}

	function createVerticalCards(parent,n){
		var overlapFactor = 0;
		for(var i = 0; i < n; i++){
			var cardDiv = document.createElement('div');
			cardDiv.setAttribute('id',parent.id+'CardArea'+i);
			cardDiv.style.top = (that.cleary + i * that.overlapVerticalCard) + 'px';
			cardDiv.style.left = that.clearx + 'px';
			// cardDiv.style.height = that.cardHeight  + 'px';
			cardDiv.style.height = (that.cardHeight - 2*that.horizontalCleary) + 'px';
			cardDiv.style.width = that.cardWidth + 'px';
			cardDiv.style.position = 'absolute';
			// cardDiv.style.background = '#074007';
			parent.appendChild(cardDiv);
		}
	}

	function createDeckArea(parent){
		var deckArea = document.createElement('div');
		deckArea.setAttribute('id',parent.id+'DeckArea');
		deckArea.style.top = ((parseInt(parent.style.height) - that.cardHeight)/2 )+'px';
		deckArea.style.left = ((parseInt(parent.style.width) - that.cardWidth) / 2 ) + 'px';
		deckArea.style.height = that.cardHeight + 'px';
		deckArea.style.width = that.cardWidth + 'px';
		deckArea.style.position = 'absolute';

		var currentImage = document.createElement('img');
		currentImage.src = './images/allcards/Back/RedBack.png';
		currentImage.style.width = '100%'; currentImage.style.height = '100%';
		deckArea.appendChild(currentImage);
		parent.appendChild(deckArea);
		// return deckArea;
	}

	function createPlayerOneDealArea(parent){
		var playerOneDealArea = document.createElement('div');
		playerOneDealArea.setAttribute('id',that.playerId[0]+'DealArea');
		playerOneDealArea.style.width = that.cardHeight-2*that.horizontalCleary+'px';
		playerOneDealArea.style.height = 3*that.cardWidth+'px';
		playerOneDealArea.style.left = 50 + 'px';
		playerOneDealArea.style.top = that.cardHeight/2 - 10 + 'px';
		// playerOneDealArea.style.background = 'blue';
		playerOneDealArea.style.position = 'absolute';
		createRotatedCards(playerOneDealArea,3);
		parent.appendChild(playerOneDealArea);
	}

	function createPlayerTwoDealArea(parent){
		var playerTwoDealArea = document.createElement('div');
		playerTwoDealArea.setAttribute('id',that.playerId[1]+'DealArea');
		playerTwoDealArea.style.top = '10px';
		playerTwoDealArea.style.left = 3*that.cardWidth + 'px';
		playerTwoDealArea.style.width = 3*that.cardWidth+'px';
		playerTwoDealArea.style.height = that.cardHeight-2*that.horizontalCleary+'px';
		playerTwoDealArea.style.position = 'absolute';
		// playerTwoDealArea.style.background = 'blue';
		createDealerHorizontalCards(playerTwoDealArea,3);
		parent.appendChild(playerTwoDealArea);
	}

	function createPlayerThreeDealArea(parent){
		var playerThreeDealArea = document.createElement('div');
		playerThreeDealArea.setAttribute('id',that.playerId[2]+'DealArea');
		playerThreeDealArea.style.width = that.cardHeight-2*that.horizontalCleary+'px';
		playerThreeDealArea.style.height = 3*that.cardWidth+'px';
		playerThreeDealArea.style.right = 30 + 'px';
		playerThreeDealArea.style.top = that.cardHeight/2 - 10 + 'px';
		// playerThreeDealArea.style.background = 'blue';
		playerThreeDealArea.style.position = 'absolute';
		createRotatedCards(playerThreeDealArea,3);
		parent.appendChild(playerThreeDealArea);
	}

	function createPlayerFourDealArea(parent){
		var playerFourDealArea = document.createElement('div');
		playerFourDealArea.setAttribute('id',that.playerId[3]+'DealArea');
		playerFourDealArea.style.bottom = '10px';
		playerFourDealArea.style.left = 3*that.cardWidth + 'px';
		playerFourDealArea.style.width = 3*that.cardWidth+'px';
		playerFourDealArea.style.height = that.cardHeight-2*that.horizontalCleary+'px';
		playerFourDealArea.style.position = 'absolute';
		// playerFourDealArea.style.background = 'blue';
		createDealerHorizontalCards(playerFourDealArea,3);
		parent.appendChild(playerFourDealArea);
	}

	function createWinnerDisplayArea(parent){
		var winnerDisplayArea = document.createElement('div');
		winnerDisplayArea.setAttribute('id','WinnerDisplayArea');
		winnerDisplayArea.style.top = that.cardHeight-2*that.horizontalCleary-8+'px';
		winnerDisplayArea.style.left = 2.5*that.cardWidth+'px';
		winnerDisplayArea.style.width = 4*that.cardWidth+'px';
		winnerDisplayArea.style.height = that.cardHeight+'px';
		winnerDisplayArea.style.position = 'absolute';
		// winnerDisplayArea.style.background = 'blue';
		parent.appendChild(winnerDisplayArea);
	}

	function displayDeal(){
		var currentImage = currentGame.players[displayDeal.playerCounter].cards[displayDeal.cardCounter].cardBack;
		currentImage.style.height = '100%';
		currentImage.style.width = '100%';
		
		var currentCardHolderDivId = that.playerId[displayDeal.playerCounter]+'CardArea'+displayDeal.cardCounter;
		var currentCardHolderDiv = document.getElementById(currentCardHolderDivId);
		currentCardHolderDiv.appendChild(currentImage);		

		/** Update cards counter*/
		displayDeal.playerCounter++
		if(displayDeal.playerCounter >= numberOfPlayers)
		{
			displayDeal.playerCounter = 0;
			displayDeal.cardCounter++;
		}

		if(displayDeal.cardCounter >= numberOfCards){
			//console.log('distribution completed ');
			clearInterval(that.dealId);
			that.completed = true;
		}
	}
	function testAnimate(){
		that.completed = false;
		displayDeal.playerCounter = 0;
		displayDeal.cardCounter = 0;
		if(!that.completed){
			that.dealId = setInterval(displayDeal,500);
		}
	}


	function refreshCards(){
		var playerNumber=numberOfPlayers-1;
		for(var i = 0; i < numberOfCards; i++){
			//for(var j = 0; j < numberOfPlayers; j++){
				var currentCardHolderDivId = that.playerId[playerNumber]+'CardArea'+i;
				var currentCardHolderDiv = document.getElementById(currentCardHolderDivId);
				var currentImage = currentGame.players[playerNumber].cards[i].cardFront;
				var displayedImage = currentCardHolderDiv.childNodes[0];				
				displayedImage.src = currentImage.src;
			//}
		}
	}

	function dealOneShowCards(){

		// for(var i = 0; i < numberOfCards; i++){
		// 	var imageDisplayed = document.getElementById(that.playerId[3]+'CardArea'+i+'drag'+i);
		// 	imageDisplayed.setAttribute('draggable','false');
		// }

		for(var i=0;i<numberOfCards;i++){
			var imageDisplayed = document.getElementById(that.playerId[numberOfPlayers-1]+'CardArea'+i+'drag'+i);
			imageDisplayed.setAttribute('draggable','false');
			for(var j=0;j<numberOfPlayers;j++){
				var currentCardHolderDivId = that.playerId[j]+'CardArea'+i;
				var currentCardDisplayDivId = that.playerId[j]+'DealAreaCardArea'+i%3;
				var currentCardHolderDiv = document.getElementById(currentCardHolderDivId);
				var currentCardDisplayDiv = document.getElementById(currentCardDisplayDivId);
				
				if(i<3){
					var currentImage = currentGame.players[j].cards[i].cardFront;
					var alreadyDisplayedImage = currentCardHolderDiv.childNodes[0];
					alreadyDisplayedImage.style.display = 'none';				
					var displayedImage = document.createElement('img');
					currentCardDisplayDiv.appendChild(displayedImage);
					displayedImage.src = currentImage.src;			

					if(j==0){
						displayedImage.style.height = parseInt(currentCardDisplayDiv.width)-(2*that.horizontalCleary)+'px';
						displayedImage.style.width = '74%';
						displayedImage.style.transform = 'rotate(90deg)';
					}
					else if(j==2){
						displayedImage.style.height = parseInt(currentCardDisplayDiv.width)-(2*that.horizontalCleary)+'px';
						displayedImage.style.width = '74%';
						displayedImage.style.transform = 'rotate(270deg)';
					}
					else{
						displayedImage.style.height = '100%';
						displayedImage.style.width = '100%';
					}
					
				}
				else{
					if(j!=numberOfPlayers-1){
						var currentImage = currentGame.players[j].cards[i].cardBack;
						var displayedImage = currentCardHolderDiv.childNodes[0];				
						displayedImage.src = currentImage.src;
					}
				}

				
			}
		}
	}

	function dealTwoShowCards(){
		for(var i=0;i<numberOfCards;i++){
			for(var j=0;j<numberOfPlayers;j++){
				var currentCardHolderDivId = that.playerId[j]+'CardArea'+i;
				var currentCardDisplayDivId = that.playerId[j]+'DealAreaCardArea'+i%3;
				var currentCardHolderDiv = document.getElementById(currentCardHolderDivId);
				var currentCardDisplayDiv = document.getElementById(currentCardDisplayDivId);
				// currentCardDisplayDiv.removeChild(currentCardDisplayDiv.childNodes[0]);
				if(i>=3&&i<6){
					var currentImage = currentGame.players[j].cards[i].cardFront;
					var alreadyDisplayedImage = currentCardHolderDiv.childNodes[0];
					alreadyDisplayedImage.style.display = 'none';				
					var displayedImage = document.createElement('img');
					currentCardDisplayDiv.appendChild(displayedImage);
					displayedImage.src = currentImage.src;
					if(j==0){
						displayedImage.style.height = parseInt(currentCardDisplayDiv.width)-(2*that.horizontalCleary)+'px';
						displayedImage.style.width = '74%';
						displayedImage.style.transform = 'rotate(90deg)';
					}
					else if(j==2){
						displayedImage.style.height = parseInt(currentCardDisplayDiv.width)-(2*that.horizontalCleary)+'px';
						displayedImage.style.width = '74%';
						displayedImage.style.transform = 'rotate(270deg)';
					}
					else{
						displayedImage.style.height = '100%';
						displayedImage.style.width = '100%';
					}
				}
				else{
					if(j!=numberOfPlayers-1){
						var currentImage = currentGame.players[j].cards[i].cardBack;
						var displayedImage = currentCardHolderDiv.childNodes[0];				
						displayedImage.src = currentImage.src;
					}
					// displayedImage.style.display = 'none';

				}
					
			}
		}
	}

	function dealThreeShowCards(){
		for(var i=0;i<numberOfCards;i++){
			for(var j=0;j<numberOfPlayers;j++){
				var currentCardHolderDivId = that.playerId[j]+'CardArea'+i;
				var currentCardDisplayDivId = that.playerId[j]+'DealAreaCardArea'+i%3;
				var currentCardHolderDiv = document.getElementById(currentCardHolderDivId);
				var currentCardDisplayDiv = document.getElementById(currentCardDisplayDivId);
				if(i>=6){
					var currentImage = currentGame.players[j].cards[i].cardFront;
					var alreadyDisplayedImage = currentCardHolderDiv.childNodes[0];
					alreadyDisplayedImage.style.display = 'none';				
					var displayedImage = document.createElement('img');
					currentCardDisplayDiv.appendChild(displayedImage);
					displayedImage.src = currentImage.src;
					if(j==0){
						displayedImage.style.height = parseInt(currentCardDisplayDiv.width)-(2*that.horizontalCleary)+'px';
						displayedImage.style.width = '74%';
						displayedImage.style.transform = 'rotate(90deg)';
					}
					else if(j==2){
						displayedImage.style.height = parseInt(currentCardDisplayDiv.width)-(2*that.horizontalCleary)+'px';
						displayedImage.style.width = '74%';
						displayedImage.style.transform = 'rotate(270deg)';
					}
					else{
						displayedImage.style.height = '100%';
						displayedImage.style.width = '100%';
					}
				}
				else{
					if(j!=numberOfPlayers-1){
						var currentImage = currentGame.players[j].cards[i].cardBack;
						var displayedImage = currentCardHolderDiv.childNodes[0];				
						displayedImage.src = currentImage.src;
					}
				}
					
			}
		}
	}

	function clearDealArea(){
		var numberOfRounds = 3;
		for(var i=0;i<numberOfRounds;i++){
			for(var j=0;j<numberOfPlayers;j++){
				var currentCardDisplayDivId = that.playerId[j]+'DealAreaCardArea'+i;
				var currentCardDisplayDiv = document.getElementById(currentCardDisplayDivId);
				var elements = currentCardDisplayDiv.getElementsByTagName('img');
				for (var k = 0; k < elements.length; k++) {
		    		elements[k].style.display = 'none';
				}
			}
		}
		var winnerDisplayArea = document.getElementById('WinnerDisplayArea');
		var elements = winnerDisplayArea.getElementsByTagName('img');
		for (var k=0;k<elements.length;k++){
			elements[k].style.display = 'none';
		}
	}

	function showCardsToUser(){
		var j=numberOfPlayers-1;
		for(var i = 0; i < numberOfCards; i++){
			var currentCardHolderDivId = that.playerId[j]+'CardArea'+i;
			var currentCardHolderDiv = document.getElementById(currentCardHolderDivId);
			var currentImage = currentGame.players[j].cards[i].cardFront;
			var displayedImage = currentCardHolderDiv.childNodes[0];				
			displayedImage.src = currentImage.src;
			displayedImage.setAttribute('id',currentCardHolderDivId+'drag'+i);
			displayedImage.setAttribute('draggable','true');
			displayedImage.ondragstart = function drag(ev){
				ev.dataTransfer.setData('src',ev.target.id);
			}
		}
	}

	function showRoundWinner(winner){
		var winnerDisplayArea = document.getElementById('WinnerDisplayArea');
		var picture = document.createElement('img');
		if(winner<0)
			picture.src = "images/winners/roundWinner5.png";
		else
			picture.src = "images/winners/roundWinner"+winner+".png";
		picture.style.width = '100%';
		winnerDisplayArea.appendChild(picture);
	}

	function showOverallWinner(){
		var winnerDisplayArea = document.getElementById('WinnerDisplayArea');
		var elements = winnerDisplayArea.getElementsByTagName('img');
		for (var k=0;k<elements.length;k++){
			elements[k].style.display = 'none';
		}
		var picture = document.createElement('img');
		var winner;
		if(currentGame.roundTwoWinner()<0)
			winner=5;
		else{
			if(currentGame.roundOneWinner()==currentGame.roundTwoWinner()){
				winner=currentGame.roundTwoWinner();
				console.log("From here, from if, one = two");
			}
			else if(currentGame.roundTwoWinner()==currentGame.roundThreeWinner()){
				winner = currentGame.roundTwoWinner();
				console.log("From here, from else if, two=three");
			}
			else{
				winner=5;
				console.log("from else");
			}
		}
		picture.src = "images/winners/winner"+winner+".png";
		picture.style.width = '100%';
		winnerDisplayArea.appendChild(picture);	
	}

	function displayDistributionKandel(){
			var numberOfPlayers = currentGame.players.length;
			var numberOfCards = currentGame.players[0].cards.length;
			console.log('Number of players are  ',numberOfPlayers);
			// for(var i = 0; i < numberOfCards; i++){
			// 	for(var j = 0; j < numberOfPlayers; j++){
			// 		var currentImage = currentGame.players[j].cards[i].cardBack;
			// 		currentImage.style.height = '100%';
			// 		currentImage.style.width = '100%';
			// 		var currentCardHolderDivId = that.playerId[j]+'CardArea'+i;
			// 		//console.log(' Id is ',currentCardHolderDivId);
			// 		var currentCardHolderDiv = document.getElementById(currentCardHolderDivId);

			// 		currentCardHolderDiv.appendChild(currentImage);

			// 	}
			// }
			var i=0;j=0;
			var animateCards = function(){
				var currentImage = currentGame.players[j].cards[i].cardBack;
				currentImage.style.height = '100%';
				currentImage.style.width = '100%';
				var currentCardHolderDivId = that.playerId[j]+'CardArea'+i;
				var currentCardHolderDiv = document.getElementById(currentCardHolderDivId);
				currentCardHolderDiv.appendChild(currentImage);
				j++;
				if(j==numberOfPlayers){
					i++;j=0;
				}
				if(i*j == (numberOfPlayers-1)*(numberOfCards-1)){
					clearInterval(animateCards);
				}
			}
			setInterval(animateCards,30);
		} 
}