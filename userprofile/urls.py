from rest_framework.routers import DefaultRouter

from .views import UserProfileViewSet, UserViewSet

router = DefaultRouter()

router.register(prefix='users', viewset=UserViewSet, basename='user')
router.register(prefix='profiles', viewset=UserProfileViewSet, basename='profile')

urlpatterns = router.urls