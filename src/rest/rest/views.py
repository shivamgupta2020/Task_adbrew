from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
from pymongo import MongoClient
from bson.objectid import ObjectId

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']["test_col"]

class TodoListView(APIView):

    def get(self, request):
        TODO = db.find()
        response = [{'id': str(i['_id']), 'name': i['name']} for i in TODO]
        return Response(data=response, status=status.HTTP_200_OK)

    def post(self, request):
        db.insert_one(request.data)
        return Response({}, status=status.HTTP_201_CREATED)

#look for delete all functionality
    def delete(self, request, task_id=None):
        if task_id:
            try:
                result = db.delete_one({'_id': ObjectId(task_id)})
                if result.deleted_count == 1:
                    return Response({"message": "Task deleted successfully."}, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Task not found."}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({"error": f"Invalid task ID: {e}"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            db.delete_many({})
            return Response({"message": "All tasks deleted."}, status=status.HTTP_200_OK)
