var f0DatesData = new Map();
var f0MarkerData = new Map();
class F0PointControler {
    constructor() {}

    builData(data) {
        // var results = readSheet(data);
        var results = data;
        const key = results['parrams']['tinhCongBo'] +
            results['parrams']['huyenCongBo'] +
            results['parrams']['xaCongBo'];

        f0DatesData.set(key, results['dates']);
        var items = [];
        for (var i = 0; i < results['data'].length; i++) {
            const item = {
                    'maBN': results['data'][i]['maBN'],
                    'ngayCongBo': results['data'][i]['ngayCongBo'],
                    'lat': results['data'][i]['lat'],
                    'lng': results['data'][i]['lng']
                }
                // build data cho Xã
            items.push(item)
        }
        f0MarkerData.set(key, items);
    }

    do(data) {
        // var results = readSheet(data);
        var results = data;
        const key = results['parrams']['tinhCongBo'] +
            results['parrams']['huyenCongBo'] +
            results['parrams']['xaCongBo'];
        if (f0DatesData.get(key) == undefined) {
            f0PointControler.builData(data);
        }
        f0PointControler.drawMarkers(key);
    }
    drawSomeMarkers(data) {
        // var greenIcon = L.icon({
        //     iconUrl: 'images/duong.png',
        //     shadowUrl: 'images/marker_shadow.png',

        //     iconSize: [23, 24], // size of the icon
        //     shadowSize: [41, 41], // size of the shadow
        //     iconAnchor: [11, 22], // point of the icon which will correspond to marker's location
        //     shadowAnchor: [2, 40],  // the same for the shadow
        //     popupAnchor: [-2, -22] // point from which the popup should open relative to the iconAnchor
        // });
        // for (var i = 0; i < data.length; i++) {
        //     // console.log(data[i]);
        //     var marker = new L.Marker([data[i]['lat'], data[i]['lng']], { icon: greenIcon });
        //     marker.bindPopup(`
        //         Mã bệnh nhân: ${data[i]['maBN']} <br/>
        //         Ngày công bố: ${data[i]['ngayCongBo']}
        //     `);
        //     f0MarkersLayer.addLayer(marker);
        // }
        // f0MarkersLayer.addTo(Lmap);
    }

    drawMarkers(key) {
        var data = f0MarkerData.get(key);
        this.drawSomeMarkers(data);
    }

    drawMarkersByDate(counter, province, district, commune) {
        const key = province + district + commune;
        console.log('drawMarkersByDate', key);
        var dates = f0DatesData.get(key);
        var idx = (dates.length - 10) > 0 ? dates.length - 10 : 0;
        if ((idx + counter) < dates.length) {
            var cur_date = dates[idx + counter];
            var tpm = [];
            var data = f0MarkerData.get(key);
            if (counter == 0) {
                this.clearLayers();
                var is_true = 0;
                for (var i = 0; i < data.length; i++) {
                    if (data[i]['ngayCongBo'] != cur_date && is_true == 1) {
                        break;
                    }
                    tpm.push(data[i]);
                    if (data[i]['ngayCongBo'] == cur_date) {
                        is_true = 1;
                    }
                }
            } else {
                for (var i = 0; i < data.length; i++) {
                    if (data[i]['ngayCongBo'] == cur_date) {
                        tpm.push(data[i]);
                    }
                }
            }
            if (tpm.length > 0) this.drawSomeMarkers(tpm);
        }
    }

    api(province, district, commune) {
        const key = province + district + commune;
        this.clearLayers();
        if (f0MarkerData.get(key) == undefined) {
            const parram = `tinh=${province}&huyen=${district}&xa=${commune}`;
            call_host_api('getF0Points', parram, this.do, 'F0PointControler')
                // this.do(f0PointsResponse);
        } else {
            this.drawMarkers(key);
        }
    }

    clearLayers() {
        f0MarkersLayer.clearLayers();
    }
}

var f0PointControler = null;

if (kernel.checkMode(F0PointControler.prototype.constructor.name))
    f0PointControler = kernel.addClass(new F0PointControler());