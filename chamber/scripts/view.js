const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");
const directory = document.querySelector("#directory");

gridBtn.addEventListener("click", () => {
    directory.classList.add("grid");
    directory.classList.remove("list");
});

listBtn.addEventListener("click", () => {
    directory.classList.add("list");
    directory.classList.remove("grid");
});
