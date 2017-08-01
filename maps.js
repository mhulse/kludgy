(function(window, google, undefined) {
    'use strict';
    var SERVICE;
    function getPanorama() {
        setNearestPanorama(randomLatLng());
    }
    function randomLatLng() {
        var randomLatitude = ((Math.random() * Math.max((180 * 0.25), 120)) - (90 - Math.min(0.25, 45)));
        var randomLongitude = ((Math.random() * 360) - 180);
        return new google.maps.LatLng(randomLatitude, randomLongitude);
    }
    function setNearestPanorama(coords, bounds) {
        var check = (bounds || 50);
        SERVICE.getPanoramaByLocation(coords, check, function(panoData) {
            var found = false;
            var loc;
            if (panoData) {
                if (panoData.location) {
                    if (panoData.location.latLng) {
                        found = true;
                    }
                }
            }
            if (found) {
                loc = panoData.location.latLng;
                window.COORDS = JSON.stringify({
                    lat: loc.lat(),
                    lng: loc.lng(),
                    id: panoData.location.pano,
                    copyright: panoData.copyright,
                });
                //console.log(panoData);
            } else {
                setNearestPanorama(coords, (check * 2));
            }
        });
    }
    google.maps.event.addDomListener(window, 'load', function() {
        SERVICE = new google.maps.StreetViewService();
        getPanorama();
    });
})(window, google, JSON);
