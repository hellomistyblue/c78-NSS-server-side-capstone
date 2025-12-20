from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from vmapi.views import register_user, login_user, AssignmentView, StatusView, VolunteerView

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'assignments', AssignmentView, 'assignment')
router.register(r'statuses', StatusView, 'status')
router.register(r'volunteers', VolunteerView, 'volunteer' )



urlpatterns = [
    path('', include(router.urls)),
    path('register', register_user), # Enables http://localhost:8000/register
    path('login', login_user), # Enables http://localhost:8000/login
]

