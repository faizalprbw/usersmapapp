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

    def get_queryset(self, request):
        qs = super(UserProfileAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(user=request.user)


admin.site.register(UserProfile, UserProfileAdmin)