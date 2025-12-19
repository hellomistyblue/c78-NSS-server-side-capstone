from django.http import HttpResponseServerError
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from vmapi.models import Status


class StatusView(ViewSet):
    """Status view set"""
    
    def list(self, request):
        """Handle GET requests for all items

        Returns:
            Response -- JSON serialized array
        """

        try:
            # Start with all rows
            statuses = Status.objects.all()

            serializer = StatusSerializer(statuses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as ex:
            return HttpResponseServerError(ex)

class StatusSerializer(serializers.ModelSerializer):
    """JSON serializer"""

    class Meta:
        model = Status
        fields = ( 'id', 'type' )
