# Generated by Django 4.1.2 on 2022-10-22 23:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='department',
            field=models.CharField(choices=[('Engineering and Infrastructure', 'Engineering and Infrastructure'), ('Geo Science', 'Geo Science'), ('Information Technology', 'Information Technology'), ('Contract Administration', 'Contract Administration'), ('Accounting and Finance', 'Accounting and Finance'), ('Research and Development', 'Research and Development'), ('RHuman Resources', 'Human Resources')], max_length=100, verbose_name='Departments'),
        ),
    ]