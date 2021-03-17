'use script';
(() => {
  //- Selectors

  const header = document.querySelector('.header');
  const headerContent = document.querySelector('.header-content');
  const gallery = document.querySelector('.gallery-container');
  const categoryTitle = document.querySelector('.gallery-title');
  const searchBtn = document.querySelectorAll('.btn-search');
  const searchInput = document.querySelectorAll('.search-input');
  const trendMenuLinks = document.querySelector('.trend-menu-cont');
  const quickMenu = document.querySelector('.quick-menu');

  ///////////////////////
  //- Start status

  (() => {
    //- Random BackgroundImage
    headerContent.style.opacity = 1;

    //- CopyRights
    header.insertAdjacentHTML(
      'beforeend',
      `
      <footer class= 'cp-text copy-right'>
        <p class="text-copy-right">
          © Copyright by
          <a class="author" href="https://www.linkedin.com/in/dina-elorbany/">Dina Elorbany</a>
        .</p>
      </footer>
    `
    );
  })();

  ////////////////////////////
  //- Default category

  window.onload = e => {
    console.log('page is fully loaded');
    loadImg(
      e,
      `https://api.unsplash.com/search/photos?page=1&query=editorial&per_page=15&client_id=UoNW5J-srZfaZw5vcLT6fw89Del1nicrzcV67NEPUpg`
    );
  };

  ////////////////////////////////
  //- Remove old results

  const removeResults = () => {
    gallery.innerHTML = '';
    categoryTitle.textContent = '';
  };

  ////////////////////////
  //- Empty Input box

  const emptyInput = input => {
    input.value = '';
    input.blur();
  };

  /////////////////////////////
  //- Loading Images function

  const loadImg = async (e, url) => {
    e.preventDefault();
    removeResults();

    try {
      const requist = await fetch(url);
      const response = await requist.json();
      const images = response.results;

      if (!requist.ok)
        throw new Error(`Problem loading image: ${response.status}`);

      displayImgs(images);
      return images;
    } catch (error) {
      console.error(`💥Error: ${error.message} 💥`);
    }
  };

  ////////////////////////////////
  //- Display Images in html

  const displayImgs = imgs => {
    imgs.map(img => {
      const url = img['urls']['full'];

      gallery.insertAdjacentHTML(
        'afterbegin',
        `
        <div class="col-lg-4 col-md-6 col-sm-12 my-2 px-2">
          <img src="${url}" class="img">
          <div class="like-top-right">
          <a class="fa fa-heart"></a>
          </div>
        </div>
      `
        // onclick="myFunction(this)"
      );
    });
  };

  ///////////////////////////
  //- Smooth Scroll to Gallery

  const smoothScroll = () => {
    gallery.style.height = '65vh';
    gallery.scrollIntoView({ behavior: 'smooth' });

    window.scroll({
      top: 2500,
      left: 0,
      behavior: 'smooth',
    });
  };

  ////////////////////////////
  //- Handling Enter-Key

  document.addEventListener(
    'keydown',
    e => e.key === 'Enter' && getInputValue(e, searchInput)
  );

  //- Handling Search-Button-Click
  searchBtn.forEach(btn =>
    btn.addEventListener('click', e => getInputValue(e, searchInput))
  );

  ////////////////////////////////
  //- Get User Input Value Entered

  const getInputValue = (e, searchIn) => {
    searchIn.forEach(input => {
      if (input.value.length > 0) {
        loadImg(
          e,
          `https://api.unsplash.com/search/photos?page=1&query=${input.value}&per_page=15&client_id=UoNW5J-srZfaZw5vcLT6fw89Del1nicrzcV67NEPUpg`
        );
        //- Category Title
        categoryTitle.textContent = `${input.value.toUpperCase()}`;
      }
      smoothScroll();

      //- Empty Input
      emptyInput(input);
    });
  };

  //////////////////////////////
  //- Handling Hover Events on Images

  gallery.onmouseover = e => {
    const target = e.target;
    if (!target.classList.contains('img')) return;
    target.classList.add('img-overlay');
    // document
    //   .querySelectorAll('.like-top-right')
    //   .forEach(like => like.removeAttribute('style'));
  };
  gallery.onmouseout = e => {
    const target = e.target;
    if (!target.classList.contains('img')) return;
    target.classList.remove('img-overlay');
  };

  //////////////////////////////
  //- Trending Menu

  trendMenuLinks.addEventListener('click', e => {
    e.preventDefault();

    const categoryLink = e.target.innerHTML.replace(', ', '');

    loadImg(
      e,
      `https://api.unsplash.com/search/photos?page=1&query=${categoryLink}&per_page=15&client_id=UoNW5J-srZfaZw5vcLT6fw89Del1nicrzcV67NEPUpg`
    );
    //- Category Title
    categoryTitle.textContent = `${categoryLink.toUpperCase()}`;
    smoothScroll();
  });

  ///////////////////////////////////////
  //- Quick Menu
  quickMenu.addEventListener('click', e => {
    e.preventDefault();
    const categoryName = e.target.innerHTML;
    const categoryLink = e.target.getAttribute('href');

    if (!categoryLink) return;

    loadImg(
      e,
      `https://api.unsplash.com/search/photos?page=1&query=${categoryName.replace(
        '&amp; ',
        ''
      )}&per_page=15&client_id=UoNW5J-srZfaZw5vcLT6fw89Del1nicrzcV67NEPUpg`
    );

    categoryTitle.textContent = `${categoryName
      .replace('&amp;', '&')
      .toUpperCase()}`;

    smoothScroll();
  });

  ///////////////////////////////
  //- Handling Scroll Event

  //-
})();
