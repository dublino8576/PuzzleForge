function difficultyLvl(onChange) {
  /* this callback is triggered when difficulty level changes */
  const difficultyValues = document.querySelectorAll(".difficulty-level");
  difficultyValues.forEach((level) => {
    level.addEventListener("click", function () {
      if (level.checked === true) {
        const valueAttr = level.value;
        if (typeof onChange === "function") {
          onChange(valueAttr);
        }
      }
    });
  });
}

function getRowsCols(valueAttr) {
  if (valueAttr === "easy") {
    return { rows: 3, cols: 3 };
  } else if (valueAttr === "normal") {
    return { rows: 6, cols: 6 };
  } else if (valueAttr === "hard") {
    return { rows: 15, cols: 15 };
  }
  return { rows: 3, cols: 3 };
}

export { difficultyLvl, getRowsCols };
