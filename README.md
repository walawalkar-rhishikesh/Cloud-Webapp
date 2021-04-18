# WEBAPP

> Webapp is a web application which is built on NodeJs, Express, MySql and ReactJs. This application is a demostration of various aspect of DevOps and is a part of CSYE6225 Course at Northeastern University

## API SERVER
> APIs are built using NodeJs and Express with MySql as the database. Sequelize which is a promise-based ORM is used to query data from the database. It provides predefined functions using which various types of queries can be carried out and hence makes it easier.

## Technology Stack
> - `API`
    
        NodeJs
        Express
        Sequelize
        Dcrypt
    
> - `Front-end`
    
        ReactJs
        React-Redux
        Axios
        React-Bootstrap
    
> - `CI`
    
        CircleCI
    
## Basic Setup

> - `MySql (MacOS)`
###### Set Path
```
OPEN TERMINAL:

vi ~/.zshrc 
export PATH=${PATH}:/usr/local/mysql/bin/   // to add these words
source ~/.zshrc                            // make it work
```

###### Start Mysql
```
OPEN TERMINAL:

mysql -u root -p
// Enter 302809rtghyujk as password
```

> - `API server (NodeJs)`
###### Installation and starting server
```
OPEN TERMINAL:

cd api
npm install
node .
```

> - `Web server (ReactJs)`
###### Installation and starting server
```
OPEN TERMINAL: 

cd front-end
npm install
npm start
```

## Unit Testing

> - `API`
###### Running Mocha and Chai unit test case

```
# Make sure package.json includes  `"test" : "mocha "` under scripts
Start the server: node .
npm run test
```

###### Running AWS Codedeploy

# End


