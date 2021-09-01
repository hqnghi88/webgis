// dữ liệu chỉ số nguy cơ lịch sử 10 ngày
var dataCsrAllHis = new Map();
// dữ liệu điểm nguy cơ ngày hiện tại
var data_core = new Map();
var down_circular_path = 'images/down-circular-24.png';
var up_circular_path = 'images/up-circular-24.png';
var equal_circular_path = 'images/minus-8-24.png';
class BaseHisNguyCoLoader {
    constructor() {
        this.Labels = [];
    }
    clearLabels() {
        while (this.Labels.length > 0) {
            this.Labels.pop();
        }
    }
    api(layerId) {

        if (layerId == 1) {
            console.log("Call API cho Tinh:" + layerId);
            //call_api('1JLtciuvSKkgn2ccZQmRIZTPU3x0cDeaNp7KFipBocAY', layerId,
            //this.do, this.constructor.name);
            call_host_api('getNguyCoMucDo/tinh', null, this.do, 'CALL API Tinh');
        }
        if (layerId == 2) {
            // call_api('1JLtciuvSKkgn2ccZQmRIZTPU3x0cDeaNp7KFipBocAY', layerId,
            //this.do, this.constructor.name);
            call_host_api('getNguyCoMucDo/huyen', null, this.do, 'CALL API Huyen');
        }
        if (layerId == 3) {
            // call_api('1JLtciuvSKkgn2ccZQmRIZTPU3x0cDeaNp7KFipBocAY', layerId,
            // this.do, this.constructor.name);

            call_host_api('getNguyCoMucDo/xa', null, this.do, 'CALL API Huyen');
        }
    }
    show(administrative_level) {
        return `
        <table id='customers' style="width: 680">
            <tr><th>
            Lịch sử mức nguy cơ ${administrative_level} trong 10 ngày qua
            <a data-toggle="collapse" href="#divNguyCoToanQuoc" aria-expanded="true" 
            aria-controls="divNguyCoToanQuoc">
                <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
            </a>
            </th></tr>
        </table>
        <div id="divNguyCoToanQuoc" style="width: 680;border-style: outset;" class="collapse show">	
            <canvas id="nguyCoToanQuoc" width="680"></canvas>
        </div>
        `;
    }

    _getLables(province, district, commune) {
        var key = province + district + commune;
        var mykey = province;
        if (district != '') mykey = province + ' ' + district;
        if (commune != '') mykey = province + ' ' + district + ' ' + commune;

        const map = key == '' ? mapVN['VN'] : mapVN[mykey];
        if (map) {
            map.sort(function (x, y) {
                let a = (data_core.get(key + x)),
                    b = (data_core.get(key + y));
                if (("" + a) === "undefined") { a = 0.0; }
                if (("" + b) === "undefined") { b = 0.0; }
                if ((b - a) == 0) {
                    const f0x = getF0(data_f0, x);
                    const f0y = getF0(data_f0, y);
                    return f0y - f0x;
                }
                return b - a;
            });
            return map;
        }
        //console.log('BaseHisNguyCoLoader._getLables', mykey);        
    }

    show(administrative_level, province, district, commune) {
        this.my_lables = this._getLables(province, district, commune);
        var key = province + district + commune;
        var content = '';
        for (var i = 0; i < this.my_lables.length; i++) {
            const child = this.my_lables[i];
            const current_core = data_core.get(key + child);
            const hisCrs = dataCsrAllHis.get(key + child);
            //console.log('show', key + child);
            var old_core = current_core;
            if (hisCrs)
                if (hisCrs.length - 2 > 0)
                    old_core = hisCrs[hisCrs.length - 2];
            var image_align = "";
            if (current_core < old_core)
                image_align = down_circular_path;
            else
                if (current_core == old_core)
                    image_align = equal_circular_path;
                else
                    image_align = up_circular_path;

            image_align = `<img width="24" alt="Hướng thay đổi nguy cơ" 
                            title="Hướng thay đổi nguy cơ"
                            src="${image_align}"></img>`;
            if (current_core != 'undefined') {
                if (i <= 3) {
                    content += `<tr>
                                <td>
                                    ${this.my_lables[i]}
                                </td>
                                <td>
                                ${image_align} <i style="background:${getColor(current_core)};color:white">
                                    &nbsp;${getRisk(current_core)}&nbsp;
                                </i>                                
                                </td>
                                <td>
                                    <canvas id="bieudonguyco${i}" width="150"></canvas>
                                </td>
                            </tr>`;
                }
                if (i > 3) {
                    content += `<tr class="nguyco hidden">
                        <td>
                            ${this.my_lables[i]}
                        </td>
                        <td>
                        ${image_align} <i style="background:${getColor(current_core)};color:white">
                            &nbsp;${getRisk(current_core)}&nbsp;
                        </i>                        
                        </td>
                        <td>
                            <canvas id="bieudonguyco${i}" width="150"></canvas>
                        </td>
                    </tr>`;
                }
            }
        }
        if (content == '')
            return '';
        return `
        <table id='customers' style="width: 680">
            <tr><th>
            Lịch sử mức nguy cơ ${administrative_level} trong 10 ngày qua
            <a data-toggle="collapse" href="#divNguyCoToanQuoc" aria-expanded="true" 
            aria-controls="divNguyCoToanQuoc">
                <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
            </a>
            </th></tr>
        </table>
        <div id="divNguyCoToanQuoc" style="width: 680;border-style: outset;" class="collapse show">	
            <div>
                <table id='customers' style="width: 678">
                    <colgroup>
                        <col span='1' style='width: 50%;'>
                        <col span='1' style='width: 30%;'>
                        <col span='1' style='width: 20%;'>
                    </colgroup>
                    <tr>
                        <th>Địa phương</th>
                        <th>Mức nguy cơ</th>
                        <th>Biểu đồ nguy cơ</th>
                    </tr>
                    <tbody>
                    ${content}
                    </tbody>
                    <tfoot>
                        <tr>
                        <td colspan="3" id="display-nguyco">
                            ... 
                            <a href="#">nhấn để xem thêm</a></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        `;
    }

    setup(province, district, commune) {
        var key = province + district + commune;
        // var my_lables = this._getLables(province, district, commune);
        var options = {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 4,
                    min: 0,
                    ticks: {
                        stepSize: 1
                    }
                },
                x: {
                    stacked: false,
                    display: false
                }
            },
        };

        const colors = panelUtil.getRangeColors();
        // console.log('getRangeColors', key, colors.length, this.Labels, this.my_lables);
        // var my_data = [];
        // for (var i = 0; i < this.Labels.length; i++) {
        //     var tpm = [];
        //     for (var j = 0; j < this.my_lables.length; j++) {
        //         const child = this.my_lables[j];
        //         const data = dataCsrAllHis.get(key + child);
        //         if (data) tpm.push(getNguyCo(data[i]));
        //     }
        //     my_data.push(tpm);
        // }
        for (var i = 0; i < this.my_lables.length; i++) {
            const child = this.my_lables[i];
            if (data_core.get(key + child) > 0 && data_core.get(key + child) != 'undefined' && data_core.get(key + child) > 1) {
                var ctx = document.getElementById(`bieudonguyco${i}`).getContext("2d");
                const _data = dataCsrAllHis.get(key + child);

                var standard_data = [];
                if (_data)
                    for (var j = 0; j < _data.length; j++) {
                        standard_data.push(getNguyCo(_data[j]));
                    }

                var chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: this.Labels,
                        datasets: [{
                            label: this.my_lables[i],
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                            fill: false,
                            data: standard_data,
                        }],
                    },
                    options: options
                });
                chart.update();
            }
        }
    }
}

var setlaybel = false;
class HisNguyCoTinhLoader extends BaseHisNguyCoLoader {
    constructor() {
        super();
        this.api(1);
    }

    do(data) {
        var results = data.data;
        //console.log(JSON.stringify(results));       
        // hisNguyCoTinhLoader.clearLabels();


        for (var i = 0; i < results.length; i++) {
            var tinh = results[i];
            var dates = tinh.dates;
            var datas = tinh.datas;
            if (i == 0) {
                hisNguyCoTinhLoader.clearLabels();
                for (var j = 0; j < dates.length; j++) {
                    var d = dates[j];
                    //d =d.replace("/","-");
                    hisNguyCoTinhLoader.Labels.push(d);
                    //console.log("A:["+j+"]"+d );
                }
            }

            const province = tinh.tinhCongBo;
            //	console.log("C:"+province);
            var tmp = [];
            for (var j = 0; j < datas.length; j++) {
                tmp.push(parseFloat(datas[j]));
                //console.log("B["+i+"]["+j+"]:"+datas[j]);
            }

            data_core.set(province, tmp[tmp.length - 1]);
            dataCsrAllHis.set(province, tmp);


        }

    }
}



var hisNguyCoTinhLoader = null;
if (kernel.checkMode(HisNguyCoTinhLoader.prototype.constructor.name))
    hisNguyCoTinhLoader = kernel.addClass(new HisNguyCoTinhLoader());

class HisNguyCoHuyenLoader extends BaseHisNguyCoLoader {
    constructor() {
        super();
        this.api(2);
    }

    // doDataHisHuyen
    do(data) {
        var results = data.data;
        //console.log(JSON.stringify(results));   
        hisNguyCoHuyenLoader.clearLabels();
        for (var i = 0; i < results.length; i++) {
            var huyen = results[i];
            var dates = huyen.dates;
            var datas = huyen.datas;
            if (i == 0) {
                for (var j = 0; j < dates.length; j++) {
                    var d = dates[j];
                    //d =d.replace("/","-");
                    hisNguyCoHuyenLoader.Labels.push(d);
                    //console.log("A:["+j+"]"+d );
                }
            }


            var tmp = [];
            for (var j = 0; j < datas.length; j++) {
                tmp.push(parseFloat(datas[j]));
                //console.log("B["+i+"]["+j+"]:"+datas[j]);        
                const province = huyen.tinhCongBo;
                const district = huyen.huyenCongBo;
                data_core.set(province + district, tmp[tmp.length - 1]);
                dataCsrAllHis.set(province + district, tmp);
            }
        }
        console.log('hisNguyCoHuyenLoader loaded data');

    }
}



var hisNguyCoHuyenLoader = null;
if (kernel.checkMode(HisNguyCoHuyenLoader.prototype.constructor.name))
    hisNguyCoHuyenLoader = kernel.addClass(new HisNguyCoHuyenLoader());

class HisNguyCoXaLoader extends BaseHisNguyCoLoader {
    constructor() {
        super();
        this.api(3);
    }

    // doDataHisXa
    do(data) {
        var results = data.data;
        //alert(JSON.stringify(results));
        //console.log(JSON.stringify(results));  
        hisNguyCoXaLoader.clearLabels();
        for (var i = 0; i < results.length; i++) {
            var xa = results[i];
            var dates = xa.dates;
            var datas = xa.datas;
            if (i == 0) {
                for (var j = 0; j < dates.length; j++) {
                    var d = dates[j];
                    //d =d.replace("/","-");
                    hisNguyCoXaLoader.Labels.push(d);
                    //console.log("A:["+j+"]"+d );
                }
            }


            var tmp = [];
            for (var j = 0; j < datas.length; j++) {
                tmp.push(parseFloat(datas[j]));
                //console.log("B["+i+"]["+j+"]:"+datas[j]);    


                const province = xa.tinhCongBo;
                const district = xa.huyenCongBo;
                const commune = xa.xaCongBo;
                data_core.set(province + district + commune, tmp[tmp.length - 1]);
                dataCsrAllHis.set(province + district + commune, tmp);
            }
        }
        //console.log('hisNguyCoXaLoader loaded data');
        if (!mobility_loaded) zoom_based_layerchange(false);        
    }
}



var hisNguyCoXaLoader = null;
if (kernel.checkMode(HisNguyCoXaLoader.prototype.constructor.name))
    hisNguyCoXaLoader = kernel.addClass(new HisNguyCoXaLoader());