from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import redirect
from .models import UserProfile
from .serializers import UserProfileSerializer, UserSerializer
from rest_framework import viewsets
from rest_framework.authtoken.models import Token


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = []
        token = self.request.query_params.get('token', None)
        if token is not None:
            try:
                user = Token.objects.get(key=token.replace('\"', '')).user
                queryset = [user]
            except ObjectDoesNotExist:
                queryset = []
        return queryset


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        queryset = UserProfile.objects.all()
        user = self.request.query_params.get('user', None)
        if user is not None:
            try:
                queryset = [UserProfile.objects.get(user=user)]
            except ObjectDoesNotExist:
                queryset = []
        return queryset


def dashboard_view(request):
    response = redirect('/dashboard')
    return response