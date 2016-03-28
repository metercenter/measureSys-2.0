# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0005_data_meter_eui'),
    ]

    operations = [
        migrations.AddField(
            model_name='data',
            name='data_warn',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
