## Installation and Usage

Simply clone and `npm run dev` which should trigger `"dev": "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\""` command. If you see error follow the installation below, and update the `dependencies`, and `devDependencies` packages if needed for both server and client.

Lastly don't forget to import the .sql file from the root folder `mysubs.sql`

```bash
# Simply Clone this repository
git clone https://github.com/ziaahsan/store-sub-app
cd store-sub-app
# install the dependencies for both the server root package.json and
# client folder (react app)
npm install . # More information https://docs.npmjs.com/cli/v6/commands/npm-install
```
---

## Purpose of SubTo website was:
0. I wanted to learn how to integrate NodeJS and ReactJS
1. The app is sufficient but it should be treated as simple very buggy app
2. by 1. goal was achieved, and learnt the integration of Server and Client Routes, with simple communication between client, server and MySQL database

`preview/` contains all the necessary preview images of the web app.
