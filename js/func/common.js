// dữ liệu lịch sử ca nhiêm cả nước
var dataHisCaNhiem = {};
// dữ liệu tổng số ca đến ngày hiện tại
var data_f0 = new Map();

// dữ liệu tổng số ca ở các tỉnh
var dataChartCaNhiemToanQuoc = {
    'tinh': [],
    'F0': []
};
var canhiem_labels = [];
var new_case_values = [];
var total_case_values = [];
var total_case_label = "Tổng số ca";
var new_case_label = "Số ca theo ngày";

function getF0(f0s, item) {
    return f0s.get(item) == undefined ? 0 : f0s.get(item);
}

// get color depending on population density value
function getColor(d) {
    if (("" + d) === "undefined") d = 0.0;
    if ((province == "Cần Thơ") && clicked_layer == 4) {
        if (("" + d) === "undefined") { d = 0.0; }
        return d > 7 ? INDEX_MODE_COLOR[3] :
            d > 3 ? INDEX_MODE_COLOR[2] :
            d > 0 ? INDEX_MODE_COLOR[1] :
            INDEX_MODE_COLOR[0];
    }
    return d >= 4 ? INDEX_MODE_COLOR[3] :
        d >= 3 ? INDEX_MODE_COLOR[2] :
        d >= 2 ? INDEX_MODE_COLOR[1] :
        d >= 1 ? INDEX_MODE_COLOR[0] :
        INDEX_MODE_COLOR[0];
}

function getScore(feature) {
    if (feature.properties.name1 && feature.properties.name2 && feature.properties.name1 == "Cần Thơ") {
        // if (clicked_layer == 4) {
        return CT_cell.get("" + feature.properties.stt);
    }
    var sc = data_core.get(feature.properties.name);
    if (feature.properties.name1 && feature.properties.name2) {
        sc = data_core.get(feature.properties.name1 + feature.properties.name2 + feature.properties.name);
    } else if (feature.properties.name1) {
        sc = data_core.get(feature.properties.name1 + feature.properties.name);
    }
    return sc;
}


// get lấy nhãn risk
function getRisk(d) {
    // ptype = ["","Bình thường mới", "Nguy cơ", "Nguy cơ cao", "Rất cao"]
    if ((province == "Cần Thơ") && clicked_layer == 4) {
        if (("" + d) === "undefined") { d = 0.0; }
        return d > 7 ? "Rất cao" :
            d > 3 ? "Nguy cơ cao" :
            d > 0 ? "Nguy cơ" :
            "Bình thường mới";
    }
    return d >= 4 ? "Rất cao" :
        d >= 3 ? "Nguy cơ cao" :
        d >= 2 ? "Nguy cơ" :
        d >= 1 ? "Bình thường mới" :
        "Bình thường mới";
}

function getTextToColor(text) {
    // ptype = ["","Bình thường mới", "Nguy cơ", "Nguy cơ cao", "Nguy cơ rất cao"]
    return text == 'Nguy cơ rất cao' ? INDEX_MODE_COLOR[3] :
        text == 'Nguy cơ cao' ? INDEX_MODE_COLOR[2] :
        text == 'Nguy cơ' ? INDEX_MODE_COLOR[1] :
        text == 'Bình thường mới' ? INDEX_MODE_COLOR[0] :
        INDEX_MODE_COLOR[0];
}

// get lấy nhãn risk
function getNguyCo(d) {
    // ptype = ["","Bình thường mới", "Nguy cơ", "Nguy cơ cao", "Rất cao"]
    return d;
}

function showBienPhapModalOnClick(province, district, commune) {
    var map = mapVN['VN'];
    if (province !== '') {
        map = mapVN[province];
    }
    if (district !== '') {
        map = mapVN[province + ' ' + district];
    }
    if (map == null) return;
    const _province = province;
    const _district = district;
    const _commune = commune;
    $('#pop').on("click", function() {
        document.getElementById("imageresource").innerHTML =
            panelUtil.getBienPhapContent(_province, _district, _commune);
        $('#imagemodal').modal('show');
    });
    for (var i = 0; i < map.length; i++) {
        const _commune = map[i];
        // tạo action cho modal hiển thị ảnh ổ dịch
        var pop_name = "#pop" + i;
        $(pop_name).on("click", function() {
            document.getElementById("imageresource").innerHTML =
                panelUtil.getBienPhapContent(_province, _district, _commune);
            $('#imagemodal').modal('show');
        });
    }
}

function showMoreRowOfTable() {
    $("#display").click(function() {
        $('.nguyco1').removeClass('hidden');
        $(this).addClass('hidden');
    });

    $("#display-nguyco").click(function() {
        $('.nguyco').removeClass('hidden');
        $(this).addClass('hidden');
        var tempScrollTop = $(window).scrollTop();
        setTimeout(function() {
            $(window).scrollTop(tempScrollTop);
        }, 100)

    });
}

function call_api(file_key, sheet_numer, callback, name) {
    // Dữ liệu di biến động của từng tỉnh
    const link = `https://spreadsheets.google.com/feeds/cells/${file_key}/${sheet_numer}/public/values?alt=json-in-script`;
    $.ajax({
            url: link,
            // jsonp: 'doDataMobility',
            dataType: 'jsonp',
            statusCode: {
                404: function() {
                    console.log(callback.name, "page not found");
                }
            }
        })
        .done(callback)
        // .fail(function () {
        //     console.log(callback.name, " load error!!");
        // })
        .always(function() {
            console.log(link);
            console.log(name, " load complete!!");
        });
}


const API_NGUYCO_HOST = 'https://api.antoancovid.vn/google-syn/api';

function call_host_api(path, parram, callback, name) {
    // Dữ liệu di biến động của từng tỉnh	
    const link = `${API_NGUYCO_HOST}/${path}?${parram}`;
    console.log("CALL API:" + path + "," + parram);
    $.ajax({
        url: link,
        statusCode: {
            404: function() {
                console.log(name, "page not found");
            },
            403: function() {
                console.log(name, "403 Forbidden Mã phản hồi trạng thái lỗi máy khách HTTP chỉ ra rằng máy chủ hiểu yêu cầu nhưng từ chối cho phép nó.");
            }
        },
        success: callback
    }).always(function() {
        console.log(link);
        console.log(name, " load complete!!");
    });
}

var data_info_general;

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