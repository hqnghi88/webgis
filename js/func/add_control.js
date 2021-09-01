var zoomHome = L.Control.zoomHome();
zoomHome.addTo(Lmap);

var clicked_layer = 0;
// lớp các điểm F0
var f0MarkersLayer = L.markerClusterGroup();
// các địa điểm tĩnh đặt trước lên bản đồ
var staticPointMarkersLayer = L.markerClusterGroup();

L.easyButton('<h3>T</h3>', function() {
    //console.log("tinh");
    clicked_layer = 1;
    clicked_province = "";
    clicked_district = "";
    clicked_commune = "";
    if (clicked_province === "") {
        reset_adm1();
    }
}, "Xem mức tỉnh, thành").addTo(Lmap);

L.easyButton('<h3>H</h3>', function() {
    //console.log("huyen");
    // clicked_province = "";
    // clicked_district = "";
    //clicked_commune = "";
    clicked_layer = 2;
    if (clicked_province === "") {
        reset_adm2();
    } else if (clicked_province) {

        clean_map();
        adm2_layer = L.geoJson(mydata2, {
            style: style,
            filter: provinceFilter,
            onEachFeature: onEachFeature2
        });
        adm2_layer.addTo(Lmap);
    }

    if (clicked_district) {
        clean_map();
        adm2_layer = L.geoJson(mydata2, {
            style: style,
            filter: districtFilter2,
            onEachFeature: onEachFeature2
        });
        adm2_layer.addTo(Lmap);
    }
}, "Xem mức quận, huyện").addTo(Lmap);

L.easyButton('<h3>X</h3>', function() {
    //console.log("xa");	
    //clicked_province = "";
    // clicked_district = "";
    // clicked_commune = "";
    // reset_adm3();
    clicked_layer = 3;
    if (clicked_province === "") {
        reset_adm3();
    } else
    if (clicked_province) {
        clean_map();
        adm3_layer = L.geoJson(mydata3, {
            style: style,
            filter: provinceFilter,
            onEachFeature: onEachFeature3
        });
        adm3_layer.addTo(Lmap);
    }
    if (clicked_district) {
        clean_map();
        adm3_layer = L.geoJson(mydata3, {
            style: style,
            filter: districtFilter,
            onEachFeature: onEachFeature3
        });
        adm3_layer.addTo(Lmap);
    }
}, "Xem mức phường, xã").addTo(Lmap);

L.easyButton('<h3>C</h3>', function() {
    //console.log("xa");	
    //clicked_province = "";
    // clicked_district = "";
    // clicked_commune = "";
    // reset_adm3();
    clicked_layer = 4;
    if (clicked_province === "") {
        reset_adm4();
    } else
    if (clicked_province) {
        clean_map();
        adm3_layer = L.geoJson(mycell1, {
            style: style,
            filter: provinceFilter,
            onEachFeature: onEachFeature3
        });
        adm3_layer.addTo(Lmap);
    }
    if (clicked_district) {
        clean_map();
        adm3_layer = L.geoJson(mycell1, {
            style: style,
            filter: districtFilter,
            onEachFeature: onEachFeature3
        });
        adm3_layer.addTo(Lmap);
    }
}, "Xem mức ô lưới 300m").addTo(Lmap);

if (listRegionControler)
    listRegionControler.addControl(Lmap);

// biểu diễn các điểm tiêm chủng trên bản đồ
// staticPointController.addControl(Lmap);

// thử nghiêm thêm lớp nhiệt
// L.easyButton('<h3>N</h3>', function () {
//     clean_map();
//     addressPoints = addressPoints.map(function (p) { return [p[0], p[1]]; });
//     var heat = L.heatLayer(addressPoints);    
//     heat.addTo(Lmap);    

// }, "Xem bản đồ nhiệt").addTo(Lmap);

// thử nghiêm thêm việc chạy video
var is_playing = false;
if (hisNguyCoControler) {
    L.easyButton(`<p class="play-layer-date">
                <i id="PLAY-ICON" class="fas fa-play" style="font-size: large;"></i>
              </p>`, function() {
        if (!is_playing) {
            is_playing = true;
            hisNguyCoControler.startPlay(0);
        } else {
            is_playing = false;
            $('#PLAY-ICON').removeClass('fas fa-play-circle');
            $('#PLAY-ICON').addClass('fas fa-play');
        }
    }, "Xem thay đổi nguy cơ từ 10 ngày trước").addTo(Lmap);
}


var legend_date = L.control(); // { position: 'topleft' }

legend_date.onAdd = function(map) {
    this.div = L.DomUtil.create('div', 'info legend date');
    let d = new Date();
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    // console.log(`${da}-${mo}-${ye}`);
    this.div.innerHTML = `<b>${da}/${mo}/${ye}</b>`;
    return this.div;
};

legend_date.update_time = function(day, counter) {
    const idxs = [2, 3, 4, 2, 3, 4, 2, 3, 4, 2];
    const chart_colors = panelUtil.getRangeColors();
    var i = counter < idxs.length ? counter : counter % idxs.length;
    const color = chart_colors[idxs[i]]['strokeColor'];
    this.div.innerHTML = `<b style="background:${color}">${day}</b>`;
};

legend_date.addTo(Lmap);

// control that shows state info on hover
var info = L.control();

info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function(feature) {
    if (feature && feature.properties) {
        var sc = 0;
        sc = getScore(feature);
        this._div.innerHTML = '' + (feature.properties ?
            '<b>' + feature.properties.name + '</b>' +
            (feature.properties.name2 ? (", <b>" + feature.properties.name2 + "</b>") : "") +
            (feature.properties.name1 ? (", <b>" + feature.properties.name1 + "</b>") : "") +
            '<br />' + getRisk(sc) + '.' :
            '');

    }
};

info.addTo(Lmap);

var legend = L.control({ position: 'bottomright' });

legend.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1, 2, 3, 4],
        ptype = ["Bình thường mới", "Nguy cơ", "Nguy cơ cao", "Rất cao"],
        labels = [],
        from, to;
    labels.push('<table>');
    for (var i = grades.length - 1; i >= 0; i--) {
        from = grades[i];
        to = grades[i + 1];
        labels.push('<tr><td>');
        labels.push('<i style="background:' + getColor(from) + '">&nbsp;&nbsp;&nbsp;</i>&nbsp;' + ptype[i]);
        labels.push('</td></tr>');
    }
    labels.push('</table>');
    div.innerHTML = labels.join('');
    //str = buildString1(mapVN["VN"]);
    //document.getElementById("thelist").innerHTML = "<h5 class=\"text-danger\">Danh sách tỉnh/thành</h5></br>" + str;
    return div;
};

legend.addTo(Lmap);

Lmap.addControl(new L.Control.Fullscreen({
    pseudoFullscreen: true,
    title: {
        'false': 'View Fullscreen',
        'true': 'Exit Fullscreen'
    }
}));

// load nội dung báo cáo
// reset_adm1();
// showInfoVietNam();