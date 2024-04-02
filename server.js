const express = require('express')
const app = express()
const mongoose = require('mongoose')
const WeatherInfoModel = require('./models/weatherDataModel')
const port = 5000

app.use(express.json())

//DB Connect
mongoose.connect('mongodb+srv://root:root@webapi.fgpmolr.mongodb.net/web-api-project?retryWrites=true&w=majority&appName=WEBAPI')
.then(() => {
    console.log('connected to MongoDB')
    //app.listen(5000, () => {console.log("Server started on port 5000");})
    app.listen(process.env.PORT || port, () => console.log(`Listning on port ${port}`))
}).catch((error) => {
    console.log(error)
})

app.get("/weatherInfo", async (req, res) => {
    try {
        const weatherinfos = await WeatherInfoModel.find({});
        console.log(weatherinfos);
        res.send(weatherinfos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});