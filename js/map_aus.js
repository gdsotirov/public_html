/**
 * @file Generate visited Australia map
 * @author Georgi D. Sotirov <gdsotirov@gmail.com>
 * @license GPL-2.0-only
 */

const map_aus = AmCharts.makeChart("map_aus",{
  type: "map",
  theme: "dark",
  panEventsEnabled : true,
  backgroundColor : "#000066",
  backgroundAlpha : 1,
  zoomControl: {
    zoomControlEnabled : true
  },
  dataProvider : {
    map : "australiaHigh",
    getAreasFromMap : true,
    areas : [
      {"id": "AU-ACT","showAsSelected": true},
      {"id": "AU-NSW","showAsSelected": true},
      {"id": "AU-NT" ,"showAsSelected": true},
      {"id": "AU-QLD","showAsSelected": true},
      {"id": "AU-TAS","showAsSelected": true},
      {"id": "AU-VIC" ,"showAsSelected": true}
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

