#!/bin/bash

while true #Script will execute every second after initialization
do

fileName=`date +%Y-%m-%d.log` #Formats the date to pull the name changing data file
dateFormat="`date \+%m\/%d\/%Y`" #Date format to be prepended to time for mango csv
correctTime="`date +%T`" #24 hour time to use for most recent input data
sed -i '$ d' recentInfo.csv #erase last date

# add lowest data line from .log file to csv file to be ported to mango  ### 2019-04-17.log must be changed to $fileName upon real usage
tail -n -1 2019-04-17.log | grep -E '^[0-9][0-9]\:|Time' | sed 's/PVI-4.2-OUTD-US-W;S;//g' | sed 's/;/,/g' | sed 's|^.....|'"$correctTime"'|' | sed 's/,//18' | sed 's|^|'"$dateFormat "'|' >> recentInfo.csv

sleep 1
done
