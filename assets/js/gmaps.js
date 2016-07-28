function initMap() {
    var map = new google.maps.Map(document.getElementById('fiber-footprint'), {
        center: { lat: 34.0195, lng: -118.4912 },
        zoom: 16,
        minZoom: 14
    });

    map.data.loadGeoJson(baseURL + 'assets/geojson/fiber.geojson');
    map.data.setStyle({
//            strokeColor: '#93c840'
        strokeColor: '#293347'
    });

    var marker = new google.maps.Marker({ map: map });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            marker.setPosition(pos);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, marker, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, marker, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, marker, pos) {
    marker.setPosition(pos);
    marker.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}