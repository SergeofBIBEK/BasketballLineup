var baseURL = 'http://lineupgenerator.ga/hax'

//append the css
// <link href=/static/css/app.css rel=stylesheet>

var haxCss = document.createElement('link');
haxCss.href = `${baseURL}/static/css/app.css`;
haxCss.rel = "stylesheet";
document.head.appendChild(haxCss);

//append the div
//<div id=hax>

var haxRoot = document.createElement('div');
haxRoot.id = "hax";
document.body.appendChild(haxRoot);

//append the js
//><script type=text/javascript src=/static/js/manifest.js></script>

var haxManifest = document.createElement('script');
haxManifest.async = "false";
haxManifest.type = 'text/javascript';
haxManifest.src = `${baseURL}/static/js/manifest.js`;

document.body.appendChild(haxManifest);

//<script type=text/javascript src=/static/js/vendor.js></script>

var haxVendor = document.createElement('script');
haxVendor.async = "false";
haxVendor.type = 'text/javascript';
haxVendor.src = `${baseURL}/static/js/vendor.js`;

document.body.appendChild(haxVendor);

//<script type=text/javascript src=/static/js/app.js></script>

var haxAppScript = document.createElement('script');
haxAppScript.async = "false";
haxAppScript.type = 'text/javascript';
haxAppScript.src = `${baseURL}/static/js/app.js`;

document.body.appendChild(haxAppScript);

//hide the original
