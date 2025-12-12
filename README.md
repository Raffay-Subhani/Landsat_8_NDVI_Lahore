# Landsat 8 NDVI Mapping of Lahore (Google Earth Engine)

This repository contains a complete Google Earth Engine (GEE) script for generating the 2020 NDVI map of Lahore using Landsat 8 satellite imagery.

---

## Project Overview

This script:
- Loads Landsat 8 Surface Reflectance imagery  
- Filters by:
  - Lahore district boundary  
  - Year 2020  
  - Cloud cover < 10%   
- Generates a median NDVI composite  
- Visualizes the NDVI map in GEE 
- Link: https://code.earthengine.google.com/faa8c40eee269aab6922a226a6820da6

---

## Dataset Used

- Landsat 8 OLI/TIRS Collection 2 Level-2 (Surface Reflectance)  
- Dataset ID: LANDSAT/LC08/C02/T1_L2

---

## Features

### NDVI Calculation 
Formula:  
NDVI = (NIR - RED) / (NIR + RED) = (SR_B5 - SR_B4) / (SR_B5 + SR_B4)

### Cloud Masking  
Removes clouds and cirrus using the Landsat QA Pixel Band.

### Median NDVI Map  
- Render on the GEE Map  
- Style with a 17-class NDVI palette  
- Exportable as a GeoTIFF

### Export Options  
The script exports the NDVI raster to Google Drive.

---

## License
This project is open-source and free to use, modify, and share with attribution.

---

## Author
Raffay Subhani
Email: raffaysubhani9@gmail.com
