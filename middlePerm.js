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
    var rotate = function(sequence){
      sequence = sequence.split('');
      sequence.push(sequence.shift());
      return sequence.join('');
    }
    var currentRotation = rotate(s);

    do {
      outcomes.push(currentRotation);
      outcomes.push(currentRotation.split('').reverse().join(''));
      currentRotation = rotate(currentRotation)
    } while(currentRotation != s)

  return outcomes;
  }


  return randomizations[(randomizations.length/2)-1]

}
