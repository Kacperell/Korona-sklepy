function dodajFormGodziny() {

    const dniRoboczeButton = document.querySelector('.dodajLokalForm--DniRobocze');
    if (!dniRoboczeButton) return;
    dniRoboczeButton.addEventListener('click', (e) => {
        e.preventDefault();
        const dodajLokalFormDoPon = document.querySelector('.dodajLokalFormDoPon');
        const dodajLokalFormOdPon = document.querySelector('.dodajLokalFormOdPon');
        let odRoboczy = document.querySelectorAll('.odRoboczy');
        let doRoboczy = document.querySelectorAll('.doRoboczy');
        for (let i = 0; i < odRoboczy.length; i++) {
            odRoboczy[i].value = dodajLokalFormOdPon.value;
            doRoboczy[i].value = dodajLokalFormDoPon.value;
        }
    });

}



export default dodajFormGodziny;