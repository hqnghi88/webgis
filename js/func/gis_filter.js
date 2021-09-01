function provinceFilter(feature) {
    if (clicked_province === "" && getScore(feature) > 0) return true;
    if (feature.properties.name1 === clicked_province && getScore(feature) > 0) return true;
}

function districtFilter(feature) {
    if ((clicked_province === "" || clicked_district === "") && getScore(feature) > 0) return true;
    if (feature.properties.name1 === clicked_province && feature.properties.name2 === clicked_district && getScore(feature) > 0) {
        return true;
    }
}

function districtFilter2(feature) {
    if ((clicked_province === "" || clicked_district === "") && getScore(feature) > 0) return true;
    if (feature.properties.name1 === clicked_province && feature.properties.name === clicked_district && getScore(feature) > 0) {
        return true;
    }
}

function communeFilter(feature) {
    if ((clicked_province === "" || clicked_district === "" || clicked_commune === "") && getScore(feature) > 0) return true;
    if (feature.properties.name1 === clicked_province && feature.properties.name2 === clicked_district && feature.properties.name === clicked_commune && getScore(feature) > 0) {
        return true;
    }
}