# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0018_auto_20150414_0524'),
    ]

    operations = [
        migrations.RenameField(
            model_name='meter',
            old_name='user_revise',
            new_name='meter_revisetype',
        ),
        migrations.RemoveField(
            model_name='data',
            name='meter_id',
        ),
        migrations.RemoveField(
            model_name='identificationmeter',
            name='meter_index',
        ),
        migrations.RemoveField(
            model_name='identificationmeter',
            name='meter_type',
        ),
        migrations.RemoveField(
            model_name='identificationmeter',
            name='meter_version',
        ),
        migrations.RemoveField(
            model_name='meter',
            name='meter_id',
        ),
        migrations.RemoveField(
            model_name='meter',
            name='meter_qb',
        ),
        migrations.RemoveField(
            model_name='meter',
            name='meter_qm',
        ),
        migrations.RemoveField(
            model_name='meter',
            name='user_meterdata',
        ),
        migrations.RemoveField(
            model_name='meter',
            name='user_reviseid',
        ),
        migrations.RemoveField(
            model_name='user',
            name='user_index',
        ),
        migrations.RemoveField(
            model_name='user',
            name='user_lastmonth',
        ),
        migrations.RemoveField(
            model_name='user',
            name='user_total',
        ),
        migrations.AddField(
            model_name='meter',
            name='meter_district',
            field=models.CharField(default=b'', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='Qmax10',
            field=models.CharField(default=b'', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='Qmax100',
            field=models.CharField(default=b'', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='Qmax20',
            field=models.CharField(default=b'', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='Qmax40',
            field=models.CharField(default=b'', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='Qmax60',
            field=models.CharField(default=b'', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='outputMax',
            field=models.CharField(default=b'', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='outputMin',
            field=models.CharField(default=b'', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='pressureMax',
            field=models.CharField(default=b'', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='pressureMin',
            field=models.CharField(default=b'', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='temperatureMax',
            field=models.CharField(default=b'', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='temperatureMin',
            field=models.CharField(default=b'', max_length=200),
            preserve_default=True,
        ),
    ]
