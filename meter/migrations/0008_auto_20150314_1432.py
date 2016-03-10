# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0007_metertype'),
    ]

    operations = [
        migrations.CreateModel(
            name='DataWarnType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('data_warn', models.IntegerField(default=0)),
                ('data_warn_reason', models.CharField(max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AlterField(
            model_name='data',
            name='data_warn',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
    ]
