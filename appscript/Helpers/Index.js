function sanitizeData(data, headers) {
    return data.map(row => {
        return row.reduce((acc, value, i) => {
          const key = headers[i];
          if (key === '') return acc;
          return { ...acc, [key]: value };
        }, {});
    });
}

function resetCache() {
  const cache = CacheService.getScriptCache();

  cache.remove(REQUESTS_KEY);
}

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

function searchId(searchChosenId,searchSheetId){
  var search_string = searchChosenId;
  var textFinder = searchSheetId.createTextFinder(search_string);
  var search_row = textFinder.findAll()[0].getRow();
  var newarray = searchSheetId.getRange(search_row,1,1,20).getValues()[0];
  return newarray.filter(String);
}

function modifyId(searchChosenId,searchSheetId, cellId, contentToBe){
  var search_string = searchChosenId;
  var textFinder = searchSheetId.createTextFinder(search_string);
  var search_row = textFinder.findAll()[0].getRow();
  searchSheetId.getRange(search_row,cellId).setValue(contentToBe);
}