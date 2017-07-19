var Result = { "win": 1, "loss": 2, "tie": 3 }
var cardValues = {
  2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,
  10:10,J:11,Q:12,K:13,A:14
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
  else if(this.hasStraightFlush(hand)){return 7;}
  else if(this.hasFourOfAKind(hand)){return 6;}
  else if(this.hasFullHouse(hand)){return 5;}
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

PokerHand.prototype.hasFlush = function(hand){
  var cardSum = "";
  this.hand.split(/\s/).forEach(function(card){
    if(card.length === 3){
      cardSum += card[2]
    } else {
      cardSum += card[1];
    }

  })

  // console.log(/^(.)\1+$/.test(cardSum))
  return /^(.)\1+$/.test(cardSum);

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

PokerHand.prototype.hasStraight = function(){
  var isStraight = true;
  var numericalHand = this.getNumericalHand(this.hand)

  for(var i = 0;i<numericalHand.length-1;i++){
    if((numericalHand[i+1] - numericalHand[i]) !== 1){
      isStraight = false;
    }
  }

  console.log(isStraight)
  return isStraight;
}

// Has functions return bool.
PokerHand.prototype.hasRoyalFlush = function(hand){
  var hasAce = this.hand.indexOf('A') != -1;
  var hasKing = this.hand.indexOf('K') != -1;
  var hasQueen = this.hand.indexOf('Q') != -1;
  var hasJack = this.hand.indexOf('J') != -1;
  var hasTen = this.hand.indexOf('10') != -1;

  if(hasAce && hasKing && hasQueen && hasJack && hasTen && this.hasFlush(hand)){
    return true;
  } else {
    return false;
  }

}

PokerHand.prototype.hasStraightFlush = function(hand){
  return this.hasStraight(this.hand) && this.hasFlush(this.hand);
}

PokerHand.prototype.hasFourOfAKind = function(hand){
  var numericalHand = this.getNumericalHand(hand).join('');
  return /(.)\1{3}/.test(numericalHand);
}

PokerHand.prototype.hasFullHouse = function(hand){
  var numericalHand = this.getNumericalHand(hand).join('');
  var hasThreeOfAKind = /(.)\1{2}/.test(numericalHand);

  if(hasThreeOfAKind){
    var otherTwoCards = numericalHand.replace(/(.)\1{2}/,'');
    if()
  } else{
    return false;
  }
}

PokerHand.prototype.hasThreeOfAKind = function(hand){
  var numericalHand = this.getNumericalHand(hand).join('');
  return /(.)\1{2}/.test(numericalHand);
}

PokerHand.prototype.hasTwoPairs = function(hand){}

PokerHand.prototype.hasPair = function(hand){}

PokerHand.prototype.compareWith = function(hand){
    return Result.tie;
}

var test = new PokerHand("10H JH QH KH AH")
// test.hasFlush()
test.hasStraight()
test.hasStraightFlush()
