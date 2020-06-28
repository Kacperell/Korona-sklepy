const express = require('express');
const router = express.Router();

const PagesController = require('../controllers/PagesController');
const ListaLokali = require('../controllers/ListaLokali');
const {
    catchErrors
} = require('../handlers/errorHandlers');

// router.get('/', catchErrors(PagesController.home));
router.get('/', catchErrors(PagesController.home));
router.get('/dodaj_lokal', PagesController.dodajLokalForm);
router.post('/dodaj_lokal',
    PagesController.upload,
    catchErrors(PagesController.resize),
    catchErrors(PagesController.dodajLokalDobBazy));
router.get('/lokale_lista/', ListaLokali.lista);
router.get('/dataLokalsToMapApi', ListaLokali.lokalsToMapApi);
router.get('/bezpieczne_zakupy', PagesController.bezpieczneZakupy);

router.get('/polityka_prywatnosci', PagesController.politykaPrywatnosci);
// router.get('/lokale_lista/:miasto', ListaLokali.lista);

module.exports = router;