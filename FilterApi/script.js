const container=document.getElementById("container")


fetch("https://dummyjson.com/carts")
.then(res=>res.json())
.then(data=>{
    data.carts.forEach(cart=>{
        const filteredProduct=cart.products.filter(p=> p.price > 300);
        
        if(filteredProduct.length > 0){
            filteredProduct.forEach(item=>{
                container.innerHTML+=`
                 <p>${item.price}</p>
                `
            })
        }
    })
})
.catch(err=>console.log(err))