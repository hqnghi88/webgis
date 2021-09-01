var data_info_vung = new Map();
var thong_tin_key = '';
var thong_tin_admin_level = '';
class BaseThongTinNguyCoLoader {
    constructor() {}

    api(sheet, name) {
        //call_api('1fFZwFtWdfD_IADMBivLxLxVHbHHqFb-8fbeFAZRtpuI', sheet,
        //  this.do, name);
        //alert(name);
        if (name == 'ThongTinNguyCoTinhLoader') {
            call_host_api('dienGiaiNguyCo/tinh', null, this.do, 'CALL API dienGiaiNguyCo Tinh');
        }
        if (name == 'ThongTinNguyCoHuyenLoader') {

            call_host_api('dienGiaiNguyCo/huyen', null, this.do, 'CALL API dienGiaiNguyCo Huyen');
        }

        if (name == 'ThongTinNguyCoXaLoader') {
            //alert(name);
            call_host_api('dienGiaiNguyCo/xa', null, this.do, 'CALL API dienGiaiNguyCo Huyen');
        }


    }
    load(key, admin_level) {
        if (!data_info_vung.get(key)) {
            return;
        }
        var content = data_info_vung.get(key);
        if (admin_level == 'Phường/Xã') {
            // document.getElementById("ThongTinNguyCo").innerHTML = content;
            //return;
        }

        content = `
        <table id='customers' style="width: 680">
            <tr><th>
            ${admin_level} có một số điều kiện thỏa mãn <a style="color: #f8f8f8;text-decoration: underline;" href="https://m.thuvienphapluat.vn/van-ban/the-thao-y-te/quyet-dinh-2686-qd-bcdqg-2021-bien-phap-hanh-chinh-trong-phong-chong-dich-dich-covid-19-476067.aspx" target="_blank">chỉ thị 2686</a> như sau:            
            <a data-toggle="collapse" href="#ThongTinTinh" aria-expanded="true" 
            aria-controls="ThongTinTinh">
                <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
            </a>
            </th></tr>
        </table>
        <div id="ThongTinTinh" style="width: 680" class="collapse show">
            <table id='customers' style="width: 680">
                <colgroup>
                    <col span='1' style='width: 70%;'>
                    <col span='1' style='width: 30%;'>
                </colgroup>
                <tr>
                    <th>Nội dung</th>
                    <th>Vùng nguy cơ</th>
                </tr>
                ${content}
            </table>
        </div>`;
        document.getElementById("ThongTinNguyCo").innerHTML = content;
    }
}

class ThongTinNguyCoTinhLoader extends BaseThongTinNguyCoLoader {
    constructor() {
        super();
        // this.api();
    }
    do(data) {
        //     var results = data.data;
        // 	//console.log("===============ThongTinNguyCoTinhLoader:"+JSON.stringify(results)); 
        //     var doing = [];
        //     for (var i = 0; i < results.length; i++) {
        // 		var tinh = results[i];
        // 		var ten =tinh.tentinh;
        //         if (!doing.includes(ten)){
        //             data_info_vung.set(ten,'');
        //             doing.push(ten);
        //         }
        //         var s = s = data_info_vung.get(ten);            
        //         //     ${results[i][1]}
        //         // </td><td>
        // 		var data =tinh.data;
        // 		var content="";
        // 		for(var j=0;j<data.length;j++){
        // 			var d =data[j];
        // 			content=content+
        // 			`
        //        		 <tr>
        // 				<td>`+d.noidung+`</td>
        // 				<td><i style="background:${getTextToColor(d.nguyco)};color:white">`+d.giatri+`</i></td>
        // 			</tr>`;
        // 		}

        //         data_info_vung.set(ten, content.replaceAll("undefined", ""));                          
        //     }
        //     thongTinNguyCoTinhLoader.load(thong_tin_key, thong_tin_admin_level);

        // if (kernel.checkMode(ThongTinNguyCoHuyenLoader.prototype.constructor.name))
        // 	thongTinNguyCoHuyenLoader = kernel.addClass(new ThongTinNguyCoHuyenLoader());

    }
    api() {
        super.api(1, this.constructor.name);
    }

    show(province) {
        if (!data_info_vung.get(province)) {
            thong_tin_key = province;
            thong_tin_admin_level = "Tỉnh/Thành";
            this.api();
        }

        return `<div id="ThongTinNguyCo"></div>`;
        // return super.show(province, "Tỉnh/Thành")
    }
}

var thongTinNguyCoTinhLoader = null;
if (kernel.checkMode(ThongTinNguyCoTinhLoader.prototype.constructor.name))
    thongTinNguyCoTinhLoader = kernel.addClass(new ThongTinNguyCoTinhLoader());

class ThongTinNguyCoHuyenLoader extends BaseThongTinNguyCoLoader {
    constructor() {
        super();
    }
    do(data) {
        var results = data.data;
        //console.log("===============ThongTinNguyCoTinhLoader:"+JSON.stringify(results)); 
        for (var i = 0; i < results.length; i++) {
            var huyen = results[i];
            var ten = huyen.tentinh + huyen.tenhuyen;
            var content = "";
            if (data_info_vung.get(ten)) {
                content = data_info_vung.get(ten);
            }

            var data = huyen.data;

            for (var j = 0; j < data.length; j++) {
                var d = data[j];
                content = content +
                    `<tr>
					<td>` + d.noidung + `</td>
					<td><i style="background:${getTextToColor(d.nguyco)};color:white">` + d.giatri + `</i></td>
				</tr>`;
            }

            data_info_vung.set(ten, content.replaceAll("undefined", ""));
        }
        thongTinNguyCoHuyenLoader.load(thong_tin_key, thong_tin_admin_level);


        if (kernel.checkMode(ThongTinNguyCoXaLoader.prototype.constructor.name))
            thongTinNguyCoXaLoader = kernel.addClass(new ThongTinNguyCoXaLoader());


    }
    api() {
        super.api(2, this.constructor.name);
    }

    show(province, district) {
        if (!data_info_vung.get(province + district)) {
            thong_tin_key = province + district;
            thong_tin_admin_level = "Quận/Huyện";
            this.api();
        }
        return `<div id="ThongTinNguyCo"></div>`;
    }
}

var thongTinNguyCoHuyenLoader = null;

class ThongTinNguyCoXaLoader extends BaseThongTinNguyCoLoader {
    constructor() {
        super();
    }
    do(data) {
        var results = data.data;
        //console.log("===============ThongTinNguyCoTinhLoader:"+JSON.stringify(results)); 
        for (var i = 0; i < results.length; i++) {
            var xa = results[i];
            var ten = xa.tentinh + xa.tenhuyen + xa.tenxa;
            var content = "";
            if (data_info_vung.get(ten)) {
                content = data_info_vung.get(ten);

            } else {


                var data = xa.data;

                for (var j = 0; j < data.length; j++) {
                    var d = data[j];
                    content = content +
                        `<tr>
					<td>` + d.noidung + `</td>
					<td><i style="background:${getTextToColor(d.nguyco)};color:white">` + d.giatri + `</i></td>
				</tr>`;
                }
            }


            data_info_vung.set(ten, content.replaceAll("undefined", ""));
        }
        //alert(content);
        thongTinNguyCoXaLoader.load(thong_tin_key, thong_tin_admin_level);
    }
    api() {
        super.api(3, this.constructor.name);
    }

    show(province, district, commune) {

        if (!data_info_vung.get(province + district + commune)) {
            thong_tin_key = province + district + commune;
            thong_tin_admin_level = "Phường/Xã";
            this.api();
        }
        return `<div id="ThongTinNguyCo"></div>`;
    }
}

var thongTinNguyCoXaLoader = null;