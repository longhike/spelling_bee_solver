const startSection = document.getElementById("start-section");
const loadingSection = document.getElementById("loading-section");
const resultSection = document.getElementById("result-section");
const resultTableBody = document.getElementById("result-table-body");
const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  setLoading();
  const data = new FormData(searchForm);
  const reqBody = {
    requiredLetter: data.get("requiredLetter").trim().toUpperCase(),
    otherLetters: data.get("otherLetters").trim().toUpperCase(),
  };
  const result = await fetch("/api/solve", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
  const response = await result.json();
  setResult(response);
  searchForm.reset();
});

function setLoading() {
  resultSection.style.display = "none";
  loadingSection.style.display = "block";
}

function setResult(result) {
  resultTableBody.innerHTML = "";
  if (result.length <= 0) {
    const noResult = document.createElement("h4");
    noResult.textContent = "No results!";
    resultTableBody.appendChild(noResult);
  } else {
    let i = 0;
    while (i < result.length) {
      const row = document.createElement("tr");
      for (let j = 0; j < 5; j++) {
        const col = document.createElement("td");
        col.textContent = result[i];
        row.appendChild(col);
        i++;
      }
      resultTableBody.appendChild(row);
    }
  }

  loadingSection.style.display = "none";
  resultSection.style.display = "block";
}
