"use strict";
var dragVelocity = 10;
var Img360 = /** @class */ (function () {
    function Img360(options) {
        var _this_1 = this;
        this.pixelAccumulator = 0;
        this.index = 0;
        this.$imgArray = [];
        this.autoPlayTask = 0;
        this.autoPlayingActive = false;
        this.$mainContainer = options.$mainContainer;
        this.$thumbContainer = options.$thumbContainer;
        this.imageArray = options.imageArray;
        this.autoplaySpeed = options.autoplaySpeed || 200;
        this.$buttonPrev = options.$buttonPrev;
        this.$buttonNext = options.$buttonNext;
        this.$buttonAutoplay = options.$buttonAutoplay;
        this.$buttonExpand = options.$buttonExpand;
        this.imageArray.forEach(function (image, index) {
            var $img = document.createElement('img');
            _this_1.$imgArray.push($img);
            $img.src = image;
            if (index != 0) {
                $img.style.display = 'none';
            }
            _this_1.$mainContainer.appendChild($img);
        });
        var $img = document.createElement('img');
        $img.src = this.imageArray[0];
        this.$thumbContainer.appendChild($img);
        this.setButtonsEnvents();
        this.dragTest();
        this.expandImg();
    }
    Img360.prototype.setButtonsEnvents = function () {
        var _this_1 = this;
        this.$buttonPrev.addEventListener('click', function () {
            _this_1.prevImage();
        });
        this.$buttonNext.addEventListener('click', function () {
            _this_1.nextImage();
        });
        this.$buttonAutoplay.addEventListener('click', function () {
            if (_this_1.isAutoPdddlaying()) {
                _this_1.stopAutoplay();
                _this_1.$buttonAutoplay.classList.remove('playing');
            }
            else {
                _this_1.startAutoplay();
                _this_1.$buttonAutoplay.classList.add('playing');
            }
        });
    };
    Img360.prototype.isAutoPdddlaying = function () {
        return this.autoPlayingActive;
    };
    Img360.prototype.startAutoplay = function () {
        var _this_1 = this;
        this.autoPlayTask = setInterval(function () {
            _this_1.nextImage();
        }, this.autoplaySpeed);
        this.autoPlayingActive = true;
    };
    Img360.prototype.stopAutoplay = function () {
        if (this.autoPlayTask != 0) {
            clearInterval(this.autoPlayTask);
            this.autoPlayingActive = false;
        }
    };
    Img360.prototype.prevImage = function () {
        this.$imgArray[this.index].style.display = 'none';
        if (this.index == 0) {
            this.index = this.imageArray.length - 1;
        }
        else {
            this.index -= 1;
        }
        this.$imgArray[this.index].style.display = 'block';
    };
    Img360.prototype.nextImage = function () {
        this.$imgArray[this.index].style.display = 'none';
        if (this.index == this.imageArray.length - 1) {
            this.index = 0;
        }
        else {
            this.index += 1;
        }
        this.$imgArray[this.index].style.display = 'block';
    };
    Img360.prototype.rotate = function (pixels) {
        this.pixelAccumulator += pixels;
        var numberOfImages = this.imageArray.length;
        var minPixels = Math.ceil(this.$mainContainer.offsetWidth / numberOfImages);
        if (this.pixelAccumulator >= minPixels) {
            this.nextImage();
            this.pixelAccumulator = 0;
        }
        if (this.pixelAccumulator <= -minPixels) {
            this.prevImage();
            this.pixelAccumulator = 0;
        }
    };
    Img360.prototype.dragTest = function () {
        this.$mainContainer.addEventListener('touchstart', handleTouchStart, false);
        this.$mainContainer.addEventListener('touchmove', handleTouchMove, false);
        this.$mainContainer.addEventListener('touchend', handleTouchEnd, false);
        this.$mainContainer.addEventListener('mousedown', handleMousehStart, false);
        this.$mainContainer.addEventListener('mousemove', handleMouseMove, false);
        this.$mainContainer.addEventListener('mouseup', handleMouseUp, false);
        this.$mainContainer.addEventListener('mouseleave', handleMouseUp, false);
        var xDown = 0;
        var _this = this;
        // @ts-ignore
        function getTouches(evt) {
            return (evt.touches || // browser API
                evt.originalEvent.touches); // jQuery
        }
        function handleTouchStart(evt) {
            evt.stopPropagation();
            var firstTouch = getTouches(evt)[0];
            xDown = firstTouch.clientX;
        }
        function handleTouchMove(evt) {
            if (_this.$mainContainer.offsetWidth == 0)
                return;
            if (!xDown) {
                return;
            }
            var xUp = evt.touches[0].clientX;
            var xDiff = xDown - xUp;
            _this.rotate(xDiff);
            xDown = xUp;
        }
        function handleTouchEnd(evt) {
            xDown = 0;
            // _this.$mainContainer.removeEventListener('touchmove', handleTouchMove);
        }
        function handleMousehStart(evt) {
            evt.stopPropagation();
            xDown = evt.clientX;
            // yDown = evt.clientY
        }
        function handleMouseMove(evt) {
            if (_this.$mainContainer.offsetWidth == 0)
                return;
            if (!xDown) {
                return;
            }
            var xUp = evt.clientX;
            var xDiff = xDown - xUp;
            _this.rotate(xDiff);
            xDown = xUp;
        }
        function handleMouseUp(evt) {
            xDown = 0;
            // _this.$mainContainer.removeEventListener('mousemove', handleMouseMove);
        }
    };
    Img360.prototype.expandImg = function () {
        var _this_1 = this;
        this.$buttonExpand.addEventListener('click', function () {
            _this_1.structureExpand();
        });
    };
    Img360.prototype.structureExpand = function () {
        var $body = document.querySelector('body');
        var $clone = this.$mainContainer.cloneNode(true);
        $clone.classList.add('clone-video-container');
        var $mainContainerClone = document.createElement('div');
        var $close = document.createElement('div');
        $close.innerHTML = 'X';
        $close.style.position = 'absolute';
        $close.style.top = '0';
        $close.style.right = '0';
        $close.style.padding = '10px';
        $close.style.cursor = 'pointer';
        $close.style.fontSize = '30px';
        $close.style.color = 'white';
        $close.style.backgroundColor = 'black';
        $close.style.zIndex = '9999';
        $close.addEventListener('click', function () {
            $mainContainerClone.remove();
        });
        $mainContainerClone.style.position = 'fixed';
        $mainContainerClone.style.top = '0';
        $mainContainerClone.style.left = '0';
        $mainContainerClone.style.width = '100%';
        $mainContainerClone.style.height = '100%';
        $mainContainerClone.style.zIndex = '9999';
        $mainContainerClone.style.backgroundColor = 'rgba(0,0,0,0.5)';
        $mainContainerClone.style.display = 'flex';
        $mainContainerClone.style.justifyContent = 'center';
        $mainContainerClone.style.alignItems = 'center';
        $clone.style.display = 'flex';
        $clone.style.justifyContent = 'center';
        $clone.style.alignItems = 'center';
        $clone.style.width = '90%';
        $clone.style.height = '90%';
        $clone.style.maxWidth = '90%';
        $clone.style.maxHeight = '90%';
        var imgList = $clone.querySelectorAll('img');
        var imgListscr = [];
        imgList.forEach(function (img) {
            imgListscr.push(img.src);
            img.remove();
        });
        $mainContainerClone.appendChild($clone);
        $mainContainerClone.appendChild($close);
        $body === null || $body === void 0 ? void 0 : $body.insertAdjacentElement('beforeend', $mainContainerClone);
    };
    return Img360;
}());
