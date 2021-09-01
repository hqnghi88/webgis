function fit_zoom_to_VN(isZoom) {
    clicked_layer = 0;
    reset_adm1();
    if (!isZoom) {
        showInfoVietNam();
        Lmap.setView([10.122414170890883, 105.53565000000003], 10);
    }
    // document.getElementById("thelist").innerHTML = data_info_general;
    return false;
}

function fit_zoom_to1(adm1, isZoom) {
    clicked_province = adm1;
    clicked_district = "";
    clicked_commune = "";
    reset_adm2();
    if (!isZoom) {
        showInfoTinh(clicked_province);
        // Lmap.fitBounds(adm2_layer.getBounds());
    }
    return false;
}

function fit_zoom_to2(adm1, adm2, isZoom) {
    clicked_province = adm1;
    clicked_district = adm2;
    clicked_commune = "";
    reset_adm3();
    if (!isZoom) {
        showInfoHuyen(clicked_province, clicked_district);
        Lmap.fitBounds(adm3_layer.getBounds());
    }
    return false;
}

function fit_zoom_to3(adm1, adm2, adm3, isZoom) {
    clicked_province = adm1;
    clicked_district = adm2;
    clicked_commune = adm3;
    reset_adm4();
    if (!isZoom) {
        showInfoXa(clicked_province, clicked_district, clicked_commune);
        Lmap.fitBounds(adm3_layer.getBounds());
    }

    return false;
}