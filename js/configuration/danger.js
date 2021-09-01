INDEX_MODE = 'danger';
INDEX_MODE_COLOR = ['#0FA57F', '#F1BA15', '#F28E12', '#DA4711'];
CONFIGURATION = [{
    'class': 'AtCovidController',
    'mode': true,
    'name': 'Tiến độ An Toàn Covid',
    'description': ''
},
{
    'class': 'F0DiaPhuongController',
    'mode': true,
    'name': 'F0 của từng vùng',
    'description': ''
},
{
    'class': 'F0PointControler',
    'mode': true,
    'name': 'biểu diễn F0 theo vùng',
    'description': ''
},
{
    'class': 'F0DailyController',
    'mode': true,
    'name': 'F0 hàng ngày theo vùng===',
    'description': ''
},

{
    'class': 'F0DailyToanQuocController',
    'mode': true,
    'name': 'F0 hàng ngày theo vùng===',
    'description': ''
},
{
    'class': 'F0DailyTinhController',
    'mode': true,
    'name': 'F0 hàng ngày theo vùng===',
    'description': ''
},

{
    'class': 'F0DailyHuyenController',
    'mode': true,
    'name': 'F0 hàng ngày theo vùng===',
    'description': ''
},
{
    'class': 'F0DailyXaController',
    'mode': true,
    'name': 'F0 hàng ngày theo vùng===',
    'description': ''
},
{
    'class': 'HisNguyCoTinhLoader',
    'mode': true,
    'name': 'Biểu diễn chỉ số nguy cơ theo tỉnh/thành',
    'description': ''
},
{
    'class': 'HisNguyCoHuyenLoader',
    'mode': true,
    'name': 'Biểu diễn chỉ số nguy cơ theo quận/huyện',
    'description': ''
},
{
    'class': 'HisNguyCoXaLoader',
    'mode': true,
    'name': 'Biểu diễn chỉ số nguy cơ theo phường/xã',
    'description': ''
},
{
    'class': 'HisNguyCoControler',
    'mode': true,
    'name': 'Biểu diễn lịch sử nguy cơ trên bản đồ',
    'description': ''
},
{
    'class': 'ListRegionControler',
    'mode': true,
    'name': 'Biểu diễn danh sách vùng',
    'description': 'Biểu diễn danh sách vùng và modal biện pháp, gán nhãn tổng F0 lên bản đồ'
},
{
    'class': 'MobilityLoader',
    'mode': true,
    'name': 'Biểu diễn mức di biến động các vùng',
    'description': 'Biểu diễn mức di biến động các vùng'
},
{
    'class': 'StaticPointController',
    'mode': false,
    'name': 'Biểu diễn các điểm tĩnh trên bản đồ',
    'description': 'Biểu diễn các điểm tĩnh trên bản đồ'
},
{
    'class': 'ThongKeNguyCoToanQuocLoader',
    'mode': true,
    'name': 'Bảng biểu diễn thống kê nguy cơ toàn quốc',
    'description': 'Bảng biểu diễn thống kê nguy cơ toàn quốc'
},
{
    'class': 'ThongKeNguyCoTinhLoader',
    'mode': true,
    'name': 'Bảng biểu diễn thống kê nguy cơ tỉnh/thành',
    'description': 'Bảng biểu diễn thống kê nguy cơ tỉnh/thành'
},
{
    'class': 'ThongKeNguyCoHuyenLoader',
    'mode': true,
    'name': 'Bảng biểu diễn thống kê nguy cơ quận/huyện',
    'description': 'Bảng biểu diễn thống kê nguy cơ quận/huyện'
},
{
    'class': 'ThongTinNguyCoTinhLoader',
    'mode': true,
    'name': 'Bảng thông tin tổng hợp tỉnh/thành',
    'description': 'Bảng thông tin tổng hợp tỉnh/thành'
},
{
    'class': 'ThongTinNguyCoHuyenLoader',
    'mode': true,
    'name': 'Bảng thông tin tổng hợp quận/huyện',
    'description': 'Bảng thông tin tổng hợp quận/huyện'
},
{
    'class': 'ThongTinNguyCoXaLoader',
    'mode': true,
    'name': 'Bảng thông tin tổng hợp phường/xã',
    'description': 'Bảng thông tin tổng hợp phường/xã'
},
{
    'class': 'ExpertLoader',
    'mode': false,
    'name': 'Bảng thông tin chuyên gia đánh giá',
    'description': 'Bảng thông tin chuyên gia đánh giá'
},
{
    'class': 'SpreadClusterVnLoader',
    'mode': false,
    'name': 'Bảng ảnh chùm lây toàn quốc',
    'description': 'Bảng ảnh chùm lây toàn quốc'
},
{
    'class': 'SpreadClusterProvinceLoader',
    'mode': false,
    'name': 'Bảng ảnh chùm lây tỉnh/thành',
    'description': 'Bảng ảnh chùm tỉnh/thành'
}
];