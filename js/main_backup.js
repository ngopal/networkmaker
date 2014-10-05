var myApp = angular.module('myApp', []);

function CommandCtrl($scope) {
	$scope.input = {data:'A -> B;'}; //make this an empty string for blank network
	$scope.parsed = function(data) {
		var relations = data.split(';');
		relations = relations.slice(0,relations.length-1);

		//Define Parts
		var parts = relations.map(function(d) {
		  return d.split('->');
		});

		// Get Nodes
		var nodes = _.unique(_.flatten(parts).map(function(e) {
  			return e.trim();
		})).map(function(d) {
  			return d.trim();
		});

		// Get edges for part
		var edges = parts.map(function(d) {
  			return {'source':nodes.indexOf(d[0].trim()),'target':nodes.indexOf(d[1].trim())};
		});

		//Let's make a structure for the nodes
		var nodeObj = nodes.map(function(d) {
			return {"name":d};
		});

		return {nodeElements:nodeObj, edgeElements:edges};
	};


	$scope.makeNetwork = function(nodeObj, edgeObj) {

	  var width = 960,
	      height = 500;

	  var color = d3.scale.category20();

	  var force = d3.layout.force()
	      .charge(-120)
	      .linkDistance(30)
	      .size([width, height]);

	  var svg = d3.select("svg")
	      .attr("width", width)
	      .attr("height", height);

	      force
	        .nodes(nodeObj)
	        .links(edgeObj)
	        .start();

	        var link = svg.selectAll(".link")
	        .data(edgeObj)
	      .enter().append("line")
	        .attr("class", "link");

	    var node = svg.selectAll(".node")
	        .data(nodeObj)
	      .enter().append("circle")
	        .attr("class", "node")
	        .attr("r", 5)
	        .call(force.drag);

	      node.append("title")
	        .text(function(d) { return d.name; });

	    force.on("tick", function() {
	      link.attr("x1", function(d) { return d.source.x; })
	          .attr("y1", function(d) { return d.source.y; })
	          .attr("x2", function(d) { return d.target.x; })
	          .attr("y2", function(d) { return d.target.y; });

	      node.attr("cx", function(d) { return d.x; })
	          .attr("cy", function(d) { return d.y; });
	    });
	}

}


// Get Input
// var input = 'A ->B;    A -> C;\n\nB -> D;A -> D';
// var relations = input.split(';');

// Define Part
// var parts = relations.map(function(d) {
//   return d.split('->');
// });

// // Get nodes
// var nodes = _.unique(_.flatten(parts).map(function(e) {
//   return e.trim();
// })).map(function(d) {
//   return d.trim();
// });
// console.log(relations);
// console.log(parts);
// console.log(nodes);


// // Get edges for part
// parts.map(function(d) {
//   return {'source':nodes.indexOf(d[0].trim()),'target':nodes.indexOf(d[1].trim())};
// });


// #Special Relations
// A -D-> B = "APP catalysis"
// A -X-> B = "Neuron Repression"
// L1 = XOR

// #Style
// rs34234 {color:'red'}


// NOTCH2 -> Protein1;
// Protein1 -> Protein2;
// Protein3 -> Protein2;
// rs34234 -XOR-> L1;
// rs34230 -XOR-> L1;
// L1 -> Protein1;