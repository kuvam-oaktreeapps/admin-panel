/**
 * @type {import('../types').Resource}
 */
const resource = {
  name: "Students",
  url: "/students",
  collectionName: "students",
  crudFields: [
    { name: "profileImageUrl", datatype: "String", widget: "ImageFileUpload" },
    { name: "fullName", datatype: "String", widget: "InputText" },
    { name: "bio", datatype: "String", widget: "InputTextarea", required: false },
    { name: "dob", datatype: "String", widget: "Calendar", required: false },
    { name: "dressCode", datatype: "String", widget: "ColorPicker", required: false },
    { name: "rollNo", datatype: "Number", widget: "InputNumber", inline: true, unique: true },
    { name: "password", datatype: "String", widget: "Password", tableDisplay: false },
    {
      name: "city",
      datatype: "String",
      widget: "Dropdown",
      inline: true,
      options: [
        { name: "New York", value: "NY" },
        { name: "Rome", value: "RM" },
        { name: "London", value: "LDN" },
        { name: "Istanbul", value: "IST" },
        { name: "Paris", value: "PRS" },
      ],
    },
    { name: "isPublic", widget: "InputSwitch", datatype: "Boolean" },
    {
      name: "gender",
      datatype: "String",
      widget: "RadioButton",
      options: [
        { name: "Male", value: "M" },
        { name: "Female", value: "F" },
        { name: "Other", value: "O" },
      ],
    },
  ],
};

resource;
