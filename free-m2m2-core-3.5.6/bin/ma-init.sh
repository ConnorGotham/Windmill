#!/bin/bash
#
#    Copyright (C) 2014 Infinite Automation Systems Inc. All rights reserved.
#    @author Matthew Lohbihler
#

# -----------------------------------------------------------------------------
# The initialization script for starting Mango Automation. This contains all of the 
# things that should happen only once, as opposed to things that happen each time 
# that MA restarts.

if [ -z "$MA_HOME" ]; then
    echo Do not execute this file directly. Run \'ma.sh start\' instead.
    exit 1
fi

# Delete a pid file if it exists, no longer doing this as we don't allow 2 mango's to start at same time
# from same MA_HOME, let the ma-start handle this as required
#rm "$MA_HOME"/bin/ma.pid >/dev/null 2>/dev/null

# Determine the Java home
if [ -z "$JAVA_HOME" ]; then
    EXECJAVA=java
else
    EXECJAVA=$JAVA_HOME/bin/java
fi

# Run enabled init extensions.
if [ "$(ls -A "$MA_HOME"/bin/ext-enabled)" ]; then
    echo `date` 'ma-start: running init extensions...' >> "$MA_HOME"/logs/ma-script.log
    for f in "$MA_HOME"/bin/ext-enabled/*.sh
    do
        source "$f" init
    done
fi
