const {Configuration, OpenAIApi} = require('openai')
const fs = require('fs')
const path = require('path')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Generate image
const generateImage = async (req, res) => {

        // get user input 
        const { data, size } = req.body 

        // conditions for image size
        const imageSize = size == 'small' ? '256x256' : size == 'medium' ? '512x512' : '1024x1024'


    try {
        const response = await openai.createImage({
            prompt: data,
            n:1,
            size: '1024x1024'
        })
        // fetch image url from response
        const imageUri = response.data.data[0].url
        res.status(200).json({
            success: true,
            data: imageUri
        })
    } catch (error) {
        if(error.response){
            console.log(error.response.status)
            console.log(error.response.data)
        } else {
            console.log(error.message)
        }

        res.status(400).json({
            success: false,
            error: 'Sorry the image could not be generated'
        })
    }

    
}

// Image Variation
const editImage = async (req,res) => {
    try {
        const response = await openai.createImageVariation(
            fs.createReadStream(path.join(__dirname, '../public/beach2.png')),
            2,
            "1024x1024"
          );

          res.status(200).json({
            success: true,
            data: response.data.data[0]
          })

    } catch (error) {
        if(error.response){
            console.log(error.response.status)
            console.log(error.response.data)
        } else {
            console.log(error.message)
        }

        res.status(400).json({
            success: false,
            error: 'Sorry the image could not be generated'
        })
    }
}

// Image Edit
// Image Variation
const imageEdit = async (req,res) => {
    try {
        const response = await openai.createImageEdit(
            fs.createReadStream(path.join(__dirname, '../public/beach2.png')),
            fs.createReadStream(path.join(__dirname, '../public/room2.png')),
            "A cute baby sea otter wearing a beret",
            2,
            "1024x1024"
          );

          res.status(200).json({
            success: true,
            data: response.data.data[0]
          })

    } catch (error) {
        if(error.response){
            console.log(error.response.status)
            console.log(error.response.data)
        } else {
            console.log(error.message)
        }

        res.status(400).json({
            success: false,
            error: 'Sorry the image could not be generated'
        })
    }
}


module.exports = {
    generateImage,
    editImage,
    imageEdit
}