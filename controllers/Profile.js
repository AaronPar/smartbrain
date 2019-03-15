const handleProfileGet = (req,res,db) =>{
    const {id} = req.params;
    db.select('*').from('user').where({id : id})
    .then(user =>{
        if(user.length){
            res.json(user[0])
        }else{
            res.status(400).json("Not found")
        }
    })
    .catch(err => res.status(400).json("ERROR GETTING USER"))
}

module.exports = {
    handleProfileGet: handleProfileGet
}