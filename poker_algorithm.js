var Result = { "win": 1, "loss": 2, "tie": 3 }
var cardValues = {
  2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,
  10:10,T:10,J:11,Q:12,K:13,A:14
}

var handValues = {
  pair: 1,
  twoPair: 2,
  threeOfAKind: 3,
  straight: 4,
  flush: 5,
  fullHouse: 6,
  fourOfAKind: 7,
  straightFlush: 8,
  royalFlush:9
}


function PokerHand(hand) {
  this.hand = hand;
  this.handValue = this.findHand(hand);
}

PokerHand.prototype.findHand = function(hand){
  if(this.hasRoyalFlush(hand)){return 9;}
  else if(this.hasStraightFlush(hand)){return 8;}
  else if(this.hasFourOfAKind(hand)){return 7;}
  else if(this.hasFullHouse(hand)){return 6;}
  else if(this.hasFlush(hand)){return 5;}
  else if(this.hasStraight(hand)){return 4;}
  else if(this.hasThreeOfAKind(hand)){return 3;}
  else if(this.hasTwoPairs(hand)){return 2;}
  else if(this.hasPair(hand)){return 1;}
  else{
    // High Card
    return 0;
  }
}

PokerHand.prototype.getNumericalHand = function(hand){
  return hand.split(/\s/).map(function(card){
    if(card.length === 3){
      return cardValues[card[0]+card[1]]
    } else {
      return cardValues[card[0]]
    }
  }).sort();
}

// Has functions return bool.
PokerHand.prototype.hasFlush = function(hand){
  var cardSum = "";
  hand = hand || this.hand;

  hand.split(/\s/).forEach(function(card){
    if(card.length === 3){
      cardSum += card[2]
    } else {
      cardSum += card[1];
    }

  })

  //console.log(/^(.)\1+$/.test(cardSum))
  return /^(.)\1+$/.test(cardSum);

}

PokerHand.prototype.hasStraight = function(hand){
  var isStraight = true;
  hand = hand || this.hand;
  var numericalHand = this.getNumericalHand(hand)

  for(var i = 0;i<numericalHand.length-1;i++){
    if((numericalHand[i+1] - numericalHand[i]) !== 1){
      isStraight = false;
    }
  }

  //console.log(isStraight)
  return isStraight;
}

PokerHand.prototype.hasRoyalFlush = function(hand){
  hand = hand || this.hand;
  var hasAce = hand.indexOf('A') != -1;
  var hasKing = hand.indexOf('K') != -1;
  var hasQueen = hand.indexOf('Q') != -1;
  var hasJack = hand.indexOf('J') != -1;
  var hasTen = hand.indexOf('10') != -1;
  var royalFlush = false;
  // console.log(hasAce,hasKing,hasQueen,hasJack,hasTen,this.hasFlush(hand))
  if(hasAce && hasKing && hasQueen && hasJack && hasTen && this.hasFlush(hand)){
    royalFlush = true;
  }

  return royalFlush;

}

PokerHand.prototype.hasStraightFlush = function(hand){
  hand = hand || this.hand;
  return this.hasStraight(hand) && this.hasFlush(hand);
}

PokerHand.prototype.hasFourOfAKind = function(hand){
  hand = hand || this.hand;
  var numericalHand = this.getNumericalHand(hand).join(' ') + ' ';
  // console.log('num hand: ', numericalHand)
  return /(\d|\w+\s?)\1{3}/.test(numericalHand);
}

PokerHand.prototype.hasFullHouse = function(hand){
  hand = hand || this.hand;
  var numericalHand = this.getNumericalHand(hand).join(' ') + ' ';
  var hasThreeOfAKind = /(\d|\w+\s?)\1{2}/.test(numericalHand);
  var fullHouse = false;

  if(hasThreeOfAKind){
    var otherTwoCards = numericalHand.replace(/(\d|\w+\s?)\1{2}/,'') + ' ';
    var hasPair = /(\d|\w+\s?)\1{1}/.test(otherTwoCards);
    // console.log('otherTwoCards: ',otherTwoCards, 'hasPair: ',hasPair)
    if(hasPair){
      fullHouse = true;
    }
  }

  return fullHouse;
}

PokerHand.prototype.hasThreeOfAKind = function(hand){
  hand = hand || this.hand;
  var numericalHand = this.getNumericalHand(hand).join(' ') + ' ';
  // console.log('num hand: ', numericalHand)
  return /(\d|\w+\s?)\1{2}/.test(numericalHand);
}

PokerHand.prototype.hasTwoPairs = function(hand){
  hand = hand || this.hand;
  var numericalHand = this.getNumericalHand(hand).join(' ') + ' ';
  var numberOfPairs = numericalHand.match(/(\d+\s?)\1{1}/g) || [];
  var twoPair = numberOfPairs.length == 2;


  return twoPair;
}

PokerHand.prototype.hasPair = function(hand){
  hand = hand || this.hand;
  var numericalHand = this.getNumericalHand(hand).join(' ') + ' ';
  var numberOfPairs = numericalHand.match(/(\d+\s?)\1{1}/g) || [];
  var pair = numberOfPairs.length == 1;

  return pair;
}

PokerHand.prototype.tieBreaker = function(yourHand,opponentHand){
  // var playerHighCard = Math.max.apply(this,this.getNumericalHand(yourHand));
  // var opponentHighCard = Math.max.apply(this,this.getNumericalHand(opponentHand));
  var playerHighCard = this.getNumericalHand(yourHand).reduce(function(p,c){ return p+c; });
  var opponentHighCard = this.getNumericalHand(opponentHand).reduce(function(p,c){ return p+c; });

  console.log('tiebreaker: ',playerHighCard,opponentHighCard)
  if(playerHighCard > opponentHighCard){
    return Result.win;
  }
  else if(playerHighCard < opponentHighCard){
    return Result.loss;
  }
  else if(playerHighCard === opponentHighCard){
    return Result.tie;
  }
  else{
    console.error("An error occurred in tieBreaker.");
  }
}

PokerHand.prototype.compareWith = function(opponent){
  // console.log(opponent.hand)
    var opponentHandValue = this.findHand(opponent.hand);
    // console.log('Your Hand: ', this.handValue, "Opponent Hand: ", opponentHandValue)

    if(this.handValue > opponentHandValue){
      return Result.win;
    } else if(this.handValue < opponentHandValue){
      return Result.loss;
    } else if (this.handValue === opponentHandValue){
      return this.tieBreaker(this.hand,opponent.hand);
    }
}

// Pair 2
// var test2 = new PokerHand("6S AD 7H 4S AS")
// var opponentHand = new PokerHand("AH AC 5H 6H 7S")

// Pair Nothing
var test2 = new PokerHand("2S AH 4H 5S KC")
var opponentHand = new PokerHand("AH AC 5H 6H 7S")
console.log(test2.compareWith(opponentHand))

// console.log('TOAK: ',test2.hasThreeOfAKind())
// console.log('FOAK: ', test2.hasFourOfAKind())
// console.log('FH', test2.hasFullHouse())
// console.log('TP: ',test2.hasTwoPairs())
// console.log('P: ', test2.hasPair())
