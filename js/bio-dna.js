function reverse(s) {
  return s.split('').reverse().join('');
}
function dnaComplement(line){
  var complement ="";
  for (i = 0; i < line.length; i++){
    if (line.charAt(i) == 'A'){
      complement = complement + "T";
    }
    else if (line.charAt(i) == 'T'){
      complement = complement + "A";
    }
    else if (line.charAt(i) == 'C'){
      complement = complement + "G";
    }
    else if (line.charAt(i) == 'G'){
      complement = complement + "C";
    }
  }
  return complement;
}

$('.dna-preview').keyup(function(){
  var $this = $(this);
  $dnaoutput = $this.val();
  if ($this.val() == null || $this.val() == ""){
    $dnaoutput = "Awaiting your command!";
  }
  else{
    if($('#dna-complement-toggle').is(':checked')){
      $dnaoutput = dnaComplement($dnaoutput);
    }
    if($('#dna-reverse-toggle').is(':checked')){
      $dnaoutput = reverse($dnaoutput);
    }
  }
  $('.' + $this.attr('id') + '').html($dnaoutput);
});
