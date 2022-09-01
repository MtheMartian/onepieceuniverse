
module.exports = {
  getSignUp: async (req, res) =>{
    try{
      res.render('signup');
    }
    catch(err){
      console.log(`Oops! ${err}`);
    }
  }
}