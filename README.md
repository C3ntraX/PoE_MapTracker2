## Usage

1. Clone this repository.

```
git clone https://github.com/willjw3/react-electron.git <your-project-name>
```

2. If you havent already, install Yarn globally.

```
npm install -g yarn
```

3. Navigate into project root and install dependencies.

```
cd <your-project-name> && yarn install
```

4. Run dev server.

```
npm start
```

## Deploy to Desktop

1. Run the build process

```
npm run build

Useful:
https://medium.com/@Charles_Stover/optimal-file-structure-for-react-applications-f3e35ad0a145

RxJS ?
https://www.npmjs.com/package/rxjs
Redux ?

read-last-lines?

-- After npm install use ".\node_modules\.bin\electron-rebuild.cmd" or the system crashes because of sharp

-- ioHook Update => Look for right ABIs in package.json:

const nodeAbi = require('node-abi')
console.log(nodeAbi.getAbi('12.13.1', 'node'))
// '75'
console.log(nodeAbi.getAbi('7.1.7', 'electron'))
// '75'
console.log(nodeAbi.getTarget('72', 'node'))
console.log(nodeAbi.getTarget('75', 'electron'))
```

"scripts": {
"start-react": "react-app-rewired start",
"build-react": "react-app-rewired build",
"test-react": "react-scripts test --env=jsdom",
"eject-react": "react-scripts eject",
"electron": "cross-env NODE_ENV=dev nodemon --exec \"\"electron .\"\"",
"rebuild": "electron-rebuild",
"build-electron": "electron-builder",
"build": "yarn build-react && yarn build-electron",
"start": "concurrently \"cross-env BROWSER=none npm run start-react\" \"wait-on http://localhost:3000 && npm run electron\"",
"postinstall": "install-app-deps" => to solve problems with sqlite3
},
