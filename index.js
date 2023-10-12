import { ACCESS_KEY } from "./api.js";


const searchResult = document.getElementById("searchResult");

async function getResult(){
    const url = `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`;
    const result = await fetch(url);
    const data = await result.json();
    createImageCard(data);
}

function createImageCard(data){
    data.forEach((ele, idx) => {
        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "d-flex col-sm-6 col-md-4 col-lg-3 mb-4");
        cardBody.innerHTML = `
            <div class="card d-flex">
                <img class="card-img-top" src="${ele.urls.regular}" style="height: 50vh" alt="Card image cap">
                <div class="card-body">
                    <p class="card-text">${ele.alt_description}</p>
                </div>
            </div>
        `;
        searchResult.appendChild(cardBody);
    })
}

getResult();