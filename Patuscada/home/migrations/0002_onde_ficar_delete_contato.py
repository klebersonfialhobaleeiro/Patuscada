# Generated by Django 4.1.2 on 2022-10-22 01:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='onde_ficar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descricao', models.CharField(max_length=50)),
                ('contato', models.CharField(max_length=50)),
                ('falarCom', models.CharField(max_length=50)),
            ],
        ),
        migrations.DeleteModel(
            name='contato',
        ),
    ]
