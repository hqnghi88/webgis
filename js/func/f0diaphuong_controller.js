class BaseNguyCoController {
    constructor() {
        this.data = new Map();
    }
    call_host_api(path, parram, callback, name) {
        // Dữ liệu di biến động của từng tỉnh
        const link = `${API_NGUYCO_HOST}/${path}?${parram}`;
        $.ajax({
            url: link,
            statusCode: {
                404: function () {
                    console.log(name, "page not found");
                },
                403: function () {
                    console.log(name, "403 Forbidden Mã phản hồi trạng thái lỗi máy khách HTTP chỉ ra rằng máy chủ hiểu yêu cầu nhưng từ chối cho phép nó.");
                }
            },
            success: callback
        }).always(function () {
            console.log(link);
            console.log(name, " load complete!!");
        });
    }
    baseDo(data) {
        const parram_key = Object.keys(data['parrams']);
        var parrams = [];
        for (var i = 0; i < parram_key.length; i++) {
            parrams.push(data['parrams'][parram_key[i]]);
        }
        var key = parrams.join('');
        key = key == '' ? 'Việt Nam' : key;
        console.log('BaseNguyCoController.baseDo', key);
        this.data.set(key, data['data']);
        return parrams;
    }
}

class F0DiaPhuongController extends BaseNguyCoController {
    constructor() {
        super();
        this.dataTongCaNhiem = new Map();
        this.load('', '', '');
    }

    do(data) {
        const parrams = f0DiaPhuongController.baseDo(data);
        var key = data['parrams']['tinhCongBo'] +
            data['parrams']['huyenCongBo'] +
            data['parrams']['xaCongBo'];

        if (!data_f0.get(key == '' ? 'Việt Nam' : key))
            data_f0.set(key == '' ? 'Việt Nam' : key, data['tongCaNhiem'][0]);
        const mydata = data['data'];
        for (var i = 0; i < mydata.length; i++) {
            const childKey = key + mydata[i]['diaphuong'];
            if (!data_f0.get(childKey))
                data_f0.set(childKey, mydata[i]['tongCa']);
        }
        if (isF0Mode) {
            if (clicked_province == '') {
                if (listRegionControler) listRegionControler.addLabelProvincesMap();
            } else {
                if (clicked_district == '') {
                    if (listRegionControler) listRegionControler.addLabelDistrictsMap(clicked_province);
                } else {
                    if (listRegionControler) listRegionControler.addLabelWardsMap(clicked_province, clicked_district);
                }
            }
        }
        // console.log('F0DiaPhuongController.do', data_f0);
        if (parrams.join('') != '') {
            f0DiaPhuongController.setup(parrams.join(''));
            f0DiaPhuongController.loadInfo(
                data['parrams']['tinhCongBo'],
                data['parrams']['huyenCongBo'],
                data['parrams']['xaCongBo']);
        }
    }

    load(province, district, commune) {
        const parram = `tinh=${province}&huyen=${district}&xa=${commune}`;
        this.call_host_api('getTongCa', parram, this.do, 'f0DiaPhuongController');
    }

    show(title) {
        return `
        <table id='customers' style="width: 680">
            <tr><th>
            Tổng Ca nhiễm các ${title}
            <a data-toggle="collapse" 
                href="#divCaNhiemDiaPhuong" 
                    aria-expanded="true" 
                        aria-controls="divCaNhiemDiaPhuong">
                <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
            </a>
            </th></tr>
        </table>
        <div id="divCaNhiemDiaPhuong" style="width: 680;border-style: outset;" class="collapse show">	
            <canvas id="CaNhiemDiaPhuong" width="680"></canvas>
        </div>
        `;
    }

    setup(key) {
        if (!this.data.get(key)) {
            console.log('f0DiaPhuongController.setup', key);
            return;
        }
        if (!document.getElementById('CaNhiemDiaPhuong')) {
            console.log('CaNhiemDiaPhuong is null', key);
            return;
        }
        if (this.chart != null) {
            this.chart.destroy();
        }
        const title = "Ca nhiễm";
        const data = this.data.get(key);
        data.sort(function (x, y) {
            return y['tongCa'] - x['tongCa'];
        });
        var labels = [];
        var values = [];
        // console.log('f0DiaPhuongController.setup', data);
        for (var i = 0; i < 25 && i < data.length; i++) {
            if (data[i]['diaphuong'] != '') {
                labels.push(data[i]['diaphuong']);
                values.push(data[i]['tongCa']);
            }
        }
        var ctx = document.getElementById('CaNhiemDiaPhuong').getContext("2d");
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    data: values,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                indexAxis: 'y',
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            autoSkip: false
                        }
                    },
                    x: {
                        ticks: {
                            stepSize: 500
                        }
                    }
                }
            }
        });
    }
    showInfo() {
        return `<div id="divInfo"></div>`;
    }
    loadInfo(province, district, commune) {
        var content = '';
        if (province == '') {
            if (listRegionControler)
                content = listRegionControler.provinces();
        }
        else {
            if (district == '') {
                if (listRegionControler)
                    content = listRegionControler.districts(province);
            }
            else {
                if (commune == '') {
                    if (listRegionControler)
                        content = listRegionControler.communes(province, district);
                }
                else {
                    if (listRegionControler)
                        content = listRegionControler.showCommune(province, district, commune);
                }
            }
        }
        document.getElementById("divInfo").innerHTML = content;
        showBienPhapModalOnClick(province, district, commune);
    }
}
var f0DiaPhuongController = null;
if (kernel.checkMode(F0DiaPhuongController.prototype.constructor.name))
    f0DiaPhuongController = kernel.addClass(new F0DiaPhuongController());