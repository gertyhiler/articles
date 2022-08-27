(() => {
  function creatList (classLIst) {
    const ul = document.createElement('ul');
    ul.classList.add('list', classLIst);
    return ul;
  }

  function createArticleElement (articles) {
    let result = '';

    articles.forEach((article) => {
      const HTMLListItemArticle = `
      <li class="item article">
       <a href="page.html?article=${article.id}" class="link article__link">${article.title}</a>
      </li>
      `;
      result += HTMLListItemArticle
    });
    return result;
  }



  async function getArticles (page) {
    const response = await fetch(`https://gorest.co.in/public/v2/posts?page=${page}`, { method: 'GET' });
    const result = await response.json();
    if (result.length === 0) result.push({title: 'Not found'});
    const countPages = response.headers.get('X-Pagination-Pages');
    const currentPage = response.headers.get('X-Pagination-Page');

    return {result, countPages, currentPage};
  }

  function addArticlesList (articles) {
    const ul = creatList('article__list');
    const HTMLListArticles = createArticleElement(articles);
    const articlesSection = document.getElementById('articles');
    articlesSection.append(ul);
    ul.innerHTML = HTMLListArticles;
  }

  function createPaginationList (pageCount, currentPage) {
    const ul = creatList('pagination__list');
    let maxPaginationPage = +currentPage + 5;
    let minPaginationPage = +currentPage - 4;
    if (maxPaginationPage > pageCount) {
      maxPaginationPage = pageCount;
    };
    if (minPaginationPage < 5) {
      minPaginationPage = 1;
    }
    for (let i = minPaginationPage; i <= maxPaginationPage; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      li.classList.add('item', 'pagination__item');
      if (i === +currentPage) li.classList.add('pagination__item_accent');
      a.classList.add('link', 'pagination__link');
      a.href = `index.html?page=${i}`;
      a.textContent = i;
      li.append(a);
      ul.append(li);
    }
    return ul;
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const response = await getArticles(new URLSearchParams(window.location.search).get('page'));
    addArticlesList(response.result);
    document.getElementById('pagination').append(createPaginationList(response.countPages, response.currentPage));
  });

})();
