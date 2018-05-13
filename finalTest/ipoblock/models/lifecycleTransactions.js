/*
    FUNCTION DEFINITIONS
*/

/**
* A transaction processor function description
* @param {org.ipoblockchain.Transactions.ELetterTx} engagementLetter A human description of the parameter
* @transaction
*/
async function onEngagementLetter(engagementLetter) {
  
  	const NS = 'org.ipoblockchain';
  	console.log('huhuhuhuh');
    const assetRegistry = await getAssetRegistry('org.ipoblockchain.Assets.engagementLetter');
    let existCheck = assetRegistry.exists(engagementLetter.letterID);

    if (existCheck == false){
        console.log('engagement letter is not found...');
        return; 
    } else {
        console.log('engagement letter found!');
    }
    
  	let currentOwner = engagementLetter.el.owner;
  	// currentOwner is an instance of org.ipoblockchain.Business or org.ipoblockchain.Contractor.Underwriter
  	let currentParticipant = getCurrentParticipant();
  	// currentParticipant is an instance of org.ipoblockchain.Contractor
  	let lastOwner = currentOwner;
  	// store lastOwner for later
  
  /*
    let isEmployee = currentOwner instanceof Employee;
  */
  
    if (engagementLetter.el.letterHash != engagementLetter.newHash){
        // delete sigs
        engagementLetter.el.companySig = null;
        engagementLetter.el.underwriterSig = null;
      	engagementLetter.el.letterHash = engagementLetter.newHash;
    }
	
  	// let business = org.ipoblockchain.Business;
  
  	if (currentParticipant.getFullyQualifiedType() == 'org.ipoblockchain.Business.CEO'){
        engagementLetter.el.companySig = engagementLetter.participantSig;
      	engagementLetter.el.owner = engagementLetter.underwriter;
    } else {
        engagementLetter.el.underwriterSig = engagementLetter.participantSig;
      	engagementLetter.el.owner = engagementLetter.ceo;
    }
  	
  //let currentOwner = engagementLetter.newOwner;
  
  /*
    if (isEmployee==true){
        engagementLetter.el.companySig = engagementLetter.signature;
    } else {
        engagementLetter.el.underwriterSig = engagementLetter.signature;
    }
  */
  	await assetRegistry.update(engagementLetter.el);
  
}
// ####################################################################################################
/**
* RegiCert function
* @param {org.ipoblockchain.Transactions.RCertificateTx} registrationCertificate A human description of the parameter
* @transaction
*/
async function onRegistrationCertificate(registrationCertificate) {
   	console.log('Signing Registration Certificate');
    const assetRegistry = await getAssetRegistry('org.ipoblockchain.Assets.registrationCertificate');
    let existCheck = assetRegistry.exists(registrationCertificate.certificateID);

    if (existCheck == false){
        console.log('Registration Certificate is not found...');
        return; 
    } else {
        console.log('Registration Certificate found!');
    }
    
  	let currentOwner = registrationCertificate.rc.owner;
  	// currentOwner is an instance of org.ipoblockchain.Business or org.ipoblockchain.Contractor.Underwriter
  	let currentParticipant = getCurrentParticipant();
  	// currentParticipant is an instance of org.ipoblockchain.Contractor
  	let lastOwner = currentOwner;
  	// store lastOwner for later
  
  	const NS = 'org.ipoblockchain.Business';
  	const NS_D = 'org.ipoblockchain.Contractor';
  
    if (registrationCertificate.rc.certificateHash != registrationCertificate.newHash){
        // delete sigs
        registrationCertificate.rc.companySig = null;
        registrationCertificate.rc.underwriterSig = null;
      	registrationCertificate.rc.SECSig = null;
      	
      	//set certStatus to DENIED and return ownership to CEO
      	registrationCertificate.rc.certificateStatus = "DENIED";
      	registrationCertificate.rc.owner = registrationCertificate.ceo;
      	await assetRegistry.update(registrationCertificate.rc);
      	return
    }
  
  	if (registrationCertificate.rc.companySig !== null && registrationCertificate.rc.underwriterSig !== null && registrationCertificate.rc.certificateStatus == "PENDING") {
      	// send to SEC for signing now
      	if (currentParticipant.getFullyQualifiedType() == 'org.ipoblockchain.Gov.SEC') {
          registrationCertificate.rc.SECSig = registrationCertificate.participantSig;
          registrationCertificate.rc.owner = registrationCertificate.sec;
          registrationCertificate.rc.certificateStatus = "APPROVED";
        } else {
          throw new Error('Transaction needs to be signed by SEC Only');
        }
    } else if ((registrationCertificate.rc.certificateStatus == "DENIED" || "NOT_APPLIED") && registrationCertificate.rc.owner == registrationCertificate.ceo) {
      	//CEO must sign first
      	registrationCertificate.rc.companySig = registrationCertificate.participantSig;
        registrationCertificate.rc.owner = registrationCertificate.underwriter;
        registrationCertificate.rc.certificateStatus = "NEEDS_UW_SIG";
    } else if (registrationCertificate.rc.certificateStatus == "NEEDS_UW_SIG" && registrationCertificate.rc.owner == registrationCertificate.underwriter) {
    	registrationCertificate.rc.underwriterSig = registrationCertificate.participantSig;
        registrationCertificate.rc.owner = registrationCertificate.sec;
        registrationCertificate.rc.certificateStatus = "PENDING";
    } else {
      throw new Error('Ownership condition or signing condition not met, start again');
    }
  
  await assetRegistry.update(registrationCertificate.rc);
}