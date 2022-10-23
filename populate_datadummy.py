import os
from sys import argv
import django
import random

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "usersmapapp_api.settings")
django.setup()

from django.contrib.auth.models import User, Group
from django.contrib.gis.geos import Point
from userprofile.models import UserProfile
from rest_framework.authtoken.models import Token


# Function to populate example data dummy for dashboard testing
def populateDataDummy():
    print("-- Populate Data Dummy --")
    # Check number of fake data parameter
    if len(argv)>1:
        fakenumber = int(argv[1])
    else:
        fakenumber = 50
    # Clear common User first (Exclude Superuser)
    User.objects.filter(is_superuser=False).delete()
    try:
        # Default variables
        username_prefix = 'fakeuser'
        defaultpassword = 'usersmapappPassword123!'
        fakename = 'Fake User '
        department_choices = [
            'Engineering and Infrastructure',
            'Geo Science',
            'Information Technology',
            'Contract Administration',
            'Accounting and Finance',
            'Research and Development',
            'Human Resources'
        ]
        # Looping Fake Data
        group_users_staff = Group.objects.get(name='users_staff')
        for n in range(0,fakenumber+1):
            print('- create %s_%s' % (username_prefix,n))
            # Create User
            user = User.objects.create_user(
                username='%s_%s' % (username_prefix, n),
                password=defaultpassword,
                is_staff=True
            )
            user.groups.add(group_users_staff)
            Token.objects.create(user=user)
            # Generate fake lat lng coordinate around JABODETABEK (Indonesia) Region
            fake_coord_lat = random.uniform(106.500,107.050)
            fake_coord_lng = random.uniform(-6,-6.500)
            # Create User Profile
            UserProfile.objects.create(
                user=user,
                name='%s_%s' % (fakename,n),
                photo='',
                department=random.choices(department_choices)[0],
                phone_number='+6281255000000',
                address_location=Point(fake_coord_lat, fake_coord_lng),
                address_description='Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            )
    except Exception as e:
        print('ERROR: {}'.format(e))

if __name__ == '__main__':
    populateDataDummy()
