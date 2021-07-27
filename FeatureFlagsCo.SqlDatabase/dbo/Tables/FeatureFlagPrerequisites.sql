CREATE TABLE [dbo].[FeatureFlagPrerequisites] (
    [Id]                        INT IDENTITY (1, 1) NOT NULL,
    [FeatureFlagId]             INT NOT NULL,
    [PrerequisiteFeatureFlagId] INT NOT NULL,
    [VariationValue]            BIT NOT NULL,
    CONSTRAINT [PK_FeatureFlagPrerequisites] PRIMARY KEY CLUSTERED ([Id] ASC)
);

