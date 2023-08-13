const axios = require("axios");
const cheerio = require("cheerio");

//First BlogJAv
//Second DMM ==> Already DONE, so extract from URL
// JAV321  ==> Direct Request
//JAVTRAILERS  ==> CAN be used to extract DMMCID
async function getAvImageBlogJAV(avid) {
  const blogjavSelector = "h2.entry-title>a";

  const blogJavResponse = await axios("http://blogjav.net/?s=" + avid);
  if (blogJavResponse.status !== 200) {
    console.log("err");
    return;
  }
  const $ = cheerio.load(await blogJavResponse.data);
  let imgUrl; //= $(blogjavSelector).attr("href");
  let imageUrlArr = [];
  $(blogjavSelector).each((i, e) => {
    imageUrlArr.push(e.attribs.href);
  });
  let tempUrl = $(blogjavSelector).attr("href");
  //   console.log(tempUrl);
  if (tempUrl?.search(/FHD|4k/i) > 0) {
    // ? for undefined exception
    imgUrl = tempUrl;
  }

  if (!imgUrl) {
    console.log("No Regular URL found");
    imgUrl = imageUrlArr.filter((element) => element.match(/fhd/i)).shift();
  } else {
    imgUrl = $(blogjavSelector).attr("href"); //gets the first element whatever it is
  }

  if (!imgUrl) {
    console.log("No URL found");
    return;
  }
  console.log("Image:", imgUrl);

  const pixHostResponse = await axios({
    url: imgUrl,
    headers: {
      referrer: "http://pixhost.to/",
    },
  });
  const $$ = cheerio.load(await pixHostResponse.data);
  var img_src_arr =
    /<img .*data-lazy-src="https:\/\/.*pixhost.to\/thumbs\/.*>/.exec($$.html());
  let img_src;
  let thumbnail;
  let smol_thumbnail;
  let dmmcid;
  if (img_src_arr) {
    img_src = $$(img_src_arr[0])
      .attr("data-lazy-src")
      .replace("thumbs", "images")
      .replace("//t", "//img")
      .replace('"', "");
    console.log(img_src);
  }

  var thumbnail_src_arr =
    /<img .*data-lazy-src="https:\/\/.*dmm.co.jp\/.*>/.exec($$.html());
  //console.log(thumbnail_src_arr);
  if (thumbnail_src_arr) {
    thumbnail = $$(thumbnail_src_arr[0]).attr("data-lazy-src").replace('"', "");
    smol_thumbnail = thumbnail.replace("pl", "ps");
    console.log(thumbnail, smol_thumbnail);
    dmmcid = thumbnail.split("/adult/").pop().split("/").shift();
    thumbnail.includes("/adult/")
      ? (dmmcid = thumbnail.split("/adult/").pop().split("/").shift())
      : (dmmcid = thumbnail.split("/video/").pop().split("/").shift());
  }
  return { dmmcid, thumbnail, smol_thumbnail, img_src };

  // const regex = /^[a-zA-Z]+00\d{1,5}$/;

  // const isValid = regex.test(dmmcid);
  // console.log(isValid);
}
//
// getAvImageBlogJAV("PPPD-999");
module.exports = { getAvImageBlogJAV };
