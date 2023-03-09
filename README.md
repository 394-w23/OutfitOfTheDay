# React Vitest Template

A starter template for building React apps with Vite. Includes Vitest for unit testing and
a hefty .gitignore file.

## Usage

```
mkdir your-app-name
cd your-app-name
npx degit criesbeck/react-vitest
npm install
```

## Test

Verify that the initial app works. Run

```
npm start
```

and open the URL displayed.

## Scripts

**package.json** defines the following scripts:

| Script         | Description                                         |
| -------------- | --------------------------------------------------- |
| npm start      | Runs the app in the development mode.               |
| npm run dev    | Runs the app in the development mode.               |
| npm run build  | Builds the app for production to the `dist` folder. |
| npm run serve  | Serves the production build from the `dist` folder. |
| npm test       | Starts a Jest-like test loop                        |

## Firebase

Create account: https://console.firebase.google.com/

To deploy:
| Script         | Description                                         |
| -------------- | --------------------------------------------------- |
| firebase deploy| Deploys app to https://outfitoftheday-c3adf.web.app/|

## Weather API

Weather API https://open-meteo.com/en/docs
Can fetch directly without a key.

## Known Bugs

Unable to favorite outfits under "Today's Outfit" on home page
Unable to favorite outfits from "Outfits" within outfit modal
Deleting from closet does not delete from "Today's Outfit"

## Git

If everything is working, set up [your local and remote repositories](https://docs.github.com/en/get-started/importing-your-projects-to-github/importing-source-code-to-github/adding-locally-hosted-code-to-github#adding-a-local-repository-to-github-using-git).

## Folder Structure

```
your-app-name
├── node_modules
├── public
│   ├── favicon.svg
│   └── robots.txt
└── src
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── index.jsx
    └── logo.svg
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vite.config.js
```

## Credits

React-Vitest built and maintained by [Chris Riesbeck](https://github.com/criesbeck).

Inspired by [SafdarJamal/vite-template-react](https://github.com/SafdarJamal/vite-template-react).
Expanded to include Vitest and some sample tests.

Thanks to Rich Harris for [degit](https://www.npmjs.com/package/degit).

Gitignore file created with [the Toptal tool](https://www.toptal.com/developers/gitignore/api/react,firebase,visualstudiocode,macos,windows).


## License

This project is licensed under the terms of the [MIT license](./LICENSE).
