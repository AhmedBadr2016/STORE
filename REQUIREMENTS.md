## API Endpoints

#### Authentication

- authenticate (/user/sign_in) POST
  body: {email,password}

#### Products

- Index (/products) GET [Required Token]
- Show (/products/:id) GET [Required Token]
- Create (/product/create) POST [Required Token]
  body: {name, price} [Required Token]

#### Users

- create (/user/sign_up) POST
  body: {first_name, last_name, email, username, password}
- authenticate user in database and get token (/user/sign_up) POST
  body: {email, password}
- Current order by user(/user/sign_in/order) POST [Required Token]
  body: {email, password, status}

#### Orders

- Create (/user/sign_in/order) POST [token required]
  body: {status,user_id}
- Set status (/user/sign_in/order/edit/:id) PATCH [token required]
  body: {email, password,status,user_id}
- Add product (/user/sign_in/order/:id/products) POST [token required]
  body: {email, password, status,order_id,product_id,quantity}
- Show all products belong to specific order (/order_product/:id) GET [token required]
  body: {email, password, status,order_id,product_id,quantity}

## Data Shapes

#### Products

- id
- name
- price

#### User

- id
- first_name
- last_name
- email
- username
- password

#### Orders

- id
- user_id
- status of order (active or complete)

#### order products

- id
- product id
- order id
- quantity of product

## data schema

#### User

                                                       Table "public.users"

Column | Type | Collation | Nullable | Default
------------+------------------------+-----------+----------+-----------------------------------
id | integer | | not null | nextval('users_id_seq'::regclass)
first_name | character varying(100) | | not null |
last_name | character varying(100) | | not null |
email | character varying(255) | | not null |
username | character varying(100) | | not null |
password | character varying(100) | | not null |
Indexes:
"users_pkey" PRIMARY KEY, btree (id)
"users_email_key" UNIQUE CONSTRAINT, btree (email)
Referenced by:
TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

#### Orders

                            Table "public.orders"

Column | Type | Collation | Nullable | Default
---------+--------------+-----------+----------+------------------------------------
id | integer | | not null | nextval('orders_id_seq'::regclass)
status | order_status | | not null |
user_id | integer | | not null |
Indexes:
"orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
"orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)

#### Products

                                 Table "public.products"

Column | Type | Collation | Nullable | Default
--------+------------------------+-----------+----------+--------------------------------------
id | integer | | not null | nextval('products_id_seq'::regclass)
name | character varying(100) | | not null |
price | integer | | not null |
Indexes:
"products_pkey" PRIMARY KEY, btree (id)
Referenced by:
TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

#### order products

                           Table "public.order_products"

Column | Type | Collation | Nullable | Default
------------+---------+-----------+----------+--------------------------------------------
id | integer | | not null | nextval('order_products_id_seq'::regclass)
quantity | integer | | not null |
order_id | integer | | not null |
product_id | integer | | not null |
Indexes:
"order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
"order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
"order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
