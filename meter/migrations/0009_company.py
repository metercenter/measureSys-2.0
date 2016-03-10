# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0008_auto_20150314_1432'),
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user_id', models.CharField(max_length=24)),
                ('company_title', models.CharField(max_length=200)),
                ('company_content', models.CharField(max_length=200)),
                ('company_contract', models.CharField(max_length=200)),
                ('company_tel', models.CharField(max_length=200)),
                ('company_addr', models.CharField(max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
