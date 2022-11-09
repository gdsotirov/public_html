/**
 * @file Generate visited countries map
 * @author Georgi D. Sotirov <gdsotirov@gmail.com>
 * @license GPL-2.0-only
 */

var map = AmCharts.makeChart("mapdiv",
{
  type: "map",
  theme: "dark",
  projection: "miller",
  panEventsEnabled : true,
  backgroundColor : "#000066",
  backgroundAlpha : 1,
  zoomControl: {
    zoomControlEnabled : true
  },
  dataProvider : {
    map : "worldHigh",
    getAreasFromMap : true,
    areas : [
      {"id": "AT","showAsSelected": true},
      {"id": "BE","showAsSelected": true},
      {"id": "BG","showAsSelected": true},
      {"id": "DE","showAsSelected": true},
      {"id": "ES","showAsSelected": true},
      {"id": "FR","showAsSelected": true},
      {"id": "GB","showAsSelected": true},
      {"id": "GR","showAsSelected": true},
      {"id": "HU","showAsSelected": true},
      {"id": "IT","showAsSelected": true},
      {"id": "MK","showAsSelected": true},
      {"id": "NL","showAsSelected": true},
      {"id": "PT","showAsSelected": true},
      {"id": "RO","showAsSelected": true},
      {"id": "RS","showAsSelected": true},
      {"id": "TR","showAsSelected": true},
      {"id": "US","showAsSelected": true}
    ]
  },
  areasSettings : {
    autoZoom : true,
    color : "#B4B4B7",
    colorSolid : "#cc3300",
    selectedColor : "#cc3300",
    outlineColor : "#666666",
    rollOverColor : "#ff9999",
    rollOverOutlineColor : "#000000"
  }
});

