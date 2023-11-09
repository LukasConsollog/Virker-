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
    reviews: [],
  },
  {
    name: "Hell of a nerve",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac0a21bfa52937bedc542/be8f5844-e437-11ed-9380-421ee64ebd4f_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0l2y4nme2njezlwy0ngqtndu2zi1iotq2ltg0zwflytg1nwjhzi9kt0vziefnry14mi5qcgc_.jpeg?w=600",
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
      "https://imageproxy.wolt.com/menu/menu-images/624ac08913829503ae845ee9/be8adc1a-e437-11ed-9380-421ee64ebd4f_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0lzc5yjhmzddhltbhn2itngjizs1imtm1lwvmnmu1ztm1yzrmnc9qcmluy2ugb2ygr3jlzw4tediuanbn.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
  {
    name: "Pick me up",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac0a21bfa52937bedc542/beaeed26-e437-11ed-b273-9e2c81d52131_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0lzfkmduxodyzlwvmm2etnge3mc1iyzfhlwrlzta0nmu4otg4mi9qb3dlcibtagfrzs14mi5qcgc_.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
  {
    name: "Prince of Green",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac08913829503ae845ee9/beb36c0c-e437-11ed-b273-9e2c81d52131_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0l2myndmznwy1lwziotatngm1yi04ywuwlty4ndvhmjg2mtfiys9qb3dlcibtagfrzs14mi5qcgc_.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
  {
    name: "Sports Juice",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac0a21bfa52937bedc542/be95594c-e437-11ed-9380-421ee64ebd4f_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0lzzjzmewmme4lwi1yzgtngrkys04ytbhltq5zgzhoduzzwrmys9tdhjlc3mgrg93bi14mi5qcgc_.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
  {
    name: "Stress Down",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac0a21bfa52937bedc542/bea70e80-e437-11ed-b273-9e2c81d52131_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0l2m0nzdmzwe5ltjjntutndyzoc04ngewlty1mzmwnjhingjkzs9izxjiifrvbmljlxgylmpwzw__.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
  {
    name: "Green Shield",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac0a21bfa52937bedc542/be8492ce-e437-11ed-9380-421ee64ebd4f_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0l2e1odnlndy0lwmyzdctngm1zc04ndc3ltc0mjizzwmwytnkny9hcmvlbibtagllbgqtediuanbn.jpeg?w=600",
    price: "60Kr",
    reviews: [],
  },
  {
    name: "Herb Tonic",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/624ac0a21bfa52937bedc542/bea828a6-e437-11ed-b273-9e2c81d52131_ahr0chm6ly9kztj5exb2bgqwzzdzlmnsb3vkznjvbnqubmv0l2m0nzdmzwe5ltjjntutndyzoc04ngewlty1mzmwnjhingjkzs9izxjiifrvbmljlxgylmpwzw__.jpeg?w=600",
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
module.exports = juices;
