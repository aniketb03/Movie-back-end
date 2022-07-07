
























05 / 07 / 2022
/* For Limit command*/
db.order.find({}, { _id: 0, name: 1, rating: 1 }).sort({ rating: -1 }).limit(2)

/* For Skip Command */
db.order.find({}, { _id: 0, name: 1, rating: 1 }).limit(2).skip(2)

/* Aggregation (Summary) Command*/
db.order.insertMany(
    [
        { _id: 0, productName: "Steel beam", status: "new", quantity: 10 },
        { _id: 1, productName: "Steel beam", status: "urgent", quantity: 20 },
        { _id: 2, productName: "Steel beam", status: "urgent", quantity: 30 },
        { _id: 3, productName: "Iron rod", status: "new", quantity: 15 },
        { _id: 4, productName: "Iron rod", status: "urgent", quantity: 50 },
        { _id: 5, productName: "Iron rod", status: "urgent", quantity: 10 }
    ])

    // SQL QUERY
    SELECT productName as Id, SUM(quantity) as totalUrgentQuantity
    WHERE status = "urgent"
    Group by productName;


db.order.aggregate([
    { $match: { status: "urgent" } }
])

/* For Alias Name and Sum */
db.order.aggregate([
    { $match: { status: "urgent" } },
    { $group: { _id: "$productName", totalUrgentQuantity: { $sum: "$quantity" } } }
]);




