# cover
Base app for cover4

## Notes
- Uncomment the keyboard plugin in app.js.
- May need to add some code to the platforms/ios/<appname>/<appname>-Info.plist for the opening of the applications for ios9
```
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>twitter</string>
    <string>facebook</string>
</array>
```

## Issues
- May need to perform ionic resources --icon to get the icons right, or it won't build properly.

## Todo
- Make sure push notifications aren't in debug mode
- Fill in information pages
- Create factory for contact information
- Check whether they have turned off push notifications and remove from database if they have
- Create Splashscreen

## Install
The following features are ommitted from the git and need to be installed.

### Platforms
- cordova add platform ios
- cordova add platform android

### Plugins
- cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git
- ionic add ionic-platform-web-client
- ionic plugin add phonegap-plugin-push --variable SENDER_ID="GCM_PROJECT_NUMBER"
- bower install ngCordova - might not need
- cordova plugin add https://github.com/ohh2ahh/AppAvailability.git
- cordova plugin add org.apache.cordova.device
- cordova plugin add org.apache.cordova.network-information