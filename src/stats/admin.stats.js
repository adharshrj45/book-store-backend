const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Order = require('../orders/order.model')
const Book = require('../books/book.model')


router.get('/',async(req,res)=>{
    try {
        //total orders
        const totalOrders =await Order.countDocuments();

        //total sales
        const totalSales=await Order.aggregate([
            {
                $group:{_id:null,totalSales:{$sum:"$totalPrice"}}
            }
        ]);

        //trending books stats
        const trendingBooksCount=await Book.aggregate([
            {$match:{trending:true}},
            {$count:"trendingBooksCount"}
        ]);

        //if needed to count as number
        const trendingBooks =trendingBooksCount.length >0 ? trendingBooksCount[0].trendingBooksCount:0;

        //Total number of Books
        const totalBooks=await Book.countDocuments();

        //monthly Sales
        const monthlySales=await Order.aggregate([
            {
                $group:{
                    _id:{$dateToString:{format:"%Y-%m",date:"$createdAt"}},
                    totalSales:{$sum:"$totalPrice"},
                    totalOrders:{$sum:1} 
                }
            },
            {$sort:{_id:1}}
        ])

        //result summary
        res.status(200).json({
            totalOrders,
            totalSales:totalSales[0]?.totalSales || 0,
            monthlySales,
            totalBooks,
            trendingBooks
         })
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({message:"Failed to fetch admin stats"})
    }
})


module.exports = router

