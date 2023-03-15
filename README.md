# Outfit of the Day

OutfitOfTheDay is an app that allows users to catalog their closet and decide on an outfit for the day each morning based on weather and formality. It will also keep track of your favorite outfits.

![Home Page](https://i.imgur.com/KR7rVLM.jpg)

![Build Page](https://i.imgur.com/3LiqqKC.jpg)

* Tired of not knowing what to wear? Tired of looking through piles of clothes to select an outfit? Find an outfit using OOTD!
* Have optimal usage of clothing articles.
* Generate outfits to match the weather and events that day

## Getting Started

```
git clone https://github.com/394-w23/OutfitOfTheDay.git
npm install
npm start
```

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
* Create an instance to the firebase storage, the realtime database, authorization and hosting service.
* Next, create a SDK web app configuration.
* When the firebase console is ready and the configuration object is generated, change the configuration data located in the following file: https://github.com/394-w23/OutfitOfTheDay/blob/main/src/utils/firebase.js

To deploy:
| Script         | Description                                         |
| -------------- | --------------------------------------------------- |
| firebase deploy| Deploys app to https://outfitoftheday-c3adf.web.app/|

## Weather API

The weather API used for the app is from: https://open-meteo.com/en/docs
* Can fetch directly without the need of a key or a secret id.

## Known Bugs

* Unable to favorite outfits under "Today's Outfit" on home page
* Unable to favorite outfits from "Outfits" within outfit modal
* Deleting from closet does not delete from "Today's Outfit"
* Uploading without having all fields filled in (Add validation)

## Contact

* Camilo Chafloque - juanchafloquemesia2023@u.northwestern.edu
* Celina Zhao - celinazhao2024@u.northwestern.edu
* Derex Wangmang - derexwangmang2023@u.northwestern.edu
* Tanay Srivastava - tanaysrivastava2023@u.northwestern.edu
* Sean Park - seanpark2024@u.northwestern.edu
* Anshul Hajare - anshulhajare2024@u.northwestern.edu

## Credits

React-Vitest built and maintained by [Chris Riesbeck](https://github.com/criesbeck).

Inspired by [SafdarJamal/vite-template-react](https://github.com/SafdarJamal/vite-template-react).
Expanded to include Vitest and some sample tests.

Thanks to Rich Harris for [degit](https://www.npmjs.com/package/degit).

Gitignore file created with [the Toptal tool](https://www.toptal.com/developers/gitignore/api/react,firebase,visualstudiocode,macos,windows).

## License

This project is licensed under the terms of the [MIT license](./LICENSE).
