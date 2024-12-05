// import test from './images/test.png'
// console.log(test)
// const img = new Image()
// img.src = test
// document.body.appendChild(img)

//使用响应式图片
import responsiveImg from './images/test.png?sizes[]=300,sizes[]=600,sizes[]=1024'
console.log(responsiveImg)
const img = new Image()
img.srcset = responsiveImg.srcSet
img.sizes = '(min-width: 1024px) 1024px, 100vw'  //视口宽度大于或等于 1024 像素时，浏览器将会使用宽度为 1024 像素的图像 小于 1024 像素时，图像将会使用 100% 的视口宽度（即全屏宽度）进行显示。
document.body.appendChild(img)