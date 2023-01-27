import Client from "../database";
import { orders } from "../types/orders";

class order_model {
  async create(o: orders): Promise<orders> {
    try {
      // open connection with Client
      const Connection = await Client.connect();
      const sql =
        "INSERT INTO orders (status , user_id) VALUES ( ($1) , ($2) ) RETURNING *";
      // run query
      const output = await Connection.query(sql, [o.status, o.user_id]);

      const order = output.rows[0];
      // release the connection to database
      Connection.release();
      // retunrn the order
      return order;
    } catch (err) {
      throw new Error(
        `Could not create (${o.status}) for user (${o.user_id}): ${
          err as Error["message"]
        }`
      );
    }
  }

  // get all orders
  async get_all_orders(): Promise<orders[]> {
    try {
      // open connection with Client
      const Connection = await Client.connect();
      const sql = "SELECT * FROM orders";
      // run query
      const output = await Connection.query(sql);
      // release the connection to database
      Connection.release();
      // retunrn the order
      return output.rows;
    } catch (err) {
      throw new Error(
        `Could not get all the orders: ${err as Error["message"]}`
      );
    }
  }

  // get specific order
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get_specific_order(id: string): Promise<orders> {
    try {
      // open connection with Client
      const Connection = await Client.connect();
      const sql = "SELECT * FROM orders where id=($1)";
      // run query
      const output = await Connection.query(sql, [id]);
      // release the connection to database
      Connection.release();
      // retunrn the order
      return output.rows[0];
    } catch (err) {
      throw new Error(
        `Could not get all the orders: ${err as Error["message"]}`
      );
    }
  }

  // update orders
  async update_order(o: orders): Promise<orders> {
    try {
      // open connection with Client
      const Connection = await Client.connect();
      const sql = "UPDATE orders SET status=($2) WHERE id=($1) RETURNING *";
      // run query
      const output = await Connection.query(sql, [o.id, o.status]);
      // release the connection to database
      Connection.release();
      // retunrn the order
      return output.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create (${o.status}): ${err as Error["message"]}`
      );
    }
  }

  //delete order

  async delete(id: string): Promise<orders> {
    try {
      const Connection = await Client.connect();

      const sql = "DELETE FROM orders WHERE id= ($1) ";

      const output = await Connection.query(sql, [id]);
      const order = output.rows[0];
      Connection.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete the order ${id}. Error: ${err}`);
    }
  }
}
export default order_model;
