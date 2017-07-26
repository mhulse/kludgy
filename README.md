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
$ npm run coords
# Sets desktop with geo tagged pano:
$ npm run pano
# Same as above, but pano images are saved to the desktop:
$ npm run pano -- /Users/mhulse/Desktop/
```
