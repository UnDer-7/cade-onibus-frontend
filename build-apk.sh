#!/usr/bin/env zsh
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'
DEVICE=-d
USERS_PATH=$PWD

echo "\n${RED} NÃO CANCELE A EXECUÇÃO DO SCRIPT!!\n"
mkdir "$USERS_PATH/tmp"

TARGET_FILE=${USERS_PATH}/src/environments/environment.ts
DEV_FILE=${USERS_PATH}/src/environments/environment.dev.ts

# Salva o environment.ts em pasta temporaria
echo "\n${GREEN}Salvando environment.ts na pasta /tmp${NC}"
echo "${BLUE}ORIGEM:${NC} ${TARGET_FILE}"
echo "${BLUE}DESTINO:${NC} ${USERS_PATH}/tmp"
cp ${TARGET_FILE} ${USERS_PATH}/tmp

# Substitui o environment.ts pelo environment.dev.ts
echo "\n${GREEN}Substituindo o environment.ts pelo environment.dev.ts${NC}"
echo "${BLUE}ORIGEM:${NC} ${DEV_FILE}"
echo "${BLUE}DESTINO:${NC} ${TARGET_FILE}"
cp ${DEV_FILE} ${TARGET_FILE}

# ---- CORDOVA BUILD ----
if [[ $1 == ${DEVICE} ]]; then
  echo "\n${GREEN}executing:${NC} ionic cordova run android"
  echo "${BLUE}Be sure your phone is connected or a virtual phone is running${NC}\n"
  ionic cordova run android
else
  echo "\n${GREEN}executing:${NC} cordova build android"
  echo "${BLUE}The APK will be found on: /platforms/android/app/build/outputs/apks/debug${NC}\n"
  ionic cordova build android
fi
# -----------------------

# Apaga o environment.ts da pasta environments
  # pq ele esta com as configs do environment.dev.ts
  echo "\n${GREEN}Removendo environment.ts antigo${NC}"
  echo "${BLUE}PATH:${NC} ${TARGET_FILE}"
  rm -rf ${TARGET_FILE}

  # Copia o environment.ts da /tmp para a pasta
  # environments
  echo "\n${GREEN}Copiando environment.ts da /tmp para /environments${NC}"
  echo "${BLUE}ORIGEM:${NC} ${USERS_PATH}/tmp/environment.ts"
  echo "${BLUE}DESTINO:${NC} ${USERS_PATH}/src/environments/"
  cp ${USERS_PATH}/tmp/environment.ts ${USERS_PATH}/src/environments/

  # Apaga a pasta /tmp
  echo "${GREEN}\nApagando a pasta /tmp${NC}"
  echo "${BLUE}PATH:${NC} $USERS_PATH/tmp\n"
  rm -rf "$USERS_PATH/tmp"
