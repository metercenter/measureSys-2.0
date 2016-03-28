# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0021_auto_20150806_1545'),
    ]

    operations = [
        migrations.AlterField(
            model_name='identificationmeter',
            name='Qmax10',
            field=models.CharField(max_length=200, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='Qmax100',
            field=models.CharField(max_length=200, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='Qmax20',
            field=models.CharField(max_length=200, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='Qmax40',
            field=models.CharField(max_length=200, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='Qmax60',
            field=models.CharField(max_length=200, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='medium',
            field=models.CharField(max_length=200, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='next_identify_date',
            field=models.DateTimeField(verbose_name=b'date published', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='outputMax',
            field=models.CharField(max_length=200, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='outputMin',
            field=models.CharField(max_length=200, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='pressureMax',
            field=models.CharField(max_length=200, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='pressureMin',
            field=models.CharField(max_length=200, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='temperatureMax',
            field=models.CharField(max_length=200, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='identificationmeter',
            name='temperatureMin',
            field=models.CharField(max_length=200, blank=True),
            preserve_default=True,
        ),
    ]
