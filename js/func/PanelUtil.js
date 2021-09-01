class PanelUtil {
    constructor() {
        this.colors = ['#C6AFD4', '#C6AFD4', '#C6AFD4', '#CD2519',
            '#0F93C0', '#0F93C0', '#0F93C0', '#C6AFD4',
            '#29C3CA', '#16B956', '#060F3D', '#F88911'
        ];
        this.image_share_path = "/tm/images/share-icon.png";
        this.object_colors = [
            { // blue
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
    getRangeColors() {
        return this.object_colors;
    }

    createdBienPhapModal() {
        const modal = `<!-- Creates the bootstrap modal where the image will appear -->
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

    getBienPhapContent(province, district, commune) {
        const key = province + district + commune;
        const core = data_core.get(key);
        var nguy_co_name = getRisk(core);
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

    createdImageModal() {
        const modal = `<!-- Creates the bootstrap modal where the image will appear -->
        <div class="modal fade" id="imagemodal" tabindex="-1" 
            role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> 
          <div class="modal-dialog" style="max-width: 800px;"> 
            <div class="modal-content"> 
              <div class="modal-header"> 
                <h4 class="modal-title" id="myModalLabel">Xem trước ảnh</h4> 
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">Đóng</span>
                </button> 
              </div> 
              <div class="modal-body"> 
                <img src="" id="imagepreview" style="max-width: 700px;" > 
              </div> 
              <div class="modal-footer"> 
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button> 
              </div> 
            </div> 
          </div> 
        </div>`;
        return modal;
    }    
}

panelUtil = new PanelUtil()