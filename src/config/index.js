export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "power-tools", label: "Power Tools" },
      { id: "battery-tools", label: "Battery Tools" },
      { id: "hand-tools", label: "Hand Tools" },
      { id: "spare-parts", label: "Spare Parts" },
      { id: "advertising", label: "Advertising" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "ingco", label: "Ingco" },
      { id: "total", label: "Total" },
      { id: "antiefix", label: "Antiefix" },
      { id: "bosch", label: "Bosch" },
      { id: "dca", label: "DCA" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "power-tools",
    label: "Power Tools",
    path: "/shop/listing",
  },
  {
    id: "battery-tools",
    label: "Battery Tools",
    path: "/shop/listing",
  },
  {
    id: "hand-tools",
    label: "Hand Tools",
    path: "/shop/listing",
  },
  {
    id: "spare-parts",
    label: "Spare Parts",
    path: "/shop/listing",
  },
  {
    id: "advertising",
    label: "Advertising",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  "power-tools": "Power Tools",
  "battery-tools": "Battery Tools",
  "hand-tools": "Hand Tools",
  "spare-parts": "Spare Parts",
  advertising: "Advertising",
};

export const brandOptionsMap = {
  ingco: "Ingco",
  total: "Total",
  antiefix: "Antiefix",
  bosch: "Bosch",
  dca: "DCA",
};

export const filterOptions = {
  category: [
    { id: "power-tools", label: "Power Tools" },
    { id: "battery-tools", label: "Battery Tools" },
    { id: "hand-tools", label: "Hand Tools" },
    { id: "spare-parts", label: "Spare Parts" },
    { id: "advertising", label: "Advertising" },
  ],
  brand: [
    { id: "ingco", label: "Ingco" },
    { id: "total", label: "Total" },
    { id: "antiefix", label: "Antiefix" },
    { id: "bosch", label: "Bosch" },
    { id: "dca", label: "DCA" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
