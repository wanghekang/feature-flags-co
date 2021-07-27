CREATE TABLE [dbo].[FeatureFlagsUsers] (
    [Id]                         INT            IDENTITY (1, 1) NOT NULL,
    [Name]                       NVARCHAR (MAX) NULL,
    [Email]                      NVARCHAR (MAX) NULL,
    [Country]                    NVARCHAR (MAX) NULL,
    [KeyId]                      NVARCHAR (MAX) NULL,
    [CustomizedPropertiesInJson] NVARCHAR (MAX) NULL,
    [WorkspaceId] INT NULL, 
    CONSTRAINT [PK_FeatureFlagsUsers] PRIMARY KEY CLUSTERED ([Id] ASC)
);

