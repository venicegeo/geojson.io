var fs = require('fs'),
    map = require('../ui/map'),
    escape = require('escape-html'),
    geojsonNormalize = require('geojson-normalize'),
    zoomextent = require('../lib/zoomextent');

module.exports.adduserlayer = function(context, _url, _name) {
    var url = escape(_url), name = escape(_name);
    var layer = L.tileLayer(url);
    if (context.layerControl) {
        context.map.addLayer(layer);
        context.layerControl.addOverlay(layer, name);
    }
    else {
        context.layerControl = L.control.layers(null, {}, {
            position: 'bottomright',
            collapsed: false
        }).addTo(context.map).addOverlay(layer, name);
        context.map.addLayer(layer);
    }
};

module.exports.zoomextent = function(context) {
    zoomextent(context);
};

module.exports.clear = function(context) {
    context.data.clear();
};

module.exports.magic = function(context) {
    var gj = JSON.parse(fs.readFileSync('data/ci2011.geojson').toString());

    gj = geojsonNormalize(gj);
    if (gj) {
        context.outputMapLayer.clearLayers()
              .addData(gj);
        zoomextent(context);
    }
};
