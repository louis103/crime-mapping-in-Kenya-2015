// Load Libraries
google.charts.load("current", { packages: ["corechart"] });
google.charts.load("current", { packages: ["bar"] });
// Call plaotting function
google.charts.setOnLoadCallback(drawBarChart);
google.charts.setOnLoadCallback(drawPieChart);
google.charts.setOnLoadCallback(drawDoughnutChart);
// Draw Pie Chart
function drawPieChart() {
  var data = google.visualization.arrayToDataTable([
    ["Task", "Hours per Day"],
    ["Work", 41],
    ["Eat", 28],
    ["Commute", 24],
    ["Watch TV", 20],
    ["Sleep", 37],
  ]);

  var options = {
    title: "Pie Chart",
    is3D: false,
    width: 500,
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );
  chart.draw(data, options);
}
// Doughnut chart
function drawDoughnutChart() {
  var data = google.visualization.arrayToDataTable([
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ]);

  var options = {
    title: "Doughnut Chart",
    pieHole: 0.4,
    width: 500,
    height: 500,
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("donutchart")
  );
  chart.draw(data, options);
}
// BarChart
function drawBarChart() {
  var data = new google.visualization.arrayToDataTable([
    ["Type of Crime", "Recorded Cases"],
    ["Homicide", 44],
    ["Immorality Offences", 31],
    ["Robbery", 12],
    ["Breakings", 10],
    ["Stock Theft", 3],
    ["Stealing", 44],
    ["Theft By Servants", 31],
    ["Vehicle Theft", 12],
    ["Drugs", 100],
    ["Traffic", 3],
    ["Criminal Damages", 44],
    ["Economy Crimes", 31],
    ["Corruption", 12],
    ["Police Offences", 10],
    ["Tourists Offences", 3],
    ["Penal Code", 44],
  ]);

  var options = {
    title: "Crime Mapping",
    width: 500,
    height: 500,
    legend: { position: "none" },
    chart: {
      title: "Crime Mapping",
      subtitle: "Distribution of Crimes in Kenya",
    },
    bars: "horizontal", // Required for Material Bar Charts.
    colors: ["red", "#004411"],
    axes: {
      x: {
        0: { side: "top", label: "Cases" }, // Top x-axis.
      },
    },
    bar: { groupWidth: "90%" },
  };

  var chart = new google.charts.Bar(document.getElementById("top_x_div"));
  chart.draw(data, options);
}
