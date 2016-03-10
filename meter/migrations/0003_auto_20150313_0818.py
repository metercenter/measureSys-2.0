# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0002_auto_20150312_1732'),
    ]

    operations = [
        migrations.AddField(
            model_name='meter',
            name='meter_qb',
            field=models.CharField(default=1, max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='meter',
            name='meter_qm',
            field=models.CharField(default=1, max_length=200),
            preserve_default=False,
        ),
    ]
