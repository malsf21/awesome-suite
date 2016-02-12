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
