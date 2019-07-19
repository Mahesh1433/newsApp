@ECHO OFF 
:: ionic 4 apk generator
TITLE ionic 4 android apk generator
ECHO Please wait...
ionic cordova build android --prod --release
ECHO ============================
ECHO start keytool key generator
ECHO ============================
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias
ECHO ============================
ECHO start jarsigner 
ECHO ============================
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk my-alias
ECHO ============================
ECHO start zipalign
ECHO ============================
zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk Fast-News.apk
ECHO ============================
PAUSE