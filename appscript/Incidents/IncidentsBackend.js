function getIncidentsData() {
    let requestSheet = spreadSheet.getSheetByName('INCIDENT');
    let [headers, ...data] = requestSheet.getDataRange().getValues();

    let sanitizedData = sanitizeData(data, headers)

    const user = getCurrentUser();
    
    if (!isAuthorizedUser(user)) {
        sanitizedData = sanitizedData.filter((value) => {
            return value.requestUser == user
        })
    }

    return JSON.stringify(
        sanitizeData(data, headers)
    );
}

function saveIncident(form) {
    let reqUser = getCurrentUser();

    const helperSheet = spreadSheet.getSheetByName('HELPER');

    let getNumberId = searchId('INCIDENT',helperSheet);
    getNumberId = getNumberId[1] + 1;
    let newReq = "INC" + pad(getNumberId, 5);
    
    spreadSheet.getSheetByName('INCIDENT').appendRow([newReq, new Date().toLocaleDateString(), reqUser, form.reqType, form.brand, form.title, form.description,'requested','tbd'])

    modifyId('INCIDENT',helperSheet,2,getNumberId);

    GmailApp.sendEmail(emails.toString(), "New Incident | "+form.title+" | "+newReq, (""),
    {
    'htmlBody' : '<!DOCTYPE html><html><head><title>New Incident</title></head><body><div><p>Who: '+reqUser+'</p><p>Incident ID: '+newReq+'</p><p>Site: '+form.brand+'</p><p>Where: '+form.reqType+'</p><p>Title: '+form.title+'</p><p>Description: '+form.description+'</p></div></body></html>',
    });

    return {
        status: 200
    }
}