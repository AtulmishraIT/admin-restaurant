import { connect, Schema, model } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URL1 = process.env.MONGO_URL;
connect(MONGO_URL1)
  .then(() => {
    console.log("mongodb connected 1");
  })
  .catch(() => {
    console.log("failed");
  });

const foodItemSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
  }
});

const foodCollectionSchema = new Schema({
  foodItems: [foodItemSchema],
});

const Food = model('Food', foodCollectionSchema);

export default Food;