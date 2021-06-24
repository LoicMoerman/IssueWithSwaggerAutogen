const swaggerAutogen = require("swagger-autogen")();

const outputFile = "src/utils/swagger_output.json";
const endpointsFiles = ["src/routes/index.ts"];

const doc = {
  definitions: {
    User: {
      id: 18,
      password: "1234",
      firstname: "firstname",
      lastname: "lastname",
      email: "test@gmail.com",
      role: '"admin" | "client" | "deliveryMan" | "restaurateur" | "saleDepartment" | "technicalService"',
      referalCode: "ABCDEF",
      sponsored: [1],
      sponsor: 2,
      restaurantId: "IDMongoose du restaurant",
    },
    // { ... }
  },
};

async function generateDoc() {
  await swaggerAutogen(outputFile, endpointsFiles, doc);
}
export default generateDoc;
