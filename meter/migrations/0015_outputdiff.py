# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0014_data_data_battery'),
    ]

    operations = [
        migrations.CreateModel(
            name='outputDiff',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('input', models.CharField(max_length=200)),
                ('industry_output', models.CharField(max_length=200)),
                ('resident_output', models.CharField(max_length=200)),
                ('other_output', models.CharField(max_length=200)),
                ('output_diff', models.CharField(max_length=200)),
                ('output_date', models.DateTimeField(verbose_name=b'date published')),
                ('user_id', models.CharField(max_length=24)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
