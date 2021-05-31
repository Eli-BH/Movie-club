<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/S5Qao5V.jpg" alt="Project logo"></a>
</p>

<h3 align="center">Movie Club</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> A Place for movies new and old.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

This is a full-stack MERN project that is meant to make it easy to check out information on new and old movies. 
The purpose of the application was to experiment with the TMDB API, integrate a chat room in every movie page, and have the ability to save watched movies. 

I also wanted to practice creating a full-stack application that allows users to interact with each other. This comes with the chat rooms and comment sections. 

Finally, I wanted to get similar functionality to the original IMDB site, something simple and easy to navigate. 


## 🏁 Getting Started <a name = "getting_started"></a>

To get started using the application, you will need to configure your API keys and MongoDB connection settings. 
You will need a working MongoDB cluster and an API key from TMDB. 

These keys will need to be stored in a .env file on the server directory of the application. 

You will also need a key for the Youtube API, this will be stored in a .env file on the base of the client directory. 

Once the API keys are in the .env files, they just need to be connected to the application. 

Once connected, you just need to start the application. 



### Prerequisites

- An updated version of node
- Youtube api Key
- TMDB api key
- OBDB api key


### Installing

Clone the code to your system, and install the dependencies 
```
npm start
```
Do this in the client and server directories


The client .env file should have the keys in these variables. 

- REACT_APP_YOUTUBE_KEY
- REACT_APP_TMDB_KEY

The server .env file's variables should be set as these

-TMDB_API_KEY
-TMDB_READ_ACCESS_TOKEN
-OMDB_API_KEY
-MOGODB_URI
-SECRET

The node server, and react app can be run with this command 
```
npm start
```

Go to localhost:3000 on your browser, and the app should be running



## 🎈 Usage <a name="usage"></a>

Add notes about how to use the system.

## 🚀 Deployment <a name = "deployment"></a>

The server and client need to be deployed in different projects, and the environment variables need to be set wherever you are deploying to. 


## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [ReactJS](https://reactjs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@Eli-BG](https://github.com/Eli-BH) - Idea & Initial work


