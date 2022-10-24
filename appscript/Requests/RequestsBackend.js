function getRequestsData() {
    let requestSheet = spreadSheet.getSheetByName('REQUEST');
    let [headers, ...data] = requestSheet.getDataRange().getValues();

    return JSON.stringify(
        sanitizeData(data, headers)
    );
}