const Api_key="ec471072c3e344e7be27c64a9b81423d";

const url="https://newsapi.org/v2/everything?q=";



window.addEventListener('load',()=>fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apikey=${Api_key}`);

  

   /*  We use await keyword because fetch key return promise and it take some time to return the value */

    const data=await res.json();
   // console.log(data);
    bindData(data.articles);

    /* data k aunder article hai islye bind karna hai */

}

function bindData(articles){

    

    const cardContainer=document.getElementById('card-container');
    const templateNewsCard=document.getElementById('template-news card');
    cardContainer.innerHTML=''

   /*  jab bhi bond data call hoa card container Ko 
    hum empty kar denge qnki 100 card k niche or card aa jayegi
   */

    const showArticle=articles.slice(0,15);

    showArticle.forEach(article=>{
        if(!article.urlToImage) return;  /* It means no need to show that article where image is not found */



        const cardClone=templateNewsCard.content.cloneNode(true);

       /*  Above line means sare div template news card k clone ho jaye */

        fillData(cardClone,article);
        cardContainer.appendChild(cardClone);
    })


}

/* data fill for template code start here */

function fillData(cardClone,article){
    const newsImage=cardClone.querySelector('#news-image');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDescription=cardClone.querySelector('#news-desc');

    newsImage.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDescription.innerHTML=article.description;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/jakarta",
    });

    newsSource.innerHTML=`${article.source.name}:${date}`;

    cardClone.firstElementChild.addEventListener('click',function(){
        window.open(article.url);

    })
}

/* data fill for template code end here */

let selectedNav=null;
function onNavItemClick(id){
    fetchNews(id);

    const navItems=document.getElementById(id);
    selectedNav?.classList.remove("active");
    selectedNav=navItems;
    selectedNav?.classList.add("active");

}

const searchButton=document.getElementById("search-button");
const searchText=document.getElementById("search-text");

searchButton.addEventListener('click', ()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    selectedNav?.classList.remove("active");
    selectedNav=null;
});


/* Accordian code start */

const accordian=document.querySelectorAll('.accordian');

accordian.forEach(accordian=>{
    const icon=accordian.querySelector('.icon');
    const answer=accordian.querySelector('.answer');

    accordian.addEventListener('click',(event)=>{
        event.preventDefault();
        icon.classList.toggle('active');
        answer.classList.toggle('active');
    })
})
/* Accordian code end*/

