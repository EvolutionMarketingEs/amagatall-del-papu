#!/bin/bash
# Wrapper local para el preview del entorno de desarrollo de esta sesión:
# node no está en el PATH del sistema aquí, así que apuntamos al binario
# portátil descargado en ~/tools. No hace falta para un `npm run dev` normal
# en una máquina con Node instalado globalmente.
export PATH="$HOME/tools/node-v24.20.0-darwin-arm64/bin:$PATH"
cd "$(dirname "$0")/.."
exec npm run dev
