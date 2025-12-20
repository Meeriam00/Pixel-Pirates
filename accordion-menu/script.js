
const headers=document.querySelectorAll(".accordion-header")

headers.forEach(header=>{
       header.addEventListener("click",()=>{
        const item=header.parentElement; 
        const icon=header.querySelector(".icon")


        // sanki yoxlanmasi ve acilmasi ucun aktivdirmi suali veririk, classi active-dirmir
        const isOpen=item.classList.toggle("active")


    //   if else yerine ternary istifade etdim , aktivdirse - gorunsun artiq, aktiv deyilse +
        icon.textContent=isOpen ? "-" : "+";
       })
})