

 const loadCategory =()=>{
    fetch('https://fakestoreapi.com/products/categories')
      .then(response => response.json())
      .then(json => displayCategory(json))

      fetch(`https://fakestoreapi.com/products`)
            .then(res => res.json())
            .then(data => displayCategoryProduct(data));
}

const displayCategory = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = "";

    const updatedCategories = ["all", ...categories];
    // Flex layout + small gap
    categoryContainer.className = "flex flex-wrap gap-2";

    updatedCategories.forEach(category => {
        const btnDiv = document.createElement("div");
        const urlSafeCategory = category.includes(' ') ? category.replace(/ /g, '%20').replace(/'/g, '%27') : category;
       console.log(urlSafeCategory);
        btnDiv.innerHTML = `
            <button 
                onclick='displayCart("${urlSafeCategory}")'
                class="px-4 py-1.5 text-sm font-medium 
                       border border-indigo-500 
                       text-indigo-600 
                       rounded-full 
                       hover:bg-indigo-600 hover:text-white 
                       transition duration-200">
                ${category}
            </button>
        `;

        categoryContainer.append(btnDiv);
    });
}

const displayCart = (category) => {
    console.log('hello '+category);


    if(category === "all"){
      fetch(`https://fakestoreapi.com/products`)
            .then(res => res.json())
            .then(data => displayCategoryProduct(data));
 
    } else {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then(res => res.json())
            .then(data => displayCategoryProduct(data));
    }


}

const displayCategoryProduct=(products)=>{
    
    console.log(products)
    const productContainer=document.getElementById('product-container');
    productContainer.innerHTML='';
    if(!products || products.length==0){
        productContainer.innerHTML=`<div class="bg-white rounded-2xl p-4 items-center justify-center col-span-full text-center py-6">
             <h2>No Product Available</h2>
        </div>`
        return;
    }
    products.forEach(product => {
      
        const btnDiv=document.createElement("div");
        btnDiv.innerHTML=`
            <div class="bg-white rounded-xl shadow p-4">
            <img src="${product.image}" class="h-60 mx-auto object-contain">
            <div class="flex justify-between">
                <p class="text-indigo-600 font-bold">${product.category}</p>
                <p class=" font-bold"><i class="fa-regular fa-star"></i>${product.rating.rate}</p>
            </div>
            <h3 class="font-semibold mt-4">${product.title}</h3>
            <p class="text-indigo-600 font-bold">${product.price}</p>
            <div class="flex justify-between mt-4">
            <button onclick="showDetails(${product.id})"
            class="border px-4 py-2 rounded-lg text-sm">
                 Details
          </button>
            <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">Add</button>
            </div>
           </div>
         `;
         productContainer.append(btnDiv)
    });
}

const showDetails = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(product => {

            const modalContent = document.getElementById("modal-content");

            modalContent.innerHTML = `
                <img src="${product.image}" 
                     class="h-60 mx-auto object-contain mb-4">

                <h2 class="text-xl font-bold mb-2">
                    ${product.title}
                </h2>

                <p class="text-gray-600 mb-4">
                    ${product.description}
                </p>

                <p class="text-indigo-600 font-bold text-lg">
                    $${product.price}
                </p>
            `;

            document.getElementById("product_modal").showModal();
        });
};

loadCategory();