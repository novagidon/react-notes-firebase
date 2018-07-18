## Setup
You'll need to get your connection strings from Firebase. Place a file called `config.js` in `src/Config/` that contains your Firebase config as a simple javascript object, exported as `DB_CONFIG`. For example,

```
export const DB_CONFIG ={
  apiKey: your_api_key,
  authDomain: your_auth_domain,
  // etc..
}
```
## Starting the app
`npm i`
`npm start`

