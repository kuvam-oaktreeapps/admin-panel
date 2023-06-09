/**
 * @type {import('../types').Resource}
 */
const resource = {
  name: "products",
  collectionName: "products",
  url: "/products",
  crudFields: [
    { name: "pid", unique: true, datatype: "String", widget: "InputText" },
    { name: "name", datatype: "String", widget: "InputText" },
    { name: "price", required: false, datatype: "Number", widget: "InputNumber" },
  ],
};

module.exports = resource;
