import pytest    
from userprofile.models import UserProfile

@pytest.mark.django_db
def test_userprofile_create():    
    instance = UserProfile.objects.create(
        user = 1,
        name = "Akhmad Faizal P S",
        photo = "uploads/test.jpg",
        department = "Information Technology",
        phone_number = "+6281252228647",
        address_location = "SRID=4326;POINT (106.8269374696056 -6.175521036182877)",
        address_description = "Lorem Ipsum Dolor Sit Amer"
    )    
    assert instance.user==1    
    assert instance.name=="Akhmad Faizal P S"
    assert instance.photo=="uploads/test.jpg"
    assert instance.department=="Information Technology"
    assert instance.phone_number=="+6281252228647"
    assert instance.address_location=="SRID=4326;POINT (106.8269374696056 -6.175521036182877)"
    assert instance.address_description=="Lorem Ipsum Dolor Sit Amer"
