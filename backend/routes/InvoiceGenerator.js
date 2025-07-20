const { makeExecutableSchema } = require("@graphql-tools/schema");
const db = require("../db/dbConfig");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const typeDefs = `

type InvoicePDFResponse {

   
     success: Boolean!
  url: String!  


}


type Query  {

hello : String


}

  type Mutation {
      
  generateInvoice(invoiceId: ID!): InvoicePDFResponse
        

        
  }



`;

const resolvers = {
  Query: {},

  Mutation: {
    generateInvoice: async (_, args, context) => {
      const invoiceId = context.invoiceId;

      const getInvoiceData = await db.query(
        "SELECT * FROM invoices WHERE id =  $1",
        [invoiceId]
      );

      if (!getInvoiceData.rows) {
        throw new Error("invoice data not found");
      }

      const data = {
        id: getInvoiceData.rows.id,
        amount: getInvoiceData.rows.amount,
        date: getInvoiceData.rows.date,
        customerName: getInvoiceData.rows.customerName,
      };

      const fileName = `invoice_${data.customerName}_${Date.now()}.pdf`;
      const filepath = path.join(__dirname, "..", "pdfs", fileName);
      const doc = new PDFDocument();
      doc.pipe(fs.createWriteStream(filepath));

      doc.fontSize(20).text("Invoice", { align: "center" }).moveDown();
      doc.fontSize(15).text(`ID: ₹${data.id}`);
      doc.fontSize(12).text(`Customer: ${data.customerName}`);
      doc.text(`Amount: ₹${data.amount}`);
      doc.text(`Date: ${data.date}`);
      doc.end();

      return {
        success: true,
        url: `http://localhost:4000/${filename}`,
      };
    },
  },
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });
