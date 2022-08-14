const { Client } = require("@elastic/elasticsearch");
const fs = require("fs");
class Elastic {
  constructor(index, mapping) {
    this.client = new Client({
      node: "http://localhost:9200",
    });
    this.index = index;
    this.mapping = mapping;
  }
  async createIndexAndMapping() {
    try {
      await this.client.indices.create({
        index: this.index,
      });
      return this.client.indices.putMapping({
        index: this.index,
        body: this.mapping,
      });
    } catch (error) {
      throw error;
    }
  }
  async addIntoIndex(oData) {
    try {
      return await this.client.index({
        index: this.index,
        body: oData,
      });
    } catch (error) {
      throw error;
    }
  }
  async bulkIndex(aData) {
    const operations = aData.flatMap((doc) => [
      { index: { _index: this.index } },
      doc,
    ]);
    return await this.client.bulk({ refresh: true, operations });
  }
  async search(query) {
    const result = await this.client.search({
      index: this.index,
      query: {
        multi_match: {
          query: query,
          fields: ["title"],
        },
      },
    });
    return result;
  }
}

class Product extends Elastic {
  constructor(index, mapping) {
    super(index, mapping);
  }
  async init() {
    await this.createIndexAndMapping();
  }
}
const mapping = {
  dynamic: false, // to apply strict mapping and restrict unwanted fields
  properties: {
    title: { type: "text" },
    description: { type: "text" },
    filename: { type: "text" },
    height: { type: "integer" },
    width: { type: "integer" },
    price: { type: "float" },
    rating: { type: "integer" },
  },
};
// (async () => {
//   console.log("started");
//   const products = JSON.parse(
//     fs.readFileSync("./public/products.json", "utf8")
//   );
//   const product = new Product("product", mapping);
//   await product.init();
//   await product.bulkIndex(products);
// })();

module.exports = new Product("product", mapping);
