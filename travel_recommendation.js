const btnSearch = document.getElementById("btnSearch");

function clearSearch(){
    document.getElementById("destinationInput").value = "";
}

function searchDestination(){
    const input = document.getElementById("destinationInput").value.toLowerCase();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data =>{
            const matches = [];
            countryMatch = false;
            cityMatch = false;
            
            
            data.countries.forEach(country => {
                if(country.name.toLowerCase() === input){
                    countryMatch = true;

                    country.cities.forEach(city => {
                        matches.push({
                            name : city.name,
                            description : city.description,
                            imageUrl : city.imageUrl
                        });
                    });
                }
            });

            if(!countryMatch){
                data.countries.forEach(country => {
                    country.cities.forEach(city => {
                        if(city.name.toLowerCase().includes(input)){
                            cityMatch = true;
                            matches.push({
                                name : city.name,
                                description : city.description,
                                imageUrl : city.imageUrl
                            });
                        }
                    });
                });
            }
            
            if(input==="countries" || input==="country"){
                data.countries.forEach(country => {
                    country.cities.forEach(city => {
                        matches.push({
                            name: city.name,
                            description : city.description,
                            imageUrl : city.imageUrl
                        });
                    });
                });
            }
            else if(input === "beaches" || input === "beach"){
                data.beaches.forEach(beach => {
                    matches.push({
                        name: beach.name,
                        description : beach.description,
                        imageUrl : beach.imageUrl
                    });
                });
            }
            else if(input === "temples" || input === "temple"){
                data.temples.forEach(temple => {
                    matches.push({
                        name: temple.name,
                        description : temple.description,
                        imageUrl : temple.imageUrl
                    });
                });
            }
            
            if(matches.length === 0){
                resultDiv.innerHTML = "<p>No destinations found.</p>";
                return;
            }

            matches.forEach(item => {
                const card = document.createElement("div");
                card.className = "destination-card";
                card.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.name}" style="max-width:200px;">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                `;
                resultDiv.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Error loading JSON:", err);
            resultDiv.innerHTML = "<p>Something went wrong. Please try again later.</p>";
        });
}

btnSearch.addEventListener('click', searchDestination);