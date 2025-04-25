# Remote Component Starter Kit

Starter Kit for quickly creating a Remote React Component that can be Remotely Loaded by `@paciolan/remote-component`.

## Getting Started

Clone the repository and initialize your project.

Modify `package.json` and replace the starter kit values with your own.

- set `name` to the name of your project.
- set `description` to describe your project.
- set `license` to reflect the license of your project.

Install the dependencies.

```bash
npm install
```

## Files

There are a few important files, one set is used for the bundle, another set for local development.

- `src/index.js` - Entrypoint of the Remote Component. The component needs to be the `default` export.
- `src/webpack-dev-server.js` - Entrypoint for `webpack-dev-server`. This is only used for development and will not be included in the final bundle.
- `src/index.html` - HTML for `webpack-dev-server`. This is only used for development and will not be included in the final bundle.

## Building

To build the application, run the following command:

```bash
npm run start
```

This will start the `webpack-dev-server` and output the bundle to `dist/main.js`.

## Adding the Remote Component to an Application

Copy the `dist/main.js` to the application's `transpiled` folder.

Now the Remote Component can be loaded by the Plugin Discovery service, you just need to send the `url` where the bundle is hosted to the Plugin Discovery service.

## Development

To start the `webpack-dev-server` run the following command:

```bash
npm run start
```

You can view the Remote Component in the browser by going to [http://localhost:9090](http://localhost:9090).

Modify the App.js in the `src` folder. The `webpack-dev-server` will automatically reload the page when changes are made.

You can also use Bootstrap CSS classes in your component. See the [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/) for more information.

### Parent Props

The Remote Component can accept props from the parent application. The props are passed to the Remote Component as a `props` object.

```javascript
const App = ({ token, metadata }) => {
  // ...
}
```

> Token: The token is the authentication token coming from the parent application. This can be used to authenticate the user in the Remote Component requests.

> Metadata: The metadata is an object that can be used to pass additional information to the Remote Component (currently there is no fixed structure but it will have soon).

#### Note

If developing locally, the `token` and `metadata` props will be `undefined` as they are only passed by the parent application, in this case, you can mock the values.

```javascript
const App = ({ token, metadata }) => {
  token = "" // mock token
  metadata = {
    // mock metadata
  }
  // ...
}
```

## Changing the Output

The bundle as a default will be output to the `dist/main.js`. This can be updated by changing the following two files:

1. `entry` in `webpack-main.config.js`. Update the `main` property to a desired output name.

```javascript
module.exports = {
  ...
  entry: {
    main: "./src/index.js"
  },
  ...
};
```

2.  `url` variable in `src/webpac-dev-server.js`

```javascript
// different paths for localhost vs s3
const url =
  global.location.hostname === "localhost" ? "/dist/main.js" : "main.js";
```

## External Dependencies

The Remote Component is self contained with all of it's dependencies bundled with webpack. Any dependencies that will be provided by the app should be marked as `external` in the `webpack.config.js`.

In this example, `react` and `prop-types` are added to `externals`. They will not be included in the bundle. The web application is expected to provide these dependencies.

```javascript
module.exports = {
  output: {
    libraryTarget: "commonjs"
  },
  externals: {
    react: "react",
    "prop-types": "prop-types"
  }
};
```
