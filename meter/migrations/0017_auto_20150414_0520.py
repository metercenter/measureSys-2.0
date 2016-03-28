# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0016_auto_20150407_1545'),
    ]

    operations = [
        migrations.RenameField(
            model_name='identificationmeter',
            old_name='output_range',
            new_name='outputMax',
        ),
        migrations.RenameField(
            model_name='identificationmeter',
            old_name='pressure',
            new_name='outputMin',
        ),
        migrations.RenameField(
            model_name='identificationmeter',
            old_name='temperature',
            new_name='pressureMax',
        ),
        migrations.AddField(
            model_name='identificationmeter',
            name='pressureMin',
            field=models.CharField(default=12, max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='identificationmeter',
            name='temperatureMax',
            field=models.CharField(default=12, max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='identificationmeter',
            name='temperatureMin',
            field=models.CharField(default=12, max_length=200),
            preserve_default=False,
        ),
    ]
