#!/bin/bash

#add participants

#add Company
composer participant add -c admin -d '{"$class":"org.ipoblockchain.Business.Company","companyID":"COMAAPL","companyName":"AAPL"}'
echo 'Company created'

#add Participants
#add CEO
composer participant add -c admin -d '{
  "$class": "org.ipoblockchain.Business.CEO",
  "name": "TimCook",
  "heldShares": 100,
  "EmployeeID": "CEO-1",
  "companyID": "COMAAPL",
  "companyName": "AAPL"
}'
echo 'Timmy Cook is the CHIEFF'

#add Underwriter
composer participant add -c admin -d '{
  "$class": "org.ipoblockchain.Contractor.Underwriter",
  "underwriterKey": "JPM",
  "contractorID": "UJPM-1"
}'
echo 'Go JPM for your underwriting needs'

#add SEC
composer participant add -c admin -d '{
  "$class": "org.ipoblockchain.Gov.SEC",
  "secID": "SEC-1",
  "secKey": "SECOff",
  "liaisonName": "Sarah"
}'
echo 'uh oh boys, the SEC is here'

#add priv investors
composer participant add -c admin -d '{
  "$class": "org.ipoblockchain.Investor.privInvestor",
  "name": "Anish",
  "stockType": "COMMON",
  "investorID": "AVM-1",
  "heldShares": 0,
  "investorKey": "AVM"
}'
echo 'time to shell out some mad bank, part 1'

composer participant add -c admin -d '{
  "$class": "org.ipoblockchain.Investor.privInvestor",
  "name": "Kevin",
  "stockType": "COMMON",
  "investorID": "KY-1",
  "heldShares": 0,
  "investorKey": "KY"
}'
echo 'time to shell out some mad bank, the sequel'

########################################################
#make identities

#ceo
composer identity issue -a "org.ipoblockchain.Business.CEO#CEO-1" -c admin -f timCook.card -u timCook
composer card import -c timCook -f timCook.card
composer network ping -c timCook
echo 'oops, forgot to give Timmy an ID card'

#underwriter
composer identity issue -a "org.ipoblockchain.Contractor.Underwriter#UJPM-1" -c admin -f jpm.card -u jpm
composer card import -c jpm -f jpm.card
composer network ping -c jpm
echo 'JPM is now legal with dat ID'

#sec
composer identity issue -a "org.ipoblockchain.Gov.SEC#SEC-1" -c admin -f secSarah.card -u sarah
composer card import -c sec -f secSarah.card
composer network ping -c sec
echo 'Time to shine Sarah, youve been given a name'

#investors
composer identity issue -a "org.ipoblockchain.Investor.privInvestor#AVM-1" -c admin -f avm.card -u AVM
composer card import -c AVM -f avm.card
composer network ping -c AVM
echo 'We dont need no education'

composer identity issue -a "org.ipoblockchain.Investor.privInvestor#KY-1" -c admin -f ky.card -u KY
composer card import -c KY -f ky.card
composer network ping -c KY
echo 'We dont need no thought control'

echo 'BOOM SLAP, TIME TO RUN'