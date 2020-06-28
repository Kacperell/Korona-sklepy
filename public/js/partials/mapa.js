import L from 'leaflet';


function mapa() {

    let map = L.map('mapid').setView([53.4346, 14.5229], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

    }).addTo(map);

    // map.locate({setView: true, maxZoom: 13});

    function onLocationFound(e) {
        //    var radius = e.accuracy;
        //    L.marker(e.latlng).addTo(map)
        //        .bindPopup("You are within " + radius + " meters from this point").openPopup();
        //    L.circle(e.latlng, radius).addTo(map);
    }

    function onLocationError(e) {
        // console.log(e.message);
    }

    map.on('locationerror', onLocationError);
    map.on('locationfound', onLocationFound);

    // L.Control.Watermark = L.Control.extend({
    //     onAdd: function(map) {
    //         var img = L.DomUtil.create('img'); 
    //         img.src = '/img/logo3.png';
    //         // img.src = 'logo.png';
    //         img.style.width = '180px';
    //         return img;
    //     },
    //     onRemove: function(map) {
    //       // Nothing to do here
    //     }
    // });   
    // L.control.watermark = function(opts) {
    //     return new L.Control.Watermark(opts);
    // }   
    // L.control.watermark({ position: 'bottomright' }).addTo(map);



    // var icon = L.icon({
    //     iconUrl: '/img/shopICON.svg',
    //     // shadowUrl: 'dom.png',
    //     iconSize:     [35, 35], // size of the icon
    //     shadowSize:   [35, 35], // size of the shadow
    //     // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    //     shadowAnchor: [4, 62],  // the same for the shadow
    //     // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    // });
   



    function putMarkersOnTheMap(lokale) {
      let day=new Date().getDay();
        for (const lokal of lokale) {
            L.marker([lokal.lat, lokal.lng])
            // L.marker([lokal.lat, lokal.lng],{icon:icon})
            .addTo(map)
            .bindPopup(`
            <div class="popupMap">       
       <span>     ${lokal.name} </span>
    
       <span>     ${lokal.adres.split('(')[0]} </span>

            <div class="popUPgodziny">
           
            <div class="popUPgodziny--dni"
            <span class=${(day=='1'?'boldDay':'')}> Pon:</span>
            <span class=${(day=='2'?'boldDay':'')}> Wto:</span>
            <span class=${(day=='3'?'boldDay':'')}> Śro:</span>
            <span class=${(day=='4'?'boldDay':'')}> Czw:</span>
            <span class=${(day=='5'?'boldDay':'')}> Pią:</span>
            <span class=${(day=='6'?'boldDay':'')}> Sob:</span>
            <span class=${(day=='0'?'boldDay':'')}> Nie:</span>
            
            </div>
            <div class="popUPgodziny--godziny"
            <span class=${(day=='1'?'boldDay':'')}> ${lokal.godziny[0].pon[0].od} - ${lokal.godziny[0].pon[0].do} </span>
            <span class=${(day=='2'?'boldDay':'')}> ${lokal.godziny[0].wto[0].od} - ${lokal.godziny[0].wto[0].do} </span>
            <span class=${(day=='3'?'boldDay':'')}> ${lokal.godziny[0].sro[0].od} - ${lokal.godziny[0].sro[0].do} </span>
            <span class=${(day=='4'?'boldDay':'')}> ${lokal.godziny[0].czw[0].od} - ${lokal.godziny[0].czw[0].do} </span>
            <span class=${(day=='5'?'boldDay':'')}> ${lokal.godziny[0].pia[0].od} - ${lokal.godziny[0].pia[0].do} </span>
            <span class=${(day=='6'?'boldDay':'')}> ${lokal.godziny[0].sob[0].od} - ${lokal.godziny[0].sob[0].do} </span>
            <span class=${(day=='0'?'boldDay':'')}> ${lokal.godziny[0].nie[0].od} - ${lokal.godziny[0].nie[0].do} </span>
            </div>

            </div>

            </div>
            `); 
        }

    }

    function takeCompaniesFromDatabase() {
        fetch('dataLokalsToMapApi')
            .then((response) => {
                // console.log(response);
                return response.json();
            })
            .then((data) => {
                putMarkersOnTheMap(data)
            });

    }

    takeCompaniesFromDatabase();







if(!document.querySelector('#mapid'))return;

}



export default mapa;