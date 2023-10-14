import { ACCESS_KEY } from "./api.js";

let pageIdx = 1;
let oldData = "";

const searchResult = document.getElementById("searchResult");

async function getResult(){
    const url = `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`;
    const result = await fetch(url);
    const data = await result.json();
    createImageCard(data);
}

function createImageCard(data){
    if(pageIdx == 1) searchResult.innerHTML = ``;

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

function showSearchAlert(total){

    if(total === 0){
        document.getElementById("show_more").style.visibility = 'hidden';
        document.getElementById("failed_banner").style.display = "block";
    }
    else{
        document.getElementById("failed_banner").style.display = "none";
        document.getElementById("show_more").style.visibility = 'visible';
        const searchBanner = document.getElementById("result_banner");
        searchBanner.style.display = 'block';
        searchBanner.children[0].innerText = `About ${total}+ results found`;
        setTimeout(() => {
            searchBanner.style.display = 'none';
        }, 3000);
    }
    
    
}

async function getSearchResult(input_param){
    if(oldData != input_param){
        oldData = input_param;
        pageIdx = 1;
        searchResult.innerHTML = ``;
    }

    const url = `https://api.unsplash.com/search/photos?page=${pageIdx}&query=${input_param}&client_id=${ACCESS_KEY}`;
    const result = await fetch(url);
    const data = await result.json();

    const {total, total_pages} = data;
    showSearchAlert(total);

    createImageCard(data.results);
}

let inputValue;
document.getElementById("seach-btn").addEventListener("click", (event) => {
    event.preventDefault();
    let input = document.getElementById("input-param");
    inputValue = input.value;
    if(inputValue){
        getSearchResult(input.value);
        input.value = "";
    }
    document.getElementById("input-param").focus();
})

document.getElementById("input-param").addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
        event.preventDefault();
        let input = document.getElementById("input-param");
        inputValue = input.value;
        if(inputValue){
            getSearchResult(input.value);
            input.value = "";
        }
        document.getElementById("input-param").focus();
    }
})

document.getElementById("show_more").addEventListener("click", (event) => {
    ++pageIdx;
    getSearchResult(inputValue);
})


getResult();