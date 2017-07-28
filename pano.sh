#!/usr/bin/env bash

# https://github.com/tmux/tmux/issues/475#issuecomment-231527324
export EVENT_NOKQUEUE=1;

# https://apple.stackexchange.com/a/145174/40515
function wallpaper() {
	
	sqlite3 ~/Library/Application\ Support/Dock/desktoppicture.db "update data set value = '$1'" && killall Dock 
	
}

function genCoords() {
	
	latlon="$(node .)"
	
}

function getCoords() {
	
	genCoords
	
	echo $latlon
	
}

function makePano() {
	
	if [ ! -z "$1" ] && [ -d "$1" ]; then
		
		abspath="$(cd "${1}" && pwd)"
		
	else
		
		mkdir -p "./panos"
		
		abspath="$(cd "./panos" && pwd)"
		
	fi
	
	genCoords
	
	lat=$(echo $latlon | cut -d',' -f1)
	lon=$(echo $latlon | cut -d',' -f2)
	
	image="${abspath}/pano[${latlon}].png"
	
	extract-streetview "$latlon" --zoom max > "$image"
	
	if [ ! -z "$(which exiftool)" ]; then
		
		exiftool \
		-overwrite_original \
		-GPSLatitude=$lat \
		-GPSLatitudeRef=$lat \
		-GPSLongitude=$lon \
		-GPSLongitudeRef=$lon \
		$image
		
	fi
	
	wallpaper $image
	
}
