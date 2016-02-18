function slope(x1,y1,x2,y2){
  return float((y2-y1)/x2-x1);
}
function yintercept(x,y,m){
  return float(y-m*x);
}
function yintform(m,b){
  return "y = " + str(m) + "x + " + str(b);
}
