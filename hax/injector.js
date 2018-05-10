var haxBaseURL = 'http://lineupgenerator.ga/hax'

//append the css
// <link href=/static/css/app.css rel=stylesheet>

function appendHaxCSS() {
    var haxCss = document.createElement('link');
    haxCss.href = `${baseURL}/static/css/app.css`;
    haxCss.rel = "stylesheet";
    haxCss.onload = appendHaxDiv;
    document.head.appendChild(haxCss);
}

//append the div
//<div id=hax>

function appendHaxDiv() {
    var haxRoot = document.createElement('div');
    haxRoot.id = "hax";
    haxRoot.onload = appendHaxManifest;
    document.body.appendChild(haxRoot);
}

//append the js
//><script type=text/javascript src=/static/js/manifest.js></script>

function appendHaxManifest() {
    var haxManifest = document.createElement('script');
    haxManifest.type = 'text/javascript';
    haxManifest.src = `${baseURL}/static/js/manifest.js`;
    haxManifest.onload = appendHaxVendor;
    document.body.appendChild(haxManifest);
}
//<script type=text/javascript src=/static/js/vendor.js></script>

function appendHaxVendor() {
    var haxVendor = document.createElement('script');
    haxVendor.type = 'text/javascript';
    haxVendor.src = `${baseURL}/static/js/vendor.js`;
    haxVendor.onload = appendHaxAppScript;
    document.body.appendChild(haxVendor);
}

//<script type=text/javascript src=/static/js/app.js></script>

function appendHaxAppScript() {
    var haxAppScript = document.createElement('script');
    haxAppScript.type = 'text/javascript';
    haxAppScript.src = `${baseURL}/static/js/app.js`;
    haxAppScript.onload = haxHideOriginal;
    document.body.appendChild(haxAppScript);

}

//hide the original

function haxHideOriginal() {
    console.log('hide it all!');
}
