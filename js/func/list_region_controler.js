var is_add_lable_tinh = false;
var tag_image_path = 'images/response.png';
var image_share_path = 'images/share-icon.png';
var markerListLayer = [];
var isF0Mode = false;
class ListRegionControler {
    constructor() {
        this.Data = HANH_CHINH;
    }
    addControl(map) {
        L.easyButton('<h3>F</h3>', function() {
            isF0Mode = !isF0Mode;
            if (!isF0Mode) {
                listRegionControler.clearTotalF0LabelLayer();
            } else {
                if (clicked_province == '') {
                    listRegionControler.addLabelProvincesMap();
                } else {
                    if (clicked_district == '') {
                        listRegionControler.addLabelDistrictsMap(clicked_province);
                    } else {
                        listRegionControler.addLabelWardsMap(clicked_province, clicked_district);
                    }
                }
            }
        }, "Xem tổng F0 tại bản đồ").addTo(map);
    }
    _getItemTagDiaPhuong(parent, item, fit_zoom_func, i) {
        // console.log('getItemTagDiaPhuong', item);
        const color = getColor(data_core.get(parent + item))
        const f0text = getF0(data_f0, parent + item);
        const host = parent != '' ?
            `?p=${parent}&d=${item}` :
            `?p=${item}`;
        const share_text = `<a href="${host}" target="_blank">
                                <img width="14" alt="chia sẻ liên kết" title="chia sẻ liên kết"
                                src="${image_share_path}" style="float: right;">
                            </a>`;
        // tạm thời bỏ chức năng này
        const bien_phap_text = `<a href="#" id="pop${i}">
                                    <img width="14" alt="Biện pháp đáp ứng" 
                                    title="Biện pháp đáp ứng"
                                    src="${tag_image_path}" style="float: right;">
                                </a>`;
        const content = parent != '' ? bien_phap_text : share_text;
        return `
                <i style="background:${color};color:white">&nbsp;${i + 1}&nbsp;</i>
                <a href="#" onclick="return ${fit_zoom_func};">${item}</a> (F0:${f0text})
                ${content}                
                `;
    }

    _createdMaker(point, f0) {
        var marker = L.marker([point['lat'], point['lng']], {
            icon: L.divIcon({
                className: 'text-labels', // Set class for CSS styling
                html: `<b style="background-color: darkmagenta;">&nbsp;${f0}&nbsp;</b>`
            }),
            zIndexOffset: 1000 // Make appear above other map features
        });
        // console.log('marker', marker);
        marker.addTo(Lmap);
        markerListLayer.push(marker);
    }

    clearTotalF0LabelLayer() {
        while (markerListLayer.length > 0) {
            const marker = markerListLayer.pop();
            Lmap.removeLayer(marker);
        }
    }

    _preloading() {
        var data = new Map();
        for (var i = 0; i < ATCOVID_PROVINCES.length; i++) {
            const province = ATCOVID_PROVINCES[i];
            var districts = [];
            for (var j = 0; j < ATCOVID_DISTRICT.length; j++) {
                const district = ATCOVID_DISTRICT[j];
                if (province['id'] == district['parent_id']) {
                    districts.push(district);
                    var wards = [];
                    for (var k = 0; k < ATCOVID_WARDS.length; k++) {
                        const ward = ATCOVID_WARDS[k];
                        if (district['id'] == ward['parent_id']) {
                            wards.push(ward);
                        }
                    }
                    data.set(province['name'] + district['name'], wards);
                }
            }
            data.set(province['name'], districts);
        }
        return data;
    }
    addLabelLayerMap(layerId) {
        if (isF0Mode)
            switch (layerId) {
                case 1:
                    this.addLabelProvincesMap();
                    break;
                case 2:
                    this.addLabelDistrictsMap(clicked_province);
                    break;
                case 3:
                    this.addLabelWardsMap(clicked_province, clicked_district);
                    break;
                default:
                    this.addLabelProvincesMap(clicked_province);
            }
        else {
            this.clearTotalF0LabelLayer();
        }
    }
    addLabelProvincesMap() {
        this.clearTotalF0LabelLayer();
        // console.log('addLabelProvincesMap', ATCOVID_PROVINCES.length)
        const provinces = this.Data['Việt Nam'];
        for (var i = 0; i < provinces.length; i++) {
            const point = provinces[i];
            var f0 = getF0(data_f0, point['name']);
            this._createdMaker(point, f0);
        }
    }

    addLabelDistrictsMap(province) {
        this.clearTotalF0LabelLayer();
        const disttricts = this.Data[province];
        console.log('addLabelDistrictsMap', province, disttricts);
        for (var i = 0; i < disttricts.length; i++) {
            const point = disttricts[i];
            const f0 = getF0(data_f0, province + point['name']);
            this._createdMaker(point, f0);
        }
    }

    addLabelWardsMap(province, district) {
        this.clearTotalF0LabelLayer();
        const wards = this.Data[province + district];
        console.log('addLabelWardsMap', province, district, wards);
        for (var i = 0; i < wards.length; i++) {
            const ward = wards[i];
            const f0 = getF0(data_f0, province + district + ward['name']);
            this._createdMaker(ward, f0);
        }
    }

    provinces() {
        var map = mapVN['VN'];
        var str = `
        <table id='customers' style="width: 680">
            <tr><th>
            Danh sách các tỉnh có nguy cơ từ cao đến thấp
            <a data-toggle="collapse" href="#collapseOne" aria-expanded="true" 
            aria-controls="collapseOne">
                <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i> 
            </a>
            </th><tr/>
        </table>
        <div id="collapseOne" style="width: 680" class="collapse show">
        <table id='customers' style="width: 680">
            <tbody>`;

        map.sort(function(x, y) {
            let a = (data_core.get(x)),
                b = (data_core.get(y));
            if (("" + a) === "undefined") { a = 0.0; }
            if (("" + b) === "undefined") { b = 0.0; }
            if ((b - a) == 0) {
                const f0x = getF0(data_f0, x);
                const f0y = getF0(data_f0, y);
                return f0y - f0x;
            }
            return b - a;
        });

        for (var i = 0; i < map.length; i += 3) {
            var province = map[i];
            var fit_zoom_func = `fit_zoom_to1('${province}')`;
            str += (i < 12) ? '<tr><td>' : `<tr><td class="nguyco1 hidden">`
            str += this._getItemTagDiaPhuong('', province, fit_zoom_func, i);
            str += (i < 12) ? '</td><td>' : '</td><td class="nguyco1 hidden">';
            if ((i + 1) < map.length) {
                province = map[i + 1];
                var fit_zoom_func = `fit_zoom_to1('${province}')`;
                str += this._getItemTagDiaPhuong('', province, fit_zoom_func, i + 1);
            }
            str += (i < 12) ? '</td><td>' : `</td><td class="nguyco1 hidden">`
            if ((i + 2) < map.length) {
                province = map[i + 2];
                var fit_zoom_func = `fit_zoom_to1('${province}')`;
                str += this._getItemTagDiaPhuong('', province, fit_zoom_func, i + 2);;
            }
            str += '</td></tr>';
        }
        str += `
        </tbody>
        <tfoot>
            <tr>
            <td colspan="3" id="display">
                ... 
                <a href="#">nhấn để xem thêm</a></td>
            </tr>
        </tfoot>
    </table></div>`;
        str = str + panelUtil.createdBienPhapModal();
        str = str.replaceAll("undefined", "");
        return str;
    }
    districts(province) {
        var map = mapVN[province];
        const color = getColor(data_core.get(province));
        var f0text = getF0(data_f0, province);
        if (province == "Cần Thơ") {
            f0text = "" + cantho_f0 + ", tăng " + cantho_f0_inc + " | F1:" + cantho_f1 + " | F2:" + cantho_f2 + " | F3:" + cantho_f3;
        }
        var str = `
        <table id='customers' style="width: 680">
            <tr><th>
            <i style="background:${color}">&nbsp;&nbsp;&nbsp;</i>&nbsp;
            ${province} (F0: ${f0text}),
            <a style="color: #f8f8f8;text-decoration: underline;" href="" onclick="return fit_zoom_to_VN();">Việt Nam</a>, 
            <a style="color: #f8f8f8;text-decoration: underline;" href="#" id="pop">Biện pháp đáp ứng</a>
            <a data-toggle="collapse" href="#collapseOne1" aria-expanded="true" 
            aria-controls="collapseOne1">
                <i style="float: right;" class="fas fa-angle-up rotate-icon">&nbsp;</i> 
            </a>
            </th><tr/>
        </table>
        <div id="collapseOne1" style="width: 680" class="collapse show">
        <table id='customers' style="width: 680">`;

        map.sort(function(x, y) {
            let a = (data_core.get(province + x)),
                b = (data_core.get(province + y));
            if (("" + a) === "undefined") { a = 0.0; }
            if (("" + b) === "undefined") { b = 0.0; }
            return b - a;
        });

        for (var i = 0; i < map.length; i += 3) {
            var district = map[i];
            var fit_zoom_func = `fit_zoom_to2('${province}','${district}')`;
            str += '<tr><td>';
            str += this._getItemTagDiaPhuong(province, district, fit_zoom_func, i);
            str += '</td><td>';
            if ((i + 1) < map.length) {
                district = map[i + 1];
                var fit_zoom_func = `fit_zoom_to2('${province}','${district}')`;
                str += this._getItemTagDiaPhuong(province, district, fit_zoom_func, i + 1);
            }
            str += '</td><td>';
            if ((i + 2) < map.length) {
                district = map[i + 2];
                var fit_zoom_func = `fit_zoom_to2('${province}','${district}')`;
                str += this._getItemTagDiaPhuong(province, district, fit_zoom_func, i + 2);
            }
            str += '</td></tr>';
        }
        str += '</table></div>';
        str = str + panelUtil.createdBienPhapModal();

        return str.replaceAll("undefined", "");
    }
    communes(province, district) {
        var map = mapVN[province + " " + district];
        var parent = province + district;

        const color = getColor(data_core.get(province));
        const color_district = getColor(data_core.get(province + district));
        var f0text = getF0(data_f0, province);
        if (province == "Cần Thơ") {
            f0text = "" + cantho_f0 + ", tăng " + cantho_f0_inc + " | F1:" + cantho_f1 + " | F2:" + cantho_f2 + " | F3:" + cantho_f3;
        }
        const f0text_district = getF0(data_f0, province + district);
        var fit_zoom_func = `fit_zoom_to1('${province}')`;
        var str = `
        <table id='customers' style="width: 680">
            <tr><th>
                <i style="background:${color_district}">&nbsp;&nbsp;&nbsp;</i>${district}
                &nbsp;(F0: ${f0text_district}), 
                <i style="background:${color}">&nbsp;&nbsp;&nbsp;</i>&nbsp;
                <a style="color: #f8f8f8;text-decoration: underline;" href="" onclick="return ${fit_zoom_func};">${province}</a>&nbsp;
                (F0: ${f0text}),
                <a style="color: #f8f8f8;text-decoration: underline;" href="#" id="pop">Biện pháp đáp ứng</a>
                <a data-toggle="collapse" href="#collapseOne1" 
                    aria-expanded="true" aria-controls="collapseOne1">
                    <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i> 
                </a>
            </th><tr/></table>
        <div id="collapseOne1" style="width: 680" class="collapse show">
            <table id='customers' style="width: 680">`;

        map.sort(function(x, y) {
            let a = (data_core.get(parent + x)),
                b = (data_core.get(parent + y));
            if (("" + a) === "undefined") { a = 0.0; }
            if (("" + b) === "undefined") { b = 0.0; }
            return b - a;
        });

        for (var i = 0; i < map.length; i += 3) {
            var commune = map[i];
            fit_zoom_func = `fit_zoom_to3('${province}','${district}','${commune}')`;
            str += '<tr><td>'
            str += this._getItemTagDiaPhuong(parent, commune, fit_zoom_func, i);
            str += '</td><td>';
            if ((i + 1) < map.length) {
                commune = map[i + 1];
                fit_zoom_func = `fit_zoom_to3('${province}','${district}','${commune}')`;
                str += this._getItemTagDiaPhuong(parent, commune, fit_zoom_func, i + 1);
            }
            str += '</td><td>';
            if ((i + 2) < map.length) {
                commune = map[i + 2];
                fit_zoom_func = `fit_zoom_to3('${province}','${district}','${commune}')`;
                str += this._getItemTagDiaPhuong(parent, commune, fit_zoom_func, i + 2);
            }
            str += '</td></tr>';
        }
        str += '</table></div>';
        str = str + panelUtil.createdBienPhapModal();
        return str.replaceAll("undefined", "");
    }
    showCommune(province, district, commune) {
        const color = getColor(data_core.get(province));
        const color_district = getColor(data_core.get(province + district));
        const f0text = getF0(data_f0, province);
        const f0text_district = getF0(data_f0, province + district);
        var fit_zoom_to2 = `fit_zoom_to2('${province}', '${district}')`;
        var fit_zoom_to1 = `fit_zoom_to1('${province}')`;
        return `
            <table id='customers' style="width: 680">
                <tr><th>
                    ${commune}&nbsp;
                    <i style="background:${color_district}">&nbsp;&nbsp;&nbsp;</i>&nbsp;
                    <a style="color: #f8f8f8;text-decoration: underline;" href="" onclick="return ${fit_zoom_to2};">${district}</a>&nbsp;
                    (F0: ${f0text_district}),
                    <i style="background:${color}">&nbsp;&nbsp;&nbsp;</i>&nbsp;
                    <a style="color: #f8f8f8;text-decoration: underline;" href="" onclick="return ${fit_zoom_to1};">${province}</a>
                    &nbsp;(F0: ${f0text}), 
                    <a style="color: #f8f8f8;text-decoration: underline;" href="#" id="pop">Biện pháp đáp ứng</a>            
                </th><tr/>
            </table>` + panelUtil.createdBienPhapModal();
    }
}

listRegionControler = null;
if (kernel.checkMode(ListRegionControler.prototype.constructor.name))
    listRegionControler = kernel.addClass(new ListRegionControler());