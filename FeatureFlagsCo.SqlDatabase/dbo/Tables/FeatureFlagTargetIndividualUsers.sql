CREATE TABLE [dbo].[FeatureFlagTargetIndividualUsers] (
    [Id]                INT IDENTITY (1, 1) NOT NULL,
    [FeatureFlagId]     INT NOT NULL,
    [FeatureFlagUserId] INT NOT NULL,
    [VariationValue]    BIT NOT NULL,
    [FeatureFlagUserKeyId] NVARCHAR(MAX) NULL, 
    CONSTRAINT [PK_FeatureFlagUserMapping] PRIMARY KEY CLUSTERED ([Id] ASC)
);

