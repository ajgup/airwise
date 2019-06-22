var config = {
   apiKey: "AIzaSyCuFBMM60uxPOft_v8i3gt2bp1dIEEjp-s",
   authDomain: "airwisedata.firebaseapp.com",
   databaseURL: "https://AirWiseData.firebaseio.com",
   storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);
var data = firebase.database();

function getFireBaseData(node,elementID) {
 var labels = []
 var arr = []
 var element = data.ref(node);
 element.on('value', function(snapshot) {
   snapshot.forEach(function(childSnapshot) {
     var data = childSnapshot.val();
     extract(data)
     //document.getElementById(elementID).innerHTML=data;
     arr.push(data)
   });
 });
 return arr;

}
function updateLabels(){
  getFireBaseData('CO2')
}


function extract(data){
  console.log(data);

}
new Chart(document.getElementById("carbon-chart"), {
  type: 'line',
  data: {
    labels: fireLabels('CO2'),
    datasets: [{ 
        data: fireData('CO2'),
        label: "Carbon",
        borderColor: "#3e95cd",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Carbon ppm'
    },
    
  }
});
new Chart(document.getElementById("tvoc-chart"), {
  type: 'line',
  data: {
    labels: fireLabels('TVOC'),
    datasets: [{ 
        data: fireData('TVOC'),
        label: "TVOC",
        borderColor: "#f44242",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'TVOC PPM'
    },
    
  }
});
new Chart(document.getElementById("temp-chart"), {
  type: 'line',
  data: {
    labels: fireLabels('TEMP'),
    datasets: [{ 
        data: fireData('TEMP'),
        label: "Temperature",
        borderColor: "#f44242",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Temperature'
    },
    scales: {
      yAxes: [{
        ticks: {
            stepSize: 0.2
        }
    }]
    }
    
  }
});

