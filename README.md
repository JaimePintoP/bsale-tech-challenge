# BSale_test

Tech challenge for bsale application.

## Usage

- Development environment:

  ```
  npm install
  npm run dev
  ```

  This will install all dependencies and watch file changes for server restart, scss compilation, css autoprefixing and client-side js bundling.

  The server runs on port 5000

- Production:

  App is deployed in heroku (https://safe-retreat-29868.herokuapp.com/) and its process is started with the following command (specified in Procfile):

  ```
  npm start
  ```

  which compiles client-side JS and SASS files and starts server on $PORT
