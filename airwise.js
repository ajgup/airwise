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

function setGraphs(chart_name,axis_labels,chart_data,Element){
  new Chart(document.getElementById(chart_name), {
   type: 'line',
   data: {
     labels: axis_labels,
     datasets: [{
         data: getFireBaseData(Element),
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
}
new Chart(document.getElementById("carbon-chart"), {
   type: 'line',
   data: {
     labels: ["June 22"],
     datasets: [{
         data: getFireBaseData('CO2'),
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
     labels: ["June 21", "June 22", "June 23", "June 24"],
     datasets: [{
         data: [0,1,2,3],
         label: "TVOC",
         borderColor: "#f44242",
         fill: false
       }
     ]
   },
   options: {
     title: {
       display: true,
       text: 'TVOC something'
     },
    
   }
 });
 new Chart(document.getElementById("temp-chart"), {
   type: 'line',
   data: {
     labels: ["June 21", "June 22", "June 23", "June 24"],
     datasets: [{
         data: [20,20,20,20],
         label: "Temp",
         borderColor: "#f44242",
         fill: false
       }
     ]
   },
   options: {
     title: {
       display: true,
       text: 'temp something'
     },
    
   }
 });
