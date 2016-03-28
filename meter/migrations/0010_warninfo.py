# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0009_company'),
    ]

    operations = [
        migrations.CreateModel(
            name='WarnInfo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('meter_eui', models.CharField(max_length=200)),
                ('data_warn', models.IntegerField(default=0)),
                ('warn_level', models.CharField(max_length=24)),
                ('warn_date', models.DateTimeField(verbose_name=b'date published')),
                ('warn_solution', models.CharField(max_length=200)),
                ('warn_other', models.CharField(max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
