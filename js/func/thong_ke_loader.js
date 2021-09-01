class ThongKeNguyCoToanQuocLoader {
    constructor() {
        this.data = [];
        // this.api();
    }
    do(data) {
       var results = data.datas;
 		//console.log(JSON.stringify(results));  
        const data_len = results.length;
        for (var i = 0; i < data_len; i++) {
            var str = `<tr>
                        <td>${results[i].caphanhchinh}</td>
                        <td>${results[i].mucnguyco}</td>
                        <td>${results[i].soluong}</td>
                    </tr>`;
            thongKeNguyCoToanQuocLoader.data.push(str);
        }
        thongKeNguyCoToanQuocLoader.load();
    }
    load() {
        var content = thongKeNguyCoToanQuocLoader.data.length > 0 ?
            thongKeNguyCoToanQuocLoader.data.join('') : '';
        content = `
        <table id='customers' style="width: 680">
            <tr><th>
            Thống kê nguy cơ trên Toàn Quốc
            <a data-toggle="collapse" href="#ThongKeNguyCoToanQuoc" aria-expanded="true" 
            aria-controls="ThongKeNguyCoToanQuoc">
                <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
            </a>
            </th></tr>	
        </table>
        <div id="ThongKeNguyCoToanQuoc" style="width: 680" class="collapse show">
            <table id='customers' style="width: 680">
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
        document.getElementById("ThongKeNguyCo").innerHTML = content;
    }
    api() {
        //call_api('1_TKYFJ69Uh-s0i6fk8A7mvecTu76d2oDtLg0ZB-2Dug', 5,
           // this.do, 'ThongKeNguyCoToanQuocLoader');
		call_host_api('thongKeNguyCo/Toanquoc',null, this.do, 'CALL API nguy co ToanQUocs');	

 	   
	
    }
    show() {
        if (this.data.length == 0) {
            this.api();
        }
        return `<div id="ThongKeNguyCo"></div>`;
    }
}

var thongKeNguyCoToanQuocLoader = null;
if (kernel.checkMode(ThongKeNguyCoToanQuocLoader.prototype.constructor.name))
    thongKeNguyCoToanQuocLoader = kernel.addClass(new ThongKeNguyCoToanQuocLoader());

var province_selected = '';
var dataThongkeNguyco = {};
class ThongKeNguyCoTinhLoader {
    constructor() {
        // this.api();
    }
    do(data) {
         var results = data.datas;
 		//console.log("===============ThongKeNguyCoTinhLoader:"+JSON.stringify(results));  
	
        for (var i = 1; i < results.length; i++) {
            const province = results[i].tentinh;
            // data_core.set(ten_tinh, results[i][2]); // bỏ
            // data_f0.set(ten_tinh, results[i][3]); // bỏ
            const image_link = results[i].tentinh;
            // dataChartCaNhiemToanQuoc['tinh'].push(ten_tinh); // bỏ
            // dataChartCaNhiemToanQuoc['F0'].push(results[i][3]); // bỏ
        
			var content ="";
			var data =results[i].data;
			for(var j=0;j<data.length;j++){
				var d =data[j];
				content =content+ `<tr>
                <td>`+d.caphanhchinh+`</td>
                 <td>`+d.mucnguyco+`</td>
                <td>`+d.soluong+`</td>
                 <td>`+d.danso+`</td>
            </tr>`;
			}
			 dataThongkeNguyco[province] = [content];
            // console.log(results[i]);
            if (image_link == undefined || image_link == null || image_link == '') {
                images_tinh.set(results[i].tentinh, '');
            } else {
                const image_row = `
                    <tr><td colspan="3">
                        <a href="#" id="pop">
                            <img id="imageresource" width="700" src="${image_link}">
                        </a>
                    </td></tr>`;

                images_tinh.set(results[i][1], image_row);
            }
        }
        thongKeNguyCoTinhLoader.load(province_selected);
    }
    api() {
        //call_api('1_TKYFJ69Uh-s0i6fk8A7mvecTu76d2oDtLg0ZB-2Dug', 1,
           // this.do, this.constructor.name);
		call_host_api('thongKeNguyCo/tinh',null, this.do, 'CALL API nguy co ToanQUocs');	
    }

    load(province) {
		//alert(province);
        var content = dataThongkeNguyco[province] ? dataThongkeNguyco[province].join('') : '';
		//alert(content);
        content = `
        <table id='customers' style="width: 680">
            <tr><th>
            Thống kê nguy cơ trên toàn Tỉnh
            <a data-toggle="collapse" href="#ThongKeNguyCoTinh" aria-expanded="true" 
            aria-controls="ThongKeNguyCoTinh">
                <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
            </a>
            </th></tr>	
        </table>
        <div id="ThongKeNguyCoTinh" style="width: 680" class="collapse show">
            <table id='customers' style="width: 680">
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
        document.getElementById("ThongKeNguyCo").innerHTML = content;
    }
    show(province) {
        if (!dataThongkeNguyco[province]){
            province_selected = province;
            this.api();
        }            
        return `<div id="ThongKeNguyCo"></div>`;
    }
}



var thongKeNguyCoTinhLoader = null;
if (kernel.checkMode(ThongKeNguyCoTinhLoader.prototype.constructor.name))
    thongKeNguyCoTinhLoader = kernel.addClass(new ThongKeNguyCoTinhLoader());

var district_selected = '';
class ThongKeNguyCoHuyenLoader {
    constructor() {
    }
    do(data) {
        var results = data.datas;
 		// console.log("===============ThongKeNguyCoHuyenLoader:"+JSON.stringify(results));  

        for (var i = 0; i < results.length; i++) {
           var huyen=results[i];
            const ten_quan =  huyen.tentinh+huyen.tenhuyen;
			//alert(ten_quan);
			var content ="";
			var data=huyen.data;
			//alert(data.length);
			for(var j=0;j<data.length;j++){
				var d =data[j];
				content =content+
				`<tr>
                <td>`+d.caphanhchinh+`</td>
                <td>`+d.mucnguyco+`</td>
               <td>`+d.soluong+`</td>
            	</tr>`;
				
			}
			
            dataThongkeNguyco[ten_quan] = [content];
        }

        adm2_layer = L.geoJson(mydata2, {
            style: style,
            filter: provinceFilter,
            onEachFeature: onEachFeature2
        }); //.addTo(map);

        thongKeNguyCoHuyenLoader.load(province_selected, district_selected);

    }
    api() {
       // call_api('1_TKYFJ69Uh-s0i6fk8A7mvecTu76d2oDtLg0ZB-2Dug', 2,
           // this.do, this.constructor.name);
		call_host_api('thongKeNguyCo/huyen',null, this.do, 'CALL API nguy co ToanQUocs');	
    }
    load(province, district){
		//alert(province+district);
		//console.log(dataThongkeNguyco);  
        var content = (dataThongkeNguyco[province + district]) ?
            dataThongkeNguyco[province + district].join('') : '';
		//alert(province+district+":========:"+content);
        content =  `
        <table id='customers' style="width: 680">
            <tr><th>
            Thống kê nguy cơ trên toàn Quận/Huyện
            <a data-toggle="collapse" href="#ThongKeNguyCoQuan" aria-expanded="true" 
            aria-controls="ThongKeNguyCoQuan">
                <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
            </a>
            </th></tr>	
        </table>
        <div id="ThongKeNguyCoQuan" style="width: 680" class="collapse show">
            <table id='customers' style="width: 680">
                <colgroup>
                    <col span='1' style='width: 30%;'>
                    <col span='1' style='width: 40%;'>
                    <col span='1' style='width: 30%;'>
                </colgroup>
                <tr><th>Cấp hành chính</th>
                <th>Mức nguy cơ</th>
                <th>Số vùng</th></tr>`+content+`</table>
        </div>`;
		
        document.getElementById("ThongKeNguyCo").innerHTML = content;
    }

    show(province, district) {
        if (!dataThongkeNguyco[province + district]){
            province_selected = province;
            district_selected = district;
            this.api();
        }
        return `<div id="ThongKeNguyCo"></div>`;    
    }
}

var thongKeNguyCoHuyenLoader = null;
if (kernel.checkMode(ThongKeNguyCoHuyenLoader.prototype.constructor.name))
    thongKeNguyCoHuyenLoader = kernel.addClass(new ThongKeNguyCoHuyenLoader());