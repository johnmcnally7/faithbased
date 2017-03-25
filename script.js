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

    //add faithbased geojson data to map
    var layer = L.geoJson(faithbased, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker (latlng, style(feature))
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
            color: 'white',
            dashArray: '2',
            fillOpacity: 0.7,
            radius: 4
        };
    }


 //scale bar 
L.control.scale({
    metric: false,
    imperial: true,
    maxWidth:200
}).addTo(map);