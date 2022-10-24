function doGet() {
    const template = HtmlService.createTemplateFromFile('index');

    return template
        .evaluate()
        .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
}

function saveRequest(form) {
    let reqUser = Session.getActiveUser().getEmail();

    const helperSheet = spreadSheet.getSheetByName('HELPER');

    let getNumberId = searchId('REQUEST',helperSheet);
    getNumberId = getNumberId[1] + 1;
    let newReq = "REQ" + pad(getNumberId, 5);
    
    spreadSheet.getSheetByName('REQUEST').appendRow([newReq, new Date().toLocaleDateString(), reqUser, form.reqType, form.brand, form.title, form.description, form.kpi,'requested','tbd'])

    modifyId('REQUEST',helperSheet,2,getNumberId);

    return {
        status: 200
    }
}