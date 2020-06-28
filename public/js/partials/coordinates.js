var debounce = require('debounce');


function coordinates(search) {
    let flag=0;
    let AdresSugest = document.querySelector('#AdresSugest');
    if(!AdresSugest) return;

    function putLocationToDatalist(locations) {
        console.log(locations);
        AdresSugest.innerHTML='';
        for (let i = 0; i < locations.length; i++) {
            var option = document.createElement('option');
            // Set the value using the item in the JSON array.
            option.value = `${locations[i].street} (${locations[i].adminArea5},${locations[i].postalCode},${locations[i].adminArea3})`;
            AdresSugest.appendChild(option);
        }
    }

    function takePlacesFromApi() {
        if (adresInput.value.toString().includes(')')) return;
        fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=UVAtKgDLOsynL4BlRRQy4VIis4ybzSeM&location=Poland,${miastoInput.value},${adresInput.value}`)
            .then(function (response) {
                return response.text();
            }).then(function (data) {
                return JSON.parse(data);
            }).then(function (data) {
                putLocationToDatalist(data.results[0].locations);
            });
    }



    function addCoordinates(e, ) {
        e.preventDefault()
        if(flag==1)return
        flag=1;
        
        fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=UVAtKgDLOsynL4BlRRQy4VIis4ybzSeM&location=Poland,${adresInput.value}}`)
            .then(function (response) {
                return response.text();
            }).then(function (data) {
                return JSON.parse(data);
            }).then(function (data) {
                // putLocationToDatalist(data.results[0].locations);
                console.log(data.results[0].locations[0]);
                console.log(data.results[0].locations[0].latLng);

                var input = document.createElement('input'); //prepare a new input DOM element
                input.classList.add("noshow");
                input.setAttribute('name', 'lat'); //set the param name
                input.setAttribute('value', data.results[0].locations[0].latLng.lat); //set the value
                input.setAttribute('type', 'text') //set the type, like "hidden" or other
                formDodajLokal.appendChild(input); //append the input to the form
                
                var input2 = document.createElement('input'); //prepare a new input DOM element
                input2.classList.add("noshow");
                input2.setAttribute('name', 'lng'); //set the param name
                input2.setAttribute('value', data.results[0].locations[0].latLng.lng); //set the value
                input2.setAttribute('type', 'text') //set the type, like "hidden" or other
                formDodajLokal.appendChild(input2); //append the input to the form

                formDodajLokal.submit(); //send with added input


            });



    }


    let adresInput = document.querySelector('.dodajLokalForm__inputDiv--adres');
    let miastoInput = document.querySelector('.dodajLokalForm__inputDiv--miasto');


    // adresInput.addEventListener("change", debounce(takePlacesFromApi, 700));
    adresInput.addEventListener("keyup", debounce(takePlacesFromApi, 280));

    let formDodajLokal = document.querySelector('.dodajLokalForm');
    formDodajLokal.addEventListener("submit", addCoordinates, true);
}



export default coordinates;