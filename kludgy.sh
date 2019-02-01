#!/usr/bin/env bash

# https://github.com/tmux/tmux/issues/475#issuecomment-231527324
export EVENT_NOKQUEUE=1;

function getOptions() {

  if [[ -z "$1" ]]; then

    echo "No Google Maps API Key!" ;

    exit 0;

  else

    API_KEY=$1

  fi

  if [[ ( ! -z "$2") && ("$2" = "true") ]]; then

    TINY="T"

  else

    TINY="F"

  fi

  if [[ ( ! -z "$3") && (-d "$3") ]]; then

    ABS_PATH="$(cd "${3}" && pwd)"

  else

    mkdir -p "./panos"

    ABS_PATH="$(cd "./panos" && pwd)"

  fi

  # This only outputs when this method is called directly:
  echo $API_KEY, $TINY, $ABS_PATH

}

# https://apple.stackexchange.com/a/145174/40515
function wallpaper() {

  sqlite3 ~/Library/Application\ Support/Dock/desktoppicture.db "update data set value = '$1'" && killall Dock

}

function genCoords() {

  COORDS="$(node . "$API_KEY")"

}

function getCoords() {

  getOptions $1

  genCoords

  echo $COORDS

}

function makePano() {

  getOptions $1 $2 $3

  genCoords

  lat=$(echo $COORDS | cut -d',' -f1)
  lon=$(echo $COORDS | cut -d',' -f2)
  id=$(echo $COORDS | cut -d',' -f3)

  image="${ABS_PATH}/${id}.jpg"

  # echo $lat, $lon, $id, $image

  # For some reason, lat/lon do not work. Having to use pano ID as firt argument
  # https://github.com/dorianneto/get-streetview-panorama-id
  # this is less useful as it only works for Google panos and not user-created panos!
  extract-streetview \
  "$id" \
  --id \
  --quality 1 \
  --format "jpg" \
  --source "outdoor" \
  --zoom max \
  > "$image"

  if [ "$TINY" = "T" ] && [ ! -z "$(which convert)" ]; then

    new_image="${ABS_PATH}/${id}-tinyplanet.jpg"

    convert $image -distort Arc 360 $new_image

    image=$new_image

  fi

  if [ ! -z "$(which exiftool)" ]; then

    exiftool \
    -overwrite_original \
    -GPSLatitude=$lat \
    -GPSLatitudeRef=$lat \
    -XMP:GPSLatitude=$lat \
    -GPSLongitude=$lon \
    -GPSLongitudeRef=$lon \
    -XMP:GPSLongitude=$lon \
    $image

  fi

  wallpaper $image

}
