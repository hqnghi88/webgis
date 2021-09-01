API_ATCOVID_HOST = 'https://antoancovid.dtt.vn/api/v1/dashboard';

class AtCovidController {
    constructor() {
        this.data = new Map();
        this.modeDone = new Map();
        // this._call('deployment-progress-report', 'province_id=0',
        //             this.do, 'AtCovidController');
    }

    _call(path, parram, callback, name) {
        const link = `${API_ATCOVID_HOST}/${path}?${parram}`;
        $.ajax({
            url: link,
            statusCode: {
                404: function () {
                    console.log(name, "page not found");
                },
                403: function () {
                    console.log(name, "403 Forbidden Mã phản hồi trạng thái lỗi máy khách HTTP chỉ ra rằng máy chủ hiểu yêu cầu nhưng từ chối cho phép nó.");
                }
            },
            success: callback
        }).always(function () {
            console.log(link);
            console.log(name, " load complete!!");
        });
    }

    _get_name_by_dv_id(id) {
        for (var i = 0; i < ATCOVID_PROVINCES.length; i++) {
            if (id == ATCOVID_PROVINCES[i]['id_dv'])
                return ATCOVID_PROVINCES[i]['name'];
        }
    }
    do(data) {
        var key = data["province_id"] == 0 ? 'Việt Nam' : atCovidController._get_name_by_dv_id(data["province_id"]);
        var mydata = data['province_data'];
        var tpm = [];
        const keys = Object.keys(mydata);
        // console.log(keys);
        for (var i = 0; i < keys.length; i++) {
            tpm.push(mydata[keys[i]]);
        }
        atCovidController.data.set(key, tpm);
        atCovidController.load(key);
    }

    load(province) {
        var content = '';
        const ls = this.data.get(province);
        if(!ls) return;
        for (var i = 0; i < ls.length; i++) {
            content += `
                <tr><td>
                    ${ls[i]['object_name']}
                </td><td>
                    ${ls[i]['last_month_total']}
                </td><td>
                    ${ls[i]['current_month_total']}
                </td><td>
                    ${ls[i]['increasing_total']}
                </td><td>
                    ${ls[i]['increasing_percent']}%
                </td></tr>
            `;
        }
        content = `
        <table id='customers' style="width: 680">
            <tr><th>
            Tiến độ triển khai An Toàn Covid tại ${province} trong 30 ngày qua
            <a data-toggle="collapse" href="#ThongKeAtCovid" aria-expanded="true" 
            aria-controls="ThongKeAtCovid">
                <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
            </a>
            </th></tr>
        </table>
        <div id="ThongKeAtCovid" style="width: 680" class="collapse show">
            <table id='customers' style="width: 680">
                <colgroup>
                    <col span='1' style='width: 40%;'>
                    <col span='1' style='width: 15%;'>
                    <col span='1' style='width: 15%;'>
                    <col span='1' style='width: 15%;'>
                    <col span='1' style='width: 15%;'>
                </colgroup>
                <tr>
                    <th>Nhóm đối tượng</th>                    
                    <th>Tổng trước</th>
                    <th>Tổng hiện tại</th>
                    <th>Số lượng tăng</th>
                    <th>Tỉ lệ tăng</th>
                </tr>
                ${content}
            </table>
        </div>`;
        document.getElementById("divThongKeAtCovid").innerHTML = content;
    }

    show(province) {
        if (province == 'Việt Nam') {
            if (!this.data.get(province)) {
                this._call('deployment-progress-report', 'province_id=0',
                    this.do, 'AtCovidController');
            }
        } else {
            for (var i = 0; i < ATCOVID_PROVINCES.length; i++) {
                if (province == ATCOVID_PROVINCES[i]['name']) {
                    const id = ATCOVID_PROVINCES[i]['id_dv'];
                    const parram = `province_id=${id}`;
                    if (!this.data.get(province)) {
                        this._call('deployment-progress-report', parram,
                            this.do, 'AtCovidController');
                    }
                }
            }
        }
        return `<div id="divThongKeAtCovid"></div>`;
    }
}
var atCovidController = null;
if (kernel.checkMode(AtCovidController.prototype.constructor.name))
    atCovidController = kernel.addClass(new AtCovidController());