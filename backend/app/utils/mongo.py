from bson import ObjectId


def serialize_mongo(data):
    """
    Convert MongoDB ObjectIds into strings.
    Supports both single documents and lists.
    """

    if data is None:
        return None

    if isinstance(data, list):
        return [serialize_mongo(item) for item in data]

    if isinstance(data, dict):
        document = data.copy()

        if "_id" in document:
            document["id"] = str(document["_id"])
            del document["_id"]

        for key, value in document.items():
            if isinstance(value, ObjectId):
                document[key] = str(value)

        return document

    return data