var numTiers = 100,
    triangle,
    start,
    stop;

function pascalRecursive(n, a) {

  if (n < 2) return a;

  var prevTier = a[a.length-1];
  var curTier = [1];

  for (var i = 1; i < prevTier.length; i++) {
    curTier[i] = prevTier[i] + prevTier[i-1];
  }
  curTier.push(1);
  a.push(curTier);

  return pascalRecursive(n-1, a).join("</br>");
}

function pascalSimple(numTiers) {

  var triangle = [
    [1]
  ],
  tier;

  for (var j = 0; j < numTiers-1; j++) {
    tier = [1];
    for (var k = 1; k < triangle[j].length; k++) {
      tier[k] = triangle[j][k] + triangle[j][k-1];
    }
    tier.push(1);
    triangle.push(tier);
  }

  return triangle.join("</br>");
}

$('.pascal-preview').keyup(function(){
  var $this = $(this);
  var $pascaloutput = $this.val();
  if ($this.val() == null || $this.val() == ""){
    $pascal = "Awaiting your command.";
  }
  else if ($this.val() <= 0){
    $pascaloutput = $pascaloutput + " is a bit too small. Try a larger number.";
  }
  else if ($this.val() >= 256){
    $pascaloutput = $pascaloutput + " is a bit too large. Try a smaller number.";
  }
  else{
    if($('#pascal-recursion-toggle').is(':checked')){
      $pascaloutput = pascalRecursive($pascaloutput, [[1]]);
    }
    else{
      $pascaloutput = pascalSimple($pascaloutput);
    }
  }
  $('.' + $this.attr('id') + '').html($pascaloutput);
});
