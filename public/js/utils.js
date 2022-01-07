function makeDefinitionString(defObj) {
  let resStr = "";
  defObj.def.forEach((d) => {
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

function populate(i, result) {
  const len = result.length;
  if (i < len) {
    setTimeout(() => {
      const holder = document.createElement("div");
      holder.setAttribute("class", "word");
      holder.setAttribute("id", result[i]);
      holder.textContent = result[i];
      resultTableBody.appendChild(holder);
      populate(++i, result);
    }, 10);
  }
}

function populateTable(result) {
  populate(0, result);
}

function emptyResultTable() {
  resultTableBody.innerHTML = "";
  requiredLetterHead.innerHTML = "";
  otherLettersHead.innerHTML = "";
}
