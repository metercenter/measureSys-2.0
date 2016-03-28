# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0010_warninfo'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserFeedback',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user_id', models.CharField(max_length=24)),
                ('report_time', models.DateTimeField(verbose_name=b'date published')),
                ('solution_deadline', models.CharField(max_length=200)),
                ('problem', models.CharField(max_length=200)),
                ('solution_result', models.CharField(max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
