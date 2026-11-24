#!/bin/bash
# uso: _cap.sh salida.png ancho,alto archivo.html "query"
E="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
D="$(pwd -W | sed 's/ /%20/g')"
"$E" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=5000 --screenshot="$(pwd -W)/capturas/$1" --window-size=$2 "file:///$D/$3?$4" >/dev/null 2>&1
