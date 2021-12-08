interface Img360Props {
	$mainContainer: HTMLElement
	$thumbContainer: HTMLElement
	imageArray: string[]
	autoplaySpeed: number
	$buttonPrev: HTMLButtonElement
	$buttonNext: HTMLButtonElement
	$buttonAutoplay: HTMLButtonElement
	$buttonExpand: HTMLButtonElement
	containerWidth: number
}

const dragVelocity = 10

class Img360 {
	$mainContainer: HTMLElement
	$thumbContainer: HTMLElement
	imageArray: string[]
	autoplaySpeed: number
	$buttonPrev: HTMLButtonElement
	$buttonNext: HTMLButtonElement
	$buttonAutoplay: HTMLButtonElement
	$buttonExpand: HTMLButtonElement
	pixelAccumulator: number = 0
	private index: number = 0
	private $imgArray: HTMLImageElement[] = []
	private autoPlayTask: number = 0
	private autoPlayingActive: boolean = false

	constructor(options: Img360Props) {
		this.$mainContainer = options.$mainContainer
		this.$thumbContainer = options.$thumbContainer
		this.imageArray = options.imageArray
		this.autoplaySpeed = options.autoplaySpeed || 200
		this.$buttonPrev = options.$buttonPrev
		this.$buttonNext = options.$buttonNext
		this.$buttonAutoplay = options.$buttonAutoplay
		this.$buttonExpand = options.$buttonExpand

		this.imageArray.forEach((image, index) => {
			const $img = document.createElement('img')
			this.$imgArray.push($img)
			$img.src = image
			if (index != 0) {
				$img.style.display = 'none'
			}
			this.$mainContainer.appendChild($img)
		})

		const $img = document.createElement('img')
		$img.src = this.imageArray[0]
		this.$thumbContainer.appendChild($img)
		this.setButtonsEnvents()
		this.dragTest()
		this.expandImg()
	}

	setButtonsEnvents() {
		this.$buttonPrev.addEventListener('click', () => {
			this.prevImage()
		})
		this.$buttonNext.addEventListener('click', () => {
			this.nextImage()
		})
		this.$buttonAutoplay.addEventListener('click', () => {
			if (this.isAutoPdddlaying()) {
				this.stopAutoplay()
				this.$buttonAutoplay.classList.remove('playing')
			} else {
				this.startAutoplay()
				this.$buttonAutoplay.classList.add('playing')
			}
		})
	}

	isAutoPdddlaying() {
		return this.autoPlayingActive
	}

	startAutoplay() {
		this.autoPlayTask = setInterval(() => {
			this.nextImage()
		}, this.autoplaySpeed)
		this.autoPlayingActive = true
	}

	stopAutoplay() {
		if (this.autoPlayTask != 0) {
			clearInterval(this.autoPlayTask)
			this.autoPlayingActive = false
		}
	}

	prevImage() {
		this.$imgArray[this.index].style.display = 'none'
		if (this.index == 0) {
			this.index = this.imageArray.length - 1
		} else {
			this.index -= 1
		}
		this.$imgArray[this.index].style.display = 'block'
	}

	nextImage() {
		this.$imgArray[this.index].style.display = 'none'
		if (this.index == this.imageArray.length - 1) {
			this.index = 0
		} else {
			this.index += 1
		}
		this.$imgArray[this.index].style.display = 'block'
	}

	rotate(pixels: number) {
		this.pixelAccumulator += pixels

		const numberOfImages = this.imageArray.length
		
		const minPixels = Math.ceil(this.$mainContainer.offsetWidth / numberOfImages)

		if (this.pixelAccumulator >= minPixels) {
			this.nextImage()
			this.pixelAccumulator = 0
		}

		if(this.pixelAccumulator <= -minPixels){
			this.prevImage()
			this.pixelAccumulator = 0
		}
	}

	dragTest() {
		this.$mainContainer.addEventListener('touchstart', handleTouchStart, false)
		this.$mainContainer.addEventListener('touchmove', handleTouchMove, false)
		this.$mainContainer.addEventListener('touchend', handleTouchEnd, false)
		this.$mainContainer.addEventListener('mousedown', handleMousehStart, false)
		this.$mainContainer.addEventListener('mousemove', handleMouseMove, false)
		this.$mainContainer.addEventListener('mouseup', handleMouseUp, false)
		this.$mainContainer.addEventListener('mouseleave', handleMouseUp, false)

		var xDown = 0

		const _this = this

		// @ts-ignore
		function getTouches(evt) {
			return (
				evt.touches || // browser API
				evt.originalEvent.touches 
			) // jQuery
		}

		function handleTouchStart(evt: TouchEvent) {
			evt.stopPropagation()
			const firstTouch = getTouches(evt)[0]
			xDown = firstTouch.clientX
		}

		function handleTouchMove(evt: TouchEvent) {
			if (_this.$mainContainer.offsetWidth == 0) return
			if (!xDown) {
				return
			}

			var xUp = evt.touches[0].clientX
			var xDiff = xDown - xUp
			_this.rotate(xDiff)
			xDown = xUp
		}
		function handleTouchEnd(evt: TouchEvent) {
			xDown = 0
			// _this.$mainContainer.removeEventListener('touchmove', handleTouchMove);
		}
		function handleMousehStart(evt: MouseEvent) {
			evt.stopPropagation()
			xDown = evt.clientX
			// yDown = evt.clientY
		}
		function handleMouseMove(evt: MouseEvent) {
			if (_this.$mainContainer.offsetWidth == 0) return
			if (!xDown) {
				return
			}
			var xUp = evt.clientX
			var xDiff = xDown - xUp
			_this.rotate(xDiff)
			xDown = xUp
		}
		function handleMouseUp(evt: MouseEvent) {
			xDown = 0
			// _this.$mainContainer.removeEventListener('mousemove', handleMouseMove);
		}
	}

	expandImg() {		
		this.$buttonExpand.addEventListener('click', () => {
				this.structureExpand()
		})
	}
	structureExpand() {
		const $body = document.querySelector('body')
		const $clone: any = this.$mainContainer.cloneNode(true)
		$clone.classList.add('clone-video-container')
		const $mainContainerClone = document.createElement('div')
		const $close = document.createElement('div')
		$close.innerHTML = 'X'
		$close.style.position = 'absolute'
		$close.style.top = '0'
		$close.style.right = '0'
		$close.style.padding = '10px'
		$close.style.cursor = 'pointer'
		$close.style.fontSize = '30px'
		$close.style.color = 'white'
		$close.style.backgroundColor = 'black'
		$close.style.zIndex = '9999'
		$close.addEventListener('click', () => {
			$mainContainerClone.remove()
		})
		$mainContainerClone.style.position = 'fixed'
		$mainContainerClone.style.top = '0'
		$mainContainerClone.style.left = '0'
		$mainContainerClone.style.width = '100%'
		$mainContainerClone.style.height = '100%'
		$mainContainerClone.style.zIndex = '9999'
		$mainContainerClone.style.backgroundColor = 'rgba(0,0,0,0.5)'
		$mainContainerClone.style.display = 'flex'
		$mainContainerClone.style.justifyContent = 'center'
		$mainContainerClone.style.alignItems = 'center'
		$clone.style.display = 'flex'
		$clone.style.justifyContent = 'center'
		$clone.style.alignItems = 'center'
		$clone.style.width = '90%'
		$clone.style.height = '90%'
		$clone.style.maxWidth = '90%'
		$clone.style.maxHeight = '90%'
		const imgList = $clone.querySelectorAll('img')
		var imgListscr = []
		imgList.forEach((img: any) => {
			imgListscr.push(img.src)
			img.remove()
		})
		$mainContainerClone.appendChild($clone)
		$mainContainerClone.appendChild($close)
		$body?.insertAdjacentElement('beforeend', $mainContainerClone)
	}
}
