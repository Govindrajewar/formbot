# FormBot Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Local Setup

```
npm install
cp .env.example .env.development.local   # set REACT_APP_BACKEND_URL etc.
npm start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

The app is deployed to **GitHub Pages** at:

[https://govindrajewar.github.io/FormBot/](https://govindrajewar.github.io/FormBot/)

Deployment is automated: every push to `main` that touches `client/**` triggers
the [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) workflow, which
installs dependencies, runs `npm run build`, and publishes `client/build` to
GitHub Pages via `actions/deploy-pages`. No manual deploy step is required.

To trigger a deploy manually, run the workflow from the **Actions** tab
("Deploy to GitHub Pages" → "Run workflow").

#### One-time repository setup

In the GitHub repo settings: **Settings → Pages → Source → GitHub Actions**.

#### Routing on GitHub Pages

React Router uses `BrowserRouter` with `basename={process.env.PUBLIC_URL}`, so
clean URLs (e.g. `/login`, `/dashboard`) work as on Vercel. Since GitHub Pages
serves static files only and has no server-side rewrite rules, direct loads
and refreshes of deep links are handled via the
[SPA-on-GitHub-Pages redirect trick](https://github.com/rafgraph/spa-github-pages):
`public/404.html` redirects unmatched paths back to `index.html`, which
restores the original URL via `history.replaceState` before React mounts.

#### Build-time environment variables

`REACT_APP_BACKEND_URL` and `REACT_APP_FRONTEND_URL` are inlined at build
time. The workflow reads them from repository **Variables**
(Settings → Secrets and variables → Actions → Variables); if unset, the app
falls back to the production defaults in `src/deploymentLink.js`.

The backend's `CLIENT_URL` (CORS allowlist) must include
`https://govindrajewar.github.io` for API requests from the deployed site to
succeed.

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
