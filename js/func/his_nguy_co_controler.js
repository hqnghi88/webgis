var MAX_HIS_COUNTER = 10;
class HisNguyCoControler {
    constructor() {
        // super(data);  
        this.MAX_COUNTER = 10;
    }

    getRegionNameByLayer(key, layer) {
        if (layer == 1) {
            var result = [];
            var keys = [];
            var provinces = mapVN[key];
            if (clicked_layer > 1) {
                for (var i = 0; i < provinces.length; i++) {
                    var districts = mapVN[provinces[i]];
                    for (var j = 0; j < districts.length; j++) {
                        result.push(provinces[i] + districts[j]);
                        keys.push(provinces[i] + ' ' + districts[j]);
                    }
                }
                if (clicked_layer > 2) {
                    var tpm = [];
                    for (var i = 0; i < result.length; i++) {
                        var communes = mapVN[keys[i]];
                        for (var j = 0; j < districts.length; j++) {
                            tpm.push(result[i] + communes[j]);
                        }
                    }
                    result = tpm;
                }
                return result;
            }
        }
        if (layer == 2) {
            var result = [];
            var districts = mapVN[key];
            if (clicked_layer > 2) {
                for (var i = 0; i < districts.length; i++) {
                    var communes = mapVN[key + ' ' + districts[i]];
                    for (var j = 0; j < communes.length; j++) {
                        result.push(key + districts[i] + communes[j]);
                    }
                }
                return result;
            }
        }
        return null;
    }
    _change_data_core(counter, key, parent, layer) {

        var keys = this.getRegionNameByLayer(key, layer);

        if (!keys) {
            var keys = mapVN[key].slice();
            for (var i = 0; i < keys.length; i++) {
                keys[i] = parent + keys[i];
            }
            // console.log('_change_data_core1', key, keys);
        }
        else {
            // console.log('_change_data_core2', key, keys);
        }
        // đổi data_f0 để hiển thị tổng F0 trên tỉnh - huyện - xã         
        for (var i = 0; i < keys.length; i++) {
            var tmp = dataCsrAllHis.get(keys[i]);
            var tmp_f0 = dataHisCaNhiem[keys[i]];
            if (tmp && counter < tmp.length) {
                data_core.set(keys[i], tmp[counter]);
                if (tmp_f0) {
                    if (counter < tmp.length - tmp_f0.length){
                        data_f0.set(keys[i], 0);
                    }
                    else{
                        const LEN = counter - (tmp.length - tmp_f0.length);
                        data_f0.set(keys[i], tmp_f0[LEN]);
                    }
                }
            } else {
                data_core.set(keys[i], 0);
                data_f0.set(keys[i], 0);
            }
        }
    }

    setDataCore(counter, key, parent, layer) {
        // console.log(key, parent);
        if (layer < 4) {
            this._change_data_core(counter, key, parent, layer);
        }
        else {
            var tmp = dataCsrAllHis._change_data_coreget(parent);
            if (tmp && counter < tmp.length) {
                data_core.set(parent, tmp[counter]);
            } else {
                data_core.set(parent, 0);
            }
        }

        if (layer == 1) {
            if (clicked_layer > 1) {
                reset_adm(clicked_layer);
                if (listRegionControler)
                    listRegionControler.addLabelLayerMap(clicked_layer);
            }
            else {
                if (listRegionControler)
                    listRegionControler.addLabelLayerMap(layer);
                reset_adm(layer);
            }
        }
        else if (layer == 2) {
            if (clicked_layer == 3) {
                reset_adm(clicked_layer);
                if (listRegionControler)
                    listRegionControler.addLabelLayerMap(clicked_layer);
            }
            else {
                reset_adm(layer);
                if (listRegionControler)
                    listRegionControler.addLabelLayerMap(layer);
            }
        }
        else {
            reset_adm(layer);
            if (listRegionControler)
                listRegionControler.addLabelLayerMap(layer);
        }
        legend_date.update_time(hisNguyCoTinhLoader.Labels[counter], counter);
    }

    startPlay(counter) {
        if (counter < MAX_HIS_COUNTER) {
            if (counter == 0) {
                $('#PLAY-ICON').removeClass('fas fa-play');
                $('#PLAY-ICON').addClass('fas fa-play-circle');
            }
            // dang ở toàn quốc            
            var key = 'VN', parrent = '', layer = 1;
            // dang ở tỉnh
            if (clicked_province != "" && clicked_district == "" && clicked_commune == "") {
                key = clicked_province;
                parrent = clicked_province;
                layer = 2;
            }
            // dang ở huyện
            if (clicked_province != "" && clicked_district != "" && clicked_commune == "") {
                key = clicked_province + ' ' + clicked_district;
                parrent = clicked_province + clicked_district;
                layer = 3;
            }
            if (clicked_province != "" && clicked_district != "" && clicked_commune != "") {
                key = clicked_province + ' ' + clicked_district + ' ' + clicked_commune;
                parrent = clicked_province + clicked_district + clicked_commune;
                layer = 4;
            }

            setTimeout(function () {
                // console.log('is_playing',is_playing);
                if (!is_playing) {
                    hisNguyCoControler.setDataCore(MAX_HIS_COUNTER - 1, key, parrent, layer);
                } else {
                    hisNguyCoControler.setDataCore(counter, key, parrent, layer);
                    if (layer == 4) {
                        var f0PointControler = kernel.getInstance(F0PointControler.prototype);
                        f0PointControler.drawMarkersByDate(counter,
                            clicked_province,
                            clicked_district,
                            clicked_commune);
                    }
                    counter++;
                    hisNguyCoControler.startPlay(counter);
                }
            }, 1000);
        }
        else {
            is_playing = false;
            $('#PLAY-ICON').removeClass('fas fa-play-circle');
            $('#PLAY-ICON').addClass('fas fa-play');
        }
    }
}

var hisNguyCoControler = null;
if (kernel.checkMode(HisNguyCoControler.prototype.constructor.name))
    hisNguyCoControler = kernel.addClass(new HisNguyCoControler());