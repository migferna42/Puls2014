var base_url = "http://query.yahooapis.com/v1/public/yql?";

function obtenerGeoInformacion(lat,lon){
	var query = "select * from geo.placefinder where text='"+lat+", "+lon+"'";
	query += "AND gflags='R'";//Esto es optativo? es para no solo de informacion local,privada,etc
	query = encodeURIComponent(query);

	$.ajax({
		url: base_url + 'q=' + query,
		dataType: 'jsonp',
		jsonpCallback: 'geocallback',
		data: {
			format: 'json'
		}
	});
}

function geocallback(datos) {
	var info 	= datos.query.results.Result;
	var pais 	= info.country;
	var ciudad 	= info.city;
	var barrio	= info.line1;
	var woeid	= info.woeid;

	var tmp 	= '<p><strong>'+barrio+'</strong><br>'+ciudad+','+pais+'</p>';
	$('#geo').prepend(tmp);

	obtenerClima(woeid);
}

function obtenerClima(woeid){
	var query = "select * from weather.forecast where woeid='"+woeid+"'";
	query+="AND u='c'";
	query = encodeURIComponent(query);

	$.ajax({
		url: base_url + 'q=' + query,
		dataType: 'jsonp',
		jsonpCallback: 'climacallback',
		data: {
			format: 'json'
		}
	});
}

function climacallback(datos){
	var clima 	= datos.query.results.channel;
	var temp 	= clima.item.condition.temp;
	var code	= clima.item.condition.code;
	var unit 	= clima.units.temperature;

	var img 	= new Image();
	img.src 	= "http://l.yimg.com/a/i/us/we/52/"+code+".gif";

	$('#clima')
		.html('<strong>'+temp+'</strong>'+unit+'º')
		.prepend(img);
		

}