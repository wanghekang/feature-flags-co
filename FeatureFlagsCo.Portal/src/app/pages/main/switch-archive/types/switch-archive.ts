export interface ISwitchArchive {
    id: string,
    name: string,
    keyName: string,
    wordspaceId: number,
    creatorUserId: string,
    status: string,
    defaultRuleValue: true,
    percentageRolloutForTrue: number,
    percentageRolloutForTrueNumber: number,
    percentageRolloutForFalse: number,
    percentageRolloutForFalseNumber: number,
    percentageRolloutBasedProperty: string,
    valueWhenDisabled: true,
    lastUpdatedTime: string
}
