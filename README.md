# Remix + ChakraUI

Big thanks to [Primos](https://github.com/primos63) and [No Quatrter](https://github.com/NoQuarterTeam) for inspiration about this boilerplate.

- [Remix](https://remix.run/docs/en/v1)
- [Chakra UI](https://chakra-ui.com/docs)

---

## Requirements

- NVM or NodeJS 16.15.0

To install the right version of node:

```bash
# reads the .nvmrc file
nvm install;
```

---

## Run Local Development

To start the app in development mode, which will watch the files and rebuild them as changes are made, run the following:

```bash
npm install;
npm run dev;
# yarn;
# yarn dev;
```

---

## Run Local Production

First, build your app for production:

```bash
npm run build;
# yarn build;
```

Then run the app in production mode:

```bash
npm start;
# yarn start
```

---

## Deployment

Now you'll need to pick a host to deploy it to.

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
