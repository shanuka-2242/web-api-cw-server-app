const express = require('express')
const app = express()
const mongoose = require('mongoose')
const WeatherInfoModel = require('./models/weatherDataModel')
const port = 5000
const cors = require('cors')

app.use(express.json())
app.use(cors())

//DB Connect
mongoose.connect('mongodb+srv://root:root@webapi.fgpmolr.mongodb.net/web-api-project?retryWrites=true&w=majority&appName=WEBAPI')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(process.env.PORT || port, () => console.log(`Listning on port ${port}`))
}).catch((error) => {
    console.log(error)
})

//GET 
app.get("/weatherInfo", async (req, res) => {
    try {
        const weatherinfos = await WeatherInfoModel.find({});
        console.log(weatherinfos);
        res.send(weatherinfos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//UPDATE
app.put('/updateWeatherInfo/:id', async (req, res) => {
    try {
      const districtId = req.params.id;
      const updatedWeatherInfoValues = req.body;
  
      const existingWeatherInfo = await WeatherInfoModel.findOne({ districtId: updatedWeatherInfoValues.districtId });
      if (existingWeatherInfo && existingWeatherInfo.districtId.toString() !== districtId) {
        return res.status(400).json({ message: 'districtId must be unique' });
      }
  
      const updatedWeatherInfo = await WeatherInfoModel.findOneAndUpdate({ districtId }, updatedWeatherInfoValues, { new: true });
      if (!updatedWeatherInfo) {
        return res.status(404).json({ message: 'District id not found' });
      }
  
      res.status(200).json({ message: 'Districts weather info updated successfully', updatedWeatherInfo });
    } catch (error) {
      console.error('Error updating district weather info:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });