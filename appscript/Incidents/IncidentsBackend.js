function getIncidentsData() {
    let requestSheet = spreadSheet.getSheetByName('INCIDENT');
    let [headers, ...data] = requestSheet.getDataRange().getValues();

    return JSON.stringify(
        sanitizeData(data, headers)
    );
}