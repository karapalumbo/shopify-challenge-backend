# Shopify Developer Intern Challenge

The Shopify Intern Challenge is a single-page image repository using React, Node.js, Express, and SQL technologies for uploading, storing, and deleting images. 

## Launch

Clone the [front-end](https://github.com/karapalumbo/shopify-challenge) and [back-end](https://github.com/karapalumbo/shopify-challenge-backend) repos in GitHub.


#### FIRST, run the back-end using the following steps:
1. Download Postgres to your computer.
2. In Postgres, create two databases: "shopify" and "shopify_test".
3. Run the following in the terminal to create your database tables:

```bash
psql < shopify.sql
```
## Installation 
Use the package manager [npm](https://www.npmjs.com/) to install dependencies for both the front-end and back-end applications.

```bash
npm install
```
## Running Applications

Start the back-end server and then the front-end server by running:

```bash
npm start
```

## Access

Go to http://localhost:3000/ to access the application.

## Current Features
- Upload an image.
- Display the uploaded images.
- Delete an image.


## Future Features
- Add multiple file uploads.
- Login and logout authorization/ authentication.
- Ability to add and edit information about an image. 

## Testing 
Run tests in the front-end using React Testing Library.
```bash
npm test
```

Run tests in the back end using Jest.
```bash
jest
```
