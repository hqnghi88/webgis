// const queryString = window.location.search;

// const urlParams = new URLSearchParams(queryString);
// // var mycell1 = Object.assign({}, my_cell0, my_cell1, my_cell2, my_cell3, my_cell4, my_cell5, my_cell6, my_cell7, my_cell8, my_cell9, my_cell10, my_cell11, my_cell12, my_cell13, my_cell14, my_cell15, my_cell16, my_cell17, my_cell18, my_cell19, my_cell20, my_cell21, my_cell22, my_cell23, my_cell24, my_cell25, my_cell26, my_cell27, my_cell28, my_cell29, my_cell30, my_cell31, my_cell32, my_cell33, my_cell34, my_cell35, my_cell36, my_cell37, my_cell38, my_cell39, my_cell40, my_cell41, my_cell42, my_cell43, my_cell44, my_cell45, my_cell46, my_cell47, my_cell48, my_cell49, my_cell50, my_cell51, my_cell52, my_cell53, my_cell54, my_cell55, my_cell56, my_cell57, my_cell58, my_cell59, my_cell60, my_cell61, my_cell62, my_cell63, my_cell64, my_cell65, my_cell66, my_cell67, my_cell68, my_cell69, my_cell70, my_cell71, my_cell72, my_cell73, my_cell74, my_cell75, my_cell76, my_cell77, my_cell78, my_cell79, my_cell80, my_cell81, my_cell82, my_cell83, my_cell84);

// province = "Cần Thơ"; //urlParams.get('p');


// district = urlParams.get('d');


// commune = urlParams.get('c');

// var clicked_province = province !== null ? province : "";
// var clicked_district = district !== null ? district : "";
// var clicked_commune = commune !== null ? commune : "";

// console.log('clicked_province', clicked_province);
// console.log('clicked_district', clicked_district);
// console.log('clicked_commune', clicked_commune);

var f0_layer;
var cell_layer;
// var adm1_layer;
// var adm2_layer;
// var adm3_layer;

var Lmap = L.map('map', { zoomControl: false }).setView([16.0376435, 107.5341797], 5.5);

// L.tileLayer('https://maps.vietmap.vn/api/tm/{z}/{x}/{y}.png?apikey=383a90729d0590f9e1074083a11791ff64767fb56c1d9c4f', {
//     attribution: 'Map data &copy; <a href="https://vimap.vn/">vimap</a>',
//     maxZoom: 18,
//     minZoom: 5,
//     id: 'mapbox/light-v9',
//     tileSize: 512,
//     zoomOffset: -1
// }).addTo(Lmap);
// doi vimap > googlemaps
L.tileLayer('https://maps.vnpost.vn/api/tm/{z}/{x}/{y}@2x.png?apikey={accessToken}', {
    attribution: 'Map data &copy; <a href="https://vmap.vn">Vmap</a>',
    maxZoom: 20,
    id: 'Vmap.streets',
    accessToken: '26f9804e1ff6d86f72a33ebd518f057e0aff542de23c724d'
}).addTo(Lmap);

Lmap.on('zoomend', function(e) {
    $("#zoomlevel").html(Lmap.getZoom());
    zoom_based_layerchange(true);
});
var greenIcon = new L.Icon({
    iconUrl: 'img/m.png',
    shadowUrl: 'img/m.png',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [1, -34],
    shadowSize: [16, 16]
});

function clean_map() {
    Lmap.eachLayer(function(layer) {
        if (layer instanceof L.GeoJSON)
        //Do marker specific actions here
        {
            //layer._leaflet_id = null;
            Lmap.removeLayer(layer);
        }
        //console.log(layer);
    });
}

function reset_adm1() {
    clean_map();
    clicked_province = "";
    clicked_district = "";
    clicked_commune = "";
    // cell_layer = L.geoJson(my_cell, {
    //     style: style,
    //     onEachFeature: onEachFeature1
    // }).addTo(Lmap);
    f0_layer = L.geoJson(f0_gis, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, { icon: greenIcon });
        },
        style: style,
        onEachFeature: onEachFeature1
    }).addTo(Lmap);
}

function reset_adm1s(layer) {
    console.log('reset_adm', layer);
    switch (layer) {
        case 1:
            reset_adm1();
            break;
        case 2:
            reset_adm2();
            break;
        case 3:
            reset_adm3();
            break;
        case 4:
            reset_adm4();
            break;
        default:
            reset_adm1();
    }
}

function zoom_based_layerchange(isZoom) {
    //console.log(map.getZoom());
    // $("#zoomlevel").html(Lmap.getZoom());
    var currentZoom = Lmap.getZoom();
    if (currentZoom >= 11) {
        // console.log(currentZoom);
        // $("#layername").html("Coors Field");
        reset_adm1();
        // showInfoVietNam();
    }
    // if (clicked_layer == 4) {
    //     return;
    // }
    // if (clicked_commune != "") { // || currentZoom > 10
    //     fit_zoom_to3(clicked_province, clicked_district, clicked_commune, isZoom);
    // } else {
    //     if (clicked_district != "") { // || currentZoom > 10
    //         fit_zoom_to2(clicked_province, clicked_district, isZoom);
    //     } else {
    //         if (clicked_province != "") { //|| (currentZoom > 6 && currentZoom <= 10)
    //             fit_zoom_to1(clicked_province, isZoom);
    //         } else {
    //             fit_zoom_to_VN(isZoom);
    //         }
    //     }
    // }
}


function getColor(d) {
    return "red";
}

function getScore(feature) {
    // if (feature.properties.name1 && feature.properties.name2 && feature.properties.name1 == "Cần Thơ") {
    //     // if (clicked_layer == 4) {
    //     return CT_cell.get("" + feature.properties.stt);
    // }
    // var sc = data_core.get(feature.properties.name);
    // if (feature.properties.name1 && feature.properties.name2) {
    //     sc = data_core.get(feature.properties.name1 + feature.properties.name2 + feature.properties.name);
    // } else if (feature.properties.name1) {
    //     sc = data_core.get(feature.properties.name1 + feature.properties.name);
    // }
    return 1;
}

function style(feature) {
    return {
        weight: 1,
        opacity: 1,
        color: 'red',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(getScore(feature))
    };
}


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.5
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    // info.update(layer.feature);
}

function resetHighlight(e) {
    if (f0_layer) {
        f0_layer.resetStyle(e.target);
    }
    if (cell_layer) {
        cell_layer.resetStyle(e.target);
    }
    // if (adm1_layer) {
    //     adm1_layer.resetStyle(e.target);
    // }
    // if (adm2_layer) {
    //     adm2_layer.resetStyle(e.target);
    // }
    // if (adm3_layer) {
    //     adm3_layer.resetStyle(e.target);
    // }
    // info.update();
}

function zoomToFeature(e) {
    Lmap.fitBounds(e.target.getBounds());
}

function onEachFeature1(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });

    layer.on('click', function(e) {
        province = e.target.feature.properties.name;
        clicked_province = province;
        // clicked_layer = 0;
        // showInfoTinh(province);
    });
}


// Lmap.attributionControl.addAttribution('Data &copy; <a href="https://itrithuc.vn/">iTriThuc</a>');

// $(window).on('load', function() {

//     setInterval(function() {
//         $('.collapse')
//             .on('shown.bs.collapse', function() {
//                 $(this)
//                     .parent()
//                     .find(".fa-angle-down")
//                     .removeClass("fa-angle-down")
//                     .addClass("fa-angle-up");
//             })
//             .on('hidden.bs.collapse', function() {
//                 $(this)

//                 .parent()
//                     .find(".fa-angle-up")
//                     .removeClass("fa-angle-up")
//                     .addClass("fa-angle-down");
//             });
//     }, 500);

// });