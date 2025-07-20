const { mergeSchemas } = require("@graphql-tools/schema");
const { auth, uploadInvoiceDetails } = require("../routes");

const mergedSchema = mergeSchemas({
  schemas: [auth, uploadInvoiceDetails],
});

module.exports = mergedSchema;
