# Generated by Django 4.1.2 on 2022-10-21 19:36

from django.conf import settings
import django.contrib.gis.db.models.fields
import django.contrib.gis.geos.point
from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True, verbose_name='Profile Name')),
                ('photo', models.ImageField(blank=True, upload_to='uploads/')),
                ('department', models.CharField(choices=[('Engineering and Infrastructure', 'Engineering and Infrastructure'), ('Geo Science', 'Geo Science'), ('Information Technology', 'Information Technology'), ('Contract Administration', 'Contract Administration'), ('Accounting and Finance', 'Accounting and Finance'), ('Research and Development', 'Research and Development'), ('RHuman Resources', 'Human Resources')], max_length=100, verbose_name='Departements')),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(help_text='example: +62812532xxxxx', max_length=128, region=None, verbose_name='Phone Number')),
                ('address_location', django.contrib.gis.db.models.fields.PointField(default=django.contrib.gis.geos.point.Point(106.823, -6.195), srid=4326, verbose_name='Address Location')),
                ('address_description', models.TextField(blank=True, max_length=255, verbose_name='Address Description')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Date Created')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Date Updated')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]