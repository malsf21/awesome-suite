function checkPrime(num){
  if (num == 2 || num == 3){
    return true;
  }
  else if (num % 2 == 0 || num % 3 == 0) {
    return false;
  }
  else {
    for (i = 5; i*i <= num; i += 6){
      if (num % i == 0 || num % (i+2) == 0){
        return false;
      }
    }
    return true;
  }
}
function listFactors(num){
  var factors = [];
  for (i = 1; i < num; i ++){
    if (num % i == 0){
      factors.push(i);
    }
  }
  factors.push(num);
  return factors.toString();
}
