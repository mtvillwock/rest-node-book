# Node Book

A RESTful API consuming the Google Books API. Built with Node.js, Express, Sequelize ORM, and MySQL.

### A user:

- can sign up / log in / log out
- can create a list containing books
- can have several lists and types of lists (favorite, wish, dislike)
- can search for books and add them to lists

### Usage

This app is deployed to Heroku at: https://node-books.herokuapp.com, but the production database is still being set up. 

To try the app locally follow these steps:

- pull down this repository by typing ```git clone <this repo's url>``` in your terminal
- ```cd rest-node-book```, type ```pwd``` and hit enter to make sure you are in the right directory
- set up environment variables using ```export VARIABLE_NAME='VARIABLE_VALUE'``` in your terminal
- You will need NODE_PW, MY_SQL_PW, and BOOKS_KEY 
- NODE_PW can be any password you like, MY_SQL_PW must be the password for the local MySQL database you are using, and BOOKS_KEY must be your Google Books API key
- start the app with ```node web.js``` and navigate to ```localhost:3000``` in your browser
