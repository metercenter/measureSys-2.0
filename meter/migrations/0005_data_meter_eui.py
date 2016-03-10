# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0004_auto_20150313_1801'),
    ]

    operations = [
        migrations.AddField(
            model_name='data',
            name='meter_eui',
            field=models.CharField(default=1, max_length=200),
            preserve_default=False,
        ),
    ]
