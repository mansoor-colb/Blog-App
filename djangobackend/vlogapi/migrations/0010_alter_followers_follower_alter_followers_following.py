# Generated by Django 4.1.7 on 2023-04-07 17:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vlogapi', '0009_followers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='followers',
            name='follower',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='followers',
            name='following',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
