# Generated by Django 4.1.7 on 2023-03-31 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vlogapi', '0003_student_call'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='users',
            name='id',
        ),
        migrations.AlterField(
            model_name='users',
            name='uid',
            field=models.CharField(max_length=100, primary_key=True, serialize=False),
        ),
    ]
