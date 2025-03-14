import express, { json, urlencoded } from "express";
import collection from "./backend/mongo.js";
import Order from "./backend/order.js"
import Food from "./backend/foodM.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", cors(), (req, res) => {});

app.post("/fooditems", async (req, res) => {
  const foodItem = req.body;
  try {
    // Find the food document, assuming there is only one document
    let foodCollection = await Food.findOne({});
    if (!foodCollection) {
      foodCollection = new Food({ foodItems: [foodItem] });
    } else {
      foodCollection.foodItems.push(foodItem);
    }
    const savedCollection = await foodCollection.save();
    res.status(201).json(savedCollection);
  } catch (error) {
    console.error("Error adding food item:", error); // Log the error
    res.status(400).json({ message: error.message });
  }
});

app.get("/getFoodData", async(req,res) => {
  try {
    const foodData = await Food.find();
    res.json({ foodItems: foodData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

app.delete("/fooditems/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let foodCollection = await Food.findOne();
    if (foodCollection) {
      foodCollection.foodItems = foodCollection.foodItems.filter(item => item.id.toString() !== id);
      const updatedCollection = await foodCollection.save();
      res.status(200).json(updatedCollection);
    } else {
      res.status(404).json({ message: "Food item not found" });
    }
  } catch (error) {
    console.error("Error deleting food item:", error);
    res.status(400).json({ message: error.message });
  }
});

app.put("/fooditems/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { price, status, image } = req.body;
    let foodCollection = await Food.findOne();
    if (foodCollection) {
      const foodItem = foodCollection.foodItems.find(item => item.id.toString() === id);
      if (foodItem) {
        foodItem.price = price;
        foodItem.status = status;
        foodItem.image = image;
        const updatedCollection = await foodCollection.save();
        res.status(200).json(updatedCollection);
      } else {
        res.status(404).json({ message: "Food item not found" });
      }
    } else {
      res.status(404).json({ message: "Food collection not found" });
    }
  } catch (error) {
    console.error("Error updating food item:", error);
    res.status(400).json({ message: error.message });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/fetchUsers", async(req,res) => {
  try {
    const users = await collection.find();
    res.json({users});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

app.put("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { phase } = req.body;
    const order = await Order.findById(id);
    if (order) {
      order.phase = phase;
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error updating order phase:", error);
    res.status(400).json({ message: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 8000");
});
