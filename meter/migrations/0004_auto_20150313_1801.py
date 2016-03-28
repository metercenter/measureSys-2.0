# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0003_auto_20150313_0818'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='meter',
            name='user',
        ),
        migrations.AddField(
            model_name='meter',
            name='user_id',
            field=models.CharField(default=1, max_length=24),
            preserve_default=False,
        ),
    ]
