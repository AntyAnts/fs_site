# Generated by Django 3.2.2 on 2021-05-10 09:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fstr', '0003_remove_str_obj_files_ls'),
    ]

    operations = [
        migrations.AlterField(
            model_name='str_obj',
            name='img_obj',
            field=models.ImageField(upload_to=''),
        ),
    ]
