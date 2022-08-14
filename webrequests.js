const { get, put, post } = require("got");

const titles = [
  "Brown eggs",
  "Sweet fresh stawberry",
  "Asparagus",
  "Green smoothie",
  "Raw legums",
  "Baking cake",
  "Pesto with basil",
  "Hazelnut in black ceramic bowl",
  "Fresh stawberry",
  "Lemon and salt",
  "Homemade bread",
  "Legums",
  "Fresh tomato",
  "Healthy breakfast",
  "Green beans",
  "Baked stuffed portabello mushrooms",
  "Strawberry jelly",
  "Pears juice",
  "Fresh pears",
  "Caprese salad",
  "Oranges",
  "Vegan food",
  "Breakfast with muesli",
  "Honey",
  "Breakfast with cottage",
  "Strawberry smoothie",
  "Strawberry and mint",
  "Ricotta",
  "Cuban sandwiche",
  "Granola",
  "Smoothie with chia seeds",
  "Yogurt",
  "Sandwich with salad",
  "Cherry",
  "Raw asparagus",
  "Corn",
  "Vegan",
  "Fresh blueberries",
  "Smashed avocado",
  "Italian ciabatta",
  "Rustic breakfast",
  "Sliced lemons",
  "Plums",
  "French fries",
  "Strawberries",
  "Ground beef meat burger",
  "Tomatoes",
  "Basil",
  "Fruits bouquet",
  "Peaches on branch",
];
const addresses = [
  "aardvark@the.zoo",
  "crocodile@the.zoo",
  "elephant@the.zoo",
  "emu@the.zoo",
  "hippopotamus@the.zoo",
  "llama@the.zoo",
  "octopus@the.zoo",
  "otter@the.zoo",
  "panda@the.zoo",
  "pangolin@the.zoo",
  "tortoise@the.zoo",
  "walrus@the.zoo",
];
const method = ["get"];

async function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

(async () => {
  while (true) {
    var type = Math.floor(Math.random() * method.length);
    var title = Math.floor(Math.random() * titles.length);
    var address = Math.floor(Math.random() * addresses.length);
    var sleeping = Math.floor(Math.random() * 9) + 1;

    switch (method[type]) {
      case "get":
        try {
          const response = await get(
            "http://localhost:2080/?search=" + titles[title],
            {
              headers: {
                from: addresses[address],
              },
            }
          ).json();
          console.log(response);
        } catch (error) {
          console.log(error);
        }
        break; // end case 'get'
      // case "put":
      //   try {
      //     const response = await put("http://localhost:2080/", {
      //       headers: {
      //         from: addresses[email],
      //       },
      //     }).json();
      //     console.log(response.body);
      //   } catch (error) {
      //     console.log(error.response.body);
      //   }
      //   break; // end case 'put'
      // case "post":
      //   try {
      //     const { data } = await post("http://localhost:2080/", {
      //       headers: {
      //         from: addresses[email],
      //       },
      //     }).json();
      //     console.log(data);
      //   } catch (error) {
      //     console.log(error.response.body);
      //   }
      //   break; // end case 'post'
    } // end switch on method
    await sleep(sleeping * 1000);
  }
})();
