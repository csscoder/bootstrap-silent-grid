const fs = require('fs');
const sass = require('node-sass');
const autoprefixer = require('autoprefixer')({ browsers: ['> 2%', 'IE 10', 'iOS >= 7'], cascade: false });
const postcss = require('postcss');
import test from 'ava';


// Help functions
// ******************************************
function getCSS(data) {
  return sass.renderSync({
    data: data,
    includePaths: ['./source/scss'],
    outputStyle: 'expanded'
  }).css.toString('utf8');
}


// check column css render
// ******************************************
test('Check columns render', t => {
  let scss = fs.readFileSync('./test/col/style.scss').toString();
  let successCSS = fs.readFileSync('./test/col/style.css').toString();
  let resultCss = getCSS(scss);
  let returnCSS = new Promise((resolve, reject) => {
    postcss([autoprefixer])
      .process(resultCss, { from: 'undefined', to: 'undefined' })
      .then(function (result) {
        resolve(result.css);
      });
  });
  return returnCSS.then(result => {
    t.is(result, successCSS);
  });
});


// check mediaqueries
// ******************************************
test('Check Media Queries', t => {
  let scss = fs.readFileSync('./test/mediaQuery/style.scss').toString();
  let successCSS = fs.readFileSync('./test/mediaQuery/style.css').toString();
  let resultCss = getCSS(scss);
  let returnCSS = new Promise((resolve, reject) => {
    postcss([autoprefixer])
      .process(resultCss, { from: 'undefined', to: 'undefined' })
      .then(function (result) {
        resolve(result.css);
      });
  });
  return returnCSS.then(result => {
    t.is(result, successCSS);
  });
});


// // check container
// // ******************************************
test('Check Container render', t => {
  let scss = fs.readFileSync('./test/container/style.scss').toString();
  let successCSS = fs.readFileSync('./test/container/style.css').toString();
  let resultCss = getCSS(scss);
  let returnCSS = new Promise((resolve, reject) => {
    postcss([autoprefixer])
      .process(resultCss, { from: 'undefined', to: 'undefined' })
      .then(function (result) {
        resolve(result.css);
      });
  });
  return returnCSS.then(result => {
    t.is(result, successCSS);
  });
});



// check order
// ******************************************
test('Check Order', t => {
  let scss = fs.readFileSync('./test/order/style.scss').toString();
  let successCSS = fs.readFileSync('./test/order/style.css').toString();
  let resultCss = getCSS(scss);
  let returnCSS = new Promise((resolve, reject) => {
    postcss([autoprefixer])
      .process(resultCss, { from: 'undefined', to: 'undefined' })
      .then(function (result) {
        resolve(result.css);
      });
  });
  return returnCSS.then(result => {
    t.is(result, successCSS);
  });
});


// check offset
// ******************************************
test('Check Offset', t => {
  let scss = fs.readFileSync('./test/offset/style.scss').toString();
  let successCSS = fs.readFileSync('./test/offset/style.css').toString();
  let resultCss = getCSS(scss);
  let returnCSS = new Promise((resolve, reject) => {
    postcss([autoprefixer])
      .process(resultCss, { from: 'undefined', to: 'undefined' })
      .then(function (result) {
        resolve(result.css);
      });
  });
  return returnCSS.then(result => {
    t.is(result, successCSS);
  });
});


// check offset
// ******************************************
test('Check display', t => {
  let scss = fs.readFileSync('./test/display/style.scss').toString();
  let successCSS = fs.readFileSync('./test/display/style.css').toString();
  let resultCss = getCSS(scss);
  let returnCSS = new Promise((resolve, reject) => {
    postcss([autoprefixer])
      .process(resultCss, { from: 'undefined', to: 'undefined' })
      .then(function (result) {
        resolve(result.css);
      });
  });
  return returnCSS.then(result => {
    t.is(result, successCSS);
  });
});
