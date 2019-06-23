var config = {
  apiKey: "AIzaSyCuFBMM60uxPOft_v8i3gt2bp1dIEEjp-s",
  authDomain: "airwisedata.firebaseapp.com",
  databaseURL: "https://AirWiseData.firebaseio.com",
  storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);
var data = firebase.database();

var dict;
var ref = data.ref();
ref.once('value')
 .then(function (snap) {
  dict = snap.val();
  console.log('snap.val()', dict);
  var CO2_tolerance = dict["CO2_tolerance"];
  var CO2_average = dict["CO2_average"];
  var TVOC_tolerance = dict["TVOC_tolerance"];
  var TVOC_average = dict["TVOC_average"];

  var upper = Math.round(CO2_average+CO2_tolerance);
  var lower = Math.round(CO2_average-CO2_tolerance);

  var upperTVOC = Math.round(TVOC_average+TVOC_tolerance);
  var lowerTVOC = Math.round(TVOC_average-TVOC_tolerance);

  document.getElementById("carbon_predicted").innerHTML=lower + " - " + upper;
  document.getElementById("TVOC_predicted").innerHTML=lowerTVOC + " - " + upperTVOC; 
 });



function fireData(str) {
var arr = []
var col = data.ref(str);
col.on('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var carbonThreshold = 0
    var childData = childSnapshot.val();
    const keys = Object.keys(childData) ;
    arr.push(childData[str])
    if (keys[0]=="CO2"){
      var save = arr[arr.length-1];
      document.getElementById("carbon_level").innerHTML=save + " ppm";
      var percent = save/5000 * 100
      document.getElementById("LoadingCarbon").style.width = `${percent}%`;
      carbonThreshold = save
    }
    if (keys[0]=="TVOC"){
      var save = arr[arr.length-1];
      document.getElementById("TVOC_level").innerHTML=arr[arr.length-1] + " ppb";
      var percent = save/500 * 100
      document.getElementById("LoadingTVOC").style.width = `${percent}%`;
    }
    if (keys[0]=="TEMP"){
      var save = arr[arr.length-1];
      document.getElementById("temp").innerHTML=arr[arr.length-1] + " C";
      var percent = save/50 * 100
      document.getElementById("LoadingTEMP").style.width = `${percent}%`;
    } 
    if(arr.length > 30){
      arr.shift();
    }
    Carbon_chart.update();
  });
  if(carbonThreshold > 3000){
    hazardText();
  }
});
  return arr
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

async function hazardText () {
    lib = lib({token: 'tok_nNP8SRAYjvoezpXn4u6GoNSFn9mEmVWWNH3PxCCJaoF1SAZtfNmKJQMu74DTsvRT'});
    const sms = lib.utils.sms['@1.0.11'];
    let result = await sms({
      to: "+16478312042",
      body: "ALERT! Air quality conditions in your area may be harmful to your health. Please exercise caution - Your friends at AirWise :)"
    });
  }
Carbon_chart = new Chart(document.getElementById("carbon-chart"), {
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
TVOC_chart = new Chart(document.getElementById("tvoc-chart"), {
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
TEMP_chart = new Chart(document.getElementById("temp-chart"), {
  type: 'line',
  data: {
    labels: fireLabels('TEMP'),
    datasets: [{ 
        data: fireData('TEMP'),
        label: "Temperature",
        borderColor: "#FF8000",
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
    },
  }
});
 setTimeout(function() { Carbon_chart.update(); TVOC_chart.update(); TEMP_chart.update()},5000);
