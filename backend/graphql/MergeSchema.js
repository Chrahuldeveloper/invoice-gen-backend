const { mergeSchemas } = require("@graphql-tools/schema");
const { auth, uploadInvoiceDetails, InvoiceGenerator } = require("../routes");

const mergedSchema = mergeSchemas({
  schemas: [auth, uploadInvoiceDetails, InvoiceGenerator],
});

module.exports = mergedSchema;
