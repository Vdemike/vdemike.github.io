var header = document.getElementById("Crimes_et_d.C3.A9lits_enregistr.C3.A9s_par_les_services_de_police");
var div = document.createElement("div");
div.id = "chartContainer";
var canvas = document.createElement("canvas");
canvas.id = "myChart";
canvas.width = 500;
canvas.height = 400;
div.appendChild(canvas);
header.parentNode.insertBefore(div, header.nextSibling);

const table = document.getElementById("table1");

let dataValue = [];
let nameCountry = [];
let years =[];

for (let i = 1; i < table.rows.length; i++) {
  let row = table.rows[i];
  if(i == 1){
      for (let j = 2; j < row.cells.length; j++) {
          years.push(row.cells[j].textContent);
      }
  }
  else{
      let country = row.cells[1].textContent;
      let numbers = [];
      for (let j = 2; j < row.cells.length; j++) {
          numbers.push(parseFloat(row.cells[j].textContent.replace(",",".")));
      }
      dataValue.push({country, numbers});
      nameCountry.push({country});
  }
}

console.log(dataValue);
console.log(nameCountry);
console.log(years);

// Make the first chart


var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: years,
    datasets: dataValue.map(({country,numbers}) => {
      var color = 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ', 1)';
        return {
            label: country,
            data: numbers,  
            backgroundColor: 'rgba(105, 99, 132, 0.2)',
            borderColor: color,
            borderWidth: 1
        }
    })
  },
  options: {
    scales: {
      y: {
          beginAtZero: false,
          type: 'logarithmic',
          
      }
  }
}});

chart.update();

// Second chart
var title = document.getElementById("Homicides");
var secondDiv = document.createElement("div");
secondDiv.id = "secondChartContainer";
var secondCanvas = document.createElement("canvas");
secondCanvas.id = "Chart2";
secondCanvas.width = 400;
secondCanvas.height = 600;
secondDiv.appendChild(secondCanvas);
title.parentNode.insertBefore(secondDiv, title.nextSibling);

var rows = document.querySelectorAll("#table2 tbody tr");
var chartTable = document.getElementById('Chart2').getContext('2d');
var countries = [];
var years2007_09 = [];
var years2010_12 = [];

for (var i = 0; i < rows.length; i++) {
  var cells = rows[i].querySelectorAll("td");
  countries.push(cells[0].textContent);
  years2007_09.push(cells[1].textContent);
  years2010_12.push(cells[2].textContent);
}

console.log(countries);
console.log(years2007_09);
console.log(years2010_12); 

var secondChart = new Chart(chartTable, {
  type: 'bar',
  data: {
    labels: countries,
    datasets: [{
      axis: 'y',
      label: '2007/09',
      data: years2007_09,
      fill: false,
      backgroundColor: [
        'rgb(102, 102, 153)',
      ],
      borderColor: [
        'rgb(102, 102, 153)',
      ],
      borderWidth: 1
    },
    {
      axis: 'y',
      label: '2010/12',
      data: years2010_12,
      fill: false,
      backgroundColor: [
        'rgba(102, 102, 153, 0.5)',
      ],
      borderColor: [
        'rgb(102, 102, 153)',
      ],
      borderWidth: 1
    }]

  },
  options: {
    
    indexAxis: 'y',
    
    scales: {
      x: {
          stacked: false,
          
      },
      y: {
          stacked: false,
          
      }
    }
  }
});

// Third live chart

var firstHeading = document.getElementById("firstHeading");
var thirdDiv = document.createElement("div");
thirdDiv.id = "thirdChartContainer";
var thirdCanvas = document.createElement("canvas");
thirdCanvas.id = "Chart3";
thirdCanvas.width = 400;
thirdCanvas.height = 250;
thirdDiv.appendChild(thirdCanvas);
firstHeading.parentNode.insertBefore(thirdDiv, firstHeading.nextSibling);

var dataPoints = [];
$.get("https://canvasjs.com/services/data/datapoints.php", function(data) {  
    var labels = []
    $.each(data, function(key, value){
        dataPoints.push({x: value[0], y: value[1]});
        labels.push(value[0])
    });

      var thirdChart = new Chart(thirdCanvas, {
          type: 'line',
          data: {
              labels: labels,
              datasets: [{
                  label: "Crimes",
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  data: dataPoints,
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: false,
                      type: "logarithmic",
                  }
              }
          }
      });
  }
);
