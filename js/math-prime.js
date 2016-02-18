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

$('.prime-preview').keyup(function(){
  var $this = $(this);
  var $primeoutput = $this.val();
  if ($this.val() == null || $this.val() == ""){
    $primeoutput = "Awaiting your command.";
  }
  else if ($this.val() < 0){
    $primeoutput = $primeoutput + " is a bit too small. Try a larger number.";
  }
  else if ($this.val() == 0| $this.val() == 1){
    $primeoutput = $primeoutput + " isn't a prime or composite number! It's special!";
  }
  else if(checkPrime($this.val()) == true){
    $primeoutput = $primeoutput + " is prime!";
  }
  else{
    $primeoutput = $primeoutput + " is composite!";
    if($('#composite-factor-toggle').is(':checked')){
      if ($this.val() >= 1000000){
        $primeoutput = $primeoutput + "\nThis number is too huge to calculate all of its factors!";
      }
      else{
        $primeoutput = $primeoutput + "\nIts factors are: " + listFactors($this.val());
      }
    }
  }
  $('.' + $this.attr('id') + '').html($primeoutput);
});
