from django.http import HttpResponseServerError
from django.contrib.auth.models import User
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from vmapi.models import Assignment


class AssignmentView(ViewSet):
    """Assignment view set"""


    def create(self, request):
        """Handle POST requests for assignments

        Returns:
            Response: JSON serialized representation of newly created assignment
        """

        # Create an assignment object and assign it property values
        assignment = Assignment()
        assignment.user = request.auth.user
        assignment.name = request.data['name']
        assignment.save()

        serialized = AssignmentSerializer(assignment, many=False)

        return Response(serialized.data, status=status.HTTP_201_CREATED)
    

    def list(self, request):
        """Handle GET requests for all items

        Returns:
            Response -- JSON serialized array
        """
        # Get query string parameter
        owner_only = self.request.query_params.get("owner", None)

        try:
            # Start with all rows
            assignments = Assignment.objects.all()

            # If `?owner=current` is in the URL
            if owner_only is not None and owner_only == "current":
                # Filter to only the current user's assignments
                assignments = assignments.filter(user=request.auth.user)

            serializer = AssignmentSerializer(assignments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as ex:
            return HttpResponseServerError(ex)
        

class AssignmentUserSerializer(serializers.ModelSerializer):

    class Meta: 
        model = User
        fields = ( 'first_name', 'last_name')

class AssignmentSerializer(serializers.ModelSerializer):
    """JSON serializer"""

    user = AssignmentUserSerializer(many=False)

    class Meta:
        model = Assignment
        fields = ( 'id', 'name', 'user' )
