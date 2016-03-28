# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0017_auto_20150414_0520'),
    ]

    operations = [
        migrations.AddField(
            model_name='meter',
            name='communication',
            field=models.CharField(default=1, max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='meter',
            name='meter_version',
            field=models.CharField(default=1, max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='meter',
            name='wrap_code',
            field=models.CharField(default=1, max_length=200),
            preserve_default=False,
        ),
    ]
