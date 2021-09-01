var __mapCenter = {
    lat: 10.759003,
    lng: 106.675356
}

function get_api_key() {
    var key = "383a90729d0590f9e1074083a11791ff64767fb56c1d9c4f";
    return key
}

function getConfig() {
    var config = {
        "title": "",
        "static_files": "/web/",
        "mapapi": "https://maps.vietmap.vn/",

        //- "static_files": "/",
        //- "mapapi": "http://localhost:4000/",
    };
    return config
}


var config = getConfig();
const __hostProxy = config.mapapi;
var __mapCenter = {
    lat: 21.033775,
    lng: 105.840247
};
__vm_key = get_api_key();

$('a[data-toggle="pill"]').on('shown.bs.tab', function(e) {
    var target = $(e.target).attr("href");
    if ((target == '#mapsapi-autocomplete')) {
        Lmap.invalidateSize();
    }
});
var __autoPointsLayer = L.layerGroup()
var valAuto = "vietmap"
var autoResponseData = null;
var fstName = null;
var urlRespon = null;
$('#inputAddressAuto').autocomplete({
    source: function(request, response) {
        urlRespon = `${__hostProxy}api/autocomplete?api-version=1.1&focus.point.lat=${__mapCenter.lat}&focus.point.lon=${__mapCenter.lng}&apikey=` + __vm_key + `&text=${request.term}`;
        $.get(urlRespon, function(data) {
            autoResponseData = data
            fstName = []
            for (let index = 0; index < autoResponseData.data.features.length; index++) {
                const element = autoResponseData.data.features[index];
                fstName.push({
                    label: element.properties.label.toString(),
                    value: index.toString()
                })
            }
            response(fstName);
        });
    },
    open: function() {
        $('.ui-autocomplete').css('z-index', 99999999999999);
    },
    focus: function(event, ui) {
        event.preventDefault();
        $("#inputAddressAuto").val(ui.item.label);
    },
    select: function(event, ui) {
        $("#inputAddressAuto").val(ui.item.label);
        __autoPointsLayer.eachLayer(function(layer) {
            Lmap.removeLayer(layer)
        });
        var indexValue = parseInt(ui.item.value)
        var getFeature = autoResponseData.data.features[indexValue]
        var latlngAuto = {
            "lat": getFeature.geometry.coordinates[1],
            "lng": getFeature.geometry.coordinates[0]
        }
        var pointAuto = L.marker([latlngAuto.lat, latlngAuto.lng])
        __autoPointsLayer.addLayer(pointAuto);
        __autoPointsLayer.addTo(Lmap)

        //console.log(getFeature);
        // Lmap.panTo(pointAuto.getLatLng());
        Lmap.setView([latlngAuto.lat, latlngAuto.lng], 10);
        // setTagP("resultAddressAutocomplete", ui.item.label)
        // setTagP("resultLatLngAutocomplete", `${latlngAuto.lat}, ${latlngAuto.lng}`)
        // setTagP("resultNameAutocomplete", getFeature.properties.label)
        // updateTabRequestUrl("jsonAutocomplete", "requestUrlAutocomplete", autoResponseData, urlRespon)
        return false;
    },
});