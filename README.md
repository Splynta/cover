# cover
Base app for cover4

## Notes
- Uncomment the keyboard plugin in app.js.

## Issues
- May need to perform ionic resources --icon to get the icons right, or it won't build properly.

## Todo
- Add push notifications
- Fill in information
- Create contact page
- Load up the facebook & twitters apps from the links

## Install
The following features are ommitted from the git and need to be installed.

### Platforms
- cordova add platform ios
- cordova add platform android

### Plugins
- cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git
- ionic add ionic-platform-web-client
- ionic plugin add phonegap-plugin-push --variable SENDER_ID="GCM_PROJECT_NUMBER"