from pymongo import MongoClient
from config import DBURL
import certifi
ca = certifi.where()
client = MongoClient(DBURL, tlsCAFile=ca)
db = client.Mallenge