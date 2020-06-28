const mongoose = require('mongoose');
const Wpis = mongoose.model('Wpis');
const uuid = require('uuid');
const multer = require('multer');
const sharp = require('sharp');
const {
    Storage
} = require('@google-cloud/storage');
const storage = new Storage({

    keyFilename: process.env.GCS_KEYFILE,

});
const bucket = storage.bucket(process.env.GCS_BUCKET);
const multerOptions = {

    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true);
        } else {
            next({
                message: 'That filetype isnt allowd! '
            }, false);
        }
    }
};
exports.upload = multer(multerOptions).array('photo', [5]);


exports.resize = async (req, res, next) => {
    const photos = [];
    if (req.files.length != 0) {
        for (let i = 0; i < req.files.length; i++) {
            const extension = req.files[i].mimetype.split('/')[1];
            const image = `${uuid.v4()}.${extension}`;
            const reducedBuffer = await sharp(req.files[i].buffer).resize(800, sharp.AUTO).toBuffer();
            const blob = await bucket.file(`${image}`);
            await photos.push(`${blob.name}`);
            const stream = blob.createWriteStream({
                resumable: false,
                contentType: req.files[i].mimetype,
                predefinedAcl: 'publicRead',
            })
            stream.on('error', err => {
                console.log(err);
            });
            stream.end(reducedBuffer);
        }
    }
    req.body.photo = photos[0];
    next();
};


exports.home = async (req, res) => {

    res.render('home', {
        //     // title: 'Foodie 🥝'
    });
};

exports.dodajLokalForm = (req, res) => {
    res.render('dodajLokal', {
        title: 'Dodaj lokal'
    });
};
exports.dodajLokalDobBazy = async (req, res) => {
    // console.log(req.body);
    const wpis = await (new Wpis({
        'name': req.body.localname,
        // 'miasto': req.body.miasto,
        'miasto': req.body.miasto.toUpperCase(),
        'adres': req.body.adres,
        'www': req.body.www,
        'kategoria': req.body.kategoria,
        'godziny': req.body.godziny,
        'photo': req.body.photo,
        'lat': req.body.lat,
        'lng': req.body.lng,
        'wynos': req.body.wynos,
        'dowoz': req.body.dowoz,
        'zatwierdzony': false
        // 'godziny': req.body.godziny.pon
    })).save();
    await wpis.save();

    req.flash('succes', 'Dziekujemy, Twoje zgłoszenie zostanie dodane po akceptacji przez moderatora ');
    res.redirect('/');

};
exports.bezpieczneZakupy = async (req, res) => {

    res.render('zasadyZakupy', {
    });
};
exports.politykaPrywatnosci = async (req, res) => {

    res.render('politykaPrywatnosci', {
    });
};