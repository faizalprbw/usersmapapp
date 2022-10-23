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
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True},
            'user': {'validators': []},
        }

    def create(self, validated_data):
        userprofile, created = UserProfile.objects.update_or_create(
            user=validated_data.get('user', None),
            defaults={
                'name': validated_data.get('name', None),
                'photo': validated_data.get('photo', None),
                'department': validated_data.get('department', None),
                'phone_number': validated_data.get('phone_number', None),
                'address_location': validated_data.get('address_location', None),
                'address_description': validated_data.get('address_description', None)
            })
        return userprofile

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.photo = validated_data.get('photo', instance.photo)
        instance.department = validated_data.get('department', instance.department)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.address_location = validated_data.get('address_location', instance.address_location)
        instance.save()
        return instance