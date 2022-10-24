function getRequestsData() {
    let requestSheet = spreadSheet.getSheetByName('REQUEST');
    let [headers, ...data] = requestSheet.getDataRange().getValues();

    let sanitizedData = sanitizeData(data, headers)

    const user = getCurrentUser();

    if (!isAuthorizedUser(user)) {
        sanitizedData = sanitizedData.filter((value) => {
            return value.requestUser == user
        })
    }

    return JSON.stringify(
        sanitizedData
    );
}

function saveRequest(form) {
    let reqUser = getCurrentUser();

    const helperSheet = spreadSheet.getSheetByName('HELPER');

    let getNumberId = searchId('REQUEST',helperSheet);
    getNumberId = getNumberId[1] + 1;
    let newReq = "REQ" + pad(getNumberId, 5);
    
    spreadSheet.getSheetByName('REQUEST').appendRow([newReq, new Date().toLocaleDateString(), reqUser, form.reqType, form.brand, form.title, form.description, form.kpi,'requested','tbd'])

    modifyId('REQUEST',helperSheet,2,getNumberId);

    GmailApp.sendEmail(authorizedUsers.toString(), "New Request | "+form.title+" | "+newReq, (""),
    {
    'htmlBody' : '<!DOCTYPE html><html><head><title>New Request</title></head><body><div><p>Request ID: '+newReq+'</p><p>Requester: '+reqUser+'</p><p>Brand: '+form.brand+'</p><p>Title: '+form.title+'</p><p>Description: '+form.description+'</p><p>KPIs effected: '+form.kpi+'</p></div></body></html>',
    });

    return {
        status: 200
    }
}