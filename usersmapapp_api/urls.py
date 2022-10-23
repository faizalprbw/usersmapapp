from django.contrib import admin
from django.urls import reverse_lazy
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import RedirectView
from rest_framework.authtoken.views import obtain_auth_token
from userprofile.views import dashboard_view

urlpatterns = [
    path('', dashboard_view),
    path('admin/', admin.site.urls),
    path('api/v1/', include('userprofile.urls')),
    path('api/v1/auth/', obtain_auth_token)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
