#!/usr/bin/env bash

PROJECT_NAME="bancosimpla"
BUILD_GRADLE_PATH="$APPCENTER_SOURCE_DIRECTORY/android/app/build.gradle"
INFO_PLIST_FILE="$APPCENTER_SOURCE_DIRECTORY/ios/$PROJECT_NAME/Info.plist"

echo "Executando script em root - Alterando o versionCode em '$BUILD_GRADLE_PATH'"
cat $BUILD_GRADLE_PATH | grep versionCode 

VERSION_CODE=$((VERSION_CODE_SHIFT + APPCENTER_BUILD_ID))
sed -E -i "" 's/versionCode [0-9]+/versionCode '$VERSION_CODE'/' $BUILD_GRADLE_PATH

echo "versionCode alterado em '$BUILD_GRADLE_PATH'"
cat $BUILD_GRADLE_PATH | grep versionCode 

VERSION_NAME_TEST=$(git describe --tags --abbrev=0) 
VERSION_NAME=$(git describe --tags $(git rev-list --tags --max-count=1))
echo "Testando variavel: $VERSION_NAME , $VERSION_NAME_TEST"

echo "Atualizando o nome da versão em $VERSION_NAME em build.gradle"
cat $BUILD_GRADLE_PATH | grep versionName 
sed -E -i "" 's/versionName \"[0-9\.]+\"+/versionName \"'$VERSION_NAME'\"/' $BUILD_GRADLE_PATH

echo "versionName alterado em '$BUILD_GRADLE_PATH'"
cat $BUILD_GRADLE_PATH | grep versionName 

echo "Atualizando o nome da versão em $VERSION_NAME em Info.plist"
plutil -replace CFBundleShortVersionString -string $VERSION_NAME $INFO_PLIST_FILE

echo "Conteúdo do arquivo:"
cat $INFO_PLIST_FILE
