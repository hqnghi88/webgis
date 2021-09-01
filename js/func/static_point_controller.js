var isStaticPointMode = false;
class StaticPointController {
    constructor() {
        this.data = new Map();
        this.data.set('diem_tiem_trung', diem_tiem_chung);
    }

    addControl(map) {        
        L.easyButton('<h3>V</h3>', function () {
            if (!isStaticPointMode) {
                staticPointController.clearLayers();
                staticPointController.draw();
            }
            else{
                staticPointController.clearLayers();
            }
            isStaticPointMode = !isStaticPointMode;
        }, "Hiển thị các loại địa điểm khác trên bản đồ").addTo(map);
    }
    clearLayers() {
        staticPointMarkersLayer.clearLayers();
    }
    drawSomeMarkers(type, data) {
        console.log(type, data);
        var greenIcon = L.icon({
            iconUrl: 'images/DIEMTIEMCHUNG.png',
            shadowUrl: 'images/marker_shadow.png',

            iconSize: [23, 24], // size of the icon
            shadowSize: [41, 41], // size of the shadow
            iconAnchor: [11, 22], // point of the icon which will correspond to marker's location
            shadowAnchor: [2, 40],  // the same for the shadow
            popupAnchor: [-2, -22] // point from which the popup should open relative to the iconAnchor
        });
        for (var i = 0; i < data.length; i++) {
            // console.log(data[i]);
            var marker = new L.Marker([data[i]['lat'], data[i]['lng']], { icon: greenIcon });
            marker.bindPopup(`
                loại địa điểm: ${type} <br/>
                vùng: ${data[i]['are']} <br/>
                tên địa điểm: ${data[i]['name']}
            `);
            staticPointMarkersLayer.addLayer(marker);
        }
        staticPointMarkersLayer.addTo(Lmap);
    }
    draw(){
        const data = this.data.get('diem_tiem_trung');
        staticPointController.drawSomeMarkers("Điểm Tiêm Chủng", data);
    }
}

staticPointController = null;
if (kernel.checkMode(StaticPointController.prototype.constructor.name))
    staticPointController = kernel.addClass(new StaticPointController());