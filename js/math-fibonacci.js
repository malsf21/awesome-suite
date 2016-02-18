/*
Easter Egg :)
function recursiveFibonacci(n) {
    if(n <= 2) {
        return 1;
    } else {
        return this.recursiveFibonacci(n - 1) + this.recursiveFibonacci(n - 2);
    }
};
*/

function loopingFibonacci(n) {
    var a = 0;
    var b = 1;
    var f = 1;
    for(var i = 2; i <= n; i++) {
        f = a + b;
        a = b;
        b = f;
    }
    return f;
};


function loopingFibonacciTotal(n) {
    var a = 0;
    var b = 1;
    var f = 1;
    var output = [];
    for(var i = 2; i <= n; i++) {
        f = a + b;
        a = b;
        b = f;
        output[i-2] = f;
    }
    return output.toString();
};

$('.fib-preview').keyup(function(){
  var $this = $(this);
  var $fiboutput = $this.val();
  if ($this.val() == null || $this.val() == ""){
    $fiboutput = "Awaiting your command.";
  }
  else if ($this.val() <= 0){
    $fiboutput = $fiboutput + " is a bit too small. Try a larger number.";
  }
  else if($('#fib-type-toggle').is(':checked')){
    if ($this.val() > 100){
      $fiboutput = $fiboutput + " is a bit too large. Try a smaller number.";
    }
    else{
      $fiboutput = loopingFibonacciTotal($fiboutput);
    }
  }
  else{
    if ($this.val() >= 1477){
      $fiboutput = $fiboutput + " is a bit too large. Try a smaller number.";
    }
    else{
      $fiboutput = loopingFibonacci($fiboutput);
    }
  }
  $('.' + $this.attr('id') + '').html($fiboutput);
});
