const REQUESTS_KEY = 'REQUESTS';
const REQUESTS_HEADERS_KEY = 'REQUESTS_HEADERS';
const DURATION_CACHE_TIME = 3600;

function doGet() {
    return HtmlService.createTemplateFromFile('index')
        .evaluate()
        .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
}

function resetCache() {
    const cache = CacheService.getScriptCache();

    cache.remove(REQUESTS_KEY);
}

function getRequestsData() {
    const spreadSheet = SpreadsheetApp
        .openByUrl('https://docs.google.com/spreadsheets/d/1hIMcoX4MLztbbG_p8oRie4duxd-sxiN_7LML91hEfK8/edit#gid=234180280');

    let requestSheet = spreadSheet.getSheetByName('REQUEST');
    let [headers, ...data] = requestSheet.getDataRange().getValues()

    return JSON.stringify(
        sanitizeData(data, headers)
    );
}

function sanitizeData(data, headers) {
    return data.map(row => {
        return row.reduce((acc, value, i) => {
          const key = headers[i];
          if (key === '') return acc;
          return { ...acc, [key]: value };
        }, {});
    });
}

