const artist = document.querySelector("#artist");
const song = document.querySelector("#song");
const btn = document.querySelector("button");
const main = document.querySelector("main");
const inputWords = document.querySelector("#additionalWords");

const url = `https://lyric-finder-application.herokuapp.com`;

btn.addEventListener("click", async (e) => {
  e.preventDefault();

  const artistVal = artist.value;
  const songVal = song.value;
  const inputWordsVal = inputWords.value;

  if (artistVal === "" || songVal === "") return;

  main.innerText = "Loading...";
  const data = await fetch(`${url}/${artistVal}/${songVal}`)
    .then((res) => res.json())
    .then((obj) => obj.data);


  var status = "Clean"; 
  var additionalWordsList = inputWordsVal.split(" ");
  var wordsToSearch = "Seven Dirty Words";
  var wordList;

  if (additionalWordsList[0] !== "") {
    for (var word of additionalWordsList) {
      wordsToSearch += ", " + word;
    }
  }

  // if (wordsToSearch === "sevenDirtyWords") {
    wordList = ['shit', 'piss', 'fuck', 'cunt', 'cocksucker', 'motherfucker', 'tits']
  // }

  for (var word of additionalWordsList) {
    wordList.push(word);
  }

  var contains = [];
  var containsString = "";

  for (var word of wordList) {
    if (data.toUpperCase().match(word.toUpperCase()) && word != '') {
      contains.push(word);
      // break;
    }
  }

    if (contains.length !== 0) {
      status = "Explicit";
      containsString = "This song contains the following words: ";
      for (var word of contains) {
        if (contains.indexOf(word) == 0) {
          containsString += word
        } else {
          containsString += ", " + word
        }
    }

    }

  main.innerText = data === "" ? "Not Found :(" : 
  "Song is " + status + ".\n" + 
  "You are searching for the following words: " + wordsToSearch + "\n" +
  containsString + "\n\n" +
  "Full lyrics:\n\n" + data
   ;

})



;
