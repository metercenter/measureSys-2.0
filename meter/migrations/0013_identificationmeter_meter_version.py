# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0012_identificationmeter'),
    ]

    operations = [
        migrations.AddField(
            model_name='identificationmeter',
            name='meter_version',
            field=models.CharField(default=12345, max_length=200),
            preserve_default=False,
        ),
    ]
