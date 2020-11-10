        let timer;
        let deleteFirstPhotoDelay;
       
        // start function fetches data from url
        async function start(){
            try{ 
            const response = await fetch("https://dog.ceo/api/breeds/list/all");   
            const data = await response.json();    
            createBreedList(data.message);  
            }catch(e){
                console.log("There is a error in fetching the dog breed list from the server");
            }

        }
        start();     
             function createBreedList(BreedList){
            document.getElementById("breed").innerHTML = `  
        <select onchange="loadByBreed(this.value)">
            <option>Choose a dog breed</option>
            ${Object.keys(BreedList).map(function(breed){
                return `<option>${breed}</option>`
            }).join('')}
        </select>`

        }
       async function loadByBreed(breed){
            if(breed!="Choose a dog breed"){
                const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
                const data =  await response.json();      
                createSlideShow(data.message);
            }
     }

function createSlideShow(images) {
    let currentPosition = 0;
    clearInterval(timer);
    clearTimeout(deleteFirstPhotoDelay);

    if(images.length>1){
    document.getElementById("slideshow").innerHTML = `<div class="slide" style="background-image: url('${images[0]}');"></div>
    <div class="slide" style="background-image: url('${images[1]}');"></div> `;
    currentPosition+=2; 
   timer =  setInterval(nextSlide,3000);
    }
    else{
        document.getElementById("slideshow").innerHTML = `<div class="slide" style="background-image: url('${images[0]}');"></div>
    <div class="slide"></div> `;

    }
    function nextSlide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend",
       ` <div class="slide" style="background-image: url('${images[currentPosition]}');"></div>` );
      deleteFirstPhotoDelay = setTimeout(function() {
            document.querySelector(".slide").remove()
        },1000);
        if(currentPosition +1 >=images.length){
            currentPosition = 0;
        }
        else{
            currentPosition++; 
        }
    }


}







