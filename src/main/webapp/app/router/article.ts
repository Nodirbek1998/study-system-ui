
const Article = () => import('@/article/article.vue');
// prettier-ignore
const ArticleUpdate = () => import('@/article/create/article-update.vue');
// prettier-ignore
const ArticleDetails = () => import('@/article/view/article-details.vue');

export default [

  {
    path: 'articles/',
    name: 'Article',
    component: Article,
  },
  {
    path: 'articles/new',
    name: 'ArticleCreate',
    component: ArticleUpdate,
  },
  {
    path: 'articles/:articleId/edit',
    name: 'ArticleEdit',
    component: ArticleUpdate,
  },
  {
    path: 'articles/:articleId/view',
    name: 'ArticleView',
    component: ArticleDetails,
  },
]
