from django.http import HttpResponseServerError
from django.contrib.auth.models import User
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from vmapi.models import Volunteer, Status


class VolunteerView(ViewSet):
    """Volunteer view set"""


    def create(self, request):
        """Handle POST requests for volunteer

        Returns:
            Response: JSON serialized representation of newly created volunteer
        """
        # Get an object instance of a volunteer status 
        chosen_status = Status.objects.get(pk=request.data['status_id'])

        # Create an volunteer object and assign it property values
        volunteer = Volunteer()
        volunteer.user = request.auth.user
        volunteer.status = chosen_status
        volunteer.full_name = request.data['full_name']
        volunteer.phone = request.data['phone']
        volunteer.email = request.data['email']
        volunteer.save()

        serialized = VolunteerSerializer(volunteer, many=False)

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
            volunteers = Volunteer.objects.all()

            # If `?owner=current` is in the URL
            if owner_only is not None and owner_only == "current":
                # Filter to only the current user's assignments
                volunteers = volunteers.filter(user=request.auth.user)

            serializer = VolunteerSerializer(volunteers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as ex:
            return HttpResponseServerError(ex)
    
    def retrieve(self, request, pk=None):
        """Handle GET requests for single item

        Returns:
            Response -- JSON serialized instance
        """
        try:
            volunteer = Volunteer.objects.get(pk=pk)
            serializer = VolunteerSerializer(volunteer)
            return Response(serializer.data)
        
        except Exception as ex:
            return Response({"reason": ex.args[0]}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        """Handle PUT requests

        Returns:
            Response -- Empty body with 204 status code
        """
        try:
            volunteer = Volunteer.objects.get(pk=pk)
            volunteer.status = Status.objects.get(pk=request.data["status_id"])
            volunteer.save()
        except Volunteer.DoesNotExist:
            return Response(None, status=status.HTTP_404_NOT_FOUND)

        except Exception as ex:
            return HttpResponseServerError(ex)

        return Response(None, status=status.HTTP_204_NO_CONTENT)
       

class VolunteerUserSerializer(serializers.ModelSerializer):

    class Meta: 
        model = User
        fields = ( 'first_name', 'last_name' )

class VolunteerSerializer(serializers.ModelSerializer):
    """JSON serializer"""

    user = VolunteerUserSerializer(many=False)

    class Meta:
        model = Volunteer
        fields = ('id', 'user', 'status_id', 'full_name', 'phone', 'email')
