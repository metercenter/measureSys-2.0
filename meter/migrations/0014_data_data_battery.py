# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0013_identificationmeter_meter_version'),
    ]

    operations = [
        migrations.AddField(
            model_name='data',
            name='data_battery',
            field=models.CharField(default=12, max_length=200),
            preserve_default=False,
        ),
    ]
