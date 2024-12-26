const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()
const port=process.env.PORT || 5000
const mongoose=require('mongoose')

//middleware
app.use(express.json());
app.use(cors({
    origin:['http://localhost:5173','https://book-store-frontend-seven-beta.vercel.app'],
    credentials:true
}))

//routes
const bookRouters=require('./src/books/book.route')
const orderRoutes=require('./src/orders/order.route')
const userRoutes=require('./src/users/user.route')
const adminRoutes=require('./src/stats/admin.stats')

app.use("/api/books",bookRouters);
app.use("/api/orders",orderRoutes);
app.use("/api/auth",userRoutes);
app.use("/api/admin",adminRoutes);



//xdBqvQIaVIEQKldC


async function main(){
    await mongoose.connect(process.env.DB_URL)
    app.get('/',(req,res)=>{
        res.send('Hello World')
    })
}
main().then(()=>console.log('Connected to MongoDB')).catch(err=>console.log(err))


app.listen(port,()=>{
    console.log(`Example app listening on port http://localhost:${port}`)
})