google.charts.load('current');
google.charts.setOnLoadCallback(init);

var cantho_f0_inc = 0;
var cantho_f0 = 0;
var CT_cell_list = new Map();
var CT_cell = new Map();
var CT_cell_date = new Map();
var cantho_f1 = 0;
var cantho_f2 = 0;
var cantho_f3 = 0;

function init() {
    var url = 'https://docs.google.com/spreadsheets/d/1P1nfi2ZFzJP_tBYtoPL8m7aAm1lRZG1Zi-gYz0uroes/gviz/tq?sheet=Risk';
    var query = new google.visualization.Query(url);
    query.setQuery('select A, B, C');
    query.send(processSheetsData);
    var url1 = 'https://docs.google.com/spreadsheets/d/1P1nfi2ZFzJP_tBYtoPL8m7aAm1lRZG1Zi-gYz0uroes/gviz/tq?sheet=PublicTongHop';
    var query1 = new google.visualization.Query(url1);
    query1.setQuery('select A, B, C, D, E, F, J, K');
    query1.send(processSheetsData1);
}

function processSheetsData1(response) {

    var array = [];
    var dd = response.getDataTable();
    var columns = dd.getNumberOfColumns();
    var rows = dd.getNumberOfRows();
    // thendate = dd.getFormattedValue(0, 3);
    // console.log(thedate);
    // console.log(thendate);
    // for (var r = 0; r < rows; r++) {
    //     var row = [];
    //     for (var c = 0; c < columns; c++) {
    //         row.push(dd.getFormattedValue(r, c));
    //     }
    //     if (row[0] != "") {
    //         // console.log(row[0]);
    //         array.push({
    //             name: row[0],
    //             parent: row[1],
    //             cbo: row[2]
    //                 // dchi: row[3],
    //                 // ct: row[4],
    //                 // dtuong: row[5],
    //                 // stt: row[6]
    //         });
    //     }
    // }
    cantho_f0 = dd.getFormattedValue(0, 1);
    cantho_f1 = dd.getFormattedValue(0, 2);
    cantho_f2 = dd.getFormattedValue(0, 3);
    cantho_f3 = dd.getFormattedValue(0, 4);
    cantho_f0_inc = dd.getFormattedValue(3, 5);
    console.log('xxxxxxxxxxxxxxxxxxxx' + cantho_f0);
    console.log('xxxxxxxxxxxxxxxxxxxx' + cantho_f1);
    console.log('xxxxxxxxxxxxxxxxxxxx' + cantho_f2);
    console.log('xxxxxxxxxxxxxxxxxxxx' + cantho_f3);
    console.log('xxxxxxxxxxxxxxxxxxxx' + cantho_f0_inc);
    console.log("" + dd.getFormattedValue(1, 6));
    console.log("" + dd.getFormattedValue(1, 7));

    data_f0.set("Cần ThơBình Thuỷ", dd.getFormattedValue(1, 7));
    data_f0.set("Cần ThơCái Răng", dd.getFormattedValue(2, 7));
    data_f0.set("Cần ThơNinh Kiều", dd.getFormattedValue(3, 7));
    data_f0.set("Cần ThơThới Lai", dd.getFormattedValue(4, 7));
    data_f0.set("Cần ThơÔ Môn", dd.getFormattedValue(5, 7));
    data_f0.set("Cần ThơThốt Nốt", dd.getFormattedValue(6, 7));
    data_f0.set("Cần ThơPhong Điền", dd.getFormattedValue(7, 7));
    data_f0.set("Cần ThơCờ Đỏ", dd.getFormattedValue(9, 7));
    data_f0.set("Cần ThơVĩnh Thạnh", dd.getFormattedValue(10, 7));
    showInfoTinh(clicked_province);

}
var data;

function processSheetsData(response) {

    var array = [];
    var dd = response.getDataTable();
    var columns = dd.getNumberOfColumns();
    var rows = dd.getNumberOfRows();
    thedate = dd.getFormattedValue(0, 2);
    // thendate = dd.getFormattedValue(0, 3);
    // console.log(thedate);
    // console.log(thendate);
    for (var r = 0; r < rows; r++) {
        var row = [];
        for (var c = 0; c < columns; c++) {
            row.push(dd.getFormattedValue(r, c));
        }
        if (row[0] != "") {
            // console.log(row[0]);
            array.push({
                name: row[0],
                parent: row[1],
                cbo: row[2]
                    // dchi: row[3],
                    // ct: row[4],
                    // dtuong: row[5],
                    // stt: row[6]
            });
        }
    }
    // cantho_f0 = dd.getFormattedValue(0, 1);
    // cantho_f1 = dd.getFormattedValue(0, 2);
    // cantho_f2 = dd.getFormattedValue(0, 3);
    // cantho_f3 = dd.getFormattedValue(0, 4);
    // cantho_f0_inc = dd.getFormattedValue(0, 1)array[2][5];
    // console.log('xxxxxxxxxxxxxxxxxxxx' + cantho_f0);
    // console.log('xxxxxxxxxxxxxxxxxxxx' + cantho_f1);
    // console.log('xxxxxxxxxxxxxxxxxxxx' + cantho_f2);
    // console.log('xxxxxxxxxxxxxxxxxxxx' + cantho_f3);




    for (var i = 0; i < array.length; i++) {
        CT_cell_date.set(i + 1, dd.getFormattedValue(i, 0));
        var CT_stt = dd.getFormattedValue(i, 1);
        var CT_sc = dd.getFormattedValue(i, 2);

        var myArr = CT_stt.split(",");
        // console.log('xxxxxxxxxxxxxxxxxxxx' + myArr);
        var myArr1 = CT_sc.split(",");
        var cell = new Map();

        for (var j = 0; j < myArr.length; j++) {
            cell.set("" + myArr[j], myArr1[j]);
        }
        CT_cell_list.set(i + 1, cell);
    }
    CT_cell = CT_cell_list.get(array.length - 1);
    // console.log('xxxxxxxxxxxxxxxxxxxx' + CT_cell);
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" + CT_cell_list.size);

    $(function() {
        var handle = $("#custom-handle");
        $("#slider").slider({
            value: CT_cell_list.size,
            min: 1,
            max: CT_cell_list.size,
            step: 1,
            create: function() {
                handle.text(CT_cell_date.get($(this).slider("value")));
            },
            slide: function(event, ui) {
                CT_cell = CT_cell_list.get(ui.value);
                // if (clicked_layer == 4) {
                reset_adm4();
                // }
                clicked_layer = 4;
                handle.text(CT_cell_date.get(ui.value));
            }
        });
    });


    data = array;
    loadDataLevel2();
}