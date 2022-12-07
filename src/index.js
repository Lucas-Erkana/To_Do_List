import _ from 'lodash';
import printMe from './print.js';
import './style.css';

 function component() {
   const element = document.createElement('div');
   const btn = document.createElement('button');

   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
   element.classList.add('hello');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(btn);

   return element;
 }

 document.body.appendChild(component());