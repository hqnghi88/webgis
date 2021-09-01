var data_core = new Map();
var data_info_general;
var data_info_vung = new Map();
var data_f0 = new Map();
var images_tinh = new Map();

function readSheet(data) {
    var results = [];
    var entries = data.feed.entry;
    var previousRow = 0;
    for (var i = 0; i < entries.length; i++) {
        var latestRow = results[results.length - 1];
        var cell = entries[i];
        var text = cell.content.$t;
        var row = cell.gs$cell.row;
        if (row > previousRow) {
            var newRow = [];
            newRow.push(text);
            results.push(newRow);
            previousRow++;
        } else {
            latestRow.push(text);
        }

    }
    return results;
}

var dataChartCaNhiemToanQuoc = {};
var dataThongkeNguycoTinh = {};

function doDataTinh(data) {
    var results = readSheet(data);
    dataChartCaNhiemToanQuoc = {
        'tinh': [],
        'F0': [],
        // 'core': [],        
    }
    for (var i = 1; i < results.length; i++) {
        const ten_tinh = results[i][1];
        // data_core.set(ten_tinh, results[i][2]); // bỏ
        // data_f0.set(ten_tinh, results[i][3]); // bỏ
        const image_link = results[i][5];
        // dataChartCaNhiemToanQuoc['tinh'].push(ten_tinh); // bỏ
        // dataChartCaNhiemToanQuoc['F0'].push(results[i][3]); // bỏ
        dataThongkeNguycoTinh[ten_tinh] = [
            `<tr>
                <td>Quận/Huyện</td>
                <td>Nguy cơ rất cao</td>
                <td>` + results[i][6] + `</td>
                <td>` + results[i][13] + `</td>
            </tr>`, `<tr>
                <td>Quận/Huyện</td>
                <td>Nguy cơ cao</td>
                <td>` + results[i][7] + `</td>
                <td>` + results[i][14] + `</td>
            </tr>`,
            `<tr>
                <td>Quận/Huyện</td>
                <td>Nguy cơ</td>
                <td>` + results[i][8] + `</td>
                <td>` + results[i][15] + `</td>
            </tr>`,
            `<tr>
                <td>Xã/Phường</td>
                <td>Nguy cơ rất cao</td>
                <td>` + results[i][9] + `</td>
                <td></td>
            </tr>`,
            `<tr>
                <td>Xã/Phường</td>
                <td>Nguy cơ cao</td>
                <td>` + results[i][10] + `</td>
                <td></td>
            </tr>`,
            `<tr>
                <td>Xã/Phường</td>
                <td>Nguy cơ</td>
                <td>` + results[i][11] + `</td>
                <td></td>
            </tr>`
        ];
        // console.log(results[i]);
        if (image_link == undefined || image_link == null || image_link == '') {
            images_tinh.set(results[i][1], '');
        } else {
            const image_row = '<tr><td colspan="3"><a href="#" id="pop"> \
			<img id="imageresource" width="700" src="' + image_link + '"></a></td></tr>';

            images_tinh.set(results[i][1], image_row);
        }
    }
    console.log('data from gg-sheet doDataTinh loaded');
}

// dữ liệu chỉ số nguy cơ lịch sử 10 ngày
var dataCsrAllHis = new Map();
var dateCsrAllHisTinhLabels = [];

function doDataHisTinh(data) {
    var results = readSheet(data);
    var idx_tinh_start = 1;
    var idx_tinh_end = results[0].length;
    for (var j = idx_tinh_start; j < idx_tinh_end; j++) {
        dateCsrAllHisTinhLabels.push(results[0][j]);
    }
    for (var i = 1; i < results.length; i++) {
        var tmp = [];
        for (var j = idx_tinh_start; j < idx_tinh_end; j++) {
            tmp.push(parseFloat(results[i][j]));
        }
        const province = results[i][0];
        data_core.set(province, tmp[tmp.length - 1]);
        // console.log('doDataHisTinh ', province, tmp);
        dataCsrAllHis.set(province, tmp);
    }
}
var dateCsrAllHisHuyenLabels = [];

function doDataHisHuyen(data) {
    var results = readSheet(data);
    var idx_tinh_start = 2;
    var idx_tinh_end = results[0].length;
    for (var j = idx_tinh_start; j < idx_tinh_end; j++) {
        dateCsrAllHisHuyenLabels.push(results[0][j]);
    }
    for (var i = 1; i < results.length; i++) {
        var tmp = [];
        for (var j = idx_tinh_start; j < idx_tinh_end; j++) {
            tmp.push(parseFloat(results[i][j]));
        }
        const province = results[i][0];
        const district = results[i][1];
        data_core.set(province + district, tmp[tmp.length - 1]);
        dataCsrAllHis.set(province + district, tmp);
    }
}
var dateCsrAllHisXaLabels = [];

function doDataHisXa(data) {
    var results = readSheet(data);
    var idx_tinh_start = 3;
    var idx_tinh_end = results[0].length;
    for (var j = idx_tinh_start; j < idx_tinh_end; j++) {
        dateCsrAllHisXaLabels.push(results[0][j]);
    }
    for (var i = 1; i < results.length; i++) {
        var tmp = [];
        for (var j = idx_tinh_start; j < idx_tinh_end; j++) {
            tmp.push(parseFloat(results[i][j]));
        }
        const province = results[i][0];
        const district = results[i][1];
        const commune = results[i][2];
        data_core.set(province + district + commune, tmp[tmp.length - 1]);
        dataCsrAllHis.set(province + district + commune, tmp);
    }
}

var dataThongKeNguyCo = [];

function doDataThongKeNguyCo(data) {
    var results = readSheet(data);
    const data_len = 10;
    for (var i = 1; i < data_len; i++) {
        str = `<tr>
                    <td> ` + results[i][0] + `</td>
                    <td> ` + results[i][1] + `</td>
                    <td> ` + results[i][2] + `</td>
                </tr>`;
        dataThongKeNguyCo.push(str)
    }
}

dataThongkeNguycoQuan = {}

function doDataQuan(data) {
    var results = readSheet(data);

    for (var i = 1; i < results.length; i++) {
        // data_core.set(results[i][1] + results[i][2], results[i][3]);
        // data_f0.set(results[i][1] + results[i][2], results[i][4]);
        const ten_quan = results[i][1] + results[i][2];
        dataThongkeNguycoQuan[ten_quan] = [
            `<tr>
                <td>Xã/Phường</td>
                <td>Nguy cơ rất cao</td>
                <td>` + results[i][5] + `</td>
            </tr>`,
            `<tr>
                <td>Xã/Phường</td>
                <td>Nguy cơ cao</td>
                <td>` + results[i][6] + `</td>
            </tr>`,
            `<tr>
                <td>Xã/Phường</td>
                <td>Nguy cơ</td>
                <td>` + results[i][7] + `</td>
            </tr>`
        ];
    }

    adm2_layer = L.geoJson(mydata2, {
        style: style,
        filter: provinceFilter,
        onEachFeature: onEachFeature2
    }); //.addTo(map);
    console.log('data from gg-sheet doDataQuan loaded');

}

function doDataXa(data) {
    // var results = readSheet(data);
    // for (var i = 1; i < results.length; i++) {
    //     data_core.set(results[i][1] + results[i][2] + results[i][3], results[i][4]);
    //     data_f0.set(results[i][1] + results[i][2] + results[i][3], results[i][5]);
    // }

    // adm3_layer = L.geoJson(mydata3, {
    //     style: style,
    //     filter: districtFilter,
    //     onEachFeature: onEachFeature3
    // });
    console.log('data from gg-sheet doDataXa loaded');
}

function doDataThongTinTinh(data) {
    var results = readSheet(data);
    for (var i = 1; i < results.length; i++) {
        var s = "";
        if (data_info_vung.get(results[i][0])) {
            s = data_info_vung.get(results[i][0]);
        }
        s = s + "<tr><td>" + results[i][1] + "</td><td>" + results[i][2] + "</td><td>" + results[i][3] + "</td></tr>";
        data_info_vung.set(results[i][0], s.replaceAll("undefined", ""));
    }
    console.log('data from gg-sheet doDataThongTinTinh loaded');
}

function doDataThongTinQuan(data) {
    var results = readSheet(data);
    for (var i = 1; i < results.length; i++) {
        var s = "";
        if (data_info_vung.get(results[i][0] + results[i][1])) {
            s = data_info_vung.get(results[i][0] + results[i][1]);
        }
        s = s + "<tr><td>" + results[i][2] + "</td><td>" + results[i][3] + "</td><td>" + results[i][4] + "</td></tr>";
        data_info_vung.set(results[i][0] + results[i][1], s.replaceAll("undefined", ""));
    }
    console.log('data from gg-sheet doDataThongTinQuan loaded');
}

// dữ thông tin xã
function doDataThongTinXa(data) {
    var results = readSheet(data);
    for (var i = 1; i < results.length; i++) {
        var s = "Danh sách F0: " + results[i][4] + "</br>Số F1: " + results[i][6] + "</br>Số cách ly: " + results[i][7] + "</br>Những địa điểm có nguy cơ lây nhiễm cao: " + results[i][5];
        data_info_vung.set(results[i][0] + results[i][1] + results[i][2], s.replaceAll("undefined", ""));
    }
}

// thống kê ca nhiễm
function doDataThongTinCaNhiemToanQuoc(data) {
    var results = readSheet(data);
    for (var i = 1; i < results.length; i++) {
        canhiem_labels[canhiem_labels.length] = results[i][0];
        new_case_values[new_case_values.length] = results[i][1];
        total_case_values[total_case_values.length] = results[i][2];
    }
}

// Dữ liệu lich sử ca nhiễm tỉnh
var dataCanhiemTinh = {};

// function doDataCanhiemTinh(data) {
//     var results = readSheet(data);
//     // var today = new Date(); // 2021-04-29
//     // var start_date = new Date('April 29, 2021 00:00:00');
//     // var end_date = today; // new Date('June 02, 2021 00:00:00');
//     var idx_date_start = 2; //parseInt((today - start_date) / 86400000) + 1;
//     // var idx_date_end = parseInt((end_date - start_date) / 86400000) + 2;
//     var idx_date_end = results[0].length - 1;
//     var date_labels = [];
//     var all_data = [];
//     for (var j = idx_date_start; j <= idx_date_end; j++) {
//         date_labels.push(results[0][j]);
//     }
//     for (var i = 1; i < results.length; i++) {
//         const province = results[i][1];
//         var tmp = [];
//         var case_of_province = 0;
//         for (var j = idx_date_start; j <= idx_date_end; j++) {
//             tmp.push(parseFloat(results[i][j]));
//             case_of_province += parseFloat(results[i][j]);
//         }
//         dataCanhiemTinh[province] = {
//             'date': date_labels,
//             'values': tmp,
//         };
//         all_data.push(tmp);
//         // console.log(province, case_of_province);
//         data_f0.set(province, case_of_province);
//         dataChartCaNhiemToanQuoc['tinh'].push(province);
//         dataChartCaNhiemToanQuoc['F0'].push(case_of_province);
//     }
//     canhiem_labels = date_labels;
//     for (var i = 0; i < canhiem_labels.length; i++) {
//         var sum_new_case = 0;

//         for (var j = 0; j < all_data.length; j++) {
//             var aa = all_data[j];
//             if (i < aa.length) {
//                 sum_new_case += aa[i];
//             }
//         }

//         new_case_values.push(sum_new_case);
//     }
//     var sum_total_case = 0;
//     for (var i = 0; i < canhiem_labels.length; i++) {
//         sum_total_case += new_case_values[i];
//         total_case_values.push(sum_total_case);
//     }
//     console.log('dataCanhiemTinh: ', dataCanhiemTinh);
//     data_info_general = buildStringVietNam();
//     legend.addTo(Lmap);
//     reset_adm1();
//     loadDataLevel2();
// }

// Dữ liệu lich sử ca nhiễm tỉnh
var dataCanhiemHuyen = {};

function doDataCanhiemHuyen(data) {
    var results = readSheet(data);
    // var today = new Date(); // 2021-04-29
    // var start_date = new Date('April 29, 2021 00:00:00');
    // var end_date = today; // new Date('June 02, 2021 00:00:00');
    var idx_date_start = 3; //parseInt((today - start_date) / 86400000) + 1;
    // var idx_date_end = parseInt((end_date - start_date) / 86400000) + 2;
    var idx_date_end = results[0].length - 1;

    var date_labels = [];
    for (var j = idx_date_start; j <= idx_date_end; j++) {
        date_labels.push(results[0][j]);
    }
    for (var i = 1; i < results.length; i++) {
        const province = results[i][1];
        const district = results[i][2];
        var tmp = [];
        var sum_case = 0;
        for (var j = idx_date_start; j <= idx_date_end; j++) {
            tmp.push(parseFloat(results[i][j]));
            sum_case += parseFloat(results[i][j]);
        }
        dataCanhiemHuyen[province + district] = {
            'date': date_labels,
            'values': tmp,
        };
        data_f0.set(province + district, sum_case);
    }
    console.log('doDataCanhiemHuyen: ', dataCanhiemHuyen);
}

// Dữ liệu lich sử ca nhiễm tỉnh
var dataCanhiemXa = {};

function doDataCanhiemXa(data) {
    var results = readSheet(data);
    // var today = new Date(); // 2021-04-29
    // var start_date = new Date('April 29, 2021 00:00:00');
    // var end_date = today; // new Date('June 02, 2021 00:00:00');
    var idx_date_start = 4; //parseInt((today - start_date) / 86400000) + 1;
    // var idx_date_end = parseInt((end_date - start_date) / 86400000) + 3;
    var idx_date_end = results[0].length - 1;
    var date_labels = [];
    for (var j = idx_date_start; j <= idx_date_end; j++) {
        date_labels.push(results[0][j]);
    }
    for (var i = 1; i < results.length; i++) {
        const province = results[i][1];
        const district = results[i][2];
        const commune = results[i][3];
        var tmp = [];
        var total_case = 0;
        for (var j = idx_date_start; j <= idx_date_end; j++) {
            tmp.push(parseFloat(results[i][j]));
            total_case += parseInt(results[i][j]);
        }
        dataCanhiemXa[province + district + commune] = {
            'date': date_labels,
            'values': tmp,
        };
        data_f0.set(province + district + commune, total_case);
    }
    adm3_layer = L.geoJson(mydata3, {
        style: style,
        filter: districtFilter,
        onEachFeature: onEachFeature3
    });
    console.log('doDataCanhiemXa: ', dataCanhiemXa);
}

// Dữ liệu di biến động
var mobility_data = {};

function doDataMobility(data) {
    var results = readSheet(data);
    for (var i = 1; i < results.length; i++) {
        province = results[i][8];
        if (!(province in mobility_data)) {
            mobility_data[province] = {
                'date': [],
                'retail': [],
                'grocery': [],
                'park': [],
                'public_transit': [],
                'work': [],
                'residence': [],
            }
        }
        mobility_data[province]['date'].push(results[i][1]);
        mobility_data[province]['retail'].push(results[i][2]);
        mobility_data[province]['grocery'].push(results[i][3]);
        mobility_data[province]['park'].push(results[i][4]);
        mobility_data[province]['public_transit'].push(results[i][5]);
        mobility_data[province]['work'].push(results[i][6]);
        mobility_data[province]['residence'].push(results[i][7]);
    }
    loadDataLevel3();
}