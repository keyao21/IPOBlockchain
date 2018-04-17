/**
 * Track the transition of an engagement letter from lawyer to lawyer
 * @param {org.acme.mynetwork.Draft} draft - the draft to be processed
 * @transaction
 */
async function draftEngagementLetter(draft) {
    draft.engagementLetter.lawyer = trade.newLawyer;
    let assetRegistry = await getAssetRegistry('org.acme.mynetwork.EngagementLetter');
    await assetRegistry.update(trade.draft);
}
