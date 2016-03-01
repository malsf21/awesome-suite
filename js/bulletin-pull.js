function httpGet(theUrl){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false );
  xmlHttp.send( null );
  return xmlHttp.responseText;
}
var bulletin_data = JSON.parse(httpGet("http://159.203.17.35/awesome-suite-backend/bulletin.json"));
var bulletin_arr = $.map(bulletin_data, function(el) { return el });
for (i = 1; i < bulletin_arr[0] + 1; i++){
  $("#bulletin-title-" + i).html(bulletin_arr[i]['title'] + " <span class='label " + bulletin_arr[i]['label'] + "'>" + bulletin_arr[i]['tag'] + "</span>");
  $("#bulletin-date-" + i).html(bulletin_arr[i]['date']);
  $("#bulletin-author-" + i).html(bulletin_arr[i]['author']);
  $("#bulletin-content-" + i).html(bulletin_arr[i]['content']);
}
