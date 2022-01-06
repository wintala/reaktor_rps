# Bad-api pre-assignment reaktor 2022

## Overview

My solution consist of Flask backend connected to Mongodb (cloud hosted atlas) and React client. The backend fetches data from the bad-api and saves it in the DB making it possible to do queries on data and serve only the necessary data to the client in a reasonable time (a possibility that bad-api doesn't offer). The client communicates directly with the bad-api's websocket and fetches historical results through the custom backend. 

The app is running [here](https://reaktorrpsserver.herokuapp.com/) (be patient with load times, in heroku free tier the server sleeps when it's inactive, so escepicially the initial load time can be long)
___

## Routes

### Server

`/api/syncdb` Saves all data (starting from page two) to the DB that has appeard 
in the bad-api since prevous sync (when called for the first time transfers all data). `Note` that  there is no process implemented that would call this automatically. I tested to send request to this endpoint every minute with task scheduler of powershell and it worked fine. So I guess in the hypothetical situation where this project would go to production there could be some cron job like process on the server. 
  
`/api/players/<name>` Gets all the games played by the player. Fetches data stored in the db and combines this with the first result page data from bad-api (first page data isn't stored in the DB cause the page isn't finnished) 

`/api/playernames` Gets all unique playernames  

`/api/cursors` Relic from the time I thought that storing only cursors and calling Promise.all on the client would do the trick

### Client

`/` shows all ongoing games and lastest results  

`/history` shows historical results for selected player


___
## Technology

### Fronend

#### Languge
- JS

#### Libraries
- axios
- react-router-dom  

(check package.json for further details)

#### Styles
- raw CSS

### Backend

#### Languge
- Python

#### Libraries
- mongoengine
- requests

(check Pipfile for futher details)

### Why this stack?

I felt like React with JS + Flask + Mongo was good combo to do something quick and dirty like this assignment. No need to worry heavy configurations or get annoyed with boilerplate code. If scalability were required I would have chocen something like ASP.NET + React with TS + Relational DB.

___
## Project structure

### Client
`src/components` JS-files for React components and their individual CSS-files  
`src/icons` All icons used in the app  
`src/service` Functions for feching data from the server

### Server
`reaktor_rps_backend/models` DB schemas  
`reaktor_rps_backend/views` Handles APIs routing   
`reaktor_rps_backend/__init__` Configuration and initialization of the app

___
## Possible improvements

- creating pipeline

- Impleting task scheduler to regularly update the DB 

- Make better structure for the DB (To improve performace it would be optimal to keep the calculated player statistics in the DB and send only a pageful of games to the client at once, compared to the current solution where all the palyer's games are sent to the client and claculations are done by the client. Although now it's nice and snappy to browse palyers historical games (after the initial load) when they are all in memory)

- Improve error handling

- support mobile



