#!/bin/bash

echo "\nSetting up hyperledger network..."
../utils/finalTest.sh 
echo "\nFinished setting up hyperledger network!"

echo "Setting up demo..."
../utils/setupDemo.sh
echo "\nFinished setting up demo!"