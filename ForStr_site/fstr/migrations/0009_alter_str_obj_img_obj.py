# Generated by Django 3.2.2 on 2021-05-10 10:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fstr', '0008_alter_str_obj_img_obj'),
    ]

    operations = [
        migrations.AlterField(
            model_name='str_obj',
            name='img_obj',
            field=models.ImageField(blank=True, max_length=500, upload_to=''),
        ),
    ]
