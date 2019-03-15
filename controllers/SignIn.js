const handleSignIn = (db,bcrypt) => (req,res) =>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json('INCORRECT FORM SUBMISSION');
    }
    db.select('email','hash').from('login').where('email','=', email)
    .then(data =>{
        const isValid = bcrypt.compareSync(password,data[0].hash);
        if(isValid){
            return db.select('*').from('user').where('email','=',email)
            .then(user =>{
                res.json(user[0])
            })
            .catch(err => {
                res.status(400).json("UNABLE TO GET THE DATA");
            })
        }else{
            res.status(400).json("INVALID CREDENTIALS");
        }
    })
    .catch(err => {
        res.status(400).json("WRONG CREDENTIALS");
    })
}

module.exports = {
    handleSignIn: handleSignIn
};