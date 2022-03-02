const main = document.getElementById('main');
const searchButton = () => {
    const input = document.getElementById("input-value");
    const error= document.getElementById('error')
    const inputValue = input.value;
    if  (inputValue==""){  // error handling
        error.innerText ="your data is not found, please give me phone name";
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
        error.innerText ="your data is not found, please give me phone name";
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
              <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>
              <p class="card-text">Phone Brand: ${phone.brand}</p>
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
            console.log(singlePhone)
            
            main.innerHTML="";
            div.innerHTML= `
        <div class="card" style="width: 18rem;">
        <img src="${singlePhone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Phone Name: ${singlePhone.name}.name}</h5>
          <p class="card-text">Phone Brand: ${singlePhone.brand}</p>
          <p class="card-text">Phone Brand: ${singlePhone.mainFeatures.chipSet}</p>
          
        </div>
      </div>
        `
            main.appendChild(div)
        })
}