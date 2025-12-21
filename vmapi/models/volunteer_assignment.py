from django.db import models

class VolunteerAssignment(models.Model):
    assignment_id = models.ForeignKey("Assignment", on_delete=models.CASCADE, related_name='assignment_volunteers')
    volunteer_id = models.ForeignKey("Volunteer",on_delete=models.CASCADE, related_name='volunteer_assignments')

    class Meta: 
        constraints = [
            models.UniqueConstraint(
                fields=['assignment_id', 'volunteer_id'], name="Unique_Assignment_Volunteer"
            )
        ]

