import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";

export default class Contenedor {
  constructor() {
    this.products = [];
    this.#generate();
  }

  #generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        title: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        thumbnail: "not image",
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(obj) {
    const object = {
      id: uuidv4(),
      ...obj,
      isBlock: faker.datatype.boolean(),
    };
    console.log(`The object has been created ${JSON.stringify(object)}`);
    this.products = [...this.products, object];
    return object;
  }
  async getById(id) {
    const item = this.products.find((obj) => obj.id === id);

    if (!item) {
      console.log(`The object with ${id} does not exist`);
      return;
    }
    console.log(item);
  }
  async getAll() {
    return this.products;
  }

  async deleteById(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) return console.error("The element does not exit");
    this.products.splice(index, 1);
  }
  async deleteAll() {
    this.products = [];
    return this.products;
  }

  async randomProduct() {
    const randomIndex = Math.floor(
      Math.random() * (this.products.length - 1 + 1) + 1
    );

    return this.products[randomIndex];
  }

  async update(id, data) {
    const index = this.products.findIndex((product) => product.id === id);
    if (id === -1) throw new Error(`The producto id # ${id} does not exits`);

    this.products[index] = {
      id,
      ...data,
      ...this.products[index],
    };
    return this.products[index];
  }
  async findOne(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (id === -1) throw new Error(`The producto id # ${id} does not exits`);

    return this.products[index];
  }
}
