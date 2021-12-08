const Produto = {
  init: function () {
    Produto.slickImages();
    Produto.setImg360();
  },

  slickImages: () => {
    const config = {
      thumbParent: ".product__thumbs-list",
      principalParent: ".product__images-list",
    };

    Produto.ProductImagesSlick(config);
  },

  ProductImagesSlick: ({ principalParent, thumbParent }) => {
    $(principalParent).slick({
      lazyLoad: "ondemand",
      slidesToShow: 1,
      slidesToShow: 1,
      arrows: false,
      infinite: false,
      dots: false,
      asNavFor: thumbParent,
    });

    $(thumbParent).slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      lazyLoad: "ondemand",
      arrows: true,
      dots: false,
      infinite: false,
      asNavFor: principalParent,
      vertical: true,
      focusOnSelect: true,
    });
  },

  setImg360: function () {
    const imageArray = [
      "./images/Filename_01.jpg",
      "./images/Filename_02.jpg",
      "./images/Filename_03.jpg",
      "./images/Filename_04.jpg",
      "./images/Filename_05.jpg",
      "./images/Filename_06.jpg",
      "./images/Filename_07.jpg",
      "./images/Filename_08.jpg",
      "./images/Filename_09.jpg",
      "./images/Filename_10.jpg",
      "./images/Filename_11.jpg",
      "./images/Filename_12.jpg",
      "./images/Filename_13.jpg",
      "./images/Filename_14.jpg",
      "./images/Filename_15.jpg",
      "./images/Filename_16.jpg",
      "./images/Filename_17.jpg",
      "./images/Filename_18.jpg",
      "./images/Filename_19.jpg",
      "./images/Filename_20.jpg",
      "./images/Filename_21.jpg",
      "./images/Filename_22.jpg",
      "./images/Filename_23.jpg",
      "./images/Filename_24.jpg",
      "./images/Filename_25.jpg",
      "./images/Filename_26.jpg",
      "./images/Filename_27.jpg",
      "./images/Filename_28.jpg",
      "./images/Filename_29.jpg",
      "./images/Filename_30.jpg",
      "./images/Filename_31.jpg",
      "./images/Filename_32.jpg",
      "./images/Filename_33.jpg",
      "./images/Filename_34.jpg",
      "./images/Filename_35.jpg",
      "./images/Filename_36.jpg",
    ];

    const $mainContainer = document.querySelector(".video-container");
    const $buttonPrev = document.querySelector(".controlls .prev");
    const $buttonNext = document.querySelector(".controlls .next");
    const $buttonAutoplay = document.querySelector(".controlls .autoplay");
		const $thumbContainer = document.querySelector('.product__slide-thumb.video')
    const $buttonExpand = document.querySelector(".controlls .expand");

    const img360 = new Img360({
      $mainContainer,
      imageArray,
      autoplaySpeed: 100,
      $buttonPrev,
      $buttonNext,
      $buttonAutoplay,
			$thumbContainer,
      $buttonExpand
    });
  },
};

Produto.init();
