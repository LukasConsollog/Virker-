const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

const path = require("path");
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Endpoint to handle review submission
const juices = [
  {
    name: "Green Mile",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac08913829503ae845ee9/be837da8-e437-11ed-9380-421ee64ebd4f_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0lzbhnzkyzgeyltc4zwqtngy1mi1hnju2lwflzthkyza4ytc1nc9kt0vziedyzwvuie1pbgutediuanbn.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
  {
    name: "Joes Identity",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac0a21bfa52937bedc542/bea5e050-e437-11ed-b273-9e2c81d52131_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0l2m1ntc5m2zmlwrlndktngfhns1hzmy1ltu4yje4owzkmtgxyy9kt0vzielkzw50axr5lxgylmpwzw__.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
  {
    name: "Energizer",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac0a21bfa52937bedc542/beaca80e-e437-11ed-b273-9e2c81d52131_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0lzc1mjm5mgezlwu1nditngi2os1iytywltgwm2exytlkmzc5ns9fbmvyz2l6zxitediuanbn.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
  {
    name: "Go Away Doc",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac0a21bfa52937bedc542/bea828a6-e437-11ed-b273-9e2c81d52131_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0lzc5yjk5owmylta5zjatndq4os1imwy0ltg1zty2mzc5mwvmmi9hbybbd2f5iervyy14mi5qcgc_.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
  {
    name: "Green Tonic",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac0a21bfa52937bedc542/bea94754-e437-11ed-b273-9e2c81d52131_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0lzdjoti0mgrklwu5ymytndg1oc1iytuzlwe1mdrlzgzkngizoc9hcmvlbibub25pyy14mi5qcgc_.jpeg?w=600",
    price: "60Kr",
    reviews: [
      {
        username: "username",
        juiceName: "Green Tonic",
        stars: 5,
        review: "Hej",
      },
    ],
  },
  {
    name: "Hell of a nerve",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac08913829503ae845ee9/be91a0ae-e437-11ed-9380-421ee64ebd4f_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0l2njotk3mzrkltvkmdctndawys05zme1ltayyte0ndk2odbimi9izwxsie9mieegtmvydmutediuanbn.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
  {
    name: "Iron Man",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac0a21bfa52937bedc542/beb1404e-e437-11ed-b273-9e2c81d52131_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0l2uxymuzodcxltfkmjktngzlzi1hzgu2lwm3ytexzdg5yjuyoc9jcm9uie1hbi14mi5qcgc_.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
  {
    name: "Joes AMG",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac08913829503ae845ee9/be8f5844-e437-11ed-9380-421ee64ebd4f_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0l2y4nme2njezlwy0ngqtndu2zi1iotq2ltg0zwflytg1nwjhzi9kt0vziefnry14mi5qcgc_.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
  {
    name: "Pick me up",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac0a21bfa52937bedc542/beaeed26-e437-11ed-b273-9e2c81d52131_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0lzfkmduxodyzlwvmm2etnge3mc1iyzfhlwrlzta0nmu4otg4mi9qawnrie1lifvwlxgylmpwzw__.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
  {
    name: "Prince of Green",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac08913829503ae845ee9/be8adc1a-e437-11ed-9380-421ee64ebd4f_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0lzc5yjhmzddhltbhn2itngjizs1imtm1lwvmnmu1ztm1yzrmnc9qcmluy2ugb2ygr3jlzw4tediuanbn.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
  {
    name: "Sports Juice",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac0a21bfa52937bedc542/beab92ca-e437-11ed-b273-9e2c81d52131_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0l2u0yzc4ote1lwzmndktndu5zs1howvhlti4n2zhythmmgyxmi9tcg9ydhmgsnvpy2utediuanbn.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
  {
    name: "Stress Down",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac08913829503ae845ee9/be95594c-e437-11ed-9380-421ee64ebd4f_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0lzzjzmewmme4lwi1yzgtngrkys04ytbhltq5zgzhoduzzwrmys9tdhjlc3mgrg93bi14mi5qcgc_.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
  {
    name: "Green Shield",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac08913829503ae845ee9/be8492ce-e437-11ed-9380-421ee64ebd4f_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0l2e1odnlndy0lwmyzdctngm1zc04ndc3ltc0mjizzwmwytnkny9hcmvlbibtagllbgqtediuanbn.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
  {
    name: "Herb Tonic",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac0a21bfa52937bedc542/bea70e80-e437-11ed-b273-9e2c81d52131_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0l2m0nzdmzwe5ltjjntutndyzoc04ngewlty1mzmwnjhingjkzs9izxjiifrvbmljlxgylmpwzw__.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
  {
    name: "Power Shake",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac0a21bfa52937bedc542/beb36c0c-e437-11ed-b273-9e2c81d52131_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0l2myndmznwy1lwziotatngm1yi04ywuwlty4ndvhmjg2mtfiys9qb3dlcibtagfrzs14mi5qcgc_.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
];
app.post("/submitreview", (req, res) => {
  const { username, juiceName, stars, review } = req.body;
  console.log("Received review submission:", {
    username,
    juiceName,
    stars,
    review,
  });
  // Find the corresponding juice by name
  const juice = juices.find((juice) => juice.name === juiceName);

  if (!juice) {
    return res.status(404).json({ error: "Juice not found" });
  }

  // Add the review to the juice object
  juice.reviews.push({
    username,
    stars,
    review,
  });

  res.json({ message: "Review submitted successfully" });
});
app.get("/getjuices", (req, res) => {
  res.json({ juices });
});
app.use(express.static(path.join(__dirname, "../client")));

// Handle requests for the root URL
app.get("*", (req, res) => {
  console.log(
    "Serving HTML file at:",
    path.join(__dirname, "../client/pages/home.html")
  );
  res.sendFile("pages/home.html", { root: path.join(__dirname, "../client") });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
