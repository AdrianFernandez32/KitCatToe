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

const sqlServer = new azure.sql.Server("sqlServer", {
  resourceGroupName: resourceGroupName,
  serverName: "kit-cat-toe-server",
  administratorLogin: "clanie1barocio",
  administratorLoginPassword: "P@ssw0rd1234",
  location: "centralus",
  version: "12.0",
});

const sqlDatabase = new azure.sql.Database("sqlDatabase", {
  resourceGroupName: resourceGroupName,
  serverName: sqlServer.name,
  databaseName: "kit-cat-toe-db",
  sku: {
    name: "Basic",
    tier: "Basic",
    capacity: 5, // Capacidad de DTU (puedes cambiarlo según tus necesidades)
  },
  maxSizeBytes: 2147483648,
});

const firewallRule = new azure.sql.FirewallRule("firewallRule", {
  resourceGroupName: resourceGroupName,
  serverName: sqlServer.name,
  startIpAddress: "0.0.0.0",
  endIpAddress: "255.255.255.255",
});

// Exportar los valores de utilidad
export const sqlServerName = sqlServer.name;
export const sqlDatabaseName = sqlDatabase.name;
export const sqlAdminLogin = sqlServer.administratorLogin;
