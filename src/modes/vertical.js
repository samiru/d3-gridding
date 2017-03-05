import * as d3Array from "d3-array";

export default function(nodes, v) {

  v.cols = nodes.length;

  v.x.domain([0, v.cols]).range([v.padding, v.size[0] - v.padding]);

  var _valueHeight;

  if(!v.valueHeight) {
    _valueHeight = function() { return 1; }
    v.height.domain([0, 1]).range([0, v.size[1] - 2 * v.padding]);
  } else {
    _valueHeight = v.valueHeight
    // d3Array.extent(nodes, _valueHeight)
    v.height.domain([0, d3Array.max(nodes, _valueHeight)]).range([0, v.size[1] - 2 * v.padding]);
  }

  nodes.forEach(function(n, i) {

    n[v.__x] = v.x(i) + v.offset[0];

    if(v.orient == "down") {
      n[v.__y] = 0 + v.offset[1] + v.padding;
    } else if(v.orient === "up") {
      n[v.__y] = v.size[1] - (v.height(_valueHeight(n)) + v.offset[0]) + v.padding;
    } else {
      n[v.__y] = 0 + v.offset[1] + v.padding;
    }

    n[v.__width] = (v.size[0] - 2 * v.padding) / v.cols;
    n[v.__height] = v.height(_valueHeight(n));

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;
  });

  return nodes;
}
