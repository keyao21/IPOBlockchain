#!/bin/bash
cd ~/ipoblock/

# update business network version
echo "What is the new version number? (e.g. 0.0.1)"
read version
# cat package.json | sed 's/"version": .*/"version": "'"$version"'"/' >> package.json
sed -i -e 's/"version": .*/"version": "'"$version"'",/' package.json

# package business network
composer archive create -t dir -n .

# install new business network
composer network install -a "ipoblock@$version.bna" -c PeerAdmin@hlfv1

# upgrade to new business network 
composer network upgrade -c PeerAdmin@hlfv1 -n ipoblock -V "$version"

