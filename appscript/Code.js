function doGet() {
    const template = HtmlService.createTemplateFromFile('index');

    return template
        .evaluate()
        .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
}