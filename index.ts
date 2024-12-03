import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as sql from "mssql";

dotenv.config();

const resourceGroupName = "ProyectoFinal3";

const storageAccount = new azure.storage.StorageAccount("sa", {
  resourceGroupName: resourceGroupName,
  sku: {
    name: azure.storage.SkuName.Standard_LRS,
  },
  kind: azure.storage.Kind.StorageV2,
});

const storageAccountKeys = azure.storage.listStorageAccountKeysOutput({
  resourceGroupName: resourceGroupName,
  accountName: storageAccount.name,
});

export const primaryStorageKey = storageAccountKeys.keys[0].value;

const blobContainer = new azure.storage.BlobContainer("blobcontainer", {
  resourceGroupName: resourceGroupName,
  accountName: storageAccount.name,
  containerName: "mycontainer2",
});

const staticWebApp = new azure.web.StaticSite("reactStaticAppFinalUwu", {
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

const sqlServer = new azure.sql.Server("sqlServer", {
  resourceGroupName: resourceGroupName,
  serverName: "kit-cat-toe-server-2",
  administratorLogin: "clanie1barocio",
  administratorLoginPassword: "P@ssw0rd1234",
  location: "westus",
  version: "12.0",
});

const sqlDatabase = new azure.sql.Database("sqlDatabase", {
  resourceGroupName: resourceGroupName,
  serverName: sqlServer.name,
  location: "westus",
  databaseName: "kit-cat-toe-db-2",
  sku: {
    name: "Basic",
    tier: "Basic",
    capacity: 5,
  },
  maxSizeBytes: 2147483648,
});

const firewallRule = new azure.sql.FirewallRule("firewallRule", {
  resourceGroupName: resourceGroupName,
  serverName: sqlServer.name,
  startIpAddress: "0.0.0.0",
  endIpAddress: "255.255.255.255",
});

// const backendAppServicePlan = new azure.web.AppServicePlan(
//   "backendAppServicePlan",
//   {
//     resourceGroupName: resourceGroupName,
//     location: "centralus",
//     sku: {
//       tier: "Basic",
//       name: "B1",
//     },
//   }
// );

// const backendApp = new azure.web.WebApp("backendApp", {
//   resourceGroupName: resourceGroupName,
//   location: "centralus",
//   serverFarmId: backendAppServicePlan.id,
//   siteConfig: {
//     appSettings: [
//       { name: "DB_SERVER", value: sqlServer.fullyQualifiedDomainName },
//       { name: "DB_DATABASE", value: sqlDatabase.name },
//       { name: "DB_USER", value: "clanie1barocio" },
//       { name: "DB_PASSWORD", value: "P@ssw0rd1234" },
//       { name: "JWT_SECRET", value: process.env.JWT_SECRET },
//     ],
//   },
//   identity: {
//     type: "SystemAssigned",
//   },
// });

// Configuración del Control de Origen para el Backend
// const backendSourceControl = new azure.web.WebAppSourceControl(
//   "backendAppSourceControl",
//   {
//     name: backendApp.name,
//     resourceGroupName: resourceGroupName,
//     repoUrl: "https://github.com/Clanie1/KitCatToe",
//     branch: "main",
//     isManualIntegration: false, // Cambiar a integración automática
//     deploymentRollbackEnabled: true,
//   }
// );

// async function initializeDatabase(serverName: string, databaseName: string) {
//   const sqlConfig = {
//     user: "clanie1barocio",
//     password: "P@ssw0rd1234",
//     server: serverName,
//     database: databaseName,
//     options: {
//       encrypt: true,
//       trustServerCertificate: false,
//     },
//   };

//   let pool: sql.ConnectionPool | undefined;

//   try {
//     pool = await sql.connect(sqlConfig);

//     const script = fs.readFileSync("./initialize.sql", "utf-8");
//     await pool.request().query(script);

//     console.log("Database initialized successfully!");
//   } catch (error) {
//     console.error("Error initializing database:", error);
//   } finally {
//     if (pool) {
//       await pool.close();
//       console.log("Database connection closed.");
//     }
//   }
// }

// pulumi
//   .all([sqlServer.fullyQualifiedDomainName, sqlDatabase.name])
//   .apply(async ([serverName, dbName]) => {
//     await initializeDatabase(serverName, dbName);
//   });

export const sqlServerName = sqlServer.name;
export const sqlDatabaseName = sqlDatabase.name;
// export const backendAppUrl = backendApp.defaultHostName.apply(
//   (hostName) => `https://${hostName}`
// );
export const blobContainerName = blobContainer.name;
export const storageAccountName = storageAccount.name;
export const blobContainerPrimaryKey = primaryStorageKey;
