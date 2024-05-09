/**
 * @file Generate visited US states map
 * @author Georgi D. Sotirov <gdsotirov@gmail.com>
 * @license GPL-2.0-only
 */

var map_states = AmCharts.makeChart("map_states",{
  type: "map",
  theme: "dark",
  panEventsEnabled : true,
  backgroundColor : "#000066",
  backgroundAlpha : 1,
  zoomControl: {
    zoomControlEnabled : true
  },
  dataProvider : {
    map : "usaHigh",
    getAreasFromMap : true,
    areas : [
      {"id": "US-AZ","showAsSelected": true},
      {"id": "US-CA","showAsSelected": true},
      {"id": "US-CO","showAsSelected": true},
      {"id": "US-FL","showAsSelected": true},
      {"id": "US-NV","showAsSelected": true},
      {"id": "US-WY","showAsSelected": true}
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

