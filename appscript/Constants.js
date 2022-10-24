const DURATION_CACHE_TIME = 3600;
const spreadSheet = SpreadsheetApp
        .openByUrl('https://docs.google.com/spreadsheets/d/1hIMcoX4MLztbbG_p8oRie4duxd-sxiN_7LML91hEfK8/edit#gid=234180280');
let currentlyURL = '';