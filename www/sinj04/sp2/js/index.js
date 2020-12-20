var stred = SMap.Coords.fromWGS84(14.41, 50.08);
var mapa = new SMap(JAK.gel('mapa'), stred, 10);
mapa.addDefaultLayer(SMap.DEF_BASE).enable();
mapa.addDefaultControls();

var sync = new SMap.Control.Sync({ bottomSpace: 200 });
mapa.addControl(sync);


$('button').click(function () {

    var first = $('#start').val();
    var second = $('#end').val();
    //pouze test
    console.log(first);

});
