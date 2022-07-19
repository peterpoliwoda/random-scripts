#!/bin/bash
for name in *"LariPeter"$1*
do
    newname="$(echo "$name" | rev | cut -c15- | rev)" 
    mv "$name" "Larissa e Peter "$1" "$newname".jpg"
done

