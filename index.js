import { ACCESS_KEY } from "./api.js";


const searchResult = document.getElementById("searchResult");

async function getResult(){
    const url = `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`;
    const result = await fetch(url);
    const data = await result.json();
    createImageCard(data);
}

function createImageCard(data){
    searchResult.innerHTML = ``;
    data.forEach((ele, idx) => {
        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "d-flex col-sm-6 col-md-4 col-lg-3");
        cardBody.innerHTML = `
            <a href="${ele.urls.regular}" target="_blank">
                <img class="w-100 shadow-1-strong rounded mb-4 effects" src="${ele.urls.regular}" alt="Card image cap">
            </a>
        `;
        searchResult.appendChild(cardBody);
    })
}

async function getSearchResult(input_param){
    const url = `https://api.unsplash.com/search/photos?page=1&query=${input_param}&client_id=${ACCESS_KEY}`;
    const result = await fetch(url);
    const data = await result.json();
    createImageCard(data.results);
}

document.getElementById("seach-btn").addEventListener("click", (event) => {
    event.preventDefault();
    let input_param = document.getElementById("input-param").value;
    getSearchResult(input_param);
})

getResult();