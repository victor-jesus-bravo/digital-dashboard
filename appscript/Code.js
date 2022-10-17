const REQUESTS_KEY = 'REQUESTS';
const REQUESTS_HEADERS_KEY = 'REQUESTS_HEADERS';
const DURATION_CACHE_TIME = 3600;
const emails = [
    "adrian_alberto_faz_jr@whirlpool.com",
    "dorlee_garcia@whirlpool.com",
    "victor_jesus_bravo@whirlpool.com",
    "kattia_puga@whirlpool.com",
    "octavio_r_giron@whirlpool.com",
    "nicolas_carvajal_mapower@whirlpool.com",
    "karen_marin@whirlpool.com",
    "marcelo_lozada@whirlpool.com"
];

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
    const user = Session.getActiveUser();

    Logger.log(user);

    const cache = CacheService.getScriptCache();

    const cachedData = cache.get(REQUESTS_KEY);

    if (cachedData) {
        return cachedData;
    }

    const spreadSheet = SpreadsheetApp
        .openByUrl('https://docs.google.com/spreadsheets/d/1hIMcoX4MLztbbG_p8oRie4duxd-sxiN_7LML91hEfK8/edit#gid=234180280');
    
    let requestSheet = spreadSheet.getSheetByName('REQUEST');
    let [headers, ...data] = requestSheet.getDataRange().getValues();

    cache.put(REQUESTS_KEY, JSON.stringify(
        sanitizeData(data, headers)
    ));

    return JSON.stringify(
        sanitizeData(data, headers)
    );
}

function isAuthorizedUser(user) {
    
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

