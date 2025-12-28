const container=document.getElementById("container")

let allCountries= [];


fetch("https://restcountries.com/v3.1/region/europe")
.then(res=>res.json())
.then(data=>{
    // Datalari sanki bir array daxiline saliriq, asagidaki funksiyada istifade edek
    allCountries=data; 
    showCountries(0,10);
    // ilk acilanda 0 ve 10 arasindaki datanin gorunmesi
})
.catch(err=>console.log("Xeta bas verdi:",err))

function showCountries(start,end){
    container.innerHTML= "";
    
    // slice olunur, html-deki start ve end reqemlerine gore
    const selected=allCountries.slice(start,end);

    selected.forEach(country=>{
        container.innerHTML+=`
        <div class="card">
        <img src="${country.flags.png}" alt="">
        <h4>${country.name.common}</h4>
       </div>`;
    })
}
