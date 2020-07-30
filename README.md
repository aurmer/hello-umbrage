# Hello, Umbrage!

This was built based on a mockup and description of functionality.

## Development

You can find my development log [here](dev_log.md).

## Next Steps

Change search results to make more sense. The idea of returning things not in the results, but geographically close to the focus, is really cool.
  - make new marker color for "nearby"
  - new layout for 'Search Results' to show multiple

## Demo Features

- Search by Lot name or address
- Leaflet map will center and zoom on search results
- Search results are initially sorted by distance from the new map center
- Click on map markers or listing cards to focus a result
- Hover over map marker to get lot information
- Click star on listing card to toggle favorite listings

## Compare against mockup

As an added development feature, I included the mockup image to compare against the layout. This feature is not built into the react app, but is completely contained in a static asset.
 - `Ctrl+Shift+1` - App Mode
 - `Ctrl+Shift+2` - Mockup Mode