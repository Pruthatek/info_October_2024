# Generated by Django 5.0 on 2024-10-25 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='para',
            name='ad_field_image',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='post',
            name='thumbnail',
            field=models.CharField(default='', max_length=255),
        ),
    ]
