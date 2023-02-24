const dbName = 'ezge';
db = db.getSiblingDB(dbName);

db.createUser(
    {
        user: "admin",
        pwd: "password123",
        roles: [ { role: "readWrite", db: dbName } ]
    }
);

db.createCollection('catalogue');
db.catalogue.createIndex({ POS_ID: 1 }, { unique: true });
