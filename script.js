//create map
 var map = L.map('mapcontainer', {
        center: [40.6523, -73.9442],
        zoom: 12
    });

    //tile layer
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
      }).addTo(map);
//boundary outline 

var boundarystyle = {
    color: '#6baed6',
    opacity: 0.5,
    fillOpacity: 0
};


var bkboundary = L.geoJson(boundary, {
    style: boundarystyle
}).addTo(map);

//community district outline 

var cdstyle = {
    color: '#cb181d',
    opacity: 0.5,
    fillOpacity: 0,
    dashArray: 5
};


var cdboundary = L.geoJson(cd, {
    style: cdstyle
})

//city council outline 

var ccstyle = {
    color: '#cb181d',
    opacity: 0.5,
    fillOpacity: 0,
    dashArray: 5
};


var ccboundary = L.geoJson(cc, {
    style: ccstyle
})

//create overlays
var overlays = {
    "Community Districts": cdboundary,
    "City Council Districts": ccboundary
}
//control layers
L.control.layers(null,overlays, {collapsed:false}).addTo(map);

    //add faithbased geojson data to map
    var layer = L.geoJson(faithbased, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker (latlng, style(feature))
        },
//click to display lot information
     onEachFeature: function(feature, layer) {
        layer.bindPopup('<b>Owner:</b> ' + feature.properties.properowner + '<b><br>Address:</b> ' + feature.properties.properaddress + ' Brooklyn, NY' + '<b><br>Residential Development Rights:</b> ' + feature.properties.faithbas12 + ' sq. ft.' + '<br><b>Community District:  </b>' + feature.properties.CD + '<br><b>City Council District:  </b>' + feature.properties.Council)
         }
    }).addTo(map);




    //color selector for pop density
    function getColor(d) {
         return d > 100000 ? '#084594' :
                d > 50000  ? '#2171b5' :
                d > 25000  ? '#4292c6' :
                d > 10000  ? '#6baed6' :
                d > 1000   ? '#9ecae1' :
                d > 1      ? '#c6dbef' :
                             '#eff3ff' ;
    }

    //fill color for geojson based on the feature
    function style(feature) {
        return {
            fillColor: getColor(feature.properties.faithbas18),
            weight: 1,
            opacity: .9,
            color: '#686868',
            dashArray: '1',
            fillOpacity: 1,
            radius: 4
        };
    }

//mapzen options
var options = {
    bounds:true,
    position: 'topright',
    expanded: false,
    markers: true,
    panToPoint: true
};


//mapzen api key 
L.control.geocoder('mapzen-32exP1A', options).addTo(map);



 //scale bar 
L.control.scale({
    metric: false,
    imperial: true,
    maxWidth:200
}).addTo(map);