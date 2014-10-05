function makeItNow(nodeThing,edgeThing) {

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
        .nodes(nodeThing)
        .links(edgeThing)
        .start();

        var link = svg.selectAll(".link")
        .data(edgeThing)
      .enter().append("line")
        .attr("class", "link");

    var node = svg.selectAll(".node")
        .data(nodeThing)
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

