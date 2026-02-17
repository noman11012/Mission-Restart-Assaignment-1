// Tending Items Code

const loadTending =()=>{
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(json => displayTending(json))
}
// "id": 1,
// "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
// "price": 109.95,
// "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
// "category": "men's clothing",
// "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
// "rating": {
// "rate": 3.9,
// "count": 120
// }
// },
const displayTending =(items)=>{
     console.log(items);
    const tendingContainer=document.getElementById('tending-container');
    tendingContainer.innerHTML="";
 
    items.slice(0,3).forEach(item => {
   
        //console.log(item)
        const btnDiv=document.createElement("div");
        btnDiv.innerHTML=`
            <div class="bg-white rounded-xl shadow p-4">
            <img src="${item.image}" class="h-60 mx-auto object-contain">
            <h3 class="font-semibold mt-4">${item.title}</h3>
            <p class="text-indigo-600 font-bold">${item.price}</p>
            <div class="flex justify-between mt-4">
            <button class="border px-4 py-2 rounded-lg text-sm">Details</button>
            <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">Add</button>
            </div>
           </div>
         `;
         tendingContainer.append(btnDiv)
     
    });
 }

 loadTending();

 
