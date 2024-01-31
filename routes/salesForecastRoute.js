import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import OrderModel from "../database/fetchdatafromdb.js";

const router = express.Router();

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const mongoFetch = async () => {
  try {
    const orders = await OrderModel.find({});
    console.log('Orders fetched from MongoDB:', orders);
    return orders;
  } catch (error) {
    console.error('Error fetching orders from MongoDB:', error);
    throw error;
  }
};


// POST /sales-forecast
router.route("/").post(async (req, res) => {
  try {
    // Call mongoFetch
    const ordersArray = await mongoFetch();

    console.log("Orders Array:", ordersArray);

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content: "hello",
        },
      ],
    });

    console.log(chatCompletion.choices[0].message);
    res.status(200).json({ message: chatCompletion.choices[0].message });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
