
const express=require("express")
const app=express();
const tasks=require('./starter/routes/tasks')

const connectDB=require('./starter/db/connect')
require('dotenv').config()
const notFound=require('./starter/middleware/not-found')
const errorHandlerMiddleware=require('./starter/middleware/error-handler')


app.use(express.static('./starter/public'))
app.use(express.json())



app.use('/api/v1/tasks',tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)


const port=process.env.PORT || 3000


const start= async() => {
    try{
        
        await connectDB (process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening on ${port}....`))
    }catch (error){
        console.log(error)
    }
}
start()

