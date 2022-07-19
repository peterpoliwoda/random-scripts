#!/bin/bash
for name in "Larissa e Peter "$1" "*
do
    newname="$(echo "$name" | cut -c19- | rev | cut -c5- | rev)" 
    mv "$name" "$newname"LariPeter"$1".jpg
done

