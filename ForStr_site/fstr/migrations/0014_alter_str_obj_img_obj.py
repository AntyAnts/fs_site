# Generated by Django 3.2.2 on 2021-05-10 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fstr', '0013_alter_str_obj_img_obj'),
    ]

    operations = [
        migrations.AlterField(
            model_name='str_obj',
            name='img_obj',
            field=models.ImageField(blank=True, max_length=500, upload_to='img_obj'),
        ),
    ]
