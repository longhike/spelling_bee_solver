document.addEventListener("click", async (e) => {
  if (e.target.className === "word") {
    const def = await getDef(e.target.textContent);
    if (def["response"]) {
      alert("couldn't find that one, try googling!");
    } else {
      alert(makeDefinitionString(def));
    }
  }
});

function makeDefinitionString(def) {
  let resStr = "";
  def.def.forEach((d) => {
    let curStr = "part of speech: " + d.partOfSpeech + "\n";
    d.definitions.forEach((def) => {
      curStr += def + "\n";
    });
    resStr += curStr + "\n";
  });
  return resStr;
}

async function getDef(word) {
  try {
    const response = await fetch("/api/define?word=" + word.toLowerCase());
    const def = await response.json();
    return def;
  } catch (err) {
    alert("something went wrong... sorry!");
  }
}

function setLoading() {
  resultSection.style.display = "none";
  loadingSection.style.display = "block";
}

function unsetLoading() {
  loadingSection.style.display = "none";
  resultSection.style.display = "block";
}

function populateTable(result) {
    let i = 0;
    while (i < result.length) {
      const row = document.createElement("tr");
      for (let j = 0; j < 5; j++) {
        if (i < result.length) {
            const col = document.createElement("td");
            col.setAttribute("class", "word");
            col.textContent = result[i];
            row.appendChild(col);
            i++;
        }
      }
      resultTableBody.appendChild(row);
    }
}

function emptyResultTable() {
  resultTableBody.innerHTML = "";
  requiredLetterHead.innerHTML = "";
  otherLettersHead.innerHTML = "";
}
