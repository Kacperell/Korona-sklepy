const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');
const wpisSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Wprowadz nazwe'
    },
    slug: String,
    miasto: {
        type: String,
        trim: true,
        required: 'Wprowadź miasto!'
    },
    adres: {
        type: String,
        trim: true,
        required: 'Wprowadź adres!'
    },
    www: {
        type: String,
        trim: true,
        // required: 'Wprowadź adres!'
    },
    zatwierdzony: {
        type: Boolean,
        // trim: true,
        // required: 'Wprowadź adres!'
    },
    kategoria: {
        type: String,
        trim: true,
        required: 'Wprowadź kategorie!'
    },
    lat: {
        type: String,
        trim: true,
    },
    lng: {
        type: String,
        trim: true,
    },
    wynos: {
        type: String,
        trim: true,
    },
    dowoz: {
        type: String,
        trim: true,
    },
    photo: {
        type: String,
        trim: true,
        // required: 'Wprowadź kategorie!'
    },
    godziny: [{
        pon: [{
            od: {
                type: String
            },
            do: {
                type: String
            }
        }],
        wto: [{
            od: {
                type: String
            },
            do: {
                type: String
            }
        }],
        sro: [{
            od: {
                type: String
            },
            do: {
                type: String
            }
        }],
        czw: [{
            od: {
                type: String
            },
            do: {
                type: String
            }
        }],
        pia: [{
            od: {
                type: String
            },
            do: {
                type: String
            }
        }],
        sob: [{
            od: {
                type: String
            },
            do: {
                type: String
            }
        }],
        nie: [{
            od: {
                type: String
            },
            do: {
                type: String
            }
        }],

    }],
    // godziny: [{
    //     od: {
    //         type: String
    //     },
    //     do: {
    //         type: String
    //     },
    // }],

    created: {
        type: Date,
        default: Date.now
    },

});



/////////////////
wpisSchema.pre('save', function (next) {
    if (!this.isModified('name')) {
        next(); //skip it
        return; //stop this fn 
    }
    this.slug = slug(this.name);
    next();
});

module.exports = mongoose.model('Wpis', wpisSchema);