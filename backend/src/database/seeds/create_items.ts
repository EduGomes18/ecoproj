import Knex from "knex";

export async function seed(knex: Knex) {
  return knex("items").insert([
    { title: "Lamps", image: "lamps.svg" },
    { title: "Batteries", image: "batteries.svg" },
    { title: "Pappers", image: "papper.svg" },
    { title: "Electric Scraps", image: "scraps.svg" },
    { title: "Organic Waste", image: "organic.svg" },
    { title: "Oil", image: "oil.svg" },
  ]);
}
