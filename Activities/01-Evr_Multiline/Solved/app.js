// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the donuts.csv file
// =================================
d3.csv("donuts.csv", function (error, donutData) {
  if (error) throw error;

  // Step 4: Parse the data
  // Format the data and convert to numerical and date values
  // =================================
  // Create a function to parse date and time
  var parseTime = d3.timeParse("%d-%b");

  // Format the data
  donutData.forEach(function (data) {
    data.date = parseTime(data.date);
    data.morning = +data.morning;
    data.evening = +data.evening;
  });

  // Step 5: Create the scales for the chart
  // =================================
  var xTimeScale = d3.scaleTime()
    .range([0, width]);

  var yLinearScale = d3.scaleLinear().range([height, 0]);

  //* * * * 2 * * * * *
  // var yLinearScale2 = d3.scaleLinear().range([height, 0]);

  // Step 6: Set up the y-axis domain
  // ==============================================
  // @NEW! determine the max y value
  // find the max of the morning data
  var morningMax = d3.max(donutData, d => d.morning);

  // find the max of the evening data
  var eveningMax = d3.max(donutData, d => d.evening);

  var yMax;
  if (morningMax > eveningMax) {
    yMax = morningMax;
  } else {
    yMax = eveningMax;
  }

  // var yMax = morningMax > eveningMax ? morningMax : eveningMax;

  // Use the yMax value to set the yLinearScale domain
  yLinearScale.domain([0, yMax]);
  xTimeScale.domain(d3.extent(donutData, d => d.date))


  //* * * * 2 * * * * *
  // yLinearScale.domain([0, morningMax]);
  // yLinearScale2.domain([0, eveningMax]);


  // Step 7: Create the axes
  // =================================
  var bottomAxis = d3.axisBottom(xTimeScale) //.tickFormat(d3.timeFormat("%d-%b"));
  var leftAxis = d3.axisLeft(yLinearScale);

  //* * * * 2 * * * * *
  // var rightAxis = d3.axisRight(yLinearScale2);

  // Step 8: Append the axes to the chartGroup
  // ==============================================
  // Add x-axis
  chartGroup.append("g")
    // .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y-axis
  chartGroup.append("g").call(leftAxis)
  //* * * * 3 * * * * *
  // .attr("stroke", "orange")


  //* * * * 2 * * * * *
  // chartGroup.append("g").call(rightAxis)
  // then
  // .attr("transform", `translate(${width}, ${0})`)

  //* * * * 3 * * * * *
  // .attr("stroke", "green")


  // Step 9: Set up two line generators and append two SVG paths
  // ==============================================

  // Line generator for morning data
  var line1 = d3.line()
    .x(d => xTimeScale(d.date))
    .y(d => yLinearScale(d.morning));

  // Line generator for evening data
  var line2 = d3.line()
    .x(d => xTimeScale(d.date))
    .y(d => yLinearScale(d.evening))
  //* * * * 2 * * * * *
  // .y(d => yLinearScale2(d.evening));

  // Append a path for line1
  chartGroup
    .data([donutData])
    .append("path")
    .attr("d", line1)
    // .classed("line orange", true);

  // Append a path for line2
  chartGroup
    .append("path")
    .attr("d", line2(donutData))
    // .classed("line green", true)


  //* * * * 4 * * * * * remove classed first
  // .attr("fill", "none")
  // .attr("stroke", 'green')

  // .attr("stroke-width", 2)
  // .on("mouseover", function() {
  //   d3.select(this)
  //         .attr("stroke", "red");
  // })

  //* * * * 3 * * * * *

  // chartGroup.append("text")
  //   .attr("transform", `translate(${width}, ${height/2})`)
  //   .attr("text-anchor", "middle")
  //   .attr("font-size", "16px")
  //   .attr("fill", "green")
  //   .text("Morning Donut Craving Level")


  // chartGroup.append("text")
  // .attr("transform", `rotate(90deg)`)  
  // TRY LASTTTTTTT LOOK IT UP
  // .attr("transform", `translate(${0}, ${height / 2}) rotate(90)`)
  // .attr("text-anchor", "middle")
  // .attr("font-size", "16px")
  // .attr("fill", "orange")
  // .text("Evening Donut Craving Level")



});
