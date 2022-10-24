function getKPIS() {
    let requestSheet = spreadSheet.getSheetByName('KPIS');
    let [headers, ...data] = requestSheet.getDataRange().getValues();

    return JSON.stringify(
        sanitizeData(data, headers)
    );
}

function getSiteList() {
    let requestSheet = spreadSheet.getSheetByName('SITES');
    let [headers, ...data] = requestSheet.getDataRange().getValues();

    return JSON.stringify(
        sanitizeData(data, headers)
    );
}