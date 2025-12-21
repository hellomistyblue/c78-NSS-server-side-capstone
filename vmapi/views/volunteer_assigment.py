from django.db import IntegrityError
from django.http import HttpResponseServerError
from django.contrib.auth.models import User
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from vmapi.models import Volunteer, Assignment, VolunteerAssignment



class VolunteerAssignmentView(ViewSet):
    """Volunteer Assignment view set"""

    def create(self, request):
        """Handle POST requests for volunteer

        Returns:
            Response: JSON serialized representation of newly created volunteer
        """

        try:
            # Get an object instance of a volunteer status  
            volunteer = Volunteer.objects.get(pk=request.data["volunteer_id"])
            assignment = Assignment.objects.get(pk=request.data["assignment_id"])
 
            # Create an volunteer object and assign it property values
            volunteer_assignment = VolunteerAssignment()
            volunteer_assignment.volunteer_id = volunteer
            volunteer_assignment.assignment_id = assignment
            volunteer_assignment.save()

            serialized = VolunteerAssignmentSerializer(volunteer_assignment, many=False)

            return Response(serialized.data, status=status.HTTP_201_CREATED)       
             
        except Volunteer.DoesNotExist:
            return Response(None, status=status.HTTP_404_NOT_FOUND)
        
        except Assignment.DoesNotExist:
            return Response(None, status=status.HTTP_404_NOT_FOUND)
        
        except IntegrityError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        except Exception as ex:
            return HttpResponseServerError(ex)

    def list(self, request):
        """Handle GET requests for all items

        Returns:
            Response -- JSON serialized array
        """
        # Get query string parameter
        volunteer_id = self.request.query_params.get("volunteer_id", None)
        assignment_id = self.request.query_params.get("assignment_id", None)

        try:
            # Start with all rows
            volunteer_assignments = VolunteerAssignment.objects.all()

            if volunteer_id is not None:
                # Filter to only the current volunteer's assignments
                volunteer_assignments = volunteer_assignments.filter(volunteer_id=volunteer_id)

            if assignment_id is not None:
                volunteer_assignments = volunteer_assignments.filter(assignment_id=assignment_id)       

            serializer = VolunteerAssignmentSerializer(volunteer_assignments, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as ex:
            return HttpResponseServerError(ex)   

    def destroy(self, request, pk=None):
        """Handle DELETE requests for a single item

        Returns:
            Response -- 200, 404, or 500 status code
        """
        try:
            volunteer_assignment = VolunteerAssignment.objects.get(pk=pk)
            volunteer_assignment.delete()
            return Response(None, status=status.HTTP_204_NO_CONTENT)

        except VolunteerAssignment.DoesNotExist as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_404_NOT_FOUND)

        except Exception as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class VolunteerAssignmentSerializer(serializers.ModelSerializer):
    """JSON serializer"""

    class Meta:
        model = VolunteerAssignment
        fields = ('id', 'volunteer_id', 'assignment_id')


