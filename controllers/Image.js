const Clarifai =  require('clarifai');

const app = new Clarifai.App({
    apiKey: 'a5531129b06e43c486cf22d4b6e28185'
   });

   const handleApiCall = (req,res) =>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data =>{
        res.json(data)
    })
    .catch(err =>{res.status(400).json("UNABLE TO WORK WITH API")})
   }


const handleImagePut = (req,res,db) =>{
    const {id} = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json("UNABLE TO GET ENTRIES"));
}

module.exports = {
    handleImagePut: handleImagePut,
    handleApiCall: handleApiCall
};