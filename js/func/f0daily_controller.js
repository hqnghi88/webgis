class F0BaseDailyController {
    constructor() {
        this.dataLuyKe = new Map();
        this.dataTheoNgay = new Map();
        this.Labels = new Map();

    }



    api(layerId) {

        if (layerId == 1) {
            const parram = `tinh=&huyen=&xa=`;
            call_host_api('getTongCaNgay', parram, this.do, 'getTongCaNgay');
        }
        if (layerId == 2) {

            call_host_api('getCaNhiemHistory/tinh', null, this.do, 'CALL API dienGiaiNguyCo Tinh');
        }
        if (layerId == 3) {
            call_host_api('getCaNhiemHistory/huyen', null, this.do, 'CALL API dienGiaiNguyCo huyen');


        }
        if (layerId == 4) {
            call_host_api('getCaNhiemHistory/xa', null, this.do, 'CALL API dienGiaiNguyCo xa');


        }
    }



    show() {
        return (province == "Cần Thơ") ? `
        <table id='customers' style="width: 680">
            <tr><th>
                Thống kê ca nhiễm
                <a data-toggle="collapse" href="#divF0daily1"
                    aria-expanded="true" aria-controls="divF0daily1">
                    <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
                </a>
            </th></tr>
        </table>
            <div id="divF0daily1" class="collapse show">
            <embed width="680" height="381" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTxWXFzYxXKRhN0NdqcJ3LXxi6N_IVMOoyv6iyU_GK1DgV4qU-YPd1rs9cLlrGIJSNBl6knnRPjn_fL/pubchart?oid=1665116754&format=interactive"/>
            <embed width="680" height="381" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTxWXFzYxXKRhN0NdqcJ3LXxi6N_IVMOoyv6iyU_GK1DgV4qU-YPd1rs9cLlrGIJSNBl6knnRPjn_fL/pubchart?oid=1893528419&format=interactive"/>
            </div> 
            <table id='customers' style="width: 680">
                <tr><th>
                    Thống kê Số ca theo Quận/Huyện
                    <a data-toggle="collapse" href="#divF0daily2"
                        aria-expanded="true" aria-controls="divF0daily2">
                        <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
                    </a>
                </th></tr>
            </table>
            <div id="divF0daily2" class="collapse show">
                <embed width="680" height="381"  src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTxWXFzYxXKRhN0NdqcJ3LXxi6N_IVMOoyv6iyU_GK1DgV4qU-YPd1rs9cLlrGIJSNBl6knnRPjn_fL/pubchart?oid=786437762&format=interactive" />
            </div>
            <table id='customers' style="width: 680">
                <tr><th>
                    Thống kê Số ca F0 theo đối tượng lấy mẫu
                    <a data-toggle="collapse" href="#divF0daily3"
                        aria-expanded="true" aria-controls="divF0daily3">
                        <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
                    </a>
                </th></tr>
            </table>
            <div id="divF0daily3" class="collapse show">
                <embed width="680" height="381" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTxWXFzYxXKRhN0NdqcJ3LXxi6N_IVMOoyv6iyU_GK1DgV4qU-YPd1rs9cLlrGIJSNBl6knnRPjn_fL/pubchart?oid=80648299&format=interactive"/>
            </div>
            <table id='customers' style="width: 680">
                <tr><th>
                    Số ca theo loại đối tượng trong ngày
                    <a data-toggle="collapse" href="#divF0daily4"
                        aria-expanded="true" aria-controls="divF0daily4">
                        <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
                    </a>
                </th></tr>
            </table>
            <div id="divF0daily4" class="collapse show">
                <embed width="680" height="381" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTxWXFzYxXKRhN0NdqcJ3LXxi6N_IVMOoyv6iyU_GK1DgV4qU-YPd1rs9cLlrGIJSNBl6knnRPjn_fL/pubchart?oid=1875544988&format=interactive"/>
            </div><table id='customers' style="width: 680">
            <tr><th>
                Tỉ lệ loại đối tượng trong ngày
                <a data-toggle="collapse" href="#divF0daily4"
                    aria-expanded="true" aria-controls="divF0daily4">
                    <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
                </a>
            </th></tr>
        </table>
        <div id="divF0daily4" class="collapse show">
            <embed width="680" height="381" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTxWXFzYxXKRhN0NdqcJ3LXxi6N_IVMOoyv6iyU_GK1DgV4qU-YPd1rs9cLlrGIJSNBl6knnRPjn_fL/pubchart?oid=465831760&format=interactive"/>
        </div>
            <table id='customers' style="width: 680">
                <tr><th>
                    Phân bố loại đối tượng theo Quận/Huyện
                    <a data-toggle="collapse" href="#divF0daily4"
                        aria-expanded="true" aria-controls="divF0daily4">
                        <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
                    </a>
                </th></tr>
            </table>
            <div id="divF0daily4" class="collapse show">
                <embed width="680" height="381" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTxWXFzYxXKRhN0NdqcJ3LXxi6N_IVMOoyv6iyU_GK1DgV4qU-YPd1rs9cLlrGIJSNBl6knnRPjn_fL/pubchart?oid=924129618&format=interactive"/>
            </div>
            <table id='customers' style="width: 680">
                <tr><th>
                    Loại đối tượng phát sinh trong ngày của Quận/Huyện
                    <a data-toggle="collapse" href="#divF0daily4"
                        aria-expanded="true" aria-controls="divF0daily4">
                        <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
                    </a>
                </th></tr>
            </table>
            <div id="divF0daily4" class="collapse show">
                <embed width="680" height="381" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTxWXFzYxXKRhN0NdqcJ3LXxi6N_IVMOoyv6iyU_GK1DgV4qU-YPd1rs9cLlrGIJSNBl6knnRPjn_fL/pubchart?oid=2071632541&format=interactive"/>
            </div>
            <table id='customers' style="width: 680">
                <tr><th>
                    Diễn biến loại đối tượng
                    <a data-toggle="collapse" href="#divF0daily4"
                        aria-expanded="true" aria-controls="divF0daily4">
                        <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
                    </a>
                </th></tr>
            </table>
            <div id="divF0daily4" class="collapse show">
                <embed width="680" height="381" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTxWXFzYxXKRhN0NdqcJ3LXxi6N_IVMOoyv6iyU_GK1DgV4qU-YPd1rs9cLlrGIJSNBl6knnRPjn_fL/pubchart?oid=338359430&format=interactive"/>
            </div>
            <table id='customers' style="width: 680">
                <tr><th>
                    Tổng số ca và số ca khởi phát theo ngày
                    <a data-toggle="collapse" href="#divF0daily5"
                        aria-expanded="true" aria-controls="divF0daily5">
                        <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
                    </a>
                </th></tr>
            </table>
            <div id="divF0daily5" class="collapse show">
            <embed width="680" height="381" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTxWXFzYxXKRhN0NdqcJ3LXxi6N_IVMOoyv6iyU_GK1DgV4qU-YPd1rs9cLlrGIJSNBl6knnRPjn_fL/pubchart?oid=1303277702&format=interactive"/>
            </div>            
            <table id='customers' style="width: 680">
                <tr><th>
                    Diễn biến Quận/Huyện có nhiều hơn 100 F0
                    <a data-toggle="collapse" href="#divF0daily5"
                        aria-expanded="true" aria-controls="divF0daily5">
                        <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
                    </a>
                </th></tr>
            </table>
            <div id="divF0daily5" class="collapse show">
            <embed width="680" height="381" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTxWXFzYxXKRhN0NdqcJ3LXxi6N_IVMOoyv6iyU_GK1DgV4qU-YPd1rs9cLlrGIJSNBl6knnRPjn_fL/pubchart?oid=1335066672&format=interactive"/>
            </div>            
            <table id='customers' style="width: 680">
                <tr><th>
                    Diễn biến Quận/Huyện có ít hơn 100 F0 (Vùng xanh)
                    <a data-toggle="collapse" href="#divF0daily7"
                        aria-expanded="true" aria-controls="divF0daily7">
                        <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
                    </a>
                </th></tr>
            </table>
            <div id="divF0daily7" class="collapse show">
                <embed width="680" height="381" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTxWXFzYxXKRhN0NdqcJ3LXxi6N_IVMOoyv6iyU_GK1DgV4qU-YPd1rs9cLlrGIJSNBl6knnRPjn_fL/pubchart?oid=1216617791&format=interactive"/>
            </div>
            <table id='customers' style="width: 680">
            <tr><th>
                Tổng số ca F0 của top 10 Xã/Phường
                <a data-toggle="collapse" href="#divF0daily6"
                    aria-expanded="true" aria-controls="divF0daily6">
                    <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
                </a>
            </th></tr>
            </table>
            <div id="divF0daily6" class="collapse show">
                <embed width="680" height="381" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTxWXFzYxXKRhN0NdqcJ3LXxi6N_IVMOoyv6iyU_GK1DgV4qU-YPd1rs9cLlrGIJSNBl6knnRPjn_fL/pubchart?oid=1812150302&format=interactive"/>
            </div>
            <table id='customers' style="width: 680">
                <tr><th>
                    Diễn biến Các cụm dịch lớn
                    <a data-toggle="collapse" href="#divF0daily6"
                        aria-expanded="true" aria-controls="divF0daily6">
                        <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
                    </a>
                </th></tr>
            </table>
            <div id="divF0daily6" class="collapse show">
            <embed width="680" height="381" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS-718BEhfl84s0tDXHFXiOJ2a4y4OPr1tACdluE9sJdXok748hNPpt8Taj_hhJwiZXeGAdyam-Q5C6/pubchart?oid=1251459786&format=interactive"/>
            </div> 
            <table id='customers' style="width: 680">
                <tr><th>
                    Diễn biến Các cụm dịch nhỏ
                    <a data-toggle="collapse" href="#divF0daily6"
                        aria-expanded="true" aria-controls="divF0daily6">
                        <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
                    </a>
                </th></tr>
            </table>
            <div id="divF0daily6" class="collapse show">
            <embed width="680" height="381" src=" https://docs.google.com/spreadsheets/d/e/2PACX-1vS-718BEhfl84s0tDXHFXiOJ2a4y4OPr1tACdluE9sJdXok748hNPpt8Taj_hhJwiZXeGAdyam-Q5C6/pubchart?oid=1533642458&format=interactive"/>
            </div> 
           
            <table id='customers' style="width: 680">
                <tr><th>
                    Diễn biến Xã/Phường có nhiều hơn 50 F0
                    <a data-toggle="collapse" href="#divF0daily6"
                        aria-expanded="true" aria-controls="divF0daily6">
                        <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
                    </a>
                </th></tr>
            </table>
            <div id="divF0daily6" class="collapse show">
            <embed width="680" height="381" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTxWXFzYxXKRhN0NdqcJ3LXxi6N_IVMOoyv6iyU_GK1DgV4qU-YPd1rs9cLlrGIJSNBl6knnRPjn_fL/pubchart?oid=1892958599&format=interactive"/>
            </div>
            ` : `
        <table id='customers' style="width: 680">
            <tr><th>
                Thống kê ca nhiễm
                <a data-toggle="collapse" href="#divF0daily"
                    aria-expanded="true" aria-controls="divF0daily">
                    <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
                </a>
            </th></tr>
        </table><div id="divF0daily" style="width: 680;border-style: outset;" class="collapse show">
            <canvas id="F0dailyChart" width="680" height="400"></canvas>
        </div>`;
    }

    setup(key) {
        var labels = this.Labels.get(key);
        var dataLuyKe = this.dataLuyKe.get(key);
        var dataTheoNgay = this.dataTheoNgay.get(key);

        if (!dataLuyKe) {
            // console.log('f0DailyController.setup', key);
            return;
        }
        if (!document.getElementById("F0dailyChart"))
            return;

        if (this.chart != null) {
            this.chart.destroy();
        }
        var canhiem_labels = [];
        var total_case_label = "Tổng số ca";
        var new_case_label = "Số ca theo ngày";
        var new_case_values = [];
        var total_case_values = [];
        //set label
        for (var i = 0; i < labels.length; i++) {
            canhiem_labels.push(labels[i]);

        }
        //caluyke
        for (var i = 0; i < dataLuyKe.length; i++) {
            total_case_values.push(dataLuyKe[i]);

        }

        for (var i = 0; i < dataTheoNgay.length; i++) {
            new_case_values.push(dataTheoNgay[i]);
        }

        var ctx = document.getElementById("F0dailyChart").getContext("2d");
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: canhiem_labels,
                datasets: [{
                        label: total_case_label,
                        data: total_case_values,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: new_case_label,
                        data: new_case_values,
                        backgroundColor: 'rgba(255, 205, 86, 0.2)',
                        borderColor: 'rgb(255, 205, 86)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

class F0DailyToanQuocController extends F0BaseDailyController {
    constructor() {
        super();
        this.api(1);
    }

    do(data) {

        var result = data.data;
        //console.log(":F0-ToanQuoc========================"+JSON.stringify(result));		
        // setData(data);
        var key = 'Việt Nam';
        var tpmLabel = [];
        var tpmLuyKe = [];
        var tpmLTheoNgay = [];
        f0DailyToanQuocController.lay
        for (var i = 0; i < result.length; i++) {
            var data = result[i];
            tpmLabel.push(data.ngaycongbo);
            tpmLuyKe.push(data.tongluyke)
            tpmLTheoNgay.push(data.tongcangay)

        }
        f0DailyToanQuocController.Labels.set(key, tpmLabel);
        f0DailyToanQuocController.dataLuyKe.set(key, tpmLuyKe);
        f0DailyToanQuocController.dataTheoNgay.set(key, tpmLTheoNgay);

    }
}
var f0DailyToanQuocController = null;
if (kernel.checkMode(F0DailyToanQuocController.prototype.constructor.name))
    f0DailyToanQuocController = kernel.addClass(new F0DailyToanQuocController());


class F0DailyTinhController extends F0BaseDailyController {
    constructor() {
        super();
        this.api(2);
    }

    do(data) {

        var result = data.data;
        //console.log(":F0-ToanQuoc========================"+JSON.stringify(result));		
        // setData(data);

        for (var i = 0; i < result.length; i++) {
            var tinh = result[i];
            var ten = tinh.tinhCongBo;
            var datas = tinh.datas;
            var dates = tinh.dates;
            var key = ten;

            var tpmLabel = [];
            var tpmLuyKe = [];
            var tpmLTheoNgay = [];
            for (var j = 0; j < dates.length; j++) {
                tpmLabel.push(dates[j]);
            }

            var caLuyKe = 0;
            for (var j = 0; j < datas.length; j++) {
                caLuyKe = caLuyKe + parseInt(datas[j]);
                tpmLTheoNgay.push(datas[j]);
                tpmLuyKe.push(caLuyKe)
            }

            f0DailyTinhController.Labels.set(key, tpmLabel);
            f0DailyTinhController.dataLuyKe.set(key, tpmLuyKe);
            f0DailyTinhController.dataTheoNgay.set(key, tpmLTheoNgay);
            //console.log(":Tinh========================"+key);		
            //console.log(":Label========================"+JSON.stringify(tpmLabel));		
            //console.log(":TheoNgay========================"+JSON.stringify(tpmLTheoNgay));		
            //console.log(":LuyKe========================"+JSON.stringify(tpmLuyKe));		


        }


    }
}

var f0DailyTinhController = null;
if (kernel.checkMode(F0DailyTinhController.prototype.constructor.name))
    f0DailyTinhController = kernel.addClass(new F0DailyTinhController());




class F0DailyHuyenController extends F0BaseDailyController {
    constructor() {
        super();
        this.api(3);
    }

    do(data) {

        var result = data.data;
        //console.log(":F0-ToanQuoc========================"+JSON.stringify(result));		
        // setData(data);

        for (var i = 0; i < result.length; i++) {
            var huyen = result[i];
            var ten = huyen.huyenCongBo;
            var datas = huyen.datas;
            var dates = huyen.dates;
            var key = huyen.tinhCongBo + ten;

            var tpmLabel = [];
            var tpmLuyKe = [];
            var tpmLTheoNgay = [];
            for (var j = 0; j < dates.length; j++) {
                tpmLabel.push(dates[j]);
            }

            var caLuyKe = 0;
            for (var j = 0; j < datas.length; j++) {
                caLuyKe = caLuyKe + parseInt(datas[j]);
                tpmLTheoNgay.push(datas[j]);
                tpmLuyKe.push(caLuyKe)
            }

            f0DailyHuyenController.Labels.set(key, tpmLabel);
            f0DailyHuyenController.dataLuyKe.set(key, tpmLuyKe);
            f0DailyHuyenController.dataTheoNgay.set(key, tpmLTheoNgay);
            //console.log(":HUYEN========================"+key);		
            //console.log(":Label========================"+JSON.stringify(tpmLabel));		
            //console.log(":TheoNgay========================"+JSON.stringify(tpmLTheoNgay));		
            //console.log(":LuyKe========================"+JSON.stringify(tpmLuyKe));		


        }


    }
}

var f0DailyHuyenController = null;
if (kernel.checkMode(F0DailyHuyenController.prototype.constructor.name))
    f0DailyHuyenController = kernel.addClass(new F0DailyHuyenController());



class F0DailyXaController extends F0BaseDailyController {
    constructor() {
        super();
        this.api(4);
    }

    do(data) {

        var result = data.data;
        //console.log(":F0-Xa========================"+JSON.stringify(result));		
        // setData(data);

        for (var i = 0; i < result.length; i++) {
            var xa = result[i];
            var ten = xa.xaCongBo;
            var datas = xa.datas;
            var dates = xa.dates;
            var key = xa.tinhCongBo + xa.huyenCongBo + ten;

            var tpmLabel = [];
            var tpmLuyKe = [];
            var tpmLTheoNgay = [];
            for (var j = 0; j < dates.length; j++) {
                tpmLabel.push(dates[j]);
            }

            var caLuyKe = 0;
            for (var j = 0; j < datas.length; j++) {
                caLuyKe = caLuyKe + parseInt(datas[j]);
                tpmLTheoNgay.push(datas[j]);
                tpmLuyKe.push(caLuyKe)
            }

            f0DailyXaController.Labels.set(key, tpmLabel);
            f0DailyXaController.dataLuyKe.set(key, tpmLuyKe);
            f0DailyXaController.dataTheoNgay.set(key, tpmLTheoNgay);
            //console.log(":Xa========================"+key);		
            //console.log(":Label========================"+JSON.stringify(tpmLabel));		
            //console.log(":TheoNgay========================"+JSON.stringify(tpmLTheoNgay));		
            //console.log(":LuyKe========================"+JSON.stringify(tpmLuyKe));		
        }
    }
}

var f0DailyXaController = null;
if (kernel.checkMode(F0DailyXaController.prototype.constructor.name))
    f0DailyXaController = kernel.addClass(new F0DailyXaController());