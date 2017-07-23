console.log(middlePermutation(process.argv[2]))

function middlePermutation(s) {
  //coding and coding..
  var randomizations = getRandomizations(s,getFactorial(s));
  console.log(randomizations);
  function getFactorial(s){
    var sLength = s.length;
    var factorial = 1;
    while (sLength > 0){
      factorial*=sLength;
      sLength--;
    }
    return factorial;
  }

  function getRandomizations(s, nOutcomes){
    var outcomes = [s];
    console.log(nOutcomes)

    // while(outcomes.length < nOutcomes){
    for(var o=0;o<1000;o++){
      var blenderArray = [];
      var toBeSpliced = s.split('');
      for(var i=0;i<toBeSpliced.length;i++){
        var incisionPoint = Math.floor(Math.random() * toBeSpliced.length);
        blenderArray = blenderArray.concat(toBeSpliced.splice(incisionPoint,1));
      }
      blenderArray = blenderArray.concat(toBeSpliced);
      var randomVariation = blenderArray.join('');

      if(outcomes.indexOf(randomVariation) == -1){
        outcomes.push(randomVariation)
      }
      // console.log(outcomes);
    }
  //  }

  return outcomes.sort();
  }


  return randomizations[(randomizations.length/2)-1]

}
