# lowympact-front
A Long Duration Project in 4th year at INSA Lyon - Front-end part of a food traceability application on top of Ethereum's blockchain

# Working on the project
When pulling work from github, don't forget to download the latest librairies by running `npm install`

# Deploying onto Production Server
You can build the app with `npm run build`. The created application can be run with `serve -s build`
Everytime a change is made in the Build folder, the new content will be pushed into production

# Creating apk file for Android
This project is using BubbleWrap to create apk files, installable on Android.
Use `npx @bubblewrap/cli init --manifest https://lowympact.fr/manifest.json` to init the bubblewrap project on your side