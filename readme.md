# Koacola
Koacola is a lightweight [Koa@2](https://github.com/koajs/koa) RESTful API boilerplate. Backend is provided by [Mongo](https://github.com/mongodb/mongo) using the [Mongoose](https://github.com/Automattic/mongoose) ODM.

## Database Connection
Database settings and connection string can be modified per environment (development/testing/production) in their respective `/config/*` files:

```js
db: {
		data: 'koacola',
		host: 'localhost',
		port: '27017',
		user: '',
		pass:	'',
	},
```

## Flexiable routing
New routes can be easily added to the API by copying the template provided in `/config/routeTemplate` and placing it in the `api` directory. e.g.

```bash
cd server
cp -R config/routeTemplate api/<newRoute>
```
Route names should be pluralised, e.g: *bonobos*, not *bonobo* or *fish*, not *fish*! The `api-loader` will handle the renaming so everything is consistent with Mongoose's treatment of collections.

No additional configuration is needed, other than modifying the route's schema in `api/<newRoute>/model.js`.

The default template will give you the basic CRUD operations:
- Create One
-	Read One
- Read All
- Update One
- Delete One

## Full version release history

### v2.0.0
- Users and Auth routes are now required.
- Routes are protected with JSON web tokens.
- Basic user support email, password (hashed with bcrypt).

### v1.0.0
This version offers the most flexibility, there is no security on the routes, but routes are completely independent and optional.
Checkout this version as a starting point for simple API sandboxing.