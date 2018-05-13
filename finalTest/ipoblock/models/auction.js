function getAdjustedShares(prc_old, prc_new, shares_old, sharesRemaining, elasticity=1) {
    console.log("get adjusted shares");
    if (prc_old == null){
      return shares_old;
    }
    let shares_new = shares_old*(1 + (prc_old-prc_new)/prc_old);
    
    console.log("old shares " + shares_old + " become " + shares_new);
    if (sharesRemaining != null){
      return Math.min(shares_new, sharesRemaining);
    } else {
        return shares_new;
    }
}


/**
 * Close the bid at the optimal price at which to sell the shares
 * @param {org.ipoblockchain.Auction.CloseBidding} closeBidding - the closeBidding transaction
 * @transaction
 */
async function closeBidding(closeBidding) { 
    const listing = closeBidding.listing;
    let offers = listing.offers;
    offers.sort(function(a, b) {
      return (b.bid.price - a.bid.price);
    });
    listing.offers = offers;
    
    let investor = null;
    let investors = [];
    let finalPrc = null;
    let currPrc = null;
    let optPrc = null;
    let bid = null;
    let shares = null;
    let sharesRemaining = listing.totalShares;
    console.log(listing.totalShares);
    let prevShares = 0;
    let oldPrc = null;
    let cumShares = 0;
  
    for (var i in offers){
      bid = offers[i].bid;
        investor = offers[i].investor;
        currPrc = bid.price;
        shares = bid.shares;
        cumShares = getAdjustedShares(oldPrc, currPrc, cumShares) + shares
        oldPrc = currPrc;
        console.log(cumShares);
        investors.push([investor, currPrc, shares]);
        
        if (cumShares>listing.totalShares){
          break;
        }
    }
  	if (cumShares<=listing.totalShares){
            listing.remainingShares = listing.totalShares - cumShares;
   	}
  	optPrc = currPrc; //got the optimal price
  	listing.capitalRaised = cumShares * optPrc;
    
    let _shares = null;
    let _price = null;
    let _investor = null;
  
    for (var i in investors){
        
        _investor = investors[i][0];
        _price = investors[i][1];
        _shares = investors[i][2];
      
        _investor.heldShares = getAdjustedShares(_price, optPrc, _shares, sharesRemaining);
        sharesRemaining -= _investor.heldShares;
        const investorRegistry = await getParticipantRegistry('org.ipoblockchain.Investor.privInvestor');
        await investorRegistry.update(_investor);
      
  }
  const listingRegistry = await getAssetRegistry('org.ipoblockchain.Auction.Listing');
  await listingRegistry.update(listing);  
 
}

/**
 * Make an initial offer for company stocks
 * @param {org.ipoblockchain.Auction.Offer} offer - the offer
 * @transaction
 */
async function makeOffer(offer) { 
    let listing = offer.listing;
    //if (listing.state !== 'FOR_SALE') {
    //    throw new Error('Listing is not FOR SALE');
    //}
  	let me = getCurrentParticipant();
  	console.log(me);
  	
  	let investor = offer.investor
  	console.log(investor.investorID);
  
  	if (me.getFullyQualifiedType() != 'org.hyperledger.composer.system.NetworkAdmin'){
    	if (me.investorID != investor.investorID){
        	throw new Error("Can't make offers for other investors!");
        }
    }
  	
    if (!listing.offers) {
        listing.offers = [];
    }
    listing.offers.push(offer);
  
    const listingRegistry = await getAssetRegistry('org.ipoblockchain.Auction.Listing');
    await listingRegistry.update(listing);
}
