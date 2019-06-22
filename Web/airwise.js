var config = {
  apiKey: "AIzaSyCuFBMM60uxPOft_v8i3gt2bp1dIEEjp-s",
  authDomain: "airwisedata.firebaseapp.com",
  databaseURL: "https://AirWiseData.firebaseio.com",
  storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);
var data = firebase.database();

function fireData(str) {
var arr = []
var col = data.ref(str);
col.on('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    const keys = Object.keys(childData);
    arr.push(childData[str])
    if (keys[0]=="CO2"){
    document.getElementById("carbon_level").innerHTML=arr[arr.length-1];
    }
    if (keys[0]=="TVOC"){
      document.getElementById("TVOC_level").innerHTML=arr[arr.length-1];
    }
    if (keys[0]=="TEMP"){
      document.getElementById("temp").innerHTML=arr[arr.length-1];
    }
<<<<<<< HEAD
    if(arr.length > 30){
      arr.shift();
    }
=======
>>>>>>> c981add592322c5a9b6505ac49e4c52d5428a3fd
  });
});
return arr;
}

function fireLabels(str) {
var labels = []
var col = data.ref(str);
col.on('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    var time = childData['Time'].substring(10,childData['Time'].length -7)
    labels.push (time)
    
    if(labels.length > 30){
      labels.shift();
    }
  });
});
return labels;
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
      text: 'TVOC ppb'
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
      text: 'Temperature Celsius'
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

