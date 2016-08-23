'use strict'

$(function(){
	
	var search = function() {
		var searchResult = $('#searchInput').val();		
		var API_KEY = '3150770-53193089bb4250fdf77fba4f1';
		$('.resultArea').html(''); //clean results of previous search

		$.ajax({
			url: "https://pixabay.com/api/?key="+API_KEY+"&per_page=50&q="+encodeURIComponent(searchResult),
			dataType: 'jsonp',
			success: function(data) {
				if(data.total > 0) {
					$.each(data.hits, function(i,hits) {	
						$('<img/>').attr('src', hits.previewURL)
											 .appendTo('.resultArea');
					})
				} else { 
						alert('No hits founds');
				};
			},
			error: function(error) {
				console.log(error);
			}
		});
	}

	$('#search-btn').on('click', search);
	$('.search').on('keypress', function(key) {
			if (key.keyCode == 13){
				search();
			}
	});

	//Prototype
	var Human = {
		name: 'Jeka',
		age: 28,
		gender: 'male',
		height: 180,
		weight: 72
	}

	function Worker(name) {
		this.name = name;
		this.job = 'SONY';
		this.salary = '$1000';
		this.working = function () {
			console.log('Hi! My name is ' + this.name + ". I'm working in " + this.job + ' and very like my job.');
		};
		this.__proto__ = Human;
	}

	function Student (name, universiry, stipend, serial) {
		this.name = name || Student.__proto__.name;
		this.universiry = universiry || 'Harvard';
		this.stipend = stipend || 100;
		this.watchingSerials = function () {
			console.log(this.name + ' every evening I watch ' + (serial ? serial : 'serials') + '.');
		};
	}

	Student.__proto__ = Human;

	var Mike = new Worker('Mike');
	var Dave = new Student('Dave');
	var Jordan = new Student('Jordan', 'KPI', '200', '"Friends"');

	console.log('Mike', Mike);
	console.log('Dave', Dave);
	console.log('Jordan', Jordan);
	console.log('Mike.age: ', Mike.age);
console.log(	Dave.name);
	Mike.working();
	Jordan.watchingSerials();
	Dave.watchingSerials();

});
