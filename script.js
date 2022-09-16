let books = [
  {
    id: "1",
    title: `Apple. Эволюция компьютера`,
    author: `Владимир Невзоров`,
    img: `https://bukva.ua/img/products/449/449532_200.jpg`,
    plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
  },
  {
    id: "2",
    title: `Как объяснить ребенку информатику`,
    author: `Кэрол Вордерман`,
    img: `https://bukva.ua/img/products/480/480030_200.jpg`,
    plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
    оставаясь в безопасности. 
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
    объясняются наглядно с помощью иллюстраций и схем.`,
  },
  {
    id: "3",
    title: `Путь скрам-мастера. #ScrumMasterWay`,
    author: `Зузана Шохова`,
    img: `https://bukva.ua/img/products/480/480090_200.jpg`,
    plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
    какими инструментами ему нужно пользоваться.`,
  },
];

const refRoot = document.querySelector("#root");

const divLeft = document.createElement("div");
divLeft.classList.add("div--left");

const divRight = document.createElement("div");
divRight.classList.add("div--right");

refRoot.append(divLeft, divRight);

const h1Header = document.createElement("h1");
h1Header.textContent = "Library";

const ulList = document.createElement("ul");
ulList.classList.add("list");
const buttonAdd = document.createElement("button");
buttonAdd.textContent = "add";
buttonAdd.classList.add("button--add");

divLeft.append(h1Header, ulList, buttonAdd);

function renderList() {
  const arrayList = books.map((book) => {
    return `<li class="list__item" data-id="${book.id}">
                <p class="title">${book.title}</p>
                <button class="button--def edit">edit</button>
                <button class="button--def delete">delete</button>
            </li>`;
  });
  // ulList.addEventListener('click', renderPreview);
  ulList.innerHTML = "";

  ulList.insertAdjacentHTML("beforeend", arrayList.join(""));

  ulList.querySelectorAll(".delete").forEach((el) => {
    el.addEventListener("click", deleteBook);
  });

  ulList.querySelectorAll(".title").forEach((el) => {
    el.addEventListener("click", renderPreview);
  });
}

renderList();

function renderPreview(evt) {
  const result = books.find(
    (book) => book.id === evt.target.parentNode.dataset.id
  );
  const newBook = createPreviewMarkup(result);
  divRight.innerHTML = newBook;
  // console.log(result);
}

function createPreviewMarkup(book) {
  const divNew = `
    <div data-id="${book.id}">
        <h2>${book.title}</h2>
        <p>${book.author}</p>
        <img src="${book.img}">
        <p>${book.plot}</p>
    </div>                
    `;
  return divNew;
}

function deleteBook(book) {
  const idBook = book.target.parentNode.dataset.id;
  books = books.filter((el) => el.id !== idBook);
  renderList();
  const refDivRight = divRight.querySelector(`[data-id="${idBook}"]`);
  if (refDivRight) {
    refDivRight.innerHTML = "";
  }
}

buttonAdd.addEventListener("click", addBook);

//form label input(4) - button "save";

function createFormMarkup() {
  const newForm = `
    <form>
      <label>
        <input name="title" type="text" />
      </label>
      <label>
        <input name="author" type="text" />
      </label>
      <label>
        <input name="img" type="text" />
      </label>
      <label">
        <input name="plot" type="text" />
      </label>
      <button class="save" type="submit">Save</button>
    </form>
    `;
  return newForm;
}

function addBook() {
  const newBook = {
    id: String(Date.now()),
    title: "",
    author: "",
    img: "",
    plot: "",
  };
  //   console.log(newBook.id);
  divRight.innerHTML = createFormMarkup();
  fillBook(newBook);
  const refSave = divRight.querySelector(".save");
  refSave.addEventListener("click", (evt) => {
    evt.preventDefault();
    console.log(newBook);
  });
}

function fillBook(book) {
  const refInputs = divRight.querySelectorAll("input");
  refInputs.forEach((el) => {
    el.addEventListener("change", changeHandler);
  });

  function changeHandler({ target }) {
    book[target.name] = target.value;
  }
}
