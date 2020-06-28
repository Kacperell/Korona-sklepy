



function dowoz(search) {
    let selectCateogry = document.querySelector('.dodajLokalForm__inputDiv__selectCategory');
    let restauracjeChceboxy=document.querySelector('.restauracje--chceboxy');
    if (!selectCateogry) {
        return;
    }

    function showChecboxes(option){
        if(option.value=='restauracje'){
            restauracjeChceboxy.classList.remove("off");
        }else{
            restauracjeChceboxy.classList.add("off");

        }
    }
    window.showChecboxes=showChecboxes;

    selectCateogry.addEventListener('onchange',showChecboxes);
    let restauracjeKategoria=document.querySelector('.restauracjeKategoria');
    restauracjeKategoria.addEventListener('clcik',showChecboxes);
    restauracjeKategoria.addEventListener('click',()=>{
        console.log('aa');
    })
}



export default dowoz;