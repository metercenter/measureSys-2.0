# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0011_userfeedback'),
    ]

    operations = [
        migrations.CreateModel(
            name='IdentificationMeter',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('meter_eui', models.CharField(max_length=200)),
                ('meter_type', models.IntegerField(default=0)),
                ('meter_index', models.CharField(max_length=200)),
                ('output_range', models.CharField(max_length=200)),
                ('identify_date', models.DateTimeField(verbose_name=b'date published')),
                ('next_identify_date', models.DateTimeField(verbose_name=b'date published')),
                ('medium', models.CharField(max_length=200)),
                ('pressure', models.CharField(max_length=200)),
                ('temperature', models.CharField(max_length=200)),
                ('Qmax100', models.CharField(max_length=200)),
                ('Qmax60', models.CharField(max_length=200)),
                ('Qmax40', models.CharField(max_length=200)),
                ('Qmax20', models.CharField(max_length=200)),
                ('Qmax10', models.CharField(max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
