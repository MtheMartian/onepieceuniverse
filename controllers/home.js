module.exports = {
  getIndex: (request, response) =>{
    db.collection('characters').find().toArray()
    .then(data =>{
      response.render('index.ejs', {info: data});
    })
    .catch(err =>{
      console.log(`Something went wrong! ${err}`);
    })
  },
  getInfo:(request, response) =>{
    db.collection('characters').find().toArray()
    .then(data =>{
      response.send(data);
    })
    .catch(err =>{
      console.log(`Nooo! ${err}`);
    })
  }
}
