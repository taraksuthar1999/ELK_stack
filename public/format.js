const fs = require("fs");

class format {
  constructor(path = "./products.json") {
    this.path = path;
  }
  async doformat() {
    try {
      let newP = [];
      const product = JSON.parse(fs.readFileSync(this.path, "utf8"));
      for (let i = 0; i < product.length; i++) {
        // newP.push({ index: {} });
        newP.push(product[i].title);
      }
      fs.writeFileSync("./products-list.json", JSON.stringify(newP));
      console.log(product.length);
    } catch (error) {}
  }
}
new format().doformat();
