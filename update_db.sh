#!/bin/bash
if [ -f ./qgis/oldvashon.sqlite ]
then
rm ./public/oldvashon.sqlite 
cp ./qgis/oldvashon.sqlite public/
echo "db updated"
else
    echo "db missing in qgis folder"
fi