// Generated by CoffeeScript 1.6.3
(function() {
  var bingKey, bingMini, bingaerial, binghybrid, bingroad, customMarker, geoserverUrl, openmapquest, openmapquestSub, openmapquestUrl, openstreet, openstreetUrl, orientationEvent, supportsOrientationChange, terrasIndigenas, unidadeProtecaoIntegral, unidadeUsoSustentavel;

  bingKey = "AsyRHq25Hv8jQbrAIVSeZEifWbP6s1nq1RQfDeUf0ycdHogebEL7W2dxgFmPJc9h";

  bingaerial = new L.BingLayer(bingKey, {
    type: "Aerial",
    attribution: ""
  });

  bingroad = new L.BingLayer(bingKey, {
    type: "Road",
    attribution: ""
  });

  binghybrid = new L.BingLayer(bingKey, {
    type: "AerialWithLabels",
    attribution: ""
  });

  bingMini = new L.BingLayer(bingKey, {
    type: "AerialWithLabels",
    attribution: "",
    minZoom: 1,
    maxZoom: 11
  });

  openstreetUrl = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  openstreet = new L.TileLayer(openstreetUrl, {
    maxZoom: 18,
    attribution: ""
  });

  openmapquestUrl = "http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png";

  openmapquestSub = ['otile1', 'otile2', 'otile3', 'otile4'];

  openmapquest = new L.TileLayer(openmapquestUrl, {
    maxZoom: 18,
    subdomains: openmapquestSub
  });

  geoserverUrl = "http://siscom.ibama.gov.br/geoserver/csr/wms";

  terrasIndigenas = new L.TileLayer.WMS(geoserverUrl, {
    layers: "csr:terra_indigena",
    format: "image/png",
    transparent: true
  });

  unidadeUsoSustentavel = new L.TileLayer.WMS(geoserverUrl, {
    layers: "csr:unidade_uso_sustentavel",
    format: "image/png",
    transparent: true
  });

  unidadeProtecaoIntegral = new L.TileLayer.WMS(geoserverUrl, {
    layers: "csr:unidade_protecao_integral",
    format: "image/png",
    transparent: true
  });

  $('#map').width($(window).width());

  $('#map').height($(window).height() - $('#navbar').height());

  supportsOrientationChange = "onorientationchange" in window;

  orientationEvent = (supportsOrientationChange ? "orientationchange" : "resize");

  window.addEventListener(orientationEvent, (function() {
    $('#map').width($(window).width());
    return $('#map').height($(window).height() - $('#navbar').height());
  }), false);

  H5.Map.base = new L.Map("map", {
    center: new L.LatLng(-10.0, -58.0),
    zoom: 6,
    layers: [binghybrid]
  });

  H5.Map.minimap = new L.Control.MiniMap(bingMini, {
    toggleDisplay: true,
    zoomLevelOffset: -4,
    autoToggleDisplay: false
  }).addTo(H5.Map.base);

  H5.Map.base.attributionControl.setPrefix("Hexgis Hash5");

  new L.control.scale().addTo(H5.Map.base);

  new L.control.fullscreen({
    position: 'topleft',
    title: 'Fullscreen'
  }).addTo(H5.Map.base);

  new L.control.GeoSearch({
    provider: new L.GeoSearch.Provider.Google,
    searchLabel: "Endereço, Estado - UF",
    notFoundMessage: "Endereço não encontrado.",
    showMarker: false
  }).addTo(H5.Map.base);

  new L.control.locate({
    position: "topleft",
    drawCircle: true,
    follow: false,
    stopFollowingOnDrag: false,
    circleStyle: {},
    markerStyle: {},
    followCircleStyle: {},
    followMarkerStyle: {},
    metric: true,
    onLocationError: function(err) {
      return alert(err.message);
    },
    onLocationOutsideMapBounds: function(context) {
      return alert(context.options.strings.outsideMapBoundsMsg);
    },
    setView: true,
    strings: {
      title: "Localizar minha posição",
      popup: "Você está a {distance} {unit} deste lugar",
      outsideMapBoundsMsg: "Você está em um outra dimensão! o.O"
    },
    locateOptions: {}
  }).addTo(H5.Map.base);

  H5.Data.restURL = "http://" + document.domain + "/siema/rest";

  customMarker = L.Icon.extend({
    options: {
      iconUrl: "http://" + document.domain + "/siema/assets/img/ibama_marker.png",
      shadowUrl: null,
      iconSize: new L.Point(14, 14),
      iconAnchor: new L.Point(0, 0),
      popupAnchor: new L.Point(0, 0),
      clickable: false
    }
  });

  H5.Map.layer.acidentes = new H5.Leaflet.Postgis({
    url: H5.Data.restURL,
    geotable: "tmp_pon",
    fields: "id_ocorrencia",
    srid: 4326,
    geomFieldName: "shape",
    showAll: true,
    cluster: true,
    popupTemplate: null,
    focus: false,
    symbology: {
      type: "single",
      vectorStyle: {
        icon: new customMarker()
      }
    }
  });

  H5.Map.layer.acidentes.setMap(H5.Map.base);

  new H5.Leaflet.LayerControl({
    "OSM": {
      layer: openstreet
    },
    "Bing Aerial": {
      layer: bingaerial
    },
    "Bing Road": {
      layer: bingroad
    },
    "Bing Hybrid": {
      layer: binghybrid
    }
  }, {
    "Terras Indígenas": {
      layer: terrasIndigenas,
      overlayControl: false
    },
    "Unidade de Uso Sustentável": {
      layer: unidadeUsoSustentavel,
      overlayControl: false
    },
    "Unidade Proteção Integral": {
      layer: unidadeProtecaoIntegral,
      overlayControl: false
    },
    "Acidentes Ambientais": {
      layer: H5.Map.layer.acidentes
    }
  }).addTo(H5.Map.base);

}).call(this);
