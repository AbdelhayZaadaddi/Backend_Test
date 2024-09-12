# Advanced Content Managment

## Project Overview
This project is a web application built with Node.js, Express, and MongoDB. It includes user authentication, article management, and web crawling functionalities.


## Technologies Used
- Node.js
- Express
- MongoDB
- JWT (JSON Web Token)
- bcryptjs
- axios
- cheerio


## Installation
1. Clone The repository:
```sh
git clone
cd 
```

2. Install the dependencies:
```sh
npm install
```

## Start The project
```sh
nodemon app.js
```

## API Endpoints
### Authentication
* #### Register:
```sh
POST /api/auth/register
```
```sh
{
    "email": "example@mail.com",
    "password": "password"
}
```
* #### Login
```sh
POST /api/auth/login
```
```sh
{
    "email": "example@mail.com",
    "password": "password"
}
```

### Articles
* #### Create Article
```sh
POST /api/articles
```
```sh
{
    "title": "The Article title",
    "content": "The Article Content"
}
```

* #### Get All Articles
```sh
GET /api/articles
```

* #### Get a speasfic Article
```sh
GET /api/articles/:id
```

* #### Delete Article
```sh
DELETE /api/aticles/:id
```

* #### Analyse All the Article
```sh
GET /api/analyze
```

* #### Crawling Website and Compare
```sh
POST /api/crawl-and-compare
```
```sh
{
    "url": "The giving Url here"
}
```