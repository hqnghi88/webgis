// function buildStringVietNam() {
//     var map = mapVN['VN'];
//     var str = `
//         <table id='customers' style="width: 650">
//             <tr><th>
//             Danh sách các tỉnh có nguy cơ cao nhất
//             <a data-toggle="collapse" href="#collapseOne" aria-expanded="true" 
//             aria-controls="collapseOne">
//                 <i style="float: right;"class="fas fa-angle-down rotate-icon">&nbsp;</i> 
//             </a>
//             </th><tr/>
//         </table>
//         <div id="collapseOne" style="width: 650" class="collapse show">
//         <table id='customers' style="width: 650">
//             <tbody>`;

//     mid = (map.length / 2).toFixed();
//     map.sort(function(x, y) {
//         let a = (data_core.get(x)),
//             b = (data_core.get(y));
//         if (("" + a) === "undefined") { a = 0.0; }
//         if (("" + b) === "undefined") { b = 0.0; }
//         if ((b - a) == 0) {
//             const f0x = getF0(data_f0, x);
//             const f0y = getF0(data_f0, y);
//             return f0y - f0x;
//         }
//         return b - a;
//     });

//     for (var i = 0; i < map.length; i += 3) {
//         var item = map[i];
//         var fit_zoom_func = `fit_zoom_to1('${item}')`;
//         str += (i < 12) ? '<tr><td>' : `<tr><td class="hidden">`
//         str += getItemTagDiaPhuong('', item, fit_zoom_func, i);
//         str += (i < 12) ? '</td><td>' : '</td><td class="hidden">';
//         if ((i + 1) < map.length) {
//             item = map[i + 1];
//             var fit_zoom_func = `fit_zoom_to1('${item}')`;
//             str += getItemTagDiaPhuong('', item, fit_zoom_func, i + 1);
//         }
//         str += (i < 12) ? '</td><td>' : `</td><td class="hidden">`
//         if ((i + 2) < map.length) {
//             item = map[i + 2];
//             var fit_zoom_func = `fit_zoom_to1('${item}')`;
//             str += getItemTagDiaPhuong('', item, fit_zoom_func, i + 2);;
//         }
//         str += '</td></tr>';
//     }
//     str += `
//         </tbody>
//         <tfoot>
//             <tr>
//             <td colspan="3" id="display">
//                 ... 
//                 <a href="#">nhấn để xem thêm</a></td>
//             </tr>
//         </tfoot>
//     </table></div>`;
//     str = str + createdModal();
//     str = str.replaceAll("undefined", "");


//     const caseChart_canvas = `<div id="collapseOne1" style="width: 650" class="collapse show">
//                                 <canvas id="caseChart" width="650" height="400"></canvas>
//                                </div>`;
//     str += `<table id='customers' style="width: 650">
//         <tr><th>
//         Thống kê ca nhiễm111s
//         <a data-toggle="collapse" href="#collapseOne1" aria-expanded="true" 
//         aria-controls="collapseOne1">
//             <i style="float: right;"class="fas fa-angle-down rotate-icon">&nbsp;</i>
//         </a>
//         </th></tr>
// 		</table>` + caseChart_canvas;
//     return str;
// };

function buildStringTinh(province, map) {
    const color = getColor(data_core.get(province));
    const f0text = getF0(data_f0, province);
    var str = `
        <table id='customers' style="width: 650">
            <tr><th>
            <i style="background:${color}">&nbsp;&nbsp;&nbsp;</i>&nbsp;
            ${province} (F0: ${f0text}),
            <a href="" onclick="return fit_zoom_to_VN();">Việt Nam</a>, 
            <a href="#" id="pop">Biện pháp đáp ứng</a>
            <a data-toggle="collapse" href="#collapseOne1" aria-expanded="true" 
            aria-controls="collapseOne1">
                <i style="float: right;" class="fas fa-angle-down rotate-icon">&nbsp;</i> 
            </a>
            </th><tr/>
        </table>
        <div id="collapseOne1" style="width: 650" class="collapse show">
        <table id='customers' style="width: 650">`;

    mid = (map.length / 2).toFixed();
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
        str += '<tr><td>'
        str += getItemTagDiaPhuong(province, district, fit_zoom_func, i);
        str += '</td><td>';
        if ((i + 1) < map.length) {
            district = map[i + 1];
            var fit_zoom_func = `fit_zoom_to2('${province}','${district}')`;
            str += getItemTagDiaPhuong(province, district, fit_zoom_func, i + 1);
        }
        str += '</td><td>';
        if ((i + 2) < map.length) {
            district = map[i + 2];
            var fit_zoom_func = `fit_zoom_to2('${province}','${district}')`;
            str += getItemTagDiaPhuong(province, district, fit_zoom_func, i + 2);
        }
        str += '</td></tr>';
    }
    str += '</table></div>';
    str = str + createdModal();

    return str.replaceAll("undefined", "");
};


function buildStringHuyen(province, district, map) {
    var parent = province + district;

    const color = getColor(data_core.get(province));
    const color_district = getColor(data_core.get(province + district));
    const f0text = getF0(data_f0, province);
    const f0text_district = getF0(data_f0, province + district);
    var fit_zoom_func = `fit_zoom_to1('${province}')`;
    var str = `
    <table id='customers' style="width: 650">
        <tr><th>
            <i style="background:${color_district}">&nbsp;&nbsp;&nbsp;</i>${district}
            &nbsp;(F0: ${f0text_district}), 
            <i style="background:${color}">&nbsp;&nbsp;&nbsp;</i>&nbsp;
            <a href="" onclick="return ${fit_zoom_func};">${province}</a>&nbsp;
            (F0: ${f0text}),
            <a href="#" id="pop">Biện pháp đáp ứng</a>
            <a data-toggle="collapse" href="#collapseOne1" 
                aria-expanded="true" aria-controls="collapseOne1">
                <i style="float: right;"class="fas fa-angle-down rotate-icon">&nbsp;</i> 
            </a>
        </th><tr/></table>
    <div id="collapseOne1" style="width: 650" class="collapse show">
        <table id='customers' style="width: 650">`;

    // mid = (map.length / 2).toFixed();
    map.sort(function(x, y) {
        let a = (data_core.get(parent + x)),
            b = (data_core.get(parent + y));
        if (("" + a) === "undefined") { a = 0.0; }
        if (("" + b) === "undefined") { b = 0.0; }
        return b - a;
    });

    for (var i = 0; i < map.length; i += 3) {
        item = map[i];
        fit_zoom_func = `fit_zoom_to3('${province}','${district}','${item}')`;
        str += '<tr><td>'
        str += getItemTagDiaPhuong(parent, item, fit_zoom_func, i);
        str += '</td><td>';
        if ((i + 1) < map.length) {
            item = map[i + 1];
            fit_zoom_func = `fit_zoom_to3('${province}','${district}','${item}')`;
            str += getItemTagDiaPhuong(parent, item, fit_zoom_func, i + 1);
        }
        str += '</td><td>';
        if ((i + 2) < map.length) {
            item = map[i + 2];
            fit_zoom_func = `fit_zoom_to3('${province}','${district}','${item}')`;
            str += getItemTagDiaPhuong(parent, item, fit_zoom_func, i + 2);
        }
        str += '</td></tr>';
    }
    str += '</table></div>';
    str = str + createdModal();
    return str.replaceAll("undefined", "");
};

function buildStringXa(province, district, commune) {
    const color = getColor(data_core.get(province));
    const color_district = getColor(data_core.get(province + district));
    const f0text = getF0(data_f0, province);
    const f0text_district = getF0(data_f0, province + district);
    var fit_zoom_to2 = `fit_zoom_to2('${province}', '${district}')`;
    var fit_zoom_to1 = `fit_zoom_to1('${province}')`;
    return `
    <table id='customers' style="width: 650">
        <tr><th>
            ${commune}&nbsp;
            <i style="background:${color_district}">&nbsp;&nbsp;&nbsp;</i>&nbsp;
            <a href="" onclick="return ${fit_zoom_to2};">${district}</a>&nbsp;
            (F0: ${f0text_district}),
            <i style="background:${color}">&nbsp;&nbsp;&nbsp;</i>&nbsp;
            <a href="" onclick="return ${fit_zoom_to1};">${province}</a>
            &nbsp;(F0: ${f0text}), 
            <a href="#" id="pop">Biện pháp đáp ứng</a>            
        </th><tr/>
    </table>` + createdModal();
}