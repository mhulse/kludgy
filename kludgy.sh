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
	
	if [ ! -z "$2" ] && [ -d "$2" ]; then
		
		ABS_PATH="$(cd "${2}" && pwd)"
		
	else
		
		mkdir -p "./panos"
		
		ABS_PATH="$(cd "./panos" && pwd)"
		
	fi
	
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
	
	getOptions $1 $2
	
	genCoords
	
	lat=$(echo $COORDS | cut -d',' -f1)
	lon=$(echo $COORDS | cut -d',' -f2)
	id=$(echo $COORDS | cut -d',' -f3)
	
	image="${ABS_PATH}/${id}.jpg"
	
	# echo $lat, $lon, $id, $image
	
	extract-streetview \
	"$id" \
	--id \
	--quality 1 \
	--format "jpg" \
	--source "outdoor" \
	--zoom max \
	> "$image"
	
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
