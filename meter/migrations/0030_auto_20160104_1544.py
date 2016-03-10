# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meter', '0029_filtermanagement_metermanagement_valvemanagement'),
    ]

    operations = [
        migrations.RenameField(
            model_name='valvemanagement',
            old_name='changed_status_tree',
            new_name='changed_status_three',
        ),
        migrations.RenameField(
            model_name='valvemanagement',
            old_name='current_status_tree',
            new_name='current_status_three',
        ),
    ]
