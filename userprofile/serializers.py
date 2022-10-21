from django.contrib.auth.models import User, Group
from .models import UserProfile
from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'password'
        ]
        extra_kwargs = {
            'password': {
                'write_only': True,
                'required': True
            }
        }

    def create(self, validated_data):
        group_users_staff = Group.objects.get(name='users_staff')
        user = User.objects.create_user(
            **validated_data,
            is_staff=True
        )
        user.groups.add(group_users_staff)
        Token.objects.create(user=user)
        return user


class UserProfileSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = UserProfile
        geo_field = 'address_location'
        fields = [
            'user',
            'photo',
            'name',
            'department',
            'phone_number',
            'address_location',
            'address_description'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']