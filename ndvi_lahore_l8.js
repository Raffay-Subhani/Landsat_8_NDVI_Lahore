// Lahore Boundary
var geometry = ee.FeatureCollection('projects/banded-equinox-420006/assets/Lahore_city');

// Landsat 8 Imagery
var L8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterDate('2020-01-01', '2020-12-31') 
  .filterBounds(geometry)
  .filter(ee.Filter.lt('CLOUD_COVER', 10));

print('Filtered Landsat 8 Collection:', L8);

// Cloud Masking for Landsat 8
var maskClouds = function(image) {
  var QA_PIXEL = image.select('QA_PIXEL');

  var cloud = QA_PIXEL.bitwiseAnd(1 << 3).neq(0);
  var shadow = QA_PIXEL.bitwiseAnd(1 << 4).neq(0);
  var mask = cloud.or(shadow).not();

  // Scale reflectance 
  var scaled = image.select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'])
                    .multiply(0.0000275).add(-0.2);

  return scaled.updateMask(mask).copyProperties(image, image.propertyNames());
};

var L8_masked = L8.map(maskClouds);

// Add NDVI Band
var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['SR_B5', 'SR_B4']).rename('nd');
  return image.addBands(ndvi);
};

var L8_with_NDVI = L8_masked.map(addNDVI);

// Median NDVI 
var NDVI = L8_with_NDVI.select(['nd']);
var NDVImed = NDVI.median();

// NDVI Palette
var ndvi_pal = [
  'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163',
  '99B718', '74A901', '66A000', '529400', '3E8601',
  '207401', '056201', '004C00', '023B01', '012E01',
  '011D01', '011301'
];

// Display NDVI
Map.centerObject(geometry, 10);
Map.addLayer(
  NDVImed.clip(geometry),
  {min: 0, max: 1, palette: ndvi_pal},
  'NDVI_Lahore_L8'
);

// Export NDVI 
Export.image.toDrive({
  image: NDVImed.clip(geometry),
  description: 'NDVI_Lahore_L8',
  region: geometry,
  scale: 30,
  crs: 'EPSG:4326',
  maxPixels: 1e13
});