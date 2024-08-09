# Portfolio Manager

- [Portfolio Manager](#portfolio-manager)
  - [Description 📖](#description-)
  - [Features ⭐](#features-)
  - [User Interface](#user-interface)
    - [Pages](#pages)
    - [Modals](#modals)
  - [Tech Stacks 💻](#tech-stacks-)
    - [Front End](#front-end)
    - [Back End](#back-end)
    - [Database Schema](#database-schema)
  - [How to Run the Application](#how-to-run-the-application)
    - [Database](#database)
    - [Backend Server (Python 3.10^)](#backend-server-python-310)
    - [Swagger-UI (API Documentation)](#swagger-ui-api-documentation)
    - [Front end (Angular 14)](#front-end-angular-14)
  - [Team 2](#team-2)

## Description 📖
- Portfolio Manager is a web application that allows clients to manage their investments, including stocks, bonds, and cash.

## Features ⭐
- Browse a portfolio
- View the performance of the portfolio
- Add items in the portfolio
- Remove items from the portfolioca


## User Interface
### Pages
<p align="center">
<img  src="/client/src/assets/images/pm_homepage_ui.png" alt="home page" width="400">
<img  src="/client/src/assets/images/pm_portfolio_ui.png" alt="portfolio page" width="400">
</p>

### Modals
<p align="center">
<img  src="/client/src/assets/images/buy_modal_ui.png" alt="buy modal" width="400">
<img  src="/client/src/assets/images/sell_modal_ui.png" alt="sell modal" width="400">
</p>


## Tech Stacks 💻
### Front End
- Angular
- Ag-Grid
- Material UI & Bootstrap
  
### Back End
- Python
- Flask
- yahaoo finance API

### Database Schema
<img  src="/client/src/assets/images/portfolio_manager_schema.png" alt="database schema" width="500">



## How to Run the Application
### Database
```
Using MySql WorkBench
Browse to the database directory
Run the create_schema.sql script
```
### Backend Server (Python 3.10^)
Note : if you don't want to install these packages to your machine, I'd suggest to use python venv.
```
cd to the server directory
pip install -r requirements.txt
python app.py

```

### Swagger-UI (API Documentation)
<img src="/client/src/assets/images/swagger-ui.png" alt="swagger ui" width="500">

### Front end (Angular 14)
```
cd client
npm install
npm start
```
- It will provide you the link to use it locally

## Team 2
- Jeffrey Grospe
- Ayman Atmani
- Brad Zhang
