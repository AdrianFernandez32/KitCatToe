import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as storage from "@pulumi/azure-native/storage";
import * as azure from "@pulumi/azure-native";
import * as dotenv from "dotenv";

dotenv.config();

const resourceGroupName = "ProyectoFinal3";

// Create an Azure resource (Storage Account)
const storageAccount = new storage.StorageAccount("sa", {
  resourceGroupName: resourceGroupName,
  sku: {
    name: storage.SkuName.Standard_LRS,
  },
  kind: storage.Kind.StorageV2,
});

const staticWebApp = new azure.web.StaticSite("reactStaticApp", {
  resourceGroupName: resourceGroupName,
  location: "centralus",
  sku: {
    name: "Free",
    tier: "Free",
  },
  repositoryToken: process.env.GITHUB_TOKEN,
  repositoryUrl: "https://github.com/Clanie1/KitCatToe",
  branch: "main",
  buildProperties: {
    appLocation: "/frontend",
    apiLocation: "",
    outputLocation: "build",
  },
});

// Export the primary key of the Storage Account
// const storageAccountKeys = storage.listStorageAccountKeysOutput({
//   resourceGroupName: resourceGroupName,
//   accountName: storageAccount.name,
// });

// export const primaryStorageKey = storageAccountKeys.keys[0].value;
