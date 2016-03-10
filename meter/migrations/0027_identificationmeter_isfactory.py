# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0026_district'),
    ]

    operations = [
        migrations.AddField(
            model_name='identificationmeter',
            name='isFactory',
            field=models.IntegerField(default=0),
        ),
    ]
