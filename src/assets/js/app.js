import Swiper, { Pagination, Navigation } from 'swiper'
import gsap from 'gsap'
import { reviews } from './data'
import imagesLoaded from 'imagesloaded'
import Scrollbar, { ScrollbarPlugin } from 'smooth-scrollbar';

const bar = document.querySelector('.loading__bar--inner')
const counter_num = document.querySelector('.loading__counter--number')
let c = 0
let barInterval = setInterval(() => {
  bar.style.width = c + '%'
  counter_num.innerText = c + '%'
  c++
  if (c === 101) {
    clearInterval(barInterval)
    gsap.to('.loading__bar', {
      duration: 5,
      rotate: '90deg',
      left: '1000%'
    })
    gsap.to('.loading__text,.loading__counter', {
      duration: 0.5,
      opacity: 0
    })
    gsap.to('.loading__box', {
      duration: 1,
      height: '500px',
      borderRadius: '50%'
    })
    gsap.to('.loading__svg', {
      duration: 10,
      opacity: 1,
      rotate: '360deg'
    })
    gsap.to('.loading__box', {
      delay: 2,
      duration: 1,
      border: 'none'
    })
    imagesLoaded(document.querySelectorAll('img'), () => {
      gsap.to('.loading', {
        delay: 2,
        duration: 2,
        zIndex: 1,
        background: 'transparent',
        opacity: 0.5
      })
      gsap.to('.loading__svg', {
        delay: 2,
        duration: 100,
        rotate: '360deg'
      })
      gsap.to('header', {
        duration: 1,
        delay: 2,
        top: '0'
      })
      gsap.to('.socials', {
        duration: 1,
        delay: 2.5,
        bottom: '10rem'
      })
      gsap.to('.scrollDown', {
        duration: 1,
        delay: 3,
        bottom: '3rem'
      })
      let options = {
        // alwaysShowTracks: true
        dumping: 5
      }
      let pageSmoothScroll = Scrollbar.init(document.body, options)
    })
  }
}, 10)

Swiper.use([Pagination, Navigation])
var swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  breakpoints: {
    850: {
      slidesPerView: 2
    },
    1400: {
      slidesPerView: 3
    },
    1900: {
      slidesPerView: 4
    }
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
})

console.log(reviews)

const swiper_container = document.querySelector('.swiper-wrapper')

reviews.map((review) => {
  let templete = `
  <div class="swiper-slide">
    <div class="review">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,8.35a3.07,3.07,0,0,0-3.54.53,3,3,0,0,0,0,4.24L11.29,16a1,1,0,0,0,1.42,0l2.83-2.83a3,3,0,0,0,0-4.24A3.07,3.07,0,0,0,12,8.35Zm2.12,3.36L12,13.83,9.88,11.71a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0,1,1,0,0,0,1.42,0,1,1,0,0,1,1.41,0A1,1,0,0,1,14.12,11.71ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Z"></path></svg>
      <div class="review__card">
        <div class="review__topborder"></div>
        <div class="review__text">
          <span> </span>
          <span>${review.review}</span>
        </div>
        <img src="${review.images}" alt="" class="review__img">
        <div class="review__profile">
          <span>${review.name}</span>
          <span>${review.position}</span>
        </div>
      </div>
    </div>
  </div>
  `
  swiper_container.innerHTML += templete
})

const questions = [...document.querySelectorAll('.question')]
console.log(questions)
questions.map((question) => {
  let q_text = question.querySelector('h3')
  q_text.addEventListener('click', () => {
    questions
      .filter((q) => q !== question)
      .map((q) => q.classList.remove('open'))
    question.classList.toggle('open')
  })
})
