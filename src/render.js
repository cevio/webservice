module.exports = function(app, browser){
    app.response.defineFreeze('render', render(app, browser));
};

function render(app, browser){
    return function(template){
        var target = browser.views[template];
        if ( !target ){
            return browser.emit('renderError', new Error('template of ' + template + ' is not exist'));
        }
        var current = browser.current;
        browser.dispatch(current, target);
        if ( !browser.engine ){
            render.engine(browser, app);
        }else{
            browser.emit(app.history, browser, app);
        }
    }
}

render.engine = function(browser, app){
    var current = browser.current;
    var target = browser.target;
    if ( current ){
        current.wraproot.setAttribute('class', 'webview hide');
    }
    if ( target ){
        target.wraproot.setAttribute('class', 'webview');
    }
    browser.emit(app.history, browser);
    browser.exchange();
};