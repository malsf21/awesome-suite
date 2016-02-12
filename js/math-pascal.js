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
