# Generated by Django 3.2.2 on 2021-05-09 19:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fstr', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='str_obj',
            name='files_ls',
            field=models.FileField(default='Put your files', upload_to='file_obj'),
        ),
    ]
