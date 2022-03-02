const main = document.getElementById('main');
const searchButton = () => {
    const input = document.getElementById("input-value");
    const error= document.getElementById('error')
    const inputValue = input.value;
    if  (inputValue==""){  // error handling
        error.innerText ="No Phone Found, please give me phone name!";
        input.value= '';
        main.innerHTML= '';
    }

    else{ // main part
        main.innerHTML= '';
        fetch(` https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then( res => res.json())
        .then (data => phoneDisplay(data.data));
        input.value='';
        error.innerHTML= '';
    }
}
// function
phoneDisplay = (phones) => {
    // console.log(phones)
    if(phones.length == 0){ // searchbar null, error handling
        error.innerText ="No Phone Found, please give me phone name!";
        input.value= '';
        main.innerHTML= '';
    }
    else{
        for(const phone of phones){
            const div = document.createElement("div");
            div.classList.add("col-lg-4")
            div.classList.add("col-sm-12")
            div.classList.add("mb-5")
            div.innerHTML= `
            <div class="card" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Phone Name: <h2>${phone.phone_name}</h2> </h5>
              <p class="card-text">Phone Brand: <h2>${phone.brand}</h2></p>
              <button onclick="cardDetails('${phone.slug}')" class="btn btn-primary">See Details</button>
            </div>
          </div>
            `
            main.appendChild(div);
    
        }
    }
}
const cardDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then( res => res.json())
        .then (data =>{
            const singlePhone= data.data;
            const div = document.createElement("div");
            main.innerHTML="";
            div.innerHTML= `
        <div class="card" style="width: 18rem;">
        <h1 class="text-success mb-5">Phone Details:</h1>
        <img src="${singlePhone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"><h5>Phone Name:</h5> <h2>${singlePhone.name}</h2></h5>
          <p class="card-text"><h5>Phone Brand:</h5> ${singlePhone.brand}</p>
          <p class="card-text"><h5>Phone chipSet:</h5> ${singlePhone.mainFeatures.chipSet}</p>
          <p class="card-text"><h5>Phone Display Size:</h5> ${singlePhone.mainFeatures.displaySize}</p>
          <p class="card-text"><h5>Phone Memory:</h5> ${singlePhone.mainFeatures.memory}</p>
          <p class="card-text"><h5>Phone Storage:</h5> ${singlePhone.mainFeatures.storage}</p>
          <p class="card-text"><h5>Phone Release Date:</h5> ${singlePhone.mainFeatures.releaseDate}</p>
          
        </div>
      </div>
        `
            main.appendChild(div)
        })
}