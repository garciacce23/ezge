const dbName = 'ezge';
db = db.getSiblingDB("ezge");

db.createUser(
    {
        user: "admin",
        pwd: "password123",
        roles: [ { role: "readWrite", db: "ezge" } ]
    }
);

db.createCollection('catalogue');
db.catalogue.createIndex({ POS_ID: 1 }, { unique: true });

db.createCollection('roster');
db.roster.createIndex({ studentId: 1 }, { unique: true });