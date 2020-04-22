d3.csv("./data/water-footprint-data.csv").then(function(data) {
	
	// Construct, filter and examine dataset
	console.log(data);

	var filtered_data = data.filter(d => (d.average > 0));

	console.log(filtered_data);

	/* DEFINE DIMENSIONS AND GENERATE SVG */
    var width = document.querySelector("#chart").clientWidth;
    	height = document.querySelector("#chart").clientHeight;
   		
   	var maxAverage = d3.max(filtered_data, d => +d.average);

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
    
    /* CREATE SCALES FOR CIRCLE SIZING AND COLOR */
	var size = d3.scaleLinear()
	    .domain([0, maxAverage])
	    .range([5, 150])  // circle will be between 5-75 pixels

	var color = d3.scaleOrdinal()
		.domain(["crop", "animal"])
		.range(["#7bbfc4", "#398490"]);

	/* HANDLE MOUSE INTERACTIVITY */
	var mouseover = function(d) {
    	d3.select("#tooltip")
    		.style("font-size", "14px")
    		.html(`<b>${d.product}</b><br>${d.average} m <sup>3</sup>/ton`);
    };

    var mouseleave = function(d) {
    	d3.select("#tooltip")
			.style("font-size", "14px")
			.html("Nothing selected")
    };

	/* CREATE CIRCLE DATA POINTS */
	var node = svg.append("g")
		.selectAll("circle")
		.data(filtered_data)
		.enter()
		.append("circle")
			.attr("class", "node")
			.attr("r", d => size(d.average))
			.attr("cx", width / 2)
			.attr("cy", height / 2)
			.style("fill", d => color(d.type))
			.style("fill-opacity", 1)
			.attr("stroke", "#f1f1f1")
			.style("stroke-width", 1)
			.on("mouseover", mouseover) 
			.on("mouseleave", mouseleave);

	/* HANDLE SIMULATION AT WEBPAGE LANDING */
    var simulation = d3.forceSimulation()
      	.force("center", d3.forceCenter().x(width / 2).y(height / 2))
      	.force("charge", d3.forceManyBody().strength(.1))
      	.force("collide", d3.forceCollide().strength(.2).radius(d => (size(d.average)+3)).iterations(2.5)) 

    simulation
      	.nodes(filtered_data)
      	.on("tick", function(d){
        node
            .attr("cx", function(d){ return d.x; })
            .attr("cy", function(d){ return d.y; })
      	});
    });


