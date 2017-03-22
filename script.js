//create map
 var map = L.map('mapcontainer', {
        center: [40.6622, -73.9442],
        zoom: 12
    });

    //tile layer
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
      }).addTo(map);

        var faithbased = 'https://johnmcnally7.carto.com/api/v2/viz/dc91aede-6867-4919-87bf-76827dd57d88/viz.json';

        cartodb.createLayer(map, faithbased)
        .addTo(map)
        .on('done', function(layer)){}

 //scale bar 
L.control.scale({
    metric: false,
    imperial: true,
    maxWidth:200
}).addTo(map);