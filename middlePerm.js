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
    var outcomes = [s,s.split('').reverse().join('')];
    var rotate = function(sequence,i){
      sequence = sequence.split('');
      sequence.push(sequence.splice(i,i+1)[0]);
      return sequence.join('');
    }
    var index = 0;
    var currentRotation = rotate(s,index);

    do {
      var reverseRotation = currentRotation.split('').reverse().join('');
      if(outcomes.indexOf(currentRotation) == -1){
        outcomes.push(currentRotation);
      }
      if(outcomes.indexOf(reverseRotation) == -1){
        outcomes.push(reverseRotation);
      }

      // Rotate the rest of the sequence
      var innerRotation = currentRotation;
      for(var i=index;i<s.length;i++){
        innerRotation = rotate(innerRotation,i);
        var reverseInnerRotation = innerRotation.split('').reverse().join('');
        if(innerRotation.length === s.length && (outcomes.indexOf(innerRotation) == -1)){
          outcomes.push(innerRotation);
          if(outcomes.indexOf(reverseInnerRotation) == -1){
            outcomes.push(reverseInnerRotation);
          }
        }
      }

      currentRotation = rotate(currentRotation,index)
    } while(currentRotation != s)

  return outcomes.sort();
  }


  return randomizations[(randomizations.length/2)-1]

}
