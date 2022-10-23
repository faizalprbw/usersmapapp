from django.contrib.gis.db import models
from django.contrib.auth.models import User
from django.contrib.gis.geos import Point
from django.utils.translation import gettext_lazy as _

from phonenumber_field.modelfields import PhoneNumberField


DEPARTMENT_CHOICES = [
    ('Engineering and Infrastructure', 'Engineering and Infrastructure'),
    ('Geo Science', 'Geo Science'),
    ('Information Technology', 'Information Technology'),
    ('Contract Administration', 'Contract Administration'),
    ('Accounting and Finance', 'Accounting and Finance'),
    ('Research and Development', 'Research and Development'),
    ('RHuman Resources', 'Human Resources')
]

class UserProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )
    name=models.CharField(
        max_length=100,
        unique=True,
        verbose_name=_('Profile Name')
    )
    photo = models.ImageField(
        upload_to ='uploads/',
        blank=True
    )
    department = models.CharField(
        max_length=100,
        choices=DEPARTMENT_CHOICES,
        verbose_name=_('Departments')
    )
    phone_number = PhoneNumberField(
        verbose_name = _('Phone Number'),
        help_text="example: +62812532xxxxx"
    )
    address_location = models.PointField(
        srid=4326,
        default=Point(106.823, -6.195),
        verbose_name= _('Address Location')
    )
    address_description = models.TextField(
        max_length=255,
        blank=True,
        verbose_name=_('Address Description')
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_('Date Created')
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_('Date Updated')
    )

    def __str__(self):
        return self.name
    
    def get_profile_departement(self):
        return self.department
