var mobility_loaded = false;
var mobility_data = {};
class MobilityLoader {
    constructor() {
        this.api();
    }

   do(data) {
        var results = data;
		//console.log(":MobilityLoader========================"+JSON.stringify(data));	
        for (var i = 1; i < results.length; i++) {
			var m = results[i];
            const province = m.tinhCb;
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
            mobility_data[province]['date'].push(m.ngay);
            mobility_data[province]['retail'].push(m.khuBanLe);
            mobility_data[province]['grocery'].push(m.choHieuThuoc);
            mobility_data[province]['park'].push(m.congVien);
            mobility_data[province]['public_transit'].push(m.giaoThongCongCong);
            mobility_data[province]['work'].push(m.noiLamViec);
            mobility_data[province]['residence'].push(m.noiO);
        }
        // console.log('mobility_data',mobility_data);
        // loadDataLevel2();
        zoom_based_layerchange(false);
    }

    api() {
        try {
	// call_api('17C2M92WIUUVYnsf_65IwmH21D4gAVHfO3fohOmUAeKY', 1,
           // this.do, this.constructor.name);
           
			call_host_api("mobility", null, this.do, "Mobility...");
        } catch (err) {
            console.log('MobilityLoader.api', err);
            mobility_loaded = false;
            return;
        }        
    }

    show(province) {
        if (!mobility_loaded) return '';
        // var title = '<h5 class="text-danger">Di chuyển trong tỉnh/thành phố ' + province + '(% thay đổi)</h5>';
        // if (province == 'Việt Nam'){
        // 	title = '<h5 class="text-danger">Di chuyển trong Việt Nam (% thay đổi)</h5>';
        // }
        return `
        <table id='customers' style="width: 680">
        <tr>
            <th>
                Di chuyển trong ${province} (% thay đổi)
                <a data-toggle="collapse" href="#DivMobility" aria-expanded="true" 
            aria-controls="DivMobility">
                <i style="float: right;" class="fas fa-angle-up rotate-icon">&nbsp;</i>
            </a> 		
            </th>
        </tr></table>
        <div id="DivMobility" style="width: 680; border-style: outset;" class="collapse show">
        <div>
        <table id="mobility-table">
            <tr>
                <td><canvas id="retail" width="220" height="200"></canvas></td>
                <td><canvas id="grocery" width="220" height="200"></canvas></td>
                <td><canvas id="park" width="220" height="200"></canvas></td>
            </tr>
            <tr>
                <td><canvas id="public_transit" width="220" height="200"></canvas></td>
                <td><canvas id="work" width="220" height="200"></canvas></td>
                <td><canvas id="residence" width="220" height="200"></canvas></td>
            </tr>
        </table>
        </div>
        </div>
        `;
    }

    setup(province) {
        if (!mobility_loaded) return;
        var labels = {
            "retail": "Khu bán lẻ/giải trí",
            "grocery": "Khu chợ/hiệu thuốc",
            "park": "Công viên",
            "public_transit": "Giao thông công cộng",
            "work": "Nơi làm việc",
            "residence": "Nơi ở"
        }

        for (const [key, value] of Object.entries(labels)) {
            var ctx = document.getElementById(key).getContext("2d");
            //console.log('mobility_data', province, mobility_data[province]);
            var dataLabel = null;
            try {
                dataLabel = mobility_data[province]['date'];
            } catch (err) {
                console.log('MobilityLoader.setup', err);
                return;
            }
            var chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dataLabel,
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
}
var mobilityLoader = null;
if (kernel.checkMode(MobilityLoader.prototype.constructor.name))
    mobilityLoader = kernel.addClass(new MobilityLoader());
