CREATE TABLE [dbo].[FeatureFlagUserPercentageRecords]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Type] NVARCHAR(50) NULL, 
    [RuleId] INT NULL, 
    [FeatureFlagUserId] INT NULL, 
    [FeatureFlagUserKeyId] NVARCHAR(MAX) NULL, 
    [FeatureFlagId] INT NULL, 
    [WorkspaceId] INT NULL, 
    [TrueOfFalse] BIT NULL
)
