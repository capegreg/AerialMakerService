@ECHO OFF
TITLE Aerial Maker Service
IF DEFINED PROGRAMFILES(X86) (SET nodeFile=node_x64.exe) ELSE echo "node_x64 not found."


IF NOT EXIST %nodeFile% ECHO "%nodeFile%" file does not exist in "%serverPath%" directory! & GOTO ERROR


:ERROR
echo error.
PAUSE
EXIT 1