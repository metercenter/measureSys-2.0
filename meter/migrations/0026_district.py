# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0025_auto_20150806_1610'),
    ]

    operations = [
        migrations.CreateModel(
            name='District',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('district_id', models.CharField(max_length=24)),
                ('district_name', models.CharField(max_length=24)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
