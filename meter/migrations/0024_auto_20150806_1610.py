# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0023_auto_20150806_1607'),
    ]

    operations = [
        migrations.AlterField(
            model_name='identificationmeter',
            name='identify_date',
            field=models.DateTimeField(null=True, verbose_name=b'date published', blank=True),
            preserve_default=True,
        ),
    ]
