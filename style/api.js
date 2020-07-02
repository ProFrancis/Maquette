var data = {
    name: "eazea",
    prenom: "ezaea",
    age: "123"
}
var url = `http://restcountries.eu/`

function getData(method, url){
	return new Promise(function(resolve, reject){
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.onload = function(){
			if (this.status >= 200 && this.status < 300 ){
				resolve(xhr.response);
			}else {
				reject({
					status: this.status,
					statusText: xhr.statusText
				});
			}
		};
		xhr.onerror = function(){
			reject({
				status: this.status,
				statusText: xhr.statusText
			});
		};
		xhr.send();
	});
}
getData('GET', 'https://api.themoviedb.org/3/movie/upcoming?api_key=e082a5c50ed38ae74299db1d0eb822fe').then(function(data){
	let films = JSON.parse(data)
	let domHtml = '';
	for(let film of films.results){
		domHtml += `
		<figure class="img">
			<a href='#'>
				<img src='https://image.tmdb.org/t/p/w500${film.poster_path}' />
			</a>
		</figure>
		<div class='info-film'>  
			<h3>${film.original_title}</h3>
			<p>${film.overview}<p>
			<div id='note'>
				<img src='img/${parseInt(film.vote_average)/2}.png'/>
				<p>${film.vote_average}/10<p>
			</div>
		</div>
		`
	}
	document.getElementById('slide').innerHTML = domHtml;
}).catch(function(err){
	console.log(err);
});