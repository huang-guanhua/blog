import Home from '../pages/home';
import Article from '../pages/article';
import Demo from '../pages/demo';
import About from '../pages/about';

export default {
  mode: 'history',
  base: '/blog/',
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', name: 'home', component: Home},
    {path: '/article', name: 'article', component: Article},
    {path: '/demo', name: 'demo', component: Demo},
    {path: '/about', name: 'about', component: About}
  ]
}