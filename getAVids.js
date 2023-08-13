const cheerio = require("cheerio");

async function getAVids(dmmCid) {
  //   let dmmCid = "1stars00805";
  let result = await fetch(
    `https://www.dmm.co.jp/service/-/html5_player/=/cid=${dmmCid}/mtype=AhRVShI_/service=mono/floor=dvd/mode=/`
  );
  const $ = cheerio.load(await result.text());
  let myTest = $("script").text();
  const regex = /const args = (\{.*\});/;
  const match = myTest.match(regex);
  if (match && match[1]) {
    const argsJSON = match[1];
    // Parse the JSON object
    const args = JSON.parse(argsJSON);
    const { cid, title, src, poster, bitrates } = args;
    return { cid, title, src, poster, bitrates };
  }
  /* This is from the USERSCRIPT */
  /*
    const scriptContent = $("script").html();
    console.log(scriptContent);
    //Very hacky... Didn't find a way to parse the HTML with JS.
    for (let script of $("script")) {
      if (script.innerText != null && script.innerText.includes(".mp4")) {
        for (let line of script.innerText.split("\n")) {
          if (line.includes(".mp4")) {
            line = line.substring(line.indexOf("{"), line.lastIndexOf(";"));
            let videoSrc = JSON.parse(line).src;
            if (!videoSrc.startsWith("http")) {
              videoSrc = "http:" + videoSrc;
            }
            console.log(videoSrc);
            return videoSrc;
          }
        }
      }
    }
  */
}
getAVids();
