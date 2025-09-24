function clearSearch(){
    document.getElementById("destinationInput").value = "";
}

function searchDestination(){
    const input = document.getElementById("destinationInput").value.toLowerCase();
    const resultDiv = document.getElementById("result");

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data =>{
            
        })
}