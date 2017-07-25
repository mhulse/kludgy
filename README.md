# Random Street View Coordinates

**Experimental project. Currently a work in progress.**

## Notes

Dependency:

```bash
$ brew install exiftool
```

How to run:

```bash
# Returns random lat/long and pano ID:
$ node .
$ npm run latlng
# Creates pano on macOS desktop:
$ npm run basic
# Creates pano plus geo tag using exiftool (ending slash required!):
$ npm run pano -- /Users/mhulse/Desktop/
```
