# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_addr',
            field=models.CharField(max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='user',
            name='user_index',
            field=models.CharField(max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='user',
            name='user_lastmonth',
            field=models.CharField(max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='user',
            name='user_phone',
            field=models.CharField(max_length=20),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='user',
            name='user_total',
            field=models.CharField(max_length=200),
            preserve_default=True,
        ),
    ]
