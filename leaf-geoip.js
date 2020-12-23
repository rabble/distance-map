L.GeoIP = L.extend({

    
    getPosition: function (ip) {
        var url = "http://api.ipstack.com/167.60.97.87?access_key=2c71e9fb82db8e99173fc2619998d3d7";
        var result = L.latLng(0, 0);

        if (ip !== undefined) {
            url = url + ip;
        } else {
            //lookup our own ip address
        }

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.onload = function () {
            var status = xhr.status;
            if (status == 200) {
                var geoip_response = JSON.parse(xhr.responseText);
                result.lat = geoip_response.latitude;
                result.lng = geoip_response.longitude;
            } else {
                console.log("Leaflet.GeoIP.getPosition failed because its XMLHttpRequest got this response: " + xhr.status);
            }
        };
        xhr.send();
        return result;
    },

    centerMapOnPosition: function (map, zoom, ip) {
        var position = L.GeoIP.getPosition(ip);
        map.setView(position, zoom);
    }
});