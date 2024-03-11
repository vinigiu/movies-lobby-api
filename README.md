# Movies Lobby API

This API provides resources for Movies Lobby. It let you to list, register, update and delete movies from a MongoDB.

## How to run this API:

1. Rename the ```.env.example``` as ```.env```
2. Associate ```MONGO_URI``` env variable to the URI of your MongoDB
3. Run ```npm install``` to install project dependencies
4. Run ```npm build``` to build the project
5. Run ```npm run dev``` to run in Development or ```npm start``` to run un Production
6. The app should be running successfuly.

## How to see the API documentation:

1. First of all, run the app following previous steps
2. With the app running, visit ```localhost:3333/api-docs``` in your browser

## How to create a user:

1. Make a POST HTTP Request for ```localhost:3333/user/register``` with a body containing fields: username, email, password and isAdmin.
Example of body:
```
    {
        "username": "myusername",
        "email": "myusername@gmail.com",
        "isAdmin": true,
        "password": "mypassword"
    }
```

## How to login to the app:

1. Make a POST HTTP Request for ```localhost:3333/user/login``` with a body containing fileds: username, password.
Example of body:
```
    {
        "username": "myusername",
        "password": "mypassword"
    }
```

2. If sucessful, you will receive a ```token``` as response. Use this token on future Resquests to be allowed.

## How to register a movie (Only admin users):

1. Be sure you have a valid token on the headers of your HTTP Request. Its format should be:
``` Authorization: Bearer {token}``` Replace {token} by your valid token.

2. Make a POST HTTP Request for ```localhost:3333/movies``` with a body containing fields: title, genre, rating, streamingLink.
Example of body:
```
    {
        "title": "Avatar",
        "genre": "Action",
        "rating": "5",
        "streamingLink": "https://example.com"
    }
```
**Note: Genre and Rating are Enum fields so they only admit pre-setted values**

**Genres values: "Action" | "Drama" | "Comedy"**
**Rating values: "1" | "2" | "3" | "4" | "5"**

3. If sucessful you should receive a JSON with the Movie Object created.

## How to list all movies:

1. Be sure you have a valid token on the headers of your HTTP Request. Its format should be:
``` Authorization: Bearer {token}``` Replace {token} by your valid token.

2. Make a GET HTTP Request for ```localhost:3333/movies```.

3. If sucessful ou should receive a JSON with a List of Movies Objects, each one containing: title, genre, rating, streamingLink.

## How to search movies by title or genre.

1. Be sure you have a valid token on the headers of your HTTP Request. Its format should be:
``` Authorization: Bearer {token}``` Replace {token} by your valid token.

2. Make a GET HTTP Request for ```localhost:3333/search?q={query}```. Replace {query} by the term you want to search. This searches movies by its title and genre.

3. If sucessful ou should receive a JSON with a List of Movies Objects, each one containing: title, genre, rating, streamingLink.

## How to update existing movie's information (Only admin users):

1. Be sure you have a valid token on the headers of your HTTP Request. Its format should be:
``` Authorization: Bearer {token}``` Replace {token} by your valid token.

2. Make a PUT HTTP Request for ```localhost:3333/movie/{movieId}``` with a body containing the fields you want to update. (Possible fields: title, genre, rating, streamingLink).

Replace {movieId} by the movie id you want to update information.

Example of body:
```
    {
        "title": "Avatar",
        "genre": "Action",
        "rating": "5",
        "streamingLink": "https://example.com"
    }
```
**Note: Genre and Rating are Enum fields so they only admit pre-setted values**

**Genres values: "Action" | "Drama" | "Comedy"**
**Rating values: "1" | "2" | "3" | "4" | "5"**

3. If sucessful you should receive a JSON with the Movie Object updated.

## How to exclude existing a movie (Only admin users):

1. Be sure you have a valid token on the headers of your HTTP Request. Its format should be:
``` Authorization: Bearer {token}``` Replace {token} by your valid token.

2. Make a DELETE HTTP Request for ```localhost:3333/movie/{movieId}```.

Replace {movieId} by the movie id you want to update information.

3. If sucessful you should receive a JSON with the Movie Object deleted.


