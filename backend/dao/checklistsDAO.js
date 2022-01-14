import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let checklists

export default class checklistsDAO {
    static async injectDB(conn) {
        if (checklists) { return; }
        try { checklists = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants"); }
        catch (e) { console.error(`Unable to establish a collection handle in checklistsDAO: ${e}`); }
    }

    static async getChecklists({ filters = null, page = 0, checklistsPerPage = 20 } = {}) {
        let query
        if (filters) {
            if ("name" in filters) { query = { $text: { $search: filters["name"] } } }
            else if ("cuisine" in filters) { query = { "cuisine": { $eq: filters["cuisine"] } } }
            else if ("zipcode" in filters) { query = { "address.zipcode": { $eq: filters["zipcode"] } } }
        }

        let cursor

        try { cursor = await checklists.find(query); }
        catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { checklistsList: [], totalNumChecklists: 0 };
        }

        const displayCursor = cursor.limit(checklistsPerPage).skip(checklistsPerPage * page);

        try {
            const checklistsList = await displayCursor.toArray();
            const totalNumChecklists = await checklists.countDocuments(query);
            return { checklistsList, totalNumChecklists };
        }
        catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
            return { checklistsList: [], totalNumChecklists: 0 };
        }
    }
    static async getChecklistByID(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
                {
                    $lookup: {
                        from: "reviews",
                        let: {
                            id: "$_id",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$restaurant_id", "$$id"],
                                    },
                                },
                            },
                            {
                                $sort: {
                                    date: -1,
                                },
                            },
                        ],
                        as: "reviews",
                    },
                },
                {
                    $addFields: {
                        reviews: "$reviews",
                    },
                },
            ]
            return await checklists.aggregate(pipeline).next();
        } catch (e) {
            console.error(`Something went wrong in getChecklistsByID: ${e}`);
            throw e;
        }
    }

    static async getCuisines() {
        let cuisines = []
        try {
            cuisines = await checklists.distinct("cuisine");
            return cuisines;
        } catch (e) {
            console.error(`Unable to get cuisines, ${e}`);
            return cuisines;
        }
    }
}


