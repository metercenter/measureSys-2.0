# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0015_outputdiff'),
    ]

    operations = [
        migrations.AddField(
            model_name='datawarntype',
            name='data_warn_level',
            field=models.CharField(default=1, max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='datawarntype',
            name='data_warn_solution',
            field=models.CharField(default='1', max_length=200),
            preserve_default=False,
        ),
    ]
