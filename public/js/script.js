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

document.addEventListener("click", async (e) => {
  if (e.target.className === "word") {
    const check = e.target.id.toLowerCase()
    const def = await getDef(check);
    if (def["response"]) {
      alert("couldn't find that one, try googling!");
    } else {
      alert(makeDefinitionString(def));
    }
  }
});

function setResult(response) {
  const { result, required, others } = response;
  emptyResultTable();
  if (result.length <= 0) {
    const noResult = document.createElement("h4");
    noResult.textContent = "No results!";
    resultTableBody.appendChild(noResult);
  } else {
    populateTable(result)
  }
  requiredLetterHead.textContent = required;
  otherLettersHead.textContent = others;

  unsetLoading();
}


