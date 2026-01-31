let tab = JSON.parse(localStorage.getItem("articles")) || [
    { nom: "AIR JORDAN", prix: 30000, stocks: 10 }
];
tab.forEach(article => {
    article.id = crypto.randomUUID();
});

// ===================
// AJOUT ARTICLE (backend)
// ===================

let adds = document.querySelector("#adds");

if (adds) {
    adds.addEventListener("click", () => {

        let articleName = document.querySelector("#name").value;
        let price = Number(document.querySelector("#price").value);
        let stock = Number(document.querySelector("#stock").value);
        let sary= document.querySelector("#sary").value;

        if (
            articleName.trim() === "" ||
            price <= 0 ||
            stock <= 0
        ) return;

        let newArticle = {
            nom: articleName,
            prix: price,
            stocks: stock,
            image: sary
        };

        tab.push(newArticle);

        localStorage.setItem("articles", JSON.stringify(tab));

        alert("Article ajouté avec succès ✅");

        location.reload();
        document.querySelector("#name").value = "";
        document.querySelector("#price").value = "";
        document.querySelector("#stock").value = "";
        document.querySelector("#sary").value= "";

    });
}

// ===================
// AFFICHAGE (frontend)
// ===================
let panier = JSON.parse(localStorage.getItem("panier")) || [];
let result = document.querySelector("#lesArticles");
let pnr= document.querySelector("#cart");
let x=0;

if (result) {
    tab.forEach(article => {
    
        let box = document.createElement("div");
        let images= document.createElement("div");

        let nom = document.createElement("p");
        let prix = document.createElement("p");
        let stock = document.createElement("p");
        let photo= document.createElement("img");
        let auPanier= document.createElement("button");

        box.classList.add("box");
        images.classList.add("image");
        auPanier.classList.add("ajouter")

        nom.textContent = `${article.nom}`;
        prix.textContent = `Prix : ${article.prix.toLocaleString("fr-FR")} ar`;
        stock.textContent = `Stock : ${article.stocks}`;
        auPanier.textContent= `Au Panier`;
        photo.src= `${article.image}`;
      
        auPanier.dataset.id = article.id;
        images.appendChild(photo);
        

        box.appendChild(images);
        box.appendChild(nom);
        box.appendChild(prix);
        box.appendChild(stock);
        box.appendChild(auPanier);

        result.appendChild(box);
      
        auPanier.addEventListener("click",()=>{
         
          const produit= tab.find(p => p.id=== article.id);
          panier.push(produit) // ajouter dans un nouveau tableau

          localStorage.setItem("panier", JSON.stringify(panier));

          alert ("Ajouter Au Panier!")
        });
        
       

    });
       
};

 
let articleDispo= document.querySelector("#dispo");

if(articleDispo){
  tab.forEach((article, index) => {

        let box2 = document.createElement("div");
        let texte = document.createElement("p");
        let supprimer= document.createElement("button");
        
        box2.classList.add("box2")
        texte.textContent = `Article : ${article.nom} |Prix: ${article.prix.toLocaleString("fr-FR")} AR |stocks: ${article.stocks}`;
        supprimer.textContent= `Supprimer` ;

        supprimer.addEventListener("click",()=>{
          tab.splice(index, 1);// supprimer 1 seul objet
          localStorage.setItem("articles", JSON.stringify(tab));
          location.reload();// recharge l'affiche
        });

        box2.appendChild(texte);
        box2.appendChild(supprimer);
        articleDispo.appendChild(box2);
    
  });
};

let orders= document.querySelector("#cart-list");

if(orders){
   panier.forEach( (article, index)=> {
        let sousBox3= document.createElement("div");
        let annuler= document.createElement("button");
        let p = document.createElement("p");

        p.textContent = `${article.nom} - ${article.prix.toLocaleStrind("fr-FR")} Ar`;
        annuler.textContent= "Annuler";
        sousBox3.classList.add("cart-listS");


        orders.appendChild(sousBox3);
        sousBox3.appendChild(p);
        sousBox3.appendChild(annuler);
       
           annuler.addEventListener("click",() => {
           panier.splice( index,1);
           localStorage.setItem("panier", JSON.stringify(panier));
           location.reload();
        })
});
};

let versPanier= document.querySelector("#cart");
versPanier.addEventListener("click",() => {
  window.location.href= "panier.html";
});


