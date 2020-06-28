
const fs = require('fs');

const moment = require('moment');
moment.locale('pl');

exports.moment = moment;

exports.dump = (obj) => JSON.stringify(obj, null, 2);


exports.icon = (name) => fs.readFileSync(`./public/img/icons/${name}.svg`);


exports.siteName = 'Koronawirus Sklepy ';

exports.menu = [{
        slug: '/przepisy',
        title: 'Przepisy',
        icon: 'przepisy',
    },
    {
        slug: '/top',
        title: 'Top',
        icon: 'top',
    },
    // {
    //     slug: '/chat',
    //     title: 'chat',
    //     icon: 'chat',
    // },
    {
        slug: '/dodaj',
        title: 'Dodaj',
        icon: 'dodaj',
    },
];
