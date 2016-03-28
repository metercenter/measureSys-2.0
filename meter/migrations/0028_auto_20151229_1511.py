# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0027_identificationmeter_isfactory'),
    ]

    operations = [
        migrations.AddField(
            model_name='meter',
            name='meter_latitude',
            field=models.CharField(default=b'', max_length=200),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='meter',
            name='meter_longitude',
            field=models.CharField(default=b'', max_length=200),
            preserve_default=True,
        ),
    ]
