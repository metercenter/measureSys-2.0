# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0028_auto_20151229_1511'),
    ]

    operations = [
        migrations.CreateModel(
            name='filterManagement',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user_id', models.CharField(max_length=24)),
                ('report_time', models.DateTimeField(verbose_name=b'date published')),
                ('type', models.CharField(max_length=200)),
                ('capacity', models.CharField(max_length=200)),
                ('accurate', models.CharField(max_length=200)),
                ('change_time', models.DateTimeField(verbose_name=b'date published')),
                ('maintain_time', models.DateTimeField(verbose_name=b'date published')),
                ('work_content', models.CharField(max_length=200)),
                ('operator', models.CharField(max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='meterManagement',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user_id', models.CharField(max_length=24)),
                ('report_time', models.DateTimeField(verbose_name=b'date published')),
                ('meter_name', models.CharField(max_length=200)),
                ('current_lead_code', models.CharField(max_length=200)),
                ('changed_lead_code', models.CharField(max_length=200)),
                ('changed_reason', models.CharField(max_length=200)),
                ('operator', models.CharField(max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='valveManagement',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user_id', models.CharField(max_length=24)),
                ('report_time', models.DateTimeField(verbose_name=b'date published')),
                ('current_status_one', models.CharField(max_length=200)),
                ('current_status_two', models.CharField(max_length=200)),
                ('current_status_tree', models.CharField(max_length=200)),
                ('current_status_four', models.CharField(max_length=200)),
                ('current_status_five', models.CharField(max_length=200)),
                ('current_status_six', models.CharField(max_length=200)),
                ('changed_status_one', models.CharField(max_length=200)),
                ('changed_status_two', models.CharField(max_length=200)),
                ('changed_status_tree', models.CharField(max_length=200)),
                ('changed_status_four', models.CharField(max_length=200)),
                ('changed_status_five', models.CharField(max_length=200)),
                ('changed_status_six', models.CharField(max_length=200)),
                ('operator', models.CharField(max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
