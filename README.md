# ipoblock

Blockchain solution for IPO processes 

## Running Locally

Install Hyperledger Composer framework onto your local machine. To set up demo, navigate to the ./finalTest directory and run the following: 

```bash
./start.sh
```

Note: The shell script will ask for input, the current version number of this repo is "1.0.0". Enter <1.0.0> when prompted, do not include brackets or quotes.

## Prerequisites

This application requires you to have Hyperledger Composer v 0.19.x and all dependencies and prerequisites of the same.

## Angular interface

For angular to run, navigate to the ./finalTest/angular-app directory. Then run

```bash
npm start
```

This will initialise a REST server and a front end to interact with the application. It is recommended that you initialise the rest server ahead of time by running the following command in the ./finaltest directory.

```bash
composer-rest-server
```
