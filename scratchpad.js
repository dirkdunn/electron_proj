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
  this.hand.split(/\s/).forEach(function(card){
    if(card.length === 3){
      cardSum += card[2]
    } else {
      cardSum += card[1];
    }

  })

  //console.log(/^(.)\1+$/.test(cardSum))
  return /^(.)\1+$/.test(cardSum);

}

PokerHand.prototype.hasStraight = function(){
  var isStraight = true;
  var numericalHand = this.getNumericalHand(this.hand)

  for(var i = 0;i<numericalHand.length-1;i++){
    if((numericalHand[i+1] - numericalHand[i]) !== 1){
      isStraight = false;
    }
  }

  //console.log(isStraight)
  return isStraight;
}

PokerHand.prototype.hasRoyalFlush = function(hand){
  var hasAce = this.hand.indexOf('A') != -1;
  var hasKing = this.hand.indexOf('K') != -1;
  var hasQueen = this.hand.indexOf('Q') != -1;
  var hasJack = this.hand.indexOf('J') != -1;
  var hasTen = this.hand.indexOf('10') != -1;
  //  && this.hasFlush(hand)
  if(hasAce && hasKing && hasQueen && hasJack && hasTen){
    return true;
  } else {
    return false;
  }

}

PokerHand.prototype.hasStraightFlush = function(hand){
  return this.hasStraight(this.hand) && this.hasFlush(this.hand);
}

PokerHand.prototype.hasFourOfAKind = function(hand){
  var numericalHand = this.getNumericalHand(this.hand).join(' ') + ' ';
  // console.log('num hand: ', numericalHand)
  return /(\d|\w+\s?)\1{3}/.test(numericalHand);
}

PokerHand.prototype.hasFullHouse = function(){
  var numericalHand = this.getNumericalHand(this.hand).join(' ') + ' ';
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

PokerHand.prototype.hasThreeOfAKind = function(){
  var numericalHand = this.getNumericalHand(this.hand).join(' ') + ' ';
  // console.log('num hand: ', numericalHand)
  return /(\d|\w+\s?)\1{2}/.test(numericalHand);
}

PokerHand.prototype.hasTwoPairs = function(hand){
  var numericalHand = this.getNumericalHand(this.hand).join(' ') + ' ';
  var twoPair = numericalHand.match(/(\d+\s?)\1{1}/g).length == 2;

  return twoPair;
}

PokerHand.prototype.hasPair = function(hand){
  var numericalHand = this.getNumericalHand(this.hand).join(' ') + ' ';
  var pair = numericalHand.match(/(\d+\s?)\1{1}/g).length == 1;

  return pair;
}

PokerHand.prototype.compareWith = function(hand){
    return Result.tie;
}

var test = new PokerHand("10H JH QH KH AH")
// test.hasStraight()
// test.hasStraightFlush();
var test2 = new PokerHand("10H 9H 10H 10H AH")
console.log('TOAK: ',test2.hasThreeOfAKind())
console.log('FOAK: ', test2.hasFourOfAKind())
console.log('FH', test2.hasFullHouse())
console.log('TP: ',test2.hasTwoPairs())
console.log('P: ', test2.hasPair())
