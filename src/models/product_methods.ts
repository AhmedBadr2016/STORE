import Client from "../database";
import { products } from "../types/products";

class product_model {
  // the user model
  // first create item in the database!
  async create(p: products): Promise<products> {
    try {
      // open connection with Client
      const Connection = await Client.connect();
      const sql =
        "INSERT INTO products (name, price) VALUES (($1) , ($2)) RETURNING *";
      // run query
      const output = await Connection.query(sql, [p.name, p.price]);
      // release the connection to database
      Connection.release();
      // retunrn the product
      return output.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create (${p.name}): ${err as Error["message"]}`
      );
    }
  }

  // get all products
  async get_all_products(): Promise<products[]> {
    try {
      // open connection with Client
      const Connection = await Client.connect();
      const sql = "SELECT * FROM products";
      // run query
      const output = await Connection.query(sql);
      // release the connection to database
      Connection.release();
      // retunrn the product
      return output.rows;
    } catch (err) {
      throw new Error(
        `Could not get all the products: ${err as Error["message"]}`
      );
    }
  }

  // get specific product
  async get_specific_product(id: string): Promise<products> {
    try {
      // open connection with Client
      const Connection = await Client.connect();
      const sql = "SELECT * FROM products where id=($1)";
      // run query
      const output = await Connection.query(sql, [id]);
      // release the connection to database
      Connection.release();
      // retunrn the product
      return output.rows[0];
    } catch (err) {
      throw new Error(`Could not get the product : ${err as Error["message"]}`);
    }
  }

  // update products
  async update_product(p: products): Promise<products> {
    try {
      // open connection with Client
      const Connection = await Client.connect();
      const sql =
        "UPDATE products SET name=($2) ,  price=($3) WHERE id=($1) RETURNING *";
      // run query
      const output = await Connection.query(sql, [p.id, p.name, p.price]);
      // release the connection to database
      Connection.release();
      // retunrn the product
      return output.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create (${p.name}): ${err as Error["message"]}`
      );
    }
  }

  //delete product

  async delete(id: string): Promise<products> {
    try {
      const Connection = await Client.connect();

      const sql = "DELETE FROM products WHERE id = ($1) ";

      const output = await Connection.query(sql, [id]);
      const product = output.rows[0];
      Connection.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete the product ${id}. Error: ${err}`);
    }
  }
}
export default product_model;
