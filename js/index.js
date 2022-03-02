const main = document.getElementById('main');
const searchButton = () => {
    const input = document.getElementById("input-value");
    const error= document.getElementById('error')
    const inputValue = input.value;
    if (inputValue==""){  // error handling
        error.innerText ="please give a phone name";
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
    for(const phone of phones){
        const div = document.createElement("div");
        div.classList.add("col-lg-4")
        div.classList.add("col-sm-12")
        div.classList.add("mb-5")
        div.innerHTML= `
        <div class="card" style="width: 18rem;">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">${phone.brand}</p>
          <button onclick="cardDetails('${phone.slug}')" class="btn btn-primary">See Details</button>
        </div>
      </div>
        `
        main.appendChild(div);

    }
}