function getF0(f0s, item) {
    return f0s.get(item) == undefined ? 0 : f0s.get(item);
}

function getOpacity(d) {
    if (province == "Cần Thơ" && clicked_district != "") {
        if (("" + d) === "undefined") { d = 0.0; }
        return
        d > 0 ? 0.7 :
            0.1;
    }
    if (("" + d) === "undefined") { d = 0.0; }
    return 0.7;
}
// get color depending on population density value
function getColor1(d) {
    if (province == "Cần Thơ" && clicked_district != "" || clicked_layer == 4) {
        if (("" + d) === "undefined") { d = 0.0; }
        return d > 7 ? '#DA4711' :
            d > 3 ? '#F28E12' :
            d > 0 ? '#F1BA15' :
            '#0FA57F';
    }
    if (("" + d) === "undefined") { d = 0.0; }
    return d > 90 ? '#DA4711' :
        d > 70 ? '#F28E12' :
        d > 50 ? '#F1BA15' :
        d > 3 ? '#0FA57F' :
        '#0FA57F';
}

// function getScore(feature) {
//     if (feature.properties.name1 && feature.properties.name2 && feature.properties.name1 == "Cần Thơ") {
//         return feature.properties.score;
//     }
//     var sc = data_core.get(feature.properties.name);
//     if (feature.properties.name1 && feature.properties.name2) {
//         sc = data_core.get(feature.properties.name1 + feature.properties.name2 + feature.properties.name);
//     } else if (feature.properties.name1) {
//         sc = data_core.get(feature.properties.name1 + feature.properties.name);
//     }
//     return sc;
// }


// get lấy nhãn risk
function getRisk(d) {
    // ptype = ["","Bình thường mới", "Nguy cơ", "Nguy cơ cao", "Rất cao"]

    if (province == "Cần Thơ" && clicked_district != "") {
        return d > 5 ? "Rất cao" :
            d > 3 ? "Nguy cơ cao" :
            d > 0 ? "Nguy cơ" :
            "Bình thường mới";
    }
    return d > 90 ? "Rất cao" :
        d > 70 ? "Nguy cơ cao" :
        d > 50 ? "Nguy cơ" :
        d > 30 ? "Bình thường mới" :
        "Bình thường mới";
}

// get lấy nhãn risk
function getNguyCo(d) {
    // ptype = ["","Bình thường mới", "Nguy cơ", "Nguy cơ cao", "Rất cao"]
    return d > 90 ? 4 :
        d > 70 ? 3 :
        d > 50 ? 2 :
        d > 30 ? 1 : 0;
}

function getItemTagDiaPhuong(parent, item, fit_zoom_func, i) {
    const color = getColor(data_core.get(parent + item))
    const f0text = getF0(data_f0, parent + item);

    return `
			<i style="background:${color}">&nbsp;&nbsp;&nbsp;</i>&nbsp;
			<a href="#" onclick="return ${fit_zoom_func};">${item}</a> (F0:${f0text})
			<a href="#" id="pop${i}">
				<img width="14" alt="Biện pháp đáp ứng" 
				title="Biện pháp đáp ứng"
				src="dg/images/response.png" style="float: right;">
			</a>
			`;
}

function getBangThongTinTinh(province) {
    if (!data_info_vung.get(province)) {
        return '';
    }
    const content = data_info_vung.get(province);
    return `
	<table id='customers' style="width: 650">
        <tr><th>
        Đánh giá nguy cơ trên toàn Tỉnh
        <a data-toggle="collapse" href="#ThongTinTinh" aria-expanded="true" 
        aria-controls="ThongTinTinh">
            <i style="float: right;"class="fas fa-angle-down rotate-icon">&nbsp;</i>
        </a>
        </th></tr>
	</table>
	<div id="ThongTinTinh" style="width: 650" class="collapse show">
		<table id='customers' style="width: 650">
			<colgroup>
				<col span='1' style='width: 20%;'>
				<col span='1' style='width: 60%;'>
				<col span='1' style='width: 20%;'>
			</colgroup>
			<tr>
				<th>Tiêu đề</th>
				<th>Nội dung</th>
				<th>Vùng nguy cơ</th>
			</tr>
			${content}
		</table>
	</div>`;
}

function getBangThongTinQuan(province, district) {
    if (!data_info_vung.get(province + district)) {
        return '';
    }
    const content = data_info_vung.get(province + district);
    return `
	<table id='customers' style="width: 650">
        <tr><th>
        Đánh giá nguy cơ trên toàn Quận/Huyện
        <a data-toggle="collapse" href="#ThongTinQuan" aria-expanded="true" 
        aria-controls="ThongTinQuan">
            <i style="float: right;"class="fas fa-angle-down rotate-icon">&nbsp;</i>
        </a>
		</th></tr>	
	</table>
	<div id="ThongTinQuan" style="width: 650" class="collapse show">
		<table id='customers' style="width: 650">
			<colgroup>
				<col span='1' style='width: 20%;'>
				<col span='1' style='width: 60%;'>
				<col span='1' style='width: 20%;'>
			</colgroup>
			<tr><th>Tiêu đề</th>
			<th>Nội dung</th>
			<th>Vùng nguy cơ</th></tr>
			${content}
		</table>
	</div>`;
}

function getCaNhiemTinh(province) {
    if (!dataCanhiemTinh[province]) {
        return '';
    }
    return `
	<table id='customers' style="width: 650">
        <tr><th>
        Ca nhiễm mỗi ngày
        <a data-toggle="collapse" href="#CaNhiemMoiNgay" aria-expanded="true" 
        aria-controls="CaNhiemMoiNgay">
            <i style="float: right;"class="fas fa-angle-down rotate-icon">&nbsp;</i>
        </a>
		</th></tr>	
	</table>
	<div id="CaNhiemMoiNgay" style="width: 650" class="collapse show">	
		<canvas id="canhiem" width="650"></canvas>
	</div>`;
}

function setupCaNhiemTinh(province) {
    if (!dataCanhiemTinh[province]) {
        return;
    }
    const key = "canhiem";
    const title = "ca nhiễm theo ngày " + province;

    var ctx = document.getElementById('canhiem').getContext("2d");
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dataCanhiemTinh[province]['date'],
            datasets: [{
                label: title,
                data: dataCanhiemTinh[province]['values'],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function getCaNhiemHuyen(province, district) {
    if (!dataCanhiemHuyen[province + district]) {
        return '';
    }
    return `
	<table id='customers' style="width: 650">
        <tr><th>
        Ca nhiễm mỗi ngày
        <a data-toggle="collapse" href="#CaNhiemMoiNgay" aria-expanded="true" 
        aria-controls="CaNhiemMoiNgay">
            <i style="float: right;"class="fas fa-angle-down rotate-icon">&nbsp;</i>
        </a>
		</th></tr>	
	</table>	
	<div id="CaNhiemMoiNgay" style="width: 650" class="collapse show">	
		<canvas id="canhiem" width="650"></canvas>
	</div>`;
}

function setupCaNhiemHuyen(province, district) {
    if (!dataCanhiemHuyen[province + district]) {
        return;
    }
    const key = "canhiem";
    const title = "ca nhiễm theo ngày " + district + ', ' + province;

    var ctx = document.getElementById('canhiem').getContext("2d");
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dataCanhiemHuyen[province + district]['date'],
            datasets: [{
                label: title,
                data: dataCanhiemHuyen[province + district]['values'],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function getCaNhiemXa(province, district, commune) {
    if (!dataCanhiemXa[province + district + commune]) {
        return '';
    }
    return `
	<table id='customers' style="width: 650">
		<tr><th>
		Ca nhiễm mỗi ngày
		<a data-toggle="collapse" href="#CaNhiemMoiNgay" aria-expanded="true" 
        aria-controls="CaNhiemMoiNgay">
			<i style="float: right;"class="fas fa-angle-down rotate-icon">&nbsp;</i>
		</a>
		</th></tr>	
	</table>	
	<div id="CaNhiemMoiNgay" style="width: 650" class="collapse show">	
		<canvas id="canhiem" width="650"></canvas>
	</div>`;
}

function setupCaNhiemXa(province, district, commune) {
    if (!dataCanhiemXa[province + district + commune]) {
        return;
    }
    const key = "canhiem";
    const title = "ca nhiễm theo ngày " + commune + ', ' + district + ', ' + province;

    var ctx = document.getElementById('canhiem').getContext("2d");
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dataCanhiemXa[province + district + commune]['date'],
            datasets: [{
                label: title,
                data: dataCanhiemXa[province + district + commune]['values'],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function getChartCaNhiemToanQuoc() {
    return `
	<table id='customers' style="width: 650">
		<tr><th>
		Ca nhiễm các tỉnh trên toàn quốc
		<a data-toggle="collapse" 
			href="#divCaNhiemToanQuoc" 
				aria-expanded="true" 
					aria-controls="divCaNhiemToanQuoc">
			<i style="float: right;"class="fas fa-angle-down rotate-icon">&nbsp;</i>
		</a>
		</th></tr>
	</table>
	<div id="divCaNhiemToanQuoc" style="width: 650" class="collapse show">	
		<canvas id="canhiemToanQuoc" width="650"></canvas>
	</div>
	`;
}

function setupChartCaNhiemToanQuoc() {
    const title = "Ca nhiễm";
    if (!dataChartCaNhiemToanQuoc['tinh']) return;
    var ctx = document.getElementById('canhiemToanQuoc').getContext("2d");
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dataChartCaNhiemToanQuoc['tinh'],
            datasets: [{
                label: title,
                data: dataChartCaNhiemToanQuoc['F0'],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 500
                    }
                },
                x: {
                    ticks: {
                        autoSkip: false
                    }
                }
            }
        }
    });
}

function getChartNguyCoToanQuoc() {
    return `
	<table id='customers' style="width: 650">
		<tr><th>
		Lịch sử mức nguy cơ 10 vùng trong 10 ngày qua
		<a data-toggle="collapse" href="#divNguyCoToanQuoc" aria-expanded="true" 
        aria-controls="divNguyCoToanQuoc">
			<i style="float: right;"class="fas fa-angle-down rotate-icon">&nbsp;</i>
		</a>
		</th></tr>
	</table>
	<div id="divNguyCoToanQuoc" style="width: 650" class="collapse show">	
		<canvas id="nguyCoToanQuoc" width="650"></canvas>
	</div>
	`;
}

function setupChartNguyCoToanQuoc() {
    const map = mapVN['VN'];
    map.sort(function(x, y) {
        let a = (data_core.get(x)),
            b = (data_core.get(y));
        if (("" + a) === "undefined") { a = 0.0; }
        if (("" + b) === "undefined") { b = 0.0; }
        return b - a;
    });
    var province_lables = map.slice(0, 10);
    var ctx = document.getElementById('nguyCoToanQuoc').getContext("2d");
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: province_lables,
            datasets: [],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 4,
                    min: 0,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
            }
        }
    });
    const colors = getRangeColors();
    for (var i = 0; i < dateCsrAllHisTinhLabels.length; i++) {
        var tpm = [];
        for (var j = 0; j < province_lables.length; j++) {
            const province = province_lables[j];
            const data = dataCsrAllHis.get(province);
            if (data) tpm.push(getNguyCo(data[i]));
        }
        chart.data.datasets.push({
            label: dateCsrAllHisTinhLabels[i],
            borderColor: colors[i]['strokeColor'],
            backgroundColor: colors[i]['pointHighlightStroke'],
            fill: false,
            data: tpm,
        });
    }
    chart.update();
}

function setupChartNguyCoTinh(key, province) {
    const map = mapVN[key];
    map.sort(function(x, y) {
        let a = (data_core.get(province + x)),
            b = (data_core.get(province + y));
        if (("" + a) === "undefined") { a = 0.0; }
        if (("" + b) === "undefined") { b = 0.0; }
        return b - a;
    });
    var district_lables = map.slice(0, 10);
    var ctx = document.getElementById('nguyCoToanQuoc').getContext("2d");
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: district_lables,
            datasets: [],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 4,
                    min: 0,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
            }
        }
    });
    const colors = getRangeColors();
    for (var i = 0; i < dateCsrAllHisHuyenLabels.length; i++) {
        var tpm = [];
        for (var j = 0; j < district_lables.length; j++) {
            const district = district_lables[j];
            const data = dataCsrAllHis.get(province + district);
            if (data) {
                tpm.push(getNguyCo(data[i]));
            }
        }
        chart.data.datasets.push({
            label: dateCsrAllHisHuyenLabels[i],
            borderColor: colors[i]['strokeColor'],
            backgroundColor: colors[i]['pointHighlightStroke'],
            fill: false,
            data: tpm,
        });
    }
    chart.update();
}

function setupChartNguyCoHuyen(key, province, district) {
    const map = mapVN[key];
    map.sort(function(x, y) {
        let a = (data_core.get(province + district + x)),
            b = (data_core.get(province + district + y));
        if (("" + a) === "undefined") { a = 0.0; }
        if (("" + b) === "undefined") { b = 0.0; }
        return b - a;
    });
    var commune_lables = map.slice(0, 10);
    var ctx = document.getElementById('nguyCoToanQuoc').getContext("2d");
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: commune_lables,
            datasets: [],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 4,
                    min: 0,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
            }
        }
    });
    const colors = getRangeColors();
    for (var i = 0; i < dateCsrAllHisXaLabels.length; i++) {
        var tpm = [];
        for (var j = 0; j < commune_lables.length; j++) {
            const commune = commune_lables[j];
            const data = dataCsrAllHis.get(province + district + commune);
            if (data) tpm.push(getNguyCo(data[i]));
        }
        chart.data.datasets.push({
            label: dateCsrAllHisXaLabels[i],
            borderColor: colors[i]['strokeColor'],
            backgroundColor: colors[i]['pointHighlightStroke'],
            fill: false,
            data: tpm,
        });
    }
    chart.update();
}

function getThongKeNguyCoToanQuoc() {
    const content = dataThongKeNguyCo ? dataThongKeNguyCo.join('') : '';
    return `
	<table id='customers' style="width: 650">
        <tr><th>
        Thống kê nguy cơ trên Toàn Quốc
        <a data-toggle="collapse" href="#ThongKeNguyCoToanQuoc" aria-expanded="true" 
        aria-controls="ThongKeNguyCoToanQuoc">
            <i style="float: right;"class="fas fa-angle-down rotate-icon">&nbsp;</i>
        </a>
		</th></tr>	
	</table>
	<div id="ThongKeNguyCoToanQuoc" style="width: 650" class="collapse show">
		<table id='customers' style="width: 650">
			<colgroup>
				<col span='1' style='width: 30%;'>
				<col span='1' style='width: 40%;'>
				<col span='1' style='width: 30%;'>
			</colgroup>
			<tr><th>Cấp hành chính</th>
			<th>Mức nguy cơ</th>
			<th>Số vùng</th></tr>
			${content}
		</table>
	</div>`;
}

function getThongKeNguyCoTinh(province) {
    const content = dataThongkeNguycoTinh[province] ? dataThongkeNguycoTinh[province].join('') : '';
    return `
	<table id='customers' style="width: 650">
        <tr><th>
        Thống kê nguy cơ trên toàn Tỉnh
        <a data-toggle="collapse" href="#ThongKeNguyCoTinh" aria-expanded="true" 
        aria-controls="ThongKeNguyCoTinh">
            <i style="float: right;"class="fas fa-angle-down rotate-icon">&nbsp;</i>
        </a>
		</th></tr>	
	</table>
	<div id="ThongKeNguyCoTinh" style="width: 650" class="collapse show">
		<table id='customers' style="width: 650">
			<colgroup>
				<col span='1' style='width: 20%;'>
				<col span='1' style='width: 40%;'>
				<col span='1' style='width: 20%;'>
				<col span='1' style='width: 20%;'>
			</colgroup>
			<tr>
				<th>Cấp hành chính</th>
				<th>Mức nguy cơ</th>
				<th>Số vùng</th>
				<th>Số dân ảnh hưởng</th>
			</tr>
			${content}
		</table>
	</div>`;
}

function getThongKeNguyCoQuan(province, district) {
    const content = (dataThongkeNguycoQuan[province + district]) ?
        dataThongkeNguycoQuan[province + district].join('') : '';
    return `
	<table id='customers' style="width: 650">
        <tr><th>
        Thống kê nguy cơ trên toàn Quận/Huyện
        <a data-toggle="collapse" href="#ThongKeNguyCoQuan" aria-expanded="true" 
        aria-controls="ThongKeNguyCoQuan">
            <i style="float: right;"class="fas fa-angle-down rotate-icon">&nbsp;</i>
        </a>
		</th></tr>	
	</table>
	<div id="ThongKeNguyCoQuan" style="width: 650" class="collapse show">
		<table id='customers' style="width: 650">
			<colgroup>
				<col span='1' style='width: 30%;'>
				<col span='1' style='width: 40%;'>
				<col span='1' style='width: 30%;'>
			</colgroup>
			<tr><th>Cấp hành chính</th>
			<th>Mức nguy cơ</th>
			<th>Số vùng</th></tr>${content}</table>
	</div>`;
}

function getMobility(province) {
    // var title = '<h5 class="text-danger">Di chuyển trong tỉnh/thành phố ' + province + '(% thay đổi)</h5>';
    // if (province == 'Việt Nam'){
    // 	title = '<h5 class="text-danger">Di chuyển trong Việt Nam (% thay đổi)</h5>';
    // }
    return `
	<table id='customers' style="width: 650">
	<tr>
		<th>
			Di chuyển trong vùng (% thay đổi)		
		</th>
	</tr></table>
	<table id="mobility-table">
		<tr>
			<td><canvas id="retail" width="200" height="200"></canvas></td>
			<td><canvas id="grocery" width="200" height="200"></canvas></td>
			<td><canvas id="park" width="200" height="200"></canvas></td>
		</tr>
		<tr>
			<td><canvas id="public_transit" width="200" height="200"></canvas></td>
			<td><canvas id="work" width="200" height="200"></canvas></td>
			<td><canvas id="residence" width="200" height="200"></canvas></td>
		</tr>
	</table>
	`;
}

function setupMobility(province) {
    labels = {
        "retail": "Khu bán lẻ/giải trí",
        "grocery": "Khu chợ/hiệu thuốc",
        "park": "Công viên",
        "public_transit": "Giao thông công cộng",
        "work": "Nơi làm việc",
        "residence": "Nơi ở"
    }

    for (const [key, value] of Object.entries(labels)) {
        var ctx = document.getElementById(key).getContext("2d");
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: mobility_data[province]['date'],
                datasets: [{
                    label: value,
                    data: mobility_data[province][key],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: {
                        max: 100,
                        min: -100,
                        stepValue: 20,
                    }
                }
            }
        });
    }
}

function getRangeColors() {
    return [{ // blue
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,0.8)"
        },
        { // light grey
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,0.8)"
        },
        { // red
            fillColor: "rgba(247,70,74,0.2)",
            strokeColor: "rgba(247,70,74,1)",
            pointColor: "rgba(247,70,74,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(247,70,74,0.8)"
        },
        { // green
            fillColor: "rgba(70,191,189,0.2)",
            strokeColor: "rgba(70,191,189,1)",
            pointColor: "rgba(70,191,189,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(70,191,189,0.8)"
        },
        { // yellow
            fillColor: "rgba(253,180,92,0.2)",
            strokeColor: "rgba(253,180,92,1)",
            pointColor: "rgba(253,180,92,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(253,180,92,0.8)"
        },
        { // grey
            fillColor: "rgba(148,159,177,0.2)",
            strokeColor: "rgba(148,159,177,1)",
            pointColor: "rgba(148,159,177,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(148,159,177,0.8)"
        },
        { // dark grey
            fillColor: "rgba(77,26,96,0.2)",
            strokeColor: "rgba(77,26,96,1)",
            pointColor: "rgba(77,26,96,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(77,26,96,1)"
        },
        { // dark grey 1
            fillColor: "rgba(77,126,96,0.2)",
            strokeColor: "rgba(77,126,96,1)",
            pointColor: "rgba(77,126,96,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(77,126,96,1)"
        },
        { // dark grey 2
            fillColor: "rgba(77,26,196,0.2)",
            strokeColor: "rgba(77,26,196,1)",
            pointColor: "rgba(77,26,196,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(77,26,196,1)"
        },
        { // dark grey 3
            fillColor: "rgba(77,126,36,0.2)",
            strokeColor: "rgba(77,126,36,1)",
            pointColor: "rgba(77,126,36,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(77,126,36,1)"
        },
        { // dark grey 4
            fillColor: "rgba(77,126,36,0.2)",
            strokeColor: "rgba(77,66,36,1)",
            pointColor: "rgba(77,66,36,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(77,66,36,1)"
        }
    ];
}

function createdModal() {
    modal = `<!-- Creates the bootstrap modal where the image will appear -->
    <div class="modal fade" id="imagemodal" tabindex="-1" 
        role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> 
	  <div class="modal-dialog" style="max-width: 900px;"> 
		<div class="modal-content"> 
		  <div class="modal-header"> 
			<h4 class="modal-title" id="myModalLabel">CÁC GIẢI PHÁP BẮT BUỘC TƯƠNG ỨNG VỚI CÁC MỨC ĐỘ NGUY CƠ</h4> 
            <button type="button" class="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span><span class="sr-only">Đóng</span>
            </button> 
		  </div> 
		  <div id="imageresource" class="modal-body"> 
			
		  </div>
		  <div class="modal-footer"> 
			<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button> 
		  </div> 
		</div> 
	  </div> 
	</div>`;
    return modal;
}

function getBinhThuongMoiContent(province, district, commune) {
    const key = province + district + commune;
    const core = data_core.get(key);
    nguy_co_name = getRisk(core);
    console.log('getBinhThuongMoiContent:', nguy_co_name, key, core);
    var content_bosung = `
	<tr>
		<td>Đối với cá nhân</td>
		<td>Thực hiện nghiêm 5K (Khẩu trang, Khử khuẩn, Khoảng cách, Không tập trung, Khai báo y tế).</td>
	</tr>
	<tr>
		<td>Đối với tổ chức, đơn vị</td>
		<td>Thực hiện nghiêm các biện pháp đảm bảo an toàn của Bộ Y tế, tự đánh giá và cập nhật trên hệ thống antoancovid.vn.</td>
	</tr>
	<tr>
		<td>Đối với chính quyền</td>
		<td>Xử lý nghiêm các tổ chức, cá nhân vi phạm điểm a và b, mục 1, phần IV của Quy định này và không cho phép hoạt động của các tổ chức không đảm bảo an toàn.</td>
	</tr>
	`;
    const content_nguyco_bosung = `
	<tr>
		<td>Tất cả đối tượng</td>
		<td>Thực hiện truy vết, khoanh vùng, cách ly theo hướng dẫn của Bộ Y tế..</td>
	</tr>
	<tr>
		<td>Tất cả đối tượng</td>
		<td>Tạm dừng hoạt động các cơ sở kinh doanh dễ bị lây nhiễm như: vũ trường, karaoke,
		 quán bar, mát xa,..</td>
	</tr>
	<tr>
		<td>Tất cả đối tượng</td>
		<td>Thực hiện khai báo y tế bắt buộc đối với những người có nguy cơ
		 (ngoài các đối tượng đã được quy định trước đây).</td>
	</tr>
	<tr>
		<td>Tất cả đối tượng</td>
		<td>Hạn chế các hoạt động tập trung đông người. 
		Đối với các sự kiện bắt buộc phải tổ chức thì cơ quan tổ chức phải đảm bảo đầy đủ các
		 quy định của cơ quan y tế trên địa bàn. Lễ hiếu, hỉ, hoạt động tôn giáo, tín ngưỡng
		  phải được các cơ quan y tế giám sát chặt chẽ và phải hạn chế tổ chức ăn uống.</td>
	</tr>		
	`;
    const content_nguycocao_bosung = `
		<tr>
			<td>Tất cả đối tượng</td>
			<td>Dừng các hoạt động tập trung từ 30 người trở lên, trường hợp cần thiết phải tổ chức
			 thì phải được cấp tỉnh hoặc trung ương cho phép và cấp, cơ quan, cá nhân tổ chức phải 
			 chịu trách nhiệm đảm bảo tuyệt đối an toàn. Không tụ tập từ 10 người trở lên ngoài phạm
			  vi công sở, trường học, bệnh viện. Yêu cầu giữ khoảng cách tối thiểu 2m tại nơi công cộng.</td>
		</tr>
		<tr>
			<td>Tất cả đối tượng</td>
			<td>Giảm mật độ giao thông, số lượng người trên các phương tiện giao thông công cộng.</td>
		</tr>
		<tr>
			<td>Tất cả đối tượng</td>
			<td>Giảm số người làm việc tại cơ quan, công sở; tăng cường làm việc trực tuyến.</td>
		</tr>
		<tr>
			<td>Tất cả đối tượng</td>
			<td>Điều chỉnh lịch học; trường hợp cần phải điều chỉnh vượt quá khung kế hoạch thời gian
			 năm học thì phải thống nhất với Bộ Giáo dục và Đào tạo.</td>
		</tr>
		<tr>
			<td>Tất cả đối tượng</td>
			<td>Thực hiện khai báo y tế bắt buộc với toàn bộ người dân trên địa bàn.</td>
		</tr>
		`;
    const content_nguyco_ratcao_bosung = `
		<tr>
			<td>Tất cả đối tượng</td>
			<td>Đánh giá nguy cơ và áp dụng các biện pháp cách ly y tế (phong tỏa) vùng có dịch 
			Covid-19 theo quy định của Bộ Y tế tại Quyết định số 3986/QĐ-BYT ngày 16/9/2020 đối
			 với những vùng dịch diễn biến phức tạp, các yếu tố dịch tễ khó kiểm soát và dịch có
			  nguy cơ lây lan rộng.</td>
		</tr>
		<tr>
			<td>Tất cả đối tượng</td>
			<td>Áp dụng thiết chế cách ly y tế tập trung (khu vực phong tỏa) ngay tại khu vực, 
			địa điểm có đông người lao động là người có tiếp xúc gần phải cách ly tập trung (F1) 
			lưu trú (ký túc xá, nhà trọ tập trung đông công nhân); đồng thời phải tuân thủ nghiêm 
			ngặt các quy định như đối với khu cách ly y tế tập trung. Xử lý nghiêm các trường hợp 
			không tuân thủ quy định.</td>
		</tr>
		<tr>
			<td>Tất cả đối tượng</td>
			<td>Áp dụng các hoạt động giãn cách xã hội trong vòng 14 ngày trên phạm vi toàn địa bàn, cụ thể:</br>

			- Dừng các hoạt động sản xuất, kinh doanh trừ các hoạt động sản xuất, kinh doanh thiết yếu</br>
			
			- Các cơ sở sản xuất kinh doanh, dịch vụ thiết yếu được hoạt động bao gồm: Nhà máy, cơ sở sản xuất; công trình giao thông, xây dựng; cơ sở kinh doanh dịch vụ, hàng hóa thiết yếu (như lương thực, thực phẩm, dược phẩm; xăng, dầu; điện; nước; nhiên liệu,...); cơ sở giáo dục, ngân hàng, kho bạc, các cơ sở kinh doanh dịch vụ trực tiếp liên quan đến hoạt động ngân hàng và bổ trợ doanh nghiệp (như công chứng, luật sư, đăng kiểm, đăng ký giao dịch bảo đảm...), chứng khoán, bưu chính, viễn thông, dịch vụ hỗ trợ vận chuyển, xuất, nhập khẩu hàng hóa, khám bệnh, chữa bệnh, tang lễ...</br>
			
			- Tổ chức lại sản xuất tại các khu công nghiệp đảm bảo công tác phòng chống dịch, không để đứt gãy chuỗi cung ứng hàng hóa đặc biệt đối với các nhà máy, xí nghiệp lớn mang tính toàn cầu.</br>
			
			- Người dân được phép lao động, sản xuất tại gia đình và thu hoạch nông sản theo nhóm từng hộ gia đình tại vườn, vùng sản xuất của địa phương.</br>
			
			Các hoạt động sản xuất, kinh doanh, dịch vụ, lao động sản xuất phải thực hiện nghiêm các biện pháp đảm bảo an toàn phòng, chống dịch theo quy định. Dừng hoạt động nhà máy, xí nghiệp, các hoạt động sản xuất, thu hoạch khi không đảm bảo an toàn.</br>
			
			- Dừng các hoạt động lễ hội, văn hóa, thể thao, giải trí, tôn giáo tín ngưỡng. Đám tang không quá 30 người, đám cưới không quá 20 người và phải được cơ quan y tế tại nơi tổ chức giám sát nghiêm ngặt.</br>
			
			- Không tập trung từ 3 người trở lên ngoài phạm vi công sở, trường học, bệnh viện; giữ khoảng cách tối thiểu 2m.</br>
			
			- Dừng hoạt động vận chuyển hành khách công cộng. Xe công vụ, xe đưa đón công nhân, chuyên gia, người cách ly được hoạt động nhưng chỉ được đưa đón tại nơi chính quyền cho phép.</td>
		</tr>
		<tr>
			<td>Tất cả đối tượng</td>
			<td>Không ngăn sông cấm chợ. Các phương tiện chuyên chở nông sản, nguyên vật liệu sản xuất, 
			hàng hóa được hoạt động nhưng phải tuân thủ các yêu cầu về phòng, chống dịch. Các phương tiện 
			chở người từ các tỉnh khác được phép đi qua nhưng không được dừng đón, trả khách trên địa bàn.</td>
		</tr>
		`;
    if (nguy_co_name == 'Nguy cơ') {
        content_bosung += content_nguyco_bosung;
    }

    if (nguy_co_name == 'Nguy cơ cao') {
        content_bosung += content_nguyco_bosung;
        content_bosung += content_nguycocao_bosung;
    }

    if (nguy_co_name == 'Rất cao') {
        content_bosung += content_nguyco_bosung;
        content_bosung += content_nguycocao_bosung;
        content_bosung += content_nguyco_ratcao_bosung;
    }
    const content = `<table id='customers' style="width: 850">
	<tr>
		<th colspan="2">
		Đối với mức “${nguy_co_name}” áp dụng cho ${commune} ${district} ${province}
		</th>
	</tr>
	<colgroup>
		<col span='1' style='width: 20%;'>
		<col span='1' style='width: 80%;'>				
	</colgroup>
	<tr>
		<th>Đối tượng áp dụng</th>
		<th>Biện pháp</th>
	</tr>	
	${content_bosung}
	</table>`
    return content;
}

function showModalOnClick(province, district, commune) {
    var map = mapVN['VN'];
    if (province !== '') {
        map = mapVN[province];
    }
    if (district !== '') {
        map = mapVN[province + ' ' + district];
    }
    console.log('showModalOnClick:', province, district)
    if (map == null) return;
    const _province = province;
    const _district = district;
    const _commune = commune;
    $('#pop').on("click", function() {
        document.getElementById("imageresource").innerHTML =
            getBinhThuongMoiContent(_province, _district, _commune);
        $('#imagemodal').modal('show');
    });
    for (var i = 0; i < map.length; i++) {
        const _commune = map[i];
        // tạo action cho modal hiển thị ảnh ổ dịch
        var pop_name = "#pop" + i;
        $(pop_name).on("click", function() {
            document.getElementById("imageresource").innerHTML =
                getBinhThuongMoiContent(_province, _district, _commune);
            $('#imagemodal').modal('show');
        });
    }
}

function showMoreRowOfTable() {
    $("#display").click(function() {
        $('.hidden').removeClass('hidden');
        if ($('.hidden').length == 0) {
            $(this).addClass('hidden');
        }
    });
}