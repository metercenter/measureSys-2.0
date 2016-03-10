# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Data',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('data_id', models.IntegerField(default=0)),
                ('meter_id', models.IntegerField(default=0)),
                ('data_date', models.DateTimeField(verbose_name=b'date published')),
                ('data_vb', models.CharField(max_length=200)),
                ('data_vm', models.CharField(max_length=200)),
                ('data_p', models.CharField(max_length=200)),
                ('data_t', models.CharField(max_length=200)),
                ('data_qb', models.CharField(max_length=200)),
                ('data_qm', models.CharField(max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Meter',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('meter_id', models.IntegerField(default=0)),
                ('meter_name', models.CharField(max_length=200)),
                ('meter_type', models.IntegerField(default=0)),
                ('meter_index', models.CharField(max_length=200)),
                ('meter_eui', models.CharField(max_length=200)),
                ('user_meterdata', models.CharField(max_length=200)),
                ('user_revise', models.CharField(max_length=200)),
                ('user_reviseid', models.CharField(max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user_id', models.CharField(max_length=24)),
                ('user_name', models.CharField(max_length=200)),
                ('user_password', models.CharField(max_length=10)),
                ('user_company', models.CharField(max_length=200)),
                ('user_addr', models.CharField(max_length=200, blank=True)),
                ('user_phone', models.CharField(max_length=20, blank=True)),
                ('user_index', models.CharField(max_length=200, blank=True)),
                ('user_total', models.CharField(max_length=200, blank=True)),
                ('user_lastmonth', models.CharField(max_length=200, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='meter',
            name='user',
            field=models.ForeignKey(related_name='user_meter', to='meter.User'),
            preserve_default=True,
        ),
    ]
