CREATE TABLE [dbo].[FeatureFlagTargetUsersWhoMatchTheseRules] (
    [Id]                             INT            IDENTITY (1, 1) NOT NULL,
    [FeatureFlagId]                  INT            NOT NULL,
    [RuleName]                       NVARCHAR(MAX)            NOT NULL,
    [RuleJsonContent]                NVARCHAR (MAX) NULL,
    [VariationRuleValue]             BIT            NULL,
    [PercentageRolloutForTrue]       FLOAT (53)     NULL,
    [PercentageRolloutForFalse]      FLOAT (53)     NULL,
    [PercentageRolloutBasedProperty] NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_FeatureFlagTargetUsersWhoMatchTheseRules] PRIMARY KEY CLUSTERED ([Id] ASC)
);

