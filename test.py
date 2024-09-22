from pymongo import MongoClient

client = MongoClient('mongodb+srv://syed:12345@cluster0.7zqac.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['mydatabase']  # Replace 'mydatabase' with your database name
collection = db['mycollection']  #
data={'name':"hello"}
def create_item(data):    
    # Insert into MongoDB
    inserted_id = collection.insert_one(data)
    return ({"message": "Item inserted"})

print(create_item(data))