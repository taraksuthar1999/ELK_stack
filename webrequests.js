const { get, put, post } = require("got");

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

const method = ["get", "put", "post"];

async function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

(async () => {
  while (true) {
    var type = Math.floor(Math.random() * method.length);
    var email = Math.floor(Math.random() * addresses.length);
    var sleeping = Math.floor(Math.random() * 9) + 1;

    switch (method[type]) {
      case "get":
        try {
          const response = await get("http://localhost:2080/", {
            headers: {
              from: addresses[email],
            },
          }).json();
          console.log(response.body);
        } catch (error) {
          console.log(error.response.body);
        }
        break; // end case 'get'
      case "put":
        try {
          const response = await put("http://localhost:2080/", {
            headers: {
              from: addresses[email],
            },
          }).json();
          console.log(response.body);
        } catch (error) {
          console.log(error.response.body);
        }
        break; // end case 'put'
      case "post":
        try {
          const { data } = await post("http://localhost:2080/", {
            headers: {
              from: addresses[email],
            },
          }).json();
          console.log(data);
        } catch (error) {
          console.log(error.response.body);
        }
        break; // end case 'post'
    } // end switch on method
    await sleep(sleeping * 1000);
  }
})();
