const icons = [
  "accessibility",
  "elderly",
  "hotel",
  "moped",
  "accessibility",
  "elderly",
  "hotel",
  "moped",
  "accessibility",
  "elderly",
  "hotel",
  "moped",
  "accessibility",
  "elderly",
  "hotel",
  "moped",
  "accessibility",
  "elderly",
  "hotel",
  "moped",
  "accessibility",
  "elderly",
  "hotel",
  "moped",
  "accessibility",
  "elderly",
  "hotel",
  "moped",
  "accessibility",
  "elderly",
  "hotel",
  "moped",
  "accessibility",
  "elderly",
  "hotel",
  "moped",
  "accessibility",
  "elderly",
  "hotel",
  "moped",
  "accessibility",
  "elderly",
  "hotel",
  "moped",
  "accessibility",
  "elderly",
  "hotel",
  "moped",
  "accessibility",
  "elderly",
  "hotel",
  "moped",
  "accessibility",
  "elderly",
  "hotel",
  "moped",
  "accessibility",
  "elderly",
  "hotel",
  "moped",
  "accessibility",
  "elderly",
  "hotel",
  "moped",
  "accessibility",
  "elderly",
  "hotel",
  "moped",
  "accessibility",
  "elderly",
  "hotel",
  "moped",
];

size = 10;
// size = 20;
page = Math.ceil(icons.length / size);
pagerCount = 5;

let current = 1;

const _content = document.querySelector(".content");

const showContent = () => {
  _content.innerHTML = "";
  icons.forEach((item, index) => {
    if (index >= (current - 1) * size && index < current * size) {
      const li = document.createElement("li");
      li.innerHTML = `
                <i class="material-icons">${item}</i>
                <p>${index + 1}</p>
            `;

      _content.appendChild(li);
    }
  });
};

const _pagination = document.querySelector(".pagination");

const createPagination = function createPagination() {
  showContent();
  let lis = `
    <li class="material-icons page-btn page-btn-prev
    ${current !== 1 ? "isClick" : ""}
    ">

      keyboard_arrow_left
    </li>
  `;

  if (current < 1 || current > page) {
    throw `Error <current> cant be less than 1 or bigger than ${page}}`;
  } else if (pagerCount < 5) {
    throw "pagerCount should be unless 5";
  } else if (page < pagerCount) {
    //if page < pagerCount the ... buttons are not necesary
    console.log("page < pagerCount");
    for (let i = 1; i <= page; i++) {
      lis += `
      <li class="page-number ${i === current ? "active" : ""}">${i}</li>
      `;
    }
  } else {
    // Problema: hay decimal si pagerCount es par
    // let beforeNumber = current - (pagerCount - 3) / 2;
    // let afterNumber = current + (pagerCount - 3) / 2;
    // aproximar hacia abajo

    let beforeNumber = Math.floor(current - (pagerCount - 3) / 2);
    let afterNumber = current + (pagerCount - 3) / 2;

    if (current >= pagerCount - 1) {
      lis += `<li class="page-number">1</li>
        <li class="material-icons page-dot page-dot-prev"></li>`;
    }

    // Problema: si current = 1, beforeNumber es menor a 0
    // Problema: si current = 1, after tiene un elemento de más

    if (current >= 1 && current < pagerCount - 1) {
      beforeNumber = 1;
      afterNumber = pagerCount - 1;
    } else if (current <= page && current > page - (pagerCount - 2)) {
      beforeNumber = page - (pagerCount - 2);
      afterNumber = page;
    }

    for (let i = beforeNumber; i <= afterNumber; i++) {
      lis += `
      <li class="page-number ${i === current ? "active" : ""}">${i}</li>
      `;
    }

    if (current <= page - (pagerCount - 2)) {
      lis += `<li class="material-icons page-dot page-dot-next"></li>
        <li class="page-number">${page}</li>`;
    }
  }

  lis += `
    <li class="material-icons page-btn page-btn-next
    ${current !== page ? "isClick" : ""}
    ">
      keyboard_arrow_right
    </li>
  `;

  _pagination.innerHTML = lis;

  const _pageNumbers = document.querySelectorAll(".page-number");

  _pageNumbers.forEach((element) => {
    element.addEventListener("click", () => {
      current = parseInt(element.innerHTML);
      createPagination();
    });
  });

  const _pageBtnNext = document.querySelector(".page-btn-next");
  _pageBtnNext.addEventListener("click", () => {
    if (current < page) {
      current++;
      createPagination();
    }
  });
  const _pageBtnPrev = document.querySelector(".page-btn-prev");
  _pageBtnPrev.addEventListener("click", () => {
    if (current > 0) {
      current--;
      createPagination();
    }
  });

  const _pageDotPrev = document.querySelector(".page-dot-prev");

  //dot-prev not alway exist
  _pageDotPrev?.addEventListener("click", () => {
    if (current > 0) {
      current -= pagerCount - 2;
      createPagination();
    }
  });

  const _pageDotNext = document.querySelector(".page-dot-next");

  //dot-prev not alway exist
  _pageDotNext?.addEventListener("click", () => {
    if (current > 0) {
      current += pagerCount - 2;
      createPagination();
    }
  });
};
createPagination();
