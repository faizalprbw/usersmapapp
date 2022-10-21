from django.contrib import admin
from leaflet.admin import LeafletGeoAdmin
from .models import UserProfile


class UserProfileAdmin(LeafletGeoAdmin):
    list_display= [
        'user',
        'name',
        'department',
        'phone_number',
        'address_location',
        'address_description'
    ]

admin.site.register(UserProfile, UserProfileAdmin)