let prevBtn = document.querySelector('.prev_btn')
let nextBtn = document.querySelector('.next_btn')
let slides = document.querySelectorAll('.slides')
let day = document.querySelector('.day')
let hour = document.querySelector('.hour')
let minute = document.querySelector('.minute')
let second = document.querySelector('.second')

let deadline = '2023-07-27T18:16:40Z'
let now = new Date()

function getTimerData(dl){
	let t = Date.parse(new Date(dl)) - Date.parse(new Date()),
			days = Math.floor(t / ( 1000 * 60 * 60 * 24 )),
			hours = Math.floor((t / 1000 / 60 / 60) % 24),
			minutes = Math.floor((t / 1000 / 60 ) % 60),
			seconds = Math.floor((t / 1000) % 60)

	if(t < 0){
		t = 0
		days = 0
		hours = 0
		minutes = 0
		seconds = 0
	}

	return {
		t, days, hours, minutes, seconds
	}
}

function startTimer(dl){
	let daysEl = document.querySelector('.days'),
		hoursEl = document.querySelector('.hours'),
		minutesEl = document.querySelector('.minutes'),
		secondsEl = document.querySelector('.seconds')
		// console.log(daysEl);

	let timerId = setInterval(updateTimer, 1000)
	
	function updateTimer(){
		let timer = getTimerData(dl)

		daysEl.innerText = addZero(timer.days)
		hoursEl.innerText = addZero(timer.hours - 5)
		minutesEl.innerText = addZero(timer.minutes)
		secondsEl.innerText = addZero(timer.seconds)

		if(timer.t < 0){
			clearInterval(timerId)
		}
	}
	if(daysEl.innerText === '00'){
		day.style.display = 'none'
	}
	if (daysEl.innerText === '00' && hoursEl.innerText === '00') {
		hour.style.display = 'none'
	}
	if (daysEl.innerText === '00' && hoursEl.innerText === '00' && minutesEl.innerText === '00') {
		minute.style.display = 'none'
	}
	if (daysEl.innerText === '00' && hoursEl.innerText === '00' && minutesEl.innerText === '00' && secondsEl.innerText === '00') {
		second.style.display = 'none'
	}
	console.log(typeof daysEl.innerText);
	updateTimer()
}

function addZero(num){
	if(num >= 0 && num < 10){
		return `0${num}`
	}else{
		return num
	}
}

startTimer(deadline, 'timer-one')



let slideCount = 0


prevBtn.addEventListener('click', ()=>{
    if(slideCount <= 0){
        slideCount = slides.length - 1
    }else{
        slideCount--
    }
    hideSlide()
    showSlide(slideCount)
})

nextBtn.addEventListener('click', ()=>{
    if(slideCount > slides.length - 2){
        slideCount = 0
    }else{
        slideCount++
    }
    hideSlide()
    showSlide(slideCount)
})

function showSlide(i = 0){
    slides[i].classList.add('active')
}

function hideSlide(){
    slides.forEach(slide => {
        slide.classList.remove('active')
    });
}

hideSlide()
showSlide()


let links = document.querySelectorAll('.links')
let tabContents = document.querySelectorAll('.tab_contents')

function hideTab(){
	tabContents.forEach( e => {
		e.style.display = 'none'
	})

	links.forEach(link => {
		link.classList.remove('active')
	})
}


function showTab(i = 0){
	tabContents[i].style.display = 'block'
	links[i].classList.add('active')
}


links.forEach((tabLink, i) => {
	tabLink.addEventListener('click',() => {
		hideTab()
		showTab(i)
	})
})