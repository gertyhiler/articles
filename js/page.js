(() => {
  function createHeader(title) {
    return HTMLHeader = `
      <header class="container header">
        <h1 class="headline">
          ${title}
        </h1>
      </header>
    `;
  }

  function createTextArticleSection(text) {
    return HTMLSectionText = `
      <section class="container article">
        <p class="text article__text">${text}</p>
      </section>
    `;
  }

  function creatCommentContainer() {
    const section = document.createElement('section');
    const container = document.createElement('div');
    const commentHeadline = document.createElement('h2');
    commentHeadline.innerText = 'Commetns:'
    commentHeadline.classList.add('headline', 'comment__headline')
    section.classList.add('container', 'comment');
    section.append(commentHeadline, container)
    return { container, section };
  }

  function createComments(comments) {
    let result = '';
    comments.forEach((comment) => {
      const HTMLComment = `
        <div class="comment-wrapper">
          <h2 class="headline name">${comment.name}</h2>
          <p class="text mail">${comment.email}</p>
          <p class="text comment__text">${comment.body}</p>
        </div>
      `;
      result += HTMLComment;
    });
    return result;
  }

  async function getCommentsArticle(idArticle) {
    const response = await fetch(`https://gorest.co.in/public/v2/posts/${idArticle}/comments`, { method: 'GET' });
    const result = await response.json();
    return result;
  }

  async function getArticle(idArticle) {
    const response = await fetch(`https://gorest.co.in/public/v2/posts/${idArticle}`, { method: 'GET' });
    const result = await response.json();
    return result;
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const id = new URLSearchParams(window.location.search).get('article');
    const article = await getArticle(id);
    const comments = await getCommentsArticle(id);
    const commentContainer = creatCommentContainer();

    document.body.innerHTML = createHeader(article.title) + createTextArticleSection(article.body);
    document.body.append(commentContainer.section);

    commentContainer.container.innerHTML = createComments(comments);
  });
})();
