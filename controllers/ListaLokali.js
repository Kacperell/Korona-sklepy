const mongoose = require('mongoose');
const Wpis = mongoose.model('Wpis');
exports.lista = async (req, res) => {
    // const page = req.params.page || 1;
    // // const limit = 42;
    // const limit = 10;
    // const skip = (page * limit) - limit;
   let kat;
   if(!req.query.kategoria) {
       kat="spożywcze"
   }else{
       kat=req.query.kategoria;
   }
   const wpisy = await Wpis.find({
    miasto: req.query.miasto.toUpperCase(),
    kategoria:kat
   });  
    res.render('listaLokali', {
        miasto:  req.query.miasto.toUpperCase(),
        kategoria:  kat,
        wpisy:  wpisy
    });
};
// exports.lista = async (req, res) => {
//    let kat;
//    if(!req.query.kategoria) {
//        kat="spożywcze"
//    }else{
//        kat=req.query.kategoria;
//    }
//    const wpisy = await Wpis.find({
//     miasto: req.query.miasto.toUpperCase(),
//     kategoria:kat
//    });  
//     res.render('listaLokali', {
//         miasto:  req.query.miasto.toUpperCase(),
//         kategoria:  kat,
//         wpisy:  wpisy
//     });
// };

exports.lokalsToMapApi = async (req, res) => {
    const wpisy = await Wpis.find({
        // miasto: req.query.miasto.toUpperCase(),
       });  
    
res.json(wpisy);
};