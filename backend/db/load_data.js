const path = require("path");
const xlsx = require("xlsx");
const connectDB = require("./db");

const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const InventoryItem = require("../models/InventoryItem");
const DistributionCenter = require("../models/DistributionCenter");

const readExcel = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return xlsx.utils.sheet_to_json(sheet);
};

const run = async () => {
  await connectDB();

  try {
    const products = readExcel(path.join(__dirname, "../data/products.xlsx"));
    const users = readExcel(path.join(__dirname, "../data/users.xlsx"));
    const orders = readExcel(path.join(__dirname, "../data/orders.xlsx"));
    const orderItems = readExcel(path.join(__dirname, "../data/order_items.xlsx"));
    const inventory = readExcel(path.join(__dirname, "../data/inventory_items.xlsx"));
    const centers = readExcel(path.join(__dirname, "../data/distribution_centers.xlsx"));

    await Product.deleteMany(); await Product.insertMany(products);
    await User.deleteMany(); await User.insertMany(users);
    await Order.deleteMany(); await Order.insertMany(orders);
    await OrderItem.deleteMany(); await OrderItem.insertMany(orderItems);
    await InventoryItem.deleteMany(); await InventoryItem.insertMany(inventory);
    await DistributionCenter.deleteMany(); await DistributionCenter.insertMany(centers);

    console.log("🎉 All Excel files loaded successfully.");
    process.exit();
  } catch (err) {
    console.error("❌ Error loading files:", err);
    process.exit(1);
  }
};

run();
