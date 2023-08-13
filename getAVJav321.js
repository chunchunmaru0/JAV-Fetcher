// https://en.jav321.com/search

const axios = require("axios");
const cheerio = require("cheerio");
const { stringify } = require("querystring");

async function getJav321() {
  let data = {
    sn: "STARS-805",
  };
  //   console.log(data);
  //   console.log(stringify(data));

  let config = {
    method: "post",
    url: "https://en.jav321.com/search",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    const dmmcid = response.request.path.split("/video/").pop(); //It was in the URL
    const $ = cheerio.load(await response.data);
    // console.log($(".img-responsive").attr("href"));
    const allImageSrc = [];
    $(".img-responsive").each((i, e) => {
      //   console.log(e.attribs.src.search(/805/i));
      e.attribs.src.includes(dmmcid) ? allImageSrc.push(e.attribs.src) : null;
    });

    let smol_thumbnail = allImageSrc.at(0);
    let thumbnail = allImageSrc.at(1);
    let album = allImageSrc.slice(2);
    let img_src = null;
    console.log({ dmmcid, thumbnail, smol_thumbnail, img_src, album });
  } catch (error) {
    console.log(error);
  }
}
getJav321();
