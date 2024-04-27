const loadNewsCategory = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    const newses = data.data.news_category;
    displayNewsCategory(newses)
}


// const displayNewsCategory = newses => {
//     const newsCategoryContainer = document.getElementById('news-thumbnail');
//     newses.forEach(news => {
//         console.log(news);
//         const newsTitle = document.createElement('li');
//         // newsTitle.classList.add('categoryNews');
//         newsTitle.classList = 'categoryNews p-3 rounded-full font-semibold';
//         newsTitle.innerText = `${news.category_name}`;
//         // newsTitle.classList = `flex justify-around`;
//         // newsCategoryContainer.innerHTML = `
//         // <li>${news.category_name}</li>
//         // `;
//         newsCategoryContainer.appendChild(newsTitle);
//     });
// }

const displayNewsCategory = (newses) => {
    const newsCategoryContainer = document.getElementById('thumbnail');
    newses.forEach(news => {
        // console.log(news);
        const newsTitle = document.createElement('div');
        newsTitle.classList = 'categoryNews py-2 rounded-full font-semibold text-center';
        newsTitle.innerHTML = `<p onclick="handleShowNewsDetail('${news.category_id}')">${news.category_name}</p>`;
        newsCategoryContainer.appendChild(newsTitle);
    })
}

const handleShowNewsDetail = async (newsCategoryId) => {
    // console.log(newsCategoryId);
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${newsCategoryId}`);
    const data = await res.json();
    const wholeNewses = data.data;
    displayNewsCart(wholeNewses);
}

const displayNewsCart = wholeNewses => {
    console.log(wholeNewses.length);
    const showNewsCart = document.getElementById('News-cart');
    showNewsCart.innerHTML = ``;
    wholeNewses.forEach(wholeNews => {
        console.log(wholeNews);
        const newsCart = document.createElement('div');
        newsCart.classList = `mx-auto mt-10 card md:card-side lg:card-side bg-base-100 shadow-xl`;
        newsCart.innerHTML = `
        <div class=" lg:w-6/12 sm:w-full"><figure><img src="${wholeNews.image_url}" alt="Album"/></figure></div>
        <div class="card-body">
          <h2 class="card-title">${wholeNews.title}</h2>
          <p>${wholeNews.details.slice(0,200)+'...'}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-outline">Details</button>
          </div>
        </div>
        `;
        showNewsCart.appendChild(newsCart);
    })
}

// const displayNewsCategory = newses => {
//     const newsCategoryContainer = document.getElementById('news-thumbnail');
//     newses.forEach(news => {
//         console.log(news);
//         /* fff */
//         const newsTitle = document.createElement('li');
//         /* fff */
//         // newsTitle.classList.add('categoryNews');
//         /* fff */
//         newsTitle.classList = 'categoryNews p-3 rounded-full font-semibold';
//         newsTitle.innerText = `${news.category_name}`;
//         // /* fff */
//         // newsTitle.classList = `flex justify-around`;
//         // newsCategoryContainer.innerHTML = `
//         // <li>${news.category_name}</li>
//         // `;

//         // newsCategoryContainer.innerHTML =`<li class="categoryNews p-3 rounded-full font-semibold">${news.category_name}</li>`;
//         /* fff */
//         newsCategoryContainer.appendChild(newsTitle);
//         /* fff */
//     });
// }

handleShowNewsDetail('03');
loadNewsCategory();